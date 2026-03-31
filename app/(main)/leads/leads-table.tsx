"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
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
  RiBriefcaseLine,
  RiBuilding2Line,
  RiDeleteBinLine,
  RiDownloadLine,
  RiEditLine,
  RiMailLine,
} from "@remixicon/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button }   from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose,
} from "@/components/ui/drawer"
import {
  DataTable, DataTableToolbar, DataTableSearch, DataTableFacetedFilter,
  DataTableSortMenu, DataTableColumnToggle, DataTablePagination, DataTableSelectionBar,
} from "@/components/ui/data-table"
import { columns }           from "./columns"
import { LEADS, JOB_TITLES, COMPANIES, SORT_COLUMNS, type Lead } from "./data"

// ─── LeadsTableSkeleton ───────────────────────────────────────────────────────

export function LeadsTableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-56 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="ml-auto h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
      <div>
        <div className="flex items-center gap-4 border-b px-4 py-2.5">
          <Skeleton className="size-4 rounded-sm" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20 ml-4" />
          <Skeleton className="h-3 w-16 ml-4" />
          <Skeleton className="h-3 w-24 ml-4" />
        </div>
        {Array.from({ length: rows }).map((_, i, arr) => (
          <div key={i} className={cn("flex items-center gap-4 px-4 py-3", i < arr.length - 1 && "border-b")}>
            <Skeleton className="size-4 shrink-0 rounded-sm" />
            <div className="flex flex-1 items-center gap-2.5">
              <Skeleton className="size-7 shrink-0 rounded-full" />
              <Skeleton className="h-3.5 w-28" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="size-5 shrink-0 rounded-sm" />
              <Skeleton className="h-3.5 w-24" />
            </div>
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3.5 w-40" />
            <Skeleton className="size-7 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── LeadsTable ───────────────────────────────────────────────────────────────

export function LeadsTable() {
  const [isTableLoading, setIsTableLoading] = React.useState(true)

  React.useEffect(() => {
    const t = setTimeout(() => setIsTableLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  const [sorting,          setSorting]          = React.useState<SortingState>([])
  const [globalFilter,     setGlobalFilter]     = React.useState("")
  const [rowSelection,     setRowSelection]     = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [jobTitleFilter,   setJobTitleFilter]   = React.useState<string[]>([])
  const [companyFilter,    setCompanyFilter]    = React.useState<string[]>([])
  const [selectedLead,     setSelectedLead]     = React.useState<Lead | null>(null)

  const columnFilters = React.useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = []
    if (jobTitleFilter.length) filters.push({ id: "jobTitle", value: jobTitleFilter })
    if (companyFilter.length)  filters.push({ id: "company",  value: companyFilter  })
    return filters
  }, [jobTitleFilter, companyFilter])

  const hasActiveFilters = jobTitleFilter.length > 0 || companyFilter.length > 0

  const table = useReactTable({
    data: LEADS,
    columns,
    state: { sorting, globalFilter, rowSelection, columnVisibility, columnFilters },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const selectedCount = Object.keys(rowSelection).length

  if (isTableLoading) return <LeadsTableSkeleton rows={10} />

  return (
    <>
      <DataTable
        table={table}
        variant="bordered"
        emptyMessage="No leads found."
        onRowClick={setSelectedLead}
        toolbar={
          <DataTableToolbar>
            <div className="flex w-full sm:flex-1 flex-wrap items-center gap-2 min-w-0">
              <DataTableSearch table={table} placeholder="Search by name, company..." />

              <DataTableFacetedFilter
                title="Job Title"
                options={JOB_TITLES}
                selectedValues={jobTitleFilter}
                onSelectionChange={setJobTitleFilter}
                icon={<RiBriefcaseLine className="opacity-60" />}
              />

              <DataTableFacetedFilter
                title="Company"
                options={COMPANIES}
                selectedValues={companyFilter}
                onSelectionChange={setCompanyFilter}
                icon={<RiBuilding2Line className="opacity-60" />}
              />

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={() => { setJobTitleFilter([]); setCompanyFilter([]) }}>
                  Reset
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <DataTableSortMenu
                sorting={sorting}
                onSortingChange={setSorting}
                columns={SORT_COLUMNS}
              />
              <DataTableColumnToggle table={table} />
            </div>
          </DataTableToolbar>
        }
        footer={table.getFilteredRowModel().rows.length > 0
          ? <DataTablePagination table={table} style="classic" selectedCount={selectedCount} rowLabel="lead" />
          : undefined
        }
      />

      <DataTableSelectionBar
        count={selectedCount}
        onClear={() => setRowSelection({})}
        actions={[
          { icon: RiMailLine,     label: "Send email" },
          { icon: RiEditLine,     label: "Edit"       },
          { icon: RiDownloadLine, label: "Export"     },
          "separator",
          { icon: RiDeleteBinLine, label: "Delete", variant: "destructive", onClick: () => setRowSelection({}) },
        ]}
      />

      <Drawer direction="right" open={!!selectedLead} onOpenChange={open => !open && setSelectedLead(null)}>
        <DrawerContent className="sm:max-w-md">
          {selectedLead && (
            <div className="flex flex-col h-full overflow-y-auto">
              <DrawerHeader className="items-start">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10 rounded-full">
                    <AvatarImage src={selectedLead.avatar} alt={selectedLead.name} />
                    <AvatarFallback>{selectedLead.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DrawerTitle>{selectedLead.name}</DrawerTitle>
                    <p className="text-sm text-muted-foreground">{selectedLead.jobTitle}</p>
                  </div>
                </div>
                <DrawerClose />
              </DrawerHeader>

              <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-1.5">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Company</p>
                  <div className="flex items-center gap-2.5">
                    <Avatar className="size-6 rounded-sm">
                      <AvatarImage src={selectedLead.companyLogo} alt={selectedLead.company} />
                      <AvatarFallback className="text-[10px] rounded-sm">{selectedLead.company.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{selectedLead.company}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Contact</p>
                  <div className="flex items-center gap-2 text-sm">
                    <RiMailLine className="size-4 text-muted-foreground shrink-0" />
                    <span>{selectedLead.email}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex items-center gap-2 border-t p-6">
                <Button className="flex-1"><RiMailLine />Send email</Button>
                <Button variant="outline" size="icon" aria-label="Edit"><RiEditLine /></Button>
                <Button variant="outline" size="icon" aria-label="Delete" className="text-destructive hover:text-destructive"><RiDeleteBinLine /></Button>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}
