"use client"

import * as React from "react"
import { SiteHeader } from "@/components/site-header"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator, BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RiAddLine, RiContractLeftRightLine } from "@remixicon/react"
import { type ContainerSize, containerSizes } from "./data"
import { TasksTable } from "./tasks-table"
import { StudentsTable } from "./students-table"

export default function DataTable2Page() {
  const [containerSize, setContainerSize] = React.useState<ContainerSize>("xl")

  const content = (
    <>
      <PageHeader
        title="Tasks"
        description="Manage and track your team's tasks across all projects."
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
                    <DropdownMenuCheckboxItem key={value} checked={containerSize === value} onClick={() => setContainerSize(value)}>
                      {label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button><RiAddLine />New task</Button>
          </div>
        }
      />
      <Tabs defaultValue="plain">
        <div className="pb-4">
          <TabsList variant="underline">
            <TabsTrigger value="plain">No borders</TabsTrigger>
            <TabsTrigger value="bordered">Bordered rows</TabsTrigger>
            <TabsTrigger value="card">Card table</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="plain"    className="mt-4"><TasksTable variant="plain" /></TabsContent>
        <TabsContent value="bordered" className="mt-4"><TasksTable variant="bordered" /></TabsContent>
        <TabsContent value="card"     className="mt-4"><TasksTable variant="card" /></TabsContent>
        <TabsContent value="students" className="mt-4"><StudentsTable /></TabsContent>
      </Tabs>
    </>
  )

  return (
    <>
      <SiteHeader
        left={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Data Table 2</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 md:overflow-y-auto">
        <Container size={containerSize} className="flex flex-col gap-6">{content}</Container>
      </div>
    </>
  )
}
