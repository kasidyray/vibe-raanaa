import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const dotColors: Record<string, string> = {
  info:     "bg-info",
  success:  "bg-success",
  warning:  "bg-warning",
  critical: "bg-error",
  neutral:  "bg-muted-foreground/50",
  caution:  "bg-primary",
}

const statusBadgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-4xl border border-border font-normal whitespace-nowrap text-foreground",
  {
    variants: {
      variant: {
        info:     "",
        success:  "",
        warning:  "",
        critical: "",
        neutral:  "",
        caution:  "",
      },
      size: {
        sm:      "h-4 px-1 text-xs [&>[data-dot]]:size-1.5",
        default: "h-5 px-1.5 text-xs [&>[data-dot]]:size-2",
        lg:      "h-6 px-2 text-sm [&>[data-dot]]:size-2.5",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "default",
    },
  }
)

function StatusBadge({
  className,
  variant = "neutral",
  size,
  children,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof statusBadgeVariants>) {
  return (
    <span
      data-slot="status-badge"
      className={cn(statusBadgeVariants({ variant, size }), className)}
      {...props}
    >
      <span
        data-dot
        className={cn("shrink-0 rounded-full", dotColors[variant ?? "neutral"])}
      />
      {children}
    </span>
  )
}

export { StatusBadge, statusBadgeVariants }
