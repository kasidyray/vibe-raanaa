import { cva, type VariantProps } from "class-variance-authority"
import {
  RiInformationLine,
  RiFlashlightLine,
  RiCheckLine,
  RiAlertLine,
  RiErrorWarningLine,
} from "@remixicon/react"

import { cn } from "@/lib/utils"

const iconBadgeVariants = cva(
  "flex shrink-0 items-center justify-center rounded-full [&_svg]:pointer-events-none [&_svg]:shrink-0 [[data-slot=dialog-header]_&]:mb-4",
  {
    variants: {
      variant: {
        neutral:     "bg-secondary text-foreground",
        primary:     "bg-primary/10 text-primary",
        success:     "bg-success-lighter text-success",
        warning:     "bg-warning-lighter text-warning",
        info:        "bg-info-lighter text-info",
        destructive: "bg-destructive/15 text-destructive",
      },
      size: {
        sm:      "size-8  [&_svg:not([class*='size-'])]:size-4",
        default: "size-10 [&_svg:not([class*='size-'])]:size-5",
        lg:      "size-12 [&_svg:not([class*='size-'])]:size-6",
        xl:      "size-14 [&_svg:not([class*='size-'])]:size-7",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "xl",
    },
  }
)

const defaultIcons: Record<string, React.ReactNode> = {
  neutral:     <RiInformationLine />,
  primary:     <RiFlashlightLine />,
  success:     <RiCheckLine />,
  warning:     <RiAlertLine />,
  info:        <RiInformationLine />,
  destructive: <RiErrorWarningLine />,
}

export interface IconBadgeProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof iconBadgeVariants> {}

function IconBadge({ className, variant, size, children, ...props }: IconBadgeProps) {
  return (
    <div
      data-slot="icon-badge"
      className={cn(iconBadgeVariants({ variant, size }), className)}
      {...props}
    >
      {children ?? defaultIcons[variant ?? "neutral"]}
    </div>
  )
}

export { IconBadge, iconBadgeVariants }
