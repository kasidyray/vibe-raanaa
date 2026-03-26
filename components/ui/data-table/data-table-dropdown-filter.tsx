"use client"

import * as React from "react"
import { RiArrowDownSLine, RiCloseLine } from "@remixicon/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Option = { value: string; label: string }

function DataTableDropdownFilter({
  title,
  icon,
  options,
  value,
  defaultValue = options[0]?.value,
  onValueChange,
}: {
  title: string
  icon?: React.ReactNode
  options: Option[]
  value: string
  defaultValue?: string
  onValueChange: (value: string) => void
}) {
  const isActive = value !== defaultValue
  const selectedLabel = options.find(o => o.value === value)?.label ?? title

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "rounded-full",
            isActive && "border-primary/40 border-dashed bg-primary/5 text-foreground"
          )}
        />
      }>
        {icon}
        {selectedLabel}
        {isActive ? (
          <span
            role="button"
            aria-label="Clear filter"
            onClick={e => { e.stopPropagation(); onValueChange(defaultValue) }}
            className="ml-0.5 flex size-4 items-center justify-center rounded-full hover:bg-primary/20 transition-colors"
          >
            <RiCloseLine className="size-3" />
          </span>
        ) : (
          <RiArrowDownSLine className="opacity-60" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {options.map(option => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { DataTableDropdownFilter }
