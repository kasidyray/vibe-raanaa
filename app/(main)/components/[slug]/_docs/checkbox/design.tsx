"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ───────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    <div className="flex items-center gap-2">
      <Checkbox id="anatomy-cb" defaultChecked />
      <Label htmlFor="anatomy-cb" className="text-sm">Accept terms and conditions</Label>
    </div>
    <div className="flex items-start gap-12 text-center">
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">① Box (container)</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">② Checkmark</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">③ Label</span>
      </div>
    </div>
  </div>
)

// ── Context example: Terms acceptance ────────────────────────────────────────

const TermsAcceptanceExample = () => {
  const [accepted, setAccepted] = useState(false)
  return (
    <div className="rounded-xl border overflow-hidden max-w-sm">
      <div className="px-5 py-4 border-b">
        <p className="text-sm font-semibold">Create account</p>
      </div>
      <div className="p-5 flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">By creating an account, you agree to our policies.</p>
        <div className="flex items-start gap-2.5">
          <Checkbox
            id="terms"
            checked={accepted}
            onCheckedChange={(v) => setAccepted(v === true)}
          />
          <Label htmlFor="terms" className="text-sm leading-snug">
            I agree to the{" "}
            <span className="text-primary underline underline-offset-2 cursor-pointer">Terms of Service</span>
            {" "}and{" "}
            <span className="text-primary underline underline-offset-2 cursor-pointer">Privacy Policy</span>
          </Label>
        </div>
        <button
          disabled={!accepted}
          className="w-full h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Create account
        </button>
      </div>
    </div>
  )
}

// ── Context example: Permissions list ────────────────────────────────────────

const PermissionsListExample = () => {
  const [perms, setPerms] = useState({
    read: true,
    write: true,
    delete: false,
    admin: false,
  })
  const toggle = (key: keyof typeof perms) =>
    setPerms(p => ({ ...p, [key]: !p[key] }))
  const items = [
    { key: "read" as const,   label: "View records",    description: "Read access to all records" },
    { key: "write" as const,  label: "Edit records",    description: "Create and update records" },
    { key: "delete" as const, label: "Delete records",  description: "Permanently remove records" },
    { key: "admin" as const,  label: "Admin access",    description: "Manage team and billing" },
  ]
  return (
    <div className="rounded-xl border overflow-hidden max-w-sm">
      <div className="px-4 py-3 border-b">
        <p className="text-sm font-semibold">Permissions</p>
        <p className="text-xs text-muted-foreground mt-0.5">Ngozi Achebe · Editor role</p>
      </div>
      <div className="divide-y">
        {items.map(item => (
          <div key={item.key} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
            <Checkbox
              id={`perm-${item.key}`}
              checked={perms[item.key]}
              onCheckedChange={() => toggle(item.key)}
              aria-label={item.label}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Context example: Filter sidebar ──────────────────────────────────────────

const FilterSidebarExample = () => {
  const [filters, setFilters] = useState({ active: true, pending: true, inactive: false, archived: false })
  const toggle = (k: keyof typeof filters) => setFilters(p => ({ ...p, [k]: !p[k] }))
  const items = [
    { key: "active" as const,   label: "Active",   count: 42 },
    { key: "pending" as const,  label: "Pending",  count: 11 },
    { key: "inactive" as const, label: "Inactive", count: 8 },
    { key: "archived" as const, label: "Archived", count: 3 },
  ]
  return (
    <div className="rounded-xl border overflow-hidden max-w-xs">
      <div className="px-4 py-3 border-b">
        <p className="text-sm font-semibold">Status filter</p>
      </div>
      <div className="p-4 flex flex-col gap-2.5">
        {items.map(item => (
          <div key={item.key} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`filter-${item.key}`}
                checked={filters[item.key]}
                onCheckedChange={() => toggle(item.key)}
              />
              <Label htmlFor={`filter-${item.key}`} className="text-sm">
                {item.label}
              </Label>
            </div>
            <span className="text-xs tabular-nums text-muted-foreground">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Do / Don't previews ───────────────────────────────────────────────────────

const DoLabeledPreview = () => (
  <div className="flex items-center gap-2">
    <Checkbox id="do-labeled" defaultChecked />
    <Label htmlFor="do-labeled" className="text-sm">Send me email updates</Label>
  </div>
)

const DoGroupedPreview = () => (
  <div className="flex flex-col gap-2.5">
    {["Monthly digest", "Product announcements", "Security alerts"].map((label, i) => (
      <div key={label} className="flex items-center gap-2">
        <Checkbox id={`do-grp-${i}`} defaultChecked={i < 2} />
        <Label htmlFor={`do-grp-${i}`} className="text-sm">{label}</Label>
      </div>
    ))}
  </div>
)

const DontNoLabelPreview = () => (
  <div className="flex flex-col gap-2 items-center">
    <Checkbox defaultChecked />
    <p className="text-xs text-muted-foreground text-center">No label — impossible to understand</p>
  </div>
)

const DontSingleChoicePreview = () => (
  <div className="flex flex-col gap-2 items-center">
    <div className="flex flex-col gap-1.5">
      {["Option A", "Option B", "Option C"].map((opt, i) => (
        <div key={opt} className="flex items-center gap-2">
          <Checkbox id={`dont-sc-${i}`} defaultChecked={i === 0} />
          <Label htmlFor={`dont-sc-${i}`} className="text-sm">{opt}</Label>
        </div>
      ))}
    </div>
    <p className="text-xs text-muted-foreground text-center">Use radio buttons for exclusive choice</p>
  </div>
)

// ── Checkbox design doc ───────────────────────────────────────────────────────

export const checkboxDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  // ── Overview ───────────────────────────────────────────────────────────────
  overview: {
    what: "A binary toggle that lets users independently check or uncheck an option, shown as a small square box with a checkmark when selected.",
    why: "Binary boolean choices — consent, permissions, feature flags, filter selections — need a consistent, accessible toggle that clearly communicates its checked state.",
    problem: "Without a consistent checkbox component, teams build ad-hoc toggle patterns that lack keyboard accessibility, ARIA attributes, and design consistency.",
    appearsIn: [
      "Terms and consent forms",
      "Permission and role settings",
      "Filter sidebars",
      "Notification preference lists",
      "Data table row selection",
      "Feature flag controls",
    ],
  },

  // ── Anatomy ────────────────────────────────────────────────────────────────
  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Box (container)",
        description: "The size-4 square. Carries the border, background (unchecked) and primary fill (checked).",
      },
      {
        name: "Checkmark",
        description: "The check icon shown inside the box when checked. Rendered in primary-foreground colour.",
      },
      {
        name: "Label",
        description: "Associated text label. Clicking it toggles the checkbox. Always required for accessibility.",
        optional: true,
      },
    ],
  },

  // ── Usage ──────────────────────────────────────────────────────────────────
  whenToUse: [
    "Binary yes/no choices where each option is independent — notification preferences, permissions.",
    "Multi-select filter lists where multiple values can be active simultaneously.",
    "Terms, consent, or agreement acceptance before a primary action.",
    "Data table row selection — each row gets a checkbox.",
  ],
  whenNotToUse: [
    "Mutually exclusive choices (only one can be selected) — use radio buttons.",
    "Turning a feature on or off immediately — use Switch for instant-commit toggles.",
    "More than 5–6 options in a single group — consider a multi-select dropdown or Combobox.",
  ],

  // ── Variants ───────────────────────────────────────────────────────────────
  variants: [
    {
      name: "Unchecked",
      description: "Default resting state. Empty box with a border.",
      when: "The default / unselected state for any option.",
      preview: (
        <div className="flex items-center gap-2">
          <Checkbox id="v-unchecked" />
          <Label htmlFor="v-unchecked" className="text-sm">Option label</Label>
        </div>
      ),
    },
    {
      name: "Checked",
      description: "Box filled with primary background and a white checkmark.",
      when: "The option has been selected by the user.",
      preview: (
        <div className="flex items-center gap-2">
          <Checkbox id="v-checked" defaultChecked />
          <Label htmlFor="v-checked" className="text-sm">Option label</Label>
        </div>
      ),
    },
    {
      name: "Disabled unchecked",
      description: "Dimmed box, cursor-not-allowed. Cannot be interacted with.",
      when: "Option is unavailable due to permissions or feature flags.",
      preview: (
        <div className="flex items-center gap-2">
          <Checkbox id="v-dis-u" disabled />
          <Label htmlFor="v-dis-u" className="text-sm text-muted-foreground">Unavailable option</Label>
        </div>
      ),
    },
    {
      name: "Disabled checked",
      description: "Pre-selected but locked. Shows the selection without allowing change.",
      when: "A required option that cannot be removed (e.g. mandatory terms).",
      preview: (
        <div className="flex items-center gap-2">
          <Checkbox id="v-dis-c" disabled defaultChecked />
          <Label htmlFor="v-dis-c" className="text-sm text-muted-foreground">Required permission</Label>
        </div>
      ),
    },
    {
      name: "Error (aria-invalid)",
      description: "Destructive ring. Applied when a required checkbox has not been checked.",
      when: "Consent or agreement fields that must be accepted before proceeding.",
      preview: (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Checkbox id="v-err" aria-invalid />
            <Label htmlFor="v-err" className="text-sm">I agree to the terms</Label>
          </div>
          <p className="text-xs text-destructive pl-6">You must accept the terms to continue.</p>
        </div>
      ),
    },
  ],

  // ── States ─────────────────────────────────────────────────────────────────
  states: [
    {
      name: "Unchecked",
      description: "Empty box, resting state.",
      preview: (
        <div className="flex items-center gap-2">
          <Checkbox id="s-uc" />
          <Label htmlFor="s-uc" className="text-sm">Unchecked</Label>
        </div>
      ),
    },
    {
      name: "Checked",
      description: "Primary fill with checkmark.",
      preview: (
        <div className="flex items-center gap-2">
          <Checkbox id="s-ch" defaultChecked />
          <Label htmlFor="s-ch" className="text-sm">Checked</Label>
        </div>
      ),
    },
    {
      name: "Focused",
      description: "Focus ring visible. Triggered by Tab key navigation.",
      preview: (
        <div className="flex items-center gap-2">
          <Checkbox id="s-fo" className="ring-2 ring-ring ring-offset-2" />
          <Label htmlFor="s-fo" className="text-sm">Focused</Label>
        </div>
      ),
    },
    {
      name: "Disabled",
      description: "Dimmed, non-interactive. Can be checked or unchecked.",
      preview: (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox id="s-du" disabled />
            <Label htmlFor="s-du" className="text-sm text-muted-foreground">Disabled off</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="s-dc" disabled defaultChecked />
            <Label htmlFor="s-dc" className="text-sm text-muted-foreground">Disabled on</Label>
          </div>
        </div>
      ),
    },
    {
      name: "Error",
      description: "Destructive ring via aria-invalid. Paired with inline error text.",
      preview: (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Checkbox id="s-err" aria-invalid />
            <Label htmlFor="s-err" className="text-sm">Accept terms</Label>
          </div>
          <p className="text-xs text-destructive pl-6">Required.</p>
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
      description: "Controlled checked state. Pair with onCheckedChange.",
    },
    {
      name: "defaultChecked",
      values: "true · false",
      default: "false",
      description: "Uncontrolled initial checked state.",
    },
    {
      name: "onCheckedChange",
      values: "(checked: boolean) => void",
      default: "—",
      description: "Called when the user toggles the checkbox.",
    },
    {
      name: "disabled",
      values: "true · false",
      default: "false",
      description: "Prevents interaction. Applies opacity and cursor-not-allowed.",
    },
    {
      name: "aria-invalid",
      values: "true · false",
      default: "false",
      description: "Applies destructive ring for required-but-unchecked validation.",
    },
  ],

  // ── Content guidance ───────────────────────────────────────────────────────
  contentGuidance: [
    {
      rule: "Label every checkbox",
      detail: "The label should describe what happens when the box is checked — not just name the option.",
    },
    {
      rule: "Positive phrasing",
      detail: "\"Send me updates\" is clearer than \"Don't send me updates\" — avoid double negatives.",
    },
    {
      rule: "Group related options under a heading",
      detail: "When multiple checkboxes form a set, use a visible group heading so the relationship is clear.",
    },
  ],

  // ── Behavior ───────────────────────────────────────────────────────────────
  behavior: [
    "Clicking the box or its associated Label toggles the checked state.",
    "Space bar toggles when focused via keyboard.",
    "No visual indeterminate state in this component — use a tri-state if needed via checked={\"indeterminate\"} (Base UI supports this).",
    "aria-invalid triggers destructive ring without JavaScript — set the attribute and pair with error text.",
  ],

  // ── Spacing ────────────────────────────────────────────────────────────────
  spacing: [
    {
      rule: "Checkbox to label gap",
      detail: "gap-2 between the Checkbox and its Label in a flex row.",
    },
    {
      rule: "Between checkbox rows",
      detail: "gap-2 or gap-2.5 between items in a vertical list.",
    },
    {
      rule: "Error text indentation",
      detail: "Use pl-6 on the error text to align it under the label (checkbox size-4 + gap-2).",
    },
  ],

  // ── Accessibility ──────────────────────────────────────────────────────────
  accessibility: [
    {
      rule: "Always associate a Label",
      detail: "Use htmlFor on the Label and id on the Checkbox. Clicking the label must toggle the checkbox.",
    },
    {
      rule: "Keyboard: Space to toggle",
      detail: "Checkbox receives focus via Tab and toggles with Space. Do not suppress default keyboard behaviour.",
    },
    {
      rule: "aria-label for icon-only patterns",
      detail: "In data tables where there is no visible label, add aria-label=\"Select row\" to the checkbox.",
    },
    {
      rule: "aria-invalid for required",
      detail: "Set aria-invalid=\"true\" when a required checkbox is not checked. Pair with visible error text.",
    },
  ],

  // ── Do & Don't ─────────────────────────────────────────────────────────────
  doItems: [
    {
      label: "Always include a visible label",
      description: "The label makes the purpose of each checkbox clear and increases the click target.",
      preview: <DoLabeledPreview />,
    },
    {
      label: "Group related checkboxes vertically",
      description: "A consistent gap-2 vertical list is easy to scan and check.",
      preview: <DoGroupedPreview />,
    },
  ],
  dontItems: [
    {
      label: "Don't use checkboxes without labels",
      description: "An unlabeled checkbox has no meaning. Always associate a visible label.",
      preview: <DontNoLabelPreview />,
    },
    {
      label: "Don't use checkboxes for mutually exclusive options",
      description: "If only one option can be selected at a time, use radio buttons.",
      preview: <DontSingleChoicePreview />,
    },
  ],

  // ── Examples in context ────────────────────────────────────────────────────
  examplesInContext: [
    {
      title: "Terms acceptance",
      description: "A single consent checkbox that enables the submit button only when checked.",
      preview: <TermsAcceptanceExample />,
      code: `const [accepted, setAccepted] = useState(false)

<div className="flex items-start gap-2.5">
  <Checkbox
    id="terms"
    checked={accepted}
    onCheckedChange={(v) => setAccepted(v === true)}
  />
  <Label htmlFor="terms" className="text-sm leading-snug">
    I agree to the Terms of Service and Privacy Policy
  </Label>
</div>

<Button disabled={!accepted} className="w-full">Create account</Button>`,
    },
    {
      title: "Permission list",
      description: "Multiple independent checkboxes for setting individual permissions on a team member.",
      preview: <PermissionsListExample />,
      code: `const permissions = [
  { key: "read",   label: "View records",   description: "Read access to all records" },
  { key: "write",  label: "Edit records",   description: "Create and update records"  },
  { key: "delete", label: "Delete records", description: "Permanently remove records" },
  { key: "admin",  label: "Admin access",   description: "Manage team and billing"    },
]

{permissions.map(perm => (
  <div key={perm.key} className="flex items-center justify-between px-4 py-3 border-b last:border-0">
    <div>
      <p className="text-sm font-medium">{perm.label}</p>
      <p className="text-xs text-muted-foreground">{perm.description}</p>
    </div>
    <Checkbox
      id={perm.key}
      checked={permissions[perm.key]}
      onCheckedChange={() => toggle(perm.key)}
      aria-label={perm.label}
    />
  </div>
))}`,
    },
    {
      title: "Filter sidebar",
      description: "Multi-select filter list where each checkbox narrows a data set independently.",
      preview: <FilterSidebarExample />,
      code: `const statusItems = [
  { key: "active",   label: "Active",   count: 42 },
  { key: "pending",  label: "Pending",  count: 11 },
  { key: "inactive", label: "Inactive", count: 8  },
  { key: "archived", label: "Archived", count: 3  },
]

{statusItems.map(item => (
  <div key={item.key} className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Checkbox
        id={item.key}
        checked={filters[item.key]}
        onCheckedChange={() => toggle(item.key)}
      />
      <Label htmlFor={item.key} className="text-sm">{item.label}</Label>
    </div>
    <span className="text-xs tabular-nums text-muted-foreground">{item.count}</span>
  </div>
))}`,
    },
  ],

  // ── Related components ─────────────────────────────────────────────────────
  relatedComponents: [
    {
      slug: "switch",
      name: "Switch",
      description: "Toggle that commits immediately — like a light switch.",
      when: "Turning a feature or setting on/off instantly, without a form submit step.",
    },
    {
      slug: "select",
      name: "Select",
      description: "Dropdown for choosing a single value from a predefined list.",
      when: "Mutually exclusive choices with more than 4–5 options.",
    },
  ],

  // ── Design notes ───────────────────────────────────────────────────────────
  designNotes: [
    "Checkbox is built on Base UI's Checkbox primitive — use the onCheckedChange callback not the native onChange.",
    "The checked state uses data-checked internally — the primary fill is applied by data-checked:bg-primary.",
    "Error styling is triggered by aria-invalid — no extra class or variant is needed.",
    "For row selection in DataTable, the Checkbox's aria-label should be \"Select row\" per accessibility constraints.",
  ],
}
