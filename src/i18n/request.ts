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

const catalogs: Record<Locale, typeof en> = { ar, en, es, fr, hi, pt, sw, zh }

function loadMessages(locale: string) {
  const safe = isLocale(locale) ? locale : defaultLocale
  const base = catalogs[safe]
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
