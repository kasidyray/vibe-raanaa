"use client"

import * as React from "react"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import type { ComponentDevDocData } from "../../component-doc-types"

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
  <div className="w-full max-w-sm flex flex-col gap-2">
    <p className="text-sm text-muted-foreground">Syncing workspace…</p>
    <Progress value={null} />
  </div>
)

const ControlledPreview = () => {
  const [value, setValue] = React.useState(20)
  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      <Progress value={value}>
        <ProgressLabel>Upload</ProgressLabel>
        <ProgressValue />
      </Progress>
      <div className="flex gap-2">
        <button
          className="text-xs px-3 py-1.5 rounded-md border hover:bg-muted transition-colors"
          onClick={() => setValue(v => Math.max(0, v - 10))}
        >
          − 10%
        </button>
        <button
          className="text-xs px-3 py-1.5 rounded-md border hover:bg-muted transition-colors"
          onClick={() => setValue(v => Math.min(100, v + 10))}
        >
          + 10%
        </button>
      </div>
    </div>
  )
}

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

export const progressDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/progress",
    importPath: `import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "Built on base-ui Progress. ProgressTrack and ProgressIndicator are appended automatically inside the root — do not render them yourself.",
      "ProgressValue reads the current percentage from ARIA context — no value prop needed on ProgressValue.",
    ],
  },

  basicUsage: `import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"

// Bare progress bar
<Progress value={45} />

// With label and percentage
<Progress value={72}>
  <ProgressLabel>Profile completion</ProgressLabel>
  <ProgressValue />
</Progress>

// Indeterminate (unknown duration)
<Progress value={null} />`,

  codeExamples: [
    {
      title: "Basic progress bar",
      description: "Track and indicator only — use when surrounding context makes the purpose clear.",
      preview: <BasicPreview />,
      code: `<Progress value={45} />`,
    },
    {
      title: "With label and value",
      description: "ProgressLabel on the left, ProgressValue auto-reads the percentage from context and renders on the right.",
      preview: <WithLabelPreview />,
      code: `<Progress value={72}>
  <ProgressLabel>Profile completion</ProgressLabel>
  <ProgressValue />
</Progress>`,
    },
    {
      title: "Indeterminate",
      description: "value={null} triggers a continuous sliding animation for tasks with unknown duration.",
      preview: <IndeterminatePreview />,
      code: `<Progress value={null} />`,
    },
    {
      title: "Controlled value",
      description: "Drive the bar with state. The indicator animates smoothly between values via transition-all.",
      preview: <ControlledPreview />,
      code: `const [value, setValue] = React.useState(20)

<Progress value={value}>
  <ProgressLabel>Upload</ProgressLabel>
  <ProgressValue />
</Progress>

// Update value from your upload/processing handler
setValue(Math.round((bytesUploaded / totalBytes) * 100))`,
    },
    {
      title: "Multiple resource meters",
      description: "Stack labelled progress bars in a settings or dashboard panel.",
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

  apiReference: [
    {
      name: "value (Progress)",
      values: "number | null",
      default: "—",
      description: "0–100 fills the indicator. null triggers indeterminate animation.",
    },
    {
      name: "children (Progress)",
      values: "ReactNode",
      default: "—",
      description: "ProgressLabel and ProgressValue — rendered above the track. ProgressTrack and ProgressIndicator are appended automatically.",
    },
    {
      name: "className (Progress)",
      values: "string",
      default: "—",
      description: "Applied to the root flex container (flex flex-wrap gap-3).",
    },
    {
      name: "ProgressLabel",
      values: "ReactNode",
      default: "—",
      description: "Text label above the track. text-sm font-medium. Placed as a child of Progress.",
    },
    {
      name: "ProgressValue",
      values: "—",
      default: "—",
      description: "Reads the current percentage from ARIA context. Renders as ml-auto text-muted-foreground. No props needed.",
    },
  ],

  accessibility: [
    {
      rule: "ARIA attributes are automatic",
      detail: "base-ui sets role='progressbar', aria-valuenow, aria-valuemin=0, aria-valuemax=100. ProgressLabel sets the accessible name.",
    },
    {
      rule: "Add aria-label if no ProgressLabel",
      detail: "If you render a bare <Progress value={x} /> without a ProgressLabel, pass aria-label='Upload progress' to the Progress root.",
    },
  ],
}
