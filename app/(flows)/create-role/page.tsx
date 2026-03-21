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
} from "@remixicon/react"
import { cn } from "@/lib/utils"
import { MultiStepLayout } from "@/components/multi-step-form/multi-step-layout"
import { StepSidebar } from "@/components/multi-step-form/step-sidebar"
import { StepHeader } from "@/components/multi-step-form/step-header"
import { StepFormSection } from "@/components/multi-step-form/step-form-section"
import { StepFooter } from "@/components/multi-step-form/step-footer"
import { CompletionState } from "@/components/multi-step-form/completion-state"
import { useMultiStepForm } from "@/components/multi-step-form/use-multi-step-form"
import { StepSkeleton } from "@/components/multi-step-form/step-skeleton"
import type { StepConfig } from "@/components/multi-step-form/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS: StepConfig[] = [
  { id: "details",     title: "Role details",          description: "Name and describe the new role." },
  { id: "global",      title: "Global permissions",    description: "Set workspace-level access for this role." },
  { id: "account",     title: "Account permissions",   description: "Define what this role can do within specific accounts." },
]

// ─── Permissions ──────────────────────────────────────────────────────────────

type Permission = {
  id: string
  label: string
  description: string
  icon: React.ElementType
  group: "global" | "account"
}

const PERMISSIONS: Permission[] = [
  // Global
  { id: "view_data",      label: "View data",            description: "Read-only access to workspace data and records.",         icon: RiEyeLine,       group: "global" },
  { id: "manage_content", label: "Create & edit content", description: "Create, edit, and publish content across the workspace.", icon: RiFileCopyLine,  group: "global" },
  { id: "delete_content", label: "Delete content",        description: "Permanently delete records and files.",                   icon: RiDeleteBinLine, group: "global" },
  { id: "manage_team",    label: "Manage team",           description: "Invite, remove, and update team members and roles.",      icon: RiGroupLine,     group: "global" },
  // Account
  { id: "billing_access", label: "Billing access",        description: "View and manage billing, invoices, and subscriptions.",   icon: RiBankCardLine,  group: "account" },
  { id: "api_access",     label: "API access",            description: "Generate and manage API keys for integrations.",          icon: RiCodeLine,      group: "account" },
]

function PermissionToggle({
  perm,
  checked,
  onChange,
}: {
  perm: Permission
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  const Icon = perm.icon
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors",
        checked ? "border-primary/40 bg-primary/5" : "border-border bg-card hover:bg-accent/50",
      )}
      onClick={() => onChange(!checked)}
      role="checkbox"
      aria-checked={checked}
    >
      <Checkbox
        id={`perm-${perm.id}`}
        checked={checked}
        onCheckedChange={onChange}
        onClick={e => e.stopPropagation()}
        aria-label={perm.label}
      />
      <div className="flex flex-col gap-0.5 min-w-0">
        <div className="flex items-center gap-2">
          <Icon className="size-3.5 text-muted-foreground" />
          <Label htmlFor={`perm-${perm.id}`} className="text-sm font-medium cursor-pointer">
            {perm.label}
          </Label>
        </div>
        <p className="text-xs text-muted-foreground">{perm.description}</p>
      </div>
    </div>
  )
}

// ─── Review permission list ───────────────────────────────────────────────────

function ReviewPermissionList({ ids, perms }: { ids: Set<string>; perms: Permission[] }) {
  const selected = perms.filter(p => ids.has(p.id))
  if (selected.length === 0) return <p className="text-sm text-muted-foreground">No permissions selected.</p>
  return (
    <div className="flex flex-col gap-2">
      {selected.map(p => {
        const Icon = p.icon
        return (
          <div key={p.id} className="flex items-center gap-2 text-sm">
            <Icon className="size-4 text-muted-foreground shrink-0" />
            {p.label}
          </div>
        )
      })}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type CreateRoleFormData = {
  roleName: string
  roleDescription: string
  permissions: string[]
}

export default function CreateRolePage() {
  const router = useRouter()
  const form   = useMultiStepForm<CreateRoleFormData>(STEPS.map(s => s.id))

  // Step 1
  const [roleName, setRoleName]           = React.useState("")
  const [roleDesc, setRoleDesc]           = React.useState("")
  const [nameError, setNameError]         = React.useState("")

  // Steps 2 & 3 — shared permission state
  const [selectedPerms, setSelectedPerms] = React.useState<Set<string>>(new Set())

  // Step-level loading — simulates fetching permission definitions from an API
  const [isStepLoading, setIsStepLoading] = React.useState(false)

  React.useEffect(() => {
    if (form.currentStepId === "global" || form.currentStepId === "account") {
      setIsStepLoading(true)
      const t = setTimeout(() => setIsStepLoading(false), 800)
      return () => clearTimeout(t)
    }
  }, [form.currentStepId])

  function togglePerm(id: string, checked: boolean) {
    setSelectedPerms(prev => {
      const next = new Set(prev)
      checked ? next.add(id) : next.delete(id)
      return next
    })
  }

  function validateCurrentStep(): boolean {
    if (form.currentStepId === "details") {
      if (!roleName.trim()) {
        setNameError("Role name is required")
        return false
      }
      setNameError("")
    }
    return true
  }

  async function handleNext() {
    if (!validateCurrentStep()) return

    if (form.isLastStep) {
      form.setIsSubmitting(true)
      await new Promise(r => setTimeout(r, 1000))
      form.setIsSubmitting(false)
      form.setIsComplete(true)
      toast.success(`Role "${roleName}" created`)
    } else {
      form.goNext()
    }
  }

  const currentStep = STEPS[form.currentStepIndex]
  const nextStep    = STEPS[form.currentStepIndex + 1]
  const globalPerms  = PERMISSIONS.filter(p => p.group === "global")
  const accountPerms = PERMISSIONS.filter(p => p.group === "account")

  // ── Completion ─────────────────────────────────────────────────────────────
  if (form.isComplete) {
    return (
      <MultiStepLayout
        logo={<img src="/mtn-logo.svg" alt="MTN" className="h-7 w-auto dark:invert" />}
        flowTitle="Create role"
      >
        <CompletionState
          title={`"${roleName}" created`}
          description="The new role is ready to use. You can assign it to team members from the Team settings."
          primaryAction={{ label: "Back to team", onClick: () => router.push("/team") }}
          secondaryAction={{ label: "Create another role", onClick: () => router.push("/create-role") }}
        />
      </MultiStepLayout>
    )
  }

  return (
    <MultiStepLayout
      logo={<img src="/mtn-logo.svg" alt="MTN" className="h-7 w-auto dark:invert" />}
      flowTitle="Create role"
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
          isNextDisabled={isStepLoading}
          submitLabel="Create role"
          helperText={nextStep ? `Next: ${nextStep.title}` : undefined}
        />
      }
    >
      {/* Steps 2 & 3 show a skeleton while permissions are being "fetched" */}
      {isStepLoading ? (
        <StepSkeleton variant="toggles" rows={4} />
      ) : (
      <>
      <StepHeader
        title={currentStep.title}
        description={currentStep.description}
      />

      {/* ── Step 1: Role details ─────────────────────────────────────────────── */}
      {form.currentStepId === "details" && (
        <StepFormSection>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="role-name">Role name</Label>
            <Input
              id="role-name"
              value={roleName}
              onChange={e => { setRoleName(e.target.value); setNameError("") }}
              placeholder="e.g. Product Manager"
              aria-invalid={!!nameError}
            />
            {nameError && <p className="text-xs text-destructive">{nameError}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="role-desc">
              Role description
              <span className="ml-1 text-muted-foreground font-normal">Optional</span>
            </Label>
            <Textarea
              id="role-desc"
              value={roleDesc}
              onChange={e => setRoleDesc(e.target.value)}
              placeholder="Describe what this role is for and who should have it."
              rows={3}
            />
          </div>
        </StepFormSection>
      )}

      {/* ── Step 2: Global permissions ───────────────────────────────────────── */}
      {form.currentStepId === "global" && (
        <StepFormSection>
          <div className="flex flex-col gap-3">
            {globalPerms.map(perm => (
              <PermissionToggle
                key={perm.id}
                perm={perm}
                checked={selectedPerms.has(perm.id)}
                onChange={checked => togglePerm(perm.id, checked)}
              />
            ))}
          </div>
          {selectedPerms.size === 0 && (
            <p className="text-xs text-muted-foreground">
              No permissions selected yet. This role will have read-only access by default.
            </p>
          )}
        </StepFormSection>
      )}

      {/* ── Step 3: Account permissions ─────────────────────────────────────── */}
      {form.currentStepId === "account" && (
        <>
          <StepFormSection>
            <div className="flex flex-col gap-3">
              {accountPerms.map(perm => (
                <PermissionToggle
                  key={perm.id}
                  perm={perm}
                  checked={selectedPerms.has(perm.id)}
                  onChange={checked => togglePerm(perm.id, checked)}
                />
              ))}
            </div>
          </StepFormSection>

          <Separator />

          {/* Summary ahead of creation */}
          <StepFormSection title="Role summary">
            <div className="rounded-xl border bg-card p-4 flex flex-col gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Role name</p>
                <p className="text-sm font-medium">{roleName || "—"}</p>
                {roleDesc && <p className="text-sm text-muted-foreground mt-0.5">{roleDesc}</p>}
              </div>

              <Separator />

              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Selected permissions</p>
                <ReviewPermissionList ids={selectedPerms} perms={PERMISSIONS} />
              </div>
            </div>
          </StepFormSection>
        </>
      )}
      </>
      )}
    </MultiStepLayout>
  )
}
