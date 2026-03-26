"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import {
  RiCodeLine,
  RiRefreshLine,
} from "@remixicon/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"

import {
  type ActivityEvent,
  categoryConfig,
  statusConfig,
  formatRelativeTime,
} from "./data"

export const columns: ColumnDef<ActivityEvent>[] = [
  {
    accessorKey: "eventName",
    header: "EVENT",
    cell: ({ row }) => {
      const cat = categoryConfig[row.original.category]
      return (
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="shrink-0 flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground [&>svg]:size-3.5">
            {cat.icon}
          </span>
          <span className="font-medium text-sm truncate">{row.original.eventName}</span>
        </div>
      )
    },
  },
  {
    id: "actorName",
    accessorFn: row => row.actor.name,
    header: "ACTOR",
    cell: ({ row }) => {
      const actor = row.original.actor
      return (
        <div className="flex items-center gap-2 min-w-0">
          {actor.type !== "user" ? (
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground [&>svg]:size-3">
              {actor.type === "api" ? <RiCodeLine /> : <RiRefreshLine />}
            </span>
          ) : (
            <Avatar className="size-6 rounded-full shrink-0">
              <AvatarImage src={actor.avatar} alt={actor.name} />
              <AvatarFallback className="text-[10px]">{actor.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
          )}
          <span className="text-sm truncate">{actor.name}</span>
        </div>
      )
    },
    filterFn: (row, _id, filterValues: string[]) =>
      filterValues.length === 0 || filterValues.includes(row.original.actor.name),
  },
  {
    id: "target",
    accessorFn: row => row.target.name,
    header: "RESOURCE",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 min-w-0 max-w-[220px]">
        <span className="text-[10px] font-medium text-muted-foreground shrink-0 uppercase tracking-wider">{row.original.target.type}</span>
        <span className="text-muted-foreground shrink-0">·</span>
        <span className="text-sm truncate">{row.original.target.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
    cell: ({ row }) => {
      const cat = categoryConfig[row.original.category]
      return <Badge variant={cat.badgeVariant}>{cat.label}</Badge>
    },
    filterFn: (row, _id, filterValues: string[]) =>
      filterValues.length === 0 || filterValues.includes(row.original.category),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const s = statusConfig[row.original.status]
      return <StatusBadge variant={s.variant}>{s.label}</StatusBadge>
    },
    filterFn: (row, _id, filterValues: string[]) =>
      filterValues.length === 0 || filterValues.includes(row.original.status),
  },
  {
    accessorKey: "timestamp",
    header: "TIME",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        {formatRelativeTime(row.original.timestamp)}
      </span>
    ),
    sortingFn: "datetime",
  },
]
