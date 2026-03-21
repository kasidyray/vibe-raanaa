"use client"

import * as React from "react"
import { RiCheckLine } from "@remixicon/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CompletionStateProps = {
  title: string
  description?: string
  // Primary CTA (e.g. "Back to team", "Go to settings")
  primaryAction?: { label: string; onClick: () => void }
  // Secondary CTA (e.g. "Invite another member")
  secondaryAction?: { label: string; onClick: () => void }
  className?: string
}

/**
 * Full-page success / completion state.
 *
 * Shown after a multi-step flow has been submitted successfully.
 * Centred vertically and horizontally within the main content area.
 */
export function CompletionState({
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: CompletionStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center gap-6 py-20 px-6",
        className,
      )}
    >
      {/* Success icon */}
      <div className="size-14 rounded-full bg-success/10 border border-success/20 flex items-center justify-center">
        <RiCheckLine className="size-7 text-success" />
      </div>

      {/* Title + description */}
      <div className="flex flex-col gap-2 max-w-sm">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {primaryAction && (
            <Button onClick={primaryAction.onClick}>{primaryAction.label}</Button>
          )}
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
