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
import type { ComponentDevDocData } from "../../component-doc-types"
import { PageHeaderExample } from "./design"

// ── Breadcrumb develop doc ────────────────────────────────────────────────────

export const breadcrumbDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/breadcrumb",
    importPath: `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@/components/ui/breadcrumb"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "BreadcrumbLink uses the render prop pattern from base-ui — not asChild. To render as a Next.js Link, pass render={<Link href=\"/path\" />} as a prop.",
    ],
  },

  basicUsage: `import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

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
</Breadcrumb>`,

  codeExamples: [
    {
      title: "Basic path (3 levels)",
      description: "The standard pattern for a shallow 3-level hierarchy. All ancestor links are navigable; the current page is not.",
      preview: (
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
      ),
      code: `import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link href="/customers" />}>Customers</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Adaeze Okoye</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    },
    {
      title: "Collapsed with ellipsis",
      description: "Use BreadcrumbEllipsis to hide intermediate levels on deep paths. Always keep the root and the current page visible.",
      preview: (
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
      ),
      code: `import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    {/* Intermediate levels collapsed */}
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link href="/reports" />}>Reports</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Q1 2024 Summary</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    },
    {
      title: "Custom icon separator",
      description: "Pass an icon as children to BreadcrumbSeparator to replace the default \"/\" character.",
      preview: (
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
      ),
      code: `import Link from "next/link"
import { RiArrowRightSLine } from "@remixicon/react"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <RiArrowRightSLine className="size-4" />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link href="/settings" />}>Settings</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <RiArrowRightSLine className="size-4" />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>Billing</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    },
    {
      title: "In a page header",
      description: "Place the breadcrumb above the page title with a small gap. Gives users context and a shortcut back to the parent list.",
      preview: <PageHeaderExample />,
      code: `import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

<div className="flex flex-col gap-1.5">
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
  <div className="flex flex-col gap-0.5 pt-1">
    <h2 className="text-lg font-semibold">Adaeze Okoye</h2>
    <p className="text-sm text-muted-foreground">adaeze@mtn.com · MTN Nigeria</p>
  </div>
</div>`,
    },
  ],

  apiReference: [
    {
      name: "Breadcrumb",
      values: "HTML nav props",
      default: "—",
      description: "Outermost wrapper. Renders a <nav> element with aria-label=\"breadcrumb\". Accepts standard HTML nav attributes.",
    },
    {
      name: "BreadcrumbList",
      values: "HTML ol props",
      default: "—",
      description: "The <ol> list. Applies flex-wrap layout and muted foreground text. Accepts standard HTML ol attributes.",
    },
    {
      name: "BreadcrumbItem",
      values: "HTML li props",
      default: "—",
      description: "Each crumb container. Inline-flex with gap-1.5. Wrap one BreadcrumbLink, BreadcrumbPage, or BreadcrumbEllipsis per item.",
    },
    {
      name: "BreadcrumbLink — render",
      values: "useRender.ComponentProps",
      default: "<a>",
      description: "Renders the link element. Pass render={<Link href=\"/path\" />} for Next.js client-side routing. Do not use asChild.",
    },
    {
      name: "BreadcrumbPage",
      values: "HTML span props",
      default: "—",
      description: "Non-navigable label for the current route. Sets aria-current=\"page\" and aria-disabled=\"true\" automatically.",
    },
    {
      name: "BreadcrumbSeparator — children",
      values: "ReactNode",
      default: "\"/\"",
      description: "Replaces the default slash with a custom element (e.g., an icon). The separator is always aria-hidden.",
    },
    {
      name: "BreadcrumbEllipsis",
      values: "HTML span props",
      default: "—",
      description: "Renders a RiMoreLine icon to represent collapsed intermediate items. Includes a visually hidden \"More\" label for screen readers.",
    },
  ],

  accessibility: [
    {
      rule: "nav landmark with aria-label",
      detail: "Breadcrumb renders <nav aria-label=\"breadcrumb\"> automatically. Screen readers announce it as a named navigation landmark — no extra ARIA needed.",
    },
    {
      rule: "Current page state",
      detail: "BreadcrumbPage sets aria-current=\"page\" and aria-disabled=\"true\" automatically. Never represent the current page with a disabled BreadcrumbLink.",
    },
    {
      rule: "Separator and ellipsis are decorative",
      detail: "BreadcrumbSeparator and BreadcrumbEllipsis are aria-hidden. Screen readers skip them entirely and only announce the navigable link labels.",
    },
    {
      rule: "Client-side routing with render prop",
      detail: "Use BreadcrumbLink render={<Link href=\"/path\" />} for Next.js to keep navigation keyboard-accessible and avoid full page reloads. Never use plain <a> tags inside BreadcrumbLink for internal routes.",
    },
  ],
}
