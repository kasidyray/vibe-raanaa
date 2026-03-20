"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  RiAlertLine,
  RiRefreshLine,
  RiShieldCheckLine,
  RiComputerLine,
  RiSmartphoneLine,
  RiLogoutCircleRLine,
  RiEyeLine,
  RiEyeOffLine,
} from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { SettingsSection, SettingsRow } from "@/components/settings/settings-section"

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
const MOCK_SESSIONS = [
  {
    id: "ses_001",
    device: "macOS · Chrome 124",
    icon: RiComputerLine,
    location: "Lagos, Nigeria",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "ses_002",
    device: "iPhone 15 · Safari",
    icon: RiSmartphoneLine,
    location: "Lagos, Nigeria",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "ses_003",
    device: "Windows · Firefox 125",
    icon: RiComputerLine,
    location: "Abuja, Nigeria",
    lastActive: "3 days ago",
    current: false,
  },
]

type PageStatus = "loading" | "idle" | "saving-password" | "revoking" | "error"

export default function SecurityPage() {
  const [status, setStatus] = React.useState<PageStatus>("loading")
  const [sessions, setSessions] = React.useState(MOCK_SESSIONS)

  // Password form
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword]         = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [showCurrent, setShowCurrent]         = React.useState(false)
  const [showNew, setShowNew]                 = React.useState(false)
  const [showConfirm, setShowConfirm]         = React.useState(false)
  const [pwErrors, setPwErrors] = React.useState<{
    current?: string
    new?: string
    confirm?: string
  }>({})

  const passwordIsDirty = !!(currentPassword || newPassword || confirmPassword)

  React.useEffect(() => {
    const t = setTimeout(() => setStatus("idle"), 600)
    return () => clearTimeout(t)
  }, [])

  // ---------------------------------------------------------------------------
  // Password validation
  // ---------------------------------------------------------------------------
  function validatePassword() {
    const e: typeof pwErrors = {}
    if (!currentPassword) e.current = "Current password is required"
    if (!newPassword)      e.new     = "New password is required"
    else if (newPassword.length < 8) e.new = "Must be at least 8 characters"
    if (!confirmPassword)  e.confirm = "Please confirm your new password"
    else if (newPassword !== confirmPassword) e.confirm = "Passwords do not match"
    return e
  }

  async function handleSavePassword() {
    const e = validatePassword()
    if (Object.keys(e).length > 0) {
      setPwErrors(e)
      return
    }
    setPwErrors({})
    setStatus("saving-password")
    await new Promise(r => setTimeout(r, 1200))
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setStatus("idle")
    toast.success("Password updated")
  }

  async function revokeSession(id: string) {
    setStatus("revoking")
    await new Promise(r => setTimeout(r, 800))
    setSessions(prev => prev.filter(s => s.id !== id))
    setStatus("idle")
    toast.success("Session revoked")
  }

  // ---------------------------------------------------------------------------
  // Loading skeleton
  // ---------------------------------------------------------------------------
  if (status === "loading") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <Skeleton className="h-7 w-24 mb-1.5" />
          <Skeleton className="h-4 w-56" />
        </div>
        {/* Password skeleton */}
        <div className="rounded-xl border divide-y">
          <div className="px-5 py-4 border-b">
            <Skeleton className="h-4 w-32" />
          </div>
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col gap-1.5 px-5 py-4">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
          ))}
        </div>
        {/* 2FA skeleton */}
        <div className="rounded-xl border divide-y">
          <div className="px-5 py-4 border-b">
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-52" />
            </div>
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
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
          <h1 className="text-2xl font-semibold tracking-tight">Security</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your password and account access</p>
        </div>
        <Alert variant="error">
          <RiAlertLine className="size-4" />
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>Failed to load security settings. Please try again.</span>
            <Button variant="outline" size="sm" onClick={() => setStatus("loading")}>
              <RiRefreshLine />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const isSavingPassword = status === "saving-password"

  // ---------------------------------------------------------------------------
  // Populated / saving state
  // ---------------------------------------------------------------------------
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Security</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your password and account access.
        </p>
      </div>

      {/* Change password */}
      <SettingsSection
        title="Change password"
        description="Use a strong password you don't use elsewhere."
        onSave={handleSavePassword}
        isSaving={isSavingPassword}
        isDirty={passwordIsDirty}
      >
        <SettingsRow label="Current password" htmlFor="current-password" layout="col">
          <div className="relative">
            <Input
              id="current-password"
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={e => {
                setCurrentPassword(e.target.value)
                setPwErrors(v => ({ ...v, current: undefined }))
              }}
              disabled={isSavingPassword}
              className={pwErrors.current ? "border-destructive pr-9" : "pr-9"}
              autoComplete="current-password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={showCurrent ? "Hide password" : "Show password"}
              onClick={() => setShowCurrent(v => !v)}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showCurrent ? <RiEyeOffLine /> : <RiEyeLine />}
            </Button>
          </div>
          {pwErrors.current && (
            <p className="text-xs text-destructive">{pwErrors.current}</p>
          )}
        </SettingsRow>

        <SettingsRow label="New password" htmlFor="new-password" layout="col">
          <div className="relative">
            <Input
              id="new-password"
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={e => {
                setNewPassword(e.target.value)
                setPwErrors(v => ({ ...v, new: undefined }))
              }}
              disabled={isSavingPassword}
              className={pwErrors.new ? "border-destructive pr-9" : "pr-9"}
              autoComplete="new-password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={showNew ? "Hide password" : "Show password"}
              onClick={() => setShowNew(v => !v)}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showNew ? <RiEyeOffLine /> : <RiEyeLine />}
            </Button>
          </div>
          {pwErrors.new && (
            <p className="text-xs text-destructive">{pwErrors.new}</p>
          )}
          {!pwErrors.new && newPassword && (
            <p className="text-xs text-muted-foreground">Minimum 8 characters</p>
          )}
        </SettingsRow>

        <SettingsRow label="Confirm new password" htmlFor="confirm-password" layout="col">
          <div className="relative">
            <Input
              id="confirm-password"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={e => {
                setConfirmPassword(e.target.value)
                setPwErrors(v => ({ ...v, confirm: undefined }))
              }}
              disabled={isSavingPassword}
              className={pwErrors.confirm ? "border-destructive pr-9" : "pr-9"}
              autoComplete="new-password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={showConfirm ? "Hide password" : "Show password"}
              onClick={() => setShowConfirm(v => !v)}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showConfirm ? <RiEyeOffLine /> : <RiEyeLine />}
            </Button>
          </div>
          {pwErrors.confirm && (
            <p className="text-xs text-destructive">{pwErrors.confirm}</p>
          )}
        </SettingsRow>
      </SettingsSection>

      {/* Two-factor authentication — placeholder */}
      <SettingsSection
        title="Two-factor authentication"
        description="Add a second layer of protection to your account."
        footer={
          <div className="flex items-center justify-between gap-4 w-full">
            <Badge variant="neutral" size="sm">Not configured</Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.info("2FA setup coming soon")}
            >
              <RiShieldCheckLine />
              Set up 2FA
            </Button>
          </div>
        }
      >
        <SettingsRow
          label="Authenticator app"
          description="Use an authenticator app (TOTP) to generate one-time codes."
        >
          <Badge variant="neutral" size="sm">Not set up</Badge>
        </SettingsRow>
      </SettingsSection>

      {/* Active sessions */}
      <SettingsSection
        title="Active sessions"
        description="These devices are currently signed in to your account."
        footer={
          sessions.filter(s => !s.current).length > 0 ? (
            <div className="flex items-center justify-between gap-4 w-full">
              <p className="text-xs text-muted-foreground">
                {sessions.filter(s => !s.current).length} other active session
                {sessions.filter(s => !s.current).length !== 1 ? "s" : ""}
              </p>
              <Button
                size="sm"
                variant="destructive"
                loading={status === "revoking"}
                onClick={async () => {
                  setStatus("revoking")
                  await new Promise(r => setTimeout(r, 900))
                  setSessions(prev => prev.filter(s => s.current))
                  setStatus("idle")
                  toast.success("All other sessions revoked")
                }}
              >
                Revoke all others
              </Button>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">This is your only active session.</p>
          )
        }
      >
        {sessions.length === 0 ? (
          <div className="px-5 py-6 text-center text-sm text-muted-foreground">
            No active sessions found.
          </div>
        ) : (
          sessions.map(session => {
            const Icon = session.icon
            return (
              <div
                key={session.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{session.device}</p>
                      {session.current && (
                        <Badge variant="success" size="sm">Current</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {session.location} · {session.lastActive}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <Button
                    variant="ghost"
                    size="sm"
                    loading={status === "revoking"}
                    onClick={() => revokeSession(session.id)}
                    className="shrink-0 text-muted-foreground"
                  >
                    <RiLogoutCircleRLine />
                    Revoke
                  </Button>
                )}
              </div>
            )
          })
        )}
      </SettingsSection>
    </div>
  )
}
