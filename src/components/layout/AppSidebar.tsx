import { useState, useEffect, useRef } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { 
  BarChart3, 
  Bird, 
  Egg, 
  Package, 
  Syringe, 
  FileText,
  Home,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  User,
  Settings,
  ImagePlus
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useUserRole } from "@/contexts/UserRoleContext"
import { useFarm } from "@/contexts/FarmContext"
import { useToast } from "@/hooks/use-toast"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home, enterprise: "" },
  { name: "Birds Management", href: "/birds", icon: Bird, enterprise: "poultry" },
  { name: "Egg Collection", href: "/eggs", icon: Egg, enterprise: "poultry" },
  { name: "Small Ruminants", href: "/ruminants", icon: Users, enterprise: "small_ruminants" },
  { name: "Cattle", href: "/cattle", icon: Users, enterprise: "cattle" },
  { name: "Pigs", href: "/pigs", icon: Users, enterprise: "pigs" },
  { name: "Feed Inventory", href: "/feed", icon: Package, enterprise: "" },
  { name: "Medicine & Vaccines", href: "/medicine", icon: Syringe, enterprise: "" },
  { name: "Reports", href: "/reports", icon: FileText, enterprise: "" },
  { name: "Statistics", href: "/statistics", icon: BarChart3, enterprise: "poultry" },
  { name: "Farm Settings", href: "/farm", icon: Settings, enterprise: "" },
  { name: "User Management", href: "/users", icon: Users, enterprise: "" },
  { name: "Profile", href: "/profile", icon: User, enterprise: "" },
]

interface AppSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

function readLogoFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error("Could not read that image"))
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const max = 512
        const scale = Math.min(1, max / Math.max(img.width, img.height))
        const width = Math.max(1, Math.round(img.width * scale))
        const height = Math.max(1, Math.round(img.height * scale))
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          reject(new Error("Could not process that image"))
          return
        }
        ctx.clearRect(0, 0, width, height)
        ctx.drawImage(img, 0, 0, width, height)
        const mime = file.type === "image/jpeg" ? "image/jpeg" : "image/png"
        resolve(canvas.toDataURL(mime))
      }
      img.onerror = () => reject(new Error("Could not read that image"))
      img.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

export function AppSidebar({ isOpen, onToggle }: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const location = useLocation()
  const { user, canAccess } = useUserRole()
  const { hasEnterprise, farm, setLogo } = useFarm()
  const { toast } = useToast()
  const canEditLogo = user?.role === "Admin" || user?.role === "Manager"

  const filteredNavigation = navigation.filter(item => {
    if (!canAccess(item.href)) return false
    if (!item.enterprise) return true
    if (!farm) return item.enterprise === "poultry"
    return hasEnterprise(item.enterprise)
  })

  // Collapse is desktop-only; always expand on smaller screens
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const sync = () => {
      if (!mq.matches) setIsCollapsed(false)
    }
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  // Lock body scroll when mobile drawer is open
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

  const onLogoSelected = async (file?: File) => {
    if (!file || !canEditLogo) return
    if (!file.type.startsWith("image/")) {
      toast({ title: "Choose an image file", variant: "destructive" })
      return
    }
    try {
      const logo = await readLogoFile(file)
      await setLogo(logo)
      toast({ title: "Farm logo updated" })
    } catch (error) {
      toast({
        title: error instanceof Error ? error.message : "Could not update logo",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onToggle}
        aria-hidden={!isOpen}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-dvh max-h-dvh flex-col bg-card border-r border-border",
          "transform transition-all duration-300 ease-in-out",
          "lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:max-h-screen lg:translate-x-0 lg:shrink-0",
          isOpen ? "translate-x-0 shadow-xl lg:shadow-none" : "-translate-x-full lg:translate-x-0",
          isCollapsed ? "w-[5.5rem]" : "w-[min(16.5rem,85vw)] lg:w-64"
        )}
        aria-label="Main navigation"
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center border-b border-border shrink-0 gap-2",
            isCollapsed ? "justify-center px-2 py-3" : "justify-between px-3 py-3 sm:px-4 sm:py-4"
          )}
        >
          <div className={cn("flex items-center min-w-0", isCollapsed ? "justify-center" : "gap-2.5")}>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0]
                e.target.value = ""
                void onLogoSelected(file)
              }}
            />
            <button
              type="button"
              onClick={() => canEditLogo && logoInputRef.current?.click()}
              disabled={!canEditLogo}
              title={canEditLogo ? (farm?.logo ? "Change farm logo" : "Add your farm logo") : "Farm logo"}
              aria-label={canEditLogo ? (farm?.logo ? "Change farm logo" : "Add your farm logo") : "Farm logo"}
              className={cn(
                "h-16 w-16 shrink-0 rounded-md bg-transparent p-0",
                canEditLogo && "cursor-pointer hover:opacity-90"
              )}
            >
              {farm?.logo ? (
                <img
                  src={farm.logo}
                  alt=""
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center rounded-md border border-dashed border-border text-muted-foreground">
                  <ImagePlus className="h-6 w-6" />
                </span>
              )}
            </button>
            {!isCollapsed && (
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-bold text-foreground truncate leading-tight">Agrocyms</h1>
                <p className="text-[11px] sm:text-xs text-muted-foreground truncate leading-tight">Farm management</p>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <div className="flex items-center gap-0.5 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-8 w-8"
                onClick={onToggle}
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex h-8 w-8"
                onClick={() => setIsCollapsed(true)}
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {isCollapsed && (
          <div className="hidden lg:flex justify-center py-2 border-b border-border shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsCollapsed(false)}
              aria-label="Expand sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Navigation */}
        <nav
          className={cn(
            "flex-1 overflow-y-auto overscroll-contain min-h-0 py-3 space-y-1",
            isCollapsed ? "px-2" : "px-2.5 sm:px-3"
          )}
        >
          {filteredNavigation.map((item) => {
            const isActive = location.pathname === item.href
            const Icon = item.icon

            return (
              <div key={item.name} className="relative group">
                <NavLink
                  to={item.href}
                  title={isCollapsed ? item.name : undefined}
                  className={cn(
                    "sidebar-nav-item transition-all duration-200",
                    isActive && "active",
                    isCollapsed
                      ? "justify-center p-0 w-11 h-11 mx-auto"
                      : "justify-start gap-3 px-3 py-2.5"
                  )}
                  onClick={() => {
                    if (window.innerWidth < 1024) onToggle()
                  }}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && (
                    <span className="truncate text-sm">{item.name}</span>
                  )}
                </NavLink>

                {isCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 hidden lg:block border border-border">
                    {item.name}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-popover" />
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* User info */}
        <div
          className={cn(
            "border-t border-border bg-muted/30 shrink-0",
            isCollapsed ? "p-2" : "px-3 py-3 sm:px-4"
          )}
        >
          {isCollapsed ? (
            <div className="flex justify-center">
              <div
                className="w-9 h-9 bg-primary rounded-full flex items-center justify-center"
                title={user?.name || "User"}
              >
                <span className="text-xs font-medium text-primary-foreground">
                  {user?.name?.charAt(0) || "U"}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.name || user?.email?.split("@")[0] || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.role || "Member"}
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
