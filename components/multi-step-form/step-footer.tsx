"use client"

import * as React from "react"
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"

type StepFooterProps = {
  isFirstStep?: boolean
  isLastStep?: boolean

  onBack?: () => void
  onNext?: () => void
  onCancel?: () => void

  nextLabel?: string  // Default: "Continue"
  backLabel?: string  // Default: "Back"
  submitLabel?: string // Used when isLastStep — default: "Submit"

  isLoading?: boolean
  isNextDisabled?: boolean

  // Shown to the left of the primary CTA (e.g. "Step 2 of 4 · Next: Assign role")
  helperText?: string
}

/**
 * Sticky footer with back/next/submit navigation controls.
 *
 * Layout:
 *   [← Back | Cancel]        [helper text]   [Continue →]
 *
 * Rules:
 *  - Cancel only on first step (back button not shown there)
 *  - Back on all steps except first
 *  - Primary CTA label changes to submitLabel on the last step
 *  - Loading state disables and spins the primary CTA
 */
export function StepFooter({
  isFirstStep = false,
  isLastStep = false,
  onBack,
  onNext,
  onCancel,
  nextLabel = "Continue",
  backLabel = "Back",
  submitLabel = "Submit",
  isLoading = false,
  isNextDisabled = false,
  helperText,
}: StepFooterProps) {
  const primaryLabel = isLastStep ? submitLabel : nextLabel

  return (
    <div className="flex items-center justify-between w-full gap-4">
      {/* Left: back or cancel */}
      <div className="flex items-center gap-1">
        {!isFirstStep && onBack && (
          <Button variant="secondary" size="lg" onClick={onBack} type="button">
            <RiArrowLeftSLine />
            {backLabel}
          </Button>
        )}
        {isFirstStep && onCancel && (
          <Button variant="secondary" size="lg" onClick={onCancel} type="button">
            Cancel
          </Button>
        )}
      </div>

      {/* Right: helper text + primary CTA */}
      <div className="flex items-center gap-3">
        {helperText && (
          <span className="text-xs text-muted-foreground hidden sm:block">
            {helperText}
          </span>
        )}
        <Button
          onClick={onNext}
          loading={isLoading}
          disabled={isNextDisabled || isLoading}
          type="button"
        >
          {primaryLabel}
          {!isLastStep && <RiArrowRightSLine />}
        </Button>
      </div>
    </div>
  )
}
