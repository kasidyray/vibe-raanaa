"use client"

import { useState } from "react"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RiShieldLine, RiUserLine, RiGlobalLine } from "@remixicon/react"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Previews ──────────────────────────────────────────────────────────────────

const BasicPreview = () => (
  <div className="w-56">
    <Select defaultValue="member">
      <SelectTrigger>
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="member">Member</SelectItem>
        <SelectItem value="viewer">Viewer</SelectItem>
      </SelectContent>
    </Select>
  </div>
)

const WithLabelPreview = () => (
  <div className="flex flex-col gap-1.5 w-56">
    <Label htmlFor="dev-sel-lbl">Role</Label>
    <Select defaultValue="admin">
      <SelectTrigger id="dev-sel-lbl">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="member">Member</SelectItem>
        <SelectItem value="viewer">Viewer</SelectItem>
      </SelectContent>
    </Select>
  </div>
)

const ControlledPreview = () => {
  const [value, setValue] = useState("")
  return (
    <div className="flex flex-col gap-3 w-56">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="dev-sel-ctrl">Plan</Label>
        <Select value={value} onValueChange={(v) => setValue(v ?? "")}>
          <SelectTrigger id="dev-sel-ctrl">
            <SelectValue placeholder="Select a plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {value && (
        <p className="text-xs text-muted-foreground">Selected: <span className="font-mono">{value}</span></p>
      )}
    </div>
  )
}

const GroupedPreview = () => (
  <div className="w-64">
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Africa</SelectLabel>
          <SelectItem value="ng">Nigeria</SelectItem>
          <SelectItem value="gh">Ghana</SelectItem>
          <SelectItem value="ke">Kenya</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="de">Germany</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
)

const WithIconsPreview = () => (
  <div className="w-56">
    <Select defaultValue="admin">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">
          <span className="flex items-center gap-2">
            <RiShieldLine className="size-3.5 opacity-60" />
            Admin
          </span>
        </SelectItem>
        <SelectItem value="member">
          <span className="flex items-center gap-2">
            <RiUserLine className="size-3.5 opacity-60" />
            Member
          </span>
        </SelectItem>
        <SelectItem value="viewer">
          <span className="flex items-center gap-2">
            <RiGlobalLine className="size-3.5 opacity-60" />
            Viewer
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
)

const ErrorPreview = () => (
  <div className="flex flex-col gap-1.5 w-56">
    <Label htmlFor="dev-sel-err">Role</Label>
    <Select>
      <SelectTrigger id="dev-sel-err" aria-invalid aria-describedby="dev-sel-err-msg">
        <SelectValue placeholder="Required" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="member">Member</SelectItem>
      </SelectContent>
    </Select>
    <p id="dev-sel-err-msg" className="text-xs text-destructive">Please select a role.</p>
  </div>
)

// ── Select develop doc ────────────────────────────────────────────────────────

export const selectDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/select",
    importPath: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator } from "@/components/ui/select"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "For form labels, also install: npx shadcn add @raana/label",
      "id for Label association goes on SelectTrigger, not the Select root.",
    ],
  },

  basicUsage: `import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// With label (recommended)
<div className="flex flex-col gap-1.5">
  <Label htmlFor="role">Role</Label>
  <Select defaultValue="member">
    <SelectTrigger id="role">
      <SelectValue placeholder="Select a role" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="member">Member</SelectItem>
      <SelectItem value="viewer">Viewer</SelectItem>
    </SelectContent>
  </Select>
</div>

// Controlled
const [value, setValue] = useState("")
<Select value={value} onValueChange={setValue}>...</Select>

// Small size (for table cells)
<SelectTrigger size="sm">...</SelectTrigger>`,

  codeExamples: [
    {
      title: "Basic select",
      description: "Uncontrolled select with a defaultValue.",
      preview: <BasicPreview />,
      code: `<Select defaultValue="member">
  <SelectTrigger>
    <SelectValue placeholder="Select a role" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="admin">Admin</SelectItem>
    <SelectItem value="member">Member</SelectItem>
    <SelectItem value="viewer">Viewer</SelectItem>
  </SelectContent>
</Select>`,
    },
    {
      title: "With label",
      description: "Pass id to SelectTrigger (not Select root) and use htmlFor on the Label.",
      preview: <WithLabelPreview />,
      code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="role">Role</Label>
  <Select defaultValue="admin">
    <SelectTrigger id="role">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="member">Member</SelectItem>
      <SelectItem value="viewer">Viewer</SelectItem>
    </SelectContent>
  </Select>
</div>`,
    },
    {
      title: "Controlled select",
      description: "Use value and onValueChange to control the selected option from React state.",
      preview: <ControlledPreview />,
      code: `const [value, setValue] = useState("")

<div className="flex flex-col gap-1.5">
  <Label htmlFor="plan">Plan</Label>
  <Select value={value} onValueChange={setValue}>
    <SelectTrigger id="plan">
      <SelectValue placeholder="Select a plan" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="free">Free</SelectItem>
      <SelectItem value="pro">Pro</SelectItem>
      <SelectItem value="enterprise">Enterprise</SelectItem>
    </SelectContent>
  </Select>
</div>`,
    },
    {
      title: "Grouped with separator",
      description: "Use SelectGroup, SelectLabel, and SelectSeparator to organise long option lists.",
      preview: <GroupedPreview />,
      code: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select country" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Africa</SelectLabel>
      <SelectItem value="ng">Nigeria</SelectItem>
      <SelectItem value="gh">Ghana</SelectItem>
      <SelectItem value="ke">Kenya</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="uk">United Kingdom</SelectItem>
      <SelectItem value="de">Germany</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
    },
    {
      title: "With icons in items",
      description: "Wrap icon and text in a flex span inside SelectItem. Icons use opacity-60 for visual hierarchy.",
      preview: <WithIconsPreview />,
      code: `import { RiShieldLine, RiUserLine, RiGlobalLine } from "@remixicon/react"

<Select defaultValue="admin">
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="admin">
      <span className="flex items-center gap-2">
        <RiShieldLine className="size-3.5 opacity-60" />
        Admin
      </span>
    </SelectItem>
    <SelectItem value="member">
      <span className="flex items-center gap-2">
        <RiUserLine className="size-3.5 opacity-60" />
        Member
      </span>
    </SelectItem>
    <SelectItem value="viewer">
      <span className="flex items-center gap-2">
        <RiGlobalLine className="size-3.5 opacity-60" />
        Viewer
      </span>
    </SelectItem>
  </SelectContent>
</Select>`,
    },
    {
      title: "Error state",
      description: "Set aria-invalid on SelectTrigger (not Select). Use aria-describedby to link the error message.",
      preview: <ErrorPreview />,
      code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="role">Role</Label>
  <Select>
    <SelectTrigger
      id="role"
      aria-invalid
      aria-describedby="role-error"
    >
      <SelectValue placeholder="Required" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="member">Member</SelectItem>
    </SelectContent>
  </Select>
  <p id="role-error" className="text-xs text-destructive">
    Please select a role.
  </p>
</div>`,
    },
  ],

  apiReference: [
    {
      name: "value",
      values: "string",
      default: "—",
      description: "Controlled selected value. Pair with onValueChange.",
    },
    {
      name: "defaultValue",
      values: "string",
      default: "—",
      description: "Uncontrolled initial selected value.",
    },
    {
      name: "onValueChange",
      values: "(value: string) => void",
      default: "—",
      description: "Called when the user selects an item. Provides the item's value string.",
    },
    {
      name: "disabled",
      values: "boolean",
      default: "false",
      description: "Prevents the select from opening. Applied to the Select root.",
    },
    {
      name: "size (SelectTrigger)",
      values: `"default" | "sm"`,
      default: `"default"`,
      description: "Default trigger height is h-10. sm is h-8 for table cells and dense layouts.",
    },
    {
      name: "id (SelectTrigger)",
      values: "string",
      default: "—",
      description: "For Label association — pass id to SelectTrigger, not Select.",
    },
    {
      name: "aria-invalid (SelectTrigger)",
      values: "boolean | \"true\" | \"false\"",
      default: "—",
      description: "Applies destructive ring/border. Pass to SelectTrigger, not Select.",
    },
    {
      name: "side (SelectContent)",
      values: `"top" | "right" | "bottom" | "left"`,
      default: `"bottom"`,
      description: "Preferred side for the content popup. May flip based on available viewport space.",
    },
    {
      name: "align (SelectContent)",
      values: `"start" | "center" | "end"`,
      default: `"start"`,
      description: "Horizontal alignment of the content popup relative to the trigger.",
    },
    {
      name: "alignItemWithTrigger (SelectContent)",
      values: "boolean",
      default: "true",
      description: "When true, the selected item in the open list aligns visually with the trigger text.",
    },
  ],

  accessibility: [
    {
      rule: "id goes on SelectTrigger",
      detail: "For Label association via htmlFor/id, pass the id prop to SelectTrigger — not the Select root component.",
    },
    {
      rule: "aria-invalid goes on SelectTrigger",
      detail: "For error styling, set aria-invalid on SelectTrigger (not Select). Pair with aria-describedby pointing to the error message.",
    },
    {
      rule: "Keyboard navigation is built-in",
      detail: "Space/Enter opens the popup, arrow keys navigate items, Enter/Space selects, Escape closes. Do not override.",
    },
    {
      rule: "Meaningful placeholder text",
      detail: "\"Select a role\" is readable by screen readers. Avoid \"-- Select --\" or numeric codes.",
    },
  ],
}
