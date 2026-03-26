"use client"

import * as React from "react"
import {
  RiEyeLine,
  RiFileCopyLine,
  RiDeleteBinLine,
  RiGroupLine,
  RiBankCardLine,
  RiCodeLine,
} from "@remixicon/react"

// ─── Types ────────────────────────────────────────────────────────────────────

export type MemberStatus = "active" | "pending" | "suspended"
export type RoleId = "owner" | "admin" | "editor" | "viewer"

export type Permission = {
  id: string
  label: string
  description: string
  icon: React.ReactNode
}

export type Role = {
  id: RoleId
  name: string
  description: string
  permissions: string[] // permission ids
}

export type Member = {
  id: string
  name: string
  email: string
  avatar: string
  role: RoleId
  status: MemberStatus
  lastActiveAt: string | null // ISO string or null for pending
  joinedAt: string
}

export type ContainerSize = "sm" | "default" | "lg" | "xl" | "full"

// ─── Permissions ──────────────────────────────────────────────────────────────

export const PERMISSIONS: Permission[] = [
  {
    id: "view_data",
    label: "View data",
    description: "Read-only access to all workspace data",
    icon: React.createElement(RiEyeLine, { className: "size-4" }),
  },
  {
    id: "manage_content",
    label: "Create & edit content",
    description: "Create, edit, and publish content",
    icon: React.createElement(RiFileCopyLine, { className: "size-4" }),
  },
  {
    id: "delete_content",
    label: "Delete content",
    description: "Permanently delete content and records",
    icon: React.createElement(RiDeleteBinLine, { className: "size-4" }),
  },
  {
    id: "manage_team",
    label: "Manage team",
    description: "Invite, remove, and update team members",
    icon: React.createElement(RiGroupLine, { className: "size-4" }),
  },
  {
    id: "billing_access",
    label: "Billing access",
    description: "View and manage billing and subscriptions",
    icon: React.createElement(RiBankCardLine, { className: "size-4" }),
  },
  {
    id: "api_access",
    label: "API access",
    description: "Generate and manage API keys",
    icon: React.createElement(RiCodeLine, { className: "size-4" }),
  },
]

// ─── Roles ────────────────────────────────────────────────────────────────────

export const ROLES: Role[] = [
  {
    id: "owner",
    name: "Owner",
    description: "Full control over the workspace. Cannot be transferred without owner consent.",
    permissions: ["view_data", "manage_content", "delete_content", "manage_team", "billing_access", "api_access"],
  },
  {
    id: "admin",
    name: "Admin",
    description: "Can manage team, content, and settings. Cannot transfer ownership or change billing.",
    permissions: ["view_data", "manage_content", "delete_content", "manage_team", "api_access"],
  },
  {
    id: "editor",
    name: "Editor",
    description: "Can create and edit content but cannot delete records or manage team members.",
    permissions: ["view_data", "manage_content"],
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access. Cannot create, edit, or delete any content.",
    permissions: ["view_data"],
  },
]

export const ROLE_MAP = Object.fromEntries(ROLES.map(r => [r.id, r])) as Record<RoleId, Role>

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const MEMBERS: Member[] = [
  {
    id: "usr_001",
    name: "Ikedi Eze",
    email: "kasidyray@gmail.com",
    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Ikedi",
    role: "owner",
    status: "active",
    lastActiveAt: new Date().toISOString(),
    joinedAt: "2023-01-10T09:00:00Z",
  },
  {
    id: "usr_002",
    name: "Amara Osei",
    email: "amara.osei@workspace.io",
    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Amara",
    role: "admin",
    status: "active",
    lastActiveAt: "2026-03-19T14:22:00Z",
    joinedAt: "2023-03-15T11:00:00Z",
  },
  {
    id: "usr_003",
    name: "James Carter",
    email: "james.carter@workspace.io",
    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=James",
    role: "admin",
    status: "active",
    lastActiveAt: "2026-03-18T09:10:00Z",
    joinedAt: "2023-05-02T10:00:00Z",
  },
  {
    id: "usr_004",
    name: "Priya Sharma",
    email: "priya.sharma@workspace.io",
    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Priya",
    role: "editor",
    status: "active",
    lastActiveAt: "2026-03-20T08:45:00Z",
    joinedAt: "2023-07-20T12:00:00Z",
  },
  {
    id: "usr_005",
    name: "Nathan Reyes",
    email: "nathan.reyes@workspace.io",
    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Nathan",
    role: "editor",
    status: "active",
    lastActiveAt: "2026-03-17T16:30:00Z",
    joinedAt: "2023-09-01T08:00:00Z",
  },
  {
    id: "usr_006",
    name: "Zoe Williams",
    email: "zoe.williams@workspace.io",
    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Zoe",
    role: "viewer",
    status: "active",
    lastActiveAt: "2026-03-15T11:20:00Z",
    joinedAt: "2024-01-08T13:00:00Z",
  },
  {
    id: "usr_007",
    name: "Chris Huang",
    email: "chris.huang@workspace.io",
    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Chris",
    role: "viewer",
    status: "active",
    lastActiveAt: "2026-03-14T10:00:00Z",
    joinedAt: "2024-02-14T09:00:00Z",
  },
  {
    id: "usr_008",
    name: "Riya Kapoor",
    email: "riya.kapoor@example.com",
    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Riya",
    role: "editor",
    status: "pending",
    lastActiveAt: null,
    joinedAt: "2026-03-18T14:00:00Z",
  },
  {
    id: "usr_009",
    name: "Michael Torres",
    email: "michael.torres@example.com",
    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Michael",
    role: "viewer",
    status: "pending",
    lastActiveAt: null,
    joinedAt: "2026-03-19T10:30:00Z",
  },
  {
    id: "usr_010",
    name: "Olivia Brooks",
    email: "olivia.brooks@workspace.io",
    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Olivia",
    role: "editor",
    status: "suspended",
    lastActiveAt: "2026-02-28T17:00:00Z",
    joinedAt: "2023-11-03T11:00:00Z",
  },
  {
    id: "usr_011",
    name: "Ethan Ward",
    email: "ethan.ward@workspace.io",
    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Ethan",
    role: "viewer",
    status: "active",
    lastActiveAt: "2026-03-13T15:45:00Z",
    joinedAt: "2024-04-22T08:30:00Z",
  },
  {
    id: "usr_012",
    name: "Lucas Pereira",
    email: "lucas.pereira@workspace.io",
    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Lucas",
    role: "admin",
    status: "active",
    lastActiveAt: "2026-03-20T07:55:00Z",
    joinedAt: "2023-06-10T10:00:00Z",
  },
]

export const CURRENT_USER_ID = "usr_001"

export const ASSIGNABLE_ROLES: RoleId[] = ["admin", "editor", "viewer"]

// ─── Container sizes ──────────────────────────────────────────────────────────

export const containerSizes: { value: ContainerSize; label: string }[] = [
  { value: "sm",      label: "Small"   },
  { value: "default", label: "Default" },
  { value: "lg",      label: "Large"   },
  { value: "xl",      label: "X-Large" },
  { value: "full",    label: "Full"    },
]

// ─── Badge variant map ────────────────────────────────────────────────────────

export const ROLE_BADGE_VARIANT: Record<RoleId, "critical" | "warning" | "info" | "neutral"> = {
  owner:  "critical",
  admin:  "warning",
  editor: "info",
  viewer: "neutral",
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatLastActive(iso: string | null): string {
  if (!iso) return "—"
  const date = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 1) return "Just now"
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  const diffDay = Math.floor(diffHr / 24)
  if (diffDay < 7) return `${diffDay}d ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}
