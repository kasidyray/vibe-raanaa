"use client"

import * as React from "react"
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
  RiArrowDownSLine,
  RiBankCardLine,
  RiCalendarLine,
  RiCheckLine,
  RiCloseLine,
  RiCodeLine,
  RiContractLeftRightLine,
  RiDatabase2Line,
  RiDownloadLine,
  RiGlobalLine,
  RiHistoryLine,
  RiKeyLine,
  RiRefreshLine,
  RiServerLine,
  RiSettingsLine,
  RiShieldLine,
  RiUserLine,
} from "@remixicon/react"

import { SiteHeader } from "@/components/site-header"
import { Skeleton } from "@/components/ui/skeleton"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
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
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"
import {
  DataTable,
  DataTableToolbar,
  DataTableSearch,
  DataTableFacetedFilter,
  DataTableSortMenu,
  DataTableColumnToggle,
  DataTablePagination,
} from "@/components/ui/data-table"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type ContainerSize = "sm" | "default" | "lg" | "xl" | "full"

type EventCategory = "auth" | "data" | "settings" | "billing" | "system" | "access"
type EventStatus   = "success" | "failed" | "warning" | "pending"
type ActorType     = "user" | "system" | "api"

type ActivityChange = {
  field:  string
  before: string | null
  after:  string | null
}

type ActivityEvent = {
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

// ─── Mock Data ────────────────────────────────────────────────────────────────

function ts(daysBack: number, hoursBack = 0, minutesBack = 0): string {
  const d = new Date(2026, 2, 19, 14, 30, 0)
  d.setDate(d.getDate() - daysBack)
  d.setHours(d.getHours() - hoursBack)
  d.setMinutes(d.getMinutes() - minutesBack)
  return d.toISOString()
}

const ACTORS = {
  ikedi:  { id: "usr_001", name: "Ikedi Eze",       avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Ikedi",   email: "kasidyray@gmail.com",       type: "user"   as ActorType },
  sarah:  { id: "usr_002", name: "Sarah Mitchell",   avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Sarah",   email: "sarah@zencloud.io",         type: "user"   as ActorType },
  robert: { id: "usr_003", name: "Robert Johnson",   avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Robert",  email: "robertjohnson@loom.com",    type: "user"   as ActorType },
  nathan: { id: "usr_004", name: "Nathan Reyes",     avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Nathan",  email: "nathanreyes@dev.co",        type: "user"   as ActorType },
  system: { id: "sys_001", name: "System Scheduler", avatar: "",                                                                  email: "system@raana.io",           type: "system" as ActorType },
  api:    { id: "api_001", name: "prod-api-key",     avatar: "",                                                                  email: "",                          type: "api"    as ActorType },
}

const ACTIVITY_EVENTS: ActivityEvent[] = [
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

const containerSizes: { value: ContainerSize; label: string }[] = [
  { value: "sm",      label: "Small"   },
  { value: "default", label: "Default" },
  { value: "lg",      label: "Large"   },
  { value: "xl",      label: "X-Large" },
  { value: "full",    label: "Full"    },
]

const SORT_COLUMNS = [
  { id: "timestamp", label: "Time"     },
  { id: "eventName", label: "Event"    },
  { id: "actorName", label: "Actor"    },
]

const ALL_CATEGORIES: EventCategory[] = ["auth", "access", "data", "settings", "billing", "system"]
const ALL_STATUSES:   EventStatus[]   = ["success", "failed", "warning", "pending"]

const DATE_PRESETS = [
  { label: "All time",    value: "all"  },
  { label: "Today",       value: "today" },
  { label: "Last 7 days", value: "7d"   },
  { label: "Last 30 days",value: "30d"  },
] as const
type DatePreset = (typeof DATE_PRESETS)[number]["value"]

type CategoryConfig = {
  label:        string
  icon:         React.ReactNode
  badgeVariant: "info" | "caution" | "neutral" | "warning" | "success" | "critical"
}

const categoryConfig: Record<EventCategory, CategoryConfig> = {
  auth:     { label: "Auth",     icon: <RiShieldLine />,   badgeVariant: "info"    },
  access:   { label: "Access",   icon: <RiKeyLine />,      badgeVariant: "caution" },
  data:     { label: "Data",     icon: <RiDatabase2Line />,badgeVariant: "neutral" },
  settings: { label: "Settings", icon: <RiSettingsLine />, badgeVariant: "neutral" },
  billing:  { label: "Billing",  icon: <RiBankCardLine />, badgeVariant: "warning" },
  system:   { label: "System",   icon: <RiServerLine />,   badgeVariant: "neutral" },
}

const statusConfig: Record<EventStatus, { label: string; variant: "success" | "critical" | "warning" | "neutral" }> = {
  success: { label: "Success", variant: "success"  },
  failed:  { label: "Failed",  variant: "critical" },
  warning: { label: "Warning", variant: "warning"  },
  pending: { label: "Pending", variant: "neutral"  },
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const NOW = new Date(2026, 2, 19, 14, 30, 0)

function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString)
  const diffMs = NOW.getTime() - date.getTime()
  const mins   = Math.floor(diffMs / 60_000)
  const hours  = Math.floor(diffMs / 3_600_000)
  const days   = Math.floor(diffMs / 86_400_000)
  if (mins  < 2)  return "just now"
  if (mins  < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days  === 1) return "yesterday"
  if (days  < 7)  return `${days}d ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function formatFullTimestamp(isoString: string): string {
  return new Date(isoString).toLocaleString("en-US", {
    weekday:    "long",
    year:       "numeric",
    month:      "long",
    day:        "numeric",
    hour:       "2-digit",
    minute:     "2-digit",
    second:     "2-digit",
    timeZoneName: "short",
  })
}

function getDateRangeStart(preset: DatePreset): Date | null {
  if (preset === "all") return null
  const start = new Date(NOW)
  if (preset === "today") { start.setHours(0, 0, 0, 0); return start }
  if (preset === "7d")    { start.setDate(start.getDate() - 7);  return start }
  if (preset === "30d")   { start.setDate(start.getDate() - 30); return start }
  return null
}

// ─── Columns ─────────────────────────────────────────────────────────────────

const columns: ColumnDef<ActivityEvent>[] = [
  {
    accessorKey: "eventName",
    header: "EVENT",
    cell: ({ row }) => {
      const cat = categoryConfig[row.original.category]
      return (
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="shrink-0 flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground [&>svg]:size-3.5">
            {cat.icon}
          </span>
          <span className="font-medium text-sm truncate">{row.original.eventName}</span>
        </div>
      )
    },
  },
  {
    id: "actorName",
    accessorFn: row => row.actor.name,
    header: "ACTOR",
    cell: ({ row }) => {
      const actor = row.original.actor
      return (
        <div className="flex items-center gap-2 min-w-0">
          {actor.type !== "user" ? (
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground [&>svg]:size-3">
              {actor.type === "api" ? <RiCodeLine /> : <RiRefreshLine />}
            </span>
          ) : (
            <Avatar className="size-6 rounded-full shrink-0">
              <AvatarImage src={actor.avatar} alt={actor.name} />
              <AvatarFallback className="text-[10px]">{actor.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
          )}
          <span className="text-sm truncate">{actor.name}</span>
        </div>
      )
    },
    filterFn: (row, _id, filterValues: string[]) =>
      filterValues.length === 0 || filterValues.includes(row.original.actor.name),
  },
  {
    id: "target",
    accessorFn: row => row.target.name,
    header: "RESOURCE",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 min-w-0 max-w-[220px]">
        <span className="text-[10px] font-medium text-muted-foreground shrink-0 uppercase tracking-wider">{row.original.target.type}</span>
        <span className="text-muted-foreground shrink-0">·</span>
        <span className="text-sm truncate">{row.original.target.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
    cell: ({ row }) => {
      const cat = categoryConfig[row.original.category]
      return <Badge variant={cat.badgeVariant}>{cat.label}</Badge>
    },
    filterFn: (row, _id, filterValues: string[]) =>
      filterValues.length === 0 || filterValues.includes(row.original.category),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const s = statusConfig[row.original.status]
      return <StatusBadge variant={s.variant}>{s.label}</StatusBadge>
    },
    filterFn: (row, _id, filterValues: string[]) =>
      filterValues.length === 0 || filterValues.includes(row.original.status),
  },
  {
    accessorKey: "timestamp",
    header: "TIME",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        {formatRelativeTime(row.original.timestamp)}
      </span>
    ),
    sortingFn: "datetime",
  },
]

// ─── Detail Drawer ────────────────────────────────────────────────────────────

function ActivityDetailDrawer({
  event,
  open,
  onClose,
}: {
  event: ActivityEvent | null
  open:  boolean
  onClose: () => void
}) {
  const [showRaw, setShowRaw] = React.useState(false)

  React.useEffect(() => {
    if (!open) setShowRaw(false)
  }, [open])

  return (
    <Drawer direction="right" open={open} onOpenChange={o => !o && onClose()}>
      <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-xl">
        {event && (() => {
          const cat    = categoryConfig[event.category]
          const status = statusConfig[event.status]
          return (
            <div className="flex flex-col h-full overflow-y-auto">

              {/* Header */}
              <DrawerHeader className="flex flex-row items-start justify-between gap-4 border-b">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="shrink-0 flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground [&>svg]:size-4 mt-0.5">
                    {cat.icon}
                  </span>
                  <div className="min-w-0">
                    <DrawerTitle className="text-base font-semibold leading-snug">{event.eventName}</DrawerTitle>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{event.summary}</p>
                  </div>
                </div>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon-sm" className="shrink-0 mt-0.5" aria-label="Close">
                    <RiCloseLine />
                  </Button>
                </DrawerClose>
              </DrawerHeader>

              <div className="flex flex-col divide-y divide-border">

                {/* Status + Category + Timestamp */}
                <div className="px-6 py-4 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Status</span>
                      <StatusBadge variant={status.variant}>{status.label}</StatusBadge>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Category</span>
                      <Badge variant={cat.badgeVariant}>{cat.label}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Timestamp</span>
                    <span className="text-sm">{formatFullTimestamp(event.timestamp)}</span>
                    <span className="text-xs text-muted-foreground">{formatRelativeTime(event.timestamp)}</span>
                  </div>
                </div>

                {/* Actor */}
                <div className="px-6 py-4 flex flex-col gap-2">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Actor</span>
                  <div className="flex items-center gap-3">
                    {event.actor.type !== "user" ? (
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground [&>svg]:size-4">
                        {event.actor.type === "api" ? <RiCodeLine /> : <RiRefreshLine />}
                      </span>
                    ) : (
                      <Avatar className="size-8 rounded-full shrink-0">
                        <AvatarImage src={event.actor.avatar} alt={event.actor.name} />
                        <AvatarFallback className="text-xs">{event.actor.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <p className="text-sm font-medium">{event.actor.name}</p>
                      {event.actor.email && (
                        <p className="text-xs text-muted-foreground">{event.actor.email}</p>
                      )}
                      <span className="text-xs text-muted-foreground capitalize">{event.actor.type}</span>
                    </div>
                  </div>
                </div>

                {/* Resource */}
                <div className="px-6 py-4 flex flex-col gap-2">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Resource</span>
                  <div>
                    <p className="text-sm font-medium">{event.target.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{event.target.type}</span>
                      <span className="text-muted-foreground text-xs">·</span>
                      <span className="text-xs font-mono text-muted-foreground">{event.target.id}</span>
                    </div>
                  </div>
                </div>

                {/* Before / After Changes */}
                {event.changes && event.changes.length > 0 && (
                  <div className="px-6 py-4 flex flex-col gap-3">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Changes</span>
                    <div className="rounded-lg border overflow-hidden">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-muted/50 border-b">
                            <th className="py-2 px-3 text-left font-semibold text-muted-foreground">Field</th>
                            <th className="py-2 px-3 text-left font-semibold text-muted-foreground">Before</th>
                            <th className="py-2 px-3 text-left font-semibold text-muted-foreground">After</th>
                          </tr>
                        </thead>
                        <tbody>
                          {event.changes.map((change, i) => (
                            <tr key={i} className="border-b last:border-0">
                              <td className="py-2 px-3 font-mono font-medium">{change.field}</td>
                              <td className="py-2 px-3 text-muted-foreground">
                                {change.before !== null
                                  ? <span className="line-through opacity-60">{change.before}</span>
                                  : <span className="italic opacity-40">—</span>
                                }
                              </td>
                              <td className="py-2 px-3 font-medium text-success-dark">
                                {change.after !== null ? change.after : <span className="italic opacity-40 text-muted-foreground">—</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Request Info */}
                {(event.ipAddress || event.requestId || event.sessionId || event.userAgent) && (
                  <div className="px-6 py-4 flex flex-col gap-3">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Request</span>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                      {event.requestId && (
                        <>
                          <dt className="text-xs text-muted-foreground whitespace-nowrap">Request ID</dt>
                          <dd className="font-mono text-xs truncate">{event.requestId}</dd>
                        </>
                      )}
                      {event.sessionId && (
                        <>
                          <dt className="text-xs text-muted-foreground whitespace-nowrap">Session</dt>
                          <dd className="font-mono text-xs truncate">{event.sessionId}</dd>
                        </>
                      )}
                      {event.ipAddress && (
                        <>
                          <dt className="text-xs text-muted-foreground whitespace-nowrap">IP Address</dt>
                          <dd className="font-mono text-xs">{event.ipAddress}</dd>
                        </>
                      )}
                      {event.userAgent && (
                        <>
                          <dt className="text-xs text-muted-foreground whitespace-nowrap">User Agent</dt>
                          <dd className="text-xs text-muted-foreground break-all leading-relaxed">{event.userAgent}</dd>
                        </>
                      )}
                    </dl>
                  </div>
                )}

                {/* Metadata */}
                {event.metadata && Object.keys(event.metadata).length > 0 && (
                  <div className="px-6 py-4 flex flex-col gap-3">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Metadata</span>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                      {Object.entries(event.metadata).map(([key, value]) => (
                        <React.Fragment key={key}>
                          <dt className="text-xs text-muted-foreground whitespace-nowrap capitalize">{key.replace(/_/g, " ")}</dt>
                          <dd className="text-xs font-mono truncate" title={value}>{value}</dd>
                        </React.Fragment>
                      ))}
                    </dl>
                  </div>
                )}

                {/* Raw Payload */}
                <div className="px-6 py-4">
                  <button
                    onClick={() => setShowRaw(v => !v)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <RiCodeLine className="size-3.5" />
                    {showRaw ? "Hide" : "Show"} raw payload
                  </button>
                  {showRaw && (
                    <pre className="mt-3 rounded-lg bg-muted p-3 text-xs font-mono overflow-x-auto max-h-64 overflow-y-auto leading-relaxed">
                      {JSON.stringify(event, null, 2)}
                    </pre>
                  )}
                </div>

              </div>

              {/* Footer */}
              <div className="mt-auto border-t p-6 flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RiDownloadLine />
                  Export event
                </Button>
                <Button variant="ghost" size="sm" className="ml-auto" onClick={onClose}>
                  Close
                </Button>
              </div>

            </div>
          )
        })()}
      </DrawerContent>
    </Drawer>
  )
}

// ─── Activity Table ───────────────────────────────────────────────────────────

type ViewFilter = "all" | "auth" | "data" | "system"

// ─── ActivityTableSkeleton ────────────────────────────────────────────────────

function ActivityTableSkeleton({ rows = 12 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-56 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="ml-auto h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      {/* Table — bordered variant: no outer wrapper, no header bg */}
      <div>
        <div className="flex items-center gap-4 border-b px-4 py-2.5">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-14 ml-4" />
          <Skeleton className="h-3 w-20 ml-4" />
          <Skeleton className="h-3 w-16 ml-4" />
          <Skeleton className="h-3 w-14 ml-4" />
          <Skeleton className="h-3 w-12 ml-auto" />
        </div>
        {Array.from({ length: rows }).map((_, i, arr) => (
          <div key={i} className={cn("flex items-center gap-4 px-4 py-3", i < arr.length - 1 && "border-b")}>
            {/* Event: icon + name */}
            <div className="flex flex-1 items-center gap-2.5">
              <Skeleton className="size-7 shrink-0 rounded-md" />
              <Skeleton className="h-3.5 w-36" />
            </div>
            {/* Actor: avatar + name */}
            <div className="flex items-center gap-2">
              <Skeleton className="size-6 shrink-0 rounded-full" />
              <Skeleton className="h-3.5 w-24" />
            </div>
            {/* Resource: type · name */}
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-3.5 w-32" />
            </div>
            {/* Category badge */}
            <Skeleton className="h-5 w-16 rounded-md" />
            {/* Status badge */}
            <Skeleton className="h-5 w-20 rounded-full" />
            {/* Timestamp */}
            <Skeleton className="h-3.5 w-20" />
          </div>
        ))}
      </div>
    </div>
  )
}

function ActivityTable({ viewFilter = "all" }: { viewFilter?: ViewFilter }) {
  const [isTableLoading, setIsTableLoading] = React.useState(true)

  React.useEffect(() => {
    const t = setTimeout(() => setIsTableLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  const [sorting, setSorting]                   = React.useState<SortingState>([{ id: "timestamp", desc: true }])
  const [globalFilter, setGlobalFilter]         = React.useState("")
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [categoryFilter, setCategoryFilter]     = React.useState<string[]>([])
  const [statusFilter, setStatusFilter]         = React.useState<string[]>([])
  const [actorFilter, setActorFilter]           = React.useState<string[]>([])
  const [datePreset, setDatePreset]             = React.useState<DatePreset>("all")
  const [onlyMine, setOnlyMine]                 = React.useState(false)
  const [selectedEvent, setSelectedEvent]       = React.useState<ActivityEvent | null>(null)

  // Pre-filter by view (tab) and external state before table processing
  const baseData = React.useMemo(() => {
    let data = ACTIVITY_EVENTS

    if (viewFilter === "auth")   data = data.filter(e => ["auth", "access"].includes(e.category))
    else if (viewFilter === "data")   data = data.filter(e => e.category === "data")
    else if (viewFilter === "system") data = data.filter(e => ["system", "settings", "billing"].includes(e.category))

    if (onlyMine) data = data.filter(e => e.actor.id === "usr_001")

    const rangeStart = getDateRangeStart(datePreset)
    if (rangeStart) {
      data = data.filter(e => new Date(e.timestamp).getTime() >= rangeStart.getTime())
    }

    return data
  }, [viewFilter, onlyMine, datePreset])

  const columnFilters = React.useMemo<ColumnFiltersState>(() => {
    const f: ColumnFiltersState = []
    if (categoryFilter.length) f.push({ id: "category",  value: categoryFilter })
    if (statusFilter.length)   f.push({ id: "status",    value: statusFilter   })
    if (actorFilter.length)    f.push({ id: "actorName", value: actorFilter    })
    return f
  }, [categoryFilter, statusFilter, actorFilter])

  const hasActiveFilters =
    categoryFilter.length > 0 || statusFilter.length > 0 || actorFilter.length > 0 ||
    datePreset !== "all" || onlyMine

  const table = useReactTable({
    data: baseData,
    columns,
    state: { sorting, globalFilter, columnVisibility, columnFilters },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const q = filterValue.toLowerCase()
      const e = row.original
      return (
        e.eventName.toLowerCase().includes(q) ||
        e.actor.name.toLowerCase().includes(q) ||
        e.target.name.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q)
      )
    },
  })

  const actorOptions = [...new Set(ACTIVITY_EVENTS.map(e => e.actor.name))].sort()
  const currentDateLabel = DATE_PRESETS.find(p => p.value === datePreset)?.label ?? "All time"

  function resetFilters() {
    setCategoryFilter([])
    setStatusFilter([])
    setActorFilter([])
    setDatePreset("all")
    setOnlyMine(false)
  }

  if (isTableLoading) return <ActivityTableSkeleton rows={12} />

  return (
    <div className="flex flex-col gap-4">
      <DataTableToolbar>
        <DataTableSearch table={table} placeholder="Search events, actors, resources…" />

        <DataTableFacetedFilter
          title="Category"
          options={ALL_CATEGORIES.map(c => ({ value: c, label: categoryConfig[c].label }))}
          selectedValues={categoryFilter}
          onSelectionChange={setCategoryFilter}
        />

        <DataTableFacetedFilter
          title="Status"
          options={ALL_STATUSES.map(s => ({ value: s, label: statusConfig[s].label }))}
          selectedValues={statusFilter}
          onSelectionChange={setStatusFilter}
        />

        <DataTableFacetedFilter
          title="Actor"
          options={actorOptions}
          selectedValues={actorFilter}
          onSelectionChange={setActorFilter}
          icon={<RiUserLine className="opacity-60" />}
        />

        {/* Date range preset */}
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button
              variant="outline"
              size="sm"
              className={cn("rounded-md", datePreset !== "all" && "border-primary/40 bg-primary/5 text-foreground")}
            />
          }>
            <RiCalendarLine className="opacity-60" />
            {currentDateLabel}
            <RiArrowDownSLine className="opacity-60" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Date range</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {DATE_PRESETS.map(preset => (
                <DropdownMenuCheckboxItem
                  key={preset.value}
                  checked={datePreset === preset.value}
                  onClick={() => setDatePreset(preset.value)}
                >
                  {preset.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Only my actions toggle */}
        <Button
          variant="outline"
          size="sm"
          className={cn("rounded-md gap-1.5", onlyMine && "border-primary/40 bg-primary/5 text-foreground")}
          onClick={() => setOnlyMine(v => !v)}
        >
          <RiUserLine className="opacity-60" />
          My actions
          {onlyMine && <RiCheckLine className="size-3 text-primary" />}
        </Button>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
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

      <DataTable
        table={table}
        variant="bordered"
        emptyMessage="No activity events match your filters."
        onRowClick={setSelectedEvent}
      />

      <DataTablePagination table={table} style="classic" rowLabel="event" />

      <ActivityDetailDrawer
        event={selectedEvent}
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ActivityPage() {
  const [containerSize, setContainerSize] = React.useState<ContainerSize>("xl")

  const content = (
    <>
      <PageHeader
        title="Activity"
        description="A complete audit trail of all actions, changes, and system events in your workspace."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <RiDownloadLine />
              Export
            </Button>
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
          </div>
        }
      />

      <Tabs defaultValue="all" className="flex flex-1 flex-col">
        <div className="pb-4">
          <TabsList variant="pill">
            <TabsTrigger value="all">All events</TabsTrigger>
            <TabsTrigger value="auth">Auth &amp; Access</TabsTrigger>
            <TabsTrigger value="data">Data changes</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all">
          <ActivityTable viewFilter="all" />
        </TabsContent>
        <TabsContent value="auth">
          <ActivityTable viewFilter="auth" />
        </TabsContent>
        <TabsContent value="data">
          <ActivityTable viewFilter="data" />
        </TabsContent>
        <TabsContent value="system">
          <ActivityTable viewFilter="system" />
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
              <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Activity</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        {containerSize === "full" ? (
          <div className="flex flex-1 flex-col gap-6">{content}</div>
        ) : (
          <Container size={containerSize} className="flex flex-1 flex-col gap-6">{content}</Container>
        )}
      </div>
    </>
  )
}
