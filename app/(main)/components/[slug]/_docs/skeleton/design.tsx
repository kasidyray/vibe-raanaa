"use client"

import { Skeleton } from "@/components/ui/skeleton"
import type { ComponentDocData } from "../../component-doc-types"

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2 w-full max-w-xs">
    <Skeleton className="h-10 w-full" />
    <div className="flex items-start flex-wrap gap-8 text-center justify-center">
      {["① animate-pulse", "② bg-muted", "③ rounded-xl", "④ h-* w-* sizing"].map(label => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="h-5 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

const AvatarRowPreview = () => (
  <div className="flex items-center gap-3 w-full max-w-sm">
    <Skeleton className="size-10 rounded-full shrink-0" />
    <div className="flex flex-col gap-2 flex-1">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-24" />
    </div>
  </div>
)

const TextBlockPreview = () => (
  <div className="flex flex-col gap-2 w-full max-w-sm">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-4/5" />
    <Skeleton className="h-4 w-3/5" />
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

export const skeletonDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  overview: {
    what: "An animated pulsing placeholder shape that mimics the layout of loading content to reduce perceived wait time.",
    why: "Blank white screens during data fetching feel broken. Skeleton loaders maintain layout structure and signal to users that content is on its way, reducing bounce and anxiety.",
    problem: "Without a consistent skeleton system, teams show spinners that give no layout context, or leave blank spaces that look like broken pages.",
    appearsIn: ["Data table loading states", "Profile cards", "Dashboard panels", "Feed items", "Settings pages while data fetches"],
  },

  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      { name: "Skeleton", description: "A plain div with animate-pulse, bg-muted, and rounded-xl. Size and shape are entirely set via className — h-*, w-*, rounded-*." },
    ],
  },

  whenToUse: [
    "While async data is loading and the layout is known in advance.",
    "For repeated list or table rows where row count can be approximated.",
    "In dashboard panels and cards where the content shape is predictable.",
    "As a replacement for spinners when layout context matters more than activity indication.",
  ],

  whenNotToUse: [
    "When the content shape is unknown — use a simple spinner instead.",
    "For actions in progress (submitting a form, uploading) — use a loading Button state.",
    "For content that loads instantly (< 300ms) — skeleton flash is more disruptive than helpful.",
  ],

  variants: [
    {
      name: "Avatar row",
      description: "Circle for avatar + two stacked lines for name and secondary text.",
      when: "User lists, team members, comment feeds",
      preview: <AvatarRowPreview />,
      fullWidth: true,
    },
    {
      name: "Text block",
      description: "Three lines of decreasing width to mimic a paragraph of text.",
      when: "Descriptions, bios, article previews",
      preview: <TextBlockPreview />,
      fullWidth: true,
    },
    {
      name: "Card skeleton",
      description: "Image placeholder + avatar row + text lines inside a card container.",
      when: "Content cards, blog posts, media cards",
      preview: <CardSkeletonPreview />,
    },
    {
      name: "Table rows",
      description: "Repeated skeleton rows mimicking the structure of a data table.",
      when: "Data table loading states",
      preview: <TableSkeletonPreview />,
    },
  ],

  states: [],

  properties: [
    {
      name: "className",
      values: "string",
      default: "—",
      description: "Sets all sizing and shape. Use h-*, w-*, rounded-full for circles, rounded-xl for blocks (default), rounded-md for smaller shapes.",
    },
  ],

  contentGuidance: [
    {
      rule: "Match the real layout as closely as possible",
      detail: "Use the same h-* and w-* proportions as the real content. A skeleton that looks nothing like the loaded state causes a jarring layout shift.",
    },
    {
      rule: "Use rounded-full for avatar circles",
      detail: "The default is rounded-xl. Override to rounded-full for circular avatars.",
    },
    {
      rule: "Vary line widths for text skeletons",
      detail: "Real paragraphs have lines of varying length. Use w-full, w-4/5, w-3/5 to mimic this naturally.",
    },
  ],

  behavior: [
    "animate-pulse runs a 2s ease-in-out opacity cycle between full and 50% opacity.",
    "bg-muted uses the muted token — adapts to light and dark mode automatically.",
    "Skeleton is purely presentational — no ARIA role or label needed (loading regions are announced at the container level).",
  ],

  spacing: [
    { rule: "Gap between skeleton lines", detail: "gap-2 between text line skeletons; gap-3 or gap-4 between avatar and text block." },
    { rule: "Avatar skeleton size", detail: "Match the real avatar size: size-8 (32px), size-9 (36px), size-10 (40px), etc." },
    { rule: "Card image placeholder height", detail: "Typically h-32 to h-48 — match the aspect ratio of the real image." },
  ],

  accessibility: [
    {
      rule: "Announce the loading region with aria-busy",
      detail: "Wrap skeleton content in a container with aria-busy='true' aria-label='Loading…'. Remove when content is ready.",
    },
    {
      rule: "Skeleton divs have no role",
      detail: "Skeleton is purely visual. Screen readers should be informed of the loading state at the container level, not per-skeleton.",
    },
  ],

  doItems: [
    {
      label: "Mirror the real content layout",
      description: "Match the h-*, w-*, and rounded-* values of the real elements. Layout shift on load is jarring.",
      preview: <CardSkeletonPreview />,
    },
    {
      label: "Repeat skeleton rows for lists",
      description: "Show 3–5 skeleton rows to communicate that a list is loading, even if the actual count is unknown.",
      preview: <TableSkeletonPreview />,
    },
  ],

  dontItems: [
    {
      label: "Don't use skeleton for instant or action loading",
      description: "Skeleton flash under 300ms is worse than nothing. Use it only for data fetching that takes noticeable time.",
      preview: (
        <div className="flex items-center gap-2 text-xs text-muted-foreground p-4 rounded-xl border">
          Use Button loading state for form submit actions, not Skeleton.
        </div>
      ),
    },
  ],

  examplesInContext: [
    {
      title: "Table row loading state",
      description: "Three skeleton rows mimicking avatar + name + badge table structure.",
      preview: <TableSkeletonPreview />,
      code: `{isLoading ? (
  <div className="flex flex-col">
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
) : (
  <DataTable ... />
)}`,
    },
    {
      title: "Card skeleton",
      description: "Image placeholder, avatar row, and two text lines mimicking a content card.",
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
  ],

  relatedComponents: [
    {
      slug: "avatar",
      name: "Avatar",
      description: "User image with fallback.",
      when: "Use Skeleton with rounded-full to mirror an Avatar placeholder while its data loads.",
    },
  ],

  designNotes: [
    "Skeleton uses rounded-xl by default — override to rounded-full for circles, rounded-md for smaller chips.",
    "bg-muted is intentionally muted: it should be less visually prominent than the real content.",
    "animate-pulse is a 2s cycle — subtle enough to signal loading without being distracting.",
  ],
}
