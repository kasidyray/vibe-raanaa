"use client"

import * as React from "react"

import { NavDocuments } from "@/components/sidebar/nav-documents"
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
} from "@/components/ui/sidebar"
import { RiDashboardLine, RiListUnordered, RiFolderLine, RiGroupLine, RiCameraLine, RiFileTextLine, RiSettingsLine, RiQuestionLine, RiSearchLine, RiDatabase2Line, RiFileChartLine, RiFileLine, RiCommandLine, RiFlashlightLine, RiLayoutGridLine, RiPieChartLine, RiTableLine, RiUserLine, RiHistoryLine } from "@remixicon/react"

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
      icon: (
        <RiDashboardLine
        />
      ),
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
    },
    {
      title: "Charts",
      url: "/charts",
      icon: <RiPieChartLine />,
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
      icon: (
        <RiFolderLine
        />
      ),
    },
    {
      title: "Team",
      url: "/team",
      icon: (
        <RiGroupLine
        />
      ),
    },
    {
      title: "Activity",
      url: "/activity",
      icon: <RiHistoryLine />,
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
  documents: [
    {
      name: "Data Library",
      url: "/data-library",
      icon: (
        <RiDatabase2Line
        />
      ),
    },
    {
      name: "Reports",
      url: "/reports",
      icon: (
        <RiFileChartLine
        />
      ),
    },
    {
      name: "Word Assistant",
      url: "/word-assistant",
      icon: (
        <RiFileLine
        />
      ),
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-4!"
              render={<a href="#" />}
            >
              <img src="/mtn-logo.svg" alt="MTN Logo" className="h-8 w-auto dark:invert" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
