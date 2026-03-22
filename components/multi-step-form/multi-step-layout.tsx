"use client"

import * as React from "react"
import { RiCloseLine } from "@remixicon/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type MultiStepLayoutProps = {
  // Header bar
  logo?: React.ReactNode
  flowTitle?: string
  onClose?: () => void

  // Optional step indicator shown in header ("Step 2 of 5")
  stepIndicator?: React.ReactNode

  // Progress bar — shown in footer above Back/Next buttons (0-100)
  showProgressBar?: boolean
  progress?: number

  // Left sidebar (StepSidebar). Omit for no sidebar.
  sidebar?: React.ReactNode

  // Main step content
  children: React.ReactNode

  // Footer (StepFooter) — rendered only in the content column, not under sidebar
  footer?: React.ReactNode

  className?: string
}

/**
 * Full-page shell for distraction-free multi-step flows.
 *
 * Context B — standalone page outside app/(main)/.
 * All design token rules still apply — no raw colours, no inline styles
 * except the dynamic `width` on the progress bar.
 *
 * Layout:
 *   [header: logo | flow title | step indicator | close]
 *   [thin progress bar]
 *   [sidebar (optional) | main content (scrollable)]
 *   [sticky footer]
 */
export function MultiStepLayout({
  logo,
  flowTitle,
  onClose,
  stepIndicator,
  showProgressBar = false,
  progress = 0,
  sidebar,
  children,
  footer,
  className,
}: MultiStepLayoutProps) {
  return (
    <div className={cn("min-h-svh flex flex-col bg-background", className)}>
      {/* ── Header bar ─────────────────────────────────────────── */}
      <header className="border-b h-14 px-6 flex items-center justify-between shrink-0 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {logo && <div className="shrink-0">{logo}</div>}
          {flowTitle && (
            <>
              {logo && <div className="w-px h-4 bg-border shrink-0" />}
              <span className="text-sm font-medium truncate">{flowTitle}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {stepIndicator && (
            <span className="text-sm text-muted-foreground tabular-nums hidden sm:block">
              {stepIndicator}
            </span>
          )}
          {onClose && (
            <Button
              variant="outline"
              size="icon-lg"
              onClick={onClose}
              aria-label="Exit flow"
            >
              <RiCloseLine />
            </Button>
          )}
        </div>
      </header>

      {/* ── Body ───────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar — hidden on mobile */}
        {sidebar && (
          <aside className="w-64 shrink-0 border-r p-6 overflow-y-auto hidden md:flex flex-col">
            {sidebar}
          </aside>
        )}

        {/* Content column — main + footer stacked so footer only spans this area */}
        <div className="flex flex-1 flex-col min-h-0 min-w-0">
          {/* Main content — relative + overflow-hidden so StepTransition panels
              can stack as absolute inset-0 children and animate between each other */}
          <main className="flex-1 relative overflow-hidden">
            {children}
          </main>

          {/* ── Footer — only in content column, not under sidebar ── */}
          {footer && (
            <div className="shrink-0 border-t bg-background">
              {/* Progress bar at top of footer */}
              {showProgressBar && (
                <div className="h-0.5 bg-muted relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              )}
              <div className="h-16 px-6 flex items-center">
                {footer}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
