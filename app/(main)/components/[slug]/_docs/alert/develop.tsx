"use client"

import { useState } from "react"
import {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertActions,
  AlertClose,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Alert develop doc ──────────────────────────────────────────────────────────

function DismissibleExample() {
  const [visible, setVisible] = useState(true)

  return (
    <div className="flex flex-col gap-3 w-full">
      {visible ? (
        <Alert variant="warning" level="section" onClose={() => setVisible(false)}>
          <AlertIcon />
          <AlertContent>
            <AlertTitle>Your subscription renews in 3 days</AlertTitle>
            <AlertDescription>
              We'll charge ₦45,000 to your card ending in 1234 on 29 March 2026.
            </AlertDescription>
          </AlertContent>
          <AlertClose />
        </Alert>
      ) : (
        <div className="flex justify-center">
          <Button variant="outline" size="sm" onClick={() => setVisible(true)}>
            Show alert
          </Button>
        </div>
      )}
    </div>
  )
}

function InlineFormExample() {
  return (
    <div className="flex flex-col gap-1.5 w-full max-w-sm">
      <Label htmlFor="account-number">Bank account number</Label>
      <Input
        id="account-number"
        aria-invalid
        defaultValue="0123456789"
        readOnly
      />
      <Alert variant="error" level="inline">
        <AlertIcon />
        <AlertContent>
          <AlertDescription>
            Account number not found. Check the digits and try again.
          </AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  )
}

export const alertDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/alert",
    importPath: `import { Alert, AlertIcon, AlertContent, AlertTitle, AlertDescription, AlertActions, AlertClose } from "@/components/ui/alert"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "No extra dependencies — icons are bundled with the component via @remixicon/react.",
    ],
  },

  basicUsage: `import { Alert, AlertIcon, AlertContent, AlertTitle } from "@/components/ui/alert"

// Minimal — info alert with title only
<Alert variant="info">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Your workspace has been updated.</AlertTitle>
  </AlertContent>
</Alert>

// Fuller — with description and dismiss
<Alert variant="warning" onClose={() => setVisible(false)}>
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Payment method expiring</AlertTitle>
    <AlertDescription>
      Your card ending in 4242 expires in 7 days. Update it to avoid interruptions.
    </AlertDescription>
  </AlertContent>
  <AlertClose />
</Alert>`,

  codeExamples: [
    {
      title: "All variants",
      description: "Four semantic variants — choose by meaning, not colour.",
      preview: (
        <div className="flex flex-col gap-3 w-full">
          <Alert variant="info" level="section">
            <AlertIcon />
            <AlertContent>
              <AlertTitle>New feature available</AlertTitle>
              <AlertDescription>
                Bulk invoice export is now live on all Pro plans.
              </AlertDescription>
            </AlertContent>
          </Alert>
          <Alert variant="success" level="section">
            <AlertIcon />
            <AlertContent>
              <AlertTitle>Payment received</AlertTitle>
              <AlertDescription>
                ₦120,000 from Okonkwo Enterprises has been confirmed.
              </AlertDescription>
            </AlertContent>
          </Alert>
          <Alert variant="warning" level="section">
            <AlertIcon />
            <AlertContent>
              <AlertTitle>Subscription renews soon</AlertTitle>
              <AlertDescription>
                Your plan renews on 1 April 2026. Update your billing info to avoid interruption.
              </AlertDescription>
            </AlertContent>
          </Alert>
          <Alert variant="error" level="section">
            <AlertIcon />
            <AlertContent>
              <AlertTitle>Transfer failed</AlertTitle>
              <AlertDescription>
                We couldn't process your transfer to GTBank. Please try again.
              </AlertDescription>
            </AlertContent>
          </Alert>
        </div>
      ),
      code: `<Alert variant="info">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>New feature available</AlertTitle>
    <AlertDescription>Bulk invoice export is now live on all Pro plans.</AlertDescription>
  </AlertContent>
</Alert>

<Alert variant="success">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Payment received</AlertTitle>
    <AlertDescription>₦120,000 from Okonkwo Enterprises has been confirmed.</AlertDescription>
  </AlertContent>
</Alert>

<Alert variant="warning">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Subscription renews soon</AlertTitle>
    <AlertDescription>Your plan renews on 1 April 2026.</AlertDescription>
  </AlertContent>
</Alert>

<Alert variant="error">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Transfer failed</AlertTitle>
    <AlertDescription>We couldn't process your transfer to GTBank.</AlertDescription>
  </AlertContent>
</Alert>`,
    },
    {
      title: "Levels",
      description:
        "Use page for full-width banners at the top of a layout, section (default) for in-page blocks, and inline for tight spaces like form fields.",
      preview: (
        <div className="flex flex-col gap-3 w-full">
          <Alert variant="warning" level="page">
            <AlertIcon />
            <AlertContent>
              <AlertTitle>Scheduled maintenance on 30 March</AlertTitle>
              <AlertDescription>
                The platform will be unavailable from 02:00–04:00 WAT.
              </AlertDescription>
            </AlertContent>
          </Alert>
          <Alert variant="info" level="section">
            <AlertIcon />
            <AlertContent>
              <AlertTitle>Team workspace created</AlertTitle>
              <AlertDescription>
                Invite your teammates to get started.
              </AlertDescription>
            </AlertContent>
          </Alert>
          <Alert variant="error" level="inline">
            <AlertIcon />
            <AlertContent>
              <AlertDescription>Email address is already in use.</AlertDescription>
            </AlertContent>
          </Alert>
        </div>
      ),
      code: `{/* Page — full-width banner */}
<Alert variant="warning" level="page">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Scheduled maintenance on 30 March</AlertTitle>
    <AlertDescription>The platform will be unavailable from 02:00–04:00 WAT.</AlertDescription>
  </AlertContent>
</Alert>

{/* Section — default, in-page block */}
<Alert variant="info" level="section">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Team workspace created</AlertTitle>
    <AlertDescription>Invite your teammates to get started.</AlertDescription>
  </AlertContent>
</Alert>

{/* Inline — tight context, e.g. below a form field */}
<Alert variant="error" level="inline">
  <AlertIcon />
  <AlertContent>
    <AlertDescription>Email address is already in use.</AlertDescription>
  </AlertContent>
</Alert>`,
    },
    {
      title: "With actions",
      description: "Use AlertActions to place text-style links below the description.",
      preview: (
        <div className="w-full">
          <Alert variant="info" level="section">
            <AlertIcon />
            <AlertContent>
              <AlertTitle>You've been added to Adaeze's workspace</AlertTitle>
              <AlertDescription>
                You can now access shared contacts, pipelines, and reports.
              </AlertDescription>
              <AlertActions>
                <Button variant="link" size="sm" className="h-auto p-0">
                  View workspace
                </Button>
                <Button variant="link" size="sm" className="h-auto p-0 text-muted-foreground">
                  Dismiss
                </Button>
              </AlertActions>
            </AlertContent>
          </Alert>
        </div>
      ),
      code: `<Alert variant="info">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>You've been added to Adaeze's workspace</AlertTitle>
    <AlertDescription>
      You can now access shared contacts, pipelines, and reports.
    </AlertDescription>
    <AlertActions>
      <Button variant="link" size="sm" className="h-auto p-0">
        View workspace
      </Button>
      <Button variant="link" size="sm" className="h-auto p-0 text-muted-foreground">
        Dismiss
      </Button>
    </AlertActions>
  </AlertContent>
</Alert>`,
    },
    {
      title: "Dismissible",
      description:
        "Pass onClose to Alert — this activates AlertClose. Manage visibility with useState.",
      preview: <DismissibleExample />,
      code: `function DismissibleAlert() {
  const [visible, setVisible] = useState(true)

  return visible ? (
    <Alert variant="warning" onClose={() => setVisible(false)}>
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Your subscription renews in 3 days</AlertTitle>
        <AlertDescription>
          We'll charge ₦45,000 to your card ending in 1234 on 29 March 2026.
        </AlertDescription>
      </AlertContent>
      <AlertClose />
    </Alert>
  ) : (
    <Button variant="outline" size="sm" onClick={() => setVisible(true)}>
      Show alert
    </Button>
  )
}`,
    },
    {
      title: "Without icon",
      description:
        "Omit AlertIcon when the variant colour and title together provide enough context.",
      preview: (
        <div className="w-full">
          <Alert variant="success" level="section">
            <AlertContent>
              <AlertTitle>Profile saved</AlertTitle>
              <AlertDescription>
                Your changes are live. Teammates can see your updated profile immediately.
              </AlertDescription>
            </AlertContent>
          </Alert>
        </div>
      ),
      code: `<Alert variant="success">
  <AlertContent>
    <AlertTitle>Profile saved</AlertTitle>
    <AlertDescription>
      Your changes are live. Teammates can see your updated profile immediately.
    </AlertDescription>
  </AlertContent>
</Alert>`,
    },
    {
      title: "Inline in a form",
      description:
        "Pair level=\"inline\" with an error variant to surface field-level validation messages directly below an input.",
      preview: <InlineFormExample />,
      code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="account-number">Bank account number</Label>
  <Input id="account-number" aria-invalid />
  <Alert variant="error" level="inline">
    <AlertIcon />
    <AlertContent>
      <AlertDescription>
        Account number not found. Check the digits and try again.
      </AlertDescription>
    </AlertContent>
  </Alert>
</div>`,
    },
  ],

  apiReference: [
    {
      name: "variant",
      values: `"info" | "success" | "warning" | "error"`,
      default: `"info"`,
      description: "Semantic colour tone. Choose by meaning — never override with a custom colour.",
    },
    {
      name: "level",
      values: `"page" | "section" | "inline"`,
      default: `"section"`,
      description:
        "Layout scale. page for full-width banners, section for in-page blocks, inline for tight contexts like form fields.",
    },
    {
      name: "onClose",
      values: "() => void",
      default: "—",
      description: "Provide to enable the dismiss button. Manage visibility in state.",
    },
    {
      name: "role",
      values: "string",
      default: `"alert"`,
      description: "ARIA role. Use \"status\" for non-urgent updates that should not interrupt screen reader flow.",
    },
    {
      name: "className",
      values: "string",
      default: "—",
      description: "Extra CSS classes on the Alert root. Avoid overriding colour tokens.",
    },
    {
      name: "children",
      values: "React.ReactNode",
      default: "—",
      description: "Compose with AlertIcon, AlertContent, and AlertClose.",
    },
    {
      name: "AlertIcon — children",
      values: "React.ReactNode",
      default: "—",
      description: "Override the auto-matched variant icon with a custom icon element.",
    },
    {
      name: "AlertTitle",
      values: "React.ReactNode",
      default: "—",
      description: "Semibold heading (text-sm font-semibold). Must convey the meaning independently of colour.",
    },
    {
      name: "AlertDescription",
      values: "React.ReactNode",
      default: "—",
      description: "Body copy (text-sm opacity-90). Optional — omit for single-line alerts.",
    },
    {
      name: "AlertActions",
      values: "React.ReactNode",
      default: "—",
      description: "Row of action links rendered below AlertDescription. Use Button variant=\"link\" size=\"sm\".",
    },
    {
      name: "AlertClose",
      values: "—",
      default: "—",
      description: "X dismiss button. Only renders when onClose is passed to the Alert root.",
    },
  ],

  accessibility: [
    {
      rule: "role=\"alert\" vs role=\"status\"",
      detail:
        "role=\"alert\" (the default) announces immediately and interrupts the screen reader. Use role=\"status\" for non-urgent updates like autosave confirmations.",
    },
    {
      rule: "AlertIcon is decorative",
      detail:
        "AlertIcon is aria-hidden. Colour and icon shape are supplementary cues — the title must convey the meaning on its own.",
    },
    {
      rule: "AlertClose is keyboard-accessible",
      detail:
        "AlertClose receives a visible focus-visible ring and is reachable via Tab. Label it with aria-label=\"Dismiss\" if the icon alone is the only content.",
    },
    {
      rule: "Meaningful action link text",
      detail:
        "AlertActions links must have descriptive text (\"View billing settings\", not \"Click here\"). Screen readers announce link text out of context.",
    },
    {
      rule: "Don't rely on colour alone",
      detail:
        "The AlertTitle must state the intent. A user who cannot perceive colour must still understand the severity from the text.",
    },
  ],
}
