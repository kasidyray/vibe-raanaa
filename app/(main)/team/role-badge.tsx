"use client"

import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import { type RoleId, type MemberStatus, ROLE_MAP, ROLE_BADGE_VARIANT } from "./data"

// ─── RoleBadge ────────────────────────────────────────────────────────────────

export function RoleBadge({ role }: { role: RoleId }) {
  return (
    <Badge variant={ROLE_BADGE_VARIANT[role]} size="sm">
      {ROLE_MAP[role].name}
    </Badge>
  )
}

// ─── StatusPill ───────────────────────────────────────────────────────────────

export function StatusPill({ status }: { status: MemberStatus }) {
  const variantMap: Record<MemberStatus, "success" | "caution" | "neutral"> = {
    active:    "success",
    pending:   "caution",
    suspended: "neutral",
  }
  const labelMap: Record<MemberStatus, string> = {
    active:    "Active",
    pending:   "Pending",
    suspended: "Suspended",
  }
  return <StatusBadge variant={variantMap[status]}>{labelMap[status]}</StatusBadge>
}
