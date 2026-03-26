"use client"

import { Badge } from "@/components/ui/badge"
import {
  RiInformationLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiCloseCircleLine,
} from "@remixicon/react"
import type { ComponentDevDocData } from "../../component-doc-types"
import { TableExample } from "./design"

// ── Badge develop doc ─────────────────────────────────────────────────────────

export const badgeDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/badge",
    importPath: `import { Badge } from "@/components/ui/badge"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
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
}
