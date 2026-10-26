export const locales = ["en", "es", "fr", "pt", "ar", "zh", "hi", "sw"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const rtlLocales: readonly Locale[] = ["ar"]

export const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  pt: "Português",
  ar: "العربية",
  zh: "中文",
  hi: "हिन्दी",
  sw: "Kiswahili",
}

export const LOCALE_COOKIE = "NEXT_LOCALE"

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale)
}

export function isRtl(locale: string): boolean {
  return rtlLocales.includes(locale as Locale)
}
