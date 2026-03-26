"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  RiDeleteBinLine,
  RiUserUnfollowLine,
  RiLogoutBoxLine,
} from "@remixicon/react"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── AlertDialog develop doc ────────────────────────────────────────────────────

// Preview: Delete confirmation
function DeleteConfirmationPreview() {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <RiDeleteBinLine className="size-7 text-[var(--color-icon-critical)]" />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete contact?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete Jordan Mills and all associated data.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete contact</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// Preview: Revoke access
function RevokeAccessPreview() {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <RiUserUnfollowLine className="size-7 text-[var(--color-icon-critical)]" />
          </AlertDialogMedia>
          <AlertDialogTitle>Revoke access?</AlertDialogTitle>
          <AlertDialogDescription>
            Sarah Chen will immediately lose access to this workspace and all
            shared resources. You can reinvite them at any time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Revoke access</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// Preview: Without media icon
function WithoutMediaPreview() {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove from pipeline?</AlertDialogTitle>
          <AlertDialogDescription>
            Acme Corp will be removed from the Q3 pipeline. Any attached notes
            and tasks will remain in your activity log.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// Preview: Small size
function SmallSizePreview() {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <RiLogoutBoxLine className="size-7 text-[var(--color-icon-neutral)]" />
          </AlertDialogMedia>
          <AlertDialogTitle>Sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be signed out of your current session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
          <AlertDialogAction>Sign out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// Preview: Loading state
function LoadingStatePreview() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleConfirm() {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={(next) => { if (!isLoading) setOpen(next) }}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <RiDeleteBinLine className="size-7 text-[var(--color-icon-critical)]" />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete workspace?</AlertDialogTitle>
          <AlertDialogDescription>
            All projects, members, and data inside Raana Labs will be
            permanently deleted. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            loading={isLoading}
            onClick={(e) => {
              e.preventDefault()
              handleConfirm()
            }}
          >
            Delete workspace
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const alertDialogDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
      "npx shadcn add @raana/button",
    ],
    command: "npx shadcn add @raana/alert-dialog",
    importPath: `import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogMedia, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "Icon support uses @remixicon/react — install it if not already in your project: npm install @remixicon/react",
    ],
  },

  basicUsage: `import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogMedia, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { RiDeleteBinLine } from "@remixicon/react"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Delete contact</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogMedia>
        <RiDeleteBinLine className="size-7 text-[var(--color-icon-critical)]" />
      </AlertDialogMedia>
      <AlertDialogTitle>Delete contact?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete Jordan Mills and all associated data.
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction variant="destructive">Delete contact</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,

  codeExamples: [
    {
      title: "Delete confirmation",
      description:
        "Default size with a destructive media icon. Use variant=\"destructive\" on AlertDialogAction to signal an irreversible operation.",
      preview: <DeleteConfirmationPreview />,
      code: `import { useState } from "react"
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogMedia, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { RiDeleteBinLine } from "@remixicon/react"

export function DeleteConfirmation() {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete contact</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <RiDeleteBinLine className="size-7 text-[var(--color-icon-critical)]" />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete contact?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete Jordan Mills and all associated data.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete contact</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`,
    },
    {
      title: "Revoke access",
      description:
        "Membership removal pattern. The icon reinforces the action type without relying on colour alone.",
      preview: <RevokeAccessPreview />,
      code: `import { useState } from "react"
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogMedia, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { RiUserUnfollowLine } from "@remixicon/react"

export function RevokeAccess() {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Revoke access</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <RiUserUnfollowLine className="size-7 text-[var(--color-icon-critical)]" />
          </AlertDialogMedia>
          <AlertDialogTitle>Revoke access?</AlertDialogTitle>
          <AlertDialogDescription>
            Sarah Chen will immediately lose access to this workspace and all
            shared resources. You can reinvite them at any time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Revoke access</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`,
    },
    {
      title: "Without media icon",
      description:
        "Omit AlertDialogMedia for lower-stakes confirmations where a visual icon would over-emphasise the action.",
      preview: <WithoutMediaPreview />,
      code: `import { useState } from "react"
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function WithoutMedia() {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Remove from pipeline</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove from pipeline?</AlertDialogTitle>
          <AlertDialogDescription>
            Acme Corp will be removed from the Q3 pipeline. Any attached notes
            and tasks will remain in your activity log.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`,
    },
    {
      title: "Small size",
      description:
        "Use size=\"sm\" for low-stakes confirmations like sign out. The footer renders as a 2-column row at all breakpoints.",
      preview: <SmallSizePreview />,
      code: `import { useState } from "react"
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogMedia, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { RiLogoutBoxLine } from "@remixicon/react"

export function SmallSignOut() {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Sign out</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <RiLogoutBoxLine className="size-7 text-[var(--color-icon-neutral)]" />
          </AlertDialogMedia>
          <AlertDialogTitle>Sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be signed out of your current session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
          <AlertDialogAction>Sign out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`,
    },
    {
      title: "Loading state",
      description:
        "Use controlled mode with loading={isLoading} on AlertDialogAction and disabled={isLoading} on AlertDialogCancel to prevent race conditions during async operations.",
      preview: <LoadingStatePreview />,
      code: `import { useState } from "react"
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogMedia, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { RiDeleteBinLine } from "@remixicon/react"

export function LoadingDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleConfirm() {
    setIsLoading(true)
    await deleteWorkspace() // your async mutation
    setIsLoading(false)
    setOpen(false)
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => { if (!isLoading) setOpen(next) }}
    >
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete workspace</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <RiDeleteBinLine className="size-7 text-[var(--color-icon-critical)]" />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete workspace?</AlertDialogTitle>
          <AlertDialogDescription>
            All projects, members, and data inside Raana Labs will be
            permanently deleted. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            loading={isLoading}
            onClick={(e) => {
              e.preventDefault()
              handleConfirm()
            }}
          >
            Delete workspace
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`,
    },
  ],

  apiReference: [
    // AlertDialog
    {
      name: "AlertDialog · open",
      values: "boolean",
      default: "—",
      description:
        "Controlled open state. Pair with onOpenChange for full control.",
    },
    {
      name: "AlertDialog · onOpenChange",
      values: "(open: boolean) => void",
      default: "—",
      description:
        "Called when the dialog requests an open/close state change. Required when using controlled mode.",
    },
    // AlertDialogContent
    {
      name: "AlertDialogContent · size",
      values: `"default" | "sm"`,
      default: `"default"`,
      description:
        "default = max-w-md stacked footer. sm = max-w-xs with a 2-column row footer — use for short, low-stakes confirmations.",
    },
    {
      name: "AlertDialogContent · className",
      values: "string",
      default: "—",
      description: "Extra CSS classes applied to the dialog panel.",
    },
    // AlertDialogAction
    {
      name: "AlertDialogAction · variant",
      values: `"default" | "destructive" | "outline" | "ghost" | "link"`,
      default: `"default"`,
      description:
        "Inherits all Button variants. Use variant=\"destructive\" for delete or revoke actions.",
    },
    {
      name: "AlertDialogAction · size",
      values: `"default" | "sm" | "lg" | "icon"`,
      default: `"default"`,
      description: "Inherits all Button size values.",
    },
    {
      name: "AlertDialogAction · loading",
      values: "boolean",
      default: "false",
      description:
        "Shows a spinner and disables the button. Use during async mutations.",
    },
    {
      name: "AlertDialogAction · disabled",
      values: "boolean",
      default: "false",
      description: "Disables the action button.",
    },
    // AlertDialogCancel
    {
      name: "AlertDialogCancel · variant",
      values: `"default" | "destructive" | "outline" | "ghost" | "link"`,
      default: `"outline"`,
      description:
        "Button variant for the cancel button. Defaults to outline. Auto-closes the dialog when clicked.",
    },
    {
      name: "AlertDialogCancel · size",
      values: `"default" | "sm" | "lg" | "icon"`,
      default: `"default"`,
      description: "Inherits all Button size values.",
    },
    {
      name: "AlertDialogCancel · disabled",
      values: "boolean",
      default: "false",
      description:
        "Disable alongside AlertDialogAction during loading to prevent race conditions.",
    },
    // Layout components
    {
      name: "AlertDialogHeader · className",
      values: "string",
      default: "—",
      description:
        "Extra classes on the header wrapper (contains Media, Title, Description).",
    },
    {
      name: "AlertDialogMedia · children",
      values: "React.ReactNode",
      default: "—",
      description:
        "Icon placed inside the 64px circle container. Optional — omit the entire component if no icon is needed.",
    },
    {
      name: "AlertDialogTitle · children",
      values: "React.ReactNode",
      default: "—",
      description:
        "Dialog heading rendered as text-lg font-medium. Required for accessibility (aria-labelledby).",
    },
    {
      name: "AlertDialogDescription · children",
      values: "React.ReactNode",
      default: "—",
      description:
        "Body text below the title. Required for accessibility (aria-describedby).",
    },
    {
      name: "AlertDialogFooter · className",
      values: "string",
      default: "—",
      description:
        "Extra classes on the footer action row.",
    },
  ],

  accessibility: [
    {
      rule: "AlertDialogTitle is required",
      detail:
        "The title maps to aria-labelledby on the dialog element. Omitting it breaks screen reader announcement of the dialog's purpose.",
    },
    {
      rule: "AlertDialogDescription is required",
      detail:
        "The description maps to aria-describedby. Always explain the consequence of the action in plain language.",
    },
    {
      rule: "No click-outside-to-close",
      detail:
        "AlertDialog intentionally blocks outside clicks. Users must make an explicit choice — this is by design for destructive operations.",
    },
    {
      rule: "Focus is trapped inside the dialog",
      detail:
        "Tab and Shift+Tab cycle only between focusable elements inside the dialog until it is dismissed.",
    },
    {
      rule: "Escape key fires cancel behaviour",
      detail:
        "Pressing Escape triggers the same outcome as clicking AlertDialogCancel. Guard this with onOpenChange when in loading state.",
    },
    {
      rule: "Disable Cancel during loading",
      detail:
        "Set disabled={isLoading} on AlertDialogCancel whenever AlertDialogAction is loading. This prevents users from closing the dialog mid-mutation.",
    },
    {
      rule: "Never skip the confirmation step",
      detail:
        "Do not wire a mutation directly to a trigger button. Always show the AlertDialog first so users have a chance to back out.",
    },
  ],
}
