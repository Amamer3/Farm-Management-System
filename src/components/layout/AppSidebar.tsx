"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Beef,
  Bird,
  Egg,
  FileText,
  Home,
  Package,
  Rabbit,
  Settings,
  Sprout,
  Syringe,
  User,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Ham,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useUserRole } from "@/contexts/UserRoleContext"
import { useFarm } from "@/contexts/FarmContext"
import { useTranslations } from "next-intl"
import { getAppName, getAppTagline } from "@/lib/env"
import { APP_NAV, APP_NAV_GROUPS, type AppNavItem } from "@/lib/appNav"

const ICONS = {
  dashboard: Home,
  birds: Bird,
  eggs: Egg,
  ruminants: Rabbit,
  cattle: Beef,
  pigs: Ham,
  crops: Sprout,
  feed: Package,
  medicine: Syringe,
  reports: FileText,
  statistics: BarChart3,
  farm: Settings,
  users: Users,
  profile: User,
} as const

interface AppSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function AppSidebar({ isOpen, onToggle }: AppSidebarProps) {
  const t = useTranslations()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const { user, canAccess } = useUserRole()
  const { hasEnterprise, farm } = useFarm()
  const canEditLogo = user?.role === "Admin" || user?.role === "Manager"

  const filteredNavigation = APP_NAV.filter((item) => {
    if (!canAccess(item.href)) return false
    if (item.enterprise === "crops") {
      return hasEnterprise("crops") || (farm?.crops?.length ?? 0) > 0
    }
    if (!item.enterprise) return true
    if (!farm) return item.enterprise === "poultry"
    return hasEnterprise(item.enterprise)
  })

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const sync = () => {
      if (!mq.matches) setIsCollapsed(false)
    }
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const mq = window.matchMedia("(max-width: 1023px)")
    if (!mq.matches) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  const grouped = APP_NAV_GROUPS.map((group) => ({
    ...group,
    items: filteredNavigation.filter((item) => item.group === group.id),
  })).filter((group) => group.items.length > 0)

  const renderLink = (item: AppNavItem) => {
    const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/")
    const Icon = ICONS[item.key as keyof typeof ICONS] || Home
    const name = t(`sidebar.${item.key}`)

    return (
      <div key={item.key} className="relative group">
        <Link
          href={item.href}
          title={isCollapsed ? name : undefined}
          className={cn(
            "sidebar-nav-item transition-all duration-200",
            isActive && "active",
            isCollapsed ? "justify-center p-0 w-11 h-11 mx-auto" : "justify-start gap-3 px-3 py-2.5"
          )}
          onClick={() => {
            if (window.innerWidth < 1024) onToggle()
          }}
        >
          <Icon className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="truncate text-sm">{name}</span>}
        </Link>
        {isCollapsed && (
          <div className="absolute start-full top-1/2 -translate-y-1/2 ms-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 hidden lg:block border border-border">
            {name}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onToggle}
        aria-hidden={!isOpen}
      />

      <aside
        className={cn(
          "fixed inset-y-0 start-0 z-50 flex h-dvh max-h-dvh flex-col bg-card border-e border-border",
          "transform transition-all duration-300 ease-in-out",
          "lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:max-h-screen lg:translate-x-0 lg:shrink-0",
          isOpen ? "translate-x-0 shadow-xl lg:shadow-none" : "-translate-x-full rtl:translate-x-full lg:translate-x-0",
          isCollapsed ? "w-[5.5rem]" : "w-[min(16.5rem,85vw)] lg:w-64"
        )}
        aria-label={t("sidebar.mainNav")}
      >
        <div
          className={cn(
            "flex items-center border-b border-border shrink-0 gap-2",
            isCollapsed ? "justify-center px-2 py-3" : "justify-between px-3 py-3 sm:px-4 sm:py-4"
          )}
        >
          <div className={cn("flex items-center min-w-0", isCollapsed ? "justify-center" : "gap-2.5")}>
            <Link
              href={canEditLogo ? "/farm#logo" : "/dashboard"}
              title={canEditLogo ? t("farmSettings.changeLogo") : t("sidebar.farmLogo")}
              aria-label={canEditLogo ? t("farmSettings.changeLogo") : t("sidebar.farmLogo")}
              className="h-16 w-16 shrink-0 rounded-md bg-transparent p-0"
            >
              {farm?.logo ? (
                <img src={farm.logo} alt="" className="h-full w-full object-contain" />
              ) : (
                <span className="flex h-full w-full items-center justify-center rounded-md border border-dashed border-border text-muted-foreground">
                  <ImagePlus className="h-6 w-6" />
                </span>
              )}
            </Link>
            {!isCollapsed && (
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-bold text-foreground truncate leading-tight">{getAppName()}</h1>
                <p className="text-[11px] sm:text-xs text-muted-foreground truncate leading-tight">{getAppTagline()}</p>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <div className="flex items-center gap-0.5 shrink-0">
              <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8" onClick={onToggle} aria-label={t("common.closeMenu")}>
                <X className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden lg:flex h-8 w-8" onClick={() => setIsCollapsed(true)} aria-label={t("sidebar.collapse")}>
                <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
              </Button>
            </div>
          )}
        </div>

        {isCollapsed && (
          <div className="hidden lg:flex justify-center py-2 border-b border-border shrink-0">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsCollapsed(false)} aria-label={t("sidebar.expand")}>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </Button>
          </div>
        )}

        <nav
          className={cn(
            "flex-1 overflow-y-auto overscroll-contain min-h-0 py-3 space-y-4",
            isCollapsed ? "px-2" : "px-2.5 sm:px-3"
          )}
        >
          {grouped.map((group) => (
            <div key={group.id} className="space-y-1">
              {!isCollapsed && (
                <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {t(`sidebar.${group.key}`)}
                </p>
              )}
              {group.items.map(renderLink)}
            </div>
          ))}
        </nav>

        <div className={cn("border-t border-border bg-muted/30 shrink-0", isCollapsed ? "p-2" : "px-3 py-3 sm:px-4")}>
          {isCollapsed ? (
            <div className="flex justify-center">
              <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center" title={user?.name || t("common.user")}>
                <span className="text-xs font-medium text-primary-foreground">{user?.name?.charAt(0) || "U"}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">{user?.name || user?.email?.split("@")[0] || t("common.user")}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.role || t("common.member")}</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
