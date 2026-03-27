"use client"

import { useState } from "react"
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxChip,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ───────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    <div className="w-64">
      <Combobox defaultValue="ng">
        <ComboboxInput placeholder="Search country..." showClear showTrigger />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxItem value="ng">Nigeria</ComboboxItem>
            <ComboboxItem value="gh">Ghana</ComboboxItem>
            <ComboboxItem value="ke">Kenya</ComboboxItem>
            <ComboboxEmpty>No results</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
    <div className="flex items-start flex-wrap gap-6 text-center justify-center">
      {[
        "① Search input",
        "② Clear button (×)",
        "③ Trigger chevron",
        "④ Dropdown popup",
        "⑤ Item with checkmark",
      ].map(label => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="h-5 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

// ── Variant previews ──────────────────────────────────────────────────────────

const DefaultSingleSelectPreview = () => (
  <div className="w-64">
    <Combobox>
      <ComboboxInput placeholder="Select team member..." />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="adaeze">Adaeze Okoye</ComboboxItem>
          <ComboboxItem value="emeka">Emeka Nwachukwu</ComboboxItem>
          <ComboboxItem value="ngozi">Ngozi Achebe</ComboboxItem>
          <ComboboxItem value="chidi">Chidi Okonkwo</ComboboxItem>
          <ComboboxEmpty>No results</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </div>
)

const WithClearPreview = () => (
  <div className="w-64">
    <Combobox defaultValue="adaeze">
      <ComboboxInput placeholder="Select team member..." showClear />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="adaeze">Adaeze Okoye</ComboboxItem>
          <ComboboxItem value="emeka">Emeka Nwachukwu</ComboboxItem>
          <ComboboxItem value="ngozi">Ngozi Achebe</ComboboxItem>
          <ComboboxEmpty>No results</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </div>
)

function MultiSelectChipsPreview() {
  const anchor = useComboboxAnchor()
  const [selected, setSelected] = useState<string[]>([])
  return (
    <div className="w-full max-w-md">
      <Combobox multiple value={selected} onValueChange={setSelected}>
        <ComboboxChips ref={anchor}>
          {selected.map(v => (
            <ComboboxChip key={v}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </ComboboxChip>
          ))}
          <ComboboxChipsInput placeholder="Add skills..." />
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxList>
            <ComboboxItem value="design">Design</ComboboxItem>
            <ComboboxItem value="engineering">Engineering</ComboboxItem>
            <ComboboxItem value="product">Product</ComboboxItem>
            <ComboboxItem value="marketing">Marketing</ComboboxItem>
            <ComboboxItem value="data">Data</ComboboxItem>
            <ComboboxEmpty>No results</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

const GroupedPreview = () => (
  <div className="w-64">
    <Combobox>
      <ComboboxInput placeholder="Select country..." />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxGroup>
            <ComboboxLabel>Africa</ComboboxLabel>
            <ComboboxItem value="ng">Nigeria</ComboboxItem>
            <ComboboxItem value="gh">Ghana</ComboboxItem>
            <ComboboxItem value="ke">Kenya</ComboboxItem>
            <ComboboxItem value="za">South Africa</ComboboxItem>
          </ComboboxGroup>
          <ComboboxSeparator />
          <ComboboxGroup>
            <ComboboxLabel>Europe</ComboboxLabel>
            <ComboboxItem value="gb">United Kingdom</ComboboxItem>
            <ComboboxItem value="de">Germany</ComboboxItem>
            <ComboboxItem value="fr">France</ComboboxItem>
          </ComboboxGroup>
          <ComboboxEmpty>No results</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </div>
)

const DisabledItemsPreview = () => (
  <div className="w-64">
    <Combobox>
      <ComboboxInput placeholder="Select plan..." />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="free">Free</ComboboxItem>
          <ComboboxItem value="pro">Pro</ComboboxItem>
          <ComboboxItem value="enterprise" disabled>Enterprise (Contact sales)</ComboboxItem>
          <ComboboxEmpty>No results</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </div>
)

// ── State previews ────────────────────────────────────────────────────────────

const PlaceholderStatePreview = () => (
  <div className="w-64">
    <Combobox>
      <ComboboxInput placeholder="Search..." />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="a">Option A</ComboboxItem>
          <ComboboxItem value="b">Option B</ComboboxItem>
          <ComboboxEmpty>No results</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </div>
)

const ValueSelectedStatePreview = () => (
  <div className="w-64">
    <Combobox defaultValue="adaeze">
      <ComboboxInput placeholder="Select assignee..." showClear />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="adaeze">Adaeze Okoye</ComboboxItem>
          <ComboboxItem value="emeka">Emeka Nwachukwu</ComboboxItem>
          <ComboboxEmpty>No results</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </div>
)

const DisabledStatePreview = () => (
  <div className="w-64">
    <Combobox disabled>
      <ComboboxInput placeholder="Select assignee..." disabled />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="adaeze">Adaeze Okoye</ComboboxItem>
          <ComboboxEmpty>No results</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </div>
)

const NoResultsStatePreview = () => (
  <div className="w-64 flex flex-col gap-2">
    <p className="text-xs text-muted-foreground">After typing a search term with no matches</p>
    <div className="rounded-lg border bg-popover p-1 shadow-sm">
      <div className="py-2 text-center text-sm text-muted-foreground">No results found</div>
    </div>
  </div>
)

function ErrorStatePreview() {
  const [selected, setSelected] = useState<string[]>([])
  return (
    <div className="w-full max-w-md">
      <Combobox multiple value={selected} onValueChange={setSelected}>
        <ComboboxChips aria-invalid="true">
          {selected.map(v => (
            <ComboboxChip key={v}>{v}</ComboboxChip>
          ))}
          <ComboboxChipsInput placeholder="Add tags..." />
        </ComboboxChips>
        <p className="mt-1.5 text-xs text-destructive">At least one tag is required.</p>
      </Combobox>
    </div>
  )
}

// ── Context example previews ──────────────────────────────────────────────────

export const AssigneePickerExample = () => {
  const tasks = [
    { id: "1", title: "Fix login flow bug", assignee: "Adaeze Okoye", seed: "Adaeze" },
    { id: "2", title: "Update onboarding copy", assignee: "Emeka Nwachukwu", seed: "Emeka" },
    { id: "3", title: "Design payment screen", assignee: "", seed: "" },
    { id: "4", title: "Integrate Paystack API", assignee: "Chidi Okonkwo", seed: "Chidi" },
  ]

  return (
    <div className="w-full rounded-xl border overflow-hidden text-sm">
      <div className="grid grid-cols-[1fr_200px] gap-4 px-4 py-2 border-b bg-muted/50">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Task</p>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Assignee</p>
      </div>
      {tasks.map(task => (
        <div key={task.id} className="grid grid-cols-[1fr_200px] gap-4 items-center px-4 py-3 border-b last:border-0">
          <p className="text-sm truncate">{task.title}</p>
          <div className="w-full min-w-[160px]">
            <Combobox defaultValue={task.assignee}>
              <ComboboxInput placeholder="Assign..." showClear className="h-8 text-xs" />
              <ComboboxContent>
                <ComboboxList>
                  {["Adaeze Okoye", "Emeka Nwachukwu", "Ngozi Achebe", "Chidi Okonkwo", "Amara Okafor"].map(name => (
                    <ComboboxItem key={name} value={name}>
                      <Avatar className="size-5 rounded-full">
                        <AvatarImage src={`https://api.dicebear.com/9.x/micah/svg?seed=${name.split(" ")[0]}`} alt={name} />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                      </Avatar>
                      {name}
                    </ComboboxItem>
                  ))}
                  <ComboboxEmpty>No results</ComboboxEmpty>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>
      ))}
    </div>
  )
}

export const CountryPickerFormExample = () => (
  <div className="max-w-sm rounded-xl border p-5 space-y-4">
    <div>
      <h3 className="text-sm font-semibold">Where are you based?</h3>
      <p className="text-xs text-muted-foreground mt-0.5">We use this to set your default currency and tax region.</p>
    </div>
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-foreground">Country</label>
      <div className="w-full">
        <Combobox>
          <ComboboxInput placeholder="Select country..." showClear className="w-full" />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxGroup>
                <ComboboxLabel>Africa</ComboboxLabel>
                <ComboboxItem value="ng">Nigeria</ComboboxItem>
                <ComboboxItem value="gh">Ghana</ComboboxItem>
                <ComboboxItem value="ke">Kenya</ComboboxItem>
                <ComboboxItem value="za">South Africa</ComboboxItem>
                <ComboboxItem value="eg">Egypt</ComboboxItem>
              </ComboboxGroup>
              <ComboboxSeparator />
              <ComboboxGroup>
                <ComboboxLabel>Europe</ComboboxLabel>
                <ComboboxItem value="gb">United Kingdom</ComboboxItem>
                <ComboboxItem value="de">Germany</ComboboxItem>
                <ComboboxItem value="fr">France</ComboboxItem>
                <ComboboxItem value="nl">Netherlands</ComboboxItem>
              </ComboboxGroup>
              <ComboboxEmpty>No results</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-foreground">City</label>
      <input
        className="flex h-10 w-full rounded-lg border border-input bg-input/30 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        placeholder="e.g. Lagos"
      />
    </div>
  </div>
)

function TagMultiSelectExample() {
  const anchor = useComboboxAnchor()
  const [selected, setSelected] = useState<string[]>(["design", "product"])
  return (
    <div className="max-w-md rounded-xl border p-5 space-y-4">
      <div>
        <h3 className="text-sm font-semibold">Adaeze Okoye — Profile</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Add skills visible to other team members.</p>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-foreground">Skills</label>
        <div className="w-full max-w-md">
          <Combobox multiple value={selected} onValueChange={setSelected}>
            <ComboboxChips ref={anchor}>
              {selected.map(v => (
                <ComboboxChip key={v}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Add skill..." />
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
              <ComboboxList>
                <ComboboxItem value="design">Design</ComboboxItem>
                <ComboboxItem value="engineering">Engineering</ComboboxItem>
                <ComboboxItem value="product">Product</ComboboxItem>
                <ComboboxItem value="marketing">Marketing</ComboboxItem>
                <ComboboxItem value="data">Data</ComboboxItem>
                <ComboboxItem value="finance">Finance</ComboboxItem>
                <ComboboxEmpty>No results</ComboboxEmpty>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </div>
    </div>
  )
}

// ── Do / Don't previews ───────────────────────────────────────────────────────

const DoShowClearPreview = () => (
  <div className="w-64">
    <Combobox defaultValue="adaeze">
      <ComboboxInput placeholder="Select assignee..." showClear />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="adaeze">Adaeze Okoye</ComboboxItem>
          <ComboboxItem value="emeka">Emeka Nwachukwu</ComboboxItem>
          <ComboboxEmpty>No results</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </div>
)

const DoGroupsPreview = () => (
  <div className="w-64">
    <Combobox>
      <ComboboxInput placeholder="Select country..." />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxGroup>
            <ComboboxLabel>Africa</ComboboxLabel>
            <ComboboxItem value="ng">Nigeria</ComboboxItem>
            <ComboboxItem value="gh">Ghana</ComboboxItem>
          </ComboboxGroup>
          <ComboboxSeparator />
          <ComboboxGroup>
            <ComboboxLabel>Europe</ComboboxLabel>
            <ComboboxItem value="gb">United Kingdom</ComboboxItem>
          </ComboboxGroup>
          <ComboboxEmpty>No results</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </div>
)

function DoMultiChipsPreview() {
  const anchor = useComboboxAnchor()
  const [selected, setSelected] = useState<string[]>(["design"])
  return (
    <div className="w-full max-w-md">
      <Combobox multiple value={selected} onValueChange={setSelected}>
        <ComboboxChips ref={anchor}>
          {selected.map(v => (
            <ComboboxChip key={v}>{v}</ComboboxChip>
          ))}
          <ComboboxChipsInput placeholder="Add tags..." />
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxList>
            <ComboboxItem value="design">Design</ComboboxItem>
            <ComboboxItem value="engineering">Engineering</ComboboxItem>
            <ComboboxEmpty>No results</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

const DontUseForSmallListPreview = () => (
  <div className="w-64 space-y-2">
    <p className="text-xs text-muted-foreground">Combobox with only 3 static options</p>
    <Combobox>
      <ComboboxInput placeholder="Select status..." />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="active">Active</ComboboxItem>
          <ComboboxItem value="inactive">Inactive</ComboboxItem>
          <ComboboxItem value="pending">Pending</ComboboxItem>
          <ComboboxEmpty>No results</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
    <p className="text-xs text-destructive">Use Select for &lt;5 static options instead</p>
  </div>
)

const DontMissingEmptyPreview = () => (
  <div className="w-64 space-y-2">
    <p className="text-xs text-muted-foreground">Combobox without ComboboxEmpty — bad UX when search returns nothing</p>
    <div className="rounded-lg border bg-popover p-1 shadow-sm">
      <div className="text-sm px-3 py-2 text-muted-foreground italic">(Nothing shown — user is confused)</div>
    </div>
    <p className="text-xs text-destructive">Always include ComboboxEmpty</p>
  </div>
)

// ── Full doc data ─────────────────────────────────────────────────────────────

export const comboboxDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  // ── Overview ───────────────────────────────────────────────────────────────
  overview: {
    what: "A searchable input that opens a dropdown of selectable options, supporting both single-select and multi-select with chip tokens.",
    why: "Long option lists are unusable in a plain Select — users need to type to filter. Combobox wraps a text input and a dropdown in a single accessible unit.",
    problem: "When a list exceeds ~10 options, users cannot visually scan or remember every choice. A searchable combobox lets them type to narrow the list instantly.",
    appearsIn: [
      "Assignee and owner pickers",
      "Country / region selectors",
      "Tag and skill multi-selects",
      "Filter dropdowns in toolbars",
      "Form fields with large datasets",
    ],
  },

  // ── Anatomy ────────────────────────────────────────────────────────────────
  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Search input",
        description: "Text field where users type to filter options. Shows the selected value when closed.",
      },
      {
        name: "Clear button (×)",
        description: "Appears when a value is selected and showClear is true. Clicking resets the selection.",
        optional: true,
      },
      {
        name: "Trigger chevron",
        description: "Opens and closes the dropdown popup. Shown when showTrigger is true (default).",
        optional: true,
      },
      {
        name: "Dropdown popup",
        description: "Floating list of options, anchored below the input. Includes scroll when the list is long.",
      },
      {
        name: "Item with checkmark",
        description: "Each option row. The selected item shows a checkmark indicator on the right.",
      },
      {
        name: "Chips container",
        description: "Multi-select mode only. Wraps selected values as removable chip tokens inside the input area.",
        optional: true,
      },
      {
        name: "Group label",
        description: "Optional section header inside the dropdown for categorising items.",
        optional: true,
      },
    ],
  },

  // ── Usage ──────────────────────────────────────────────────────────────────
  whenToUse: [
    "Lists with 10 or more options where searching is faster than scrolling.",
    "Assigning a single owner, assignee, or category from a long list.",
    "Multi-selecting tags, skills, or labels with chip display.",
    "Country, city, or region pickers where users can type to filter.",
    "Toolbar filter dropdowns with searchable faceted values.",
  ],
  whenNotToUse: [
    "Lists with fewer than 5 static options — use Select instead.",
    "Binary choices (yes/no, on/off) — use Switch or Checkbox.",
    "Options that are complex UI (images, icons, metadata) — use a custom dialog.",
    "Inside another floating panel — comboboxes should not nest in popovers.",
  ],

  // ── Variants ───────────────────────────────────────────────────────────────
  variants: [
    {
      name: "Default single-select",
      description: "Standard input with chevron trigger. User types to search, clicks an item to select.",
      when: "Any searchable single-value selector with a medium-to-large option list.",
      preview: <DefaultSingleSelectPreview />,
    },
    {
      name: "With clear button",
      description: "Adds a × button when a value is selected, letting the user reset without reopening the dropdown.",
      when: "Fields where the selection is optional and the user may need to clear their choice.",
      preview: <WithClearPreview />,
    },
    {
      name: "Multi-select with chips",
      description: "Selected values appear as removable chip tokens inside the input area. Uses ComboboxChips layout.",
      when: "Tag pickers, skill selectors, or any field where multiple values must be selected simultaneously.",
      preview: <MultiSelectChipsPreview />,
    },
    {
      name: "Grouped with section labels",
      description: "Options divided into named groups with optional separators. Helps users orient in large lists.",
      when: "Lists of 15+ items that belong to distinct categories (e.g. countries by region, roles by department).",
      preview: <GroupedPreview />,
    },
    {
      name: "With disabled items",
      description: "Individual options can be disabled while the combobox itself remains interactive.",
      when: "Certain options require a higher plan, extra permissions, or are contextually unavailable.",
      preview: <DisabledItemsPreview />,
    },
  ],

  // ── States ─────────────────────────────────────────────────────────────────
  states: [
    {
      name: "Placeholder",
      description: "No value selected. Input shows placeholder text and the trigger chevron.",
      preview: <PlaceholderStatePreview />,
    },
    {
      name: "Value selected",
      description: "The selected item's label fills the input. The clear button appears if showClear is true.",
      preview: <ValueSelectedStatePreview />,
    },
    {
      name: "No results",
      description: "ComboboxEmpty renders when the typed search term matches no items.",
      preview: <NoResultsStatePreview />,
    },
    {
      name: "Disabled",
      description: "The entire combobox is non-interactive. Input is greyed out, chevron and interactions suppressed.",
      preview: <DisabledStatePreview />,
    },
    {
      name: "Error (multi-select)",
      description: "aria-invalid on the ComboboxChips container triggers a red ring. Pair with an error message below.",
      preview: <ErrorStatePreview />,
    },
  ],

  // ── Properties ─────────────────────────────────────────────────────────────
  properties: [
    {
      name: "value / onValueChange",
      values: "string (single) · string[] (multiple)",
      default: "—",
      description: "Controlled selection. Omit for uncontrolled.",
    },
    {
      name: "multiple",
      values: "boolean",
      default: "false",
      description: "Enables multi-select mode. Use with ComboboxChips.",
    },
    {
      name: "disabled",
      values: "boolean",
      default: "false",
      description: "Disables the entire combobox root.",
    },
    {
      name: "inputValue / onInputValueChange",
      values: "string / (v: string) => void",
      default: "—",
      description: "Controlled search input text. Use when driving the option list from an API.",
    },
    {
      name: "showTrigger (ComboboxInput)",
      values: "boolean",
      default: "true",
      description: "Shows the chevron button that opens the dropdown.",
    },
    {
      name: "showClear (ComboboxInput)",
      values: "boolean",
      default: "false",
      description: "Shows the × clear button when a value is set.",
    },
    {
      name: "placeholder (ComboboxInput)",
      values: "string",
      default: "—",
      description: "Placeholder text shown in the input when no value is selected.",
    },
  ],

  // ── Content guidance ───────────────────────────────────────────────────────
  contentGuidance: [
    {
      rule: "Placeholder should name the action",
      detail: "\"Select assignee\", not \"Select\" or \"Choose\". Tell the user what they are picking.",
    },
    {
      rule: "Item labels should be unique",
      detail: "Each option must be clearly distinguishable by text alone — no duplicates.",
    },
    {
      rule: "Group labels are Title Case",
      detail: "\"Africa\", \"Engineering Roles\", not \"africa\" or \"ENGINEERING ROLES\".",
    },
    {
      rule: "Chip labels match the item label",
      detail: "The chip value displayed in multi-select must be the same text as the option in the list.",
    },
  ],

  // ── Behavior ───────────────────────────────────────────────────────────────
  behavior: [
    "Typing in the input filters items instantly (client-side) via ComboboxCollection.",
    "Pressing Escape closes the dropdown and restores the previous value.",
    "Pressing ArrowDown / ArrowUp moves focus through the list. Enter confirms.",
    "Clicking outside (blur) closes the dropdown.",
    "In multi-select mode, selecting an already-selected item removes it from the chips.",
    "ComboboxEmpty is shown automatically when the collection is empty — no manual condition needed.",
    "The dropdown width matches the anchor input width by default.",
  ],

  // ── Spacing ────────────────────────────────────────────────────────────────
  spacing: [
    {
      rule: "Minimum trigger width",
      detail: "Always at least w-64. Never set width smaller than this on a combobox trigger wrapper.",
    },
    {
      rule: "Multi-select chips container",
      detail: "Use w-full max-w-md to prevent the chips container from becoming too wide.",
    },
    {
      rule: "In a form column",
      detail: "w-full inside a max-w-sm or max-w-md form container.",
    },
    {
      rule: "In a table column",
      detail: "The column should be at least 160px wide. Do not use a combobox in a very narrow table cell.",
    },
  ],

  // ── Accessibility ──────────────────────────────────────────────────────────
  accessibility: [
    {
      rule: "Keyboard navigable",
      detail: "All items must be reachable by arrow keys. This is handled by base-ui — don't override tabIndex.",
    },
    {
      rule: "Label the input",
      detail: "Wrap in a Field with a visible label, or at minimum add aria-label to the ComboboxInput.",
    },
    {
      rule: "Error state via aria-invalid",
      detail: "Set aria-invalid=\"true\" on ComboboxChips or the ComboboxInput wrapper, not just a visual border.",
    },
    {
      rule: "Disabled items are still readable",
      detail: "Screen readers announce disabled options — make sure their labels convey why they are unavailable.",
    },
  ],

  // ── Do & Don't ─────────────────────────────────────────────────────────────
  doItems: [
    {
      label: "Use showClear when selection is optional",
      description: "Let users deselect without reopening the dropdown by showing the × clear button.",
      preview: <DoShowClearPreview />,
    },
    {
      label: "Use groups when the list exceeds 10 items",
      description: "Grouping with ComboboxGroup and ComboboxLabel helps users orient in large lists.",
      preview: <DoGroupsPreview />,
    },
    {
      label: "Use multi + chips for tag selection",
      description: "ComboboxChips gives users clear visibility of all selected values and easy removal.",
      preview: <DoMultiChipsPreview />,
    },
  ],
  dontItems: [
    {
      label: "Don't use for fewer than 5 options",
      description: "Short static lists are easier with a Select — no search is needed.",
      preview: <DontUseForSmallListPreview />,
    },
    {
      label: "Don't omit ComboboxEmpty",
      description: "Without it, a search with no matches renders a blank dropdown — the user has no feedback.",
      preview: <DontMissingEmptyPreview />,
    },
  ],

  // ── Examples in context ────────────────────────────────────────────────────
  examplesInContext: [
    {
      title: "Assignee picker in a task list",
      description: "Each task row has an inline combobox for quickly reassigning owners. Avatars in the dropdown aid recognition.",
      preview: <AssigneePickerExample />,
      code: `const tasks = [
  { id: "1", title: "Fix login flow bug",      assignee: "Adaeze Okoye"    },
  { id: "2", title: "Update onboarding copy",  assignee: "Emeka Nwachukwu" },
  { id: "3", title: "Design payment screen",   assignee: ""                },
  { id: "4", title: "Integrate Paystack API",  assignee: "Chidi Okonkwo"   },
]

const members = ["Adaeze Okoye", "Emeka Nwachukwu", "Ngozi Achebe", "Chidi Okonkwo", "Amara Okafor"]

<div className="w-full rounded-xl border overflow-hidden text-sm">
  <div className="grid grid-cols-[1fr_200px] gap-4 px-4 py-2 border-b bg-muted/50">
    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Task</p>
    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Assignee</p>
  </div>
  {tasks.map(task => (
    <div key={task.id} className="grid grid-cols-[1fr_200px] gap-4 items-center px-4 py-3 border-b last:border-0">
      <p className="text-sm truncate">{task.title}</p>
      <Combobox defaultValue={task.assignee}>
        <ComboboxInput placeholder="Assign..." showClear className="h-8 text-xs" />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxCollection>
              {members.map(name => (
                <ComboboxItem key={name} value={name}>
                  <Avatar className="size-5 rounded-full">
                    <AvatarImage src={\`https://api.dicebear.com/9.x/micah/svg?seed=\${name.split(" ")[0]}\`} alt={name} />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                  </Avatar>
                  {name}
                </ComboboxItem>
              ))}
            </ComboboxCollection>
            <ComboboxEmpty>No results</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ))}
</div>`,
    },
    {
      title: "Country picker with groups in an onboarding form",
      description: "Countries grouped by region in a two-field onboarding form. showClear lets users change their selection.",
      preview: <CountryPickerFormExample />,
      code: `<div className="max-w-sm rounded-xl border p-5 space-y-4">
  <div>
    <h3 className="text-sm font-semibold">Where are you based?</h3>
    <p className="text-xs text-muted-foreground mt-0.5">We use this to set your default currency and tax region.</p>
  </div>
  <div className="space-y-1.5">
    <label className="text-xs font-medium text-foreground">Country</label>
    <Combobox>
      <ComboboxInput placeholder="Select country..." showClear className="w-full" />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxGroup>
            <ComboboxLabel>Africa</ComboboxLabel>
            <ComboboxCollection>
              <ComboboxItem value="ng">Nigeria</ComboboxItem>
              <ComboboxItem value="gh">Ghana</ComboboxItem>
              <ComboboxItem value="ke">Kenya</ComboboxItem>
              <ComboboxItem value="za">South Africa</ComboboxItem>
              <ComboboxItem value="eg">Egypt</ComboboxItem>
            </ComboboxCollection>
          </ComboboxGroup>
          <ComboboxSeparator />
          <ComboboxGroup>
            <ComboboxLabel>Europe</ComboboxLabel>
            <ComboboxCollection>
              <ComboboxItem value="gb">United Kingdom</ComboboxItem>
              <ComboboxItem value="de">Germany</ComboboxItem>
              <ComboboxItem value="fr">France</ComboboxItem>
            </ComboboxCollection>
          </ComboboxGroup>
          <ComboboxEmpty>No results</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </div>
  <div className="space-y-1.5">
    <label className="text-xs font-medium text-foreground">City</label>
    <input className="flex h-10 w-full rounded-lg border border-input bg-input/30 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. Lagos" />
  </div>
</div>`,
    },
    {
      title: "Tag / skill multi-select in a profile editor",
      description: "Selected skills appear as removable chips inside the input. The dropdown stays anchored to the chips container.",
      preview: <TagMultiSelectExample />,
      code: `"use client"
import { useComboboxAnchor, Combobox, ComboboxChips, ComboboxChipsInput, ComboboxChip, ComboboxValue, ComboboxContent, ComboboxList, ComboboxCollection, ComboboxItem, ComboboxEmpty } from "@/components/ui/combobox"

function ProfileSkillsEditor() {
  const anchor = useComboboxAnchor()

  return (
    <div className="max-w-md rounded-xl border p-5 space-y-4">
      <h3 className="text-sm font-semibold">Adaeze Okoye — Profile</h3>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-foreground">Skills</label>
        <div className="w-full max-w-md">
          <Combobox multiple defaultValue={["design", "product"]}>
            <ComboboxChips ref={anchor}>
              <ComboboxValue
                render={({ value }) =>
                  (value as string[]).map(v => (
                    <ComboboxChip key={v} value={v}>
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </ComboboxChip>
                  ))
                }
              />
              <ComboboxChipsInput placeholder="Add skill..." />
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
              <ComboboxList>
                <ComboboxCollection>
                  <ComboboxItem value="design">Design</ComboboxItem>
                  <ComboboxItem value="engineering">Engineering</ComboboxItem>
                  <ComboboxItem value="product">Product</ComboboxItem>
                  <ComboboxItem value="marketing">Marketing</ComboboxItem>
                  <ComboboxItem value="data">Data</ComboboxItem>
                  <ComboboxItem value="finance">Finance</ComboboxItem>
                </ComboboxCollection>
                <ComboboxEmpty>No results</ComboboxEmpty>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </div>
    </div>
  )
}`,
    },
  ],

  // ── Related components ─────────────────────────────────────────────────────
  relatedComponents: [
    {
      slug: "select",
      name: "Select",
      description: "A non-searchable dropdown for choosing one option from a short list.",
      when: "You have fewer than 10 static options and no search is needed.",
    },
    {
      slug: "input",
      name: "Input",
      description: "Plain single-line text entry.",
      when: "Users type free-form text rather than selecting from a defined list.",
    },
    {
      slug: "data-table",
      name: "Data Table",
      description: "Full-featured table with filtering, sorting, and pagination.",
      when: "You need faceted filter comboboxes inside a toolbar — use DataTableFacetedFilter.",
    },
  ],

  // ── Design notes ───────────────────────────────────────────────────────────
  designNotes: [
    "Built on base-ui Combobox — all keyboard behaviour (arrow navigation, Escape, Enter) comes for free.",
    "The ComboboxInput width is driven by its wrapper. Always set width on the wrapper div, not the component itself.",
    "Chips mode uses a separate layout: ComboboxChips replaces ComboboxInput, and ComboboxContent must receive the anchor ref.",
    "In Figma, the single-select and multi-select modes are separate component variants — choose the right one before handing off.",
  ],
}
