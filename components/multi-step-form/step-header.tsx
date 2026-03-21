"use client"

import * as React from "react"

type StepHeaderProps = {
  title: string
  description?: string
  // Optional slot above the title (e.g. a Badge or step number)
  eyebrow?: React.ReactNode
}

/**
 * Step title block placed at the top of the main content area.
 *
 * Renders a consistent heading hierarchy across all flows:
 *   eyebrow (optional) → h1 title → muted description
 */
export function StepHeader({ title, description, eyebrow }: StepHeaderProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {eyebrow && <div className="mb-1">{eyebrow}</div>}
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
