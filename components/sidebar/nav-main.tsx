"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { RiArrowRightSLine } from "@remixicon/react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

type NavSubItem = {
  title: string
  url: string
}

type NavItem = {
  title: string
  url: string
  icon?: React.ReactNode
  items?: NavSubItem[]
}

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname()
  const [indicatorY, setIndicatorY] = useState<number | null>(null)

  useEffect(() => {
    const updateIndicator = () => {
      const activeBtn = document.querySelector<HTMLElement>(
        '[data-sidebar="menu-button"][data-active]'
      )
      if (activeBtn) {
        const rect = activeBtn.getBoundingClientRect()
        setIndicatorY(rect.top + rect.height / 2)
      } else {
        setIndicatorY(null)
      }
    }
    updateIndicator()
    const scrollContainer = document.querySelector('[data-sidebar="content"]')
    scrollContainer?.addEventListener("scroll", updateIndicator, { passive: true })
    return () => scrollContainer?.removeEventListener("scroll", updateIndicator)
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
              const isActive = pathname === item.url || pathname.startsWith(item.url + "/")

              if (item.items && item.items.length > 0) {
                return (
                  <Collapsible
                    key={item.title}
                    defaultOpen={isActive}
                    className="group/collapsible"
                    render={<SidebarMenuItem />}
                  >
                    <CollapsibleTrigger
                      render={
                        <SidebarMenuButton tooltip={item.title} isActive={isActive} />
                      }
                    >
                      {item.icon}
                      <span>{item.title}</span>
                      <RiArrowRightSLine className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((sub) => (
                          <SidebarMenuSubItem key={sub.title}>
                            <SidebarMenuSubButton
                              isActive={pathname === sub.url}
                              render={<a href={sub.url} />}
                            >
                              <span>{sub.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                )
              }

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
