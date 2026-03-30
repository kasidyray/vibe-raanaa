import * as React from "react"
import {
  RiDashboardLine,
  RiGroupLine,
  RiHistoryLine,
  RiUserLine,
} from "@remixicon/react"

import { NotificationProvider } from "@/components/notifications"
import { AppTopbar } from "@/components/topbar/app-topbar"
import type { TopbarNavItem, TopbarUser } from "@/components/topbar/topbar-types"

// ─── Nav config ───────────────────────────────────────────────────────────────
// Keep this list under 5 items. If the app grows beyond 5 primary links,
// switch to the sidebar layout in app/(main)/ instead.

const NAV_ITEMS: TopbarNavItem[] = [
  {
    title: "Dashboard",
    url: "/topbar-demo",
    icon: <RiDashboardLine />,
    exact: true,
  },
  {
    title: "Customers",
    url: "/topbar-demo/customers",
    icon: <RiUserLine />,
  },
  {
    title: "Team",
    url: "/topbar-demo/team",
    icon: <RiGroupLine />,
  },
  {
    title: "Activity",
    url: "/topbar-demo/activity",
    icon: <RiHistoryLine />,
  },
]

const DEFAULT_USER: TopbarUser = {
  name: "Ikedi Eze",
  email: "kasidyray@gmail.com",
  avatarUrl: "https://i.pravatar.cc/32?img=12",
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function TopbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider>
      <div
        className="flex min-h-svh flex-col bg-sidebar md:h-svh"
        style={
          { "--header-height": "calc(var(--spacing) * 14)" } as React.CSSProperties
        }
      >
        <AppTopbar
          logo={
            <img
              src="/mtn-logo.svg"
              alt="Logo"
              className="h-7 w-auto dark:invert"
            />
          }
          navItems={NAV_ITEMS}
          user={DEFAULT_USER}
        />
        <main className="flex flex-1 flex-col bg-background md:rounded-2xl md:overflow-hidden md:shadow-md md:border">
          {children}
        </main>
      </div>
    </NotificationProvider>
  )
}
