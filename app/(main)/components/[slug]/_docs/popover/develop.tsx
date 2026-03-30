"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  RiCheckLine,
  RiFilterLine,
  RiEqualizerLine,
  RiUserLine,
} from "@remixicon/react"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Previews ───────────────────────────────────────────────────────────────────

const BasicPreview = () => (
  <div className="flex justify-center">
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Open popover</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Label htmlFor="basic-w" className="w-12 text-right text-xs">Width</Label>
            <Input id="basic-w" defaultValue="100%" className="h-8" />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="basic-h" className="w-12 text-right text-xs">Height</Label>
            <Input id="basic-h" defaultValue="25px" className="h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </div>
)

const NoHeaderPreview = () => (
  <div className="flex justify-center">
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>
        <RiFilterLine />Status filter
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-1">
          {["Active", "Inactive", "Pending", "Archived"].map(status => (
            <Button key={status} variant="ghost" size="sm" className="w-full justify-start">
              {status}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  </div>
)

const UserMenuPreview = () => (
  <div className="flex justify-center">
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>
        <RiUserLine />Account
      </PopoverTrigger>
      <PopoverContent align="end">
        <PopoverHeader>
          <PopoverTitle>Ikedi Eze</PopoverTitle>
          <PopoverDescription>kasidyray@gmail.com · Admin</PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col gap-0.5">
          <Button variant="ghost" size="sm" className="w-full justify-start">Profile settings</Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">Billing</Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">Switch workspace</Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive">Sign out</Button>
        </div>
      </PopoverContent>
    </Popover>
  </div>
)

const PositioningPreview = () => (
  <div className="flex flex-wrap gap-3 justify-center">
    {(["top", "bottom", "left", "right"] as const).map(side => (
      <Popover key={side}>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          {side}
        </PopoverTrigger>
        <PopoverContent side={side}>
          <p className="text-sm">Positioned on <strong>{side}</strong></p>
        </PopoverContent>
      </Popover>
    ))}
    {(["start", "center", "end"] as const).map(align => (
      <Popover key={align}>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          align="{align}"
        </PopoverTrigger>
        <PopoverContent align={align}>
          <p className="text-sm">Aligned <strong>{align}</strong></p>
        </PopoverContent>
      </Popover>
    ))}
  </div>
)

const WiderPopoverPreview = () => (
  <div className="flex justify-center">
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>
        <RiEqualizerLine />Layer settings
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <PopoverHeader>
          <PopoverTitle>Layer settings</PopoverTitle>
          <PopoverDescription>Adjust size, position, and opacity.</PopoverDescription>
        </PopoverHeader>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "wide-w", label: "Width", value: "100%" },
            { id: "wide-h", label: "Height", value: "25px" },
            { id: "wide-x", label: "X", value: "0px" },
            { id: "wide-y", label: "Y", value: "0px" },
          ].map(({ id, label, value }) => (
            <div key={id} className="flex flex-col gap-1">
              <Label htmlFor={id} className="text-xs">{label}</Label>
              <Input id={id} defaultValue={value} className="h-8" />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm"><RiCheckLine />Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  </div>
)

// ── Popover develop doc ────────────────────────────────────────────────────────

export const popoverDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/popover",
    importPath: `import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "Built on base-ui Popover — opens on click, closes on outside click or Escape.",
      "PopoverTrigger uses the render prop pattern: render={<Button />} with children as the button label.",
    ],
  },

  basicUsage: `import {
  Popover, PopoverTrigger, PopoverContent,
  PopoverHeader, PopoverTitle, PopoverDescription,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Open popover
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Settings</PopoverTitle>
      <PopoverDescription>Adjust your preferences.</PopoverDescription>
    </PopoverHeader>
    {/* custom content */}
  </PopoverContent>
</Popover>

// Side and alignment
<PopoverContent side="top" align="end">...</PopoverContent>

// Wider panel
<PopoverContent className="w-96">...</PopoverContent>`,

  codeExamples: [
    {
      title: "Form popover",
      description: "The most common pattern — a button opens a popover with labelled inputs. PopoverHeader gives the panel a title and description.",
      preview: <BasicPreview />,
      code: `<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Open popover
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
    </PopoverHeader>
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Label htmlFor="width" className="w-12 text-right text-xs">Width</Label>
        <Input id="width" defaultValue="100%" className="h-8" />
      </div>
      <div className="flex items-center gap-3">
        <Label htmlFor="height" className="w-12 text-right text-xs">Height</Label>
        <Input id="height" defaultValue="25px" className="h-8" />
      </div>
    </div>
  </PopoverContent>
</Popover>`,
    },
    {
      title: "Action list popover (no header)",
      description: "A list of ghost buttons without a header. Suitable for status filters, view toggles, or quick actions where the trigger label is self-explanatory.",
      preview: <NoHeaderPreview />,
      code: `<Popover>
  <PopoverTrigger render={<Button variant="outline" size="sm" />}>
    <RiFilterLine />Status filter
  </PopoverTrigger>
  <PopoverContent>
    <div className="flex flex-col gap-1">
      {["Active", "Inactive", "Pending", "Archived"].map(status => (
        <Button key={status} variant="ghost" size="sm" className="w-full justify-start">
          {status}
        </Button>
      ))}
    </div>
  </PopoverContent>
</Popover>`,
    },
    {
      title: "User account menu",
      description: "A header with user info followed by ghost action buttons. Use align='end' so the panel doesn't clip the right viewport edge.",
      preview: <UserMenuPreview />,
      code: `<Popover>
  <PopoverTrigger render={<Button variant="outline" size="sm" />}>
    <RiUserLine />Account
  </PopoverTrigger>
  <PopoverContent align="end">
    <PopoverHeader>
      <PopoverTitle>Ikedi Eze</PopoverTitle>
      <PopoverDescription>kasidyray@gmail.com · Admin</PopoverDescription>
    </PopoverHeader>
    <div className="flex flex-col gap-0.5">
      <Button variant="ghost" size="sm" className="w-full justify-start">Profile settings</Button>
      <Button variant="ghost" size="sm" className="w-full justify-start">Billing</Button>
      <Button variant="ghost" size="sm" className="w-full justify-start">Switch workspace</Button>
      <Button
        variant="ghost" size="sm"
        className="w-full justify-start text-destructive hover:text-destructive"
      >
        Sign out
      </Button>
    </div>
  </PopoverContent>
</Popover>`,
    },
    {
      title: "Positioning — side and align",
      description: "Use side to control which edge the panel opens from, and align to control horizontal alignment relative to the trigger.",
      preview: <PositioningPreview />,
      code: `// side: "top" | "bottom" | "left" | "right" (default: "bottom")
// align: "start" | "center" | "end" (default: "center")

<PopoverContent side="top" align="end">...</PopoverContent>

// Common: end-aligned popover for right-edge triggers (account menu, overflow menu)
<PopoverContent align="end">...</PopoverContent>`,
    },
    {
      title: "Wider popover with grid layout",
      description: "Override the default w-72 with className='w-96' for editors with more fields. A grid layout handles multi-column inputs.",
      preview: <WiderPopoverPreview />,
      code: `<Popover>
  <PopoverTrigger render={<Button variant="outline" size="sm" />}>
    Layer settings
  </PopoverTrigger>
  <PopoverContent className="w-96">
    <PopoverHeader>
      <PopoverTitle>Layer settings</PopoverTitle>
      <PopoverDescription>Adjust size, position, and opacity.</PopoverDescription>
    </PopoverHeader>
    <div className="grid grid-cols-2 gap-2">
      {fields.map(({ id, label, value }) => (
        <div key={id} className="flex flex-col gap-1">
          <Label htmlFor={id} className="text-xs">{label}</Label>
          <Input id={id} defaultValue={value} className="h-8" />
        </div>
      ))}
    </div>
    <div className="flex justify-end gap-2 mt-2">
      <Button variant="outline" size="sm">Cancel</Button>
      <Button size="sm">Apply</Button>
    </div>
  </PopoverContent>
</Popover>`,
    },
  ],

  apiReference: [
    {
      name: "render (PopoverTrigger)",
      values: "ReactElement",
      default: "—",
      description: "The element that renders as the trigger. Pass a Button: render={<Button variant='outline' />}. Children become the button's label.",
    },
    {
      name: "side (PopoverContent)",
      values: `"top" | "bottom" | "left" | "right"`,
      default: `"bottom"`,
      description: "Which side of the trigger the panel opens from. The positioner auto-flips to avoid viewport clipping.",
    },
    {
      name: "align (PopoverContent)",
      values: `"start" | "center" | "end"`,
      default: `"center"`,
      description: "Horizontal alignment relative to the trigger. Use 'end' for right-edge triggers.",
    },
    {
      name: "sideOffset (PopoverContent)",
      values: "number",
      default: "4",
      description: "Distance in pixels between the trigger edge and the panel.",
    },
    {
      name: "alignOffset (PopoverContent)",
      values: "number",
      default: "0",
      description: "Pixel offset applied along the align axis.",
    },
    {
      name: "className (PopoverContent)",
      values: "string",
      default: "—",
      description: "Applied to the popup panel. Use to override the default w-72 width.",
    },
  ],

  accessibility: [
    {
      rule: "PopoverTrigger render prop — ensure a visible label",
      detail: "The trigger element (render={<Button />}) must have visible text as children, or aria-label if icon-only.",
    },
    {
      rule: "Focus is not trapped",
      detail: "Unlike Dialog, Tab can leave the popover. Design for non-critical interactions that don't require focus lock.",
    },
    {
      rule: "Escape closes the popover",
      detail: "base-ui handles Escape key dismissal automatically. Ensure the trigger remains in the DOM and is focusable after close.",
    },
    {
      rule: "Form inputs need associated labels",
      detail: "Every Input inside PopoverContent must have a Label with htmlFor/id. The popover title does not serve as a field label.",
    },
  ],
}
