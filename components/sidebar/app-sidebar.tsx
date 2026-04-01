"use client"

import * as React from "react"

import { NavExamples } from "@/components/sidebar/nav-examples"
import { NavMain } from "@/components/sidebar/nav-main"
import { NavSecondary } from "@/components/sidebar/nav-secondary"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { RiDashboardLine, RiListUnordered, RiFolderLine, RiGroupLine, RiCameraLine, RiFileTextLine, RiSettingsLine, RiQuestionLine, RiSearchLine, RiFlashlightLine, RiLayoutGridLine, RiPieChartLine, RiTableLine, RiUserLine, RiHistoryLine, RiMessage2Line } from "@remixicon/react"
import { components } from "@/app/(main)/components/component-list"

const data = {
  user: {
    name: "Ikedi Eze",
    email: "kasidyray@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <RiDashboardLine />,
    },
    {
      title: "Playground",
      url: "/playground",
      icon: <RiFlashlightLine />,
    },
    {
      title: "Components",
      url: "/components",
      icon: <RiLayoutGridLine />,
      items: [...components].sort((a, b) => a.name.localeCompare(b.name)).map((c) => ({ title: c.name, url: `/components/${c.slug}` })),
    },
    {
      title: "Charts",
      url: "/charts",
      icon: <RiPieChartLine />,
    },
  ],
  navExamples: [
    {
      title: "Customers",
      url: "/customers",
      icon: <RiUserLine />,
    },
    {
      title: "Data Table",
      url: "/data-table",
      icon: <RiTableLine />,
    },
    {
      title: "Data Table 2",
      url: "/data-table-2",
      icon: <RiTableLine />,
    },
    {
      title: "Leads",
      url: "/leads",
      icon: <RiUserLine />,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: <RiFolderLine />,
    },
    {
      title: "Team",
      url: "/team",
      icon: <RiGroupLine />,
    },
    {
      title: "Activity",
      url: "/activity",
      icon: <RiHistoryLine />,
      badge: 12,
    },
    {
      title: "Canned Answers",
      url: "/canned-answers",
      icon: <RiMessage2Line />,
    },
    {
      title: "No Sidebar",
      url: "/topbar-demo",
      icon: <RiLayoutGridLine />,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: (
        <RiCameraLine
        />
      ),
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: (
        <RiFileTextLine
        />
      ),
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: (
        <RiFileTextLine
        />
      ),
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: (
        <RiSettingsLine
        />
      ),
    },
    {
      title: "Get Help",
      url: "/help",
      icon: (
        <RiQuestionLine
        />
      ),
    },
    {
      title: "Search",
      url: "/search",
      icon: (
        <RiSearchLine
        />
      ),
    },
  ],
}
function AppSidebarInner({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-4! group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center hover:bg-transparent! active:bg-transparent!"
              render={<a href="#" />}
            >
              {state === "collapsed"
                ? (
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary">
                    <img src="/mtn-logo.svg" alt="MTN" className="h-2.5 w-auto" />
                  </span>
                )
                : <img src="/mtn-logo.svg" alt="MTN Logo" className="h-8 w-auto dark:invert" />
              }
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavExamples items={data.navExamples} />
<NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return <AppSidebarInner {...props} />
}
