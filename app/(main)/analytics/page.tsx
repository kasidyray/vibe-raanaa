"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart } from "recharts"
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiArrowUpLine,
  RiCalendarLine,
  RiCamera2Line,
  RiEditLine,
  RiFileCodeLine,
  RiFileCopyLine,
  RiFileTextLine,
  RiFlagLine,
  RiFolder2Line,
  RiHardDriveLine,
  RiImage2Line,
  RiPenNibLine,
  RiShareLine,
  RiStarFill,
  RiStarLine,
  RiUploadLine,
  RiVideoLine,
  RiAddLine,
} from "@remixicon/react"

import { SiteHeader } from "@/components/site-header"
import { PageHeader } from "@/components/ui/page-header"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction,
} from "@/components/ui/card"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
  ChartLegend, ChartLegendContent, type ChartConfig,
} from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"

// ─── Data ─────────────────────────────────────────────────────────────────────

const fileActivityData = [
  { date: "Jan 1",  uploads: 3,  modifications: 5  },
  { date: "Jan 2",  uploads: 1,  modifications: 2  },
  { date: "Jan 3",  uploads: 5,  modifications: 8  },
  { date: "Jan 4",  uploads: 2,  modifications: 4  },
  { date: "Jan 5",  uploads: 8,  modifications: 12 },
  { date: "Jan 6",  uploads: 4,  modifications: 7  },
  { date: "Jan 7",  uploads: 9,  modifications: 14 },
  { date: "Jan 8",  uploads: 5,  modifications: 9  },
  { date: "Jan 9",  uploads: 11, modifications: 17 },
  { date: "Jan 10", uploads: 7,  modifications: 13 },
  { date: "Jan 11", uploads: 14, modifications: 19 },
  { date: "Jan 12", uploads: 9,  modifications: 15 },
  { date: "Jan 13", uploads: 12, modifications: 16 },
]

const fileActivityConfig = {
  uploads:       { label: "Uploads",       color: "var(--chart-1)" },
  modifications: { label: "Modifications", color: "var(--chart-2)" },
} satisfies ChartConfig

const storageCategories = [
  { key: "images",    label: "Images",    value: 2.8 },
  { key: "videos",    label: "Videos",    value: 4.5 },
  { key: "documents", label: "Documents", value: 1.2 },
  { key: "design",    label: "Design",    value: 1.9 },
  { key: "other",     label: "Other",     value: 1.0 },
]

const storageData = storageCategories.map(c => ({ ...c, fill: `var(--color-${c.key})` }))

const storageConfig = {
  images:    { label: "Images",    color: "var(--chart-1)" },
  videos:    { label: "Videos",    color: "var(--chart-2)" },
  documents: { label: "Documents", color: "var(--chart-3)" },
  design:    { label: "Design",    color: "var(--chart-4)" },
  other:     { label: "Other",     color: "var(--chart-5)" },
} satisfies ChartConfig

const USED_STORAGE = 11.4
const TOTAL_STORAGE = 25

const recentFiles = [
  { name: "Logo Suite 2025.ai",        time: "2 hours ago",  size: "28.4 MB",  starred: true,  ext: "ai"    },
  { name: "Brand Guidelines v3.pdf",   time: "5 hours ago",  size: "12.1 MB",  starred: true,  ext: "pdf"   },
  { name: "App Demo v2.mp4",           time: "Yesterday",    size: "348 MB",   starred: false, ext: "mp4"   },
  { name: "Q1 Strategy Deck.pptx",     time: "2 days ago",   size: "8.9 MB",   starred: false, ext: "pptx"  },
  { name: "Design Tokens.json",        time: "3 hours ago",  size: "145 KB",   starred: false, ext: "json"  },
  { name: "Component Library.figma",   time: "1 hour ago",   size: "54.2 MB",  starred: true,  ext: "figma" },
]

const teamActivity = [
  { name: "Sarah Chen",      initials: "SC", action: "uploaded", target: "Brand Guidelines v3.pdf",   time: "5 Min Ago",   type: "File"       },
  { name: "Aiko Tanaka",     initials: "AT", action: "created",  target: "Q1 Campaigns",              time: "1 Hour Ago",  type: "Collection" },
  { name: "Marcus Williams", initials: "MW", action: "shared",   target: "Product Roadmap.figma",     time: "2 Hours Ago", type: "File"       },
  { name: "Leonel Ngoya",    initials: "LN", action: "modified", target: "Design System",             time: "4 Hours Ago", type: "Folder"     },
  { name: "Priya Patel",     initials: "PP", action: "starred",  target: "Analytics Dashboard.fig",   time: "Yesterday",   type: "File"       },
  { name: "Sarah Chen",      initials: "SC", action: "uploaded", target: "Hero Video 2025.mp4",       time: "Yesterday",   type: "File"       },
]

const sharedFiles = [
  { name: "App Demo v2.mp4",     time: "Yesterday",   ext: "mp4",  members: ["SC", "AT", "MW"] },
  { name: "Sprint Review.pptx",  time: "Yesterday",   ext: "pptx", members: ["LN", "PP", "SC"] },
  { name: "Hero Banner 2025.png", time: "8 hours ago", ext: "png",  members: ["AT", "MW"]       },
]

const collections = [
  { name: "Team Photos",         size: "2.1 GB", count: 45, icon: RiCamera2Line, chartColor: "var(--chart-1)" },
  { name: "Product Screenshots", size: "890 MB", count: 36, icon: RiImage2Line,  chartColor: "var(--chart-2)" },
  { name: "Q1 Campaigns",        size: "1.2 GB", count: 24, icon: RiFlagLine,    chartColor: "var(--chart-4)" },
]

const statCards = [
  { icon: RiFileCopyLine,  chartColor: "var(--chart-1)", value: "23",     label: "Total Assets",  badge: "+12%",       badgeVariant: "success" as const, description: "Across 5 folders"             },
  { icon: RiHardDriveLine, chartColor: "var(--chart-2)", value: "11.4 GB",label: "Storage Used",  badge: "54% free",   badgeVariant: "success" as const, description: "46% of 25 GB total"           },
  { icon: RiShareLine,     chartColor: "var(--chart-3)", value: "15",     label: "Shared Files",  badge: "+3 this week",badgeVariant: "success" as const, description: "Accessible by team members"   },
  { icon: RiFolder2Line,   chartColor: "var(--chart-4)", value: "6",      label: "Collections",   badge: "1 new",      badgeVariant: "info"    as const, description: "144 files organized"          },
]

// ─── File icon helper ─────────────────────────────────────────────────────────

const extConfig: Record<string, { icon: React.ElementType; chartColor: string }> = {
  ai:    { icon: RiPenNibLine,   chartColor: "var(--chart-4)" },
  pdf:   { icon: RiFileTextLine, chartColor: "var(--chart-2)" },
  mp4:   { icon: RiVideoLine,    chartColor: "var(--chart-1)" },
  pptx:  { icon: RiFileTextLine, chartColor: "var(--chart-3)" },
  json:  { icon: RiFileCodeLine, chartColor: "var(--chart-5)" },
  figma: { icon: RiPenNibLine,   chartColor: "var(--chart-1)" },
  png:   { icon: RiImage2Line,   chartColor: "var(--chart-3)" },
}

function FileIcon({ ext, size = 8 }: { ext: string; size?: number }) {
  const cfg = extConfig[ext] ?? { icon: RiFileCopyLine, chartColor: "var(--chart-1)" }
  const Icon = cfg.icon
  const sizeClass = size === 8 ? "size-8" : "size-6"
  const iconClass = size === 8 ? "size-4" : "size-3"
  return (
    <div
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-lg`}
      style={{
        background: `color-mix(in srgb, ${cfg.chartColor} 15%, var(--card))`,
        color: cfg.chartColor,
      }}
    >
      <Icon className={iconClass} />
    </div>
  )
}

// ─── Action icon helper ───────────────────────────────────────────────────────

const actionIconMap: Record<string, React.ElementType> = {
  uploaded: RiUploadLine,
  created:  RiAddLine,
  shared:   RiShareLine,
  modified: RiEditLine,
  starred:  RiStarLine,
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  return (
    <>
      <SiteHeader
        left={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Analytics</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />

      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">

        {/* Greeting */}
        <PageHeader
          title="Good morning, Leonel 👋"
          description="Sunday, March 15"
          actions={
            <Button variant="outline">
              <RiCalendarLine />
              Last 14 days
              <RiArrowDownSLine className="opacity-60" />
            </Button>
          }
        />

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statCards.map(card => {
            const Icon = card.icon
            return (
              <Card key={card.label} size="sm">
                <CardContent className="flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div
                      className="flex size-10 items-center justify-center rounded-lg"
                      style={{
                        background: `color-mix(in srgb, ${card.chartColor} 15%, var(--card))`,
                        color: card.chartColor,
                      }}
                    >
                      <Icon className="size-5" />
                    </div>
                    <Badge variant={card.badgeVariant} icon={<RiArrowUpLine />}>
                      {card.badge}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold tracking-tight">{card.value}</p>
                    <p className="text-sm text-muted-foreground">{card.label}</p>
                  </div>
                  <Separator />
                  <p className="text-xs text-muted-foreground">{card.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          {/* File Activity */}
          <Card>
            <CardHeader>
              <CardTitle>File Activity</CardTitle>
              <CardDescription>Uploads and modifications over the last 14 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={fileActivityConfig} className="h-[220px] w-full">
                <BarChart data={fileActivityData} barGap={2} barCategoryGap="30%">
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    interval={2}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={4} tick={{ fontSize: 11 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="uploads"       fill="var(--color-uploads)"       radius={[3, 3, 0, 0]} />
                  <Bar dataKey="modifications" fill="var(--color-modifications)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Recent Files */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Files</CardTitle>
              <CardDescription>Your most recently modified assets</CardDescription>
              <CardAction>
                <Button variant="ghost" size="sm" className="text-xs gap-1 text-muted-foreground">
                  View all <RiArrowRightLine className="size-3.5" />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-0">
              {recentFiles.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2.5 border-b last:border-0"
                >
                  <FileIcon ext={file.ext} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.time}</p>
                  </div>
                  {file.starred
                    ? <RiStarFill className="size-3.5 shrink-0 text-warning-dark" />
                    : <RiStarLine className="size-3.5 shrink-0 text-muted-foreground/40" />
                  }
                  <span className="text-xs text-muted-foreground tabular-nums shrink-0">{file.size}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Storage Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Storage Breakdown</CardTitle>
              <CardDescription>{USED_STORAGE} GB used of {TOTAL_STORAGE} GB</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ChartContainer config={storageConfig} className="h-[160px] w-full">
                <PieChart>
                  <Pie
                    data={storageData}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={2}
                  />
                  <ChartTooltip content={<ChartTooltipContent nameKey="label" hideLabel />} />
                </PieChart>
              </ChartContainer>

              <div className="flex flex-col gap-2.5">
                {storageCategories.map((cat, i) => {
                  const pct = (cat.value / USED_STORAGE) * 100
                  const chartVar = `var(--chart-${i + 1})`
                  return (
                    <div key={cat.key} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1">
                      <span className="text-sm">{cat.label}</span>
                      <span className="text-xs text-muted-foreground tabular-nums text-right">{cat.value} GB</span>
                      <div className="col-span-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, background: chartVar }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Overall usage</span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-foreground"
                      style={{ width: `${(USED_STORAGE / TOTAL_STORAGE) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium tabular-nums">
                    {Math.round((USED_STORAGE / TOTAL_STORAGE) * 100)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          {/* Team Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Team Activity</CardTitle>
              <CardDescription>Recent actions by your team</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-0">
              {teamActivity.map((item, i) => {
                const ActionIcon = actionIconMap[item.action] ?? RiFileTextLine
                const typeIcon = item.type === "Collection" ? RiFolder2Line : item.type === "Folder" ? RiFolder2Line : RiFileTextLine
                const TypeIcon = typeIcon
                return (
                  <div key={i} className="flex items-start gap-3 py-3 border-b last:border-0">
                    <Avatar className="size-8 shrink-0">
                      <AvatarFallback className="text-xs">{item.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-snug">
                        <span className="font-medium">{item.name}</span>
                        {" "}<span className="text-muted-foreground">{item.action}</span>{" "}
                        <span className="font-medium">{item.target}</span>
                      </p>
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <TypeIcon className="size-3" />
                        {item.type} · {item.time}
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Shared with team */}
          <Card>
            <CardHeader>
              <CardTitle>Shared with team</CardTitle>
              <CardDescription>Files accessible to your teammates</CardDescription>
              <CardAction>
                <Button variant="ghost" size="sm" className="text-xs gap-1 text-muted-foreground">
                  View all <RiArrowRightLine className="size-3.5" />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-0">
              {sharedFiles.map((file, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b last:border-0">
                  <FileIcon ext={file.ext} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.time}</p>
                  </div>
                  <div className="flex -space-x-2">
                    {file.members.map((initials, j) => (
                      <Avatar
                        key={j}
                        className="size-6 ring-2 ring-card"
                        style={{ zIndex: file.members.length - j }}
                      >
                        <AvatarFallback
                          className="text-[9px] font-medium"
                          style={{
                            background: `var(--chart-${(j % 5) + 1})`,
                            color: "var(--card)",
                          }}
                        >
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Collections */}
          <Card>
            <CardHeader>
              <CardTitle>Collections</CardTitle>
              <CardDescription>Organised groups of your assets</CardDescription>
              <CardAction>
                <Button variant="ghost" size="sm" className="text-xs gap-1 text-muted-foreground">
                  View all <RiArrowRightLine className="size-3.5" />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-0">
              {collections.map((col, i) => {
                const Icon = col.icon
                return (
                  <div key={i} className="flex items-center gap-3 py-3 border-b last:border-0">
                    <div
                      className="flex size-8 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: `color-mix(in srgb, ${col.chartColor} 15%, var(--card))`,
                        color: col.chartColor,
                      }}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{col.name}</p>
                      <p className="text-xs text-muted-foreground">{col.size}</p>
                    </div>
                    <span className="text-sm font-medium tabular-nums text-muted-foreground">{col.count}</span>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
