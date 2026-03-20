"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  RiAlertLine,
  RiRefreshLine,
  RiBankCardLine,
  RiDownloadLine,
  RiFlashlightLine,
  RiShieldCheckLine,
} from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import { SettingsSection, SettingsRow } from "@/components/settings/settings-section"

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
const MOCK_BILLING = {
  plan: {
    name: "Pro",
    price: "$49",
    interval: "month",
    seats: 12,
    renewsAt: "April 20, 2026",
  },
  paymentMethod: {
    brand: "Visa",
    last4: "4242",
    expiry: "08 / 26",
  },
  invoices: [
    { id: "inv_001", date: "Mar 1, 2026",  amount: "$49.00", status: "paid" },
    { id: "inv_002", date: "Feb 1, 2026",  amount: "$49.00", status: "paid" },
    { id: "inv_003", date: "Jan 1, 2026",  amount: "$49.00", status: "paid" },
    { id: "inv_004", date: "Dec 1, 2025",  amount: "$49.00", status: "paid" },
  ],
}

type PageStatus = "loading" | "idle" | "error"

export default function BillingPage() {
  const [status, setStatus] = React.useState<PageStatus>("loading")

  React.useEffect(() => {
    const t = setTimeout(() => setStatus("idle"), 600)
    return () => clearTimeout(t)
  }, [])

  function handleRetry() {
    setStatus("loading")
    setTimeout(() => setStatus("idle"), 600)
  }

  // ---------------------------------------------------------------------------
  // Loading skeleton
  // ---------------------------------------------------------------------------
  if (status === "loading") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <Skeleton className="h-7 w-20 mb-1.5" />
          <Skeleton className="h-4 w-52" />
        </div>
        {/* Plan skeleton */}
        <div className="rounded-xl border divide-y">
          <div className="px-5 py-4 border-b">
            <Skeleton className="h-4 w-24" />
          </div>
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between px-5 py-4">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-40" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </div>
        {/* Payment skeleton */}
        <div className="rounded-xl border divide-y">
          <div className="px-5 py-4 border-b">
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <Skeleton className="size-9 rounded-lg" />
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Error state
  // ---------------------------------------------------------------------------
  if (status === "error") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your plan and payment details</p>
        </div>
        <Alert variant="destructive">
          <RiAlertLine className="size-4" />
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>Failed to load billing information. Please try again.</span>
            <Button variant="outline" size="sm" onClick={handleRetry}>
              <RiRefreshLine />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Populated state (billing is mostly read-only)
  // ---------------------------------------------------------------------------
  const { plan, paymentMethod, invoices } = MOCK_BILLING

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your plan and payment details.
        </p>
      </div>

      {/* Current plan */}
      <SettingsSection
        title="Current plan"
        description="Your workspace is on the Pro plan."
        footer={
          <div className="flex items-center justify-between gap-4 w-full">
            <p className="text-xs text-muted-foreground">
              Renews {plan.renewsAt}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => toast.info("Plan management coming soon")}>
                Manage plan
              </Button>
              <Button size="sm" onClick={() => toast.info("Upgrade flow coming soon")}>
                <RiFlashlightLine />
                Upgrade
              </Button>
            </div>
          </div>
        }
      >
        <SettingsRow label="Plan" description="Your current subscription tier">
          <Badge variant="info">{plan.name}</Badge>
        </SettingsRow>

        <SettingsRow label="Price" description="Billed monthly">
          <span className="text-sm font-medium tabular-nums">
            {plan.price} / {plan.interval}
          </span>
        </SettingsRow>

        <SettingsRow label="Seats" description="Active members in your workspace">
          <span className="text-sm font-medium tabular-nums">{plan.seats} seats used</span>
        </SettingsRow>
      </SettingsSection>

      {/* Payment method */}
      <SettingsSection
        title="Payment method"
        description="The card charged at each billing period."
        footer={
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <RiShieldCheckLine className="size-3.5" />
              Secured by Stripe
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Payment method update coming soon")}
            >
              <RiBankCardLine />
              Update card
            </Button>
          </div>
        }
      >
        <div className="flex items-center gap-3 px-5 py-4">
          {/* Card icon placeholder */}
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <RiBankCardLine className="size-4" />
          </div>
          <div>
            <p className="text-sm font-medium">
              {paymentMethod.brand} ending in {paymentMethod.last4}
            </p>
            <p className="text-xs text-muted-foreground">Expires {paymentMethod.expiry}</p>
          </div>
        </div>
      </SettingsSection>

      {/* Billing history */}
      <SettingsSection
        title="Billing history"
        description="Download invoices for past payments."
      >
        {invoices.length === 0 ? (
          <div className="px-5 py-6 text-center text-sm text-muted-foreground">
            No invoices yet.
          </div>
        ) : (
          invoices.map(invoice => (
            <div
              key={invoice.id}
              className="flex items-center justify-between gap-4 px-5 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div>
                  <p className="text-sm font-medium">{invoice.date}</p>
                  <p className="text-xs text-muted-foreground tabular-nums">{invoice.amount}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <StatusBadge variant="success">{invoice.status}</StatusBadge>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Download invoice ${invoice.id}`}
                  onClick={() => toast.success(`Downloading ${invoice.date} invoice`)}
                >
                  <RiDownloadLine />
                </Button>
              </div>
            </div>
          ))
        )}
      </SettingsSection>
    </div>
  )
}
