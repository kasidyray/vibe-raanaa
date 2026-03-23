import { RiAlertLine, RiCheckLine } from "@remixicon/react"
import type { StepStatus } from "@/lib/steps"

/**
 * Mercury-style numbered step circle.
 *
 *  completed → bg-success-lighter + green ring + number
 *  current   → bg-foreground + number (inverted)
 *  error     → bg-destructive + alert icon
 *  upcoming  → muted border + number
 */
export function StepIndicator({ status, number }: { status: StepStatus; number: number }) {
  if (status === "completed") {
    return (
      <span className="relative z-10 w-5 h-5 flex items-center justify-center shrink-0">
        <RiCheckLine className="size-4 text-success" />
      </span>
    )
  }
  if (status === "current") {
    return (
      <span className="relative z-10 w-5 h-5 rounded-full bg-foreground flex items-center justify-center shrink-0">
        <span className="text-[10px] font-semibold text-background leading-none">{number}</span>
      </span>
    )
  }
  if (status === "error") {
    return (
      <span className="relative z-10 w-5 h-5 flex items-center justify-center shrink-0">
        <RiAlertLine className="size-4 text-destructive" />
      </span>
    )
  }
  return (
    <span className="relative z-10 w-5 h-5 rounded-full border border-muted-foreground/30 flex items-center justify-center shrink-0">
      <span className="text-[10px] font-medium text-foreground leading-none">{number}</span>
    </span>
  )
}
