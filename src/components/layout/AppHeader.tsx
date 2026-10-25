"use client"

import { Menu, Bell, Search, User, LogOut, Settings, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserRole } from "@/contexts/UserRoleContext"
import { useFarm } from "@/contexts/FarmContext"
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
  const [searchValue, setSearchValue] = useState("")
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const router = useRouter()
  const { user, logout } = useUserRole()
  const { farm } = useFarm()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
      router.push('/')
    }
  }

  const initials = user?.name?.split(" ").map(n => n[0]).join("").slice(0, 2) || "U"

  return (
    <header className="page-header relative gap-2 sm:gap-3 min-w-0">
      {/* Mobile expanded search overlay */}
      {mobileSearchOpen && (
        <div className="absolute inset-0 z-20 flex items-center gap-2 px-3 sm:px-4 bg-card md:hidden">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
            <Input
              autoFocus
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 h-9 bg-background/50 border-border/50"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => setMobileSearchOpen(false)}
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      )}

      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden shrink-0"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Desktop / tablet search — grows with available space */}
        <div className="relative hidden md:block flex-1 max-w-md min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
          <Input
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 w-full h-9 bg-background/50 backdrop-blur-sm border-border/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileSearchOpen(true)}
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </Button>

        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-red-500 rounded-full text-[10px] leading-none flex items-center justify-center text-white font-medium">
            3
          </span>
        </Button>

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
                <Badge variant="secondary" className="text-xs mt-1">
                  {user?.role}
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/profile')}>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/farm')}>
              <Settings className="w-4 h-4 mr-2" />
              Farm settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
