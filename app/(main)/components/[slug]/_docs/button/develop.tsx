"use client"

import { Button } from "@/components/ui/button"
import {
  RiAddLine,
  RiDownloadLine,
  RiDeleteBinLine,
  RiEditLine,
  RiCloseLine,
  RiMailLine,
  RiArrowDownSLine,
} from "@remixicon/react"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Button develop doc ────────────────────────────────────────────────────────

export const buttonDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/button",
    importPath: `import { Button } from "@/components/ui/button"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "Icons use @remixicon/react — install if not already present: npm install @remixicon/react",
    ],
  },

  basicUsage: `import { Button } from "@/components/ui/button"
import { RiAddLine } from "@remixicon/react"

// Primary action
<Button>Save changes</Button>

// With icon
<Button><RiAddLine />Add record</Button>

// Secondary action
<Button variant="outline" size="sm">Cancel</Button>

// Loading state
<Button loading={isPending}>Saving…</Button>

// Icon-only
<Button size="icon-sm" variant="ghost" aria-label="Close"><RiCloseLine /></Button>`,

  codeExamples: [
    {
      title: "All variants",
      description: "Six semantic variants covering every action weight from primary to destructive.",
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      ),
      code: `<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`,
    },
    {
      title: "Sizes",
      description: "Four text sizes and four icon sizes. Icon sizes produce square buttons.",
      preview: (
        <div className="flex flex-col gap-4 items-center">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon-xs" variant="outline" aria-label="Edit"><RiEditLine /></Button>
            <Button size="icon-sm" variant="outline" aria-label="Edit"><RiEditLine /></Button>
            <Button size="icon" variant="outline" aria-label="Edit"><RiEditLine /></Button>
            <Button size="icon-lg" variant="outline" aria-label="Edit"><RiEditLine /></Button>
          </div>
        </div>
      ),
      code: `{/* Text sizes */}
<Button size="xs">Extra small</Button>
<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>

{/* Icon sizes */}
<Button size="icon-xs" variant="outline" aria-label="Edit"><RiEditLine /></Button>
<Button size="icon-sm" variant="outline" aria-label="Edit"><RiEditLine /></Button>
<Button size="icon" variant="outline" aria-label="Edit"><RiEditLine /></Button>
<Button size="icon-lg" variant="outline" aria-label="Edit"><RiEditLine /></Button>`,
    },
    {
      title: "With icons",
      description: "Pass icons as children alongside the label. Button handles sizing automatically.",
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Button size="sm"><RiAddLine />Add record</Button>
          <Button variant="outline" size="sm"><RiDownloadLine />Export</Button>
          <Button variant="destructive" size="sm"><RiDeleteBinLine />Delete</Button>
          <Button variant="secondary" size="sm"><RiArrowDownSLine />Sort</Button>
        </div>
      ),
      code: `import { RiAddLine, RiDownloadLine, RiDeleteBinLine } from "@remixicon/react"

<Button size="sm"><RiAddLine />Add record</Button>
<Button variant="outline" size="sm"><RiDownloadLine />Export</Button>
<Button variant="destructive" size="sm"><RiDeleteBinLine />Delete</Button>`,
    },
    {
      title: "Loading state",
      description: "Pass loading={true} to show a spinner and automatically disable the button.",
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Button loading>Saving…</Button>
          <Button variant="outline" loading size="sm">Uploading…</Button>
        </div>
      ),
      code: `<Button loading={isPending}>Saving…</Button>
<Button variant="outline" loading={isUploading} size="sm">Uploading…</Button>`,
    },
    {
      title: "Disabled state",
      description: "Use disabled when prerequisites aren't met. The button is visually muted and non-interactive.",
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Button disabled>Save changes</Button>
          <Button variant="outline" disabled size="sm">Export</Button>
        </div>
      ),
      code: `<Button disabled>Save changes</Button>
<Button variant="outline" disabled size="sm">Export</Button>`,
    },
    {
      title: "In a toolbar",
      description: "Primary + secondary pair aligned to the right of a toolbar row.",
      preview: (
        <div className="rounded-xl border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm font-medium">Contacts</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm"><RiDownloadLine />Export</Button>
              <Button size="sm"><RiAddLine />Add contact</Button>
            </div>
          </div>
        </div>
      ),
      code: `<div className="flex items-center gap-2">
  <Button variant="outline" size="sm">
    <RiDownloadLine />
    Export
  </Button>
  <Button size="sm">
    <RiAddLine />
    Add contact
  </Button>
</div>`,
    },
    {
      title: "Icon-only buttons",
      description: "Use icon sizes with aria-label for compact controls in headers and table rows.",
      preview: (
        <div className="flex items-center gap-1 justify-center">
          <Button size="icon-sm" variant="ghost" aria-label="Send email"><RiMailLine /></Button>
          <Button size="icon-sm" variant="ghost" aria-label="Edit"><RiEditLine /></Button>
          <Button size="icon-sm" variant="ghost" aria-label="Close"><RiCloseLine /></Button>
        </div>
      ),
      code: `<Button size="icon-sm" variant="ghost" aria-label="Send email">
  <RiMailLine />
</Button>
<Button size="icon-sm" variant="ghost" aria-label="Edit">
  <RiEditLine />
</Button>
<Button size="icon-sm" variant="ghost" aria-label="Close">
  <RiCloseLine />
</Button>`,
    },
  ],

  apiReference: [
    {
      name: "variant",
      values: `"default" | "outline" | "secondary" | "ghost" | "destructive" | "link"`,
      default: `"default"`,
      description: "Visual weight and semantic tone.",
    },
    {
      name: "size",
      values: `"xs" | "sm" | "default" | "lg" | "icon-xs" | "icon-sm" | "icon" | "icon-lg"`,
      default: `"default"`,
      description: "Height and padding scale. Icon sizes produce square buttons.",
    },
    {
      name: "loading",
      values: "boolean",
      default: "false",
      description: "Shows a spinner and disables the button. Use during async operations.",
    },
    {
      name: "disabled",
      values: "boolean",
      default: "false",
      description: "Prevents interaction. Button renders at 50% opacity.",
    },
    {
      name: "className",
      values: "string",
      default: "—",
      description: "Extra CSS classes. Avoid overriding variant colours or border-radius.",
    },
    {
      name: "children",
      values: "React.ReactNode",
      default: "—",
      description: "Label text and optional icon elements. Icons are auto-sized to 16 px.",
    },
    {
      name: "aria-label",
      values: "string",
      default: "—",
      description: "Required on icon-only buttons. Describes the action for screen readers.",
    },
  ],

  accessibility: [
    {
      rule: "Icon-only buttons must have aria-label",
      detail: "Any button with no visible text must include aria-label=\"<action>\". The icon alone is not accessible.",
    },
    {
      rule: "Loading disables automatically",
      detail: "When loading={true}, the button is disabled via the disabled prop — no need to set both. Pair with an aria-live region for screen reader feedback on long operations.",
    },
    {
      rule: "Focus ring is keyboard-only",
      detail: "focus-visible ensures the ring appears for keyboard users only. Never suppress it with outline-none without the focus-visible guard.",
    },
    {
      rule: "Destructive actions need a confirmation step",
      detail: "Never wire a destructive button directly to the delete action. Always confirm in a dialog or drawer first.",
    },
    {
      rule: "Don't remove pointer-events on disabled",
      detail: "The disabled attribute already removes interaction. Adding pointer-events-none manually is redundant and can mask intent.",
    },
  ],
}
