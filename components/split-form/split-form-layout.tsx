"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type SplitFormLayoutProps = {
  // ── Left sidebar ──────────────────────────────────────────────────────────
  /** Large bold title at the top of the sidebar ("Submit your experience") */
  flowTitle: string
  /** Renders a "Save and exit" underlined link in the sidebar header */
  onSaveExit?: () => void
  /** Pass a <SplitFormNav /> */
  sidebar?: React.ReactNode

  // ── Content area ──────────────────────────────────────────────────────────
  /** Thin label bar above the step content ("Basics", "Your idea", …) */
  sectionLabel?: string
  /** Progress 0–100 shown as a thin line at the BOTTOM of the content (in footer) */
  sectionProgress?: number

  // ── Step panels ───────────────────────────────────────────────────────────
  /** <SplitFormStep> panels */
  children: React.ReactNode

  // ── Footer ────────────────────────────────────────────────────────────────
  /**
   * Back/Next button row — rendered only in the content column (not under sidebar).
   * Pass a <SplitFormFooter />.
   */
  footer?: React.ReactNode

  className?: string
}

/**
 * Airbnb-style split-panel wizard shell.
 *
 * ┌──────────────────────┬──────────────────────────────────────────┐
 * │  [Logo]              │  sectionLabel                            │
 * │  Save and exit       ├──────────────────────────────────────────┤
 * │                      │                                          │
 * │  Flow title          │  Step content (left-aligned, scrollable) │
 * │                      │                                          │
 * │  SplitFormNav        │                                          │
 * │  (collapsible groups)│                                          │
 * │                      ├──────────────────────────────────────────┤
 * │                      │  ▬▬▬ progress line ▬▬▬                  │
 * │                      │  ← Back    helper text    Next →         │
 * └──────────────────────┴──────────────────────────────────────────┘
 *
 * Key differences from MultiStepLayout:
 * - Sidebar has its own bg-muted background
 * - Logo lives in the sidebar (top-left)
 * - Footer is inside the content column only (not full-width)
 * - Progress line is at the BOTTOM (above Back/Next), not the top
 * - Section label is at the top of the content column
 * - Content is left-aligned (no mx-auto centering)
 */
export function SplitFormLayout({
  flowTitle,
  onSaveExit,
  sidebar,
  sectionLabel,
  sectionProgress,
  children,
  footer,
  className,
}: SplitFormLayoutProps) {
  return (
    <div className={cn("min-h-svh flex flex-row bg-background", className)}>

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-60 xl:w-72 shrink-0 bg-muted/40 border-r">

        {/* Logo */}
        <div className="px-5 pt-5 pb-4 shrink-0">
          <img
            src="/mtn-logo.svg"
            alt="Logo"
            className="h-7 w-auto dark:invert"
          />
        </div>

        {/* Flow title */}
        <div className="px-5 pb-5 shrink-0">
          <h1 className="text-xl font-bold leading-snug">{flowTitle}</h1>
        </div>

        {/* Nav — scrollable */}
        {sidebar && (
          <div className="flex-1 overflow-y-auto px-3 pb-8">
            {sidebar}
          </div>
        )}
      </aside>

      {/* ── Content column ────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col min-h-0 min-w-0">

        {/* Section label bar (top of content) */}
        <div className="border-b px-8 md:px-14 py-4 shrink-0 flex items-center justify-between gap-4">
          {sectionLabel
            ? <span className="text-sm font-semibold">{sectionLabel}</span>
            : <span />
          }
          {onSaveExit && (
            <button
              type="button"
              onClick={onSaveExit}
              className="text-sm underline underline-offset-2 text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              Save and exit
            </button>
          )}
        </div>

        {/* Step panels — relative + overflow-hidden for SplitFormStep */}
        <main className="flex-1 relative overflow-hidden">
          {children}
        </main>

        {/* Footer — only in content column, progress line above buttons */}
        {footer && (
          <div className="shrink-0 border-t bg-background">
            {/* Progress line at the very top of the footer */}
            {sectionProgress !== undefined && (
              <div className="h-0.5 bg-border relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(100, Math.max(0, sectionProgress))}%` }}
                />
              </div>
            )}
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
