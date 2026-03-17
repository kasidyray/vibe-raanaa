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
import { RiSearchLine } from "@remixicon/react"

export default function SearchPage() {
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
                <BreadcrumbPage>Search</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <PageHeader
          title="Search"
          description="Search across your entire workspace."
        />
        <Empty className="flex-1 border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <RiSearchLine />
            </EmptyMedia>
            <EmptyTitle>Search coming soon</EmptyTitle>
            <EmptyDescription>
              Full-text search across your workspace will be available here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    </>
  )
}
