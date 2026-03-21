"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  RiBankLine,
  RiAddLine,
  RiMore2Line,
  RiCheckboxCircleLine,
} from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty"
import { SettingsSection, SettingsRow } from "@/components/settings/settings-section"

// ─── Mock data ────────────────────────────────────────────────────────────────
// Empty by default — the CTA drives users to /bank-setup

type BankAccount = {
  id: string
  bankName: string
  accountType: "personal" | "business"
  last4: string
  status: "verified" | "pending"
}

const MOCK_ACCOUNTS: BankAccount[] = []

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BankAccountPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(true)
  const [accounts, setAccounts]   = React.useState<BankAccount[]>(MOCK_ACCOUNTS)

  React.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  function handleRemove(id: string) {
    setAccounts(prev => prev.filter(a => a.id !== id))
    toast.success("Bank account removed")
  }

  // ── Loading ───────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <Skeleton className="h-7 w-36 mb-1.5" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="rounded-xl border divide-y">
          {[1, 2].map(i => (
            <div key={i} className="flex items-center justify-between px-5 py-4">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Bank account</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Connect a bank account to receive reimbursements and payouts.
          </p>
        </div>
        {accounts.length > 0 && (
          <Button size="sm" onClick={() => router.push("/bank-setup")}>
            <RiAddLine />
            Add account
          </Button>
        )}
      </div>

      {/* Account list or empty state */}
      {accounts.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <RiBankLine />
            </EmptyMedia>
            <EmptyTitle>No bank account connected</EmptyTitle>
            <EmptyDescription>
              Add a bank account to receive reimbursement transfers and payouts directly.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm" onClick={() => router.push("/bank-setup")}>
              <RiAddLine />
              Add bank account
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <SettingsSection
          title="Connected accounts"
          description="Your linked bank accounts for receiving transfers."
        >
          {accounts.map(account => (
            <SettingsRow
              key={account.id}
              label={account.bankName}
              description={`${account.accountType === "personal" ? "Personal" : "Business"} · ••••${account.last4}`}
            >
              <div className="flex items-center gap-2">
                <StatusBadge variant={account.status === "verified" ? "success" : "caution"}>
                  {account.status === "verified" ? "Verified" : "Pending"}
                </StatusBadge>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" size="icon-sm" aria-label="Account options" />
                    }
                  >
                    <RiMore2Line />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {account.status === "pending" && (
                      <>
                        <DropdownMenuItem onClick={() => router.push("/bank-setup")}>
                          Complete verification
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => handleRemove(account.id)}
                    >
                      Remove account
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SettingsRow>
          ))}
        </SettingsSection>
      )}

      {/* Security note */}
      <div className="flex items-start gap-2.5 rounded-xl border p-4">
        <RiCheckboxCircleLine className="size-4 text-success shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">Your information is secure</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Bank account details are encrypted with 256-bit SSL. We never store full account numbers
            or share your information with third parties.
          </p>
        </div>
      </div>
    </div>
  )
}
