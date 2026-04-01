"use client"

import {
  RiDashboardLine,
  RiGroupLine,
  RiSettingsLine,
  RiHistoryLine,
  RiLayoutGridLine,
  RiAddLine,
  RiMore2Line,
  RiFolderLine,
  RiUserLine,
  RiShieldLine,
  RiBankCardLine,
  RiLogoutBoxLine,
  RiArrowDownSLine,
} from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy diagram ────────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex items-start gap-10 justify-center py-2">
    {/* Mini sidebar mockup */}
    <div className="flex h-72 w-44 flex-col rounded-xl border bg-sidebar shadow-sm overflow-hidden shrink-0">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b">
        <div className="size-6 rounded-md bg-primary/20" />
        <div className="h-3 w-16 rounded bg-muted-foreground/20" />
      </div>
      {/* Content */}
      <div className="flex flex-1 flex-col gap-1 p-2 overflow-hidden">
        {/* Group label */}
        <div className="px-2 py-1">
          <div className="h-2 w-12 rounded bg-muted-foreground/25" />
        </div>
        {/* Active menu item */}
        <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent px-2 py-1.5">
          <div className="size-3.5 rounded bg-sidebar-accent-foreground/30" />
          <div className="h-2.5 w-14 rounded bg-sidebar-accent-foreground/50" />
          {/* Badge */}
          <div className="ml-auto h-4 min-w-4 rounded-md bg-error-light/70 px-1 flex items-center justify-center">
            <div className="h-1.5 w-2 rounded bg-error/60" />
          </div>
        </div>
        {/* Regular item with action */}
        <div className="group flex items-center gap-2 rounded-lg px-2 py-1.5">
          <div className="size-3.5 rounded bg-muted-foreground/20" />
          <div className="h-2.5 w-12 rounded bg-muted-foreground/25" />
          <div className="ml-auto size-3.5 rounded bg-muted-foreground/15" />
        </div>
        {/* Sub-menu */}
        <div className="ml-3.5 border-l pl-3 flex flex-col gap-1 py-0.5">
          <div className="flex items-center gap-1.5 py-1">
            <div className="h-2 w-16 rounded bg-muted-foreground/20" />
          </div>
          <div className="flex items-center gap-1.5 py-1">
            <div className="h-2 w-12 rounded bg-muted-foreground/15" />
          </div>
        </div>
        {/* Separator */}
        <div className="my-1 h-px bg-border/60 mx-1" />
        {/* Secondary item */}
        <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
          <div className="size-3.5 rounded bg-muted-foreground/20" />
          <div className="h-2.5 w-10 rounded bg-muted-foreground/20" />
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center gap-2 border-t px-3 py-2.5">
        <div className="size-6 rounded-full bg-muted-foreground/20" />
        <div className="flex flex-col gap-1">
          <div className="h-2 w-14 rounded bg-muted-foreground/25" />
          <div className="h-1.5 w-10 rounded bg-muted-foreground/15" />
        </div>
      </div>
    </div>

    {/* Labels */}
    <div className="flex flex-col gap-3 pt-2">
      {[
        "① SidebarHeader",
        "② SidebarGroupLabel",
        "③ SidebarMenuButton",
        "④ SidebarMenuBadge",
        "⑤ SidebarMenuAction",
        "⑥ SidebarMenuSub",
        "⑦ SidebarSeparator",
        "⑧ SidebarFooter",
      ].map((label) => (
        <div key={label} className="flex items-center gap-2">
          <div className="h-px w-4 bg-border" />
          <span className="text-xs text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

// ── Variant previews ───────────────────────────────────────────────────────────

const MiniSidebarItems = () => (
  <>
    <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent px-2 py-1.5">
      <div className="size-3 rounded bg-sidebar-accent-foreground/40" />
      <div className="h-2 w-12 rounded bg-sidebar-accent-foreground/50" />
    </div>
    {["w-14", "w-10", "w-16"].map((w, i) => (
      <div key={i} className="flex items-center gap-2 rounded-lg px-2 py-1.5">
        <div className="size-3 rounded bg-muted-foreground/20" />
        <div className={`h-2 ${w} rounded bg-muted-foreground/20`} />
      </div>
    ))}
  </>
)

const SidebarVariantPreview = () => (
  <div className="flex flex-wrap gap-6 justify-center">
    {/* sidebar (default) */}
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-36 w-52 overflow-hidden rounded-xl border bg-muted/30">
        <div className="flex h-full w-28 flex-col gap-1 border-r bg-sidebar p-2">
          <MiniSidebarItems />
        </div>
        <div className="flex-1 p-2">
          <div className="h-full rounded-lg border border-dashed" />
        </div>
      </div>
      <span className="text-xs text-muted-foreground">sidebar (default)</span>
    </div>
    {/* floating */}
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-36 w-52 overflow-hidden rounded-xl border bg-muted/30 p-1.5 gap-1.5">
        <div className="flex w-28 flex-col gap-1 rounded-lg border bg-sidebar p-2 shadow-md">
          <MiniSidebarItems />
        </div>
        <div className="flex-1 rounded-lg border border-dashed" />
      </div>
      <span className="text-xs text-muted-foreground">floating</span>
    </div>
    {/* inset */}
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-36 w-52 overflow-hidden rounded-xl border bg-muted/50">
        <div className="flex h-full w-28 flex-col gap-1 p-2">
          <MiniSidebarItems />
        </div>
        <div className="flex-1 p-1.5">
          <div className="h-full w-full rounded-xl border bg-background shadow-sm" />
        </div>
      </div>
      <span className="text-xs text-muted-foreground">inset</span>
    </div>
  </div>
)

const CollapsiblePreview = () => (
  <div className="flex flex-wrap gap-6 justify-center">
    {/* offcanvas — expanded */}
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-36 w-52 overflow-hidden rounded-xl border bg-muted/30">
        <div className="flex w-28 flex-col gap-1 border-r bg-sidebar p-2">
          <MiniSidebarItems />
        </div>
        <div className="flex-1 p-2"><div className="h-full rounded-lg border border-dashed" /></div>
      </div>
      <span className="text-xs text-muted-foreground">offcanvas — expanded</span>
    </div>
    {/* offcanvas — collapsed */}
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-36 w-52 overflow-hidden rounded-xl border bg-muted/30">
        <div className="h-full w-full p-2"><div className="h-full rounded-lg border border-dashed" /></div>
      </div>
      <span className="text-xs text-muted-foreground">offcanvas — collapsed</span>
    </div>
    {/* icon — collapsed */}
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-36 w-52 overflow-hidden rounded-xl border bg-muted/30">
        <div className="flex w-9 flex-col items-center gap-1 border-r bg-sidebar py-2">
          {[0,1,2,3].map(i => (
            <div key={i} className="size-5 rounded-md bg-muted-foreground/20" />
          ))}
        </div>
        <div className="flex-1 p-2"><div className="h-full rounded-lg border border-dashed" /></div>
      </div>
      <span className="text-xs text-muted-foreground">icon — collapsed</span>
    </div>
  </div>
)

// ── State previews ─────────────────────────────────────────────────────────────

const GroupActionPreview = () => (
  <div className="flex flex-col gap-2 max-w-[220px]">
    <div className="relative flex items-center rounded-lg border bg-sidebar px-3 py-2">
      <span className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wide">Projects</span>
      <button className="absolute right-2 flex size-5 items-center justify-center rounded-md hover:bg-sidebar-accent">
        <RiAddLine className="size-3.5 text-muted-foreground" />
      </button>
    </div>
    <p className="text-xs text-muted-foreground">SidebarGroupAction places a button in the top-right of any group header.</p>
  </div>
)

const MenuActionPreview = () => (
  <div className="flex flex-col gap-1 max-w-[220px]">
    {["Dashboard", "Leads", "Team"].map((item, i) => (
      <div key={item} className="group relative flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-sidebar-accent border bg-sidebar">
        <div className="size-4 rounded bg-muted-foreground/20" />
        <span className="text-sm">{item}</span>
        <button className="absolute right-2 ml-auto flex size-5 items-center justify-center rounded-md opacity-0 group-hover:opacity-100 hover:bg-sidebar-accent-foreground/10">
          <RiMore2Line className="size-3.5 text-muted-foreground" />
        </button>
      </div>
    ))}
    <p className="text-xs text-muted-foreground mt-1">SidebarMenuAction appears on hover with showOnHover.</p>
  </div>
)

const BadgePreview = () => (
  <div className="flex flex-col gap-1 max-w-[220px]">
    {[
      { label: "Activity", badge: "12" },
      { label: "Messages", badge: "3" },
      { label: "Notifications", badge: "99+" },
    ].map(({ label, badge }) => (
      <div key={label} className="relative flex items-center gap-2 rounded-lg border bg-sidebar px-3 py-2">
        <div className="size-4 rounded bg-muted-foreground/20" />
        <span className="text-sm">{label}</span>
        <div className="absolute right-2 flex h-5 min-w-5 items-center justify-center rounded-md bg-error-light px-1 text-xs font-medium tabular-nums">
          {badge}
        </div>
      </div>
    ))}
  </div>
)

const SkeletonPreview = () => (
  <div className="flex flex-col gap-1 max-w-[220px]">
    {[48, 64, 56, 40].map((w, i) => (
      <div key={i} className="flex items-center gap-2 rounded-lg border bg-sidebar px-3 py-2">
        <div className="size-4 rounded-md bg-muted animate-pulse" />
        <div className="h-3 rounded bg-muted animate-pulse" style={{ width: w }} />
      </div>
    ))}
    <p className="text-xs text-muted-foreground mt-1">SidebarMenuSkeleton renders loading placeholders.</p>
  </div>
)

// ── Context example previews ───────────────────────────────────────────────────

const AppShellPreview = () => (
  <div className="flex h-64 w-full overflow-hidden rounded-xl border bg-muted/30">
    {/* Sidebar */}
    <div className="flex h-full w-44 flex-col border-r bg-sidebar">
      <div className="flex items-center gap-2 border-b px-3 py-2.5">
        <div className="size-6 rounded-md bg-primary/20" />
        <span className="text-xs font-semibold">Acme Inc</span>
      </div>
      <div className="flex flex-1 flex-col gap-0.5 p-2">
        <div className="px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground/60">Main</div>
        {[
          { icon: <RiDashboardLine className="size-3.5" />, label: "Dashboard", active: true },
          { icon: <RiGroupLine className="size-3.5" />, label: "Leads" },
          { icon: <RiFolderLine className="size-3.5" />, label: "Projects" },
          { icon: <RiHistoryLine className="size-3.5" />, label: "Activity" },
        ].map(({ icon, label, active }) => (
          <div
            key={label}
            className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs ${
              active ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : "text-muted-foreground"
            }`}
          >
            {icon}
            {label}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t px-3 py-2">
        <div className="size-5 rounded-full bg-primary/20" />
        <span className="text-[10px] text-muted-foreground">Ikedi Eze</span>
      </div>
    </div>
    {/* Content */}
    <div className="flex flex-1 flex-col">
      <div className="flex items-center gap-2 border-b px-4 py-2.5 bg-background">
        <div className="size-4 rounded bg-muted-foreground/15" />
        <span className="text-xs text-muted-foreground">Dashboard</span>
      </div>
      <div className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-2 h-full">
          {[0,1,2,3].map(i => (
            <div key={i} className="rounded-lg border border-dashed bg-background" />
          ))}
        </div>
      </div>
    </div>
  </div>
)

const NestedNavPreview = () => (
  <div className="flex flex-col w-52 rounded-xl border bg-sidebar overflow-hidden">
    <div className="flex flex-col gap-0.5 p-2">
      <div className="px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground/60">Navigation</div>
      {/* Non-nested */}
      <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground">
        <RiDashboardLine className="size-4" />
        Dashboard
      </div>
      {/* Collapsible with sub-items */}
      <div>
        <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent px-2 py-1.5 text-sm font-medium text-sidebar-accent-foreground">
          <RiLayoutGridLine className="size-4" />
          Components
          <RiArrowDownSLine className="ml-auto size-4" />
        </div>
        <div className="ml-3.5 mt-0.5 border-l border-sidebar-border pl-4 flex flex-col gap-0.5 pb-1">
          {["Button", "Input", "Select", "Avatar"].map(name => (
            <div key={name} className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground">
              {name}
            </div>
          ))}
        </div>
      </div>
      {/* Regular */}
      <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground">
        <RiSettingsLine className="size-4" />
        Settings
      </div>
    </div>
  </div>
)

const UserMenuPreview = () => (
  <div className="flex flex-col w-52 rounded-xl border bg-sidebar overflow-hidden">
    <div className="flex flex-1 flex-col gap-0.5 p-2">
      <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground">
        <RiDashboardLine className="size-4" />
        Dashboard
      </div>
      <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground">
        <RiGroupLine className="size-4" />
        Team
      </div>
    </div>
    <div className="border-t p-2">
      <div className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-sidebar-accent cursor-pointer">
        <div className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold shrink-0">IE</div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium truncate">Ikedi Eze</span>
          <span className="text-[10px] text-muted-foreground truncate">kasidyray@gmail.com</span>
        </div>
        <RiMore2Line className="ml-auto size-3.5 text-muted-foreground shrink-0" />
      </div>
    </div>
  </div>
)

// ── Do / Don't previews ────────────────────────────────────────────────────────

const DoGroupsPreview = () => (
  <div className="flex flex-col w-48 rounded-xl border bg-sidebar overflow-hidden">
    <div className="p-2 flex flex-col gap-0.5">
      <div className="px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground/60">Main</div>
      {[RiDashboardLine, RiGroupLine].map((Icon, i) => (
        <div key={i} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-muted-foreground">
          <Icon className="size-3.5" />{["Dashboard","Leads"][i]}
        </div>
      ))}
      <div className="my-1 h-px bg-border mx-1" />
      <div className="px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground/60">Settings</div>
      {[RiSettingsLine, RiShieldLine].map((Icon, i) => (
        <div key={i} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-muted-foreground">
          <Icon className="size-3.5" />{["Settings","Security"][i]}
        </div>
      ))}
    </div>
  </div>
)

const DontFlatPreview = () => (
  <div className="flex flex-col w-48 rounded-xl border bg-sidebar overflow-hidden">
    <div className="p-2 flex flex-col gap-0.5">
      {([
        [RiDashboardLine, "Dashboard"],
        [RiGroupLine, "Leads"],
        [RiFolderLine, "Projects"],
        [RiHistoryLine, "Activity"],
        [RiSettingsLine, "Settings"],
        [RiShieldLine, "Security"],
        [RiBankCardLine, "Billing"],
        [RiLogoutBoxLine, "Sign out"],
      ] as const).map(([Icon, label], i) => (
        <div key={i} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-muted-foreground">
          <Icon className="size-3.5" />{label}
        </div>
      ))}
    </div>
  </div>
)

const DoTooltipPreview = () => (
  <div className="flex items-center gap-4">
    <div className="flex flex-col gap-1">
      {[RiDashboardLine, RiGroupLine, RiSettingsLine].map((Icon, i) => (
        <div key={i} className="relative flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg border bg-sidebar hover:bg-sidebar-accent cursor-pointer">
            <Icon className="size-4" />
          </div>
          <div className="absolute left-10 whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-xs shadow-sm">
            {["Dashboard","Leads","Settings"][i]}
          </div>
        </div>
      ))}
    </div>
    <p className="text-xs text-muted-foreground max-w-[120px]">Tooltips auto-show in icon-collapsed mode via the tooltip prop.</p>
  </div>
)

const DontNoIconsPreview = () => (
  <div className="flex flex-col gap-1">
    {[RiDashboardLine, RiGroupLine, RiSettingsLine].map((Icon, i) => (
      <div key={i} className="flex size-8 items-center justify-center rounded-lg border bg-sidebar">
        <Icon className="size-4" />
      </div>
    ))}
    <p className="text-xs text-muted-foreground mt-1 max-w-[120px]">Without tooltips, icon-only items lose their label entirely.</p>
  </div>
)

// ── Sidebar design doc ─────────────────────────────────────────────────────────

export const sidebarDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  // ── Overview ─────────────────────────────────────────────────────────────────
  overview: {
    what: "A composable app navigation panel with grouped menu items, sub-menus, badges, and collapsible modes — built as a set of slots that compose into the full shell.",
    why: "App shells need a consistent, accessible, collapsible navigation surface that works across desktop and mobile without layout code being re-implemented per page.",
    problem: "Building a sidebar that collapses gracefully, converts to a drawer on mobile, supports nested nav, and retains state across navigations requires significant layout orchestration — the Sidebar system handles all of it.",
    appearsIn: [
      "Primary app navigation in multi-page dashboards",
      "Admin panels and settings layouts",
      "Documentation and component library browsers",
      "Multi-tenant apps with per-workspace navigation",
    ],
  },

  // ── Anatomy ──────────────────────────────────────────────────────────────────
  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "SidebarHeader",
        description: "Top slot for logo, wordmark, or workspace switcher. Fixed above the scrollable content area.",
      },
      {
        name: "SidebarGroupLabel",
        description: "Muted section heading above a group of menu items. Fades out in icon-collapsed mode.",
      },
      {
        name: "SidebarMenuButton",
        description: "The clickable row for each nav item. Holds the icon, label, and any inline controls. Supports tooltip, isActive, variant, and size.",
      },
      {
        name: "SidebarMenuBadge",
        description: "A count pill anchored to the right edge of a menu item row. Hidden in icon-collapsed mode.",
        optional: true,
      },
      {
        name: "SidebarMenuAction",
        description: "An icon button that appears at the far right of a menu item — typically a more or add icon. Can be set to showOnHover.",
        optional: true,
      },
      {
        name: "SidebarMenuSub / SidebarMenuSubButton",
        description: "Indented sub-navigation under a parent item. Renders with a left border line. Hidden in icon-collapsed mode.",
        optional: true,
      },
      {
        name: "SidebarSeparator",
        description: "A full-width divider between groups or sections of the sidebar.",
        optional: true,
      },
      {
        name: "SidebarFooter",
        description: "Bottom slot pinned below the content area. Typically holds the signed-in user menu.",
      },
    ],
  },

  // ── Usage ─────────────────────────────────────────────────────────────────────
  whenToUse: [
    "Primary navigation in any multi-page app that lives inside an app shell.",
    "When navigation has 5+ destinations that benefit from always-visible access.",
    "When a secondary hierarchy (sub-menu) exists under top-level nav items.",
    "When the layout needs to work identically on desktop and collapse to a sheet on mobile.",
  ],
  whenNotToUse: [
    "Contextual or page-level navigation — use Tabs instead.",
    "Simple 2–4 item navigation that fits in a top bar — use a horizontal nav.",
    "Filter panels or secondary toolbars — use a Sheet or a Popover.",
    "Full-screen pages like auth, onboarding, or error pages that have no app shell.",
  ],

  // ── Variants ─────────────────────────────────────────────────────────────────
  variants: [
    {
      name: "sidebar / floating / inset",
      description: "Three visual styles for how the sidebar sits relative to the content area.",
      when: "sidebar is the standard choice. floating adds depth (elevated card). inset wraps content in a rounded card inset from the sidebar background.",
      preview: <SidebarVariantPreview />,
      fullWidth: true,
    },
    {
      name: "Collapsible modes",
      description: "Controls how the sidebar collapses. offcanvas slides fully off-screen. icon shrinks to icon width with tooltips. none disables collapsing.",
      when: "offcanvas for most apps. icon when you want the sidebar icons always visible. none for layouts where the sidebar must always be present.",
      preview: <CollapsiblePreview />,
      fullWidth: true,
    },
  ],

  // ── States ────────────────────────────────────────────────────────────────────
  states: [
    {
      name: "SidebarGroupAction",
      description: "An icon button placed in the top-right of a group header — typically + or ⋯ — for adding items to that section.",
      preview: <GroupActionPreview />,
    },
    {
      name: "SidebarMenuAction",
      description: "A per-row icon button shown at the right edge of a menu item. Use showOnHover to reveal it only on row hover.",
      preview: <MenuActionPreview />,
    },
    {
      name: "SidebarMenuBadge",
      description: "A count pill fixed to the right of a menu item row. Hidden when collapsed to icon mode.",
      preview: <BadgePreview />,
    },
    {
      name: "SidebarMenuSkeleton",
      description: "Animated loading placeholder rows shown while nav items are being fetched.",
      preview: <SkeletonPreview />,
    },
  ],

  // ── Properties ────────────────────────────────────────────────────────────────
  properties: [
    {
      name: "variant (Sidebar)",
      values: "sidebar · floating · inset",
      default: "sidebar",
      description: "Controls the visual style of the sidebar panel relative to the content area.",
    },
    {
      name: "side (Sidebar)",
      values: "left · right",
      default: "left",
      description: "Which edge of the viewport the sidebar attaches to.",
    },
    {
      name: "collapsible (Sidebar)",
      values: "offcanvas · icon · none",
      default: "offcanvas",
      description: "How the sidebar collapses. offcanvas slides off-screen. icon shrinks to icon width. none disables collapsing.",
    },
    {
      name: "defaultOpen (SidebarProvider)",
      values: "true · false",
      default: "true",
      description: "Uncontrolled initial open state. Persisted to a cookie across page loads.",
    },
    {
      name: "open / onOpenChange (SidebarProvider)",
      values: "boolean / (open: boolean) => void",
      default: "—",
      description: "Controlled open state. Use when the parent needs to drive sidebar visibility.",
    },
    {
      name: "isActive (SidebarMenuButton)",
      values: "true · false",
      default: "false",
      description: "Marks the button as the currently active route. Applies accent background and medium font weight.",
    },
    {
      name: "tooltip (SidebarMenuButton)",
      values: "string · TooltipContent props",
      default: "—",
      description: "Label shown as a right-side tooltip when the sidebar is collapsed to icon mode.",
    },
    {
      name: "size (SidebarMenuButton)",
      values: "sm · default · lg",
      default: "default",
      description: "sm is h-8, default is h-9, lg is h-14 (suitable for a user row with avatar + 2 lines of text).",
    },
    {
      name: "showOnHover (SidebarMenuAction)",
      values: "true · false",
      default: "false",
      description: "When true, the action button is invisible until the parent menu item row is hovered or focused.",
    },
    {
      name: "showIcon (SidebarMenuSkeleton)",
      values: "true · false",
      default: "false",
      description: "Whether to render an icon-sized skeleton block alongside the text skeleton.",
    },
  ],

  // ── Content guidance ──────────────────────────────────────────────────────────
  contentGuidance: [
    {
      rule: "Group related destinations",
      detail: "Use SidebarGroup + SidebarGroupLabel to cluster nav items by area (Main, Settings, Examples). Never put all items in a flat unsectioned list.",
    },
    {
      rule: "Keep labels short",
      detail: "Menu item labels should be 1–2 words. Long labels truncate in icon mode and look cluttered in the expanded view.",
    },
    {
      rule: "Always provide tooltip on icon-mode items",
      detail: "Every SidebarMenuButton that will be visible in icon-collapsed mode must have a tooltip prop so the label is still accessible.",
    },
    {
      rule: "Badges are for counts, not status",
      detail: "SidebarMenuBadge is suited for unread counts or pending items — not for status states like Active or Pending (use StatusBadge in the content area instead).",
    },
  ],

  // ── Behavior ─────────────────────────────────────────────────────────────────
  behavior: [
    "⌘B (Ctrl+B) toggles the sidebar open/closed globally — this is wired automatically by SidebarProvider.",
    "On mobile (< md breakpoint) the sidebar automatically renders as a Sheet drawer regardless of the collapsible prop.",
    "Sidebar open state is persisted in a cookie (sidebar_state) and survives page refreshes.",
    "SidebarMenuSub and SidebarGroupLabel are hidden via CSS (not unmounted) when collapsed to icon mode, so sub-state is preserved.",
    "SidebarMenuButton with tooltip automatically shows the tooltip only when state === 'collapsed' — not in expanded mode.",
    "The SidebarRail provides a drag strip along the sidebar edge as an alternate collapse/expand handle.",
    "SidebarInset adds a bottom fade gradient over the content area to hint at scrollability.",
  ],

  // ── Spacing ───────────────────────────────────────────────────────────────────
  spacing: [
    {
      rule: "SidebarHeader / SidebarFooter padding",
      detail: "p-2 is applied automatically. Use px-3 py-2 on inner content rows for consistent alignment with menu items.",
    },
    {
      rule: "SidebarGroup padding",
      detail: "p-2 by default. SidebarGroupLabel has an h-8 row height with px-2 for alignment.",
    },
    {
      rule: "SidebarMenuButton gap",
      detail: "gap-4 between icon and label in menu buttons — wider than standard gap-2 to feel spacious in the nav context.",
    },
    {
      rule: "Sub-menu indent",
      detail: "SidebarMenuSub uses mx-3.5 border-l + px-6 to create the indented tree branch appearance.",
    },
    {
      rule: "CSS variable overrides",
      detail: "Pass --sidebar-width and --header-height as CSS variables on SidebarProvider to control dimensions project-wide.",
    },
  ],

  // ── Accessibility ─────────────────────────────────────────────────────────────
  accessibility: [
    {
      rule: "Keyboard toggle",
      detail: "⌘B / Ctrl+B is pre-wired for keyboard users. SidebarTrigger also responds to click and keyboard activation.",
    },
    {
      rule: "Landmark role",
      detail: "Wrap SidebarContent in a <nav> landmark or set role='navigation' on SidebarGroup when the content is primary navigation.",
    },
    {
      rule: "aria-label on icon buttons",
      detail: "All icon-only SidebarMenuButtons must have an aria-label describing the destination — the tooltip text is a good default.",
    },
    {
      rule: "SidebarMenuSkeleton for loading",
      detail: "Render skeletons with aria-busy='true' on the parent list while nav items load, so screen readers know content is pending.",
    },
    {
      rule: "Focus management on mobile",
      detail: "On mobile the sidebar is a Sheet — focus is trapped inside it when open, and returns to the trigger on close automatically.",
    },
  ],

  // ── Do & Don't ───────────────────────────────────────────────────────────────
  doItems: [
    {
      label: "Group items with SidebarGroupLabel",
      description: "Cluster related nav destinations under named sections to help users navigate large menus without scanning every item.",
      preview: <DoGroupsPreview />,
    },
    {
      label: "Add tooltip to every icon-mode item",
      description: "The tooltip prop auto-shows only when collapsed — it never displays in expanded mode, so there is no duplication.",
      preview: <DoTooltipPreview />,
    },
  ],
  dontItems: [
    {
      label: "Don't dump all items in a single flat list",
      description: "Without groups, long nav lists become impossible to scan. Use SidebarGroup to separate areas of the app.",
      preview: <DontFlatPreview />,
    },
    {
      label: "Don't omit tooltips on icon-only items",
      description: "In icon-collapsed mode, labels disappear. Without a tooltip the user has no way to know what each icon does.",
      preview: <DontNoIconsPreview />,
    },
  ],

  // ── Examples in context ───────────────────────────────────────────────────────
  examplesInContext: [
    {
      title: "Standard app shell",
      description: "The full SidebarProvider → Sidebar → SidebarInset layout with header, grouped nav, and a user footer.",
      preview: <AppShellPreview />,
      code: `<SidebarProvider>
  <Sidebar collapsible="offcanvas" variant="inset">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" render={<Link href="/" />}>
            <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Main</SidebarGroupLabel>
        <SidebarMenu>
          {navItems.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                isActive={pathname === item.url}
                tooltip={item.title}
                render={<Link href={item.url} />}
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <NavUser user={currentUser} />
    </SidebarFooter>
  </Sidebar>

  <SidebarInset>
    <SiteHeader />
    <div className="flex flex-1 flex-col p-6 md:overflow-y-auto">
      {children}
    </div>
  </SidebarInset>
</SidebarProvider>`,
    },
    {
      title: "Collapsible nested navigation",
      description: "A parent item using Collapsible to expand/collapse its sub-items — used for the Components nav in this app.",
      preview: <NestedNavPreview />,
      code: `<Collapsible
  defaultOpen={isActive}
  className="group/collapsible"
  render={<SidebarMenuItem />}
>
  <CollapsibleTrigger
    render={<SidebarMenuButton tooltip={item.title} isActive={isActive} />}
  >
    {item.icon}
    <span>{item.title}</span>
    <RiArrowRightSLine className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
  </CollapsibleTrigger>

  <CollapsibleContent>
    <SidebarMenuSub>
      {item.items.map(sub => (
        <SidebarMenuSubItem key={sub.title}>
          <SidebarMenuSubButton
            isActive={pathname === sub.url}
            render={<Link href={sub.url} />}
            className="text-muted-foreground data-active:text-foreground data-active:font-medium"
          >
            <span>{sub.title}</span>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  </CollapsibleContent>
</Collapsible>`,
    },
    {
      title: "User footer with menu",
      description: "SidebarFooter composing an avatar row that opens a dropdown for account actions.",
      preview: <UserMenuPreview />,
      code: `<SidebarFooter>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent"
            />
          }
        >
          <Avatar className="size-8 rounded-full">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 text-left">
            <span className="truncate text-sm font-medium">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">{user.email}</span>
          </div>
          <RiMore2Line className="ml-auto size-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="end" className="w-56">
          <DropdownMenuItem><RiSettingsLine />Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive"><RiLogoutBoxLine />Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarFooter>`,
    },
  ],

  // ── Related ───────────────────────────────────────────────────────────────────
  relatedComponents: [
    {
      slug: "tabs",
      name: "Tabs",
      description: "Horizontal tab navigation for switching between content sections within a page.",
      when: "Use instead of a sidebar when all destinations are within a single page and there are fewer than 6 options.",
    },
    {
      slug: "sheet",
      name: "Sheet",
      description: "A slide-in panel from any edge of the screen.",
      when: "Use instead of a sidebar for contextual panels, filters, or settings that don't need to be persistently visible.",
    },
    {
      slug: "dropdown-menu",
      name: "Dropdown Menu",
      description: "Contextual action menu.",
      when: "Use inside the SidebarFooter user row or SidebarMenuAction for per-item actions.",
    },
  ],

  // ── Design notes ──────────────────────────────────────────────────────────────
  designNotes: [
    "The sidebar uses its own token set: --sidebar, --sidebar-foreground, --sidebar-accent, --sidebar-accent-foreground, --sidebar-border, --sidebar-ring. Override these in CSS to theme the sidebar independently from the rest of the app.",
    "SidebarMenuButton gap-4 is intentionally wider than the standard gap-2 — the visual breathing room is part of the nav rhythm.",
    "SidebarMenuSub hides via CSS (not unmounting) so collapsible open states and scroll positions inside sub-menus survive a collapse/expand cycle.",
    "On mobile the Sidebar automatically renders as a Sheet — no extra code or condition is needed in the consumer.",
  ],
}
