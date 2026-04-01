"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  RiDashboardLine,
  RiGroupLine,
  RiSettingsLine,
  RiHistoryLine,
  RiAddLine,
  RiMore2Line,
  RiLayoutGridLine,
  RiArrowDownSLine,
  RiUserLine,
  RiFolderLine,
} from "@remixicon/react"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Previews ──────────────────────────────────────────────────────────────────

const BasicPreview = () => (
  <div className="w-full max-w-xs rounded-xl border overflow-hidden bg-sidebar">
    <div className="flex flex-col gap-0.5 p-2">
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarMenu>
          {[
            { icon: <RiDashboardLine />, label: "Dashboard", active: true },
            { icon: <RiGroupLine />, label: "Team" },
            { icon: <RiSettingsLine />, label: "Settings" },
          ].map(({ icon, label, active }) => (
            <SidebarMenuItem key={label}>
              <SidebarMenuButton isActive={active}>
                {icon}
                <span>{label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  </div>
)

const BadgePreview = () => (
  <div className="w-full max-w-xs rounded-xl border overflow-hidden bg-sidebar">
    <div className="p-2">
      <SidebarMenu>
        {[
          { icon: <RiDashboardLine />, label: "Dashboard", badge: undefined },
          { icon: <RiHistoryLine />, label: "Activity", badge: "12" },
          { icon: <RiGroupLine />, label: "Team", badge: "3" },
        ].map(({ icon, label, badge }) => (
          <SidebarMenuItem key={label}>
            <SidebarMenuButton>
              {icon}
              <span>{label}</span>
              {badge && <SidebarMenuBadge>{badge}</SidebarMenuBadge>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  </div>
)

const GroupActionPreview = () => (
  <div className="w-full max-w-xs rounded-xl border overflow-hidden bg-sidebar">
    <div className="p-2">
      <SidebarGroup>
        <SidebarGroupLabel>
          Projects
          <SidebarGroupAction aria-label="Add project">
            <RiAddLine />
          </SidebarGroupAction>
        </SidebarGroupLabel>
        <SidebarMenu>
          {["Raana Design System", "MTN Portal", "Acme App"].map(name => (
            <SidebarMenuItem key={name}>
              <SidebarMenuButton>
                <RiFolderLine />
                <span>{name}</span>
                <SidebarMenuAction showOnHover aria-label="More options">
                  <RiMore2Line />
                </SidebarMenuAction>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  </div>
)

const SubMenuPreview = () => (
  <div className="w-full max-w-xs rounded-xl border overflow-hidden bg-sidebar">
    <div className="p-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton isActive>
            <RiLayoutGridLine />
            <span>Components</span>
            <RiArrowDownSLine className="ml-auto" />
          </SidebarMenuButton>
          <SidebarMenuSub>
            {["Button", "Input", "Select", "Avatar"].map(name => (
              <SidebarMenuSubItem key={name}>
                <SidebarMenuSubButton isActive={name === "Button"}>
                  <span>{name}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <RiSettingsLine />
            <span>Settings</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  </div>
)

const SkeletonPreview = () => (
  <div className="w-full max-w-xs rounded-xl border overflow-hidden bg-sidebar">
    <div className="p-2">
      <SidebarMenu>
        {[true, false, false, false].map((showIcon, i) => (
          <SidebarMenuItem key={i}>
            <SidebarMenuSkeleton showIcon={showIcon} />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  </div>
)

// ── Sidebar develop doc ───────────────────────────────────────────────────────

export const sidebarDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/sidebar",
    importPath: `import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarGroupAction, SidebarGroupLabel, SidebarHeader,
  SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge,
  SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton,
  SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,
  SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "Sidebar depends on Sheet, Tooltip, Skeleton, Separator, Button, and Input — these are installed automatically.",
      "Install @remixicon/react if not present: npm install @remixicon/react",
    ],
  },

  basicUsage: `import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Minimal app shell
export default function Layout({ children }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas" variant="inset">
        <SidebarHeader>
          {/* Logo or wordmark */}
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
          {/* User menu */}
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        {/* Your page content here */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}`,

  codeExamples: [
    {
      title: "Basic nav group",
      description: "A SidebarGroup with a label and menu items — the core building block of any sidebar.",
      preview: <BasicPreview />,
      code: `<SidebarGroup>
  <SidebarGroupLabel>Navigation</SidebarGroupLabel>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton isActive render={<Link href="/dashboard" />}>
        <RiDashboardLine />
        <span>Dashboard</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
    <SidebarMenuItem>
      <SidebarMenuButton render={<Link href="/team" />}>
        <RiGroupLine />
        <span>Team</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
    <SidebarMenuItem>
      <SidebarMenuButton render={<Link href="/settings" />}>
        <RiSettingsLine />
        <span>Settings</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarGroup>`,
    },
    {
      title: "Menu item with badge",
      description: "SidebarMenuBadge shows a count at the right edge of a row. It auto-hides in icon-collapsed mode.",
      preview: <BadgePreview />,
      code: `<SidebarMenuItem>
  <SidebarMenuButton render={<Link href="/activity" />}>
    <RiHistoryLine />
    <span>Activity</span>
    <SidebarMenuBadge>12</SidebarMenuBadge>
  </SidebarMenuButton>
</SidebarMenuItem>`,
    },
    {
      title: "Group action + per-item action",
      description: "SidebarGroupAction places a button in the group header. SidebarMenuAction adds a per-row action that appears on hover.",
      preview: <GroupActionPreview />,
      code: `<SidebarGroup>
  <SidebarGroupLabel>
    Projects
    <SidebarGroupAction aria-label="Add project" onClick={handleAdd}>
      <RiAddLine />
    </SidebarGroupAction>
  </SidebarGroupLabel>

  <SidebarMenu>
    {projects.map(project => (
      <SidebarMenuItem key={project.id}>
        <SidebarMenuButton render={<Link href={project.url} />}>
          <RiFolderLine />
          <span>{project.name}</span>
          <SidebarMenuAction
            showOnHover
            aria-label="Project options"
            onClick={e => { e.preventDefault(); openMenu(project.id) }}
          >
            <RiMore2Line />
          </SidebarMenuAction>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))}
  </SidebarMenu>
</SidebarGroup>`,
    },
    {
      title: "Collapsible sub-menu",
      description: "Use the Collapsible component from @base-ui/react to wire expand/collapse behaviour on a parent nav item.",
      preview: <SubMenuPreview />,
      code: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { RiArrowRightSLine } from "@remixicon/react"

<Collapsible
  defaultOpen={isActive}
  className="group/collapsible"
  render={<SidebarMenuItem />}
>
  <CollapsibleTrigger
    render={<SidebarMenuButton isActive={isActive} tooltip={item.title} />}
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
      title: "Loading skeleton",
      description: "SidebarMenuSkeleton renders animated placeholder rows while nav data is being fetched.",
      preview: <SkeletonPreview />,
      code: `// While loading nav items
{isLoading ? (
  <SidebarMenu>
    {Array.from({ length: 5 }).map((_, i) => (
      <SidebarMenuItem key={i}>
        <SidebarMenuSkeleton showIcon />
      </SidebarMenuItem>
    ))}
  </SidebarMenu>
) : (
  <SidebarMenu>
    {navItems.map(item => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton render={<Link href={item.url} />}>
          {item.icon}
          <span>{item.title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))}
  </SidebarMenu>
)}`,
    },
    {
      title: "useSidebar hook",
      description: "Access sidebar state anywhere inside SidebarProvider — useful for conditionally rendering content or syncing UI to collapse state.",
      code: `"use client"
import { useSidebar } from "@/components/ui/sidebar"

function SiteHeader() {
  const { toggleSidebar, state, isMobile } = useSidebar()

  return (
    <header className="flex items-center gap-2 border-b px-4 h-12">
      <SidebarTrigger />
      {state === "collapsed" && !isMobile && (
        <span className="text-sm text-muted-foreground">Sidebar hidden</span>
      )}
    </header>
  )
}

// Available from useSidebar():
// state         — "expanded" | "collapsed"
// open          — boolean
// setOpen       — (open: boolean) => void
// isMobile      — boolean (true when < md breakpoint)
// openMobile    — boolean
// setOpenMobile — (open: boolean) => void
// toggleSidebar — () => void`,
    },
    {
      title: "CSS variable overrides",
      description: "Customise sidebar dimensions and theme tokens via CSS variables on SidebarProvider.",
      code: `// Adjust width and header height via SidebarProvider style
<SidebarProvider
  style={{
    "--sidebar-width": "calc(var(--spacing) * 72)",  // 18rem
    "--header-height": "calc(var(--spacing) * 12)",  // 3rem
  }}
>
  <Sidebar>...</Sidebar>
  <SidebarInset>...</SidebarInset>
</SidebarProvider>

// Override sidebar token colours in globals.css
:root {
  --sidebar:                  var(--card);
  --sidebar-foreground:       var(--card-foreground);
  --sidebar-accent:           var(--muted);
  --sidebar-accent-foreground: var(--foreground);
  --sidebar-border:           var(--border);
  --sidebar-ring:             var(--ring);
}`,
    },
  ],

  apiReference: [
    {
      name: "SidebarProvider",
      values: "defaultOpen?: boolean, open?: boolean, onOpenChange?: (open: boolean) => void",
      default: "defaultOpen=true",
      description: "Root context provider. Manages open state, mobile detection, and ⌘B keyboard shortcut. Must wrap all other sidebar components.",
    },
    {
      name: "Sidebar",
      values: "side?: 'left' | 'right', variant?: 'sidebar' | 'floating' | 'inset', collapsible?: 'offcanvas' | 'icon' | 'none'",
      default: "side=left, variant=sidebar, collapsible=offcanvas",
      description: "The sidebar panel itself. On mobile it renders as a Sheet drawer automatically.",
    },
    {
      name: "SidebarInset",
      values: "React.ComponentProps<'main'>",
      default: "—",
      description: "The <main> content area rendered beside the sidebar. Handles inset rounded-card style when variant='inset'.",
    },
    {
      name: "SidebarTrigger",
      values: "React.ComponentProps<typeof Button>",
      default: "—",
      description: "Ghost icon button that calls toggleSidebar(). Drop it in your site header.",
    },
    {
      name: "SidebarRail",
      values: "React.ComponentProps<'button'>",
      default: "—",
      description: "An invisible drag strip along the sidebar edge as an alternate collapse/expand handle.",
    },
    {
      name: "SidebarHeader / SidebarFooter",
      values: "React.ComponentProps<'div'>",
      default: "—",
      description: "Top and bottom fixed slots. Header is for the logo; footer is for the user menu.",
    },
    {
      name: "SidebarContent",
      values: "React.ComponentProps<'div'>",
      default: "—",
      description: "Scrollable middle area with top/bottom fade gradients. Place all SidebarGroup components here.",
    },
    {
      name: "SidebarGroup",
      values: "React.ComponentProps<'div'>",
      default: "—",
      description: "Padded section wrapper. Compose multiple groups to create labelled nav sections.",
    },
    {
      name: "SidebarGroupLabel",
      values: "render?: render prop",
      default: "—",
      description: "Muted section heading. h-8 row height. Fades and collapses when sidebar is in icon mode.",
    },
    {
      name: "SidebarGroupAction",
      values: "render?: render prop",
      default: "—",
      description: "Absolutely-positioned icon button in the top-right of a group header. Hidden in icon-collapsed mode.",
    },
    {
      name: "SidebarMenu / SidebarMenuItem",
      values: "React.ComponentProps<'ul'> / React.ComponentProps<'li'>",
      default: "—",
      description: "SidebarMenu is the <ul> list. SidebarMenuItem is the <li> wrapper required for action/badge absolute positioning.",
    },
    {
      name: "SidebarMenuButton",
      values: "isActive?: boolean, tooltip?: string | TooltipContent props, variant?: 'default' | 'outline', size?: 'sm' | 'default' | 'lg', render?: render prop",
      default: "variant=default, size=default",
      description: "The clickable nav row. Accepts any element via render. Shows tooltip automatically only in icon-collapsed mode.",
    },
    {
      name: "SidebarMenuAction",
      values: "showOnHover?: boolean, render?: render prop",
      default: "showOnHover=false",
      description: "Icon button at the right of a menu item. showOnHover makes it visible only on row hover/focus.",
    },
    {
      name: "SidebarMenuBadge",
      values: "React.ComponentProps<'div'>",
      default: "—",
      description: "Count pill anchored to the right of the row. Hidden in icon-collapsed mode.",
    },
    {
      name: "SidebarMenuSkeleton",
      values: "showIcon?: boolean",
      default: "showIcon=false",
      description: "Animated loading placeholder row. showIcon renders an icon-sized skeleton block alongside the text.",
    },
    {
      name: "SidebarMenuSub",
      values: "React.ComponentProps<'ul'>",
      default: "—",
      description: "Indented <ul> for nested items with a left border line. Hidden via CSS in icon-collapsed mode.",
    },
    {
      name: "SidebarMenuSubItem / SidebarMenuSubButton",
      values: "size?: 'sm' | 'md', isActive?: boolean, render?: render prop",
      default: "size=md",
      description: "<li> wrapper and clickable sub-row. Sub-buttons are h-7 and styled with muted text that darkens on active.",
    },
    {
      name: "SidebarSeparator",
      values: "React.ComponentProps<typeof Separator>",
      default: "—",
      description: "Full-width horizontal divider styled for the sidebar background. Use between groups.",
    },
    {
      name: "useSidebar()",
      values: "—",
      default: "—",
      description: "Hook returning: state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar. Must be used inside SidebarProvider.",
    },
  ],

  accessibility: [
    {
      rule: "⌘B / Ctrl+B keyboard shortcut",
      detail: "SidebarProvider automatically registers this shortcut. Do not re-implement it — it will conflict.",
    },
    {
      rule: "Navigation landmark",
      detail: "Wrap SidebarMenu in a <nav aria-label='Main navigation'> or use the nav element as the render prop on SidebarGroup when the menu is primary navigation.",
    },
    {
      rule: "tooltip on all icon-mode items",
      detail: "Every SidebarMenuButton visible in icon-collapsed mode must have a tooltip prop. Without it the icon has no accessible label when text is hidden.",
    },
    {
      rule: "aria-label on action buttons",
      detail: "SidebarMenuAction and SidebarGroupAction render icon-only buttons. Always provide aria-label describing the action (e.g. 'Add project', 'More options').",
    },
    {
      rule: "Mobile focus trap",
      detail: "On mobile the sidebar renders as a Sheet — focus is trapped inside it automatically when open. Do not manually manage focus for the mobile drawer.",
    },
    {
      rule: "aria-busy on loading skeleton",
      detail: "Add aria-busy='true' to the parent SidebarMenu while rendering SidebarMenuSkeleton so screen readers know content is pending.",
    },
  ],
}
