"use client"

import * as React from "react"
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { type DateRange } from "react-day-picker"
import {
  RiBankCardLine, RiBarChart2Line, RiCalendarLine,
  RiDownloadLine, RiFileCopyLine, RiFilterLine, RiUserLine,
} from "@remixicon/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DataTable,
  DataTableToolbar,
  DataTableSearch,
  DataTableFacetedFilter,
  DataTableColumnToggle,
  DataTablePagination,
} from "@/components/ui/data-table"

import {
  CUSTOMERS,
  DATE_PRESETS,
  PAYMENT_METHOD_OPTIONS,
  TYPE_OPTIONS,
  filterCustomersByTab,
  type Customer,
  type CustomerTab,
} from "./data"
import { buildColumns } from "./columns"
import { CustomerDrawer } from "./customer-drawer"

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export function CustomersTableSkeleton() {
  const colWidths = ["w-6", "w-36", "w-40", "w-28", "w-20", "w-16", "w-16", "w-16", "w-24", "w-24", "w-8"]
  return (
    <div className="rounded-xl border overflow-hidden">
      {/* Toolbar */}
      <div className="border-b px-4 py-3 flex items-center gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-full" />
        ))}
        <div className="ml-auto flex items-center gap-2">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
      {/* Header row */}
      <div className="border-b px-4 py-3 flex items-center gap-4">
        {colWidths.map((w, i) => (
          <Skeleton key={i} className={`h-3 rounded ${w}`} />
        ))}
      </div>
      {/* Body rows */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border-b last:border-0 px-4 py-3.5 flex items-center gap-4">
          {colWidths.map((w, j) => (
            <Skeleton key={j} className={`h-4 rounded ${w}`} />
          ))}
        </div>
      ))}
      {/* Pagination */}
      <div className="border-t px-4 py-3 flex items-center justify-between">
        <Skeleton className="h-4 w-36 rounded-md" />
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Created date filter ───────────────────────────────────────────────────────

function CreatedDateFilter({
  datePreset,
  customRange,
  onPresetChange,
  onRangeChange,
}: {
  datePreset: string
  customRange: DateRange | undefined
  onPresetChange: (value: string) => void
  onRangeChange: (range: DateRange | undefined) => void
}) {
  const isActive = datePreset !== "all" || customRange !== undefined

  const label = React.useMemo(() => {
    if (datePreset !== "all" && datePreset !== "custom") {
      return DATE_PRESETS.find((p) => p.value === datePreset)?.label ?? "Created date"
    }
    if (customRange?.from) {
      const from = customRange.from.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
      if (customRange.to) {
        const to = customRange.to.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
        return `${from} – ${to}`
      }
      return from
    }
    return "Created date"
  }, [datePreset, customRange])

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full border-dashed",
              isActive && "border-primary/40 bg-primary/5 text-primary"
            )}
          />
        }
      >
        <RiCalendarLine className="opacity-60" />
        {label}
        {isActive && (
          <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-sm bg-primary px-1 text-[10px] font-medium text-primary-foreground">
            1
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0 overflow-hidden">
        <div className="flex">
          {/* Presets */}
          <div className="flex flex-col gap-0.5 border-r p-2 w-38">
            {DATE_PRESETS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => {
                  onPresetChange(preset.value)
                  onRangeChange(undefined)
                }}
                className={cn(
                  "rounded-md px-3 py-1.5 text-left text-sm transition-colors hover:bg-muted",
                  datePreset === preset.value && "bg-muted font-medium"
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>
          {/* Calendar */}
          <Calendar
            mode="range"
            selected={customRange}
            onSelect={(range) => {
              onRangeChange(range)
              if (range?.from) {
                onPresetChange("custom")
              }
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

// ─── Table ────────────────────────────────────────────────────────────────────

const TODAY = new Date("2026-03-25T00:00:00Z")

export function CustomersTable({ tab }: { tab: CustomerTab }) {
  const [selected, setSelected] = React.useState<Customer | null>(null)

  // Toolbar filter state
  const [paymentMethodFilter, setPaymentMethodFilter] = React.useState<string[]>([])
  const [typeFilter,          setTypeFilter]          = React.useState<string[]>([])
  const [datePreset,          setDatePreset]          = React.useState("all")
  const [customRange,         setCustomRange]         = React.useState<DateRange | undefined>(undefined)

  // TanStack state
  const [sorting, setSorting]                   = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter]         = React.useState("")
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({ type: false })
  const [rowSelection, setRowSelection]         = React.useState({})
  const [columnFilters, setColumnFilters]       = React.useState<ColumnFiltersState>([])

  // Filter by tab, then by created date
  const data = React.useMemo(() => {
    let rows = filterCustomersByTab(CUSTOMERS, tab)

    if (datePreset !== "all" && datePreset !== "custom") {
      const days = datePreset === "7d" ? 7 : datePreset === "30d" ? 30 : datePreset === "90d" ? 90 : 365
      const cutoff = new Date(TODAY)
      cutoff.setDate(cutoff.getDate() - days)
      rows = rows.filter((c) => new Date(c.createdAt) >= cutoff)
    } else if (datePreset === "custom" && customRange?.from) {
      const from = customRange.from
      const to = customRange.to ?? customRange.from
      rows = rows.filter((c) => {
        const d = new Date(c.createdAt)
        return d >= from && d <= to
      })
    }

    return rows
  }, [tab, datePreset, customRange])

  const columns = React.useMemo(() => buildColumns(setSelected), [])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const q = filterValue.toLowerCase()
      return (
        row.original.name.toLowerCase().includes(q) ||
        row.original.email.toLowerCase().includes(q)
      )
    },
    initialState: { pagination: { pageSize: 10 } },
  })

  // Apply column filters
  React.useEffect(() => {
    table.getColumn("defaultPaymentMethod")?.setFilterValue(paymentMethodFilter.length ? paymentMethodFilter : undefined)
  }, [paymentMethodFilter, table])

  React.useEffect(() => {
    table.getColumn("type")?.setFilterValue(typeFilter.length ? typeFilter : undefined)
  }, [typeFilter, table])

  const hasActiveFilters =
    paymentMethodFilter.length > 0 ||
    typeFilter.length > 0 ||
    datePreset !== "all" ||
    customRange !== undefined ||
    globalFilter.length > 0

  function resetFilters() {
    setPaymentMethodFilter([])
    setTypeFilter([])
    setDatePreset("all")
    setCustomRange(undefined)
    setGlobalFilter("")
    table.resetColumnFilters()
  }

  return (
    <>
      <DataTable
        table={table}
        variant="contained"
        emptyMessage="No customers found."
        onRowClick={setSelected}
        toolbar={
          <DataTableToolbar>
            <DataTableSearch table={table} placeholder="Search by email…" />
            <DataTableFacetedFilter
              title="Card"
              icon={<RiBankCardLine className="opacity-60" />}
              options={PAYMENT_METHOD_OPTIONS}
              selectedValues={paymentMethodFilter}
              onSelectionChange={setPaymentMethodFilter}
            />
            <CreatedDateFilter
              datePreset={datePreset}
              customRange={customRange}
              onPresetChange={setDatePreset}
              onRangeChange={setCustomRange}
            />
            <DataTableFacetedFilter
              title="Type"
              icon={<RiUserLine className="opacity-60" />}
              options={TYPE_OPTIONS}
              selectedValues={typeFilter}
              onSelectionChange={setTypeFilter}
            />
            <Button variant="outline" size="sm" className="rounded-full border-dashed">
              <RiFilterLine className="opacity-60" />
              More filters
            </Button>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>Reset</Button>
            )}
            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RiFileCopyLine />
                Copy
              </Button>
              <Button variant="outline" size="sm">
                <RiDownloadLine />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <RiBarChart2Line />
                Analyse
              </Button>
              <DataTableColumnToggle table={table} />
            </div>
          </DataTableToolbar>
        }
        footer={
          table.getFilteredRowModel().rows.length > 0 ? (
            <DataTablePagination table={table} style="classic" rowLabel="customer" />
          ) : undefined
        }
      />

      <CustomerDrawer customer={selected} onClose={() => setSelected(null)} />
    </>
  )
}
