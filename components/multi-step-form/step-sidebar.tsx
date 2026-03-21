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
 * Each step shows:
 *  - A numbered circle (current = primary fill, completed = success ring + check, error = destructive, upcoming = border)
 *  - A thin vertical connector line between steps
 *  - Step title (current = foreground, completed = clickable muted, upcoming = dim)
 *  - Optional "Optional" label beneath the title
 *
 * Completed steps are clickable to allow back-navigation.
 */
export function StepSidebar({ steps, getStepStatus, onStepClick }: StepSidebarProps) {
  return (
    <nav className="flex flex-col" aria-label="Form steps">
      {steps.map((step, index) => {
        const status = getStepStatus(index)
        const isClickable = status === "completed" && !!onStepClick

        return (
          <div key={step.id} className="flex gap-3">
            {/* Column: circle + connector line */}
            <div className="flex flex-col items-center shrink-0">
              {/* Step circle */}
              <button
                type="button"
                disabled={!isClickable}
                onClick={isClickable ? () => onStepClick(index) : undefined}
                aria-label={`Step ${index + 1}: ${step.title}`}
                aria-current={status === "current" ? "step" : undefined}
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors shrink-0",
                  status === "current" &&
                    "bg-primary text-primary-foreground",
                  status === "completed" &&
                    "bg-success/15 text-success border border-success/40",
                  status === "error" &&
                    "bg-destructive/10 text-destructive border border-destructive/40",
                  status === "upcoming" &&
                    "border border-border text-muted-foreground/50",
                  isClickable && "cursor-pointer hover:opacity-80",
                  !isClickable && "cursor-default",
                )}
              >
                {status === "completed" ? (
                  <RiCheckLine className="size-3" />
                ) : status === "error" ? (
                  <RiAlertLine className="size-3" />
                ) : (
                  index + 1
                )}
              </button>

              {/* Connector line — only between steps */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-px flex-1 my-1.5",
                    status === "completed" ? "bg-success/30" : "bg-border",
                  )}
                />
              )}
            </div>

            {/* Step label */}
            <button
              type="button"
              disabled={!isClickable}
              onClick={isClickable ? () => onStepClick(index) : undefined}
              className={cn(
                "flex flex-col text-left min-w-0 pb-5",
                index === steps.length - 1 && "pb-0",
                isClickable ? "cursor-pointer" : "cursor-default",
              )}
            >
              <span
                className={cn(
                  "text-sm leading-6 transition-colors",
                  status === "current" && "text-foreground font-medium",
                  status === "completed" &&
                    "text-muted-foreground hover:text-foreground",
                  (status === "upcoming" || status === "error") &&
                    "text-muted-foreground/50",
                )}
              >
                {step.title}
              </span>
              {step.optional && (
                <span className="text-xs text-muted-foreground/40 leading-none">
                  Optional
                </span>
              )}
            </button>
          </div>
        )
      })}
    </nav>
  )
}
