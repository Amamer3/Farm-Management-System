"use client"

import { Bell } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNotifications } from "@/hooks/useNotifications"
import type { FarmNotification } from "@/services/notificationService"

function timeAgo(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  const delta = Date.now() - date.getTime()
  const minutes = Math.floor(delta / 60000)
  if (minutes < 1) return "just now"
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return "yesterday"
  return `${days}d ago`
}

function severityClass(severity: string) {
  if (severity === "urgent") return "bg-red-500"
  if (severity === "warning") return "bg-amber-500"
  return "bg-emerald-500"
}

function NotificationRow({
  item,
  onOpen,
}: {
  item: FarmNotification
  onOpen: (item: FarmNotification) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={`w-full rounded-xl px-3 py-2.5 text-left transition hover:bg-muted/70 ${item.read ? "opacity-70" : ""}`}
    >
      <div className="flex items-start gap-2.5">
        <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.read ? "bg-muted-foreground/30" : severityClass(item.severity)}`} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-snug text-foreground">{item.title}</p>
          {item.body && <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{item.body}</p>}
          <p className="mt-1 text-[11px] text-muted-foreground">{timeAgo(item.createdAt)}</p>
        </div>
      </div>
    </button>
  )
}

export function NotificationBell() {
  const router = useRouter()
  const { items, unread, loading, refresh, markRead, markAllRead } = useNotifications()

  async function openItem(item: FarmNotification) {
    if (!item.read) await markRead(item.id)
    if (item.href) router.push(item.href)
  }

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) void refresh()
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-red-500 rounded-full text-[10px] leading-none flex items-center justify-center text-white font-medium">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[min(24rem,calc(100vw-1.5rem))] p-0">
        <div className="flex items-center justify-between gap-3 px-3 py-2.5">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
          {unread > 0 && (
            <button
              type="button"
              onClick={() => void markAllRead()}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>
        <DropdownMenuSeparator className="m-0" />
        <div className="max-h-[min(24rem,70vh)] overflow-y-auto p-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {loading && items.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">Loading notifications…</p>
          )}
          {!loading && items.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No farm alerts yet. Low stock, treatments, and collections will show up here.
            </p>
          )}
          {items.map((item) => (
            <NotificationRow key={item.id} item={item} onOpen={openItem} />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
