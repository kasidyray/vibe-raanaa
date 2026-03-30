"use client"

import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/label"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ────────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    <div className="w-64">
      <DatePicker value={new Date(2026, 2, 28)} onChange={() => {}} />
    </div>
    <div className="flex items-start flex-wrap gap-6 text-center justify-center">
      {[
        "① Calendar icon",
        "② Date label",
        "③ Clear (×)",
        "④ Calendar popover (on click)",
      ].map(label => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="h-5 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

// ── State previews ─────────────────────────────────────────────────────────────

const EmptyStatePreview = () => (
  <div className="w-64">
    <DatePicker value={undefined} onChange={() => {}} placeholder="Pick a date" />
  </div>
)

const WithValueStatePreview = () => (
  <div className="w-64">
    <DatePicker value={new Date(2026, 2, 28)} onChange={() => {}} />
  </div>
)

const DisabledStatePreview = () => (
  <div className="w-64">
    <DatePicker value={undefined} onChange={() => {}} disabled placeholder="Not available" />
  </div>
)

const WithLabelStatePreview = () => (
  <div className="flex flex-col gap-1.5 w-64">
    <Label>Booking date</Label>
    <DatePicker value={new Date(2026, 3, 15)} onChange={() => {}} />
  </div>
)

// ── Do / Don't previews ────────────────────────────────────────────────────────

const DoWithLabelPreview = () => (
  <div className="flex flex-col gap-1.5 w-64">
    <Label>Start date</Label>
    <DatePicker value={new Date(2026, 3, 10)} onChange={() => {}} />
  </div>
)

const DontNoLabelPreview = () => (
  <div className="w-64">
    <DatePicker value={new Date(2026, 3, 10)} onChange={() => {}} />
  </div>
)

const DoDescriptivePlaceholderPreview = () => (
  <div className="w-64">
    <DatePicker value={undefined} onChange={() => {}} placeholder="Select booking date" />
  </div>
)

const DontGenericPlaceholderPreview = () => (
  <div className="w-64">
    <DatePicker value={undefined} onChange={() => {}} placeholder="Pick a date" />
  </div>
)

// ── Context example previews ───────────────────────────────────────────────────

const BookingFormExample = () => (
  <div className="w-full max-w-sm rounded-xl border overflow-hidden">
    <div className="px-4 py-3 border-b bg-muted/30">
      <p className="text-sm font-medium">Schedule event</p>
    </div>
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-1.5">
        <Label>Start date</Label>
        <DatePicker value={new Date(2026, 3, 10)} onChange={() => {}} placeholder="Select start date" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>End date</Label>
        <DatePicker value={new Date(2026, 3, 14)} onChange={() => {}} placeholder="Select end date" />
      </div>
    </div>
  </div>
)

// ── DatePicker design doc ──────────────────────────────────────────────────────

export const datePickerDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  overview: {
    what: "A button trigger that opens a calendar popover, letting the user pick a single date which is then formatted and displayed in the trigger.",
    why: "Forms need a standardised, accessible date picker. Free-text date entry causes format errors; a native date input has inconsistent browser styling. DatePicker wraps Calendar + Popover into a single controlled component.",
    problem: "Date entry in forms is error-prone with free-text inputs, and native <input type=\"date\"> has inconsistent cross-browser styling. DatePicker provides a consistently styled, accessible date selection surface.",
    appearsIn: ["Booking forms", "Event scheduling forms", "Filter drawers", "Settings forms"],
  },

  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Calendar icon",
        description: "Leading icon (RiCalendarLine) that visually identifies the field as a date picker.",
      },
      {
        name: "Date label / placeholder",
        description: "Shows the selected date formatted as PPP (e.g. \"March 28th, 2026\"), or the placeholder text when no date is selected.",
      },
      {
        name: "Clear button (×)",
        description: "Appears only when a date is selected. Clicking it calls onChange(undefined) without toggling the popover.",
        optional: true,
      },
      {
        name: "Calendar popover",
        description: "A Popover containing the Calendar grid. Opens when the trigger is clicked. Closes on date select, outside click, or Escape.",
        optional: true,
      },
    ],
  },

  whenToUse: [
    "Single date selection in forms — booking dates, event start/end, expiry dates.",
    "When free-text date entry would introduce format ambiguity or validation overhead.",
    "When the user benefits from seeing a calendar grid to orient their choice (next Monday, end of month).",
    "Settings or configuration forms where a specific date must be persisted.",
  ],

  whenNotToUse: [
    "Date range selection — use two DatePickers (start/end) or a dedicated range picker.",
    "Toolbar date filters with fixed presets — use DataTableDropdownFilter with preset options instead.",
    "When a relative period (\"last 30 days\") is sufficient — presets are less friction than a calendar.",
    "Time-of-day selection — combine with a separate time input or use a datetime picker.",
  ],

  variants: [],

  states: [
    {
      name: "Empty (placeholder)",
      description: "No date selected. Placeholder text is shown in muted foreground.",
      preview: <EmptyStatePreview />,
    },
    {
      name: "With value",
      description: "A date has been selected. The formatted date is shown and the × clear button appears.",
      preview: <WithValueStatePreview />,
    },
    {
      name: "Disabled",
      description: "The trigger is non-interactive. Opacity is reduced to 50% and cursor changes to not-allowed.",
      preview: <DisabledStatePreview />,
    },
    {
      name: "With label",
      description: "Paired with a visible Label above the trigger for accessible form fields.",
      preview: <WithLabelStatePreview />,
    },
  ],

  properties: [
    {
      name: "value",
      values: "Date · undefined",
      default: "undefined",
      description: "The currently selected date. Pair with onChange for controlled usage.",
    },
    {
      name: "onChange",
      values: "(date: Date | undefined) => void",
      default: "—",
      description: "Called with the new date when the user selects one, or undefined when the user clears the selection.",
    },
    {
      name: "placeholder",
      values: "string",
      default: "\"Pick a date\"",
      description: "Text shown in the trigger when no date is selected. Prefer a contextual label like \"Select start date\".",
    },
    {
      name: "disabled",
      values: "boolean",
      default: "false",
      description: "Disables the trigger and prevents the calendar from opening.",
    },
    {
      name: "className",
      values: "string",
      default: "—",
      description: "Additional classes applied to the trigger button. Use to override width (default full-width).",
    },
  ],

  contentGuidance: [
    {
      rule: "Use a contextual placeholder",
      detail: "The default \"Pick a date\" is too generic. Prefer \"Select start date\" or \"Choose expiry date\" to reduce cognitive load.",
    },
    {
      rule: "Always pair with a Label in forms",
      detail: "The trigger alone has no visible text label. An associated Label makes the field purpose clear and ensures screen reader accessibility.",
    },
    {
      rule: "Date format is PPP",
      detail: "The selected date displays as \"March 28th, 2026\" (date-fns PPP format). Design layouts to accommodate strings of 15–22 characters.",
    },
  ],

  behavior: [
    "Clicking the trigger opens a Calendar in a Popover, aligned to the start of the trigger.",
    "Selecting a date from the Calendar calls onChange with the selected Date and closes the popover.",
    "The × clear button calls onChange(undefined) and stops propagation so the popover does not reopen.",
    "Clicking outside the popover or pressing Escape closes it without changing the value.",
    "When disabled, the trigger ignores all pointer events; the clear button is also non-interactive.",
    "Full-width by default — the trigger stretches to fill its container's inline size.",
  ],

  spacing: [
    {
      rule: "Trigger height",
      detail: "h-10 — one step taller than the standard h-9 input, to give the calendar icon comfortable breathing room.",
    },
    {
      rule: "Internal layout",
      detail: "px-3 padding, gap-2 between the calendar icon and the date label.",
    },
    {
      rule: "Popover sizing",
      detail: "Popover uses w-auto and aligns to the start edge of the trigger so it sizes to the Calendar grid, not the trigger width.",
    },
    {
      rule: "Form field gap",
      detail: "gap-1.5 between the Label and the DatePicker trigger — same as all other form fields.",
    },
  ],

  accessibility: [
    {
      rule: "Always pair with a Label",
      detail: "Wrap the DatePicker in a form field with a Label. Without a visible label, sighted and screen reader users cannot identify the field purpose.",
    },
    {
      rule: "Clear button has aria-label",
      detail: "The × button includes aria-label=\"Clear date\" and is announced correctly by screen readers without additional work.",
    },
    {
      rule: "Calendar keyboard navigation",
      detail: "Arrow keys navigate days, Page Up/Down moves months, Home/End jumps to start/end of week. Enter selects the focused date.",
    },
    {
      rule: "Escape closes the popover",
      detail: "Pressing Escape while the calendar is open closes it and returns focus to the trigger.",
    },
    {
      rule: "Disabled state",
      detail: "When disabled, the trigger has pointer-events removed and is announced as disabled by screen readers.",
    },
  ],

  doItems: [
    {
      label: "Pair with a Label",
      description: "Always add a visible Label above the DatePicker in form contexts so sighted and screen reader users both understand the field.",
      preview: <DoWithLabelPreview />,
    },
    {
      label: "Use a descriptive placeholder",
      description: "Replace the generic default with something contextual — \"Select booking date\" removes ambiguity about what kind of date is expected.",
      preview: <DoDescriptivePlaceholderPreview />,
    },
  ],

  dontItems: [
    {
      label: "Omit the label",
      description: "A bare DatePicker with no Label has no visible context. Screen readers cannot identify what the field is for.",
      preview: <DontNoLabelPreview />,
    },
    {
      label: "Use a generic placeholder",
      description: "\"Pick a date\" tells the user nothing about what kind of date is needed. Always tailor the placeholder to the field's purpose.",
      preview: <DontGenericPlaceholderPreview />,
    },
  ],

  examplesInContext: [
    {
      title: "Event scheduling form",
      description: "Two DatePickers for start and end dates in a form card. Each has a Label and a contextual placeholder.",
      preview: <BookingFormExample />,
      code: `<div className="flex flex-col gap-4 p-4">
  <div className="flex flex-col gap-1.5">
    <Label>Start date</Label>
    <DatePicker value={startDate} onChange={setStartDate} placeholder="Select start date" />
  </div>
  <div className="flex flex-col gap-1.5">
    <Label>End date</Label>
    <DatePicker value={endDate} onChange={setEndDate} placeholder="Select end date" />
  </div>
</div>`,
    },
  ],

  relatedComponents: [
    {
      slug: "calendar",
      name: "Calendar",
      description: "The underlying calendar grid used inside DatePicker.",
      when: "Use Calendar directly when you need the calendar grid without a trigger button — e.g. embedded inline in a form panel.",
    },
    {
      slug: "select",
      name: "Select",
      description: "A dropdown selector for predefined options.",
      when: "Use Select instead when picking from a fixed set of date presets (\"Last 7 days\", \"This month\") rather than any arbitrary calendar date.",
    },
  ],

  designNotes: [
    "Trigger height is h-10 (taller than the standard h-9 input) to visually accommodate the calendar icon.",
    "The trigger is full-width by default. Always place it inside a width-constrained container (w-64, max-w-sm, form column).",
    "The popover uses align=\"start\" so it anchors to the left edge of the trigger regardless of trigger width.",
    "The × clear button uses e.stopPropagation() internally so clicking it does not retrigger the popover open.",
  ],
}
