"use client"

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"
import {
  RiAlertLine,
  RiRefreshLine,
  RiGroupLine,
  RiArrowRightLine,
  RiAddLine,
  RiMailLine,
} from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SettingsSection, SettingsRow } from "@/components/settings/settings-section"

// ---------------------------------------------------------------------------
// Mock data — logged-in user is always Ikedi Eze (usr_001)
// ---------------------------------------------------------------------------
const MOCK_MEMBERS = [
  {
    id: "usr_001",
    name: "Ikedi Eze",
    email: "kasidyray@gmail.com",
    role: "Owner",
    avatarSeed: "Ikedi",
    current: true,
  },
  {
    id: "usr_002",
    name: "Amara Osei",
    email: "amara.osei@acme.com",
    role: "Admin",
    avatarSeed: "Amara",
    current: false,
  },
  {
    id: "usr_003",
    name: "Tunde Adeyemi",
    email: "tunde@acme.com",
    role: "Member",
    avatarSeed: "Tunde",
    current: false,
  },
  {
    id: "usr_004",
    name: "Fatima Aliyu",
    email: "fatima@acme.com",
    role: "Member",
    avatarSeed: "Fatima",
    current: false,
  },
]

const ROLE_BADGE: Record<string, "info" | "warning" | "neutral"> = {
  Owner:  "info",
  Admin:  "warning",
  Member: "neutral",
}

type PageStatus = "loading" | "idle" | "sending" | "error"

export default function TeamSettingsPage() {
  const [status, setStatus] = React.useState<PageStatus>("loading")
  const [inviteEmail, setInviteEmail] = React.useState("")
  const [inviteRole, setInviteRole]   = React.useState("Member")
  const [emailError, setEmailError]   = React.useState("")

  React.useEffect(() => {
    const t = setTimeout(() => setStatus("idle"), 600)
    return () => clearTimeout(t)
  }, [])

  function validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  async function handleInvite() {
    if (!inviteEmail.trim()) {
      setEmailError("Email address is required")
      return
    }
    if (!validateEmail(inviteEmail)) {
      setEmailError("Enter a valid email address")
      return
    }
    setEmailError("")
    setStatus("sending")
    await new Promise(r => setTimeout(r, 1000))
    setStatus("idle")
    setInviteEmail("")
    toast.success(`Invite sent to ${inviteEmail}`)
  }

  function handleRetry() {
    setStatus("loading")
    setTimeout(() => setStatus("idle"), 600)
  }

  // ---------------------------------------------------------------------------
  // Loading skeleton
  // ---------------------------------------------------------------------------
  if (status === "loading") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <Skeleton className="h-7 w-16 mb-1.5" />
          <Skeleton className="h-4 w-56" />
        </div>
        <div className="rounded-xl border divide-y">
          <div className="px-5 py-4 border-b">
            <Skeleton className="h-4 w-32" />
          </div>
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                <Skeleton className="size-8 rounded-full" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-36" />
                </div>
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Error state
  // ---------------------------------------------------------------------------
  if (status === "error") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your workspace members</p>
        </div>
        <Alert variant="error">
          <RiAlertLine className="size-4" />
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>Failed to load team settings. Please try again.</span>
            <Button variant="outline" size="sm" onClick={handleRetry}>
              <RiRefreshLine />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const isSending = status === "sending"

  // ---------------------------------------------------------------------------
  // Populated state
  // ---------------------------------------------------------------------------
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage members and roles in your workspace.
        </p>
      </div>

      {/* Invite new member */}
      <SettingsSection
        title="Invite a member"
        description="New members will receive an email with a link to join."
        footer={
          <div className="flex items-center justify-between gap-4 w-full">
            <span />
            <Button size="sm" onClick={handleInvite} loading={isSending}>
              <RiMailLine />
              Send invite
            </Button>
          </div>
        }
      >
        <SettingsRow label="Email address" htmlFor="invite-email" layout="col">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                id="invite-email"
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={e => {
                  setInviteEmail(e.target.value)
                  setEmailError("")
                }}
                disabled={isSending}
                className={emailError ? "border-destructive" : ""}
                autoComplete="email"
              />
              {emailError && (
                <p className="text-xs text-destructive mt-1.5">{emailError}</p>
              )}
            </div>
            <Select value={inviteRole} onValueChange={v => { if (v) setInviteRole(v) }} disabled={isSending}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </SettingsRow>
      </SettingsSection>

      {/* Current members */}
      <SettingsSection
        title="Members"
        description={`${MOCK_MEMBERS.length} members in your workspace.`}
        footer={
          <div className="flex items-center justify-between gap-4 w-full">
            <p className="text-xs text-muted-foreground">
              Full member management in the Team page.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/team">
                <RiGroupLine />
                Manage team
                <RiArrowRightLine />
              </Link>
            </Button>
          </div>
        }
      >
        {MOCK_MEMBERS.map(member => (
          <div
            key={member.id}
            className="flex items-center justify-between gap-4 px-5 py-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="size-8 shrink-0">
                <AvatarImage
                  src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${member.avatarSeed}`}
                  alt={member.name}
                />
                <AvatarFallback>
                  {member.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{member.name}</p>
                  {member.current && (
                    <Badge variant="neutral" size="sm">You</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">{member.email}</p>
              </div>
            </div>
            <Badge variant={ROLE_BADGE[member.role] ?? "neutral"} size="sm">
              {member.role}
            </Badge>
          </div>
        ))}
      </SettingsSection>

      {/* Add seats callout */}
      <SettingsSection
        title="Need more seats?"
        description="Upgrade your plan to add unlimited team members."
        footer={
          <div className="flex items-center justify-between gap-4 w-full">
            <span />
            <Button size="sm" variant="outline" onClick={() => toast.info("Upgrade flow coming soon")}>
              <RiAddLine />
              Add seats
            </Button>
          </div>
        }
      >
        <SettingsRow label="Current seats" description="Active members on your plan">
          <span className="text-sm font-medium tabular-nums">
            {MOCK_MEMBERS.length} / 15 seats used
          </span>
        </SettingsRow>
      </SettingsSection>
    </div>
  )
}
