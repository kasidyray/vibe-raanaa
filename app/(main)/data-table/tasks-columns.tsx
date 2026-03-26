import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import {
  RiArrowDownLine,
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
} from "@remixicon/react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge }      from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button }     from "@/components/ui/button"
import { Checkbox }   from "@/components/ui/checkbox"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  type Task, type Status, type Priority,
  statusConfig, priorityConfig, labelVariants,
} from "./tasks-data"

// ─── Icon maps (icons can't live in .ts files) ────────────────────────────────

const statusIcons: Record<Status, React.ElementType> = {
  "todo":        RiArrowUpDownLine,
  "in-progress": RiLoader4Line,
  "in-review":   RiEyeLine,
  "done":        RiCheckboxCircleLine,
  "cancelled":   RiCloseCircleLine,
}

const priorityIcons: Record<Priority, React.ElementType> = {
  "urgent": RiArrowUpLine,
  "high":   RiArrowUpLine,
  "medium": RiArrowUpDownLine,
  "low":    RiArrowDownLine,
}

// ─── Shared sortable header ───────────────────────────────────────────────────

export function SortableHeader({ column, children }: {
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

// ─── Column definitions ───────────────────────────────────────────────────────

export const columns: ColumnDef<Task>[] = [
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
      const key = row.getValue("priority") as Priority
      const p   = priorityConfig[key]
      const Icon = priorityIcons[key]
      return <Badge variant={p.variant} icon={<Icon />}>{p.label}</Badge>
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
      const date  = new Date(row.getValue("dueDate") as string)
      const isPast = date < new Date() && row.original.status !== "done" && row.original.status !== "cancelled"
      return (
        <span className={isPast ? "text-destructive font-medium" : "text-muted-foreground"}>
          {date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      )
    },
    filterFn: (row, id, value: string[]) => {
      if (value.length === 0) return true
      const date = new Date(row.getValue(id) as string)
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
