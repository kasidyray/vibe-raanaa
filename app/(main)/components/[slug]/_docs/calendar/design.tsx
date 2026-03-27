"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ───────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-8 py-2">
    {/* Static visual mockup of a calendar month */}
    <div className="rounded-xl border bg-background p-3 w-64 select-none">
      {/* Caption row */}
      <div className="flex items-center justify-between mb-2">
        <div className="h-7 w-7 rounded-md border bg-muted/40" />
        <div className="h-5 w-28 rounded bg-muted/60" />
        <div className="h-7 w-7 rounded-md border bg-muted/40" />
      </div>
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="flex items-center justify-center h-8">
            <span className="text-xs font-medium text-muted-foreground">{d}</span>
          </div>
        ))}
      </div>
      {/* Day grid — row 1 */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {/* Outside-month days */}
        {[26, 27, 28].map(d => (
          <div key={d} className="flex items-center justify-center h-8">
            <span className="text-xs text-muted-foreground/40">{d}</span>
          </div>
        ))}
        {/* Days 1–4 */}
        {[1, 2, 3, 4].map(d => (
          <div key={d} className="flex items-center justify-center h-8">
            <span className="text-xs">{d}</span>
          </div>
        ))}
        {/* Row 2 */}
        {[5, 6, 7, 8, 9, 10, 11].map(d => (
          <div key={d} className="flex items-center justify-center h-8">
            <span className="text-xs">{d}</span>
          </div>
        ))}
        {/* Row 3 — with selected + today */}
        {[12, 13, 14].map(d => (
          <div key={d} className="flex items-center justify-center h-8">
            <span className="text-xs">{d}</span>
          </div>
        ))}
        {/* Selected day */}
        <div className="flex items-center justify-center h-8">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xs text-primary-foreground font-medium">15</span>
          </div>
        </div>
        {/* Today indicator */}
        <div className="flex items-center justify-center h-8">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xs font-medium">16</span>
          </div>
        </div>
        {[17, 18].map(d => (
          <div key={d} className="flex items-center justify-center h-8">
            <span className="text-xs">{d}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Anatomy labels */}
    <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-3 text-center">
      {[
        "① Nav buttons",
        "② Month caption",
        "③ Weekday headers",
        "④ Day grid",
        "⑤ Selected day",
        "⑥ Today indicator",
        "⑦ Outside-month days",
      ].map(label => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="h-5 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

// ── Variants ──────────────────────────────────────────────────────────────────

const LabelCaptionPreview = () => {
  const [selected, setSelected] = useState<Date | undefined>(undefined)
  return (
    <div className="flex justify-center">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        captionLayout="label"
      />
    </div>
  )
}

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

const RangeSelectionVariantPreview = () => {
  const [range, setRange] = useState<{ from: Date | undefined; to?: Date | undefined }>({
    from: undefined,
    to: undefined,
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

// ── States ────────────────────────────────────────────────────────────────────

const DefaultStatePreview = () => {
  const [selected, setSelected] = useState<Date | undefined>(undefined)
  return (
    <div className="flex justify-center">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  )
}

const WithSelectedDatePreview = () => {
  const [selected, setSelected] = useState<Date | undefined>(new Date(2025, 2, 15))
  return (
    <div className="flex justify-center">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  )
}

const RangeStatePreview = () => {
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

const DisabledDatesPreview = () => {
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

// ── Do / Don't previews ───────────────────────────────────────────────────────

const DoStandalonePreview = () => {
  const [selected, setSelected] = useState<Date | undefined>(undefined)
  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="px-4 py-3 border-b bg-muted/30">
        <p className="text-sm font-medium">Schedule a session</p>
      </div>
      <div className="p-4 flex justify-center">
        <Calendar mode="single" selected={selected} onSelect={setSelected} />
      </div>
    </div>
  )
}

const DoRangePreview = () => {
  const [range, setRange] = useState<{ from: Date | undefined; to?: Date | undefined }>({
    from: new Date(2025, 2, 5),
    to: new Date(2025, 2, 12),
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

const DontDirectInputPreview = () => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex justify-center">
      <Calendar mode="single" />
    </div>
    <p className="text-xs text-muted-foreground text-center">
      For a form date input, use DatePicker instead
    </p>
  </div>
)

const DontHideOutsideDaysPreview = () => {
  const [selected, setSelected] = useState<Date | undefined>(undefined)
  return (
    <div className="flex flex-col items-center gap-2">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        showOutsideDays={false}
      />
      <p className="text-xs text-muted-foreground text-center">
        Hidden outside days leave confusing grid gaps
      </p>
    </div>
  )
}

// ── Examples in context ───────────────────────────────────────────────────────

const SidebarFilterExample = () => {
  const [selected, setSelected] = useState<Date | undefined>(undefined)
  return (
    <div className="rounded-xl border overflow-hidden max-w-xs">
      <div className="px-4 py-3 border-b bg-muted/30">
        <p className="text-sm font-medium">Filter by date</p>
      </div>
      <div className="p-3 flex justify-center">
        <Calendar mode="single" selected={selected} onSelect={setSelected} />
      </div>
      {selected && (
        <div className="px-4 py-2 border-t bg-muted/20">
          <p className="text-xs text-muted-foreground">
            Showing results for:{" "}
            <span className="font-medium text-foreground">
              {selected.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

const BookingFormExample = () => {
  const [range, setRange] = useState<{ from: Date | undefined; to?: Date | undefined }>({
    from: new Date(2025, 2, 12),
    to: new Date(2025, 2, 17),
  })
  return (
    <div className="rounded-xl border overflow-hidden max-w-sm">
      <div className="px-4 py-3 border-b bg-muted/30">
        <p className="text-sm font-medium">Select booking dates</p>
      </div>
      <div className="p-3 flex justify-center">
        <Calendar
          mode="range"
          selected={range}
          onSelect={(r) => setRange(r ?? { from: undefined, to: undefined })}
          disabled={{ before: new Date() }}
        />
      </div>
      {range.from && (
        <div className="px-4 py-2 border-t bg-muted/20 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {range.from.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            {range.to && ` → ${range.to.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
          </p>
          {range.from && range.to && (
            <p className="text-xs font-medium">
              {Math.round((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24))} nights
            </p>
          )}
        </div>
      )}
    </div>
  )
}

// ── Calendar design doc ───────────────────────────────────────────────────────

export const calendarDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  // ── Overview ───────────────────────────────────────────────────────────────
  overview: {
    what: "A standalone interactive month calendar for selecting single dates, multiple dates, or date ranges.",
    why: "A visual calendar grid gives users spatial context when picking dates — essential for scheduling, booking, and filtering UIs.",
    problem: "Plain text date inputs offer no visual reference — users must mentally map dates to a calendar, increasing errors and friction.",
    appearsIn: [
      "Sidebar filters",
      "Booking and scheduling forms",
      "Report date range pickers",
      "Date picker popovers (via DatePicker)",
      "Inline scheduling panels",
    ],
  },

  // ── Anatomy ────────────────────────────────────────────────────────────────
  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Nav buttons",
        description: "Previous and next month arrow buttons. Styled as ghost buttons by default (buttonVariant prop).",
      },
      {
        name: "Month caption",
        description: "Displays the current month and year. Can be a static label or interactive dropdowns via captionLayout.",
      },
      {
        name: "Weekday headers",
        description: "Single-letter day-of-week labels (S M T W T F S). Always visible.",
      },
      {
        name: "Day grid",
        description: "7-column grid of day cells. Each cell is 32px (--cell-size). Carries selection and range styling via data attributes.",
      },
      {
        name: "Selected day",
        description: "The chosen date. Gets bg-primary and text-primary-foreground. In range mode, start/end get full fill.",
      },
      {
        name: "Today indicator",
        description: "Today's date receives a muted background even when not selected, so the user is always oriented.",
        optional: true,
      },
      {
        name: "Outside-month days",
        description: "Days from the previous or next month shown at grid edges. Muted text. Controlled by showOutsideDays.",
        optional: true,
      },
    ],
  },

  // ── Usage ──────────────────────────────────────────────────────────────────
  whenToUse: [
    "Standalone scheduling pickers in sidebars, panels, or full-width sections.",
    "Date range inputs for booking forms, report filters, or analytics dashboards.",
    "Any context where the user needs visual calendar context — not just a typed date.",
    "Multi-date selection workflows where users pick discrete non-contiguous dates.",
  ],
  whenNotToUse: [
    "Inline form date inputs (text fields) — use DatePicker (wraps Calendar in a Popover trigger).",
    "Displaying a read-only date — use formatted text or a Badge.",
    "Selecting a time alongside a date — combine with a time input separately.",
  ],

  // ── Variants ───────────────────────────────────────────────────────────────
  variants: [
    {
      name: "Label caption",
      description: "Shows the month and year as static non-interactive text. Default and most compact layout.",
      when: "Simple date picking within nearby months.",
      preview: <LabelCaptionPreview />,
    },
    {
      name: "Dropdown caption",
      description: "Replaces the static month/year label with select dropdowns for fast navigation across years.",
      when: "Long-range date navigation, such as birth year or historical date entry.",
      preview: <DropdownCaptionPreview />,
    },
    {
      name: "Range selection",
      description: "Selects a contiguous range — start and end dates with a filled highlight between them.",
      when: "Booking windows, report date ranges, and any from/to date input.",
      preview: <RangeSelectionVariantPreview />,
    },
  ],

  // ── States ─────────────────────────────────────────────────────────────────
  states: [
    {
      name: "Default",
      description: "No date selected. Today's date is softly highlighted so the user is oriented in time.",
      preview: <DefaultStatePreview />,
    },
    {
      name: "With selected date",
      description: "A single day is highlighted with bg-primary and white text.",
      preview: <WithSelectedDatePreview />,
    },
    {
      name: "Range selected",
      description: "Start and end days are filled; intermediate days receive a lighter bg-primary/15 fill.",
      preview: <RangeStatePreview />,
    },
    {
      name: "With disabled dates",
      description: "Days matching the disabled matcher are visually muted and non-interactive.",
      preview: <DisabledDatesPreview />,
    },
  ],

  // ── Properties ─────────────────────────────────────────────────────────────
  properties: [
    {
      name: "mode",
      values: "single · multiple · range",
      default: "single",
      description: "Selection mode inherited from react-day-picker. Controls the shape of the selected value.",
    },
    {
      name: "selected",
      values: "Date · Date[] · DateRange",
      default: "—",
      description: "The currently selected value. Shape must match mode: Date for single, DateRange ({ from, to }) for range.",
    },
    {
      name: "onSelect",
      values: "callback",
      default: "—",
      description: "Fires when the user clicks a day. Receives the new selection value.",
    },
    {
      name: "showOutsideDays",
      values: "boolean",
      default: "true",
      description: "Whether to show days from the previous and next month at grid edges. Hiding them creates visual gaps.",
    },
    {
      name: "captionLayout",
      values: "label · dropdown · dropdown-months · dropdown-years",
      default: "label",
      description: "Controls whether the month/year caption is static text or interactive dropdowns.",
    },
    {
      name: "disabled",
      values: "Date · Date[] · Matcher · Matcher[]",
      default: "—",
      description: "Disables specific dates or ranges. Common: { before: new Date() } to disable past dates.",
    },
    {
      name: "buttonVariant",
      values: "Button variant",
      default: "ghost",
      description: "Variant applied to the prev/next month nav buttons.",
    },
  ],

  // ── Content guidance ───────────────────────────────────────────────────────
  contentGuidance: [
    {
      rule: "Use label caption for most cases",
      detail: "The static label caption is simpler and more compact — only switch to dropdown when users need to jump across many years.",
    },
    {
      rule: "Use dropdown for far-from-today navigation",
      detail: "Birth year inputs, historical records, or any date more than a year away benefit from dropdown navigation to avoid excessive clicking.",
    },
  ],

  // ── Behavior ───────────────────────────────────────────────────────────────
  behavior: [
    "Outside-month days are shown by default (showOutsideDays=true) — they appear with muted text and selecting them advances to that month.",
    "Today's date always receives a muted background indicator regardless of selection state.",
    "Selected day gets bg-primary and text-primary-foreground styling.",
    "Range selection: start and end receive full bg-primary fill; intermediate days receive bg-primary/15.",
    "Calendar automatically applies bg-transparent when placed inside a Card (in-data-[slot=card-content]) or Popover — no manual className override needed.",
  ],

  // ── Spacing ────────────────────────────────────────────────────────────────
  spacing: [
    {
      rule: "Cell size",
      detail: "--cell-size is 32px (spacing(8)) — do not override this CSS variable.",
    },
    {
      rule: "In a container",
      detail: "No outer margin needed — Calendar manages its own internal padding.",
    },
    {
      rule: "In a sidebar filter",
      detail: "Wrap in p-3 or p-4 inside the filter panel to give breathing room.",
    },
  ],

  // ── Accessibility ──────────────────────────────────────────────────────────
  accessibility: [
    {
      rule: "Built-in keyboard navigation",
      detail: "Calendar uses a table role internally. Arrow keys move between days; Enter or Space selects.",
    },
    {
      rule: "Disabled date labeling",
      detail: "Disabled days receive aria-disabled automatically — don't rely on visual muting alone.",
    },
    {
      rule: "Screen reader label",
      detail: "Provide an aria-label on the Calendar element to describe its purpose: aria-label=\"Check-in date\".",
    },
    {
      rule: "Range announcement",
      detail: "When using range mode, pair with an aria-live region to announce the selected from/to dates.",
    },
  ],

  // ── Do & Don't ─────────────────────────────────────────────────────────────
  doItems: [
    {
      label: "Use Calendar standalone for scheduling UIs",
      description: "In sidebars and full-width pickers, Calendar renders directly — no popover needed.",
      preview: <DoStandalonePreview />,
    },
    {
      label: "Use range mode for date range inputs",
      description: "Pass mode=\"range\" and a DateRange state for booking windows or report filters.",
      preview: <DoRangePreview />,
    },
  ],
  dontItems: [
    {
      label: "Don't use Calendar directly for a date input field",
      description: "For form fields, use DatePicker — it wraps Calendar in a Popover trigger with proper input affordances.",
      preview: <DontDirectInputPreview />,
    },
    {
      label: "Don't hide outside days in single-month view",
      description: "showOutsideDays={false} leaves irregular gaps at the top and bottom of the grid, disorienting users.",
      preview: <DontHideOutsideDaysPreview />,
    },
  ],

  // ── Examples in context ────────────────────────────────────────────────────
  examplesInContext: [
    {
      title: "In a sidebar filter",
      description: "Calendar with mode=\"single\" inside a filter panel, showing the selected date as a summary below.",
      preview: <SidebarFilterExample />,
      code: `const [selected, setSelected] = useState<Date | undefined>(undefined)

<div className="rounded-xl border overflow-hidden max-w-xs">
  <div className="px-4 py-3 border-b bg-muted/30">
    <p className="text-sm font-medium">Filter by date</p>
  </div>
  <div className="p-3 flex justify-center">
    <Calendar mode="single" selected={selected} onSelect={setSelected} />
  </div>
  {selected && (
    <div className="px-4 py-2 border-t bg-muted/20">
      <p className="text-xs text-muted-foreground">
        Showing results for:{" "}
        <span className="font-medium text-foreground">
          {selected.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      </p>
    </div>
  )}
</div>`,
    },
    {
      title: "In a booking form",
      description: "Calendar with mode=\"range\" showing check-in/check-out selection with a nights summary.",
      preview: <BookingFormExample />,
      code: `const [range, setRange] = useState<{ from: Date | undefined; to?: Date | undefined }>({
  from: new Date(2025, 2, 12),
  to: new Date(2025, 2, 17),
})

<div className="rounded-xl border overflow-hidden max-w-sm">
  <div className="px-4 py-3 border-b bg-muted/30">
    <p className="text-sm font-medium">Select booking dates</p>
  </div>
  <div className="p-3 flex justify-center">
    <Calendar
      mode="range"
      selected={range}
      onSelect={(r) => setRange(r ?? { from: undefined, to: undefined })}
      disabled={{ before: new Date() }}
    />
  </div>
  {range.from && (
    <div className="px-4 py-2 border-t bg-muted/20 flex items-center justify-between">
      <p className="text-xs text-muted-foreground">
        {range.from.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        {range.to && \` → \${range.to.toLocaleDateString("en-US", { month: "short", day: "numeric" })}\`}
      </p>
      {range.from && range.to && (
        <p className="text-xs font-medium">
          {Math.round((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24))} nights
        </p>
      )}
    </div>
  )}
</div>`,
    },
  ],

  // ── Related components ─────────────────────────────────────────────────────
  relatedComponents: [
    {
      slug: "date-picker",
      name: "DatePicker",
      description: "Calendar wrapped inside a Popover trigger — the right pattern for form date input fields.",
      when: "Use instead when the date selector is attached to a form field or input.",
    },
    {
      slug: "popover",
      name: "Popover",
      description: "The overlay primitive used by DatePicker to float the calendar above the page.",
      when: "Use when building a custom popover-based date picker beyond DatePicker's defaults.",
    },
  ],

  // ── Design notes ───────────────────────────────────────────────────────────
  designNotes: [
    "Calendar uses --cell-size (32px) and --cell-radius (var(--radius-4xl)) CSS vars — don't override them in Figma or code.",
    "Range selection styling is entirely CSS-driven via data attributes on day cells — no extra className props needed.",
  ],
}
