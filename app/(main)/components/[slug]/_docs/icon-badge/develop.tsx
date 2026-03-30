"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IconBadge } from "@/components/ui/icon-badge"
import {
  RiAlertLine,
  RiCheckLine,
  RiErrorWarningLine,
  RiFlashlightLine,
  RiInformationLine,
  RiShieldLine,
} from "@remixicon/react"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Previews ───────────────────────────────────────────────────────────────────

const VariantsPreview = () => (
  <div className="flex flex-wrap items-center gap-4 justify-center">
    <IconBadge variant="neutral" />
    <IconBadge variant="primary" />
    <IconBadge variant="success" />
    <IconBadge variant="warning" />
    <IconBadge variant="info" />
    <IconBadge variant="destructive" />
  </div>
)

const SizesPreview = () => (
  <div className="flex flex-wrap items-end gap-6 justify-center">
    {(["sm", "default", "lg", "xl"] as const).map(size => (
      <div key={size} className="flex flex-col items-center gap-2">
        <IconBadge variant="primary" size={size} />
        <span className="text-xs text-muted-foreground font-mono">{size}</span>
      </div>
    ))}
  </div>
)

const CustomIconPreview = () => (
  <div className="flex flex-wrap items-center gap-4 justify-center">
    <IconBadge variant="primary"><RiFlashlightLine /></IconBadge>
    <IconBadge variant="success"><RiShieldLine /></IconBadge>
    <IconBadge variant="warning"><RiAlertLine /></IconBadge>
    <IconBadge variant="destructive"><RiErrorWarningLine /></IconBadge>
    <IconBadge variant="info"><RiInformationLine /></IconBadge>
    <IconBadge variant="neutral"><RiCheckLine /></IconBadge>
  </div>
)

const DialogUsagePreview = () => (
  <div className="flex flex-wrap gap-3 justify-center">
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>Update card</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <IconBadge variant="warning" />
          <DialogTitle>Update your card</DialogTitle>
          <DialogDescription>Your new card will replace your current payment method.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" className="flex-1">Cancel</Button>
          <Button className="flex-1">Update card</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" size="sm" />}>Delete project</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <IconBadge variant="destructive" />
          <DialogTitle>Delete project</DialogTitle>
          <DialogDescription>This will permanently delete the project. This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" className="flex-1">Cancel</Button>
          <Button variant="destructive" className="flex-1">Delete project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
)

// ── IconBadge develop doc ──────────────────────────────────────────────────────

export const iconBadgeDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/icon-badge",
    importPath: `import { IconBadge } from "@/components/ui/icon-badge"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "IconBadge is a presentational div — no interaction, no role. It has no 'use client' requirement by itself.",
      "When inside DialogHeader, mb-4 spacing is applied automatically via the [[data-slot=dialog-header]_&]:mb-4 selector. No manual margin needed.",
    ],
  },

  basicUsage: `import { IconBadge } from "@/components/ui/icon-badge"

// Default variant + default icon (neutral variant, xl size)
<IconBadge />

// Specific variant — uses variant's default icon
<IconBadge variant="warning" />
<IconBadge variant="destructive" />
<IconBadge variant="success" />

// Custom icon override
import { RiShieldLine } from "@remixicon/react"
<IconBadge variant="success"><RiShieldLine /></IconBadge>

// Inside DialogHeader — mb-4 applied automatically
<DialogHeader>
  <IconBadge variant="warning" />
  <DialogTitle>Update your card</DialogTitle>
  <DialogDescription>Your new card will replace your current payment method.</DialogDescription>
</DialogHeader>`,

  codeExamples: [
    {
      title: "All variants",
      description: "Six semantic variants, each with a paired default icon. Omit children to use the default.",
      preview: <VariantsPreview />,
      code: `<IconBadge variant="neutral" />     {/* RiInformationLine */}
<IconBadge variant="primary" />     {/* RiFlashlightLine */}
<IconBadge variant="success" />     {/* RiCheckLine */}
<IconBadge variant="warning" />     {/* RiAlertLine */}
<IconBadge variant="info" />        {/* RiInformationLine */}
<IconBadge variant="destructive" /> {/* RiErrorWarningLine */}`,
    },
    {
      title: "Sizes",
      description: "Four sizes. The default is xl (size-14) — intentionally large for DialogHeader. Use sm or default for inline non-dialog contexts.",
      preview: <SizesPreview />,
      code: `<IconBadge variant="primary" size="sm" />      {/* size-8, icon-4 */}
<IconBadge variant="primary" size="default" />  {/* size-10, icon-5 */}
<IconBadge variant="primary" size="lg" />       {/* size-12, icon-6 */}
<IconBadge variant="primary" size="xl" />       {/* size-14, icon-7 — default */}`,
    },
    {
      title: "Custom icon",
      description: "Pass any Remixicon icon as children to override the variant's default. The icon scales automatically with the size.",
      preview: <CustomIconPreview />,
      code: `import { RiShieldLine, RiAlertLine } from "@remixicon/react"

<IconBadge variant="success"><RiShieldLine /></IconBadge>
<IconBadge variant="warning"><RiAlertLine /></IconBadge>

// Icon with explicit size overrides the auto-scaling
<IconBadge variant="primary"><RiFlashlightLine className="size-8" /></IconBadge>`,
    },
    {
      title: "Inside Dialog",
      description: "Place inside DialogHeader above DialogTitle. The mb-4 bottom margin is applied automatically via data-slot selector.",
      preview: <DialogUsagePreview />,
      code: `// Warning action dialog
<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Update card</DialogTrigger>
  <DialogContent className="max-w-sm">
    <DialogHeader>
      <IconBadge variant="warning" />
      <DialogTitle>Update your card</DialogTitle>
      <DialogDescription>Your new card will replace your current payment method.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" className="flex-1">Cancel</Button>
      <Button className="flex-1">Update card</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Destructive confirmation dialog
<Dialog>
  <DialogTrigger render={<Button variant="destructive" />}>Delete project</DialogTrigger>
  <DialogContent className="max-w-sm">
    <DialogHeader>
      <IconBadge variant="destructive" />
      <DialogTitle>Delete project</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" className="flex-1">Cancel</Button>
      <Button variant="destructive" className="flex-1">Delete project</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    },
  ],

  apiReference: [
    {
      name: "variant",
      values: `"neutral" | "primary" | "success" | "warning" | "info" | "destructive"`,
      default: `"neutral"`,
      description: "Sets background colour and icon colour. Each variant has a default icon when no children are passed.",
    },
    {
      name: "size",
      values: `"sm" | "default" | "lg" | "xl"`,
      default: `"xl"`,
      description: "sm=size-8, default=size-10, lg=size-12, xl=size-14. Icon scales proportionally unless overridden with a size class.",
    },
    {
      name: "children",
      values: "ReactNode",
      default: "—",
      description: "Icon to display. If omitted, renders the default icon for the variant. Pass a Remixicon element to override.",
    },
    {
      name: "className",
      values: "string",
      default: "—",
      description: "Applied to the container div. Use to override size or add margin when the automatic DialogHeader spacing isn't sufficient.",
    },
  ],

  accessibility: [
    {
      rule: "IconBadge is decorative — no aria-label needed",
      detail: "The icon is purely illustrative. Screen readers rely on DialogTitle and DialogDescription for context. Adding aria-label to the badge would be redundant.",
    },
    {
      rule: "Don't rely on colour alone",
      detail: "The variant colour reinforces intent but the dialog text must communicate the action clearly. Colour-blind users must understand the dialog from the title and description alone.",
    },
    {
      rule: "No interaction — no tab stop",
      detail: "IconBadge renders as a plain div. It is not focusable and should never be made interactive. Use Button with size='icon' for clickable icon containers.",
    },
  ],
}
