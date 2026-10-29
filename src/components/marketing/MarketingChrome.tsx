"use client"

import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { ArrowRight, Menu, Search } from "lucide-react"
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher"
import { SocialLinks } from "@/components/marketing/SocialLinks"
import { usePwaInstall } from "@/components/pwa/PwaProvider"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { MARKETING_NAV } from "@/i18n/content"
import { getAppName, getContactEmail, getLogoPath } from "@/lib/env"
import { searchPublicPages } from "@/lib/marketing"

export function MarketingChrome({
  children,
}: {
  children: React.ReactNode
  home?: boolean
}) {
  const router = useRouter()
  const t = useTranslations()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const searchRef = useRef<HTMLInputElement>(null)
  const appName = getAppName()
  const logoPath = getLogoPath()
  const { canInstall, promptInstall } = usePwaInstall()

  const results = useMemo(() => searchPublicPages(query).slice(0, 8), [query])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  function onSearch(event: FormEvent) {
    event.preventDefault()
    const term = query.trim()
    setSearchOpen(false)
    setQuery("")
    if (term) {
      router.push(`/search?q=${encodeURIComponent(term)}`)
      return
    }
    const first = results[0]
    if (first) router.push(first.href)
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#142018]" style={{ fontFamily: "var(--font-manrope), var(--font-inter), sans-serif" }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#173528] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t("common.skipToContent")}
      </a>

      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-2 px-4 sm:h-[84px] sm:gap-3 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <img src={logoPath} alt={`${appName} logo`} className="h-8 w-8 shrink-0 object-contain sm:h-10 sm:w-10 lg:h-11 lg:w-11" />
            <span className="truncate text-base font-extrabold tracking-tight text-[#173528] sm:text-lg lg:text-[22px]">{appName}</span>
          </Link>

          <nav aria-label="Primary" className="hidden min-w-0 items-center gap-1.5 lg:flex">
            {MARKETING_NAV.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="whitespace-nowrap rounded-full bg-[#F3F4F2] px-2.5 py-2 text-xs font-semibold text-[#1c241f] transition hover:bg-[#E7EAE6] xl:px-4 xl:py-2.5 xl:text-sm"
              >
                {t(`nav.${item.id}`)}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <LanguageSwitcher variant="marketing" />
            <div className="relative">
              <button
                type="button"
                aria-label={t("common.searchSite")}
                aria-expanded={searchOpen}
                onClick={() => {
                  setMenuOpen(false)
                  setSearchOpen((open) => !open)
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#1c241f] transition hover:bg-[#F3F4F2] sm:h-11 sm:w-11"
              >
                <Search className="h-5 w-5" />
              </button>
              {searchOpen && (
                <form
                  onSubmit={onSearch}
                  className="fixed start-4 end-4 top-[4.25rem] z-40 max-h-[min(70vh,28rem)] overflow-y-auto rounded-2xl border border-black/5 bg-white p-3 shadow-[0_16px_40px_rgba(20,32,24,0.12)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:absolute sm:start-auto sm:end-0 sm:top-14 sm:w-80"
                >
                  <input
                    ref={searchRef}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t("common.searchPages")}
                    className="w-full rounded-xl bg-[#F3F4F2] px-3 py-2 text-sm outline-none"
                  />
                  <ul className="mt-2">
                    {results.length === 0 && (
                      <li className="px-2 py-2 text-sm text-[#66756c]">{t("common.noSearchResults")}</li>
                    )}
                    {results.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          className="block rounded-xl px-2 py-2 text-sm font-medium hover:bg-[#F3F4F2]"
                          onClick={() => setSearchOpen(false)}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                    {query.trim() && (
                      <li>
                        <Link
                          href={`/search?q=${encodeURIComponent(query.trim())}`}
                          className="block rounded-xl px-2 py-2 text-sm font-semibold text-[#173528] hover:bg-[#F3F4F2]"
                          onClick={() => setSearchOpen(false)}
                        >
                          {t("common.searchAllPages")}
                        </Link>
                      </li>
                    )}
                  </ul>
                </form>
              )}
            </div>

            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 rounded-full bg-[#173528] py-1.5 ps-1.5 pe-1.5 text-sm font-semibold text-white lg:ps-5"
            >
              <span className="hidden lg:inline">{t("common.getStarted")}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#173528]">
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </span>
            </Link>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F2] sm:h-11 sm:w-11 lg:hidden"
              aria-label={t("common.openMenu")}
              onClick={() => {
                setSearchOpen(false)
                setMenuOpen(true)
              }}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <Sheet
        open={menuOpen}
        onOpenChange={(open) => {
          setMenuOpen(open)
          if (open) setSearchOpen(false)
        }}
      >
        <SheetContent
          side="left"
          overlayClassName="bg-[#142018]/35 backdrop-blur-md"
          className="flex w-[min(19rem,86vw)] flex-col border-0 p-0 sm:max-w-sm"
        >
          <div className="flex items-center gap-2 border-b border-[#E4E8E4] px-5 py-4 pe-14">
            <img src={logoPath} alt="" className="h-9 w-9 object-contain" />
            <SheetTitle className="text-lg font-extrabold tracking-tight text-[#173528]">
              {appName}
            </SheetTitle>
            <SheetDescription className="sr-only">{t("common.openMenu")}</SheetDescription>
          </div>
          <nav className="flex-1 overflow-y-auto p-4" aria-label="Primary">
            <div className="grid gap-2">
              {MARKETING_NAV.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="rounded-2xl bg-[#F3F4F2] px-4 py-3 text-start text-sm font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  {t(`nav.${item.id}`)}
                </Link>
              ))}
            </div>
          </nav>
          <div className="grid grid-cols-2 gap-2 border-t border-[#E4E8E4] p-4">
            <Link
              href="/login"
              className="rounded-2xl border border-[#E4E8E4] px-4 py-3 text-center text-sm font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              {t("common.signIn")}
            </Link>
            <Link
              href="/get-started"
              className="rounded-2xl bg-[#173528] px-4 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setMenuOpen(false)}
            >
              {t("common.getStarted")}
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      <div id="main-content">{children}</div>

      <footer className="px-4 pb-6 sm:px-6">
        <div className="mx-auto max-w-[1320px] overflow-hidden rounded-[28px] bg-[#173528] text-white sm:rounded-[32px]">
          <div className="grid grid-cols-2 gap-8 px-5 py-8 sm:gap-10 sm:px-10 sm:py-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:items-start">
            <div className="col-span-2 lg:col-span-1">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <img src={logoPath} alt={`${appName} logo`} className="h-11 w-11 object-contain" />
                <span className="text-[22px] font-extrabold tracking-tight">{appName}</span>
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
                {t("footer.blurb")}
              </p>
              <SocialLinks className="mt-5" />
              <a
                href={`mailto:${getContactEmail()}`}
                className="mt-4 block text-sm font-medium text-white/75 transition hover:text-white"
              >
                {getContactEmail()}
              </a>
              <Link
                href="/get-started"
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-white py-1.5 ps-5 pe-1.5 text-sm font-semibold text-[#173528]"
              >
                {t("common.getStarted")}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#173528] text-white">
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </span>
              </Link>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">{t("footer.explore")}</p>
              <ul className="mt-4 space-y-2">
                <li><Link href="/features" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">{t("nav.features")}</Link></li>
                <li><Link href="/solutions" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">{t("nav.solutions")}</Link></li>
                <li><Link href="/pricing" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">{t("nav.pricing")}</Link></li>
                <li><Link href="/resources" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">{t("footer.resources")}</Link></li>
                <li><Link href="/use-cases" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">{t("footer.useCases")}</Link></li>
                <li><Link href="/contact" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">{t("nav.contact")}</Link></li>
                <li><Link href="/about" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">{t("nav.about")}</Link></li>
                <li><Link href="/faq" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">{t("nav.faq")}</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">{t("footer.enterprises")}</p>
              <ul className="mt-4 space-y-2">
                <li><Link href="/features/crop-management" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">{t("footer.cropManagement")}</Link></li>
                <li><Link href="/features/livestock-management" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">{t("footer.livestock")}</Link></li>
                <li><Link href="/features/poultry" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">{t("footer.poultry")}</Link></li>
                <li><Link href="/features/cattle" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">{t("footer.cattle")}</Link></li>
                <li><Link href="/use-cases/feed-inventory" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">{t("footer.inventory")}</Link></li>
              </ul>
            </div>

          </div>

          <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-5 text-sm text-white/60 sm:px-10">
            <p>© {new Date().getFullYear()} {appName}</p>
            <div className="flex flex-wrap items-center justify-end gap-5">
              {canInstall && (
                <button type="button" onClick={() => void promptInstall()} className="transition hover:text-white">
                  {t("pwa.install")}
                </button>
              )}
              <Link href="/privacy" className="transition hover:text-white">{t("common.privacy")}</Link>
              <Link href="/terms" className="transition hover:text-white">{t("common.terms")}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
