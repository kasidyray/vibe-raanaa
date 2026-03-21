"use client"

import * as React from "react"
import { flexRender, type Table } from "@tanstack/react-table"
import { RiSearchLine } from "@remixicon/react"

import { cn } from "@/lib/utils"
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty"
import { Button } from "@/components/ui/button"

export type DataTableVariant = "plain" | "bordered" | "card"

function DataTable<TData>({
  table,
  variant = "plain",
  className,
  emptyMessage = "Try adjusting your filters or search terms.",
  onRowClick,
}: {
  table: Table<TData>
  variant?: DataTableVariant
  className?: string
  emptyMessage?: string
  onRowClick?: (row: TData) => void
}) {
  const tableEl = (
    <UITable className={className}>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow
            key={headerGroup.id}
            className={cn(
              "hover:bg-transparent! hover:ring-0",
              variant !== "card" && "border-t",
              variant === "card" && "bg-muted/40"
            )}
          >
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
                className={cn(
                  "group/row border-0 hover:bg-transparent! data-[state=selected]:bg-transparent! hover:ring-1 hover:ring-inset hover:ring-border data-[state=selected]:ring-1 data-[state=selected]:ring-inset data-[state=selected]:ring-border",
                  variant !== "card" && "hover:rounded-md data-[state=selected]:rounded-md",
                  onRowClick && "cursor-pointer"
                )}
                onClick={onRowClick ? () => onRowClick(row.original) : undefined}
              >
                {cells.map((cell, i) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "group-hover/row:bg-accent/30 group-data-[state=selected]/row:bg-muted",
                      variant !== "card" && i === 0 && "group-hover/row:rounded-l-md group-data-[state=selected]/row:rounded-l-md",
                      variant !== "card" && i === cells.length - 1 && "group-hover/row:rounded-r-md group-data-[state=selected]/row:rounded-r-md",
                      "border-b border-border group-hover/row:border-b-transparent group-data-[state=selected]/row:border-b-transparent [tr:has(+tr:hover)_&]:border-b-transparent [tr:has(+tr[data-state=selected])_&]:border-b-transparent [tbody_tr:last-child_&]:border-b-0",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            )
          })
        ) : (
          <TableRow className="hover:bg-transparent! hover:ring-0">
            <TableCell colSpan={table.getAllColumns().length} className="p-0 pt-3">
              {(() => {
                const query = (table.getState().globalFilter as string) || ""
                return (
                  <Empty className="py-16 bg-muted/50">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <RiSearchLine />
                      </EmptyMedia>
                      <EmptyTitle>No results found</EmptyTitle>
                      <EmptyDescription>
                        {query ? <>No results found for <strong>&ldquo;{query}&rdquo;</strong></> : emptyMessage}
                      </EmptyDescription>
                    </EmptyHeader>
                    {query && (
                      <EmptyContent>
                        <Button variant="outline" size="sm" onClick={() => table.setGlobalFilter("")}>
                          Clear search
                        </Button>
                      </EmptyContent>
                    )}
                  </Empty>
                )
              })()}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </UITable>
  )

  if (variant === "card") {
    return <Card className="overflow-hidden p-0">{tableEl}</Card>
  }
  return tableEl
}

export { DataTable }
