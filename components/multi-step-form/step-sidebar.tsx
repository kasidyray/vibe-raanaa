"use client"

import * as React from "react"
import { RiCheckLine, RiAlertLine } from "@remixicon/react"
import { cn } from "@/lib/utils"
import type { StepConfig, StepStatus } from "./types"

type StepSidebarProps = {
  steps: StepConfig[]
  getStepStatus: (index: number) => StepStatus
  // Clicking a completed step navigates back to it
  onStepClick?: (index: number) => void
}

/**
 * Vertical step navigator for the left sidebar.
 *
 * Each step is a single full-width row (circle + label) with no connector lines.
 *
 *  - current   → radio-button indicator (outer ring + inner dot) + row background highlight
 *  - completed → muted filled circle + check icon, clickable to go back
 *  - upcoming  → border-only circle, muted label
 *  - error     → destructive ring + alert icon
 */
export function StepSidebar({ steps, getStepStatus, onStepClick }: StepSidebarProps) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Form steps">
      {steps.map((step, index) => {
        const status = getStepStatus(index)
        const isClickable = status === "completed" && !!onStepClick

        return (
          <button
            key={step.id}
            type="button"
            disabled={!isClickable && status !== "current"}
            onClick={isClickable ? () => onStepClick(index) : undefined}
            aria-current={status === "current" ? "step" : undefined}
            aria-label={`${step.title}${status === "completed" ? " (completed)" : ""}`}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2 rounded-full text-left transition-colors",
              status === "current" && "bg-muted cursor-default",
              isClickable && "cursor-pointer hover:bg-muted/60",
              !isClickable && status !== "current" && "cursor-default",
            )}
          >
            {/* ── Step indicator circle ───────────────────────────────────── */}
            {status === "current" && (
              <div className="w-4 h-4 rounded-full border border-foreground shrink-0" />
            )}

            {status === "completed" && (
              <div className="w-4 h-4 rounded-full bg-muted-foreground/25 flex items-center justify-center shrink-0">
                <RiCheckLine className="size-2.5 text-muted-foreground" />
              </div>
            )}

            {status === "error" && (
              <div className="w-4 h-4 rounded-full border border-destructive bg-destructive/10 flex items-center justify-center shrink-0">
                <RiAlertLine className="size-2.5 text-destructive" />
              </div>
            )}

            {status === "upcoming" && (
              <div className="w-4 h-4 rounded-full border border-border shrink-0" />
            )}

            {/* ── Label ──────────────────────────────────────────────────── */}
            <div className="flex flex-col min-w-0">
              <span
                className={cn(
                  "text-sm transition-colors",
                  status === "current" && "text-foreground font-medium",
                  status === "completed" && "text-muted-foreground",
                  (status === "upcoming" || status === "error") && "text-muted-foreground",
                )}
              >
                {step.title}
              </span>
              {step.optional && (
                <span className="text-xs text-muted-foreground leading-none">Optional</span>
              )}
            </div>
          </button>
        )
      })}
    </nav>
  )
}
