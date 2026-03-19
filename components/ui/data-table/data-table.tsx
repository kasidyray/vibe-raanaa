"use client"

import * as React from "react"
import { flexRender, type Table } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type DataTableVariant = "plain" | "bordered"

function DataTable<TData>({
  table,
  variant = "plain",
  className,
  emptyMessage = "No results.",
  onRowClick,
}: {
  table: Table<TData>
  variant?: DataTableVariant
  className?: string
  emptyMessage?: string
  onRowClick?: (row: TData) => void
}) {
  return (
    <UITable className={className}>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id} className="hover:bg-transparent! hover:ring-0 border-t">
            {headerGroup.headers.map(header => (
              <TableHead key={header.id} style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map(row => {
            const cells = row.getVisibleCells()
            return (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
                className={cn("group/row border-0 hover:bg-transparent! data-[state=selected]:bg-transparent! hover:ring-1 hover:ring-inset hover:ring-border hover:rounded-md data-[state=selected]:ring-1 data-[state=selected]:ring-inset data-[state=selected]:ring-border data-[state=selected]:rounded-md", onRowClick && "cursor-pointer")}
                onClick={onRowClick ? () => onRowClick(row.original) : undefined}
              >
                {cells.map((cell, i) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "group-hover/row:bg-primary/3 group-data-[state=selected]/row:bg-muted",
                      i === 0 && "group-hover/row:rounded-l-md group-data-[state=selected]/row:rounded-l-md",
                      i === cells.length - 1 && "group-hover/row:rounded-r-md group-data-[state=selected]/row:rounded-r-md",
                      variant === "bordered" && "border-b border-border group-hover/row:border-b-transparent group-data-[state=selected]/row:border-b-transparent [tr:has(+tr:hover)_&]:border-b-transparent [tr:has(+tr[data-state=selected])_&]:border-b-transparent",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            )
          })
        ) : (
          <TableRow>
            <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center text-muted-foreground">
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </UITable>
  )
}

export { DataTable }
