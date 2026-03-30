"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import {
  RiBarChart2Line,
  RiCalendarLine,
  RiExternalLinkLine,
  RiGlobalLine,
  RiLink,
  RiMapPinLine,
  RiUserFollowLine,
} from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview (static mock) ─────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    <div className="flex flex-col items-start gap-3">
      <p className="text-sm text-muted-foreground">
        Built by{" "}
        <span className="font-medium text-foreground underline underline-offset-4 decoration-dotted cursor-pointer">
          @amara_osei
        </span>
      </p>
      {/* static popup mock */}
      <div className="w-72 rounded-lg border bg-popover p-4 shadow-md ring-1 ring-foreground/5 text-sm">
        <div className="flex gap-3">
          <div className="size-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium shrink-0">AO</div>
          <div className="flex flex-col gap-1 min-w-0">
            <p className="font-semibold leading-snug">Amara Osei</p>
            <p className="text-xs text-muted-foreground">@amara_osei</p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">Product designer & frontend engineer.</p>
            <div className="mt-1 flex gap-3 text-xs">
              <span><strong className="text-foreground">248</strong> following</span>
              <span><strong className="text-foreground">1.4k</strong> followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex items-start flex-wrap gap-6 text-center justify-center">
      {["① Trigger", "② Content popup", "③ Popup body (custom layout)"].map(label => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="h-5 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

// ── Variant previews ───────────────────────────────────────────────────────────

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
                  Product designer & frontend engineer. Building design systems and open-source tools.
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

function LinkPreviewVariant() {
  return (
    <div className="flex justify-center">
      <HoverCard>
        <HoverCardTrigger className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4 text-foreground cursor-pointer">
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
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><RiGlobalLine className="size-3" />Open source</span>
              <span className="flex items-center gap-1"><RiCalendarLine className="size-3" />Updated Mar 2026</span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

function MetricPreviewVariant() {
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
              { label: "Last 24 hours", value: "100%", ok: true },
              { label: "Last 7 days", value: "99.8%", ok: true },
              { label: "Last 30 days", value: "98.4%", ok: true },
              { label: "Last incident", value: "14 Mar 2026", ok: false },
            ].map(({ label, value, ok }) => (
              <div key={label} className="flex items-center justify-between gap-6">
                <span className="text-muted-foreground">{label}</span>
                <span className={ok ? "font-medium" : "text-muted-foreground"}>{value}</span>
              </div>
            ))}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

// ── Do / Don't previews ────────────────────────────────────────────────────────

function DoDottedUnderlinePreview() {
  return (
    <div className="flex justify-center">
      <HoverCard>
        <HoverCardTrigger className="font-medium text-foreground underline underline-offset-4 decoration-dotted cursor-pointer text-sm">
          @ngozi_achebe
        </HoverCardTrigger>
        <HoverCardContent>
          <p className="text-sm font-semibold">Ngozi Achebe</p>
          <p className="text-xs text-muted-foreground">Engineering lead · Lagos, Nigeria</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

function DontNoIndicatorPreview() {
  return (
    <div className="flex justify-center">
      <HoverCard>
        <HoverCardTrigger className="font-medium text-foreground text-sm cursor-default">
          @ngozi_achebe
        </HoverCardTrigger>
        <HoverCardContent>
          <p className="text-sm font-semibold">Ngozi Achebe</p>
          <p className="text-xs text-muted-foreground">Engineering lead · Lagos, Nigeria</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

// ── Context example previews ───────────────────────────────────────────────────

function ActivityFeedExample() {
  const activities = [
    { user: "Adaeze", handle: "adaeze_o", action: "merged pull request", detail: "#142 Add auth middleware" },
    { user: "Emeka", handle: "emeka_n", action: "opened issue", detail: "#143 Fix pagination bug" },
    { user: "Chidi", handle: "chidi_ok", action: "commented on", detail: "#141 Update API schema" },
  ]
  return (
    <div className="w-full rounded-xl border overflow-hidden text-sm">
      {activities.map((a, i) => (
        <div key={i} className="flex items-center gap-2 px-4 py-3 border-b last:border-0">
          <HoverCard>
            <HoverCardTrigger>
              <Avatar className="size-6 shrink-0 cursor-pointer">
                <AvatarImage src={`https://api.dicebear.com/9.x/micah/svg?seed=${a.user}`} alt={a.user} />
                <AvatarFallback>{a.user[0]}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent align="start">
              <div className="flex gap-3 items-center">
                <Avatar className="size-8 shrink-0">
                  <AvatarImage src={`https://api.dicebear.com/9.x/micah/svg?seed=${a.user}`} alt={a.user} />
                  <AvatarFallback>{a.user[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{a.user}</p>
                  <p className="text-xs text-muted-foreground">@{a.handle}</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <span>
            <span className="font-medium">{a.user}</span>
            {" "}{a.action}{" "}
            <span className="text-muted-foreground">{a.detail}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

// ── HoverCard design doc ───────────────────────────────────────────────────────

export const hoverCardDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  overview: {
    what: "A floating content panel that appears when the user hovers over a trigger element, providing rich contextual preview information without requiring a click.",
    why: "Some UI elements — user mentions, links, metrics — carry more information than can be shown inline. A hover card reveals this detail on demand without navigating away or blocking interaction.",
    problem: "Custom hover previews built with CSS tooltips can't contain rich layout, interactive elements, or correctly positioned popups. HoverCard provides a fully positioned, accessible preview panel.",
    appearsIn: ["User mention previews", "Link previews", "Metric breakdowns", "Activity feeds", "Tag details"],
  },

  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      { name: "HoverCard", description: "The root component managing open/close state based on hover and focus events." },
      { name: "HoverCardTrigger", description: "The element that activates the hover card on pointer enter. Apply your own visual trigger style (underline, cursor-pointer)." },
      { name: "HoverCardContent", description: "The floating popup panel. Default width is w-72. Fully custom layout inside — no required child components." },
    ],
  },

  whenToUse: [
    "User @mentions in text — show a profile card without navigating to the profile.",
    "Hyperlinks in copy — show a link preview with title, domain, and description.",
    "Metric badges or stats — expand an at-a-glance number into a full breakdown.",
    "Avatars in activity feeds — show who the person is on hover without cluttering the list.",
  ],

  whenNotToUse: [
    "For actions the user must complete — use a Dialog or Popover with click-triggered open.",
    "For brief text labels or definitions — use a Tooltip instead (lighter weight).",
    "As the only way to access important information — hover is not available on touch devices.",
    "For form controls or editable content — HoverCard is read-only preview, not interactive.",
  ],

  variants: [
    {
      name: "User profile",
      description: "Shows avatar, name, handle, bio, location, join date, and follower counts. Often includes a Follow action button.",
      when: "User @mentions in text, avatars in feeds",
      preview: <UserProfilePreview />,
      fullWidth: true,
    },
    {
      name: "Link preview",
      description: "Shows site name, domain, description, and metadata for a hyperlink.",
      when: "External links in content or documentation",
      preview: <LinkPreviewVariant />,
      fullWidth: true,
    },
    {
      name: "Metric breakdown",
      description: "Expands a summary stat or badge into a table of sub-values or time-series breakdown.",
      when: "Dashboard metrics, uptime badges, score indicators",
      preview: <MetricPreviewVariant />,
      fullWidth: true,
    },
  ],

  states: [],

  properties: [
    {
      name: "side (HoverCardContent)",
      values: "top · bottom · left · right",
      default: "bottom",
      description: "Which side of the trigger the popup opens on. Use side=\"top\" for triggers near the bottom of the viewport.",
    },
    {
      name: "align (HoverCardContent)",
      values: "start · center · end",
      default: "center",
      description: "Horizontal alignment relative to the trigger.",
    },
    {
      name: "sideOffset (HoverCardContent)",
      values: "number",
      default: "4",
      description: "Gap in pixels between the trigger and the popup.",
    },
    {
      name: "alignOffset (HoverCardContent)",
      values: "number",
      default: "4",
      description: "Offset applied to alignment position.",
    },
  ],

  contentGuidance: [
    {
      rule: "Keep popup content scannable",
      detail: "Users spend 1–2 seconds on hover cards. Use short labels, strong names, and minimal prose. A user profile card should be readable at a glance.",
    },
    {
      rule: "Make the trigger visually distinctive",
      detail: "Users need to know what they can hover. Use underline + decoration-dotted for text triggers. Use cursor-pointer on non-link elements.",
    },
    {
      rule: "Popup width is w-72 by default",
      detail: "The default 288px width is appropriate for most hover card content. Override with className if needed, but keep it narrow — hover cards are not full panels.",
    },
    {
      rule: "Avoid putting critical actions inside hover cards",
      detail: "Hover is not available on mobile. If an action is important, it should also be accessible without hover.",
    },
  ],

  behavior: [
    "Opens after a short delay when the pointer enters the trigger or the trigger receives focus.",
    "Closes when the pointer leaves both the trigger and the popup content area.",
    "The popup is positioned relative to the trigger using the side and align props, with collision detection.",
    "Animates in/out with fade + slide from the side of origin (100ms duration).",
    "Focus management: the popup is not focused on open — it is a preview, not a modal.",
    "Touch devices: hover cards do not open on touch; ensure the trigger remains useful without the card.",
  ],

  spacing: [
    { rule: "Popup padding", detail: "p-4 on HoverCardContent — generous padding for rich content." },
    { rule: "Popup width", detail: "w-72 (288px) by default. Override with className on HoverCardContent." },
    { rule: "Popup shadow", detail: "shadow-2xl with ring-1 ring-foreground/5 — elevated above all other content." },
  ],

  accessibility: [
    {
      rule: "Hover cards are supplemental — not the only access path",
      detail: "Ensure any information shown in the hover card is also accessible by clicking through to the relevant page. Touch users cannot hover.",
    },
    {
      rule: "Trigger must have a clear visual affordance",
      detail: "Apply underline + decoration-dotted on text triggers, or cursor-pointer + subtle hover state on other elements, so users discover hoverable content.",
    },
    {
      rule: "Focus triggers the card",
      detail: "HoverCard opens on focus as well as hover (base-ui PreviewCard). Keyboard users can tab to the trigger to reveal the card.",
    },
    {
      rule: "Popup content should not be interactive by default",
      detail: "If the popup contains interactive elements (Follow button), ensure they are keyboard-reachable by tabbing into the popup after it opens on focus.",
    },
  ],

  doItems: [
    {
      label: "Style the trigger to signal interactivity",
      description: "Use underline decoration-dotted on text triggers so users discover they can hover. Without visual affordance, the card is undiscoverable.",
      preview: <DoDottedUnderlinePreview />,
    },
    {
      label: "Use for contextual preview, not required interactions",
      description: "Hover cards should enrich content that's already understandable without the card. The user should never need to hover to complete a task.",
      preview: <MetricPreviewVariant />,
    },
  ],

  dontItems: [
    {
      label: "Don't hide the trigger affordance",
      description: "A trigger with no visual indicator (no underline, no cursor change) is invisible to users. They won't know to hover.",
      preview: <DontNoIndicatorPreview />,
    },
    {
      label: "Don't put required content only in the card",
      description: "Touch device users cannot hover. If the card contains key information, surface it inline or link to a full page.",
      preview: (
        <div className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Service health:{" "}
            <HoverCard>
              <HoverCardTrigger className="font-medium text-foreground cursor-default text-sm">
                hover for details
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">All systems operational.</p>
              </HoverCardContent>
            </HoverCard>
          </p>
        </div>
      ),
    },
  ],

  examplesInContext: [
    {
      title: "Activity feed with avatar hover cards",
      description: "Hovering an avatar in an activity feed reveals the user's name and handle without cluttering the list row.",
      preview: <ActivityFeedExample />,
      code: `<HoverCard>
  <HoverCardTrigger>
    <Avatar className="size-6 cursor-pointer">
      <AvatarImage src={avatarUrl} alt={name} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  </HoverCardTrigger>
  <HoverCardContent align="start">
    <div className="flex gap-3 items-center">
      <Avatar className="size-8">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-xs text-muted-foreground">@{handle}</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
    },
    {
      title: "Metric badge with breakdown",
      description: "A Badge trigger expands into a table of time-period values on hover.",
      preview: <MetricPreviewVariant />,
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
  ],

  relatedComponents: [
    {
      slug: "popover",
      name: "Popover",
      description: "A click-triggered floating content panel.",
      when: "Use Popover instead when the overlay needs to be opened by clicking and may contain form controls or interactive elements.",
    },
    {
      slug: "tooltip",
      name: "Tooltip",
      description: "A lightweight text-only label shown on hover.",
      when: "Use Tooltip instead for brief text labels or ARIA descriptions on icon buttons — not for rich multi-line content.",
    },
  ],

  designNotes: [
    "HoverCardContent has a fixed w-72. This is intentional — hover cards are contextual previews, not full panels. Override with care.",
    "The popup opens and closes based on pointer enter/leave on both the trigger and the popup itself — users can move their mouse into the popup to interact with it without it closing.",
    "Built on base-ui PreviewCard — not Popover. The open behaviour is hover/focus, not click.",
    "For text triggers, the design standard is underline underline-offset-4 decoration-dotted cursor-pointer — this creates a softer, \"preview-style\" underline distinct from regular links.",
  ],
}
