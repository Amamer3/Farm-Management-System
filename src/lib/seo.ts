import type { Metadata } from "next"
import {
  getAppDescription,
  getAppName,
  getAppTagline,
  getAppTitle,
  getBingSiteVerification,
  getContactEmail,
  getFacebookDomainVerification,
  getFacebookUrl,
  getGoogleSiteVerification,
  getInstagramUrl,
  getLinkedInUrl,
  getLogoPath,
  getPinterestSiteVerification,
  getSiteLocale,
  getSiteUrl,
  getTwitterHandle,
  getXUrl,
  getYandexSiteVerification,
} from "@/lib/env"
import { locales } from "@/i18n/config"
import { appleStartupImages } from "@/lib/pwa"
import { PRICING } from "@/lib/siteContent"

export const WORKSPACE_PATHS = [
  "/dashboard",
  "/birds",
  "/eggs",
  "/feed",
  "/medicine",
  "/crops",
  "/reports",
  "/statistics",
  "/users",
  "/profile",
  "/farm",
  "/cattle",
  "/pigs",
  "/ruminants",
] as const

export const PRIVATE_PATHS = ["/login", "/forgot-password", "/search", ...WORKSPACE_PATHS] as const

export const ROBOTS_DISALLOW = ["/login", "/forgot-password", ...WORKSPACE_PATHS] as const

export const SITE_CONTENT_UPDATED = new Date("2026-10-29")
export const SITE_CONTENT_PUBLISHED = new Date("2026-01-15")
export const RSS_PATH = "/feed.xml"
export const LLMS_PATH = "/llms.txt"
export const LLMS_FULL_PATH = "/llms-full.txt"

export const PUBLIC_ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1, images: ["/landing/farmer.jpg", "/landing/field.jpg", "/landing/produce.jpg"] },
  { path: "/about", changeFrequency: "monthly", priority: 0.8, images: ["/farm/farmer.jpg"] },
  { path: "/features", changeFrequency: "weekly", priority: 0.9, images: ["/farm/farmer.jpg", "/farm/poultry.jpg"] },
  { path: "/features/crop-management", changeFrequency: "monthly", priority: 0.9, images: ["/landing/field.jpg"] },
  { path: "/features/livestock-management", changeFrequency: "monthly", priority: 0.9, images: ["/farm/cattle.jpg", "/farm/goats.jpg"] },
  { path: "/features/poultry", changeFrequency: "monthly", priority: 0.8, images: ["/farm/poultry.jpg"] },
  { path: "/features/goats-sheep", changeFrequency: "monthly", priority: 0.8, images: ["/farm/goats.jpg"] },
  { path: "/features/cattle", changeFrequency: "monthly", priority: 0.8, images: ["/farm/cattle.jpg"] },
  { path: "/features/pigs", changeFrequency: "monthly", priority: 0.8, images: ["/farm/pigs.jpg"] },
  { path: "/features/crops", changeFrequency: "monthly", priority: 0.8, images: ["/landing/field.jpg"] },
  { path: "/solutions", changeFrequency: "monthly", priority: 0.8, images: ["/farm/mixed.jpg"] },
  { path: "/pricing", changeFrequency: "weekly", priority: 0.9, images: ["/farm/farmer.jpg"] },
  { path: "/use-cases", changeFrequency: "monthly", priority: 0.7, images: ["/farm/mixed.jpg"] },
  { path: "/use-cases/mixed-farm", changeFrequency: "monthly", priority: 0.7, images: ["/farm/mixed.jpg"] },
  { path: "/use-cases/egg-collection", changeFrequency: "monthly", priority: 0.7, images: ["/farm/poultry.jpg"] },
  { path: "/use-cases/feed-inventory", changeFrequency: "monthly", priority: 0.7, images: ["/landing/produce.jpg"] },
  { path: "/resources", changeFrequency: "weekly", priority: 0.8, images: ["/farm/mixed.jpg"] },
  { path: "/resources/what-is-farm-management-software", changeFrequency: "monthly", priority: 0.7, images: ["/farm/mixed.jpg"] },
  { path: "/resources/manage-a-farm-business-more-efficiently", changeFrequency: "monthly", priority: 0.7, images: ["/farm/farmer.jpg"] },
  { path: "/resources/track-farm-expenses-and-profitability", changeFrequency: "monthly", priority: 0.7, images: ["/farm/farmer.jpg"] },
  { path: "/resources/farm-inventory-management-guide", changeFrequency: "monthly", priority: 0.7, images: ["/landing/produce.jpg"] },
  { path: "/resources/essential-farm-records", changeFrequency: "monthly", priority: 0.7, images: ["/landing/produce.jpg"] },
  { path: "/resources/digital-agriculture-modern-farming", changeFrequency: "monthly", priority: 0.7, images: ["/farm/farmer.jpg"] },
  { path: "/resources/organize-crop-production-records", changeFrequency: "monthly", priority: 0.7, images: ["/landing/field.jpg"] },
  { path: "/resources/livestock-record-keeping-guide", changeFrequency: "monthly", priority: 0.7, images: ["/farm/cattle.jpg"] },
  { path: "/faq", changeFrequency: "monthly", priority: 0.8, images: ["/farm/mixed.jpg"] },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/get-started", changeFrequency: "monthly", priority: 0.9, images: ["/farm/farmer.jpg"] },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
] as const

const FALLBACK_OG_PATHS = new Set(["/privacy", "/terms", "/login", "/search"])

export const DEFAULT_KEYWORDS = [
  "farm management software",
  "farm management system",
  "agriculture management software",
  "farm operations software",
  "digital farm management",
  "crop management software",
  "livestock management software",
  "poultry farm software",
  "cattle herd management",
  "farm inventory software",
  "egg collection tracking",
  "mixed farm software",
  "Agrocyms",
]

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl()
  if (!path || path === "/") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export const FAVICON_PATH = "/favicon_io/favicon.ico"
export const ICON_16_PATH = "/favicon_io/favicon-16x16.png"
export const ICON_32_PATH = "/favicon_io/favicon-32x32.png"
export const ICON_192_PATH = "/icons/icon-192.png"
export const ICON_512_PATH = "/icons/icon-512.png"
export const APPLE_ICON_PATH = "/icons/apple-touch-icon.png"

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

export function socialImageForPath(path: string, alt?: string) {
  if (FALLBACK_OG_PATHS.has(path)) {
    return { ...defaultSocialImage(), alt: alt || defaultSocialImage().alt }
  }
  const ogPath = path === "/" ? "/opengraph-image" : `${path}/opengraph-image`
  return {
    url: absoluteUrl(ogPath),
    width: 1200,
    height: 630,
    alt: alt || `${getAppName()} farm management software`,
  }
}

export function twitterProfileUrl(): string {
  return getXUrl()
}

export function headingId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function openGraphLocale(locale: string): string {
  const map: Record<string, string> = {
    en: "en_US",
    es: "es_ES",
    fr: "fr_FR",
    pt: "pt_BR",
    ar: "ar_SA",
    zh: "zh_CN",
    hi: "hi_IN",
    sw: "sw_TZ",
  }
  return map[locale] || (locale === "en" ? "en_US" : locale)
}

type PageMetaInput = {
  title: string
  description: string
  path: string
  keywords?: string[]
  index?: boolean
  follow?: boolean
  absoluteTitle?: boolean
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
  imageAlt?: string
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  index = true,
  follow = true,
  absoluteTitle = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  imageAlt,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path)
  const appName = getAppName()
  const locale = getSiteLocale()
  const socialTitle = absoluteTitle ? title : `${title} | ${appName}`
  const image = socialImageForPath(path, imageAlt)
  const twitter = getTwitterHandle()

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        "x-default": url,
      },
      types: {
        "application/rss+xml": absoluteUrl(RSS_PATH),
        "text/plain": absoluteUrl(LLMS_PATH),
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
      type,
      locale: openGraphLocale(locale),
      siteName: appName,
      images: [image],
      ...(type === "article"
        ? {
            publishedTime: publishedTime || SITE_CONTENT_PUBLISHED.toISOString(),
            modifiedTime: modifiedTime || SITE_CONTENT_UPDATED.toISOString(),
            authors: authors || [appName],
            section,
            tags: keywords,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: twitter,
      creator: twitter,
      title: socialTitle,
      description,
      images: [image.url],
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
  const yandex = getYandexSiteVerification()
  const pinterest = getPinterestSiteVerification()
  const facebook = getFacebookDomainVerification()
  const otherVerification = {
    ...(bing ? { "msvalidate.01": bing } : {}),
    ...(pinterest ? { "p:domain_verify": pinterest } : {}),
    ...(facebook ? { "facebook-domain-verification": facebook } : {}),
  }

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
    keywords: DEFAULT_KEYWORDS,
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
      apple: [
        { url: APPLE_ICON_PATH, sizes: "180x180" },
        { url: "/icons/apple-touch-icon-167.png", sizes: "167x167" },
        { url: "/icons/apple-touch-icon-152.png", sizes: "152x152" },
      ],
      other: [
        { rel: "mask-icon", url: "/icons/safari-pinned-tab.svg", color: "#173528" },
      ],
    },
    manifest: "/manifest.webmanifest",
    appleWebApp: {
      capable: true,
      title: appName,
      statusBarStyle: "black-translucent",
      startupImage: appleStartupImages(),
    },
    other: {
      "apple-mobile-web-app-capable": "yes",
      "msapplication-TileColor": "#173528",
      "msapplication-config": "/browserconfig.xml",
    },
    alternates: {
      canonical: siteUrl,
      languages: {
        en: siteUrl,
        "x-default": siteUrl,
      },
      types: {
        "application/rss+xml": absoluteUrl(RSS_PATH),
        "text/plain": absoluteUrl(LLMS_PATH),
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
      locale: openGraphLocale(locale),
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
      ...(yandex ? { yandex } : {}),
      ...(Object.keys(otherVerification).length ? { other: otherVerification } : {}),
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

function screenshotImageObject(): JsonLd {
  return {
    "@type": "ImageObject",
    url: absoluteUrl("/landing/farmer.jpg"),
    caption: `${getAppName()} farm workspace`,
  }
}

export function organizationJsonLd(): JsonLd {
  const name = getAppName()
  return {
    "@type": "Organization",
    "@id": organizationId(),
    name,
    legalName: name,
    alternateName: [`${name} farm management software`, `${name} farm records`],
    url: getSiteUrl(),
    logo: logoImageObject(),
    image: logoImageObject(),
    description: getAppDescription(),
    slogan: getAppTagline(),
    email: getContactEmail(),
    brand: {
      "@type": "Brand",
      name,
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    knowsAbout: [
      "Farm management software",
      "Poultry and egg collection",
      "Livestock records",
      "Crop farm records",
      "Farm inventory management",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: getContactEmail(),
        url: absoluteUrl("/contact"),
        availableLanguage: [...locales],
      },
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
    inLanguage: "en",
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

function trialEndDate(): string {
  const date = new Date()
  date.setFullYear(date.getFullYear() + 1)
  date.setMonth(11, 31)
  return date.toISOString().slice(0, 10)
}

export function softwareJsonLd(): JsonLd {
  const name = getAppName()
  return {
    "@type": "SoftwareApplication",
    "@id": softwareId(),
    name: `${name} Farm Management Software`,
    alternateName: [name, `${name} farm management system`],
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Farm Management Software",
    operatingSystem: "Android, iOS, iPadOS, Windows, macOS",
    url: getSiteUrl(),
    description: getAppDescription(),
    inLanguage: "en",
    browserRequirements: "Requires JavaScript and a modern browser.",
    countriesSupported: "Worldwide",
    isAccessibleForFree: true,
    audience: {
      "@type": "Audience",
      audienceType: "Farm owners and farm staff",
    },
    provider: { "@id": organizationId() },
    publisher: { "@id": organizationId() },
    offers: [
      {
        "@type": "Offer",
        name: "90-day trial",
        price: "0",
        priceCurrency: "USD",
        priceValidUntil: trialEndDate(),
        availability: "https://schema.org/InStock",
        description:
          "90 days of full farm workspace access with no card required. After the trial, records stay readable and exportable until you subscribe.",
        url: absoluteUrl("/get-started"),
      },
      {
        "@type": "Offer",
        name: "Paid subscription",
        url: absoluteUrl("/pricing"),
        availability: "https://schema.org/OnlineOnly",
        priceCurrency: "USD",
        description: "Paid plans after the 90-day trial. Price is confirmed when you subscribe.",
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
    screenshot: screenshotImageObject(),
    image: screenshotImageObject(),
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

export function pageGraphJsonLd(nodes: JsonLd[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.map((node) => {
      const rest = { ...node }
      delete rest["@context"]
      return rest
    }),
  }
}

export type WebPageSchemaType =
  | "WebPage"
  | "AboutPage"
  | "ContactPage"
  | "CollectionPage"
  | "FAQPage"
  | "ItemPage"
  | "SearchResultsPage"

export function webPageJsonLd({
  name,
  description,
  path,
  type = "WebPage",
  image,
  datePublished,
  dateModified,
}: {
  name: string
  description: string
  path: string
  type?: WebPageSchemaType
  image?: string
  datePublished?: string
  dateModified?: string
}): JsonLd {
  const url = absoluteUrl(path)
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": websiteId() },
    about: { "@id": softwareId() },
    publisher: { "@id": organizationId() },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    primaryImageOfPage: image
      ? {
          "@type": "ImageObject",
          url: absoluteUrl(image),
        }
      : undefined,
    datePublished: datePublished || SITE_CONTENT_PUBLISHED.toISOString(),
    dateModified: dateModified || SITE_CONTENT_UPDATED.toISOString(),
  }
}

export function itemListJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  const current = items[items.length - 1]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(current?.path || "/")}#breadcrumb`,
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

export function articleJsonLd({
  title,
  description,
  path,
  keywords,
  section,
  wordCount,
  image,
}: {
  title: string
  description: string
  path: string
  keywords?: string[]
  section?: string
  wordCount?: number
  image?: string
}): JsonLd {
  const url = absoluteUrl(path)
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    inLanguage: "en",
    datePublished: SITE_CONTENT_PUBLISHED.toISOString(),
    dateModified: SITE_CONTENT_UPDATED.toISOString(),
    author: { "@id": organizationId() },
    publisher: { "@id": organizationId() },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    image: image ? absoluteUrl(image) : socialImageForPath(path).url,
    keywords: keywords?.join(", "),
    articleSection: section,
    wordCount,
    isAccessibleForFree: true,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2"],
    },
  }
}

export function offerCatalogJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${getAppName()} farm management software plans`,
    url: absoluteUrl("/pricing"),
    itemListElement: PRICING.plans.map((plan, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        name: plan.name,
        description: plan.body,
        url: absoluteUrl(plan.href),
        availability: "https://schema.org/OnlineOnly",
        priceCurrency: "USD",
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
    image: socialImageForPath("/get-started").url,
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Create your account",
        text: "Register for Agrocyms and complete the farm setup process. The first 90 days are a full trial with no card required.",
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
