"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  RiFolderLine,
  RiAddLine,
  RiCheckLine,
  RiGlobalLine,
  RiLockLine,
  RiTeamLine,
} from "@remixicon/react"
import { cn } from "@/lib/utils"
import { flattenStepIds } from "@/lib/steps"
import { SiteHeader } from "@/components/site-header"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EmbeddedMultiStepLayout } from "@/components/multi-step-form/embedded-multi-step-layout"
import { StepSidebar } from "@/components/multi-step-form/step-sidebar"
import { StepHeader } from "@/components/multi-step-form/step-header"
import { StepFormSection } from "@/components/multi-step-form/step-form-section"
import { StepFooter } from "@/components/multi-step-form/step-footer"
import { StepTransition } from "@/components/multi-step-form/step-transition"
import { useMultiStepForm } from "@/components/multi-step-form/use-multi-step-form"
import type { StepConfig } from "@/components/multi-step-form/types"

// ─── Step config ──────────────────────────────────────────────────────────────
//
// Demonstrates both flat steps and a grouped step with sub-steps:
//  • "basics"      — flat step
//  • "setup"       — group with two sub-steps: "timeline" + "permissions"
//  • "team"        — flat step (optional)
//  • "review"      — flat step

const STEPS: StepConfig[] = [
  {
    id: "basics",
    title: "Project basics",
    description: "Name, colour, and visibility for your project.",
  },
  {
    id: "setup",
    title: "Setup",
    subSteps: [
      { id: "timeline",    title: "Timeline",    description: "Set your project start and due dates." },
      { id: "permissions", title: "Permissions", description: "Control who can view and contribute." },
    ],
  },
  {
    id: "team",
    title: "Team",
    description: "Add collaborators to this project.",
    optional: true,
  },
  {
    id: "review",
    title: "Review & create",
    description: "Confirm your settings before creating.",
  },
]

// Flat ordered list for index → title lookups
const FLAT_STEPS = flattenStepIds(STEPS).map(id => {
  for (const s of STEPS) {
    if (s.subSteps) {
      const sub = s.subSteps.find(sub => sub.id === id)
      if (sub) return { id: sub.id, title: sub.title }
    } else if (s.id === id) {
      return { id: s.id, title: s.title }
    }
  }
  return { id, title: id }
})

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECT_COLORS = [
  { id: "violet", label: "Violet", cls: "bg-violet-500" },
  { id: "blue",   label: "Blue",   cls: "bg-blue-500"   },
  { id: "cyan",   label: "Cyan",   cls: "bg-cyan-500"   },
  { id: "green",  label: "Green",  cls: "bg-green-500"  },
  { id: "amber",  label: "Amber",  cls: "bg-amber-500"  },
  { id: "rose",   label: "Rose",   cls: "bg-rose-500"   },
]

type Visibility = "public" | "private" | "team"

const VISIBILITY_OPTIONS: { id: Visibility; label: string; description: string; icon: React.ElementType }[] = [
  { id: "public",  label: "Public",      description: "Anyone in the workspace can view.", icon: RiGlobalLine },
  { id: "private", label: "Private",     description: "Only invited members can access.",  icon: RiLockLine   },
  { id: "team",    label: "Team only",   description: "Visible to your direct team.",       icon: RiTeamLine   },
]

const PRIORITIES = ["Low", "Medium", "High", "Critical"]

const ACCESS_LEVELS = ["Can view", "Can comment", "Can edit", "Full access"]

const WORKSPACE_MEMBERS = [
  { id: "usr_002", name: "Amara Okonkwo", role: "Product Designer", avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Amara" },
  { id: "usr_003", name: "Tunde Adeyemi", role: "Engineer",          avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Tunde" },
  { id: "usr_004", name: "Chisom Eze",    role: "Product Manager",   avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Chisom" },
  { id: "usr_005", name: "Fatima Bello",  role: "Data Analyst",      avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Fatima" },
]

// ─── Review row ───────────────────────────────────────────────────────────────

function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b last:border-0">
      <span className="text-sm text-muted-foreground shrink-0 w-36">{label}</span>
      <span className="text-sm text-right">{value}</span>
    </div>
  )
}

// ─── Create project flow ──────────────────────────────────────────────────────

function CreateProjectFlow({
  onCancel,
  onComplete,
}: {
  onCancel: () => void
  onComplete: (name: string) => void
}) {
  const form = useMultiStepForm(STEPS)

  // ── Step: basics ───────────────────────────────────────────────────────────
  const [name, setName]               = React.useState("")
  const [description, setDescription] = React.useState("")
  const [color, setColor]             = React.useState("violet")
  const [visibility, setVisibility]   = React.useState<Visibility>("team")
  const [nameError, setNameError]     = React.useState("")

  // ── Step: timeline ─────────────────────────────────────────────────────────
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined)
  const [dueDate, setDueDate]     = React.useState<Date | undefined>(undefined)
  const [priority, setPriority]   = React.useState("")

  // ── Step: permissions ──────────────────────────────────────────────────────
  const [defaultAccess, setDefaultAccess]       = React.useState("")
  const [requireApproval, setRequireApproval]   = React.useState(false)
  const [notifyOnJoin, setNotifyOnJoin]         = React.useState(true)

  // ── Step: team ─────────────────────────────────────────────────────────────
  const [selectedMembers, setSelectedMembers] = React.useState<Set<string>>(new Set())

  function toggleMember(id: string) {
    setSelectedMembers(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  async function handleNext() {
    if (form.currentStepId === "basics") {
      if (!name.trim()) {
        setNameError("Project name is required")
        form.markStepError(form.currentStepIndex)
        return
      }
      setNameError("")
      form.clearStepError(form.currentStepIndex)
    }
    if (form.isLastStep) {
      form.setIsSubmitting(true)
      await new Promise(r => setTimeout(r, 900))
      form.setIsSubmitting(false)
      form.setIsComplete(true)
      onComplete(name)
    } else {
      form.goNext()
    }
  }

  const colorConfig  = PROJECT_COLORS.find(c => c.id === color)!
  const nextFlatStep = FLAT_STEPS[form.currentStepIndex + 1]
  const chosenMembers = WORKSPACE_MEMBERS.filter(m => selectedMembers.has(m.id))

  const stepFooter = (
    <div className="border-t pt-6">
      <StepFooter
        isFirstStep={form.isFirstStep}
        isLastStep={form.isLastStep}
        onBack={form.goBack}
        onNext={handleNext}
        onCancel={onCancel}
        isLoading={form.isSubmitting}
        submitLabel="Create project"
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
            <h3 className="text-base font-semibold">&ldquo;{name}&rdquo; created</h3>
            <p className="text-sm text-muted-foreground">
              Your project is ready. Start adding tasks and invite your team to collaborate.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={onCancel}>Back to projects</Button>
            <Button>Open project</Button>
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
      {/* ── 0: basics (flat step) ───────────────────────────────────────────── */}
      <StepTransition index={0} currentIndex={form.currentStepIndex}>
        <StepHeader title="Project basics" description="Name, colour, and visibility for your project." />

        <StepFormSection>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="proj-name">Project name</Label>
            <Input
              id="proj-name"
              value={name}
              onChange={e => { setName(e.target.value); setNameError("") }}
              placeholder="e.g. Q3 Marketing Campaign"
              aria-invalid={!!nameError}
            />
            {nameError && <p className="text-xs text-destructive">{nameError}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="proj-desc">
              Description
              <span className="ml-1.5 text-muted-foreground font-normal text-xs">Optional</span>
            </Label>
            <Textarea
              id="proj-desc"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What is this project about?"
              rows={3}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Project colour</Label>
            <div className="flex items-center gap-2">
              {PROJECT_COLORS.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColor(c.id)}
                  aria-label={c.label}
                  aria-pressed={color === c.id}
                  className={cn(
                    "w-7 h-7 rounded-full transition-all",
                    c.cls,
                    color === c.id
                      ? "ring-2 ring-offset-2 ring-offset-background ring-foreground scale-110"
                      : "opacity-60 hover:opacity-100",
                  )}
                />
              ))}
            </div>
          </div>
        </StepFormSection>

        <StepFormSection title="Visibility">
          <div className="flex flex-col gap-2">
            {VISIBILITY_OPTIONS.map(opt => {
              const Icon     = opt.icon
              const selected = visibility === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setVisibility(opt.id)}
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

        {stepFooter}
      </StepTransition>

      {/* ── 1: timeline (sub-step) ──────────────────────────────────────────── */}
      <StepTransition index={1} currentIndex={form.currentStepIndex}>
        <StepHeader title="Timeline" description="Set your project start and due dates." />

        <StepFormSection>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Start date</Label>
              <DatePicker value={startDate} onChange={setStartDate} placeholder="Pick start date" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Due date</Label>
              <DatePicker value={dueDate} onChange={setDueDate} placeholder="Pick due date" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="proj-priority">
              Priority
              <span className="ml-1.5 text-muted-foreground font-normal text-xs">Optional</span>
            </Label>
            <Select value={priority} onValueChange={v => setPriority(v ?? "")}>
              <SelectTrigger id="proj-priority">
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
        </StepFormSection>

        {stepFooter}
      </StepTransition>

      {/* ── 2: permissions (sub-step) ───────────────────────────────────────── */}
      <StepTransition index={2} currentIndex={form.currentStepIndex}>
        <StepHeader title="Permissions" description="Control who can view and contribute." />

        <StepFormSection>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="proj-access">Default member access</Label>
            <Select value={defaultAccess} onValueChange={v => setDefaultAccess(v ?? "")}>
              <SelectTrigger id="proj-access">
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {ACCESS_LEVELS.map(a => (
                    <SelectItem key={a} value={a}>{a}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Applies to workspace members who aren&apos;t explicitly added to this project.
            </p>
          </div>
        </StepFormSection>

        <StepFormSection title="Advanced">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">Require approval to join</span>
                <span className="text-xs text-muted-foreground">Members must be approved before gaining access.</span>
              </div>
              <Switch checked={requireApproval} onCheckedChange={setRequireApproval} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">Notify on new member</span>
                <span className="text-xs text-muted-foreground">Project owners get notified when someone joins.</span>
              </div>
              <Switch checked={notifyOnJoin} onCheckedChange={setNotifyOnJoin} />
            </div>
          </div>
        </StepFormSection>

        {stepFooter}
      </StepTransition>

      {/* ── 3: team (flat step, optional) ───────────────────────────────────── */}
      <StepTransition index={3} currentIndex={form.currentStepIndex}>
        <StepHeader title="Team" description="Add collaborators to this project." />

        <StepFormSection>
          <div className="flex flex-col gap-2">
            {WORKSPACE_MEMBERS.map(member => {
              const selected = selectedMembers.has(member.id)
              return (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => toggleMember(member.id)}
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
          {selectedMembers.size === 0 && (
            <p className="text-xs text-muted-foreground">
              No members selected. You can always add collaborators after creating the project.
            </p>
          )}
        </StepFormSection>

        {stepFooter}
      </StepTransition>

      {/* ── 4: review (flat step) ───────────────────────────────────────────── */}
      <StepTransition index={4} currentIndex={form.currentStepIndex}>
        <StepHeader title="Review & create" description="Confirm your settings before creating." />

        <StepFormSection title="Basics">
          <div className="rounded-xl border bg-card px-4 divide-y">
            <ReviewRow
              label="Name"
              value={
                <div className="flex items-center gap-2 justify-end">
                  <div className={cn("w-3 h-3 rounded-full shrink-0", colorConfig.cls)} />
                  <span>{name || "—"}</span>
                </div>
              }
            />
            <ReviewRow label="Description" value={description || <span className="text-muted-foreground">None</span>} />
            <ReviewRow label="Visibility" value={VISIBILITY_OPTIONS.find(v => v.id === visibility)?.label ?? "—"} />
          </div>
        </StepFormSection>

        <StepFormSection title="Timeline">
          <div className="rounded-xl border bg-card px-4 divide-y">
            <ReviewRow label="Start date" value={startDate ? startDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : <span className="text-muted-foreground">Not set</span>} />
            <ReviewRow label="Due date"   value={dueDate   ? dueDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : <span className="text-muted-foreground">Not set</span>} />
            <ReviewRow label="Priority"   value={priority  || <span className="text-muted-foreground">Not set</span>} />
          </div>
        </StepFormSection>

        <StepFormSection title="Team">
          <div className="rounded-xl border bg-card px-4 divide-y">
            {chosenMembers.length === 0 ? (
              <div className="py-3 text-sm text-muted-foreground">No members added</div>
            ) : (
              chosenMembers.map(m => (
                <div key={m.id} className="flex items-center gap-3 py-3">
                  <Avatar size="sm">
                    <AvatarImage src={m.avatar} alt={m.name} />
                    <AvatarFallback>{m.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </StepFormSection>

        {stepFooter}
      </StepTransition>
    </EmbeddedMultiStepLayout>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [isCreating, setIsCreating] = React.useState(false)
  const [formKey, setFormKey]       = React.useState(0)

  function handleCancel() {
    setIsCreating(false)
    setFormKey(k => k + 1)
  }

  function handleComplete(name: string) {
    toast.success(`"${name}" created`)
    setIsCreating(false)
    setFormKey(k => k + 1)
  }

  return (
    <>
      <SiteHeader
        left={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                {isCreating ? (
                  <BreadcrumbLink
                    href="#"
                    onClick={e => { e.preventDefault(); handleCancel() }}
                  >
                    Projects
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isCreating ? (
                  <BreadcrumbPage>New project</BreadcrumbPage>
                ) : (
                  <BreadcrumbPage>Projects</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />

      {isCreating ? (
        <CreateProjectFlow
          key={formKey}
          onCancel={handleCancel}
          onComplete={handleComplete}
        />
      ) : (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 md:overflow-y-auto">
          <PageHeader
            title="Projects"
            description="Organise and manage all your workspace projects in one place."
            actions={
              <Button size="sm" onClick={() => setIsCreating(true)}>
                <RiAddLine />
                New project
              </Button>
            }
          />
          <Empty className="flex-1 border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <RiFolderLine />
              </EmptyMedia>
              <EmptyTitle>No projects yet</EmptyTitle>
              <EmptyDescription>
                Create a project to start organising your work, tasks, and collaborators.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="sm" onClick={() => setIsCreating(true)}>
                <RiAddLine />
                Create your first project
              </Button>
            </EmptyContent>
          </Empty>
        </div>
      )}
    </>
  )
}
