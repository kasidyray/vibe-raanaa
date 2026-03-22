"use client"

import * as React from "react"
import { toast } from "sonner"
import { RiFolderLine, RiAddLine, RiCheckLine } from "@remixicon/react"
import { cn } from "@/lib/utils"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { EmbeddedMultiStepLayout } from "@/components/multi-step-form/embedded-multi-step-layout"
import { StepSidebar } from "@/components/multi-step-form/step-sidebar"
import { StepHeader } from "@/components/multi-step-form/step-header"
import { StepFormSection } from "@/components/multi-step-form/step-form-section"
import { StepFooter } from "@/components/multi-step-form/step-footer"
import { StepTransition } from "@/components/multi-step-form/step-transition"
import { useMultiStepForm } from "@/components/multi-step-form/use-multi-step-form"
import type { StepConfig } from "@/components/multi-step-form/types"

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS: StepConfig[] = [
  { id: "details", title: "Project details",  description: "Name your project and give it a brief description." },
  { id: "team",    title: "Add team",          description: "Choose who can collaborate on this project.", optional: true },
  { id: "review",  title: "Review & create",   description: "Confirm your project settings before creating." },
]

// ─── Project colour swatches ──────────────────────────────────────────────────

const PROJECT_COLORS = [
  { id: "violet", label: "Violet", cls: "bg-violet-500" },
  { id: "blue",   label: "Blue",   cls: "bg-blue-500" },
  { id: "cyan",   label: "Cyan",   cls: "bg-cyan-500" },
  { id: "green",  label: "Green",  cls: "bg-green-500" },
  { id: "amber",  label: "Amber",  cls: "bg-amber-500" },
  { id: "rose",   label: "Rose",   cls: "bg-rose-500" },
]

// ─── Workspace members ────────────────────────────────────────────────────────

const WORKSPACE_MEMBERS = [
  { id: "usr_002", name: "Amara Okonkwo", role: "Product Designer",  avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Amara" },
  { id: "usr_003", name: "Tunde Adeyemi", role: "Engineer",           avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Tunde" },
  { id: "usr_004", name: "Chisom Eze",    role: "Product Manager",    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Chisom" },
  { id: "usr_005", name: "Fatima Bello",  role: "Data Analyst",       avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Fatima" },
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
  const form = useMultiStepForm(STEPS.map(s => s.id))

  // Step 1
  const [name, setName]               = React.useState("")
  const [description, setDescription] = React.useState("")
  const [color, setColor]             = React.useState("violet")
  const [nameError, setNameError]     = React.useState("")

  // Step 2
  const [selectedMembers, setSelectedMembers] = React.useState<Set<string>>(new Set())

  function toggleMember(id: string) {
    setSelectedMembers(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  async function handleNext() {
    if (form.currentStepId === "details") {
      if (!name.trim()) {
        setNameError("Project name is required")
        return
      }
      setNameError("")
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

  const nextStep    = STEPS[form.currentStepIndex + 1]
  const colorConfig = PROJECT_COLORS.find(c => c.id === color)!
  const chosenMembers = WORKSPACE_MEMBERS.filter(m => selectedMembers.has(m.id))

  // Shared footer node — passed into each StepTransition as the last child
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
        helperText={nextStep ? `Next: ${nextStep.title}` : undefined}
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
        />
      }
    >
      {/* ── Step 1: Project details ─────────────────────────────────────────── */}
      <StepTransition index={0} currentIndex={form.currentStepIndex}>
        <StepHeader title={STEPS[0].title} description={STEPS[0].description} />

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
              <span className="ml-1 text-muted-foreground font-normal">Optional</span>
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
                      ? "ring-2 ring-offset-2 ring-offset-background ring-foreground"
                      : "opacity-60 hover:opacity-100",
                  )}
                />
              ))}
            </div>
          </div>
        </StepFormSection>

        {stepFooter}
      </StepTransition>

      {/* ── Step 2: Add team ────────────────────────────────────────────────── */}
      <StepTransition index={1} currentIndex={form.currentStepIndex}>
        <StepHeader title={STEPS[1].title} description={STEPS[1].description} />

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
                    selected
                      ? "border-primary/40 bg-primary/5"
                      : "border-border bg-card hover:bg-accent/50",
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
                  {selected && (
                    <RiCheckLine className="size-4 text-primary shrink-0" />
                  )}
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

      {/* ── Step 3: Review ──────────────────────────────────────────────────── */}
      <StepTransition index={2} currentIndex={form.currentStepIndex}>
        <StepHeader title={STEPS[2].title} description={STEPS[2].description} />

        <StepFormSection title="Project details">
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
            <ReviewRow label="Colour" value={colorConfig.label} />
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
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
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
