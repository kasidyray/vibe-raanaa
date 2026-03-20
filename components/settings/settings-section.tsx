import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

// ---------------------------------------------------------------------------
// SettingsSection
//
// Bordered card that wraps a logical group of settings.
//
// Footer behaviour:
//   - onSave provided, no footer prop → default save footer with unsaved-changes indicator
//   - footer prop provided → renders that as the footer (use for custom actions)
//   - neither → no footer (read-only / informational sections)
// ---------------------------------------------------------------------------

interface SettingsSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  // Default save footer
  onSave?: () => void
  isSaving?: boolean
  isDirty?: boolean
  saveLabel?: string
  // Custom footer override
  footer?: React.ReactNode
  // Inline error displayed above the footer
  error?: string | null
  className?: string
}

export function SettingsSection({
  title,
  description,
  children,
  onSave,
  isSaving = false,
  isDirty = false,
  saveLabel = "Save changes",
  footer,
  error,
  className,
}: SettingsSectionProps) {
  const hasFooter = onSave !== undefined || footer !== undefined

  return (
    <div className={cn("rounded-xl border bg-card/50", className)}>
      {/* Section header */}
      <div className="px-5 py-4 border-b">
        <p className="text-lg font-medium">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>

      {/* Content rows — divided by border */}
      <div className="divide-y">{children}</div>

      {/* Inline error (shown above footer, below content) */}
      {error && (
        <div className="px-5 py-3 border-t">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Footer */}
      {hasFooter && (
        <div className="flex items-center justify-between gap-4 px-5 py-3 border-t bg-muted rounded-b-xl">
          {footer !== undefined ? (
            footer
          ) : (
            <>
              {isDirty && !isSaving ? (
                <p className="text-xs text-muted-foreground">You have unsaved changes</p>
              ) : (
                <span />
              )}
              <Button
                size="sm"
                onClick={onSave}
                loading={isSaving}
                disabled={!isDirty}
              >
                {saveLabel}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SettingsRow
//
// A single row inside a SettingsSection.
//
// layout="row" (default)
//   Horizontal: label + description on the left, control on the right.
//   Best for: Switch, Select (inline), Badge, read-only values.
//
// layout="col"
//   Vertical: label + description stacked above the control.
//   Best for: Input, Textarea, wide selects.
// ---------------------------------------------------------------------------

interface SettingsRowProps {
  label: string
  description?: string
  /** Associates a <label> with a form control via htmlFor/id */
  htmlFor?: string
  children: React.ReactNode
  layout?: "row" | "col"
  className?: string
}

export function SettingsRow({
  label,
  description,
  htmlFor,
  children,
  layout = "row",
  className,
}: SettingsRowProps) {
  const labelEl = htmlFor ? (
    <Label htmlFor={htmlFor} className="text-sm font-medium cursor-pointer">
      {label}
    </Label>
  ) : (
    <p className="text-sm font-medium">{label}</p>
  )

  if (layout === "col") {
    return (
      <div className={cn("flex flex-col gap-1.5 px-5 py-4", className)}>
        <div>
          {labelEl}
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
        {children}
      </div>
    )
  }

  return (
    <div className={cn("flex items-start justify-between gap-6 px-5 py-4", className)}>
      <div className="min-w-0 flex-1 pt-0.5">
        {labelEl}
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}
