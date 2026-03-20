"use client"

import * as React from "react"
import { toast } from "sonner"
import { RiAlertLine, RiRefreshLine } from "@remixicon/react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SettingsSection, SettingsRow } from "@/components/settings/settings-section"

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
const MOCK_NOTIFICATIONS = {
  email: {
    activityDigest:   true,
    mentions:         true,
    teamUpdates:      false,
    productNews:      true,
  },
  push: {
    mentions:         true,
    deadlineReminders: true,
    teamUpdates:      false,
  },
  digestFrequency: "daily",
}

const DIGEST_OPTIONS = [
  { value: "realtime", label: "Real-time" },
  { value: "daily",    label: "Daily digest" },
  { value: "weekly",   label: "Weekly digest" },
  { value: "never",    label: "Never" },
]

type PageStatus = "loading" | "idle" | "saving-email" | "saving-push" | "saving-digest" | "error"

type EmailPrefs  = typeof MOCK_NOTIFICATIONS.email
type PushPrefs   = typeof MOCK_NOTIFICATIONS.push

export default function NotificationsPage() {
  const [status, setStatus] = React.useState<PageStatus>("loading")

  const [email, setEmail]   = React.useState<EmailPrefs>({ ...MOCK_NOTIFICATIONS.email })
  const [push, setPush]     = React.useState<PushPrefs>({ ...MOCK_NOTIFICATIONS.push })
  const [digest, setDigest] = React.useState(MOCK_NOTIFICATIONS.digestFrequency)

  // Derived dirty checks
  const emailIsDirty  = JSON.stringify(email)  !== JSON.stringify(MOCK_NOTIFICATIONS.email)
  const pushIsDirty   = JSON.stringify(push)   !== JSON.stringify(MOCK_NOTIFICATIONS.push)
  const digestIsDirty = digest !== MOCK_NOTIFICATIONS.digestFrequency

  React.useEffect(() => {
    const t = setTimeout(() => {
      setEmail({ ...MOCK_NOTIFICATIONS.email })
      setPush({ ...MOCK_NOTIFICATIONS.push })
      setDigest(MOCK_NOTIFICATIONS.digestFrequency)
      setStatus("idle")
    }, 600)
    return () => clearTimeout(t)
  }, [])

  async function save(section: "email" | "push" | "digest") {
    const s = section === "email" ? "saving-email"
            : section === "push"  ? "saving-push"
            : "saving-digest"
    setStatus(s as PageStatus)
    await new Promise(r => setTimeout(r, 900))
    setStatus("idle")
    toast.success("Notification preferences saved")
  }

  function handleRetry() {
    setStatus("loading")
    setTimeout(() => {
      setEmail({ ...MOCK_NOTIFICATIONS.email })
      setPush({ ...MOCK_NOTIFICATIONS.push })
      setDigest(MOCK_NOTIFICATIONS.digestFrequency)
      setStatus("idle")
    }, 600)
  }

  // Master email toggle — true when all email prefs are on
  const allEmailOn  = Object.values(email).every(Boolean)
  const allPushOn   = Object.values(push).every(Boolean)

  function toggleAllEmail(on: boolean) {
    setEmail(Object.fromEntries(Object.keys(email).map(k => [k, on])) as EmailPrefs)
  }
  function toggleAllPush(on: boolean) {
    setPush(Object.fromEntries(Object.keys(push).map(k => [k, on])) as PushPrefs)
  }

  // ---------------------------------------------------------------------------
  // Loading skeleton
  // ---------------------------------------------------------------------------
  if (status === "loading") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <Skeleton className="h-7 w-32 mb-1.5" />
          <Skeleton className="h-4 w-60" />
        </div>
        {[0, 1].map(s => (
          <div key={s} className="rounded-xl border divide-y">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-6 w-11 rounded-full" />
            </div>
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between px-5 py-4">
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-44" />
                </div>
                <Skeleton className="h-6 w-11 rounded-full" />
              </div>
            ))}
          </div>
        ))}
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
          <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">Choose when and how you're notified</p>
        </div>
        <Alert variant="error">
          <RiAlertLine className="size-4" />
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>Failed to load notification preferences.</span>
            <Button variant="outline" size="sm" onClick={handleRetry}>
              <RiRefreshLine />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const isSavingEmail  = status === "saving-email"
  const isSavingPush   = status === "saving-push"
  const isSavingDigest = status === "saving-digest"

  // ---------------------------------------------------------------------------
  // Populated / saving state
  // ---------------------------------------------------------------------------
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Choose when and how you're notified.
        </p>
      </div>

      {/* Email notifications */}
      <SettingsSection
        title="Email notifications"
        description="Emails are sent to kasidyray@gmail.com"
        onSave={() => save("email")}
        isSaving={isSavingEmail}
        isDirty={emailIsDirty}
      >
        {/* Master toggle */}
        <SettingsRow
          label="All email notifications"
          description="Enable or disable all email alerts at once"
          htmlFor="email-all"
        >
          <Switch
            id="email-all"
            checked={allEmailOn}
            onCheckedChange={toggleAllEmail}
            disabled={isSavingEmail}
          />
        </SettingsRow>

        <SettingsRow
          label="Activity digest"
          description="A summary of activity across your projects"
          htmlFor="email-digest"
        >
          <Switch
            id="email-digest"
            checked={email.activityDigest}
            onCheckedChange={v => setEmail(p => ({ ...p, activityDigest: v }))}
            disabled={isSavingEmail}
          />
        </SettingsRow>

        <SettingsRow
          label="Mentions"
          description="When someone @mentions you in a comment"
          htmlFor="email-mentions"
        >
          <Switch
            id="email-mentions"
            checked={email.mentions}
            onCheckedChange={v => setEmail(p => ({ ...p, mentions: v }))}
            disabled={isSavingEmail}
          />
        </SettingsRow>

        <SettingsRow
          label="Team updates"
          description="Member added, removed, or role changes"
          htmlFor="email-team"
        >
          <Switch
            id="email-team"
            checked={email.teamUpdates}
            onCheckedChange={v => setEmail(p => ({ ...p, teamUpdates: v }))}
            disabled={isSavingEmail}
          />
        </SettingsRow>

        <SettingsRow
          label="Product news"
          description="New features, improvements, and announcements"
          htmlFor="email-news"
        >
          <Switch
            id="email-news"
            checked={email.productNews}
            onCheckedChange={v => setEmail(p => ({ ...p, productNews: v }))}
            disabled={isSavingEmail}
          />
        </SettingsRow>
      </SettingsSection>

      {/* Push notifications */}
      <SettingsSection
        title="Push notifications"
        description="In-app alerts delivered while you're active."
        onSave={() => save("push")}
        isSaving={isSavingPush}
        isDirty={pushIsDirty}
      >
        {/* Master toggle */}
        <SettingsRow
          label="All push notifications"
          description="Enable or disable all push alerts at once"
          htmlFor="push-all"
        >
          <Switch
            id="push-all"
            checked={allPushOn}
            onCheckedChange={toggleAllPush}
            disabled={isSavingPush}
          />
        </SettingsRow>

        <SettingsRow
          label="Mentions"
          description="When someone @mentions you"
          htmlFor="push-mentions"
        >
          <Switch
            id="push-mentions"
            checked={push.mentions}
            onCheckedChange={v => setPush(p => ({ ...p, mentions: v }))}
            disabled={isSavingPush}
          />
        </SettingsRow>

        <SettingsRow
          label="Deadline reminders"
          description="Alerts when a task deadline is approaching"
          htmlFor="push-deadlines"
        >
          <Switch
            id="push-deadlines"
            checked={push.deadlineReminders}
            onCheckedChange={v => setPush(p => ({ ...p, deadlineReminders: v }))}
            disabled={isSavingPush}
          />
        </SettingsRow>

        <SettingsRow
          label="Team updates"
          description="Member and role changes in your workspace"
          htmlFor="push-team"
        >
          <Switch
            id="push-team"
            checked={push.teamUpdates}
            onCheckedChange={v => setPush(p => ({ ...p, teamUpdates: v }))}
            disabled={isSavingPush}
          />
        </SettingsRow>
      </SettingsSection>

      {/* Digest frequency */}
      <SettingsSection
        title="Digest frequency"
        description="How often you receive a summary of activity."
        onSave={() => save("digest")}
        isSaving={isSavingDigest}
        isDirty={digestIsDirty}
      >
        <SettingsRow
          label="Send digest"
          description="Batches notifications into a single summary email"
        >
          <Select
            value={digest}
            onValueChange={setDigest}
            disabled={isSavingDigest}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DIGEST_OPTIONS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SettingsRow>
      </SettingsSection>
    </div>
  )
}
