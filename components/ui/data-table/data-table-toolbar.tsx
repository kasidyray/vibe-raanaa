"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function DataTableToolbar({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2 py-3 min-w-0", className)}>
      {children}
    </div>
  )
}

export { DataTableToolbar }
