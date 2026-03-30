"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { RiAddLine, RiFilterLine, RiSettings3Line } from "@remixicon/react"
import type { ComponentDevDocData } from "../../component-doc-types"

const BasicPreview = () => (
  <div className="flex justify-center">
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open sheet</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Panel title</SheetTitle>
          <SheetDescription>Supporting description text.</SheetDescription>
        </SheetHeader>
        <div className="px-6 flex-1">
          <p className="text-sm text-muted-foreground">Sheet body content.</p>
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" size="sm" />}>Cancel</SheetClose>
          <Button size="sm">Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
)

const FormPreview = () => (
  <div className="flex justify-center">
    <Sheet>
      <SheetTrigger render={<Button size="sm" />}>
        <RiAddLine />New contact
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New contact</SheetTitle>
          <SheetDescription>Add a new contact to your workspace.</SheetDescription>
        </SheetHeader>
        <div className="px-6 flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dev-name" className="text-xs">Full name</Label>
            <Input id="dev-name" placeholder="Jane Smith" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dev-email" className="text-xs">Email</Label>
            <Input id="dev-email" placeholder="jane@example.com" type="email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dev-company" className="text-xs">Company</Label>
            <Input id="dev-company" placeholder="Acme Inc." />
          </div>
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" size="sm" />}>Cancel</SheetClose>
          <Button size="sm">Add contact</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
)

const FilterPreview = () => (
  <div className="flex justify-center">
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="sm" />}>
        <RiFilterLine />Filters
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter results</SheetTitle>
          <SheetDescription>Narrow down the displayed records.</SheetDescription>
        </SheetHeader>
        <div className="px-6 flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs">Status</Label>
            <div className="flex flex-wrap gap-2">
              {["Active", "Inactive", "Pending"].map(s => (
                <Button key={s} variant="outline" size="sm">{s}</Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs">Search</Label>
            <Input placeholder="Filter by name…" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" size="sm" />}>Reset</SheetClose>
          <Button size="sm">Apply</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
)

const SidePreview = () => (
  <div className="flex flex-wrap gap-3 justify-center">
    {(["right", "left", "top", "bottom"] as const).map(side => (
      <Sheet key={side}>
        <SheetTrigger render={<Button variant="outline" size="sm" />}>
          {side}
        </SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle>Side: {side}</SheetTitle>
            <SheetDescription>Sheet opens from the {side}.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    ))}
  </div>
)

const NoCloseButtonPreview = () => (
  <div className="flex justify-center">
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="sm" />}>
        <RiSettings3Line />Settings
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Preferences</SheetTitle>
          <SheetDescription>Manage your account settings.</SheetDescription>
        </SheetHeader>
        <div className="px-6 flex-1">
          <p className="text-sm text-muted-foreground">
            Close button hidden — use footer Cancel to dismiss.
          </p>
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" size="sm" />}>Cancel</SheetClose>
          <Button size="sm">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
)

export const sheetDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/sheet",
    importPath: `import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "Built on base-ui Dialog. SheetTrigger and SheetClose use the render prop pattern: render={<Button />} with children as the label.",
      "SheetFooter uses mt-auto — it sticks to the bottom of the panel regardless of body content height.",
    ],
  },

  basicUsage: `import {
  Sheet, SheetTrigger, SheetClose, SheetContent,
  SheetHeader, SheetTitle, SheetDescription, SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>
    Open sheet
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Panel title</SheetTitle>
      <SheetDescription>Supporting description.</SheetDescription>
    </SheetHeader>
    <div className="px-6 flex-1">
      {/* body content */}
    </div>
    <SheetFooter>
      <SheetClose render={<Button variant="outline" size="sm" />}>Cancel</SheetClose>
      <Button size="sm">Save</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`,

  codeExamples: [
    {
      title: "Basic sheet",
      description: "Minimal structure: trigger, header, body, footer. The close button is shown by default (showCloseButton=true).",
      preview: <BasicPreview />,
      code: `<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>Open sheet</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Panel title</SheetTitle>
      <SheetDescription>Supporting description text.</SheetDescription>
    </SheetHeader>
    <div className="px-6 flex-1">
      {/* body content */}
    </div>
    <SheetFooter>
      <SheetClose render={<Button variant="outline" size="sm" />}>Cancel</SheetClose>
      <Button size="sm">Save</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
    },
    {
      title: "Create record form",
      description: "Labelled inputs in the body, save/cancel in the sticky footer. Use px-6 on the body to match header/footer padding.",
      preview: <FormPreview />,
      code: `<Sheet>
  <SheetTrigger render={<Button size="sm" />}>
    <RiAddLine />New contact
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>New contact</SheetTitle>
      <SheetDescription>Add a new contact to your workspace.</SheetDescription>
    </SheetHeader>
    <div className="px-6 flex-1 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name" className="text-xs">Full name</Label>
        <Input id="name" placeholder="Jane Smith" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email" className="text-xs">Email</Label>
        <Input id="email" placeholder="jane@example.com" type="email" />
      </div>
    </div>
    <SheetFooter>
      <SheetClose render={<Button variant="outline" size="sm" />}>Cancel</SheetClose>
      <Button size="sm">Add contact</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
    },
    {
      title: "Filter sidebar",
      description: "Filter controls with reset and apply. Works well as a right-side panel that updates a table in the background.",
      preview: <FilterPreview />,
      code: `<Sheet>
  <SheetTrigger render={<Button variant="outline" size="sm" />}>
    <RiFilterLine />Filters
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Filter results</SheetTitle>
      <SheetDescription>Narrow down the displayed records.</SheetDescription>
    </SheetHeader>
    <div className="px-6 flex-1 flex flex-col gap-4">
      {/* filter controls */}
    </div>
    <SheetFooter>
      <SheetClose render={<Button variant="outline" size="sm" />}>Reset</SheetClose>
      <Button size="sm">Apply</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
    },
    {
      title: "Side variants",
      description: "Use side to control which edge the sheet opens from. right (default) and left are full-height; top and bottom are full-width.",
      preview: <SidePreview />,
      code: `// right (default) — full-height, slides from right
<SheetContent side="right">...</SheetContent>

// left — full-height, slides from left
<SheetContent side="left">...</SheetContent>

// bottom — full-width, auto-height, slides from bottom
<SheetContent side="bottom">...</SheetContent>

// top — full-width, auto-height, slides from top
<SheetContent side="top">...</SheetContent>`,
    },
    {
      title: "Hide close button",
      description: "Set showCloseButton={false} to remove the default close icon. Use only when SheetFooter provides a Cancel button.",
      preview: <NoCloseButtonPreview />,
      code: `<SheetContent showCloseButton={false}>
  <SheetHeader>
    <SheetTitle>Preferences</SheetTitle>
    <SheetDescription>Manage your settings.</SheetDescription>
  </SheetHeader>
  <div className="px-6 flex-1">...</div>
  <SheetFooter>
    <SheetClose render={<Button variant="outline" size="sm" />}>Cancel</SheetClose>
    <Button size="sm">Save changes</Button>
  </SheetFooter>
</SheetContent>`,
    },
  ],

  apiReference: [
    {
      name: "side (SheetContent)",
      values: `"top" | "right" | "bottom" | "left"`,
      default: `"right"`,
      description: "Which edge the panel slides from. right/left are full-height (w-3/4 sm:max-w-sm). top/bottom are full-width (h-auto).",
    },
    {
      name: "showCloseButton (SheetContent)",
      values: "boolean",
      default: "true",
      description: "Shows an absolute-positioned close button at top-right. Set false when the footer already provides a Cancel.",
    },
    {
      name: "render (SheetTrigger / SheetClose)",
      values: "ReactElement",
      default: "—",
      description: "Render prop. Pass a Button element. Children of SheetTrigger / SheetClose become the button label.",
    },
  ],

  accessibility: [
    {
      rule: "SheetTitle is required for accessible label",
      detail: "It sets aria-labelledby on the dialog. Always include SheetTitle inside SheetHeader.",
    },
    {
      rule: "Focus is trapped",
      detail: "base-ui Dialog traps focus while the sheet is open. Users cannot Tab out to the page behind.",
    },
    {
      rule: "Escape closes the sheet",
      detail: "base-ui handles Escape key dismissal automatically.",
    },
  ],
}
