"use client"

import * as React from "react"
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  RiArrowDownSLine,
  RiCalendarLine,
  RiCheckLine,
  RiUserLine,
} from "@remixicon/react"

import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  DataTable,
  DataTableToolbar,
  DataTableSearch,
  DataTableFacetedFilter,
  DataTableSortMenu,
  DataTableColumnToggle,
  DataTablePagination,
} from "@/components/ui/data-table"
import { cn } from "@/lib/utils"

import {
  type ActivityEvent,
  type ViewFilter,
  type DatePreset,
  ACTIVITY_EVENTS,
  ALL_CATEGORIES,
  ALL_STATUSES,
  DATE_PRESETS,
  SORT_COLUMNS,
  categoryConfig,
  statusConfig,
  getDateRangeStart,
} from "./data"
import { columns } from "./columns"
import { ActivityDetailDrawer } from "./activity-drawer"

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export function ActivityTableSkeleton({ rows = 12 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-56 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="ml-auto h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      {/* Table — bordered variant: no outer wrapper, no header bg */}
      <div>
        <div className="flex items-center gap-4 border-b px-4 py-2.5">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-14 ml-4" />
          <Skeleton className="h-3 w-20 ml-4" />
          <Skeleton className="h-3 w-16 ml-4" />
          <Skeleton className="h-3 w-14 ml-4" />
          <Skeleton className="h-3 w-12 ml-auto" />
        </div>
        {Array.from({ length: rows }).map((_, i, arr) => (
          <div key={i} className={cn("flex items-center gap-4 px-4 py-3", i < arr.length - 1 && "border-b")}>
            {/* Event: icon + name */}
            <div className="flex flex-1 items-center gap-2.5">
              <Skeleton className="size-7 shrink-0 rounded-md" />
              <Skeleton className="h-3.5 w-36" />
            </div>
            {/* Actor: avatar + name */}
            <div className="flex items-center gap-2">
              <Skeleton className="size-6 shrink-0 rounded-full" />
              <Skeleton className="h-3.5 w-24" />
            </div>
            {/* Resource: type · name */}
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-3.5 w-32" />
            </div>
            {/* Category badge */}
            <Skeleton className="h-5 w-16 rounded-md" />
            {/* Status badge */}
            <Skeleton className="h-5 w-20 rounded-full" />
            {/* Timestamp */}
            <Skeleton className="h-3.5 w-20" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Table ────────────────────────────────────────────────────────────────────

export function ActivityTable({ viewFilter = "all" }: { viewFilter?: ViewFilter }) {
  const [isTableLoading, setIsTableLoading] = React.useState(true)

  React.useEffect(() => {
    const t = setTimeout(() => setIsTableLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  const [sorting, setSorting]                   = React.useState<SortingState>([{ id: "timestamp", desc: true }])
  const [globalFilter, setGlobalFilter]         = React.useState("")
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [categoryFilter, setCategoryFilter]     = React.useState<string[]>([])
  const [statusFilter, setStatusFilter]         = React.useState<string[]>([])
  const [actorFilter, setActorFilter]           = React.useState<string[]>([])
  const [datePreset, setDatePreset]             = React.useState<DatePreset>("all")
  const [onlyMine, setOnlyMine]                 = React.useState(false)
  const [selectedEvent, setSelectedEvent]       = React.useState<ActivityEvent | null>(null)

  // Pre-filter by view (tab) and external state before table processing
  const baseData = React.useMemo(() => {
    let data = ACTIVITY_EVENTS

    if (viewFilter === "auth")        data = data.filter(e => ["auth", "access"].includes(e.category))
    else if (viewFilter === "data")   data = data.filter(e => e.category === "data")
    else if (viewFilter === "system") data = data.filter(e => ["system", "settings", "billing"].includes(e.category))

    if (onlyMine) data = data.filter(e => e.actor.id === "usr_001")

    const rangeStart = getDateRangeStart(datePreset)
    if (rangeStart) {
      data = data.filter(e => new Date(e.timestamp).getTime() >= rangeStart.getTime())
    }

    return data
  }, [viewFilter, onlyMine, datePreset])

  const columnFilters = React.useMemo<ColumnFiltersState>(() => {
    const f: ColumnFiltersState = []
    if (categoryFilter.length) f.push({ id: "category",  value: categoryFilter })
    if (statusFilter.length)   f.push({ id: "status",    value: statusFilter   })
    if (actorFilter.length)    f.push({ id: "actorName", value: actorFilter    })
    return f
  }, [categoryFilter, statusFilter, actorFilter])

  const hasActiveFilters =
    categoryFilter.length > 0 || statusFilter.length > 0 || actorFilter.length > 0 ||
    datePreset !== "all" || onlyMine

  const table = useReactTable({
    data: baseData,
    columns,
    state: { sorting, globalFilter, columnVisibility, columnFilters },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const q = filterValue.toLowerCase()
      const e = row.original
      return (
        e.eventName.toLowerCase().includes(q) ||
        e.actor.name.toLowerCase().includes(q) ||
        e.target.name.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q)
      )
    },
  })

  const actorOptions       = [...new Set(ACTIVITY_EVENTS.map(e => e.actor.name))].sort()
  const currentDateLabel   = DATE_PRESETS.find(p => p.value === datePreset)?.label ?? "All time"

  function resetFilters() {
    setCategoryFilter([])
    setStatusFilter([])
    setActorFilter([])
    setDatePreset("all")
    setOnlyMine(false)
  }

  if (isTableLoading) return <ActivityTableSkeleton rows={12} />

  return (
    <div className="flex flex-col gap-4">
      <DataTableToolbar>
        <DataTableSearch table={table} placeholder="Search events, actors, resources…" />

        <DataTableFacetedFilter
          title="Category"
          options={ALL_CATEGORIES.map(c => ({ value: c, label: categoryConfig[c].label }))}
          selectedValues={categoryFilter}
          onSelectionChange={setCategoryFilter}
        />

        <DataTableFacetedFilter
          title="Status"
          options={ALL_STATUSES.map(s => ({ value: s, label: statusConfig[s].label }))}
          selectedValues={statusFilter}
          onSelectionChange={setStatusFilter}
        />

        <DataTableFacetedFilter
          title="Actor"
          options={actorOptions}
          selectedValues={actorFilter}
          onSelectionChange={setActorFilter}
          icon={<RiUserLine className="opacity-60" />}
        />

        {/* Date range preset */}
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button
              variant="outline"
              size="sm"
              className={cn("rounded-md", datePreset !== "all" && "border-primary/40 bg-primary/5 text-foreground")}
            />
          }>
            <RiCalendarLine className="opacity-60" />
            {currentDateLabel}
            <RiArrowDownSLine className="opacity-60" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Date range</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {DATE_PRESETS.map(preset => (
                <DropdownMenuCheckboxItem
                  key={preset.value}
                  checked={datePreset === preset.value}
                  onClick={() => setDatePreset(preset.value)}
                >
                  {preset.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Only my actions toggle */}
        <Button
          variant="outline"
          size="sm"
          className={cn("rounded-md gap-1.5", onlyMine && "border-primary/40 bg-primary/5 text-foreground")}
          onClick={() => setOnlyMine(v => !v)}
        >
          <RiUserLine className="opacity-60" />
          My actions
          {onlyMine && <RiCheckLine className="size-3 text-primary" />}
        </Button>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Reset
          </button>
        )}

        <div className="ml-auto flex items-center gap-2">
          <DataTableSortMenu
            sorting={sorting}
            onSortingChange={setSorting}
            columns={SORT_COLUMNS}
          />
          <DataTableColumnToggle table={table} />
        </div>
      </DataTableToolbar>

      <DataTable
        table={table}
        variant="bordered"
        emptyMessage="No activity events match your filters."
        onRowClick={setSelectedEvent}
      />

      <DataTablePagination table={table} style="classic" rowLabel="event" />

      <ActivityDetailDrawer
        event={selectedEvent}
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  )
}
