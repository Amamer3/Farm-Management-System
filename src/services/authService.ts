import { User, LoginCredentials, RegisterData, UserRole } from "@/types/auth"
import { getPublicApiBaseUrl, getRequestTimeoutMs, isProd } from "@/lib/env"
import { parseApiError, storage, withTimeout, retryWithBackoff } from "@/utils/errorHandler"

function getApiBaseUrl(): string {
  return getPublicApiBaseUrl()
}

const API_BASE_URL = getApiBaseUrl()
const AUTH_STORAGE_KEY = "auth"
const REQUEST_TIMEOUT = getRequestTimeoutMs()

interface AuthResponse {
  success: boolean
  message: string
  data: {
    user: {
      id?: string
      email?: string
      name: string
      role: string
      farmId?: string
      isActive?: boolean
      createdAt?: any
      updatedAt?: any
    }
    expiresIn?: number
  }
  timestamp: string
}

type AuthEvent = "login" | "logout" | "token_refresh" | "session_expired" | "permission_denied"

class AuthService {
  private refreshTimeout?: ReturnType<typeof setTimeout>
  private isRefreshing = false
  private failedQueue: Array<{ resolve: (value: any) => void; reject: (reason?: any) => void }> = []
  private initializing = false
  private initPromise?: Promise<User | null>
  private listeners: Map<AuthEvent, (() => void)[]> = new Map()
  private lastLoginTime = 0
  private readonly LOGIN_GRACE_PERIOD = 5000
  private sessionExpiresAt = 0

  constructor() {
    this.setupSessionRefresh()
  }

  on(event: AuthEvent, callback: () => void): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)
    return () => this.off(event, callback)
  }

  private off(event: AuthEvent, callback: () => void): void {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) callbacks.splice(index, 1)
    }
  }

  private emit(event: AuthEvent): void {
    this.listeners.get(event)?.forEach((cb) => cb())
  }

  hasSession(): boolean {
    return !!this.getCurrentUser()
  }

  hasToken(): boolean {
    return this.hasSession()
  }

  private rememberSession(expiresIn?: number): void {
    const seconds = expiresIn && expiresIn > 0 ? expiresIn : 15 * 60
    this.sessionExpiresAt = Date.now() + seconds * 1000
    this.scheduleSessionRefresh()
  }

  private clearSession(emitLogout = true): void {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
      this.refreshTimeout = undefined
    }
    this.sessionExpiresAt = 0
    storage.removeItem("token")
    storage.removeItem("refresh_token")
    storage.removeItem(AUTH_STORAGE_KEY)
    if (emitLogout) {
      this.emit("logout")
    }
  }

  private scheduleSessionRefresh(): void {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
    if (!this.sessionExpiresAt) return

    const refreshAt = this.sessionExpiresAt - 60 * 1000
    const delay = Math.max(0, refreshAt - Date.now())
    this.refreshTimeout = setTimeout(() => {
      this.refreshSession()
        .catch(() => {
          this.clearSession()
          this.emit("session_expired")
        })
        .finally(() => {
          this.scheduleSessionRefresh()
        })
    }, delay)
  }

  private setupSessionRefresh(): void {
    this.scheduleSessionRefresh()
  }

  async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    isRetry = false
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const isPublicAuth =
      endpoint.startsWith("/auth/login") ||
      endpoint.startsWith("/auth/register") ||
      endpoint.startsWith("/auth/setup") ||
      endpoint.startsWith("/auth/refresh-token")

    const headers: Record<string, string> = {}
    const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData
    if (!isFormData) {
      headers["Content-Type"] = "application/json"
    }

    if (options.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => {
          headers[key] = value
        })
      } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => {
          headers[key] = value
        })
      } else {
        Object.assign(headers, options.headers)
      }
    }

    const config: RequestInit = {
      ...options,
      headers,
      mode: "cors",
      credentials: "include",
    }

    try {
      const response = await withTimeout(fetch(url, config), REQUEST_TIMEOUT)

      if (!response.ok) {
        let errorData: any = { message: `HTTP ${response.status}` }
        try {
          const contentType = response.headers.get("content-type")
          if (contentType?.includes("application/json")) {
            errorData = await response.json()
          } else {
            errorData.message = response.statusText || errorData.message
          }
        } catch {
          errorData.message = response.statusText || `HTTP ${response.status}`
        }

        if (isProd) {
          console.error("[API Error]", {
            url,
            status: response.status,
            statusText: response.statusText,
            endpoint,
            errorData,
            apiBaseUrl: API_BASE_URL,
          })
        }

        const errorMessage =
          errorData.message || errorData.error?.message || errorData.error || `HTTP ${response.status}`

        if (response.status === 401 && !isPublicAuth && !isRetry) {
          try {
            await this.refreshSession()
            return this.makeRequest<T>(endpoint, options, true)
          } catch {
            const timeSinceLogin = Date.now() - this.lastLoginTime
            if (timeSinceLogin < this.LOGIN_GRACE_PERIOD) {
              const error = new Error("Authentication failed. Please try again.")
              ;(error as any).status = 401
              throw error
            }
            this.clearSession()
            this.emit("session_expired")
            const error = new Error("Session expired. Please log in again.")
            ;(error as any).status = 401
            throw error
          }
        }

        if (response.status >= 500) {
          const error = new Error("The server encountered an error. Please try again later.")
          ;(error as any).status = response.status
          throw error
        }

        const isLogin = endpoint.startsWith("/auth/login")
        const isInvalidCredentials = /invalid|incorrect|wrong|password/i.test(errorMessage)
        const isUserNotFound = /not found|does not exist/i.test(errorMessage)
        if (
          isLogin &&
          (response.status === 401 || response.status === 404 || isInvalidCredentials || isUserNotFound)
        ) {
          let msg = "Invalid email or password."
          if (isUserNotFound) msg = "No account found with this email."
          const error = new Error(msg)
          ;(error as any).status = response.status
          throw error
        }

        if (response.status === 403) {
          const code = errorData.error?.code
          const apiMessage = errorData.error?.message || errorData.message
          if (code === "TRIAL_ENDED") {
            const error = new Error(
              apiMessage || "The 30-day trial has ended. You can still view and export records."
            )
            ;(error as any).status = 403
            ;(error as any).code = "TRIAL_ENDED"
            throw error
          }
          this.emit("permission_denied")
          const error = new Error("You do not have permission to perform this action.")
          ;(error as any).status = 403
          throw error
        }

        if (response.status === 404) {
          const error = new Error("Resource not found.")
          ;(error as any).status = 404
          throw error
        }

        if (response.status === 429) {
          const retryAfter = response.headers.get("retry-after")
          let rateLimitMessage = "Too many login attempts. Please wait a moment and try again."
          if (retryAfter) {
            const seconds = parseInt(retryAfter, 10)
            if (seconds < 60) {
              rateLimitMessage = `Too many login attempts. Please wait ${seconds} seconds and try again.`
            } else {
              const minutes = Math.ceil(seconds / 60)
              rateLimitMessage = `Too many login attempts. Please wait ${minutes} minute${minutes > 1 ? "s" : ""} and try again.`
            }
          }
          const error = new Error(rateLimitMessage)
          ;(error as any).status = 429
          throw error
        }

        if (response.status === 400) {
          const error = new Error(errorMessage || "Invalid request.")
          ;(error as any).status = 400
          throw error
        }

        const error = new Error(errorMessage)
        ;(error as any).status = response.status
        throw error
      }

      const contentType = response.headers.get("content-type")
      if (contentType?.includes("application/json")) {
        return await response.json()
      }
      const text = await response.text()
      return text as unknown as T
    } catch (error) {
      const appError = parseApiError(error)
      throw new Error(appError.message)
    }
  }

  private processQueue(error?: any): void {
    this.failedQueue.forEach((prom) => {
      if (error) prom.reject(error)
      else prom.resolve(undefined)
    })
    this.failedQueue = []
  }

  private async refreshSession(): Promise<void> {
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject })
      })
    }

    this.isRefreshing = true
    try {
      const response = await retryWithBackoff(
        () => {
          const url = `${API_BASE_URL}/auth/refresh-token`
          return fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: "{}",
          }).then(async (res) => {
            if (!res.ok) {
              const errorData = await res.json().catch(() => ({ message: "Refresh failed" }))
              throw new Error(errorData.message || errorData.error?.message || "Session refresh failed")
            }
            return res.json() as Promise<AuthResponse>
          })
        },
        1,
        1000
      )

      if (response.data?.user) {
        const user = this.transformUserResponse(response)
        storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
      }
      this.rememberSession(response.data?.expiresIn)
      this.processQueue()
      this.emit("token_refresh")
    } catch (error) {
      this.processQueue(error)
      throw error
    } finally {
      this.isRefreshing = false
    }
  }

  private transformUserResponse(response: AuthResponse): User {
    const userData = response.data.user
    const id = userData.id || userData.farmId || "unknown"
    const backendRole = (userData.role || "").toUpperCase().replace(/\s+/g, "_")
    let role: UserRole = "Worker"
    if (backendRole.includes("ADMIN")) role = "Admin"
    else if (backendRole.includes("MANAGER") || backendRole.includes("FARM")) role = "Manager"

    let createdAt = new Date().toISOString()
    if (userData.createdAt) {
      if (userData.createdAt._seconds) {
        createdAt = new Date(userData.createdAt._seconds * 1000).toISOString()
      } else if (typeof userData.createdAt === "number") {
        createdAt = new Date(userData.createdAt * 1000).toISOString()
      } else if (typeof userData.createdAt === "string") {
        createdAt = new Date(userData.createdAt).toISOString()
      }
    }

    return {
      id,
      name: userData.name,
      email: userData.email || "",
      role,
      createdAt,
      lastLogin: new Date().toISOString(),
    }
  }

  async login(credentials: LoginCredentials): Promise<User> {
    const response = await this.makeRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
    const user = this.transformUserResponse(response)
    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    this.rememberSession(response.data.expiresIn)
    this.lastLoginTime = Date.now()
    this.emit("login")
    return user
  }

  async setupFarm(data: {
    name: string
    email: string
    password: string
    farmName: string
    location: string
    enterprises: string[]
    crops: string[]
  }): Promise<User> {
    const response = await this.makeRequest<AuthResponse>("/auth/setup", {
      method: "POST",
      body: JSON.stringify(data),
    })
    const user = this.transformUserResponse(response)
    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    this.rememberSession(response.data.expiresIn)
    this.lastLoginTime = Date.now()
    this.emit("login")
    return user
  }

  async register(data: RegisterData): Promise<User> {
    const response = await this.makeRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
    const user = this.transformUserResponse(response)
    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    this.rememberSession(response.data.expiresIn)
    this.emit("login")
    return user
  }

  async logout(): Promise<void> {
    try {
      await this.makeRequest("/auth/logout", { method: "POST" })
    } catch (error) {
      console.error("Logout request failed:", error)
    } finally {
      this.clearSession()
    }
  }

  private normalizeRole(role: string | undefined): UserRole {
    if (!role) return "Worker"
    const normalized = role.toUpperCase().trim()
    if (normalized.includes("ADMIN")) return "Admin"
    if (normalized.includes("MANAGER") || normalized.includes("FARM")) return "Manager"
    return "Worker"
  }

  getCurrentUser(): (User & { phone?: string; address?: string; dateOfBirth?: string; bio?: string; department?: string }) | null {
    try {
      const userJson = storage.getItem(AUTH_STORAGE_KEY)
      if (!userJson) return null
      const user = JSON.parse(userJson)
      if (user.role && typeof user.role === "string") {
        user.role = this.normalizeRole(user.role)
      }
      if (!user.id) user.id = "unknown"
      if (!user.name) user.name = user.email?.split("@")[0] || "User"
      if (!user.email) user.email = ""
      if (!user.createdAt) user.createdAt = new Date().toISOString()
      if (!user.lastLogin) user.lastLogin = new Date().toISOString()
      return user as User
    } catch {
      storage.removeItem(AUTH_STORAGE_KEY)
      return null
    }
  }

  async verifyToken(): Promise<boolean> {
    try {
      await this.makeRequest("/auth/verify-token")
      return true
    } catch {
      return false
    }
  }

  private normalizeTimestamp(timestamp: any): string {
    if (!timestamp) return new Date().toISOString()
    if (timestamp._seconds !== undefined) {
      return new Date(timestamp._seconds * 1000).toISOString()
    }
    if (typeof timestamp === "number") {
      if (timestamp < 946684800000) {
        return new Date(timestamp * 1000).toISOString()
      }
      return new Date(timestamp).toISOString()
    }
    if (typeof timestamp === "string") {
      return new Date(timestamp).toISOString()
    }
    return new Date().toISOString()
  }

  private transformProfileData(profileData: any): User {
    return {
      id: profileData.id || profileData.farmId || "unknown",
      name: profileData.name || profileData.email?.split("@")[0] || "User",
      email: profileData.email || "",
      role: this.normalizeRole(profileData.role || "Worker"),
      avatar: profileData.avatar,
      createdAt: this.normalizeTimestamp(profileData.createdAt),
      lastLogin: this.normalizeTimestamp(profileData.lastLogin),
    }
  }

  async getProfile(options?: { allowCache?: boolean }): Promise<User & { phone?: string; address?: string; dateOfBirth?: string; bio?: string; department?: string; avatar?: string }> {
    try {
      const response = await this.makeRequest<any>("/auth/profile")
      const profileData = response?.data ?? response
      const user = this.transformProfileData(profileData)
      const extendedUser = {
        ...user,
        avatar: profileData.avatar || profileData.avatarUrl || profileData.profilePicture || user.avatar || undefined,
        phone: profileData.phone || undefined,
        address: profileData.address || undefined,
        dateOfBirth: profileData.dateOfBirth || undefined,
        bio: profileData.bio || undefined,
        department: profileData.department || undefined,
        farmId: profileData.farmId || undefined,
        isActive: profileData.isActive,
      }
      storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(extendedUser))
      return extendedUser
    } catch (error) {
      if (options?.allowCache !== false) {
        const storedUser = this.getCurrentUser()
        if (storedUser) return storedUser as any
      }
      throw error
    }
  }

  async updateProfile(updates: Partial<User>): Promise<User> {
    const response = await this.makeRequest<any>("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(updates),
    })
    const profileData = response?.data ?? response
    const updatedUser = this.transformProfileData(profileData)
    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser))
    return updatedUser
  }

  async uploadAvatar(formData: FormData): Promise<{ avatar: string }> {
    const result = await this.makeRequest<any>("/auth/profile/avatar", {
      method: "POST",
      body: formData,
    })
    const avatarUrl = result?.data?.avatar || result?.avatar || result?.url || ""
    const currentUser = this.getCurrentUser()
    if (currentUser) {
      storage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ ...currentUser, avatar: avatarUrl }))
    }
    return { avatar: avatarUrl }
  }

  async downloadFile(endpoint: string, fallbackFilename: string): Promise<void> {
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`

    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })

    if (!response.ok) {
      let message = `Download failed (${response.status})`
      try {
        const err = await response.json()
        message = err?.error?.message || err?.message || message
      } catch {
        // ignore non-JSON error bodies
      }
      throw new Error(message)
    }

    const blob = await response.blob()
    const disposition = response.headers.get("Content-Disposition") || ""
    const match = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/i)
    const filename = match?.[1]?.replace(/['"]/g, "") || fallbackFilename
    const objectUrl = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = objectUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(objectUrl)
  }

  async deleteAvatar(): Promise<void> {
    await this.makeRequest("/auth/profile/avatar", { method: "DELETE" })
    const currentUser = this.getCurrentUser()
    if (currentUser) {
      storage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ ...currentUser, avatar: undefined }))
    }
  }

  async updateSecuritySettings(settings: { [key: string]: boolean }): Promise<void> {
    await this.makeRequest("/auth/profile/security-settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    })
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const payload: { currentPassword?: string; newPassword: string } = { newPassword }
    if (currentPassword) {
      payload.currentPassword = currentPassword
    }
    await this.makeRequest("/auth/change-password", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  async revokeToken(userId: string): Promise<void> {
    await this.makeRequest("/auth/revoke-token", {
      method: "POST",
      body: JSON.stringify({ userId }),
    })
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser()
  }

  hasRole(role: UserRole): boolean {
    return this.getCurrentUser()?.role === role
  }

  isAdmin(): boolean {
    return this.hasRole("Admin")
  }

  async initializeAuth(): Promise<User | null> {
    if (this.initPromise) return this.initPromise
    if (this.initializing) {
      return new Promise((resolve) => setTimeout(() => resolve(this.initializeAuth()), 100))
    }
    this.initializing = true
    this.initPromise = this.performInit()
    const result = await this.initPromise
    this.initializing = false
    this.initPromise = undefined
    return result
  }

  private async performInit(): Promise<User | null> {
    // Profile and refresh are cookie-gated. Calling them with no saved user
    // just produces 401s on every public page for guests.
    if (!this.getCurrentUser()) {
      return null
    }
    try {
      const profile = await this.getProfile({ allowCache: false })
      this.rememberSession()
      return profile
    } catch {
      this.clearSession(false)
      return null
    }
  }
}

export const authService = new AuthService()
