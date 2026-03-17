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
import { RiQuestionLine } from "@remixicon/react"

export default function HelpPage() {
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
                <BreadcrumbPage>Get Help</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <PageHeader
          title="Get Help"
          description="Find answers, documentation, and support resources."
        />
        <Empty className="flex-1 border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <RiQuestionLine />
            </EmptyMedia>
            <EmptyTitle>Help centre coming soon</EmptyTitle>
            <EmptyDescription>
              Documentation and support resources will be available here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    </>
  )
}
