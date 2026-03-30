"use client"

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import type { ComponentDocData } from "../../component-doc-types"

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2 w-full max-w-sm">
    <Progress value={60} />
    <div className="flex items-start flex-wrap gap-8 text-center justify-center">
      {["① Progress root", "② ProgressTrack", "③ ProgressIndicator", "④ ProgressLabel", "⑤ ProgressValue"].map(label => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="h-5 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

const BasicPreview = () => (
  <div className="w-full max-w-sm">
    <Progress value={45} />
  </div>
)

const WithLabelPreview = () => (
  <div className="w-full max-w-sm">
    <Progress value={72}>
      <ProgressLabel>Profile completion</ProgressLabel>
      <ProgressValue />
    </Progress>
  </div>
)

const IndeterminatePreview = () => (
  <div className="w-full max-w-sm">
    <Progress value={null} />
  </div>
)

const MultiplePreview = () => (
  <div className="w-full max-w-sm flex flex-col gap-4">
    <Progress value={90}>
      <ProgressLabel>Storage used</ProgressLabel>
      <ProgressValue />
    </Progress>
    <Progress value={40}>
      <ProgressLabel>CPU usage</ProgressLabel>
      <ProgressValue />
    </Progress>
    <Progress value={15}>
      <ProgressLabel>Memory</ProgressLabel>
      <ProgressValue />
    </Progress>
  </div>
)

const UploadPreview = () => (
  <div className="w-full max-w-sm rounded-xl border p-4 flex flex-col gap-3">
    <div className="flex items-center justify-between text-sm">
      <span className="font-medium">Uploading design-assets.zip</span>
      <span className="text-muted-foreground text-xs">34 MB / 80 MB</span>
    </div>
    <Progress value={42}>
      <ProgressLabel>Upload progress</ProgressLabel>
      <ProgressValue />
    </Progress>
  </div>
)

export const progressDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  overview: {
    what: "A horizontal bar that fills left-to-right to communicate progress toward a known or unknown completion point.",
    why: "Progress bars set user expectations for how long an operation will take. A filling bar communicates advancement; an indeterminate animation signals activity when duration is unknown.",
    problem: "Showing a plain spinner for all async operations gives users no sense of how far along they are. Progress bars give precise or approximate completion feedback.",
    appearsIn: ["File upload / download flows", "Onboarding and profile completion", "Multi-step form progress", "Dashboard resource meters (storage, CPU, memory)", "Background processing tasks"],
  },

  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      { name: "Progress", description: "Root component. Accepts value (0–100) and renders children before appending ProgressTrack + ProgressIndicator automatically." },
      { name: "ProgressTrack", description: "The grey background bar. h-3, rounded-4xl, bg-muted. Full width by default." },
      { name: "ProgressIndicator", description: "The filled portion. bg-primary, transitions on value change with transition-all." },
      { name: "ProgressLabel", description: "Optional label rendered above the track. text-sm font-medium." },
      { name: "ProgressValue", description: "Optional percentage readout. ml-auto positions it to the right of the label. Reads the current percentage from ARIA context." },
    ],
  },

  whenToUse: [
    "When the percentage completion of a task is known (file upload, onboarding steps, multi-step wizard).",
    "For resource utilization meters where a current value maps to a 0–100 scale.",
    "When you want to communicate time remaining or effort completed visually.",
    "Use value={null} for indeterminate progress when a task is in progress but duration is unknown.",
  ],

  whenNotToUse: [
    "For instant operations (< 300ms) — a progress bar flash is jarring and unhelpful.",
    "For binary states (complete / incomplete) — use a Checkbox or status Badge instead.",
    "As a decorative element with arbitrary colours — keep bg-primary for the indicator.",
  ],

  variants: [
    {
      name: "Basic",
      description: "Track and indicator only — no label or value.",
      when: "When the progress context is clear from surrounding content",
      preview: <BasicPreview />,
      fullWidth: true,
    },
    {
      name: "With label and value",
      description: "Label on the left, percentage on the right, track below.",
      when: "Onboarding checklists, profile completion, resource meters",
      preview: <WithLabelPreview />,
      fullWidth: true,
    },
    {
      name: "Indeterminate",
      description: "value={null} triggers a continuous animation — no percentage shown.",
      when: "Background tasks with unknown duration (syncing, processing)",
      preview: <IndeterminatePreview />,
      fullWidth: true,
    },
  ],

  states: [
    {
      name: "Multiple progress bars",
      description: "Stack multiple Progress components in a flex-col for a resource usage dashboard panel.",
      preview: <MultiplePreview />,
    },
    {
      name: "In a file upload card",
      description: "Progress embedded in a card alongside file name and size info.",
      preview: <UploadPreview />,
    },
  ],

  properties: [
    {
      name: "value",
      values: "number | null",
      default: "—",
      description: "0–100 fills the indicator proportionally. null triggers indeterminate animation.",
    },
    {
      name: "children",
      values: "ReactNode",
      default: "—",
      description: "ProgressLabel and ProgressValue rendered before the track. The track and indicator are appended automatically by the root.",
    },
    {
      name: "className",
      values: "string",
      default: "—",
      description: "Applied to the root. The root is flex flex-wrap gap-3 — the label row and track are laid out via this flex container.",
    },
  ],

  contentGuidance: [
    {
      rule: "Always pair a label with ProgressValue",
      detail: "A percentage alone is meaningless without context. ProgressLabel provides the 'what', ProgressValue provides the 'how much'.",
    },
    {
      rule: "Use value={null} for unknown duration",
      detail: "If you can't calculate a percentage, don't guess. null triggers the indeterminate animation which honestly communicates 'working but unknown'.",
    },
    {
      rule: "Don't artificially animate the value",
      detail: "The indicator uses transition-all. Don't tick the value up manually just to look busy — use indeterminate instead.",
    },
  ],

  behavior: [
    "ProgressIndicator uses transition-all — the bar smoothly animates when value changes.",
    "value={null} triggers the base-ui indeterminate state, which runs a sliding animation.",
    "ProgressValue reads the percentage from ARIA context — it renders the current value automatically without needing a prop.",
    "The root appends ProgressTrack + ProgressIndicator after any children — ProgressLabel and ProgressValue will appear above the track.",
    "aria-valuenow, aria-valuemin, aria-valuemax are set automatically by the base-ui root.",
  ],

  spacing: [
    { rule: "Gap between label row and track", detail: "gap-3 on the root flex container." },
    { rule: "Track height", detail: "h-3 (12px). Not configurable — consistent across all uses." },
    { rule: "Between stacked progress bars", detail: "gap-4 between multiple Progress components in a list." },
  ],

  accessibility: [
    {
      rule: "ARIA attributes are set automatically",
      detail: "base-ui sets role='progressbar', aria-valuenow, aria-valuemin=0, aria-valuemax=100, and aria-label from ProgressLabel.",
    },
    {
      rule: "Add aria-label for unlabelled progress bars",
      detail: "If you omit ProgressLabel, pass aria-label to the Progress root so screen readers announce the purpose.",
    },
  ],

  doItems: [
    {
      label: "Label every progress bar",
      description: "A progress bar without context is meaningless. Always include ProgressLabel or aria-label.",
      preview: <WithLabelPreview />,
    },
    {
      label: "Use indeterminate for unknown duration",
      description: "value={null} honestly communicates 'working' when you can't calculate a percentage.",
      preview: <IndeterminatePreview />,
    },
  ],

  dontItems: [
    {
      label: "Don't use progress for binary states",
      description: "A progress bar at 0% or 100% communicates nothing. Use a Badge or Checkbox for complete/incomplete states.",
      preview: (
        <div className="flex items-center gap-2 text-xs text-muted-foreground p-4 rounded-xl border">
          Use Badge with status="success" for completed items, not Progress at 100%.
        </div>
      ),
    },
  ],

  examplesInContext: [
    {
      title: "File upload progress",
      description: "Progress bar inside a card, alongside file name and byte count.",
      preview: <UploadPreview />,
      code: `<div className="rounded-xl border p-4 flex flex-col gap-3">
  <div className="flex items-center justify-between text-sm">
    <span className="font-medium">design-assets.zip</span>
    <span className="text-muted-foreground text-xs">34 MB / 80 MB</span>
  </div>
  <Progress value={42}>
    <ProgressLabel>Upload progress</ProgressLabel>
    <ProgressValue />
  </Progress>
</div>`,
    },
    {
      title: "Resource usage dashboard",
      description: "Multiple labelled progress bars stacked in a settings panel.",
      preview: <MultiplePreview />,
      code: `<div className="flex flex-col gap-4">
  <Progress value={90}>
    <ProgressLabel>Storage used</ProgressLabel>
    <ProgressValue />
  </Progress>
  <Progress value={40}>
    <ProgressLabel>CPU usage</ProgressLabel>
    <ProgressValue />
  </Progress>
  <Progress value={15}>
    <ProgressLabel>Memory</ProgressLabel>
    <ProgressValue />
  </Progress>
</div>`,
    },
  ],

  relatedComponents: [
    {
      slug: "skeleton",
      name: "Skeleton",
      description: "Animated loading placeholder.",
      when: "Use Skeleton when the content layout is unknown. Use Progress when the percentage completion is known.",
    },
  ],

  designNotes: [
    "ProgressTrack and ProgressIndicator are appended automatically — you never render them yourself.",
    "ProgressValue reads the current percentage from context — no prop needed.",
    "The track is always h-3 and bg-muted. Do not override these tokens.",
    "transition-all on the indicator means value changes animate smoothly — no extra CSS needed.",
  ],
}
