"use client"

import { useState } from "react"
import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Previews ───────────────────────────────────────────────────────────────────

function BasicPreview() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 2, 28))
  return (
    <div className="w-64">
      <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
    </div>
  )
}

function WithLabelPreview() {
  const [date, setDate] = useState<Date | undefined>()
  return (
    <div className="flex flex-col gap-1.5 w-64">
      <Label>Start date</Label>
      <DatePicker value={date} onChange={setDate} placeholder="Select start date" />
    </div>
  )
}

function DisabledPreview() {
  return (
    <div className="w-64">
      <DatePicker value={undefined} onChange={() => {}} disabled placeholder="Not available" />
    </div>
  )
}

function DateRangePreview() {
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  return (
    <div className="w-full max-w-sm rounded-xl border p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label>Start date</Label>
        <DatePicker value={startDate} onChange={setStartDate} placeholder="Select start date" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>End date</Label>
        <DatePicker value={endDate} onChange={setEndDate} placeholder="Select end date" />
      </div>
      <Button size="sm" className="self-end">Continue</Button>
    </div>
  )
}

// ── DatePicker develop doc ─────────────────────────────────────────────────────

export const datePickerDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
      "npx shadcn add @raana/calendar",
      "npx shadcn add @raana/popover",
    ],
    command: "npx shadcn add @raana/date-picker",
    importPath: `import { DatePicker } from "@/components/ui/date-picker"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "DatePicker depends on date-fns for formatting. Install it if not already present: npm install date-fns",
      "For form labels: npx shadcn add @raana/label",
    ],
  },

  basicUsage: `import { useState } from "react"
import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/label"

// Controlled usage (recommended in forms)
const [date, setDate] = useState<Date | undefined>()

<div className="flex flex-col gap-1.5 w-64">
  <Label>Start date</Label>
  <DatePicker
    value={date}
    onChange={setDate}
    placeholder="Select start date"
  />
</div>

// Disabled
<DatePicker value={undefined} onChange={() => {}} disabled />`,

  codeExamples: [
    {
      title: "Basic controlled",
      description: "Controlled with useState. Value is undefined until the user picks a date. The × clear button appears automatically when a date is selected.",
      preview: <BasicPreview />,
      code: `const [date, setDate] = useState<Date | undefined>(new Date())

<div className="w-64">
  <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
</div>`,
    },
    {
      title: "With label",
      description: "Wrap in a flex-col gap-1.5 group with a visible Label. Use this pattern in all form contexts.",
      preview: <WithLabelPreview />,
      code: `const [date, setDate] = useState<Date | undefined>()

<div className="flex flex-col gap-1.5 w-64">
  <Label>Start date</Label>
  <DatePicker
    value={date}
    onChange={setDate}
    placeholder="Select start date"
  />
</div>`,
    },
    {
      title: "Disabled",
      description: "Non-interactive at 50% opacity. Use when the field is locked based on other form state.",
      preview: <DisabledPreview />,
      code: `<DatePicker
  value={undefined}
  onChange={() => {}}
  disabled
  placeholder="Not available"
/>`,
    },
    {
      title: "Date range in a form",
      description: "Two independent controlled DatePickers for start and end date. Manage them with separate state variables.",
      preview: <DateRangePreview />,
      code: `const [startDate, setStartDate] = useState<Date | undefined>()
const [endDate, setEndDate] = useState<Date | undefined>()

<div className="flex flex-col gap-4">
  <div className="flex flex-col gap-1.5">
    <Label>Start date</Label>
    <DatePicker
      value={startDate}
      onChange={setStartDate}
      placeholder="Select start date"
    />
  </div>
  <div className="flex flex-col gap-1.5">
    <Label>End date</Label>
    <DatePicker
      value={endDate}
      onChange={setEndDate}
      placeholder="Select end date"
    />
  </div>
</div>`,
    },
  ],

  apiReference: [
    {
      name: "value",
      values: "Date | undefined",
      default: "undefined",
      description: "The selected date. Pass undefined for no selection. Pair with onChange for controlled usage.",
    },
    {
      name: "onChange",
      values: "(date: Date | undefined) => void",
      default: "—",
      description: "Called with the new Date when the user selects one, or undefined when the user clears the selection.",
    },
    {
      name: "placeholder",
      values: "string",
      default: "\"Pick a date\"",
      description: "Text shown when no date is selected. Use contextual language (\"Select booking date\") rather than the generic default.",
    },
    {
      name: "disabled",
      values: "boolean",
      default: "false",
      description: "Disables the trigger and prevents the calendar popover from opening.",
    },
    {
      name: "className",
      values: "string",
      default: "—",
      description: "Additional classes applied to the trigger button. Use to constrain width (e.g. w-48, max-w-xs).",
    },
  ],

  accessibility: [
    {
      rule: "Pair with a Label element",
      detail: "Wrap the DatePicker in a flex-col gap-1.5 form group with a visible Label above it. The trigger stretches full-width by default so it aligns naturally.",
    },
    {
      rule: "Clear button has built-in aria-label",
      detail: "The × clear button includes aria-label=\"Clear date\". No additional ARIA work needed for the clear action.",
    },
    {
      rule: "Calendar keyboard support is built-in",
      detail: "Arrow keys navigate the grid, Page Up/Down changes months, Enter selects, Escape closes. Do not override tabIndex on the calendar.",
    },
    {
      rule: "Disabled state",
      detail: "Set disabled={true} when the field is locked. The trigger gets pointer-events: none and is announced as disabled. Do not rely on opacity alone.",
    },
  ],
}
