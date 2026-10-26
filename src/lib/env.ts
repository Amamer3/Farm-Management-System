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

function socialHandle(): string {
  return getTwitterHandle().replace(/^@/, "")
}

export function getXUrl(): string {
  return process.env.NEXT_PUBLIC_X_URL || `https://x.com/${socialHandle()}`
}

export function getInstagramUrl(): string {
  return process.env.NEXT_PUBLIC_INSTAGRAM_URL || `https://www.instagram.com/${socialHandle()}`
}

export function getLinkedInUrl(): string {
  return process.env.NEXT_PUBLIC_LINKEDIN_URL || `https://www.linkedin.com/company/${socialHandle()}`
}

export function getFacebookUrl(): string {
  return process.env.NEXT_PUBLIC_FACEBOOK_URL || `https://www.facebook.com/${socialHandle()}`
}

export function getSocialLinks(): { id: string; label: string; href: string }[] {
  return [
    { id: "x", label: "X", href: getXUrl() },
    { id: "instagram", label: "Instagram", href: getInstagramUrl() },
    { id: "linkedin", label: "LinkedIn", href: getLinkedInUrl() },
    { id: "facebook", label: "Facebook", href: getFacebookUrl() },
  ]
}

export const PRODUCTION_SITE_URL = "https://agrocyms.com"

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  if (explicit && !explicit.includes("localhost")) {
    return explicit.replace(/^http:\/\//i, "https://")
  }
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:${process.env.PORT || "8080"}`
  }
  return PRODUCTION_SITE_URL
}

export function getSiteLocale(): string {
  return process.env.NEXT_PUBLIC_SITE_LOCALE || "en"
}

export function getGoogleSiteVerification(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined
}

export function getBingSiteVerification(): string | undefined {
  return process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || undefined
}

export function getContactEmail(): string {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@agrocyms.com"
}

export function getRequestTimeoutMs(): number {
  return requiredPositiveNumber(
    "NEXT_PUBLIC_REQUEST_TIMEOUT_MS",
    process.env.NEXT_PUBLIC_REQUEST_TIMEOUT_MS
  )
}

export const isDev = process.env.NODE_ENV === "development"
export const isProd = process.env.NODE_ENV === "production"
