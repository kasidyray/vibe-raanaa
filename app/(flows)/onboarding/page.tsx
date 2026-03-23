"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  RiCheckLine,
  RiRocketLine,
  RiTeamLine,
  RiBuildingLine,
  RiGroupLine,
} from "@remixicon/react"
import { cn } from "@/lib/utils"
import { useSplitForm } from "@/components/split-form/use-split-form"
import { SplitFormLayout } from "@/components/split-form/split-form-layout"
import { SplitFormNav } from "@/components/split-form/split-form-nav"
import { SplitFormStep } from "@/components/split-form/split-form-step"
import { SplitFormHeader } from "@/components/split-form/split-form-header"
import { SplitFormSection } from "@/components/split-form/split-form-section"
import { SplitFormFooter } from "@/components/split-form/split-form-footer"
import type { StepConfig } from "@/lib/steps"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

// ─── Steps ────────────────────────────────────────────────────────────────────

const STEPS: StepConfig[] = [
  {
    id: "account",
    title: "Account setup",
    subSteps: [
      { id: "profile",     title: "Your profile" },
      { id: "preferences", title: "Preferences", optional: true },
    ],
  },
  {
    id: "workspace",
    title: "Your workspace",
    subSteps: [
      { id: "details",  title: "Workspace details" },
      { id: "branding", title: "Branding" },
    ],
  },
  {
    id: "team",
    title: "Your team",
    subSteps: [
      { id: "invite", title: "Invite members", optional: true },
      { id: "roles",  title: "Configure roles", optional: true },
    ],
  },
  {
    id: "launch",
    title: "Launch",
    subSteps: [
      { id: "review", title: "Review & launch" },
    ],
  },
]

// ─── Workspace type cards ─────────────────────────────────────────────────────

type WsType = "startup" | "agency" | "enterprise" | "nonprofit"

const WS_TYPES: { id: WsType; label: string; description: string; icon: React.ElementType }[] = [
  { id: "startup",    label: "Startup",    description: "Early-stage team building a product.",   icon: RiRocketLine   },
  { id: "agency",     label: "Agency",     description: "A team that serves external clients.",    icon: RiTeamLine     },
  { id: "enterprise", label: "Enterprise", description: "Large organisation with multiple teams.", icon: RiBuildingLine },
  { id: "nonprofit",  label: "Non-profit", description: "Mission-driven organisation.",            icon: RiGroupLine    },
]

function WsTypeCard({
  type, icon: Icon, label, description, selected, onClick,
}: { type: WsType; icon: React.ElementType; label: string; description: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex items-start gap-4 p-4 rounded-xl border text-left transition-colors w-full",
        selected ? "border-primary/40 bg-primary/5" : "border-border bg-card hover:bg-accent/50",
      )}
    >
      <div className={cn(
        "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
        selected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
      )}>
        <Icon className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      {selected && (
        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
        </div>
      )}
    </button>
  )
}

// ─── Brand colour swatches ────────────────────────────────────────────────────

const BRAND_COLORS = [
  { id: "violet", label: "Violet", cls: "bg-violet-500" },
  { id: "blue",   label: "Blue",   cls: "bg-blue-500"   },
  { id: "cyan",   label: "Cyan",   cls: "bg-cyan-500"   },
  { id: "green",  label: "Green",  cls: "bg-green-500"  },
  { id: "amber",  label: "Amber",  cls: "bg-amber-500"  },
  { id: "rose",   label: "Rose",   cls: "bg-rose-500"   },
]

// ─── Review row ───────────────────────────────────────────────────────────────

function ReviewRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-start justify-between gap-6 py-3.5 border-b last:border-0">
      <span className="text-sm text-muted-foreground shrink-0 w-44">{label}</span>
      <span className="text-sm">{value || <span className="text-muted-foreground/50">—</span>}</span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter()
  const form   = useSplitForm(STEPS)

  // ── Step: profile ──────────────────────────────────────────────────────────
  const [firstName, setFirstName]       = React.useState("")
  const [lastName, setLastName]         = React.useState("")
  const [jobTitle, setJobTitle]         = React.useState("")
  const [firstNameErr, setFirstNameErr] = React.useState("")
  const [lastNameErr, setLastNameErr]   = React.useState("")

  // ── Step: preferences ─────────────────────────────────────────────────────
  const [language, setLanguage] = React.useState("")
  const [timezone, setTimezone] = React.useState("")

  // ── Step: details ─────────────────────────────────────────────────────────
  const [wsName, setWsName]   = React.useState("")
  const [wsDesc, setWsDesc]   = React.useState("")
  const [wsType, setWsType]   = React.useState<WsType | "">("")
  const [wsNameErr, setWsNameErr] = React.useState("")

  // ── Step: branding ────────────────────────────────────────────────────────
  const [brandColor, setBrandColor]     = React.useState("violet")
  const [brandInitial, setBrandInitial] = React.useState("")

  // ── Steps: invite + roles (loading skeleton) ───────────────────────────────
  const [inviteEmails, setInviteEmails] = React.useState("")
  const [defaultRole, setDefaultRole]   = React.useState("")
  const [teamLoading, setTeamLoading]   = React.useState(false)

  React.useEffect(() => {
    if (form.stepId === "invite" || form.stepId === "roles") {
      setTeamLoading(true)
      const t = setTimeout(() => setTeamLoading(false), 700)
      return () => clearTimeout(t)
    }
  }, [form.stepId])

  // ── Helpers ────────────────────────────────────────────────────────────────

  // Section label — title of the top-level step containing the current step
  const sectionLabel = STEPS.find(s =>
    s.subSteps
      ? s.subSteps.some(sub => sub.id === form.stepId)
      : s.id === form.stepId
  )?.title ?? ""

  const remaining = form.total - form.index - 1

  function validate(): boolean {
    if (form.stepId === "profile") {
      let ok = true
      if (!firstName.trim()) { setFirstNameErr("Required"); ok = false } else setFirstNameErr("")
      if (!lastName.trim())  { setLastNameErr("Required");  ok = false } else setLastNameErr("")
      if (!ok) { form.markError(form.index); return false }
      form.clearError(form.index)
    }
    if (form.stepId === "details") {
      if (!wsName.trim()) { setWsNameErr("Required"); form.markError(form.index); return false }
      form.clearError(form.index)
      setWsNameErr("")
    }
    return true
  }

  async function handleNext() {
    if (!validate()) return
    if (form.isLast) {
      form.setSubmitting(true)
      await new Promise(r => setTimeout(r, 1200))
      form.setSubmitting(false)
      form.setDone(true)
    } else {
      form.next()
    }
  }

  const colorConfig = BRAND_COLORS.find(c => c.id === brandColor)!

  // ── Completion ─────────────────────────────────────────────────────────────
  if (form.isDone) {
    return (
      <SplitFormLayout>
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="flex flex-col items-center text-center gap-6 max-w-lg">
            <div className="w-14 h-14 rounded-full bg-success/15 flex items-center justify-center">
              <RiCheckLine className="size-7 text-success" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold">{wsName || "Your workspace"} is live</h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Everything is set up and ready to go. Your team can now log in and start collaborating.
              </p>
            </div>
            <div className="flex gap-3">
              <Button size="lg" onClick={() => router.push("/dashboard")}>
                Go to dashboard
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push("/invite")}>
                Invite more members
              </Button>
            </div>
          </div>
        </div>
      </SplitFormLayout>
    )
  }

  return (
    <SplitFormLayout
      onSaveExit={() => { toast.info("Progress saved"); router.push("/dashboard") }}
      sectionLabel={sectionLabel}
      sectionProgress={form.progress}
      sidebar={
        <SplitFormNav
          steps={STEPS}
          currentStepId={form.stepId}
          getStatus={form.statusById}
          onStepClick={form.goToId}
        />
      }
      footer={
        <SplitFormFooter
          isFirst={form.isFirst}
          isLast={form.isLast}
          onBack={form.back}
          onNext={handleNext}
          onCancel={() => router.push("/dashboard")}
          isLoading={form.isSubmitting}
          isNextDisabled={teamLoading}
          submitLabel="Launch workspace"
          helperText={remaining > 0 ? `${remaining} step${remaining > 1 ? "s" : ""} remaining` : undefined}
        />
      }
    >
      {/* ── 0: Your profile ─────────────────────────────────────────────── */}
      <SplitFormStep index={0} currentIndex={form.index}>
        <SplitFormHeader
          title="Set up your profile"
          description="This is how your teammates will see you across the workspace."
        />
        <SplitFormSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ob-first">First name</Label>
              <Input
                id="ob-first"
                value={firstName}
                onChange={e => { setFirstName(e.target.value); setFirstNameErr("") }}
                placeholder="Ikedi"
                aria-invalid={!!firstNameErr}
              />
              {firstNameErr && <p className="text-xs text-destructive">{firstNameErr}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ob-last">Last name</Label>
              <Input
                id="ob-last"
                value={lastName}
                onChange={e => { setLastName(e.target.value); setLastNameErr("") }}
                placeholder="Eze"
                aria-invalid={!!lastNameErr}
              />
              {lastNameErr && <p className="text-xs text-destructive">{lastNameErr}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-1.5 max-w-lg">
            <Label htmlFor="ob-title">
              Job title
              <span className="ml-1.5 text-muted-foreground font-normal text-xs">Optional</span>
            </Label>
            <Input
              id="ob-title"
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              placeholder="e.g. Product Designer"
            />
          </div>
        </SplitFormSection>
      </SplitFormStep>

      {/* ── 1: Preferences ──────────────────────────────────────────────── */}
      <SplitFormStep index={1} currentIndex={form.index}>
        <SplitFormHeader
          title="Your preferences"
          description="Personalise how the workspace works for you. You can change these any time."
        />
        <SplitFormSection className="max-w-sm">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ob-lang">Language</Label>
            <Select value={language} onValueChange={v => setLanguage(v ?? "")}>
              <SelectTrigger id="ob-lang"><SelectValue placeholder="Select language" /></SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {["English", "French", "Spanish", "German", "Portuguese"].map(l => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ob-tz">Timezone</Label>
            <Select value={timezone} onValueChange={v => setTimezone(v ?? "")}>
              <SelectTrigger id="ob-tz"><SelectValue placeholder="Select timezone" /></SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[
                    "UTC",
                    "Africa/Lagos (WAT, UTC+1)",
                    "Europe/London (GMT, UTC+0)",
                    "America/New_York (ET, UTC−5)",
                    "America/Los_Angeles (PT, UTC−8)",
                    "Asia/Dubai (GST, UTC+4)",
                  ].map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </SplitFormSection>
      </SplitFormStep>

      {/* ── 2: Workspace details ────────────────────────────────────────── */}
      <SplitFormStep index={2} currentIndex={form.index}>
        <SplitFormHeader
          title="Name your workspace"
          description="This will be visible to everyone you invite. You can always change it later."
        />
        <SplitFormSection className="max-w-lg">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ob-wsname">Workspace name</Label>
            <Input
              id="ob-wsname"
              value={wsName}
              onChange={e => { setWsName(e.target.value); setWsNameErr("") }}
              placeholder="e.g. Acme Corp"
              aria-invalid={!!wsNameErr}
            />
            {wsNameErr && <p className="text-xs text-destructive">{wsNameErr}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ob-wsdesc">
              Description
              <span className="ml-1.5 text-muted-foreground font-normal text-xs">Optional</span>
            </Label>
            <Textarea
              id="ob-wsdesc"
              value={wsDesc}
              onChange={e => setWsDesc(e.target.value)}
              placeholder="What does your team work on?"
              rows={3}
            />
          </div>
        </SplitFormSection>

        <SplitFormSection title="Workspace type" className="max-w-lg">
          <div className="flex flex-col gap-2">
            {WS_TYPES.map(t => (
              <WsTypeCard
                key={t.id}
                {...t}
                selected={wsType === t.id}
                onClick={() => setWsType(t.id)}
              />
            ))}
          </div>
        </SplitFormSection>
      </SplitFormStep>

      {/* ── 3: Branding ─────────────────────────────────────────────────── */}
      <SplitFormStep index={3} currentIndex={form.index}>
        <SplitFormHeader
          title="Brand your workspace"
          description="Choose a colour and initial that represent your team."
        />

        {/* Logo preview */}
        <div className="flex items-center gap-4 max-w-sm">
          <div className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0",
            colorConfig.cls,
          )}>
            {(brandInitial || wsName?.[0] || "W").toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium">{wsName || "Your workspace"}</p>
            <p className="text-xs text-muted-foreground">Workspace logo preview</p>
          </div>
        </div>

        <SplitFormSection title="Brand colour">
          <div className="flex items-center gap-3">
            {BRAND_COLORS.map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => setBrandColor(c.id)}
                aria-label={c.label}
                aria-pressed={brandColor === c.id}
                className={cn(
                  "w-8 h-8 rounded-full transition-all",
                  c.cls,
                  brandColor === c.id
                    ? "ring-2 ring-offset-2 ring-offset-background ring-foreground scale-110"
                    : "opacity-60 hover:opacity-100",
                )}
              />
            ))}
          </div>
        </SplitFormSection>

        <SplitFormSection title="Logo initial" className="max-w-xs">
          <div className="flex flex-col gap-1.5">
            <Input
              value={brandInitial}
              onChange={e => setBrandInitial(e.target.value.slice(0, 1))}
              placeholder={wsName?.[0]?.toUpperCase() || "W"}
              maxLength={1}
              className="uppercase w-20 text-center text-lg font-bold"
            />
            <p className="text-xs text-muted-foreground">
              Leave blank to use the first letter of your workspace name.
            </p>
          </div>
        </SplitFormSection>
      </SplitFormStep>

      {/* ── 4: Invite members ───────────────────────────────────────────── */}
      <SplitFormStep index={4} currentIndex={form.index}>
        {teamLoading ? (
          <div className="flex flex-col gap-6 max-w-lg animate-pulse">
            <div className="flex flex-col gap-3">
              <div className="h-9 bg-muted rounded-lg w-3/4" />
              <div className="h-5 bg-muted rounded w-1/2" />
            </div>
            <div className="h-32 bg-muted rounded-xl" />
          </div>
        ) : (
          <>
            <SplitFormHeader
              title="Invite your team"
              description="Add people by email. They'll receive an invitation to join the workspace."
            />
            <SplitFormSection className="max-w-lg">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="ob-emails">Email addresses</Label>
                <Textarea
                  id="ob-emails"
                  value={inviteEmails}
                  onChange={e => setInviteEmails(e.target.value)}
                  placeholder={"amara@acme.com\ntunde@acme.com\nchisom@acme.com"}
                  rows={5}
                />
                <p className="text-xs text-muted-foreground">One email per line.</p>
              </div>
            </SplitFormSection>
          </>
        )}
      </SplitFormStep>

      {/* ── 5: Configure roles ──────────────────────────────────────────── */}
      <SplitFormStep index={5} currentIndex={form.index}>
        {teamLoading ? (
          <div className="flex flex-col gap-6 max-w-lg animate-pulse">
            <div className="flex flex-col gap-3">
              <div className="h-9 bg-muted rounded-lg w-2/3" />
              <div className="h-5 bg-muted rounded w-1/2" />
            </div>
            <div className="h-11 bg-muted rounded-lg" />
          </div>
        ) : (
          <>
            <SplitFormHeader
              title="Configure roles"
              description="Set the default role assigned to new members when they join."
            />
            <SplitFormSection className="max-w-sm">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="ob-role">Default member role</Label>
                <Select value={defaultRole} onValueChange={v => setDefaultRole(v ?? "")}>
                  <SelectTrigger id="ob-role"><SelectValue placeholder="Select a role" /></SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {["Viewer", "Member", "Editor", "Admin"].map(r => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Members can be reassigned to specific roles after joining.
                </p>
              </div>
            </SplitFormSection>
          </>
        )}
      </SplitFormStep>

      {/* ── 6: Review & launch ──────────────────────────────────────────── */}
      <SplitFormStep index={6} currentIndex={form.index}>
        <SplitFormHeader
          title="Review & launch"
          description="Double-check your settings. You can change anything after launching."
        />

        <SplitFormSection title="Your profile" className="max-w-lg">
          <div className="border rounded-xl px-5 divide-y bg-card">
            <ReviewRow label="Name" value={[firstName, lastName].filter(Boolean).join(" ") || undefined} />
            <ReviewRow label="Job title" value={jobTitle || undefined} />
            <ReviewRow label="Language" value={language || undefined} />
            <ReviewRow label="Timezone" value={timezone || undefined} />
          </div>
        </SplitFormSection>

        <SplitFormSection title="Workspace" className="max-w-lg">
          <div className="border rounded-xl px-5 divide-y bg-card">
            <ReviewRow label="Workspace name" value={wsName || undefined} />
            <ReviewRow label="Description" value={wsDesc || undefined} />
            <ReviewRow label="Type" value={WS_TYPES.find(t => t.id === wsType)?.label} />
            <ReviewRow label="Brand colour" value={colorConfig.label} />
          </div>
        </SplitFormSection>

        <SplitFormSection title="Team" className="max-w-lg">
          <div className="border rounded-xl px-5 divide-y bg-card">
            <ReviewRow
              label="Invitations"
              value={inviteEmails.trim()
                ? `${inviteEmails.trim().split("\n").filter(Boolean).length} member(s) to be invited`
                : "None"}
            />
            <ReviewRow label="Default role" value={defaultRole || "Not set"} />
          </div>
        </SplitFormSection>
      </SplitFormStep>
    </SplitFormLayout>
  )
}
