"use client"

import { RiErrorWarningLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"

interface NotificationErrorStateProps {
  onRetry: () => void
}

export function NotificationErrorState({ onRetry }: NotificationErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-10 text-center">
      <div className="flex size-10 items-center justify-center rounded-full bg-destructive/10">
        <RiErrorWarningLine className="size-5 text-destructive" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">Failed to load notifications</p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Something went wrong. Check your connection and try again.
        </p>
      </div>
      <Button variant="outline" size="sm" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}
