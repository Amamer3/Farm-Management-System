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
  { path: "/", changeFrequency: "weekly", priority: 1, images: ["/landing/farmer.png", "/landing/field.png"] },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/features", changeFrequency: "weekly", priority: 0.9 },
  { path: "/features/poultry", changeFrequency: "monthly", priority: 0.8 },
  { path: "/features/goats-sheep", changeFrequency: "monthly", priority: 0.8 },
  { path: "/features/cattle", changeFrequency: "monthly", priority: 0.8 },
  { path: "/features/pigs", changeFrequency: "monthly", priority: 0.8 },
  { path: "/features/crops", changeFrequency: "monthly", priority: 0.8 },
  { path: "/use-cases", changeFrequency: "monthly", priority: 0.8 },
  { path: "/use-cases/mixed-farm", changeFrequency: "monthly", priority: 0.8 },
  { path: "/use-cases/egg-collection", changeFrequency: "monthly", priority: 0.8 },
  { path: "/use-cases/feed-inventory", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.8 },
  { path: "/get-started", changeFrequency: "monthly", priority: 0.9 },
  { path: "/login", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
] as const

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl()
  if (!path || path === "/") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export function logoAbsoluteUrl(): string {
  return absoluteUrl(getLogoPath())
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
    },
    twitter: {
      title: socialTitle,
      description,
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
  const logo = getLogoPath()
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
      "poultry farm records",
      "egg collection tracking",
      "livestock management",
      "cattle herd records",
      "goat and sheep farm software",
      "pig farm management",
      "crop farm records",
      "mixed farm dashboard",
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
      icon: logo,
      shortcut: logo,
      apple: logo,
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
    },
    twitter: {
      card: "summary_large_image",
      site: twitter,
      creator: twitter,
      title: appTitle,
      description,
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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${getSiteUrl()}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function softwareJsonLd(): JsonLd {
  const name = getAppName()
  return {
    "@type": "SoftwareApplication",
    "@id": softwareId(),
    name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Farm Management Software",
    operatingSystem: "Web",
    url: getSiteUrl(),
    description: getAppDescription(),
    isAccessibleForFree: true,
    browserRequirements: "Requires JavaScript and a modern browser.",
    audience: {
      "@type": "Audience",
      audienceType: "Farm owners and farm staff",
    },
    provider: { "@id": organizationId() },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Poultry and egg collection records",
      "Goat, sheep, cattle, and pig herd events",
      "Feed and medicine inventory",
      "Crop and field records",
      "Team logins for the same farm",
      "Reports and production statistics",
    ],
    screenshot: absoluteUrl("/landing/farmer.png"),
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
    name: `Set up a farm on ${getAppName()}`,
    description: "Name the farm, choose enterprises and crops, then create the first account.",
    totalTime: "PT5M",
    url: absoluteUrl("/get-started"),
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Choose enterprises",
        text: "Pick poultry, goats and sheep, cattle, pigs, crops, or a mix.",
        url: absoluteUrl("/get-started"),
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Add crops",
        text: "Select the crops this farm grows, or record that it does not grow crops.",
        url: absoluteUrl("/get-started"),
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Name the farm",
        text: "Enter the farm name and location so records stay attached to the right place.",
        url: absoluteUrl("/get-started"),
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Create the account",
        text: "Add the owner account. The dashboard opens already pointed at that farm.",
        url: absoluteUrl("/get-started"),
      },
    ],
  }
}
