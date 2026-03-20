"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  RiAtLine,
  RiServerLine,
  RiBankCardLine,
  RiShieldLine,
  RiHistoryLine,
  RiRefreshLine,
  RiMore2Line,
  RiCheckLine,
  RiDeleteBinLine,
  RiExternalLinkLine,
} from "@remixicon/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { AppNotification, NotificationCategory } from "./types"
import { useNotifications } from "./store"

// ─── Relative time formatter ──────────────────────────────────────────────────

function formatRelativeTime(date: Date): string {
  const diffMs = Date.now() - date.getTime()
  const minutes = Math.floor(diffMs / 60_000)
  if (minutes < 1) return "just now"
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
}

// ─── Category → icon + colour mapping ────────────────────────────────────────

type CategoryMeta = {
  Icon: React.ElementType
  iconColor: string
  iconBg: string
}

const categoryMeta: Record<NotificationCategory, CategoryMeta> = {
  mention:  { Icon: RiAtLine,       iconColor: "text-info",             iconBg: "bg-info-lighter" },
  system:   { Icon: RiServerLine,   iconColor: "text-muted-foreground", iconBg: "bg-muted" },
  billing:  { Icon: RiBankCardLine, iconColor: "text-warning",          iconBg: "bg-warning-lighter" },
  security: { Icon: RiShieldLine,   iconColor: "text-destructive",      iconBg: "bg-destructive/10" },
  activity: { Icon: RiHistoryLine,  iconColor: "text-success",          iconBg: "bg-success-lighter" },
  update:   { Icon: RiRefreshLine,  iconColor: "text-info",             iconBg: "bg-info-lighter" },
}

// ─── NotificationItem ─────────────────────────────────────────────────────────

interface NotificationItemProps {
  notification: AppNotification
  onClose?: () => void
}

export function NotificationItem({ notification, onClose }: NotificationItemProps) {
  const router = useRouter()
  const { markAsRead, dismiss } = useNotifications()
  const meta = categoryMeta[notification.category]
  const { Icon } = meta

  function handleRead() {
    if (!notification.read) markAsRead(notification.id)
  }

  function handleOpen() {
    handleRead()
    onClose?.()
    if (notification.href) router.push(notification.href)
  }

  // The visual card — shared between both href and no-href variants
  const card = (
    <div
      className={cn(
        "relative flex gap-3 rounded-xl p-3 transition-colors",
        // Unread: slight accent tint; read: plain hover
        !notification.read ? "bg-accent/60 hover:bg-accent/80" : "hover:bg-muted/50"
      )}
    >
      {/* Unread indicator dot — top-right of card */}
      {!notification.read && (
        <span
          aria-label="Unread"
          className="absolute right-3 top-4 size-1.5 rounded-full bg-primary"
        />
      )}

      {/* Left — actor avatar or category icon */}
      <div className="mt-0.5 shrink-0">
        {notification.actorAvatar ? (
          <Avatar size="sm">
            <AvatarImage src={notification.actorAvatar} alt={notification.actorName ?? ""} />
            <AvatarFallback>{notification.actorName?.[0] ?? "?"}</AvatarFallback>
          </Avatar>
        ) : (
          <div
            className={cn(
              "flex size-7 items-center justify-center rounded-full",
              meta.iconBg
            )}
          >
            <Icon className={cn("size-3.5", meta.iconColor)} />
          </div>
        )}
      </div>

      {/* Center — title / message / timestamp */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 pr-4">
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              "text-sm leading-snug",
              !notification.read ? "font-medium text-foreground" : "font-normal text-foreground/80"
            )}
          >
            {notification.title}
          </p>
          <span className="shrink-0 whitespace-nowrap text-xs tabular-nums text-muted-foreground">
            {formatRelativeTime(notification.timestamp)}
          </span>
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {notification.message}
        </p>
      </div>
    </div>
  )

  return (
    <div className="group relative">
      {/* Clickable area — Link when there's a destination, button otherwise */}
      {notification.href ? (
        <Link
          href={notification.href}
          onClick={() => { handleRead(); onClose?.() }}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-xl"
        >
          {card}
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleRead}
          className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-xl"
        >
          {card}
        </button>
      )}

      {/* Actions menu — appears on hover, floated over the card */}
      <div className="absolute bottom-2 right-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline" size="icon-xs" aria-label="Notification actions" className="size-6" />}
          >
            <RiMore2Line className="size-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            {!notification.read && (
              <DropdownMenuItem
                onClick={() => markAsRead(notification.id)}
              >
                <RiCheckLine />
                Mark as read
              </DropdownMenuItem>
            )}
            {notification.href && (
              <DropdownMenuItem onClick={handleOpen}>
                <RiExternalLinkLine />
                Open
              </DropdownMenuItem>
            )}
            {(!notification.read || notification.href) && <DropdownMenuSeparator />}
            <DropdownMenuItem
              variant="destructive"
              onClick={() => dismiss(notification.id)}
            >
              <RiDeleteBinLine />
              Dismiss
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
