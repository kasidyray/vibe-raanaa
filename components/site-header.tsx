"use client"

import * as React from "react"
import {
  RiBellLine,
  RiQuestionLine,
  RiSettingsLine,
  RiLogoutBoxLine,
  RiUserLine,
  RiExternalLinkLine,
} from "@remixicon/react"

import { ModeToggle } from "@/components/mode-toggle"
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
import { SidebarTrigger } from "@/components/ui/sidebar"

function DefaultHeaderRight() {
  return (
    <>
      <ModeToggle />
      <Button variant="ghost" size="icon" className="size-8 text-muted-foreground" aria-label="Notifications">
        <RiBellLine className="size-4" />
      </Button>
      <Button variant="ghost" size="icon" className="size-8 text-muted-foreground" aria-label="Help">
        <RiQuestionLine className="size-4" />
      </Button>
      <Separator orientation="vertical" className="h-4 data-vertical:self-auto" />
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Avatar size="sm">
            <AvatarImage src="https://i.pravatar.cc/32?img=12" alt="User avatar" />
            <AvatarFallback>IK</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <div className="flex flex-col gap-0.5 px-3 py-2">
            <span className="text-sm font-medium text-foreground">Ike Dieze</span>
            <span className="text-xs text-muted-foreground">ike@example.com</span>
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
          <DropdownMenuItem variant="destructive">
            <RiLogoutBoxLine />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export function SiteHeader({
  left,
  right,
}: {
  left?: React.ReactNode
  right?: React.ReactNode
}) {
  return (
    <header className="sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/80 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto"
        />
        {left && <div className="flex items-center gap-2">{left}</div>}
        <div className="ml-auto flex items-center gap-1">
          {right ?? <DefaultHeaderRight />}
        </div>
      </div>
    </header>
  )
}
