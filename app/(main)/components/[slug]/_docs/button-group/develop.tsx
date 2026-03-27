"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ButtonGroup,
  ButtonGroupText,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"
import {
  RiListCheck,
  RiLayoutGridLine,
  RiTableLine,
  RiBold,
  RiItalic,
  RiUnderline,
  RiMapLine,
} from "@remixicon/react"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── View toggle example ───────────────────────────────────────────────────────

const ViewToggleExample = () => {
  const [view, setView] = React.useState<"list" | "grid" | "map">("list")
  return (
    <ButtonGroup aria-label="View mode">
      <Button variant={view === "list" ? "secondary" : "outline"} size="sm" onClick={() => setView("list")}><RiListCheck />List</Button>
      <Button variant={view === "grid" ? "secondary" : "outline"} size="sm" onClick={() => setView("grid")}><RiLayoutGridLine />Grid</Button>
      <Button variant={view === "map" ? "secondary" : "outline"} size="sm" onClick={() => setView("map")}><RiMapLine />Map</Button>
    </ButtonGroup>
  )
}

// ── ButtonGroup develop doc ───────────────────────────────────────────────────

export const buttonGroupDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
      "npx shadcn add @raana/button",
    ],
    command: "npx shadcn add @raana/button-group",
    importPath: `import { ButtonGroup, ButtonGroupText, ButtonGroupSeparator } from "@/components/ui/button-group"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "ButtonGroup fuses borders via CSS data-slot attributes — all children must use components that expose data-slot (Button, Input, Select, and other standard UI components already do this).",
    ],
  },

  basicUsage: `import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"

// Horizontal group (default)
<ButtonGroup aria-label="View options">
  <Button variant="outline">List</Button>
  <Button variant="outline">Grid</Button>
  <Button variant="outline">Table</Button>
</ButtonGroup>

// Vertical group
<ButtonGroup orientation="vertical" aria-label="View options">
  <Button variant="outline">List</Button>
  <Button variant="outline">Grid</Button>
  <Button variant="outline">Table</Button>
</ButtonGroup>

// With text prefix + input
import { ButtonGroupText } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"

<ButtonGroup aria-label="URL">
  <ButtonGroupText>https://</ButtonGroupText>
  <Input placeholder="yoursite.com" />
</ButtonGroup>`,

  codeExamples: [
    {
      title: "Horizontal group",
      description: "Three buttons fused side by side. The default orientation.",
      preview: (
        <ButtonGroup aria-label="View options">
          <Button variant="outline" size="sm"><RiListCheck />List</Button>
          <Button variant="outline" size="sm"><RiLayoutGridLine />Grid</Button>
          <Button variant="outline" size="sm"><RiTableLine />Table</Button>
        </ButtonGroup>
      ),
      code: `import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { RiListCheck, RiLayoutGridLine, RiTableLine } from "@remixicon/react"

<ButtonGroup aria-label="View options">
  <Button variant="outline" size="sm"><RiListCheck />List</Button>
  <Button variant="outline" size="sm"><RiLayoutGridLine />Grid</Button>
  <Button variant="outline" size="sm"><RiTableLine />Table</Button>
</ButtonGroup>`,
    },
    {
      title: "Vertical group",
      description: "Stacked orientation — top/bottom borders fused. Use for sidebar option lists.",
      preview: (
        <ButtonGroup orientation="vertical" aria-label="View options">
          <Button variant="outline" size="sm"><RiListCheck />List</Button>
          <Button variant="outline" size="sm"><RiLayoutGridLine />Grid</Button>
          <Button variant="outline" size="sm"><RiTableLine />Table</Button>
        </ButtonGroup>
      ),
      code: `<ButtonGroup orientation="vertical" aria-label="View options">
  <Button variant="outline" size="sm"><RiListCheck />List</Button>
  <Button variant="outline" size="sm"><RiLayoutGridLine />Grid</Button>
  <Button variant="outline" size="sm"><RiTableLine />Table</Button>
</ButtonGroup>`,
    },
    {
      title: "With separator",
      description: "ButtonGroupSeparator sub-divides a group into clusters without breaking border fusion.",
      preview: (
        <ButtonGroup aria-label="Text formatting">
          <Button variant="outline" size="sm"><RiBold /></Button>
          <Button variant="outline" size="sm"><RiItalic /></Button>
          <ButtonGroupSeparator />
          <Button variant="outline" size="sm"><RiUnderline /></Button>
        </ButtonGroup>
      ),
      code: `import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { RiBold, RiItalic, RiUnderline } from "@remixicon/react"

<ButtonGroup aria-label="Text formatting">
  <Button variant="outline" size="sm"><RiBold /></Button>
  <Button variant="outline" size="sm"><RiItalic /></Button>
  <ButtonGroupSeparator />
  <Button variant="outline" size="sm"><RiUnderline /></Button>
</ButtonGroup>`,
    },
    {
      title: "URL input with text prefix",
      description: "ButtonGroupText fused with an Input — the user only types the domain.",
      preview: (
        <ButtonGroup aria-label="Website URL">
          <ButtonGroupText>https://</ButtonGroupText>
          <Input placeholder="yoursite.com" className="min-w-52" />
        </ButtonGroup>
      ),
      code: `import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"

<ButtonGroup aria-label="Website URL">
  <ButtonGroupText>https://</ButtonGroupText>
  <Input placeholder="yoursite.com" />
</ButtonGroup>`,
    },
    {
      title: "View toggle with active state",
      description: "useState tracks the active view. The active button receives variant=\"secondary\" to appear selected.",
      preview: <ViewToggleExample />,
      code: `import { useState } from "react"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { RiListCheck, RiLayoutGridLine, RiMapLine } from "@remixicon/react"

function ViewToggle() {
  const [view, setView] = useState<"list" | "grid" | "map">("list")

  return (
    <ButtonGroup aria-label="View mode">
      <Button
        variant={view === "list" ? "secondary" : "outline"}
        size="sm"
        onClick={() => setView("list")}
      >
        <RiListCheck />
        List
      </Button>
      <Button
        variant={view === "grid" ? "secondary" : "outline"}
        size="sm"
        onClick={() => setView("grid")}
      >
        <RiLayoutGridLine />
        Grid
      </Button>
      <Button
        variant={view === "map" ? "secondary" : "outline"}
        size="sm"
        onClick={() => setView("map")}
      >
        <RiMapLine />
        Map
      </Button>
    </ButtonGroup>
  )
}`,
    },
  ],

  apiReference: [
    {
      name: "ButtonGroup — orientation",
      values: `"horizontal" | "vertical"`,
      default: `"horizontal"`,
      description: "Controls flex direction and which borders are fused between adjacent children.",
    },
    {
      name: "ButtonGroup — className",
      values: "string",
      default: "—",
      description: "Extra CSS classes applied to the group container.",
    },
    {
      name: "ButtonGroupText — children",
      values: "React.ReactNode",
      default: "—",
      description: "Static label content displayed inside the pill-shaped text element (e.g. \"$\", \"https://\", \"kg\").",
    },
    {
      name: "ButtonGroupText — render",
      values: "React.ReactElement | ((props, state) => React.ReactElement)",
      default: "—",
      description: "Base-UI render prop for customising the underlying element tag. Omit to use the default <div>.",
    },
    {
      name: "ButtonGroupSeparator — orientation",
      values: `"horizontal" | "vertical"`,
      default: `"vertical"`,
      description: "Separator orientation. Vertical draws a bar between horizontal items; horizontal draws a bar between stacked items.",
    },
  ],

  accessibility: [
    {
      rule: "ButtonGroup renders role=\"group\" — pair it with aria-label",
      detail: "The group role tells screen readers the children are related, but it has no automatic name. Always add aria-label=\"<purpose>\" (e.g. aria-label=\"View mode\") so the group is announced correctly.",
    },
    {
      rule: "Each button inside must have an accessible label",
      detail: "Text buttons are self-labelling. Icon-only buttons (no visible text) must include aria-label=\"<action>\" — the icon alone is not accessible.",
    },
    {
      rule: "ButtonGroupText is non-interactive — aria-hidden it if it duplicates an adjacent input label",
      detail: "If the surrounding form field already has a visible <label>, the ButtonGroupText prefix adds redundant context for screen readers. Add aria-hidden=\"true\" to the ButtonGroupText to suppress the duplicate announcement.",
    },
  ],
}
