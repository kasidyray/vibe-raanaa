"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
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

import { SiteHeader } from "@/components/site-header"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator, BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DataTable,
  DataTableToolbar,
  DataTableSearch,
  DataTableFacetedFilter,
  DataTableColumnToggle,
  DataTablePagination,
  type PaginationStyle,
} from "@/components/ui/data-table"
import {
  RiAddLine,
  RiArrowDownLine,
  RiArrowDownSLine,
  RiArrowUpDownLine,
  RiArrowUpLine,
  RiCalendarLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiContractLeftRightLine,
  RiDeleteBinLine,
  RiDownloadLine,
  RiEditLine,
  RiEyeLine,
  RiFileCopyLine,
  RiBookOpenLine,
  RiGroupLine,
  RiLoader4Line,
  RiMailLine,
  RiUserLine,
  RiMore2Line,
  RiPhoneLine,
} from "@remixicon/react"

// ─── Types ───────────────────────────────────────────────────────────────────

type Status   = "todo" | "in-progress" | "in-review" | "done" | "cancelled"
type Priority = "urgent" | "high" | "medium" | "low"
type Label    = "bug" | "feature" | "improvement" | "docs"

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
  { id: "TASK-001", title: "Fix authentication token refresh bug",         status: "in-progress", priority: "urgent", label: "bug",         assignee: "Amara Osei",    initials: "AO", dueDate: "2026-03-18" },
  { id: "TASK-002", title: "Design new onboarding flow screens",           status: "todo",        priority: "high",   label: "feature",     assignee: "Lena Fischer",  initials: "LF", dueDate: "2026-03-22" },
  { id: "TASK-003", title: "Update API documentation for v2 endpoints",    status: "in-review",   priority: "medium", label: "docs",        assignee: "James Adeyemi", initials: "JA", dueDate: "2026-03-20" },
  { id: "TASK-004", title: "Migrate database schema to PostgreSQL 16",     status: "done",        priority: "high",   label: "improvement", assignee: "Sofia Reyes",   initials: "SR", dueDate: "2026-03-10" },
  { id: "TASK-005", title: "Implement dark mode toggle persistence",       status: "todo",        priority: "low",    label: "feature",     assignee: "Kwame Mensah",  initials: "KM", dueDate: "2026-04-01" },
  { id: "TASK-006", title: "Fix broken pagination on mobile devices",      status: "in-progress", priority: "high",   label: "bug",         assignee: "Amara Osei",    initials: "AO", dueDate: "2026-03-17" },
  { id: "TASK-007", title: "Add CSV export to reports dashboard",          status: "todo",        priority: "medium", label: "feature",     assignee: "Lena Fischer",  initials: "LF", dueDate: "2026-03-28" },
  { id: "TASK-008", title: "Write unit tests for billing module",          status: "in-review",   priority: "high",   label: "improvement", assignee: "James Adeyemi", initials: "JA", dueDate: "2026-03-19" },
  { id: "TASK-009", title: "Refactor legacy notification service",         status: "cancelled",   priority: "low",    label: "improvement", assignee: "Sofia Reyes",   initials: "SR", dueDate: "2026-03-15" },
  { id: "TASK-010", title: "Add two-factor authentication support",        status: "todo",        priority: "urgent", label: "feature",     assignee: "Kwame Mensah",  initials: "KM", dueDate: "2026-03-25" },
  { id: "TASK-011", title: "Investigate memory leak in worker process",    status: "in-progress", priority: "urgent", label: "bug",         assignee: "Amara Osei",    initials: "AO", dueDate: "2026-03-16" },
  { id: "TASK-012", title: "Add Stripe webhook endpoint validation",       status: "done",        priority: "high",   label: "feature",     assignee: "Lena Fischer",  initials: "LF", dueDate: "2026-03-12" },
  { id: "TASK-013", title: "Improve search index performance",             status: "in-review",   priority: "medium", label: "improvement", assignee: "James Adeyemi", initials: "JA", dueDate: "2026-03-21" },
  { id: "TASK-014", title: "Update dependency versions for security",      status: "done",        priority: "high",   label: "improvement", assignee: "Sofia Reyes",   initials: "SR", dueDate: "2026-03-11" },
  { id: "TASK-015", title: "Create user activity audit log UI",            status: "todo",        priority: "medium", label: "feature",     assignee: "Kwame Mensah",  initials: "KM", dueDate: "2026-04-05" },
  { id: "TASK-016", title: "Fix tooltip z-index stacking issue",           status: "done",        priority: "low",    label: "bug",         assignee: "Amara Osei",    initials: "AO", dueDate: "2026-03-09" },
  { id: "TASK-017", title: "Document component library guidelines",        status: "in-progress", priority: "medium", label: "docs",        assignee: "Lena Fischer",  initials: "LF", dueDate: "2026-03-24" },
  { id: "TASK-018", title: "Set up end-to-end testing with Playwright",    status: "todo",        priority: "high",   label: "improvement", assignee: "James Adeyemi", initials: "JA", dueDate: "2026-03-30" },
  { id: "TASK-019", title: "Resolve CORS errors in production build",      status: "cancelled",   priority: "medium", label: "bug",         assignee: "Sofia Reyes",   initials: "SR", dueDate: "2026-03-14" },
  { id: "TASK-020", title: "Add skeleton loading states to dashboard",     status: "in-review",   priority: "low",    label: "feature",     assignee: "Kwame Mensah",  initials: "KM", dueDate: "2026-03-23" },
]

// ─── Config maps ─────────────────────────────────────────────────────────────

const statusConfig: Record<Status, { label: string; variant: "info" | "success" | "warning" | "critical" | "neutral" | "caution"; icon: React.ElementType }> = {
  "todo":        { label: "Todo",        variant: "neutral",  icon: RiArrowUpDownLine },
  "in-progress": { label: "In Progress", variant: "info",     icon: RiLoader4Line },
  "in-review":   { label: "In Review",   variant: "caution",  icon: RiEyeLine },
  "done":        { label: "Done",        variant: "success",  icon: RiCheckboxCircleLine },
  "cancelled":   { label: "Cancelled",   variant: "neutral",  icon: RiCloseCircleLine },
}

const priorityConfig: Record<Priority, { label: string; variant: "info" | "success" | "warning" | "critical" | "neutral" | "caution"; icon: React.ElementType }> = {
  "urgent": { label: "Urgent", variant: "critical", icon: RiArrowUpLine },
  "high":   { label: "High",   variant: "warning",  icon: RiArrowUpLine },
  "medium": { label: "Medium", variant: "caution",  icon: RiArrowUpDownLine },
  "low":    { label: "Low",    variant: "neutral",  icon: RiArrowDownLine },
}

const labelVariants: Record<Label, "critical" | "info" | "success" | "neutral"> = {
  bug: "critical", feature: "info", improvement: "success", docs: "neutral",
}

// ─── Sortable header ──────────────────────────────────────────────────────────

function SortableHeader({ column, children }: {
  column: { getIsSorted: () => false | "asc" | "desc"; toggleSorting: (desc?: boolean) => void }
  children: React.ReactNode
}) {
  const sorted = column.getIsSorted()
  return (
    <button
      className="flex items-center gap-1.5 uppercase hover:text-foreground transition-colors"
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {children}
      {sorted === "asc"  ? <RiArrowUpLine    className="size-3.5" /> :
       sorted === "desc" ? <RiArrowDownLine   className="size-3.5" /> :
                           <RiArrowUpDownLine className="size-3.5 opacity-40" />}
    </button>
  )
}

// ─── Task columns ─────────────────────────────────────────────────────────────

const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={v => table.toggleAllPageRowsSelected(v === true)} aria-label="Select all" />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={v => row.toggleSelected(v === true)} aria-label="Select row" onClick={e => e.stopPropagation()} />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Task",
    cell: ({ row }) => <span className="font-mono text-xs text-muted-foreground">{row.getValue("id")}</span>,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableHeader column={column}>Title</SortableHeader>,
    cell: ({ row }) => {
      const label = row.original.label
      return (
        <div className="flex items-center gap-2 min-w-0">
          <Badge variant={labelVariants[label]}>{label}</Badge>
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
      return <StatusBadge variant={s.variant}>{s.label}</StatusBadge>
    },
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "priority",
    header: ({ column }) => <SortableHeader column={column}>Priority</SortableHeader>,
    cell: ({ row }) => {
      const p = priorityConfig[row.getValue("priority") as Priority]
      return <Badge variant={p.variant} icon={<p.icon />}>{p.label}</Badge>
    },
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="size-6"><AvatarFallback className="text-xs">{row.original.initials}</AvatarFallback></Avatar>
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
    filterFn: (row, id, value: string[]) => {
      if (value.length === 0) return true
      const raw = row.getValue(id) as string
      const date = new Date(raw)
      date.setHours(0, 0, 0, 0)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const status = row.original.status
      return value.some(preset => {
        if (preset === "overdue")    return date < today && status !== "done" && status !== "cancelled"
        if (preset === "today")      return date.getTime() === today.getTime()
        if (preset === "this-week") {
          const start = new Date(today)
          start.setDate(today.getDate() - today.getDay() + 1)
          const end = new Date(start)
          end.setDate(start.getDate() + 6)
          return date >= start && date <= end
        }
        if (preset === "next-7-days") {
          const end = new Date(today)
          end.setDate(today.getDate() + 7)
          return date >= today && date <= end
        }
        return false
      })
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Open actions" />}>
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

const STATUS_OPTIONS    = Object.entries(statusConfig).map(([value, { label }]) => ({ value, label }))
const PRIORITY_OPTIONS  = Object.entries(priorityConfig).map(([value, { label }]) => ({ value, label }))
const DUE_DATE_OPTIONS  = [
  { value: "overdue",     label: "Overdue"     },
  { value: "today",       label: "Due today"   },
  { value: "this-week",   label: "This week"   },
  { value: "next-7-days", label: "Next 7 days" },
]

// ─── Tasks table ──────────────────────────────────────────────────────────────

function TasksTable({ variant = "card" }: { variant?: "card" | "plain" | "bordered" }) {
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

  return (
    <div className="flex flex-col gap-4">
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
          <button
            onClick={() => setColumnFilters([])}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Reset
          </button>
        )}

        <div className="ml-auto flex items-center gap-2">
          {selectedCount > 0 && (
            <Button variant="destructive" size="sm" className="rounded-md" onClick={() => setRowSelection({})}>
              <RiDeleteBinLine />Delete {selectedCount}
            </Button>
          )}

          {/* Pagination style picker */}
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

      {/* Table */}
      {variant === "card" ? (
        <Card className="overflow-hidden p-0">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(hg => (
                <TableRow key={hg.id} className="hover:bg-transparent border-t">
                  {hg.headers.map(h => (
                    <TableHead key={h.id}>{h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}</TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">No tasks found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <DataTable table={table} variant={variant} emptyMessage="No tasks found." />
      )}

      <DataTablePagination table={table} style={paginationStyle} selectedCount={selectedCount} rowLabel="task" />
    </div>
  )
}

// ─── Student types & data ─────────────────────────────────────────────────────

type Student = {
  id: number
  name: string
  initials: string
  gender: "Male" | "Female"
  age: number
  class: string
  avgGrade: number | null
  missingDays: number
}

const STUDENTS: Student[] = [
  { id: 447, name: "Robert Fox",         initials: "RF", gender: "Male",   age: 17, class: "1A",  avgGrade: 9.3,  missingDays: 0  },
  { id: 877, name: "Marvin McKinney",    initials: "MM", gender: "Male",   age: 6,  class: "1B",  avgGrade: null, missingDays: 0  },
  { id: 556, name: "Darrell Steward",    initials: "DS", gender: "Female", age: 10, class: "4C",  avgGrade: 8.6,  missingDays: 6  },
  { id: 432, name: "Savannah Nguyen",    initials: "SN", gender: "Male",   age: 11, class: "4C",  avgGrade: 7.2,  missingDays: 6  },
  { id: 536, name: "Dianne Russell",     initials: "DR", gender: "Female", age: 16, class: "11B", avgGrade: 8.2,  missingDays: 10 },
  { id: 703, name: "Cody Fisher",        initials: "CF", gender: "Female", age: 11, class: "4A",  avgGrade: 5.2,  missingDays: 20 },
  { id: 922, name: "Leslie Alexander",   initials: "LA", gender: "Female", age: 12, class: "5A",  avgGrade: 6.5,  missingDays: 0  },
  { id: 540, name: "Albert Flores",      initials: "AF", gender: "Male",   age: 14, class: "7B",  avgGrade: 7.5,  missingDays: 0  },
  { id: 426, name: "Ralph Edwards",      initials: "RE", gender: "Male",   age: 17, class: "11C", avgGrade: 9.5,  missingDays: 1  },
  { id: 883, name: "Darlene Robertson",  initials: "DR", gender: "Female", age: 18, class: "1A",  avgGrade: 10.0, missingDays: 0  },
  { id: 312, name: "Jerome Bell",        initials: "JB", gender: "Male",   age: 15, class: "9B",  avgGrade: 8.1,  missingDays: 3  },
  { id: 654, name: "Kathryn Murphy",     initials: "KM", gender: "Female", age: 13, class: "6A",  avgGrade: 9.0,  missingDays: 2  },
  { id: 289, name: "Cameron Williamson", initials: "CW", gender: "Male",   age: 9,  class: "2B",  avgGrade: 7.8,  missingDays: 5  },
  { id: 751, name: "Brooklyn Simmons",   initials: "BS", gender: "Female", age: 14, class: "8C",  avgGrade: 6.3,  missingDays: 8  },
  { id: 498, name: "Theresa Webb",       initials: "TW", gender: "Female", age: 16, class: "10A", avgGrade: 8.9,  missingDays: 1  },
]

// ─── Student columns ──────────────────────────────────────────────────────────

const studentColumns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={v => table.toggleAllPageRowsSelected(v === true)} aria-label="Select all" />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={v => row.toggleSelected(v === true)} aria-label="Select row" onClick={e => e.stopPropagation()} />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="font-mono text-xs text-muted-foreground">{row.getValue("id")}</span>,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column}>Student</SortableHeader>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="size-7"><AvatarFallback className="text-xs">{row.original.initials}</AvatarFallback></Avatar>
        <span className="font-medium">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => <SortableHeader column={column}>Gender</SortableHeader>,
    cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("gender")}</span>,
    filterFn: (row, id, value: string[]) => value.length === 0 || value.includes(row.getValue(id)),
  },
  {
    accessorKey: "age",
    header: ({ column }) => <SortableHeader column={column}>Age</SortableHeader>,
    cell: ({ row }) => <span>{row.getValue("age")}</span>,
  },
  {
    accessorKey: "class",
    header: ({ column }) => <SortableHeader column={column}>Class</SortableHeader>,
    cell: ({ row }) => <span>{row.getValue("class")}</span>,
    filterFn: (row, id, value: string[]) => value.length === 0 || value.includes(row.getValue(id)),
  },
  {
    accessorKey: "avgGrade",
    header: ({ column }) => <SortableHeader column={column}>Avg. Grade</SortableHeader>,
    cell: ({ row }) => {
      const grade = row.getValue("avgGrade") as number | null
      return <span className={grade === null ? "text-muted-foreground" : ""}>{grade ?? "—"}</span>
    },
  },
  {
    accessorKey: "missingDays",
    header: ({ column }) => <SortableHeader column={column}>Missing Days</SortableHeader>,
    cell: ({ row }) => {
      const days = row.getValue("missingDays") as number
      return (
        <span className={days > 5 ? "text-destructive font-medium" : days > 0 ? "text-warning-dark" : "text-muted-foreground"}>
          {days}
        </span>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => (
      <div className="flex items-center gap-0.5">
        <Button variant="ghost" size="icon-sm" aria-label="Call"><RiPhoneLine /></Button>
        <Button variant="ghost" size="icon-sm" aria-label="Email"><RiMailLine /></Button>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="More actions" />}>
            <RiMore2Line className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuGroup>
              <DropdownMenuItem><RiEditLine />Edit</DropdownMenuItem>
              <DropdownMenuItem><RiCalendarLine />Enroll training</DropdownMenuItem>
              <DropdownMenuItem><RiGroupLine />Add to group</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive"><RiDeleteBinLine />Delete</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
]

// ─── Students table ───────────────────────────────────────────────────────────

function StudentsTable() {
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

  return (
    <div className="flex flex-col gap-4">
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
          {selectedCount > 0 && (
            <>
              <Button variant="outline" size="icon-sm" aria-label="Edit"><RiEditLine /></Button>
              <Button variant="outline" size="icon-sm" aria-label="Duplicate"><RiFileCopyLine /></Button>
              <Button variant="outline" size="icon-sm" aria-label="Add to group"><RiGroupLine /></Button>
              <Button variant="destructive" size="icon-sm" aria-label="Delete" onClick={() => setRowSelection({})}><RiDeleteBinLine /></Button>
              <div className="h-4 w-px bg-border" />
            </>
          )}
          <Button variant="outline" size="sm"><RiDownloadLine />Export data</Button>
          <Button size="sm"><RiAddLine />Add student</Button>
        </div>
      </DataTableToolbar>

      <DataTable table={table} variant="bordered" emptyMessage="No students found." />

      <DataTablePagination table={table} style="classic" selectedCount={selectedCount} rowLabel="student" />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type ContainerSize = "sm" | "default" | "lg" | "xl" | "full"

const containerSizes: { value: ContainerSize; label: string }[] = [
  { value: "sm",      label: "Small"   },
  { value: "default", label: "Default" },
  { value: "lg",      label: "Large"   },
  { value: "xl",      label: "X-Large" },
  { value: "full",    label: "Full"    },
]

export default function DataTable2Page() {
  const [containerSize, setContainerSize] = React.useState<ContainerSize>("xl")

  const content = (
    <>
      <PageHeader
        title="Tasks"
        description="Manage and track your team's tasks across all projects."
        actions={
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" aria-label="Change width" />}>
                <RiContractLeftRightLine />
                Width
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Content width</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {containerSizes.map(({ value, label }) => (
                    <DropdownMenuCheckboxItem key={value} checked={containerSize === value} onClick={() => setContainerSize(value)}>
                      {label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button><RiAddLine />New task</Button>
          </div>
        }
      />
      <Tabs defaultValue="plain">
        <div className="pb-4">
          <TabsList variant="underline">
            <TabsTrigger value="plain">No borders</TabsTrigger>
            <TabsTrigger value="bordered">Bordered rows</TabsTrigger>
            <TabsTrigger value="card">Card table</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="plain"    className="mt-4"><TasksTable variant="plain" /></TabsContent>
        <TabsContent value="bordered" className="mt-4"><TasksTable variant="bordered" /></TabsContent>
        <TabsContent value="card"     className="mt-4"><TasksTable variant="card" /></TabsContent>
        <TabsContent value="students" className="mt-4"><StudentsTable /></TabsContent>
      </Tabs>
    </>
  )

  return (
    <>
      <SiteHeader
        left={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Data Table 2</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        {containerSize === "full" ? (
          <div className="flex flex-col gap-6">{content}</div>
        ) : (
          <Container size={containerSize} className="flex flex-col gap-6">{content}</Container>
        )}
      </div>
    </>
  )
}
