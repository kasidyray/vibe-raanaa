"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
}) {
  const pathname = usePathname()
  const [indicatorY, setIndicatorY] = useState<number | null>(null)

  useEffect(() => {
    // data-active is set by SidebarMenuButton when isActive=true
    const activeBtn = document.querySelector<HTMLElement>(
      '[data-sidebar="menu-button"][data-active]'
    )
    if (activeBtn) {
      const rect = activeBtn.getBoundingClientRect()
      setIndicatorY(rect.top + rect.height / 2)
    } else {
      setIndicatorY(null)
    }
  }, [pathname])

  return (
    <>
      {indicatorY !== null && (
        <span
          aria-hidden
          className="pointer-events-none fixed left-0 z-50 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary transition-[top] duration-200"
          style={{ top: indicatorY }}
        />
      )}
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            {items.map((item) => {
              const isActive = pathname === item.url
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActive}
                    render={<a href={item.url} />}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}
