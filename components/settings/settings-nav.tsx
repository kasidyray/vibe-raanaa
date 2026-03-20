"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  RiUserLine,
  RiSettings2Line,
  RiNotificationLine,
  RiShieldLine,
  RiBankCardLine,
  RiGroupLine,
  RiServerLine,
  RiFlashlightLine,
} from "@remixicon/react"
import { cn } from "@/lib/utils"

// Exported so layout.tsx can derive the active label from pathname
export const settingsNavItems = [
  { label: "Profile",       href: "/settings/profile",       icon: RiUserLine },
  { label: "Preferences",   href: "/settings/preferences",   icon: RiSettings2Line },
  { label: "Notifications", href: "/settings/notifications", icon: RiNotificationLine },
  { label: "Security",      href: "/settings/security",      icon: RiShieldLine },
  { label: "Billing",       href: "/settings/billing",       icon: RiBankCardLine },
  { label: "Team",          href: "/settings/team",          icon: RiGroupLine },
  { label: "Integrations",  href: "/settings/integrations",  icon: RiServerLine },
  { label: "Advanced",      href: "/settings/advanced",      icon: RiFlashlightLine },
] as const

export function SettingsNav() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop: fixed vertical list */}
      <nav
        className="hidden md:flex w-52 shrink-0 flex-col gap-0.5"
        aria-label="Settings navigation"
      >
        {settingsNavItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-full px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-accent/70 text-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Mobile: horizontally scrollable pill row */}
      <nav
        className="flex md:hidden overflow-x-auto gap-1 pb-2 -mx-4 px-4 shrink-0"
        aria-label="Settings navigation"
      >
        {settingsNavItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "bg-accent/70 text-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="size-3.5 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
