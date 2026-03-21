"use client"

import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

// ─── Field skeleton ────────────────────────────────────────────────────────────
// Mirrors a single label + input row

function FieldSkeleton({ wide = false }: { wide?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Skeleton className={cn("h-4", wide ? "w-28" : "w-20")} />
      <Skeleton className="h-9 w-full rounded-md" />
    </div>
  )
}

// ─── Card row skeleton ─────────────────────────────────────────────────────────
// Mirrors a bordered card row (e.g. role cards, permission toggles)

function CardRowSkeleton() {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border">
      <Skeleton className="w-4 h-4 rounded-full mt-0.5 shrink-0" />
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  )
}

// ─── Review row skeleton ───────────────────────────────────────────────────────
// Mirrors a label → value review row

function ReviewRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-4 w-24" />
    </div>
  )
}

// ─── StepSkeleton ─────────────────────────────────────────────────────────────

type StepSkeletonVariant =
  | "fields"       // form fields (label + input rows)
  | "cards"        // selectable card rows (role/account type pickers)
  | "toggles"      // permission toggle rows
  | "review"       // review/summary key-value rows

type StepSkeletonProps = {
  /**
   * Controls the shape of skeleton items rendered.
   *
   * - "fields"  — label + input pairs. Use for any step with text inputs.
   * - "cards"   — bordered selectable cards. Use for role/type picker steps.
   * - "toggles" — bordered rows with checkbox + label + description. Use for permission steps.
   * - "review"  — label/value pairs inside a card. Use for review/confirm steps.
   */
  variant?: StepSkeletonVariant

  /** Number of skeleton items to render. Match the real content count. */
  rows?: number

  className?: string
}

/**
 * Shape-matched loading skeleton for multi-step form step content.
 *
 * Rules (from constraints.md):
 *  - The MultiStepLayout shell (header, sidebar, footer) always renders immediately.
 *  - Only the main step content area is replaced by StepSkeleton while data loads.
 *  - The sidebar is never skeletonised — step titles are always known upfront.
 *  - The footer next button is disabled (not skeletonised) while loading.
 *  - variant and rows must match the actual content that will replace them.
 *
 * Usage:
 *   const [isLoading, setIsLoading] = React.useState(true)
 *   React.useEffect(() => {
 *     const t = setTimeout(() => setIsLoading(false), 800)
 *     return () => clearTimeout(t)
 *   }, [currentStepIndex])  // re-run when step changes if each step fetches data
 *
 *   {isLoading ? <StepSkeleton variant="cards" rows={3} /> : <ActualContent />}
 */
export function StepSkeleton({
  variant = "fields",
  rows = 3,
  className,
}: StepSkeletonProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Step header skeleton — always rendered regardless of variant */}
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>

      {/* Step content skeleton — shape varies by variant */}
      {variant === "fields" && (
        <div className="flex flex-col gap-4">
          {Array.from({ length: rows }).map((_, i) => (
            <FieldSkeleton key={i} wide={i % 2 === 0} />
          ))}
        </div>
      )}

      {variant === "cards" && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: rows }).map((_, i) => (
            <CardRowSkeleton key={i} />
          ))}
        </div>
      )}

      {variant === "toggles" && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl border">
              <Skeleton className="w-4 h-4 rounded shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-4 h-4 rounded shrink-0" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {variant === "review" && (
        <div className="flex flex-col gap-4">
          {/* Section block */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-36" />
            <div className="rounded-xl border px-4">
              {Array.from({ length: rows }).map((_, i) => (
                <ReviewRowSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
