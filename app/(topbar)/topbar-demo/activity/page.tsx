"use client"

import * as React from "react"
import { RiContractLeftRightLine, RiDownloadLine } from "@remixicon/react"

import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { containerSizes, type ContainerSize } from "@/app/(main)/activity/data"
import { ActivityTable } from "@/app/(main)/activity/activity-table"

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TopbarActivityPage() {
  const [containerSize, setContainerSize] = React.useState<ContainerSize>("xl")

  const content = (
    <>
      <PageHeader
        title="Activity"
        description="A complete audit trail of all actions, changes, and system events in your workspace."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RiDownloadLine />
              Export
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" size="sm" aria-label="Change width" />}>
                <RiContractLeftRightLine />
                Width
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Content width</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {containerSizes.map(({ value, label }) => (
                    <DropdownMenuCheckboxItem
                      key={value}
                      checked={containerSize === value}
                      onClick={() => setContainerSize(value)}
                    >
                      {label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      />

      <Tabs defaultValue="all" className="flex flex-1 flex-col">
        <div className="pb-4">
          <TabsList variant="pill">
            <TabsTrigger value="all">All events</TabsTrigger>
            <TabsTrigger value="auth">Auth &amp; Access</TabsTrigger>
            <TabsTrigger value="data">Data changes</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all"><ActivityTable viewFilter="all" /></TabsContent>
        <TabsContent value="auth"><ActivityTable viewFilter="auth" /></TabsContent>
        <TabsContent value="data"><ActivityTable viewFilter="data" /></TabsContent>
        <TabsContent value="system"><ActivityTable viewFilter="system" /></TabsContent>
      </Tabs>
    </>
  )

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 md:overflow-y-auto">
      <Container size={containerSize} className="flex flex-1 flex-col gap-6">
        {content}
      </Container>
    </div>
  )
}
