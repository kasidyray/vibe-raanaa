"use client"

import { SiteHeader } from "@/components/site-header"
import { PageHeader } from "@/components/ui/page-header"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator, BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
  ChartLegend, ChartLegendContent, type ChartConfig,
} from "@/components/ui/chart"
import {
  Bar, BarChart, CartesianGrid, XAxis, YAxis,
  Line, LineChart,
  Area, AreaChart,
  Pie, PieChart,
  PolarAngleAxis, PolarGrid, Radar, RadarChart,
  RadialBar, RadialBarChart,
  Cell,
} from "recharts"

// ─── Data ────────────────────────────────────────────────────────────────────

const monthlyData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73,  mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const weeklyData = [
  { day: "Mon", revenue: 1200 },
  { day: "Tue", revenue: 1900 },
  { day: "Wed", revenue: 1500 },
  { day: "Thu", revenue: 2400 },
  { day: "Fri", revenue: 2200 },
  { day: "Sat", revenue: 800 },
  { day: "Sun", revenue: 600 },
]

const browserData = [
  { browser: "chrome",  visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari",  visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge",    visitors: 173, fill: "var(--color-edge)" },
  { browser: "other",   visitors: 90,  fill: "var(--color-other)" },
]

const conversionData = [
  { stage: "Leads",    value: 4200 },
  { stage: "Qualified", value: 2800 },
  { stage: "Proposal", value: 1500 },
  { stage: "Closed",   value: 620 },
]

const performanceData = [
  { subject: "Speed",      A: 120 },
  { subject: "Accuracy",   A: 98 },
  { subject: "Coverage",   A: 86 },
  { subject: "Uptime",     A: 99 },
  { subject: "Latency",    A: 75 },
  { subject: "Throughput", A: 110 },
]

// ─── Configs ─────────────────────────────────────────────────────────────────

const desktopConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
} satisfies ChartConfig

const multiConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile:  { label: "Mobile",  color: "var(--chart-2)" },
} satisfies ChartConfig

const revenueConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig

const browserConfig = {
  visitors: { label: "Visitors" },
  chrome:   { label: "Chrome",  color: "var(--chart-1)" },
  safari:   { label: "Safari",  color: "var(--chart-2)" },
  firefox:  { label: "Firefox", color: "var(--chart-3)" },
  edge:     { label: "Edge",    color: "var(--chart-4)" },
  other:    { label: "Other",   color: "var(--chart-5)" },
} satisfies ChartConfig

const conversionConfig = {
  value: { label: "Count", color: "var(--chart-1)" },
} satisfies ChartConfig

const performanceConfig = {
  A: { label: "Score", color: "var(--chart-1)" },
} satisfies ChartConfig

// ─── Chart cards ─────────────────────────────────────────────────────────────

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default function ChartsPage() {
  return (
    <>
      <SiteHeader
        left={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Charts</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <PageHeader
          title="Charts"
          description={<>All chart types available via <code className="font-mono text-xs">recharts</code> + <code className="font-mono text-xs">chart.tsx</code></>}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {/* Bar – Single */}
          <ChartCard title="Bar Chart">
            <ChartContainer config={desktopConfig} className="h-[200px] w-full">
              <BarChart accessibilityLayer data={monthlyData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
              </BarChart>
            </ChartContainer>
          </ChartCard>

          {/* Bar – Multiple */}
          <ChartCard title="Bar Chart – Multiple">
            <ChartContainer config={multiConfig} className="h-[200px] w-full">
              <BarChart accessibilityLayer data={monthlyData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile"  fill="var(--color-mobile)"  radius={4} />
              </BarChart>
            </ChartContainer>
          </ChartCard>

          {/* Bar – Stacked */}
          <ChartCard title="Bar Chart – Stacked">
            <ChartContainer config={multiConfig} className="h-[200px] w-full">
              <BarChart accessibilityLayer data={monthlyData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" radius={[0, 0, 4, 4]} />
                <Bar dataKey="mobile"  stackId="a" fill="var(--color-mobile)"  radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </ChartCard>

          {/* Bar – Horizontal */}
          <ChartCard title="Bar Chart – Horizontal">
            <ChartContainer config={revenueConfig} className="h-[220px] w-full">
              <BarChart accessibilityLayer data={weeklyData} layout="vertical" margin={{ left: 8 }}>
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis dataKey="day" type="category" tickLine={false} axisLine={false} width={32} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
              </BarChart>
            </ChartContainer>
          </ChartCard>

          {/* Bar – Negative / funnel-style */}
          <ChartCard title="Bar Chart – Funnel">
            <ChartContainer config={conversionConfig} className="h-[200px] w-full">
              <BarChart accessibilityLayer data={conversionData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="stage" tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="value" fill="var(--color-value)" radius={6} />
              </BarChart>
            </ChartContainer>
          </ChartCard>

          {/* Line – Single */}
          <ChartCard title="Line Chart">
            <ChartContainer config={desktopConfig} className="h-[200px] w-full">
              <LineChart accessibilityLayer data={monthlyData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </ChartCard>

          {/* Line – Multiple */}
          <ChartCard title="Line Chart – Multiple">
            <ChartContainer config={multiConfig} className="h-[200px] w-full">
              <LineChart accessibilityLayer data={monthlyData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                <Line dataKey="mobile"  type="natural" stroke="var(--color-mobile)"  strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </ChartCard>

          {/* Line – Dots */}
          <ChartCard title="Line Chart – Dots">
            <ChartContainer config={desktopConfig} className="h-[200px] w-full">
              <LineChart accessibilityLayer data={monthlyData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Line
                  dataKey="desktop"
                  type="natural"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-desktop)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </ChartCard>

          {/* Area – Single */}
          <ChartCard title="Area Chart">
            <ChartContainer config={desktopConfig} className="h-[200px] w-full">
              <AreaChart accessibilityLayer data={monthlyData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Area dataKey="desktop" type="natural" fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)" />
              </AreaChart>
            </ChartContainer>
          </ChartCard>

          {/* Area – Stacked Gradient */}
          <ChartCard title="Area Chart – Gradient">
            <ChartContainer config={multiConfig} className="h-[200px] w-full">
              <AreaChart accessibilityLayer data={monthlyData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <defs>
                  <linearGradient id="fillDesktop2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--color-desktop)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="fillMobile2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--color-mobile)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area dataKey="mobile"  type="natural" fill="url(#fillMobile2)"  fillOpacity={0.4} stroke="var(--color-mobile)"  stackId="a" />
                <Area dataKey="desktop" type="natural" fill="url(#fillDesktop2)" fillOpacity={0.4} stroke="var(--color-desktop)" stackId="a" />
              </AreaChart>
            </ChartContainer>
          </ChartCard>

          {/* Area – Step */}
          <ChartCard title="Area Chart – Step">
            <ChartContainer config={revenueConfig} className="h-[200px] w-full">
              <AreaChart accessibilityLayer data={weeklyData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Area dataKey="revenue" type="step" fill="var(--color-revenue)" fillOpacity={0.3} stroke="var(--color-revenue)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </ChartCard>

          {/* Pie – Default */}
          <ChartCard title="Pie Chart">
            <ChartContainer config={browserConfig} className="mx-auto aspect-square max-h-[220px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={browserData} dataKey="visitors" nameKey="browser" />
              </PieChart>
            </ChartContainer>
          </ChartCard>

          {/* Pie – Donut */}
          <ChartCard title="Pie Chart – Donut">
            <ChartContainer config={browserConfig} className="mx-auto aspect-square max-h-[220px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={browserData} dataKey="visitors" nameKey="browser" innerRadius={60} />
              </PieChart>
            </ChartContainer>
          </ChartCard>

          {/* Pie – Donut with Legend */}
          <ChartCard title="Pie Chart – Donut + Legend">
            <ChartContainer config={browserConfig} className="mx-auto aspect-square max-h-[260px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={browserData} dataKey="visitors" nameKey="browser" innerRadius={50} />
                <ChartLegend content={<ChartLegendContent nameKey="browser" />} className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center" />
              </PieChart>
            </ChartContainer>
          </ChartCard>

          {/* Radar */}
          <ChartCard title="Radar Chart">
            <ChartContainer config={desktopConfig} className="mx-auto aspect-square max-h-[220px]">
              <RadarChart data={monthlyData}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <PolarAngleAxis dataKey="month" />
                <PolarGrid />
                <Radar dataKey="desktop" fill="var(--color-desktop)" fillOpacity={0.6} />
              </RadarChart>
            </ChartContainer>
          </ChartCard>

          {/* Radar – Performance */}
          <ChartCard title="Radar Chart – Performance">
            <ChartContainer config={performanceConfig} className="mx-auto aspect-square max-h-[220px]">
              <RadarChart data={performanceData}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <PolarAngleAxis dataKey="subject" />
                <PolarGrid />
                <Radar dataKey="A" fill="var(--color-A)" fillOpacity={0.5} stroke="var(--color-A)" strokeWidth={2} />
              </RadarChart>
            </ChartContainer>
          </ChartCard>

          {/* Radial */}
          <ChartCard title="Radial Bar Chart">
            <ChartContainer config={browserConfig} className="mx-auto aspect-square max-h-[220px]">
              <RadialBarChart data={browserData} innerRadius={30} outerRadius={110}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="browser" />} />
                <RadialBar dataKey="visitors" background />
              </RadialBarChart>
            </ChartContainer>
          </ChartCard>

        </div>
      </div>
    </>
  )
}
