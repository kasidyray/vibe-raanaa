"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  RiAddLine,
  RiBriefcaseLine,
  RiBuilding2Line,
  RiCalendarLine,
  RiCheckLine,
  RiCloseLine,
  RiContractLeftRightLine,
  RiDeleteBinLine,
  RiDownloadLine,
  RiEditLine,
  RiFlashlightLine,
  RiGroupLine,
  RiMailLine,
  RiMessage2Line,
  RiMore2Line,
  RiPhoneLine,
  RiUserLine,
} from "@remixicon/react"

import { SiteHeader }  from "@/components/site-header"
import { Skeleton }    from "@/components/ui/skeleton"
import { Container }   from "@/components/ui/container"
import { PageHeader }  from "@/components/ui/page-header"
import { Badge }       from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator, BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button }   from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input }    from "@/components/ui/input"
import { Label }    from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent,
} from "@/components/ui/empty"
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose,
} from "@/components/ui/drawer"
import {
  DataTable, DataTableToolbar, DataTableSearch, DataTableFacetedFilter,
  DataTableSortMenu, DataTableColumnToggle, DataTablePagination, DataTableSelectionBar,
} from "@/components/ui/data-table"
import { EmbeddedMultiStepLayout } from "@/components/multi-step-form/embedded-multi-step-layout"
import { StepSidebar }             from "@/components/multi-step-form/step-sidebar"
import { StepHeader }              from "@/components/multi-step-form/step-header"
import { StepFormSection }         from "@/components/multi-step-form/step-form-section"
import { StepFooter }              from "@/components/multi-step-form/step-footer"
import { StepTransition }          from "@/components/multi-step-form/step-transition"
import { StepSkeleton }            from "@/components/multi-step-form/step-skeleton"
import { useMultiStepForm }        from "@/components/multi-step-form/use-multi-step-form"
import { flattenStepIds }          from "@/lib/steps"
import type { StepConfig }         from "@/components/multi-step-form/types"

// ─── Types ───────────────────────────────────────────────────────────────────

type Lead = {
  id: string
  name: string
  avatar: string
  company: string
  companyLogo: string
  jobTitle: string
  email: string
}

type ContainerSize = "sm" | "default" | "lg" | "xl" | "full"
type LeadSource    = "inbound" | "outbound" | "referral" | "event" | "paid" | "cold" | "other"
type PriorityLevel = "Low" | "Medium" | "High" | "Critical"

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS: StepConfig[] = [
  { id: "contact",     title: "Contact info"  },
  { id: "company",     title: "Company"       },
  {
    id: "qualification",
    title: "Qualification",
    subSteps: [
      { id: "details", title: "Deal details" },
      { id: "source",  title: "Lead source"  },
    ],
  },
  { id: "assignment", title: "Assignment", optional: true },
  { id: "review",     title: "Review & add" },
]

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

// ─── Form constants ───────────────────────────────────────────────────────────

const INDUSTRIES = [
  "SaaS / Technology", "Finance / FinTech", "Healthcare", "E-commerce / Retail",
  "Marketing / Agency", "Manufacturing", "Professional Services", "Education",
  "Real Estate", "Other",
]

const COMPANY_SIZES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"]

const BUDGET_RANGES = ["Under $10k", "$10k–$50k", "$50k–$200k", "$200k+", "Unknown"]

const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "6–12 months", "No urgency"]

const LEAD_SOURCES: {
  id: LeadSource
  label: string
  description: string
  icon: React.ElementType
}[] = [
  { id: "inbound",  label: "Inbound",      description: "Lead found you through your content or website.", icon: RiDownloadLine   },
  { id: "outbound", label: "Outbound",     description: "Your team reached out via email or LinkedIn.",    icon: RiMailLine       },
  { id: "referral", label: "Referral",     description: "Introduced by an existing customer or partner.",  icon: RiGroupLine      },
  { id: "event",    label: "Event",        description: "Met at a conference, webinar, or trade show.",    icon: RiCalendarLine   },
  { id: "paid",     label: "Paid / Ads",   description: "Came from a paid advertising campaign.",          icon: RiFlashlightLine },
  { id: "cold",     label: "Cold outreach",description: "First contact was a cold call or message.",       icon: RiMessage2Line   },
  { id: "other",    label: "Other",        description: "Source doesn't fit any category above.",          icon: RiMore2Line      },
]

const PIPELINE_STAGES = ["New", "Contacted", "Qualified", "Proposal Sent", "Negotiating"]

const PRIORITIES: PriorityLevel[] = ["Low", "Medium", "High", "Critical"]

const TEAM_MEMBERS = [
  { id: "usr_001", name: "Ikedi Eze",     role: "Account Executive", avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Ikedi"  },
  { id: "usr_002", name: "Amara Okonkwo", role: "Sales Manager",     avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Amara"  },
  { id: "usr_003", name: "Tunde Adeyemi", role: "SDR",               avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Tunde"  },
  { id: "usr_004", name: "Chisom Eze",    role: "Account Manager",   avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Chisom" },
  { id: "usr_005", name: "Fatima Bello",  role: "Sales Rep",         avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Fatima" },
]

const PRIORITY_VARIANT: Record<PriorityLevel, "neutral" | "info" | "warning" | "critical"> = {
  Low: "neutral", Medium: "info", High: "warning", Critical: "critical",
}

const STAGE_VARIANT: Record<string, "neutral" | "info" | "success" | "caution" | "warning"> = {
  "New": "neutral", "Contacted": "info", "Qualified": "success",
  "Proposal Sent": "caution", "Negotiating": "warning",
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const LEADS: Lead[] = [
  { id: "1",  name: "Robert Johnson",  avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Robert",   company: "Loom",      companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=L&backgroundColor=6366f1",  jobTitle: "Sales Rep",               email: "robertjohnson@loom.com" },
  { id: "2",  name: "James Carter",    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=James",    company: "Notion",    companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=N&backgroundColor=000000",  jobTitle: "Sales Manager",           email: "james@gmail.com" },
  { id: "3",  name: "Priya Sharma",    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Priya",    company: "Slack",     companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=S&backgroundColor=4a154b",  jobTitle: "Account Manager",         email: "priya@auroratech.com" },
  { id: "4",  name: "Aarav Menon",     avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Aarav",    company: "Canva",     companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=C&backgroundColor=7c3aed",  jobTitle: "Sales Associate",         email: "aarav.menon@yahoo.com" },
  { id: "5",  name: "Sarah Mitchell",  avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Sarah",    company: "Facebook",  companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=F&backgroundColor=1877f2",  jobTitle: "Customer Success Lead",   email: "sarah@zencloud.io" },
  { id: "6",  name: "Riya Kapoor",     avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Riya",     company: "Twitter",   companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=T&backgroundColor=1da1f2",  jobTitle: "HR Coordinator",          email: "riyakapoor@outlook.com" },
  { id: "7",  name: "Nathan Reyes",    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Nathan",   company: "Spotify",   companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=Sp&backgroundColor=1db954", jobTitle: "Business Executive",      email: "nathanreyes@dev.co" },
  { id: "8",  name: "Michael Torres",  avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Michael",  company: "Mailchimp", companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=M&backgroundColor=ffe01b",  jobTitle: "Customer Success Lead",   email: "michael@outlook.com" },
  { id: "9",  name: "Olivia Brooks",   avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Olivia",   company: "Netflix",   companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=Ne&backgroundColor=e50914", jobTitle: "Sales Rep",               email: "oliviabrooks@co.com" },
  { id: "10", name: "Ethan Ward",      avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Ethan",    company: "Twitch",    companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=Tw&backgroundColor=9146ff", jobTitle: "Channel Sales Executive", email: "ethanward@gmail.com" },
  { id: "11", name: "Lucas Pereira",   avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Lucas",    company: "Dropbox",   companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=D&backgroundColor=0061ff",  jobTitle: "Growth Manager",          email: "lucas@outlook.com" },
  { id: "12", name: "Daniel Carter",   avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Daniel",   company: "Zapier",    companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=Z&backgroundColor=ff4a00",  jobTitle: "Partnership Manager",     email: "danielcarter@gmail.com" },
  { id: "13", name: "Amara Osei",      avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Amara",    company: "Figma",     companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=Fi&backgroundColor=f24e1e", jobTitle: "Design Lead",             email: "amara@figma.com" },
  { id: "14", name: "Chris Huang",     avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Chris",    company: "Linear",    companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=Li&backgroundColor=5e6ad2",  jobTitle: "Product Manager",         email: "chris@linear.app" },
  { id: "15", name: "Zoe Williams",    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Zoe",      company: "Vercel",    companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=V&backgroundColor=000000",  jobTitle: "Engineer",                email: "zoe@vercel.com" },
]

const JOB_TITLES = [...new Set(LEADS.map(l => l.jobTitle))].sort()
const COMPANIES  = [...new Set(LEADS.map(l => l.company))].sort()

const containerSizes: { value: ContainerSize; label: string }[] = [
  { value: "sm",      label: "Small"   },
  { value: "default", label: "Default" },
  { value: "lg",      label: "Large"   },
  { value: "xl",      label: "X-Large" },
  { value: "full",    label: "Full"    },
]

const SORT_COLUMNS = [
  { id: "name",     label: "Name" },
  { id: "company",  label: "Company" },
  { id: "jobTitle", label: "Job Title" },
  { id: "email",    label: "Email" },
]

// ─── Columns ─────────────────────────────────────────────────────────────────

const columns: ColumnDef<Lead>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={v => table.toggleAllPageRowsSelected(v === true)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <div onClick={e => e.stopPropagation()}>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={v => row.toggleSelected(v === true)}
          aria-label="Select row"
        />
      </div>
    ),
    size: 40,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        <Avatar className="size-7 rounded-full">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback className="text-xs">{row.original.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <span className="font-medium text-sm">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "company",
    header: "COMPANIES",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="size-5 rounded-sm">
          <AvatarImage src={row.original.companyLogo} alt={row.original.company} />
          <AvatarFallback className="text-[10px] rounded-sm">{row.original.company.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <span className="text-sm">{row.original.company}</span>
      </div>
    ),
    filterFn: (row, _id, filterValues: string[]) =>
      filterValues.length === 0 || filterValues.includes(row.original.company),
  },
  {
    accessorKey: "jobTitle",
    header: "JOB TITLE",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.jobTitle}</span>,
    filterFn: (row, _id, filterValues: string[]) =>
      filterValues.length === 0 || filterValues.includes(row.original.jobTitle),
  },
  {
    accessorKey: "email",
    header: "EMAIL",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.email}</span>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => (
      <div onClick={e => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="ml-auto" />}>
            <RiMore2Line />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem><RiUserLine />View lead</DropdownMenuItem>
              <DropdownMenuItem><RiEditLine />Edit</DropdownMenuItem>
              <DropdownMenuItem><RiMailLine />Send email</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive"><RiDeleteBinLine />Delete</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    size: 48,
  },
]

// ─── Review row ───────────────────────────────────────────────────────────────

function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b last:border-0">
      <span className="text-sm text-muted-foreground shrink-0 w-28">{label}</span>
      <span className="text-sm text-right">{value}</span>
    </div>
  )
}

// ─── Create lead flow ─────────────────────────────────────────────────────────

function CreateLeadFlow({
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

// ─── LeadsTableSkeleton ───────────────────────────────────────────────────────

function LeadsTableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-56 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="ml-auto h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
      <div>
        <div className="flex items-center gap-4 border-b px-4 py-2.5">
          <Skeleton className="size-4 rounded-sm" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20 ml-4" />
          <Skeleton className="h-3 w-16 ml-4" />
          <Skeleton className="h-3 w-24 ml-4" />
        </div>
        {Array.from({ length: rows }).map((_, i, arr) => (
          <div key={i} className={cn("flex items-center gap-4 px-4 py-3", i < arr.length - 1 && "border-b")}>
            <Skeleton className="size-4 shrink-0 rounded-sm" />
            <div className="flex flex-1 items-center gap-2.5">
              <Skeleton className="size-7 shrink-0 rounded-full" />
              <Skeleton className="h-3.5 w-28" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="size-5 shrink-0 rounded-sm" />
              <Skeleton className="h-3.5 w-24" />
            </div>
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3.5 w-40" />
            <Skeleton className="size-7 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Leads Table ─────────────────────────────────────────────────────────────

function LeadsTable() {
  const [isTableLoading, setIsTableLoading] = React.useState(true)

  React.useEffect(() => {
    const t = setTimeout(() => setIsTableLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  const [sorting,          setSorting]          = React.useState<SortingState>([])
  const [globalFilter,     setGlobalFilter]     = React.useState("")
  const [rowSelection,     setRowSelection]     = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [jobTitleFilter,   setJobTitleFilter]   = React.useState<string[]>([])
  const [companyFilter,    setCompanyFilter]    = React.useState<string[]>([])
  const [selectedLead,     setSelectedLead]     = React.useState<Lead | null>(null)

  const columnFilters = React.useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = []
    if (jobTitleFilter.length) filters.push({ id: "jobTitle", value: jobTitleFilter })
    if (companyFilter.length)  filters.push({ id: "company",  value: companyFilter  })
    return filters
  }, [jobTitleFilter, companyFilter])

  const hasActiveFilters = jobTitleFilter.length > 0 || companyFilter.length > 0

  const table = useReactTable({
    data: LEADS,
    columns,
    state: { sorting, globalFilter, rowSelection, columnVisibility, columnFilters },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const selectedCount = Object.keys(rowSelection).length

  if (isTableLoading) return <LeadsTableSkeleton rows={10} />

  return (
    <div className="flex flex-col gap-4">
      <DataTableToolbar>
        <DataTableSearch table={table} placeholder="Search by name, company..." />

        <DataTableFacetedFilter
          title="Job Title"
          options={JOB_TITLES}
          selectedValues={jobTitleFilter}
          onSelectionChange={setJobTitleFilter}
          icon={<RiBriefcaseLine className="opacity-60" />}
        />

        <DataTableFacetedFilter
          title="Company"
          options={COMPANIES}
          selectedValues={companyFilter}
          onSelectionChange={setCompanyFilter}
          icon={<RiBuilding2Line className="opacity-60" />}
        />

        {hasActiveFilters && (
          <button
            onClick={() => { setJobTitleFilter([]); setCompanyFilter([]) }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Reset
          </button>
        )}

        <div className="ml-auto flex items-center gap-2">
          <DataTableSortMenu
            sorting={sorting}
            onSortingChange={setSorting}
            columns={SORT_COLUMNS}
          />
          <DataTableColumnToggle table={table} />
        </div>
      </DataTableToolbar>

      <DataTable table={table} variant="bordered" emptyMessage="No leads found." onRowClick={setSelectedLead} />

      {table.getFilteredRowModel().rows.length > 0 && (
        <DataTablePagination
          table={table}
          style="classic"
          selectedCount={selectedCount}
          rowLabel="lead"
        />
      )}

      <DataTableSelectionBar
        count={selectedCount}
        onClear={() => setRowSelection({})}
        actions={[
          { icon: RiMailLine,     label: "Send email" },
          { icon: RiEditLine,     label: "Edit"       },
          { icon: RiDownloadLine, label: "Export"     },
          "separator",
          { icon: RiDeleteBinLine, label: "Delete", variant: "destructive", onClick: () => setRowSelection({}) },
        ]}
      />

      <Drawer direction="right" open={!!selectedLead} onOpenChange={open => !open && setSelectedLead(null)}>
        <DrawerContent className="sm:max-w-md">
          {selectedLead && (
            <div className="flex flex-col h-full overflow-y-auto">
              <DrawerHeader className="flex flex-row items-start justify-between gap-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10 rounded-full">
                    <AvatarImage src={selectedLead.avatar} alt={selectedLead.name} />
                    <AvatarFallback>{selectedLead.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DrawerTitle>{selectedLead.name}</DrawerTitle>
                    <p className="text-sm text-muted-foreground">{selectedLead.jobTitle}</p>
                  </div>
                </div>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon-sm" aria-label="Close"><RiCloseLine /></Button>
                </DrawerClose>
              </DrawerHeader>

              <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-1.5">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Company</p>
                  <div className="flex items-center gap-2.5">
                    <Avatar className="size-6 rounded-sm">
                      <AvatarImage src={selectedLead.companyLogo} alt={selectedLead.company} />
                      <AvatarFallback className="text-[10px] rounded-sm">{selectedLead.company.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{selectedLead.company}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Contact</p>
                  <div className="flex items-center gap-2 text-sm">
                    <RiMailLine className="size-4 text-muted-foreground shrink-0" />
                    <span>{selectedLead.email}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex items-center gap-2 border-t p-6">
                <Button className="flex-1"><RiMailLine />Send email</Button>
                <Button variant="outline" size="icon" aria-label="Edit"><RiEditLine /></Button>
                <Button variant="outline" size="icon" aria-label="Delete" className="text-destructive hover:text-destructive"><RiDeleteBinLine /></Button>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LeadsPage() {
  const [containerSize, setContainerSize] = React.useState<ContainerSize>("xl")
  const [isCreating,    setIsCreating]    = React.useState(false)
  const [formKey,       setFormKey]       = React.useState(0)

  function handleCancel() {
    setIsCreating(false)
    setFormKey(k => k + 1)
  }

  function handleComplete(name: string) {
    toast.success(`${name} added to leads`)
    setIsCreating(false)
    setFormKey(k => k + 1)
  }

  const content = (
    <>
      <PageHeader
        title="Leads"
        description="Track and manage your sales leads across all pipelines."
        actions={
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" aria-label="Change width" />}>
                <RiContractLeftRightLine />
                Width
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Content width</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {containerSizes.map(({ value, label }) => (
                    <DropdownMenuCheckboxItem
                      key={value}
                      checked={containerSize === value}
                      onClick={() => setContainerSize(value)}
                    >
                      {label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => setIsCreating(true)}><RiAddLine />New lead</Button>
          </div>
        }
      />
      <Tabs defaultValue="all" className="flex flex-1 flex-col">
        <div className="pb-4">
          <TabsList variant="pill">
            <TabsTrigger value="all">All leads</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all">
          <LeadsTable />
        </TabsContent>
        <TabsContent value="pipeline" className="flex flex-1">
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia variant="stacked">
                <RiBuilding2Line />
              </EmptyMedia>
              <EmptyTitle>Pipeline view coming soon</EmptyTitle>
              <EmptyDescription>
                The pipeline view is under construction. Check back later or continue managing leads from the table view.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" size="sm" onClick={() => setIsCreating(true)}>
                <RiAddLine />Add lead
              </Button>
            </EmptyContent>
          </Empty>
        </TabsContent>
      </Tabs>
    </>
  )

  return (
    <>
      <SiteHeader
        left={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                {isCreating ? (
                  <BreadcrumbLink href="#" onClick={e => { e.preventDefault(); handleCancel() }}>
                    Leads
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isCreating ? (
                  <BreadcrumbPage>New lead</BreadcrumbPage>
                ) : (
                  <BreadcrumbPage>Leads</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />

      {isCreating ? (
        <CreateLeadFlow
          key={formKey}
          onCancel={handleCancel}
          onComplete={handleComplete}
        />
      ) : (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 md:overflow-y-auto">
          {containerSize === "full" ? (
            <div className="flex flex-1 flex-col gap-6">{content}</div>
          ) : (
            <Container size={containerSize} className="flex flex-1 flex-col gap-6">{content}</Container>
          )}
        </div>
      )}
    </>
  )
}
