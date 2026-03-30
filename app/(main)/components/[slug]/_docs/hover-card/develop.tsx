"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import {
  RiBarChart2Line,
  RiCalendarLine,
  RiExternalLinkLine,
  RiLink,
  RiMapPinLine,
  RiUserFollowLine,
} from "@remixicon/react"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Previews ───────────────────────────────────────────────────────────────────

function UserProfilePreview() {
  return (
    <div className="flex justify-center">
      <p className="text-sm text-muted-foreground">
        Built by{" "}
        <HoverCard>
          <HoverCardTrigger className="font-medium text-foreground underline underline-offset-4 decoration-dotted cursor-pointer">
            @amara_osei
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex gap-3">
              <Avatar className="size-10 shrink-0">
                <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Amara" alt="Amara Osei" />
                <AvatarFallback>AO</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 min-w-0">
                <div>
                  <p className="font-semibold leading-snug">Amara Osei</p>
                  <p className="text-xs text-muted-foreground">@amara_osei</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Product designer & frontend engineer.
                </p>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><RiMapPinLine className="size-3" />Accra, Ghana</span>
                  <span className="flex items-center gap-1"><RiCalendarLine className="size-3" />Joined Jan 2021</span>
                </div>
                <div className="mt-1 flex gap-4 text-xs">
                  <span><strong className="text-foreground">248</strong> following</span>
                  <span><strong className="text-foreground">1.4k</strong> followers</span>
                </div>
              </div>
            </div>
            <Button size="sm" className="mt-3 w-full" variant="outline">
              <RiUserFollowLine />Follow
            </Button>
          </HoverCardContent>
        </HoverCard>
        {" "}and the team.
      </p>
    </div>
  )
}

function LinkPreview() {
  return (
    <div className="flex justify-center">
      <HoverCard>
        <HoverCardTrigger className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4 cursor-pointer">
          <RiLink className="size-3.5" />
          shadcn/ui documentation
        </HoverCardTrigger>
        <HoverCardContent side="top">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold leading-snug">shadcn/ui</p>
                <p className="text-xs text-muted-foreground">ui.shadcn.com</p>
              </div>
              <RiExternalLinkLine className="size-4 shrink-0 text-muted-foreground mt-0.5" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Beautifully designed components built with Radix UI and Tailwind CSS.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

function MetricPreview() {
  return (
    <div className="flex justify-center">
      <HoverCard>
        <HoverCardTrigger>
          <Badge variant="info" icon={<RiBarChart2Line />} size="lg" className="cursor-default">
            98.4% uptime
          </Badge>
        </HoverCardTrigger>
        <HoverCardContent side="top" align="start">
          <p className="font-semibold mb-2">Uptime breakdown</p>
          <div className="flex flex-col gap-1.5 text-xs">
            {[
              { label: "Last 24 hours", value: "100%" },
              { label: "Last 7 days", value: "99.8%" },
              { label: "Last 30 days", value: "98.4%" },
              { label: "Last incident", value: "14 Mar 2026" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between gap-6">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

function PositioningPreview() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {(["top", "bottom", "left", "right"] as const).map(side => (
        <HoverCard key={side}>
          <HoverCardTrigger render={<Button variant="outline" size="sm" />}>
            side="{side}"
          </HoverCardTrigger>
          <HoverCardContent side={side}>
            <p className="text-sm">Opens from <strong>{side}</strong></p>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  )
}

// ── HoverCard develop doc ──────────────────────────────────────────────────────

export const hoverCardDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/hover-card",
    importPath: `import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "Built on base-ui PreviewCard (not Popover) — opens on hover/focus, not click.",
      "HoverCard does not require \"use client\" — but components inside HoverCardContent that use state do.",
    ],
  },

  basicUsage: `import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"

// Text trigger
<HoverCard>
  <HoverCardTrigger className="font-medium underline underline-offset-4 decoration-dotted cursor-pointer">
    @amara_osei
  </HoverCardTrigger>
  <HoverCardContent>
    <p className="font-semibold">Amara Osei</p>
    <p className="text-xs text-muted-foreground">Product designer</p>
  </HoverCardContent>
</HoverCard>

// Position above the trigger
<HoverCardContent side="top">...</HoverCardContent>

// Align to start of trigger
<HoverCardContent align="start">...</HoverCardContent>`,

  codeExamples: [
    {
      title: "User profile card",
      description: "A @mention trigger opens a profile card with avatar, bio, location, and a Follow action.",
      preview: <UserProfilePreview />,
      code: `<HoverCard>
  <HoverCardTrigger className="font-medium text-foreground underline underline-offset-4 decoration-dotted cursor-pointer">
    @amara_osei
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="flex gap-3">
      <Avatar className="size-10 shrink-0">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>AO</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 min-w-0">
        <p className="font-semibold leading-snug">Amara Osei</p>
        <p className="text-xs text-muted-foreground">@amara_osei</p>
        <p className="text-xs text-muted-foreground leading-relaxed">Bio text here.</p>
        <div className="mt-1 flex gap-4 text-xs">
          <span><strong className="text-foreground">248</strong> following</span>
          <span><strong className="text-foreground">1.4k</strong> followers</span>
        </div>
      </div>
    </div>
    <Button size="sm" className="mt-3 w-full" variant="outline">
      <RiUserFollowLine />Follow
    </Button>
  </HoverCardContent>
</HoverCard>`,
    },
    {
      title: "Link preview",
      description: "A link trigger opens a preview card with the site name, domain, and description. Use side=\"top\" for links near the bottom of the viewport.",
      preview: <LinkPreview />,
      code: `<HoverCard>
  <HoverCardTrigger className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4 cursor-pointer">
    <RiLink className="size-3.5" />
    shadcn/ui documentation
  </HoverCardTrigger>
  <HoverCardContent side="top">
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold">shadcn/ui</p>
          <p className="text-xs text-muted-foreground">ui.shadcn.com</p>
        </div>
        <RiExternalLinkLine className="size-4 shrink-0 text-muted-foreground" />
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Beautifully designed components built with Radix UI and Tailwind CSS.
      </p>
    </div>
  </HoverCardContent>
</HoverCard>`,
    },
    {
      title: "Metric breakdown",
      description: "A Badge trigger expands into a table of values. Use side=\"top\" and align=\"start\" so the popup doesn't clip at the page edge.",
      preview: <MetricPreview />,
      code: `<HoverCard>
  <HoverCardTrigger>
    <Badge variant="info" icon={<RiBarChart2Line />} size="lg" className="cursor-default">
      98.4% uptime
    </Badge>
  </HoverCardTrigger>
  <HoverCardContent side="top" align="start">
    <p className="font-semibold mb-2">Uptime breakdown</p>
    <div className="flex flex-col gap-1.5 text-xs">
      {uptimeData.map(({ label, value }) => (
        <div key={label} className="flex items-center justify-between gap-6">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium">{value}</span>
        </div>
      ))}
    </div>
  </HoverCardContent>
</HoverCard>`,
    },
    {
      title: "Positioning options",
      description: "Use the side prop to control which side of the trigger the popup opens from.",
      preview: <PositioningPreview />,
      code: `// side: "top" | "bottom" | "left" | "right" (default: "bottom")
// align: "start" | "center" | "end" (default: "center")

<HoverCardContent side="top" align="start">
  ...
</HoverCardContent>`,
    },
  ],

  apiReference: [
    {
      name: "side (HoverCardContent)",
      values: `"top" | "bottom" | "left" | "right"`,
      default: `"bottom"`,
      description: "Which side of the trigger the popup opens on.",
    },
    {
      name: "align (HoverCardContent)",
      values: `"start" | "center" | "end"`,
      default: `"center"`,
      description: "Horizontal alignment relative to the trigger.",
    },
    {
      name: "sideOffset (HoverCardContent)",
      values: "number",
      default: "4",
      description: "Distance in pixels between the trigger and popup.",
    },
    {
      name: "alignOffset (HoverCardContent)",
      values: "number",
      default: "4",
      description: "Offset applied to the align position.",
    },
    {
      name: "className (HoverCardContent)",
      values: "string",
      default: "—",
      description: "Applied to the popup panel. Use to override the default w-72 width.",
    },
  ],

  accessibility: [
    {
      rule: "Focus also triggers the card",
      detail: "Keyboard users can tab to the trigger to open the hover card. Ensure the trigger is naturally focusable (link, button, or tabIndex={0}).",
    },
    {
      rule: "HoverCard content is not focused on open",
      detail: "Unlike Dialog, HoverCard does not trap focus. If the popup has interactive elements (buttons), they must be reachable by tabbing into the popup after it opens.",
    },
    {
      rule: "Trigger must have a visual affordance",
      detail: "Apply underline + cursor-pointer to text triggers so keyboard and mouse users can discover hoverable content.",
    },
    {
      rule: "Don't hide required information in hover cards",
      detail: "Touch device users cannot hover. If the popup contains critical information, it must also be accessible by another interaction (link, click, or inline text).",
    },
  ],
}
