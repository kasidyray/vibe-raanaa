import * as React from "react"

type SplitFormHeaderProps = {
  title: string
  description?: string
}

/**
 * Large left-aligned step title, matching the Airbnb step header style.
 *
 * Deliberately larger than the multi-step-form StepHeader — uses text-3xl
 * to give the content area the bold, editorial feel of the Airbnb wizard.
 */
export function SplitFormHeader({ title, description }: SplitFormHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl font-bold leading-tight tracking-tight">{title}</h2>
      {description && (
        <p className="text-base text-muted-foreground leading-relaxed">{description}</p>
      )}
    </div>
  )
}
