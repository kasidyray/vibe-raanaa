"use client"

import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"
import { RiArrowRightSLine } from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ───────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="#" />}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="#" />}>Customers</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Adaeze Okoye</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div className="flex items-start gap-6 text-center flex-wrap justify-center">
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">① Nav wrapper</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">② List</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">③ Item + Link</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">④ Separator</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">⑤ Current page</span>
      </div>
    </div>
  </div>
)

// ── Variant previews ──────────────────────────────────────────────────────────

const BasicPathPreview = () => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink render={<Link href="#" />}>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink render={<Link href="#" />}>Customers</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Adaeze Okoye</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
)

const CollapsedPathPreview = () => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink render={<Link href="#" />}>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbEllipsis />
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink render={<Link href="#" />}>Reports</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Q1 2024 Summary</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
)

const CustomSeparatorPreview = () => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink render={<Link href="#" />}>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <RiArrowRightSLine className="size-4" />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink render={<Link href="#" />}>Settings</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <RiArrowRightSLine className="size-4" />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>Billing</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
)

// ── Example in context: Page header ──────────────────────────────────────────

export const PageHeaderExample = () => (
  <div className="rounded-xl border p-5 flex flex-col gap-1.5 max-w-md">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="#" />}>Customers</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Adaeze Okoye</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div className="flex flex-col gap-0.5 pt-1">
      <h2 className="text-lg font-semibold">Adaeze Okoye</h2>
      <p className="text-sm text-muted-foreground">adaeze@mtn.com · MTN Nigeria</p>
    </div>
  </div>
)

// ── Example in context: Detail drawer header ──────────────────────────────────

const DrawerHeaderExample = () => (
  <div className="rounded-xl border overflow-hidden max-w-sm">
    <div className="flex items-center justify-between px-5 py-3 border-b bg-muted/40">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="#" />}>Leads</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Emeka Nwachukwu</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">✕</button>
    </div>
    <div className="p-5">
      <p className="text-sm font-semibold">Emeka Nwachukwu</p>
      <p className="text-xs text-muted-foreground mt-0.5">emeka@access.com · Access Bank</p>
    </div>
  </div>
)

// ── Do / Don't previews ───────────────────────────────────────────────────────

const DoEllipsisPreview = () => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink render={<Link href="#" />}>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbEllipsis />
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink render={<Link href="#" />}>Analytics</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Detail</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
)

const DoCurrentPagePreview = () => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink render={<Link href="#" />}>Settings</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Billing</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
)

const DontTooManyPreview = () => (
  <div className="flex flex-col gap-2 items-start">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="#" />}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="#" />}>Workspace</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="#" />}>Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="#" />}>Reports</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Q1 Detail</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <p className="text-xs text-muted-foreground">5 items — collapse with BreadcrumbEllipsis</p>
  </div>
)

const DontTabNavPreview = () => (
  <div className="flex flex-col gap-2 items-start">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="#" />}>Overview</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="#" />}>Activity</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <p className="text-xs text-muted-foreground">Use Tabs for peer-level navigation instead</p>
  </div>
)

// ── Breadcrumb design doc ─────────────────────────────────────────────────────

export const breadcrumbDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  // ── Overview ─────────────────────────────────────────────────────────────
  overview: {
    what: "A hierarchical navigation trail that shows the user's current location within the app and allows them to step back to any ancestor level.",
    why: "Deep page hierarchies need an ambient orientation signal — users should always be able to tell where they are and how to go back without relying on the browser back button.",
    problem: "Without a breadcrumb, users in deeply nested views lose their sense of position and have no shortcut to jump back to a parent context, leading to disorientation and extra navigation steps.",
    appearsIn: [
      "Page headers on detail or sub-pages",
      "Drawer and sheet headers",
      "Settings sub-sections",
      "Document and record hierarchies",
      "Admin panel nested routes",
    ],
  },

  // ── Anatomy ──────────────────────────────────────────────────────────────
  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Nav wrapper (Breadcrumb)",
        description: "Semantic <nav> element with aria-label=\"breadcrumb\". Required outer wrapper.",
      },
      {
        name: "List (BreadcrumbList)",
        description: "<ol> with flex-wrap. Holds all items and separators in a horizontal row that wraps on narrow viewports.",
      },
      {
        name: "Item (BreadcrumbItem)",
        description: "<li> container for a single crumb. Wraps either a BreadcrumbLink or BreadcrumbPage.",
      },
      {
        name: "Link (BreadcrumbLink)",
        description: "Navigable ancestor. Uses the render prop to support any router (e.g., Next.js Link). Not used for the current page.",
      },
      {
        name: "Separator (BreadcrumbSeparator)",
        description: "Presentational divider between items. Defaults to \"/\". Accepts children to swap for an icon. Always aria-hidden.",
      },
      {
        name: "Current page (BreadcrumbPage)",
        description: "Non-navigable label for the active route. Has aria-current=\"page\" and aria-disabled=\"true\" set automatically.",
      },
      {
        name: "Ellipsis (BreadcrumbEllipsis)",
        description: "Collapses intermediate items in long paths. Renders a RiMoreLine icon. Presentational — aria-hidden.",
        optional: true,
      },
    ],
  },

  // ── Usage ────────────────────────────────────────────────────────────────
  whenToUse: [
    "The current page is more than one level deep in the app hierarchy.",
    "Users need to navigate back to a parent list or section quickly.",
    "A drawer or detail panel represents a record within a broader context.",
    "The route structure is hierarchical and users benefit from orientation cues.",
  ],
  whenNotToUse: [
    "Same-level navigation between sections — use Tabs instead.",
    "Top-level pages that have no parent context (Home, Dashboard).",
    "Simple two-step flows where a back button is clearer.",
    "Mobile-only interfaces where horizontal space is severely constrained.",
  ],

  // ── Variants ─────────────────────────────────────────────────────────────
  variants: [
    {
      name: "Basic path",
      description: "2–3 levels of hierarchy with no collapsing. The most common pattern for shallow routes.",
      when: "The path is 2–3 levels deep and all levels are useful to display.",
      preview: <BasicPathPreview />,
    },
    {
      name: "Collapsed path",
      description: "Intermediate items are hidden behind a BreadcrumbEllipsis. First and last items always remain visible.",
      when: "The path has 4 or more levels. Always keep the root and the current page visible.",
      preview: <CollapsedPathPreview />,
    },
    {
      name: "Custom separator",
      description: "An icon child is passed to BreadcrumbSeparator to replace the default \"/\" character.",
      when: "The visual style calls for a directional icon separator (e.g., RiArrowRightSLine).",
      preview: <CustomSeparatorPreview />,
    },
  ],

  // ── States ───────────────────────────────────────────────────────────────
  states: [
    {
      name: "Default",
      description: "Standard hierarchical path with link ancestors and a non-linked current page.",
      preview: <BasicPathPreview />,
    },
    {
      name: "With ellipsis (collapsed)",
      description: "Intermediate crumbs hidden. Reduces visual clutter on deep paths.",
      preview: <CollapsedPathPreview />,
    },
    {
      name: "Custom separator",
      description: "Icon used instead of the default \"/\" separator character.",
      preview: <CustomSeparatorPreview />,
    },
  ],

  // ── Properties ───────────────────────────────────────────────────────────
  properties: [
    {
      name: "BreadcrumbLink — render",
      values: "useRender.ComponentProps",
      default: "<a>",
      description: "Renders the link as the given element. Use render={<Link href=\"/path\" />} for Next.js client-side routing.",
    },
    {
      name: "BreadcrumbLink — href",
      values: "string",
      default: "—",
      description: "URL for the ancestor link. Pass directly when not using the render prop.",
    },
    {
      name: "BreadcrumbSeparator — children",
      values: "ReactNode",
      default: "\"/\"",
      description: "Replaces the default slash separator. Pass an icon element (e.g., <RiArrowRightSLine />) for a visual separator.",
    },
    {
      name: "BreadcrumbPage — aria-current",
      values: "\"page\"",
      default: "\"page\" (auto)",
      description: "Set automatically. Marks the current page for assistive technologies. Do not override.",
    },
  ],

  // ── Content guidance ─────────────────────────────────────────────────────
  contentGuidance: [
    {
      rule: "Keep paths to 4 levels maximum",
      detail: "Beyond 4 visible items the trail becomes hard to scan. Use BreadcrumbEllipsis to collapse middle levels.",
    },
    {
      rule: "Sentence case for all labels",
      detail: "\"Canned answers\", not \"CANNED ANSWERS\". Capitalise proper nouns only.",
    },
    {
      rule: "Avoid IDs in path labels",
      detail: "Use human-readable names (\"Adaeze Okoye\") not record identifiers (\"usr_0042\").",
    },
    {
      rule: "Collapse with ellipsis past 3 visible items",
      detail: "Show the root and the immediate parent of the current page — hide everything in between using BreadcrumbEllipsis.",
    },
  ],

  // ── Behavior ─────────────────────────────────────────────────────────────
  behavior: [
    "Items wrap on narrow viewports via flex-wrap on BreadcrumbList — no horizontal scroll.",
    "The current page (BreadcrumbPage) is not a link. It has aria-disabled and aria-current=\"page\" set automatically.",
    "BreadcrumbEllipsis collapses intermediate items — always keep the first (root) and last (current page) visible.",
    "BreadcrumbSeparator is role=\"presentation\" and aria-hidden — it is purely decorative and never carries content.",
    "BreadcrumbLink uses the render prop pattern (base-ui) — not asChild. Pass render={<Link href=\"...\" />} for Next.js.",
  ],

  // ── Spacing ──────────────────────────────────────────────────────────────
  spacing: [
    {
      rule: "Between crumbs",
      detail: "gap-1.5 is built into BreadcrumbList. Do not add external margin between items.",
    },
    {
      rule: "In a page header",
      detail: "Place directly above the page title with a gap of 4–6px (gap-1.5 or gap-2) between breadcrumb and h1.",
    },
    {
      rule: "In a drawer header",
      detail: "Align to the left edge of the drawer header padding. No extra vertical margin needed.",
    },
    {
      rule: "Separator spacing",
      detail: "Separator inherits the list gap. Do not add manual margins around it.",
    },
  ],

  // ── Accessibility ────────────────────────────────────────────────────────
  accessibility: [
    {
      rule: "Landmark navigation",
      detail: "Breadcrumb renders a <nav> with aria-label=\"breadcrumb\" automatically — no extra ARIA needed.",
    },
    {
      rule: "Current page marked",
      detail: "BreadcrumbPage receives aria-current=\"page\" and aria-disabled=\"true\" automatically. Never replicate this with a disabled BreadcrumbLink.",
    },
    {
      rule: "Separator is decorative",
      detail: "Separator is aria-hidden. Screen readers announce only the link labels, not the separator characters.",
    },
    {
      rule: "Keyboard navigation",
      detail: "All BreadcrumbLink elements are focusable in document order. The current page is not in the tab sequence (aria-disabled).",
    },
  ],

  // ── Do & Don't ───────────────────────────────────────────────────────────
  doItems: [
    {
      label: "Use BreadcrumbEllipsis for deeply nested paths",
      description: "Collapse intermediate items so the trail stays scannable. Always keep root and current page visible.",
      preview: <DoEllipsisPreview />,
    },
    {
      label: "Use BreadcrumbPage for the active route",
      description: "The current page should never be a link. BreadcrumbPage marks it with the correct ARIA attributes automatically.",
      preview: <DoCurrentPagePreview />,
    },
  ],
  dontItems: [
    {
      label: "Don't show more than 4 items without collapsing",
      description: "Long flat trails are hard to scan. Introduce BreadcrumbEllipsis to hide intermediate levels.",
      preview: <DontTooManyPreview />,
    },
    {
      label: "Don't use Breadcrumb for tab-style navigation",
      description: "Breadcrumb implies hierarchy. For switching between peer-level sections, use the Tabs component instead.",
      preview: <DontTabNavPreview />,
    },
  ],

  // ── Examples in context ──────────────────────────────────────────────────
  examplesInContext: [
    {
      title: "In a page header",
      description: "Placed above the page title to orient the user and link back to the parent list.",
      preview: <PageHeaderExample />,
      code: `<div className="flex flex-col gap-1.5">
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink render={<Link href="/customers" />}>Customers</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Adaeze Okoye</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
  <h1 className="text-xl font-semibold">Adaeze Okoye</h1>
  <p className="text-sm text-muted-foreground">adaeze@mtn.com · MTN Nigeria</p>
</div>`,
    },
    {
      title: "In a detail drawer header",
      description: "Shows which list the drawer record belongs to, with a link back to that list.",
      preview: <DrawerHeaderExample />,
      code: `<DrawerHeader className="flex flex-row items-center justify-between gap-4 border-b p-4 shrink-0">
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink render={<Link href="/leads" />}>Leads</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Emeka Nwachukwu</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
  <DrawerClose asChild>
    <Button variant="ghost" size="icon-sm" aria-label="Close">
      <RiCloseLine />
    </Button>
  </DrawerClose>
</DrawerHeader>`,
    },
  ],

  // ── Related components ───────────────────────────────────────────────────
  relatedComponents: [
    {
      slug: "tabs",
      name: "Tabs",
      description: "Switches between peer-level sections of the same resource.",
      when: "Navigation is between sibling views rather than hierarchical ancestor levels.",
    },
    {
      slug: "navigation",
      name: "Navigation",
      description: "Primary app-level navigation for moving between top-level routes.",
      when: "The user needs to navigate to a completely different section of the app.",
    },
  ],

  // ── Design notes ─────────────────────────────────────────────────────────
  designNotes: [
    "Separator is presentational — aria-hidden. Screen readers only announce the links, not the separator characters.",
    "The component renders a semantic <nav> landmark. Only one breadcrumb should appear per page view.",
    "BreadcrumbLink intentionally uses the render prop (not asChild) — this follows the base-ui pattern and keeps router integration explicit.",
  ],
}
