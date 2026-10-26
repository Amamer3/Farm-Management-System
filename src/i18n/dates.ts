import type { Locale as DateLocale } from "date-fns"
import { ar, enUS, es, fr, hi, pt, zhCN } from "date-fns/locale"
import type { Locale } from "@/i18n/config"

export function dateFnsLocale(locale: string): DateLocale {
  switch (locale as Locale) {
    case "es":
      return es
    case "fr":
      return fr
    case "pt":
      return pt
    case "ar":
      return ar
    case "zh":
      return zhCN
    case "hi":
      return hi
    default:
      return enUS
  }
}
