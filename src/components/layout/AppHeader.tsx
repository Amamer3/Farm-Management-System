"use client"

import { Menu, Search, User, LogOut, Settings, X, Download } from "lucide-react"
import { useTranslations } from "next-intl"
import { NotificationBell } from "@/components/layout/NotificationBell"
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserRole } from "@/contexts/UserRoleContext"
import { useFarm } from "@/contexts/FarmContext"
import { TrialBanner } from "@/components/layout/TrialBanner"
import { TrialNotice } from "@/components/layout/TrialNotice"
import { usePwaInstall } from "@/components/pwa/PwaProvider"
import { APP_NAV, searchAppNav } from "@/lib/appNav"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AppHeaderProps {
  onMenuToggle: () => void
}

export function AppHeader({ onMenuToggle }: AppHeaderProps) {
  const t = useTranslations()
  const [searchValue, setSearchValue] = useState("")
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout, canAccess } = useUserRole()
  const { farm, hasEnterprise } = useFarm()
  const { canInstall, promptInstall } = usePwaInstall()
  const showTrialBanner = pathname === "/profile"

  const visibleNav = useMemo(
    () =>
      APP_NAV.filter((item) => {
        if (!canAccess(item.href)) return false
        if (item.enterprise === "crops") return hasEnterprise("crops") || (farm?.crops?.length ?? 0) > 0
        if (!item.enterprise) return true
        if (!farm) return item.enterprise === "poultry"
        return hasEnterprise(item.enterprise)
      }),
    [canAccess, farm, hasEnterprise]
  )

  const results = useMemo(() => searchAppNav(searchValue, visibleNav).slice(0, 8), [searchValue, visibleNav])

  const goTo = (href: string) => {
    setSearchValue("")
    setMobileSearchOpen(false)
    router.push(href)
  }

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault()
    if (results[0]) goTo(results[0].href)
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      router.push("/login")
    }
  }

  const initials = user?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2) || "U"

  const searchField = (
    <form onSubmit={submitSearch} className="relative flex-1 min-w-0">
      <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
      <Input
        autoFocus={mobileSearchOpen}
        placeholder={t("header.searchPlaceholder")}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        aria-label={t("header.searchAria")}
        className="ps-10 h-9 bg-background/50 border-border/50"
      />
      {searchValue.trim() && (
        <ul className="absolute start-0 end-0 top-full z-30 mt-1 overflow-hidden rounded-xl border bg-popover text-popover-foreground">
          {results.length === 0 && (
            <li className="px-3 py-2 text-sm text-muted-foreground">{t("header.noResults")}</li>
          )}
          {results.map((item) => (
            <li key={item.href}>
              <button
                type="button"
                className="w-full px-3 py-2 text-start text-sm hover:bg-muted"
                onMouseDown={(event) => {
                  event.preventDefault()
                  goTo(item.href)
                }}
              >
                {t(`sidebar.${item.key}`)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  )

  return (
    <>
    <header className="page-header relative gap-2 sm:gap-3 min-w-0">
      {mobileSearchOpen && (
        <div className="absolute inset-0 z-20 flex items-center gap-2 px-3 sm:px-4 bg-card md:hidden">
          {searchField}
          <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setMobileSearchOpen(false)} aria-label={t("header.closeSearch")}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      )}

      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <Button variant="ghost" size="icon" className="lg:hidden shrink-0" onClick={onMenuToggle} aria-label={t("common.toggleMenu")}>
          <Menu className="w-5 h-5" />
        </Button>
        <div className="relative hidden md:block flex-1 max-w-md min-w-0">{searchField}</div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileSearchOpen(true)} aria-label={t("common.search")}>
          <Search className="w-5 h-5" />
        </Button>

        <LanguageSwitcher />
        <ThemeToggle />
        <NotificationBell />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 px-1.5 sm:px-2 max-w-[10rem] sm:max-w-[14rem]">
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
              <span className="hidden sm:flex flex-col items-start min-w-0 leading-tight">
                <span className="text-sm truncate">{user?.name}</span>
                {farm?.name && <span className="text-[11px] text-muted-foreground truncate">{farm.name}</span>}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="min-w-0">
                <p className="font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                <Badge variant="secondary" className="text-xs mt-1">{user?.role}</Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <User className="w-4 h-4 me-2" />
              {t("common.profile")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/farm")}>
              <Settings className="w-4 h-4 me-2" />
              {t("common.farmSettings")}
            </DropdownMenuItem>
            {canInstall && (
              <DropdownMenuItem onClick={() => void promptInstall()}>
                <Download className="w-4 h-4 me-2" />
                {t("pwa.install")}
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="w-4 h-4 me-2" />
              {t("common.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
    {showTrialBanner && <TrialBanner />}
    <TrialNotice />
    </>
  )
}
