"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  RiAlertLine,
  RiRefreshLine,
  RiPlugLine,
  RiCheckLine,
  RiAddLine,
} from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { SettingsSection } from "@/components/settings/settings-section"

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
type Integration = {
  id: string
  name: string
  description: string
  category: string
  logoSeed: string
  logoColor: string
  connected: boolean
  connectedAt?: string
  permissions?: string[]
}

const MOCK_INTEGRATIONS: Integration[] = [
  {
    id: "slack",
    name: "Slack",
    description: "Send notifications and activity updates directly to Slack channels.",
    category: "Communication",
    logoSeed: "Slack",
    logoColor: "4A154B",
    connected: true,
    connectedAt: "Feb 12, 2026",
    permissions: ["Send messages", "Read channel list"],
  },
  {
    id: "github",
    name: "GitHub",
    description: "Link pull requests, issues, and commits to your projects.",
    category: "Development",
    logoSeed: "GitHub",
    logoColor: "1B1F23",
    connected: true,
    connectedAt: "Jan 5, 2026",
    permissions: ["Read repositories", "Write webhooks"],
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Sync deadlines and milestones with your Google Calendar.",
    category: "Productivity",
    logoSeed: "Google",
    logoColor: "4285F4",
    connected: false,
  },
  {
    id: "jira",
    name: "Jira",
    description: "Import and sync issues between Jira and your workspace.",
    category: "Project management",
    logoSeed: "Jira",
    logoColor: "0052CC",
    connected: false,
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect to 5,000+ apps with no-code automations.",
    category: "Automation",
    logoSeed: "Zapier",
    logoColor: "FF4A00",
    connected: false,
  },
]

type PageStatus = "loading" | "idle" | "error"
type ActionState = Record<string, "connecting" | "disconnecting" | undefined>

export default function IntegrationsPage() {
  const [status, setStatus] = React.useState<PageStatus>("loading")
  const [integrations, setIntegrations] = React.useState<Integration[]>([])
  const [actionState, setActionState] = React.useState<ActionState>({})

  React.useEffect(() => {
    const t = setTimeout(() => {
      setIntegrations(MOCK_INTEGRATIONS)
      setStatus("idle")
    }, 600)
    return () => clearTimeout(t)
  }, [])

  function handleRetry() {
    setStatus("loading")
    setTimeout(() => {
      setIntegrations(MOCK_INTEGRATIONS)
      setStatus("idle")
    }, 600)
  }

  async function toggleIntegration(id: string, currentlyConnected: boolean) {
    const action = currentlyConnected ? "disconnecting" : "connecting"
    setActionState(s => ({ ...s, [id]: action }))
    await new Promise(r => setTimeout(r, 1100))
    setIntegrations(prev =>
      prev.map(i =>
        i.id === id
          ? { ...i, connected: !currentlyConnected, connectedAt: !currentlyConnected ? "Just now" : undefined }
          : i
      )
    )
    setActionState(s => ({ ...s, [id]: undefined }))
    const name = integrations.find(i => i.id === id)?.name ?? id
    toast.success(currentlyConnected ? `${name} disconnected` : `${name} connected`)
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
            <Skeleton className="h-4 w-32" />
          </div>
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-lg" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
              <Skeleton className="h-8 w-24 rounded-md" />
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
          <h1 className="text-2xl font-semibold tracking-tight">Integrations</h1>
          <p className="text-sm text-muted-foreground mt-1">Connect your favourite tools</p>
        </div>
        <Alert variant="error">
          <RiAlertLine className="size-4" />
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>Failed to load integrations. Please try again.</span>
            <Button variant="outline" size="sm" onClick={handleRetry}>
              <RiRefreshLine />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const connected    = integrations.filter(i => i.connected)
  const available    = integrations.filter(i => !i.connected)

  // ---------------------------------------------------------------------------
  // Populated state
  // ---------------------------------------------------------------------------
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Integrations</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Connect your favourite tools to your workspace.
        </p>
      </div>

      {/* Connected integrations */}
      <SettingsSection
        title="Connected"
        description={
          connected.length > 0
            ? `${connected.length} integration${connected.length !== 1 ? "s" : ""} active`
            : "No integrations connected yet"
        }
      >
        {connected.length === 0 ? (
          <Empty className="border-0 rounded-none">
            <EmptyHeader>
              <EmptyMedia variant="stacked"><RiPlugLine /></EmptyMedia>
              <EmptyTitle>Nothing connected yet</EmptyTitle>
              <EmptyDescription>
                Browse the available integrations below to get started.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          connected.map(integration => (
            <IntegrationRow
              key={integration.id}
              integration={integration}
              action={actionState[integration.id]}
              onToggle={() => toggleIntegration(integration.id, integration.connected)}
            />
          ))
        )}
      </SettingsSection>

      {/* Available integrations */}
      {available.length > 0 && (
        <SettingsSection
          title="Available"
          description="Browse and connect integrations for your workspace."
        >
          {available.map(integration => (
            <IntegrationRow
              key={integration.id}
              integration={integration}
              action={actionState[integration.id]}
              onToggle={() => toggleIntegration(integration.id, integration.connected)}
            />
          ))}
        </SettingsSection>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// IntegrationRow — single integration item (connected or available)
// ---------------------------------------------------------------------------
function IntegrationRow({
  integration,
  action,
  onToggle,
}: {
  integration: Integration
  action: ActionState[string]
  onToggle: () => void
}) {
  const isConnected   = integration.connected
  const isActing      = action !== undefined
  const actionLabel   = action === "connecting" ? "Connecting…" : action === "disconnecting" ? "Disconnecting…" : ""

  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div className="flex items-center gap-3 min-w-0">
        {/* Company logo avatar */}
        <img
          src={`https://api.dicebear.com/9.x/initials/svg?seed=${integration.logoSeed}&backgroundColor=${integration.logoColor}`}
          alt={integration.name}
          className="size-9 rounded-lg shrink-0"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{integration.name}</p>
            <Badge variant="neutral" size="sm">{integration.category}</Badge>
            {isConnected && <StatusBadge variant="success">Active</StatusBadge>}
          </div>
          <p className="text-xs text-muted-foreground truncate">{integration.description}</p>
          {isConnected && integration.connectedAt && (
            <p className="text-xs text-muted-foreground mt-0.5">
              Connected {integration.connectedAt}
            </p>
          )}
        </div>
      </div>

      <Button
        variant={isConnected ? "outline" : "outline"}
        size="sm"
        onClick={onToggle}
        loading={isActing}
        className="shrink-0"
      >
        {!isActing && (isConnected ? (
          <>Disconnect</>
        ) : (
          <><RiAddLine />Connect</>
        ))}
        {isActing && actionLabel}
      </Button>
    </div>
  )
}
