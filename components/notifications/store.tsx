"use client"

import * as React from "react"
import { mockNotifications } from "./data"
import type { AppNotification, NotificationTab } from "./types"

interface NotificationStore {
  notifications: AppNotification[]
  tab: NotificationTab
  isLoading: boolean
  error: string | null
  unreadCount: number
  setTab: (tab: NotificationTab) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  dismiss: (id: string) => void
  retry: () => void
}

const NotificationContext = React.createContext<NotificationStore | null>(null)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = React.useState<AppNotification[]>(mockNotifications)
  const [tab, setTab] = React.useState<NotificationTab>("all")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = React.useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const markAllAsRead = React.useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  // Simulates a network retry — swap for a real fetch when connecting to an API
  const retry = React.useCallback(() => {
    setError(null)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setNotifications(mockNotifications)
    }, 1200)
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        tab,
        isLoading,
        error,
        unreadCount,
        setTab,
        markAsRead,
        markAllAsRead,
        dismiss,
        retry,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications(): NotificationStore {
  const ctx = React.useContext(NotificationContext)
  if (!ctx) {
    throw new Error("useNotifications must be used within <NotificationProvider>")
  }
  return ctx
}
