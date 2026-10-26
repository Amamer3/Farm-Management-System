"use client"

import { useCallback, useEffect, useState } from "react"
import { useUserRole } from "@/contexts/UserRoleContext"
import { notificationService, type FarmNotification } from "@/services/notificationService"

function unwrapList(payload: unknown): FarmNotification[] {
  if (Array.isArray(payload)) return payload
  if (payload && typeof payload === "object" && "data" in payload) {
    const data = (payload as { data: unknown }).data
    if (Array.isArray(data)) return data
  }
  return []
}

function unwrapCount(payload: unknown): number {
  if (typeof payload === "number") return payload
  if (payload && typeof payload === "object") {
    const record = payload as { count?: number; data?: { count?: number } }
    if (typeof record.count === "number") return record.count
    if (typeof record.data?.count === "number") return record.data.count
  }
  return 0
}

export function useNotifications(pollMs = 30000) {
  const { isAuthenticated } = useUserRole()
  const [items, setItems] = useState<FarmNotification[]>([])
  const [unread, setUnread] = useState(0)
  const [loading, setLoading] = useState(false)

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([])
      setUnread(0)
      return
    }
    setLoading(true)
    try {
      const [list, count] = await Promise.all([
        notificationService.list(40),
        notificationService.unreadCount(),
      ])
      setItems(unwrapList(list))
      setUnread(unwrapCount(count))
    } catch {
      // Keep the last successful snapshot if the API is briefly unavailable.
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    void refresh()
    if (!isAuthenticated || pollMs <= 0) return
    const timer = window.setInterval(() => {
      void refresh()
    }, pollMs)
    return () => window.clearInterval(timer)
  }, [isAuthenticated, pollMs, refresh])

  const markRead = useCallback(async (id: string) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, read: true } : item)))
    setUnread((count) => Math.max(0, count - 1))
    try {
      await notificationService.markRead(id)
    } catch {
      void refresh()
    }
  }, [refresh])

  const markAllRead = useCallback(async () => {
    setItems((current) => current.map((item) => ({ ...item, read: true })))
    setUnread(0)
    try {
      await notificationService.markAllRead()
    } catch {
      void refresh()
    }
  }, [refresh])

  return { items, unread, loading, refresh, markRead, markAllRead }
}
