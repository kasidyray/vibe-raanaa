"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Previews ──────────────────────────────────────────────────────────────────

const BasicPreview = () => (
  <div className="flex items-center gap-2">
    <Checkbox id="dev-cb-basic" defaultChecked />
    <Label htmlFor="dev-cb-basic" className="text-sm">Accept terms and conditions</Label>
  </div>
)

const ControlledPreview = () => {
  const [checked, setChecked] = useState(false)
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox
          id="dev-cb-ctrl"
          checked={checked}
          onCheckedChange={(v) => setChecked(v === true)}
        />
        <Label htmlFor="dev-cb-ctrl" className="text-sm">
          {checked ? "Subscribed to updates" : "Subscribe to updates"}
        </Label>
      </div>
      <p className="text-xs text-muted-foreground pl-6">
        State: <span className="font-mono">{String(checked)}</span>
      </p>
    </div>
  )
}

const GroupPreview = () => {
  const [selected, setSelected] = useState({ email: true, sms: false, push: true })
  const toggle = (k: keyof typeof selected) => setSelected(p => ({ ...p, [k]: !p[k] }))
  const items: { key: keyof typeof selected; label: string }[] = [
    { key: "email", label: "Email notifications" },
    { key: "sms",   label: "SMS notifications" },
    { key: "push",  label: "Push notifications" },
  ]
  return (
    <div className="flex flex-col gap-2.5">
      {items.map(item => (
        <div key={item.key} className="flex items-center gap-2">
          <Checkbox
            id={`dev-grp-${item.key}`}
            checked={selected[item.key]}
            onCheckedChange={() => toggle(item.key)}
          />
          <Label htmlFor={`dev-grp-${item.key}`} className="text-sm">{item.label}</Label>
        </div>
      ))}
    </div>
  )
}

const ErrorPreview = () => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center gap-2">
      <Checkbox id="dev-cb-err" aria-invalid aria-describedby="dev-cb-err-msg" />
      <Label htmlFor="dev-cb-err" className="text-sm">I agree to the Terms of Service</Label>
    </div>
    <p id="dev-cb-err-msg" className="text-xs text-destructive pl-6">
      You must accept the terms to continue.
    </p>
  </div>
)

const DisabledPreview = () => (
  <div className="flex flex-col gap-2.5">
    <div className="flex items-center gap-2">
      <Checkbox id="dev-cb-dis1" disabled />
      <Label htmlFor="dev-cb-dis1" className="text-sm text-muted-foreground">Disabled unchecked</Label>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox id="dev-cb-dis2" disabled defaultChecked />
      <Label htmlFor="dev-cb-dis2" className="text-sm text-muted-foreground">Disabled checked</Label>
    </div>
  </div>
)

// ── Checkbox develop doc ──────────────────────────────────────────────────────

export const checkboxDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/checkbox",
    importPath: `import { Checkbox } from "@/components/ui/checkbox"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "Built on @base-ui/react/checkbox — use onCheckedChange, not the native onChange.",
      "For form labels, also install: npx shadcn add @raana/label",
    ],
  },

  basicUsage: `import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Uncontrolled
<div className="flex items-center gap-2">
  <Checkbox id="terms" defaultChecked />
  <Label htmlFor="terms">Accept terms</Label>
</div>

// Controlled
const [checked, setChecked] = useState(false)
<Checkbox
  id="subscribe"
  checked={checked}
  onCheckedChange={(v) => setChecked(v === true)}
/>

// Error state
<Checkbox id="required" aria-invalid />

// Disabled
<Checkbox id="locked" disabled defaultChecked />`,

  codeExamples: [
    {
      title: "Basic checkbox",
      description: "Uncontrolled checkbox with an associated Label.",
      preview: <BasicPreview />,
      code: `<div className="flex items-center gap-2">
  <Checkbox id="terms" defaultChecked />
  <Label htmlFor="terms" className="text-sm">Accept terms and conditions</Label>
</div>`,
    },
    {
      title: "Controlled state",
      description: "Use checked and onCheckedChange to control the value from React state.",
      preview: <ControlledPreview />,
      code: `const [checked, setChecked] = useState(false)

<div className="flex items-center gap-2">
  <Checkbox
    id="subscribe"
    checked={checked}
    onCheckedChange={(v) => setChecked(v === true)}
  />
  <Label htmlFor="subscribe" className="text-sm">
    Subscribe to updates
  </Label>
</div>`,
    },
    {
      title: "Checkbox group",
      description: "Multiple independent checkboxes for notification preferences.",
      preview: <GroupPreview />,
      code: `const [selected, setSelected] = useState({ email: true, sms: false, push: true })
const toggle = (key) => setSelected(prev => ({ ...prev, [key]: !prev[key] }))

const channels = [
  { key: "email", label: "Email notifications" },
  { key: "sms",   label: "SMS notifications"   },
  { key: "push",  label: "Push notifications"  },
]

{channels.map(channel => (
  <div key={channel.key} className="flex items-center gap-2">
    <Checkbox
      id={channel.key}
      checked={selected[channel.key]}
      onCheckedChange={() => toggle(channel.key)}
    />
    <Label htmlFor={channel.key} className="text-sm">{channel.label}</Label>
  </div>
))}`,
    },
    {
      title: "Error state",
      description: "Set aria-invalid when a required checkbox is not checked. Link the error message with aria-describedby.",
      preview: <ErrorPreview />,
      code: `<div className="flex flex-col gap-1.5">
  <div className="flex items-center gap-2">
    <Checkbox
      id="terms"
      aria-invalid
      aria-describedby="terms-error"
    />
    <Label htmlFor="terms" className="text-sm">I agree to the Terms of Service</Label>
  </div>
  <p id="terms-error" className="text-xs text-destructive pl-6">
    You must accept the terms to continue.
  </p>
</div>`,
    },
    {
      title: "Disabled states",
      description: "Disabled checkboxes can be checked or unchecked — both are non-interactive.",
      preview: <DisabledPreview />,
      code: `{/* Disabled unchecked */}
<div className="flex items-center gap-2">
  <Checkbox id="locked-off" disabled />
  <Label htmlFor="locked-off" className="text-sm text-muted-foreground">Disabled unchecked</Label>
</div>

{/* Disabled checked */}
<div className="flex items-center gap-2">
  <Checkbox id="locked-on" disabled defaultChecked />
  <Label htmlFor="locked-on" className="text-sm text-muted-foreground">Disabled checked</Label>
</div>`,
    },
  ],

  apiReference: [
    {
      name: "checked",
      values: "boolean",
      default: "—",
      description: "Controlled checked state. Pair with onCheckedChange.",
    },
    {
      name: "defaultChecked",
      values: "boolean",
      default: "false",
      description: "Uncontrolled initial checked state.",
    },
    {
      name: "onCheckedChange",
      values: "(checked: boolean | \"indeterminate\") => void",
      default: "—",
      description: "Callback fired when the user toggles the checkbox. Cast to boolean: (v) => setChecked(v === true).",
    },
    {
      name: "disabled",
      values: "boolean",
      default: "false",
      description: "Prevents interaction. Applies opacity and cursor-not-allowed.",
    },
    {
      name: "name",
      values: "string",
      default: "—",
      description: "Form field name for native form submission.",
    },
    {
      name: "value",
      values: "string",
      default: "on",
      description: "Value submitted in native forms when checked.",
    },
    {
      name: "id",
      values: "string",
      default: "—",
      description: "Required when pairing with a Label via htmlFor.",
    },
    {
      name: "aria-invalid",
      values: "boolean | \"true\" | \"false\"",
      default: "—",
      description: "Applies destructive ring for required-but-unchecked validation errors.",
    },
    {
      name: "required",
      values: "boolean",
      default: "false",
      description: "Marks the field as required for native form validation.",
    },
  ],

  accessibility: [
    {
      rule: "Associate with a Label via htmlFor/id",
      detail: "Clicking the Label must toggle the checkbox. Do not use aria-label as a substitute for visible labels.",
    },
    {
      rule: "Use aria-label for unlabeled checkboxes",
      detail: "In data table row selection where there is no visible text label, add aria-label=\"Select row\".",
    },
    {
      rule: "Space to toggle",
      detail: "Checkbox receives focus via Tab and toggles with Space. This is the default Base UI behaviour — do not override it.",
    },
    {
      rule: "aria-invalid and aria-describedby for errors",
      detail: "Set aria-invalid=\"true\" and aria-describedby pointing to the error message element.",
    },
  ],
}
