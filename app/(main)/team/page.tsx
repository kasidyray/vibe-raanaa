"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  RiAddLine,
  RiContractLeftRightLine,
  RiGroupLine,
  RiMailLine,
  RiUserAddLine,
} from "@remixicon/react"

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
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty"

import {
  type Member,
  type RoleId,
  type ContainerSize,
  MEMBERS,
  containerSizes,
} from "./data"
import { TeamTableSkeleton, TeamMembersTable } from "./members-table"
import { InviteDialog } from "./invite-dialog"
import { MemberDetailDrawer } from "./member-drawer"
import { RolesTab } from "./roles-tab"

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeamPage() {
  const router = useRouter()
  const [containerSize, setContainerSize]     = React.useState<ContainerSize>("xl")
  const [members, setMembers]                 = React.useState<Member[]>(MEMBERS)
  const [inviteOpen, setInviteOpen]           = React.useState(false)
  const [selectedMember, setSelectedMember]   = React.useState<Member | null>(null)
  const [isTableLoading, setIsTableLoading]   = React.useState(true)

  React.useEffect(() => {
    const t = setTimeout(() => setIsTableLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

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
            <Button onClick={() => router.push("/invite")}>
              <RiUserAddLine />
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
          {isTableLoading ? (
            <TeamTableSkeleton rows={8} />
          ) : members.length === 0 ? (
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="stacked"><RiGroupLine /></EmptyMedia>
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
                <EmptyMedia variant="stacked"><RiMailLine /></EmptyMedia>
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
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 md:overflow-y-auto">
        <Container size={containerSize} className="flex flex-1 flex-col gap-6">{content}</Container>
      </div>
    </>
  )
}
