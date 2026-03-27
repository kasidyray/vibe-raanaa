"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  RiArrowRightLine,
  RiDownloadLine,
  RiLineChartLine,
  RiMoreLine,
} from "@remixicon/react"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Card develop doc ──────────────────────────────────────────────────────────

export const cardDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/card",
    importPath: `import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "@/components/ui/card"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "The size prop is set once on Card and cascades automatically through CardHeader, CardTitle, CardContent, and CardFooter — no need to pass it to child components.",
    ],
  },

  basicUsage: `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

// Minimal card with header and content
<Card>
  <CardHeader>
    <CardTitle>Monthly revenue</CardTitle>
    <CardDescription>Compared to last month.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">Body content goes here.</p>
  </CardContent>
</Card>`,

  codeExamples: [
    {
      title: "Header only",
      description: "A minimal card with just CardHeader — useful for label-style panels and settings section headers.",
      preview: (
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Workspace settings</CardTitle>
              <CardDescription>Manage your workspace name, logo, and timezone.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      ),
      code: `<Card>
  <CardHeader>
    <CardTitle>Workspace settings</CardTitle>
    <CardDescription>Manage your workspace name, logo, and timezone.</CardDescription>
  </CardHeader>
</Card>`,
    },
    {
      title: "With CardAction",
      description: "Place CardAction inside CardHeader to auto-position a button or menu to the top-right of the header grid.",
      preview: (
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Team members</CardTitle>
              <CardDescription>Manage access for your workspace.</CardDescription>
              <CardAction>
                <Button variant="outline" size="sm">
                  <RiMoreLine />
                  Options
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Amara" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Kofi" />
                  <AvatarFallback>K</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Zara" />
                  <AvatarFallback>Z</AvatarFallback>
                </Avatar>
                <p className="text-sm text-muted-foreground ml-1">3 members · 1 pending</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
      code: `<Card>
  <CardHeader>
    <CardTitle>Team members</CardTitle>
    <CardDescription>Manage access for your workspace.</CardDescription>
    <CardAction>
      <Button variant="outline" size="sm">
        <RiMoreLine />
        Options
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <div className="flex items-center gap-2">
      <Avatar size="sm">
        <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Amara" />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Kofi" />
        <AvatarFallback>K</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Zara" />
        <AvatarFallback>Z</AvatarFallback>
      </Avatar>
      <p className="text-sm text-muted-foreground ml-1">3 members · 1 pending</p>
    </div>
  </CardContent>
</Card>`,
    },
    {
      title: "With CardFooter",
      description: "CardFooter adds bg-muted, a top border, and removes the card's bottom padding automatically. Use it for primary card actions.",
      preview: (
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>Last 7 days of account events.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Invoice #1042 sent · Plan upgraded · Member added</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <RiArrowRightLine />
                View all activity
              </Button>
            </CardFooter>
          </Card>
        </div>
      ),
      code: `<Card>
  <CardHeader>
    <CardTitle>Recent activity</CardTitle>
    <CardDescription>Last 7 days of account events.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">...</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm" className="w-full">
      <RiArrowRightLine />
      View all activity
    </Button>
  </CardFooter>
</Card>`,
    },
    {
      title: "Small size",
      description: "Set size=\"sm\" on Card once — py-4, gap-4, and text-sm title cascade to all child components automatically.",
      preview: (
        <div className="w-full max-w-xs">
          <Card size="sm">
            <CardHeader>
              <CardTitle>Active sessions</CardTitle>
              <CardDescription>Current open sessions for this account.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">2 sessions · Last active now</p>
            </CardContent>
          </Card>
        </div>
      ),
      code: `<Card size="sm">
  <CardHeader>
    <CardTitle>Active sessions</CardTitle>
    <CardDescription>Current open sessions for this account.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">2 sessions · Last active now</p>
  </CardContent>
</Card>`,
    },
    {
      title: "With image",
      description: "Place an <img> as the first direct child of Card. It auto-receives rounded-t-2xl and the card's top padding is removed via CSS.",
      preview: (
        <div className="w-full max-w-xs">
          <Card>
            <img
              src="https://api.dicebear.com/9.x/shapes/svg?seed=BlogPost&backgroundColor=e0e7ff"
              alt="Article cover"
              className="w-full h-40 object-cover"
            />
            <CardHeader>
              <CardTitle>Building a design system</CardTitle>
              <CardDescription>A deep dive into tokens, components, and documentation.</CardDescription>
              <CardAction>
                <Badge variant="info" size="sm">Design</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Learn how to build a scalable, token-driven design system from the ground up.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <RiArrowRightLine />
                Read article
              </Button>
            </CardFooter>
          </Card>
        </div>
      ),
      code: `<Card>
  <img
    src="/images/article-cover.jpg"
    alt="Article cover"
    className="w-full h-40 object-cover"
  />
  <CardHeader>
    <CardTitle>Building a design system</CardTitle>
    <CardDescription>A deep dive into tokens, components, and documentation.</CardDescription>
    <CardAction>
      <Badge variant="info" size="sm">Design</Badge>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground line-clamp-2">
      Learn how to build a scalable, token-driven design system from the ground up.
    </p>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm" className="w-full">
      <RiArrowRightLine />
      Read article
    </Button>
  </CardFooter>
</Card>`,
    },
    {
      title: "Stats card",
      description: "A real-world stats card with a large metric, change indicator, and a download action.",
      preview: (
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Total revenue</CardTitle>
              <CardDescription>All-time across active plans.</CardDescription>
              <CardAction>
                <Button variant="ghost" size="sm">
                  <RiDownloadLine />
                  Export
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold tracking-tight">$128,430</p>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                <span className="text-green-600 font-medium">+12.4%</span>
                from last month
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <RiLineChartLine />
                View revenue report
              </Button>
            </CardFooter>
          </Card>
        </div>
      ),
      code: `<Card>
  <CardHeader>
    <CardTitle>Total revenue</CardTitle>
    <CardDescription>All-time across active plans.</CardDescription>
    <CardAction>
      <Button variant="ghost" size="sm">
        <RiDownloadLine />
        Export
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p className="text-4xl font-semibold tracking-tight">$128,430</p>
    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
      <span className="text-green-600 font-medium">+12.4%</span>
      from last month
    </p>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm" className="w-full">
      <RiLineChartLine />
      View revenue report
    </Button>
  </CardFooter>
</Card>`,
    },
  ],

  apiReference: [
    {
      name: "Card.size",
      values: `"default" | "sm"`,
      default: `"default"`,
      description: "Controls padding (py-6 vs py-4), gap (gap-6 vs gap-4), and title text size. Cascades through all child components — set it once on Card.",
    },
    {
      name: "Card.className",
      values: "string",
      default: "—",
      description: "Extra CSS classes applied to the card container. Avoid overriding ring, background, or border-radius tokens.",
    },
    {
      name: "CardHeader",
      values: "children: ReactNode",
      default: "—",
      description: "Grid container for CardTitle, CardDescription, and CardAction. No additional props.",
    },
    {
      name: "CardTitle",
      values: "children: ReactNode",
      default: "—",
      description: "text-base font-medium at default size; text-sm at size=\"sm\". Renders as a <div> — wrap in a heading element if semantics require it.",
    },
    {
      name: "CardDescription",
      values: "children: ReactNode",
      default: "—",
      description: "text-sm text-muted-foreground subtitle. Optional — omit if the title is self-explanatory.",
    },
    {
      name: "CardAction",
      values: "children: ReactNode",
      default: "—",
      description: "Must be placed directly inside CardHeader. Auto-positions to col-start-2, row-start-1, row-span-2 — top-right of the header grid.",
    },
    {
      name: "CardContent",
      values: "children: ReactNode",
      default: "—",
      description: "Main body wrapper. Provides px-6 horizontal padding (px-4 at size=\"sm\"). Do not add extra horizontal padding inside.",
    },
    {
      name: "CardFooter",
      values: "children: ReactNode",
      default: "—",
      description: "Footer area with bg-muted, border-t, rounded-b-2xl. Automatically removes the card's pb-6 via CSS. Use for actions only.",
    },
  ],

  accessibility: [
    {
      rule: "Card has no default ARIA role — add one when it represents a standalone entity",
      detail: "Wrap Card in <article> or <section> and add aria-labelledby pointing to the CardTitle's id when the card represents a self-contained entity (e.g. a team member, a stat panel).",
    },
    {
      rule: "CardAction must contain a labeled interactive element",
      detail: "Any button or link inside CardAction should have a visible label or an aria-label. The top-right position provides no surrounding text context for screen readers.",
    },
    {
      rule: "Don't rely on visual card boundaries alone — pair with aria-labelledby",
      detail: "Screen readers don't perceive visual enclosure. Use semantic heading structure and aria-labelledby={titleId} on the card wrapper to communicate grouping explicitly.",
    },
  ],
}
