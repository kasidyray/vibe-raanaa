"use client"

import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavExamples({
  items,
}: {
  items: {
    title: string
    url: string
    icon: React.ReactNode
    badge?: number | string
  }[]
}) {
  const pathname = usePathname()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Examples</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              isActive={pathname === item.url}
              render={<Link href={item.url} />}
            >
              {item.icon}
              <span>{item.title}</span>
              {item.badge !== undefined && (
                <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
