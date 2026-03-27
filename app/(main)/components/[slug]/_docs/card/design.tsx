"use client"

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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { RiArrowRightLine, RiMoreLine, RiDownloadLine } from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ───────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="w-full">
    <Card>
      <img
        src="https://api.dicebear.com/9.x/shapes/svg?seed=CardHero&backgroundColor=e0e7ff"
        alt=""
        className="w-full h-32 object-cover"
      />
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>A short description of what this card represents.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">Action</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Main body content. Horizontal padding is applied automatically by CardContent.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">Footer action</Button>
      </CardFooter>
    </Card>
    <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground mt-3 px-1">
      {[
        "① Container",
        "② Image",
        "③ Header",
        "④ Title",
        "⑤ Action",
        "⑥ Content",
        "⑦ Footer",
      ].map((label) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <div className="h-4 w-px bg-border" />
          <span className="whitespace-nowrap text-[10px]">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

// ── Variant previews ──────────────────────────────────────────────────────────

const DefaultVariantPreview = () => (
  <div className="w-full">
    <Card size="default">
      <CardHeader>
        <CardTitle>Monthly revenue</CardTitle>
        <CardDescription>Compared to last month across all plans.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tracking-tight">$128,430</p>
        <p className="text-sm text-muted-foreground mt-1">py-6 · gap-6 · text-base title</p>
      </CardContent>
    </Card>
  </div>
)

const SmallVariantPreview = () => (
  <div className="w-full">
    <Card size="sm">
      <CardHeader>
        <CardTitle>Active sessions</CardTitle>
        <CardDescription>Current open sessions for this account.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tracking-tight">2</p>
        <p className="text-sm text-muted-foreground mt-1">py-4 · gap-4 · text-sm title</p>
      </CardContent>
    </Card>
  </div>
)

// ── State previews ────────────────────────────────────────────────────────────

const HeaderOnlyStatePreview = () => (
  <div className="w-full">
    <Card>
      <CardHeader>
        <CardTitle>Workspace settings</CardTitle>
        <CardDescription>CardHeader with title and description — no CardContent or CardFooter.</CardDescription>
      </CardHeader>
    </Card>
  </div>
)

const WithActionStatePreview = () => (
  <div className="w-full">
    <Card>
      <CardHeader>
        <CardTitle>Team members</CardTitle>
        <CardDescription>Manage access for your workspace.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            <RiMoreLine />
            More
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">CardAction auto-positions to the top-right of the header grid.</p>
      </CardContent>
    </Card>
  </div>
)

const WithFooterStatePreview = () => (
  <div className="w-full">
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>Last 7 days of account events.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">CardFooter removes the card's pb-6 automatically.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          <RiArrowRightLine />
          View all activity
        </Button>
      </CardFooter>
    </Card>
  </div>
)

const WithImageStatePreview = () => (
  <div className="w-full max-w-xs">
    <Card>
      <img
        src="https://api.dicebear.com/9.x/shapes/svg?seed=CardHero&backgroundColor=e0e7ff"
        alt=""
        className="w-full h-36 object-cover"
      />
      <CardHeader>
        <CardTitle>Design system launch</CardTitle>
        <CardDescription>Published March 27, 2026</CardDescription>
      </CardHeader>
    </Card>
  </div>
)

// ── Do / Don't previews ───────────────────────────────────────────────────────

const DoCardActionPreview = () => (
  <div className="w-full">
    <Card>
      <CardHeader>
        <CardTitle>Workspace</CardTitle>
        <CardDescription>Manage your workspace settings.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">Edit</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Single header-level action in CardAction.</p>
      </CardContent>
    </Card>
  </div>
)

const DoCardFooterActionsPreview = () => (
  <div className="w-full">
    <Card>
      <CardHeader>
        <CardTitle>Billing plan</CardTitle>
        <CardDescription>You are on the Pro plan.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Primary actions belong in the footer.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm">Cancel plan</Button>
        <Button size="sm">Upgrade</Button>
      </CardFooter>
    </Card>
  </div>
)

const DoSmallSizePreview = () => (
  <div className="w-full max-w-xs">
    <Card size="sm">
      <CardHeader>
        <CardTitle>Sidebar widget</CardTitle>
        <CardDescription>Compact card for tight spaces.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">size="sm" in a sidebar or modal.</p>
      </CardContent>
    </Card>
  </div>
)

const DontNestedCardsPreview = () => (
  <div className="w-full">
    <Card>
      <CardHeader>
        <CardTitle>Outer card</CardTitle>
      </CardHeader>
      <CardContent>
        <Card>
          <CardHeader>
            <CardTitle>Nested card</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-destructive font-medium">Anti-pattern — don't nest cards</p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  </div>
)

const DontBorderRadiusInsidePreview = () => (
  <div className="w-full">
    <Card>
      <CardContent>
        <div className="rounded-xl bg-muted p-3">
          <p className="text-xs text-destructive font-medium">Inner rounded corners get clipped by overflow-hidden</p>
        </div>
      </CardContent>
    </Card>
  </div>
)

const DontFooterForMetadataPreview = () => (
  <div className="w-full">
    <Card>
      <CardHeader>
        <CardTitle>Invoice #1042</CardTitle>
        <CardDescription>Due March 31, 2026.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Invoice details here.</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-destructive font-medium">Created by Ikedi Eze · 2 days ago</p>
      </CardFooter>
    </Card>
  </div>
)

// ── Examples in context ────────────────────────────────────────────────────────

const stats = [
  { title: "Total revenue", desc: "This month", value: "$128,430", change: "+12.4%", up: true },
  { title: "Active users", desc: "Last 30 days", value: "8,241", change: "+5.2%", up: true },
]

const StatsDashboardExample = () => (
  <div className="w-full grid sm:grid-cols-2 gap-4">
    {stats.map((stat) => (
      <Card key={stat.title}>
        <CardHeader>
          <CardTitle>{stat.title}</CardTitle>
          <CardDescription>{stat.desc}</CardDescription>
          <CardAction>
            <Button variant="ghost" size="sm">
              <RiDownloadLine />
              Export
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
          <p className="text-sm text-muted-foreground mt-1">
            <span className={stat.up ? "text-green-600 font-medium" : "text-destructive font-medium"}>
              {stat.change}
            </span>
            {" "}from last month
          </p>
        </CardContent>
      </Card>
    ))}
  </div>
)

const articles = [
  { title: "Building a design system", desc: "Tokens, components, and documentation.", tag: "Design", seed: "BlogPost", color: "e0e7ff" },
  { title: "API design patterns", desc: "REST vs GraphQL vs tRPC in 2026.", tag: "Engineering", seed: "ApiDesign", color: "d1fae5" },
]

const ArticleGridExample = () => (
  <div className="w-full grid sm:grid-cols-2 gap-4">
    {articles.map((article) => (
      <Card key={article.title}>
        <img
          src={`https://api.dicebear.com/9.x/shapes/svg?seed=${article.seed}&backgroundColor=${article.color}`}
          alt={article.title}
          className="w-full h-36 object-cover"
        />
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
          <CardDescription>{article.desc}</CardDescription>
          <CardAction>
            <Badge variant="neutral" size="sm">{article.tag}</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            <RiArrowRightLine />
            Read article
          </Button>
        </CardFooter>
      </Card>
    ))}
  </div>
)

const members = [
  { name: "Adaeze Okoye", role: "Design · Admin", seed: "Adaeze" },
  { name: "Emeka Nwachukwu", role: "Engineering · Member", seed: "Emeka" },
  { name: "Ngozi Achebe", role: "Product · Member", seed: "Ngozi" },
]

const TeamMemberCardExample = () => (
  <div className="w-full max-w-xs">
    <Card>
      <CardHeader>
        <CardTitle>Team members</CardTitle>
        <CardDescription>3 members · 1 pending invite</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm" aria-label="More options">
            <RiMoreLine />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {members.map((member) => (
            <div key={member.name} className="flex items-center gap-3">
              <Avatar className="size-8 shrink-0">
                <AvatarImage
                  src={`https://api.dicebear.com/9.x/micah/svg?seed=${member.seed}`}
                  alt={member.name}
                />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          <RiArrowRightLine />
          View all members
        </Button>
      </CardFooter>
    </Card>
  </div>
)

// ── Card design doc ────────────────────────────────────────────────────────────

export const cardDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  // ── Overview ───────────────────────────────────────────────────────────────
  overview: {
    what: "A contained surface that groups related content and actions into a visual unit with a consistent header, body, and optional footer.",
    why: "Cards give content a clear visual boundary and hierarchy — separating distinct entities (stats, records, feeds) without requiring custom layout work each time.",
    problem: "Without a shared card system, teams build one-off panels and boxes with inconsistent padding, borders, and overflow behaviour — making layouts feel fragmented and hard to maintain.",
    appearsIn: [
      "Dashboard stat panels",
      "Team member listings",
      "Blog / article lists",
      "Settings sections",
      "Activity feed widgets",
      "Sidebar widgets",
    ],
  },

  // ── Anatomy ────────────────────────────────────────────────────────────────
  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Container",
        description: "The outer Card element. rounded-2xl, ring-1 ring-foreground/10, bg-card, overflow-hidden. Accepts the size prop.",
      },
      {
        name: "Image",
        description: "An <img> element placed as the first direct child of Card. Card auto-applies rounded-t-2xl and removes top padding.",
        optional: true,
      },
      {
        name: "Header",
        description: "CardHeader — a CSS grid that auto-places title, description, and action into the correct rows and columns.",
      },
      {
        name: "Title",
        description: "CardTitle — text-base font-medium. Shrinks to text-sm at size=\"sm\".",
      },
      {
        name: "Action",
        description: "CardAction — must live inside CardHeader. Auto-positions to the top-right via col-start-2 row-span-2.",
        optional: true,
      },
      {
        name: "Content",
        description: "CardContent — main body area. Gets horizontal padding (px-6, px-4 at size=\"sm\").",
        optional: true,
      },
      {
        name: "Footer",
        description: "CardFooter — bg-muted, border-t, rounded-b-2xl. Automatically removes the card's bottom padding. For actions only.",
        optional: true,
      },
    ],
  },

  // ── Usage ──────────────────────────────────────────────────────────────────
  whenToUse: [
    "Grouping a distinct data entity — a stat, a record, a team member — with its own title and actions.",
    "Dashboard panels that need a consistent visual container with header and body.",
    "Article or product listings where a cover image leads the card.",
    "Settings or profile sections where content needs a bordered, padded surface.",
    "Sidebar widgets where size=\"sm\" keeps the layout compact.",
  ],
  whenNotToUse: [
    "When you only need a bordered box with no header structure — use a plain div with ring-1 ring-border.",
    "Nesting cards inside cards — use a list or a table for sub-items instead.",
    "As a full-page container — use Container and PageHeader instead.",
    "When the content is primarily a data table — the table already has its own surface.",
  ],

  // ── Variants ───────────────────────────────────────────────────────────────
  variants: [
    {
      name: "Default",
      description: "py-6 vertical padding, gap-6 between sections, text-base title. Standard spacing for most contexts.",
      when: "Dashboards, full-width panels, detail views, and any context with ample space.",
      preview: <DefaultVariantPreview />,
    },
    {
      name: "Small",
      description: "py-4 vertical padding, gap-4 between sections, text-sm title. Tighter spacing throughout.",
      when: "Sidebars, modals, and dense layouts where the default size feels too spacious.",
      preview: <SmallVariantPreview />,
    },
  ],

  // ── States ─────────────────────────────────────────────────────────────────
  states: [
    {
      name: "Header only",
      description: "CardHeader with title and description — no CardContent or CardFooter.",
      preview: <HeaderOnlyStatePreview />,
    },
    {
      name: "With action",
      description: "CardHeader contains a CardAction — a button that auto-positions to the top-right of the header grid.",
      preview: <WithActionStatePreview />,
    },
    {
      name: "With footer",
      description: "CardContent followed by CardFooter. The footer carries bg-muted and removes the card's bottom padding automatically.",
      preview: <WithFooterStatePreview />,
    },
    {
      name: "With image",
      description: "An <img> placed as the first direct child of Card. Card auto-applies rounded-t-2xl and removes top padding.",
      preview: <WithImageStatePreview />,
    },
  ],

  // ── Properties ─────────────────────────────────────────────────────────────
  properties: [
    {
      name: "Card.size",
      values: '"default" · "sm"',
      default: '"default"',
      description: "Controls padding (py-6 vs py-4) and gap (gap-6 vs gap-4) — cascades through all child components automatically.",
    },
    {
      name: "CardHeader",
      values: "children: ReactNode",
      default: "—",
      description: "No API props. Accepts CardTitle, CardDescription, and optionally CardAction as children.",
    },
    {
      name: "CardAction",
      values: "children: ReactNode",
      default: "—",
      description: "No API props. Must be placed inside CardHeader to position correctly via the header's CSS grid.",
    },
    {
      name: "CardFooter",
      values: "children: ReactNode",
      default: "—",
      description: "No API props. Automatically applies bg-muted, border-t, and removes the card's bottom padding.",
    },
  ],

  // ── Content guidance ───────────────────────────────────────────────────────
  contentGuidance: [
    {
      rule: "Keep titles to 8 words or fewer",
      detail: "Card titles should be concise labels, not full sentences. \"Monthly revenue\" not \"A summary of monthly revenue across all plans\".",
    },
    {
      rule: "Descriptions should be 2 sentences at most",
      detail: "CardDescription is a subtitle — keep it to one clarifying phrase or two short sentences. Longer copy belongs in CardContent.",
    },
    {
      rule: "Footer is for actions, not supplementary content",
      detail: "Use CardFooter only for buttons and links. Metadata, timestamps, and secondary copy belong in CardContent.",
    },
  ],

  // ── Behavior ───────────────────────────────────────────────────────────────
  behavior: [
    "overflow-hidden clips children — never add inner border-radius to elements inside Card as they will be clipped unexpectedly.",
    "An <img> placed as the first direct child of Card automatically receives rounded-t-2xl and removes the card's top padding.",
    "CardFooter removes the card's bottom padding automatically via has-data-[slot=card-footer]:pb-0.",
    "CardAction spans 2 header rows (row-span-2) so it stays vertically centred when both title and description are present.",
    "size=\"sm\" cascades all spacing changes through child components via group-data-[size=sm]/card: — set the prop once on Card.",
  ],

  // ── Spacing ────────────────────────────────────────────────────────────────
  spacing: [
    {
      rule: "Between cards in a grid",
      detail: "gap-4 for dense dashboard grids; gap-6 for more open layouts.",
    },
    {
      rule: "Content inside CardContent",
      detail: "CardContent provides px-6 (px-4 at sm). Don't add extra horizontal padding inside — it will double the spacing.",
    },
    {
      rule: "Footer actions",
      detail: "Use gap-2 between buttons in CardFooter. Align to the right edge with ml-auto for asymmetric layouts.",
    },
  ],

  // ── Accessibility ──────────────────────────────────────────────────────────
  accessibility: [
    {
      rule: "Card has no default ARIA role",
      detail: "Wrap Card in <article> or <section> when it represents a standalone entity, and pair with an aria-labelledby pointing to the CardTitle.",
    },
    {
      rule: "CardAction must contain a labeled interactive element",
      detail: "Any button or link inside CardAction must have a visible label or aria-label — it sits at the top-right without surrounding context.",
    },
    {
      rule: "Images must have meaningful alt text",
      detail: "The <img> placed as Card's first child must have descriptive alt text. Use alt=\"\" only for purely decorative images.",
    },
  ],

  // ── Do & Don't ─────────────────────────────────────────────────────────────
  doItems: [
    {
      label: "Use CardAction for a single header-level action",
      description: "A single button or menu trigger in the top-right of the header is the intended pattern for CardAction.",
      preview: <DoCardActionPreview />,
    },
    {
      label: "Use CardFooter for primary card actions",
      description: "Buttons like Upgrade, View all, or Save belong in CardFooter — it visually separates them from body content.",
      preview: <DoCardFooterActionsPreview />,
    },
    {
      label: "Use size=\"sm\" in sidebars and modals",
      description: "Compact spacing avoids visual heaviness in tight containers. Set once on Card and all children adapt.",
      preview: <DoSmallSizePreview />,
    },
  ],
  dontItems: [
    {
      label: "Don't nest Cards inside Cards",
      description: "Cards inside Cards create confusing visual hierarchy. Use a list, table, or plain bordered row for sub-items.",
      preview: <DontNestedCardsPreview />,
    },
    {
      label: "Don't add inner border-radius to content inside Card",
      description: "Card uses overflow-hidden. Inner rounded corners get clipped in unexpected ways — especially at the top and bottom edges.",
      preview: <DontBorderRadiusInsidePreview />,
    },
    {
      label: "Don't use CardFooter for non-action content",
      description: "Metadata, timestamps, and secondary copy don't belong in CardFooter — it signals a call-to-action area.",
      preview: <DontFooterForMetadataPreview />,
    },
  ],

  // ── Examples in context ────────────────────────────────────────────────────
  examplesInContext: [
    {
      title: "Stats dashboard grid",
      description: "A 3-column grid of stat cards. Each Card holds a metric, a change indicator, and an Export action. No CardFooter — the metric is the primary content.",
      preview: <StatsDashboardExample />,
      code: `const stats = [
  { title: "Total revenue", desc: "This month",   value: "$128,430", change: "+12.4%", up: true },
  { title: "Active users",  desc: "Last 30 days", value: "8,241",    change: "+5.2%",  up: true },
]

<div className="grid sm:grid-cols-2 gap-4">
  {stats.map((stat) => (
    <Card key={stat.title}>
      <CardHeader>
        <CardTitle>{stat.title}</CardTitle>
        <CardDescription>{stat.desc}</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            <RiDownloadLine />
            Export
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
        <p className="text-sm text-muted-foreground mt-1">
          <span className={stat.up ? "text-green-600 font-medium" : "text-destructive font-medium"}>
            {stat.change}
          </span>
          {" "}from last month
        </p>
      </CardContent>
    </Card>
  ))}
</div>`,
    },
    {
      title: "Article card grid",
      description: "A 3-column grid of image cards. An <img> as Card's first child auto-receives rounded-t-2xl. A Badge in CardAction labels the category. CardFooter holds the read link.",
      preview: <ArticleGridExample />,
      code: `const articles = [
  { title: "Building a design system", desc: "Tokens, components, and documentation.", tag: "Design",      src: "/images/design.jpg" },
  { title: "API design patterns",      desc: "REST vs GraphQL vs tRPC in 2026.",      tag: "Engineering",  src: "/images/api.jpg"    },
]

<div className="grid sm:grid-cols-2 gap-4">
  {articles.map((article) => (
    <Card key={article.title}>
      <img
        src={article.src}
        alt={article.title}
        className="w-full h-36 object-cover"
      />
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
        <CardDescription>{article.desc}</CardDescription>
        <CardAction>
          <Badge variant="neutral" size="sm">{article.tag}</Badge>
        </CardAction>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          <RiArrowRightLine />
          Read article
        </Button>
      </CardFooter>
    </Card>
  ))}
</div>`,
    },
    {
      title: "Team members card",
      description: "CardAction holds a more-options trigger. CardContent renders a list of avatars with names and roles. CardFooter links to the full team page.",
      preview: <TeamMemberCardExample />,
      code: `<Card>
  <CardHeader>
    <CardTitle>Team members</CardTitle>
    <CardDescription>3 members · 1 pending invite</CardDescription>
    <CardAction>
      <Button variant="outline" size="sm" aria-label="More options">
        <RiMoreLine />
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <div className="flex flex-col gap-3">
      {members.map((member) => (
        <div key={member.name} className="flex items-center gap-3">
          <Avatar className="size-8 shrink-0">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{member.name[0]}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{member.name}</p>
            <p className="text-xs text-muted-foreground">{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm" className="w-full">
      <RiArrowRightLine />
      View all members
    </Button>
  </CardFooter>
</Card>`,
    },
  ],

  // ── Related components ─────────────────────────────────────────────────────
  relatedComponents: [
    {
      slug: "dialog",
      name: "Dialog",
      description: "A modal overlay for focused tasks and confirmations.",
      when: "The interaction requires full user attention before proceeding — use Dialog instead of a Card.",
    },
    {
      slug: "drawer",
      name: "Drawer",
      description: "A slide-in panel from the right for detail views and edit flows.",
      when: "The user needs to interact with a record in context — use Drawer rather than embedding the form in a Card.",
    },
    {
      slug: "popover",
      name: "Popover",
      description: "A small floating surface anchored to a trigger.",
      when: "The content is supplementary and contextual — use Popover rather than a Card overlay.",
    },
  ],

  // ── Design notes ───────────────────────────────────────────────────────────
  designNotes: [
    "Card maps to the 'card' surface token — bg-card, ring-foreground/10. Never substitute raw hex or Tailwind colour scale values.",
    "CardFooter uses bg-muted — it is intentionally a lighter surface to signal it is footer-level and separate from the card body.",
    "Image cards: place the <img> directly as the first child of Card (not inside CardHeader or CardContent) for the auto-rounding and padding-removal to work.",
  ],
}
