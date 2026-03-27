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
import { Label } from "@/components/ui/label"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Previews ──────────────────────────────────────────────────────────────────

const MEMBERS = ["Adaeze Okoye", "Emeka Nwachukwu", "Ngozi Achebe", "Chidi Okonkwo"]
const PLANS = ["Free", "Pro", "Enterprise"]

const BasicPreview = () => (
  <div className="w-64">
    <Combobox defaultValue="Adaeze Okoye" items={MEMBERS}>
      <ComboboxInput placeholder="Select team member..." showClear showTrigger />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="Adaeze Okoye">Adaeze Okoye</ComboboxItem>
          <ComboboxItem value="Emeka Nwachukwu">Emeka Nwachukwu</ComboboxItem>
          <ComboboxItem value="Ngozi Achebe">Ngozi Achebe</ComboboxItem>
          <ComboboxItem value="Chidi Okonkwo">Chidi Okonkwo</ComboboxItem>
          <ComboboxEmpty>No results found</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </div>
)

const WithLabelPreview = () => (
  <div className="flex flex-col gap-1.5 w-64">
    <Label htmlFor="dev-cmb-lbl">Assignee</Label>
    <Combobox defaultValue="Adaeze Okoye">
      <ComboboxInput id="dev-cmb-lbl" placeholder="Select assignee..." showClear />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="Adaeze Okoye">Adaeze Okoye</ComboboxItem>
          <ComboboxItem value="Emeka Nwachukwu">Emeka Nwachukwu</ComboboxItem>
          <ComboboxItem value="Ngozi Achebe">Ngozi Achebe</ComboboxItem>
          <ComboboxEmpty>No results found</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </div>
)

const ControlledPreview = () => {
  const [value, setValue] = useState("")
  return (
    <div className="flex flex-col gap-3 w-64">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="dev-cmb-ctrl">Plan</Label>
        <Combobox value={value} onValueChange={(v) => setValue(v ?? "")} items={PLANS}>
          <ComboboxInput id="dev-cmb-ctrl" placeholder="Select a plan..." showClear />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxItem value="Free">Free</ComboboxItem>
              <ComboboxItem value="Pro">Pro</ComboboxItem>
              <ComboboxItem value="Enterprise">Enterprise</ComboboxItem>
              <ComboboxEmpty>No results found</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
      {value && (
        <p className="text-xs text-muted-foreground">Selected: <span className="font-mono">{value}</span></p>
      )}
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
          </ComboboxGroup>
          <ComboboxSeparator />
          <ComboboxGroup>
            <ComboboxLabel>Europe</ComboboxLabel>
            <ComboboxItem value="gb">United Kingdom</ComboboxItem>
            <ComboboxItem value="de">Germany</ComboboxItem>
            <ComboboxItem value="fr">France</ComboboxItem>
          </ComboboxGroup>
          <ComboboxEmpty>No results found</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </div>
)

const SKILLS = ["design", "engineering", "product", "marketing", "data"]

function MultiSelectPreview() {
  const anchor = useComboboxAnchor()
  const [selected, setSelected] = useState<string[]>(["design", "product"])
  return (
    <div className="w-full max-w-md">
      <Combobox multiple value={selected} onValueChange={setSelected} items={SKILLS}>
        <ComboboxChips ref={anchor}>
          {selected.map(v => (
            <ComboboxChip key={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</ComboboxChip>
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
            <ComboboxEmpty>No results found</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

const DisabledItemPreview = () => (
  <div className="w-64">
    <Combobox>
      <ComboboxInput placeholder="Select plan..." />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="free">Free</ComboboxItem>
          <ComboboxItem value="pro">Pro</ComboboxItem>
          <ComboboxItem value="enterprise" disabled>Enterprise (Contact sales)</ComboboxItem>
          <ComboboxEmpty>No results found</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </div>
)

function ErrorPreview() {
  const [selected, setSelected] = useState<string[]>([])
  return (
    <div className="flex flex-col gap-1.5 w-full max-w-md">
      <Label>Skills</Label>
      <Combobox multiple value={selected} onValueChange={setSelected}>
        <ComboboxChips aria-invalid="true">
          {selected.map(v => <ComboboxChip key={v}>{v}</ComboboxChip>)}
          <ComboboxChipsInput placeholder="Add at least one skill..." />
        </ComboboxChips>
      </Combobox>
      <p className="text-xs text-destructive">At least one skill is required.</p>
    </div>
  )
}

// ── Combobox develop doc ───────────────────────────────────────────────────────

export const comboboxDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/combobox",
    importPath: `import {
  Combobox, ComboboxInput, ComboboxContent, ComboboxList,
  ComboboxItem, ComboboxEmpty, ComboboxGroup, ComboboxLabel,
  ComboboxSeparator, ComboboxChips, ComboboxChipsInput,
  ComboboxChip, useComboboxAnchor,
} from "@/components/ui/combobox"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "For form labels, also install: npx shadcn add @raana/label",
      "Multi-select mode requires useComboboxAnchor() — call it in the same component as ComboboxChips.",
      "Built on base-ui Combobox — keyboard navigation (arrows, Enter, Escape) is handled automatically.",
      "For large/dynamic lists, pass items={data} to Combobox and use ComboboxCollection with a render function.",
    ],
  },

  basicUsage: `import {
  Combobox, ComboboxInput, ComboboxContent, ComboboxList,
  ComboboxItem, ComboboxEmpty,
} from "@/components/ui/combobox"
import { Label } from "@/components/ui/label"

// Single-select with label (recommended)
<div className="flex flex-col gap-1.5 w-64">
  <Label htmlFor="assignee">Assignee</Label>
  <Combobox defaultValue="Adaeze Okoye">
    <ComboboxInput id="assignee" placeholder="Select assignee..." showClear />
    <ComboboxContent>
      <ComboboxList>
        <ComboboxItem value="Adaeze Okoye">Adaeze Okoye</ComboboxItem>
        <ComboboxItem value="Emeka Nwachukwu">Emeka Nwachukwu</ComboboxItem>
        <ComboboxEmpty>No results found</ComboboxEmpty>
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</div>

// Controlled
const [value, setValue] = useState("")
<Combobox value={value} onValueChange={(v) => setValue(v ?? "")}>...</Combobox>

// Multi-select with chips (requires "use client" + state)
"use client"
const anchor = useComboboxAnchor()
const [selected, setSelected] = useState<string[]>([])
<Combobox multiple value={selected} onValueChange={setSelected}>
  <ComboboxChips ref={anchor}>
    {selected.map(v => <ComboboxChip key={v}>{v}</ComboboxChip>)}
    <ComboboxChipsInput placeholder="Add..." />
  </ComboboxChips>
  <ComboboxContent anchor={anchor}>...</ComboboxContent>
</Combobox>`,

  codeExamples: [
    {
      title: "Basic single-select",
      description: "Uncontrolled combobox with defaultValue, showClear, and showTrigger.",
      preview: <BasicPreview />,
      code: `<div className="w-64">
  <Combobox defaultValue="Adaeze Okoye">
    <ComboboxInput placeholder="Select team member..." showClear showTrigger />
    <ComboboxContent>
      <ComboboxList>
        <ComboboxItem value="Adaeze Okoye">Adaeze Okoye</ComboboxItem>
        <ComboboxItem value="Emeka Nwachukwu">Emeka Nwachukwu</ComboboxItem>
        <ComboboxItem value="Ngozi Achebe">Ngozi Achebe</ComboboxItem>
        <ComboboxItem value="Chidi Okonkwo">Chidi Okonkwo</ComboboxItem>
        <ComboboxEmpty>No results found</ComboboxEmpty>
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</div>`,
    },
    {
      title: "With label",
      description: "Pass id to ComboboxInput (not the Combobox root) and use htmlFor on the Label.",
      preview: <WithLabelPreview />,
      code: `<div className="flex flex-col gap-1.5 w-64">
  <Label htmlFor="assignee">Assignee</Label>
  <Combobox defaultValue="Adaeze Okoye">
    <ComboboxInput id="assignee" placeholder="Select assignee..." showClear />
    <ComboboxContent>
      <ComboboxList>
        <ComboboxItem value="Adaeze Okoye">Adaeze Okoye</ComboboxItem>
        <ComboboxItem value="Emeka Nwachukwu">Emeka Nwachukwu</ComboboxItem>
        <ComboboxItem value="Ngozi Achebe">Ngozi Achebe</ComboboxItem>
        <ComboboxEmpty>No results found</ComboboxEmpty>
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</div>`,
    },
    {
      title: "Controlled combobox",
      description: "Use value and onValueChange to drive selection from React state.",
      preview: <ControlledPreview />,
      code: `const [value, setValue] = useState("")

<div className="flex flex-col gap-1.5 w-64">
  <Label htmlFor="plan">Plan</Label>
  <Combobox value={value} onValueChange={(v) => setValue(v ?? "")}>
    <ComboboxInput id="plan" placeholder="Select a plan..." showClear />
    <ComboboxContent>
      <ComboboxList>
        <ComboboxItem value="Free">Free</ComboboxItem>
        <ComboboxItem value="Pro">Pro</ComboboxItem>
        <ComboboxItem value="Enterprise">Enterprise</ComboboxItem>
        <ComboboxEmpty>No results found</ComboboxEmpty>
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</div>`,
    },
    {
      title: "Grouped with section labels",
      description: "Use ComboboxGroup, ComboboxLabel, and ComboboxSeparator to organise large option lists.",
      preview: <GroupedPreview />,
      code: `<div className="w-64">
  <Combobox>
    <ComboboxInput placeholder="Select country..." />
    <ComboboxContent>
      <ComboboxList>
        <ComboboxGroup>
          <ComboboxLabel>Africa</ComboboxLabel>
          <ComboboxItem value="ng">Nigeria</ComboboxItem>
          <ComboboxItem value="gh">Ghana</ComboboxItem>
          <ComboboxItem value="ke">Kenya</ComboboxItem>
        </ComboboxGroup>
        <ComboboxSeparator />
        <ComboboxGroup>
          <ComboboxLabel>Europe</ComboboxLabel>
          <ComboboxItem value="gb">United Kingdom</ComboboxItem>
          <ComboboxItem value="de">Germany</ComboboxItem>
          <ComboboxItem value="fr">France</ComboboxItem>
        </ComboboxGroup>
        <ComboboxEmpty>No results found</ComboboxEmpty>
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</div>`,
    },
    {
      title: "Multi-select with chips",
      description: "Selected values appear as removable chip tokens. Render chips manually from state. useComboboxAnchor() anchors the dropdown to the chips container.",
      preview: <MultiSelectPreview />,
      code: `"use client"
import { useState } from "react"
import { useComboboxAnchor, ... } from "@/components/ui/combobox"

function SkillsPicker() {
  const anchor = useComboboxAnchor()
  const [selected, setSelected] = useState<string[]>(["design", "product"])

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
            <ComboboxEmpty>No results found</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}`,
    },
    {
      title: "Disabled item",
      description: "Individual items can be disabled while the combobox remains interactive.",
      preview: <DisabledItemPreview />,
      code: `<div className="w-64">
  <Combobox>
    <ComboboxInput placeholder="Select plan..." />
    <ComboboxContent>
      <ComboboxList>
        <ComboboxItem value="free">Free</ComboboxItem>
        <ComboboxItem value="pro">Pro</ComboboxItem>
        <ComboboxItem value="enterprise" disabled>Enterprise (Contact sales)</ComboboxItem>
        <ComboboxEmpty>No results found</ComboboxEmpty>
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</div>`,
    },
    {
      title: "Error state",
      description: "Set aria-invalid on ComboboxChips (multi-select) to trigger the destructive ring.",
      preview: <ErrorPreview />,
      code: `const [selected, setSelected] = useState<string[]>([])

<div className="flex flex-col gap-1.5 w-full max-w-md">
  <Label>Skills</Label>
  <Combobox multiple value={selected} onValueChange={setSelected}>
    <ComboboxChips aria-invalid="true">
      {selected.map(v => <ComboboxChip key={v}>{v}</ComboboxChip>)}
      <ComboboxChipsInput placeholder="Add at least one skill..." />
    </ComboboxChips>
  </Combobox>
  <p className="text-xs text-destructive">At least one skill is required.</p>
</div>`,
    },
  ],

  apiReference: [
    {
      name: "value",
      values: "string (single) · string[] (multiple)",
      default: "—",
      description: "Controlled selected value. Pair with onValueChange.",
    },
    {
      name: "defaultValue",
      values: "string (single) · string[] (multiple)",
      default: "—",
      description: "Uncontrolled initial selected value.",
    },
    {
      name: "onValueChange",
      values: "(value: string | null) => void",
      default: "—",
      description: "Called when the user selects an item. Value is null when the selection is cleared.",
    },
    {
      name: "multiple",
      values: "boolean",
      default: "false",
      description: "Enables multi-select mode. Use with ComboboxChips, ComboboxChipsInput, and manual chip rendering.",
    },
    {
      name: "disabled",
      values: "boolean",
      default: "false",
      description: "Disables the entire combobox root.",
    },
    {
      name: "items",
      values: "T[]",
      default: "—",
      description: "Item array for dynamic/virtual lists. Pass when using ComboboxCollection with a render function.",
    },
    {
      name: "inputValue / onInputValueChange",
      values: "string / (v: string) => void",
      default: "—",
      description: "Controlled search input text. Use when driving the option list from an external API.",
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
      description: "Shows the × clear button when a value is selected.",
    },
    {
      name: "placeholder (ComboboxInput)",
      values: "string",
      default: "—",
      description: "Placeholder text shown in the input when no value is selected.",
    },
    {
      name: "id (ComboboxInput)",
      values: "string",
      default: "—",
      description: "For Label association — pass id to ComboboxInput, not the Combobox root.",
    },
    {
      name: "disabled (ComboboxItem)",
      values: "boolean",
      default: "false",
      description: "Prevents individual items from being selected. Item remains visible and announced by screen readers.",
    },
    {
      name: "anchor (ComboboxContent)",
      values: "RefObject<Element>",
      default: "—",
      description: "In multi-select mode, pass the ref from useComboboxAnchor() so the dropdown anchors to the chips container.",
    },
    {
      name: "aria-invalid (ComboboxChips)",
      values: `boolean | "true" | "false"`,
      default: "—",
      description: "Applies destructive ring/border to signal a validation error on the chips container.",
    },
  ],

  accessibility: [
    {
      rule: "Label the input",
      detail: "Always pair with a visible Label using htmlFor targeting the ComboboxInput id, or add aria-label to the ComboboxInput directly.",
    },
    {
      rule: "id goes on ComboboxInput",
      detail: "For Label association, pass id to ComboboxInput — not the Combobox root element.",
    },
    {
      rule: "Keyboard navigation is built-in",
      detail: "Arrow keys navigate items, Enter selects, Escape closes and restores previous value. Do not override tabIndex on items.",
    },
    {
      rule: "Always include ComboboxEmpty",
      detail: "Without it, a search with no matches renders a blank dropdown with no feedback for keyboard or screen reader users.",
    },
    {
      rule: "Error state via aria-invalid",
      detail: "Set aria-invalid on ComboboxChips (multi-select) to trigger the destructive ring. Pair with aria-describedby pointing to the error message element.",
    },
    {
      rule: "Disabled items remain readable",
      detail: "Screen readers announce disabled options. Make labels convey why the option is unavailable (e.g. \"Enterprise (Contact sales)\").",
    },
  ],
}
