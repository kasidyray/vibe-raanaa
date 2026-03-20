"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  RiAlertLine,
  RiRefreshLine,
  RiKeyLine,
  RiEyeLine,
  RiEyeOffLine,
  RiFileCopyLine,
  RiAddLine,
  RiDeleteBinLine,
} from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { SettingsSection, SettingsRow } from "@/components/settings/settings-section"

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
const MOCK_API_KEYS = [
  {
    id: "key_001",
    name: "Production",
    prefix: "rxi_live_",
    suffix: "k7mQpXnW",
    masked: "rxi_live_••••••••••••••••••••••k7mQpXnW",
    createdAt: "Jan 5, 2026",
    lastUsed: "2 hours ago",
  },
  {
    id: "key_002",
    name: "Development",
    prefix: "rxi_test_",
    suffix: "j2vRqBsT",
    masked: "rxi_test_••••••••••••••••••••••j2vRqBsT",
    createdAt: "Feb 1, 2026",
    lastUsed: "5 minutes ago",
  },
]

type PageStatus = "loading" | "idle" | "error"

export default function AdvancedPage() {
  const [status, setStatus] = React.useState<PageStatus>("loading")
  const [apiKeys, setApiKeys] = React.useState(MOCK_API_KEYS)
  const [revealedKeys, setRevealedKeys] = React.useState<Record<string, boolean>>({})
  const [deletingKey, setDeletingKey] = React.useState<string | null>(null)
  const [isDeletingWorkspace, setIsDeletingWorkspace] = React.useState(false)

  React.useEffect(() => {
    const t = setTimeout(() => {
      setApiKeys(MOCK_API_KEYS)
      setStatus("idle")
    }, 600)
    return () => clearTimeout(t)
  }, [])

  function handleRetry() {
    setStatus("loading")
    setTimeout(() => {
      setApiKeys(MOCK_API_KEYS)
      setStatus("idle")
    }, 600)
  }

  function copyKey(masked: string, name: string) {
    // In a real app, copy the actual key (never store it after creation)
    navigator.clipboard.writeText(masked).catch(() => {})
    toast.success(`${name} key copied to clipboard`)
  }

  async function deleteKey(id: string, name: string) {
    setDeletingKey(id)
    await new Promise(r => setTimeout(r, 900))
    setApiKeys(prev => prev.filter(k => k.id !== id))
    setDeletingKey(null)
    toast.success(`${name} key deleted`)
  }

  async function handleDeleteWorkspace() {
    setIsDeletingWorkspace(true)
    await new Promise(r => setTimeout(r, 1500))
    setIsDeletingWorkspace(false)
    toast.error("Workspace deletion is disabled in this demo")
  }

  // ---------------------------------------------------------------------------
  // Loading skeleton
  // ---------------------------------------------------------------------------
  if (status === "loading") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <Skeleton className="h-7 w-24 mb-1.5" />
          <Skeleton className="h-4 w-60" />
        </div>
        <div className="rounded-xl border divide-y">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
          {[1, 2].map(i => (
            <div key={i} className="flex items-center justify-between px-5 py-4">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-56" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          ))}
        </div>
        {/* Danger zone skeleton */}
        <div className="rounded-xl border divide-y">
          <div className="px-5 py-4 border-b">
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-52" />
            </div>
            <Skeleton className="h-8 w-28 rounded-md" />
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
          <h1 className="text-2xl font-semibold tracking-tight">Advanced</h1>
          <p className="text-sm text-muted-foreground mt-1">API keys and workspace management</p>
        </div>
        <Alert variant="destructive">
          <RiAlertLine className="size-4" />
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>Failed to load advanced settings. Please try again.</span>
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
  // Populated state
  // ---------------------------------------------------------------------------
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Advanced</h1>
        <p className="text-sm text-muted-foreground mt-1">
          API keys and workspace management.
        </p>
      </div>

      {/* API keys */}
      <SettingsSection
        title="API keys"
        description="Use these keys to authenticate API requests from your applications."
        footer={
          <div className="flex items-center justify-between gap-4 w-full">
            <p className="text-xs text-muted-foreground">
              Keys are only shown in full once, at creation.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.info("API key creation coming soon")}
            >
              <RiAddLine />
              Create key
            </Button>
          </div>
        }
      >
        {apiKeys.length === 0 ? (
          <div className="px-5 py-6 text-center">
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground mx-auto mb-3">
              <RiKeyLine className="size-4" />
            </div>
            <p className="text-sm font-medium mb-1">No API keys</p>
            <p className="text-xs text-muted-foreground mb-3">
              Create a key to start making API requests.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.info("API key creation coming soon")}
            >
              <RiAddLine />
              Create key
            </Button>
          </div>
        ) : (
          apiKeys.map(key => {
            const isRevealed = !!revealedKeys[key.id]
            const isDeleting = deletingKey === key.id

            return (
              <div
                key={key.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium">{key.name}</p>
                    <Badge variant="neutral" size="sm">API key</Badge>
                  </div>
                  {/* Masked / revealed key value */}
                  <p className="text-xs font-mono text-muted-foreground truncate">
                    {isRevealed
                      ? `${key.prefix}${"x".repeat(22)}${key.suffix}`
                      : key.masked}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Created {key.createdAt} · Last used {key.lastUsed}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {/* Reveal / hide */}
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={isRevealed ? "Hide key" : "Reveal key"}
                    onClick={() =>
                      setRevealedKeys(prev => ({ ...prev, [key.id]: !isRevealed }))
                    }
                  >
                    {isRevealed ? <RiEyeOffLine /> : <RiEyeLine />}
                  </Button>

                  {/* Copy */}
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Copy key"
                    onClick={() => copyKey(key.masked, key.name)}
                  >
                    <RiFileCopyLine />
                  </Button>

                  {/* Delete */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Delete ${key.name} key`}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <RiDeleteBinLine />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete API key?</AlertDialogTitle>
                        <AlertDialogDescription>
                          The <strong>{key.name}</strong> key will be permanently deleted.
                          Any applications using it will stop working immediately.
                          This cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteKey(key.id, key.name)}
                          disabled={isDeleting}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {isDeleting ? "Deleting…" : "Delete key"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )
          })
        )}
      </SettingsSection>

      {/* Danger zone */}
      <SettingsSection
        title="Danger zone"
        description="Irreversible actions that affect your entire workspace."
        className="border-destructive/30"
      >
        <SettingsRow
          label="Delete workspace"
          description="Permanently delete this workspace, all projects, and all data. This cannot be undone."
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <RiDeleteBinLine />
                Delete workspace
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete workspace?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your workspace, all projects, all data, and
                  remove all members. This action <strong>cannot be undone</strong>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteWorkspace}
                  disabled={isDeletingWorkspace}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeletingWorkspace ? "Deleting…" : "Yes, delete workspace"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SettingsRow>
      </SettingsSection>
    </div>
  )
}
