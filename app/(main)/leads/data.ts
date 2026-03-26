"use client"

import type { StepConfig } from "@/components/multi-step-form/types"
import {
  RiCalendarLine,
  RiDownloadLine,
  RiFlashlightLine,
  RiGroupLine,
  RiMailLine,
  RiMessage2Line,
  RiMore2Line,
} from "@remixicon/react"

// ─── Types ────────────────────────────────────────────────────────────────────

export type Lead = {
  id: string
  name: string
  avatar: string
  company: string
  companyLogo: string
  jobTitle: string
  email: string
}

export type ContainerSize = "sm" | "default" | "lg" | "xl" | "full"
export type LeadSource    = "inbound" | "outbound" | "referral" | "event" | "paid" | "cold" | "other"
export type PriorityLevel = "Low" | "Medium" | "High" | "Critical"

// ─── Step config ──────────────────────────────────────────────────────────────

export const STEPS: StepConfig[] = [
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

// ─── Form constants ───────────────────────────────────────────────────────────

export const INDUSTRIES = [
  "SaaS / Technology", "Finance / FinTech", "Healthcare", "E-commerce / Retail",
  "Marketing / Agency", "Manufacturing", "Professional Services", "Education",
  "Real Estate", "Other",
]

export const COMPANY_SIZES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"]

export const BUDGET_RANGES = ["Under $10k", "$10k–$50k", "$50k–$200k", "$200k+", "Unknown"]

export const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "6–12 months", "No urgency"]

export const LEAD_SOURCES: {
  id: LeadSource
  label: string
  description: string
  icon: React.ElementType
}[] = [
  { id: "inbound",  label: "Inbound",       description: "Lead found you through your content or website.", icon: RiDownloadLine   },
  { id: "outbound", label: "Outbound",      description: "Your team reached out via email or LinkedIn.",    icon: RiMailLine       },
  { id: "referral", label: "Referral",      description: "Introduced by an existing customer or partner.",  icon: RiGroupLine      },
  { id: "event",    label: "Event",         description: "Met at a conference, webinar, or trade show.",    icon: RiCalendarLine   },
  { id: "paid",     label: "Paid / Ads",    description: "Came from a paid advertising campaign.",          icon: RiFlashlightLine },
  { id: "cold",     label: "Cold outreach", description: "First contact was a cold call or message.",       icon: RiMessage2Line   },
  { id: "other",    label: "Other",         description: "Source doesn't fit any category above.",          icon: RiMore2Line      },
]

export const PIPELINE_STAGES = ["New", "Contacted", "Qualified", "Proposal Sent", "Negotiating"]

export const PRIORITIES: PriorityLevel[] = ["Low", "Medium", "High", "Critical"]

export const TEAM_MEMBERS = [
  { id: "usr_001", name: "Ikedi Eze",     role: "Account Executive", avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Ikedi"  },
  { id: "usr_002", name: "Amara Okonkwo", role: "Sales Manager",     avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Amara"  },
  { id: "usr_003", name: "Tunde Adeyemi", role: "SDR",               avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Tunde"  },
  { id: "usr_004", name: "Chisom Eze",    role: "Account Manager",   avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Chisom" },
  { id: "usr_005", name: "Fatima Bello",  role: "Sales Rep",         avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Fatima" },
]

export const PRIORITY_VARIANT: Record<PriorityLevel, "neutral" | "info" | "warning" | "critical"> = {
  Low: "neutral", Medium: "info", High: "warning", Critical: "critical",
}

export const STAGE_VARIANT: Record<string, "neutral" | "info" | "success" | "caution" | "warning"> = {
  "New": "neutral", "Contacted": "info", "Qualified": "success",
  "Proposal Sent": "caution", "Negotiating": "warning",
}

// ─── Mock data ────────────────────────────────────────────────────────────────

export const LEADS: Lead[] = [
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

// ─── Derived arrays ───────────────────────────────────────────────────────────

export const JOB_TITLES = [...new Set(LEADS.map(l => l.jobTitle))].sort()
export const COMPANIES  = [...new Set(LEADS.map(l => l.company))].sort()

// ─── Container sizes ──────────────────────────────────────────────────────────

export const containerSizes: { value: ContainerSize; label: string }[] = [
  { value: "sm",      label: "Small"   },
  { value: "default", label: "Default" },
  { value: "lg",      label: "Large"   },
  { value: "xl",      label: "X-Large" },
  { value: "full",    label: "Full"    },
]

// ─── Sort columns ─────────────────────────────────────────────────────────────

export const SORT_COLUMNS = [
  { id: "name",     label: "Name" },
  { id: "company",  label: "Company" },
  { id: "jobTitle", label: "Job Title" },
  { id: "email",    label: "Email" },
]

// ─── FLAT_STEPS helper ────────────────────────────────────────────────────────

import { flattenStepIds } from "@/lib/steps"

export const FLAT_STEPS = flattenStepIds(STEPS).map(id => {
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
