"use client"

import * as React from "react"
import { RiCloseLine } from "@remixicon/react"
import type { VariantProps } from "class-variance-authority"

import { buttonVariants } from "@/components/ui/button"
import { SidebarContext } from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"]

export type DataTableSelectionBarAction =
  | { icon: React.ElementType; label: string; onClick?: () => void; variant?: ButtonVariant }
  | "separator"

function DataTableSelectionBar({
  count,
  onClear,
  actions,
  label = "selected",
}: {
  count: number
  onClear: () => void
  actions: DataTableSelectionBarAction[]
  label?: string
}) {
  const sidebar = React.useContext(SidebarContext)
  const open = sidebar?.open ?? false
  const visible = count > 0

  return (
    <div
      className={cn(
        "fixed bottom-6 left-0 right-0 z-50 flex justify-center transition-[padding] duration-200 pointer-events-none",
      )}
      style={{ paddingLeft: open ? "var(--sidebar-width)" : undefined }}
    >
      <div
        className={cn(
          "pointer-events-auto transition-all duration-200",
          visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none",
        )}
      >
        <div className="flex items-center gap-1 rounded-full border bg-popover px-2 py-2 shadow-xl shadow-black/10 ring-1 ring-border/50">
          <div className="flex items-center gap-2 px-2">
            <span className="text-sm font-medium tabular-nums">
              {count} {label}
            </span>
            <button
              onClick={onClear}
              className="flex size-5 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Clear selection"
            >
              <RiCloseLine className="size-3.5" />
            </button>
          </div>

          <TooltipProvider delay={300}>
            {actions.map((action, i) =>
              action === "separator" ? (
                <div key={i} className="mx-1 h-5 w-px shrink-0 bg-border" />
              ) : (
                <Tooltip key={action.label}>
                  <TooltipTrigger
                    onClick={action.onClick}
                    className={buttonVariants({ variant: action.variant ?? "outline", size: "icon-sm" })}
                  >
                    <action.icon />
                  </TooltipTrigger>
                  <TooltipContent>{action.label}</TooltipContent>
                </Tooltip>
              ),
            )}
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}

export { DataTableSelectionBar }
