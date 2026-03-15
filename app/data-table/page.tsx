"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { PageHeader } from "@/components/ui/page-header"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator, BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  RiAddLine,
  RiArrowDownLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiArrowUpDownLine,
  RiArrowUpLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiDeleteBinLine,
  RiEditLine,
  RiEyeLine,
  RiFileCopyLine,
  RiLoader4Line,
  RiMore2Line,
  RiSearchLine,
  RiSettings3Line,
} from "@remixicon/react"

// ─── Types ───────────────────────────────────────────────────────────────────

type Status = "todo" | "in-progress" | "in-review" | "done" | "cancelled"
type Priority = "urgent" | "high" | "medium" | "low"
type Label = "bug" | "feature" | "improvement" | "docs"

type Task = {
  id: string
  title: string
  status: Status
  priority: Priority
  label: Label
  assignee: string
  initials: string
  dueDate: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

const TASKS: Task[] = [
  { id: "TASK-001", title: "Fix authentication token refresh bug", status: "in-progress", priority: "urgent", label: "bug", assignee: "Amara Osei", initials: "AO", dueDate: "2026-03-18" },
  { id: "TASK-002", title: "Design new onboarding flow screens", status: "todo", priority: "high", label: "feature", assignee: "Lena Fischer", initials: "LF", dueDate: "2026-03-22" },
  { id: "TASK-003", title: "Update API documentation for v2 endpoints", status: "in-review", priority: "medium", label: "docs", assignee: "James Adeyemi", initials: "JA", dueDate: "2026-03-20" },
  { id: "TASK-004", title: "Migrate database schema to PostgreSQL 16", status: "done", priority: "high", label: "improvement", assignee: "Sofia Reyes", initials: "SR", dueDate: "2026-03-10" },
  { id: "TASK-005", title: "Implement dark mode toggle persistence", status: "todo", priority: "low", label: "feature", assignee: "Kwame Mensah", initials: "KM", dueDate: "2026-04-01" },
  { id: "TASK-006", title: "Fix broken pagination on mobile devices", status: "in-progress", priority: "high", label: "bug", assignee: "Amara Osei", initials: "AO", dueDate: "2026-03-17" },
  { id: "TASK-007", title: "Add CSV export to reports dashboard", status: "todo", priority: "medium", label: "feature", assignee: "Lena Fischer", initials: "LF", dueDate: "2026-03-28" },
  { id: "TASK-008", title: "Write unit tests for billing module", status: "in-review", priority: "high", label: "improvement", assignee: "James Adeyemi", initials: "JA", dueDate: "2026-03-19" },
  { id: "TASK-009", title: "Refactor legacy notification service", status: "cancelled", priority: "low", label: "improvement", assignee: "Sofia Reyes", initials: "SR", dueDate: "2026-03-15" },
  { id: "TASK-010", title: "Add two-factor authentication support", status: "todo", priority: "urgent", label: "feature", assignee: "Kwame Mensah", initials: "KM", dueDate: "2026-03-25" },
  { id: "TASK-011", title: "Investigate memory leak in worker process", status: "in-progress", priority: "urgent", label: "bug", assignee: "Amara Osei", initials: "AO", dueDate: "2026-03-16" },
  { id: "TASK-012", title: "Add Stripe webhook endpoint validation", status: "done", priority: "high", label: "feature", assignee: "Lena Fischer", initials: "LF", dueDate: "2026-03-12" },
  { id: "TASK-013", title: "Improve search index performance", status: "in-review", priority: "medium", label: "improvement", assignee: "James Adeyemi", initials: "JA", dueDate: "2026-03-21" },
  { id: "TASK-014", title: "Update dependency versions for security patches", status: "done", priority: "high", label: "improvement", assignee: "Sofia Reyes", initials: "SR", dueDate: "2026-03-11" },
  { id: "TASK-015", title: "Create user activity audit log UI", status: "todo", priority: "medium", label: "feature", assignee: "Kwame Mensah", initials: "KM", dueDate: "2026-04-05" },
  { id: "TASK-016", title: "Fix tooltip z-index stacking issue", status: "done", priority: "low", label: "bug", assignee: "Amara Osei", initials: "AO", dueDate: "2026-03-09" },
  { id: "TASK-017", title: "Document component library guidelines", status: "in-progress", priority: "medium", label: "docs", assignee: "Lena Fischer", initials: "LF", dueDate: "2026-03-24" },
  { id: "TASK-018", title: "Set up end-to-end testing with Playwright", status: "todo", priority: "high", label: "improvement", assignee: "James Adeyemi", initials: "JA", dueDate: "2026-03-30" },
  { id: "TASK-019", title: "Resolve CORS errors in production build", status: "cancelled", priority: "medium", label: "bug", assignee: "Sofia Reyes", initials: "SR", dueDate: "2026-03-14" },
  { id: "TASK-020", title: "Add skeleton loading states to dashboard", status: "in-review", priority: "low", label: "feature", assignee: "Kwame Mensah", initials: "KM", dueDate: "2026-03-23" },
]

// ─── Config maps ─────────────────────────────────────────────────────────────

const statusConfig: Record<Status, {
  label: string
  variant: "info" | "success" | "warning" | "critical" | "neutral" | "caution"
  icon: React.ElementType
}> = {
  "todo":        { label: "Todo",        variant: "neutral",  icon: RiArrowUpDownLine },
  "in-progress": { label: "In Progress", variant: "info",     icon: RiLoader4Line },
  "in-review":   { label: "In Review",   variant: "caution",  icon: RiEyeLine },
  "done":        { label: "Done",        variant: "success",  icon: RiCheckboxCircleLine },
  "cancelled":   { label: "Cancelled",   variant: "neutral",  icon: RiCloseCircleLine },
}

const priorityConfig: Record<Priority, {
  label: string
  variant: "info" | "success" | "warning" | "critical" | "neutral" | "caution"
  icon: React.ElementType
}> = {
  "urgent": { label: "Urgent", variant: "critical", icon: RiArrowUpLine },
  "high":   { label: "High",   variant: "warning",  icon: RiArrowUpLine },
  "medium": { label: "Medium", variant: "caution",  icon: RiArrowUpDownLine },
  "low":    { label: "Low",    variant: "neutral",  icon: RiArrowDownLine },
}

const labelColors: Record<Label, string> = {
  bug:         "bg-error-lighter text-error-dark",
  feature:     "bg-info-lighter text-info-dark",
  improvement: "bg-success-lighter text-success-dark",
  docs:        "bg-secondary text-secondary-foreground",
}

// ─── Sortable header ──────────────────────────────────────────────────────────

function SortableHeader({ column, children }: {
  column: { getIsSorted: () => false | "asc" | "desc"; toggleSorting: (desc?: boolean) => void }
  children: React.ReactNode
}) {
  const sorted = column.getIsSorted()
  return (
    <button
      className="flex items-center gap-1.5 hover:text-foreground transition-colors"
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {children}
      {sorted === "asc"  ? <RiArrowUpLine   className="size-3.5" /> :
       sorted === "desc" ? <RiArrowDownLine  className="size-3.5" /> :
                           <RiArrowUpDownLine className="size-3.5 opacity-40" />}
    </button>
  )
}

// ─── Column definitions ───────────────────────────────────────────────────────

const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(v === true)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(v === true)}
        aria-label="Select row"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Task",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">{row.getValue("id")}</span>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableHeader column={column}>Title</SortableHeader>,
    cell: ({ row }) => {
      const label = row.original.label
      return (
        <div className="flex items-center gap-2 min-w-0">
          <span className={`inline-flex shrink-0 items-center rounded-sm px-1.5 py-0.5 text-xs font-medium ${labelColors[label]}`}>
            {label}
          </span>
          <span className="truncate max-w-[260px] font-medium">{row.getValue("title")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
    cell: ({ row }) => {
      const s = statusConfig[row.getValue("status") as Status]
      return (
        <Badge variant={s.variant} icon={<s.icon />}>
          {s.label}
        </Badge>
      )
    },
    filterFn: (row, id, value) => row.getValue(id) === value,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => <SortableHeader column={column}>Priority</SortableHeader>,
    cell: ({ row }) => {
      const p = priorityConfig[row.getValue("priority") as Priority]
      return (
        <Badge variant={p.variant} icon={<p.icon />}>
          {p.label}
        </Badge>
      )
    },
    filterFn: (row, id, value) => row.getValue(id) === value,
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="size-6">
          <AvatarFallback className="text-xs">{row.original.initials}</AvatarFallback>
        </Avatar>
        <span className="text-sm">{row.getValue("assignee")}</span>
      </div>
    ),
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => <SortableHeader column={column}>Due date</SortableHeader>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("dueDate") as string)
      const isPast = date < new Date() && row.original.status !== "done" && row.original.status !== "cancelled"
      return (
        <span className={isPast ? "text-destructive font-medium" : "text-muted-foreground"}>
          {date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger render={
          <Button variant="ghost" size="icon-sm" aria-label="Open actions" />
        }>
          <RiMore2Line className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem><RiEditLine />Edit</DropdownMenuItem>
            <DropdownMenuItem><RiFileCopyLine />Duplicate</DropdownMenuItem>
            <DropdownMenuItem><RiEyeLine />View details</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive"><RiDeleteBinLine />Delete</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

// ─── Table component ──────────────────────────────────────────────────────────

function TasksTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")

  const statusFilter = (columnFilters.find(f => f.id === "status")?.value as string) ?? ""
  const priorityFilter = (columnFilters.find(f => f.id === "priority")?.value as string) ?? ""

  function setColumnFilter(id: string, value: string | undefined) {
    setColumnFilters(prev => {
      const rest = prev.filter(f => f.id !== id)
      return value ? [...rest, { id, value }] : rest
    })
  }

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
  const hidableColumns = table.getAllColumns().filter(c => c.getCanHide())

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search tasks..."
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Status filter */}
        <Select
          value={statusFilter || "all"}
          onValueChange={v => setColumnFilter("status", v == null || v === "all" ? undefined : v)}
        >
          <SelectTrigger className="w-36">
            {statusFilter ? statusConfig[statusFilter as Status]?.label : "All statuses"}
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} align="start">
            <SelectGroup>
              <SelectItem value="all">All statuses</SelectItem>
              {(Object.entries(statusConfig) as [Status, typeof statusConfig[Status]][]).map(([value, { label }]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Priority filter */}
        <Select
          value={priorityFilter || "all"}
          onValueChange={v => setColumnFilter("priority", v == null || v === "all" ? undefined : v)}
        >
          <SelectTrigger className="w-36">
            {priorityFilter ? priorityConfig[priorityFilter as Priority]?.label : "All priorities"}
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} align="start">
            <SelectGroup>
              <SelectItem value="all">All priorities</SelectItem>
              {(Object.entries(priorityConfig) as [Priority, typeof priorityConfig[Priority]][]).map(([value, { label }]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="ml-auto flex items-center gap-2">
          {/* Bulk delete */}
          {selectedCount > 0 && (
            <Button variant="destructive" size="sm" onClick={() => setRowSelection({})}>
              <RiDeleteBinLine />
              Delete {selectedCount}
            </Button>
          )}

          {/* Column visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
              <RiSettings3Line />
              Columns
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {hidableColumns.map(column => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onClick={() => column.toggleVisibility(!column.getIsVisible())}
                >
                  {column.id === "dueDate" ? "Due date" : column.id.charAt(0).toUpperCase() + column.id.slice(1)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {selectedCount > 0
            ? `${selectedCount} of ${table.getFilteredRowModel().rows.length} row(s) selected`
            : `${table.getFilteredRowModel().rows.length} task(s)`}
        </span>
        <div className="flex items-center gap-1">
          <span className="mr-2 text-xs">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <RiArrowLeftLine />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <RiArrowRightLine />
          </Button>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DataTablePage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader
          left={
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Data Table</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          }
        />
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          <PageHeader
            title="Tasks"
            description="Manage and track your team's tasks across all projects."
            actions={<Button><RiAddLine />New task</Button>}
          />
          <TasksTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
