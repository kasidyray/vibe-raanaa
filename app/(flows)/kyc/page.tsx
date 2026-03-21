"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─── Steps ────────────────────────────────────────────────────────────────────

const STEPS: StepConfig[] = [
  { id: "personal",  title: "Personal details",      description: "Provide your legal name and identity information." },
  { id: "address",   title: "Residential address",   description: "Your address as printed on your identity documents." },
  { id: "business",  title: "Business information",  description: "Tell us about your business." },
  { id: "review",    title: "Review & submit",        description: "Check all details before submitting for verification." },
]

const NATIONALITIES = [
  "Nigerian", "Ghanaian", "Kenyan", "South African", "British", "American",
  "Canadian", "French", "German", "Other",
]

const COUNTRIES = [
  "Nigeria", "Ghana", "Kenya", "South Africa", "United Kingdom",
  "United States", "Canada", "France", "Germany", "Other",
]

const BUSINESS_TYPES = ["Sole proprietor", "Partnership", "LLC", "Corporation", "Non-profit"]
const INDUSTRIES = ["Technology", "Finance", "Healthcare", "Retail", "Education", "Media", "Manufacturing", "Other"]

// ─── Review row ───────────────────────────────────────────────────────────────

function ReviewRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b last:border-0">
      <span className="text-sm text-muted-foreground shrink-0 w-40">{label}</span>
      <span className="text-sm text-right">{value}</span>
    </div>
  )
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <StepFormSection title={title}>
      <div className="rounded-xl border bg-card divide-y px-4">
        {children}
      </div>
    </StepFormSection>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KycPage() {
  const router = useRouter()
  const form   = useMultiStepForm(STEPS.map(s => s.id))

  // Step 1: personal
  const [firstName, setFirstName]   = React.useState("")
  const [middleName, setMiddleName] = React.useState("")
  const [lastName, setLastName]     = React.useState("")
  const [dob, setDob]               = React.useState("")
  const [nationality, setNationality] = React.useState("")

  // Step 2: address
  const [country, setCountry]       = React.useState("")
  const [address1, setAddress1]     = React.useState("")
  const [address2, setAddress2]     = React.useState("")
  const [city, setCity]             = React.useState("")
  const [state, setState]           = React.useState("")
  const [postal, setPostal]         = React.useState("")

  // Step 3: business
  const [bizName, setBizName]         = React.useState("")
  const [bizType, setBizType]         = React.useState("")
  const [bizIndustry, setBizIndustry] = React.useState("")
  const [bizRegNum, setBizRegNum]     = React.useState("")
  const [certify, setCertify]         = React.useState(false)

  const [errors, setErrors] = React.useState<Record<string, string>>({})

  function validateCurrentStep(): boolean {
    const e: Record<string, string> = {}

    if (form.currentStepId === "personal") {
      if (!firstName.trim()) e.firstName = "First name is required"
      if (!lastName.trim())  e.lastName  = "Last name is required"
      if (!dob.trim())       e.dob       = "Date of birth is required"
      if (!nationality)      e.nationality = "Nationality is required"
    }

    if (form.currentStepId === "address") {
      if (!country)          e.country   = "Country is required"
      if (!address1.trim())  e.address1  = "Address is required"
      if (!city.trim())      e.city      = "City is required"
    }

    if (form.currentStepId === "business") {
      if (!bizName.trim())  e.bizName  = "Business name is required"
      if (!bizType)         e.bizType  = "Business type is required"
      if (!bizIndustry)     e.bizIndustry = "Industry is required"
    }

    if (form.currentStepId === "review") {
      if (!certify) {
        toast.error("Please certify that your information is accurate")
        return false
      }
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleNext() {
    if (!validateCurrentStep()) return

    if (form.isLastStep) {
      form.setIsSubmitting(true)
      await new Promise(r => setTimeout(r, 1400))
      form.setIsSubmitting(false)
      form.setIsComplete(true)
      toast.success("Business information submitted for verification")
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
        flowTitle="Business verification"
      >
        <CompletionState
          title="Submitted for verification"
          description="We've received your business information. Our team will review it and get back to you within 1–2 business days."
          primaryAction={{ label: "Back to settings", onClick: () => router.push("/settings/profile") }}
        />
      </MultiStepLayout>
    )
  }

  return (
    <MultiStepLayout
      logo={<img src="/mtn-logo.svg" alt="MTN" className="h-7 w-auto dark:invert" />}
      flowTitle="Business verification"
      onClose={() => router.push("/settings/profile")}
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
          onCancel={() => router.push("/settings/profile")}
          isLoading={form.isSubmitting}
          submitLabel="Submit for verification"
          helperText={nextStep ? `Next: ${nextStep.title}` : undefined}
        />
      }
    >
      <StepHeader
        title={currentStep.title}
        description={currentStep.description}
      />

      {/* ── Step 1: Personal details ─────────────────────────────────────────── */}
      {form.currentStepId === "personal" && (
        <>
          <StepFormSection
            title="Your personal details"
            description="Please provide your details exactly as printed on a government-issued ID."
          >
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="kyc-first">Legal first name</Label>
                <Input id="kyc-first" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Alex" aria-invalid={!!errors.firstName} />
                {fieldError("firstName")}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="kyc-middle">
                  Middle name
                  <span className="ml-1 text-muted-foreground font-normal">Optional</span>
                </Label>
                <Input id="kyc-middle" value={middleName} onChange={e => setMiddleName(e.target.value)} placeholder="J." />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="kyc-last">Legal last name</Label>
                <Input id="kyc-last" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Smith" aria-invalid={!!errors.lastName} />
                {fieldError("lastName")}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="kyc-dob">Date of birth</Label>
              <Input id="kyc-dob" type="date" value={dob} onChange={e => setDob(e.target.value)} aria-invalid={!!errors.dob} />
              {fieldError("dob")}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="kyc-nationality">Nationality</Label>
              <Select value={nationality} onValueChange={v => setNationality(v ?? "")}>
                <SelectTrigger id="kyc-nationality" aria-invalid={!!errors.nationality}>
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {NATIONALITIES.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldError("nationality")}
            </div>
          </StepFormSection>
        </>
      )}

      {/* ── Step 2: Residential address ──────────────────────────────────────── */}
      {form.currentStepId === "address" && (
        <StepFormSection
          title="Residential address"
          description="If no address is specified on your ID, provide your current residential address."
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="kyc-country">Country or region</Label>
            <Select value={country} onValueChange={v => setCountry(v ?? "")}>
              <SelectTrigger id="kyc-country" aria-invalid={!!errors.country}>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
            {fieldError("country")}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="kyc-addr1">Address line 1</Label>
            <Input id="kyc-addr1" value={address1} onChange={e => setAddress1(e.target.value)} placeholder="123 Main St" aria-invalid={!!errors.address1} />
            {fieldError("address1")}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="kyc-addr2">
              Address line 2
              <span className="ml-1 text-muted-foreground font-normal">Optional</span>
            </Label>
            <Input id="kyc-addr2" value={address2} onChange={e => setAddress2(e.target.value)} placeholder="Apt 4B" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="kyc-city">City</Label>
              <Input id="kyc-city" value={city} onChange={e => setCity(e.target.value)} placeholder="Lagos" aria-invalid={!!errors.city} />
              {fieldError("city")}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="kyc-state">
                State / Province
                <span className="ml-1 text-muted-foreground font-normal">Optional</span>
              </Label>
              <Input id="kyc-state" value={state} onChange={e => setState(e.target.value)} placeholder="Lagos State" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="kyc-postal">
                Postal code
                <span className="ml-1 text-muted-foreground font-normal">Optional</span>
              </Label>
              <Input id="kyc-postal" value={postal} onChange={e => setPostal(e.target.value)} placeholder="100001" />
            </div>
          </div>
        </StepFormSection>
      )}

      {/* ── Step 3: Business information ─────────────────────────────────────── */}
      {form.currentStepId === "business" && (
        <StepFormSection
          title="Business details"
          description="This information is used to verify your business for compliance purposes."
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="kyc-bizname">Business name</Label>
            <Input id="kyc-bizname" value={bizName} onChange={e => setBizName(e.target.value)} placeholder="Acme Corporation Ltd" aria-invalid={!!errors.bizName} />
            {fieldError("bizName")}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="kyc-biztype">Business type</Label>
              <Select value={bizType} onValueChange={v => setBizType(v ?? "")}>
                <SelectTrigger id="kyc-biztype" aria-invalid={!!errors.bizType}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {BUSINESS_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldError("bizType")}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="kyc-industry">Industry</Label>
              <Select value={bizIndustry} onValueChange={v => setBizIndustry(v ?? "")}>
                <SelectTrigger id="kyc-industry" aria-invalid={!!errors.bizIndustry}>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldError("bizIndustry")}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="kyc-regnum">
              Registration number
              <span className="ml-1 text-muted-foreground font-normal">Optional</span>
            </Label>
            <Input id="kyc-regnum" value={bizRegNum} onChange={e => setBizRegNum(e.target.value)} placeholder="RC-1234567" />
          </div>
        </StepFormSection>
      )}

      {/* ── Step 4: Review ───────────────────────────────────────────────────── */}
      {form.currentStepId === "review" && (
        <>
          <ReviewSection title="Personal details">
            <ReviewRow label="Full name" value={[firstName, middleName, lastName].filter(Boolean).join(" ")} />
            <ReviewRow label="Date of birth" value={dob} />
            <ReviewRow label="Nationality" value={nationality} />
          </ReviewSection>

          <ReviewSection title="Residential address">
            <ReviewRow label="Country" value={country} />
            <ReviewRow label="Address" value={[address1, address2].filter(Boolean).join(", ")} />
            <ReviewRow label="City" value={city} />
            <ReviewRow label="State" value={state} />
            <ReviewRow label="Postal code" value={postal} />
          </ReviewSection>

          <ReviewSection title="Business information">
            <ReviewRow label="Business name" value={bizName} />
            <ReviewRow label="Business type" value={bizType} />
            <ReviewRow label="Industry" value={bizIndustry} />
            <ReviewRow label="Registration no." value={bizRegNum} />
          </ReviewSection>

          <div className="flex items-start gap-2.5">
            <Checkbox
              id="kyc-certify"
              checked={certify}
              onCheckedChange={v => setCertify(!!v)}
              aria-label="Certify information is accurate"
            />
            <Label htmlFor="kyc-certify" className="text-sm leading-relaxed cursor-pointer">
              I certify that I have provided accurate and complete information, and that all details
              match my government-issued identity documents.
            </Label>
          </div>
        </>
      )}
    </MultiStepLayout>
  )
}
