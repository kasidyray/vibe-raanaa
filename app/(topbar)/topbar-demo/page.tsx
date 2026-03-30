"use client"

import * as React from "react"
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { Skeleton } from "@/components/ui/skeleton"
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiDownloadLine,
  RiFilterLine,
  RiLayoutGridLine,
  RiMore2Line,
  RiShareForwardLine,
} from "@remixicon/react"

// ─── Constants ────────────────────────────────────────────────────────────────

const LOADING_DELAY_MS = 1200

const STAT_CARDS = [
  { label: "Total Income",    value: "$32,499.93", change: "+12.95%", positive: true  },
  { label: "Profit",          value: "$10,499.93", change: "-0.33%",  positive: false },
  { label: "Total Views",     value: "5,211,832",  change: "+10.32%", positive: true  },
  { label: "Conversion Rate", value: "4.83%",      change: "+8.05%",  positive: true  },
] as const

// ─── Revenue ──────────────────────────────────────────────────────────────────

const REVENUE_DATA = [
  { month: "Mar '23", revenue: 7200,  target: 12000 },
  { month: "Jun '23", revenue: 14500, target: 9000  },
  { month: "Sep '23", revenue: 8500,  target: 11500 },
  { month: "Dec '23", revenue: 16000, target: 8000  },
  { month: "Mar '24", revenue: 11000, target: 14000 },
  { month: "Jun '24", revenue: 18500, target: 10500 },
  { month: "Sep '24", revenue: 13500, target: 16000 },
  { month: "Dec '24", revenue: 20000, target: 12500 },
]

const revenueConfig = {
  revenue: { label: "Total Revenue", color: "var(--chart-1)" },
  target:  { label: "Total Target",  color: "var(--chart-2)" },
} satisfies ChartConfig

// ─── Sessions ─────────────────────────────────────────────────────────────────

const SESSIONS_DATA = [
  { country: "Australia", flag: "🇦🇺", sessions: 634, change: 8.0  },
  { country: "Indonesia", flag: "🇮🇩", sessions: 589, change: 7.2  },
  { country: "Thailand",  flag: "🇹🇭", sessions: 562, change: 6.2  },
  { country: "Germany",   flag: "🇩🇪", sessions: 453, change: 5.4  },
]

const MAX_SESSIONS = 634

// ─── Region ───────────────────────────────────────────────────────────────────

const REGION_DATA = [
  { region: "Europe",      value: 2728 },
  { region: "Americas",    value: 2409 },
  { region: "Middle East", value: 800  },
  { region: "Pacific",     value: 1838 },
  { region: "Africa",      value: 3028 },
  { region: "Asia",        value: 2843 },
]

const regionConfig = {
  value: { label: "Sales", color: "var(--chart-1)" },
} satisfies ChartConfig

// ─── Platform ─────────────────────────────────────────────────────────────────

const PLATFORM_DATA = [
  { name: "amazon",    label: "Amazon",    value: 45, fill: "var(--color-amazon)"    },
  { name: "alibaba",   label: "Alibaba",   value: 30, fill: "var(--color-alibaba)"   },
  { name: "tokopedia", label: "Tokopedia", value: 25, fill: "var(--color-tokopedia)" },
]

const platformConfig = {
  amazon:    { label: "Amazon",    color: "var(--chart-1)" },
  alibaba:   { label: "Alibaba",   color: "var(--chart-2)" },
  tokopedia: { label: "Tokopedia", color: "var(--chart-3)" },
} satisfies ChartConfig

// ─── Registered Users ─────────────────────────────────────────────────────────

const USERS_DATA = [
  { name: "premium", label: "Premium Plan", value: 1809, fill: "var(--color-premium)" },
  { name: "basic",   label: "Basic Plan",   value: 515,  fill: "var(--color-basic)"   },
]

const usersConfig = {
  premium: { label: "Premium Plan", color: "var(--chart-1)" },
  basic:   { label: "Basic Plan",   color: "var(--chart-3)" },
} satisfies ChartConfig

const TOTAL_USERS = 2324

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 md:overflow-y-auto">
      <Container size="xl" className="flex flex-1 flex-col gap-6">
        {/* header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-4 w-52" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>

        {/* stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="flex flex-col gap-2 p-5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-3.5 w-40" />
            </Card>
          ))}
        </div>

        {/* row 2 */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <Skeleton className="h-5 w-44" />
            </CardHeader>
            <CardContent>
              <div className="flex gap-6 mb-4">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-44" />
              </div>
              <Skeleton className="h-[260px] w-full rounded-xl" />
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader>
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-52" />
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* row 3 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-36" />
              </CardHeader>
              <CardContent>
                <Skeleton className="mx-auto h-[220px] w-full rounded-xl" />
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TopbarDemoPage() {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADING_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) return <DashboardSkeleton />

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 md:overflow-y-auto">
      <Container size="xl" className="flex flex-1 flex-col gap-6">

        <PageHeader
          title="Overview"
          description="Analytics summary for your business."
          actions={
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RiLayoutGridLine />
                Customize Widget
              </Button>
              <Button variant="outline" size="sm">
                <RiFilterLine />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <RiShareForwardLine />
                Share
              </Button>
            </div>
          }
        />

        {/* ── Stat cards ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STAT_CARDS.map((card) => (
            <Card key={card.label} className="flex flex-col gap-1 p-5">
              <p className="text-xs text-muted-foreground uppercase">{card.label}</p>
              <p className="text-3xl font-semibold tabular-nums">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                <span
                  className={`inline-flex items-center gap-0.5 font-medium ${
                    card.positive ? "text-success" : "text-destructive"
                  }`}
                >
                  {card.positive ? (
                    <RiArrowUpLine className="size-3.5" />
                  ) : (
                    <RiArrowDownLine className="size-3.5" />
                  )}
                  {card.change}
                </span>
                Compared to last month
              </p>
            </Card>
          ))}
        </div>

        {/* ── Row 2: Revenue + Sessions ─────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">

          {/* Revenue Over Time */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Revenue Over Time</CardTitle>
              <CardAction>
                <div className="flex items-center gap-0.5">
                  <Button variant="ghost" size="icon-sm" aria-label="Download">
                    <RiDownloadLine />
                  </Button>
                  <Button variant="ghost" size="icon-sm" aria-label="More options">
                    <RiMore2Line />
                  </Button>
                </div>
              </CardAction>
            </CardHeader>
            <CardContent>
              {/* Custom legend */}
              <div className="flex flex-wrap gap-x-6 gap-y-1.5 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block size-2.5 rounded-full"
                    style={{ background: "var(--chart-1)" }}
                  />
                  <span className="text-muted-foreground">Total Revenue</span>
                  <span className="font-medium tabular-nums">$32,839.99</span>
                  <span className="text-muted-foreground">• 55%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block size-2.5 rounded-full"
                    style={{ background: "var(--chart-2)" }}
                  />
                  <span className="text-muted-foreground">Total Target</span>
                  <span className="font-medium tabular-nums">$30,932.12</span>
                  <span className="text-muted-foreground">• 45%</span>
                </div>
              </div>

              <ChartContainer config={revenueConfig} className="h-[260px] w-full">
                <LineChart
                  accessibilityLayer
                  data={REVENUE_DATA}
                  margin={{ left: 4, right: 4 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    dataKey="revenue"
                    type="natural"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    dataKey="target"
                    type="natural"
                    stroke="var(--color-target)"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Session by Country */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Session by Country</CardTitle>
              <CardDescription>Showing data for top sessions</CardDescription>
              <CardAction>
                <Button variant="ghost" size="icon-sm" aria-label="More options">
                  <RiMore2Line />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {SESSIONS_DATA.map((item) => (
                <div key={item.country} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base leading-none">{item.flag}</span>
                      <span className="text-sm font-medium">{item.country}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm tabular-nums">
                      <span>{item.sessions.toLocaleString()}</span>
                      <span className="text-success font-medium">
                        • {item.change}%
                      </span>
                    </div>
                  </div>
                  {/* Dynamic width — no token equivalent for a runtime percentage */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-success"
                      style={{
                        width: `${Math.round((item.sessions / MAX_SESSIONS) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ── Row 3: Region + Platform + Users ──────────────────────── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* Sales by Region */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Region</CardTitle>
              <CardAction>
                <Button variant="ghost" size="icon-sm" aria-label="More options">
                  <RiMore2Line />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={regionConfig}
                className="mx-auto aspect-square max-h-[240px]"
              >
                <RadarChart data={REGION_DATA}>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <PolarAngleAxis dataKey="region" tick={{ fontSize: 11 }} />
                  <PolarGrid />
                  <Radar
                    dataKey="value"
                    fill="var(--color-value)"
                    fillOpacity={0.2}
                    stroke="var(--color-value)"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "var(--color-value)" }}
                  />
                </RadarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Sales by e-commerce platform */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by e-commerce platform</CardTitle>
              <CardAction>
                <Button variant="ghost" size="icon-sm" aria-label="More options">
                  <RiMore2Line />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={platformConfig}
                className="mx-auto aspect-square max-h-[200px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={PLATFORM_DATA}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={52}
                    outerRadius={80}
                    strokeWidth={2}
                    stroke="hsl(var(--card))"
                  />
                </PieChart>
              </ChartContainer>

              <div className="flex justify-center gap-4 mt-3 text-xs">
                {PLATFORM_DATA.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <span
                      className="inline-block size-2 shrink-0 rounded-full"
                      style={{ background: `var(--chart-${i + 1})` }}
                    />
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium tabular-nums">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Registered Users */}
          <Card>
            <CardHeader>
              <CardTitle>Registered users</CardTitle>
              <CardDescription>An overview of your users</CardDescription>
              <CardAction>
                <Button variant="ghost" size="icon-sm" aria-label="More options">
                  <RiMore2Line />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              {/* Gauge — semicircle with center label */}
              <div className="relative">
                <ChartContainer
                  config={usersConfig}
                  className="mx-auto h-[150px] w-full"
                >
                  <PieChart>
                    <Pie
                      data={USERS_DATA}
                      cx="50%"
                      cy="100%"
                      startAngle={180}
                      endAngle={0}
                      innerRadius={72}
                      outerRadius={100}
                      dataKey="value"
                      strokeWidth={3}
                      stroke="hsl(var(--card))"
                    >
                      <Cell fill="var(--color-premium)" />
                      <Cell fill="var(--color-basic)" />
                    </Pie>
                  </PieChart>
                </ChartContainer>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center pb-1">
                  <p className="text-3xl font-semibold tabular-nums">
                    {TOTAL_USERS.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
              </div>

              <div className="mt-4 flex justify-between border-t pt-4 text-sm">
                {USERS_DATA.map((item, i) => (
                  <div key={item.name} className="flex flex-col gap-0.5">
                    <span className="text-lg font-semibold tabular-nums">
                      {item.value.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="inline-block size-2 shrink-0 rounded-full"
                        style={{ background: `var(--chart-${i === 0 ? 1 : 3})` }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </Container>
    </div>
  )
}
