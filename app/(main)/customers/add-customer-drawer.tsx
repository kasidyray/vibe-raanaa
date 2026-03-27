"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  RiBankCardLine,
  RiBuilding2Line,

  RiExchangeFundsLine,
  RiUserLine,
} from "@remixicon/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type Customer, type CustomerType, type PaymentMethod } from "./data"

// ─── Payment method options ────────────────────────────────────────────────────

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; icon: React.ElementType }[] = [
  { value: "Visa",          label: "Visa",          icon: RiBankCardLine      },
  { value: "Mastercard",    label: "Mastercard",    icon: RiBankCardLine      },
  { value: "Amex",          label: "Amex",          icon: RiBankCardLine      },
  { value: "Bank transfer", label: "Bank transfer", icon: RiExchangeFundsLine },
]

// ─── SelectCard ───────────────────────────────────────────────────────────────

function SelectCard({
  selected,
  onClick,
  icon: Icon,
  label,
}: {
  selected: boolean
  onClick: () => void
  icon: React.ElementType
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left text-sm transition-colors w-full",
        selected
          ? "border-primary/40 bg-primary/5"
          : "border-border bg-card hover:bg-accent/50",
      )}
    >
      <div className={cn(
        "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors",
        selected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
      )}>
        <Icon className="size-3.5" />
      </div>
      <span className="font-medium">{label}</span>
      {selected && (
        <div className="ml-auto w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
        </div>
      )}
    </button>
  )
}

// ─── AddCustomerDrawer ────────────────────────────────────────────────────────

type Props = {
  open: boolean
  onClose: () => void
  onAdd: (customer: Customer) => void
}

export function AddCustomerDrawer({ open, onClose, onAdd }: Props) {
  const [name,          setName]          = React.useState("")
  const [email,         setEmail]         = React.useState("")
  const [customerType,  setCustomerType]  = React.useState<CustomerType>("individual")
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod | "">("")
  const [nameError,     setNameError]     = React.useState("")
  const [emailError,    setEmailError]    = React.useState("")
  const [isPending,     setIsPending]     = React.useState(false)

  function reset() {
    setName("")
    setEmail("")
    setCustomerType("individual")
    setPaymentMethod("")
    setNameError("")
    setEmailError("")
    setIsPending(false)
  }

  function handleClose() {
    reset()
    onClose()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    let hasError = false
    if (!name.trim()) {
      setNameError("Name is required")
      hasError = true
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Valid email is required")
      hasError = true
    }
    if (hasError) return

    setIsPending(true)
    await new Promise(r => setTimeout(r, 700))

    const newCustomer: Customer = {
      id:                   `cus_${Date.now()}`,
      name:                 name.trim(),
      email:                email.trim(),
      type:                 customerType,
      defaultPaymentMethod: paymentMethod || null,
      totalSpend:           0,
      payments:             0,
      refunds:              0,
      disputeLosses:        0,
      lastPayment:          null,
      createdAt:            new Date().toISOString(),
    }

    setIsPending(false)
    onAdd(newCustomer)
    toast.success(`${newCustomer.name} added as a customer`)
    reset()
    onClose()
  }

  return (
    <Drawer open={open} onOpenChange={(open) => !open && handleClose()} direction="right">
      <DrawerContent className="overflow-y-auto">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <DrawerHeader>
          <DrawerTitle className="text-base font-semibold">Add customer</DrawerTitle>
          <DrawerClose />
        </DrawerHeader>

        {/* ── Form ──────────────────────────────────────────────────────── */}
        <form
          id="add-customer-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 p-4 flex-1"
        >
          {/* Identity */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Identity
            </span>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cus-name">Full name</Label>
              <Input
                id="cus-name"
                value={name}
                onChange={e => { setName(e.target.value); setNameError("") }}
                placeholder="e.g. Amara Okafor"
                aria-invalid={!!nameError}
              />
              {nameError && <p className="text-xs text-destructive">{nameError}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cus-email">Email</Label>
              <Input
                id="cus-email"
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setEmailError("") }}
                placeholder="e.g. amara@example.com"
                aria-invalid={!!emailError}
              />
              {emailError && <p className="text-xs text-destructive">{emailError}</p>}
            </div>
          </div>

          {/* Customer type */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Customer type
            </span>
            <div className="flex flex-col gap-2">
              <SelectCard
                selected={customerType === "individual"}
                onClick={() => setCustomerType("individual")}
                icon={RiUserLine}
                label="Individual"
              />
              <SelectCard
                selected={customerType === "business"}
                onClick={() => setCustomerType("business")}
                icon={RiBuilding2Line}
                label="Business"
              />
            </div>
          </div>

          {/* Payment method */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Payment method
              </span>
              <span className="text-xs text-muted-foreground">(optional)</span>
            </div>
            <div className="flex flex-col gap-2">
              {PAYMENT_OPTIONS.map(opt => (
                <SelectCard
                  key={opt.value}
                  selected={paymentMethod === opt.value}
                  onClick={() => setPaymentMethod(prev => prev === opt.value ? "" : opt.value)}
                  icon={opt.icon}
                  label={opt.label}
                />
              ))}
            </div>
          </div>
        </form>

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <div className="border-t p-4 flex items-center justify-end gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button size="sm" type="submit" form="add-customer-form" loading={isPending}>
            Add customer
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
