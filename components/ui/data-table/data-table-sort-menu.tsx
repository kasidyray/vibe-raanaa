"use client"

import * as React from "react"
import { type SortingState } from "@tanstack/react-table"
import { RiArrowDownSLine, RiArrowUpDownLine } from "@remixicon/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

type SortColumn = { id: string; label: string }

function DataTableSortMenu({
  sorting,
  onSortingChange,
  columns,
}: {
  sorting: SortingState
  onSortingChange: (sorting: SortingState) => void
  columns: SortColumn[]
}) {
  const current = sorting[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={
        <Button
          variant="outline"
          size="sm"
        />
      }>
        <RiArrowUpDownLine className="opacity-60" />
        {current
          ? `${columns.find(c => c.id === current.id)?.label ?? current.id} ${current.desc ? "↓" : "↑"}`
          : "Sort by"}
        <RiArrowDownSLine className="opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {columns.map(col => (
            <React.Fragment key={col.id}>
              <DropdownMenuCheckboxItem
                checked={current?.id === col.id && !current?.desc}
                onClick={() => onSortingChange([{ id: col.id, desc: false }])}
              >
                {col.label} ↑
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={current?.id === col.id && current?.desc}
                onClick={() => onSortingChange([{ id: col.id, desc: true }])}
              >
                {col.label} ↓
              </DropdownMenuCheckboxItem>
            </React.Fragment>
          ))}
          {current && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onSortingChange([])}>
                Clear sort
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { DataTableSortMenu }
