"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  RiUploadLine,
  RiAlertLine,
  RiRefreshLine,
} from "@remixicon/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SettingsSection, SettingsRow } from "@/components/settings/settings-section"

// ---------------------------------------------------------------------------
// Mock data — logged-in user is always Ikedi Eze (usr_001)
// ---------------------------------------------------------------------------
const MOCK_PROFILE = {
  firstName: "Ikedi",
  lastName: "Eze",
  email: "kasidyray@gmail.com",
  bio: "Product designer and developer based in Lagos.",
}

type PageStatus = "loading" | "idle" | "saving-info" | "saving-bio" | "error"

export default function ProfilePage() {
  const [status, setStatus] = React.useState<PageStatus>("loading")

  // Personal info form state
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [errors, setErrors] = React.useState<{ firstName?: string; lastName?: string }>({})

  // About form state
  const [bio, setBio] = React.useState("")

  // Dirty checks — compare against original mock values
  const infoIsDirty =
    firstName !== MOCK_PROFILE.firstName || lastName !== MOCK_PROFILE.lastName
  const bioIsDirty = bio !== MOCK_PROFILE.bio

  // Simulate initial data fetch
  React.useEffect(() => {
    const t = setTimeout(() => {
      setFirstName(MOCK_PROFILE.firstName)
      setLastName(MOCK_PROFILE.lastName)
      setBio(MOCK_PROFILE.bio)
      setStatus("idle")
    }, 600)
    return () => clearTimeout(t)
  }, [])

  function validateInfo() {
    const e: typeof errors = {}
    if (!firstName.trim()) e.firstName = "First name is required"
    if (!lastName.trim()) e.lastName = "Last name is required"
    return e
  }

  async function handleSaveInfo() {
    const e = validateInfo()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }
    setErrors({})
    setStatus("saving-info")
    await new Promise(r => setTimeout(r, 1000))
    setStatus("idle")
    toast.success("Profile updated")
  }

  async function handleSaveBio() {
    setStatus("saving-bio")
    await new Promise(r => setTimeout(r, 800))
    setStatus("idle")
    toast.success("Bio updated")
  }

  function handleRetry() {
    setStatus("loading")
    setTimeout(() => {
      setFirstName(MOCK_PROFILE.firstName)
      setLastName(MOCK_PROFILE.lastName)
      setBio(MOCK_PROFILE.bio)
      setStatus("idle")
    }, 600)
  }

  // ---------------------------------------------------------------------------
  // Loading skeleton
  // ---------------------------------------------------------------------------
  if (status === "loading") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <Skeleton className="h-7 w-20 mb-1.5" />
          <Skeleton className="h-4 w-52" />
        </div>
        <div className="rounded-xl border divide-y">
          {/* Avatar row */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-3 w-28" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
          </div>
          {/* Name fields */}
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col gap-1.5 px-5 py-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
          ))}
        </div>
        {/* Bio skeleton */}
        <div className="rounded-xl border divide-y">
          <div className="px-5 py-4 border-b">
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex flex-col gap-1.5 px-5 py-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Error state (e.g. network failure on load)
  // ---------------------------------------------------------------------------
  if (status === "error") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your personal information</p>
        </div>
        <Alert variant="destructive">
          <RiAlertLine className="size-4" />
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>Failed to load your profile. Please try again.</span>
            <Button variant="outline" size="sm" onClick={handleRetry}>
              <RiRefreshLine />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Populated / saving state
  // ---------------------------------------------------------------------------
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage how you appear to your team members.
        </p>
      </div>

      {/* Personal information */}
      <SettingsSection
        title="Personal information"
        description="Your display name and email address."
        onSave={handleSaveInfo}
        isSaving={status === "saving-info"}
        isDirty={infoIsDirty}
      >
        {/* Avatar */}
        <SettingsRow label="Avatar" description="Shown across the platform">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage
                src="https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Ikedi"
                alt="Ikedi Eze"
              />
              <AvatarFallback>IE</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              <RiUploadLine />
              Replace
            </Button>
          </div>
        </SettingsRow>

        {/* First name */}
        <SettingsRow label="First name" htmlFor="first-name" layout="col">
          <Input
            id="first-name"
            value={firstName}
            onChange={e => {
              setFirstName(e.target.value)
              setErrors(v => ({ ...v, firstName: undefined }))
            }}
            disabled={status === "saving-info"}
            className={errors.firstName ? "border-destructive" : ""}
            autoComplete="given-name"
          />
          {errors.firstName && (
            <p className="text-xs text-destructive">{errors.firstName}</p>
          )}
        </SettingsRow>

        {/* Last name */}
        <SettingsRow label="Last name" htmlFor="last-name" layout="col">
          <Input
            id="last-name"
            value={lastName}
            onChange={e => {
              setLastName(e.target.value)
              setErrors(v => ({ ...v, lastName: undefined }))
            }}
            disabled={status === "saving-info"}
            className={errors.lastName ? "border-destructive" : ""}
            autoComplete="family-name"
          />
          {errors.lastName && (
            <p className="text-xs text-destructive">{errors.lastName}</p>
          )}
        </SettingsRow>

        {/* Email — read-only, contact support to change */}
        <SettingsRow
          label="Email address"
          htmlFor="email"
          description="Contact support to change your email."
          layout="col"
        >
          <div className="opacity-50">
            <Input
              id="email"
              value={MOCK_PROFILE.email}
              readOnly
              disabled
              autoComplete="email"
            />
          </div>
        </SettingsRow>
      </SettingsSection>

      {/* About */}
      <SettingsSection
        title="About"
        description="A short bio visible to your team."
        onSave={handleSaveBio}
        isSaving={status === "saving-bio"}
        isDirty={bioIsDirty}
      >
        <SettingsRow label="Bio" htmlFor="bio" layout="col">
          <Textarea
            id="bio"
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder="Tell your team a bit about yourself…"
            rows={3}
            disabled={status === "saving-bio"}
            maxLength={160}
          />
          <p className="text-xs text-muted-foreground">{bio.length} / 160 characters</p>
        </SettingsRow>
      </SettingsSection>
    </div>
  )
}
