"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  RiCheckLine,
  RiMailLine,
} from "@remixicon/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge }    from "@/components/ui/badge"
import { Button }   from "@/components/ui/button"
import { Input }    from "@/components/ui/input"
import { Label }    from "@/components/ui/label"
import { StatusBadge } from "@/components/ui/status-badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { EmbeddedMultiStepLayout } from "@/components/multi-step-form/embedded-multi-step-layout"
import { StepSidebar }             from "@/components/multi-step-form/step-sidebar"
import { StepHeader }              from "@/components/multi-step-form/step-header"
import { StepFormSection }         from "@/components/multi-step-form/step-form-section"
import { StepFooter }              from "@/components/multi-step-form/step-footer"
import { StepTransition }          from "@/components/multi-step-form/step-transition"
import { StepSkeleton }            from "@/components/multi-step-form/step-skeleton"
import { useMultiStepForm }        from "@/components/multi-step-form/use-multi-step-form"
import {
  STEPS,
  FLAT_STEPS,
  INDUSTRIES,
  COMPANY_SIZES,
  BUDGET_RANGES,
  TIMELINES,
  LEAD_SOURCES,
  PIPELINE_STAGES,
  PRIORITIES,
  TEAM_MEMBERS,
  PRIORITY_VARIANT,
  STAGE_VARIANT,
  type LeadSource,
  type PriorityLevel,
} from "./data"

// ─── ReviewRow ────────────────────────────────────────────────────────────────

function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b last:border-0">
      <span className="text-sm text-muted-foreground shrink-0 w-28">{label}</span>
      <span className="text-sm text-right">{value}</span>
    </div>
  )
}

// ─── CreateLeadFlow ───────────────────────────────────────────────────────────

export function CreateLeadFlow({
  onCancel,
  onComplete,
}: {
  onCancel: () => void
  onComplete: (name: string) => void
}) {
  const form = useMultiStepForm(STEPS)

  // ── Step: contact ──────────────────────────────────────────────────────────
  const [firstName,      setFirstName]      = React.useState("")
  const [lastName,       setLastName]       = React.useState("")
  const [email,          setEmail]          = React.useState("")
  const [phone,          setPhone]          = React.useState("")
  const [jobTitle,       setJobTitle]       = React.useState("")
  const [firstNameError, setFirstNameError] = React.useState("")
  const [emailError,     setEmailError]     = React.useState("")

  // ── Step: company ──────────────────────────────────────────────────────────
  const [companyName,      setCompanyName]      = React.useState("")
  const [website,          setWebsite]          = React.useState("")
  const [industry,         setIndustry]         = React.useState("")
  const [companySize,      setCompanySize]       = React.useState("")
  const [companyNameError, setCompanyNameError] = React.useState("")

  // ── Step: details ──────────────────────────────────────────────────────────
  const [budget,   setBudget]   = React.useState("")
  const [timeline, setTimeline] = React.useState("")
  const [notes,    setNotes]    = React.useState("")

  // ── Step: source ───────────────────────────────────────────────────────────
  const [source,       setSource]       = React.useState<LeadSource | "">("")
  const [campaign,     setCampaign]     = React.useState("")
  const [referralName, setReferralName] = React.useState("")

  // ── Step: assignment (simulates async load) ────────────────────────────────
  const [isAssignmentLoading, setIsAssignmentLoading] = React.useState(false)
  const [ownerId,  setOwnerId]  = React.useState("")
  const [stage,    setStage]    = React.useState("")
  const [priority, setPriority] = React.useState<PriorityLevel | "">("")

  React.useEffect(() => {
    if (form.currentStepId !== "assignment") return
    setIsAssignmentLoading(true)
    const t = setTimeout(() => setIsAssignmentLoading(false), 800)
    return () => clearTimeout(t)
  }, [form.currentStepId])

  // ── Validation + navigation ────────────────────────────────────────────────

  async function handleNext() {
    if (form.currentStepId === "contact") {
      let hasError = false
      if (!firstName.trim()) {
        setFirstNameError("First name is required")
        hasError = true
      }
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailError("Valid email is required")
        hasError = true
      }
      if (hasError) { form.markStepError(form.currentStepIndex); return }
      setFirstNameError("")
      setEmailError("")
      form.clearStepError(form.currentStepIndex)
    }

    if (form.currentStepId === "company") {
      if (!companyName.trim()) {
        setCompanyNameError("Company name is required")
        form.markStepError(form.currentStepIndex)
        return
      }
      setCompanyNameError("")
      form.clearStepError(form.currentStepIndex)
    }

    if (form.isLastStep) {
      form.setIsSubmitting(true)
      await new Promise(r => setTimeout(r, 1000))
      form.setIsSubmitting(false)
      form.setIsComplete(true)
      onComplete(`${firstName} ${lastName}`.trim())
    } else {
      form.goNext()
    }
  }

  const fullName       = `${firstName} ${lastName}`.trim() || "—"
  const nextFlatStep   = FLAT_STEPS[form.currentStepIndex + 1]
  const assignedMember = TEAM_MEMBERS.find(m => m.id === ownerId)

  const stepFooter = (
    <div className="border-t pt-6">
      <StepFooter
        isFirstStep={form.isFirstStep}
        isLastStep={form.isLastStep}
        onBack={form.goBack}
        onNext={handleNext}
        onCancel={onCancel}
        isLoading={form.isSubmitting}
        submitLabel="Add lead"
        helperText={nextFlatStep ? `Next: ${nextFlatStep.title}` : undefined}
      />
    </div>
  )

  // ── Completion ─────────────────────────────────────────────────────────────

  if (form.isComplete) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="flex flex-col items-center gap-5 text-center max-w-sm">
          <div className="w-12 h-12 rounded-full bg-success/15 flex items-center justify-center">
            <RiCheckLine className="size-6 text-success" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold">{fullName} added</h3>
            <p className="text-sm text-muted-foreground">
              The lead is now in your pipeline. Assign a follow-up task or send an introductory email to get started.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={onCancel}>Back to leads</Button>
            <Button><RiMailLine />Send email</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <EmbeddedMultiStepLayout
      showProgressBar
      progress={form.progress}
      sidebar={
        <StepSidebar
          steps={STEPS}
          getStepStatus={form.getStepStatus}
          onStepClick={form.goToStep}
          mode="free"
        />
      }
    >
      {/* ── 0: contact ───────────────────────────────────────────────────────── */}
      <StepTransition index={0} currentIndex={form.currentStepIndex}>
        <StepHeader
          title="Contact info"
          description="Basic information about the person you're adding as a lead."
        />

        <StepFormSection>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lead-first-name">First name</Label>
              <Input
                id="lead-first-name"
                value={firstName}
                onChange={e => { setFirstName(e.target.value); setFirstNameError("") }}
                placeholder="e.g. James"
                aria-invalid={!!firstNameError}
              />
              {firstNameError && <p className="text-xs text-destructive">{firstNameError}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lead-last-name">
                Last name
                <span className="ml-1.5 text-xs font-normal text-muted-foreground">Optional</span>
              </Label>
              <Input
                id="lead-last-name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="e.g. Carter"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lead-email">Email</Label>
            <Input
              id="lead-email"
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setEmailError("") }}
              placeholder="e.g. james@notion.so"
              aria-invalid={!!emailError}
            />
            {emailError && <p className="text-xs text-destructive">{emailError}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lead-phone">
              Phone
              <span className="ml-1.5 text-xs font-normal text-muted-foreground">Optional</span>
            </Label>
            <Input
              id="lead-phone"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="e.g. +1 555 000 0000"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lead-job-title">
              Job title
              <span className="ml-1.5 text-xs font-normal text-muted-foreground">Optional</span>
            </Label>
            <Input
              id="lead-job-title"
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              placeholder="e.g. VP of Sales"
            />
          </div>
        </StepFormSection>

        {stepFooter}
      </StepTransition>

      {/* ── 1: company ───────────────────────────────────────────────────────── */}
      <StepTransition index={1} currentIndex={form.currentStepIndex}>
        <StepHeader
          title="Company"
          description="Where the lead works and details about their organisation."
        />

        <StepFormSection>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lead-company-name">Company name</Label>
            <Input
              id="lead-company-name"
              value={companyName}
              onChange={e => { setCompanyName(e.target.value); setCompanyNameError("") }}
              placeholder="e.g. Notion"
              aria-invalid={!!companyNameError}
            />
            {companyNameError && <p className="text-xs text-destructive">{companyNameError}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lead-website">
              Website
              <span className="ml-1.5 text-xs font-normal text-muted-foreground">Optional</span>
            </Label>
            <Input
              id="lead-website"
              type="url"
              value={website}
              onChange={e => setWebsite(e.target.value)}
              placeholder="e.g. https://notion.so"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lead-industry">
                Industry
                <span className="ml-1.5 text-xs font-normal text-muted-foreground">Optional</span>
              </Label>
              <Select value={industry} onValueChange={v => setIndustry(v ?? "")}>
                <SelectTrigger id="lead-industry" className="w-full">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {INDUSTRIES.map(ind => (
                      <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lead-size">
                Company size
                <span className="ml-1.5 text-xs font-normal text-muted-foreground">Optional</span>
              </Label>
              <Select value={companySize} onValueChange={v => setCompanySize(v ?? "")}>
                <SelectTrigger id="lead-size" className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {COMPANY_SIZES.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </StepFormSection>

        {stepFooter}
      </StepTransition>

      {/* ── 2: details (sub-step of qualification) ───────────────────────────── */}
      <StepTransition index={2} currentIndex={form.currentStepIndex}>
        <StepHeader
          title="Deal details"
          description="Budget expectations, purchase timeline, and any relevant context."
        />

        <StepFormSection>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lead-budget">
                Budget range
                <span className="ml-1.5 text-xs font-normal text-muted-foreground">Optional</span>
              </Label>
              <Select value={budget} onValueChange={v => setBudget(v ?? "")}>
                <SelectTrigger id="lead-budget" className="w-full">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {BUDGET_RANGES.map(b => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lead-timeline">
                Purchase timeline
                <span className="ml-1.5 text-xs font-normal text-muted-foreground">Optional</span>
              </Label>
              <Select value={timeline} onValueChange={v => setTimeline(v ?? "")}>
                <SelectTrigger id="lead-timeline" className="w-full">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {TIMELINES.map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lead-notes">
              Use case / notes
              <span className="ml-1.5 text-xs font-normal text-muted-foreground">Optional</span>
            </Label>
            <Textarea
              id="lead-notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Describe the lead's use case or any relevant context that will help with qualification..."
              rows={4}
            />
          </div>
        </StepFormSection>

        {stepFooter}
      </StepTransition>

      {/* ── 3: source (sub-step of qualification) ────────────────────────────── */}
      <StepTransition index={3} currentIndex={form.currentStepIndex}>
        <StepHeader
          title="Lead source"
          description="How did this lead come in? This helps measure your acquisition channels."
        />

        <StepFormSection>
          <div className="flex flex-col gap-2">
            {LEAD_SOURCES.map(opt => {
              const Icon     = opt.icon
              const selected = source === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSource(opt.id)}
                  aria-pressed={selected}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border text-left transition-colors w-full",
                    selected ? "border-primary/40 bg-primary/5" : "border-border bg-card hover:bg-accent/50",
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                    selected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                  )}>
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{opt.label}</p>
                    <p className="text-xs text-muted-foreground">{opt.description}</p>
                  </div>
                  {selected && (
                    <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </StepFormSection>

        {source === "referral" && (
          <StepFormSection title="Referral details">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lead-referral">
                Referred by
                <span className="ml-1.5 text-xs font-normal text-muted-foreground">Optional</span>
              </Label>
              <Input
                id="lead-referral"
                value={referralName}
                onChange={e => setReferralName(e.target.value)}
                placeholder="e.g. Sarah Mitchell"
              />
            </div>
          </StepFormSection>
        )}

        <StepFormSection title="Campaign tracking">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lead-campaign">
              Campaign name
              <span className="ml-1.5 text-xs font-normal text-muted-foreground">Optional</span>
            </Label>
            <Input
              id="lead-campaign"
              value={campaign}
              onChange={e => setCampaign(e.target.value)}
              placeholder="e.g. Q2 Outbound Series"
            />
          </div>
        </StepFormSection>

        {stepFooter}
      </StepTransition>

      {/* ── 4: assignment (optional, async load) ─────────────────────────────── */}
      <StepTransition index={4} currentIndex={form.currentStepIndex}>
        {isAssignmentLoading ? (
          <>
            <StepSkeleton variant="fields" rows={2} />
            <StepSkeleton variant="cards" rows={5} />
          </>
        ) : (
          <>
            <StepHeader
              title="Assignment"
              description="Set an owner, pipeline stage, and priority for this lead."
            />

            <StepFormSection title="Owner">
              <div className="flex flex-col gap-2">
                {TEAM_MEMBERS.map(member => {
                  const selected = ownerId === member.id
                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => setOwnerId(selected ? "" : member.id)}
                      aria-pressed={selected}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border text-left transition-colors w-full",
                        selected ? "border-primary/40 bg-primary/5" : "border-border bg-card hover:bg-accent/50",
                      )}
                    >
                      <Avatar size="sm">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                      {selected && <RiCheckLine className="size-4 text-primary shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </StepFormSection>

            <StepFormSection title="Pipeline">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="lead-stage">Stage</Label>
                  <Select value={stage} onValueChange={v => setStage(v ?? "")}>
                    <SelectTrigger id="lead-stage" className="w-full">
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {PIPELINE_STAGES.map(s => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="lead-priority">Priority</Label>
                  <Select value={priority} onValueChange={v => setPriority(v as PriorityLevel)}>
                    <SelectTrigger id="lead-priority" className="w-full">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {PRIORITIES.map(p => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </StepFormSection>
          </>
        )}

        {/* Footer always visible, next disabled while loading */}
        <div className="border-t pt-6">
          <StepFooter
            isFirstStep={form.isFirstStep}
            isLastStep={form.isLastStep}
            onBack={form.goBack}
            onNext={handleNext}
            onCancel={onCancel}
            isLoading={form.isSubmitting}
            isNextDisabled={isAssignmentLoading}
            submitLabel="Add lead"
            helperText={!isAssignmentLoading && nextFlatStep ? `Next: ${nextFlatStep.title}` : undefined}
          />
        </div>
      </StepTransition>

      {/* ── 5: review ────────────────────────────────────────────────────────── */}
      <StepTransition index={5} currentIndex={form.currentStepIndex}>
        <StepHeader
          title="Review & add"
          description="Confirm all details before adding this lead to your pipeline."
        />

        <StepFormSection title="Contact">
          <div className="rounded-xl border bg-card px-4 divide-y">
            <ReviewRow label="Name"      value={fullName} />
            <ReviewRow label="Email"     value={email || "—"} />
            <ReviewRow label="Phone"     value={phone    || <span className="text-muted-foreground">Not set</span>} />
            <ReviewRow label="Job title" value={jobTitle || <span className="text-muted-foreground">Not set</span>} />
          </div>
        </StepFormSection>

        <StepFormSection title="Company">
          <div className="rounded-xl border bg-card px-4 divide-y">
            <ReviewRow label="Company"  value={companyName || "—"} />
            <ReviewRow label="Website"  value={website     || <span className="text-muted-foreground">Not set</span>} />
            <ReviewRow label="Industry" value={industry    || <span className="text-muted-foreground">Not set</span>} />
            <ReviewRow label="Size"     value={companySize || <span className="text-muted-foreground">Not set</span>} />
          </div>
        </StepFormSection>

        <StepFormSection title="Qualification">
          <div className="rounded-xl border bg-card px-4 divide-y">
            <ReviewRow label="Budget"   value={budget   || <span className="text-muted-foreground">Not set</span>} />
            <ReviewRow label="Timeline" value={timeline || <span className="text-muted-foreground">Not set</span>} />
            <ReviewRow
              label="Source"
              value={LEAD_SOURCES.find(s => s.id === source)?.label ?? <span className="text-muted-foreground">Not set</span>}
            />
            {notes && <ReviewRow label="Notes" value={<span className="text-right max-w-48 line-clamp-3">{notes}</span>} />}
          </div>
        </StepFormSection>

        <StepFormSection title="Assignment">
          <div className="rounded-xl border bg-card px-4 divide-y">
            <ReviewRow
              label="Owner"
              value={
                assignedMember ? (
                  <div className="flex items-center gap-2 justify-end">
                    <Avatar className="size-5">
                      <AvatarImage src={assignedMember.avatar} alt={assignedMember.name} />
                      <AvatarFallback className="text-[10px]">{assignedMember.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{assignedMember.name}</span>
                  </div>
                ) : <span className="text-muted-foreground">Unassigned</span>
              }
            />
            <ReviewRow
              label="Stage"
              value={
                stage
                  ? <StatusBadge variant={STAGE_VARIANT[stage] ?? "neutral"}>{stage}</StatusBadge>
                  : <span className="text-muted-foreground">Not set</span>
              }
            />
            <ReviewRow
              label="Priority"
              value={
                priority
                  ? <Badge variant={PRIORITY_VARIANT[priority]}>{priority}</Badge>
                  : <span className="text-muted-foreground">Not set</span>
              }
            />
          </div>
        </StepFormSection>

        {stepFooter}
      </StepTransition>
    </EmbeddedMultiStepLayout>
  )
}
