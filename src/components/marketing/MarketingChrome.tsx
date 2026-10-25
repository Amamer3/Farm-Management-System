"use client"

import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Menu, Search, X } from "lucide-react"
import { getAppName, getLogoPath } from "@/lib/env"

const homeNav = [
  { id: "about", label: "About us", href: "/about" },
  { id: "product", label: "Product", href: "/features" },
  { id: "why", label: "Why Choose us", href: "/#why" },
  { id: "faq", label: "FAQ", href: "/faq" },
]

const searchItems = [
  ...homeNav.map((item) => ({ id: item.id, label: item.label, href: item.href })),
  { id: "login", label: "Log in", href: "/login" },
  { id: "start", label: "Get started", href: "/get-started" },
  { id: "poultry", label: "Poultry", href: "/features/poultry" },
  { id: "goats", label: "Goats & sheep", href: "/features/goats-sheep" },
  { id: "cattle", label: "Cattle", href: "/features/cattle" },
  { id: "pigs", label: "Pigs", href: "/features/pigs" },
  { id: "crops", label: "Crops", href: "/features/crops" },
  { id: "privacy", label: "Privacy", href: "/privacy" },
  { id: "terms", label: "Terms", href: "/terms" },
]

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function MarketingChrome({
  children,
  home = false,
}: {
  children: React.ReactNode
  home?: boolean
}) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const searchRef = useRef<HTMLInputElement>(null)
  const appName = getAppName()
  const logoPath = getLogoPath()

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return searchItems
    return searchItems.filter((item) => item.label.toLowerCase().includes(term))
  }, [query])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  function onNav(id: string, href: string) {
    setMenuOpen(false)
    if (home && document.getElementById(id)) {
      scrollToSection(id)
      return
    }
    if (href.startsWith("/#") && pathname === "/") {
      scrollToSection(href.slice(2))
    }
  }

  function onSearch(event: FormEvent) {
    event.preventDefault()
    const first = results[0]
    if (!first) return
    setSearchOpen(false)
    setQuery("")
    if (home && document.getElementById(first.id)) {
      scrollToSection(first.id)
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#142018]" style={{ fontFamily: "var(--font-manrope), var(--font-inter), sans-serif" }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#173528] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-2 px-4 sm:h-[84px] sm:gap-4 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <img src={logoPath} alt={`${appName} logo`} className="h-8 w-8 shrink-0 object-contain sm:h-11 sm:w-11" />
            <span className="text-base font-extrabold tracking-tight text-[#173528] sm:text-[22px]">{appName}</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-2 lg:flex">
            {homeNav.map((item) =>
              home && item.id !== "faq" ? (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNav(item.id, item.href)}
                  className="rounded-full bg-[#F3F4F2] px-5 py-2.5 text-sm font-semibold text-[#1c241f] transition hover:bg-[#E7EAE6]"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.id}
                  href={home && item.id === "why" ? "/#why" : item.href}
                  className="rounded-full bg-[#F3F4F2] px-5 py-2.5 text-sm font-semibold text-[#1c241f] transition hover:bg-[#E7EAE6]"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <button
                type="button"
                aria-label="Search the site"
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
                  className="fixed left-4 right-4 top-[4.25rem] z-40 rounded-2xl border border-black/5 bg-white p-3 shadow-[0_16px_40px_rgba(20,32,24,0.12)] sm:absolute sm:left-auto sm:right-0 sm:top-14 sm:w-72"
                >
                  <input
                    ref={searchRef}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search pages"
                    className="w-full rounded-xl bg-[#F3F4F2] px-3 py-2 text-sm outline-none"
                  />
                  <ul className="mt-2">
                    {results.length === 0 && (
                      <li className="px-2 py-2 text-sm text-[#66756c]">Nothing matches that.</li>
                    )}
                    {results.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          className="block rounded-xl px-2 py-2 text-sm font-medium hover:bg-[#F3F4F2]"
                          onClick={() => setSearchOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </form>
              )}
            </div>

            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 rounded-full bg-[#173528] py-1.5 pl-1.5 pr-1.5 text-sm font-semibold text-white lg:pl-5"
            >
              <span className="hidden lg:inline">Explore</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#173528]">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F2] sm:h-11 sm:w-11 lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => {
                setSearchOpen(false)
                setMenuOpen((open) => !open)
              }}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mx-auto grid max-w-[1320px] gap-2 px-4 pb-4 lg:hidden">
            {homeNav.map((item) =>
              home && item.id !== "faq" ? (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNav(item.id, item.href)}
                  className="rounded-2xl bg-[#F3F4F2] px-4 py-3 text-left text-sm font-semibold"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.id}
                  href={item.href}
                  className="rounded-2xl bg-[#F3F4F2] px-4 py-3 text-left text-sm font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link href="/login" className="rounded-2xl border border-[#E4E8E4] px-4 py-3 text-center text-sm font-semibold" onClick={() => setMenuOpen(false)}>
                Log in
              </Link>
              <Link href="/get-started" className="rounded-2xl bg-[#173528] px-4 py-3 text-center text-sm font-semibold text-white" onClick={() => setMenuOpen(false)}>
                Get started
              </Link>
            </div>
          </div>
        )}
      </header>

      <div id="main-content">{children}</div>

      <footer className="px-4 pb-6 sm:px-6">
        <div className="mx-auto max-w-[1320px] overflow-hidden rounded-[32px] bg-[#173528] text-white">
          <div className="grid gap-8 px-5 py-8 sm:gap-10 sm:px-10 sm:py-10 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.8fr] lg:items-start">
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5">
                <img src={logoPath} alt={`${appName} logo`} className="h-11 w-11 object-contain" />
                <span className="text-[22px] font-extrabold tracking-tight">{appName}</span>
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
                Records for poultry, livestock, and crops, shaped around the farm you actually run.
              </p>
              <Link
                href="/get-started"
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-5 pr-1.5 text-sm font-semibold text-[#173528]"
              >
                Set up your farm
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#173528] text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">Explore</p>
              <ul className="mt-4 space-y-2">
                <li><Link href="/about" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">About us</Link></li>
                <li><Link href="/features" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">Features</Link></li>
                <li><Link href="/faq" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">FAQ</Link></li>
                <li><Link href="/#why" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">Why choose us</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">Enterprises</p>
              <ul className="mt-4 space-y-2">
                <li><Link href="/features/poultry" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">Poultry</Link></li>
                <li><Link href="/features/goats-sheep" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">Goats & sheep</Link></li>
                <li><Link href="/features/cattle" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">Cattle</Link></li>
                <li><Link href="/features/pigs" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">Pigs</Link></li>
                <li><Link href="/features/crops" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">Crops</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">Account</p>
              <ul className="mt-4 space-y-2">
                <li><Link href="/get-started" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">Get started</Link></li>
                <li><Link href="/login" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">Log in</Link></li>
                <li><Link href="/privacy" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="block py-1.5 text-sm font-medium text-white/85 transition hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-white/10 px-5 py-5 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <p>© {new Date().getFullYear()} {appName}</p>
            <p>Farm management for mixed enterprises</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
