"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type SplitFormStepProps = {
  index: number
  currentIndex: number
  children: React.ReactNode
  className?: string
}

function panelClass(index: number, current: number) {
  if (index === current) return "opacity-100 translate-y-0 pointer-events-auto"
  if (index < current)  return "opacity-0 -translate-y-3 pointer-events-none"
  return "opacity-0 translate-y-3 pointer-events-none"
}

/**
 * A single step panel for SplitFormLayout.
 *
 * All steps mount simultaneously. CSS opacity + translate drives visibility,
 * so transitions are smooth in both directions.
 *
 * Content is centred with max-w-2xl and generous side padding, matching
 * the Airbnb "submit your experience" style.
 *
 * Must be a direct child of SplitFormLayout (which sets `relative overflow-hidden`
 * on the main area). Each panel is `absolute inset-0 overflow-y-auto`.
 */
export function SplitFormStep({ index, currentIndex, children, className }: SplitFormStepProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-y-auto",
        "transition-all duration-200 ease-out",
        panelClass(index, currentIndex),
      )}
    >
      <div className={cn("px-8 md:px-14 py-10 mx-auto w-full max-w-2xl flex flex-col gap-8", className)}>
        {children}
      </div>
    </div>
  )
}
