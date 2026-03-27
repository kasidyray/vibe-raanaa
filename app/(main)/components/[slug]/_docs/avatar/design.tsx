"use client"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import { RiUserLine, RiMore2Line } from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── People used across all examples ───────────────────────────────────────────

const PEOPLE = [
  { name: "Adaeze Okoye",     seed: "Adaeze",  initials: "AO" },
  { name: "Emeka Nwachukwu",  seed: "Emeka",   initials: "EN" },
  { name: "Ngozi Achebe",     seed: "Ngozi",   initials: "NA" },
  { name: "Chidi Okeke",      seed: "Chidi",   initials: "CO" },
  { name: "Amaka Eze",        seed: "Amaka",   initials: "AE" },
  { name: "Ikedi Eze",        seed: "Ikedi",   initials: "IE" },
]

function dicebear(seed: string) {
  return `https://api.dicebear.com/9.x/micah/svg?seed=${seed}`
}

// ── Anatomy preview ───────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    <div className="relative inline-flex">
      <Avatar size="lg">
        <AvatarImage src={dicebear("Ikedi")} alt="Ikedi Eze" />
        <AvatarFallback>IE</AvatarFallback>
        <AvatarBadge className="bg-emerald-500" />
      </Avatar>
    </div>
    <div className="flex items-start gap-8 text-center">
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">① Container</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">② Image</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">③ Border overlay</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">④ Badge (optional)</span>
      </div>
    </div>
  </div>
)

// ── Example in context: Data table row ────────────────────────────────────────

export const TableExample = () => (
  <div className="rounded-xl border overflow-hidden text-sm">
    <div className="grid grid-cols-[1fr_120px_100px] gap-4 px-4 py-2 border-b bg-muted/50">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Member</p>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</p>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</p>
    </div>
    {[
      { ...PEOPLE[0], email: "adaeze@mtn.ng",  online: true  },
      { ...PEOPLE[1], email: "emeka@mtn.ng",   online: false },
      { ...PEOPLE[2], email: "ngozi@mtn.ng",   online: true  },
    ].map(row => (
      <div
        key={row.name}
        className="grid grid-cols-[1fr_120px_100px] gap-4 items-center px-4 py-3 border-b last:border-0"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar size="sm">
            <AvatarImage src={dicebear(row.seed)} alt={row.name} />
            <AvatarFallback>{row.initials}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium truncate">{row.name}</p>
        </div>
        <p className="text-xs text-muted-foreground truncate">{row.email}</p>
        <div className="flex items-center gap-1.5">
          <span
            className={`size-1.5 rounded-full ${row.online ? "bg-emerald-500" : "bg-muted-foreground/40"}`}
          />
          <span className="text-xs text-muted-foreground">{row.online ? "Online" : "Offline"}</span>
        </div>
      </div>
    ))}
  </div>
)

// ── Example in context: Drawer header ────────────────────────────────────────

const DrawerHeaderExample = () => (
  <div className="rounded-xl border overflow-hidden max-w-sm">
    <div className="flex items-center gap-3 p-4 border-b bg-muted/30">
      <Avatar size="lg">
        <AvatarImage src={dicebear("Ngozi")} alt="Ngozi Achebe" />
        <AvatarFallback>NA</AvatarFallback>
        <AvatarBadge className="bg-emerald-500" />
      </Avatar>
      <div className="min-w-0">
        <p className="text-sm font-semibold">Ngozi Achebe</p>
        <p className="text-xs text-muted-foreground">ngozi@dangote.ng · Owner</p>
      </div>
    </div>
    <div className="p-4 flex flex-col gap-3">
      {[
        { label: "Company",  value: "Dangote Group" },
        { label: "Joined",   value: "Jan 12, 2024"  },
        { label: "Location", value: "Lagos, Nigeria" },
      ].map(row => (
        <div key={row.label} className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{row.label}</span>
          <span className="text-xs font-medium">{row.value}</span>
        </div>
      ))}
    </div>
  </div>
)

// ── Example in context: Activity / comment feed ───────────────────────────────

const ActivityFeedExample = () => (
  <div className="rounded-xl border overflow-hidden">
    {[
      { ...PEOPLE[0], action: "left a comment on Invoice #1042",  time: "2 min ago" },
      { ...PEOPLE[3], action: "approved the Q2 budget proposal",   time: "18 min ago" },
      { ...PEOPLE[4], action: "assigned ticket #408 to Emeka",     time: "1 hr ago" },
    ].map((item, i) => (
      <div key={i} className="flex items-start gap-3 px-4 py-3 border-b last:border-0">
        <Avatar size="default">
          <AvatarImage src={dicebear(item.seed)} alt={item.name} />
          <AvatarFallback>{item.initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="text-sm">
            <span className="font-medium">{item.name}</span>{" "}
            <span className="text-muted-foreground">{item.action}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
        </div>
      </div>
    ))}
  </div>
)

// ── Example in context: Team list with AvatarGroup ────────────────────────────

const TeamGroupExample = () => (
  <div className="rounded-xl border overflow-hidden max-w-sm">
    {[
      { team: "Engineering",  members: PEOPLE.slice(0, 4), total: 12 },
      { team: "Design",       members: PEOPLE.slice(1, 4), total: 5  },
      { team: "Growth",       members: PEOPLE.slice(2, 5), total: 8  },
    ].map(row => (
      <div key={row.team} className="flex items-center justify-between px-4 py-3 border-b last:border-0">
        <p className="text-sm font-medium">{row.team}</p>
        <div className="flex items-center gap-2">
          <AvatarGroup>
            {row.members.map(m => (
              <Avatar key={m.name} size="sm">
                <AvatarImage src={dicebear(m.seed)} alt={m.name} />
                <AvatarFallback>{m.initials}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount className="size-6 text-xs">
              +{row.total - row.members.length}
            </AvatarGroupCount>
          </AvatarGroup>
          <span className="text-xs text-muted-foreground">{row.total} members</span>
        </div>
      </div>
    ))}
  </div>
)

// ── Do / Don't previews ───────────────────────────────────────────────────────

const DoAltTextPreview = () => (
  <div className="flex items-center gap-3 justify-center">
    <Avatar size="default">
      <AvatarImage src={dicebear("Chidi")} alt="Chidi Okeke" />
      <AvatarFallback>CO</AvatarFallback>
    </Avatar>
    <div>
      <p className="text-sm font-medium">Chidi Okeke</p>
      <p className="text-xs text-muted-foreground">alt="Chidi Okeke"</p>
    </div>
  </div>
)

const DoCorrectSizePreview = () => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-2.5 rounded-lg border px-3 py-2 bg-muted/30">
      <Avatar size="sm">
        <AvatarImage src={dicebear("Emeka")} alt="Emeka Nwachukwu" />
        <AvatarFallback>EN</AvatarFallback>
      </Avatar>
      <span className="text-sm">Table row — size sm (24px)</span>
    </div>
    <div className="flex items-center gap-3 rounded-lg border px-3 py-2.5 bg-muted/30">
      <Avatar size="lg">
        <AvatarImage src={dicebear("Adaeze")} alt="Adaeze Okoye" />
        <AvatarFallback>AO</AvatarFallback>
      </Avatar>
      <span className="text-sm">Drawer header — size lg (40px)</span>
    </div>
  </div>
)

const DoBadgeStatusPreview = () => (
  <div className="flex items-center gap-4 justify-center">
    <div className="flex flex-col items-center gap-1.5">
      <Avatar size="default">
        <AvatarImage src={dicebear("Amaka")} alt="Amaka Eze" />
        <AvatarFallback>AE</AvatarFallback>
        <AvatarBadge className="bg-emerald-500" />
      </Avatar>
      <span className="text-xs text-muted-foreground">Online</span>
    </div>
    <div className="flex flex-col items-center gap-1.5">
      <Avatar size="default">
        <AvatarImage src={dicebear("Chidi")} alt="Chidi Okeke" />
        <AvatarFallback>CO</AvatarFallback>
        <AvatarBadge className="bg-muted-foreground/40" />
      </Avatar>
      <span className="text-xs text-muted-foreground">Offline</span>
    </div>
  </div>
)

const DontOversizedTablePreview = () => (
  <div className="rounded-xl border overflow-hidden text-sm">
    <div className="grid grid-cols-[1fr_80px] gap-4 px-4 py-2 border-b bg-muted/50">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">User</p>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Role</p>
    </div>
    {[
      { ...PEOPLE[0], role: "Admin"  },
      { ...PEOPLE[1], role: "Member" },
    ].map(row => (
      <div key={row.name} className="grid grid-cols-[1fr_80px] gap-4 items-center px-4 py-3 border-b last:border-0">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Intentionally oversized — this is the "don't" example */}
          <Avatar size="lg">
            <AvatarImage src={dicebear(row.seed)} alt={row.name} />
            <AvatarFallback>{row.initials}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium truncate">{row.name}</p>
        </div>
        <p className="text-xs text-muted-foreground">{row.role}</p>
      </div>
    ))}
    <p className="px-4 py-2 text-xs text-muted-foreground bg-destructive/5 border-t">
      size lg in a table cell inflates row height unnecessarily
    </p>
  </div>
)

const DontNoAltPreview = () => (
  <div className="flex items-center gap-3 justify-center">
    <Avatar size="default">
      {/* Missing alt — this is the "don't" example */}
      <AvatarImage src={dicebear("Ngozi")} alt="" />
      <AvatarFallback>NA</AvatarFallback>
    </Avatar>
    <div>
      <p className="text-sm font-medium">Ngozi Achebe</p>
      <p className="text-xs text-destructive">alt="" — screen readers get nothing</p>
    </div>
  </div>
)

const DontLogoPreview = () => (
  <div className="flex items-center gap-3 justify-center">
    <Avatar size="default">
      <AvatarImage
        src="https://api.dicebear.com/9.x/initials/svg?seed=M&backgroundColor=16a34a"
        alt="MTN logo"
      />
      <AvatarFallback>M</AvatarFallback>
    </Avatar>
    <div>
      <p className="text-sm font-medium">MTN Nigeria</p>
      <p className="text-xs text-destructive">Don't use Avatar for company logos</p>
    </div>
  </div>
)

// ── Avatar design doc ─────────────────────────────────────────────────────────

export const avatarDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  // ── Overview ───────────────────────────────────────────────────────────────
  overview: {
    what: "A circular image + fallback component for representing people or entities. Comprises a container, image, fallback initials, an optional badge, and a group layout element.",
    why: "A recognisable face or set of initials anchors every row, card, or comment thread to a real person — speeding up scanning and building trust across the interface.",
    problem: "Without a consistent avatar treatment, person identity relies entirely on a name string, which takes longer to parse and fails completely when names are long or truncated.",
    appearsIn: [
      "Data table rows",
      "Drawer headers",
      "Comment and activity feeds",
      "Team member lists",
      "Profile cards",
      "Navigation headers",
    ],
  },

  // ── Anatomy ────────────────────────────────────────────────────────────────
  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Container",
        description: "Fixed-size circle (24 / 32 / 40 px depending on size). Clips children to a circle and positions the badge absolutely.",
      },
      {
        name: "Image",
        description: "The src image, sized to fill the container and cropped to cover. Handled by AvatarImage.",
      },
      {
        name: "Border overlay",
        description: "A subtle after:border after:border-border pseudo-element applied inside the container. Adds definition against light or dark backgrounds without changing the image.",
      },
      {
        name: "Fallback",
        description: "Rendered when the image has not loaded or fails. Typically initials — first letter of first name + first letter of last name.",
        optional: true,
      },
      {
        name: "Badge",
        description: "A small dot pinned to the bottom-right of the container. Used exclusively for online / offline / status indicators. Scales with the container size.",
        optional: true,
      },
    ],
  },

  // ── Usage ──────────────────────────────────────────────────────────────────
  whenToUse: [
    "Representing a person or named entity visually — in any list, table, or header.",
    "In table rows to add identity alongside a name and email.",
    "In comment or activity feeds to anchor each event to a person.",
    "In drawer or panel headers to give the subject of the detail view a visual identity.",
    "In team or member lists where AvatarGroup communicates a collective at a glance.",
  ],
  whenNotToUse: [
    "Decorative illustrations — use a plain <img> or an illustration component directly.",
    "Company or brand logos — use an initials avatar (dicebear initials style) with a branded background colour, not Avatar.",
    "Generic icons unrelated to a person — use IconBadge instead.",
    "Clickable profile links — Avatar is display-only. Wrap it in a button or link and handle interactivity on the wrapper.",
  ],

  // ── Variants ───────────────────────────────────────────────────────────────
  variants: [
    {
      name: "Size sm — 24 px",
      description: "The smallest size. Designed for tight layouts like compact table cells and dense list items where a full 32 px circle would inflate row height.",
      when: "Table cells, compact member lists, inline name chips.",
      preview: (
        <div className="flex items-center gap-3 justify-center">
          <Avatar size="sm">
            <AvatarImage src={dicebear("Adaeze")} alt="Adaeze Okoye" />
            <AvatarFallback>AO</AvatarFallback>
          </Avatar>
          <Avatar size="sm">
            <AvatarImage src={dicebear("Emeka")} alt="Emeka Nwachukwu" />
            <AvatarFallback>EN</AvatarFallback>
          </Avatar>
          <Avatar size="sm">
            <AvatarImage src={dicebear("Ngozi")} alt="Ngozi Achebe" />
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
        </div>
      ),
    },
    {
      name: "Size default — 32 px",
      description: "The standard size. Correct for most contexts — table rows, comment threads, notification items, and inline profile references.",
      when: "Standard table rows, comment feeds, notification lists, dropdown user details.",
      preview: (
        <div className="flex items-center gap-3 justify-center">
          <Avatar size="default">
            <AvatarImage src={dicebear("Chidi")} alt="Chidi Okeke" />
            <AvatarFallback>CO</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarImage src={dicebear("Amaka")} alt="Amaka Eze" />
            <AvatarFallback>AE</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarImage src={dicebear("Ikedi")} alt="Ikedi Eze" />
            <AvatarFallback>IE</AvatarFallback>
          </Avatar>
        </div>
      ),
    },
    {
      name: "Size lg — 40 px",
      description: "The largest size. Reserved for prominent identity contexts — drawer or panel headers, profile cards, and settings pages where the person is the primary subject.",
      when: "Drawer headers, profile cards, account settings, detail page headers.",
      preview: (
        <div className="flex items-center gap-3 justify-center">
          <Avatar size="lg">
            <AvatarImage src={dicebear("Ngozi")} alt="Ngozi Achebe" />
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src={dicebear("Adaeze")} alt="Adaeze Okoye" />
            <AvatarFallback>AO</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src={dicebear("Ikedi")} alt="Ikedi Eze" />
            <AvatarFallback>IE</AvatarFallback>
          </Avatar>
        </div>
      ),
    },
    {
      name: "With badge",
      description: "An AvatarBadge dot pinned to the bottom-right communicates online / availability status. The badge scales automatically with the avatar size.",
      when: "Any context where online presence or live availability is meaningful — team lists, chat, live support dashboards.",
      preview: (
        <div className="flex items-center gap-4 justify-center">
          <div className="flex flex-col items-center gap-1.5">
            <Avatar size="default">
              <AvatarImage src={dicebear("Emeka")} alt="Emeka Nwachukwu" />
              <AvatarFallback>EN</AvatarFallback>
              <AvatarBadge className="bg-emerald-500" />
            </Avatar>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Avatar size="default">
              <AvatarImage src={dicebear("Chidi")} alt="Chidi Okeke" />
              <AvatarFallback>CO</AvatarFallback>
              <AvatarBadge className="bg-amber-400" />
            </Avatar>
            <span className="text-xs text-muted-foreground">Away</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Avatar size="default">
              <AvatarImage src={dicebear("Amaka")} alt="Amaka Eze" />
              <AvatarFallback>AE</AvatarFallback>
              <AvatarBadge className="bg-muted-foreground/40" />
            </Avatar>
            <span className="text-xs text-muted-foreground">Offline</span>
          </div>
        </div>
      ),
    },
  ],

  // ── States ─────────────────────────────────────────────────────────────────
  states: [
    {
      name: "With image (loaded)",
      description: "The normal state. The AvatarImage fills and covers the container once the src has loaded.",
      preview: (
        <div className="flex items-center gap-3 justify-center">
          <Avatar size="default">
            <AvatarImage src={dicebear("Ikedi")} alt="Ikedi Eze" />
            <AvatarFallback>IE</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Ikedi Eze</p>
            <p className="text-xs text-muted-foreground">Image loaded</p>
          </div>
        </div>
      ),
    },
    {
      name: "With fallback initials",
      description: "Shown when the image src is missing, unavailable, or still loading. Renders initials on a muted background. Always provide meaningful initials — first letter of first and last name.",
      preview: (
        <div className="flex items-center gap-3 justify-center">
          <Avatar size="default">
            <AvatarFallback>
              <RiUserLine className="size-4 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarFallback>AO</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarFallback>EN</AvatarFallback>
          </Avatar>
        </div>
      ),
    },
    {
      name: "With badge",
      description: "AvatarBadge overlays the bottom-right corner. Use a semantic background colour to communicate status. The badge ring ensures it reads against any background.",
      preview: (
        <div className="flex items-center gap-3 justify-center">
          <Avatar size="default">
            <AvatarImage src={dicebear("Adaeze")} alt="Adaeze Okoye" />
            <AvatarFallback>AO</AvatarFallback>
            <AvatarBadge className="bg-emerald-500" />
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src={dicebear("Ngozi")} alt="Ngozi Achebe" />
            <AvatarFallback>NA</AvatarFallback>
            <AvatarBadge className="bg-emerald-500" />
          </Avatar>
          <Avatar size="sm">
            <AvatarImage src={dicebear("Chidi")} alt="Chidi Okeke" />
            <AvatarFallback>CO</AvatarFallback>
            <AvatarBadge className="bg-emerald-500" />
          </Avatar>
        </div>
      ),
    },
    {
      name: "In a group",
      description: "AvatarGroup stacks avatars with -space-x-2 overlap and a ring-2 ring-background separator. AvatarGroupCount shows the overflow count or an icon for additional members.",
      preview: (
        <div className="flex flex-col items-center gap-3">
          <AvatarGroup>
            {PEOPLE.slice(0, 4).map(p => (
              <Avatar key={p.name} size="default">
                <AvatarImage src={dicebear(p.seed)} alt={p.name} />
                <AvatarFallback>{p.initials}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+8</AvatarGroupCount>
          </AvatarGroup>
          <p className="text-xs text-muted-foreground">4 shown · 8 more</p>
        </div>
      ),
    },
  ],

  // ── Properties ─────────────────────────────────────────────────────────────
  properties: [
    {
      name: "size",
      values: "sm · default · lg",
      default: "default",
      description: "Controls the diameter of the Avatar container. sm=24px, default=32px, lg=40px. Badge and fallback text scale automatically.",
    },
    {
      name: "src (AvatarImage)",
      values: "string (URL)",
      default: "—",
      description: "The image source. Use dicebear micah URLs for user avatars: https://api.dicebear.com/9.x/micah/svg?seed={FirstName}.",
    },
    {
      name: "alt (AvatarImage)",
      values: "string",
      default: "—",
      description: "Accessible description of the image. Always use the person's full name. Required — never leave empty.",
    },
  ],

  // ── Content guidance ───────────────────────────────────────────────────────
  contentGuidance: [
    {
      rule: "Always provide alt text",
      detail: "Use the person's full name: alt=\"Adaeze Okoye\". Screen readers announce the identity from this text.",
    },
    {
      rule: "Fallback initials — first + last",
      detail: "Two characters: first letter of first name + first letter of last name. \"Adaeze Okoye\" → \"AO\". Single initial only for single-name entities.",
    },
    {
      rule: "Badge for status only",
      detail: "AvatarBadge communicates online / away / offline presence. Don't use it for role or plan classification — that's Badge or StatusBadge.",
    },
    {
      rule: "dicebear micah for user avatars",
      detail: "Seed with the user's first name: https://api.dicebear.com/9.x/micah/svg?seed={FirstName}. Consistent across the project.",
    },
  ],

  // ── Behavior ───────────────────────────────────────────────────────────────
  behavior: [
    "AvatarImage loads lazily. AvatarFallback is visible during load and replaces the image on error.",
    "AvatarBadge is always pinned to the bottom-right via absolute positioning inside the container.",
    "AvatarGroup applies -space-x-2 overlap automatically. Each child Avatar receives ring-2 ring-background separation.",
    "AvatarGroupCount inherits the group's size context and renders its content (text or icon) centered.",
    "The border overlay (after:border after:border-border) is applied via CSS pseudo-element — it sits above the image without changing layout.",
  ],

  // ── Spacing ────────────────────────────────────────────────────────────────
  spacing: [
    {
      rule: "In table rows",
      detail: "Use size sm or default. Pair with gap-2.5 to the name text. Cell padding provides outer spacing — no margin on the Avatar.",
    },
    {
      rule: "In drawer headers",
      detail: "Use size lg. Pair with gap-3 to the name/email block beside it.",
    },
    {
      rule: "In activity feeds",
      detail: "Use size default. gap-3 to the event text. Top-align both for multi-line descriptions.",
    },
    {
      rule: "In AvatarGroup",
      detail: "Overlap is controlled by AvatarGroup (-space-x-2). Don't add manual margins to Avatar children inside the group.",
    },
  ],

  // ── Accessibility ──────────────────────────────────────────────────────────
  accessibility: [
    {
      rule: "Meaningful alt text",
      detail: "Always pass the person's full name as alt on AvatarImage. This is the primary accessible label for the image.",
    },
    {
      rule: "AvatarFallback as aria-hidden",
      detail: "When an image is present and loaded, the fallback is hidden visually. When it is the only thing visible, the alt text on the outer element should still describe the person.",
    },
    {
      rule: "Badge needs context on parent",
      detail: "AvatarBadge is a visual dot — it has no text. If status is meaningful (e.g. online), add aria-label=\"Adaeze Okoye — Online\" to the wrapping element.",
    },
    {
      rule: "Non-interactive by default",
      detail: "Avatar carries no focus or click behaviour. Wrap in a <button> or <a> if it must be interactive, and manage keyboard access on the wrapper.",
    },
  ],

  // ── Do & Don't ─────────────────────────────────────────────────────────────
  doItems: [
    {
      label: "Always supply meaningful alt text",
      description: "Every AvatarImage needs the person's full name as alt. It's the primary accessibility identifier for the avatar.",
      preview: <DoAltTextPreview />,
    },
    {
      label: "Match size to context",
      description: "Use size sm in table cells, size default in feeds, size lg in drawer headers. The right size keeps layouts consistent and readable.",
      preview: <DoCorrectSizePreview />,
    },
    {
      label: "Use AvatarBadge for online/presence status",
      description: "The badge dot is the right pattern for communicating availability — green for online, amber for away, muted for offline.",
      preview: <DoBadgeStatusPreview />,
    },
  ],
  dontItems: [
    {
      label: "Don't use size lg in table cells",
      description: "An oversized avatar inflates row height, breaks visual rhythm, and makes the table harder to scan. Use size sm or default.",
      preview: <DontOversizedTablePreview />,
    },
    {
      label: "Don't skip alt text",
      description: "An empty alt leaves screen reader users without any identity context. Always use the person's full name.",
      preview: <DontNoAltPreview />,
    },
    {
      label: "Don't use Avatar for company logos",
      description: "Avatar is for people. For organisation or brand identity, use a separate initials avatar (dicebear initials style) with a branded background colour.",
      preview: <DontLogoPreview />,
    },
  ],

  // ── Examples in context ────────────────────────────────────────────────────
  examplesInContext: [
    {
      title: "In a data table row",
      description: "Size sm avatar beside the member name. Keeps rows compact while instantly grounding each record in a person.",
      preview: <TableExample />,
      code: `<div className="rounded-xl border overflow-hidden">
  <div className="grid grid-cols-[1fr_120px_100px] gap-4 px-4 py-2 border-b bg-muted/50">
    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Member</p>
    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</p>
    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</p>
  </div>
  {members.map(row => (
    <div key={row.name} className="grid grid-cols-[1fr_120px_100px] gap-4 items-center px-4 py-3 border-b last:border-0">
      <div className="flex items-center gap-2.5 min-w-0">
        <Avatar size="sm">
          <AvatarImage src={\`https://api.dicebear.com/9.x/micah/svg?seed=\${row.seed}\`} alt={row.name} />
          <AvatarFallback>{row.initials}</AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium truncate">{row.name}</p>
      </div>
      <p className="text-xs text-muted-foreground truncate">{row.email}</p>
      <div className="flex items-center gap-1.5">
        <span className={\`size-1.5 rounded-full \${row.online ? "bg-emerald-500" : "bg-muted-foreground/40"}\`} />
        <span className="text-xs text-muted-foreground">{row.online ? "Online" : "Offline"}</span>
      </div>
    </div>
  ))}
</div>`,
    },
    {
      title: "In a drawer header",
      description: "Size lg avatar beside name and email. The badge shows online presence. The larger size signals this person is the subject of the detail view.",
      preview: <DrawerHeaderExample />,
      code: `<div className="rounded-xl border overflow-hidden max-w-sm">
  <div className="flex items-center gap-3 p-4 border-b bg-muted/30">
    <Avatar size="lg">
      <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Ngozi" alt="Ngozi Achebe" />
      <AvatarFallback>NA</AvatarFallback>
      <AvatarBadge className="bg-emerald-500" />
    </Avatar>
    <div className="min-w-0">
      <p className="text-sm font-semibold">Ngozi Achebe</p>
      <p className="text-xs text-muted-foreground">ngozi@dangote.ng · Owner</p>
    </div>
  </div>
  <div className="p-4 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">Company</span>
      <span className="text-xs font-medium">Dangote Group</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">Joined</span>
      <span className="text-xs font-medium">Jan 12, 2024</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">Location</span>
      <span className="text-xs font-medium">Lagos, Nigeria</span>
    </div>
  </div>
</div>`,
    },
    {
      title: "In an activity feed",
      description: "Size default avatar top-aligned beside each event. The image anchors each action to its author without requiring a name scan.",
      preview: <ActivityFeedExample />,
      code: `const events = [
  { name: "Adaeze Okoye",    seed: "Adaeze", action: "left a comment on Invoice #1042", time: "2 min ago"  },
  { name: "Chidi Okeke",     seed: "Chidi",  action: "approved the Q2 budget proposal", time: "18 min ago" },
  { name: "Fatima Aliyu",    seed: "Fatima", action: "assigned ticket #408 to Emeka",   time: "1 hr ago"   },
]

<div className="rounded-xl border overflow-hidden">
  {events.map((item, i) => (
    <div key={i} className="flex items-start gap-3 px-4 py-3 border-b last:border-0">
      <Avatar size="default">
        <AvatarImage src={\`https://api.dicebear.com/9.x/micah/svg?seed=\${item.seed}\`} alt={item.name} />
        <AvatarFallback>{item.name[0]}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="text-sm">
          <span className="font-medium">{item.name}</span>{" "}
          <span className="text-muted-foreground">{item.action}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
      </div>
    </div>
  ))}
</div>`,
    },
    {
      title: "In a team list with AvatarGroup",
      description: "AvatarGroup stacks avatars with overlap. AvatarGroupCount shows the hidden member count. The group communicates team size at a glance.",
      preview: <TeamGroupExample />,
      code: `const teams = [
  { name: "Engineering", members: engineeringMembers, total: 12 },
  { name: "Design",      members: designMembers,      total: 5  },
  { name: "Growth",      members: growthMembers,      total: 8  },
]

<div className="rounded-xl border overflow-hidden max-w-sm">
  {teams.map(row => (
    <div key={row.name} className="flex items-center justify-between px-4 py-3 border-b last:border-0">
      <p className="text-sm font-medium">{row.name}</p>
      <div className="flex items-center gap-2">
        <AvatarGroup>
          {row.members.map(m => (
            <Avatar key={m.name} size="sm">
              <AvatarImage src={\`https://api.dicebear.com/9.x/micah/svg?seed=\${m.seed}\`} alt={m.name} />
              <AvatarFallback>{m.initials}</AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount className="size-6 text-xs">
            +{row.total - row.members.length}
          </AvatarGroupCount>
        </AvatarGroup>
        <span className="text-xs text-muted-foreground">{row.total} members</span>
      </div>
    </div>
  ))}
</div>`,
    },
  ],

  // ── Related components ─────────────────────────────────────────────────────
  relatedComponents: [
    {
      slug: "badge",
      name: "Badge",
      description: "Compact coloured pill for classifying records by role, plan, or type.",
      when: "You need to show a fixed category alongside the avatar — role, plan tier, or feature flag.",
    },
    {
      slug: "status-badge",
      name: "Status Badge",
      description: "Bordered pill with a coloured dot for live or dynamic states.",
      when: "You need to show a live state like Active, Pending, or Failed alongside or below the avatar.",
    },
  ],

  // ── Design notes ───────────────────────────────────────────────────────────
  designNotes: [
    "Avatar maps directly to the Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, and AvatarGroupCount exports from @/components/ui/avatar — no wrapper needed.",
    "The border overlay (after:border after:border-border) is built into the container. Do not add an extra ring or border in designs — it doubles the stroke.",
    "AvatarGroupCount inherits the group's size context automatically via group/avatar-group CSS. Size the Avatars in the group, not the count element.",
    "dicebear micah SVGs are deterministic for a given seed. Use the person's first name as the seed to ensure consistent avatars across pages and sessions.",
    "AvatarBadge colour is not set by the component — pass a bg- utility class (bg-emerald-500, bg-amber-400, bg-muted-foreground/40) to communicate the specific status.",
  ],
}
