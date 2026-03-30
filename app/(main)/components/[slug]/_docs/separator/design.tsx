"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { ComponentDocData } from "../../component-doc-types"

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2 w-full max-w-xs">
    <div className="flex flex-col gap-2 w-full text-sm">
      <span className="text-muted-foreground">Section A</span>
      <Separator />
      <span className="text-muted-foreground">Section B</span>
    </div>
    <div className="flex items-start flex-wrap gap-8 text-center justify-center">
      {["① bg-border colour", "② h-px thickness", "③ w-full span"].map(label => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="h-5 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

const HorizontalPreview = () => (
  <div className="flex flex-col gap-2 text-sm w-full max-w-xs">
    <span>Profile</span>
    <Separator />
    <span>Notifications</span>
    <Separator />
    <span>Security</span>
  </div>
)

const VerticalPreview = () => (
  <div className="flex items-center gap-3 text-sm h-5">
    <span>Home</span>
    <Separator orientation="vertical" />
    <span>Projects</span>
    <Separator orientation="vertical" />
    <span>Team</span>
    <Separator orientation="vertical" />
    <span>Settings</span>
  </div>
)

const InCardPreview = () => (
  <div className="w-full max-w-sm rounded-xl border overflow-hidden">
    <div className="p-4 flex items-center gap-3">
      <Avatar className="size-9">
        <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Ikedi" />
        <AvatarFallback>IE</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">Ikedi Eze</p>
        <p className="text-xs text-muted-foreground">kasidyray@gmail.com</p>
      </div>
    </div>
    <Separator />
    <div className="p-4 flex flex-col gap-0.5">
      <Button variant="ghost" size="sm" className="w-full justify-start">Profile settings</Button>
      <Button variant="ghost" size="sm" className="w-full justify-start">Billing</Button>
    </div>
    <Separator />
    <div className="p-4">
      <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive">Sign out</Button>
    </div>
  </div>
)

const BreadcrumbStylePreview = () => (
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <span className="text-foreground font-medium">Dashboard</span>
    <Separator orientation="vertical" className="h-4" />
    <span>Projects</span>
    <Separator orientation="vertical" className="h-4" />
    <span>Raana Xi</span>
  </div>
)

export const separatorDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  overview: {
    what: "A thin 1px horizontal or vertical line that visually divides content into distinct sections.",
    why: "Whitespace alone is sometimes insufficient to communicate a hard boundary between sections. A 1px border-coloured line provides a clear, low-weight visual separator.",
    problem: "Teams use hr elements or manual border classes inconsistently. Separator provides a single semantic component with correct roles and tokens.",
    appearsIn: ["Cards and panels", "Menus and dropdowns", "Navigation bars", "Settings lists", "Profile cards"],
  },

  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      { name: "Separator", description: "A base-ui Separator primitive rendered as a div with role='separator'. bg-border colour, h-px (horizontal) or w-px (vertical), shrink-0 to prevent flex collapse." },
    ],
  },

  whenToUse: [
    "Between logically distinct sections of a panel, card, or menu.",
    "As a vertical divider between inline navigation items or breadcrumb segments.",
    "Between a header and content body in a popover or dropdown.",
    "To split action groups within a toolbar or menu.",
  ],

  whenNotToUse: [
    "Between every list item — use gap spacing for same-level items.",
    "As a decorative element with custom colours or thickness.",
    "Inside dense data tables where table row borders already provide separation.",
  ],

  variants: [
    {
      name: "Horizontal (default)",
      description: "Full-width 1px line. Used between stacked sections.",
      when: "Card sections, settings rows, menu groups",
      preview: <HorizontalPreview />,
      fullWidth: true,
    },
    {
      name: "Vertical",
      description: "1px line that stretches to container height via self-stretch. Add a fixed h-* class to cap the height.",
      when: "Inline nav items, breadcrumbs, toolbar dividers",
      preview: <VerticalPreview />,
    },
  ],

  states: [
    {
      name: "In a profile card",
      description: "Horizontal separators split the avatar header, action list, and sign-out into distinct zones.",
      preview: <InCardPreview />,
    },
    {
      name: "Vertical in a breadcrumb",
      description: "Vertical separators with className='h-4' create compact inline dividers matching text line-height.",
      preview: <BreadcrumbStylePreview />,
    },
  ],

  properties: [
    {
      name: "orientation",
      values: "horizontal · vertical",
      default: "horizontal",
      description: "horizontal: h-px w-full. vertical: w-px self-stretch. Use className='h-4' to cap vertical separator height.",
    },
    {
      name: "className",
      values: "string",
      default: "—",
      description: "Override default sizing. h-4 on vertical separators prevents them from stretching the full container height.",
    },
  ],

  contentGuidance: [
    {
      rule: "Use sparingly — let spacing do the work first",
      detail: "Add a Separator only when whitespace alone doesn't communicate a hard content boundary. Over-separating fragments layouts.",
    },
    {
      rule: "Cap vertical separators with h-*",
      detail: "Vertical separators use self-stretch by default. Set className='h-4' or 'h-5' to match surrounding text line-height.",
    },
  ],

  behavior: [
    "Renders as a div with role='separator' and aria-orientation matching the orientation prop.",
    "shrink-0 prevents collapse in flex containers.",
    "data-horizontal and data-vertical attributes drive the h-px / w-px sizing.",
  ],

  spacing: [
    { rule: "Thickness", detail: "Always 1px — h-px or w-px. Never thicker." },
    { rule: "Colour", detail: "bg-border — never override with raw colour values." },
    { rule: "Margin", detail: "Separator has no built-in margin. Add gap-* or my-* on the parent." },
  ],

  accessibility: [
    {
      rule: "role='separator' is set automatically",
      detail: "The base-ui primitive sets role='separator' and aria-orientation. No additional ARIA is needed.",
    },
  ],

  doItems: [
    {
      label: "Use between logically distinct sections",
      description: "A separator marks a meaningful boundary — between a header and body, or between action groups in a menu.",
      preview: <InCardPreview />,
    },
    {
      label: "Cap vertical separators with h-4",
      description: "Without a height cap, vertical separators stretch to the full container, which looks wrong in inline contexts.",
      preview: <BreadcrumbStylePreview />,
    },
  ],

  dontItems: [
    {
      label: "Don't separate every list item",
      description: "Use gap spacing for same-level items. Separators are for group boundaries, not item dividers.",
      preview: (
        <div className="flex flex-col w-full max-w-xs text-sm">
          {["Dashboard", "Projects", "Team", "Settings"].map((item, i, arr) => (
            <div key={item}>
              <div className="py-2 text-muted-foreground">{item}</div>
              {i < arr.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      ),
    },
  ],

  examplesInContext: [
    {
      title: "Profile card with section separators",
      description: "Horizontal separators divide the user header, actions, and sign-out into distinct zones.",
      preview: <InCardPreview />,
      code: `<div className="rounded-xl border overflow-hidden">
  <div className="p-4 flex items-center gap-3">
    <Avatar className="size-9">...</Avatar>
    <div>
      <p className="text-sm font-medium">Ikedi Eze</p>
      <p className="text-xs text-muted-foreground">kasidyray@gmail.com</p>
    </div>
  </div>
  <Separator />
  <div className="p-4 flex flex-col gap-0.5">
    <Button variant="ghost" size="sm" className="w-full justify-start">Profile settings</Button>
    <Button variant="ghost" size="sm" className="w-full justify-start">Billing</Button>
  </div>
  <Separator />
  <div className="p-4">
    <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive">
      Sign out
    </Button>
  </div>
</div>`,
    },
  ],

  relatedComponents: [
    {
      slug: "card",
      name: "Card",
      description: "Surface container with built-in border.",
      when: "Use Card for a full bordered container. Separator works inside Card to split sections.",
    },
  ],

  designNotes: [
    "Separator is always 1px and bg-border. Never customise thickness or colour.",
    "For vertical separators in nav items, h-4 (16px) matches text-sm line-height exactly.",
    "shrink-0 is critical in flex rows — without it the separator collapses to 0 width.",
  ],
}
