"use client"

import * as React from "react"
import {
  RiArrowDownLine,
  RiArrowUpDownLine,
  RiArrowUpLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiEyeLine,
  RiLoader4Line,
} from "@remixicon/react"

// ─── Types ───────────────────────────────────────────────────────────────────

export type Status   = "todo" | "in-progress" | "in-review" | "done" | "cancelled"
export type Priority = "urgent" | "high" | "medium" | "low"
export type Label    = "bug" | "feature" | "improvement" | "docs"

export type Task = {
  id: string
  title: string
  status: Status
  priority: Priority
  label: Label
  assignee: string
  initials: string
  dueDate: string
}

export type Student = {
  id: number
  name: string
  initials: string
  gender: "Male" | "Female"
  age: number
  class: string
  avgGrade: number | null
  missingDays: number
}

export type ContainerSize = "sm" | "default" | "lg" | "xl" | "full"

// ─── Task mock data ───────────────────────────────────────────────────────────

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

// ─── Config maps ─────────────────────────────────────────────────────────────

export const statusConfig: Record<Status, { label: string; variant: "info" | "success" | "warning" | "critical" | "neutral" | "caution"; icon: React.ElementType }> = {
  "todo":        { label: "Todo",        variant: "neutral",  icon: RiArrowUpDownLine },
  "in-progress": { label: "In Progress", variant: "info",     icon: RiLoader4Line },
  "in-review":   { label: "In Review",   variant: "caution",  icon: RiEyeLine },
  "done":        { label: "Done",        variant: "success",  icon: RiCheckboxCircleLine },
  "cancelled":   { label: "Cancelled",   variant: "neutral",  icon: RiCloseCircleLine },
}

export const priorityConfig: Record<Priority, { label: string; variant: "info" | "success" | "warning" | "critical" | "neutral" | "caution"; icon: React.ElementType }> = {
  "urgent": { label: "Urgent", variant: "critical", icon: RiArrowUpLine },
  "high":   { label: "High",   variant: "warning",  icon: RiArrowUpLine },
  "medium": { label: "Medium", variant: "caution",  icon: RiArrowUpDownLine },
  "low":    { label: "Low",    variant: "neutral",  icon: RiArrowDownLine },
}

export const labelVariants: Record<Label, "critical" | "info" | "success" | "neutral"> = {
  bug: "critical", feature: "info", improvement: "success", docs: "neutral",
}

// ─── Filter options ───────────────────────────────────────────────────────────

export const STATUS_OPTIONS    = Object.entries(statusConfig).map(([value, { label }]) => ({ value, label }))
export const PRIORITY_OPTIONS  = Object.entries(priorityConfig).map(([value, { label }]) => ({ value, label }))
export const DUE_DATE_OPTIONS  = [
  { value: "overdue",     label: "Overdue"     },
  { value: "today",       label: "Due today"   },
  { value: "this-week",   label: "This week"   },
  { value: "next-7-days", label: "Next 7 days" },
]

// ─── Student mock data ────────────────────────────────────────────────────────

export const STUDENTS: Student[] = [
  { id: 447, name: "Robert Fox",         initials: "RF", gender: "Male",   age: 17, class: "1A",  avgGrade: 9.3,  missingDays: 0  },
  { id: 877, name: "Marvin McKinney",    initials: "MM", gender: "Male",   age: 6,  class: "1B",  avgGrade: null, missingDays: 0  },
  { id: 556, name: "Darrell Steward",    initials: "DS", gender: "Female", age: 10, class: "4C",  avgGrade: 8.6,  missingDays: 6  },
  { id: 432, name: "Savannah Nguyen",    initials: "SN", gender: "Male",   age: 11, class: "4C",  avgGrade: 7.2,  missingDays: 6  },
  { id: 536, name: "Dianne Russell",     initials: "DR", gender: "Female", age: 16, class: "11B", avgGrade: 8.2,  missingDays: 10 },
  { id: 703, name: "Cody Fisher",        initials: "CF", gender: "Female", age: 11, class: "4A",  avgGrade: 5.2,  missingDays: 20 },
  { id: 922, name: "Leslie Alexander",   initials: "LA", gender: "Female", age: 12, class: "5A",  avgGrade: 6.5,  missingDays: 0  },
  { id: 540, name: "Albert Flores",      initials: "AF", gender: "Male",   age: 14, class: "7B",  avgGrade: 7.5,  missingDays: 0  },
  { id: 426, name: "Ralph Edwards",      initials: "RE", gender: "Male",   age: 17, class: "11C", avgGrade: 9.5,  missingDays: 1  },
  { id: 883, name: "Darlene Robertson",  initials: "DR", gender: "Female", age: 18, class: "1A",  avgGrade: 10.0, missingDays: 0  },
  { id: 312, name: "Jerome Bell",        initials: "JB", gender: "Male",   age: 15, class: "9B",  avgGrade: 8.1,  missingDays: 3  },
  { id: 654, name: "Kathryn Murphy",     initials: "KM", gender: "Female", age: 13, class: "6A",  avgGrade: 9.0,  missingDays: 2  },
  { id: 289, name: "Cameron Williamson", initials: "CW", gender: "Male",   age: 9,  class: "2B",  avgGrade: 7.8,  missingDays: 5  },
  { id: 751, name: "Brooklyn Simmons",   initials: "BS", gender: "Female", age: 14, class: "8C",  avgGrade: 6.3,  missingDays: 8  },
  { id: 498, name: "Theresa Webb",       initials: "TW", gender: "Female", age: 16, class: "10A", avgGrade: 8.9,  missingDays: 1  },
]

// ─── Container sizes ──────────────────────────────────────────────────────────

export const containerSizes: { value: ContainerSize; label: string }[] = [
  { value: "sm",      label: "Small"   },
  { value: "default", label: "Default" },
  { value: "lg",      label: "Large"   },
  { value: "xl",      label: "X-Large" },
  { value: "full",    label: "Full"    },
]
