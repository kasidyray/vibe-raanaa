"use client"

import * as React from "react"
import { type Table } from "@tanstack/react-table"
import {
  RiArrowLeftDoubleLine,
  RiArrowLeftLine,
  RiArrowRightDoubleLine,
  RiArrowRightLine,
} from "@remixicon/react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"

export type PaginationStyle = "minimal" | "numbered" | "full" | "simple" | "classic"

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50]

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total]
  if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total]
  return [1, "…", current - 1, current, current + 1, "…", total]
}

function DataTablePagination<TData>({
  table,
  style = "minimal",
  selectedCount = 0,
  rowLabel = "row",
}: {
  table: Table<TData>
  style?: PaginationStyle
  /** Pass selected row count for the info label */
  selectedCount?: number
  /** Singular label for rows e.g. "task", "lead", "student" */
  rowLabel?: string
}) {
  const pageIndex  = table.getState().pagination.pageIndex
  const pageSize   = table.getState().pagination.pageSize
  const totalRows  = table.getFilteredRowModel().rows.length
  const from       = pageIndex * pageSize + 1
  const to         = Math.min((pageIndex + 1) * pageSize, totalRows)
  const pageCount  = table.getPageCount()
  const canPrev    = table.getCanPreviousPage()
  const canNext    = table.getCanNextPage()

  if (totalRows === 0) return null

  const infoLabel = selectedCount > 0
    ? `${selectedCount} of ${totalRows} selected`
    : `${totalRows} ${rowLabel}${totalRows !== 1 ? "s" : ""}`

  if (style === "minimal") {
    return (
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="text-xs">{infoLabel}</span>
        <div className="flex items-center gap-1">
          <span className="mr-2 text-xs">Page {pageIndex + 1} of {pageCount}</span>
          <Button variant="outline" size="icon-sm" onClick={() => table.previousPage()} disabled={!canPrev}>
            <RiArrowLeftLine />
          </Button>
          <Button variant="outline" size="icon-sm" onClick={() => table.nextPage()} disabled={!canNext}>
            <RiArrowRightLine />
          </Button>
        </div>
      </div>
    )
  }

  if (style === "numbered") {
    return (
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="text-xs">{infoLabel}</span>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon-sm" onClick={() => table.previousPage()} disabled={!canPrev}>
            <RiArrowLeftLine />
          </Button>
          {getPageNumbers(pageIndex + 1, pageCount).map((p, i) =>
            p === "…" ? (
              <span key={`ellipsis-${i}`} className="px-1 text-muted-foreground">…</span>
            ) : (
              <Button
                key={p}
                variant={p === pageIndex + 1 ? "default" : "outline"}
                size="icon-sm"
                onClick={() => table.setPageIndex((p as number) - 1)}
              >
                {p}
              </Button>
            )
          )}
          <Button variant="outline" size="icon-sm" onClick={() => table.nextPage()} disabled={!canNext}>
            <RiArrowRightLine />
          </Button>
        </div>
      </div>
    )
  }

  if (style === "full") {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="text-xs">Rows per page</span>
          <Select value={String(pageSize)} onValueChange={v => table.setPageSize(Number(v))}>
            <SelectTrigger className="h-8 w-16 text-xs">{pageSize}</SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {PAGE_SIZE_OPTIONS.map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs">{from}–{to} of {totalRows}</span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon-sm" onClick={() => table.setPageIndex(0)} disabled={!canPrev}>
              <RiArrowLeftDoubleLine />
            </Button>
            <Button variant="outline" size="icon-sm" onClick={() => table.previousPage()} disabled={!canPrev}>
              <RiArrowLeftLine />
            </Button>
            <Button variant="outline" size="icon-sm" onClick={() => table.nextPage()} disabled={!canNext}>
              <RiArrowRightLine />
            </Button>
            <Button variant="outline" size="icon-sm" onClick={() => table.setPageIndex(pageCount - 1)} disabled={!canNext}>
              <RiArrowRightDoubleLine />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (style === "simple") {
    return (
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">{from}–{to}</span>
          {" "}of{" "}
          <span className="font-medium text-foreground">{totalRows}</span> results
        </span>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => table.previousPage()} disabled={!canPrev}>
            <RiArrowLeftLine /> Previous
          </Button>
          <Button variant="ghost" size="sm" onClick={() => table.nextPage()} disabled={!canNext}>
            Next <RiArrowRightLine />
          </Button>
        </div>
      </div>
    )
  }

  // classic
  return (
    <div className="grid grid-cols-3 items-center text-sm text-muted-foreground">
      <span className="text-xs">{from}–{to} of {totalRows}</span>
      <div className="flex items-center justify-center gap-1">
        <Button variant="outline" size="icon-sm" className="rounded-full" onClick={() => table.previousPage()} disabled={!canPrev}>
          <RiArrowLeftLine />
        </Button>
        {getPageNumbers(pageIndex + 1, pageCount).map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="w-8 text-center text-xs">···</span>
          ) : (
            <Button
              key={p}
              variant={p === pageIndex + 1 ? "secondary" : "outline"}
              size="icon-sm"
              className="rounded-full"
              onClick={() => table.setPageIndex((p as number) - 1)}
            >
              {p}
            </Button>
          )
        )}
        <Button variant="outline" size="icon-sm" className="rounded-full" onClick={() => table.nextPage()} disabled={!canNext}>
          <RiArrowRightLine />
        </Button>
      </div>
      <div className="flex items-center justify-end gap-2">
        <span className="text-xs">Rows</span>
        <Select value={String(pageSize)} onValueChange={v => table.setPageSize(Number(v))}>
          <SelectTrigger className="h-8 w-16 text-xs">{pageSize}</SelectTrigger>
          <SelectContent align="end">
            <SelectGroup>
              {PAGE_SIZE_OPTIONS.map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export { DataTablePagination }
