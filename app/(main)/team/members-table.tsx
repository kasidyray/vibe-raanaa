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
  RiShieldLine,
  RiUserLine,
  RiMailLine,
  RiDeleteBinLine,
} from "@remixicon/react"
import { toast } from "sonner"

import { Skeleton } from "@/components/ui/skeleton"
import {
  DataTable,
  DataTableToolbar,
  DataTableSearch,
  DataTableFacetedFilter,
  DataTableSortMenu,
  DataTableColumnToggle,
  DataTablePagination,
  DataTableSelectionBar,
} from "@/components/ui/data-table"
import { cn } from "@/lib/utils"

import { type Member, type RoleId } from "./data"
import { buildColumns, SORT_COLUMNS } from "./columns"

// ─── TeamTableSkeleton ────────────────────────────────────────────────────────

export function TeamTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-56 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="ml-auto h-8 w-8 rounded-md" />
      </div>

      {/* Table — bordered variant: no outer wrapper, no header bg */}
      <div>
        <div className="flex items-center gap-3 border-b px-4 py-2.5">
          <Skeleton className="size-4 rounded-sm" />
          <Skeleton className="h-3 w-32" />
          <Skeleton className="ml-auto h-3 w-16" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="size-8 rounded-md" />
        </div>
        {Array.from({ length: rows }).map((_, i, arr) => (
          <div key={i} className={cn("flex items-center gap-3 px-4 py-3", i < arr.length - 1 && "border-b")}>
            <Skeleton className="size-4 rounded-sm" />
            <div className="flex flex-1 items-center gap-3">
              <Skeleton className="size-8 rounded-full" />
              <div className="space-y-1.5">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="size-8 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── TeamMembersTable ─────────────────────────────────────────────────────────

export function TeamMembersTable({
  members,
  onMemberClick,
  onRoleChange,
  onRemove,
  onToggleSuspend,
  onInvite,
}: {
  members: Member[]
  onMemberClick: (m: Member) => void
  onRoleChange: (id: string, role: RoleId) => void
  onRemove: (id: string) => void
  onToggleSuspend: (id: string) => void
  onInvite: () => void
}) {
  const [sorting, setSorting]                   = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter]         = React.useState("")
  const [rowSelection, setRowSelection]         = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [roleFilter, setRoleFilter]             = React.useState<string[]>([])
  const [statusFilter, setStatusFilter]         = React.useState<string[]>([])

  const columnFilters = React.useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = []
    if (roleFilter.length)   filters.push({ id: "role",   value: roleFilter })
    if (statusFilter.length) filters.push({ id: "status", value: statusFilter })
    return filters
  }, [roleFilter, statusFilter])

  const hasActiveFilters = roleFilter.length > 0 || statusFilter.length > 0

  const columns = React.useMemo(
    () => buildColumns(onRoleChange, onRemove, onToggleSuspend),
    [onRoleChange, onRemove, onToggleSuspend]
  )

  const table = useReactTable({
    data: members,
    columns,
    state: { sorting, globalFilter, rowSelection, columnVisibility, columnFilters },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
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

  const selectedCount = Object.keys(rowSelection).length

  return (
    <div className="flex flex-col gap-4">
      <DataTableToolbar>
        <DataTableSearch table={table} placeholder="Search by name or email..." />

        <DataTableFacetedFilter
          title="Role"
          options={[
            { value: "owner",  label: "Owner"  },
            { value: "admin",  label: "Admin"  },
            { value: "editor", label: "Editor" },
            { value: "viewer", label: "Viewer" },
          ]}
          selectedValues={roleFilter}
          onSelectionChange={setRoleFilter}
          icon={<RiShieldLine className="opacity-60" />}
        />

        <DataTableFacetedFilter
          title="Status"
          options={[
            { value: "active",    label: "Active"    },
            { value: "pending",   label: "Pending"   },
            { value: "suspended", label: "Suspended" },
          ]}
          selectedValues={statusFilter}
          onSelectionChange={setStatusFilter}
          icon={<RiUserLine className="opacity-60" />}
        />

        {hasActiveFilters && (
          <button
            onClick={() => { setRoleFilter([]); setStatusFilter([]) }}
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
        emptyMessage="No members match your filters."
        onRowClick={onMemberClick}
      />

      {table.getFilteredRowModel().rows.length > 0 && (
        <DataTablePagination
          table={table}
          style="classic"
          selectedCount={selectedCount}
          rowLabel="member"
        />
      )}

      <DataTableSelectionBar
        count={selectedCount}
        onClear={() => setRowSelection({})}
        actions={[
          { icon: RiMailLine, label: "Resend invite" },
          "separator",
          {
            icon: RiDeleteBinLine,
            label: "Remove",
            variant: "destructive",
            onClick: () => {
              const selectedIds = table.getSelectedRowModel().rows.map(r => r.original.id)
              const count = selectedIds.length
              selectedIds.forEach(id => onRemove(id))
              setRowSelection({})
              toast.success(`${count} member${count !== 1 ? "s" : ""} removed from workspace`)
            },
          },
        ]}
      />
    </div>
  )
}
