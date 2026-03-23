import { SiteHeader } from "@/components/site-header"
import { PageHeader } from "@/components/ui/page-header"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import {
  IconGrid,
  ComponentControls,
  ImageCard,
  VisitorsChart,
  ShortcutsCard,
} from "@/components/component-showcase"
import Dialog08 from "@/components/dialog-08"
import Dialog10 from "@/components/dialog-10"
import PTabs10 from "@/components/p-tabs-10"
import ProfileCard from "@/components/profile-card"
import FileUpload01 from "@/components/file-upload-01"
import Stats01 from "@/components/stats-01"
import Stats11 from "@/components/stats-11"
import EnvVarsCard from "@/components/env-vars-card"
import SkeletonCard from "@/components/skeleton-card"
import EmptyTeamCard from "@/components/empty-team-card"
import TrafficChannelsCard from "@/components/traffic-channels-card"

function MasonryItem({ label, name, children }: { label: string; name: string; children: React.ReactNode }) {
  return (
    <div className="break-inside-avoid mb-6">
      <div className="mb-3">
        <h2 className="text-base font-semibold">{label}</h2>
        <p className="text-xs text-muted-foreground">{name}</p>
      </div>
      {children}
    </div>
  )
}

export default function PlaygroundPage() {
  return (
    <>
      <SiteHeader
        left={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbPage>Playground</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />
      <div className="flex flex-1 flex-col gap-10 p-4 md:p-6 md:overflow-y-auto">
        <PageHeader
          title="Playground"
          description="Explore and experiment with UI blocks and component compositions."
        />

        {/* Stats — full width */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="text-base font-semibold">Stats</h2>
              <p className="text-xs text-muted-foreground">stats-11</p>
            </div>
            <Stats11 />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="text-base font-semibold">Stats</h2>
              <p className="text-xs text-muted-foreground">stats-01</p>
            </div>
            <Stats01 />
          </div>
        </section>

        {/* Masonry layout for all other blocks */}
        <div className="columns-1 gap-12 md:columns-2 xl:columns-3">

          <MasonryItem label="Controls" name="component-showcase / controls">
            <ComponentControls />
          </MasonryItem>

          <MasonryItem label="Profile" name="profile-card">
            <ProfileCard />
          </MasonryItem>

          <MasonryItem label="File Upload" name="file-upload-01">
            <FileUpload01 />
          </MasonryItem>

          <MasonryItem label="Tabs" name="p-tabs-10">
            <PTabs10 />
          </MasonryItem>

          <MasonryItem label="Image" name="component-showcase / image-card">
            <ImageCard />
          </MasonryItem>

          <MasonryItem label="Chart" name="component-showcase / visitors-chart">
            <VisitorsChart />
          </MasonryItem>

          <MasonryItem label="Icons" name="component-showcase / icon-grid">
            <IconGrid />
          </MasonryItem>

          <MasonryItem label="Shortcuts" name="component-showcase / shortcuts">
            <ShortcutsCard />
          </MasonryItem>

          <MasonryItem label="Dialog" name="dialog-08">
            <Dialog08 />
          </MasonryItem>

          <MasonryItem label="Dialog" name="dialog-10">
            <Dialog10 />
          </MasonryItem>

          <MasonryItem label="Environment Variables" name="env-vars-card">
            <EnvVarsCard />
          </MasonryItem>

          <MasonryItem label="Skeleton" name="skeleton-card">
            <SkeletonCard />
          </MasonryItem>

          <MasonryItem label="Empty State" name="empty-team-card">
            <EmptyTeamCard />
          </MasonryItem>

          <MasonryItem label="Traffic Channels" name="traffic-channels-card">
            <TrafficChannelsCard />
          </MasonryItem>

        </div>

      </div>
    </>
  )
}
