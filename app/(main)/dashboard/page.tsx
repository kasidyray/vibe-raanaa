import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DashboardActions } from "@/components/dashboard-actions"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { PageHeader } from "@/components/ui/page-header"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

import data from "./data.json"

export default function Page() {
  return (
    <>
      <SiteHeader
        left={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbPage>Dashboard</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-12 md:py-6">
            <div className="px-4 lg:px-6">
              <PageHeader
                title="Dashboard"
                description="Welcome back. Here's an overview of your workspace."
                actions={<DashboardActions />}
              />
            </div>
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </>
  )
}
