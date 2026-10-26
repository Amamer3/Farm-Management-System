import { getRequestConfig } from "next-intl/server"
import { cookies, headers } from "next/headers"
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/i18n/config"
import { negotiateLocale } from "@/i18n/negotiate"

export default getRequestConfig(async () => {
  const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value
  const locale = isLocale(cookieLocale)
    ? cookieLocale
    : negotiateLocale((await headers()).get("accept-language"))

  return {
    locale: locale || defaultLocale,
    messages: (await import(`../messages/${locale || defaultLocale}.json`)).default,
  }
})
