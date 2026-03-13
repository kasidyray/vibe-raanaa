"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const data6M = [
  { month: "Jan", desktop: 320, mobile: 150 },
  { month: "Feb", desktop: 570, mobile: 375 },
  { month: "Mar", desktop: 445, mobile: 225 },
  { month: "Apr", desktop: 137, mobile: 356 },
  { month: "May", desktop: 392, mobile: 243 },
  { month: "Jun", desktop: 400, mobile: 262 },
]

const data12M = [
  { month: "Jan", desktop: 320, mobile: 150 },
  { month: "Feb", desktop: 570, mobile: 375 },
  { month: "Mar", desktop: 445, mobile: 225 },
  { month: "Apr", desktop: 137, mobile: 356 },
  { month: "May", desktop: 392, mobile: 243 },
  { month: "Jun", desktop: 400, mobile: 262 },
  { month: "Jul", desktop: 480, mobile: 310 },
  { month: "Aug", desktop: 290, mobile: 195 },
  { month: "Sep", desktop: 510, mobile: 340 },
  { month: "Oct", desktop: 360, mobile: 280 },
  { month: "Nov", desktop: 430, mobile: 220 },
  { month: "Dec", desktop: 380, mobile: 300 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
}

export default function TrafficChannelsCard() {
  const [range, setRange] = useState("6M")
  const data = range === "6M" ? data6M : data12M

  const desktopTotal = data.reduce((s, d) => s + d.desktop, 0)
  const mobileTotal = data.reduce((s, d) => s + d.mobile, 0)
  const delta = Math.round(((desktopTotal - mobileTotal) / mobileTotal) * 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Channels</CardTitle>
        <CardDescription>Desktop vs mobile over the last {range}</CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={range}
            onValueChange={(v) => v && setRange(v)}
            variant="outline"
            size="sm"
            aria-label="Time range"
          >
            <ToggleGroupItem value="6M">6M</ToggleGroupItem>
            <ToggleGroupItem value="12M">12M</ToggleGroupItem>
          </ToggleGroup>
        </CardAction>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="max-h-[180px] w-full">
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={[6, 6, 0, 0]} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="grid w-full grid-cols-3 divide-x divide-border/60">
          <div className="px-2 text-center">
            <div className="text-[0.65rem] uppercase text-muted-foreground">Desktop</div>
            <div className="text-sm font-medium tabular-nums">{desktopTotal.toLocaleString()}</div>
          </div>
          <div className="px-2 text-center">
            <div className="text-[0.65rem] uppercase text-muted-foreground">Mobile</div>
            <div className="text-sm font-medium tabular-nums">{mobileTotal.toLocaleString()}</div>
          </div>
          <div className="px-2 text-center">
            <div className="text-[0.65rem] uppercase text-muted-foreground">Mix Delta</div>
            <div className="text-sm font-medium tabular-nums">+{delta}%</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
