"use client"

import * as React from "react"
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"

type SplitFormFooterProps = {
  isFirst?: boolean
  isLast?: boolean
  onBack?: () => void
  onNext?: () => void
  /** Shown on first step instead of Back */
  onCancel?: () => void
  backLabel?: string
  nextLabel?: string
  submitLabel?: string
  /** Centred helper text (e.g. "21 items remaining") */
  helperText?: string
  isLoading?: boolean
  isNextDisabled?: boolean
}

/**
 * Full-width sticky footer for SplitFormLayout.
 *
 * Matches the Airbnb wizard footer pattern:
 *   [← Back (outline)]     [helper text]     [Next → (primary)]
 *
 * - Back uses variant="outline" (bordered, not filled)
 * - Next/Submit uses the default primary Button
 * - Helper text sits centred between the two actions
 * - On the first step, Back is replaced by Cancel (or hidden if no onCancel)
 */
export function SplitFormFooter({
  isFirst = false,
  isLast = false,
  onBack,
  onNext,
  onCancel,
  backLabel = "Back",
  nextLabel = "Next",
  submitLabel = "Submit",
  helperText,
  isLoading = false,
  isNextDisabled = false,
}: SplitFormFooterProps) {
  return (
    <div className="flex items-center justify-between px-4 h-16">
      {/* ── Left: Back or Cancel ─────────────────────────────────────────── */}
      <div>
        {!isFirst && onBack && (
          <Button variant="outline" size="lg" onClick={onBack} type="button">
            <RiArrowLeftSLine />
            {backLabel}
          </Button>
        )}
        {isFirst && onCancel && (
          <Button variant="outline" size="lg" onClick={onCancel} type="button">
            Cancel
          </Button>
        )}
      </div>

      {/* ── Centre: helper text ──────────────────────────────────────────── */}
      {helperText && (
        <span className="text-sm text-muted-foreground hidden sm:block">
          {helperText}
        </span>
      )}

      {/* ── Right: Next or Submit ────────────────────────────────────────── */}
      <Button
        size="lg"
        onClick={onNext}
        loading={isLoading}
        disabled={isNextDisabled || isLoading}
        type="button"
      >
        {isLast ? submitLabel : nextLabel}
        {!isLast && <RiArrowRightSLine />}
      </Button>
    </div>
  )
}
