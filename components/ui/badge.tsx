"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 overflow-hidden rounded-4xl font-medium whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        info:     "bg-info-lighter text-info-dark",
        success:  "bg-success-lighter text-success-dark",
        warning:  "bg-warning-lighter text-warning-dark",
        critical: "bg-error-lighter text-error-dark",
        neutral:  "bg-secondary text-secondary-foreground",
        caution:  "bg-primary/15 text-foreground dark:bg-primary/20 dark:text-primary",
      },
      size: {
        sm:      "h-4 px-1.5 py-1.5 text-xs [&>svg]:size-2.5!",
        default: "h-5 px-2 py-0.5 text-xs [&>svg]:size-3!",
        lg:      "h-6 px-2.5 text-sm [&>svg]:size-3.5!",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    icon?: React.ReactNode
  }) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {icon}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
