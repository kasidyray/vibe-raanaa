"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
  ChartLegend, ChartLegendContent, type ChartConfig,
} from "@/components/ui/chart"
import {
  Bar, BarChart, CartesianGrid, XAxis,
  Line, LineChart,
  Area, AreaChart,
  Pie, PieChart,
  PolarAngleAxis, PolarGrid, Radar, RadarChart,
  RadialBar, RadialBarChart,
} from "recharts"

function Section({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="break-inside-avoid mb-6">
      <div className="mb-3">
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="text-xs text-muted-foreground font-mono">{sub}</p>
      </div>
      <Card>
        <CardContent className="flex flex-col gap-4">{children}</CardContent>
      </Card>
    </div>
  )
}

// ─── Chart data ──────────────────────────────────────────────────────────────

const chartMonthlyData = [
  { month: "Jan", desktop: 186 },
  { month: "Feb", desktop: 305 },
  { month: "Mar", desktop: 237 },
  { month: "Apr", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "Jun", desktop: 214 },
]

const chartMultiData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const chartDesktopConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
} satisfies ChartConfig

const chartMultiConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

const chartPieData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartPieConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig

function ChartBarSection() {
  return (
    <Section title="Bar Chart" sub="chart.tsx">
      <ChartContainer config={chartDesktopConfig} className="h-[200px] w-full">
        <BarChart accessibilityLayer data={chartMonthlyData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
        </BarChart>
      </ChartContainer>
    </Section>
  )
}

function ChartBarMultipleSection() {
  return (
    <Section title="Bar Chart – Multiple" sub="chart.tsx">
      <ChartContainer config={chartMultiConfig} className="h-[200px] w-full">
        <BarChart accessibilityLayer data={chartMultiData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Section>
  )
}

function ChartBarStackedSection() {
  return (
    <Section title="Bar Chart – Stacked" sub="chart.tsx">
      <ChartContainer config={chartMultiConfig} className="h-[200px] w-full">
        <BarChart accessibilityLayer data={chartMultiData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" radius={[0, 0, 4, 4]} />
          <Bar dataKey="mobile" stackId="a" fill="var(--color-mobile)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </Section>
  )
}

function ChartLineSection() {
  return (
    <Section title="Line Chart" sub="chart.tsx">
      <ChartContainer config={chartDesktopConfig} className="h-[200px] w-full">
        <LineChart accessibilityLayer data={chartMonthlyData} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </Section>
  )
}

function ChartAreaSection() {
  return (
    <Section title="Area Chart" sub="chart.tsx">
      <ChartContainer config={chartDesktopConfig} className="h-[200px] w-full">
        <AreaChart accessibilityLayer data={chartMonthlyData} margin={{ left: 12, right: 12 }}>
          <defs>
            <linearGradient id="fillDesktopSingle" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.15} />
              <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <Area dataKey="desktop" type="natural" fill="url(#fillDesktopSingle)" stroke="var(--color-desktop)" strokeWidth={1.5} />
        </AreaChart>
      </ChartContainer>
    </Section>
  )
}

function ChartAreaGradientSection() {
  return (
    <Section title="Area Chart – Gradient" sub="chart.tsx">
      <ChartContainer config={chartMultiConfig} className="h-[200px] w-full">
        <AreaChart accessibilityLayer data={chartMultiData} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.15} />
              <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.15} />
              <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area dataKey="mobile" type="natural" fill="url(#fillMobile)" stroke="var(--color-mobile)" strokeWidth={1.5} stackId="a" />
          <Area dataKey="desktop" type="natural" fill="url(#fillDesktop)" stroke="var(--color-desktop)" strokeWidth={1.5} stackId="a" />
        </AreaChart>
      </ChartContainer>
    </Section>
  )
}

function ChartPieSection() {
  return (
    <Section title="Pie Chart" sub="chart.tsx">
      <ChartContainer config={chartPieConfig} className="mx-auto aspect-square w-full max-h-[220px]">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie data={chartPieData} dataKey="visitors" nameKey="browser" />
        </PieChart>
      </ChartContainer>
    </Section>
  )
}

function ChartRadarSection() {
  return (
    <Section title="Radar Chart" sub="chart.tsx">
      <ChartContainer config={chartDesktopConfig} className="mx-auto aspect-square w-full max-h-[220px]">
        <RadarChart data={chartMonthlyData}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarAngleAxis dataKey="month" />
          <PolarGrid />
          <Radar dataKey="desktop" fill="var(--color-desktop)" fillOpacity={0.6} />
        </RadarChart>
      </ChartContainer>
    </Section>
  )
}

function ChartRadialSection() {
  return (
    <Section title="Radial Chart" sub="chart.tsx">
      <ChartContainer config={chartPieConfig} className="mx-auto aspect-square max-h-[220px]">
        <RadialBarChart data={chartPieData} innerRadius={30} outerRadius={110}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="browser" />} />
          <RadialBar dataKey="visitors" background />
        </RadialBarChart>
      </ChartContainer>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <ChartBarSection />
      <ChartBarMultipleSection />
      <ChartBarStackedSection />
      <ChartLineSection />
      <ChartAreaSection />
      <ChartAreaGradientSection />
      <ChartPieSection />
      <ChartRadarSection />
      <ChartRadialSection />
    </div>
  )
}
