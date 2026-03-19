"use client"

import * as React from "react"
import { type Table } from "@tanstack/react-table"
import { RiSettings3Line } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function DataTableColumnToggle<TData>({
  table,
  columnLabels = {},
}: {
  table: Table<TData>
  /** Override display labels for specific column IDs e.g. `{ dueDate: "Due date" }` */
  columnLabels?: Record<string, string>
}) {
  const hidable = table.getAllColumns().filter(col => col.getCanHide())

  function getLabel(id: string) {
    if (columnLabels[id]) return columnLabels[id]
    return id.charAt(0).toUpperCase() + id.slice(1).replace(/([A-Z])/g, " $1")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="rounded-md" />}>
        <RiSettings3Line />
        Columns
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuGroup>
          {hidable.map(col => (
            <DropdownMenuCheckboxItem
              key={col.id}
              checked={col.getIsVisible()}
              onClick={() => col.toggleVisibility(!col.getIsVisible())}
            >
              {getLabel(col.id)}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { DataTableColumnToggle }
