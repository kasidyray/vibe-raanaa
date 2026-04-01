"use client"

import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs"
import {
  RiUserLine,
  RiBankCardLine,
  RiSettingsLine,
  RiShieldLine,
  RiBarChartLine,
  RiFileTextLine,
  RiTeamLine,
  RiLayoutGridLine,
  RiListUnordered,
} from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ────────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2 w-full max-w-sm">
    <Tabs defaultValue="profile" className="w-full">
      <TabsList variant="default" className="w-fit">
        <TabsTab value="profile">Profile</TabsTab>
        <TabsTab value="billing">Billing</TabsTab>
        <TabsTab value="settings">Settings</TabsTab>
      </TabsList>
      <TabsPanel value="profile">
        <div className="mt-2 rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground">Panel content</div>
      </TabsPanel>
      <TabsPanel value="billing" />
      <TabsPanel value="settings" />
    </Tabs>
    <div className="flex items-start gap-8 text-center">
      {["① Tabs (root)", "② TabsList", "③ TabsTab", "④ Indicator", "⑤ TabsPanel"].map(label => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="h-5 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

// ── Variant previews ───────────────────────────────────────────────────────────

const DefaultVariantPreview = () => (
  <Tabs defaultValue="overview">
    <TabsList variant="default">
      <TabsTab value="overview">Overview</TabsTab>
      <TabsTab value="analytics">Analytics</TabsTab>
      <TabsTab value="reports">Reports</TabsTab>
    </TabsList>
  </Tabs>
)

const UnderlineVariantPreview = () => (
  <Tabs defaultValue="overview" className="w-full max-w-sm">
    <TabsList variant="underline">
      <TabsTab value="overview">Overview</TabsTab>
      <TabsTab value="analytics">Analytics</TabsTab>
      <TabsTab value="reports">Reports</TabsTab>
    </TabsList>
  </Tabs>
)

const PillVariantPreview = () => (
  <Tabs defaultValue="overview">
    <TabsList variant="pill">
      <TabsTab value="overview">Overview</TabsTab>
      <TabsTab value="analytics">Analytics</TabsTab>
      <TabsTab value="reports">Reports</TabsTab>
    </TabsList>
  </Tabs>
)

// ── State previews ─────────────────────────────────────────────────────────────

const WithIconsPreview = () => (
  <div className="flex flex-col gap-4">
    <Tabs defaultValue="profile">
      <TabsList variant="default">
        <TabsTab value="profile"><RiUserLine />Profile</TabsTab>
        <TabsTab value="billing"><RiBankCardLine />Billing</TabsTab>
        <TabsTab value="security"><RiShieldLine />Security</TabsTab>
      </TabsList>
    </Tabs>
    <Tabs defaultValue="profile">
      <TabsList variant="underline" className="w-full max-w-xs">
        <TabsTab value="profile"><RiUserLine />Profile</TabsTab>
        <TabsTab value="billing"><RiBankCardLine />Billing</TabsTab>
        <TabsTab value="security"><RiShieldLine />Security</TabsTab>
      </TabsList>
    </Tabs>
  </div>
)

const DisabledPreview = () => (
  <div className="flex flex-col gap-4">
    <Tabs defaultValue="active">
      <TabsList variant="default">
        <TabsTab value="active">Active</TabsTab>
        <TabsTab value="disabled" disabled>Disabled</TabsTab>
        <TabsTab value="other">Other</TabsTab>
      </TabsList>
    </Tabs>
    <Tabs defaultValue="active">
      <TabsList variant="underline" className="w-full max-w-xs">
        <TabsTab value="active">Active</TabsTab>
        <TabsTab value="disabled" disabled>Disabled</TabsTab>
        <TabsTab value="other">Other</TabsTab>
      </TabsList>
    </Tabs>
  </div>
)

const VerticalPreview = () => (
  <Tabs defaultValue="profile" orientation="vertical" className="w-full max-w-sm">
    <div className="border-r min-w-32">
      <TabsList variant="underline" className="p-2">
        <TabsTab value="profile">Profile</TabsTab>
        <TabsTab value="billing">Billing</TabsTab>
        <TabsTab value="security">Security</TabsTab>
        <TabsTab value="notifications">Notifications</TabsTab>
      </TabsList>
    </div>
    <div className="flex-1 pl-4">
      <TabsPanel value="profile">
        <p className="text-xs text-muted-foreground">Manage your name, email, and avatar.</p>
      </TabsPanel>
      <TabsPanel value="billing">
        <p className="text-xs text-muted-foreground">View invoices and manage payment methods.</p>
      </TabsPanel>
      <TabsPanel value="security">
        <p className="text-xs text-muted-foreground">Update your password and two-factor settings.</p>
      </TabsPanel>
      <TabsPanel value="notifications">
        <p className="text-xs text-muted-foreground">Control which emails and alerts you receive.</p>
      </TabsPanel>
    </div>
  </Tabs>
)

// ── Context example previews ───────────────────────────────────────────────────

const PageSectionTabsExample = () => (
  <div className="w-full rounded-xl border overflow-hidden">
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <p className="text-sm font-semibold">Analytics</p>
    </div>
    <div className="px-4">
      <Tabs defaultValue="traffic">
        <TabsList variant="underline" className="w-full">
          <TabsTab value="traffic">Traffic</TabsTab>
          <TabsTab value="revenue">Revenue</TabsTab>
          <TabsTab value="conversions">Conversions</TabsTab>
        </TabsList>
        <TabsPanel value="traffic">
          <div className="py-4 grid grid-cols-3 gap-3">
            {[
              { label: "Visitors", value: "24,821" },
              { label: "Page views", value: "91,340" },
              { label: "Bounce rate", value: "38%" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="text-sm font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </TabsPanel>
        <TabsPanel value="revenue">
          <div className="py-4 grid grid-cols-3 gap-3">
            {[
              { label: "Total revenue", value: "$84,200" },
              { label: "Avg. order", value: "$142" },
              { label: "Refunds", value: "1.2%" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="text-sm font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </TabsPanel>
        <TabsPanel value="conversions">
          <div className="py-4 grid grid-cols-3 gap-3">
            {[
              { label: "Conv. rate", value: "3.6%" },
              { label: "Sign-ups", value: "1,048" },
              { label: "Paid", value: "312" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="text-sm font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </TabsPanel>
      </Tabs>
    </div>
  </div>
)

const SettingsTabsExample = () => (
  <div className="w-full max-w-sm rounded-xl border overflow-hidden">
    <Tabs defaultValue="general" orientation="vertical">
      <div className="flex">
        <div className="border-r min-w-32">
          <TabsList variant="underline" className="p-3">
            <TabsTab value="general"><RiSettingsLine />General</TabsTab>
            <TabsTab value="team"><RiTeamLine />Team</TabsTab>
            <TabsTab value="billing"><RiBankCardLine />Billing</TabsTab>
            <TabsTab value="security"><RiShieldLine />Security</TabsTab>
          </TabsList>
        </div>
        <div className="flex-1 p-4">
          <TabsPanel value="general">
            <p className="text-sm font-medium mb-3">General settings</p>
            <div className="flex flex-col gap-2">
              {[0, 1, 2].map(i => (
                <div key={i} className="h-7 rounded-md bg-muted/40 border" />
              ))}
            </div>
          </TabsPanel>
          <TabsPanel value="team">
            <p className="text-sm font-medium mb-1">Team members</p>
            <p className="text-xs text-muted-foreground">Invite and manage access for your workspace.</p>
          </TabsPanel>
          <TabsPanel value="billing">
            <p className="text-sm font-medium mb-1">Billing</p>
            <p className="text-xs text-muted-foreground">Manage your plan, invoices, and payment details.</p>
          </TabsPanel>
          <TabsPanel value="security">
            <p className="text-sm font-medium mb-1">Security</p>
            <p className="text-xs text-muted-foreground">Update your password and configure two-factor auth.</p>
          </TabsPanel>
        </div>
      </div>
    </Tabs>
  </div>
)

const ContentFilterTabsExample = () => (
  <div className="w-full rounded-xl border overflow-hidden">
    <div className="px-4 pt-3">
      <Tabs defaultValue="all">
        <TabsList variant="pill">
          <TabsTab value="all">All</TabsTab>
          <TabsTab value="active">Active</TabsTab>
          <TabsTab value="pending">Pending</TabsTab>
          <TabsTab value="archived">Archived</TabsTab>
        </TabsList>
        <TabsPanel value="all">
          <div className="py-3 flex flex-col gap-2">
            {["Adaeze Okafor", "Emeka Nwachukwu", "Ngozi Achebe", "Chidi Okeke"].map(name => (
              <div key={name} className="flex items-center gap-3 py-1.5">
                <div className="size-7 rounded-full bg-primary/10 shrink-0" />
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-medium">{name}</span>
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
              </div>
            ))}
          </div>
        </TabsPanel>
        <TabsPanel value="active" />
        <TabsPanel value="pending" />
        <TabsPanel value="archived" />
      </Tabs>
    </div>
  </div>
)

// ── Do / Don't previews ────────────────────────────────────────────────────────

const DoConsistentLabelsPreview = () => (
  <Tabs defaultValue="overview">
    <TabsList variant="default">
      <TabsTab value="overview">Overview</TabsTab>
      <TabsTab value="activity">Activity</TabsTab>
      <TabsTab value="settings">Settings</TabsTab>
    </TabsList>
  </Tabs>
)

const DontLongLabelsPreview = () => (
  <div className="flex flex-col items-center gap-2">
    <Tabs defaultValue="overview">
      <TabsList variant="default">
        <TabsTab value="overview">Project Overview</TabsTab>
        <TabsTab value="activity">Recent Activity</TabsTab>
        <TabsTab value="settings">Account Settings</TabsTab>
      </TabsList>
    </Tabs>
    <p className="text-xs text-muted-foreground text-center">Labels should be 1–2 words</p>
  </div>
)

const DoVariantMatchContextPreview = () => (
  <div className="flex flex-col gap-3">
    <div>
      <p className="text-xs text-muted-foreground mb-1.5">Inside a card — use default</p>
      <Tabs defaultValue="a">
        <TabsList variant="default">
          <TabsTab value="a">Stats</TabsTab>
          <TabsTab value="b">Chart</TabsTab>
        </TabsList>
      </Tabs>
    </div>
    <div>
      <p className="text-xs text-muted-foreground mb-1.5">Full-width page section — use underline</p>
      <Tabs defaultValue="a" className="w-full max-w-xs">
        <TabsList variant="underline">
          <TabsTab value="a">Traffic</TabsTab>
          <TabsTab value="b">Revenue</TabsTab>
        </TabsList>
      </Tabs>
    </div>
  </div>
)

const DontMixVariantsPreview = () => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <Tabs defaultValue="a">
        <TabsList variant="default">
          <TabsTab value="a">Overview</TabsTab>
          <TabsTab value="b">Details</TabsTab>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="a" className="w-full">
        <TabsList variant="underline">
          <TabsTab value="a">Traffic</TabsTab>
          <TabsTab value="b">Revenue</TabsTab>
        </TabsList>
      </Tabs>
    </div>
    <p className="text-xs text-muted-foreground text-center">Don't mix variants on the same page</p>
  </div>
)

// ── Tabs design doc ────────────────────────────────────────────────────────────

export const tabsDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  // ── Overview ─────────────────────────────────────────────────────────────────
  overview: {
    what: "A set of labelled panels where only one is visible at a time, letting the user switch between related views without leaving the page.",
    why: "Tabs organise parallel content — like settings sections, data views, or profile pages — into a compact switchable surface instead of separate routes.",
    problem: "Showing all parallel content at once creates long, unwieldy pages. Separate routes add navigation overhead. Tabs give immediate switching without either cost.",
    appearsIn: [
      "Settings and account pages (Profile / Billing / Security)",
      "Analytics cards (Traffic / Revenue / Conversions)",
      "Detail drawers or sheets with multiple data sections",
      "Content list filters (All / Active / Pending / Archived)",
      "Documentation pages (Design / Develop)",
    ],
  },

  // ── Anatomy ──────────────────────────────────────────────────────────────────
  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Tabs (root)",
        description: "The root wrapper. Manages active tab state and passes orientation down to children.",
      },
      {
        name: "TabsList",
        description: "The row (or column) of tab buttons. Carries the variant prop that styles all child tabs and the animated indicator.",
      },
      {
        name: "TabsTab",
        description: "A single tab button. Receives its visual style from the parent TabsList variant via context. Supports icons, disabled state, and keyboard navigation.",
      },
      {
        name: "Indicator",
        description: "An animated underline or background that slides to the active tab. Internal to TabsList — no manual wiring needed.",
      },
      {
        name: "TabsPanel",
        description: "The content area shown when its matching tab is active. Hidden panels are unmounted, not just hidden.",
        optional: true,
      },
    ],
  },

  // ── Usage ─────────────────────────────────────────────────────────────────────
  whenToUse: [
    "Switching between 2–7 related views within the same page context.",
    "Settings pages where each tab represents a distinct configuration area.",
    "Detail drawers or cards where content is grouped into parallel sections.",
    "Content lists that can be filtered by a single mutually-exclusive category.",
  ],
  whenNotToUse: [
    "Navigation between different pages — use the Sidebar or a nav link.",
    "More than 7 tabs — too many to scan; use a Select or Sidebar nav instead.",
    "Stepwise flows where order matters — use a StepIndicator instead.",
    "Content that must be compared side by side — tabs hide one at a time; use a split layout instead.",
  ],

  // ── Variants ─────────────────────────────────────────────────────────────────
  variants: [
    {
      name: "Default",
      description: "Pill-shaped list with a floating background indicator that slides between tabs. Sits on a muted surface.",
      when: "Inside cards, compact surfaces, and toolbars where the tab list is not full-width.",
      preview: <DefaultVariantPreview />,
    },
    {
      name: "Underline",
      description: "Full-width row with a primary-coloured underline indicator. Sits on a bottom border.",
      when: "Page-level section tabs, analytics panels, and anywhere the tab list spans the content width.",
      preview: <UnderlineVariantPreview />,
    },
    {
      name: "Pill",
      description: "Individual pill buttons where the active tab inverts to a filled foreground background.",
      when: "Content filter rows (All / Active / Archived) and toggle-like selections.",
      preview: <PillVariantPreview />,
    },
  ],

  // ── States ────────────────────────────────────────────────────────────────────
  states: [
    {
      name: "With icons",
      description: "Icons can precede the label in any variant. Use consistently — either all tabs have icons or none do.",
      preview: <WithIconsPreview />,
    },
    {
      name: "Disabled tab",
      description: "A tab that cannot be selected. Rendered at reduced opacity with pointer-events removed.",
      preview: <DisabledPreview />,
    },
    {
      name: "Vertical orientation",
      description: "Tabs stack vertically when orientation='vertical' is set on Tabs. Wrap TabsList in a div with border-r rather than putting border-r directly on TabsList — this keeps the indicator positioning correct.",
      preview: <VerticalPreview />,
      fullWidth: true,
    },
  ],

  // ── Properties ────────────────────────────────────────────────────────────────
  properties: [
    {
      name: "defaultValue (Tabs)",
      values: "string",
      default: "—",
      description: "The value of the tab that is active by default in uncontrolled mode.",
    },
    {
      name: "value / onValueChange (Tabs)",
      values: "string / (value: string) => void",
      default: "—",
      description: "Controlled active tab state. Use when the parent needs to drive which tab is visible.",
    },
    {
      name: "orientation (Tabs)",
      values: "horizontal · vertical",
      default: "horizontal",
      description: "Switches the tab list and indicator from a row to a column. The panel renders beside the list in vertical mode.",
    },
    {
      name: "variant (TabsList)",
      values: "default · underline · pill",
      default: "default",
      description: "Sets the visual style for the entire tab list and its child tabs via context.",
    },
    {
      name: "value (TabsTab)",
      values: "string",
      default: "—",
      description: "Unique identifier that links a tab to its matching TabsPanel.",
    },
    {
      name: "disabled (TabsTab)",
      values: "true · false",
      default: "false",
      description: "Makes the tab non-interactive. It remains visible but cannot be activated.",
    },
    {
      name: "value (TabsPanel)",
      values: "string",
      default: "—",
      description: "Must match the corresponding TabsTab value. The panel renders only when its tab is active.",
    },
  ],

  // ── Content guidance ──────────────────────────────────────────────────────────
  contentGuidance: [
    {
      rule: "1–2 words per label",
      detail: "Short noun labels scan faster than phrases. Use 'Billing' not 'Billing settings'.",
    },
    {
      rule: "Sentence case",
      detail: "Write 'Overview' not 'OVERVIEW' or 'overview'.",
    },
    {
      rule: "Consistent icon usage",
      detail: "Either all tabs in a list have icons or none do — mixing icon and text-only tabs in the same list looks unbalanced.",
    },
    {
      rule: "Labels, not actions",
      detail: "Tab labels name the content inside the panel, not the action of switching. Use 'Activity' not 'View Activity'.",
    },
  ],

  // ── Behavior ─────────────────────────────────────────────────────────────────
  behavior: [
    "Only one tab can be active at a time. Clicking a tab activates it and hides all other panels.",
    "The animated Indicator slides smoothly between tabs using CSS transforms — no JavaScript animation needed.",
    "Keyboard: Arrow keys move focus between tabs. Enter or Space activates the focused tab. Home/End jump to first/last.",
    "TabsPanel content is unmounted when its tab is inactive — not just hidden with CSS. Heavy panels should handle remount gracefully.",
    "In vertical orientation, arrow keys switch to up/down navigation automatically.",
    "The variant prop on TabsList sets the visual style for all child TabsTab components via React context — no per-tab variant needed.",
  ],

  // ── Spacing ───────────────────────────────────────────────────────────────────
  spacing: [
    {
      rule: "Between TabsList and TabsPanel",
      detail: "gap-2 is applied by default on the Tabs root. Override with className if more space is needed.",
    },
    {
      rule: "Tab button padding",
      detail: "Default and pill tabs use px-2.5 py-1. Underline tabs use pb-3 with mr-6 between items for horizontal breathing room.",
    },
    {
      rule: "Icon gap",
      detail: "Icons inside TabsTab use gap-1.5 with -mx-0.5 to optically tighten the icon-to-label spacing.",
    },
    {
      rule: "Vertical orientation panel gap",
      detail: "In vertical mode, Tabs becomes flex-row. Add gap or pl on TabsPanel to offset from the list border.",
    },
  ],

  // ── Accessibility ─────────────────────────────────────────────────────────────
  accessibility: [
    {
      rule: "ARIA roles are automatic",
      detail: "Base UI wires role='tablist', role='tab', and role='tabpanel' — plus aria-selected and aria-controls — automatically. Do not add them manually.",
    },
    {
      rule: "Arrow key navigation",
      detail: "Horizontal tabs use Left/Right arrows; vertical tabs use Up/Down. This is built-in and must not be suppressed.",
    },
    {
      rule: "Disabled tabs remain visible",
      detail: "Don't hide disabled tabs — they help users understand the full scope of available views even when one is temporarily unavailable.",
    },
    {
      rule: "Tab value must be unique",
      detail: "Each TabsTab value must be unique within the same Tabs root — duplicates break the ARIA association between tab and panel.",
    },
  ],

  // ── Do & Don't ───────────────────────────────────────────────────────────────
  doItems: [
    {
      label: "Keep labels short — 1–2 words",
      description: "Short labels scan quickly and prevent the tab list from wrapping. Use nouns that name the content, not sentences.",
      preview: <DoConsistentLabelsPreview />,
    },
    {
      label: "Match the variant to the context",
      description: "Default for compact card surfaces. Underline for full-width page sections. Pill for content filters.",
      preview: <DoVariantMatchContextPreview />,
    },
  ],
  dontItems: [
    {
      label: "Don't use long phrase labels",
      description: "Phrase labels make the tab list hard to scan and cause layout issues at smaller widths.",
      preview: <DontLongLabelsPreview />,
    },
    {
      label: "Don't mix variants on the same page",
      description: "Using default tabs in one area and underline tabs in another creates visual inconsistency. Pick one variant per layout context.",
      preview: <DontMixVariantsPreview />,
    },
  ],

  // ── Examples in context ───────────────────────────────────────────────────────
  examplesInContext: [
    {
      title: "Analytics card with underline tabs",
      description: "Full-width underline tabs inside a bordered card switching between data views.",
      preview: <PageSectionTabsExample />,
      code: `<div className="rounded-xl border overflow-hidden">
  <div className="flex items-center justify-between px-4 py-3 border-b">
    <p className="text-sm font-semibold">Analytics</p>
  </div>
  <div className="px-4">
    <Tabs defaultValue="traffic">
      <TabsList variant="underline" className="w-full">
        <TabsTab value="traffic">Traffic</TabsTab>
        <TabsTab value="revenue">Revenue</TabsTab>
        <TabsTab value="conversions">Conversions</TabsTab>
      </TabsList>
      <TabsPanel value="traffic">
        {/* chart or table content */}
      </TabsPanel>
      <TabsPanel value="revenue">...</TabsPanel>
      <TabsPanel value="conversions">...</TabsPanel>
    </Tabs>
  </div>
</div>`,
    },
    {
      title: "Settings page with vertical tabs",
      description: "Vertical underline tabs act as a sidebar nav within a settings layout.",
      preview: <SettingsTabsExample />,
      code: `<Tabs defaultValue="general" orientation="vertical">
  <div className="flex">
    <div className="border-r min-w-36">
      <TabsList variant="underline" className="p-3">
        <TabsTab value="general"><RiSettingsLine />General</TabsTab>
        <TabsTab value="team"><RiTeamLine />Team</TabsTab>
        <TabsTab value="billing"><RiBankCardLine />Billing</TabsTab>
        <TabsTab value="security"><RiShieldLine />Security</TabsTab>
      </TabsList>
    </div>
    <div className="flex-1 p-6">
      <TabsPanel value="general">
        {/* General settings form */}
      </TabsPanel>
      <TabsPanel value="team">...</TabsPanel>
      <TabsPanel value="billing">...</TabsPanel>
      <TabsPanel value="security">...</TabsPanel>
    </div>
  </div>
</Tabs>`,
    },
    {
      title: "Content list filter with pill tabs",
      description: "Pill tabs as a filter row above a list — mutual exclusion with a visually strong active state.",
      preview: <ContentFilterTabsExample />,
      code: `<Tabs defaultValue="all">
  <TabsList variant="pill">
    <TabsTab value="all">All</TabsTab>
    <TabsTab value="active">Active</TabsTab>
    <TabsTab value="pending">Pending</TabsTab>
    <TabsTab value="archived">Archived</TabsTab>
  </TabsList>
  <TabsPanel value="all">
    {/* filtered list */}
  </TabsPanel>
  <TabsPanel value="active">...</TabsPanel>
  <TabsPanel value="pending">...</TabsPanel>
  <TabsPanel value="archived">...</TabsPanel>
</Tabs>`,
    },
  ],

  // ── Related ───────────────────────────────────────────────────────────────────
  relatedComponents: [
    {
      slug: "sidebar",
      name: "Sidebar",
      description: "Full app navigation panel.",
      when: "Use instead when destinations are separate pages, not sections of the same page.",
    },
    {
      slug: "select",
      name: "Select",
      description: "Dropdown for single-value selection.",
      when: "Use instead when there are more than 7 tabs or the label list is too wide to display inline.",
    },
    {
      slug: "breadcrumb",
      name: "Breadcrumb",
      description: "Path hierarchy indicator.",
      when: "Use instead when the user needs to navigate back up a hierarchy, not switch between parallel views.",
    },
  ],

  // ── Design notes ──────────────────────────────────────────────────────────────
  designNotes: [
    "The variant prop lives on TabsList, not on Tabs. All child TabsTab components inherit the variant automatically via React context.",
    "The Indicator is internal to TabsList and animates using CSS custom properties (--active-tab-width, --active-tab-left, etc.) — it requires no extra markup.",
    "TabsTab is also exported as TabsTrigger and TabsPanel as TabsContent for shadcn naming compatibility.",
    "In vertical orientation, the panel sits beside the list (flex-row). Wrap both in a flex div with a border-r on the list to achieve the settings layout.",
  ],
}
