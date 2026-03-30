"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { ComponentDevDocData } from "../../component-doc-types"

const HorizontalPreview = () => (
  <div className="flex flex-col gap-2 text-sm w-full max-w-xs">
    <span>Profile</span>
    <Separator />
    <span>Notifications</span>
    <Separator />
    <span>Security</span>
  </div>
)

const VerticalPreview = () => (
  <div className="flex items-center gap-3 h-5 text-sm">
    <span>Home</span>
    <Separator orientation="vertical" />
    <span>Projects</span>
    <Separator orientation="vertical" />
    <span>Team</span>
  </div>
)

const MenuGroupPreview = () => (
  <div className="w-full max-w-xs rounded-lg border p-1 text-sm flex flex-col gap-0.5">
    <Button variant="ghost" size="sm" className="w-full justify-start">Copy</Button>
    <Button variant="ghost" size="sm" className="w-full justify-start">Paste</Button>
    <Separator className="my-1" />
    <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive">Delete</Button>
  </div>
)

const InlineNavPreview = () => (
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <span className="text-foreground font-medium">Dashboard</span>
    <Separator orientation="vertical" className="h-4" />
    <span>Projects</span>
    <Separator orientation="vertical" className="h-4" />
    <span>Raana Xi</span>
  </div>
)

export const separatorDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/separator",
    importPath: `import { Separator } from "@/components/ui/separator"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "Built on base-ui Separator — sets role='separator' and aria-orientation automatically.",
    ],
  },

  basicUsage: `import { Separator } from "@/components/ui/separator"

// Horizontal (default)
<Separator />

// Vertical — cap height to match text line-height
<div className="flex items-center gap-3 h-5">
  <span>Home</span>
  <Separator orientation="vertical" />
  <span>Projects</span>
</div>`,

  codeExamples: [
    {
      title: "Horizontal separator",
      description: "Divides stacked content sections. Full-width, 1px, bg-border.",
      preview: <HorizontalPreview />,
      code: `<div className="flex flex-col gap-2">
  <span>Profile</span>
  <Separator />
  <span>Notifications</span>
  <Separator />
  <span>Security</span>
</div>`,
    },
    {
      title: "Vertical separator",
      description: "Divides inline items. Use className='h-4' or 'h-5' to match text line-height — vertical separators default to self-stretch.",
      preview: <VerticalPreview />,
      code: `<div className="flex items-center gap-3 h-5">
  <span>Home</span>
  <Separator orientation="vertical" />
  <span>Projects</span>
  <Separator orientation="vertical" />
  <span>Team</span>
</div>`,
    },
    {
      title: "Menu action group divider",
      description: "Separates destructive actions from safe ones in a menu list. Add my-1 margin via className for breathing room.",
      preview: <MenuGroupPreview />,
      code: `<div className="rounded-lg border p-1 flex flex-col gap-0.5">
  <Button variant="ghost" size="sm" className="w-full justify-start">Copy</Button>
  <Button variant="ghost" size="sm" className="w-full justify-start">Paste</Button>
  <Separator className="my-1" />
  <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive">
    Delete
  </Button>
</div>`,
    },
    {
      title: "Inline breadcrumb divider",
      description: "Vertical separators with h-4 between breadcrumb or nav segments.",
      preview: <InlineNavPreview />,
      code: `<div className="flex items-center gap-2 text-sm text-muted-foreground">
  <span className="text-foreground font-medium">Dashboard</span>
  <Separator orientation="vertical" className="h-4" />
  <span>Projects</span>
  <Separator orientation="vertical" className="h-4" />
  <span>Raana Xi</span>
</div>`,
    },
  ],

  apiReference: [
    {
      name: "orientation",
      values: `"horizontal" | "vertical"`,
      default: `"horizontal"`,
      description: "horizontal: h-px w-full. vertical: w-px self-stretch. Add h-* className to cap vertical height.",
    },
    {
      name: "className",
      values: "string",
      default: "—",
      description: "Additional classes. Use my-1 for spacing in menus, h-4 for vertical separators in inline contexts.",
    },
  ],

  accessibility: [
    {
      rule: "role='separator' and aria-orientation are set automatically",
      detail: "No additional ARIA attributes needed. The base-ui primitive handles semantic roles.",
    },
  ],
}
