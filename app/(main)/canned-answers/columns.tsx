import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { RiCheckLine, RiCloseLine } from "@remixicon/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { type Answer } from "./data"

export function buildColumns(onRowClick: (row: Answer) => void): ColumnDef<Answer>[] {
  return [
    {
      accessorKey: "date",
      header: "DATE",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground whitespace-nowrap">{row.original.date}</span>
      ),
    },
    {
      accessorKey: "topic",
      header: "TOPIC",
      cell: ({ row }) => (
        <span className="text-sm truncate max-w-40 block">{row.original.topic}</span>
      ),
    },
    {
      accessorKey: "prompt",
      header: "PROMPT",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground truncate max-w-xs block">{row.original.prompt}</span>
      ),
    },
    {
      accessorKey: "mentioned",
      header: "MENTIONED?",
      cell: ({ row }) =>
        row.original.mentioned ? (
          <Badge variant="success"  size="sm" icon={<RiCheckLine />}>Yes</Badge>
        ) : (
          <Badge variant="critical" size="sm" icon={<RiCloseLine />}>No</Badge>
        ),
    },
    {
      accessorKey: "position",
      header: "POSITION",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground tabular-nums">
          {row.original.position ?? "—"}
        </span>
      ),
    },
    {
      id: "allMentions",
      header: "ALL MENTIONS",
      cell: ({ row }) => {
        const { competitors } = row.original
        if (competitors.length === 0) {
          return <span className="text-xs text-muted-foreground">No mentions</span>
        }
        const visible  = competitors.slice(0, 4)
        const overflow = competitors.length - 4
        return (
          <div className="flex items-center -space-x-1.5">
            {visible.map((comp) => (
              <Avatar key={comp.name} className="size-6 ring-2 ring-background rounded-full">
                <AvatarImage src={comp.logo} alt={comp.name} />
                <AvatarFallback className="text-[9px]">{comp.name[0]}</AvatarFallback>
              </Avatar>
            ))}
            {overflow > 0 && (
              <div className="size-6 rounded-full ring-2 ring-background bg-muted flex items-center justify-center">
                <span className="text-[9px] font-medium text-muted-foreground">+{overflow}</span>
              </div>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "response",
      header: "RESPONSE",
      cell: ({ row }) => (
        <button
          onClick={() => onRowClick(row.original)}
          className="text-sm text-muted-foreground truncate max-w-[220px] block text-left hover:text-foreground transition-colors"
        >
          {row.original.response}
        </button>
      ),
    },
    {
      id: "platform",
      accessorKey: "platform",
      header: "PLATFORM",
      cell: ({ row }) => <Badge variant="neutral" size="sm">{row.original.platform}</Badge>,
    },
  ]
}
