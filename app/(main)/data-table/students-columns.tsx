import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import {
  RiArrowDownLine,
  RiArrowUpDownLine,
  RiArrowUpLine,
  RiCalendarLine,
  RiDeleteBinLine,
  RiEditLine,
  RiGroupLine,
  RiMailLine,
  RiMore2Line,
  RiPhoneLine,
} from "@remixicon/react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button }   from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { type Student } from "./students-data"

// ─── Sortable header (local copy — avoids cross-file dep with tasks-columns) ──

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

// ─── Column definitions ───────────────────────────────────────────────────────

export const studentColumns: ColumnDef<Student>[] = [
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
