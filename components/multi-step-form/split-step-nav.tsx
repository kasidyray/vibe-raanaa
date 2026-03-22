"use client"

import * as React from "react"
import { RiCheckLine, RiAlertLine, RiArrowDownSLine, RiArrowRightSLine } from "@remixicon/react"
import { cn } from "@/lib/utils"
import type { StepStatus } from "./types"

// ─── Types ────────────────────────────────────────────────────────────────────

export type SplitStepNavItem = {
  id: string
  title: string
  optional?: boolean
}

export type SplitStepNavGroup = {
  id: string
  title: string
  items: SplitStepNavItem[]
  /** Open by default on first render (current group always opens automatically) */
  defaultOpen?: boolean
}

type SplitStepNavProps = {
  groups: SplitStepNavGroup[]
  currentStepId: string
  /** Takes a step id (not index) — wrap form.getStepStatus with an id→index map */
  getStepStatus: (stepId: string) => StepStatus
  /** Completed steps are clickable; pass form.goToStep wrapped by id→index map */
  onStepClick?: (stepId: string) => void
}

// ─── Internal badge components ────────────────────────────────────────────────

/**
 * Right-side status badge for individual step items.
 * Not rendered for the current step (its border-outline is enough).
 */
function StepBadge({ status }: { status: StepStatus }) {
  if (status === "completed") {
    return (
      <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center shrink-0">
        <RiCheckLine className="size-3 text-background" />
      </div>
    )
  }
  if (status === "error") {
    return (
      <div className="w-5 h-5 rounded-full bg-destructive flex items-center justify-center shrink-0">
        <RiAlertLine className="size-3 text-destructive-foreground" />
      </div>
    )
  }
  // upcoming — border-only circle
  return <div className="w-5 h-5 rounded-full border border-border shrink-0" />
}

/**
 * Right-side aggregate badge for group headers.
 * Reflects the worst/best status across all steps in the group.
 */
function GroupBadge({
  items,
  getStepStatus,
}: {
  items: SplitStepNavItem[]
  getStepStatus: (id: string) => StepStatus
}) {
  const statuses = items.map(item => getStepStatus(item.id))
  const allCompleted = statuses.every(s => s === "completed")
  const hasError    = statuses.some(s => s === "error")

  if (allCompleted) {
    return (
      <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center shrink-0">
        <RiCheckLine className="size-3 text-background" />
      </div>
    )
  }
  if (hasError) {
    return (
      <div className="w-5 h-5 rounded-full bg-destructive flex items-center justify-center shrink-0">
        <RiAlertLine className="size-3 text-destructive-foreground" />
      </div>
    )
  }
  // Not started or partially complete
  return (
    <div className="w-5 h-5 rounded-full bg-muted-foreground/15 flex items-center justify-center shrink-0">
      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * Hierarchical collapsible step navigator for SplitStepLayout's left sidebar.
 *
 * Structure:
 *   ▾ Group title                        [group badge]
 *       Step title                       [step badge]
 *       Step title (current) ◀ outlined row, no badge
 *       Step title                       [step badge]
 *   ▸ Group title (collapsed)            [group badge]
 *
 * Rules:
 *   - Group containing the current step auto-opens when the step changes.
 *   - Completed steps are clickable (back-navigation).
 *   - Current step row has a bordered outline — no fill, no badge on the right.
 *   - Status badges are always on the RIGHT, mirroring the Airbnb pattern.
 *
 * Usage:
 *   const STEP_IDS = groups.flatMap(g => g.items.map(i => i.id))
 *   const getStatusById = (id) => form.getStepStatus(STEP_IDS.indexOf(id))
 *   const goToById = (id) => form.goToStep(STEP_IDS.indexOf(id))
 *
 *   <SplitStepNav
 *     groups={NAV_GROUPS}
 *     currentStepId={form.currentStepId}
 *     getStepStatus={getStatusById}
 *     onStepClick={goToById}
 *   />
 */
export function SplitStepNav({
  groups,
  currentStepId,
  getStepStatus,
  onStepClick,
}: SplitStepNavProps) {
  // Find the group that contains the current step
  const currentGroupId = React.useMemo(
    () => groups.find(g => g.items.some(item => item.id === currentStepId))?.id,
    [groups, currentStepId],
  )

  const [openGroups, setOpenGroups] = React.useState<Set<string>>(() => {
    const initial = new Set<string>()
    groups.forEach(g => {
      if (g.defaultOpen || g.id === currentGroupId) initial.add(g.id)
    })
    return initial
  })

  // Auto-open the group when the user navigates into a new group
  React.useEffect(() => {
    if (!currentGroupId) return
    setOpenGroups(prev => {
      if (prev.has(currentGroupId)) return prev
      const next = new Set(prev)
      next.add(currentGroupId)
      return next
    })
  }, [currentGroupId])

  function toggleGroup(groupId: string) {
    setOpenGroups(prev => {
      const next = new Set(prev)
      next.has(groupId) ? next.delete(groupId) : next.add(groupId)
      return next
    })
  }

  return (
    <nav className="flex flex-col gap-1" aria-label="Form sections">
      {groups.map(group => {
        const isOpen = openGroups.has(group.id)

        return (
          <div key={group.id}>
            {/* ── Group header ──────────────────────────────────────────── */}
            <button
              type="button"
              onClick={() => toggleGroup(group.id)}
              className="flex items-center gap-2 w-full px-2 py-2 rounded-lg text-left hover:bg-muted/60 transition-colors"
            >
              {isOpen ? (
                <RiArrowDownSLine className="size-4 text-muted-foreground shrink-0" />
              ) : (
                <RiArrowRightSLine className="size-4 text-muted-foreground shrink-0" />
              )}
              <span className="text-sm font-medium flex-1 min-w-0 truncate">
                {group.title}
              </span>
              <GroupBadge items={group.items} getStepStatus={getStepStatus} />
            </button>

            {/* ── Step items ────────────────────────────────────────────── */}
            {isOpen && (
              <div className="flex flex-col gap-0.5 pl-4 mt-0.5 mb-1">
                {group.items.map(item => {
                  const status     = getStepStatus(item.id)
                  const isCurrent  = item.id === currentStepId
                  const isClickable = status === "completed" && !!onStepClick

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={isClickable ? () => onStepClick!(item.id) : undefined}
                      disabled={!isClickable && !isCurrent}
                      aria-current={isCurrent ? "step" : undefined}
                      className={cn(
                        "flex items-center gap-2 w-full px-2 py-2 rounded-lg text-left text-sm transition-colors",
                        // Current: outlined border row, bold, no status badge
                        isCurrent &&
                          "border border-foreground/20 bg-background shadow-xs font-medium text-foreground cursor-default",
                        // Completed: muted text, clickable
                        !isCurrent && status === "completed" &&
                          "text-muted-foreground cursor-pointer hover:bg-muted/50",
                        // Error: muted-ish text
                        !isCurrent && status === "error" &&
                          "text-muted-foreground cursor-default",
                        // Upcoming: dimmer text
                        !isCurrent && status === "upcoming" &&
                          "text-muted-foreground/60 cursor-default",
                      )}
                    >
                      <span className="flex-1 min-w-0 truncate">{item.title}</span>
                      {item.optional && !isCurrent && (
                        <span className="text-xs text-muted-foreground/60 shrink-0">Optional</span>
                      )}
                      {/* No badge for current — the border outline is the indicator */}
                      {!isCurrent && <StepBadge status={status} />}
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
