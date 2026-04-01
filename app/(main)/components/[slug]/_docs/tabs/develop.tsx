"use client"

import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs"
import {
  RiUserLine,
  RiBankCardLine,
  RiShieldLine,
  RiBarChartLine,
  RiFileTextLine,
  RiLayoutGridLine,
  RiListUnordered,
} from "@remixicon/react"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Previews ──────────────────────────────────────────────────────────────────

const UncontrolledPreview = () => (
  <Tabs defaultValue="overview" className="w-full max-w-xs">
    <TabsList variant="default">
      <TabsTab value="overview">Overview</TabsTab>
      <TabsTab value="analytics">Analytics</TabsTab>
      <TabsTab value="reports">Reports</TabsTab>
    </TabsList>
    <TabsPanel value="overview">
      <div className="mt-2 rounded-lg border border-dashed p-3 text-xs text-muted-foreground">Overview panel</div>
    </TabsPanel>
    <TabsPanel value="analytics">
      <div className="mt-2 rounded-lg border border-dashed p-3 text-xs text-muted-foreground">Analytics panel</div>
    </TabsPanel>
    <TabsPanel value="reports">
      <div className="mt-2 rounded-lg border border-dashed p-3 text-xs text-muted-foreground">Reports panel</div>
    </TabsPanel>
  </Tabs>
)

const UnderlinePreview = () => (
  <Tabs defaultValue="traffic" className="w-full max-w-xs">
    <TabsList variant="underline" className="w-full">
      <TabsTab value="traffic">Traffic</TabsTab>
      <TabsTab value="revenue">Revenue</TabsTab>
      <TabsTab value="conversions">Conversions</TabsTab>
    </TabsList>
    <TabsPanel value="traffic">
      <div className="mt-2 rounded-lg border border-dashed p-3 text-xs text-muted-foreground">Traffic data</div>
    </TabsPanel>
    <TabsPanel value="revenue" />
    <TabsPanel value="conversions" />
  </Tabs>
)

const WithIconsPreview = () => (
  <Tabs defaultValue="profile" className="w-full max-w-xs">
    <TabsList variant="default">
      <TabsTab value="profile"><RiUserLine />Profile</TabsTab>
      <TabsTab value="billing"><RiBankCardLine />Billing</TabsTab>
      <TabsTab value="security"><RiShieldLine />Security</TabsTab>
    </TabsList>
  </Tabs>
)

const DisabledPreview = () => (
  <Tabs defaultValue="active" className="w-full max-w-xs">
    <TabsList variant="default">
      <TabsTab value="active">Active</TabsTab>
      <TabsTab value="disabled" disabled>Disabled</TabsTab>
      <TabsTab value="other">Other</TabsTab>
    </TabsList>
  </Tabs>
)

const VerticalPreview = () => (
  <Tabs defaultValue="profile" orientation="vertical" className="w-full max-w-xs">
    <TabsList variant="underline" className="min-w-28">
      <TabsTab value="profile"><RiUserLine />Profile</TabsTab>
      <TabsTab value="billing"><RiBankCardLine />Billing</TabsTab>
      <TabsTab value="security"><RiShieldLine />Security</TabsTab>
    </TabsList>
    <TabsPanel value="profile">
      <div className="ml-4 rounded-lg border border-dashed p-3 text-xs text-muted-foreground">Profile settings</div>
    </TabsPanel>
    <TabsPanel value="billing" />
    <TabsPanel value="security" />
  </Tabs>
)

const PillPreview = () => (
  <Tabs defaultValue="all">
    <TabsList variant="pill">
      <TabsTab value="all">All</TabsTab>
      <TabsTab value="active">Active</TabsTab>
      <TabsTab value="pending">Pending</TabsTab>
      <TabsTab value="archived">Archived</TabsTab>
    </TabsList>
  </Tabs>
)

// ── Tabs develop doc ──────────────────────────────────────────────────────────

export const tabsDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/tabs",
    importPath: `import {
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
} from "@/components/ui/tabs"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "Tabs is built on @base-ui/react/tabs — no additional Radix primitives are needed.",
      "TabsTab is also exported as TabsTrigger and TabsPanel as TabsContent for shadcn naming compatibility.",
    ],
  },

  basicUsage: `import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs"

// Uncontrolled — active tab state is managed internally
<Tabs defaultValue="overview">
  <TabsList variant="default">
    <TabsTab value="overview">Overview</TabsTab>
    <TabsTab value="analytics">Analytics</TabsTab>
    <TabsTab value="reports">Reports</TabsTab>
  </TabsList>
  <TabsPanel value="overview">
    {/* panel content */}
  </TabsPanel>
  <TabsPanel value="analytics">...</TabsPanel>
  <TabsPanel value="reports">...</TabsPanel>
</Tabs>`,

  codeExamples: [
    {
      title: "Default variant (uncontrolled)",
      description: "The most common usage — pill indicator tabs with internal state managed by defaultValue.",
      preview: <UncontrolledPreview />,
      code: `<Tabs defaultValue="overview">
  <TabsList variant="default">
    <TabsTab value="overview">Overview</TabsTab>
    <TabsTab value="analytics">Analytics</TabsTab>
    <TabsTab value="reports">Reports</TabsTab>
  </TabsList>
  <TabsPanel value="overview">
    {/* Overview content */}
  </TabsPanel>
  <TabsPanel value="analytics">...</TabsPanel>
  <TabsPanel value="reports">...</TabsPanel>
</Tabs>`,
    },
    {
      title: "Underline variant",
      description: "Full-width underline indicator. Use for page-level section tabs that span the content width.",
      preview: <UnderlinePreview />,
      code: `<Tabs defaultValue="traffic">
  <TabsList variant="underline" className="w-full">
    <TabsTab value="traffic">Traffic</TabsTab>
    <TabsTab value="revenue">Revenue</TabsTab>
    <TabsTab value="conversions">Conversions</TabsTab>
  </TabsList>
  <TabsPanel value="traffic">
    {/* Traffic content */}
  </TabsPanel>
  <TabsPanel value="revenue">...</TabsPanel>
  <TabsPanel value="conversions">...</TabsPanel>
</Tabs>`,
    },
    {
      title: "Pill variant",
      description: "Individual pill buttons with an inverted active state. Use for content filter rows.",
      preview: <PillPreview />,
      code: `<Tabs defaultValue="all">
  <TabsList variant="pill">
    <TabsTab value="all">All</TabsTab>
    <TabsTab value="active">Active</TabsTab>
    <TabsTab value="pending">Pending</TabsTab>
    <TabsTab value="archived">Archived</TabsTab>
  </TabsList>
  <TabsPanel value="all">
    {/* All items */}
  </TabsPanel>
  <TabsPanel value="active">...</TabsPanel>
  <TabsPanel value="pending">...</TabsPanel>
  <TabsPanel value="archived">...</TabsPanel>
</Tabs>`,
    },
    {
      title: "Tabs with icons",
      description: "Place an icon before the label in TabsTab. Use consistently — all tabs should have icons or none should.",
      preview: <WithIconsPreview />,
      code: `import { RiUserLine, RiBankCardLine, RiShieldLine } from "@remixicon/react"

<Tabs defaultValue="profile">
  <TabsList variant="default">
    <TabsTab value="profile">
      <RiUserLine />
      Profile
    </TabsTab>
    <TabsTab value="billing">
      <RiBankCardLine />
      Billing
    </TabsTab>
    <TabsTab value="security">
      <RiShieldLine />
      Security
    </TabsTab>
  </TabsList>
</Tabs>`,
    },
    {
      title: "Disabled tab",
      description: "Pass disabled to any TabsTab to make it non-interactive. The tab remains visible at reduced opacity.",
      preview: <DisabledPreview />,
      code: `<Tabs defaultValue="active">
  <TabsList variant="default">
    <TabsTab value="active">Active</TabsTab>
    <TabsTab value="disabled" disabled>Disabled</TabsTab>
    <TabsTab value="other">Other</TabsTab>
  </TabsList>
</Tabs>`,
    },
    {
      title: "Vertical orientation",
      description: "Set orientation='vertical' on Tabs to stack the list and render panels beside it. Best paired with variant='underline'.",
      preview: <VerticalPreview />,
      code: `<Tabs defaultValue="profile" orientation="vertical">
  <TabsList variant="underline" className="min-w-36">
    <TabsTab value="profile">
      <RiUserLine />
      Profile
    </TabsTab>
    <TabsTab value="billing">
      <RiBankCardLine />
      Billing
    </TabsTab>
    <TabsTab value="security">
      <RiShieldLine />
      Security
    </TabsTab>
  </TabsList>
  <TabsPanel value="profile">
    {/* Profile settings panel */}
  </TabsPanel>
  <TabsPanel value="billing">...</TabsPanel>
  <TabsPanel value="security">...</TabsPanel>
</Tabs>`,
    },
    {
      title: "Controlled tabs",
      description: "Pass value and onValueChange to drive the active tab from parent state — useful when the URL, a route, or another component controls which tab is shown.",
      code: `"use client"
import { useState } from "react"
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs"

export function ControlledTabs() {
  const [tab, setTab] = useState("overview")

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList variant="default">
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="analytics">Analytics</TabsTab>
      </TabsList>
      <TabsPanel value="overview">
        {/* Overview content */}
      </TabsPanel>
      <TabsPanel value="analytics">...</TabsPanel>
    </Tabs>
  )
}`,
    },
  ],

  apiReference: [
    {
      name: "Tabs",
      values: "defaultValue?: string, value?: string, onValueChange?: (value: string) => void, orientation?: 'horizontal' | 'vertical'",
      default: "orientation=horizontal",
      description: "Root wrapper that manages active tab state. Use defaultValue for uncontrolled and value + onValueChange for controlled mode.",
    },
    {
      name: "TabsList",
      values: "variant?: 'default' | 'underline' | 'pill', className?: string",
      default: "variant=default",
      description: "The row (or column) of tab buttons. Sets the visual style for all child TabsTab components via React context. Also renders the animated Indicator internally.",
    },
    {
      name: "TabsTab",
      values: "value: string, disabled?: boolean, className?: string",
      default: "disabled=false",
      description: "A single tab button. Receives its variant from the parent TabsList context. Supports icons as children and keyboard navigation automatically.",
    },
    {
      name: "TabsPanel",
      values: "value: string, className?: string",
      default: "—",
      description: "Content area shown when its matching tab is active. Must have a value matching a TabsTab. Inactive panels are unmounted from the DOM.",
    },
    {
      name: "TabsTrigger (alias)",
      values: "Same as TabsTab",
      default: "—",
      description: "Re-export of TabsTab for shadcn naming compatibility. Prefer TabsTab in new code.",
    },
    {
      name: "TabsContent (alias)",
      values: "Same as TabsPanel",
      default: "—",
      description: "Re-export of TabsPanel for shadcn naming compatibility. Prefer TabsPanel in new code.",
    },
  ],

  accessibility: [
    {
      rule: "ARIA roles are automatic",
      detail: "Base UI wires role='tablist', role='tab', and role='tabpanel' — plus aria-selected and aria-controls — on all components automatically. Do not add them manually.",
    },
    {
      rule: "Arrow key navigation",
      detail: "Horizontal tabs use Left/Right arrows to move focus between tabs. Vertical tabs use Up/Down. This is built-in and must not be suppressed.",
    },
    {
      rule: "Home / End shortcuts",
      detail: "Home moves focus to the first tab; End moves to the last. These are provided by the base-ui primitive.",
    },
    {
      rule: "Tab values must be unique",
      detail: "Each TabsTab value must be unique within its Tabs root. Duplicate values break the ARIA association between tab and panel.",
    },
    {
      rule: "Keep disabled tabs visible",
      detail: "Don't hide disabled tabs with display:none. Disabled tabs should remain visible — they help users understand the full set of available views even when one is temporarily unavailable.",
    },
    {
      rule: "Panel unmounting",
      detail: "Inactive TabsPanel components are unmounted. If a panel has expensive initialisation (fetch on mount, animations) handle remounting gracefully, or persist state in the parent.",
    },
  ],
}
