import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config"

function parseAcceptLanguage(header: string | null): { tag: string; quality: number }[] {
  if (!header) return []
  return header
    .split(",")
    .map((part) => {
      const [rawTag, rawQuality] = part.trim().split(";")
      const tag = (rawTag || "").trim().toLowerCase()
      const quality = rawQuality?.trim().startsWith("q=") ? Number(rawQuality.trim().slice(2)) : 1
      return { tag, quality: Number.isFinite(quality) ? quality : 1 }
    })
    .filter((item) => item.tag)
    .sort((a, b) => b.quality - a.quality)
}

export function negotiateLocale(header: string | null): Locale {
  for (const { tag } of parseAcceptLanguage(header)) {
    if (isLocale(tag)) return tag
    const base = tag.split("-")[0]
    if (isLocale(base)) return base
    if (base === "zh") return "zh"
  }
  return defaultLocale
}

export function localeFromCookie(value: string | undefined): Locale | null {
  return isLocale(value) ? value : null
}

export { locales }
