"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Single date preview ───────────────────────────────────────────────────────

const SingleDatePreview = () => {
  const [selected, setSelected] = useState<Date | undefined>(undefined)
  return (
    <div className="flex justify-center">
      <Calendar mode="single" selected={selected} onSelect={setSelected} />
    </div>
  )
}

// ── Dropdown caption preview ──────────────────────────────────────────────────

const DropdownCaptionPreview = () => {
  const [selected, setSelected] = useState<Date | undefined>(undefined)
  return (
    <div className="flex justify-center">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        captionLayout="dropdown"
      />
    </div>
  )
}

// ── Range selection preview ───────────────────────────────────────────────────

const RangeSelectionPreview = () => {
  const [range, setRange] = useState<{ from: Date | undefined; to?: Date | undefined }>({
    from: new Date(2025, 2, 10),
    to: new Date(2025, 2, 18),
  })
  return (
    <div className="flex justify-center">
      <Calendar
        mode="range"
        selected={range}
        onSelect={(r) => setRange(r ?? { from: undefined, to: undefined })}
      />
    </div>
  )
}

// ── Disabled past dates preview ───────────────────────────────────────────────

const DisabledPastPreview = () => {
  const [selected, setSelected] = useState<Date | undefined>(undefined)
  return (
    <div className="flex justify-center">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        disabled={{ before: new Date() }}
      />
    </div>
  )
}

// ── In a Card preview ─────────────────────────────────────────────────────────

const InCardPreview = () => {
  const [selected, setSelected] = useState<Date | undefined>(undefined)
  return (
    <div className="flex justify-center max-w-xs mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Pick a date</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center pb-4">
          <Calendar mode="single" selected={selected} onSelect={setSelected} />
        </CardContent>
      </Card>
    </div>
  )
}

// ── Calendar develop doc ──────────────────────────────────────────────────────

export const calendarDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
      "npx shadcn add @raana/button",
    ],
    command: "npx shadcn add @raana/calendar",
    importPath: `import { Calendar } from "@/components/ui/calendar"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "Calendar is a standalone picker — for form date input fields, use DatePicker (wraps Calendar in a Popover trigger).",
      "react-day-picker is a peer dependency — install it if not already present: npm install react-day-picker",
    ],
  },

  basicUsage: `import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

export function MyCalendar() {
  const [selected, setSelected] = useState<Date | undefined>(undefined)

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
    />
  )
}`,

  codeExamples: [
    {
      title: "Single date selection",
      description: "The default mode. Manage selected state with useState<Date | undefined>.",
      preview: <SingleDatePreview />,
      code: `import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

export function SingleDatePicker() {
  const [selected, setSelected] = useState<Date | undefined>(undefined)

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
    />
  )
}`,
    },
    {
      title: "Dropdown caption layout",
      description: "Replaces the static month/year label with select dropdowns. Useful for navigating to years far from today.",
      preview: <DropdownCaptionPreview />,
      code: `import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

export function DropdownCalendar() {
  const [selected, setSelected] = useState<Date | undefined>(undefined)

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      captionLayout="dropdown"
    />
  )
}`,
    },
    {
      title: "Range selection",
      description: "Pass mode=\"range\" and a DateRange state. The range object has { from: Date | undefined; to?: Date | undefined }.",
      preview: <RangeSelectionPreview />,
      code: `import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import type { DateRange } from "react-day-picker"

export function RangeCalendar() {
  const [range, setRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  })

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={(r) => setRange(r ?? { from: undefined, to: undefined })}
    />
  )
}`,
    },
    {
      title: "Disabled past dates",
      description: "Pass a Matcher to the disabled prop. { before: new Date() } prevents selecting any date in the past.",
      preview: <DisabledPastPreview />,
      code: `import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

export function FutureDatePicker() {
  const [selected, setSelected] = useState<Date | undefined>(undefined)

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      disabled={{ before: new Date() }}
    />
  )
}`,
    },
    {
      title: "In a Card",
      description: "Calendar automatically applies bg-transparent inside CardContent — no manual override needed.",
      preview: <InCardPreview />,
      code: `import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CalendarCard() {
  const [selected, setSelected] = useState<Date | undefined>(undefined)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pick a date</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
        />
      </CardContent>
    </Card>
  )
}`,
    },
  ],

  apiReference: [
    {
      name: "mode",
      values: `"single" | "multiple" | "range"`,
      default: `"single"`,
      description: "Selection mode from react-day-picker. Determines the shape of the selected value and onSelect callback.",
    },
    {
      name: "selected",
      values: "Date | Date[] | DateRange | undefined",
      default: "—",
      description: "Controlled selection value. Type must match mode: Date for single, DateRange for range.",
    },
    {
      name: "onSelect",
      values: "(value: Date | Date[] | DateRange | undefined) => void",
      default: "—",
      description: "Callback fired when the user selects or deselects a date.",
    },
    {
      name: "showOutsideDays",
      values: "boolean",
      default: "true",
      description: "Whether to render days from adjacent months at the grid edges. Disabling creates visual gaps.",
    },
    {
      name: "captionLayout",
      values: `"label" | "dropdown" | "dropdown-months" | "dropdown-years"`,
      default: `"label"`,
      description: "Controls whether the month/year header is static text or interactive dropdowns.",
    },
    {
      name: "disabled",
      values: "Date | Date[] | Matcher | Matcher[]",
      default: "—",
      description: "Dates or matchers to disable. Common: { before: new Date() } disables past dates.",
    },
    {
      name: "buttonVariant",
      values: `"default" | "outline" | "secondary" | "ghost" | "destructive" | "link"`,
      default: `"ghost"`,
      description: "Button variant applied to the previous and next month navigation arrows.",
    },
    {
      name: "locale",
      values: "Partial<Locale>",
      default: "—",
      description: "date-fns locale object for localising day/month names.",
    },
    {
      name: "className",
      values: "string",
      default: "—",
      description: "Additional CSS classes on the root calendar element.",
    },
  ],

  accessibility: [
    {
      rule: "Built-in keyboard navigation",
      detail: "Calendar uses a table role internally. Arrow keys move focus between days; Enter or Space confirms selection. No extra work needed.",
    },
    {
      rule: "Label the Calendar for screen readers",
      detail: "Add aria-label to the Calendar element to describe its purpose: <Calendar aria-label=\"Check-in date\" ... />.",
    },
    {
      rule: "Disabled dates are aria-disabled",
      detail: "Days matching the disabled prop receive aria-disabled=\"true\" automatically — do not rely solely on visual muting.",
    },
    {
      rule: "Announce range selections with aria-live",
      detail: "When using range mode, add an aria-live=\"polite\" region near the calendar that reads out the selected from and to dates for screen reader users.",
    },
  ],
}
