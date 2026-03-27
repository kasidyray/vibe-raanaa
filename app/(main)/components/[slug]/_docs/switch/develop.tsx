"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Previews ──────────────────────────────────────────────────────────────────

const BasicPreview = () => (
  <div className="flex items-center gap-2">
    <Switch id="dev-sw-basic" defaultChecked />
    <Label htmlFor="dev-sw-basic" className="text-sm">Email notifications</Label>
  </div>
)

const ControlledPreview = () => {
  const [on, setOn] = useState(false)
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Switch id="dev-sw-ctrl" checked={on} onCheckedChange={setOn} />
        <Label htmlFor="dev-sw-ctrl" className="text-sm">
          Dark mode
        </Label>
      </div>
      <p className="text-xs text-muted-foreground pl-9">
        State: <span className="font-mono">{on ? "on" : "off"}</span>
      </p>
    </div>
  )
}

const SizePreview = () => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-2">
      <Switch id="dev-sw-def" defaultChecked />
      <Label htmlFor="dev-sw-def" className="text-sm">Default size</Label>
    </div>
    <div className="flex items-center gap-2">
      <Switch id="dev-sw-sm" size="sm" defaultChecked />
      <Label htmlFor="dev-sw-sm" className="text-sm">Small size</Label>
    </div>
  </div>
)

const DisabledPreview = () => (
  <div className="flex flex-col gap-2.5">
    <div className="flex items-center gap-2">
      <Switch id="dev-sw-dis1" disabled />
      <Label htmlFor="dev-sw-dis1" className="text-sm text-muted-foreground">Disabled off</Label>
    </div>
    <div className="flex items-center gap-2">
      <Switch id="dev-sw-dis2" disabled defaultChecked />
      <Label htmlFor="dev-sw-dis2" className="text-sm text-muted-foreground">Disabled on</Label>
    </div>
  </div>
)

const SettingsListPreview = () => {
  const [prefs, setPrefs] = useState({ email: true, push: false, digest: true })
  const toggle = (k: keyof typeof prefs) => setPrefs(p => ({ ...p, [k]: !p[k] }))
  const items: { key: keyof typeof prefs; label: string; desc: string }[] = [
    { key: "email",  label: "Email updates",   desc: "Weekly product news" },
    { key: "push",   label: "Push alerts",     desc: "Critical issues only" },
    { key: "digest", label: "Daily digest",    desc: "Activity summary" },
  ]
  return (
    <div className="rounded-xl border overflow-hidden w-72">
      {items.map(item => (
        <div key={item.key} className="flex items-center justify-between px-4 py-3 border-b last:border-0">
          <div>
            <Label htmlFor={`sl-${item.key}`} className="text-sm font-medium cursor-pointer">{item.label}</Label>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
          <Switch
            id={`sl-${item.key}`}
            checked={prefs[item.key]}
            onCheckedChange={() => toggle(item.key)}
          />
        </div>
      ))}
    </div>
  )
}

// ── Switch develop doc ────────────────────────────────────────────────────────

export const switchDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/switch",
    importPath: `import { Switch } from "@/components/ui/switch"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "For form labels, also install: npx shadcn add @raana/label",
    ],
  },

  basicUsage: `import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Uncontrolled
<div className="flex items-center gap-2">
  <Switch id="notifications" defaultChecked />
  <Label htmlFor="notifications">Email notifications</Label>
</div>

// Controlled
const [on, setOn] = useState(false)
<Switch id="dark-mode" checked={on} onCheckedChange={setOn} />

// Small size
<Switch id="compact" size="sm" />

// Disabled
<Switch id="locked" disabled defaultChecked />`,

  codeExamples: [
    {
      title: "Basic switch",
      description: "Uncontrolled switch with an associated Label.",
      preview: <BasicPreview />,
      code: `<div className="flex items-center gap-2">
  <Switch id="notifications" defaultChecked />
  <Label htmlFor="notifications" className="text-sm">Email notifications</Label>
</div>`,
    },
    {
      title: "Controlled state",
      description: "Use checked and onCheckedChange to control the value from React state.",
      preview: <ControlledPreview />,
      code: `const [on, setOn] = useState(false)

<div className="flex items-center gap-2">
  <Switch
    id="dark-mode"
    checked={on}
    onCheckedChange={setOn}
  />
  <Label htmlFor="dark-mode" className="text-sm">Dark mode</Label>
</div>`,
    },
    {
      title: "Size variants",
      description: "Default size for settings pages. Use size=\"sm\" for dense inline contexts.",
      preview: <SizePreview />,
      code: `{/* Default */}
<div className="flex items-center gap-2">
  <Switch id="default-size" defaultChecked />
  <Label htmlFor="default-size" className="text-sm">Default size</Label>
</div>

{/* Small */}
<div className="flex items-center gap-2">
  <Switch id="small-size" size="sm" defaultChecked />
  <Label htmlFor="small-size" className="text-sm">Small size</Label>
</div>`,
    },
    {
      title: "Disabled states",
      description: "Disabled switches can be on or off — both are non-interactive.",
      preview: <DisabledPreview />,
      code: `<div className="flex items-center gap-2">
  <Switch id="locked-off" disabled />
  <Label htmlFor="locked-off" className="text-sm text-muted-foreground">Disabled off</Label>
</div>

<div className="flex items-center gap-2">
  <Switch id="locked-on" disabled defaultChecked />
  <Label htmlFor="locked-on" className="text-sm text-muted-foreground">Disabled on</Label>
</div>`,
    },
    {
      title: "Settings list",
      description: "Multiple switches in a bordered list — the common pattern for preference pages.",
      preview: <SettingsListPreview />,
      code: `const [prefs, setPrefs] = useState({ email: true, push: false, digest: true })
const toggle = (key) => setPrefs(prev => ({ ...prev, [key]: !prev[key] }))

const settings = [
  { key: "email",  label: "Email updates", desc: "Weekly product news"  },
  { key: "push",   label: "Push alerts",   desc: "Critical issues only" },
  { key: "digest", label: "Daily digest",  desc: "Activity summary"     },
]

<div className="rounded-xl border overflow-hidden">
  {settings.map(setting => (
    <div key={setting.key} className="flex items-center justify-between px-4 py-3 border-b last:border-0">
      <div>
        <Label htmlFor={setting.key} className="text-sm font-medium cursor-pointer">{setting.label}</Label>
        <p className="text-xs text-muted-foreground">{setting.desc}</p>
      </div>
      <Switch
        id={setting.key}
        checked={prefs[setting.key]}
        onCheckedChange={() => toggle(setting.key)}
      />
    </div>
  ))}
</div>`,
    },
  ],

  apiReference: [
    {
      name: "checked",
      values: "boolean",
      default: "—",
      description: "Controlled on/off state. Pair with onCheckedChange.",
    },
    {
      name: "defaultChecked",
      values: "boolean",
      default: "false",
      description: "Uncontrolled initial state.",
    },
    {
      name: "onCheckedChange",
      values: "(checked: boolean) => void",
      default: "—",
      description: "Callback fired when the user toggles the switch. The change takes effect immediately.",
    },
    {
      name: "disabled",
      values: "boolean",
      default: "false",
      description: "Prevents interaction. Applies opacity and cursor-not-allowed.",
    },
    {
      name: "size",
      values: `"default" | "sm"`,
      default: `"default"`,
      description: "Default (h-[18.4px] w-[32px]) or sm (h-[14px] w-[24px]) for dense layouts.",
    },
    {
      name: "id",
      values: "string",
      default: "—",
      description: "Required when pairing with a Label via htmlFor.",
    },
    {
      name: "name",
      values: "string",
      default: "—",
      description: "Form field name for native form submission.",
    },
    {
      name: "aria-invalid",
      values: "boolean | \"true\" | \"false\"",
      default: "—",
      description: "Applies destructive ring. Rarely needed on a switch.",
    },
  ],

  accessibility: [
    {
      rule: "Associate with Label via htmlFor/id",
      detail: "Always use a visible Label. Clicking the label must toggle the switch.",
    },
    {
      rule: "Space and Enter to toggle",
      detail: "Switch receives focus via Tab and toggles with Space. This matches the ARIA switch role behaviour.",
    },
    {
      rule: "role=\"switch\" is applied automatically",
      detail: "The component renders with role=\"switch\" and aria-checked. Do not override these.",
    },
    {
      rule: "Communicate side effects",
      detail: "When toggling has a meaningful side effect (sending email, activating billing), fire toast.success() in onCheckedChange.",
    },
  ],
}
