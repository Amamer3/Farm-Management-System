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

export const PUBLIC_ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/features", changeFrequency: "weekly", priority: 0.9 },
  { path: "/features/poultry", changeFrequency: "monthly", priority: 0.8 },
  { path: "/features/goats-sheep", changeFrequency: "monthly", priority: 0.8 },
  { path: "/features/cattle", changeFrequency: "monthly", priority: 0.8 },
  { path: "/features/pigs", changeFrequency: "monthly", priority: 0.8 },
  { path: "/features/crops", changeFrequency: "monthly", priority: 0.8 },
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
  return `https://twitter.com/${getTwitterHandle().replace(/^@/, "")}`
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
  const socialTitle = absoluteTitle ? title : `${title} | ${appName}`

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: url,
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
    alternates: {
      canonical: siteUrl,
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

export function organizationJsonLd(): JsonLd {
  const name = getAppName()
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: getSiteUrl(),
    logo: logoAbsoluteUrl(),
    description: getAppDescription(),
    sameAs: [twitterProfileUrl()],
  }
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: getAppName(),
    url: getSiteUrl(),
    description: getAppDescription(),
    inLanguage: getSiteLocale(),
    publisher: {
      "@type": "Organization",
      name: getAppName(),
      logo: logoAbsoluteUrl(),
    },
  }
}

export function softwareJsonLd(): JsonLd {
  const name = getAppName()
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Farm Management Software",
    operatingSystem: "Web",
    url: getSiteUrl(),
    description: getAppDescription(),
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
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Choose enterprises",
        text: "Pick poultry, goats and sheep, cattle, pigs, crops, or a mix.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Add crops",
        text: "Select the crops this farm grows, or record that it does not grow crops.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Name the farm",
        text: "Enter the farm name and location so records stay attached to the right place.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Create the account",
        text: "Add the owner account. The dashboard opens already pointed at that farm.",
      },
    ],
  }
}
