"use client"

import * as React from "react"
import {
  RiCloseLine,
  RiCheckLine,
  RiUserForbidLine,
  RiMailLine,
  RiDeleteBinLine,
  RiTimeLine,
  RiUserLine,
} from "@remixicon/react"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import {
  type Member,
  type RoleId,
  CURRENT_USER_ID,
  ASSIGNABLE_ROLES,
  ROLE_MAP,
  PERMISSIONS,
  formatLastActive,
  formatDate,
} from "./data"
import { RoleBadge, StatusPill } from "./role-badge"

// ─── MemberDetailDrawer ───────────────────────────────────────────────────────

export function MemberDetailDrawer({
  member,
  onClose,
  onRoleChange,
  onRemove,
  onToggleSuspend,
}: {
  member: Member | null
  onClose: () => void
  onRoleChange: (memberId: string, role: RoleId) => void
  onRemove: (memberId: string) => void
  onToggleSuspend: (memberId: string) => void
}) {
  const [roleChanging, setRoleChanging] = React.useState(false)
  const [removing, setRemoving]         = React.useState(false)
  const [toggling, setToggling]         = React.useState(false)

  const isSelf  = member?.id === CURRENT_USER_ID
  const isOwner = member?.role === "owner"

  const handleRoleChange = async (newRole: RoleId) => {
    if (!member || newRole === member.role) return
    setRoleChanging(true)
    await new Promise(r => setTimeout(r, 800))
    onRoleChange(member.id, newRole)
    setRoleChanging(false)
    toast.success(`${member.name}'s role updated to ${ROLE_MAP[newRole].name}`)
  }

  const handleRemove = async () => {
    if (!member) return
    setRemoving(true)
    await new Promise(r => setTimeout(r, 800))
    onRemove(member.id)
    setRemoving(false)
    onClose()
    toast.success(`${member.name} has been removed from the workspace`)
  }

  const handleToggleSuspend = async () => {
    if (!member) return
    setToggling(true)
    await new Promise(r => setTimeout(r, 800))
    onToggleSuspend(member.id)
    setToggling(false)
    toast.success(
      member.status === "suspended"
        ? `${member.name}'s account has been reactivated`
        : `${member.name}'s account has been suspended`
    )
  }

  return (
    <Drawer direction="right" open={!!member} onOpenChange={open => !open && onClose()}>
      <DrawerContent className="sm:max-w-md">
        {member && (
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <DrawerHeader className="flex flex-row items-start justify-between gap-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="size-10 rounded-full">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <DrawerTitle>{member.name}</DrawerTitle>
                    {isSelf && (
                      <span className="text-xs text-muted-foreground border rounded-full px-1.5 py-0.5 leading-none">You</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Close"><RiCloseLine /></Button>
              </DrawerClose>
            </DrawerHeader>

            {/* Body */}
            <div className="flex flex-col gap-6 p-6">
              {/* Status */}
              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</p>
                <StatusPill status={member.status} />
              </div>

              {/* Role */}
              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Role</p>
                {isOwner ? (
                  <RoleBadge role="owner" />
                ) : (
                  <Select
                    value={member.role}
                    onValueChange={v => handleRoleChange(v as RoleId)}
                    disabled={roleChanging || isSelf}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {ASSIGNABLE_ROLES.map(rid => (
                          <SelectItem key={rid} value={rid}>
                            {ROLE_MAP[rid].name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
                {!isOwner && (
                  <p className="text-xs text-muted-foreground">{ROLE_MAP[member.role].description}</p>
                )}
              </div>

              <Separator />

              {/* Permissions */}
              <div className="flex flex-col gap-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Permissions</p>
                <div className="flex flex-col gap-4">
                  {PERMISSIONS.map(perm => {
                    const hasPermission = ROLE_MAP[member.role].permissions.includes(perm.id)
                    return (
                      <div key={perm.id} className={cn("flex items-start gap-4", !hasPermission && "opacity-40")}>
                        <span className={cn("mt-0.5 shrink-0", hasPermission ? "text-foreground" : "text-muted-foreground")}>
                          {hasPermission
                            ? <RiCheckLine className="size-4 text-success" />
                            : <RiCloseLine className="size-4" />
                          }
                        </span>
                        <div>
                          <p className="text-sm font-medium leading-none">{perm.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{perm.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <Separator />

              {/* Activity */}
              <div className="flex flex-col gap-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Activity</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <RiTimeLine className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">Last active:</span>
                    <span>{formatLastActive(member.lastActiveAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <RiUserLine className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">Joined:</span>
                    <span>{formatDate(member.joinedAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer actions */}
            {!isOwner && (
              <div className="mt-auto border-t p-6 flex flex-col gap-2">
                {member.status !== "pending" && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleToggleSuspend}
                    loading={toggling}
                    disabled={isSelf}
                  >
                    <RiUserForbidLine />
                    {member.status === "suspended" ? "Reactivate account" : "Suspend account"}
                  </Button>
                )}
                {member.status === "pending" && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => toast.success(`Invite resent to ${member.email}`)}
                  >
                    <RiMailLine />
                    Resend invite
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full text-destructive hover:text-destructive"
                  onClick={handleRemove}
                  loading={removing}
                  disabled={isSelf}
                >
                  <RiDeleteBinLine />
                  Remove from workspace
                </Button>
              </div>
            )}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  )
}
