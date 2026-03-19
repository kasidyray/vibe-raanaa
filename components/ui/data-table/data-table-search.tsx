"use client"

import * as React from "react"
import { type Table } from "@tanstack/react-table"
import { RiSearchLine } from "@remixicon/react"

import { cn } from "@/lib/utils"

function DataTableSearch<TData>({
  table,
  placeholder = "Search...",
  className,
}: {
  table: Table<TData>
  placeholder?: string
  className?: string
}) {
  return (
    <div className={cn("relative flex-1 min-w-[140px] max-w-[220px]", className)}>
      <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
      <input
        placeholder={placeholder}
        value={(table.getState().globalFilter as string) ?? ""}
        onChange={e => table.setGlobalFilter(e.target.value)}
        className="h-8 w-full rounded-md border border-input bg-transparent pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring"
      />
    </div>
  )
}

export { DataTableSearch }
