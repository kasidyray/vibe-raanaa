"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
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
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  DataTable,
  DataTableToolbar,
  DataTableSearch,
  DataTableFacetedFilter,
  DataTableColumnToggle,
  DataTablePagination,
  DataTableSelectionBar,
  type PaginationStyle,
} from "@/components/ui/data-table"
import {
  RiArrowDownSLine,
  RiCalendarLine,
  RiContractLeftRightLine,
  RiDeleteBinLine,
  RiEditLine,
  RiFileCopyLine,
} from "@remixicon/react"
import { TASKS, STATUS_OPTIONS, PRIORITY_OPTIONS, DUE_DATE_OPTIONS } from "./data"
import { columns } from "./tasks-columns"

// ─── TasksTableSkeleton ───────────────────────────────────────────────────────

export function TasksTableSkeleton({ rows = 10, variant = "plain" }: { rows?: number; variant?: "plain" | "bordered" | "card" }) {
  const header = (
    <div className={cn("flex items-center gap-4 border-b px-4 py-2.5", variant === "card" && "bg-muted/40")}>
      <Skeleton className="size-4 rounded-sm" />
      <Skeleton className="h-3 w-10" />
      <Skeleton className="h-3 w-10 ml-2" />
      <Skeleton className="h-3 w-16 ml-4" />
      <Skeleton className="h-3 w-16 ml-4" />
      <Skeleton className="h-3 w-16 ml-4" />
      <Skeleton className="h-3 w-14 ml-4" />
    </div>
  )

  const rows_ = Array.from({ length: rows }).map((_, i, arr) => (
    <div key={i} className={cn("flex items-center gap-4 px-4 py-3", i < arr.length - 1 && "border-b")}>
      <Skeleton className="size-4 shrink-0 rounded-sm" />
      <Skeleton className="h-3 w-14 font-mono" />
      <div className="flex flex-1 items-center gap-2">
        <Skeleton className="h-5 w-12 rounded-md" />
        <Skeleton className="h-3.5 w-48" />
      </div>
      <Skeleton className="h-5 w-20 rounded-full" />
      <Skeleton className="h-5 w-20 rounded-md" />
      <div className="flex items-center gap-2">
        <Skeleton className="size-6 shrink-0 rounded-full" />
        <Skeleton className="h-3.5 w-24" />
      </div>
      <Skeleton className="h-3.5 w-24" />
    </div>
  ))

  const toolbar = (
    <div className="flex items-center gap-2">
      <Skeleton className="h-8 w-56 rounded-md" />
      <Skeleton className="h-8 w-20 rounded-md" />
      <Skeleton className="h-8 w-20 rounded-md" />
      <Skeleton className="h-8 w-20 rounded-md" />
      <Skeleton className="ml-auto h-8 w-8 rounded-md" />
    </div>
  )

  const table = variant === "card" ? (
    <div className="overflow-hidden rounded-xl border">{header}{rows_}</div>
  ) : (
    <>{header}{rows_}</>
  )

  return <div className="flex flex-col gap-4">{toolbar}{table}</div>
}

// ─── Tasks table ──────────────────────────────────────────────────────────────

export function TasksTable({ variant = "card" }: { variant?: "card" | "plain" | "bordered" }) {
  const [isTableLoading, setIsTableLoading] = React.useState(true)

  React.useEffect(() => {
    const t = setTimeout(() => setIsTableLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  const [sorting, setSorting]               = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters]   = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection]     = React.useState({})
  const [globalFilter, setGlobalFilter]     = React.useState("")
  const [paginationStyle, setPaginationStyle] = React.useState<PaginationStyle>("classic")

  const statusFilter   = (columnFilters.find(f => f.id === "status")?.value   as string[]) ?? []
  const priorityFilter = (columnFilters.find(f => f.id === "priority")?.value as string[]) ?? []
  const dueDateFilter  = (columnFilters.find(f => f.id === "dueDate")?.value  as string[]) ?? []

  function setColumnFilter(id: string, values: string[]) {
    setColumnFilters(prev => {
      const rest = prev.filter(f => f.id !== id)
      return values.length ? [...rest, { id, value: values }] : rest
    })
  }

  const hasActiveFilters = statusFilter.length > 0 || priorityFilter.length > 0 || dueDateFilter.length > 0

  const table = useReactTable({
    data: TASKS,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  const selectedCount = Object.keys(rowSelection).length

  if (isTableLoading) return <TasksTableSkeleton rows={10} variant={variant} />

  return (
    <>
      <DataTable
        table={table}
        variant={variant}
        emptyMessage="No tasks found."
        toolbar={
          <DataTableToolbar>
            <DataTableSearch table={table} placeholder="Search tasks..." />

            <DataTableFacetedFilter
              title="Status"
              options={STATUS_OPTIONS}
              selectedValues={statusFilter}
              onSelectionChange={v => setColumnFilter("status", v)}
            />

            <DataTableFacetedFilter
              title="Priority"
              options={PRIORITY_OPTIONS}
              selectedValues={priorityFilter}
              onSelectionChange={v => setColumnFilter("priority", v)}
            />

            <DataTableFacetedFilter
              title="Due date"
              options={DUE_DATE_OPTIONS}
              selectedValues={dueDateFilter}
              onSelectionChange={v => setColumnFilter("dueDate", v)}
              icon={<RiCalendarLine className="opacity-60" />}
            />

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={() => setColumnFilters([])}>Reset</Button>
            )}

            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="rounded-md" />}>
                  <RiContractLeftRightLine />
                  {{ minimal: "Minimal", numbered: "Numbered", full: "Full controls", simple: "Simple", classic: "Classic" }[paginationStyle]}
                  <RiArrowDownSLine className="opacity-60" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuGroup>
                    {(["minimal", "numbered", "full", "simple", "classic"] as PaginationStyle[]).map(s => (
                      <DropdownMenuCheckboxItem key={s} checked={paginationStyle === s} onClick={() => setPaginationStyle(s)}>
                        {{ minimal: "Minimal", numbered: "Numbered", full: "Full controls", simple: "Simple", classic: "Classic" }[s]}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DataTableColumnToggle table={table} columnLabels={{ dueDate: "Due date" }} />
            </div>
          </DataTableToolbar>
        }
        footer={<DataTablePagination table={table} style={paginationStyle} selectedCount={selectedCount} rowLabel="task" />}
      />
      <DataTableSelectionBar
        count={selectedCount}
        onClear={() => setRowSelection({})}
        actions={[
          { icon: RiEditLine,    label: "Edit"      },
          { icon: RiFileCopyLine, label: "Duplicate" },
          "separator",
          { icon: RiDeleteBinLine, label: "Delete", variant: "destructive", onClick: () => setRowSelection({}) },
        ]}
      />
    </>
  )
}
