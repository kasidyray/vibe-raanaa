"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type SplitStepLayoutProps = {
  // ── Left sidebar ──────────────────────────────────────────────────────────
  flowTitle: string
  onSaveExit?: () => void
  /** Pass a <SplitStepNav /> or any custom nav */
  sidebar?: React.ReactNode

  // ── Content header ────────────────────────────────────────────────────────
  /** Section name shown in the thin bar above step content (e.g. "Basics") */
  sectionTitle?: string
  /** Thin coloured underline on the section bar showing section completion */
  showSectionProgress?: boolean
  sectionProgress?: number  // 0–100

  // ── Step content ──────────────────────────────────────────────────────────
  /** StepTransition panels — same pattern as MultiStepLayout */
  children: React.ReactNode

  // ── Footer ────────────────────────────────────────────────────────────────
  /** Full-width sticky bar at the very bottom — pass a <StepFooter /> */
  footer?: React.ReactNode

  className?: string
}

/**
 * Full-page distraction-free shell — Airbnb "submit your experience" style.
 *
 * Context B — standalone, outside app/(main)/. All design token rules apply.
 *
 * Layout (desktop):
 *   ┌──────────────────┬─────────────────────────────────────┐
 *   │  Save and exit   │  Section title bar                  │
 *   │                  │  ─────── (optional progress line)   │
 *   │  Flow title      │                                     │
 *   │                  │  Step content (scrollable)          │
 *   │  Grouped step    │                                     │
 *   │  nav             │                                     │
 *   ├──────────────────┴─────────────────────────────────────┤
 *   │  ← Back              helper text              Next →   │
 *   └─────────────────────────────────────────────────────────┘
 *
 * Layout (mobile):
 *   Sidebar hidden. Section title bar stays. Footer stays sticky.
 *   A mobile step indicator can be added via the sectionTitle prop.
 */
export function SplitStepLayout({
  flowTitle,
  onSaveExit,
  sidebar,
  sectionTitle,
  showSectionProgress = false,
  sectionProgress = 0,
  children,
  footer,
  className,
}: SplitStepLayoutProps) {
  return (
    <div className={cn("min-h-svh flex flex-col bg-background", className)}>

      {/* ── Main body ─────────────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* ── Left sidebar — desktop only ───────────────────────────────── */}
        <aside className="hidden md:flex flex-col w-60 xl:w-72 shrink-0 border-r">
          {/* Save and exit */}
          {onSaveExit && (
            <div className="px-5 pt-5 shrink-0">
              <button
                type="button"
                onClick={onSaveExit}
                className="text-sm underline underline-offset-2 hover:text-muted-foreground transition-colors"
              >
                Save and exit
              </button>
            </div>
          )}

          {/* Flow title */}
          <div className={cn("px-5 py-5 shrink-0", !onSaveExit && "pt-8")}>
            <h1 className="text-xl font-bold leading-snug">{flowTitle}</h1>
          </div>

          {/* Step nav — scrollable */}
          {sidebar && (
            <div className="flex-1 overflow-y-auto px-3 pb-6">
              {sidebar}
            </div>
          )}
        </aside>

        {/* ── Content area ──────────────────────────────────────────────── */}
        <div className="flex flex-1 flex-col min-h-0 min-w-0">

          {/* Section title bar */}
          {sectionTitle && (
            <div className="border-b px-6 md:px-10 py-3 shrink-0 relative">
              <span className="text-sm font-medium">{sectionTitle}</span>
              {/* Dynamic width — inline style exception */}
              {showSectionProgress && (
                <div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(100, Math.max(0, sectionProgress))}%` }}
                />
              )}
            </div>
          )}

          {/* Step content — relative + overflow-hidden anchors StepTransition panels */}
          <main className="flex-1 relative overflow-hidden">
            {children}
          </main>
        </div>
      </div>

      {/* ── Footer — full width, spans both columns ────────────────────── */}
      {footer && (
        <footer className="border-t h-16 px-6 flex items-center shrink-0 bg-background">
          {footer}
        </footer>
      )}
    </div>
  )
}
