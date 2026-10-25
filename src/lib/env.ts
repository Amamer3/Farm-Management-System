function requiredValue(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `${name} environment variable is not set. Please configure it in your .env file.`
    )
  }
  return value
}

function requiredPositiveNumber(name: string, value: string | undefined): number {
  const parsed = Number(requiredValue(name, value))
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${name} must be a positive number.`)
  }
  return parsed
}

export function getPublicApiBaseUrl(): string {
  const envUrl = requiredValue("NEXT_PUBLIC_API_BASE_URL", process.env.NEXT_PUBLIC_API_BASE_URL)
  if (envUrl.startsWith("http")) {
    return envUrl.endsWith("/api") ? envUrl : `${envUrl.replace(/\/$/, "")}/api`
  }
  return envUrl
}

export function getAppName(): string {
  return requiredValue("NEXT_PUBLIC_APP_NAME", process.env.NEXT_PUBLIC_APP_NAME)
}

export function getAppTagline(): string {
  return requiredValue("NEXT_PUBLIC_APP_TAGLINE", process.env.NEXT_PUBLIC_APP_TAGLINE)
}

export function getAppTitle(): string {
  return requiredValue("NEXT_PUBLIC_APP_TITLE", process.env.NEXT_PUBLIC_APP_TITLE)
}

export function getAppDescription(): string {
  return requiredValue("NEXT_PUBLIC_APP_DESCRIPTION", process.env.NEXT_PUBLIC_APP_DESCRIPTION)
}

export function getLogoPath(): string {
  return requiredValue("NEXT_PUBLIC_LOGO_PATH", process.env.NEXT_PUBLIC_LOGO_PATH)
}

export function getTwitterHandle(): string {
  return requiredValue("NEXT_PUBLIC_TWITTER_HANDLE", process.env.NEXT_PUBLIC_TWITTER_HANDLE)
}

export function getRequestTimeoutMs(): number {
  return requiredPositiveNumber(
    "NEXT_PUBLIC_REQUEST_TIMEOUT_MS",
    process.env.NEXT_PUBLIC_REQUEST_TIMEOUT_MS
  )
}

export const isDev = process.env.NODE_ENV === "development"
export const isProd = process.env.NODE_ENV === "production"
