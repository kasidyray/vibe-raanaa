"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ButtonGroup,
  ButtonGroupText,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"
import {
  RiListCheck,
  RiLayoutGridLine,
  RiTableLine,
  RiBold,
  RiItalic,
  RiUnderline,
  RiMapLine,
} from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ───────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    <ButtonGroup aria-label="View options">
      <Button variant="outline" size="sm">List</Button>
      <Button variant="outline" size="sm">Grid</Button>
      <Button variant="outline" size="sm">Table</Button>
    </ButtonGroup>
    <div className="flex items-start gap-10 text-center">
      {["① Container (ButtonGroup)", "② Fused border", "③ Button items"].map(label => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="h-5 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

// ── Variant previews ──────────────────────────────────────────────────────────

const HorizontalVariantPreview = () => (
  <ButtonGroup aria-label="View options">
    <Button variant="outline" size="sm"><RiListCheck />List</Button>
    <Button variant="outline" size="sm"><RiLayoutGridLine />Grid</Button>
    <Button variant="outline" size="sm"><RiTableLine />Table</Button>
  </ButtonGroup>
)

const VerticalVariantPreview = () => (
  <ButtonGroup orientation="vertical" aria-label="View options">
    <Button variant="outline" size="sm"><RiListCheck />List</Button>
    <Button variant="outline" size="sm"><RiLayoutGridLine />Grid</Button>
    <Button variant="outline" size="sm"><RiTableLine />Table</Button>
  </ButtonGroup>
)

// ── State previews ────────────────────────────────────────────────────────────

const DefaultStatePreview = () => (
  <ButtonGroup aria-label="Alignment options">
    <Button variant="outline" size="sm">Left</Button>
    <Button variant="outline" size="sm">Center</Button>
    <Button variant="outline" size="sm">Right</Button>
  </ButtonGroup>
)

const WithSeparatorStatePreview = () => (
  <ButtonGroup aria-label="Text formatting">
    <Button variant="outline" size="sm"><RiBold /></Button>
    <Button variant="outline" size="sm"><RiItalic /></Button>
    <ButtonGroupSeparator />
    <Button variant="outline" size="sm"><RiUnderline /></Button>
  </ButtonGroup>
)

const WithTextPrefixStatePreview = () => (
  <ButtonGroup aria-label="URL input">
    <ButtonGroupText>https://</ButtonGroupText>
    <Input placeholder="example.com" className="min-w-40" />
  </ButtonGroup>
)

const DisabledItemStatePreview = () => (
  <ButtonGroup aria-label="View options">
    <Button variant="outline" size="sm">List</Button>
    <Button variant="outline" size="sm" disabled>Grid</Button>
    <Button variant="outline" size="sm">Table</Button>
  </ButtonGroup>
)

// ── Do / Don't previews ───────────────────────────────────────────────────────

const DoRelatedActionsPreview = () => (
  <ButtonGroup aria-label="Text alignment">
    <Button variant="outline" size="sm">Left</Button>
    <Button variant="outline" size="sm">Center</Button>
    <Button variant="outline" size="sm">Right</Button>
  </ButtonGroup>
)

const DoCurrencyPrefixPreview = () => (
  <ButtonGroup aria-label="Price input">
    <ButtonGroupText>$</ButtonGroupText>
    <Input placeholder="0.00" className="min-w-24" />
  </ButtonGroup>
)

const DoSeparatorSubgroupPreview = () => (
  <ButtonGroup aria-label="Text formatting">
    <Button variant="outline" size="sm"><RiBold /></Button>
    <Button variant="outline" size="sm"><RiItalic /></Button>
    <ButtonGroupSeparator />
    <Button variant="outline" size="sm"><RiUnderline /></Button>
  </ButtonGroup>
)

const DontUnrelatedActionsPreview = () => (
  <div className="flex flex-col items-center gap-2">
    <ButtonGroup aria-label="Mixed actions">
      <Button variant="outline" size="sm">Save</Button>
      <Button variant="outline" size="sm">Help</Button>
      <Button variant="outline" size="sm">Profile</Button>
    </ButtonGroup>
    <p className="text-xs text-muted-foreground text-center">Unrelated actions shouldn&apos;t be grouped</p>
  </div>
)

const DontButtonGroupTextAsButtonPreview = () => (
  <div className="flex flex-col items-center gap-2">
    <ButtonGroup aria-label="Units">
      <ButtonGroupText>kg</ButtonGroupText>
      <ButtonGroupText>lb</ButtonGroupText>
    </ButtonGroup>
    <p className="text-xs text-muted-foreground text-center">ButtonGroupText has no interaction states</p>
  </div>
)

const DontTooManyItemsPreview = () => (
  <div className="flex flex-col items-center gap-2">
    <ButtonGroup aria-label="Too many options">
      <Button variant="outline" size="sm">Option 1</Button>
      <Button variant="outline" size="sm">Option 2</Button>
      <Button variant="outline" size="sm">Option 3</Button>
      <Button variant="outline" size="sm">Option 4</Button>
      <Button variant="outline" size="sm">Option 5</Button>
      <Button variant="outline" size="sm">Option 6</Button>
      <Button variant="outline" size="sm">Option 7</Button>
    </ButtonGroup>
    <p className="text-xs text-muted-foreground text-center">Use a DropdownMenu for more than 5–6 items</p>
  </div>
)

// ── Examples in context ───────────────────────────────────────────────────────

const ToolbarExample = () => (
  <div className="rounded-xl border overflow-hidden">
    <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
      <p className="text-sm font-medium">Format</p>
      <ButtonGroup aria-label="Text formatting">
        <Button variant="outline" size="sm"><RiBold /></Button>
        <Button variant="outline" size="sm"><RiItalic /></Button>
        <ButtonGroupSeparator />
        <Button variant="outline" size="sm"><RiUnderline /></Button>
      </ButtonGroup>
    </div>
    <div className="px-4 py-8 flex items-center justify-center">
      <p className="text-sm text-muted-foreground">Editor content</p>
    </div>
  </div>
)

const UrlInputExample = () => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium">Website</label>
    <ButtonGroup aria-label="Website URL">
      <ButtonGroupText>https://</ButtonGroupText>
      <Input placeholder="yoursite.com" className="min-w-52" />
    </ButtonGroup>
  </div>
)

const ViewToggleExample = () => {
  const [view, setView] = React.useState<"list" | "grid" | "map">("list")
  return (
    <ButtonGroup aria-label="View mode">
      <Button
        variant={view === "list" ? "secondary" : "outline"}
        size="sm"
        onClick={() => setView("list")}
      >
        <RiListCheck />
        List
      </Button>
      <Button
        variant={view === "grid" ? "secondary" : "outline"}
        size="sm"
        onClick={() => setView("grid")}
      >
        <RiLayoutGridLine />
        Grid
      </Button>
      <Button
        variant={view === "map" ? "secondary" : "outline"}
        size="sm"
        onClick={() => setView("map")}
      >
        <RiMapLine />
        Map
      </Button>
    </ButtonGroup>
  )
}

// ── ButtonGroup design doc ────────────────────────────────────────────────────

export const buttonGroupDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  // ── Overview ───────────────────────────────────────────────────────────────
  overview: {
    what: "A container that fuses a set of related buttons or inputs into a single visually connected unit by removing the shared borders between adjacent children.",
    why: "Grouped controls that belong together — like view toggles or alignment options — should look connected. ButtonGroup communicates that relationship without extra prose or labels.",
    problem: "Without ButtonGroup, placing buttons side by side results in double borders and independent border-radius, making the relationship between options unclear. Manually managing borders is fragile and inconsistent.",
    appearsIn: [
      "Toolbar view-mode toggles (List / Grid / Table)",
      "Text-formatting toolbars (Bold / Italic / Underline)",
      "URL inputs with a protocol prefix (https://)",
      "Currency or unit inputs ($, kg, %)",
      "Sidebar option groups (stacked orientation)",
    ],
  },

  // ── Anatomy ────────────────────────────────────────────────────────────────
  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "ButtonGroup (container)",
        description: "A <div role=\"group\"> that applies border-fusion CSS to its direct children via data-slot selectors.",
      },
      {
        name: "Fused border",
        description: "The shared border between adjacent items. CSS removes border-radius and the duplicate border from middle items, making the group read as one unit.",
      },
      {
        name: "Button items",
        description: "The individual Button, Input, or ButtonGroupText children. Each must have a data-slot attribute — standard UI components already include this.",
      },
      {
        name: "ButtonGroupText",
        optional: true,
        description: "A pill-shaped static text label (e.g. \"https://\" or \"$\"). Not interactive — used as a prefix or suffix alongside an Input.",
      },
      {
        name: "ButtonGroupSeparator",
        optional: true,
        description: "A thin vertical (or horizontal in vertical groups) divider bar that sub-divides items within the group without breaking the fusion.",
      },
    ],
  },

  // ── Usage ──────────────────────────────────────────────────────────────────
  whenToUse: [
    "Toggling between mutually related options — view modes, text alignment, sort direction.",
    "Adding a non-interactive prefix or suffix to a text input — currency symbols, units, protocol strings.",
    "Visually sub-grouping a set of toolbar actions that belong together (Bold/Italic/Underline).",
    "Stacked (vertical) option lists in sidebars or filter panels.",
  ],
  whenNotToUse: [
    "Unrelated actions that happen to be placed near each other — keep those as separate Buttons.",
    "Selection state management — ButtonGroup handles border fusion only. Use ToggleGroup or useState for active tracking.",
    "Navigation links — use Tabs or a navigation list instead.",
    "More than 5–6 options — use a DropdownMenu or Select to avoid visual overload.",
  ],

  // ── Variants ───────────────────────────────────────────────────────────────
  variants: [
    {
      name: "Horizontal",
      description: "Default orientation. Children sit side by side. Left/right borders are fused. Use for toolbar-style controls.",
      when: "The most common case — view toggles, formatting controls, inline prefix inputs.",
      preview: <HorizontalVariantPreview />,
    },
    {
      name: "Vertical",
      description: "Children stack top to bottom. Top/bottom borders are fused. Corner radius is smaller (rounded-md) to match stacked list patterns.",
      when: "Sidebar option groups, stacked filter toggles, settings panels.",
      preview: <VerticalVariantPreview />,
    },
  ],

  // ── States ─────────────────────────────────────────────────────────────────
  states: [
    {
      name: "Default",
      description: "Three fused buttons in a horizontal group. Children share borders — middle item has no rounded corners.",
      preview: <DefaultStatePreview />,
    },
    {
      name: "With separator",
      description: "A ButtonGroupSeparator between groups of buttons adds a thin visual divider without breaking the overall group fusion.",
      preview: <WithSeparatorStatePreview />,
    },
    {
      name: "With text prefix",
      description: "ButtonGroupText before an Input creates a fused label + field unit. The text element is not interactive.",
      preview: <WithTextPrefixStatePreview />,
    },
    {
      name: "Disabled item",
      description: "An individual Button inside the group can be disabled independently. The group itself remains intact.",
      preview: <DisabledItemStatePreview />,
    },
  ],

  // ── Properties ─────────────────────────────────────────────────────────────
  properties: [
    {
      name: "ButtonGroup.orientation",
      values: '"horizontal" · "vertical"',
      default: '"horizontal"',
      description: "Controls the flex direction and which borders are fused — left/right for horizontal, top/bottom for vertical.",
    },
    {
      name: "ButtonGroupText (children)",
      values: "React.ReactNode",
      default: "—",
      description: "Static label content. No interactive props — just children and an optional render prop for tag customisation.",
    },
    {
      name: "ButtonGroupSeparator.orientation",
      values: '"horizontal" · "vertical"',
      default: '"vertical"',
      description: "Separator orientation. Defaults to vertical (a vertical bar between horizontal items). Adapts automatically inside vertical ButtonGroups.",
    },
  ],

  // ── Content guidance ───────────────────────────────────────────────────────
  contentGuidance: [
    {
      rule: "Keep button labels 1–2 words",
      detail: "ButtonGroup is a compact component. Labels like \"List\", \"Grid\", \"Bold\" fit naturally. Longer labels break the visual rhythm.",
    },
    {
      rule: "ButtonGroupText prefixes should be very short",
      detail: "Ideal length is 1–4 characters: \"$\", \"kg\", \"https://\", \"%\". Longer prefix strings crowd the input and reduce readability.",
    },
    {
      rule: "Don't use ButtonGroupText as a heading",
      detail: "It is a data-entry aid — a contextual hint for what goes in the adjacent input. It is not a label, heading, or interactive element.",
    },
  ],

  // ── Behavior ───────────────────────────────────────────────────────────────
  behavior: [
    "Border fusion is CSS-only — it works by targeting the data-slot attribute on direct children. All standard UI components (Button, Input, Select) already have data-slot.",
    "ButtonGroupText is static — it is not focusable and has no keyboard interaction. Screen readers should not encounter it as an interactive element.",
    "ButtonGroupSeparator adapts to the group's orientation automatically when nested inside a vertical ButtonGroup via the data-orientation attribute.",
    "Active / selected state is driven by the child Button's variant or data-state — ButtonGroup does not manage selection. Pair with useState or ToggleGroup for that.",
  ],

  // ── Spacing ────────────────────────────────────────────────────────────────
  spacing: [
    {
      rule: "Between ButtonGroups in a toolbar",
      detail: "gap-2 between a ButtonGroup and adjacent controls. gap-4 between logically separate toolbar sections.",
    },
    {
      rule: "ButtonGroupSeparator adds no margin",
      detail: "The separator is self-stretching and inset (my-px / mx-px). No extra padding or gap is needed around it.",
    },
  ],

  // ── Accessibility ──────────────────────────────────────────────────────────
  accessibility: [
    {
      rule: "Add aria-label to the ButtonGroup",
      detail: "ButtonGroup renders role=\"group\" but has no automatic label. Always add aria-label=\"View options\" (or equivalent) so screen readers announce the group.",
    },
    {
      rule: "Each child button needs an accessible label",
      detail: "Icon-only buttons inside a ButtonGroup must have aria-label. Text labels are sufficient for text buttons.",
    },
    {
      rule: "aria-hidden ButtonGroupText when the input has a visible label",
      detail: "If the Input above or below has a <label>, the ButtonGroupText prefix duplicates context. Add aria-hidden=\"true\" to avoid screen reader redundancy.",
    },
  ],

  // ── Do & Don't ─────────────────────────────────────────────────────────────
  doItems: [
    {
      label: "Use for mutually related actions",
      description: "ButtonGroup makes the relationship between options explicit. Text alignment, view modes, and sort directions are ideal candidates.",
      preview: <DoRelatedActionsPreview />,
    },
    {
      label: "Use ButtonGroupText for short non-interactive prefixes",
      description: "Currency symbols, units, and protocol strings are perfect — short, non-interactive, and contextually useful.",
      preview: <DoCurrencyPrefixPreview />,
    },
    {
      label: "Use ButtonGroupSeparator to sub-group logically",
      description: "A separator visually divides related clusters within a larger group without introducing a gap or breaking border fusion.",
      preview: <DoSeparatorSubgroupPreview />,
    },
  ],
  dontItems: [
    {
      label: "Don't mix unrelated actions",
      description: "Grouping unrelated actions implies a false relationship. Keep distinct actions as separate Buttons.",
      preview: <DontUnrelatedActionsPreview />,
    },
    {
      label: "Don't use ButtonGroupText as a button",
      description: "ButtonGroupText has no hover, focus, or active states. Users who click it get no feedback. Use Button instead.",
      preview: <DontButtonGroupTextAsButtonPreview />,
    },
    {
      label: "Don't add too many items",
      description: "More than 5–6 items in a ButtonGroup creates a crowded, hard-to-scan row. Switch to a DropdownMenu or Select.",
      preview: <DontTooManyItemsPreview />,
    },
  ],

  // ── Examples in context ────────────────────────────────────────────────────
  examplesInContext: [
    {
      title: "In a toolbar",
      description: "Text-formatting buttons (Bold / Italic / Underline) with a separator to separate font-style from font-decoration.",
      preview: <ToolbarExample />,
      code: `<div className="rounded-xl border overflow-hidden">
  <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
    <p className="text-sm font-medium">Format</p>
    <ButtonGroup aria-label="Text formatting">
      <Button variant="outline" size="sm" aria-label="Bold"><RiBold /></Button>
      <Button variant="outline" size="sm" aria-label="Italic"><RiItalic /></Button>
      <ButtonGroupSeparator />
      <Button variant="outline" size="sm" aria-label="Underline"><RiUnderline /></Button>
    </ButtonGroup>
  </div>
  <div className="px-4 py-8 flex items-center justify-center">
    <p className="text-sm text-muted-foreground">Editor content</p>
  </div>
</div>`,
    },
    {
      title: "URL input with prefix",
      description: "A ButtonGroupText \"https://\" fused with an Input — the user types only the domain, never the protocol.",
      preview: <UrlInputExample />,
      code: `<div className="flex flex-col gap-2">
  <label className="text-sm font-medium">Website</label>
  <ButtonGroup aria-label="Website URL">
    <ButtonGroupText>https://</ButtonGroupText>
    <Input placeholder="yoursite.com" className="min-w-52" />
  </ButtonGroup>
</div>`,
    },
    {
      title: "View toggle",
      description: "List / Grid / Map switcher with useState tracking the active view. The active button uses variant=\"secondary\".",
      preview: <ViewToggleExample />,
      code: `const [view, setView] = useState<"list" | "grid" | "map">("list")

<ButtonGroup aria-label="View mode">
  <Button
    variant={view === "list" ? "secondary" : "outline"}
    size="sm"
    onClick={() => setView("list")}
  >
    <RiListCheck />
    List
  </Button>
  <Button
    variant={view === "grid" ? "secondary" : "outline"}
    size="sm"
    onClick={() => setView("grid")}
  >
    <RiLayoutGridLine />
    Grid
  </Button>
  <Button
    variant={view === "map" ? "secondary" : "outline"}
    size="sm"
    onClick={() => setView("map")}
  >
    <RiMapLine />
    Map
  </Button>
</ButtonGroup>`,
    },
  ],

  // ── Related components ─────────────────────────────────────────────────────
  relatedComponents: [
    {
      slug: "button",
      name: "Button",
      description: "Standalone action trigger with six semantic variants.",
      when: "The action is independent — not part of a mutually related set.",
    },
    {
      slug: "toggle-group",
      name: "ToggleGroup",
      description: "Manages single or multiple selection state across a set of toggle items.",
      when: "You need ButtonGroup-style fusion with built-in selection state management.",
    },
    {
      slug: "input",
      name: "Input",
      description: "Text input field — commonly used inside a ButtonGroup with a prefix or suffix.",
      when: "Pairing a text label (currency, unit, URL protocol) with a text field.",
    },
  ],

  // ── Design notes ───────────────────────────────────────────────────────────
  designNotes: [
    "ButtonGroup manages border fusion only — it does not manage selection state. Pair with useState or ToggleGroup for that.",
    "Orientation variants map directly to the horizontal/vertical Figma frame direction.",
  ],
}
