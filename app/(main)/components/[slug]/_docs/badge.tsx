"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  RiInformationLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiCloseCircleLine,
} from "@remixicon/react"
import type { ComponentDocData } from "../component-doc-types"

// ── Anatomy preview ───────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    <Badge variant="info" icon={<RiInformationLine />} size="lg">
      Label text
    </Badge>
    <div className="flex items-start gap-10 text-center">
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">① Container</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">② Icon</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">③ Label</span>
      </div>
    </div>
  </div>
)

// ── Example in context: Data table ────────────────────────────────────────────

const TableExample = () => (
  <div className="rounded-xl border overflow-hidden text-sm">
    <div className="grid grid-cols-[1fr_100px_100px] gap-4 px-4 py-2 border-b bg-muted/50">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">User</p>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Role</p>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Plan</p>
    </div>
    {[
      { name: "Adaeze Okoye", email: "adaeze@mtn.com", role: "Admin", plan: "Pro", roleV: "info" as const, planV: "success" as const },
      { name: "Emeka Nwachukwu", email: "emeka@mtn.com", role: "Member", plan: "Free", roleV: "neutral" as const, planV: "neutral" as const },
      { name: "Ngozi Achebe", email: "ngozi@mtn.com", role: "Owner", plan: "Enterprise", roleV: "caution" as const, planV: "info" as const },
    ].map(row => (
      <div key={row.name} className="grid grid-cols-[1fr_100px_100px] gap-4 items-center px-4 py-3 border-b last:border-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar className="size-7 rounded-full shrink-0">
            <AvatarImage src={`https://api.dicebear.com/9.x/micah/svg?seed=${row.name.split(" ")[0]}`} alt={row.name} />
            <AvatarFallback>{row.name[0]}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{row.name}</p>
            <p className="text-xs text-muted-foreground truncate">{row.email}</p>
          </div>
        </div>
        <Badge variant={row.roleV} size="sm">{row.role}</Badge>
        <Badge variant={row.planV} size="sm">{row.plan}</Badge>
      </div>
    ))}
  </div>
)

// ── Example in context: Profile card ─────────────────────────────────────────

const ProfileCardExample = () => (
  <div className="rounded-xl border overflow-hidden max-w-xs">
    <div className="flex items-center gap-3 p-4 border-b">
      <Avatar className="size-10 rounded-full shrink-0">
        <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Ikedi" alt="Ikedi Eze" />
        <AvatarFallback>I</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="text-sm font-semibold">Ikedi Eze</p>
        <p className="text-xs text-muted-foreground truncate">kasidyray@gmail.com</p>
      </div>
    </div>
    <div className="p-4 flex flex-col gap-3">
      {[
        { label: "Role", value: "Owner", variant: "caution" as const },
        { label: "Plan", value: "Enterprise", variant: "info" as const },
        { label: "Access", value: "Full access", variant: "success" as const },
      ].map(row => (
        <div key={row.label} className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{row.label}</span>
          <Badge variant={row.variant} size="sm">{row.value}</Badge>
        </div>
      ))}
    </div>
  </div>
)

// ── Example in context: Categorised list ─────────────────────────────────────

const CategorisedListExample = () => (
  <div className="rounded-xl border overflow-hidden">
    {[
      { title: "Automated welcome email", type: "System", variant: "neutral" as const },
      { title: "Trial expiry reminder", type: "Marketing", variant: "info" as const },
      { title: "Invoice payment failed", type: "Billing", variant: "critical" as const },
      { title: "Feature announcement", type: "Product", variant: "success" as const },
      { title: "Upcoming maintenance", type: "Ops", variant: "warning" as const },
    ].map((item, i) => (
      <div key={i} className="flex items-center justify-between px-4 py-3 border-b last:border-0">
        <p className="text-sm">{item.title}</p>
        <Badge variant={item.variant} size="sm">{item.type}</Badge>
      </div>
    ))}
  </div>
)

// ── Do / Don't previews ───────────────────────────────────────────────────────

const DoSemanticPreview = () => (
  <div className="flex flex-wrap gap-2 justify-center">
    <Badge variant="success" icon={<RiCheckboxCircleLine />}>Verified</Badge>
    <Badge variant="critical" icon={<RiCloseCircleLine />}>Rejected</Badge>
    <Badge variant="warning">Expiring</Badge>
  </div>
)

const DoShortPreview = () => (
  <div className="flex flex-wrap gap-2 justify-center">
    <Badge variant="info">Admin</Badge>
    <Badge variant="caution">In review</Badge>
    <Badge variant="neutral">Inactive</Badge>
  </div>
)

const DoIconPreview = () => (
  <div className="flex flex-wrap gap-2 justify-center">
    <Badge variant="success" icon={<RiCheckboxCircleLine />}>Approved</Badge>
    <Badge variant="info" icon={<RiInformationLine />}>Pro plan</Badge>
    <Badge variant="warning" icon={<RiErrorWarningLine />}>Expiring</Badge>
  </div>
)

const DontStatusPreview = () => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex gap-2">
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="critical">Failed</Badge>
    </div>
    <p className="text-xs text-muted-foreground text-center">Use StatusBadge for live states</p>
  </div>
)

const DontAllCapsPreview = () => (
  <div className="flex flex-wrap gap-2 justify-center">
    <Badge variant="info">ENTERPRISE PLAN</Badge>
    <Badge variant="success">VERIFIED USER</Badge>
  </div>
)

const DontOverstackPreview = () => (
  <div className="flex flex-col gap-2 items-center">
    <div className="flex flex-wrap gap-1.5 justify-center max-w-56">
      <Badge variant="info" size="sm">Admin</Badge>
      <Badge variant="success" size="sm">Pro</Badge>
      <Badge variant="caution" size="sm">In review</Badge>
      <Badge variant="neutral" size="sm">Inactive</Badge>
      <Badge variant="critical" size="sm">Blocked</Badge>
      <Badge variant="warning" size="sm">Expiring</Badge>
    </div>
    <p className="text-xs text-muted-foreground text-center">Too many badges in one place</p>
  </div>
)

// ── Full badge doc data ───────────────────────────────────────────────────────

export const badgeDoc: ComponentDocData = {
  // ── Overview ───────────────────────────────────────────────────────────────
  overview: {
    what: "A compact, coloured pill label used to classify, tag, or describe an item with a brief word or short phrase.",
    why: "Teams need a quick visual system to communicate the category, type, or classification of an item without requiring users to read lengthy descriptions.",
    problem: "Without visual classification labels, users must read every row or card in full to understand the nature of each item — slowing down scanning and decision-making.",
    appearsIn: [
      "Data tables",
      "User profile cards",
      "Detail drawers",
      "List items",
      "Notification feeds",
      "Inline with headings",
    ],
  },

  // ── Anatomy ────────────────────────────────────────────────────────────────
  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Container",
        description: "Pill-shaped wrapper. Carries the background colour, border-radius, and padding.",
      },
      {
        name: "Icon",
        description: "Small leading icon. Fixed internal size — don't add size props.",
        optional: true,
      },
      {
        name: "Label",
        description: "Short text inside the pill. 1–3 words. Font size scales with the size variant.",
      },
    ],
  },

  // ── Usage ──────────────────────────────────────────────────────────────────
  whenToUse: [
    "Category, type, or tier labels — Role: Admin, Plan: Pro, Type: System.",
    "Fixed classifications that don't change based on live state.",
    "Multiple attributes on a single record in a table or card.",
    "Segment or feature membership across a list.",
  ],
  whenNotToUse: [
    "Live status (Active, Pending, Failed) — use StatusBadge.",
    "Numbers or counts — use a counter chip.",
    "Labels longer than 3–4 words — use plain text.",
    "Anything interactive — Badge is display-only. Use Button.",
  ],

  // ── Variants ───────────────────────────────────────────────────────────────
  variants: [
    {
      name: "Info",
      description: "Blue. Neutral — no positive or negative weight. Use for plans, roles, feature flags.",
      when: "Plan names, feature flags, role types, general categories.",
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="info">Pro plan</Badge>
          <Badge variant="info" icon={<RiInformationLine />}>Beta feature</Badge>
        </div>
      ),
    },
    {
      name: "Success",
      description: "Green. Positive or approved classifications — verified, premium, accepted.",
      when: "Verified, approved, premium, completed, paid states used as fixed categories.",
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="success">Verified</Badge>
          <Badge variant="success" icon={<RiCheckboxCircleLine />}>Approved</Badge>
        </div>
      ),
    },
    {
      name: "Warning",
      description: "Amber. Needs attention but not yet critical — expiring, limited, at-risk.",
      when: "Expiring, limited, at-risk, or time-sensitive classifications.",
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="warning">Expiring soon</Badge>
          <Badge variant="warning" icon={<RiErrorWarningLine />}>Limited</Badge>
        </div>
      ),
    },
    {
      name: "Critical",
      description: "Red. Severe or failed classifications — blocked, overdue, rejected.",
      when: "Blocked, overdue, declined, or rejected categories on records.",
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="critical">Overdue</Badge>
          <Badge variant="critical" icon={<RiCloseCircleLine />}>Rejected</Badge>
        </div>
      ),
    },
    {
      name: "Neutral",
      description: "Gray. No semantic weight — inactive, unknown, archived, unassigned.",
      when: "Inactive, archived, unknown, or unassigned categories.",
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="neutral">Inactive</Badge>
          <Badge variant="neutral">Unassigned</Badge>
        </div>
      ),
    },
    {
      name: "Caution",
      description: "Orange. Elevated attention without urgency — in review, escalated, pending.",
      when: "In review, pending approval, escalated, or awaiting input categories.",
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="caution">In review</Badge>
          <Badge variant="caution">Escalated</Badge>
        </div>
      ),
    },
  ],

  // ── States ─────────────────────────────────────────────────────────────────
  states: [
    {
      name: "Default",
      description: "Label only. The base configuration for most contexts.",
      preview: <Badge variant="info">Label</Badge>,
    },
    {
      name: "With icon",
      description: "Leading icon for visual reinforcement. Helps scanning in dense lists.",
      preview: <Badge variant="info" icon={<RiInformationLine />}>Label</Badge>,
    },
    {
      name: "Small",
      description: "For table cells and tight layouts.",
      preview: (
        <div className="flex gap-2">
          <Badge variant="info" size="sm">Label</Badge>
          <Badge variant="success" size="sm">Label</Badge>
        </div>
      ),
    },
    {
      name: "Large",
      description: "For profile headers, cards, and prominent display contexts.",
      preview: (
        <div className="flex gap-2">
          <Badge variant="info" size="lg">Label</Badge>
          <Badge variant="caution" size="lg">Label</Badge>
        </div>
      ),
    },
  ],

  // ── Properties ─────────────────────────────────────────────────────────────
  properties: [
    {
      name: "variant",
      values: "info · success · warning · critical · neutral · caution",
      default: "info",
      description: "Semantic tone. Controls background, text, and icon colour. Choose by meaning.",
    },
    {
      name: "size",
      values: "sm · default · lg",
      default: "default",
      description: "Scale. Use sm in tables, lg in headers and cards. Pill shape always maintained.",
    },
    {
      name: "icon",
      values: "React element (RemixIcon)",
      default: "—",
      description: "Optional leading icon. Badge handles sizing — don't add size props to the icon.",
    },
  ],

  // ── Content guidance ───────────────────────────────────────────────────────
  contentGuidance: [
    {
      rule: "1–3 words max",
      detail: "Shorter labels scan faster. More than 4 words → use plain text.",
    },
    {
      rule: "Sentence case",
      detail: "\"In review\", not \"IN REVIEW\". Proper nouns are exceptions.",
    },
    {
      rule: "No punctuation",
      detail: "The pill shape provides boundary — no periods or commas needed.",
    },
    {
      rule: "Icons reinforce, don't repeat",
      detail: "An icon should add meaning alongside the text, not duplicate it.",
    },
  ],

  // ── Behavior ───────────────────────────────────────────────────────────────
  behavior: [
    "Display-only. No hover, click, focus, or keyboard events.",
    "Text truncates when the parent is too narrow.",
    "Icon size is fixed internally — don't pass size props to the icon.",
    "Width grows with the label. No fixed width.",
  ],

  // ── Spacing ────────────────────────────────────────────────────────────────
  spacing: [
    {
      rule: "Between badges",
      detail: "gap-1.5 or gap-2 side by side.",
    },
    {
      rule: "In table cells",
      detail: "No external margin — cell padding provides spacing.",
    },
    {
      rule: "Near text",
      detail: "gap-2 inline. Don't place flush against paragraph text.",
    },
    {
      rule: "Max per cell",
      detail: "3–4 badges max. Use +N overflow for more.",
    },
  ],

  // ── Accessibility ──────────────────────────────────────────────────────────
  accessibility: [
    {
      rule: "Colour + text always",
      detail: "Colour alone is never enough. The text label is required.",
    },
    {
      rule: "No keyboard focus",
      detail: "Display-only. Do not make Badge interactive.",
    },
    {
      rule: "Context for critical labels",
      detail: "When the badge is the only indicator, add aria-label to the parent.",
    },
    {
      rule: "Contrast",
      detail: "All variants meet WCAG AA. Don't override badge colours.",
    },
  ],

  // ── Do & Don't ─────────────────────────────────────────────────────────────
  doItems: [
    {
      label: "Use semantically matching tones",
      description: "Choose the variant by meaning, not by colour preference.",
      preview: <DoSemanticPreview />,
    },
    {
      label: "Keep labels short and scannable",
      description: "1–3 words. Shorter labels scan faster in dense lists.",
      preview: <DoShortPreview />,
    },
    {
      label: "Use icons to reinforce meaning",
      description: "A well-chosen icon speeds up recognition, especially in long lists.",
      preview: <DoIconPreview />,
    },
  ],
  dontItems: [
    {
      label: "Don't use Badge for live status",
      description: "Active, Pending, Failed change over time. Use StatusBadge.",
      preview: <DontStatusPreview />,
    },
    {
      label: "Don't write labels in all caps",
      description: "All caps reduces readability and breaks sentence case conventions.",
      preview: <DontAllCapsPreview />,
    },
    {
      label: "Don't overstack badges in one place",
      description: "More than 3–4 in one place is hard to scan. Group or use +N overflow.",
      preview: <DontOverstackPreview />,
    },
  ],

  // ── Examples in context ────────────────────────────────────────────────────
  examplesInContext: [
    {
      title: "In a data table",
      description: "Role and plan tier badges alongside user details. Small size keeps rows compact.",
      preview: <TableExample />,
    },
    {
      title: "In a profile or detail card",
      description: "Multiple attributes side-by-side in a detail layout.",
      preview: <ProfileCardExample />,
    },
    {
      title: "Categorising a list",
      description: "Category type shown at a glance without reading every row.",
      preview: <CategorisedListExample />,
    },
  ],

  // ── Related components ─────────────────────────────────────────────────────
  relatedComponents: [
    {
      slug: "status-badge",
      name: "Status Badge",
      description: "Bordered pill with a coloured dot indicator for live or dynamic status.",
      when: "The state is live and changes over time — Active, Pending, Failed.",
    },
    {
      slug: "icon-badge",
      name: "Icon Badge",
      description: "Square icon container in semantic colours. No text label.",
      when: "You need a standalone icon indicator without a text label.",
    },
    {
      slug: "button",
      name: "Button",
      description: "Trigger actions and navigation.",
      when: "The element needs to be interactive or trigger an action.",
    },
  ],

  // ── Design notes ───────────────────────────────────────────────────────────
  designNotes: [
    "Maps directly to the Badge component — no wrappers needed.",
    "All six tone variants correspond to design tokens: info, success, warning, critical, neutral, caution. What you use in Figma translates directly to code.",
    "Size variants scale proportionally. Pill shape is always maintained — no corner radius overrides needed in Figma.",
  ],

  // ── Developer documentation ────────────────────────────────────────────────
  devDoc: {
    installation: {
      prerequisites: [
        "npx shadcn add @raana/mtn-tokens",
        "npx shadcn add @raana/utils",
      ],
      command: "npx shadcn add @raana/badge",
      importPath: `import { Badge } from "@/components/ui/badge"`,
      notes: [
        "Icon support uses @remixicon/react — install it if not already in your project: npm install @remixicon/react",
      ],
    },

    basicUsage: `import { Badge } from "@/components/ui/badge"
import { RiCheckboxCircleLine } from "@remixicon/react"

// Label only
<Badge variant="info">Pro plan</Badge>

// With icon
<Badge variant="success" icon={<RiCheckboxCircleLine />}>Verified</Badge>

// Small — for table cells
<Badge variant="neutral" size="sm">Inactive</Badge>`,

    codeExamples: [
      {
        title: "All variants",
        description: "The six semantic colour variants. Choose by meaning, not colour.",
        preview: (
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="info">Info</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="critical">Critical</Badge>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="caution">Caution</Badge>
          </div>
        ),
        code: `<Badge variant="info">Info</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="critical">Critical</Badge>
<Badge variant="neutral">Neutral</Badge>
<Badge variant="caution">Caution</Badge>`,
      },
      {
        title: "With icons",
        description: "Pass any RemixIcon element as the icon prop. Badge handles sizing — don't add size props to the icon.",
        preview: (
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="success" icon={<RiCheckboxCircleLine />}>Verified</Badge>
            <Badge variant="info" icon={<RiInformationLine />}>Beta feature</Badge>
            <Badge variant="warning" icon={<RiErrorWarningLine />}>Expiring</Badge>
            <Badge variant="critical" icon={<RiCloseCircleLine />}>Rejected</Badge>
          </div>
        ),
        code: `import {
  RiCheckboxCircleLine,
  RiInformationLine,
  RiErrorWarningLine,
  RiCloseCircleLine,
} from "@remixicon/react"

<Badge variant="success" icon={<RiCheckboxCircleLine />}>Verified</Badge>
<Badge variant="info" icon={<RiInformationLine />}>Beta feature</Badge>
<Badge variant="warning" icon={<RiErrorWarningLine />}>Expiring</Badge>
<Badge variant="critical" icon={<RiCloseCircleLine />}>Rejected</Badge>`,
      },
      {
        title: "Size variants",
        description: "Use sm in table cells, lg in headers and profile cards.",
        preview: (
          <div className="flex items-center gap-3">
            <Badge variant="info" size="sm">Small</Badge>
            <Badge variant="info">Default</Badge>
            <Badge variant="info" size="lg">Large</Badge>
          </div>
        ),
        code: `<Badge variant="info" size="sm">Small</Badge>
<Badge variant="info">Default</Badge>
<Badge variant="info" size="lg">Large</Badge>`,
      },
      {
        title: "In a data table row",
        description: "Pair with a fixed-width grid so columns align across rows.",
        preview: <TableExample />,
        code: `<div className="grid grid-cols-[1fr_100px_100px] gap-4 px-4 py-3">
  <UserCell />
  <Badge variant="info" size="sm">Admin</Badge>
  <Badge variant="success" size="sm">Pro</Badge>
</div>`,
      },
    ],

    apiReference: [
      {
        name: "variant",
        values: `"info" | "success" | "warning" | "critical" | "neutral" | "caution"`,
        default: `"info"`,
        description: "Semantic colour tone. Always choose by meaning — never override with a custom colour.",
      },
      {
        name: "size",
        values: `"sm" | "default" | "lg"`,
        default: `"default"`,
        description: "Scale. sm for table cells, lg for headers and cards.",
      },
      {
        name: "icon",
        values: "React.ReactNode",
        default: "—",
        description: "Optional leading icon. Pass a RemixIcon element. Badge controls sizing internally.",
      },
      {
        name: "className",
        values: "string",
        default: "—",
        description: "Extra CSS classes. Avoid overriding colour tokens.",
      },
      {
        name: "children",
        values: "React.ReactNode",
        default: "—",
        description: "The badge label. Keep to 1–3 words.",
      },
    ],

    accessibility: [
      {
        rule: "Never interactive",
        detail: "Badge has no role, tabIndex, or event handlers. For interactive labels, use Button.",
      },
      {
        rule: "Colour is supplementary",
        detail: "Never rely on colour alone. The text label must convey the same meaning independently.",
      },
      {
        rule: "Screen reader context",
        detail: "When a badge is the primary row indicator, add aria-label to the parent: <tr aria-label=\"Role: Admin\">.",
      },
      {
        rule: "Don't override token colours",
        detail: "All variants are pre-tested for WCAG AA contrast. Custom overrides break this guarantee.",
      },
    ],
  },
}
