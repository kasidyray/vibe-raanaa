"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { RiArrowDownSLine, RiCalendarLine } from "@remixicon/react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const PRESETS = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 3 months", value: "90d" },
  { label: "Last year", value: "1y" },
]

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" })
}

export function DashboardActions() {
  const [preset, setPreset] = useState(PRESETS[0])
  const [range, setRange] = useState<DateRange | undefined>()

  const customLabel = range?.from
    ? range.to
      ? `${formatDate(range.from)} – ${formatDate(range.to)}`
      : formatDate(range.from)
    : "Custom"

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-sm text-muted-foreground">Filter by</span>

      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
        >
          {preset.label}
          <RiArrowDownSLine className="size-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {PRESETS.map((p) => (
            <DropdownMenuItem key={p.value} onClick={() => setPreset(p)}>
              {p.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Popover>
        <PopoverTrigger
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
        >
          <RiCalendarLine className="size-4 text-muted-foreground" />
          {customLabel}
          <RiArrowDownSLine className="size-4 text-muted-foreground" />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
