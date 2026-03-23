"use client"

import * as React from "react"
import { format } from "date-fns"
import { RiCalendarLine, RiCloseLine } from "@remixicon/react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type DatePickerProps = {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled,
  className,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger
        disabled={disabled}
        className={cn(
          "flex h-10 w-full items-center gap-2 rounded-lg border border-input bg-input/30 px-3 text-sm transition-colors outline-none input-focus-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !value && "text-muted-foreground",
          className
        )}
      >
        <RiCalendarLine className="size-4 shrink-0 text-muted-foreground" />
        <span className="flex-1 text-left">
          {value ? format(value, "PPP") : placeholder}
        </span>
        {value && (
          <button
            type="button"
            aria-label="Clear date"
            onClick={e => {
              e.stopPropagation()
              onChange?.(undefined)
            }}
            className="shrink-0 text-muted-foreground/60 hover:text-foreground transition-colors"
          >
            <RiCloseLine className="size-3.5" />
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  )
}
