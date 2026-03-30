"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  RiUser2Line,
  RiBankCardLine,
  RiSettings3Line,
  RiLogoutBoxLine,
  RiMore2Line,
  RiEditLine,
  RiDeleteBinLine,
  RiFileCopyLine,
  RiDownloadLine,
  RiShareLine,
} from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview (static mock) ─────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    <div className="flex flex-col items-start gap-3">
      <Button variant="outline" size="sm">Open menu</Button>
      {/* static popup mock */}
      <div className="w-48 rounded-lg border bg-popover p-1 shadow-md ring-1 ring-foreground/5 text-sm">
        <div className="px-3 py-1 text-xs text-muted-foreground">My account</div>
        <div className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm bg-accent">
          <RiUser2Line className="size-4 shrink-0" />
          <span>Profile</span>
          <span className="ml-auto text-xs text-muted-foreground">⇧⌘P</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm">
          <RiSettings3Line className="size-4 shrink-0" />
          <span>Settings</span>
        </div>
        <div className="-mx-1 my-1 h-px bg-border/50" />
        <div className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-destructive">
          <RiLogoutBoxLine className="size-4 shrink-0" />
          <span>Log out</span>
        </div>
      </div>
    </div>
    <div className="flex items-start flex-wrap gap-6 text-center justify-center">
      {[
        "① Trigger",
        "② Content popup",
        "③ Label",
        "④ Item with icon",
        "⑤ Shortcut",
        "⑥ Separator",
        "⑦ Destructive item",
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

function DefaultMenuPreview() {
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>Open menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuItem><RiUser2Line />Profile<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut></DropdownMenuItem>
            <DropdownMenuItem><RiBankCardLine />Billing<DropdownMenuShortcut>⌘B</DropdownMenuShortcut></DropdownMenuItem>
            <DropdownMenuItem><RiSettings3Line />Settings<DropdownMenuShortcut>⌘S</DropdownMenuShortcut></DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive"><RiLogoutBoxLine />Log out<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function CheckboxMenuPreview() {
  const [showGrid, setShowGrid] = useState(true)
  const [showTimestamps, setShowTimestamps] = useState(false)
  const [showPreviews, setShowPreviews] = useState(true)
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>View options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Display</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>Grid view</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showTimestamps} onCheckedChange={setShowTimestamps}>Show timestamps</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showPreviews} onCheckedChange={setShowPreviews}>Show previews</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function RadioMenuPreview() {
  const [density, setDensity] = useState("comfortable")
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>Row density</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Table density</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
            <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="spacious">Spacious</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function SubMenuPreview() {
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>More actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem><RiEditLine />Rename</DropdownMenuItem>
          <DropdownMenuItem><RiFileCopyLine />Duplicate</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger><RiShareLine />Share</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Share via link</DropdownMenuItem>
              <DropdownMenuItem>Share via email</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive"><RiDeleteBinLine />Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// ── State previews ─────────────────────────────────────────────────────────────

function DisabledItemPreview() {
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>Options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem><RiDownloadLine />Download</DropdownMenuItem>
          <DropdownMenuItem><RiEditLine />Edit</DropdownMenuItem>
          <DropdownMenuItem disabled><RiShareLine />Share (unavailable)</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive"><RiDeleteBinLine />Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function IconOnlyTriggerPreview() {
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="More options" />}>
          <RiMore2Line />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem><RiEditLine />Edit</DropdownMenuItem>
          <DropdownMenuItem><RiFileCopyLine />Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive"><RiDeleteBinLine />Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// ── Do / Don't previews ────────────────────────────────────────────────────────

function DoDestructiveItemPreview() {
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="More options" />}>
          <RiMore2Line />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem><RiEditLine />Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive"><RiDeleteBinLine />Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function DontDestructiveItemPreview() {
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="More options" />}>
          <RiMore2Line />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem><RiEditLine />Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* Missing variant="destructive" — looks like a normal item */}
          <DropdownMenuItem><RiDeleteBinLine />Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// ── Context example previews ───────────────────────────────────────────────────

function TableRowActionsExample() {
  const rows = [
    { name: "Q1 Financial Report.pdf", size: "2.4 MB", date: "Mar 15, 2026" },
    { name: "Product Roadmap 2026.pptx", size: "8.1 MB", date: "Mar 22, 2026" },
    { name: "Customer Survey Data.xlsx", size: "1.2 MB", date: "Mar 27, 2026" },
  ]
  return (
    <div className="w-full rounded-xl border overflow-hidden text-sm">
      <div className="grid grid-cols-[1fr_80px_100px_40px] gap-2 px-4 py-2 border-b bg-muted/50">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Name</p>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Size</p>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Modified</p>
        <span />
      </div>
      {rows.map(row => (
        <div key={row.name} className="grid grid-cols-[1fr_80px_100px_40px] gap-2 items-center px-4 py-3 border-b last:border-0">
          <p className="truncate">{row.name}</p>
          <p className="text-muted-foreground">{row.size}</p>
          <p className="text-muted-foreground">{row.date}</p>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="More options" />}>
              <RiMore2Line />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><RiDownloadLine />Download</DropdownMenuItem>
              <DropdownMenuItem><RiFileCopyLine />Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive"><RiDeleteBinLine />Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  )
}

function UserMenuExample() {
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />}>
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">IE</div>
            <span>Ikedi Eze</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuGroup>
            <DropdownMenuLabel>kasidyray@gmail.com</DropdownMenuLabel>
            <DropdownMenuItem><RiUser2Line />Profile</DropdownMenuItem>
            <DropdownMenuItem><RiBankCardLine />Billing</DropdownMenuItem>
            <DropdownMenuItem><RiSettings3Line />Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive"><RiLogoutBoxLine />Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// ── Dropdown Menu design doc ───────────────────────────────────────────────────

export const dropdownMenuDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  overview: {
    what: "A floating menu anchored to a trigger element, offering a list of contextual actions, navigation items, or settings options.",
    why: "Many actions are secondary and shouldn't always be visible. A dropdown hides them behind a single trigger, reducing visual noise while keeping them a single click away.",
    problem: "Building custom dropdown menus from scratch requires complex positioning, keyboard navigation, ARIA roles, and close-on-outside-click logic. DropdownMenu handles all of this with base-ui.",
    appearsIn: ["Table row action menus", "User account menus", "Toolbar options menus", "Content action buttons"],
  },

  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      { name: "Trigger", description: "The element that opens the menu. Use render prop to pass a Button." },
      { name: "Content popup", description: "The floating panel containing all menu items. Positions itself relative to the trigger." },
      { name: "Group + Label", description: "Optional visual grouping with a muted section label above the items.", optional: true },
      { name: "Item", description: "A single actionable row. Supports icons (leading), shortcut text (trailing), and a destructive variant." },
      { name: "Shortcut", description: "A keyboard shortcut displayed at the trailing end of a menu item.", optional: true },
      { name: "Separator", description: "A horizontal rule that visually divides groups of items.", optional: true },
      { name: "Checkbox / Radio items", description: "Specialised items for persistent toggle and selection state.", optional: true },
      { name: "Sub-menu trigger + content", description: "A nested menu that opens from a trigger item, used for grouped sub-actions.", optional: true },
    ],
  },

  whenToUse: [
    "Row-level actions in a table or list (edit, duplicate, delete).",
    "User account menus in a site header or sidebar.",
    "Contextual settings that apply to a specific item or section.",
    "Secondary actions that are too numerous for visible buttons.",
  ],

  whenNotToUse: [
    "Primary page actions — these belong in visible Button elements.",
    "Toolbar filters and sort controls — use DataTableDropdownFilter or DataTableSortMenu instead.",
    "Single-value selection from a list — use Select or Combobox.",
    "Navigation that changes the active route — use sidebar links or a NavMenu.",
  ],

  variants: [
    {
      name: "Default (actions)",
      description: "Icon + label items with optional keyboard shortcuts and a destructive last item.",
      when: "Row actions, account menus",
      preview: <DefaultMenuPreview />,
      fullWidth: true,
    },
    {
      name: "Checkbox items",
      description: "Toggleable items that retain their checked state across opens. A checkmark appears at the trailing end when active.",
      when: "Persistent display preferences",
      preview: <CheckboxMenuPreview />,
      fullWidth: true,
    },
    {
      name: "Radio items",
      description: "Single-select items grouped by DropdownMenuRadioGroup. Only one item can be checked at a time.",
      when: "Mutually exclusive options (density, theme, sort order)",
      preview: <RadioMenuPreview />,
      fullWidth: true,
    },
    {
      name: "Sub-menu",
      description: "A trigger item that opens a nested menu panel to the side for grouped sub-actions.",
      when: "Actions with sub-options (Share → link/email/export)",
      preview: <SubMenuPreview />,
      fullWidth: true,
    },
  ],

  states: [
    {
      name: "Disabled item",
      description: "Items with disabled prop are shown at 50% opacity and cannot be clicked or focused.",
      preview: <DisabledItemPreview />,
    },
    {
      name: "Icon-only trigger",
      description: "A ghost icon button trigger (RiMore2Line) is the standard pattern for row-level action menus.",
      preview: <IconOnlyTriggerPreview />,
    },
  ],

  properties: [
    {
      name: "align (DropdownMenuContent)",
      values: "start · center · end",
      default: "start",
      description: "Horizontal alignment of the popup relative to the trigger. Use align=\"end\" for right-aligned triggers.",
    },
    {
      name: "side (DropdownMenuContent)",
      values: "top · bottom · left · right",
      default: "bottom",
      description: "Which side of the trigger the popup opens on.",
    },
    {
      name: "sideOffset (DropdownMenuContent)",
      values: "number",
      default: "4",
      description: "Distance in pixels between the trigger and the popup.",
    },
    {
      name: "variant (DropdownMenuItem)",
      values: "default · destructive",
      default: "default",
      description: "Destructive items render in red with a red hover background. Always use for irreversible actions.",
    },
    {
      name: "inset (DropdownMenuItem)",
      values: "boolean",
      default: "false",
      description: "Adds extra left padding to align text-only items with icon items in the same group.",
    },
    {
      name: "disabled (DropdownMenuItem)",
      values: "boolean",
      default: "false",
      description: "Prevents the item from being interacted with. Item remains visible at reduced opacity.",
    },
    {
      name: "checked (DropdownMenuCheckboxItem)",
      values: "boolean",
      default: "—",
      description: "The checked state of the checkbox item. Pair with onCheckedChange for controlled usage.",
    },
    {
      name: "value (DropdownMenuRadioItem)",
      values: "string",
      default: "—",
      description: "The value this radio item represents. Match against the parent RadioGroup's value to control selection.",
    },
  ],

  contentGuidance: [
    {
      rule: "Labels: 1–3 words, verb-first",
      detail: "\"Edit\", \"Rename\", \"Download report\" — start with the action. Avoid nouns alone like \"Settings\" unless navigating to a page.",
    },
    {
      rule: "Group related actions",
      detail: "Use DropdownMenuGroup + DropdownMenuLabel to cluster items (e.g. \"Account\" vs \"Danger zone\"). Separators alone are less clear.",
    },
    {
      rule: "Destructive item at the bottom",
      detail: "Always place the destructive item last, after a separator. This prevents accidental clicks on the dangerous action.",
    },
    {
      rule: "Icons are optional but consistent",
      detail: "If one item in a group has an icon, all should. Mixing icon and no-icon items in the same group looks unbalanced.",
    },
  ],

  behavior: [
    "Opens on click of the trigger. Closes on item click, outside click, or Escape key.",
    "Keyboard navigation: Arrow Up/Down moves focus between items; Enter/Space activates the focused item.",
    "The popup is portalled to the document body to avoid z-index and overflow clipping issues.",
    "Sub-menus open on hover or arrow-right and close when focus moves elsewhere.",
    "Checkbox and radio items update their state visually on interaction; the checkmark indicator appears at the trailing end.",
    "Disabled items can be focused but not activated — they are announced as disabled by screen readers.",
  ],

  spacing: [
    { rule: "Item padding", detail: "px-3 py-2 on all items. gap-2.5 between icon and label." },
    { rule: "Label padding", detail: "px-3 py-1 for DropdownMenuLabel. Slightly smaller than items." },
    { rule: "Separator margin", detail: "-mx-1 my-1 — bleeds to popup edges with 4px vertical gap." },
    { rule: "Popup padding", detail: "p-1 on DropdownMenuContent — all items sit inside this padding." },
    { rule: "Min width", detail: "min-w-48. Content can grow wider; use className to cap width on account menus (e.g. w-52)." },
  ],

  accessibility: [
    {
      rule: "Icon-only triggers need aria-label",
      detail: "When using a ghost icon button (RiMore2Line) as the trigger, always pass aria-label=\"More options\" or a more contextual label.",
    },
    {
      rule: "Destructive actions use variant=\"destructive\"",
      detail: "This applies red colour and a distinct hover background. Screen readers do not infer danger from colour alone — consider adding \"(destructive)\" to the sr-only text for very critical actions.",
    },
    {
      rule: "Keyboard navigation is built-in",
      detail: "Arrow keys, Enter, Space, and Escape all work out of the box via base-ui. Do not override tabIndex on items.",
    },
    {
      rule: "Focus returns to trigger on close",
      detail: "Closing the menu (Escape or click) returns focus to the triggering element automatically.",
    },
  ],

  doItems: [
    {
      label: "Use variant=\"destructive\" for delete actions",
      description: "Destructive items get red text and a red hover background. This is the only visual signal for danger in a menu — never skip it.",
      preview: <DoDestructiveItemPreview />,
    },
    {
      label: "Use icon-only trigger with aria-label for table rows",
      description: "A ghost RiMore2Line button is the standard row-level trigger. Always add aria-label so screen readers know what it opens.",
      preview: <IconOnlyTriggerPreview />,
    },
  ],

  dontItems: [
    {
      label: "Don't use default variant for destructive actions",
      description: "A delete item without variant=\"destructive\" looks identical to safe actions. Users can't anticipate the consequence.",
      preview: <DontDestructiveItemPreview />,
    },
    {
      label: "Don't use DropdownMenu for toolbar filters",
      description: "DataTableDropdownFilter and DataTableFacetedFilter are purpose-built for toolbar filtering with active state indicators. DropdownMenu has none of that logic.",
      preview: (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>Filter by status</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
              <DropdownMenuItem>Inactive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ],

  examplesInContext: [
    {
      title: "Table row actions",
      description: "A ghost icon trigger at the end of each row reveals download, duplicate, and delete actions. The trigger has aria-label and delete uses variant=\"destructive\".",
      preview: <TableRowActionsExample />,
      code: `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="More options" />}>
    <RiMore2Line />
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem><RiDownloadLine />Download</DropdownMenuItem>
    <DropdownMenuItem><RiFileCopyLine />Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive"><RiDeleteBinLine />Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
    {
      title: "User account menu",
      description: "A name/avatar trigger in the header opens an account menu with profile links and a sign-out action at the bottom.",
      preview: <UserMenuExample />,
      code: `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />}>
    <Avatar className="size-6"><AvatarFallback>IE</AvatarFallback></Avatar>
    Ikedi Eze
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-52">
    <DropdownMenuGroup>
      <DropdownMenuLabel>kasidyray@gmail.com</DropdownMenuLabel>
      <DropdownMenuItem><RiUser2Line />Profile</DropdownMenuItem>
      <DropdownMenuItem><RiBankCardLine />Billing</DropdownMenuItem>
      <DropdownMenuItem><RiSettings3Line />Settings</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive"><RiLogoutBoxLine />Sign out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
  ],

  relatedComponents: [
    {
      slug: "select",
      name: "Select",
      description: "A form-style dropdown for single value selection.",
      when: "Use Select instead when the user is choosing a value to persist in a form field, not performing an action.",
    },
    {
      slug: "combobox",
      name: "Combobox",
      description: "A searchable selection dropdown.",
      when: "Use Combobox instead when the option list is long and needs filtering.",
    },
    {
      slug: "popover",
      name: "Popover",
      description: "A generic floating content panel.",
      when: "Use Popover instead when the overlay needs arbitrary layout — not a list of action items.",
    },
  ],

  designNotes: [
    "DropdownMenuTrigger uses the base-ui render prop pattern: render={<Button variant=\"outline\" />}. Children become the button label.",
    "Icons in items are auto-sized to size-4. The icon and label gap is gap-2.5 — do not add manual gap.",
    "The popup width tracks the trigger width (w-(--anchor-width)) with a min-w-48. Override with className on DropdownMenuContent.",
    "align=\"end\" is the correct choice for triggers positioned on the right edge of a row or header.",
  ],
}
