"use client"

import { useState, useMemo } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table/data-table"
import { DataTableToolbar } from "@/components/ui/data-table/data-table-toolbar"
import { DataTableSearch } from "@/components/ui/data-table/data-table-search"
import { DataTableFacetedFilter } from "@/components/ui/data-table/data-table-faceted-filter"
import { DataTableSortMenu } from "@/components/ui/data-table/data-table-sort-menu"
import { DataTableColumnToggle } from "@/components/ui/data-table/data-table-column-toggle"
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination"
import { DataTableSelectionBar } from "@/components/ui/data-table/data-table-selection-bar"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { RiDeleteBinLine, RiEditLine } from "@remixicon/react"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Shared sample data ─────────────────────────────────────────────────────────

type Member = {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  plan: string
}

const MEMBERS: Member[] = [
  { id: "1", name: "Adaeze Okoye",      email: "adaeze@zenith.io",    role: "Admin",    status: "active",   plan: "Pro" },
  { id: "2", name: "Emeka Nwachukwu",   email: "emeka@techbridge.io", role: "Member",   status: "inactive", plan: "Free" },
  { id: "3", name: "Ngozi Achebe",      email: "ngozi@crestview.io",  role: "Admin",    status: "active",   plan: "Enterprise" },
  { id: "4", name: "Chidi Okonkwo",     email: "chidi@buildco.io",    role: "Viewer",   status: "pending",  plan: "Pro" },
  { id: "5", name: "Amara Okafor",      email: "amara@vantage.io",    role: "Member",   status: "active",   plan: "Free" },
]

// ── Previews ──────────────────────────────────────────────────────────────────

const BasicPreview = () => {
  const columns: ColumnDef<Member>[] = [
    { accessorKey: "name",   header: "Name",   cell: ({ row }) => <span className="font-medium">{row.original.name}</span> },
    { accessorKey: "email",  header: "Email",  cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span> },
    { accessorKey: "role",   header: "Role",   cell: ({ row }) => <Badge variant="neutral">{row.original.role}</Badge> },
    {
      accessorKey: "status", header: "Status",
      cell: ({ row }) => (
        <StatusBadge variant={row.original.status === "active" ? "success" : row.original.status === "inactive" ? "neutral" : "caution"}>{row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}</StatusBadge>
      ),
    },
  ]
  const table = useReactTable({
    data: MEMBERS,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div className="w-full">
      <DataTable table={table} variant="contained" emptyMessage="No members found." />
    </div>
  )
}

const WithToolbarPreview = () => {
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const statusFilter = (columnFilters.find(f => f.id === "status")?.value ?? []) as string[]
  const setStatusFilter = (values: string[]) =>
    setColumnFilters(prev => [
      ...prev.filter(f => f.id !== "status"),
      ...(values.length > 0 ? [{ id: "status", value: values }] : []),
    ])

  const columns: ColumnDef<Member>[] = [
    { accessorKey: "name",   header: "Name",   cell: ({ row }) => <span className="font-medium">{row.original.name}</span> },
    { accessorKey: "email",  header: "Email",  cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span> },
    { accessorKey: "role",   header: "Role",   cell: ({ row }) => <Badge variant="neutral">{row.original.role}</Badge> },
    {
      accessorKey: "status", header: "Status",
      filterFn: (row, _id, filterValues: string[]) =>
        filterValues.length === 0 || filterValues.includes(row.original.status),
      cell: ({ row }) => (
        <StatusBadge variant={row.original.status === "active" ? "success" : row.original.status === "inactive" ? "neutral" : "caution"}>{row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}</StatusBadge>
      ),
    },
  ]

  const table = useReactTable({
    data: MEMBERS,
    columns,
    state: { globalFilter, sorting, columnFilters, columnVisibility },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const q = filterValue.toLowerCase()
      return (
        row.original.name.toLowerCase().includes(q) ||
        row.original.email.toLowerCase().includes(q)
      )
    },
  })

  const hasActiveFilters = statusFilter.length > 0 || !!globalFilter

  return (
    <div className="w-full">
      <DataTable
        table={table}
        variant="contained"
        emptyMessage="No members match your search."
        toolbar={
          <DataTableToolbar>
            <DataTableSearch table={table} placeholder="Search members..." />
            <DataTableFacetedFilter
              title="Status"
              options={["active", "inactive", "pending"]}
              selectedValues={statusFilter}
              onSelectionChange={setStatusFilter}
            />
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={() => { setGlobalFilter(""); setStatusFilter([]) }}>
                Reset
              </Button>
            )}
            <div className="ml-auto flex items-center gap-2">
              <DataTableSortMenu
                sorting={sorting}
                onSortingChange={setSorting}
                columns={[
                  { id: "name", label: "Name" },
                  { id: "email", label: "Email" },
                ]}
              />
              <DataTableColumnToggle table={table} />
            </div>
          </DataTableToolbar>
        }
      />
    </div>
  )
}

const WithPaginationPreview = () => {
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])

  const columns: ColumnDef<Member>[] = [
    { accessorKey: "name",   header: "Name",   cell: ({ row }) => <span className="font-medium">{row.original.name}</span> },
    { accessorKey: "email",  header: "Email",  cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span> },
    { accessorKey: "plan",   header: "Plan",   cell: ({ row }) => <Badge variant="neutral">{row.original.plan}</Badge> },
    {
      accessorKey: "status", header: "Status",
      cell: ({ row }) => (
        <StatusBadge variant={row.original.status === "active" ? "success" : row.original.status === "inactive" ? "neutral" : "caution"}>{row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}</StatusBadge>
      ),
    },
  ]

  const table = useReactTable({
    data: MEMBERS,
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    initialState: { pagination: { pageSize: 3 } },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const rowCount = table.getFilteredRowModel().rows.length

  return (
    <div className="w-full">
      <DataTable
        table={table}
        variant="contained"
        emptyMessage="No members found."
        toolbar={
          <DataTableToolbar>
            <DataTableSearch table={table} placeholder="Search members..." />
          </DataTableToolbar>
        }
        footer={
          rowCount > 0
            ? <DataTablePagination table={table} style="classic" rowLabel="member" />
            : undefined
        }
      />
    </div>
  )
}

const WithSelectionPreview = () => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const columns: ColumnDef<Member>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label={`Select ${row.original.name}`}
          onClick={(e) => e.stopPropagation()}
        />
      ),
      size: 40,
      enableSorting: false,
    },
    { accessorKey: "name",  header: "Name",  cell: ({ row }) => <span className="font-medium">{row.original.name}</span> },
    { accessorKey: "email", header: "Email", cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span> },
    { accessorKey: "role",  header: "Role",  cell: ({ row }) => <Badge variant="neutral">{row.original.role}</Badge> },
  ]

  const table = useReactTable({
    data: MEMBERS,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  })

  const selectedCount = Object.keys(rowSelection).length

  return (
    <div className="w-full space-y-3">
      <DataTable
        table={table}
        variant="contained"
        emptyMessage="No members found."
      />
      {selectedCount > 0 && (
        <DataTableSelectionBar
          count={selectedCount}
          onClear={() => setRowSelection({})}
          actions={[
            { icon: RiEditLine,      label: "Edit"   },
            "separator",
            { icon: RiDeleteBinLine, label: "Delete", variant: "destructive", onClick: () => setRowSelection({}) },
          ]}
        />
      )}
    </div>
  )
}

// ── Data Table develop doc ────────────────────────────────────────────────────

export const dataTableDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
      "npm install @tanstack/react-table",
    ],
    command: "npx shadcn add @raana/data-table",
    importPath: `import { DataTable } from "@/components/ui/data-table/data-table"
import { DataTableToolbar } from "@/components/ui/data-table/data-table-toolbar"
import { DataTableSearch } from "@/components/ui/data-table/data-table-search"
import { DataTableFacetedFilter } from "@/components/ui/data-table/data-table-faceted-filter"
import { DataTableDropdownFilter } from "@/components/ui/data-table/data-table-dropdown-filter"
import { DataTableSortMenu } from "@/components/ui/data-table/data-table-sort-menu"
import { DataTableColumnToggle } from "@/components/ui/data-table/data-table-column-toggle"
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination"
import { DataTableSelectionBar } from "@/components/ui/data-table/data-table-selection-bar"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "Requires @tanstack/react-table — install it separately with npm install @tanstack/react-table.",
      "Define columns in a separate columns.tsx file. Co-locate it with the page that uses them.",
      "DataTableSelectionBar must be rendered outside DataTable — it is a page-level floating element.",
    ],
  },

  basicUsage: `"use client"
import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table/data-table"

type Member = { id: string; name: string; role: string }

const columns: ColumnDef<Member>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" },
]

export default function MembersPage() {
  const table = useReactTable({
    data: members,   // Member[]
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <DataTable
      table={table}
      variant="contained"
      emptyMessage="No members found."
    />
  )
}

// With toolbar + pagination
<DataTable
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
    </DataTableToolbar>
  }
  footer={
    table.getFilteredRowModel().rows.length > 0
      ? <DataTablePagination table={table} style="classic" rowLabel="member" />
      : undefined
  }
/>`,

  codeExamples: [
    {
      title: "Basic table",
      description: "Minimal DataTable with column definitions and static data. No toolbar or pagination.",
      preview: <BasicPreview />,
      code: `"use client"
import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table/data-table"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"

type Member = { id: string; name: string; email: string; role: string; status: string }

const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <Badge variant="neutral">{row.original.role}</Badge>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.original.status}>{row.original.status}</StatusBadge>
    ),
  },
]

export function MembersTable({ data }: { data: Member[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <DataTable table={table} variant="contained" emptyMessage="No members found." />
  )
}`,
    },
    {
      title: "With toolbar and filters",
      description: "Global search, faceted status filter, sort menu, and column visibility toggle. All toolbar controls use h-8 (size=\"sm\").",
      preview: <WithToolbarPreview />,
      code: `"use client"
import { useState } from "react"
import {
  useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel,
  type ColumnDef, type SortingState, type ColumnFiltersState, type VisibilityState,
} from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table/data-table"
import { DataTableToolbar } from "@/components/ui/data-table/data-table-toolbar"
import { DataTableSearch } from "@/components/ui/data-table/data-table-search"
import { DataTableFacetedFilter } from "@/components/ui/data-table/data-table-faceted-filter"
import { DataTableSortMenu } from "@/components/ui/data-table/data-table-sort-menu"
import { DataTableColumnToggle } from "@/components/ui/data-table/data-table-column-toggle"
import { Button } from "@/components/ui/button"

type Member = { id: string; name: string; email: string; role: string; status: string }

const columns: ColumnDef<Member>[] = [
  { accessorKey: "name",  header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role",  header: "Role" },
  {
    accessorKey: "status",
    header: "Status",
    // Required for faceted filtering — return true when no filter is active
    filterFn: (row, _id, filterValues: string[]) =>
      filterValues.length === 0 || filterValues.includes(row.original.status),
  },
]

export function MembersTable({ data }: { data: Member[] }) {
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const statusFilter = (columnFilters.find(f => f.id === "status")?.value ?? []) as string[]
  const setStatusFilter = (values: string[]) =>
    setColumnFilters(prev => [
      ...prev.filter(f => f.id !== "status"),
      ...(values.length > 0 ? [{ id: "status", value: values }] : []),
    ])

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting, columnFilters, columnVisibility },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const q = filterValue.toLowerCase()
      return (
        row.original.name.toLowerCase().includes(q) ||
        row.original.email.toLowerCase().includes(q)
      )
    },
  })

  const hasActiveFilters = statusFilter.length > 0 || !!globalFilter

  return (
    <DataTable
      table={table}
      variant="contained"
      emptyMessage="No members match your search."
      toolbar={
        <DataTableToolbar>
          <DataTableSearch table={table} placeholder="Search members..." />
          <DataTableFacetedFilter
            title="Status"
            options={["active", "inactive", "pending"]}
            selectedValues={statusFilter}
            onSelectionChange={setStatusFilter}
          />
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={() => { setGlobalFilter(""); setStatusFilter([]) }}>
              Reset
            </Button>
          )}
          <div className="ml-auto flex items-center gap-2">
            <DataTableSortMenu
              sorting={sorting}
              onSortingChange={setSorting}
              columns={[
                { id: "name",  label: "Name" },
                { id: "email", label: "Email" },
              ]}
            />
            <DataTableColumnToggle table={table} />
          </div>
        </DataTableToolbar>
      }
    />
  )
}`,
    },
    {
      title: "With pagination",
      description: "DataTablePagination renders in the footer slot. Always wrap it in a conditional — suppress it when the row model is empty to avoid a stray border above the empty state.",
      preview: <WithPaginationPreview />,
      code: `"use client"
import { useState } from "react"
import {
  useReactTable, getCoreRowModel, getFilteredRowModel,
  getSortedRowModel, getPaginationRowModel,
  type ColumnDef, type SortingState,
} from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table/data-table"
import { DataTableToolbar } from "@/components/ui/data-table/data-table-toolbar"
import { DataTableSearch } from "@/components/ui/data-table/data-table-search"
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination"

type Member = { id: string; name: string; email: string; plan: string; status: string }

export function MembersTable({ data }: { data: Member[] }) {
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])

  const columns: ColumnDef<Member>[] = [
    { accessorKey: "name",   header: "Name" },
    { accessorKey: "email",  header: "Email" },
    { accessorKey: "plan",   header: "Plan" },
    { accessorKey: "status", header: "Status" },
  ]

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    initialState: { pagination: { pageSize: 20 } },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const rowCount = table.getFilteredRowModel().rows.length

  return (
    <DataTable
      table={table}
      variant="contained"
      emptyMessage="No members found."
      toolbar={
        <DataTableToolbar>
          <DataTableSearch table={table} placeholder="Search members..." />
        </DataTableToolbar>
      }
      footer={
        rowCount > 0
          ? <DataTablePagination table={table} style="classic" rowLabel="member" />
          : undefined
      }
    />
  )
}`,
    },
    {
      title: "With row selection",
      description: "Add a checkbox column and DataTableSelectionBar. The selection bar lives outside DataTable and floats above the page when rows are selected.",
      preview: <WithSelectionPreview />,
      code: `"use client"
import { useState } from "react"
import {
  useReactTable, getCoreRowModel, type ColumnDef, type RowSelectionState,
} from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table/data-table"
import { DataTableSelectionBar } from "@/components/ui/data-table/data-table-selection-bar"
import { Checkbox } from "@/components/ui/checkbox"
import { RiDeleteBinLine, RiEditLine } from "@remixicon/react"

type Member = { id: string; name: string; email: string; role: string }

export function MembersTable({ data }: { data: Member[] }) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const columns: ColumnDef<Member>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label={\`Select \${row.original.name}\`}
          onClick={(e) => e.stopPropagation()}
        />
      ),
      size: 40,
      enableSorting: false,
    },
    { accessorKey: "name",  header: "Name",  cell: ({ row }) => <span className="font-medium">{row.original.name}</span> },
    { accessorKey: "email", header: "Email", cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span> },
    { accessorKey: "role",  header: "Role" },
  ]

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  })

  const selectedCount = Object.keys(rowSelection).length

  return (
    <>
      <DataTable table={table} variant="contained" emptyMessage="No members found." />

      {/* Selection bar lives OUTSIDE DataTable */}
      {selectedCount > 0 && (
        <DataTableSelectionBar
          count={selectedCount}
          onClear={() => setRowSelection({})}
          actions={[
            { icon: RiEditLine,      label: "Edit"   },
            "separator",
            { icon: RiDeleteBinLine, label: "Delete", variant: "destructive", onClick: handleDelete },
          ]}
        />
      )}
    </>
  )
}`,
    },
  ],

  apiReference: [
    {
      name: "table",
      values: "Table<TData>",
      default: "—",
      description: "The TanStack table instance from useReactTable(). Required.",
    },
    {
      name: "variant",
      values: `"plain" | "bordered" | "card" | "contained"`,
      default: `"plain"`,
      description: "Controls the outer chrome — border, rounding, and separator placement. Use \"contained\" for primary data views.",
    },
    {
      name: "emptyMessage",
      values: "string",
      default: `"No results."`,
      description: "Message shown when the filtered row model is empty. Distinguish between \"no data\" and \"no results\" by setting different messages contextually.",
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
      description: "Slot for DataTableToolbar content. DataTable applies the correct separator automatically.",
    },
    {
      name: "footer",
      values: "ReactNode",
      default: "—",
      description: "Slot for DataTablePagination. Always pass undefined when there are no rows to suppress the separator.",
    },
    {
      name: "style (DataTablePagination)",
      values: `"classic" | "simple"`,
      default: `"classic"`,
      description: "classic shows page number input and full row count. simple shows only Previous/Next buttons.",
    },
    {
      name: "rowLabel (DataTablePagination)",
      values: "string",
      default: `"row"`,
      description: "Singular noun for the record type used in the pagination count label. E.g., \"customer\" → \"48 customers\".",
    },
    {
      name: "count (DataTableSelectionBar)",
      values: "number",
      default: "—",
      description: "Number of selected rows. Displayed in the selection bar label.",
    },
    {
      name: "onClear (DataTableSelectionBar)",
      values: "() => void",
      default: "—",
      description: "Clears the row selection state when the user clicks the × button in the selection bar.",
    },
    {
      name: "actions (DataTableSelectionBar)",
      values: `(ActionItem | "separator")[]`,
      default: "[]",
      description: "Bulk action buttons shown in the selection bar. Each action has icon, label, variant, and onClick. Use \"separator\" for a visual divider.",
    },
    {
      name: "title (DataTableFacetedFilter)",
      values: "string",
      default: "—",
      description: "Label shown in the filter trigger button.",
    },
    {
      name: "options (DataTableFacetedFilter)",
      values: `string[] | { value: string; label: string }[]`,
      default: "—",
      description: "Options available in the filter dropdown.",
    },
    {
      name: "selectedValues (DataTableFacetedFilter)",
      values: "string[]",
      default: "[]",
      description: "Currently active filter values. Controlled — pair with onSelectionChange.",
    },
  ],

  accessibility: [
    {
      rule: "Table renders semantic HTML",
      detail: "DataTable renders a proper <table> with <thead> and <tbody>. Never replicate its layout with divs.",
    },
    {
      rule: "Sortable columns announce sort direction",
      detail: "TanStack table applies aria-sort to sortable header cells automatically. Do not suppress the sort model.",
    },
    {
      rule: "Checkbox columns need aria-label",
      detail: "Every Checkbox in the select column must have aria-label — header: \"Select all\", row: \"Select [row identifier]\".",
    },
    {
      rule: "Empty state is table content",
      detail: "The emptyMessage renders in a <td colspan={columns.length}> — screen readers announce it as table content, not as a separate region.",
    },
    {
      rule: "onRowClick rows are keyboard-accessible",
      detail: "Clickable rows receive tabIndex={0} and respond to Enter. Do not block focus with onClick stopPropagation on the row container itself.",
    },
    {
      rule: "Selection bar announces count",
      detail: "DataTableSelectionBar includes an accessible label with the selection count. The clear button has aria-label=\"Clear selection\".",
    },
  ],
}
