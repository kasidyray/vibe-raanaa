"use client"

import * as React from "react"
import { toast } from "sonner"
import { RiAlertLine, RiRefreshLine, RiMoonLine, RiSunLine, RiComputerLine } from "@remixicon/react"
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
const MOCK_PREFS = {
  language: "en",
  timezone: "Africa/Lagos",
  theme: "system",
}

const LANGUAGES = [
  { value: "en",    label: "English" },
  { value: "fr",    label: "French" },
  { value: "es",    label: "Spanish" },
  { value: "de",    label: "German" },
  { value: "pt",    label: "Portuguese" },
  { value: "yo",    label: "Yoruba" },
  { value: "ig",    label: "Igbo" },
  { value: "ha",    label: "Hausa" },
]

const TIMEZONES = [
  { value: "Africa/Lagos",      label: "Africa/Lagos (WAT, UTC+1)" },
  { value: "Africa/Nairobi",    label: "Africa/Nairobi (EAT, UTC+3)" },
  { value: "Africa/Accra",      label: "Africa/Accra (GMT, UTC+0)" },
  { value: "Europe/London",     label: "Europe/London (GMT/BST)" },
  { value: "Europe/Paris",      label: "Europe/Paris (CET, UTC+1)" },
  { value: "America/New_York",  label: "America/New_York (EST, UTC-5)" },
  { value: "America/Los_Angeles", label: "America/Los_Angeles (PST, UTC-8)" },
  { value: "Asia/Dubai",        label: "Asia/Dubai (GST, UTC+4)" },
]

const THEMES = [
  { value: "light",  label: "Light",  icon: RiSunLine },
  { value: "dark",   label: "Dark",   icon: RiMoonLine },
  { value: "system", label: "System", icon: RiComputerLine },
]

type PageStatus = "loading" | "idle" | "saving" | "error"

export default function PreferencesPage() {
  const [status, setStatus] = React.useState<PageStatus>("loading")
  const [language, setLanguage] = React.useState("")
  const [timezone, setTimezone] = React.useState("")
  const [theme, setTheme] = React.useState("")

  const isDirty =
    language !== MOCK_PREFS.language ||
    timezone !== MOCK_PREFS.timezone ||
    theme !== MOCK_PREFS.theme

  React.useEffect(() => {
    const t = setTimeout(() => {
      setLanguage(MOCK_PREFS.language)
      setTimezone(MOCK_PREFS.timezone)
      setTheme(MOCK_PREFS.theme)
      setStatus("idle")
    }, 600)
    return () => clearTimeout(t)
  }, [])

  async function handleSave() {
    setStatus("saving")
    await new Promise(r => setTimeout(r, 1000))
    setStatus("idle")
    toast.success("Preferences saved")
  }

  function handleRetry() {
    setStatus("loading")
    setTimeout(() => {
      setLanguage(MOCK_PREFS.language)
      setTimezone(MOCK_PREFS.timezone)
      setTheme(MOCK_PREFS.theme)
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
          <Skeleton className="h-7 w-28 mb-1.5" />
          <Skeleton className="h-4 w-56" />
        </div>
        <div className="rounded-xl border divide-y">
          <div className="px-5 py-4 border-b">
            <Skeleton className="h-4 w-20" />
          </div>
          {[1, 2].map(i => (
            <div key={i} className="flex items-center justify-between px-5 py-4">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-40" />
              </div>
              <Skeleton className="h-9 w-44 rounded-md" />
            </div>
          ))}
        </div>
        <div className="rounded-xl border divide-y">
          <div className="px-5 py-4 border-b">
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-3 w-36" />
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-8 w-20 rounded-md" />)}
            </div>
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
          <h1 className="text-2xl font-semibold tracking-tight">Preferences</h1>
          <p className="text-sm text-muted-foreground mt-1">Personalise your experience</p>
        </div>
        <Alert variant="error">
          <RiAlertLine className="size-4" />
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>Failed to load preferences. Please try again.</span>
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
        <h1 className="text-2xl font-semibold tracking-tight">Preferences</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Personalise your language, timezone, and appearance.
        </p>
      </div>

      {/* Localisation */}
      <SettingsSection
        title="Localisation"
        description="Controls how dates, times, and text are displayed."
        onSave={handleSave}
        isSaving={status === "saving"}
        isDirty={isDirty}
      >
        {/* Language */}
        <SettingsRow
          label="Language"
          description="The language used across the interface."
        >
          <Select
            value={language}
            onValueChange={setLanguage}
            disabled={status === "saving"}
          >
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map(({ value, label }) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SettingsRow>

        {/* Timezone */}
        <SettingsRow
          label="Timezone"
          description="Used for dates, deadlines, and notifications."
        >
          <Select
            value={timezone}
            onValueChange={setTimezone}
            disabled={status === "saving"}
          >
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONES.map(({ value, label }) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SettingsRow>
      </SettingsSection>

      {/* Appearance */}
      <SettingsSection
        title="Appearance"
        description="Choose how the interface looks on your device."
        onSave={handleSave}
        isSaving={status === "saving"}
        isDirty={theme !== MOCK_PREFS.theme}
      >
        <SettingsRow
          label="Theme"
          description="Light, dark, or follow your system setting."
        >
          {/* Segmented theme picker */}
          <div className="flex rounded-md border overflow-hidden">
            {THEMES.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTheme(value)}
                disabled={status === "saving"}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors border-r last:border-r-0 ${
                  theme === value
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="size-3.5" />
                {label}
              </button>
            ))}
          </div>
        </SettingsRow>
      </SettingsSection>
    </div>
  )
}
