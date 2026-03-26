"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { RiAddLine, RiCheckLine, RiCloseLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import { type Member, ROLES, PERMISSIONS } from "./data"
import { RoleBadge } from "./role-badge"

// ─── RolesTab ─────────────────────────────────────────────────────────────────

export function RolesTab({ members }: { members: Member[] }) {
  const router = useRouter()
  const memberCountByRole = React.useMemo(() => {
    const counts: Record<string, number> = {}
    for (const m of members) {
      counts[m.role] = (counts[m.role] ?? 0) + 1
    }
    return counts
  }, [members])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {ROLES.length} roles · Manage access levels for your workspace.
        </p>
        <Button size="sm" onClick={() => router.push("/create-role")}>
          <RiAddLine />
          Create role
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {ROLES.map(role => (
          <div key={role.id} className="rounded-xl border bg-card p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <RoleBadge role={role.id} />
                  <span className="text-xs text-muted-foreground">
                    {memberCountByRole[role.id] ?? 0} {memberCountByRole[role.id] === 1 ? "member" : "members"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Permissions</p>
              {PERMISSIONS.map(perm => {
                const has = role.permissions.includes(perm.id)
                return (
                  <div key={perm.id} className={cn("flex items-center gap-2", !has && "opacity-35")}>
                    {has
                      ? <RiCheckLine className="size-3.5 text-success shrink-0" />
                      : <RiCloseLine className="size-3.5 text-muted-foreground shrink-0" />
                    }
                    <span className="text-sm">{perm.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
