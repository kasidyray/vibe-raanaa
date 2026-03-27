"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RiBellLine, RiMailLine, RiPhoneLine, RiShieldLine, RiKeyLine } from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ───────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    <Switch defaultChecked id="anatomy-sw" />
    <div className="flex items-start gap-12 text-center">
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">① Track (background)</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">② Thumb (circle)</span>
      </div>
    </div>
  </div>
)

// ── Context example: Notification preferences ─────────────────────────────────

const NotificationPrefsExample = () => {
  const [prefs, setPrefs] = useState({ email: true, sms: false, push: true, digest: false })
  const toggle = (k: keyof typeof prefs) => setPrefs(p => ({ ...p, [k]: !p[k] }))
  const items = [
    { key: "email" as const, label: "Email notifications", icon: <RiMailLine className="size-4 text-muted-foreground" /> },
    { key: "sms" as const,   label: "SMS notifications",   icon: <RiPhoneLine className="size-4 text-muted-foreground" /> },
    { key: "push" as const,  label: "Push notifications",  icon: <RiBellLine className="size-4 text-muted-foreground" /> },
  ]
  return (
    <div className="rounded-xl border overflow-hidden max-w-sm">
      <div className="px-5 py-4 border-b">
        <p className="text-sm font-semibold">Notification preferences</p>
        <p className="text-xs text-muted-foreground mt-0.5">Choose how you want to be notified</p>
      </div>
      <div className="divide-y">
        {items.map(item => (
          <div key={item.key} className="flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              {item.icon}
              <Label htmlFor={`notif-${item.key}`} className="text-sm font-medium cursor-pointer">
                {item.label}
              </Label>
            </div>
            <Switch
              id={`notif-${item.key}`}
              checked={prefs[item.key]}
              onCheckedChange={() => toggle(item.key)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Context example: Feature flags ────────────────────────────────────────────

const FeatureFlagsExample = () => {
  const [flags, setFlags] = useState({ beta: false, newDashboard: true, aiSuggest: false })
  const toggle = (k: keyof typeof flags) => setFlags(p => ({ ...p, [k]: !p[k] }))
  const items = [
    { key: "beta" as const,         label: "Beta features",        description: "Access unreleased features" },
    { key: "newDashboard" as const,  label: "New dashboard",        description: "Opt in to the redesigned UI" },
    { key: "aiSuggest" as const,     label: "AI suggestions",       description: "Get AI-powered content ideas" },
  ]
  return (
    <div className="rounded-xl border overflow-hidden max-w-sm">
      <div className="px-5 py-4 border-b">
        <p className="text-sm font-semibold">Feature flags</p>
        <p className="text-xs text-muted-foreground mt-0.5">Changes take effect immediately</p>
      </div>
      <div className="divide-y">
        {items.map(item => (
          <div key={item.key} className="flex items-center justify-between px-5 py-3.5">
            <div>
              <Label htmlFor={`flag-${item.key}`} className="text-sm font-medium cursor-pointer">{item.label}</Label>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
            <Switch
              id={`flag-${item.key}`}
              checked={flags[item.key]}
              onCheckedChange={() => toggle(item.key)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Context example: Security settings ───────────────────────────────────────

const SecuritySettingsExample = () => {
  const [security, setSecurity] = useState({ mfa: true, sessions: true, apiKeys: false })
  const toggle = (k: keyof typeof security) => setSecurity(p => ({ ...p, [k]: !p[k] }))
  const items = [
    { key: "mfa" as const,      label: "Two-factor authentication", description: "Require a second step on login",  icon: <RiShieldLine className="size-4 text-muted-foreground" /> },
    { key: "sessions" as const, label: "Session notifications",      description: "Alert on new sign-ins",           icon: <RiBellLine className="size-4 text-muted-foreground" /> },
    { key: "apiKeys" as const,  label: "API key access",             description: "Allow programmatic access",       icon: <RiKeyLine className="size-4 text-muted-foreground" /> },
  ]
  return (
    <div className="rounded-xl border overflow-hidden max-w-sm">
      <div className="px-5 py-4 border-b">
        <p className="text-sm font-semibold">Security</p>
      </div>
      <div className="divide-y">
        {items.map(item => (
          <div key={item.key} className="flex items-center justify-between px-5 py-3.5">
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5">{item.icon}</div>
              <div>
                <Label htmlFor={`sec-${item.key}`} className="text-sm font-medium cursor-pointer">{item.label}</Label>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
            <Switch
              id={`sec-${item.key}`}
              checked={security[item.key]}
              onCheckedChange={() => toggle(item.key)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Do / Don't previews ───────────────────────────────────────────────────────

const DoImmediatePreview = () => {
  const [on, setOn] = useState(true)
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex items-center gap-2">
        <Switch id="do-imm" checked={on} onCheckedChange={setOn} />
        <Label htmlFor="do-imm" className="text-sm">Dark mode</Label>
      </div>
      <p className="text-xs text-muted-foreground text-center">Commits instantly — no save needed</p>
    </div>
  )
}

const DoLabeledPreview = () => (
  <div className="flex items-center gap-2">
    <Switch id="do-lb" defaultChecked />
    <Label htmlFor="do-lb" className="text-sm">Enable notifications</Label>
  </div>
)

const DontFormPreview = () => (
  <div className="flex flex-col gap-2 items-center">
    <div className="flex items-center gap-2">
      <Switch id="dont-form" />
      <Label htmlFor="dont-form" className="text-sm">Agree to terms</Label>
    </div>
    <p className="text-xs text-muted-foreground text-center">Use Checkbox for form agreement fields</p>
  </div>
)

const DontNoLabelPreview = () => (
  <div className="flex flex-col items-center gap-2">
    <Switch defaultChecked />
    <p className="text-xs text-muted-foreground text-center">No label — unclear what it controls</p>
  </div>
)

// ── Switch design doc ─────────────────────────────────────────────────────────

export const switchDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  // ── Overview ───────────────────────────────────────────────────────────────
  overview: {
    what: "A sliding toggle control that instantly commits an on/off state, shown as an oval track with a circular thumb that slides between two positions.",
    why: "Settings that take effect immediately — dark mode, notifications, feature flags — need a control that communicates instant commitment rather than a form that requires saving.",
    problem: "Using a checkbox for an immediate-effect setting is confusing because checkboxes imply form submission. Switch conveys instant commitment through its physical metaphor.",
    appearsIn: [
      "Notification preference lists",
      "Security and privacy settings",
      "Feature flag dashboards",
      "Account settings pages",
      "Dark mode and appearance controls",
    ],
  },

  // ── Anatomy ────────────────────────────────────────────────────────────────
  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Track (background)",
        description: "The oval container. Shows muted background when off, primary background when on.",
      },
      {
        name: "Thumb (circle)",
        description: "The white circular indicator that slides left (off) or right (on) inside the track.",
      },
    ],
  },

  // ── Usage ──────────────────────────────────────────────────────────────────
  whenToUse: [
    "Settings that take effect immediately without a form submit step — notifications, dark mode, feature flags.",
    "Binary on/off controls in settings cards and preference lists.",
    "Security toggles that activate or deactivate a feature instantly.",
  ],
  whenNotToUse: [
    "Form agreement fields (\"I agree to terms\") — use Checkbox.",
    "Multi-select filter lists — use Checkbox groups.",
    "Mutually exclusive options — use radio buttons.",
    "Actions that need confirmation (e.g. deleting data) — use Dialog + Button.",
  ],

  // ── Variants ───────────────────────────────────────────────────────────────
  variants: [
    {
      name: "Default (off)",
      description: "Standard size, off state. Track is muted, thumb is left.",
      when: "All full-size settings rows.",
      preview: (
        <div className="flex items-center gap-2">
          <Switch id="v-def-off" />
          <Label htmlFor="v-def-off" className="text-sm">Notifications</Label>
        </div>
      ),
    },
    {
      name: "Default (on)",
      description: "Standard size, on state. Track is primary, thumb is right.",
      when: "When the feature is active.",
      preview: (
        <div className="flex items-center gap-2">
          <Switch id="v-def-on" defaultChecked />
          <Label htmlFor="v-def-on" className="text-sm">Notifications</Label>
        </div>
      ),
    },
    {
      name: "Small (off)",
      description: "Compact size — h-[14px] w-[24px]. For dense inline contexts.",
      when: "Inline toggles inside table cells or narrow cards.",
      preview: (
        <div className="flex items-center gap-2">
          <Switch id="v-sm-off" size="sm" />
          <Label htmlFor="v-sm-off" className="text-sm">Compact</Label>
        </div>
      ),
    },
    {
      name: "Small (on)",
      description: "Compact size, on state.",
      when: "Dense inline toggles that are active.",
      preview: (
        <div className="flex items-center gap-2">
          <Switch id="v-sm-on" size="sm" defaultChecked />
          <Label htmlFor="v-sm-on" className="text-sm">Compact</Label>
        </div>
      ),
    },
    {
      name: "Disabled",
      description: "Dimmed track, cursor-not-allowed. State is visible but locked.",
      when: "Settings controlled by a higher-level permission or plan restriction.",
      preview: (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Switch id="v-dis-off" disabled />
            <Label htmlFor="v-dis-off" className="text-sm text-muted-foreground">Locked off</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="v-dis-on" disabled defaultChecked />
            <Label htmlFor="v-dis-on" className="text-sm text-muted-foreground">Locked on</Label>
          </div>
        </div>
      ),
    },
  ],

  // ── States ─────────────────────────────────────────────────────────────────
  states: [
    {
      name: "Off",
      description: "Default. Track is muted, thumb is on the left side.",
      preview: (
        <div className="flex items-center gap-2">
          <Switch id="s-off" />
          <Label htmlFor="s-off" className="text-sm">Off</Label>
        </div>
      ),
    },
    {
      name: "On",
      description: "Track is primary coloured, thumb is on the right.",
      preview: (
        <div className="flex items-center gap-2">
          <Switch id="s-on" defaultChecked />
          <Label htmlFor="s-on" className="text-sm">On</Label>
        </div>
      ),
    },
    {
      name: "Focused",
      description: "Focus ring visible. Triggered by Tab key navigation.",
      preview: (
        <div className="flex items-center gap-2">
          <Switch id="s-fo" className="ring-2 ring-ring ring-offset-2" />
          <Label htmlFor="s-fo" className="text-sm">Focused</Label>
        </div>
      ),
    },
    {
      name: "Disabled off",
      description: "Non-interactive, off state. Communicates the feature is locked.",
      preview: (
        <div className="flex items-center gap-2">
          <Switch id="s-du" disabled />
          <Label htmlFor="s-du" className="text-sm text-muted-foreground">Disabled off</Label>
        </div>
      ),
    },
    {
      name: "Disabled on",
      description: "Non-interactive, on state. Feature is active but cannot be changed.",
      preview: (
        <div className="flex items-center gap-2">
          <Switch id="s-dc" disabled defaultChecked />
          <Label htmlFor="s-dc" className="text-sm text-muted-foreground">Disabled on</Label>
        </div>
      ),
    },
    {
      name: "Error",
      description: "Destructive ring via aria-invalid. Rare — most switches don't require validation.",
      preview: (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Switch id="s-err" aria-invalid />
            <Label htmlFor="s-err" className="text-sm">Required setting</Label>
          </div>
          <p className="text-xs text-destructive pl-9">This setting must be enabled to continue.</p>
        </div>
      ),
    },
  ],

  // ── Properties ─────────────────────────────────────────────────────────────
  properties: [
    {
      name: "checked",
      values: "true · false",
      default: "—",
      description: "Controlled on/off state. Pair with onCheckedChange.",
    },
    {
      name: "defaultChecked",
      values: "true · false",
      default: "false",
      description: "Uncontrolled initial state.",
    },
    {
      name: "onCheckedChange",
      values: "(checked: boolean) => void",
      default: "—",
      description: "Called when the user toggles the switch. Change is immediate — no save step needed.",
    },
    {
      name: "disabled",
      values: "true · false",
      default: "false",
      description: "Locks the switch. Applies opacity and cursor-not-allowed.",
    },
    {
      name: "size",
      values: "sm · default",
      default: "default",
      description: "Default (h-[18.4px] w-[32px]) or sm (h-[14px] w-[24px]) for dense layouts.",
    },
    {
      name: "aria-invalid",
      values: "true · false",
      default: "false",
      description: "Applies destructive ring. Rarely needed — switches usually don't require validation.",
    },
  ],

  // ── Content guidance ───────────────────────────────────────────────────────
  contentGuidance: [
    {
      rule: "Label the feature, not the state",
      detail: "\"Email notifications\" is correct — not \"Notifications on\" or \"Toggle notifications\".",
    },
    {
      rule: "No on/off text labels on the track",
      detail: "The thumb position communicates state. Don't add \"On\" / \"Off\" text inside or beside the track.",
    },
    {
      rule: "Show the effect, not the action",
      detail: "\"Dark mode\" describes what the toggle controls — not \"Enable dark mode\" or \"Switch to dark\".",
    },
  ],

  // ── Behavior ───────────────────────────────────────────────────────────────
  behavior: [
    "Clicking the track or thumb toggles the state immediately.",
    "Space bar toggles when the switch is focused via Tab.",
    "The change is committed instantly — no save button needed. Show a toast if the change is meaningful.",
    "Thumb slides with a CSS transition. Do not add extra transition classes.",
  ],

  // ── Spacing ────────────────────────────────────────────────────────────────
  spacing: [
    {
      rule: "Switch to label gap",
      detail: "gap-2 between the Switch and its Label in a flex row.",
    },
    {
      rule: "Between switch rows in a list",
      detail: "Use divide-y on the container or gap-0 with border-b on each row for settings lists.",
    },
    {
      rule: "Row padding",
      detail: "px-4 py-3 or px-5 py-3.5 for settings row padding. Match the surrounding card's padding.",
    },
  ],

  // ── Accessibility ──────────────────────────────────────────────────────────
  accessibility: [
    {
      rule: "Always associate a Label",
      detail: "Use htmlFor on the Label and id on the Switch. Clicking the label must toggle the switch.",
    },
    {
      rule: "Space to toggle",
      detail: "Switch receives focus via Tab and toggles with Space — standard ARIA switch behaviour.",
    },
    {
      rule: "Communicate instant effect",
      detail: "When the switch change has a meaningful side effect (e.g. sending email), show a toast after the change.",
    },
  ],

  // ── Do & Don't ─────────────────────────────────────────────────────────────
  doItems: [
    {
      label: "Use Switch for immediate-effect settings",
      description: "Switch signals instant commitment — the change takes effect without a save button.",
      preview: <DoImmediatePreview />,
    },
    {
      label: "Always include a visible label",
      description: "The label must describe what the switch controls, not its state.",
      preview: <DoLabeledPreview />,
    },
  ],
  dontItems: [
    {
      label: "Don't use Switch for form agreement fields",
      description: "Agreement checkboxes require deliberate opt-in — use Checkbox for terms and consent.",
      preview: <DontFormPreview />,
    },
    {
      label: "Don't render Switch without a label",
      description: "An unlabeled switch has no context — always include a visible Label.",
      preview: <DontNoLabelPreview />,
    },
  ],

  // ── Examples in context ────────────────────────────────────────────────────
  examplesInContext: [
    {
      title: "Notification preferences",
      description: "Per-channel notification toggles — each commits immediately without saving.",
      preview: <NotificationPrefsExample />,
      code: `const [prefs, setPrefs] = useState({ email: true, sms: false, push: true })
const toggle = (key) => setPrefs(prev => ({ ...prev, [key]: !prev[key] }))

const channels = [
  { key: "email", label: "Email notifications", icon: <RiMailLine /> },
  { key: "sms",   label: "SMS notifications",   icon: <RiPhoneLine /> },
  { key: "push",  label: "Push notifications",  icon: <RiBellLine /> },
]

{channels.map(channel => (
  <div key={channel.key} className="flex items-center justify-between px-5 py-3.5 border-b last:border-0">
    <div className="flex items-center gap-2.5">
      {channel.icon}
      <Label htmlFor={channel.key} className="text-sm font-medium cursor-pointer">
        {channel.label}
      </Label>
    </div>
    <Switch
      id={channel.key}
      checked={prefs[channel.key]}
      onCheckedChange={() => toggle(channel.key)}
    />
  </div>
))}`,
    },
    {
      title: "Feature flags",
      description: "Beta opt-in toggles — each flag activates immediately and shows a description.",
      preview: <FeatureFlagsExample />,
      code: `const flags = [
  { key: "beta",         label: "Beta features",   description: "Access unreleased features" },
  { key: "newDashboard", label: "New dashboard",   description: "Opt in to the redesigned UI" },
  { key: "aiSuggest",    label: "AI suggestions",  description: "Get AI-powered content ideas" },
]

{flags.map(flag => (
  <div key={flag.key} className="flex items-center justify-between px-5 py-3.5 border-b last:border-0">
    <div>
      <Label htmlFor={flag.key} className="text-sm font-medium cursor-pointer">{flag.label}</Label>
      <p className="text-xs text-muted-foreground">{flag.description}</p>
    </div>
    <Switch
      id={flag.key}
      checked={enabled[flag.key]}
      onCheckedChange={() => toggle(flag.key)}
    />
  </div>
))}`,
    },
    {
      title: "Account security settings",
      description: "Security feature switches with icons and descriptions in a settings card.",
      preview: <SecuritySettingsExample />,
      code: `const securitySettings = [
  { key: "mfa",      label: "Two-factor authentication", description: "Require a second step on login" },
  { key: "sessions", label: "Session notifications",      description: "Alert on new sign-ins"          },
  { key: "apiKeys",  label: "API key access",             description: "Allow programmatic access"      },
]

{securitySettings.map(setting => (
  <div key={setting.key} className="flex items-center justify-between px-5 py-3.5 border-b last:border-0">
    <div>
      <Label htmlFor={setting.key} className="text-sm font-medium cursor-pointer">{setting.label}</Label>
      <p className="text-xs text-muted-foreground">{setting.description}</p>
    </div>
    <Switch
      id={setting.key}
      checked={security[setting.key]}
      onCheckedChange={() => toggle(setting.key)}
    />
  </div>
))}`,
    },
  ],

  // ── Related components ─────────────────────────────────────────────────────
  relatedComponents: [
    {
      slug: "checkbox",
      name: "Checkbox",
      description: "Binary selection that is part of a form and committed on submit.",
      when: "Terms acceptance, permission lists, multi-select filters — anywhere a form submit step is required.",
    },
    {
      slug: "button",
      name: "Button",
      description: "Trigger an explicit action.",
      when: "The toggle triggers a consequential action that needs confirmation (e.g. enable billing).",
    },
  ],

  // ── Design notes ───────────────────────────────────────────────────────────
  designNotes: [
    "Default size is h-[18.4px] w-[32px]; sm size is h-[14px] w-[24px]. These are pixel-precise and not overridable via Tailwind height/width classes.",
    "The track colour is bg-muted when off and bg-primary when on — these are controlled by data-checked state internally.",
    "For immediate-effect settings, fire toast.success() in onCheckedChange to confirm the change.",
    "Switch is not typically used inside forms that have a Save button — that context belongs to Checkbox.",
  ],
}
