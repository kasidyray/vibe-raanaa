"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  RiInformationLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiCloseCircleLine,
  RiCloseLine,
} from "@remixicon/react"

import { cn } from "@/lib/utils"

// ─── Context ─────────────────────────────────────────────────────────────────

type AlertVariant = "info" | "success" | "warning" | "error"
type AlertLevel   = "page" | "section" | "inline"

const AlertContext = React.createContext<{
  variant: AlertVariant
  level: AlertLevel
  onClose?: () => void
}>({ variant: "info", level: "section" })

// ─── Variants ────────────────────────────────────────────────────────────────

const alertVariants = cva(
  "flex w-full items-start gap-3",
  {
    variants: {
      variant: {
        info:    "bg-info-lighter text-info-dark border-info-light [&_[data-slot=alert-icon]]:text-info",
        success: "bg-success-lighter text-success-dark border-success-light [&_[data-slot=alert-icon]]:text-success",
        warning: "bg-warning-lighter text-warning-dark border-warning-light [&_[data-slot=alert-icon]]:text-warning",
        error:   "bg-error-lighter text-error-dark border-error-light [&_[data-slot=alert-icon]]:text-error",
      },
      level: {
        page:    "rounded-none px-6 py-4",
        section: "rounded-xl px-4 py-4",
        inline:  "rounded-lg px-3 py-2.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "info",
      level: "section",
    },
  }
)

// ─── Alert ───────────────────────────────────────────────────────────────────

function Alert({
  className,
  variant = "info",
  level = "section",
  onClose,
  role = "alert",
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    onClose?: () => void
  }) {
  return (
    <AlertContext.Provider value={{ variant: variant as AlertVariant, level: level as AlertLevel, onClose }}>
      <div
        data-slot="alert"
        data-variant={variant}
        data-level={level}
        role={role}
        className={cn(alertVariants({ variant, level }), className)}
        {...props}
      >
        {children}
      </div>
    </AlertContext.Provider>
  )
}

// ─── AlertIcon ───────────────────────────────────────────────────────────────

const iconMap: Record<AlertVariant, React.ElementType> = {
  info:    RiInformationLine,
  success: RiCheckboxCircleLine,
  warning: RiErrorWarningLine,
  error:   RiCloseCircleLine,
}

function AlertIcon({ className, children, ...props }: React.ComponentProps<"span">) {
  const { variant } = React.useContext(AlertContext)
  const Icon = iconMap[variant]
  return (
    <span
      data-slot="alert-icon"
      className={cn("mt-0.5 shrink-0 [&_svg]:size-4", className)}
      aria-hidden="true"
      {...props}
    >
      {children ?? <Icon />}
    </span>
  )
}

// ─── AlertContent ────────────────────────────────────────────────────────────

function AlertContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-content"
      className={cn("flex flex-1 flex-col gap-1", className)}
      {...props}
    />
  )
}

// ─── AlertTitle ──────────────────────────────────────────────────────────────

function AlertTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-title"
      className={cn("text-sm font-medium leading-snug", className)}
      {...props}
    />
  )
}

// ─── AlertDescription ────────────────────────────────────────────────────────

function AlertDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-description"
      className={cn("text-sm leading-snug opacity-90", className)}
      {...props}
    />
  )
}

// ─── AlertActions ────────────────────────────────────────────────────────────
// Always place inside AlertContent, below AlertDescription.
// Actions are styled as underlined text links per the eBay anatomy.

function AlertActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-actions"
      className={cn("mt-1.5 flex flex-wrap items-center gap-3", className)}
      {...props}
    />
  )
}

// ─── AlertClose ──────────────────────────────────────────────────────────────

function AlertClose({ className, ...props }: React.ComponentProps<"button">) {
  const { onClose } = React.useContext(AlertContext)
  return (
    <button
      data-slot="alert-close"
      type="button"
      aria-label="Dismiss"
      onClick={onClose}
      className={cn(
        "ml-auto -mt-0.5 -mr-1 shrink-0 rounded-md p-1 opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current",
        className
      )}
      {...props}
    >
      <RiCloseLine className="size-4" />
    </button>
  )
}

export {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertActions,
  AlertClose,
}
