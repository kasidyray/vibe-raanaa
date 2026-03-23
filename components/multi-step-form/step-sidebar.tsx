"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { StepConfig, StepStatus } from "@/lib/steps"
import { flattenStepIds } from "@/lib/steps"
import { StepIndicator } from "@/components/ui/step-indicator"

type StepSidebarProps = {
  steps: StepConfig[]
  getStepStatus: (index: number) => StepStatus
  onStepClick?: (index: number) => void
  /**
   * "linear" (default) — only completed steps are clickable for back-navigation.
   * "free"             — any step is clickable regardless of status.
   */
  mode?: "linear" | "free"
}

/**
 * Vertical step navigator for the left sidebar.
 *
 * Matches SplitFormNav styling exactly:
 *  - Mercury-style numbered circles on top-level steps
 *  - Flat steps are directly navigable rows
 *  - Grouped steps (subSteps) are collapsible with connecting line + sub-step dots
 */
export function StepSidebar({ steps, getStepStatus, onStepClick, mode = "linear" }: StepSidebarProps) {
  const flatIds = React.useMemo(() => flattenStepIds(steps), [steps])

  // Derive current step ID from statuses
  const currentStepId = flatIds.find((_, i) => getStepStatus(i) === "current") ?? ""

  function statusById(id: string): StepStatus {
    return getStepStatus(flatIds.indexOf(id))
  }

  // Track which grouped steps are open
  const currentTopId = React.useMemo(
    () => steps.find(s =>
      s.subSteps
        ? s.subSteps.some(sub => sub.id === currentStepId)
        : s.id === currentStepId
    )?.id,
    [steps, currentStepId],
  )

  const [open, setOpen] = React.useState<Set<string>>(() => {
    const s = new Set<string>()
    steps.forEach(step => {
      if (step.subSteps && step.id === currentTopId) s.add(step.id)
    })
    return s
  })

  React.useEffect(() => {
    if (!currentTopId) return
    setOpen(prev => {
      if (prev.has(currentTopId)) return prev
      const next = new Set(prev)
      next.add(currentTopId)
      return next
    })
  }, [currentTopId])

  function toggle(id: string) {
    setOpen(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <nav className="flex flex-col gap-4" aria-label="Form steps">
      {steps.map((step, i) => {
        const number = i + 1

        // ── Flat step ─────────────────────────────────────────────────────────
        if (!step.subSteps || step.subSteps.length === 0) {
          const s         = statusById(step.id)
          const isCurrent = step.id === currentStepId
          const clickable = !!onStepClick && !isCurrent && (mode === "free" || s === "completed" || s === "error")

          return (
            <div key={step.id}>
              <button
                type="button"
                onClick={clickable ? () => onStepClick!(flatIds.indexOf(step.id)) : undefined}
                disabled={!clickable && !isCurrent}
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "flex items-center gap-3 w-full px-2 py-2.5 rounded-full text-left transition-colors",
                  isCurrent  && "bg-accent/70 cursor-default",
                  clickable  && "cursor-pointer hover:bg-accent",
                )}
              >
                <StepIndicator status={s} number={number} />
                <span className={cn(
                  "text-sm flex-1 min-w-0 truncate transition-colors",
                  isCurrent              && "font-medium text-foreground",
                  !isCurrent && s === "completed" && "font-medium text-muted-foreground",
                  !isCurrent && s === "upcoming"  && "font-medium text-muted-foreground",
                  s === "error"          && "font-medium text-destructive",
                )}>
                  {step.title}
                </span>
                {step.optional && !isCurrent && (
                  <span className="text-xs text-muted-foreground/50 shrink-0">Optional</span>
                )}
              </button>
            </div>
          )
        }

        // ── Grouped step (has subSteps) ────────────────────────────────────────
        const isOpen     = open.has(step.id)
        const statuses   = step.subSteps.map(sub => statusById(sub.id))
        const groupStatus: StepStatus =
          statuses.some(s => s === "error")      ? "error"     :
          statuses.every(s => s === "completed") ? "completed" :
          statuses.some(s => s === "current")    ? "current"   :
          "upcoming"

        return (
          <div key={step.id} className="relative">
            {/* ── Group header ── */}
            <button
              type="button"
              onClick={() => toggle(step.id)}
              className="flex items-center gap-3 w-full px-2 py-2.5 rounded-full text-left hover:bg-accent transition-colors cursor-pointer"
            >
              <StepIndicator status={groupStatus} number={number} />
              <span className={cn(
                "text-sm flex-1 min-w-0 truncate transition-colors",
                groupStatus === "current"   && "font-medium text-muted-foreground",
                groupStatus === "completed" && "font-medium text-muted-foreground",
                groupStatus === "upcoming"  && "font-medium text-muted-foreground",
                groupStatus === "error"     && "font-medium text-destructive",
              )}>
                {step.title}
              </span>
            </button>

            {/* Connecting line */}
            {isOpen && (
              <div className="absolute left-[17px] top-[30px] bottom-[26px] w-px bg-border" />
            )}

            {/* ── Sub-step items ── */}
            {isOpen && (
              <div className="relative flex flex-col mb-1">
                {step.subSteps.map(sub => {
                  const s         = statusById(sub.id)
                  const isCurrent = sub.id === currentStepId
                  const clickable = !!onStepClick && !isCurrent && (mode === "free" || s === "completed" || s === "error")

                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={clickable ? () => onStepClick!(flatIds.indexOf(sub.id)) : undefined}
                      disabled={!clickable && !isCurrent}
                      aria-current={isCurrent ? "step" : undefined}
                      className={cn(
                        "relative flex items-center gap-3 w-full pr-2 py-1.5 rounded-full text-left text-sm transition-colors",
                        isCurrent  && "bg-accent/70 font-medium text-foreground cursor-default",
                        !isCurrent && s === "error"    && "text-destructive/70",
                        clickable  && "cursor-pointer hover:bg-accent",
                      )}
                    >
                      <span className="relative z-10 ml-2 w-5 flex items-center justify-center shrink-0">
                        {s === "completed" ? (
                          <span className="w-2 h-2 rounded-full bg-primary" />
                        ) : s === "error" ? (
                          <span className="w-2 h-2 rounded-full bg-destructive" />
                        ) : isCurrent ? (
                          <span className="w-2 h-2 rounded-full border border-primary bg-background" />
                        ) : (
                          <span className="w-2 h-2 rounded-full border border-muted-foreground/30 bg-background" />
                        )}
                      </span>
                      <span className="flex-1 min-w-0 truncate">{sub.title}</span>
                      {sub.optional && !isCurrent && (
                        <span className="text-xs text-muted-foreground/50 shrink-0">Optional</span>
                      )}
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
