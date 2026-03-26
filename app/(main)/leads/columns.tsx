"use client"

import type { ColumnDef } from "@tanstack/react-table"
import {
  RiDeleteBinLine,
  RiEditLine,
  RiMailLine,
  RiMore2Line,
  RiUserLine,
} from "@remixicon/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button }   from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Lead } from "./data"

export const columns: ColumnDef<Lead>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={v => table.toggleAllPageRowsSelected(v === true)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <div onClick={e => e.stopPropagation()}>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={v => row.toggleSelected(v === true)}
          aria-label="Select row"
        />
      </div>
    ),
    size: 40,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        <Avatar className="size-7 rounded-full">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback className="text-xs">{row.original.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <span className="font-medium text-sm">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "company",
    header: "COMPANIES",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="size-5 rounded-sm">
          <AvatarImage src={row.original.companyLogo} alt={row.original.company} />
          <AvatarFallback className="text-[10px] rounded-sm">{row.original.company.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <span className="text-sm">{row.original.company}</span>
      </div>
    ),
    filterFn: (row, _id, filterValues: string[]) =>
      filterValues.length === 0 || filterValues.includes(row.original.company),
  },
  {
    accessorKey: "jobTitle",
    header: "JOB TITLE",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.jobTitle}</span>,
    filterFn: (row, _id, filterValues: string[]) =>
      filterValues.length === 0 || filterValues.includes(row.original.jobTitle),
  },
  {
    accessorKey: "email",
    header: "EMAIL",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.email}</span>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => (
      <div onClick={e => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="ml-auto" />}>
            <RiMore2Line />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem><RiUserLine />View lead</DropdownMenuItem>
              <DropdownMenuItem><RiEditLine />Edit</DropdownMenuItem>
              <DropdownMenuItem><RiMailLine />Send email</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive"><RiDeleteBinLine />Delete</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    size: 48,
  },
]
