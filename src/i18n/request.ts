import { getRequestConfig } from "next-intl/server"
import { cookies, headers } from "next/headers"
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "@/i18n/config"
import { negotiateLocale } from "@/i18n/negotiate"
import { isSearchCrawler } from "@/lib/crawlers"
import { pwaFaq, pwaMessages } from "@/i18n/pwaCopy"
import ar from "../messages/ar.json"
import en from "../messages/en.json"
import es from "../messages/es.json"
import fr from "../messages/fr.json"
import hi from "../messages/hi.json"
import pt from "../messages/pt.json"
import sw from "../messages/sw.json"
import zh from "../messages/zh.json"

const catalogs = { ar, en, es, fr, hi, pt, sw, zh } as Record<Locale, typeof en>

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value)
}

function deepMerge<T>(base: T, overlay: T): T {
  if (!isPlainObject(base) || !isPlainObject(overlay)) return overlay
  const out: Record<string, unknown> = { ...base }
  for (const [key, value] of Object.entries(overlay)) {
    const current = out[key]
    out[key] = isPlainObject(current) && isPlainObject(value) ? deepMerge(current, value) : value
  }
  return out as T
}

function loadMessages(locale: string) {
  const safe = isLocale(locale) ? locale : defaultLocale
  const base = safe === defaultLocale ? en : deepMerge(en, catalogs[safe])
  return {
    ...base,
    pwa: pwaMessages[safe],
    faq: {
      ...base.faq,
      items: {
        ...base.faq.items,
        install: pwaFaq[safe],
      },
    },
  }
}

export default getRequestConfig(async () => {
  const requestHeaders = await headers()
  if (isSearchCrawler(requestHeaders.get("user-agent"))) {
    return {
      locale: defaultLocale,
      messages: loadMessages(defaultLocale),
    }
  }

  const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value
  const locale = isLocale(cookieLocale)
    ? cookieLocale
    : negotiateLocale(requestHeaders.get("accept-language"))

  return {
    locale: locale || defaultLocale,
    messages: loadMessages(locale || defaultLocale),
  }
})
