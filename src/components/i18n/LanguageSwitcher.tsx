"use client"

import { useTransition } from "react"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { Globe } from "lucide-react"
import { locales, localeLabels, type Locale } from "@/i18n/config"
import { setUserLocale } from "@/i18n/locale"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Variant = "marketing" | "app" | "plain"

export function LanguageSwitcher({ variant = "app" }: { variant?: Variant }) {
  const locale = useLocale() as Locale
  const t = useTranslations("language")
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  function select(next: Locale) {
    if (next === locale) return
    startTransition(async () => {
      await setUserLocale(next)
      router.refresh()
    })
  }

  const triggerClass =
    variant === "marketing"
      ? "flex h-10 items-center gap-1.5 rounded-full px-2 text-[#1c241f] transition hover:bg-[#F3F4F2] sm:h-11 sm:px-3"
      : variant === "plain"
        ? "inline-flex items-center gap-2 rounded-full bg-[#F3F4F2] px-3 py-2 text-sm font-semibold text-[#1c241f] transition hover:bg-[#E7EAE6]"
        : "inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-accent"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(triggerClass, pending && "opacity-60")}
          aria-label={t("label")}
          title={t("label")}
          disabled={pending}
        >
          <Globe className="h-5 w-5 shrink-0" />
          {variant === "marketing" && (
            <span className="hidden text-xs font-semibold xl:inline">{localeLabels[locale]}</span>
          )}
          {variant === "plain" && <span>{localeLabels[locale]}</span>}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10.5rem]">
        {locales.map((code) => (
          <DropdownMenuItem
            key={code}
            onClick={() => select(code)}
            className={cn("cursor-pointer", code === locale && "font-semibold")}
          >
            {localeLabels[code]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
