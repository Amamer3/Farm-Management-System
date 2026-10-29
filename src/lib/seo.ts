import type { Metadata } from "next"
import {
  getAppDescription,
  getAppName,
  getAppTitle,
  getBingSiteVerification,
  getGoogleSiteVerification,
  getLogoPath,
  getSiteLocale,
  getSiteUrl,
  getTwitterHandle,
  getXUrl,
  getInstagramUrl,
  getLinkedInUrl,
  getFacebookUrl,
} from "@/lib/env"

export const PRIVATE_PATHS = [
  "/login",
  "/search",
  "/birds",
  "/eggs",
  "/feed",
  "/medicine",
  "/reports",
  "/statistics",
  "/users",
  "/profile",
  "/farm",
  "/cattle",
  "/pigs",
  "/ruminants",
] as const

export const SITE_CONTENT_UPDATED = new Date("2026-10-26")

export const PUBLIC_ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1, images: ["/landing/farmer.jpg", "/landing/field.jpg"] },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/features", changeFrequency: "weekly", priority: 0.9 },
  { path: "/features/crop-management", changeFrequency: "monthly", priority: 0.9 },
  { path: "/features/livestock-management", changeFrequency: "monthly", priority: 0.9 },
  { path: "/features/poultry", changeFrequency: "monthly", priority: 0.8 },
  { path: "/features/goats-sheep", changeFrequency: "monthly", priority: 0.8 },
  { path: "/features/cattle", changeFrequency: "monthly", priority: 0.8 },
  { path: "/features/pigs", changeFrequency: "monthly", priority: 0.8 },
  { path: "/features/crops", changeFrequency: "monthly", priority: 0.8 },
  { path: "/solutions", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pricing", changeFrequency: "weekly", priority: 0.9 },
  { path: "/use-cases", changeFrequency: "monthly", priority: 0.7 },
  { path: "/use-cases/mixed-farm", changeFrequency: "monthly", priority: 0.7 },
  { path: "/use-cases/egg-collection", changeFrequency: "monthly", priority: 0.7 },
  { path: "/use-cases/feed-inventory", changeFrequency: "monthly", priority: 0.7 },
  { path: "/resources", changeFrequency: "weekly", priority: 0.7 },
  { path: "/resources/what-is-farm-management-software", changeFrequency: "monthly", priority: 0.6 },
  { path: "/resources/manage-a-farm-business-more-efficiently", changeFrequency: "monthly", priority: 0.6 },
  { path: "/resources/track-farm-expenses-and-profitability", changeFrequency: "monthly", priority: 0.6 },
  { path: "/resources/farm-inventory-management-guide", changeFrequency: "monthly", priority: 0.6 },
  { path: "/resources/essential-farm-records", changeFrequency: "monthly", priority: 0.6 },
  { path: "/resources/digital-agriculture-modern-farming", changeFrequency: "monthly", priority: 0.6 },
  { path: "/resources/organize-crop-production-records", changeFrequency: "monthly", priority: 0.6 },
  { path: "/resources/livestock-record-keeping-guide", changeFrequency: "monthly", priority: 0.6 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/get-started", changeFrequency: "monthly", priority: 0.9 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
] as const

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl()
  if (!path || path === "/") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export const FAVICON_PATH = "/favicon_io/favicon.ico"
export const ICON_16_PATH = "/favicon_io/favicon-16x16.png"
export const ICON_32_PATH = "/favicon_io/favicon-32x32.png"
export const ICON_192_PATH = "/favicon_io/android-chrome-192x192.png"
export const ICON_512_PATH = "/favicon_io/android-chrome-512x512.png"
export const APPLE_ICON_PATH = "/favicon_io/apple-touch-icon.png"

export function logoAbsoluteUrl(): string {
  return absoluteUrl(getLogoPath())
}

export function defaultSocialImage() {
  return {
    url: absoluteUrl("/opengraph-image"),
    width: 1200,
    height: 630,
    alt: `${getAppName()} farm management software`,
  }
}

export function twitterProfileUrl(): string {
  return getXUrl()
}

type PageMetaInput = {
  title: string
  description: string
  path: string
  keywords?: string[]
  index?: boolean
  follow?: boolean
  absoluteTitle?: boolean
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  index = true,
  follow = true,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path)
  const appName = getAppName()
  const locale = getSiteLocale()
  const socialTitle = absoluteTitle ? title : `${title} | ${appName}`

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        [locale]: url,
        "x-default": url,
      },
    },
    robots: {
      index,
      follow,
      googleBot: {
        index,
        follow,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      type: "website",
      locale: locale === "en" ? "en_US" : locale,
      siteName: appName,
      images: [defaultSocialImage()],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [defaultSocialImage().url],
    },
  }
}

export function createPrivateMetadata(title: string, path: string): Metadata {
  return createPageMetadata({
    title,
    description: `${title} in your ${getAppName()} farm workspace.`,
    path,
    index: false,
    follow: false,
  })
}

export function rootMetadata(): Metadata {
  const appName = getAppName()
  const appTitle = getAppTitle()
  const description = getAppDescription()
  const locale = getSiteLocale()
  const siteUrl = getSiteUrl()
  const twitter = getTwitterHandle()
  const google = getGoogleSiteVerification()
  const bing = getBingSiteVerification()

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: appTitle,
      template: `%s | ${appName}`,
    },
    description,
    applicationName: appName,
    authors: [{ name: appName, url: siteUrl }],
    creator: appName,
    publisher: appName,
    category: "agriculture",
    keywords: [
      "farm management software",
      "farm management system",
      "agriculture management software",
      "farm operations software",
      "digital farm management",
      "crop management software",
      "livestock management software",
      appName,
    ],
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: FAVICON_PATH, sizes: "48x48" },
        { url: ICON_16_PATH, sizes: "16x16", type: "image/png" },
        { url: ICON_32_PATH, sizes: "32x32", type: "image/png" },
        { url: ICON_192_PATH, sizes: "192x192", type: "image/png" },
        { url: ICON_512_PATH, sizes: "512x512", type: "image/png" },
      ],
      shortcut: FAVICON_PATH,
      apple: [{ url: APPLE_ICON_PATH, sizes: "180x180" }],
    },
    manifest: "/manifest.webmanifest",
    appleWebApp: {
      capable: true,
      title: appName,
      statusBarStyle: "default",
    },
    alternates: {
      canonical: siteUrl,
      languages: {
        [locale]: siteUrl,
        "x-default": siteUrl,
      },
      types: {
        "text/plain": absoluteUrl("/llms.txt"),
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : locale,
      url: siteUrl,
      siteName: appName,
      title: appTitle,
      description,
      images: [defaultSocialImage()],
    },
    twitter: {
      card: "summary_large_image",
      site: twitter,
      creator: twitter,
      title: appTitle,
      description,
      images: [defaultSocialImage().url],
    },
    verification: {
      ...(google ? { google } : {}),
      ...(bing ? { other: { "msvalidate.01": bing } } : {}),
    },
  }
}

type JsonLd = Record<string, unknown>

export function organizationId(): string {
  return `${getSiteUrl()}/#organization`
}

export function websiteId(): string {
  return `${getSiteUrl()}/#website`
}

export function softwareId(): string {
  return `${getSiteUrl()}/#software`
}

function logoImageObject(): JsonLd {
  return {
    "@type": "ImageObject",
    url: logoAbsoluteUrl(),
    caption: `${getAppName()} logo`,
  }
}

export function organizationJsonLd(): JsonLd {
  const name = getAppName()
  return {
    "@type": "Organization",
    "@id": organizationId(),
    name,
    alternateName: [`${name} farm management software`, `${name} farm records`],
    url: getSiteUrl(),
    logo: logoImageObject(),
    image: logoImageObject(),
    description: getAppDescription(),
    brand: {
      "@type": "Brand",
      name,
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "Farm management software",
      "Poultry and egg collection",
      "Livestock records",
      "Crop farm records",
    ],
    sameAs: [getXUrl(), getInstagramUrl(), getLinkedInUrl(), getFacebookUrl()],
  }
}

export function websiteJsonLd(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": websiteId(),
    name: getAppName(),
    url: getSiteUrl(),
    description: getAppDescription(),
    inLanguage: getSiteLocale(),
    publisher: { "@id": organizationId() },
  }
}

export function softwareJsonLd(): JsonLd {
  const name = getAppName()
  return {
    "@type": "SoftwareApplication",
    "@id": softwareId(),
    name: `${name} Farm Management Software`,
    alternateName: name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Farm Management Software",
    operatingSystem: "Web",
    url: getSiteUrl(),
    description: getAppDescription(),
    browserRequirements: "Requires JavaScript and a modern browser.",
    audience: {
      "@type": "Audience",
      audienceType: "Farm owners and farm staff",
    },
    provider: { "@id": organizationId() },
    offers: [
      {
        "@type": "Offer",
        name: "30-day trial",
        price: "0",
        priceCurrency: "USD",
        description: "30 days of full farm workspace access with no card required. After the trial, records stay readable and exportable until you subscribe.",
        url: absoluteUrl("/get-started"),
      },
      {
        "@type": "Offer",
        url: absoluteUrl("/pricing"),
        availability: "https://schema.org/OnlineOnly",
      },
    ],
    featureList: [
      "Poultry and egg collection records",
      "Goat, sheep, cattle, and pig herd events",
      "Feed and medicine inventory",
      "Crop and field records",
      "Team logins for the same farm",
      "Reports and production statistics",
    ],
    screenshot: absoluteUrl("/landing/farmer.jpg"),
    softwareHelp: {
      "@type": "WebPage",
      url: absoluteUrl("/faq"),
    },
  }
}

export function siteGraphJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), websiteJsonLd(), softwareJsonLd()],
  }
}

export function webPageJsonLd({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: getSiteLocale(),
    isPartOf: { "@id": websiteId() },
    about: { "@id": softwareId() },
    dateModified: SITE_CONTENT_UPDATED.toISOString(),
  }
}

export function itemListJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqJsonLd(faqs: { question: string; answer: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function howToJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Start managing a farm on ${getAppName()}`,
    description: "Create an account, set up the farm, then manage operations in one workspace.",
    totalTime: "PT5M",
    url: absoluteUrl("/get-started"),
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Create your account",
        text: "Register for Agrocyms and complete the farm setup process.",
        url: absoluteUrl("/get-started"),
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Set up your farm",
        text: "Name the farm, choose enterprises and crops, and add the first owner account.",
        url: absoluteUrl("/get-started"),
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Manage your operations",
        text: "Use the workspace to organize farming activities and keep records attached to this farm.",
        url: absoluteUrl("/get-started"),
      },
    ],
  }
}
