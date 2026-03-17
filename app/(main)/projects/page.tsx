import { SiteHeader } from "@/components/site-header"
import { PageHeader } from "@/components/ui/page-header"
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
import { RiFolderLine, RiAddLine } from "@remixicon/react"

export default function ProjectsPage() {
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
                <BreadcrumbPage>Projects</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <PageHeader
          title="Projects"
          description="Organise and manage all your workspace projects in one place."
          actions={
            <Button size="sm">
              <RiAddLine />
              New project
            </Button>
          }
        />
        <Empty className="flex-1 border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <RiFolderLine />
            </EmptyMedia>
            <EmptyTitle>No projects yet</EmptyTitle>
            <EmptyDescription>
              Create a project to start organising your work, tasks, and collaborators.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm">
              <RiAddLine />
              Create your first project
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </>
  )
}
