"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  RiFilterLine,
  RiEqualizerLine,
  RiUserLine,
} from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview (static mock of open popover) ─────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline" size="sm" className="pointer-events-none">Open popover</Button>
      <div className="w-72 rounded-lg bg-popover p-4 text-sm text-popover-foreground shadow-2xl ring-1 ring-foreground/5">
        <div className="flex flex-col gap-1 mb-4">
          <p className="text-base font-medium">Dimensions</p>
          <p className="text-muted-foreground text-xs">Set the dimensions for the layer.</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="w-12 text-right text-xs text-muted-foreground">Width</span>
            <div className="flex-1 h-8 rounded border border-input bg-input/30 px-2 flex items-center text-xs">100%</div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-12 text-right text-xs text-muted-foreground">Height</span>
            <div className="flex-1 h-8 rounded border border-input bg-input/30 px-2 flex items-center text-xs">25px</div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex items-start flex-wrap gap-6 text-center justify-center">
      {[
        "① PopoverTrigger",
        "② PopoverContent (w-72)",
        "③ PopoverHeader",
        "④ Custom content slot",
      ].map(label => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="h-5 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

// ── Variant previews ───────────────────────────────────────────────────────────

const FormPopoverPreview = () => (
  <div className="flex justify-center">
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>
        <RiEqualizerLine />Dimensions
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Layer dimensions</PopoverTitle>
          <PopoverDescription>Set the width and height for the selected layer.</PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Label htmlFor="pop-w" className="w-12 text-right text-xs">Width</Label>
            <Input id="pop-w" defaultValue="100%" className="h-8" />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="pop-h" className="w-12 text-right text-xs">Height</Label>
            <Input id="pop-h" defaultValue="25px" className="h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </div>
)

const InfoPopoverPreview = () => (
  <div className="flex justify-center">
    <Popover>
      <PopoverTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <RiUserLine />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Ikedi Eze</PopoverTitle>
          <PopoverDescription>kasidyray@gmail.com · Admin</PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col gap-1">
          <Button variant="ghost" size="sm" className="w-full justify-start">Profile settings</Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">Switch workspace</Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive">Sign out</Button>
        </div>
      </PopoverContent>
    </Popover>
  </div>
)

// ── State previews ─────────────────────────────────────────────────────────────

const PositioningPreview = () => (
  <div className="flex flex-wrap gap-3 justify-center">
    {(["top", "bottom", "left", "right"] as const).map(side => (
      <Popover key={side}>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          {side}
        </PopoverTrigger>
        <PopoverContent side={side}>
          <p className="text-sm">Opens from <strong>{side}</strong></p>
        </PopoverContent>
      </Popover>
    ))}
  </div>
)

const AlignmentPreview = () => (
  <div className="flex flex-wrap gap-3 justify-center">
    {(["start", "center", "end"] as const).map(align => (
      <Popover key={align}>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          align="{align}"
        </PopoverTrigger>
        <PopoverContent align={align}>
          <p className="text-sm">Aligned to <strong>{align}</strong></p>
        </PopoverContent>
      </Popover>
    ))}
  </div>
)

// ── Do / Don't previews ────────────────────────────────────────────────────────

const DoRichContentPreview = () => (
  <div className="flex justify-center">
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>
        <RiFilterLine />Filters
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Filter results</PopoverTitle>
        </PopoverHeader>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Label htmlFor="min-amt" className="w-8 text-xs">Min</Label>
            <Input id="min-amt" placeholder="0" className="h-8" />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="max-amt" className="w-8 text-xs">Max</Label>
            <Input id="max-amt" placeholder="1000" className="h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </div>
)

// ── Context examples ───────────────────────────────────────────────────────────

const UserMenuPopoverExample = () => (
  <div className="flex justify-center">
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>
        <RiUserLine />Ikedi Eze
      </PopoverTrigger>
      <PopoverContent align="end">
        <PopoverHeader>
          <PopoverTitle>Ikedi Eze</PopoverTitle>
          <PopoverDescription>kasidyray@gmail.com</PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col gap-0.5">
          <Button variant="ghost" size="sm" className="w-full justify-start">Profile settings</Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">Billing</Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">Switch workspace</Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive">Sign out</Button>
        </div>
      </PopoverContent>
    </Popover>
  </div>
)

const FilterPopoverExample = () => (
  <div className="flex justify-center">
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>
        <RiEqualizerLine />Layer settings
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Layer settings</PopoverTitle>
          <PopoverDescription>Adjust the size and position of this layer.</PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Label htmlFor="ctx-w" className="w-16 text-right text-xs">Width</Label>
            <Input id="ctx-w" defaultValue="100%" className="h-8" />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="ctx-h" className="w-16 text-right text-xs">Height</Label>
            <Input id="ctx-h" defaultValue="25px" className="h-8" />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="ctx-x" className="w-16 text-right text-xs">X position</Label>
            <Input id="ctx-x" defaultValue="0px" className="h-8" />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="ctx-y" className="w-16 text-right text-xs">Y position</Label>
            <Input id="ctx-y" defaultValue="0px" className="h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </div>
)

// ── Popover design doc ─────────────────────────────────────────────────────────

export const popoverDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  overview: {
    what: "An anchored floating panel that opens on click, displaying rich content like forms, menus, or settings inline without navigating away.",
    why: "Many actions need a lightweight editor, filter panel, or quick action menu without the full weight of a Dialog or Sheet. Popover provides an anchored panel that stays near its trigger.",
    problem: "Teams reach for Dialog or custom dropdowns when they need a quick inline panel. Dialogs interrupt focus too aggressively; custom solutions lack animation, focus management, and positioning logic.",
    appearsIn: ["Settings panels", "User account menus", "Filter controls", "Inline editors", "Color pickers", "Date range selectors"],
  },

  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      { name: "Popover", description: "Root component. Manages open/closed state and the trigger-to-content relationship." },
      { name: "PopoverTrigger", description: "The element that toggles the popover. Uses render prop pattern: render={<Button />} with children as the label." },
      { name: "PopoverContent", description: "The floating panel. Default w-72, positioned via side and align props. Rendered in a portal." },
      { name: "PopoverHeader", description: "Optional wrapper for title + description with consistent gap-1 spacing.", optional: true },
      { name: "PopoverTitle", description: "Semantic title element (base-ui Title). font-medium text-base.", optional: true },
      { name: "PopoverDescription", description: "Supporting text below the title. text-muted-foreground.", optional: true },
    ],
  },

  whenToUse: [
    "Rich inline editors — dimensions, colors, date ranges — that need more than a tooltip but less than a Dialog.",
    "User account menus and workspace switchers triggered from the navigation bar.",
    "Quick filter panels anchored to a filter button in a toolbar.",
    "Multi-step inline settings that should stay near the trigger element.",
  ],

  whenNotToUse: [
    "Short text labels or definitions — use Tooltip instead (hover-triggered, no interaction).",
    "Rich preview cards on hover — use HoverCard instead.",
    "Destructive confirmations or multi-step flows — use Dialog or AlertDialog.",
    "Full-height side panels — use Drawer or Sheet instead.",
    "Picking from a list of options — use DropdownMenu or Select instead.",
  ],

  variants: [
    {
      name: "Form popover",
      description: "Contains labelled inputs and a submit action. The most common usage — dimensions, filters, settings.",
      when: "Inline editors, filter panels, layer settings",
      preview: <FormPopoverPreview />,
    },
    {
      name: "Info / menu popover",
      description: "Header with user info followed by a list of ghost button actions. Used for account menus and quick action lists.",
      when: "Account menus, entity quick actions",
      preview: <InfoPopoverPreview />,
    },
  ],

  states: [
    {
      name: "Side positioning",
      description: "Use the side prop to control which side of the trigger the panel opens from. Default is bottom.",
      preview: <PositioningPreview />,
    },
    {
      name: "Alignment",
      description: "Use the align prop to control horizontal alignment relative to the trigger. Default is center.",
      preview: <AlignmentPreview />,
    },
  ],

  properties: [
    {
      name: "side (PopoverContent)",
      values: "top · bottom · left · right",
      default: "bottom",
      description: "Which side of the trigger the panel opens from. The positioner adjusts automatically to stay in viewport.",
    },
    {
      name: "align (PopoverContent)",
      values: "start · center · end",
      default: "center",
      description: "Horizontal alignment relative to the trigger. Use 'end' for triggers near the right edge.",
    },
    {
      name: "sideOffset (PopoverContent)",
      values: "number",
      default: "4",
      description: "Distance in pixels between the trigger and the panel edge.",
    },
    {
      name: "alignOffset (PopoverContent)",
      values: "number",
      default: "0",
      description: "Pixel offset applied to the aligned edge.",
    },
    {
      name: "className (PopoverContent)",
      values: "string",
      default: "—",
      description: "Applied to the popup panel. Use to override the default w-72 width for wider content.",
    },
  ],

  contentGuidance: [
    {
      rule: "Keep content focused and actionable",
      detail: "Popovers should contain one task. If the content grows beyond a few inputs and a button, consider a Drawer or Dialog.",
    },
    {
      rule: "PopoverTitle + PopoverDescription for contextual popovers",
      detail: "Include a title when the popover's purpose isn't obvious from the trigger label. Omit when the trigger is self-explanatory (e.g. 'Dimensions' button → Dimensions popover).",
    },
    {
      rule: "use align='end' for right-edge triggers",
      detail: "Account menus and trailing action buttons sit at the right edge. align='end' prevents the popover from clipping the viewport.",
    },
  ],

  behavior: [
    "Opens on click (not hover). Closes on outside click, Escape key, or clicking the trigger again.",
    "Rendered in a portal — not affected by parent overflow:hidden or z-index stacking contexts.",
    "The positioner auto-flips side if there is insufficient space. A top-anchored popover flips to bottom if near the top edge.",
    "Animation: fade-in + zoom-in on open, fade-out + zoom-out on close. Duration 100ms.",
    "Focus is not trapped. Tab can leave the popover. Use Dialog for modal interactions that require focus trap.",
  ],

  spacing: [
    { rule: "Panel padding", detail: "p-4 on PopoverContent — 16px on all sides." },
    { rule: "PopoverHeader gap", detail: "gap-1 between PopoverTitle and PopoverDescription." },
    { rule: "Panel width", detail: "w-72 default. Override with className for wider content (w-80, w-96)." },
    { rule: "Trigger gap", detail: "sideOffset=4 — 4px between the trigger and the panel edge." },
  ],

  accessibility: [
    {
      rule: "PopoverTrigger uses the render prop pattern",
      detail: "render={<Button />} with children as the label. The button must have a visible text label or aria-label.",
    },
    {
      rule: "Popover does not trap focus",
      detail: "Tab navigates through the popover and continues to the next focusable element on the page. This is intentional for non-modal content.",
    },
    {
      rule: "Escape closes the popover",
      detail: "base-ui handles Escape key dismissal. Ensure the trigger remains focusable after close.",
    },
    {
      rule: "Form inputs inside popovers need labels",
      detail: "Every input inside a PopoverContent must have an associated Label. The popover context does not provide accessible names.",
    },
  ],

  doItems: [
    {
      label: "Use Popover for rich inline content that needs to stay near its trigger",
      description: "Popovers are ideal for dimension editors, filter panels, and account menus — contextual content that doesn't need the full screen.",
      preview: <DoRichContentPreview />,
    },
    {
      label: "Use align='end' for triggers on the right edge",
      description: "Account menus and trailing icon buttons sit at the right edge. align='end' prevents the panel from clipping outside the viewport.",
      preview: <InfoPopoverPreview />,
    },
  ],

  dontItems: [
    {
      label: "Don't use Popover for short text labels",
      description: "Single-line labels or definitions belong in a Tooltip. Popovers are for interactive or rich content.",
      preview: (
        <div className="flex justify-center">
          <Popover>
            <PopoverTrigger render={<Button variant="ghost" size="sm" />}>Hover me</PopoverTrigger>
            <PopoverContent>
              <p className="text-sm text-muted-foreground">This is a tooltip-level message. Use Tooltip instead.</p>
            </PopoverContent>
          </Popover>
        </div>
      ),
    },
    {
      label: "Don't use Popover for destructive confirmations",
      description: "Destructive actions that cannot be undone need the full attention of AlertDialog — not a dismissible popover.",
      preview: (
        <div className="flex justify-center">
          <p className="text-xs text-muted-foreground">Use AlertDialog for delete confirmations, not Popover.</p>
        </div>
      ),
    },
  ],

  examplesInContext: [
    {
      title: "Layer settings editor",
      description: "A popover with inline form inputs for editing layer dimensions. PopoverHeader provides context; inputs are labelled with right-aligned Label elements.",
      preview: <FilterPopoverExample />,
      code: `<Popover>
  <PopoverTrigger render={<Button variant="outline" size="sm" />}>
    <RiEqualizerLine />Layer settings
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Layer settings</PopoverTitle>
      <PopoverDescription>Adjust the size and position of this layer.</PopoverDescription>
    </PopoverHeader>
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Label htmlFor="width" className="w-16 text-right text-xs">Width</Label>
        <Input id="width" defaultValue="100%" className="h-8" />
      </div>
      <div className="flex items-center gap-3">
        <Label htmlFor="height" className="w-16 text-right text-xs">Height</Label>
        <Input id="height" defaultValue="25px" className="h-8" />
      </div>
    </div>
  </PopoverContent>
</Popover>`,
    },
    {
      title: "User account menu",
      description: "A popover aligned to the end of its trigger shows user info in a header followed by ghost action buttons. Use align='end' for right-edge triggers.",
      preview: <UserMenuPopoverExample />,
      code: `<Popover>
  <PopoverTrigger render={<Button variant="outline" size="sm" />}>
    <RiUserLine />Ikedi Eze
  </PopoverTrigger>
  <PopoverContent align="end">
    <PopoverHeader>
      <PopoverTitle>Ikedi Eze</PopoverTitle>
      <PopoverDescription>kasidyray@gmail.com</PopoverDescription>
    </PopoverHeader>
    <div className="flex flex-col gap-0.5">
      <Button variant="ghost" size="sm" className="w-full justify-start">Profile settings</Button>
      <Button variant="ghost" size="sm" className="w-full justify-start">Billing</Button>
      <Button variant="ghost" size="sm" className="w-full justify-start">Switch workspace</Button>
      <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive">
        Sign out
      </Button>
    </div>
  </PopoverContent>
</Popover>`,
    },
  ],

  relatedComponents: [
    {
      slug: "tooltip",
      name: "Tooltip",
      description: "Short hover-triggered label.",
      when: "Use Tooltip for single-line text hints that appear on hover with no interaction inside.",
    },
    {
      slug: "hover-card",
      name: "Hover Card",
      description: "Rich preview card on hover.",
      when: "Use HoverCard for read-only rich previews triggered by hover — no click required, no form inputs.",
    },
    {
      slug: "dropdown-menu",
      name: "Dropdown Menu",
      description: "Contextual action menu.",
      when: "Use DropdownMenu when the content is a flat list of labelled actions (not a form or rich content).",
    },
    {
      slug: "dialog",
      name: "Dialog",
      description: "Modal dialog for focused interactions.",
      when: "Use Dialog when the interaction needs full focus trap, a backdrop, or is destructive.",
    },
  ],

  designNotes: [
    "PopoverContent default width is w-72. Use className='w-80' or className='w-96' for wider editors.",
    "The panel uses shadow-2xl + ring-1 ring-foreground/5 for depth — the same as Dialog and DropdownMenu.",
    "PopoverTrigger uses the base-ui render prop pattern: render={<Button />} with children as the button label.",
    "The positioner handles collision detection — do not wrap PopoverContent in a positioning div.",
  ],
}
