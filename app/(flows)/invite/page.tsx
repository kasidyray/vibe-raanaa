"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  RiEyeLine,
  RiFileCopyLine,
  RiDeleteBinLine,
  RiGroupLine,
  RiBankCardLine,
  RiCodeLine,
  RiCheckLine,
} from "@remixicon/react"
import { cn } from "@/lib/utils"
import { MultiStepLayout } from "@/components/multi-step-form/multi-step-layout"
import { StepSidebar } from "@/components/multi-step-form/step-sidebar"
import { StepTransition } from "@/components/multi-step-form/step-transition"
import { StepHeader } from "@/components/multi-step-form/step-header"
import { StepFormSection } from "@/components/multi-step-form/step-form-section"
import { StepFooter } from "@/components/multi-step-form/step-footer"
import { StepSkeleton } from "@/components/multi-step-form/step-skeleton"
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
import { Badge } from "@/components/ui/badge"

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS: StepConfig[] = [
  { id: "details",     title: "Invite details",       description: "Basic information about the person you're inviting." },
  { id: "role",        title: "Assign role",           description: "Choose what level of access this person will have." },
  { id: "permissions", title: "Access & permissions",  description: "Review what this role can do in your workspace." },
  { id: "review",      title: "Review",                description: "Confirm everything looks right before sending the invite." },
]

// ─── Roles ────────────────────────────────────────────────────────────────────

type RoleId = "admin" | "editor" | "viewer"

type RoleDef = {
  id: RoleId
  name: string
  description: string
  badge: "info" | "warning" | "neutral"
  permissions: string[]
}

const ROLES: RoleDef[] = [
  {
    id: "admin",
    name: "Admin",
    description: "Can manage team, content, and settings. Cannot transfer ownership.",
    badge: "warning",
    permissions: ["View data", "Create & edit content", "Delete content", "Manage team", "API access"],
  },
  {
    id: "editor",
    name: "Editor",
    description: "Can create and edit content. Cannot delete records or manage team.",
    badge: "info",
    permissions: ["View data", "Create & edit content"],
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access. Cannot create, edit, or delete any content.",
    badge: "neutral",
    permissions: ["View data"],
  },
]

const ALL_PERMISSIONS = [
  { id: "view_data",      label: "View data",            icon: RiEyeLine },
  { id: "manage_content", label: "Create & edit content", icon: RiFileCopyLine },
  { id: "delete_content", label: "Delete content",        icon: RiDeleteBinLine },
  { id: "manage_team",    label: "Manage team",           icon: RiGroupLine },
  { id: "billing_access", label: "Billing access",        icon: RiBankCardLine },
  { id: "api_access",     label: "API access",            icon: RiCodeLine },
]

const ROLE_PERMISSION_LABELS: Record<RoleId, string[]> = {
  admin:  ["View data", "Create & edit content", "Delete content", "Manage team", "API access"],
  editor: ["View data", "Create & edit content"],
  viewer: ["View data"],
}

// ─── Small sub-components ─────────────────────────────────────────────────────

function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b last:border-0">
      <span className="text-sm text-muted-foreground shrink-0 w-36">{label}</span>
      <span className="text-sm text-right">{value}</span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InvitePage() {
  const router = useRouter()
  const form   = useMultiStepForm(STEPS.map(s => s.id))

  // Step 1 — details
  const [firstName, setFirstName]   = React.useState("")
  const [lastName, setLastName]     = React.useState("")
  const [email, setEmail]           = React.useState("")
  const [jobTitle, setJobTitle]     = React.useState("")
  const [department, setDepartment] = React.useState("")
  const [isDeptLead, setIsDeptLead] = React.useState(false)

  // Step 2 — role
  const [selectedRole, setSelectedRole] = React.useState<RoleId | "">("")

  // Step 2 loading — simulates fetching workspace roles from an API
  const [isRolesLoading, setIsRolesLoading] = React.useState(false)
  React.useEffect(() => {
    if (form.currentStepId === "role") {
      setIsRolesLoading(true)
      const t = setTimeout(() => setIsRolesLoading(false), 900)
      return () => clearTimeout(t)
    }
  }, [form.currentStepId])

  const [errors, setErrors] = React.useState<Record<string, string>>({})

  function validateCurrentStep(): boolean {
    if (form.currentStepId === "details") {
      const e: Record<string, string> = {}
      if (!firstName.trim()) e.firstName = "First name is required"
      if (!lastName.trim())  e.lastName  = "Last name is required"
      if (!email.trim())     e.email     = "Email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email"
      setErrors(e)
      return Object.keys(e).length === 0
    }
    if (form.currentStepId === "role" && !selectedRole) {
      toast.error("Please select a role to continue")
      return false
    }
    return true
  }

  async function handleNext() {
    if (!validateCurrentStep()) return
    if (form.isLastStep) {
      form.setIsSubmitting(true)
      await new Promise(r => setTimeout(r, 1200))
      form.setIsSubmitting(false)
      form.setIsComplete(true)
      toast.success(`Invite sent to ${email}`)
    } else {
      form.goNext()
    }
  }

  const nextStep = STEPS[form.currentStepIndex + 1]

  // ── Completion ─────────────────────────────────────────────────────────────
  if (form.isComplete) {
    return (
      <MultiStepLayout
        logo={<img src="/mtn-logo.svg" alt="MTN" className="h-7 w-auto dark:invert" />}
        flowTitle="Invite user"
      >
        <StepTransition index={0} currentIndex={0}>
          <CompletionState
            title="Invite sent!"
            description={`An invitation has been sent to ${email}. They'll receive an email with instructions to join the workspace.`}
            primaryAction={{ label: "Back to team", onClick: () => router.push("/team") }}
            secondaryAction={{ label: "Invite another", onClick: () => router.push("/invite") }}
          />
        </StepTransition>
      </MultiStepLayout>
    )
  }

  return (
    <MultiStepLayout
      logo={<img src="/mtn-logo.svg" alt="MTN" className="h-7 w-auto dark:invert" />}
      flowTitle="Invite user"
      onClose={() => router.push("/team")}
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
          onCancel={() => router.push("/team")}
          isLoading={form.isSubmitting}
          isNextDisabled={isRolesLoading}
          submitLabel="Send invite"
          helperText={nextStep ? `Next: ${nextStep.title}` : undefined}
        />
      }
    >
      {/* ── Step 0: Invite details ──────────────────────────────────────────── */}
      <StepTransition index={0} currentIndex={form.currentStepIndex}>
        <StepHeader title={STEPS[0].title} description={STEPS[0].description} />

        <StepFormSection
          title="Personal information"
          description="Please provide the invitee's details as they should appear in the workspace."
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="inv-first">Legal first name</Label>
              <Input
                id="inv-first"
                value={firstName}
                onChange={e => { setFirstName(e.target.value); setErrors(p => ({ ...p, firstName: "" })) }}
                placeholder="Alex"
                aria-invalid={!!errors.firstName}
              />
              {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="inv-last">Legal last name</Label>
              <Input
                id="inv-last"
                value={lastName}
                onChange={e => { setLastName(e.target.value); setErrors(p => ({ ...p, lastName: "" })) }}
                placeholder="Smith"
                aria-invalid={!!errors.lastName}
              />
              {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="inv-email">Email address</Label>
            <Input
              id="inv-email"
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })) }}
              placeholder="alex.smith@company.com"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
        </StepFormSection>

        <StepFormSection
          title="Work details"
          description="Optional — helps your team understand this person's role."
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="inv-title">
                Job title <span className="text-muted-foreground font-normal">Optional</span>
              </Label>
              <Select value={jobTitle} onValueChange={v => setJobTitle(v ?? "")}>
                <SelectTrigger id="inv-title"><SelectValue placeholder="Select title" /></SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {["CEO", "CTO", "Product Manager", "Designer", "Engineer", "Data Analyst", "Other"].map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="inv-dept">
                Department <span className="text-muted-foreground font-normal">Optional</span>
              </Label>
              <Select value={department} onValueChange={v => setDepartment(v ?? "")}>
                <SelectTrigger id="inv-dept"><SelectValue placeholder="Select department" /></SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {["Engineering", "Design", "Product", "Marketing", "Sales", "Finance", "Operations"].map(d => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Checkbox
              id="inv-dept-lead"
              checked={isDeptLead}
              onCheckedChange={v => setIsDeptLead(!!v)}
              aria-label="Set as department lead"
            />
            <div className="flex flex-col gap-0.5">
              <Label htmlFor="inv-dept-lead" className="cursor-pointer">Set as department lead</Label>
              <p className="text-xs text-muted-foreground">This person will be listed as the lead for their department.</p>
            </div>
          </div>
        </StepFormSection>
      </StepTransition>

      {/* ── Step 1: Assign role ─────────────────────────────────────────────── */}
      <StepTransition index={1} currentIndex={form.currentStepIndex}>
        {isRolesLoading ? (
          <StepSkeleton variant="cards" rows={3} />
        ) : (
          <>
            <StepHeader title={STEPS[1].title} description={STEPS[1].description} />
            <StepFormSection
              title="Select a role"
              description="This determines what actions the invitee can take in the workspace."
            >
              <div className="flex flex-col gap-3">
                {ROLES.map(role => {
                  const isSelected = selectedRole === role.id
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      aria-pressed={isSelected}
                      className={cn(
                        "flex items-start gap-4 p-4 rounded-xl border text-left transition-colors w-full",
                        isSelected ? "border-primary/40 bg-primary/5" : "border-border bg-card hover:bg-accent/50",
                      )}
                    >
                      <div className={cn(
                        "mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                        isSelected ? "border-primary bg-primary" : "border-muted-foreground/40",
                      )}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                      </div>
                      <div className="flex flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{role.name}</span>
                          <Badge variant={role.badge} size="sm">{role.name}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {role.permissions.join(" · ")}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </StepFormSection>
          </>
        )}
      </StepTransition>

      {/* ── Step 2: Access & permissions ────────────────────────────────────── */}
      <StepTransition index={2} currentIndex={form.currentStepIndex}>
        <StepHeader title={STEPS[2].title} description={STEPS[2].description} />
        <StepFormSection
          title="Permissions for this role"
          description={
            selectedRole
              ? `The ${ROLES.find(r => r.id === selectedRole)?.name} role has access to the following actions. Go back to change the role.`
              : "Go back and select a role first."
          }
        >
          {selectedRole && (
            <div className="rounded-xl border bg-card divide-y">
              {ALL_PERMISSIONS.map(perm => {
                const hasAccess = ROLE_PERMISSION_LABELS[selectedRole].includes(perm.label)
                const Icon = perm.icon
                return (
                  <div key={perm.id} className={cn("flex items-center gap-3 px-4 py-3", !hasAccess && "opacity-40")}>
                    <Icon className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-sm flex-1">{perm.label}</span>
                    {hasAccess
                      ? <RiCheckLine className="size-4 text-success shrink-0" />
                      : <span className="text-xs text-muted-foreground">No access</span>
                    }
                  </div>
                )
              })}
            </div>
          )}
        </StepFormSection>
      </StepTransition>

      {/* ── Step 3: Review ──────────────────────────────────────────────────── */}
      <StepTransition index={3} currentIndex={form.currentStepIndex}>
        <StepHeader title={STEPS[3].title} description={STEPS[3].description} />

        <StepFormSection title="Personal information">
          <div className="rounded-xl border bg-card divide-y px-4">
            <ReviewRow label="Name" value={`${firstName} ${lastName}`} />
            <ReviewRow label="Email" value={email} />
            {jobTitle   && <ReviewRow label="Job title"        value={jobTitle} />}
            {department && <ReviewRow label="Department"       value={department} />}
            {isDeptLead && <ReviewRow label="Department lead"  value="Yes" />}
          </div>
        </StepFormSection>

        <StepFormSection title="Access">
          <div className="rounded-xl border bg-card divide-y px-4">
            <ReviewRow
              label="Role"
              value={
                selectedRole ? (
                  <Badge variant={ROLES.find(r => r.id === selectedRole)?.badge ?? "neutral"}>
                    {ROLES.find(r => r.id === selectedRole)?.name}
                  </Badge>
                ) : <span className="text-muted-foreground">Not set</span>
              }
            />
            <ReviewRow
              label="Permissions"
              value={selectedRole ? ROLE_PERMISSION_LABELS[selectedRole].join(", ") : "—"}
            />
          </div>
        </StepFormSection>

        <p className="text-xs text-muted-foreground">
          By sending this invite, you confirm this person should have access to your workspace.
          You can revoke access at any time from Team settings.
        </p>
      </StepTransition>
    </MultiStepLayout>
  )
}
