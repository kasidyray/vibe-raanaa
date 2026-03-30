"use client"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  RiAddLine,
  RiDownloadLine,
  RiErrorWarningLine,
  RiFileCopyLine,
  RiSearchLine,
  RiUser2Line,
} from "@remixicon/react"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Previews ───────────────────────────────────────────────────────────────────

const BasicPreview = () => (
  <Empty className="border">
    <EmptyHeader>
      <EmptyMedia variant="stacked"><RiFileCopyLine /></EmptyMedia>
      <EmptyTitle>No documents</EmptyTitle>
      <EmptyDescription>Upload or create your first document to get started.</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button size="sm"><RiAddLine />New document</Button>
    </EmptyContent>
  </Empty>
)

const NoBorderPreview = () => (
  <div className="w-full rounded-xl border overflow-hidden">
    <div className="px-4 py-2 border-b bg-muted/30 text-sm font-medium">Team members</div>
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="stacked"><RiUser2Line /></EmptyMedia>
        <EmptyTitle>No members yet</EmptyTitle>
        <EmptyDescription>Invite your teammates to collaborate in this workspace.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm"><RiAddLine />Invite members</Button>
      </EmptyContent>
    </Empty>
  </div>
)

const NoResultsPreview = () => (
  <Empty className="border">
    <EmptyHeader>
      <EmptyMedia variant="stacked"><RiSearchLine /></EmptyMedia>
      <EmptyTitle>No results found</EmptyTitle>
      <EmptyDescription>Try adjusting your search or filters to find what you're looking for.</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button variant="outline" size="sm">Clear filters</Button>
    </EmptyContent>
  </Empty>
)

const ErrorStatePreview = () => (
  <Empty className="border">
    <EmptyHeader>
      <EmptyMedia variant="stacked"><RiErrorWarningLine /></EmptyMedia>
      <EmptyTitle>Something went wrong</EmptyTitle>
      <EmptyDescription>We couldn't load this content. Check your connection and try again.</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button variant="outline" size="sm">Try again</Button>
    </EmptyContent>
  </Empty>
)

const MultiCtaPreview = () => (
  <Empty className="border">
    <EmptyHeader>
      <EmptyMedia variant="stacked"><RiFileCopyLine /></EmptyMedia>
      <EmptyTitle>No documents</EmptyTitle>
      <EmptyDescription>Upload an existing document or create a new one to get started.</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <div className="flex gap-2">
        <Button size="sm"><RiAddLine />New document</Button>
        <Button variant="outline" size="sm"><RiDownloadLine />Upload</Button>
      </div>
    </EmptyContent>
  </Empty>
)

// ── Empty develop doc ──────────────────────────────────────────────────────────

export const emptyDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/empty",
    importPath: `import {
  Empty, EmptyHeader, EmptyMedia, EmptyTitle,
  EmptyDescription, EmptyContent,
} from "@/components/ui/empty"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "Icons come from @remixicon/react — install it if not already present.",
      "Pass className=\"border\" on standalone Empty. Omit it when inside a card or bordered container.",
    ],
  },

  basicUsage: `import {
  Empty, EmptyHeader, EmptyMedia, EmptyTitle,
  EmptyDescription, EmptyContent,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { RiFileCopyLine, RiAddLine } from "@remixicon/react"

// Standalone (add className="border")
<Empty className="border">
  <EmptyHeader>
    <EmptyMedia variant="stacked"><RiFileCopyLine /></EmptyMedia>
    <EmptyTitle>No documents</EmptyTitle>
    <EmptyDescription>Upload or create your first document to get started.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button size="sm"><RiAddLine />New document</Button>
  </EmptyContent>
</Empty>

// Inside a card section (omit className="border")
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="stacked"><RiFileCopyLine /></EmptyMedia>
    <EmptyTitle>No documents</EmptyTitle>
    <EmptyDescription>Upload or create your first document.</EmptyDescription>
  </EmptyHeader>
</Empty>`,

  codeExamples: [
    {
      title: "Standalone with CTA",
      description: "Full-page empty state with dashed border, stacked media, and a primary action button.",
      preview: <BasicPreview />,
      code: `<Empty className="border">
  <EmptyHeader>
    <EmptyMedia variant="stacked"><RiFileCopyLine /></EmptyMedia>
    <EmptyTitle>No documents</EmptyTitle>
    <EmptyDescription>Upload or create your first document to get started.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button size="sm"><RiAddLine />New document</Button>
  </EmptyContent>
</Empty>`,
    },
    {
      title: "Inside a contained section (no border)",
      description: "When Empty sits inside a card or bordered container, omit className=\"border\" to avoid double-borders.",
      preview: <NoBorderPreview />,
      code: `<div className="rounded-xl border overflow-hidden">
  <div className="px-4 py-2 border-b bg-muted/30 text-sm font-medium">Team members</div>
  {/* No className="border" — the outer container provides the chrome */}
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="stacked"><RiUser2Line /></EmptyMedia>
      <EmptyTitle>No members yet</EmptyTitle>
      <EmptyDescription>Invite your teammates to collaborate in this workspace.</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button size="sm"><RiAddLine />Invite members</Button>
    </EmptyContent>
  </Empty>
</div>`,
    },
    {
      title: "No-results (filtered)",
      description: "Use for search or filter zero-results states. RiSearchLine is the standard icon. A \"Clear filters\" button in EmptyContent lets the user recover.",
      preview: <NoResultsPreview />,
      code: `<Empty className="border">
  <EmptyHeader>
    <EmptyMedia variant="stacked"><RiSearchLine /></EmptyMedia>
    <EmptyTitle>No results found</EmptyTitle>
    <EmptyDescription>Try adjusting your search or filters to find what you're looking for.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button variant="outline" size="sm">Clear filters</Button>
  </EmptyContent>
</Empty>`,
    },
    {
      title: "Error state",
      description: "Use for failed data fetches. RiErrorWarningLine signals the error and a retry Button in EmptyContent lets the user recover.",
      preview: <ErrorStatePreview />,
      code: `<Empty className="border">
  <EmptyHeader>
    <EmptyMedia variant="stacked"><RiErrorWarningLine /></EmptyMedia>
    <EmptyTitle>Something went wrong</EmptyTitle>
    <EmptyDescription>We couldn't load this content. Check your connection and try again.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button variant="outline" size="sm">Try again</Button>
  </EmptyContent>
</Empty>`,
    },
    {
      title: "Multiple CTA actions",
      description: "Place two buttons in a flex row inside EmptyContent when both create and upload are available.",
      preview: <MultiCtaPreview />,
      code: `<Empty className="border">
  <EmptyHeader>
    <EmptyMedia variant="stacked"><RiFileCopyLine /></EmptyMedia>
    <EmptyTitle>No documents</EmptyTitle>
    <EmptyDescription>Upload an existing document or create a new one.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <div className="flex gap-2">
      <Button size="sm"><RiAddLine />New document</Button>
      <Button variant="outline" size="sm"><RiDownloadLine />Upload</Button>
    </div>
  </EmptyContent>
</Empty>`,
    },
  ],

  apiReference: [
    {
      name: "className (Empty)",
      values: "string",
      default: "—",
      description: "Pass className=\"border\" on standalone empty states. Omit when inside a card/table that already has a border.",
    },
    {
      name: "variant (EmptyMedia)",
      values: `"stacked" | "icon" | "default"`,
      default: `"stacked"`,
      description: "stacked: animated three-card display (default for all primary states). icon: small muted square box. default: transparent wrapper.",
    },
    {
      name: "children (EmptyMedia)",
      values: "ReactNode",
      default: "—",
      description: "The icon to display inside the media container. Always pass a single icon from @remixicon/react.",
    },
  ],

  accessibility: [
    {
      rule: "EmptyTitle provides visual heading context",
      detail: "EmptyTitle renders as a div — if the section needs a semantic heading level (e.g. h2), wrap the Empty in a section with an appropriate heading above it.",
    },
    {
      rule: "CTA button labels must be self-describing",
      detail: "\"Invite members\" is clearer than \"Invite\" when announced in isolation by a screen reader. Always include the object.",
    },
    {
      rule: "Error states should use role=\"alert\" on a wrapper",
      detail: "For dynamically shown error empty states (after a failed fetch), wrap the Empty in a div with role=\"alert\" so screen readers announce the failure.",
    },
    {
      rule: "The stacked media animation is decorative",
      detail: "The floating cards are purely visual. The textual empty state (title + description) must convey the full context on its own.",
    },
  ],
}
