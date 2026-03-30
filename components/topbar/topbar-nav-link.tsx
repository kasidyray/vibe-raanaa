"use client"

import { usePathname } from "next/navigation"
import { RiArrowDownSLine } from "@remixicon/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import type { TopbarNavItem } from "./topbar-types"

const BASE =
  "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
const ACTIVE = "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
const INACTIVE =
  "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"

export function TopbarNavLink({ item }: { item: TopbarNavItem }) {
  const pathname = usePathname()
  const isActive = item.exact
    ? pathname === item.url
    : pathname === item.url || pathname.startsWith(item.url + "/")

  if (item.items && item.items.length > 0) {
    const hasActiveChild = item.items.some(
      (sub) => pathname === sub.url || pathname.startsWith(sub.url + "/")
    )
    const isGroupActive = isActive || hasActiveChild

    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(BASE, isGroupActive ? ACTIVE : INACTIVE, "cursor-pointer gap-1.5")}
        >
          {item.title}
          <RiArrowDownSLine className="size-3.5 shrink-0" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-44">
          {item.items.map((sub) => (
            <DropdownMenuItem key={sub.url} render={<a href={sub.url} />}>
              {sub.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <a href={item.url} className={cn(BASE, isActive ? ACTIVE : INACTIVE)}>
      {item.title}
    </a>
  )
}
