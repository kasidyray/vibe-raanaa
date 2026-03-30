"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  RiExternalLinkLine,
  RiLogoutBoxLine,
  RiQuestionLine,
  RiSettingsLine,
  RiUserLine,
} from "@remixicon/react"

import { ModeToggle } from "@/components/mode-toggle"
import { NotificationBell } from "@/components/notifications"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

import { TopbarMobileMenu } from "./topbar-mobile-menu"
import { TopbarNavLink } from "./topbar-nav-link"
import type { TopbarNavItem, TopbarUser } from "./topbar-types"

// ─── Types ────────────────────────────────────────────────────────────────────

type ContainerSize = "sm" | "default" | "lg" | "xl" | "full"

const CONTAINER_MAX_WIDTH: Record<ContainerSize, string> = {
  sm:      "max-w-2xl",
  default: "max-w-4xl",
  lg:      "max-w-6xl",
  xl:      "max-w-7xl",
  full:    "w-full",
}

export type AppTopbarProps = {
  logo: React.ReactNode
  navItems: TopbarNavItem[]
  user: TopbarUser
  /**
   * Matches the Container size used by pages in this layout so the topbar
   * content aligns with the page content. Defaults to "xl".
   */
  containerSize?: ContainerSize
  /** Replaces the entire right-side controls section. */
  right?: React.ReactNode
}

// ─── User menu ────────────────────────────────────────────────────────────────

function TopbarUserMenu({ user }: { user: TopbarUser }) {
  const router = useRouter()

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <Avatar size="sm">
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <div className="flex flex-col gap-0.5 px-3 py-2">
          <span className="text-sm font-medium text-foreground">{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <RiUserLine />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RiSettingsLine />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RiExternalLinkLine />
            Documentation
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => router.push("/login3")}
        >
          <RiLogoutBoxLine />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ─── Default right controls ───────────────────────────────────────────────────

function DefaultTopbarRight({ user }: { user: TopbarUser }) {
  return (
    <>
      <ModeToggle />
      <NotificationBell />
      <Button variant="ghost" size="icon" aria-label="Help">
        <RiQuestionLine />
      </Button>
      <Separator orientation="vertical" className="mx-1 h-4 data-vertical:self-auto" />
      <TopbarUserMenu user={user} />
    </>
  )
}

// ─── AppTopbar ────────────────────────────────────────────────────────────────

export function AppTopbar({
  logo,
  navItems,
  user,
  containerSize = "xl",
  right,
}: AppTopbarProps) {
  const maxWidth = CONTAINER_MAX_WIDTH[containerSize]

  return (
    <header className="sticky top-0 z-10 h-(--header-height) shrink-0 bg-sidebar">
      <div className={`mx-auto h-full w-full px-4 md:px-0 ${maxWidth}`}>

        {/* ── Mobile layout ──────────────────────────────────────────────── */}
        <div className="flex h-full items-center justify-between md:hidden">
          <div className="shrink-0">{logo}</div>
          <div className="flex items-center gap-1">
            <ModeToggle />
            <NotificationBell />
            <TopbarMobileMenu logo={logo} navItems={navItems} />
          </div>
        </div>

        {/* ── Desktop layout: 3-col grid for true centering ──────────────── */}
        <div className="hidden h-full grid-cols-[1fr_auto_1fr] items-center md:grid">

          {/* Left: logo + separator */}
          <div className="flex items-center gap-4">
            <div className="shrink-0">{logo}</div>
            {navItems.length > 0 && (
              <Separator
                orientation="vertical"
                className="h-4 data-vertical:self-auto"
              />
            )}
          </div>

          {/* Center: nav links */}
          {navItems.length > 0 ? (
            <nav
              className="flex items-center gap-5"
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <TopbarNavLink key={item.url} item={item} />
              ))}
            </nav>
          ) : (
            <div />
          )}

          {/* Right: controls */}
          <div className="flex items-center justify-end gap-1">
            {right ?? <DefaultTopbarRight user={user} />}
          </div>

        </div>
      </div>
    </header>
  )
}
