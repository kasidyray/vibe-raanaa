"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  RiUser2Line,
  RiBankCardLine,
  RiSettings3Line,
  RiLogoutBoxLine,
  RiMore2Line,
  RiEditLine,
  RiDeleteBinLine,
  RiFileCopyLine,
  RiDownloadLine,
  RiShareLine,
} from "@remixicon/react"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Previews ───────────────────────────────────────────────────────────────────

function BasicPreview() {
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>Account</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuItem><RiUser2Line />Profile<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut></DropdownMenuItem>
            <DropdownMenuItem><RiBankCardLine />Billing<DropdownMenuShortcut>⌘B</DropdownMenuShortcut></DropdownMenuItem>
            <DropdownMenuItem><RiSettings3Line />Settings<DropdownMenuShortcut>⌘S</DropdownMenuShortcut></DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive"><RiLogoutBoxLine />Log out<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function CheckboxPreview() {
  const [showGrid, setShowGrid] = useState(true)
  const [showTimestamps, setShowTimestamps] = useState(false)
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>View options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Display</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>Grid view</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showTimestamps} onCheckedChange={setShowTimestamps}>Show timestamps</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function RadioPreview() {
  const [density, setDensity] = useState("comfortable")
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>Row density</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Density</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
            <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="spacious">Spacious</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function SubMenuPreview() {
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="More options" />}>
          <RiMore2Line />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem><RiEditLine />Rename</DropdownMenuItem>
          <DropdownMenuItem><RiFileCopyLine />Duplicate</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger><RiShareLine />Share</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Share via link</DropdownMenuItem>
              <DropdownMenuItem>Share via email</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive"><RiDeleteBinLine />Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function IconTriggerPreview() {
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Row actions" />}>
          <RiMore2Line />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem><RiDownloadLine />Download</DropdownMenuItem>
          <DropdownMenuItem><RiFileCopyLine />Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive"><RiDeleteBinLine />Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// ── DropdownMenu develop doc ───────────────────────────────────────────────────

export const dropdownMenuDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/dropdown-menu",
    importPath: `import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem,
  DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "Built on base-ui Menu — keyboard navigation (arrows, Enter, Escape) and focus management are handled automatically.",
      "DropdownMenuTrigger uses the render prop pattern: render={<Button variant=\"outline\" />} with children as the button label.",
    ],
  },

  basicUsage: `import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { RiUser2Line, RiSettings3Line, RiLogoutBoxLine } from "@remixicon/react"

<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>Account</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My account</DropdownMenuLabel>
      <DropdownMenuItem><RiUser2Line />Profile<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut></DropdownMenuItem>
      <DropdownMenuItem><RiSettings3Line />Settings<DropdownMenuShortcut>⌘S</DropdownMenuShortcut></DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive"><RiLogoutBoxLine />Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,

  codeExamples: [
    {
      title: "Account menu with shortcuts",
      description: "Standard account menu with grouped items, icons, keyboard shortcuts, and a destructive sign-out item.",
      preview: <BasicPreview />,
      code: `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>Account</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My account</DropdownMenuLabel>
      <DropdownMenuItem><RiUser2Line />Profile<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut></DropdownMenuItem>
      <DropdownMenuItem><RiBankCardLine />Billing<DropdownMenuShortcut>⌘B</DropdownMenuShortcut></DropdownMenuItem>
      <DropdownMenuItem><RiSettings3Line />Settings<DropdownMenuShortcut>⌘S</DropdownMenuShortcut></DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive"><RiLogoutBoxLine />Log out<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
    {
      title: "Checkbox items",
      description: "Use DropdownMenuCheckboxItem for persistent boolean toggles. Drive state with useState and pass checked + onCheckedChange.",
      preview: <CheckboxPreview />,
      code: `const [showGrid, setShowGrid] = useState(true)
const [showTimestamps, setShowTimestamps] = useState(false)

<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>View options</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Display</DropdownMenuLabel>
    <DropdownMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
      Grid view
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked={showTimestamps} onCheckedChange={setShowTimestamps}>
      Show timestamps
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
    {
      title: "Radio items",
      description: "Use DropdownMenuRadioGroup + DropdownMenuRadioItem for single-select options. The active item shows a checkmark.",
      preview: <RadioPreview />,
      code: `const [density, setDensity] = useState("comfortable")

<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>Row density</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Density</DropdownMenuLabel>
    <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
      <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="spacious">Spacious</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
    {
      title: "Sub-menu",
      description: "Nest DropdownMenuSub inside the content to create flyout sub-menus. The sub-menu opens on hover or arrow-right.",
      preview: <SubMenuPreview />,
      code: `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="More options" />}>
    <RiMore2Line />
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem><RiEditLine />Rename</DropdownMenuItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger><RiShareLine />Share</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Share via link</DropdownMenuItem>
        <DropdownMenuItem>Share via email</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive"><RiDeleteBinLine />Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
    {
      title: "Icon-only trigger (table rows)",
      description: "The standard pattern for row-level actions: a ghost icon button with aria-label and align=\"end\" on the content.",
      preview: <IconTriggerPreview />,
      code: `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Row actions" />}>
    <RiMore2Line />
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem><RiDownloadLine />Download</DropdownMenuItem>
    <DropdownMenuItem><RiFileCopyLine />Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive"><RiDeleteBinLine />Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
  ],

  apiReference: [
    {
      name: "align (DropdownMenuContent)",
      values: `"start" | "center" | "end"`,
      default: `"start"`,
      description: "Horizontal alignment relative to the trigger. Use \"end\" when the trigger is on the right edge.",
    },
    {
      name: "side (DropdownMenuContent)",
      values: `"top" | "bottom" | "left" | "right"`,
      default: `"bottom"`,
      description: "Which side of the trigger the popup opens on.",
    },
    {
      name: "sideOffset (DropdownMenuContent)",
      values: "number",
      default: "4",
      description: "Gap in pixels between the trigger and popup.",
    },
    {
      name: "variant (DropdownMenuItem)",
      values: `"default" | "destructive"`,
      default: `"default"`,
      description: "Destructive renders the item in red with a red hover background. Always use for irreversible actions.",
    },
    {
      name: "inset (DropdownMenuItem)",
      values: "boolean",
      default: "false",
      description: "Adds pl-9.5 to align text-only items with icon items in the same group.",
    },
    {
      name: "disabled (DropdownMenuItem)",
      values: "boolean",
      default: "false",
      description: "Prevents interaction. Item is visible at 50% opacity.",
    },
    {
      name: "checked (DropdownMenuCheckboxItem)",
      values: "boolean",
      default: "—",
      description: "Controlled checked state. Pair with onCheckedChange.",
    },
    {
      name: "onCheckedChange (DropdownMenuCheckboxItem)",
      values: "(checked: boolean) => void",
      default: "—",
      description: "Called when the user toggles the checkbox item.",
    },
    {
      name: "value / onValueChange (DropdownMenuRadioGroup)",
      values: "string / (value: string) => void",
      default: "—",
      description: "Controlled value for the radio group. The matching RadioItem shows a checkmark.",
    },
  ],

  accessibility: [
    {
      rule: "Icon-only triggers require aria-label",
      detail: "A ghost icon button (RiMore2Line) has no text. Always provide aria-label=\"More options\" or a more specific contextual label.",
    },
    {
      rule: "Keyboard navigation is built-in",
      detail: "Arrow keys navigate items, Enter/Space activates, Escape closes and returns focus to the trigger. Do not override.",
    },
    {
      rule: "Destructive actions should use variant=\"destructive\"",
      detail: "This is the primary visual signal for danger. Screen readers see the same text — if the action is high-risk, consider adding additional confirmation (AlertDialog).",
    },
    {
      rule: "Disabled items remain in the DOM",
      detail: "Disabled items are announced as disabled by screen readers. They remain visible so users can discover unavailable options and understand why.",
    },
  ],
}
