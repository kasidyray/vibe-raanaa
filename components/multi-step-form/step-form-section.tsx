"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type StepFormSectionProps = {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

/**
 * Labeled section grouping related fields within a step.
 *
 * Usage:
 *   <StepFormSection title="Personal details" description="As printed on your ID">
 *     <div className="flex flex-col gap-4">
 *       <Field ... />
 *       <Field ... />
 *     </div>
 *   </StepFormSection>
 */
export function StepFormSection({
  title,
  description,
  children,
  className,
}: StepFormSectionProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {(title || description) && (
        <div className="flex flex-col gap-1">
          {title && <h2 className="text-sm font-medium">{title}</h2>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  )
}
