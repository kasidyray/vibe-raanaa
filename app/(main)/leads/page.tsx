"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  RiAddLine,
  RiBuilding2Line,
  RiContractLeftRightLine,
} from "@remixicon/react"
import { SiteHeader } from "@/components/site-header"
import { Container }  from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { Button }     from "@/components/ui/button"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator, BreadcrumbLink,
} from "@/components/ui/breadcrumb"
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
import {
  Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent,
} from "@/components/ui/empty"
import { containerSizes, type ContainerSize } from "./data"
import { CreateLeadFlow } from "./create-lead-flow"
import { LeadsTable }     from "./leads-table"

export default function LeadsPage() {
  const [containerSize, setContainerSize] = React.useState<ContainerSize>("xl")
  const [isCreating,    setIsCreating]    = React.useState(false)
  const [formKey,       setFormKey]       = React.useState(0)

  function handleCancel() {
    setIsCreating(false)
    setFormKey(k => k + 1)
  }

  function handleComplete(name: string) {
    toast.success(`${name} added to leads`)
    setIsCreating(false)
    setFormKey(k => k + 1)
  }

  const content = (
    <>
      <PageHeader
        title="Leads"
        description="Track and manage your sales leads across all pipelines."
        actions={
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" aria-label="Change width" />}>
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
            <Button onClick={() => setIsCreating(true)}><RiAddLine />New lead</Button>
          </div>
        }
      />
      <Tabs defaultValue="all" className="flex flex-1 flex-col">
        <div className="pb-4">
          <TabsList variant="pill">
            <TabsTrigger value="all">All leads</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all">
          <LeadsTable />
        </TabsContent>
        <TabsContent value="pipeline" className="flex flex-1">
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia variant="stacked">
                <RiBuilding2Line />
              </EmptyMedia>
              <EmptyTitle>Pipeline view coming soon</EmptyTitle>
              <EmptyDescription>
                The pipeline view is under construction. Check back later or continue managing leads from the table view.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" size="sm" onClick={() => setIsCreating(true)}>
                <RiAddLine />Add lead
              </Button>
            </EmptyContent>
          </Empty>
        </TabsContent>
      </Tabs>
    </>
  )

  return (
    <>
      <SiteHeader
        left={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                {isCreating ? (
                  <BreadcrumbLink href="#" onClick={e => { e.preventDefault(); handleCancel() }}>
                    Leads
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isCreating ? (
                  <BreadcrumbPage>New lead</BreadcrumbPage>
                ) : (
                  <BreadcrumbPage>Leads</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />

      {isCreating ? (
        <CreateLeadFlow
          key={formKey}
          onCancel={handleCancel}
          onComplete={handleComplete}
        />
      ) : (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 md:overflow-y-auto">
          <Container size={containerSize} className="flex flex-1 flex-col gap-6">{content}</Container>
        </div>
      )}
    </>
  )
}
