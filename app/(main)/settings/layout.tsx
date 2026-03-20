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
        {/* Nav column — border-b on mobile acts as the row separator */}
        <div className="p-4 md:p-6 border-b md:border-b-0">
          <SettingsNav />
        </div>

        {/* Vertical divider — desktop only, stretches full height via flex align-stretch */}
        <div className="hidden md:block w-px bg-border shrink-0" />

        {/* Content column */}
        <div className="flex-1 min-w-0 flex flex-col items-center p-4 md:p-6">
          <div className="w-full max-w-3xl flex flex-col gap-6">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
