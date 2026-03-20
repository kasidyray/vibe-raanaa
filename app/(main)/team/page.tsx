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
  RiAddLine,
  RiCheckLine,
  RiCloseLine,
  RiContractLeftRightLine,
  RiDeleteBinLine,
  RiGroupLine,
  RiMailLine,
  RiMore2Line,
  RiRefreshLine,
  RiShieldLine,
  RiUserForbidLine,
  RiUserLine,
  RiEditLine,
  RiLockLine,
  RiEyeLine,
  RiFileCopyLine,
  RiBankCardLine,
  RiCodeLine,
  RiTimeLine,
} from "@remixicon/react"
import { toast } from "sonner"

import { SiteHeader } from "@/components/site-header"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty"
import {
  DataTable,
  DataTableToolbar,
  DataTableSearch,
  DataTableFacetedFilter,
  DataTableSortMenu,
  DataTableColumnToggle,
  DataTablePagination,
  DataTableSelectionBar,
} from "@/components/ui/data-table"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type MemberStatus = "active" | "pending" | "suspended"
type RoleId = "owner" | "admin" | "editor" | "viewer"

type Permission = {
  id: string
  label: string
  description: string
  icon: React.ReactNode
}

type Role = {
  id: RoleId
  name: string
  description: string
  permissions: string[] // permission ids
}

type Member = {
  id: string
  name: string
  email: string
  avatar: string
  role: RoleId
  status: MemberStatus
  lastActiveAt: string | null // ISO string or null for pending
  joinedAt: string
}

type ContainerSize = "sm" | "default" | "lg" | "xl" | "full"

// ─── Permissions ──────────────────────────────────────────────────────────────

const PERMISSIONS: Permission[] = [
  {
    id: "view_data",
    label: "View data",
    description: "Read-only access to all workspace data",
    icon: <RiEyeLine className="size-4" />,
  },
  {
    id: "manage_content",
    label: "Create & edit content",
    description: "Create, edit, and publish content",
    icon: <RiFileCopyLine className="size-4" />,
  },
  {
    id: "delete_content",
    label: "Delete content",
    description: "Permanently delete content and records",
    icon: <RiDeleteBinLine className="size-4" />,
  },
  {
    id: "manage_team",
    label: "Manage team",
    description: "Invite, remove, and update team members",
    icon: <RiGroupLine className="size-4" />,
  },
  {
    id: "billing_access",
    label: "Billing access",
    description: "View and manage billing and subscriptions",
    icon: <RiBankCardLine className="size-4" />,
  },
  {
    id: "api_access",
    label: "API access",
    description: "Generate and manage API keys",
    icon: <RiCodeLine className="size-4" />,
  },
]

// ─── Roles ────────────────────────────────────────────────────────────────────

const ROLES: Role[] = [
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

const ROLE_MAP = Object.fromEntries(ROLES.map(r => [r.id, r])) as Record<RoleId, Role>

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MEMBERS: Member[] = [
  {
    id: "usr_001",
    name: "Ikedi Eze",
    email: "kasidyray@gmail.com",
    avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Ikedi",
    role: "owner",
    status: "active",
    lastActiveAt: new Date().toISOString(),
    joinedAt: "2023-01-10T09:00:00Z",
  },
  {
    id: "usr_002",
    name: "Amara Osei",
    email: "amara.osei@workspace.io",
    avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Amara",
    role: "admin",
    status: "active",
    lastActiveAt: "2026-03-19T14:22:00Z",
    joinedAt: "2023-03-15T11:00:00Z",
  },
  {
    id: "usr_003",
    name: "James Carter",
    email: "james.carter@workspace.io",
    avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=James",
    role: "admin",
    status: "active",
    lastActiveAt: "2026-03-18T09:10:00Z",
    joinedAt: "2023-05-02T10:00:00Z",
  },
  {
    id: "usr_004",
    name: "Priya Sharma",
    email: "priya.sharma@workspace.io",
    avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Priya",
    role: "editor",
    status: "active",
    lastActiveAt: "2026-03-20T08:45:00Z",
    joinedAt: "2023-07-20T12:00:00Z",
  },
  {
    id: "usr_005",
    name: "Nathan Reyes",
    email: "nathan.reyes@workspace.io",
    avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Nathan",
    role: "editor",
    status: "active",
    lastActiveAt: "2026-03-17T16:30:00Z",
    joinedAt: "2023-09-01T08:00:00Z",
  },
  {
    id: "usr_006",
    name: "Zoe Williams",
    email: "zoe.williams@workspace.io",
    avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Zoe",
    role: "viewer",
    status: "active",
    lastActiveAt: "2026-03-15T11:20:00Z",
    joinedAt: "2024-01-08T13:00:00Z",
  },
  {
    id: "usr_007",
    name: "Chris Huang",
    email: "chris.huang@workspace.io",
    avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Chris",
    role: "viewer",
    status: "active",
    lastActiveAt: "2026-03-14T10:00:00Z",
    joinedAt: "2024-02-14T09:00:00Z",
  },
  {
    id: "usr_008",
    name: "Riya Kapoor",
    email: "riya.kapoor@example.com",
    avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Riya",
    role: "editor",
    status: "pending",
    lastActiveAt: null,
    joinedAt: "2026-03-18T14:00:00Z",
  },
  {
    id: "usr_009",
    name: "Michael Torres",
    email: "michael.torres@example.com",
    avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Michael",
    role: "viewer",
    status: "pending",
    lastActiveAt: null,
    joinedAt: "2026-03-19T10:30:00Z",
  },
  {
    id: "usr_010",
    name: "Olivia Brooks",
    email: "olivia.brooks@workspace.io",
    avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Olivia",
    role: "editor",
    status: "suspended",
    lastActiveAt: "2026-02-28T17:00:00Z",
    joinedAt: "2023-11-03T11:00:00Z",
  },
  {
    id: "usr_011",
    name: "Ethan Ward",
    email: "ethan.ward@workspace.io",
    avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Ethan",
    role: "viewer",
    status: "active",
    lastActiveAt: "2026-03-13T15:45:00Z",
    joinedAt: "2024-04-22T08:30:00Z",
  },
  {
    id: "usr_012",
    name: "Lucas Pereira",
    email: "lucas.pereira@workspace.io",
    avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Lucas",
    role: "admin",
    status: "active",
    lastActiveAt: "2026-03-20T07:55:00Z",
    joinedAt: "2023-06-10T10:00:00Z",
  },
]

const CURRENT_USER_ID = "usr_001"

const containerSizes: { value: ContainerSize; label: string }[] = [
  { value: "sm",      label: "Small"   },
  { value: "default", label: "Default" },
  { value: "lg",      label: "Large"   },
  { value: "xl",      label: "X-Large" },
  { value: "full",    label: "Full"    },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatLastActive(iso: string | null): string {
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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

// ─── RoleBadge ────────────────────────────────────────────────────────────────

const ROLE_BADGE_VARIANT: Record<RoleId, "critical" | "warning" | "info" | "neutral"> = {
  owner:  "critical",
  admin:  "warning",
  editor: "info",
  viewer: "neutral",
}

function RoleBadge({ role }: { role: RoleId }) {
  return (
    <Badge variant={ROLE_BADGE_VARIANT[role]} size="sm">
      {ROLE_MAP[role].name}
    </Badge>
  )
}

function StatusPill({ status }: { status: MemberStatus }) {
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

// ─── InviteDialog ─────────────────────────────────────────────────────────────

const ASSIGNABLE_ROLES: RoleId[] = ["admin", "editor", "viewer"]

function InviteDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [emails, setEmails]     = React.useState("")
  const [role, setRole]         = React.useState<RoleId>("editor")
  const [message, setMessage]   = React.useState("")
  const [loading, setLoading]   = React.useState(false)
  const [emailError, setEmailError] = React.useState("")

  const validateEmails = (raw: string): string[] | null => {
    const parts = raw.split(/[,\n]+/).map(e => e.trim()).filter(Boolean)
    if (parts.length === 0) return null
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    for (const e of parts) {
      if (!emailRegex.test(e)) return null
    }
    return parts
  }

  const handleSubmit = async () => {
    const parsed = validateEmails(emails)
    if (!parsed) {
      setEmailError("Enter one or more valid email addresses, separated by commas.")
      return
    }
    setEmailError("")
    setLoading(true)

    // Simulate API call
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    onOpenChange(false)
    setEmails("")
    setMessage("")
    setRole("editor")
    toast.success(
      parsed.length === 1
        ? `Invite sent to ${parsed[0]}`
        : `Invites sent to ${parsed.length} people`
    )
  }

  const handleOpenChange = (v: boolean) => {
    if (!loading) {
      setEmails("")
      setMessage("")
      setRole("editor")
      setEmailError("")
      onOpenChange(v)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Invite team members</DialogTitle>
          <DialogDescription>
            Send an invitation email. Recipients will be asked to create an account or sign in.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="invite-emails">
              Email address <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="invite-emails"
              placeholder="name@example.com, another@example.com"
              value={emails}
              onChange={e => { setEmails(e.target.value); setEmailError("") }}
              rows={2}
              className={cn(emailError && "border-destructive")}
              disabled={loading}
            />
            {emailError ? (
              <p className="text-xs text-destructive">{emailError}</p>
            ) : (
              <p className="text-xs text-muted-foreground">Separate multiple addresses with a comma or newline.</p>
            )}
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="invite-role">Role</Label>
            <Select value={role} onValueChange={v => setRole(v as RoleId)}>
              <SelectTrigger id="invite-role" className="w-full" disabled={loading}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {ASSIGNABLE_ROLES.map(rid => (
                    <SelectItem key={rid} value={rid}>
                      <span className="font-medium">{ROLE_MAP[rid].name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{ROLE_MAP[rid].description.split(".")[0]}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Optional message */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="invite-message">
              Message <span className="text-muted-foreground text-xs font-normal">(optional)</span>
            </Label>
            <Textarea
              id="invite-message"
              placeholder="Add a personal note to the invitation..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={2}
              disabled={loading}
            />
          </div>
        </div>

        <DialogFooter showCloseButton={false}>
          <DialogClose render={<Button variant="outline" disabled={loading}>Cancel</Button>} />
          <Button onClick={handleSubmit} loading={loading}>
            <RiMailLine />
            Send invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ─── MemberDetailDrawer ───────────────────────────────────────────────────────

function MemberDetailDrawer({
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

  const isSelf = member?.id === CURRENT_USER_ID
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
                          {hasPermission ? <RiCheckLine className="size-4 text-success" /> : <RiCloseLine className="size-4" />}
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

// ─── TeamMembersTable ─────────────────────────────────────────────────────────

const SORT_COLUMNS = [
  { id: "name",         label: "Name"        },
  { id: "role",         label: "Role"        },
  { id: "status",       label: "Status"      },
  { id: "lastActiveAt", label: "Last active" },
  { id: "joinedAt",     label: "Joined"      },
]

function buildColumns(
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

function TeamMembersTable({
  members,
  onMemberClick,
  onRoleChange,
  onRemove,
  onToggleSuspend,
  onInvite,
}: {
  members: Member[]
  onMemberClick: (m: Member) => void
  onRoleChange: (id: string, role: RoleId) => void
  onRemove: (id: string) => void
  onToggleSuspend: (id: string) => void
  onInvite: () => void
}) {
  const [sorting, setSorting]                   = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter]         = React.useState("")
  const [rowSelection, setRowSelection]         = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [roleFilter, setRoleFilter]             = React.useState<string[]>([])
  const [statusFilter, setStatusFilter]         = React.useState<string[]>([])

  const columnFilters = React.useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = []
    if (roleFilter.length)   filters.push({ id: "role",   value: roleFilter })
    if (statusFilter.length) filters.push({ id: "status", value: statusFilter })
    return filters
  }, [roleFilter, statusFilter])

  const hasActiveFilters = roleFilter.length > 0 || statusFilter.length > 0

  const columns = React.useMemo(
    () => buildColumns(onRoleChange, onRemove, onToggleSuspend),
    [onRoleChange, onRemove, onToggleSuspend]
  )

  const table = useReactTable({
    data: members,
    columns,
    state: { sorting, globalFilter, rowSelection, columnVisibility, columnFilters },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const q = filterValue.toLowerCase()
      return (
        row.original.name.toLowerCase().includes(q) ||
        row.original.email.toLowerCase().includes(q)
      )
    },
  })

  const selectedCount = Object.keys(rowSelection).length

  return (
    <div className="flex flex-col gap-4">
      <DataTableToolbar>
        <DataTableSearch table={table} placeholder="Search by name or email..." />

        <DataTableFacetedFilter
          title="Role"
          options={[
            { value: "owner",  label: "Owner"  },
            { value: "admin",  label: "Admin"  },
            { value: "editor", label: "Editor" },
            { value: "viewer", label: "Viewer" },
          ]}
          selectedValues={roleFilter}
          onSelectionChange={setRoleFilter}
          icon={<RiShieldLine className="opacity-60" />}
        />

        <DataTableFacetedFilter
          title="Status"
          options={[
            { value: "active",    label: "Active"    },
            { value: "pending",   label: "Pending"   },
            { value: "suspended", label: "Suspended" },
          ]}
          selectedValues={statusFilter}
          onSelectionChange={setStatusFilter}
          icon={<RiUserLine className="opacity-60" />}
        />

        {hasActiveFilters && (
          <button
            onClick={() => { setRoleFilter([]); setStatusFilter([]) }}
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
        emptyMessage="No members match your filters."
        onRowClick={onMemberClick}
      />

      {table.getFilteredRowModel().rows.length > 0 && (
        <DataTablePagination
          table={table}
          style="classic"
          selectedCount={selectedCount}
          rowLabel="member"
        />
      )}

      <DataTableSelectionBar
        count={selectedCount}
        onClear={() => setRowSelection({})}
        actions={[
          { icon: RiMailLine, label: "Resend invite" },
          "separator",
          {
            icon: RiDeleteBinLine,
            label: "Remove",
            variant: "destructive",
            onClick: () => {
              const selectedIds = table.getSelectedRowModel().rows.map(r => r.original.id)
              const count = selectedIds.length
              selectedIds.forEach(id => onRemove(id))
              setRowSelection({})
              toast.success(`${count} member${count !== 1 ? "s" : ""} removed from workspace`)
            },
          },
        ]}
      />
    </div>
  )
}

// ─── RolesTab ─────────────────────────────────────────────────────────────────

function RolesTab({ members }: { members: Member[] }) {
  const memberCountByRole = React.useMemo(() => {
    const counts: Record<string, number> = {}
    for (const m of members) {
      counts[m.role] = (counts[m.role] ?? 0) + 1
    }
    return counts
  }, [members])

  return (
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
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeamPage() {
  const [containerSize, setContainerSize] = React.useState<ContainerSize>("xl")
  const [members, setMembers]             = React.useState<Member[]>(MEMBERS)
  const [inviteOpen, setInviteOpen]       = React.useState(false)
  const [selectedMember, setSelectedMember] = React.useState<Member | null>(null)

  const handleRoleChange = React.useCallback((id: string, role: RoleId) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, role } : m))
    // Keep drawer in sync
    setSelectedMember(prev => prev?.id === id ? { ...prev, role } : prev)
  }, [])

  const handleRemove = React.useCallback((id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id))
    setSelectedMember(prev => prev?.id === id ? null : prev)
  }, [])

  const handleToggleSuspend = React.useCallback((id: string) => {
    setMembers(prev => prev.map(m => {
      if (m.id !== id) return m
      return { ...m, status: m.status === "suspended" ? "active" : "suspended" }
    }))
    setSelectedMember(prev => {
      if (prev?.id !== id) return prev
      return { ...prev, status: prev.status === "suspended" ? "active" : "suspended" }
    })
  }, [])

  const activeCount  = members.filter(m => m.status === "active").length
  const pendingCount = members.filter(m => m.status === "pending").length

  const content = (
    <>
      <PageHeader
        title="Team"
        description="Manage members, roles, and permissions for your workspace."
        actions={
          <div className="flex items-center gap-2">
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
            <Button onClick={() => setInviteOpen(true)}>
              <RiAddLine />
              Invite member
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="members" className="flex flex-1 flex-col">
        <div className="pb-4">
          <TabsList variant="pill">
            <TabsTrigger value="members">
              Members
              {members.length > 0 && (
                <span className="ml-1.5 tabular-nums text-muted-foreground">{members.length}</span>
              )}
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              {pendingCount > 0 && (
                <span className="ml-1.5 tabular-nums text-muted-foreground">{pendingCount}</span>
              )}
            </TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          </TabsList>
        </div>

        {/* All members */}
        <TabsContent value="members">
          {members.length === 0 ? (
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="icon"><RiGroupLine /></EmptyMedia>
                <EmptyTitle>No team members</EmptyTitle>
                <EmptyDescription>
                  Your workspace has no members yet. Invite colleagues to start collaborating.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button size="sm" onClick={() => setInviteOpen(true)}>
                  <RiAddLine />Invite member
                </Button>
              </EmptyContent>
            </Empty>
          ) : (
            <TeamMembersTable
              members={members}
              onMemberClick={setSelectedMember}
              onRoleChange={handleRoleChange}
              onRemove={handleRemove}
              onToggleSuspend={handleToggleSuspend}
              onInvite={() => setInviteOpen(true)}
            />
          )}
        </TabsContent>

        {/* Pending invites */}
        <TabsContent value="pending">
          {pendingCount === 0 ? (
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="icon"><RiMailLine /></EmptyMedia>
                <EmptyTitle>No pending invites</EmptyTitle>
                <EmptyDescription>
                  All sent invitations have been accepted. Invite more colleagues to grow your team.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button size="sm" onClick={() => setInviteOpen(true)}>
                  <RiAddLine />Invite member
                </Button>
              </EmptyContent>
            </Empty>
          ) : (
            <TeamMembersTable
              members={members.filter(m => m.status === "pending")}
              onMemberClick={setSelectedMember}
              onRoleChange={handleRoleChange}
              onRemove={handleRemove}
              onToggleSuspend={handleToggleSuspend}
              onInvite={() => setInviteOpen(true)}
            />
          )}
        </TabsContent>

        {/* Roles & Permissions */}
        <TabsContent value="roles">
          <RolesTab members={members} />
        </TabsContent>
      </Tabs>

      {/* Invite dialog */}
      <InviteDialog open={inviteOpen} onOpenChange={setInviteOpen} />

      {/* Member detail drawer */}
      <MemberDetailDrawer
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        onRoleChange={handleRoleChange}
        onRemove={handleRemove}
        onToggleSuspend={handleToggleSuspend}
      />
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
              <BreadcrumbItem><BreadcrumbPage>Team</BreadcrumbPage></BreadcrumbItem>
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
