"use client"

import { Button } from "@/components/ui/button"
import {
  RiAddLine,
  RiDownloadLine,
  RiDeleteBinLine,
  RiEditLine,
  RiCloseLine,
  RiSearchLine,
  RiMailLine,
  RiArrowDownSLine,
} from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ───────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    <Button variant="default" size="default">
      <RiAddLine />
      Create record
    </Button>
    <div className="flex items-start gap-10 text-center">
      {["① Container", "② Icon", "③ Label"].map(label => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="h-5 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

// ── Example in context: Toolbar ───────────────────────────────────────────────

const ToolbarExample = () => (
  <div className="rounded-xl border overflow-hidden">
    <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
      <p className="text-sm font-medium">Contacts</p>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <RiDownloadLine />
          Export
        </Button>
        <Button size="sm">
          <RiAddLine />
          Add contact
        </Button>
      </div>
    </div>
    <div className="px-4 py-8 flex items-center justify-center">
      <p className="text-sm text-muted-foreground">Table content</p>
    </div>
  </div>
)

// ── Example in context: Drawer footer ────────────────────────────────────────

const DrawerFooterExample = () => (
  <div className="rounded-xl border overflow-hidden max-w-sm">
    <div className="px-4 py-3 border-b">
      <p className="text-sm font-medium">Edit contact</p>
    </div>
    <div className="px-4 py-6 flex flex-col gap-3">
      <div className="h-8 rounded-lg bg-muted/40 border" />
      <div className="h-8 rounded-lg bg-muted/40 border" />
      <div className="h-8 rounded-lg bg-muted/40 border" />
    </div>
    <div className="flex items-center justify-end gap-2 border-t px-4 py-3">
      <Button variant="outline" size="sm">Cancel</Button>
      <Button size="sm">Save changes</Button>
    </div>
  </div>
)

// ── Example in context: Destructive confirm ───────────────────────────────────

const DestructiveExample = () => (
  <div className="rounded-xl border overflow-hidden max-w-sm">
    <div className="px-4 py-4">
      <p className="text-sm font-medium mb-1">Delete this record?</p>
      <p className="text-xs text-muted-foreground">This action cannot be undone. All associated data will be permanently removed.</p>
    </div>
    <div className="flex items-center justify-end gap-2 border-t px-4 py-3">
      <Button variant="ghost" size="sm">Cancel</Button>
      <Button variant="destructive" size="sm">
        <RiDeleteBinLine />
        Delete
      </Button>
    </div>
  </div>
)

// ── Do / Don't previews ───────────────────────────────────────────────────────

const DoHierarchyPreview = () => (
  <div className="flex flex-wrap gap-2 justify-center">
    <Button size="sm">Save changes</Button>
    <Button variant="outline" size="sm">Cancel</Button>
  </div>
)

const DoIconPreview = () => (
  <div className="flex flex-wrap gap-2 justify-center">
    <Button size="sm"><RiAddLine />Add record</Button>
    <Button variant="outline" size="sm"><RiDownloadLine />Export</Button>
  </div>
)

const DoIconOnlyPreview = () => (
  <div className="flex flex-wrap gap-2 justify-center">
    <Button size="icon-sm" variant="ghost" aria-label="Edit record"><RiEditLine /></Button>
    <Button size="icon-sm" variant="ghost" aria-label="Close panel"><RiCloseLine /></Button>
    <Button size="icon-sm" variant="ghost" aria-label="Search"><RiSearchLine /></Button>
  </div>
)

const DontMultiplePrimaryPreview = () => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex flex-wrap gap-2 justify-center">
      <Button size="sm">Save</Button>
      <Button size="sm">Export</Button>
      <Button size="sm">Add new</Button>
    </div>
    <p className="text-xs text-muted-foreground text-center">Multiple primary buttons compete for attention</p>
  </div>
)

const DontLongLabelPreview = () => (
  <div className="flex flex-col items-center gap-2">
    <Button size="sm">Click here to download the full report</Button>
    <p className="text-xs text-muted-foreground text-center">Labels should be short verb phrases</p>
  </div>
)

const DontDestructiveForEveryActionPreview = () => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex flex-wrap gap-2 justify-center">
      <Button variant="destructive" size="sm">Cancel</Button>
      <Button variant="destructive" size="sm">Go back</Button>
    </div>
    <p className="text-xs text-muted-foreground text-center">Reserve destructive for irreversible actions</p>
  </div>
)

// ── Button design doc ─────────────────────────────────────────────────────────

export const buttonDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  // ── Overview ───────────────────────────────────────────────────────────────
  overview: {
    what: "A pill-shaped interactive element that triggers an action, submits a form, or navigates to another view.",
    why: "Every product needs a consistent, predictable way for users to initiate actions — with a clear visual hierarchy between primary, secondary, and destructive actions.",
    problem: "Without a shared button system, teams build one-off clickable elements that look and behave inconsistently, making it harder for users to understand what is actionable and what is not.",
    appearsIn: [
      "Page header toolbars",
      "Drawer and dialog footers",
      "Empty state calls-to-action",
      "Table row inline actions",
      "Confirmation dialogs",
      "Form submit rows",
    ],
  },

  // ── Anatomy ────────────────────────────────────────────────────────────────
  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Container",
        description: "Pill-shaped wrapper (rounded-4xl). Carries background colour, border, padding, and interactive states.",
      },
      {
        name: "Icon",
        description: "Optional leading or trailing icon. Sized automatically to 16 px — don't add size props.",
        optional: true,
      },
      {
        name: "Label",
        description: "Short verb phrase describing the action. Sentence case, no punctuation.",
      },
    ],
  },

  // ── Usage ──────────────────────────────────────────────────────────────────
  whenToUse: [
    "Primary actions in a view — Save, Create, Add — use the default (filled) variant.",
    "Secondary or cancel actions alongside a primary — use outline or ghost.",
    "Destructive or irreversible actions — Delete, Remove, Revoke — use the destructive variant.",
    "Icon-only controls in toolbars and table rows where space is tight.",
    "Navigation links within a form or settings flow — use the link variant.",
  ],
  whenNotToUse: [
    "Display-only labels or statuses — use Badge or StatusBadge.",
    "Navigation links in body text — use a plain anchor or the link variant only.",
    "Tabs or filter toggles — use the Tabs component.",
    "When the action is not immediately recoverable, always confirm first before triggering.",
  ],

  // ── Variants ───────────────────────────────────────────────────────────────
  variants: [
    {
      name: "Default",
      description: "Filled primary surface. The highest visual weight — one per focal action area.",
      when: "The single most important action: Save, Create, Submit.",
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Button>Save changes</Button>
          <Button><RiAddLine />Add record</Button>
        </div>
      ),
    },
    {
      name: "Outline",
      description: "Bordered, no fill. Secondary weight for actions alongside a primary.",
      when: "Cancel, Export, Filters — supporting actions that shouldn't compete.",
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant="outline">Cancel</Button>
          <Button variant="outline"><RiDownloadLine />Export</Button>
        </div>
      ),
    },
    {
      name: "Secondary",
      description: "Filled muted surface. A softer alternative to outline for grouped toolbar actions.",
      when: "Toolbar actions where outline feels too prominent.",
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant="secondary">Duplicate</Button>
          <Button variant="secondary"><RiArrowDownSLine />Sort</Button>
        </div>
      ),
    },
    {
      name: "Ghost",
      description: "No border, no fill — only visible on hover. Lowest visual weight.",
      when: "Icon actions in rows and drawers; close buttons; inline utilities.",
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant="ghost" size="icon-sm" aria-label="Close"><RiCloseLine /></Button>
          <Button variant="ghost" size="icon-sm" aria-label="Edit"><RiEditLine /></Button>
          <Button variant="ghost">More options</Button>
        </div>
      ),
    },
    {
      name: "Destructive",
      description: "Red tint. Signals irreversibility. Reserve for actions that permanently remove data.",
      when: "Delete, Remove, Revoke — only when the action cannot be undone.",
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant="destructive"><RiDeleteBinLine />Delete record</Button>
          <Button variant="destructive">Revoke access</Button>
        </div>
      ),
    },
    {
      name: "Link",
      description: "Underlined text link. No chrome, inline with text flow.",
      when: "Navigation actions embedded in body copy or settings descriptions.",
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant="link">View full report</Button>
          <Button variant="link">Learn more</Button>
        </div>
      ),
    },
  ],

  // ── States ─────────────────────────────────────────────────────────────────
  states: [
    {
      name: "Default",
      description: "Resting state.",
      preview: <Button>Save changes</Button>,
    },
    {
      name: "Loading",
      description: "Spinner replaces icon; button is automatically disabled while loading.",
      preview: <Button loading>Saving…</Button>,
    },
    {
      name: "Disabled",
      description: "50% opacity, pointer-events removed. Use when prerequisites aren't met.",
      preview: <Button disabled>Save changes</Button>,
    },
    {
      name: "With icon",
      description: "Leading icon for quick visual recognition in toolbars.",
      preview: (
        <div className="flex gap-2">
          <Button><RiAddLine />Create</Button>
          <Button variant="outline"><RiDownloadLine />Export</Button>
        </div>
      ),
    },
    {
      name: "Icon only",
      description: "Square pill for compact controls. Always include an aria-label.",
      preview: (
        <div className="flex gap-2">
          <Button size="icon" variant="outline" aria-label="Send email"><RiMailLine /></Button>
          <Button size="icon-sm" variant="ghost" aria-label="Close"><RiCloseLine /></Button>
        </div>
      ),
    },
  ],

  // ── Properties ─────────────────────────────────────────────────────────────
  properties: [
    {
      name: "variant",
      values: "default · outline · secondary · ghost · destructive · link",
      default: "default",
      description: "Visual weight and semantic tone. Controls fill, border, and colour.",
    },
    {
      name: "size",
      values: "xs · sm · default · lg · icon-xs · icon-sm · icon · icon-lg",
      default: "default",
      description: "Height and padding scale. Icon sizes produce square buttons.",
    },
    {
      name: "loading",
      values: "boolean",
      default: "false",
      description: "Shows a spinner and disables the button. Use during async operations.",
    },
    {
      name: "disabled",
      values: "boolean",
      default: "false",
      description: "Prevents interaction and reduces opacity. Use when action prerequisites aren't met.",
    },
  ],

  // ── Content guidance ───────────────────────────────────────────────────────
  contentGuidance: [
    {
      rule: "Verb phrase, 2–4 words",
      detail: "\"Save changes\", \"Add contact\", \"Export CSV\" — start with a verb, describe the outcome.",
    },
    {
      rule: "Sentence case",
      detail: "\"Add record\", not \"Add Record\" or \"ADD RECORD\".",
    },
    {
      rule: "No punctuation",
      detail: "No periods or exclamation marks. The button shape conveys finality.",
    },
    {
      rule: "Loading label matches action",
      detail: "\"Saving…\" not \"Loading…\". Users should know what is happening.",
    },
    {
      rule: "Icon-only needs aria-label",
      detail: "Any button without visible text must have an aria-label describing the action.",
    },
  ],

  // ── Behavior ───────────────────────────────────────────────────────────────
  behavior: [
    "Active press: slight scale-down (0.97) and downward translate — tactile feel.",
    "Loading state: spinner prepended, button disabled automatically. No double-submit possible.",
    "Focus ring appears on keyboard navigation only (focus-visible). Does not show on mouse click.",
    "Disabled: opacity-50, all pointer events removed. Does not fire onClick.",
    "Icon SVGs inside buttons are sized automatically — never pass size props to the icon.",
    "aria-invalid state: destructive ring and border appear automatically. Used by form integration.",
    "aria-expanded state: ghost and outline show filled background when a dropdown is open.",
  ],

  // ── Spacing ────────────────────────────────────────────────────────────────
  spacing: [
    {
      rule: "Between buttons in a group",
      detail: "gap-2 for most contexts; gap-1.5 in tight toolbar rows.",
    },
    {
      rule: "Primary + secondary pair",
      detail: "Primary on the right, secondary on the left. Align to the right edge in dialogs and drawers.",
    },
    {
      rule: "In page header toolbar",
      detail: "gap-2, aligned to the right of the header row.",
    },
    {
      rule: "Icon-only in table rows",
      detail: "gap-1 between icon buttons; wrap in a flex row at the right edge of the row.",
    },
  ],

  // ── Accessibility ──────────────────────────────────────────────────────────
  accessibility: [
    {
      rule: "Icon-only requires aria-label",
      detail: "Every button with no visible text must have aria-label describing the action.",
    },
    {
      rule: "Loading communicates status",
      detail: "While loading, the button is disabled. Consider adding aria-live to a status region for screen readers.",
    },
    {
      rule: "Destructive actions need confirmation",
      detail: "Never trigger a destructive action directly. Always show a confirmation dialog or drawer first.",
    },
    {
      rule: "Focus visible on keyboard only",
      detail: "Focus ring uses focus-visible — it appears for keyboard users, not mouse. Do not remove it.",
    },
  ],

  // ── Do & Don't ─────────────────────────────────────────────────────────────
  doItems: [
    {
      label: "Establish a clear action hierarchy",
      description: "One primary action per section; supporting actions in outline or ghost.",
      preview: <DoHierarchyPreview />,
    },
    {
      label: "Use icons to speed up recognition",
      description: "A leading icon helps users scan toolbars and forms faster.",
      preview: <DoIconPreview />,
    },
    {
      label: "Use icon-only buttons for compact controls",
      description: "Use size=\"icon-sm\" with aria-label in tight rows and headers.",
      preview: <DoIconOnlyPreview />,
    },
  ],
  dontItems: [
    {
      label: "Don't use multiple primary buttons",
      description: "Multiple default-variant buttons create visual noise. Elevate one, demote the rest.",
      preview: <DontMultiplePrimaryPreview />,
    },
    {
      label: "Don't use long or vague labels",
      description: "Labels like \"Click here\" or full sentences break the visual rhythm.",
      preview: <DontLongLabelPreview />,
    },
    {
      label: "Don't use destructive for reversible actions",
      description: "Destructive is for permanent deletions only — not cancel or back.",
      preview: <DontDestructiveForEveryActionPreview />,
    },
  ],

  // ── Examples in context ────────────────────────────────────────────────────
  examplesInContext: [
    {
      title: "In a page toolbar",
      description: "Primary action on the right; secondary export action alongside it.",
      preview: <ToolbarExample />,
      code: `<div className="rounded-xl border overflow-hidden">
  <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
    <p className="text-sm font-medium">Contacts</p>
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">
        <RiDownloadLine />
        Export
      </Button>
      <Button size="sm">
        <RiAddLine />
        Add contact
      </Button>
    </div>
  </div>
  <div className="px-4 py-8 flex items-center justify-center">
    <p className="text-sm text-muted-foreground">Table content</p>
  </div>
</div>`,
    },
    {
      title: "In a drawer footer",
      description: "Outline cancel + primary save — aligned to the right edge.",
      preview: <DrawerFooterExample />,
      code: `<div className="rounded-xl border overflow-hidden max-w-sm">
  <div className="px-4 py-3 border-b">
    <p className="text-sm font-medium">Edit contact</p>
  </div>
  <div className="px-4 py-6 flex flex-col gap-3">
    {/* form fields */}
  </div>
  <div className="flex items-center justify-end gap-2 border-t px-4 py-3">
    <Button variant="outline" size="sm">Cancel</Button>
    <Button size="sm">Save changes</Button>
  </div>
</div>`,
    },
    {
      title: "In a destructive confirmation",
      description: "Ghost dismiss + destructive confirm — clear visual separation of intent.",
      preview: <DestructiveExample />,
      code: `<div className="rounded-xl border overflow-hidden max-w-sm">
  <div className="px-4 py-4">
    <p className="text-sm font-medium mb-1">Delete this record?</p>
    <p className="text-xs text-muted-foreground">
      This action cannot be undone. All associated data will be permanently removed.
    </p>
  </div>
  <div className="flex items-center justify-end gap-2 border-t px-4 py-3">
    <Button variant="ghost" size="sm">Cancel</Button>
    <Button variant="destructive" size="sm">
      <RiDeleteBinLine />
      Delete
    </Button>
  </div>
</div>`,
    },
  ],

  // ── Related components ─────────────────────────────────────────────────────
  relatedComponents: [
    {
      slug: "button-group",
      name: "Button Group",
      description: "Fused set of buttons sharing a border — for mutually exclusive choices.",
      when: "Toggle between options like view modes or filter scopes.",
    },
    {
      slug: "badge",
      name: "Badge",
      description: "Display-only coloured pill for classification labels.",
      when: "The element has no action — only conveys a category or status.",
    },
    {
      slug: "dropdown-menu",
      name: "Dropdown Menu",
      description: "A menu of actions triggered by a button.",
      when: "There are 3+ related actions to surface without filling the toolbar.",
    },
  ],

  // ── Design notes ───────────────────────────────────────────────────────────
  designNotes: [
    "The pill shape (rounded-4xl) is fixed — do not change corner radius in Figma.",
    "Active press feedback (scale + translate) is built in and cannot be disabled.",
    "Icon size is always 16 px internally. In Figma, use the 16 px icon frame.",
    "Loading state always prepends a spinner — don't design a separate loading button variant in Figma.",
  ],
}
