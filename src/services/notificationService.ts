import { authService } from "./authService"

export type FarmNotification = {
  id: string
  type: string
  severity: "info" | "warning" | "urgent" | string
  title: string
  body: string
  href?: string
  read: boolean
  actorName?: string
  createdAt: string
}

class NotificationService {
  list(limit = 40) {
    return authService.makeRequest<FarmNotification[]>(`/notifications?limit=${limit}`)
  }

  unreadCount() {
    return authService.makeRequest<{ count: number }>("/notifications/unread-count")
  }

  markRead(id: string) {
    return authService.makeRequest<null>(`/notifications/${id}/read`, { method: "POST" })
  }

  markAllRead() {
    return authService.makeRequest<null>("/notifications/read-all", { method: "POST" })
  }
}

export const notificationService = new NotificationService()
