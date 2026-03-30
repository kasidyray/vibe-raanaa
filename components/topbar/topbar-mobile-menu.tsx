"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { RiMenuLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

import type { TopbarNavItem } from "./topbar-types"

type Props = {
  logo: React.ReactNode
  navItems: TopbarNavItem[]
}

export function TopbarMobileMenu({ logo, navItems }: Props) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  // Close the sheet whenever the route changes
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Open navigation menu" />
        }
      >
        <RiMenuLine />
      </SheetTrigger>

      <SheetContent side="left" showCloseButton className="flex flex-col gap-0 p-0">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle asChild>
            <div className="flex items-center">{logo}</div>
          </SheetTitle>
        </SheetHeader>

        <nav
          className="flex flex-col gap-0.5 overflow-y-auto p-3"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => {
            const isActive =
              pathname === item.url || pathname.startsWith(item.url + "/")

            return (
              <React.Fragment key={item.url}>
                <a
                  href={item.url}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  {item.icon && (
                    <span className="size-4 shrink-0 [&_svg]:size-4">{item.icon}</span>
                  )}
                  {item.title}
                </a>

                {item.items?.map((sub) => {
                  const subActive =
                    pathname === sub.url || pathname.startsWith(sub.url + "/")
                  return (
                    <a
                      key={sub.url}
                      href={sub.url}
                      className={cn(
                        "flex items-center rounded-md py-2 pl-10 pr-3 text-sm transition-colors",
                        subActive
                          ? "text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground/60 hover:text-sidebar-accent-foreground"
                      )}
                    >
                      {sub.title}
                    </a>
                  )
                })}
              </React.Fragment>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
