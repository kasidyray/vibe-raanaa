"use client"

import * as React from "react"
import {
  RiBankCardLine,
  RiDatabase2Line,
  RiKeyLine,
  RiServerLine,
  RiSettingsLine,
  RiShieldLine,
} from "@remixicon/react"

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContainerSize = "sm" | "default" | "lg" | "xl" | "full"

export type EventCategory = "auth" | "data" | "settings" | "billing" | "system" | "access"
export type EventStatus   = "success" | "failed" | "warning" | "pending"
export type ActorType     = "user" | "system" | "api"

export type ActivityChange = {
  field:  string
  before: string | null
  after:  string | null
}

export type ActivityEvent = {
  id:        string
  eventName: string
  category:  EventCategory
  actor: {
    id:     string
    name:   string
    avatar: string
    email:  string
    type:   ActorType
  }
  target: {
    type: string
    id:   string
    name: string
  }
  timestamp:   string
  status:      EventStatus
  summary:     string
  ipAddress?:  string
  userAgent?:  string
  requestId?:  string
  sessionId?:  string
  changes?:    ActivityChange[]
  metadata?:   Record<string, string>
}

export type ViewFilter = "all" | "auth" | "data" | "system"

export type DatePreset = "all" | "today" | "7d" | "30d"

export type CategoryConfig = {
  label:        string
  icon:         React.ReactNode
  badgeVariant: "info" | "caution" | "neutral" | "warning" | "success" | "critical"
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

function ts(daysBack: number, hoursBack = 0, minutesBack = 0): string {
  const d = new Date(2026, 2, 19, 14, 30, 0)
  d.setDate(d.getDate() - daysBack)
  d.setHours(d.getHours() - hoursBack)
  d.setMinutes(d.getMinutes() - minutesBack)
  return d.toISOString()
}

export const ACTORS = {
  ikedi:  { id: "usr_001", name: "Ikedi Eze",       avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Ikedi",   email: "kasidyray@gmail.com",       type: "user"   as ActorType },
  sarah:  { id: "usr_002", name: "Sarah Mitchell",   avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Sarah",   email: "sarah@zencloud.io",         type: "user"   as ActorType },
  robert: { id: "usr_003", name: "Robert Johnson",   avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Robert",  email: "robertjohnson@loom.com",    type: "user"   as ActorType },
  nathan: { id: "usr_004", name: "Nathan Reyes",     avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Nathan",  email: "nathanreyes@dev.co",        type: "user"   as ActorType },
  system: { id: "sys_001", name: "System Scheduler", avatar: "",                                                     email: "system@raana.io",           type: "system" as ActorType },
  api:    { id: "api_001", name: "prod-api-key",     avatar: "",                                                     email: "",                          type: "api"    as ActorType },
}

export const ACTIVITY_EVENTS: ActivityEvent[] = [
  {
    id: "evt_001",
    eventName: "User signed in",
    category: "auth",
    actor: ACTORS.ikedi,
    target: { type: "session", id: "sess_abc123", name: "Web session" },
    timestamp: ts(0, 1),
    status: "success",
    summary: "Signed in from Chrome on macOS",
    ipAddress: "203.0.113.42",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    requestId: "req_xkJ7mPqL3",
    sessionId: "sess_abc123",
    metadata: { method: "email+password", mfa: "TOTP", location: "Lagos, Nigeria" },
  },
  {
    id: "evt_002",
    eventName: "Role updated",
    category: "access",
    actor: ACTORS.ikedi,
    target: { type: "user", id: "usr_002", name: "Sarah Mitchell" },
    timestamp: ts(0, 3),
    status: "success",
    summary: "Changed Sarah Mitchell's role from Member to Admin",
    ipAddress: "203.0.113.42",
    requestId: "req_Ym9rNzKp1",
    sessionId: "sess_abc123",
    changes: [
      { field: "role", before: "member", after: "admin" },
    ],
    metadata: { reason: "Project lead promotion", approved_by: "board" },
  },
  {
    id: "evt_003",
    eventName: "User invited",
    category: "access",
    actor: ACTORS.ikedi,
    target: { type: "user", id: "usr_010", name: "james@acme.com" },
    timestamp: ts(0, 5),
    status: "success",
    summary: "Invited james@acme.com to join the workspace",
    requestId: "req_Pq3xLkM8z",
    metadata: { role: "member", expires_in: "7 days" },
  },
  {
    id: "evt_004",
    eventName: "Project created",
    category: "data",
    actor: ACTORS.sarah,
    target: { type: "project", id: "proj_001", name: "Q1 Campaign Tracker" },
    timestamp: ts(0, 8),
    status: "success",
    summary: "Created a new project with 3 milestones",
    requestId: "req_Wv2cJnR6q",
    metadata: { template: "blank", visibility: "team", milestone_count: "3" },
  },
  {
    id: "evt_005",
    eventName: "Failed login attempt",
    category: "auth",
    actor: ACTORS.robert,
    target: { type: "session", id: "sess_failed", name: "Web session" },
    timestamp: ts(0, 12),
    status: "failed",
    summary: "Invalid password — account temporarily locked after 5 attempts",
    ipAddress: "198.51.100.77",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    requestId: "req_Zn8bKwT4s",
    metadata: { attempts: "5", locked_for: "30 minutes", method: "email+password" },
  },
  {
    id: "evt_006",
    eventName: "API key created",
    category: "auth",
    actor: ACTORS.sarah,
    target: { type: "api_key", id: "key_prod_x7", name: "Production API Key" },
    timestamp: ts(1),
    status: "success",
    summary: "Created a new production API key with read/write scope",
    requestId: "req_Hj5mQpX9v",
    metadata: { scope: "read, write", expires: "2027-03-19", environment: "production" },
  },
  {
    id: "evt_007",
    eventName: "Settings updated",
    category: "settings",
    actor: ACTORS.ikedi,
    target: { type: "workspace", id: "ws_001", name: "Workspace Settings" },
    timestamp: ts(1, 4),
    status: "success",
    summary: "Updated workspace security and notification preferences",
    requestId: "req_Lq7vFmT2n",
    sessionId: "sess_abc123",
    changes: [
      { field: "mfa_required",              before: "false",   after: "true"    },
      { field: "session_timeout",           before: "30 days", after: "7 days"  },
      { field: "notification.email_digest", before: "daily",   after: "weekly"  },
    ],
    metadata: { section: "Security & Privacy" },
  },
  {
    id: "evt_008",
    eventName: "Record deleted",
    category: "data",
    actor: ACTORS.sarah,
    target: { type: "lead", id: "lead_0042", name: "Acme Corp — Deal #0042" },
    timestamp: ts(1, 7),
    status: "warning",
    summary: "Permanently deleted lead record — action cannot be undone",
    requestId: "req_Rm4pNk8c",
    metadata: { soft_delete: "false", backup_created: "true" },
  },
  {
    id: "evt_009",
    eventName: "Data exported",
    category: "data",
    actor: ACTORS.ikedi,
    target: { type: "report", id: "rpt_leads_q1", name: "Leads Report — Q1 2026" },
    timestamp: ts(2),
    status: "success",
    summary: "Exported 1,842 lead records to CSV",
    requestId: "req_Gx9jLs3k",
    metadata: { format: "CSV", rows: "1842", size: "2.4 MB", filters_applied: "true" },
  },
  {
    id: "evt_010",
    eventName: "Billing plan changed",
    category: "billing",
    actor: ACTORS.ikedi,
    target: { type: "subscription", id: "sub_001", name: "Workspace Subscription" },
    timestamp: ts(3),
    status: "success",
    summary: "Upgraded from Pro to Enterprise plan",
    requestId: "req_Bk2yWm7t",
    changes: [
      { field: "plan",            before: "Pro",     after: "Enterprise" },
      { field: "seats",           before: "10",      after: "unlimited"  },
      { field: "billing_cycle",   before: "monthly", after: "annual"     },
    ],
    metadata: { amount: "$2,400/yr", payment_method: "Visa •••• 4242", effective_date: "2026-03-19" },
  },
  {
    id: "evt_011",
    eventName: "Webhook configured",
    category: "settings",
    actor: ACTORS.sarah,
    target: { type: "webhook", id: "wh_001", name: "Slack Integration Webhook" },
    timestamp: ts(4),
    status: "success",
    summary: "Added a new webhook for Slack notifications on deal status changes",
    requestId: "req_Yp6hDs1w",
    metadata: { endpoint: "https://hooks.slack.com/...", events: "deal.created, deal.won, deal.lost", secret: "[redacted]" },
  },
  {
    id: "evt_012",
    eventName: "Scheduled job failed",
    category: "system",
    actor: ACTORS.system,
    target: { type: "job", id: "job_sync_crm", name: "CRM Sync Job" },
    timestamp: ts(4, 6),
    status: "failed",
    summary: "Nightly CRM sync timed out after 120s — partial sync completed (61%)",
    requestId: "req_Cj3kEr9p",
    metadata: { job_id: "job_sync_crm", duration: "120s", records_synced: "3,421", records_total: "5,602", error: "upstream_timeout" },
  },
  {
    id: "evt_013",
    eventName: "Permission denied",
    category: "access",
    actor: ACTORS.nathan,
    target: { type: "report", id: "rpt_finance_001", name: "Finance Summary Report" },
    timestamp: ts(5),
    status: "failed",
    summary: "Attempted to access Finance Summary Report without required permissions",
    ipAddress: "198.51.100.33",
    requestId: "req_Ov8wAq5j",
    metadata: { required_role: "finance_viewer", user_role: "member" },
  },
  {
    id: "evt_014",
    eventName: "Member removed",
    category: "access",
    actor: ACTORS.ikedi,
    target: { type: "user", id: "usr_005", name: "Chris Huang" },
    timestamp: ts(6),
    status: "success",
    summary: "Removed Chris Huang from workspace — access revoked immediately",
    requestId: "req_Fu1rMx7b",
    metadata: { reason: "Contractor ended", data_retention: "30 days" },
  },
  {
    id: "evt_015",
    eventName: "API request",
    category: "system",
    actor: ACTORS.api,
    target: { type: "endpoint", id: "/api/v2/leads", name: "GET /api/v2/leads" },
    timestamp: ts(7),
    status: "success",
    summary: "Bulk leads fetch via API — 500 records returned",
    ipAddress: "10.20.30.40",
    requestId: "req_Xe2nTy6c",
    metadata: { method: "GET", status_code: "200", response_time: "142ms", records: "500" },
  },
  {
    id: "evt_016",
    eventName: "Password changed",
    category: "auth",
    actor: ACTORS.robert,
    target: { type: "credential", id: "cred_usr_003", name: "Account Password" },
    timestamp: ts(8),
    status: "success",
    summary: "Password changed after reset request",
    ipAddress: "203.0.113.15",
    requestId: "req_Ib4nQe8m",
    metadata: { method: "email_reset", mfa_verified: "true" },
  },
  {
    id: "evt_017",
    eventName: "Record updated",
    category: "data",
    actor: ACTORS.sarah,
    target: { type: "lead", id: "lead_0088", name: "Priya Sharma — Slack" },
    timestamp: ts(9),
    status: "success",
    summary: "Updated lead status, deal value, and assigned owner",
    requestId: "req_Dn7kVp3f",
    changes: [
      { field: "status",      before: "qualified", after: "proposal_sent" },
      { field: "deal_value",  before: "$12,000",   after: "$18,500"       },
      { field: "owner",       before: "Unassigned", after: "Sarah Mitchell" },
    ],
  },
  {
    id: "evt_018",
    eventName: "Integration enabled",
    category: "settings",
    actor: ACTORS.ikedi,
    target: { type: "integration", id: "int_zapier", name: "Zapier Integration" },
    timestamp: ts(10),
    status: "success",
    summary: "Connected Zapier integration with full read/write access",
    requestId: "req_Kp5rHw9a",
    metadata: { scopes: "leads.read, leads.write, projects.read", auth_method: "OAuth 2.0" },
  },
  {
    id: "evt_019",
    eventName: "Bulk import",
    category: "data",
    actor: ACTORS.ikedi,
    target: { type: "dataset", id: "import_leads_mar", name: "Leads Import — March 2026" },
    timestamp: ts(12),
    status: "warning",
    summary: "Imported 2,100 rows — 47 records skipped due to validation errors",
    requestId: "req_Aj9tBl2s",
    metadata: { format: "CSV", total_rows: "2100", imported: "2053", skipped: "47", file: "leads_march_2026.csv" },
  },
  {
    id: "evt_020",
    eventName: "Report scheduled",
    category: "system",
    actor: ACTORS.sarah,
    target: { type: "report", id: "rpt_weekly_pipeline", name: "Weekly Pipeline Report" },
    timestamp: ts(14),
    status: "success",
    summary: "Scheduled weekly pipeline report every Monday at 09:00",
    requestId: "req_Wm3cNr7g",
    metadata: { schedule: "Every Monday at 09:00", recipients: "3", format: "PDF", timezone: "Africa/Lagos" },
  },
  {
    id: "evt_021",
    eventName: "SSO configured",
    category: "auth",
    actor: ACTORS.ikedi,
    target: { type: "sso_provider", id: "sso_google", name: "Google SSO" },
    timestamp: ts(17),
    status: "success",
    summary: "Configured Google Workspace SSO with email domain enforcement",
    requestId: "req_Lx6yDq4h",
    metadata: { provider: "Google Workspace", domain: "raana.io", enforce_sso: "true", allow_password_login: "false" },
  },
  {
    id: "evt_022",
    eventName: "Retention policy updated",
    category: "settings",
    actor: ACTORS.ikedi,
    target: { type: "policy", id: "policy_retention", name: "Data Retention Policy" },
    timestamp: ts(20),
    status: "success",
    summary: "Updated data retention rules for audit logs and deleted records",
    requestId: "req_Ep2mRk5o",
    changes: [
      { field: "audit_log_retention",      before: "90 days",  after: "1 year"   },
      { field: "deleted_records_retention", before: "30 days", after: "90 days"  },
    ],
    metadata: { compliance: "SOC 2 Type II", reviewed_by: "Legal" },
  },
  {
    id: "evt_023",
    eventName: "Workspace provisioned",
    category: "system",
    actor: ACTORS.system,
    target: { type: "workspace", id: "ws_001", name: "Raana-xi Workspace" },
    timestamp: ts(28),
    status: "success",
    summary: "Workspace provisioned and initialized with default settings",
    requestId: "req_Qr7wZm1u",
    metadata: { plan: "Pro", region: "us-east-1", initialized_by: "Ikedi Eze" },
  },
  {
    id: "evt_024",
    eventName: "API key revoked",
    category: "auth",
    actor: ACTORS.ikedi,
    target: { type: "api_key", id: "key_old_staging", name: "Old Staging Key" },
    timestamp: ts(21),
    status: "success",
    summary: "Revoked and permanently disabled staging API key",
    requestId: "req_Tv9cSn6k",
    metadata: { reason: "Key rotation", last_used: "15 days ago" },
  },
  {
    id: "evt_025",
    eventName: "Report generated",
    category: "system",
    actor: ACTORS.system,
    target: { type: "report", id: "rpt_weekly_001", name: "Weekly Pipeline Report" },
    timestamp: ts(7, 5),
    status: "success",
    summary: "Auto-generated weekly pipeline report and delivered to 3 recipients",
    requestId: "req_Gh4bXp2e",
    metadata: { recipients: "ikedi, sarah, robert", size: "1.1 MB", delivery_time: "09:02:14" },
  },
]

// ─── Config ───────────────────────────────────────────────────────────────────

export const containerSizes: { value: ContainerSize; label: string }[] = [
  { value: "sm",      label: "Small"   },
  { value: "default", label: "Default" },
  { value: "lg",      label: "Large"   },
  { value: "xl",      label: "X-Large" },
  { value: "full",    label: "Full"    },
]

export const SORT_COLUMNS = [
  { id: "timestamp", label: "Time"  },
  { id: "eventName", label: "Event" },
  { id: "actorName", label: "Actor" },
]

export const ALL_CATEGORIES: EventCategory[] = ["auth", "access", "data", "settings", "billing", "system"]
export const ALL_STATUSES:   EventStatus[]   = ["success", "failed", "warning", "pending"]

export const DATE_PRESETS = [
  { label: "All time",     value: "all"   },
  { label: "Today",        value: "today" },
  { label: "Last 7 days",  value: "7d"    },
  { label: "Last 30 days", value: "30d"   },
] as const

export const categoryConfig: Record<EventCategory, CategoryConfig> = {
  auth:     { label: "Auth",     icon: React.createElement(RiShieldLine),    badgeVariant: "info"    },
  access:   { label: "Access",   icon: React.createElement(RiKeyLine),       badgeVariant: "caution" },
  data:     { label: "Data",     icon: React.createElement(RiDatabase2Line), badgeVariant: "neutral" },
  settings: { label: "Settings", icon: React.createElement(RiSettingsLine),  badgeVariant: "neutral" },
  billing:  { label: "Billing",  icon: React.createElement(RiBankCardLine),  badgeVariant: "warning" },
  system:   { label: "System",   icon: React.createElement(RiServerLine),    badgeVariant: "neutral" },
}

export const statusConfig: Record<EventStatus, { label: string; variant: "success" | "critical" | "warning" | "neutral" }> = {
  success: { label: "Success", variant: "success"  },
  failed:  { label: "Failed",  variant: "critical" },
  warning: { label: "Warning", variant: "warning"  },
  pending: { label: "Pending", variant: "neutral"  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const NOW = new Date(2026, 2, 19, 14, 30, 0)

export function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString)
  const diffMs = NOW.getTime() - date.getTime()
  const mins   = Math.floor(diffMs / 60_000)
  const hours  = Math.floor(diffMs / 3_600_000)
  const days   = Math.floor(diffMs / 86_400_000)
  if (mins  < 2)   return "just now"
  if (mins  < 60)  return `${mins}m ago`
  if (hours < 24)  return `${hours}h ago`
  if (days  === 1) return "yesterday"
  if (days  < 7)   return `${days}d ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function formatFullTimestamp(isoString: string): string {
  return new Date(isoString).toLocaleString("en-US", {
    weekday:      "long",
    year:         "numeric",
    month:        "long",
    day:          "numeric",
    hour:         "2-digit",
    minute:       "2-digit",
    second:       "2-digit",
    timeZoneName: "short",
  })
}

export function getDateRangeStart(preset: DatePreset): Date | null {
  if (preset === "all") return null
  const start = new Date(NOW)
  if (preset === "today") { start.setHours(0, 0, 0, 0); return start }
  if (preset === "7d")    { start.setDate(start.getDate() - 7);  return start }
  if (preset === "30d")   { start.setDate(start.getDate() - 30); return start }
  return null
}
