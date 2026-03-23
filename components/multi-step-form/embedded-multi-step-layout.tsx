"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type EmbeddedMultiStepLayoutProps = {
  // Thin progress bar spanning full width above the body
  showProgressBar?: boolean
  progress?: number

  // Left sidebar (StepSidebar). Omit for no sidebar.
  sidebar?: React.ReactNode

  // Main step content — StepTransition panels go here.
  // Navigation buttons (StepFooter) should be placed as the last child
  // inside each StepTransition, not passed as a separate prop.
  children: React.ReactNode

  className?: string
}

/**
 * Inline multi-step shell for use inside the app/(main)/ layout.
 *
 * Mirrors the settings layout pattern — the component fills the available
 * page height with no outer padding. Navigation (back/next/cancel) belongs
 * inside each StepTransition as the last child, separated by a border-t.
 *
 * Structure:
 *   [thin progress bar — full width, optional]
 *   [sidebar (optional) | divider | step content area]
 *     ↑ the divider stretches top-to-bottom via flex align-stretch
 *     ↑ sidebar and content have their own internal padding (p-6)
 *     ↑ content area is relative + overflow-hidden so StepTransition works
 *
 * Usage in a page:
 *   // Outer wrapper must be flex-1 with no padding so the divider reaches edges:
 *   <EmbeddedMultiStepLayout
 *     showProgressBar
 *     progress={form.progress}
 *     sidebar={<StepSidebar ... />}
 *   >
 *     <StepTransition index={0} currentIndex={form.currentStepIndex}>
 *       <StepHeader ... />
 *       <StepFormSection>...</StepFormSection>
 *       <div className="border-t pt-6">
 *         <StepFooter ... />
 *       </div>
 *     </StepTransition>
 *   </EmbeddedMultiStepLayout>
 */
export function EmbeddedMultiStepLayout({
  showProgressBar = false,
  progress = 0,
  sidebar,
  children,
  className,
}: EmbeddedMultiStepLayoutProps) {
  return (
    <div className={cn("flex flex-1 flex-col overflow-hidden", className)}>
      {/* ── Progress bar — full width above the sidebar/content split ────── */}
      {showProgressBar && (
        <div className="h-0.5 bg-muted shrink-0">
          {/* width is a dynamic calculated value — inline style exception */}
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      )}

      {/* ── Body — flex row so divider stretches full height ─────────────── */}
      <div className="flex flex-1 min-h-0 md:flex-row flex-col">
        {sidebar && (
          <>
            {/* Sidebar column — border-b on mobile acts as row separator */}
            <aside className="p-4 md:p-6 border-b md:border-b-0 w-full md:w-72 shrink-0 hidden md:flex flex-col">
              {sidebar}
            </aside>

            {/* Vertical divider — desktop only, stretches full height via flex align-stretch */}
            <div className="hidden md:block w-px bg-border shrink-0" />
          </>
        )}

        {/* Step content — relative + overflow-hidden so StepTransition panels
            stack as absolute inset-0 children and animate between each other */}
        <div className="flex-1 min-w-0 min-h-0 relative overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
