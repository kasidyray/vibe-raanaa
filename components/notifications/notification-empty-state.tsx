import { RiNotification2Line } from "@remixicon/react"

interface NotificationEmptyStateProps {
  // When true, the user is on the "Unread" tab — copy changes accordingly.
  unreadOnly?: boolean
}

export function NotificationEmptyState({ unreadOnly }: NotificationEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-10 text-center">
      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
        <RiNotification2Line className="size-5 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">
          {unreadOnly ? "You're all caught up" : "No notifications yet"}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {unreadOnly
            ? "No unread notifications right now. Check back later."
            : "When there's something to see — mentions, alerts, updates — it will appear here."}
        </p>
      </div>
    </div>
  )
}
