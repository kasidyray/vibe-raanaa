"use client"

import { SiteHeader } from "@/components/site-header"
import { Container } from "@/components/ui/container"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { RiGlobalLine, RiUploadLine, RiLifebuoyLine } from "@remixicon/react"

export default function SettingsPage() {
  return (
    <>
      <SiteHeader
        left={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>General</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
        right={
          <Button variant="ghost" size="sm">
            <RiLifebuoyLine />
            Support
          </Button>
        }
      />
      <div className="flex flex-1 flex-col gap-8 p-4 md:p-6">
        <Container size="sm">
          {/* Page title */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">General</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage general settings for your Workspace</p>
          </div>

          {/* Workspace form */}
          <div className="rounded-xl border divide-y">
            {/* Workspace name */}
            <div className="p-4 flex flex-col gap-3">
              <label className="text-sm font-medium">Workspace name</label>
              <Input defaultValue="SL Mobbin" className="max-w-sm" />
            </div>

            {/* Workspace slug */}
            <div className="p-4 flex flex-col gap-3">
              <div>
                <label className="text-sm font-medium">Workspace slug</label>
                <p className="text-xs text-muted-foreground mt-0.5">Access your workspace demos at a custom path.</p>
              </div>
              <div className="relative max-w-sm">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">/</span>
                <Input defaultValue="slmobbin" className="pl-6" />
              </div>
            </div>

            {/* Workspace domain */}
            <div className="p-4 flex flex-col gap-3">
              <div>
                <label className="text-sm font-medium">Workspace domain</label>
                <p className="text-xs text-muted-foreground mt-0.5">Used for your workspace logo, and allowing teammates to join your workspace.</p>
              </div>
              <div className="relative max-w-sm">
                <RiGlobalLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input defaultValue="gmail.com" className="pl-9" />
              </div>
            </div>

            {/* Workspace logo */}
            <div className="p-4 flex flex-col gap-3">
              <div>
                <label className="text-sm font-medium">Workspace logo</label>
                <p className="text-xs text-muted-foreground mt-0.5">Used for your workspace avatar, and initializes form logos.</p>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="size-10 rounded-lg">
                  <AvatarFallback className="rounded-lg text-xs font-bold">SLM</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <RiUploadLine />
                  Replace
                </Button>
              </div>
            </div>

            {/* Footer actions */}
            <div className="px-4 py-3 flex items-center justify-end gap-2 bg-muted/40 rounded-b-xl">
              <Button variant="ghost" size="sm">Cancel</Button>
              <Button size="sm">Save</Button>
            </div>
          </div>

          {/* Settings section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold tracking-tight mb-4">Settings</h2>
            <div className="rounded-xl border divide-y">
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <RiLifebuoyLine className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Beta access</p>
                    <p className="text-xs text-muted-foreground">Get early access to new features</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
