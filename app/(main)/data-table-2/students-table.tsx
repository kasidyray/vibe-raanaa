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
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  DataTable,
  DataTableToolbar,
  DataTableFacetedFilter,
  DataTablePagination,
  DataTableSelectionBar,
} from "@/components/ui/data-table"
import {
  RiArrowDownSLine,
  RiBookOpenLine,
  RiDeleteBinLine,
  RiDownloadLine,
  RiEditLine,
  RiFileCopyLine,
  RiGroupLine,
  RiMailLine,
  RiUserLine,
} from "@remixicon/react"
import { STUDENTS } from "./data"
import { studentColumns } from "./students-columns"

// ─── StudentsTableSkeleton ────────────────────────────────────────────────────

export function StudentsTableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>

      {/* Table — bordered variant: no outer wrapper, no header bg */}
      <div>
        <div className="flex items-center gap-4 border-b px-4 py-2.5">
          <Skeleton className="size-4 rounded-sm" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-16 ml-4" />
          <Skeleton className="h-3 w-14 ml-4" />
          <Skeleton className="h-3 w-8 ml-4" />
          <Skeleton className="h-3 w-12 ml-4" />
          <Skeleton className="h-3 w-16 ml-4" />
          <Skeleton className="h-3 w-16 ml-4" />
        </div>
        {Array.from({ length: rows }).map((_, i, arr) => (
          <div key={i} className={cn("flex items-center gap-4 px-4 py-3", i < arr.length - 1 && "border-b")}>
            <Skeleton className="size-4 shrink-0 rounded-sm" />
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-3.5 w-32 flex-1" />
            <Skeleton className="h-5 w-16 rounded-md" />
            <Skeleton className="h-3.5 w-8" />
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3.5 w-12" />
            <Skeleton className="h-3.5 w-12" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Students table ───────────────────────────────────────────────────────────

export function StudentsTable() {
  const [isTableLoading, setIsTableLoading] = React.useState(true)

  React.useEffect(() => {
    const t = setTimeout(() => setIsTableLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  const [sorting, setSorting]               = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters]   = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection]     = React.useState({})

  const classFilter  = (columnFilters.find(f => f.id === "class")?.value  as string[]) ?? []
  const genderFilter = (columnFilters.find(f => f.id === "gender")?.value as string[]) ?? []

  function setColumnFilter(id: string, values: string[]) {
    setColumnFilters(prev => {
      const rest = prev.filter(f => f.id !== id)
      return values.length ? [...rest, { id, value: values }] : rest
    })
  }

  const uniqueClasses = [...new Set(STUDENTS.map(s => s.class))].sort()

  const table = useReactTable({
    data: STUDENTS,
    columns: studentColumns,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  const selectedCount = Object.keys(rowSelection).length

  if (isTableLoading) return <StudentsTableSkeleton rows={10} />

  return (
    <>
      <DataTable
        table={table}
        variant="bordered"
        emptyMessage="No students found."
        toolbar={
          <DataTableToolbar>
            <DataTableFacetedFilter
              title="Class"
              options={uniqueClasses}
              selectedValues={classFilter}
              onSelectionChange={v => setColumnFilter("class", v.slice(-1))}
              icon={<RiBookOpenLine className="opacity-60" />}
            />

            <DataTableFacetedFilter
              title="Gender"
              options={["Male", "Female"]}
              selectedValues={genderFilter}
              onSelectionChange={v => setColumnFilter("gender", v.slice(-1))}
              icon={<RiUserLine className="opacity-60" />}
            />

            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="rounded-md" />}>
                  <RiDownloadLine />
                  Export data
                  <RiArrowDownSLine className="opacity-60" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Export as</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>CSV</DropdownMenuItem>
                    <DropdownMenuItem>Excel (.xlsx)</DropdownMenuItem>
                    <DropdownMenuItem>PDF</DropdownMenuItem>
                    <DropdownMenuItem>JSON</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </DataTableToolbar>
        }
        footer={<DataTablePagination table={table} style="classic" selectedCount={selectedCount} rowLabel="student" />}
      />
      <DataTableSelectionBar
        count={selectedCount}
        onClear={() => setRowSelection({})}
        label="students"
        actions={[
          { icon: RiEditLine,    label: "Edit"         },
          { icon: RiFileCopyLine, label: "Duplicate"   },
          { icon: RiGroupLine,   label: "Add to group" },
          { icon: RiMailLine,    label: "Send email"   },
          "separator",
          { icon: RiDeleteBinLine, label: "Delete", variant: "destructive", onClick: () => setRowSelection({}) },
        ]}
      />
    </>
  )
}
