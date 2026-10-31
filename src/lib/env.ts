export function getPublicApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "/api"
  if (envUrl.startsWith("http")) {
    return envUrl.endsWith("/api") ? envUrl : `${envUrl.replace(/\/$/, "")}/api`
  }
  return envUrl
}

export const APP_NAME = "Agrocyms"
export const APP_TAGLINE = "One Platform. Every Farm. Smarter Agriculture."
export const APP_TITLE = "Farm Management Software for Modern Agriculture | Agrocyms"
export const APP_DESCRIPTION =
  "Farm management software for crops and livestock. Agrocyms tracks poultry, cattle, pigs, fields, feed, and team records in one workspace. Start a 90-day trial."
export const LOGO_PATH = "/agrocyms-logo.png"

export function getAppName(): string {
  return APP_NAME
}

export function getAppTagline(): string {
  return APP_TAGLINE
}

export function getAppTitle(): string {
  return APP_TITLE
}

export function getAppDescription(): string {
  return APP_DESCRIPTION
}

export function getLogoPath(): string {
  return LOGO_PATH
}

export function getTwitterHandle(): string {
  return process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@agrocyms"
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

export function getYandexSiteVerification(): string | undefined {
  return process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined
}

export function getPinterestSiteVerification(): string | undefined {
  return process.env.NEXT_PUBLIC_PINTEREST_VERIFICATION || undefined
}

export function getFacebookDomainVerification(): string | undefined {
  return process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION || undefined
}

export function getContactEmail(): string {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@agrocyms.com"
}

export function getRequestTimeoutMs(): number {
  const parsed = Number(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT_MS || "30000")
  if (!Number.isFinite(parsed) || parsed <= 0) return 30000
  return parsed
}

export const isDev = process.env.NODE_ENV === "development"
export const isProd = process.env.NODE_ENV === "production"
