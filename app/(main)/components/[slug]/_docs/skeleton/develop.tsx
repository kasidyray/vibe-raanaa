"use client"

import { Skeleton } from "@/components/ui/skeleton"
import type { ComponentDevDocData } from "../../component-doc-types"

const AvatarRowPreview = () => (
  <div className="flex items-center gap-3 w-full max-w-sm">
    <Skeleton className="size-10 rounded-full shrink-0" />
    <div className="flex flex-col gap-2 flex-1">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-24" />
    </div>
  </div>
)

const CardSkeletonPreview = () => (
  <div className="w-full max-w-sm rounded-xl border p-4 flex flex-col gap-4">
    <Skeleton className="h-32 w-full" />
    <div className="flex items-center gap-3">
      <Skeleton className="size-9 rounded-full shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  </div>
)

const TableSkeletonPreview = () => (
  <div className="w-full max-w-sm flex flex-col gap-0 rounded-xl border overflow-hidden">
    <div className="flex items-center gap-4 px-4 py-3 border-b bg-muted/30">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-3 w-20 ml-auto" />
    </div>
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 px-4 py-3 border-b last:border-0">
        <Skeleton className="size-8 rounded-full shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-2.5 w-20" />
        </div>
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
    ))}
  </div>
)

const TextBlockPreview = () => (
  <div className="flex flex-col gap-2 w-full max-w-sm">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-4/5" />
    <Skeleton className="h-4 w-3/5" />
  </div>
)

const FormSkeletonPreview = () => (
  <div className="w-full max-w-sm flex flex-col gap-4">
    <div className="flex flex-col gap-1.5">
      <Skeleton className="h-3.5 w-16" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
    <div className="flex flex-col gap-1.5">
      <Skeleton className="h-3.5 w-20" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
    <div className="flex flex-col gap-1.5">
      <Skeleton className="h-3.5 w-24" />
      <Skeleton className="h-20 w-full rounded-lg" />
    </div>
    <Skeleton className="h-10 w-full rounded-lg" />
  </div>
)

export const skeletonDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/skeleton",
    importPath: `import { Skeleton } from "@/components/ui/skeleton"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "Skeleton is a plain div — no props other than className. All sizing, shape, and rounding is set via Tailwind utilities.",
    ],
  },

  basicUsage: `import { Skeleton } from "@/components/ui/skeleton"

// A single block placeholder
<Skeleton className="h-10 w-full" />

// Circle avatar
<Skeleton className="size-10 rounded-full" />

// Conditional: show skeleton while loading, real content when done
{isLoading ? (
  <Skeleton className="h-4 w-32" />
) : (
  <span>{user.name}</span>
)}`,

  codeExamples: [
    {
      title: "Avatar row skeleton",
      description: "Circle avatar with two stacked text lines. The most common pattern for user lists, comment feeds, and team member rows.",
      preview: <AvatarRowPreview />,
      code: `<div className="flex items-center gap-3">
  <Skeleton className="size-10 rounded-full shrink-0" />
  <div className="flex flex-col gap-2 flex-1">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-3 w-24" />
  </div>
</div>`,
    },
    {
      title: "Text block skeleton",
      description: "Three lines of decreasing width to mimic a paragraph. Use w-full, w-4/5, w-3/5 to simulate natural text variation.",
      preview: <TextBlockPreview />,
      code: `<div className="flex flex-col gap-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-4/5" />
  <Skeleton className="h-4 w-3/5" />
</div>`,
    },
    {
      title: "Content card skeleton",
      description: "Image placeholder, avatar row, and text lines inside a card. Mirror the card's real content proportions exactly.",
      preview: <CardSkeletonPreview />,
      code: `<div className="rounded-xl border p-4 flex flex-col gap-4">
  <Skeleton className="h-32 w-full" />
  <div className="flex items-center gap-3">
    <Skeleton className="size-9 rounded-full shrink-0" />
    <div className="flex flex-col gap-2 flex-1">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-3 w-20" />
    </div>
  </div>
  <div className="flex flex-col gap-2">
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-4/5" />
  </div>
</div>`,
    },
    {
      title: "Table row skeleton",
      description: "Repeated rows that mimic data table structure. Use Array.from to generate multiple skeleton rows easily.",
      preview: <TableSkeletonPreview />,
      code: `<div className="flex flex-col rounded-xl border overflow-hidden">
  {/* Header */}
  <div className="flex items-center gap-4 px-4 py-3 border-b bg-muted/30">
    <Skeleton className="h-3 w-24" />
    <Skeleton className="h-3 w-20 ml-auto" />
  </div>
  {/* Rows */}
  {Array.from({ length: 3 }).map((_, i) => (
    <div key={i} className="flex items-center gap-3 px-4 py-3 border-b last:border-0">
      <Skeleton className="size-8 rounded-full shrink-0" />
      <div className="flex flex-col gap-1.5 flex-1">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-2.5 w-20" />
      </div>
      <Skeleton className="h-5 w-12 rounded-full" />
    </div>
  ))}
</div>`,
    },
    {
      title: "Form skeleton",
      description: "Label + input placeholder pairs. Useful while a settings or profile form loads its initial data.",
      preview: <FormSkeletonPreview />,
      code: `<div className="flex flex-col gap-4">
  <div className="flex flex-col gap-1.5">
    <Skeleton className="h-3.5 w-16" />
    <Skeleton className="h-10 w-full rounded-lg" />
  </div>
  <div className="flex flex-col gap-1.5">
    <Skeleton className="h-3.5 w-20" />
    <Skeleton className="h-10 w-full rounded-lg" />
  </div>
  <div className="flex flex-col gap-1.5">
    <Skeleton className="h-3.5 w-24" />
    <Skeleton className="h-20 w-full rounded-lg" />
  </div>
  <Skeleton className="h-10 w-full rounded-lg" />
</div>`,
    },
  ],

  apiReference: [
    {
      name: "className",
      values: "string",
      default: "—",
      description: "Controls all sizing and shape. h-* sets height, w-* sets width, rounded-full for circles, rounded-xl (default) for blocks, rounded-lg for input-shaped placeholders.",
    },
  ],

  accessibility: [
    {
      rule: "Wrap skeleton content in an aria-busy container",
      detail: "Add aria-busy='true' aria-label='Loading…' to the container element. Remove aria-busy when the real content replaces the skeleton.",
    },
    {
      rule: "Skeleton elements need no ARIA roles",
      detail: "Individual Skeleton divs are purely visual. Screen readers are informed at the container level, not per-skeleton element.",
    },
  ],
}
