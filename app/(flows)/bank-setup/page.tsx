"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  RiBankLine,
  RiBuildingLine,
  RiUserLine,
  RiLockLine,
  RiInformationLine,
} from "@remixicon/react"
import { cn } from "@/lib/utils"
import { MultiStepLayout } from "@/components/multi-step-form/multi-step-layout"
import { StepSidebar } from "@/components/multi-step-form/step-sidebar"
import { StepHeader } from "@/components/multi-step-form/step-header"
import { StepFormSection } from "@/components/multi-step-form/step-form-section"
import { StepFooter } from "@/components/multi-step-form/step-footer"
import { CompletionState } from "@/components/multi-step-form/completion-state"
import { useMultiStepForm } from "@/components/multi-step-form/use-multi-step-form"
import type { StepConfig } from "@/components/multi-step-form/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// ─── Steps ────────────────────────────────────────────────────────────────────

const STEPS: StepConfig[] = [
  { id: "type",    title: "Account type",   description: "Select the type of bank account you're adding." },
  { id: "details", title: "Bank details",   description: "Enter your banking information. This is encrypted and stored securely." },
  { id: "verify",  title: "Verify account", description: "Confirm your account with a small test deposit." },
]

// ─── Account type card ────────────────────────────────────────────────────────

type AccountType = "personal" | "business"

function AccountTypeCard({
  type,
  icon: Icon,
  title,
  description,
  selected,
  onClick,
}: {
  type: AccountType
  icon: React.ElementType
  title: string
  description: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex items-start gap-4 p-5 rounded-xl border text-left transition-colors w-full",
        selected
          ? "border-primary/40 bg-primary/5"
          : "border-border bg-card hover:bg-accent/50",
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
          selected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
        )}
      >
        <Icon className="size-5" />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{title}</span>
          {selected && (
            <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BankSetupPage() {
  const router = useRouter()
  const form   = useMultiStepForm(STEPS.map(s => s.id))

  // Step 1
  const [accountType, setAccountType] = React.useState<AccountType | "">("")

  // Step 2
  const [holderName, setHolderName]   = React.useState("")
  const [bankName, setBankName]       = React.useState("")
  const [routingNum, setRoutingNum]   = React.useState("")
  const [accountNum, setAccountNum]   = React.useState("")
  const [confirmNum, setConfirmNum]   = React.useState("")

  // Step 3
  const [verifyAmt, setVerifyAmt]     = React.useState("")

  const [errors, setErrors] = React.useState<Record<string, string>>({})

  function validateCurrentStep(): boolean {
    const e: Record<string, string> = {}

    if (form.currentStepId === "type") {
      if (!accountType) {
        toast.error("Please select an account type to continue")
        return false
      }
    }

    if (form.currentStepId === "details") {
      if (!holderName.trim()) e.holderName = "Account holder name is required"
      if (!bankName.trim())   e.bankName   = "Bank name is required"
      if (!routingNum.trim()) e.routingNum = "Routing number is required"
      else if (!/^\d{9}$/.test(routingNum)) e.routingNum = "Routing number must be 9 digits"
      if (!accountNum.trim()) e.accountNum = "Account number is required"
      if (!confirmNum.trim()) e.confirmNum = "Please confirm your account number"
      else if (confirmNum !== accountNum) e.confirmNum = "Account numbers do not match"
    }

    if (form.currentStepId === "verify") {
      if (!verifyAmt.trim()) e.verifyAmt = "Please enter the deposit amount"
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleNext() {
    if (!validateCurrentStep()) return

    if (form.isLastStep) {
      form.setIsSubmitting(true)
      await new Promise(r => setTimeout(r, 1200))
      form.setIsSubmitting(false)
      form.setIsComplete(true)
      toast.success("Bank account connected successfully")
    } else {
      form.goNext()
    }
  }

  const currentStep = STEPS[form.currentStepIndex]
  const nextStep    = STEPS[form.currentStepIndex + 1]

  function fieldError(field: string) {
    return errors[field] ? (
      <p className="text-xs text-destructive">{errors[field]}</p>
    ) : null
  }

  // ── Completion ─────────────────────────────────────────────────────────────
  if (form.isComplete) {
    return (
      <MultiStepLayout
        logo={<img src="/mtn-logo.svg" alt="MTN" className="h-7 w-auto dark:invert" />}
        flowTitle="Bank account setup"
      >
        <CompletionState
          title="Bank account connected"
          description={`Your ${accountType} bank account ending in ••••${accountNum.slice(-4)} has been verified and is ready to use for reimbursements.`}
          primaryAction={{ label: "Back to settings", onClick: () => router.push("/settings/bank-account") }}
        />
      </MultiStepLayout>
    )
  }

  return (
    <MultiStepLayout
      logo={<img src="/mtn-logo.svg" alt="MTN" className="h-7 w-auto dark:invert" />}
      flowTitle="Bank account setup"
      onClose={() => router.push("/settings/bank-account")}
      showProgressBar
      progress={form.progress}
      stepIndicator={`Step ${form.currentStepIndex + 1} of ${form.totalSteps}`}
      sidebar={
        <StepSidebar
          steps={STEPS}
          getStepStatus={form.getStepStatus}
          onStepClick={form.goToStep}
        />
      }
      footer={
        <StepFooter
          isFirstStep={form.isFirstStep}
          isLastStep={form.isLastStep}
          onBack={form.goBack}
          onNext={handleNext}
          onCancel={() => router.push("/settings/bank-account")}
          isLoading={form.isSubmitting}
          nextLabel="Continue"
          submitLabel="Verify & connect"
          helperText={nextStep ? `Next: ${nextStep.title}` : undefined}
        />
      }
    >
      <StepHeader
        title={currentStep.title}
        description={currentStep.description}
      />

      {/* ── Step 1: Account type ─────────────────────────────────────────────── */}
      {form.currentStepId === "type" && (
        <StepFormSection>
          <div className="flex flex-col gap-3">
            <AccountTypeCard
              type="personal"
              icon={RiUserLine}
              title="Personal bank account"
              description="A checking or savings account in your own name."
              selected={accountType === "personal"}
              onClick={() => setAccountType("personal")}
            />
            <AccountTypeCard
              type="business"
              icon={RiBuildingLine}
              title="Business bank account"
              description="A bank account registered to your company or organisation."
              selected={accountType === "business"}
              onClick={() => setAccountType("business")}
            />
          </div>
        </StepFormSection>
      )}

      {/* ── Step 2: Bank details ─────────────────────────────────────────────── */}
      {form.currentStepId === "details" && (
        <>
          <StepFormSection title="Account holder">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="bank-holder">Account holder name</Label>
              <Input
                id="bank-holder"
                value={holderName}
                onChange={e => setHolderName(e.target.value)}
                placeholder={accountType === "business" ? "Acme Corporation Ltd" : "Ikedi Eze"}
                aria-invalid={!!errors.holderName}
              />
              {fieldError("holderName")}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="bank-name">Bank name</Label>
              <Input
                id="bank-name"
                value={bankName}
                onChange={e => setBankName(e.target.value)}
                placeholder="First Bank of Nigeria"
                aria-invalid={!!errors.bankName}
              />
              {fieldError("bankName")}
            </div>
          </StepFormSection>

          <StepFormSection title="Account numbers">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="bank-routing">Routing number</Label>
              <Input
                id="bank-routing"
                value={routingNum}
                onChange={e => setRoutingNum(e.target.value.replace(/\D/g, "").slice(0, 9))}
                placeholder="9-digit routing number"
                inputMode="numeric"
                aria-invalid={!!errors.routingNum}
              />
              {fieldError("routingNum")}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="bank-acct">Account number</Label>
              <Input
                id="bank-acct"
                value={accountNum}
                onChange={e => setAccountNum(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter account number"
                inputMode="numeric"
                aria-invalid={!!errors.accountNum}
              />
              {fieldError("accountNum")}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="bank-confirm">Confirm account number</Label>
              <Input
                id="bank-confirm"
                value={confirmNum}
                onChange={e => setConfirmNum(e.target.value.replace(/\D/g, ""))}
                placeholder="Re-enter account number"
                inputMode="numeric"
                aria-invalid={!!errors.confirmNum}
              />
              {fieldError("confirmNum")}
            </div>
          </StepFormSection>

          <div className="flex items-start gap-2 rounded-xl border bg-info-lighter p-3">
            <RiLockLine className="size-4 text-info shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Your banking information is encrypted with 256-bit SSL and stored securely.
              We never share your details with third parties.
            </p>
          </div>
        </>
      )}

      {/* ── Step 3: Verify ──────────────────────────────────────────────────── */}
      {form.currentStepId === "verify" && (
        <>
          <StepFormSection>
            <div className="rounded-xl border bg-card p-5 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <RiBankLine className="size-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Test deposit sent</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We've sent a small test deposit of between ₦0.01 – ₦0.99 to your account ending
                    in <span className="font-mono font-medium">••••{accountNum.slice(-4) || "0000"}</span>.
                    Check your bank statement and enter the exact amount below.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="bank-verify">Deposit amount (₦)</Label>
              <Input
                id="bank-verify"
                value={verifyAmt}
                onChange={e => setVerifyAmt(e.target.value)}
                placeholder="e.g. 0.37"
                inputMode="decimal"
                aria-invalid={!!errors.verifyAmt}
              />
              {fieldError("verifyAmt")}
              <p className="text-xs text-muted-foreground">
                The deposit may take 1–2 business days to appear. You can also{" "}
                <button
                  type="button"
                  className="text-primary underline underline-offset-2"
                  onClick={() => { router.push("/settings/bank-account"); toast.info("We'll remind you to verify later.") }}
                >
                  verify later
                </button>.
              </p>
            </div>
          </StepFormSection>

          <div className="flex items-start gap-2 rounded-xl border p-3">
            <RiInformationLine className="size-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              You have 7 days to verify this account. Unverified accounts cannot be used to receive transfers.
            </p>
          </div>
        </>
      )}
    </MultiStepLayout>
  )
}
