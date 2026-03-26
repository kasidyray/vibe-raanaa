"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import {
  RiMore2Line,
  RiShieldLine,
  RiMailLine,
  RiUserForbidLine,
  RiDeleteBinLine,
} from "@remixicon/react"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { type Member, type RoleId, CURRENT_USER_ID, ASSIGNABLE_ROLES, ROLE_MAP } from "./data"
import { RoleBadge, StatusPill } from "./role-badge"
import { formatLastActive } from "./data"

// ─── Sort columns config ──────────────────────────────────────────────────────

export const SORT_COLUMNS = [
  { id: "name",         label: "Name"        },
  { id: "role",         label: "Role"        },
  { id: "status",       label: "Status"      },
  { id: "lastActiveAt", label: "Last active" },
  { id: "joinedAt",     label: "Joined"      },
]

// ─── Column builder ───────────────────────────────────────────────────────────

export function buildColumns(
  onRoleChange: (id: string, role: RoleId) => void,
  onRemove: (id: string) => void,
  onToggleSuspend: (id: string) => void,
): ColumnDef<Member>[] {
  return [
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
            disabled={row.original.id === CURRENT_USER_ID}
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
          <div className="relative">
            <Avatar className="size-8 rounded-full">
              <AvatarImage src={row.original.avatar} alt={row.original.name} />
              <AvatarFallback className="text-xs">{row.original.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            {row.original.status === "active" && (
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-success border-2 border-background" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-sm">{row.original.name}</span>
              {row.original.id === CURRENT_USER_ID && (
                <span className="text-[10px] text-muted-foreground border rounded-full px-1.5 py-px leading-none">You</span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{row.original.email}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "ROLE",
      cell: ({ row }) => <RoleBadge role={row.original.role} />,
      filterFn: (row, _id, filterValues: string[]) =>
        filterValues.length === 0 || filterValues.includes(row.original.role),
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => <StatusPill status={row.original.status} />,
      filterFn: (row, _id, filterValues: string[]) =>
        filterValues.length === 0 || filterValues.includes(row.original.status),
    },
    {
      accessorKey: "lastActiveAt",
      header: "LAST ACTIVE",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">{formatLastActive(row.original.lastActiveAt)}</span>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const m = row.original
        const isSelf = m.id === CURRENT_USER_ID
        const isOwner = m.role === "owner"
        return (
          <div onClick={e => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="ml-auto" />}>
                <RiMore2Line />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuGroup>
                  {/* Role change — only for non-owners */}
                  {!isOwner && (
                    <>
                      <DropdownMenuLabel>Change role</DropdownMenuLabel>
                      {ASSIGNABLE_ROLES.filter(r => r !== m.role).map(rid => (
                        <DropdownMenuItem key={rid} onClick={() => {
                          onRoleChange(m.id, rid)
                          toast.success(`${m.name}'s role updated to ${ROLE_MAP[rid].name}`)
                        }}>
                          <RiShieldLine />
                          Make {ROLE_MAP[rid].name}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                    </>
                  )}

                  {/* Pending: resend invite */}
                  {m.status === "pending" && (
                    <DropdownMenuItem onClick={() => toast.success(`Invite resent to ${m.email}`)}>
                      <RiMailLine />
                      Resend invite
                    </DropdownMenuItem>
                  )}

                  {/* Suspend / reactivate */}
                  {!isOwner && m.status !== "pending" && (
                    <DropdownMenuItem
                      disabled={isSelf}
                      onClick={() => {
                        onToggleSuspend(m.id)
                        toast.success(
                          m.status === "suspended"
                            ? `${m.name}'s account reactivated`
                            : `${m.name}'s account suspended`
                        )
                      }}
                    >
                      <RiUserForbidLine />
                      {m.status === "suspended" ? "Reactivate" : "Suspend"}
                    </DropdownMenuItem>
                  )}

                  {/* Remove */}
                  {!isOwner && (
                    <DropdownMenuItem
                      variant="destructive"
                      disabled={isSelf}
                      onClick={() => {
                        onRemove(m.id)
                        toast.success(`${m.name} removed from workspace`)
                      }}
                    >
                      <RiDeleteBinLine />
                      Remove
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
      size: 48,
    },
  ]
}
