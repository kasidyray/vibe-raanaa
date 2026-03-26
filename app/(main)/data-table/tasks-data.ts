// ─── Types ────────────────────────────────────────────────────────────────────

export type Status   = "todo" | "in-progress" | "in-review" | "done" | "cancelled"
export type Priority = "urgent" | "high" | "medium" | "low"
export type Label    = "bug" | "feature" | "improvement" | "docs"

export type Task = {
  id:       string
  title:    string
  status:   Status
  priority: Priority
  label:    Label
  assignee: string
  initials: string
  dueDate:  string
}

// ─── Config maps (label + variant only — icons live in columns.tsx) ───────────

type BadgeVariant = "info" | "success" | "warning" | "critical" | "neutral" | "caution"

export const statusConfig: Record<Status, { label: string; variant: BadgeVariant }> = {
  "todo":        { label: "Todo",        variant: "neutral"  },
  "in-progress": { label: "In Progress", variant: "info"     },
  "in-review":   { label: "In Review",   variant: "caution"  },
  "done":        { label: "Done",        variant: "success"  },
  "cancelled":   { label: "Cancelled",   variant: "neutral"  },
}

export const priorityConfig: Record<Priority, { label: string; variant: BadgeVariant }> = {
  "urgent": { label: "Urgent", variant: "critical" },
  "high":   { label: "High",   variant: "warning"  },
  "medium": { label: "Medium", variant: "caution"  },
  "low":    { label: "Low",    variant: "neutral"  },
}

export const labelVariants: Record<Label, "critical" | "info" | "success" | "neutral"> = {
  bug: "critical", feature: "info", improvement: "success", docs: "neutral",
}

// ─── Filter options ───────────────────────────────────────────────────────────

export const STATUS_OPTIONS   = Object.entries(statusConfig).map(([value, { label }]) => ({ value, label }))
export const PRIORITY_OPTIONS = Object.entries(priorityConfig).map(([value, { label }]) => ({ value, label }))
export const DUE_DATE_OPTIONS = [
  { value: "overdue",     label: "Overdue"     },
  { value: "today",       label: "Due today"   },
  { value: "this-week",   label: "This week"   },
  { value: "next-7-days", label: "Next 7 days" },
]

// ─── Mock data ────────────────────────────────────────────────────────────────

export const TASKS: Task[] = [
  { id: "TASK-001", title: "Fix authentication token refresh bug",         status: "in-progress", priority: "urgent", label: "bug",         assignee: "Amara Osei",    initials: "AO", dueDate: "2026-03-18" },
  { id: "TASK-002", title: "Design new onboarding flow screens",           status: "todo",        priority: "high",   label: "feature",     assignee: "Lena Fischer",  initials: "LF", dueDate: "2026-03-22" },
  { id: "TASK-003", title: "Update API documentation for v2 endpoints",    status: "in-review",   priority: "medium", label: "docs",        assignee: "James Adeyemi", initials: "JA", dueDate: "2026-03-20" },
  { id: "TASK-004", title: "Migrate database schema to PostgreSQL 16",     status: "done",        priority: "high",   label: "improvement", assignee: "Sofia Reyes",   initials: "SR", dueDate: "2026-03-10" },
  { id: "TASK-005", title: "Implement dark mode toggle persistence",       status: "todo",        priority: "low",    label: "feature",     assignee: "Kwame Mensah",  initials: "KM", dueDate: "2026-04-01" },
  { id: "TASK-006", title: "Fix broken pagination on mobile devices",      status: "in-progress", priority: "high",   label: "bug",         assignee: "Amara Osei",    initials: "AO", dueDate: "2026-03-17" },
  { id: "TASK-007", title: "Add CSV export to reports dashboard",          status: "todo",        priority: "medium", label: "feature",     assignee: "Lena Fischer",  initials: "LF", dueDate: "2026-03-28" },
  { id: "TASK-008", title: "Write unit tests for billing module",          status: "in-review",   priority: "high",   label: "improvement", assignee: "James Adeyemi", initials: "JA", dueDate: "2026-03-19" },
  { id: "TASK-009", title: "Refactor legacy notification service",         status: "cancelled",   priority: "low",    label: "improvement", assignee: "Sofia Reyes",   initials: "SR", dueDate: "2026-03-15" },
  { id: "TASK-010", title: "Add two-factor authentication support",        status: "todo",        priority: "urgent", label: "feature",     assignee: "Kwame Mensah",  initials: "KM", dueDate: "2026-03-25" },
  { id: "TASK-011", title: "Investigate memory leak in worker process",    status: "in-progress", priority: "urgent", label: "bug",         assignee: "Amara Osei",    initials: "AO", dueDate: "2026-03-16" },
  { id: "TASK-012", title: "Add Stripe webhook endpoint validation",       status: "done",        priority: "high",   label: "feature",     assignee: "Lena Fischer",  initials: "LF", dueDate: "2026-03-12" },
  { id: "TASK-013", title: "Improve search index performance",             status: "in-review",   priority: "medium", label: "improvement", assignee: "James Adeyemi", initials: "JA", dueDate: "2026-03-21" },
  { id: "TASK-014", title: "Update dependency versions for security",      status: "done",        priority: "high",   label: "improvement", assignee: "Sofia Reyes",   initials: "SR", dueDate: "2026-03-11" },
  { id: "TASK-015", title: "Create user activity audit log UI",            status: "todo",        priority: "medium", label: "feature",     assignee: "Kwame Mensah",  initials: "KM", dueDate: "2026-04-05" },
  { id: "TASK-016", title: "Fix tooltip z-index stacking issue",           status: "done",        priority: "low",    label: "bug",         assignee: "Amara Osei",    initials: "AO", dueDate: "2026-03-09" },
  { id: "TASK-017", title: "Document component library guidelines",        status: "in-progress", priority: "medium", label: "docs",        assignee: "Lena Fischer",  initials: "LF", dueDate: "2026-03-24" },
  { id: "TASK-018", title: "Set up end-to-end testing with Playwright",    status: "todo",        priority: "high",   label: "improvement", assignee: "James Adeyemi", initials: "JA", dueDate: "2026-03-30" },
  { id: "TASK-019", title: "Resolve CORS errors in production build",      status: "cancelled",   priority: "medium", label: "bug",         assignee: "Sofia Reyes",   initials: "SR", dueDate: "2026-03-14" },
  { id: "TASK-020", title: "Add skeleton loading states to dashboard",     status: "in-review",   priority: "low",    label: "feature",     assignee: "Kwame Mensah",  initials: "KM", dueDate: "2026-03-23" },
]
