import * as React from "react"
import { cn } from "@/lib/utils"

type SplitFormSectionProps = {
  /** Optional label above the section content */
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

/**
 * Groups related fields within a SplitFormStep.
 *
 * Renders an optional small-caps section label above the content.
 * No card/border by default — just spacing. Add your own border/bg
 * to the children when needed.
 */
export function SplitFormSection({ title, description, children, className }: SplitFormSectionProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {(title || description) && (
        <div className="flex flex-col gap-1">
          {title && (
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {title}
            </p>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  )
}
