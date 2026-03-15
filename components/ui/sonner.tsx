"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { RiCheckboxCircleLine, RiInformationLine, RiErrorWarningLine, RiCloseCircleLine, RiLoaderLine } from "@remixicon/react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <RiCheckboxCircleLine className="text-success size-4" />
        ),
        info: (
          <RiInformationLine className="text-info size-4" />
        ),
        warning: (
          <RiErrorWarningLine className="text-warning size-4" />
        ),
        error: (
          <RiCloseCircleLine className="text-error size-4" />
        ),
        loading: (
          <RiLoaderLine className="text-muted-foreground size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
