"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SettingsNav, settingsNavItems } from "@/components/settings/settings-nav"

// This layout owns:
// - The SiteHeader (with dynamic breadcrumb derived from the active route)
// - The two-column shell: SettingsNav (left) + page content (right)
//
// Sub-pages export only their content — no SiteHeader, no outer wrappers.
// On mobile the nav collapses to a horizontal scrollable row above the content.

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const activeItem = settingsNavItems.find(item => pathname.startsWith(item.href))

  return (
    <>
      <SiteHeader
        left={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/settings/profile">Settings</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{activeItem?.label ?? "Settings"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />

      {/*
        No padding on the outer wrapper — the divider must touch the SiteHeader
        above and the bottom of the page container below.
        Padding lives inside the nav and content columns individually.
      */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Nav column — sticky below site header on desktop */}
        <div className="shrink-0 border-b p-4 md:sticky md:top-[var(--header-height)] md:self-start md:border-b-0 md:p-6">
          <SettingsNav />
        </div>

        {/* Content column — border-l acts as the full-height divider */}
        <div className="flex-1 min-w-0 flex flex-col items-center p-4 md:border-l md:p-6 md:overflow-y-auto">
          <div className="w-full max-w-3xl flex flex-col gap-6">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
