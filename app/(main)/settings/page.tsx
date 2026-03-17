import { SiteHeader } from "@/components/site-header"
import { PageHeader } from "@/components/ui/page-header"
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
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { RiSettingsLine } from "@remixicon/react"

export default function SettingsPage() {
  return (
    <>
      <SiteHeader
        left={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <PageHeader
          title="Settings"
          description="Manage your workspace preferences and configuration."
        />
        <Empty className="flex-1 border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <RiSettingsLine />
            </EmptyMedia>
            <EmptyTitle>Settings coming soon</EmptyTitle>
            <EmptyDescription>
              Workspace configuration options will be available here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    </>
  )
}
