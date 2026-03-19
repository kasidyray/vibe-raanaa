"use client"

import * as React from "react"
import { RiCloseLine, RiFilterLine, RiSearchLine } from "@remixicon/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type Option = { value: string; label: string }

function DataTableFacetedFilter({
  title,
  options,
  selectedValues,
  onSelectionChange,
  icon,
}: {
  title: string
  /** Pass `string[]` for simple lists, or `{ value, label }[]` for distinct display labels. */
  options: string[] | Option[]
  selectedValues: string[]
  onSelectionChange: (values: string[]) => void
  icon?: React.ReactNode
}) {
  const [search, setSearch] = React.useState("")

  const normalised: Option[] = (options as any[]).map(o =>
    typeof o === "string" ? { value: o, label: o } : o
  )

  const filtered = normalised.filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase())
  )

  const count = selectedValues.length

  function toggle(value: string) {
    const next = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value]
    onSelectionChange(next)
  }

  return (
    <Popover>
      <PopoverTrigger render={
        <Button
          variant="outline"
          size="sm"
          className={cn("rounded-md", count > 0 && "border-primary/40 bg-primary/5 text-foreground")}
        >
          {icon ?? <RiFilterLine className="opacity-60" />}
          {title}
          {count > 0 && (
            <span className="ml-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
              {count}
            </span>
          )}
          {count > 0 && (
            <span
              role="button"
              aria-label="Clear filter"
              onClick={e => { e.stopPropagation(); onSelectionChange([]) }}
              className="ml-0.5 flex size-4 items-center justify-center rounded-full hover:bg-primary/20 transition-colors"
            >
              <RiCloseLine className="size-3" />
            </span>
          )}
        </Button>
      } />
      <PopoverContent className="w-52 gap-0 p-0" align="start" sideOffset={6}>
        <div className="relative border-b">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <input
            autoFocus
            placeholder={title}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-transparent py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="max-h-60 overflow-y-auto p-1">
          {filtered.length ? filtered.map(option => (
            <button
              key={option.value}
              onClick={() => toggle(option.value)}
              className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-accent text-left"
            >
              <Checkbox
                checked={selectedValues.includes(option.value)}
                tabIndex={-1}
                className="pointer-events-none"
              />
              {option.label}
            </button>
          )) : (
            <p className="py-6 text-center text-xs text-muted-foreground">No results.</p>
          )}
        </div>
        {count > 0 && (
          <div className="border-t p-1">
            <button
              onClick={() => onSelectionChange([])}
              className="w-full rounded-md px-2 py-1.5 text-center text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              Clear filter
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export { DataTableFacetedFilter }
