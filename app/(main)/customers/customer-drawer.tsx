"use client"

import { RiBankCardLine } from "@remixicon/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"

import { type Customer, formatCurrency, formatDate } from "./data"

type Props = {
  customer: Customer | null
  onClose: () => void
}

export function CustomerDrawer({ customer, onClose }: Props) {
  return (
    <Drawer open={!!customer} onOpenChange={(open) => !open && onClose()} direction="right">
      <DrawerContent className="overflow-y-auto">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <DrawerHeader className="items-start">
          <div className="flex items-center gap-3 min-w-0">
            {customer && (() => {
              const firstName = customer.name.split(" ")[0]
              const avatarUrl = `https://api.dicebear.com/9.x/micah/svg?seed=${encodeURIComponent(firstName)}`
              return (
                <Avatar className="size-10 rounded-full shrink-0">
                  <AvatarImage src={avatarUrl} alt={customer.name} />
                  <AvatarFallback>{firstName[0]}</AvatarFallback>
                </Avatar>
              )
            })()}
            <div className="flex flex-col min-w-0">
              <DrawerTitle className="text-base font-semibold leading-tight truncate">
                {customer?.name}
              </DrawerTitle>
              <span className="text-sm text-muted-foreground truncate">{customer?.email}</span>
              <span className="font-mono text-xs text-muted-foreground">{customer?.id}</span>
            </div>
          </div>
          <DrawerClose />
        </DrawerHeader>

        {customer && (
          <div className="flex flex-col gap-6 p-4">
            {/* ── Overview ─────────────────────────────────────────────── */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Overview
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground">Total spend</span>
                  <span className="text-sm font-medium">{formatCurrency(customer.totalSpend)}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground">Payments</span>
                  <span className="text-sm font-medium tabular-nums">{customer.payments}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground">Refunds</span>
                  <span
                    className={`text-sm font-medium tabular-nums${customer.refunds > 0 ? " text-destructive" : ""}`}
                  >
                    {formatCurrency(customer.refunds)}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground">Dispute losses</span>
                  <span
                    className={`text-sm font-medium tabular-nums${customer.disputeLosses > 0 ? " text-destructive" : ""}`}
                  >
                    {formatCurrency(customer.disputeLosses)}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Payment method ───────────────────────────────────────── */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Payment method
              </span>
              {customer.defaultPaymentMethod === null ? (
                <span className="text-sm text-muted-foreground">No payment method on file</span>
              ) : (
                <div className="flex items-center gap-2">
                  <RiBankCardLine className="size-4 text-muted-foreground shrink-0" />
                  <span className="text-sm">{customer.defaultPaymentMethod}</span>
                  <Badge variant="neutral" size="sm">Default</Badge>
                </div>
              )}
            </div>

            {/* ── Details ──────────────────────────────────────────────── */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Details
              </span>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-muted-foreground">Customer since</span>
                  <span className="text-sm tabular-nums">{formatDate(customer.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-muted-foreground">Last payment</span>
                  <span className="text-sm tabular-nums">
                    {customer.lastPayment ? formatDate(customer.lastPayment) : "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  )
}
