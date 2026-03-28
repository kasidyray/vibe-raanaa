"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import {
  RiSearchLine,
  RiFilterLine,
  RiArrowUpDownLine,
  RiLayoutColumnLine,
  RiCheckboxLine,
  RiDeleteBinLine,
  RiEditLine,
} from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ───────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="w-full rounded-xl border overflow-hidden text-sm">
    {/* Toolbar */}
    <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/30">
      <div className="flex items-center gap-1.5 h-8 px-3 rounded-full border border-dashed text-xs text-muted-foreground">
        <RiSearchLine className="size-3.5" />
        Search...
      </div>
      <div className="flex items-center gap-1.5 h-8 px-3 rounded-full border border-dashed text-xs text-muted-foreground">
        <RiFilterLine className="size-3.5" />
        Status
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="flex items-center gap-1.5 h-8 px-3 rounded-md border text-xs text-muted-foreground">
          <RiArrowUpDownLine className="size-3.5" />
          Sort
        </div>
        <div className="flex items-center gap-1.5 h-8 px-3 rounded-md border text-xs text-muted-foreground">
          <RiLayoutColumnLine className="size-3.5" />
          Columns
        </div>
      </div>
    </div>
    {/* Header */}
    <div className="grid grid-cols-[32px_1fr_140px_100px_80px] gap-3 px-4 py-2.5 border-b bg-muted/20">
      <div className="size-4 rounded border border-muted-foreground/30 mt-0.5" />
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Name</p>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Company</p>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</p>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">MRR</p>
    </div>
    {/* Rows */}
    {[
      { name: "Adaeze Okoye", company: "Zenith Labs", status: "Active", mrr: "$420" },
      { name: "Emeka Nwachukwu", company: "Techbridge", status: "Churned", mrr: "$0" },
      { name: "Ngozi Achebe", company: "Crestview", status: "Active", mrr: "$290" },
    ].map((row) => (
      <div key={row.name} className="grid grid-cols-[32px_1fr_140px_100px_80px] gap-3 items-center px-4 py-3 border-b last:border-0">
        <div className="size-4 rounded border border-muted-foreground/30" />
        <p className="text-sm font-medium truncate">{row.name}</p>
        <p className="text-sm text-muted-foreground truncate">{row.company}</p>
        <StatusBadge variant={row.status === "Active" ? "success" : "critical"}>
          {row.status}
        </StatusBadge>
        <p className="text-sm font-mono">{row.mrr}</p>
      </div>
    ))}
    {/* Footer */}
    <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/10 text-xs text-muted-foreground">
      <span>3 of 48 rows</span>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled>Previous</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </div>
  </div>
)

// ── Variant previews ──────────────────────────────────────────────────────────

const ContainedVariantPreview = () => (
  <div className="w-full rounded-xl border overflow-hidden text-sm">
    <div className="flex items-center gap-2 px-4 py-3 border-b">
      <div className="h-8 px-3 flex items-center gap-1.5 rounded-full border border-dashed text-xs text-muted-foreground">
        <RiSearchLine className="size-3.5" />
        Search...
      </div>
    </div>
    <div className="grid grid-cols-[1fr_120px_90px] gap-4 px-4 py-2.5 border-b bg-muted/30">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Name</p>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Plan</p>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</p>
    </div>
    {[
      { name: "Adaeze Okoye", plan: "Pro", active: true },
      { name: "Emeka Nwachukwu", plan: "Free", active: false },
    ].map(row => (
      <div key={row.name} className="grid grid-cols-[1fr_120px_90px] gap-4 items-center px-4 py-3 border-b last:border-0">
        <p className="text-sm font-medium">{row.name}</p>
        <Badge variant="neutral">{row.plan}</Badge>
        <StatusBadge variant={row.active ? "success" : "neutral"}>{row.active ? "Active" : "Inactive"}</StatusBadge>
      </div>
    ))}
    <div className="flex items-center justify-between px-4 py-3 border-t text-xs text-muted-foreground">
      <span>2 of 24 rows</span>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled>Previous</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </div>
  </div>
)

const CardVariantPreview = () => (
  <div className="w-full space-y-4 text-sm">
    <div className="flex items-center gap-2">
      <div className="h-8 px-3 flex items-center gap-1.5 rounded-full border border-dashed text-xs text-muted-foreground">
        <RiSearchLine className="size-3.5" />
        Search...
      </div>
    </div>
    <div className="rounded-xl border overflow-hidden">
      <div className="grid grid-cols-[1fr_120px_90px] gap-4 px-4 py-2.5 border-b bg-muted/30">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Name</p>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Plan</p>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</p>
      </div>
      {[
        { name: "Adaeze Okoye", plan: "Pro", active: true },
        { name: "Emeka Nwachukwu", plan: "Free", active: false },
      ].map(row => (
        <div key={row.name} className="grid grid-cols-[1fr_120px_90px] gap-4 items-center px-4 py-3 border-b last:border-0">
          <p className="text-sm font-medium">{row.name}</p>
          <Badge variant="neutral">{row.plan}</Badge>
          <StatusBadge variant={row.active ? "success" : "neutral"}>{row.active ? "Active" : "Inactive"}</StatusBadge>
        </div>
      ))}
    </div>
    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <span>2 of 24 rows</span>
    </div>
  </div>
)

const PlainVariantPreview = () => (
  <div className="w-full space-y-4 text-sm">
    <div className="flex items-center gap-2">
      <div className="h-8 px-3 flex items-center gap-1.5 rounded-full border border-dashed text-xs text-muted-foreground">
        <RiSearchLine className="size-3.5" />
        Search...
      </div>
    </div>
    <div className="w-full">
      <div className="grid grid-cols-[1fr_120px_90px] gap-4 py-2.5 border-b border-t">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Name</p>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Plan</p>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</p>
      </div>
      {[
        { name: "Adaeze Okoye", plan: "Pro", active: true },
        { name: "Emeka Nwachukwu", plan: "Free", active: false },
        { name: "Ngozi Achebe", plan: "Enterprise", active: true },
      ].map(row => (
        <div key={row.name} className="grid grid-cols-[1fr_120px_90px] gap-4 items-center py-3 border-b last:border-0">
          <p className="text-sm font-medium">{row.name}</p>
          <Badge variant="neutral">{row.plan}</Badge>
          <StatusBadge variant={row.active ? "success" : "neutral"}>{row.active ? "Active" : "Inactive"}</StatusBadge>
        </div>
      ))}
    </div>
  </div>
)

// ── State previews ────────────────────────────────────────────────────────────

const EmptyStatePreview = () => (
  <div className="w-full rounded-xl border overflow-hidden text-sm">
    <div className="flex items-center gap-2 px-4 py-3 border-b">
      <div className="h-8 px-3 flex items-center gap-1.5 rounded-full border border-dashed text-xs text-muted-foreground">
        <RiSearchLine className="size-3.5" />
        Search...
      </div>
    </div>
    <div className="grid grid-cols-[1fr_120px_90px] gap-4 px-4 py-2.5 border-b bg-muted/30">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Name</p>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Plan</p>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</p>
    </div>
    <div className="flex flex-col items-center gap-2 py-10 text-center px-4">
      <p className="text-sm font-medium">No customers</p>
      <p className="text-xs text-muted-foreground">Add your first customer to get started.</p>
      <Button variant="outline" size="sm" className="mt-2">Add customer</Button>
    </div>
  </div>
)

const NoResultsStatePreview = () => (
  <div className="w-full rounded-xl border overflow-hidden text-sm">
    <div className="flex items-center gap-2 px-4 py-3 border-b">
      <div className="h-8 px-3 flex items-center gap-1.5 rounded-full border border-dashed bg-primary/10 border-primary/30 text-xs text-foreground">
        <RiSearchLine className="size-3.5" />
        "somethingobscure"
      </div>
    </div>
    <div className="grid grid-cols-[1fr_120px_90px] gap-4 px-4 py-2.5 border-b bg-muted/30">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Name</p>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Plan</p>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</p>
    </div>
    <div className="flex flex-col items-center gap-2 py-10 text-center px-4">
      <p className="text-sm font-medium">No results found</p>
      <p className="text-xs text-muted-foreground">Try adjusting your search or filters.</p>
    </div>
  </div>
)

const SelectionStatePreview = () => (
  <div className="w-full text-sm space-y-2">
    {/* Selection bar */}
    <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-foreground text-background text-xs">
      <RiCheckboxLine className="size-4 opacity-70" />
      <span className="font-medium">2 selected</span>
      <div className="ml-auto flex items-center gap-2">
        <button className="flex items-center gap-1.5 opacity-80 hover:opacity-100">
          <RiEditLine className="size-3.5" />
          Edit
        </button>
        <div className="w-px h-4 bg-background/20" />
        <button className="flex items-center gap-1.5 text-red-300 hover:text-red-200">
          <RiDeleteBinLine className="size-3.5" />
          Delete
        </button>
      </div>
    </div>
    {/* Table rows */}
    <div className="rounded-xl border overflow-hidden">
      {[
        { name: "Adaeze Okoye", plan: "Pro", selected: true },
        { name: "Emeka Nwachukwu", plan: "Free", selected: true },
        { name: "Ngozi Achebe", plan: "Enterprise", selected: false },
      ].map(row => (
        <div
          key={row.name}
          className={`grid grid-cols-[32px_1fr_100px] gap-3 items-center px-4 py-3 border-b last:border-0 ${row.selected ? "bg-muted" : ""}`}
        >
          <div className={`size-4 rounded border ${row.selected ? "bg-foreground border-foreground" : "border-muted-foreground/30"}`} />
          <p className="text-sm font-medium">{row.name}</p>
          <Badge variant="neutral">{row.plan}</Badge>
        </div>
      ))}
    </div>
  </div>
)

// ── Do / Don't previews ───────────────────────────────────────────────────────

const DoPaginationPreview = () => (
  <div className="w-full rounded-xl border overflow-hidden text-sm">
    <div className="grid grid-cols-[1fr_100px] gap-4 px-4 py-2.5 border-b bg-muted/30">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Name</p>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</p>
    </div>
    {["Adaeze Okoye", "Emeka Nwachukwu", "Ngozi Achebe"].map(name => (
      <div key={name} className="grid grid-cols-[1fr_100px] gap-4 items-center px-4 py-3 border-b last:border-0">
        <p className="text-sm">{name}</p>
        <StatusBadge variant="success">Active</StatusBadge>
      </div>
    ))}
    <div className="flex items-center justify-between px-4 py-3 border-t text-xs text-muted-foreground">
      <span>3 of 128 rows</span>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled>Previous</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </div>
  </div>
)

const DontFullTableRawPreview = () => (
  <div className="w-full text-sm space-y-2">
    <p className="text-xs text-muted-foreground">Using raw &lt;table&gt; + manual border classes instead of DataTable</p>
    <table className="w-full border-collapse border border-border">
      <thead>
        <tr className="border-b border-border bg-muted">
          <th className="text-left px-3 py-2 text-xs font-medium">Name</th>
          <th className="text-left px-3 py-2 text-xs font-medium">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-border">
          <td className="px-3 py-2">Adaeze Okoye</td>
          <td className="px-3 py-2">Active</td>
        </tr>
        <tr>
          <td className="px-3 py-2">Emeka Nwachukwu</td>
          <td className="px-3 py-2">Churned</td>
        </tr>
      </tbody>
    </table>
    <p className="text-xs text-destructive">Use DataTable — it handles hover, empty state, variants, and keyboard navigation</p>
  </div>
)

const DontSelectionBarInsidePreview = () => (
  <div className="w-full rounded-xl border overflow-hidden text-sm">
    <div className="flex items-center gap-3 px-4 py-2 border-b bg-foreground text-background text-xs">
      <span className="font-medium">2 selected</span>
      <div className="ml-auto flex items-center gap-2">
        <button className="opacity-70 text-red-300">Delete</button>
      </div>
    </div>
    <div className="px-4 py-3">
      <p className="text-xs text-muted-foreground">Table rows would go here...</p>
    </div>
    <p className="text-xs text-destructive px-4 pb-3">DataTableSelectionBar floats above the page — don't put it inside DataTable</p>
  </div>
)

// ── Full doc data ─────────────────────────────────────────────────────────────

export const dataTableDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  // ── Overview ───────────────────────────────────────────────────────────────
  overview: {
    what: "A full-featured table component built on TanStack Table, with built-in support for sorting, global search, faceted filters, pagination, row selection, column visibility, and empty states.",
    why: "Building a data table from scratch — with all edge cases for hover, selection, empty state, filters, and pagination — is hundreds of lines of repetitive layout code. DataTable handles all of this and maintains visual consistency across every page.",
    problem: "Raw HTML tables have no built-in sort, filter, selection, or empty state handling. Teams end up re-implementing the same patterns with subtle inconsistencies. DataTable standardises the full data grid interaction model.",
    appearsIn: [
      "Admin lists (customers, leads, users, transactions)",
      "Audit logs and activity feeds with filters",
      "Billing and subscription management tables",
      "Team and permissions management",
      "Any page where users need to browse, filter, and act on a list of records",
    ],
  },

  // ── Anatomy ────────────────────────────────────────────────────────────────
  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Toolbar",
        description: "Row of controls above the table: search input, filter triggers, sort menu, column toggle, and optional bulk action buttons.",
        optional: true,
      },
      {
        name: "Header row",
        description: "Column labels. Clicking a sortable column header triggers ascending/descending sort.",
      },
      {
        name: "Data rows",
        description: "One row per record. Rows highlight on hover. Clicking a row triggers onRowClick if provided.",
      },
      {
        name: "Selection checkbox",
        description: "Optional per-row checkboxes for multi-row selection. Checking rows triggers the DataTableSelectionBar.",
        optional: true,
      },
      {
        name: "Empty state",
        description: "Rendered automatically when the data array is empty, controlled by the emptyMessage prop.",
      },
      {
        name: "No-results state",
        description: "Shown when data exists but all rows are filtered out. Use a different message from the empty state.",
      },
      {
        name: "Footer / Pagination",
        description: "Row count and pagination controls. Only rendered when rows exist — never show above an empty state.",
        optional: true,
      },
      {
        name: "Selection bar",
        description: "Floats above the page when rows are selected. Lives outside DataTable — never inside it.",
        optional: true,
      },
    ],
  },

  // ── Usage ──────────────────────────────────────────────────────────────────
  whenToUse: [
    "Displaying a list of records (customers, orders, users) where users need to sort, filter, or search.",
    "Tables with more than 10 rows where pagination is needed.",
    "Any list that supports bulk actions (edit, delete, export) on multiple rows.",
    "Admin pages where column visibility toggling helps users customise their view.",
  ],
  whenNotToUse: [
    "Simple read-only lists with fewer than 10 static rows — use a plain Table component.",
    "Comparison matrices or pricing tables — those need custom layout, not a data grid.",
    "Dense analytics dashboards — DataTable is for interactive records, not charted metrics.",
    "Inside a modal or drawer — the table needs full page width to be usable.",
  ],

  // ── Variants ───────────────────────────────────────────────────────────────
  variants: [
    {
      name: "Contained",
      description: "Table is wrapped in a rounded bordered container. Toolbar gets a bottom border, footer gets a top border. The most common variant for full-page data views.",
      when: "Primary data views with a toolbar and pagination (customers, leads, transactions).",
      preview: <ContainedVariantPreview />,
      fullWidth: true,
    },
    {
      name: "Card",
      description: "Toolbar and footer are plain siblings above/below the table card. The table itself sits inside a Card with its own border and shadow.",
      when: "Dashboard sections or secondary tables embedded on a page with other content.",
      preview: <CardVariantPreview />,
      fullWidth: true,
    },
    {
      name: "Plain",
      description: "No outer border. Table uses top/bottom border lines only. Minimal visual weight, blends with surrounding content.",
      when: "Detail views, drawers, or sections where the table is part of a larger layout and should not appear as a standalone panel.",
      preview: <PlainVariantPreview />,
      fullWidth: true,
    },
  ],

  // ── States ─────────────────────────────────────────────────────────────────
  states: [
    {
      name: "With data",
      description: "Normal state. Rows render with hover highlight. Clicking triggers onRowClick if provided.",
      preview: <ContainedVariantPreview />,
      fullWidth: true,
    },
    {
      name: "Empty",
      description: "No records in the data source. DataTable renders the emptyMessage in a centred empty state. Pagination is suppressed.",
      preview: <EmptyStatePreview />,
      fullWidth: true,
    },
    {
      name: "No results",
      description: "Records exist but all are filtered out. Use a different emptyMessage to communicate this (\"No results match your filters.\").",
      preview: <NoResultsStatePreview />,
      fullWidth: true,
    },
    {
      name: "Row selection",
      description: "Checked rows appear highlighted. The DataTableSelectionBar floats above the page showing the count and bulk action buttons.",
      preview: <SelectionStatePreview />,
      fullWidth: true,
    },
  ],

  // ── Properties ─────────────────────────────────────────────────────────────
  properties: [
    {
      name: "variant",
      values: `"plain" | "bordered" | "card" | "contained"`,
      default: `"plain"`,
      description: "Controls the outer chrome — border, rounding, and separator placement.",
    },
    {
      name: "table",
      values: "Table<TData>",
      default: "—",
      description: "The TanStack table instance from useReactTable(). Required.",
    },
    {
      name: "emptyMessage",
      values: "string",
      default: `"No results."`,
      description: "Message shown in the centred empty state when the row model is empty.",
    },
    {
      name: "onRowClick",
      values: "(row: Row<TData>) => void",
      default: "—",
      description: "Called when the user clicks a data row. Adds a pointer cursor to rows.",
    },
    {
      name: "toolbar",
      values: "ReactNode",
      default: "—",
      description: "Slot for DataTableToolbar. DataTable handles the separator/border between toolbar and table.",
    },
    {
      name: "footer",
      values: "ReactNode",
      default: "—",
      description: "Slot for DataTablePagination. DataTable handles the separator/border. Always wrap in a conditional to suppress it when there are no rows.",
    },
    {
      name: "style (DataTablePagination)",
      values: `"classic" | "simple"`,
      default: `"classic"`,
      description: "classic shows page number input and row count. simple shows only Previous/Next buttons.",
    },
    {
      name: "rowLabel (DataTablePagination)",
      values: "string",
      default: `"row"`,
      description: "Singular noun for the record type. Used in the row count label (\"48 customers\").",
    },
  ],

  // ── Content guidance ───────────────────────────────────────────────────────
  contentGuidance: [
    {
      rule: "emptyMessage should distinguish empty from no-results",
      detail: "\"No customers yet\" (empty data) vs. \"No results match your filters\" (filtered data). Use the same DataTable prop but update the message based on whether any data exists at all.",
    },
    {
      rule: "Column headers are Title Case",
      detail: "\"Created At\", \"MRR\", \"Plan\" — not \"created_at\", \"mrr\", or all-caps. Match the Figma column label.",
    },
    {
      rule: "rowLabel should be a singular lowercase noun",
      detail: "\"customer\", \"lead\", \"transaction\" — DataTable pluralises it automatically.",
    },
    {
      rule: "Toolbar search placeholder names the collection",
      detail: "\"Search customers…\", not \"Search…\". Tells the user what they are searching.",
    },
  ],

  // ── Behavior ───────────────────────────────────────────────────────────────
  behavior: [
    "Sorting is controlled by the TanStack table state. Clicking a sortable column header toggles asc → desc → unsorted.",
    "Global search filters all rows whose text matches the search input. Filtering is handled by globalFilterFn in useReactTable.",
    "Faceted filters (DataTableFacetedFilter) apply multi-select filtering to a single column. Multi-select means selecting more than one value shows rows matching any of them.",
    "Dropdown filters (DataTableDropdownFilter) apply radio-style single-value filtering.",
    "Row selection triggers visual highlight on the row and populates the DataTableSelectionBar count.",
    "Pagination controls which page of rows is displayed. The footer is suppressed when the row model is empty.",
    "Column visibility toggle hides/shows columns without removing them from the data.",
    "onRowClick does not interfere with checkbox selection — both can coexist on the same row.",
  ],

  // ── Spacing ────────────────────────────────────────────────────────────────
  spacing: [
    {
      rule: "DataTable always fills full width",
      detail: "Never set a max-width on DataTable itself. The parent container controls width.",
    },
    {
      rule: "All toolbar controls are h-8",
      detail: "Search, filter triggers, sort menu, and column toggle all use size=\"sm\" (h-8). Do not use default size (h-10) in the toolbar.",
    },
    {
      rule: "DataTableSelectionBar lives outside DataTable",
      detail: "The selection bar is a floating element that should be placed in the page layout, not inside the DataTable — it auto-positions above the bottom edge of the viewport.",
    },
    {
      rule: "No manual outer wrappers",
      detail: "Never add a wrapper div with border or rounded classes around DataTable. The variant handles all of that internally.",
    },
  ],

  // ── Accessibility ──────────────────────────────────────────────────────────
  accessibility: [
    {
      rule: "Table is a semantic <table>",
      detail: "DataTable renders a proper <table> element with <thead> and <tbody>. Do not replicate its layout with divs.",
    },
    {
      rule: "Keyboard row navigation",
      detail: "onRowClick rows are focusable and respond to Enter. The TanStack table provides row focus management.",
    },
    {
      rule: "Checkbox selection is keyboard-accessible",
      detail: "Selection checkboxes are keyboard-navigable. The header checkbox toggles all visible rows.",
    },
    {
      rule: "Empty state is announced",
      detail: "The emptyMessage renders inside a <td> that spans all columns — screen readers announce it as table content.",
    },
    {
      rule: "Column headers have sort aria labels",
      detail: "Sortable headers use aria-sort to signal current sort direction. Do not suppress this by omitting the TanStack sort model.",
    },
  ],

  // ── Do & Don't ─────────────────────────────────────────────────────────────
  doItems: [
    {
      label: "Always show pagination when rows exist",
      description: "Paginate any table with more than 20 rows. Wrap DataTablePagination in a conditional to hide it when the table is empty.",
      preview: <DoPaginationPreview />,
    },
  ],
  dontItems: [
    {
      label: "Don't use raw <table> instead of DataTable",
      description: "Raw tables miss hover state, empty state, keyboard access, and variant chrome. Always use DataTable.",
      preview: <DontFullTableRawPreview />,
    },
    {
      label: "Don't put DataTableSelectionBar inside DataTable",
      description: "The selection bar is a page-level floating element. Placing it inside DataTable breaks its positioning.",
      preview: <DontSelectionBarInsidePreview />,
    },
  ],

  // ── Examples in context ────────────────────────────────────────────────────
  examplesInContext: [
    {
      title: "Team members table with filters",
      description: "The contained variant with search, status filter, sort menu, and column toggle. This is the standard pattern for primary data views.",
      preview: <ContainedVariantPreview />,
      code: `<DataTable
  table={table}
  variant="contained"
  emptyMessage="No members found."
  toolbar={
    <DataTableToolbar>
      <DataTableSearch table={table} placeholder="Search members..." />
      <DataTableFacetedFilter
        title="Status"
        options={["active", "inactive"]}
        selectedValues={statusFilter}
        onSelectionChange={setStatusFilter}
      />
      <div className="ml-auto flex items-center gap-2">
        <DataTableSortMenu sorting={sorting} onSortingChange={setSorting} columns={sortColumns} />
        <DataTableColumnToggle table={table} />
      </div>
    </DataTableToolbar>
  }
  footer={
    rowCount > 0
      ? <DataTablePagination table={table} style="classic" rowLabel="member" />
      : undefined
  }
/>`,
    },
  ],

  // ── Related components ─────────────────────────────────────────────────────
  relatedComponents: [
    {
      slug: "combobox",
      name: "Combobox",
      description: "Searchable dropdown used inside DataTableFacetedFilter for toolbar filters.",
      when: "You need a searchable filter in the toolbar — use DataTableFacetedFilter which wraps Combobox.",
    },
    {
      slug: "drawer",
      name: "Drawer",
      description: "Slide-in detail panel for showing a selected row's full record.",
      when: "onRowClick should open a detail view — pair DataTable with a Drawer.",
    },
    {
      slug: "table",
      name: "Table",
      description: "The raw semantic table primitives (Table, TableRow, TableCell, etc.).",
      when: "You need a simple static table without sorting, filtering, or pagination.",
    },
  ],

  // ── Design notes ───────────────────────────────────────────────────────────
  designNotes: [
    "DataTable is a layout orchestrator — it handles variant chrome, empty states, and separator placement. The actual column definitions and data live in the page-level columns file.",
    "The contained variant is the most opinionated: toolbar gets border-b, footer gets border-t, and the outer container clips the corners. Never manually add these borders.",
    "Row hover and selection state are intentionally subtle — the ring effect (ring-1 ring-inset) keeps rows visually connected to the table grid without heavy background fills.",
    "In Figma, DataTable is designed as a frame with auto-layout. The variant is a property on the top-level frame. Always check which variant the design uses before implementing.",
  ],
}
