"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import {
  RiBankCardLine,
  RiMore2Line,
} from "@remixicon/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { type Customer, formatCurrency, formatDate } from "./data"

export function buildColumns(onRowClick: (c: Customer) => void): ColumnDef<Customer>[] {
  return [
    // ── Select ──────────────────────────────────────────────────────────────
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(v === true)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="Select row"
          onClick={(e) => e.stopPropagation()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    // ── Name ─────────────────────────────────────────────────────────────────
    {
      accessorKey: "name",
      header: "NAME",
      cell: ({ row }) => {
        const firstName = row.original.name.split(" ")[0]
        const avatarUrl = `https://api.dicebear.com/9.x/micah/svg?seed=${encodeURIComponent(firstName)}`
        return (
          <div className="flex items-center gap-2.5">
            <Avatar className="size-7 rounded-full shrink-0">
              <AvatarImage src={avatarUrl} alt={row.original.name} />
              <AvatarFallback className="text-xs">{firstName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate">{row.original.name}</span>
              <span className="font-mono text-xs text-muted-foreground">{row.original.id}</span>
            </div>
          </div>
        )
      },
    },

    // ── Email ─────────────────────────────────────────────────────────────────
    {
      accessorKey: "email",
      header: "EMAIL",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">{row.original.email}</span>
      ),
    },

    // ── Default payment method ────────────────────────────────────────────────
    {
      accessorKey: "defaultPaymentMethod",
      header: "PAYMENT METHOD",
      filterFn: (row, _id, filterValues: string[]) =>
        filterValues.length === 0 ||
        (row.original.defaultPaymentMethod !== null &&
          filterValues.includes(row.original.defaultPaymentMethod)),
      cell: ({ row }) => {
        const method = row.original.defaultPaymentMethod
        if (!method) {
          return <span className="text-sm text-muted-foreground">—</span>
        }
        return (
          <div className="flex items-center gap-1.5 text-sm">
            <RiBankCardLine className="size-4 text-muted-foreground shrink-0" />
            <span>{method}</span>
          </div>
        )
      },
    },

    // ── Total spend ───────────────────────────────────────────────────────────
    {
      accessorKey: "totalSpend",
      header: "TOTAL SPEND",
      cell: ({ row }) => (
        <span className="text-sm tabular-nums">{formatCurrency(row.original.totalSpend)}</span>
      ),
    },

    // ── Payments ──────────────────────────────────────────────────────────────
    {
      accessorKey: "payments",
      header: "PAYMENTS",
      cell: ({ row }) => (
        <span className="text-sm tabular-nums">{row.original.payments}</span>
      ),
    },

    // ── Refunds ───────────────────────────────────────────────────────────────
    {
      accessorKey: "refunds",
      header: "REFUNDS",
      cell: ({ row }) => {
        const val = row.original.refunds
        return (
          <span className={`text-sm tabular-nums${val > 0 ? " text-destructive" : ""}`}>
            {formatCurrency(val)}
          </span>
        )
      },
    },

    // ── Dispute losses ────────────────────────────────────────────────────────
    {
      accessorKey: "disputeLosses",
      header: "DISPUTE LOSSES",
      cell: ({ row }) => {
        const val = row.original.disputeLosses
        return (
          <span className={`text-sm tabular-nums${val > 0 ? " text-destructive" : ""}`}>
            {formatCurrency(val)}
          </span>
        )
      },
    },

    // ── Last payment ──────────────────────────────────────────────────────────
    {
      accessorKey: "lastPayment",
      header: "LAST PAYMENT",
      cell: ({ row }) => {
        const val = row.original.lastPayment
        return (
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {val ? formatDate(val) : "—"}
          </span>
        )
      },
    },

    // ── Created ───────────────────────────────────────────────────────────────
    {
      accessorKey: "createdAt",
      header: "CREATED",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {formatDate(row.original.createdAt)}
        </span>
      ),
    },

    // ── Type (hidden — used only for filtering) ───────────────────────────────
    {
      accessorKey: "type",
      header: "TYPE",
      enableHiding: true,
      filterFn: (row, _id, filterValues: string[]) =>
        filterValues.length === 0 || filterValues.includes(row.original.type),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground capitalize">{row.original.type}</span>
      ),
    },

    // ── Actions ───────────────────────────────────────────────────────────────
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Row actions"
                  onClick={(e) => e.stopPropagation()}
                  className="opacity-0 group-hover/row:opacity-100 data-[state=open]:opacity-100 transition-opacity"
                />
              }
            >
              <RiMore2Line />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onRowClick(row.original) }}>
                View details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  navigator.clipboard.writeText(row.original.email)
                }}
              >
                Copy email
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  navigator.clipboard.writeText(row.original.id)
                }}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={(e) => e.stopPropagation()}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]
}
