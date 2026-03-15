"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { PageHeader } from "@/components/ui/page-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { RiBarChartLine, RiAddLine, RiExternalLinkLine } from "@remixicon/react"

export default function AnalyticsPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader
          left={
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Analytics</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          }
        />
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          <PageHeader
            title="Analytics"
            description="Track performance metrics and insights for your workspace."
            actions={
              <>
                <Button variant="outline" size="sm">
                  See examples
                </Button>
                <Button size="sm">
                  <RiAddLine />
                  New report
                </Button>
              </>
            }
          />
          <Empty className="flex-1 border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <RiBarChartLine />
              </EmptyMedia>
              <EmptyTitle>No analytics data yet</EmptyTitle>
              <EmptyDescription>
                Once your workspace starts generating data, your reports and charts will appear here.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="sm">
                <RiAddLine />
                Create your first report
              </Button>
              <a
                href="https://en.wikipedia.org/wiki/Analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Learn about analytics
                <RiExternalLinkLine className="size-3.5" />
              </a>
            </EmptyContent>
          </Empty>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
