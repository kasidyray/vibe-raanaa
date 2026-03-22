"use client"

import * as React from "react"
import { RiCheckLine, RiAlertLine, RiLockLine } from "@remixicon/react"
import { cn } from "@/lib/utils"
import type { SplitFormStatus, SplitFormNavGroup } from "./types"

type SplitFormNavProps = {
  groups: SplitFormNavGroup[]
  currentStepId: string
  /** Map step id → status. Wrap your hook's status(index) with an id→index lookup. */
  getStatus: (stepId: string) => SplitFormStatus
  /** Called when a completed step is clicked for back-navigation. */
  onStepClick?: (stepId: string) => void
}

// ─── Right-side status badges ─────────────────────────────────────────────────

function StepBadge({ status }: { status: SplitFormStatus }) {
  if (status === "completed") {
    return (
      <span className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center shrink-0">
        <RiCheckLine className="size-3 text-background" />
      </span>
    )
  }
  if (status === "error") {
    return (
      <span className="w-5 h-5 rounded-full bg-destructive flex items-center justify-center shrink-0">
        <RiAlertLine className="size-3 text-destructive-foreground" />
      </span>
    )
  }
  // upcoming — lock icon in muted circle
  return (
    <span className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center shrink-0">
      <RiLockLine className="size-2.5 text-muted-foreground" />
    </span>
  )
}

function GroupBadge({
  items,
  getStatus,
}: {
  items: SplitFormNavGroup["items"]
  getStatus: (id: string) => SplitFormStatus
}) {
  const statuses   = items.map(i => getStatus(i.id))
  const allDone    = statuses.every(s => s === "completed")
  const hasError   = statuses.some(s => s === "error")
  const anyStarted = statuses.some(s => s === "completed" || s === "current")

  if (allDone) {
    return (
      <span className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center shrink-0">
        <RiCheckLine className="size-3 text-background" />
      </span>
    )
  }
  if (hasError) {
    return (
      <span className="w-5 h-5 rounded-full bg-destructive flex items-center justify-center shrink-0">
        <RiAlertLine className="size-3 text-destructive-foreground" />
      </span>
    )
  }
  // Not started or in-progress — lock
  return (
    <span className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center shrink-0">
      <RiLockLine className={cn("size-2.5", anyStarted ? "text-primary" : "text-muted-foreground")} />
    </span>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * Hierarchical collapsible nav for SplitFormLayout's sidebar.
 *
 * Visual pattern (Airbnb style):
 *   − Group title                            [group badge]
 *       Step title                           [step badge]
 *       Step title ◀ outlined border row
 *   + Group title (collapsed)                [group badge]
 *
 * - "−" = expanded group, "+" = collapsed group
 * - Status badges are always on the RIGHT
 * - Current step shows an outlined border row, no right badge
 * - Group containing the current step auto-opens on step change
 */
export function SplitFormNav({
  groups,
  currentStepId,
  getStatus,
  onStepClick,
}: SplitFormNavProps) {
  const currentGroupId = React.useMemo(
    () => groups.find(g => g.items.some(i => i.id === currentStepId))?.id,
    [groups, currentStepId],
  )

  const [open, setOpen] = React.useState<Set<string>>(() => {
    const s = new Set<string>()
    groups.forEach(g => { if (g.defaultOpen || g.id === currentGroupId) s.add(g.id) })
    return s
  })

  React.useEffect(() => {
    if (!currentGroupId) return
    setOpen(prev => {
      if (prev.has(currentGroupId)) return prev
      const next = new Set(prev)
      next.add(currentGroupId)
      return next
    })
  }, [currentGroupId])

  function toggle(id: string) {
    setOpen(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <nav className="flex flex-col" aria-label="Form sections">
      {groups.map(group => {
        const isOpen = open.has(group.id)

        return (
          <div key={group.id}>
            {/* ── Group header ────────────────────────────────────────────── */}
            <button
              type="button"
              onClick={() => toggle(group.id)}
              className="flex items-center gap-2 w-full px-2 py-2.5 rounded-lg text-left hover:bg-muted/60 transition-colors"
            >
              {/* Airbnb-style − / + toggle indicator */}
              <span className="text-muted-foreground text-sm font-medium w-4 shrink-0 text-center select-none">
                {isOpen ? "−" : "+"}
              </span>
              <span className="text-sm font-medium flex-1 min-w-0 truncate">
                {group.title}
              </span>
              <GroupBadge items={group.items} getStatus={getStatus} />
            </button>

            {/* ── Step items ────────────────────────────────────────────────── */}
            {isOpen && (
              <div className="flex flex-col gap-0.5 pl-6 mb-1">
                {group.items.map(item => {
                  const s         = getStatus(item.id)
                  const isCurrent = item.id === currentStepId
                  const clickable = s === "completed" && !!onStepClick

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={clickable ? () => onStepClick!(item.id) : undefined}
                      disabled={!clickable && !isCurrent}
                      aria-current={isCurrent ? "step" : undefined}
                      className={cn(
                        "flex items-center gap-2 w-full px-2 py-2 rounded-lg text-left text-sm transition-colors",
                        isCurrent && "border border-foreground/25 bg-background font-medium text-foreground cursor-default",
                        !isCurrent && s === "completed" && "text-muted-foreground cursor-pointer hover:bg-muted/50",
                        !isCurrent && s === "error"     && "text-destructive/70 cursor-default",
                        !isCurrent && s === "upcoming"  && "text-muted-foreground/50 cursor-default",
                      )}
                    >
                      <span className="flex-1 min-w-0 truncate">{item.title}</span>
                      {item.optional && !isCurrent && (
                        <span className="text-xs text-muted-foreground/50 shrink-0 mr-1">Optional</span>
                      )}
                      {!isCurrent && <StepBadge status={s} />}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
