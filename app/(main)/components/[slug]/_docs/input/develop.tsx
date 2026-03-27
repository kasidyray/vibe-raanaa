"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RiSearchLine } from "@remixicon/react"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Previews ──────────────────────────────────────────────────────────────────

const BasicPreview = () => (
  <div className="w-64">
    <Input placeholder="Enter a value" />
  </div>
)

const WithLabelPreview = () => (
  <div className="flex flex-col gap-1.5 w-64">
    <Label htmlFor="dev-email">Email address</Label>
    <Input id="dev-email" type="email" placeholder="adaeze@company.com" />
  </div>
)

const ErrorStatePreview = () => (
  <div className="flex flex-col gap-1.5 w-64">
    <Label htmlFor="dev-error">Email address</Label>
    <Input id="dev-error" type="email" aria-invalid defaultValue="not-an-email" aria-describedby="dev-error-msg" />
    <p id="dev-error-msg" className="text-xs text-destructive">Enter a valid email address.</p>
  </div>
)

const FileInputPreview = () => (
  <div className="flex flex-col gap-1.5 w-64">
    <Label htmlFor="dev-file">Profile photo</Label>
    <Input id="dev-file" type="file" />
  </div>
)

const SearchWithButtonPreview = () => (
  <div className="flex flex-col gap-1.5 w-72">
    <Label htmlFor="dev-search">Search customers</Label>
    <div className="flex gap-2">
      <Input id="dev-search" placeholder="Emeka Nwachukwu..." className="flex-1" />
      <Button variant="outline" aria-label="Search">
        <RiSearchLine />
      </Button>
    </div>
  </div>
)

// ── Input develop doc ─────────────────────────────────────────────────────────

export const inputDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/input",
    importPath: `import { Input } from "@/components/ui/input"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "For form labels, also install the Label component: npx shadcn add @raana/label",
    ],
  },

  basicUsage: `import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Basic
<Input placeholder="Enter a value" />

// With label (recommended)
<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>

// Error state
<Input aria-invalid defaultValue="invalid" />

// Disabled
<Input disabled placeholder="Not editable" />`,

  codeExamples: [
    {
      title: "Basic input",
      description: "The default input with a placeholder.",
      preview: <BasicPreview />,
      code: `<Input placeholder="Enter a value" />`,
    },
    {
      title: "With label",
      description: "Always pair Input with a Label. Use htmlFor and id to associate them.",
      preview: <WithLabelPreview />,
      code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">Email address</Label>
  <Input id="email" type="email" placeholder="adaeze@company.com" />
</div>`,
    },
    {
      title: "Error state",
      description: "Set aria-invalid to apply destructive styling. Use aria-describedby to link the error message.",
      preview: <ErrorStatePreview />,
      code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">Email address</Label>
  <Input
    id="email"
    type="email"
    aria-invalid
    defaultValue="not-an-email"
    aria-describedby="email-error"
  />
  <p id="email-error" className="text-xs text-destructive">
    Enter a valid email address.
  </p>
</div>`,
    },
    {
      title: "File input",
      description: "The file type renders a styled native file picker. No additional wrapper needed.",
      preview: <FileInputPreview />,
      code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="photo">Profile photo</Label>
  <Input id="photo" type="file" />
</div>`,
    },
    {
      title: "Search with button",
      description: "Compose Input with Button in a flex row for a search bar pattern.",
      preview: <SearchWithButtonPreview />,
      code: `import { RiSearchLine } from "@remixicon/react"

<div className="flex flex-col gap-1.5">
  <Label htmlFor="search">Search customers</Label>
  <div className="flex gap-2">
    <Input id="search" placeholder="Emeka Nwachukwu..." className="flex-1" />
    <Button variant="outline" aria-label="Search">
      <RiSearchLine />
    </Button>
  </div>
</div>`,
    },
  ],

  apiReference: [
    {
      name: "type",
      values: `"text" | "email" | "password" | "number" | "search" | "url" | "file" | "tel" | "date"`,
      default: `"text"`,
      description: "HTML input type. Controls keyboard layout, validation behaviour, and browser UI.",
    },
    {
      name: "placeholder",
      values: "string",
      default: "—",
      description: "Hint text shown when the field is empty. Use as a supplementary hint alongside a Label.",
    },
    {
      name: "disabled",
      values: "boolean",
      default: "false",
      description: "Makes the field non-interactive. Applies opacity and cursor-not-allowed styling.",
    },
    {
      name: "readOnly",
      values: "boolean",
      default: "false",
      description: "Prevents editing but allows focus and text selection. Use for display-only computed values.",
    },
    {
      name: "aria-invalid",
      values: "boolean | \"true\" | \"false\"",
      default: "—",
      description: "Applies destructive border and ring. Set on validation failure. Pair with aria-describedby and error text.",
    },
    {
      name: "value / defaultValue",
      values: "string",
      default: "—",
      description: "Controlled (value + onChange) or uncontrolled (defaultValue) value binding.",
    },
    {
      name: "onChange",
      values: "React.ChangeEventHandler<HTMLInputElement>",
      default: "—",
      description: "Change handler for controlled inputs.",
    },
    {
      name: "className",
      values: "string",
      default: "—",
      description: "Additional CSS classes. Do not override height or border-radius.",
    },
  ],

  accessibility: [
    {
      rule: "Always use Label with htmlFor",
      detail: "Every Input must be associated with a visible Label via htmlFor/id. Placeholder alone is not accessible.",
    },
    {
      rule: "aria-invalid for errors",
      detail: "Set aria-invalid=\"true\" when a field fails validation. Screen readers announce the field as invalid.",
    },
    {
      rule: "aria-describedby for error messages",
      detail: "Give the error <p> an id and set aria-describedby on the Input so screen readers read the message after the field.",
    },
    {
      rule: "Keyboard order matches visual order",
      detail: "Ensure the DOM order of fields follows the visual form layout so Tab navigation is predictable.",
    },
    {
      rule: "Icon-only search button",
      detail: "When pairing Input with an icon-only Button, always include aria-label on the Button.",
    },
  ],
}
