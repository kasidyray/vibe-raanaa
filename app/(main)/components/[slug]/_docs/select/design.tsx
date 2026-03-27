"use client"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  RiShieldLine,
  RiUserLine,
  RiGroupLine,
  RiGlobalLine,
  RiMapPinLine,
} from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ───────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    <div className="w-56">
      <Select defaultValue="admin">
        <SelectTrigger>
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="member">Member</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="flex items-start gap-10 text-center">
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">① Trigger</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">② Value / Placeholder</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">③ Chevron icon</span>
      </div>
    </div>
  </div>
)

// ── Context example: Role selector in team table ──────────────────────────────

const RoleSelectorExample = () => (
  <div className="rounded-xl border overflow-hidden">
    <div className="grid grid-cols-[1fr_160px_120px] gap-4 px-4 py-2 border-b bg-muted/50">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Member</p>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</p>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Role</p>
    </div>
    {[
      { name: "Adaeze Okafor",    email: "adaeze@co.io",  role: "admin"  },
      { name: "Emeka Nwachukwu",  email: "emeka@co.io",   role: "member" },
      { name: "Ngozi Achebe",     email: "ngozi@co.io",   role: "viewer" },
    ].map(row => (
      <div key={row.name} className="grid grid-cols-[1fr_160px_120px] gap-4 items-center px-4 py-3 border-b last:border-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar className="size-7 rounded-full shrink-0">
            <AvatarImage src={`https://api.dicebear.com/9.x/micah/svg?seed=${row.name.split(" ")[0]}`} alt={row.name} />
            <AvatarFallback>{row.name[0]}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium truncate">{row.name}</p>
        </div>
        <p className="text-xs text-muted-foreground truncate">{row.email}</p>
        <Select defaultValue={row.role}>
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="member">Member</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>
    ))}
  </div>
)

// ── Context example: Country picker in onboarding form ────────────────────────

const CountryPickerExample = () => (
  <div className="rounded-xl border overflow-hidden max-w-sm">
    <div className="px-5 py-4 border-b">
      <p className="text-sm font-semibold">Account setup</p>
      <p className="text-xs text-muted-foreground mt-0.5">Tell us where you're based</p>
    </div>
    <div className="p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="country-sel">Country</Label>
        <Select defaultValue="ng">
          <SelectTrigger id="country-sel">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Africa</SelectLabel>
              <SelectItem value="ng">
                <span className="flex items-center gap-2"><RiMapPinLine className="size-3.5 opacity-60" />Nigeria</span>
              </SelectItem>
              <SelectItem value="gh">
                <span className="flex items-center gap-2"><RiMapPinLine className="size-3.5 opacity-60" />Ghana</span>
              </SelectItem>
              <SelectItem value="ke">
                <span className="flex items-center gap-2"><RiMapPinLine className="size-3.5 opacity-60" />Kenya</span>
              </SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Europe</SelectLabel>
              <SelectItem value="uk">
                <span className="flex items-center gap-2"><RiMapPinLine className="size-3.5 opacity-60" />United Kingdom</span>
              </SelectItem>
              <SelectItem value="de">
                <span className="flex items-center gap-2"><RiMapPinLine className="size-3.5 opacity-60" />Germany</span>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="timezone-sel">Timezone</Label>
        <Select defaultValue="wat">
          <SelectTrigger id="timezone-sel">
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="wat">WAT — West Africa Time (UTC+1)</SelectItem>
            <SelectItem value="gmt">GMT — Greenwich Mean Time (UTC+0)</SelectItem>
            <SelectItem value="cet">CET — Central European Time (UTC+1)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
)

// ── Context example: Status filter in sidebar ─────────────────────────────────

const StatusFilterExample = () => (
  <div className="rounded-xl border overflow-hidden max-w-xs">
    <div className="px-4 py-3 border-b">
      <p className="text-sm font-semibold">Filter customers</p>
    </div>
    <div className="p-4 flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="status-sel" className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Status</Label>
        <Select defaultValue="active">
          <SelectTrigger id="status-sel" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectSeparator />
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="plan-sel" className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Plan</Label>
        <Select defaultValue="all">
          <SelectTrigger id="plan-sel" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All plans</SelectItem>
            <SelectSeparator />
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
)

// ── Do / Don't previews ───────────────────────────────────────────────────────

const DoLabeledPreview = () => (
  <div className="flex flex-col gap-1.5 w-56">
    <Label htmlFor="do-role-sel">Role</Label>
    <Select defaultValue="member">
      <SelectTrigger id="do-role-sel">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="member">Member</SelectItem>
        <SelectItem value="viewer">Viewer</SelectItem>
      </SelectContent>
    </Select>
  </div>
)

const DoGroupedPreview = () => (
  <div className="w-56">
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select region" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Africa</SelectLabel>
          <SelectItem value="ng">Nigeria</SelectItem>
          <SelectItem value="gh">Ghana</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="de">Germany</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
)

const DontManyOptionsPreview = () => (
  <div className="flex flex-col gap-2 items-center">
    <div className="w-56">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select country (195 options)..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ng">Nigeria</SelectItem>
          <SelectItem value="gh">Ghana</SelectItem>
          <SelectItem value="ke">Kenya</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <p className="text-xs text-muted-foreground text-center">Use Combobox for searchable long lists</p>
  </div>
)

const DontToolbarPreview = () => (
  <div className="flex flex-col gap-2 items-center">
    <div className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-muted/30">
      <span className="text-xs text-muted-foreground">Sort by</span>
      <div className="w-32">
        <Select defaultValue="name">
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    <p className="text-xs text-muted-foreground text-center">Use DropdownMenu for toolbar filters</p>
  </div>
)

// ── Select design doc ─────────────────────────────────────────────────────────

export const selectDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  // ── Overview ───────────────────────────────────────────────────────────────
  overview: {
    what: "A form control that opens a dropdown popup of options and allows the user to choose exactly one value.",
    why: "Many forms need the user to pick from a fixed set of options — roles, countries, statuses — and an accessible, styled dropdown is more consistent than a native <select>.",
    problem: "Native HTML <select> elements are poorly styled and inconsistent across browsers. Select provides a fully styled, keyboard-accessible, animated alternative.",
    appearsIn: [
      "Team role and permission selectors",
      "Country and timezone pickers",
      "Status and category filters",
      "Settings forms",
      "Onboarding flows",
      "Row-level inline editing",
    ],
  },

  // ── Anatomy ────────────────────────────────────────────────────────────────
  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Trigger",
        description: "The visible button that the user clicks to open the dropdown. Carries the border, height, and focus ring.",
      },
      {
        name: "Value / Placeholder",
        description: "Shows the selected value or the placeholder text when nothing is selected.",
      },
      {
        name: "Chevron icon",
        description: "RiArrowDownSLine — indicates the field is expandable. Rotates when open.",
      },
      {
        name: "Content popup",
        description: "The floating panel that appears below (or above) the trigger with the list of options.",
        optional: true,
      },
      {
        name: "Item",
        description: "Each option in the list. Can include icons, and shows a checkmark when selected.",
        optional: true,
      },
      {
        name: "Group / Label",
        description: "Optional section grouping within the content popup. Adds a muted section header.",
        optional: true,
      },
    ],
  },

  // ── Usage ──────────────────────────────────────────────────────────────────
  whenToUse: [
    "Choosing exactly one value from 3–15 predefined options — role, status, country, plan tier.",
    "Inline role editing in a data table row (use size=\"sm\").",
    "Settings forms where the options are known and fixed.",
    "Filter sidebars where a single active filter is needed per dimension.",
  ],
  whenNotToUse: [
    "Searchable lists with many options (15+) — use Combobox.",
    "Toolbar sort/filter controls — use DropdownMenu (constraint from constraints.md).",
    "Multi-select — use Combobox or a Checkbox group.",
    "Binary yes/no — use Switch or Checkbox.",
  ],

  // ── Variants ───────────────────────────────────────────────────────────────
  variants: [
    {
      name: "Default",
      description: "Standard height (h-10). Used in forms, settings cards, and onboarding flows.",
      when: "All standard form field contexts.",
      preview: (
        <div className="w-56">
          <Select defaultValue="pro">
            <SelectTrigger>
              <SelectValue placeholder="Select plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      name: "Small",
      description: "Compact height (h-8). For table cells and toolbar contexts where space is tight.",
      when: "Inline role editing in data table rows. Dense filter sidebars.",
      preview: (
        <div className="w-44">
          <Select defaultValue="member">
            <SelectTrigger size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      name: "With groups",
      description: "Items divided into labelled sections using SelectGroup and SelectLabel.",
      when: "Options that belong to distinct categories — countries by region, timezones by continent.",
      preview: (
        <div className="w-64">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Africa</SelectLabel>
                <SelectItem value="ng">Nigeria</SelectItem>
                <SelectItem value="gh">Ghana</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Europe</SelectLabel>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      name: "With icons in items",
      description: "Each item includes a leading icon for faster visual scanning.",
      when: "Role or permission selectors where each option has a distinct meaning.",
      preview: (
        <div className="w-56">
          <Select defaultValue="admin">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">
                <span className="flex items-center gap-2"><RiShieldLine className="size-3.5 opacity-60" />Admin</span>
              </SelectItem>
              <SelectItem value="member">
                <span className="flex items-center gap-2"><RiUserLine className="size-3.5 opacity-60" />Member</span>
              </SelectItem>
              <SelectItem value="viewer">
                <span className="flex items-center gap-2"><RiGlobalLine className="size-3.5 opacity-60" />Viewer</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      name: "With separator",
      description: "A visual divider between groups of items. Placed between SelectGroup blocks.",
      when: "When an \"All\" or catch-all option needs to be visually separated from specific values.",
      preview: (
        <div className="w-52">
          <Select defaultValue="active">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectSeparator />
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
  ],

  // ── States ─────────────────────────────────────────────────────────────────
  states: [
    {
      name: "Default (placeholder)",
      description: "No value selected. Placeholder text shown in muted colour.",
      preview: (
        <div className="w-52">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      name: "Selected",
      description: "A value has been chosen. Displayed in full foreground colour.",
      preview: (
        <div className="w-52">
          <Select defaultValue="member">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      name: "Open",
      description: "Dropdown popup is visible with items listed below the trigger.",
      preview: (
        <div className="w-52 h-36 flex items-start">
          <Select open>
            <SelectTrigger>
              <SelectValue placeholder="Select plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      name: "Disabled",
      description: "The trigger is dimmed and non-interactive.",
      preview: (
        <div className="w-52">
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Not available" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="x">Option</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      name: "Error",
      description: "Destructive ring on the trigger. Set aria-invalid on SelectTrigger.",
      preview: (
        <div className="flex flex-col gap-1.5 w-52">
          <Select>
            <SelectTrigger aria-invalid>
              <SelectValue placeholder="Required" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-destructive">Please select a role.</p>
        </div>
      ),
    },
  ],

  // ── Properties ─────────────────────────────────────────────────────────────
  properties: [
    {
      name: "value / defaultValue",
      values: "string",
      default: "—",
      description: "Controlled (value + onValueChange) or uncontrolled (defaultValue) selected value.",
    },
    {
      name: "onValueChange",
      values: "(value: string) => void",
      default: "—",
      description: "Called when the user selects an option. Provides the selected item's value string.",
    },
    {
      name: "disabled",
      values: "true · false",
      default: "false",
      description: "Prevents the dropdown from opening. Applies opacity and cursor-not-allowed to the trigger.",
    },
    {
      name: "size (SelectTrigger)",
      values: "sm · default",
      default: "default",
      description: "Default trigger is h-10. sm is h-8 for table cells and dense layouts.",
    },
    {
      name: "aria-invalid (SelectTrigger)",
      values: "true · false",
      default: "false",
      description: "Applies destructive ring/border on the trigger for validation failures.",
    },
    {
      name: "align (SelectContent)",
      values: "start · center · end",
      default: "start",
      description: "Horizontal alignment of the content popup relative to the trigger.",
    },
    {
      name: "alignItemWithTrigger (SelectContent)",
      values: "true · false",
      default: "true",
      description: "When true, the selected item in the open list aligns with the trigger value text.",
    },
  ],

  // ── Content guidance ───────────────────────────────────────────────────────
  contentGuidance: [
    {
      rule: "Meaningful placeholder",
      detail: "\"Select a role\" is clearer than \"Choose...\" or \"-- Select --\".",
    },
    {
      rule: "Sentence case for items",
      detail: "\"All statuses\", not \"ALL STATUSES\" or \"all statuses\".",
    },
    {
      rule: "Group for 6+ options",
      detail: "When the list has more than 5–6 items, group them under SelectLabel sections to aid scanning.",
    },
    {
      rule: "Catch-all items first",
      detail: "\"All statuses\" or \"Any plan\" should appear first and be separated from specific values with a SelectSeparator.",
    },
  ],

  // ── Behavior ───────────────────────────────────────────────────────────────
  behavior: [
    "Clicking the trigger opens the content popup. Clicking an item selects it and closes the popup.",
    "Keyboard: Space or Enter opens the popup when focused. Arrow keys navigate items. Enter/Space selects. Escape closes.",
    "The selected item shows a checkmark inside the open popup.",
    "The popup closes on outside click or Escape.",
    "Content popup position is determined by available viewport space — it can appear above or below the trigger.",
  ],

  // ── Spacing ────────────────────────────────────────────────────────────────
  spacing: [
    {
      rule: "Label to trigger gap",
      detail: "gap-1.5 between the Label and SelectTrigger in a flex-col wrapper.",
    },
    {
      rule: "Trigger to error text",
      detail: "gap-1 or gap-1.5 below the trigger when showing error text.",
    },
    {
      rule: "Between form fields",
      detail: "gap-4 or gap-6 between field groups in a form.",
    },
    {
      rule: "In table cells",
      detail: "Use size=\"sm\" — the trigger h-8 fits within the row without adding vertical space.",
    },
  ],

  // ── Accessibility ──────────────────────────────────────────────────────────
  accessibility: [
    {
      rule: "Associate with Label via htmlFor/id",
      detail: "Pass the id to SelectTrigger (not Select) and use htmlFor on the Label.",
    },
    {
      rule: "Keyboard-navigable",
      detail: "Space/Enter opens, arrow keys navigate, Enter selects, Escape closes. This is built-in — do not suppress.",
    },
    {
      rule: "aria-invalid on SelectTrigger",
      detail: "Set aria-invalid on SelectTrigger (not the Select root) for validation error styling.",
    },
    {
      rule: "Meaningful option text",
      detail: "Item text must be self-explanatory — avoid abbreviations or numeric codes without labels.",
    },
  ],

  // ── Do & Don't ─────────────────────────────────────────────────────────────
  doItems: [
    {
      label: "Always pair with a Label",
      description: "Every select trigger must be associated with a visible Label via htmlFor/id.",
      preview: <DoLabeledPreview />,
    },
    {
      label: "Use groups for long option lists",
      description: "SelectGroup and SelectLabel help users scan when there are 6+ options.",
      preview: <DoGroupedPreview />,
    },
  ],
  dontItems: [
    {
      label: "Don't use Select for long searchable lists",
      description: "Lists with 15+ items are unnavigable without search — use Combobox instead.",
      preview: <DontManyOptionsPreview />,
    },
    {
      label: "Don't use Select in toolbar filters",
      description: "Toolbar sort and filter controls should use DropdownMenu, not Select.",
      preview: <DontToolbarPreview />,
    },
  ],

  // ── Examples in context ────────────────────────────────────────────────────
  examplesInContext: [
    {
      title: "Role selector in team table",
      description: "Small select trigger in a data table row for inline role editing.",
      preview: <RoleSelectorExample />,
      code: `const members = [
  { name: "Adaeze Okafor",   email: "adaeze@co.io", role: "admin"  },
  { name: "Emeka Nwachukwu", email: "emeka@co.io",  role: "member" },
  { name: "Ngozi Achebe",    email: "ngozi@co.io",  role: "viewer" },
]

{members.map(member => (
  <div key={member.name} className="grid grid-cols-[1fr_160px_120px] gap-4 items-center px-4 py-3 border-b last:border-0">
    <UserCell name={member.name} email={member.email} />
    <p className="text-xs text-muted-foreground">{member.email}</p>
    <Select defaultValue={member.role}>
      <SelectTrigger size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="member">Member</SelectItem>
        <SelectItem value="viewer">Viewer</SelectItem>
      </SelectContent>
    </Select>
  </div>
))}`,
    },
    {
      title: "Country picker in onboarding form",
      description: "Grouped options with icons — countries organised by region.",
      preview: <CountryPickerExample />,
      code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="country">Country</Label>
  <Select defaultValue="ng">
    <SelectTrigger id="country">
      <SelectValue placeholder="Select country" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Africa</SelectLabel>
        <SelectItem value="ng">Nigeria</SelectItem>
        <SelectItem value="gh">Ghana</SelectItem>
        <SelectItem value="ke">Kenya</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Europe</SelectLabel>
        <SelectItem value="uk">United Kingdom</SelectItem>
        <SelectItem value="de">Germany</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</div>`,
    },
    {
      title: "Status filter in sidebar",
      description: "Compact select triggers for filtering a data set by status and plan tier.",
      preview: <StatusFilterExample />,
      code: `<div className="flex flex-col gap-3">
  <div className="flex flex-col gap-1.5">
    <Label htmlFor="status-filter">Status</Label>
    <Select defaultValue="active">
      <SelectTrigger id="status-filter" size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All statuses</SelectItem>
        <SelectSeparator />
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
      </SelectContent>
    </Select>
  </div>
  <div className="flex flex-col gap-1.5">
    <Label htmlFor="plan-filter">Plan</Label>
    <Select defaultValue="all">
      <SelectTrigger id="plan-filter" size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All plans</SelectItem>
        <SelectSeparator />
        <SelectItem value="free">Free</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
        <SelectItem value="enterprise">Enterprise</SelectItem>
      </SelectContent>
    </Select>
  </div>
</div>`,
    },
  ],

  // ── Related components ─────────────────────────────────────────────────────
  relatedComponents: [
    {
      slug: "combobox",
      name: "Combobox",
      description: "Searchable select with optional multi-select support.",
      when: "The option list is long (15+) or the user needs to type to filter.",
    },
    {
      slug: "checkbox",
      name: "Checkbox",
      description: "Binary independent selections.",
      when: "Multiple values can be selected simultaneously — use a Checkbox group.",
    },
    {
      slug: "input",
      name: "Input",
      description: "Free-form text entry.",
      when: "The value is open-ended and not constrained to a predefined list.",
    },
  ],

  // ── Design notes ───────────────────────────────────────────────────────────
  designNotes: [
    "The id prop for Label association goes on SelectTrigger, not the Select root component.",
    "aria-invalid for error styling also goes on SelectTrigger, not Select.",
    "Use size=\"sm\" on SelectTrigger for h-8 — this is the only supported size variant.",
    "Do not use Select for toolbar dropdowns (sort, filter style) — use DropdownMenu per constraints.",
  ],
}
