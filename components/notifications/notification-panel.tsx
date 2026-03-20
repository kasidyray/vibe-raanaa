"use client"

import * as React from "react"
import Link from "next/link"
import {
  RiNotification2Line,
  RiCheckDoubleLine,
  RiSettingsLine,
} from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

import type { AppNotification, NotificationTab } from "./types"
import { useNotifications } from "./store"
import { NotificationItem } from "./notification-item"
import { NotificationLoadingSkeleton } from "./notification-loading-skeleton"
import { NotificationEmptyState } from "./notification-empty-state"
import { NotificationErrorState } from "./notification-error-state"

// ─── NotificationBadge ────────────────────────────────────────────────────────
// Overlaid pill that shows the unread count on the bell button.

function NotificationBadge({ count }: { count: number }) {
  if (count === 0) return null
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute -right-1 -top-1 flex min-w-[1.125rem] items-center justify-center",
        "rounded-full bg-destructive px-1 py-px",
        "text-[10px] font-bold leading-none text-white tabular-nums"
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  )
}

// ─── NotificationList ─────────────────────────────────────────────────────────
// Handles all five states: loading, error, empty (zero total), empty (unread),
// and the populated scroll list.

function NotificationList({
  notifications,
  isLoading,
  error,
  onRetry,
  onClose,
  unreadOnly,
}: {
  notifications: AppNotification[]
  isLoading: boolean
  error: string | null
  onRetry: () => void
  onClose: () => void
  unreadOnly?: boolean
}) {
  if (isLoading) return <NotificationLoadingSkeleton />
  if (error) return <NotificationErrorState onRetry={onRetry} />
  if (notifications.length === 0) return <NotificationEmptyState unreadOnly={unreadOnly} />

  return (
    <div className="max-h-[420px] overflow-y-auto p-2">
      <div className="space-y-0.5">
        {notifications.map((n) => (
          <NotificationItem key={n.id} notification={n} onClose={onClose} />
        ))}
      </div>
    </div>
  )
}

// ─── NotificationBell ─────────────────────────────────────────────────────────
// The complete bell + popover panel. Drop this into the site header.
// Requires <NotificationProvider> somewhere up the tree.

export function NotificationBell() {
  const {
    notifications,
    tab,
    setTab,
    isLoading,
    error,
    unreadCount,
    markAllAsRead,
    retry,
  } = useNotifications()

  const [open, setOpen] = React.useState(false)

  const unread = notifications.filter((n) => !n.read)
  const hasUnread = unreadCount > 0

  const handleTabChange = (value: string) => {
    setTab(value as NotificationTab)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label={
            hasUnread
              ? `Notifications — ${unreadCount} unread`
              : "Notifications"
          }
          aria-haspopup="true"
          aria-expanded={open}
          className="relative"
        >
          <RiNotification2Line
            className={cn(
              "transition-colors",
              // Subtle emphasis when unread items exist
              hasUnread && "text-foreground"
            )}
          />
          <NotificationBadge count={unreadCount} />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        // Override default w-72 p-4 gap-4 to get a clean panel layout
        className="w-96 gap-0 p-0"
      >
        {/* ── Panel header ── */}
        <div className="flex items-center justify-between px-4 pb-3 pt-4">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-foreground">Notifications</h2>
            {hasUnread && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1.5 text-xs font-semibold tabular-nums text-primary">
                {unreadCount}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
            disabled={!hasUnread}
            onClick={markAllAsRead}
            aria-label="Mark all notifications as read"
          >
            <RiCheckDoubleLine className="mr-1 size-3.5" />
            Mark all read
          </Button>
        </div>

        {/* ── Tabs: All / Unread ── */}
        <Tabs value={tab} onValueChange={handleTabChange}>
          <div className="px-4 pb-2">
            <TabsList variant="pill">
              <TabsTrigger value="all">
                All
                {notifications.length > 0 && (
                  <span className="ml-1.5 tabular-nums text-muted-foreground">
                    {notifications.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {hasUnread && (
                  <span className="ml-1.5 tabular-nums text-muted-foreground">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <NotificationList
              notifications={notifications}
              isLoading={isLoading}
              error={error}
              onRetry={retry}
              onClose={() => setOpen(false)}
            />
          </TabsContent>

          <TabsContent value="unread" className="mt-0">
            <NotificationList
              notifications={unread}
              isLoading={isLoading}
              error={error}
              onRetry={retry}
              onClose={() => setOpen(false)}
              unreadOnly
            />
          </TabsContent>
        </Tabs>

        {/* ── Footer ── */}
        <Separator />
        <div className="flex items-center justify-between rounded-b-lg bg-muted px-4 py-3">
          <Link
            href="/settings/notifications"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <RiSettingsLine className="size-3.5" />
            Notification settings
          </Link>
          <Link
            href="/activity"
            onClick={() => setOpen(false)}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all activity
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  )
}
