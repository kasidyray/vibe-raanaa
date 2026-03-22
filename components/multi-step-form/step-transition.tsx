"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Determines the transition class for a given step panel.
 *
 * Mirrors the register flow pattern (login3/register/page.tsx):
 *   current  → opacity-100 translate-y-0   (visible, centre)
 *   past     → opacity-0  -translate-y-3   (exited above)
 *   future   → opacity-0   translate-y-3   (waiting below)
 *
 * Going forward: next step slides up from below → centre.
 * Going back:    prev step slides down from above → centre.
 */
function stepClass(index: number, current: number) {
  if (index === current) return "opacity-100 translate-y-0 pointer-events-auto"
  if (index < current)  return "opacity-0 -translate-y-3 pointer-events-none"
  return "opacity-0 translate-y-3 pointer-events-none"
}

type StepTransitionProps = {
  /** This panel's position in the step array (0-based). */
  index: number
  /** The currently active step index from useMultiStepForm. */
  currentIndex: number
  children: React.ReactNode
}

/**
 * Wraps a single step's content so all steps can be mounted simultaneously
 * and transition smoothly via CSS opacity + translate.
 *
 * Must be a direct child of MultiStepLayout (which sets `relative overflow-hidden`
 * on the main area). Each StepTransition is `absolute inset-0 overflow-y-auto`.
 *
 * Usage in a flow page:
 *   <StepTransition index={0} currentIndex={form.currentStepIndex}>
 *     <StepHeader ... />
 *     <StepFormSection ... />
 *   </StepTransition>
 *   <StepTransition index={1} currentIndex={form.currentStepIndex}>
 *     ...
 *   </StepTransition>
 *
 * Loading states live inside the transition, not around it:
 *   <StepTransition index={1} currentIndex={form.currentStepIndex}>
 *     {isLoadingRoles ? <StepSkeleton variant="cards" rows={3} /> : <ActualContent />}
 *   </StepTransition>
 */
export function StepTransition({ index, currentIndex, children }: StepTransitionProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-y-auto",
        "transition-all duration-200 ease-out",
        stepClass(index, currentIndex),
      )}
    >
      <div className="mx-auto max-w-2xl px-6 py-10 flex flex-col gap-8">
        {children}
      </div>
    </div>
  )
}
