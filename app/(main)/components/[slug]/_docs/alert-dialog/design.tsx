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
  RiLogoutBoxLine,
  RiUserUnfollowLine,
  RiAlertLine,
} from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ───────────────────────────────────────────────────────────
// Static mockup: anatomy labels require a frozen view of all parts at once.

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2 w-full max-w-sm mx-auto">
    <div className="w-full rounded-4xl border bg-card p-6 shadow-lg ring-1 ring-foreground/5">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left sm:gap-5">
          <div className="inline-flex size-16 shrink-0 items-center justify-center rounded-full bg-muted">
            <RiDeleteBinLine className="size-8 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-1 pt-1">
            <p className="text-lg font-medium">Delete this record?</p>
            <p className="text-sm text-muted-foreground text-balance">
              This will permanently remove the record and all associated data.
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button variant="destructive" size="sm">Delete record</Button>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap items-start justify-center gap-x-5 gap-y-2 text-center">
      {["① Overlay", "② Content", "③ Media", "④ Title", "⑤ Description", "⑥ Cancel", "⑦ Action"].map(label => (
        <div key={label} className="flex flex-col items-center gap-1">
          <div className="h-4 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

// ── Variant previews ──────────────────────────────────────────────────────────

const WithMediaPreview = () => {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open preview</Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <RiDeleteBinLine className="size-8 text-muted-foreground" />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Adaeze Okoye?</AlertDialogTitle>
          <AlertDialogDescription>
            This contact and all associated records will be permanently deleted. This action cannot be undone.
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

const WithoutMediaPreview = () => {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open preview</Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Emeka Nwachukwu?</AlertDialogTitle>
          <AlertDialogDescription>
            He will lose access to this workspace immediately. You can re-invite him at any time from Team settings.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Remove member</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const SmallSizePreview = () => {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open preview</Button>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <RiLogoutBoxLine className="size-8 text-muted-foreground" />
          </AlertDialogMedia>
          <AlertDialogTitle>Sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be signed out of your current session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="ghost">Stay</AlertDialogCancel>
          <AlertDialogAction>Sign out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// ── State previews ────────────────────────────────────────────────────────────

const DefaultStatePreview = () => {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open preview</Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <RiAlertLine className="size-8 text-muted-foreground" />
          </AlertDialogMedia>
          <AlertDialogTitle>Revoke API key?</AlertDialogTitle>
          <AlertDialogDescription>
            Any services using this key will immediately lose access. You will need to issue a new key.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Revoke key</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const LoadingStatePreview = () => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleConfirm() {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 2000))
    setIsLoading(false)
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={(next) => { if (!isLoading) setOpen(next) }}>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open preview</Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <RiDeleteBinLine className="size-8 text-muted-foreground" />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            All files, settings, and history for this project will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            loading={isLoading}
            onClick={(e) => { e.preventDefault(); handleConfirm() }}
          >
            Delete project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const DestructiveStatePreview = () => {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}><RiDeleteBinLine />Delete account</Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10">
            <RiDeleteBinLine className="size-8 text-destructive" />
          </AlertDialogMedia>
          <AlertDialogTitle>Permanently delete account?</AlertDialogTitle>
          <AlertDialogDescription>
            Your account, billing history, and all team data will be erased. This cannot be reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Yes, delete everything</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// ── Do previews ───────────────────────────────────────────────────────────────

const DoLabelPreview = () => {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Delete contact</Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Ngozi Achebe?</AlertDialogTitle>
          <AlertDialogDescription>
            Ngozi Achebe will be permanently removed from your contacts.
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

const DoMediaPreview = () => {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Sign out</Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <RiLogoutBoxLine className="size-8 text-muted-foreground" />
          </AlertDialogMedia>
          <AlertDialogTitle>Sign out of workspace?</AlertDialogTitle>
          <AlertDialogDescription>
            You will need to sign back in to access your data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Sign out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const DoSingleActionPreview = () => {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Revoke access</Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <RiUserUnfollowLine className="size-8 text-muted-foreground" />
          </AlertDialogMedia>
          <AlertDialogTitle>Revoke access for Emeka?</AlertDialogTitle>
          <AlertDialogDescription>
            He will be removed from the workspace immediately. You can re-invite him at any time.
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

// ── Don't previews — static mockups showing the anti-pattern ─────────────────

const DontVagueLabelPreview = () => (
  <div className="flex flex-col gap-2 items-center">
    <div className="w-full max-w-xs rounded-4xl border bg-card p-5 ring-1 ring-foreground/5 opacity-60">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-center">
          <p className="text-base font-medium">Are you sure?</p>
          <p className="text-sm text-muted-foreground">This action will be performed.</p>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm">No</Button>
          <Button variant="destructive" size="sm">Yes</Button>
        </div>
      </div>
    </div>
    <p className="text-xs text-muted-foreground text-center">Vague title and buttons — users can&apos;t tell what will be deleted</p>
  </div>
)

const DontFormInDialogPreview = () => (
  <div className="flex flex-col gap-2 items-center">
    <div className="w-full max-w-xs rounded-4xl border bg-card p-5 ring-1 ring-foreground/5 opacity-60">
      <div className="flex flex-col gap-3">
        <p className="text-base font-medium">Edit customer details</p>
        <div className="flex flex-col gap-1.5">
          {["Full name", "Email address", "Phone number"].map(f => (
            <div key={f} className="h-8 rounded-lg border bg-muted/50 px-3 flex items-center">
              <span className="text-xs text-muted-foreground">{f}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Save</Button>
        </div>
      </div>
    </div>
    <p className="text-xs text-muted-foreground text-center">Forms belong in Dialog or Drawer — not AlertDialog</p>
  </div>
)

const DontMultipleActionsPreview = () => (
  <div className="flex flex-col gap-2 items-center">
    <div className="w-full max-w-xs rounded-4xl border bg-card p-5 ring-1 ring-foreground/5 opacity-60">
      <div className="flex flex-col gap-3">
        <p className="text-base font-medium">Delete record?</p>
        <div className="flex flex-col gap-1.5">
          <Button variant="destructive" size="sm" className="w-full">Delete permanently</Button>
          <Button variant="outline" size="sm" className="w-full">Archive instead</Button>
          <Button variant="outline" size="sm" className="w-full">Export, then delete</Button>
          <Button variant="ghost" size="sm" className="w-full">Cancel</Button>
        </div>
      </div>
    </div>
    <p className="text-xs text-muted-foreground text-center">Too many choices — AlertDialog has exactly two paths</p>
  </div>
)

// ── Examples in context ───────────────────────────────────────────────────────

const DeleteRecordExample = () => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  function handleDelete(name: string) {
    setSelected(name)
    setOpen(true)
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="rounded-xl border overflow-hidden text-sm">
        <div className="grid grid-cols-[1fr_auto] gap-4 px-4 py-2 border-b bg-muted/50">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Contact</p>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Action</p>
        </div>
        {[
          { name: "Adaeze Okoye", email: "adaeze@mtn.com" },
          { name: "Emeka Nwachukwu", email: "emeka@nairabi.io" },
          { name: "Ngozi Achebe", email: "ngozi@paystack.com" },
        ].map(row => (
          <div key={row.name} className="grid grid-cols-[1fr_auto] gap-4 items-center px-4 py-3 border-b last:border-0">
            <div>
              <p className="text-sm font-medium">{row.name}</p>
              <p className="text-xs text-muted-foreground">{row.email}</p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-destructive hover:text-destructive"
              aria-label={`Delete ${row.name}`}
              onClick={() => handleDelete(row.name)}
            >
              <RiDeleteBinLine />
            </Button>
          </div>
        ))}
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <RiDeleteBinLine className="size-8 text-muted-foreground" />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete {selected}?</AlertDialogTitle>
            <AlertDialogDescription>
              This contact and all associated records will be permanently deleted. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Delete contact</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

const RevokeAccessExample = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <p className="text-sm font-medium">Team members</p>
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-sm font-medium">Emeka Nwachukwu</p>
          <p className="text-xs text-muted-foreground">emeka@nairabi.io · Member</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          Revoke access
        </Button>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <RiUserUnfollowLine className="size-8 text-muted-foreground" />
            </AlertDialogMedia>
            <AlertDialogTitle>Revoke access for Emeka?</AlertDialogTitle>
            <AlertDialogDescription>
              Emeka Nwachukwu will immediately lose access to the workspace and all shared resources. You can re-invite him at any time from Team settings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Revoke access</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

const SignOutExample = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border overflow-hidden max-w-xs">
      <div className="flex items-center gap-3 p-4 border-b">
        <div className="size-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">IE</div>
        <div>
          <p className="text-sm font-medium">Ikedi Eze</p>
          <p className="text-xs text-muted-foreground">kasidyray@gmail.com</p>
        </div>
      </div>
      <div className="p-2">
        <button
          className="cursor-pointer w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/5 transition-colors"
          onClick={() => setOpen(true)}
        >
          <RiLogoutBoxLine className="size-4" />
          Sign out
        </button>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia>
              <RiLogoutBoxLine className="size-8 text-muted-foreground" />
            </AlertDialogMedia>
            <AlertDialogTitle>Sign out?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be signed out of your current session. Any unsaved changes may be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="ghost">Stay</AlertDialogCancel>
            <AlertDialogAction>Sign out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// ── AlertDialog design doc ────────────────────────────────────────────────────

export const alertDialogDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  overview: {
    what: "A blocking modal overlay that forces users to explicitly confirm or cancel a destructive or irreversible action before it is performed.",
    why: "Destructive operations need an intentional, focused decision point. A modal that prevents interaction with the rest of the interface until the user chooses ensures there are no accidental confirmations.",
    problem: "Without a dedicated confirmation pattern, users accidentally trigger irreversible actions — delete, revoke, or purge — with no chance to reconsider.",
    appearsIn: [
      "Delete confirmation flows",
      "Revoke access dialogs",
      "Sign out confirmation",
      "Irreversible data mutations",
      "Account or workspace deletion",
      "API key revocation",
    ],
  },

  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Overlay",
        description: "Full-screen backdrop that blocks interaction with the rest of the UI. Cannot be clicked to dismiss — intentional.",
      },
      {
        name: "Content",
        description: "The dialog panel. Pill border-radius (rounded-4xl), bg-card background. Opens with a fade+zoom animation. Two sizes: default (max-w-md) and sm (max-w-xs).",
      },
      {
        name: "Media",
        description: "Optional 64px circle icon container. Place a single RemixIcon inside. On desktop spans 2 rows beside title and description.",
        optional: true,
      },
      {
        name: "Title",
        description: "Dialog heading (text-lg font-medium). A direct question naming the entity being affected.",
      },
      {
        name: "Description",
        description: "Body text (text-sm text-muted-foreground). Explains the consequence of confirming. 1–2 sentences max.",
      },
      {
        name: "Footer",
        description: "Action row containing Cancel and Action. Stacks on mobile, horizontal on sm+. size='sm' uses a 2-column grid.",
      },
      {
        name: "Cancel",
        description: "Closes the dialog without performing any action. Renders as Button variant='outline' by default. Auto-closes.",
      },
      {
        name: "Action",
        description: "Confirms the operation. Renders as Button — pass variant='destructive' for delete/revoke. Supports loading state.",
      },
    ],
  },

  whenToUse: [
    "Permanently deleting a record, file, or account — any action that cannot be undone.",
    "Revoking access or removing a team member from a workspace.",
    "Purging or resetting data — clearing history, resetting settings, or wiping a project.",
    "Signing out — especially when unsaved work may be lost.",
    "Cancelling a subscription or agreement where the user should understand the consequence.",
  ],
  whenNotToUse: [
    "Non-destructive confirmations — submitting a form, publishing a post. Use a standard Button.",
    "Informational messages that don't require a user decision — use Alert or a toast.",
    "Complex operations that require input or multi-step forms — use Dialog or Drawer.",
    "Easily reversible actions — use an undo toast instead of blocking the flow.",
    "Confirmations triggered automatically — always require an explicit user gesture first.",
  ],

  variants: [
    {
      name: "With media icon",
      description: "Default size with a 64px media circle. On desktop the icon sits beside the title and description spanning 2 rows.",
      when: "Most destructive confirmations. The icon communicates the action type at a glance.",
      preview: <WithMediaPreview />,
    },
    {
      name: "Without media",
      description: "Title and description only, no icon circle. Lighter appearance for self-evident actions.",
      when: "Simple confirmations where the title alone is unambiguous.",
      preview: <WithoutMediaPreview />,
    },
    {
      name: "Small (size='sm')",
      description: "Compact dialog constrained to max-w-xs. Footer uses a 2-column grid for symmetric choices.",
      when: "Sign out, clear session — short confirmations that can be read in one sentence.",
      preview: <SmallSizePreview />,
    },
  ],

  states: [
    {
      name: "Default",
      description: "Both buttons active. Waiting for user input.",
      preview: <DefaultStatePreview />,
    },
    {
      name: "Loading action",
      description: "Confirmation in progress. AlertDialogAction shows a spinner; AlertDialogCancel is disabled to prevent mid-action cancellation.",
      preview: <LoadingStatePreview />,
    },
    {
      name: "Destructive (high severity)",
      description: "AlertDialogAction uses variant='destructive'. AlertDialogMedia may use bg-destructive/10 to reinforce severity.",
      preview: <DestructiveStatePreview />,
    },
  ],

  properties: [
    {
      name: "size",
      values: "default · sm",
      default: "default",
      description: "Controls the width of AlertDialogContent. 'sm' uses a 2-col grid footer.",
    },
    {
      name: "variant (AlertDialogAction)",
      values: "default · destructive · outline · ghost · link",
      default: "default",
      description: "Use 'destructive' for delete, revoke, or purge. Use 'default' for non-destructive like sign-out.",
    },
    {
      name: "loading (AlertDialogAction)",
      values: "true · false",
      default: "false",
      description: "Shows a spinner during async operations. Disable AlertDialogCancel simultaneously.",
    },
    {
      name: "variant (AlertDialogCancel)",
      values: "outline · ghost · link",
      default: "outline",
      description: "Style of the cancel button. Use 'ghost' for symmetric low-stakes pairs like Sign out / Stay.",
    },
    {
      name: "open / onOpenChange",
      values: "boolean / function",
      default: "—",
      description: "Controlled mode. Use when you need to close the dialog programmatically after an async mutation resolves.",
    },
  ],

  contentGuidance: [
    {
      rule: "Title names the entity",
      detail: "\"Delete Adaeze Okoye?\" not \"Are you sure?\". Include the specific entity so the user knows exactly what is affected.",
    },
    {
      rule: "Description explains the consequence",
      detail: "\"This contact will be permanently deleted. This cannot be undone.\" — tell the user what will happen, not what they did.",
    },
    {
      rule: "Action label mirrors the title verb",
      detail: "If the title says \"Delete contact\" the button says \"Delete contact\", not \"Confirm\" or \"Yes\".",
    },
    {
      rule: "Cancel is always \"Cancel\"",
      detail: "Avoid \"No\", \"Go back\", or \"Abort\" — plain \"Cancel\" is always correct and adds no unnecessary anxiety.",
    },
    {
      rule: "1–2 sentences in the description",
      detail: "AlertDialog is a quick decision point, not an explanation page. Keep descriptions short.",
    },
  ],

  behavior: [
    "No click-outside to close. Users must explicitly choose an action — confirm or cancel. Intentional for destructive confirmations.",
    "Focus is trapped inside the dialog. Tab cycles through Cancel and Action only.",
    "AlertDialogCancel auto-closes the dialog via base-ui's Close primitive.",
    "Escape key closes the dialog via the Cancel path.",
    "Open and close animate with fade+zoom (duration-100). Snaps in and out quickly.",
    "In controlled mode, the dialog stays open until open={false}. Use to keep it open during async operations.",
  ],

  spacing: [
    {
      rule: "Internal content gap",
      detail: "gap-6 between the header and footer. Built into AlertDialogContent.",
    },
    {
      rule: "Header gap",
      detail: "gap-1.5 between title and description. gap-6 between media icon and text column on desktop.",
    },
    {
      rule: "Footer button gap",
      detail: "gap-2 between Cancel and Action. Built into AlertDialogFooter.",
    },
    {
      rule: "Content padding",
      detail: "p-6 inside AlertDialogContent. Don't add extra padding to children.",
    },
  ],

  accessibility: [
    {
      rule: "Focus trap",
      detail: "Focus is automatically trapped inside the dialog when open. Provided by base-ui — no extra code needed.",
    },
    {
      rule: "AlertDialogTitle is required",
      detail: "Maps to aria-labelledby on the dialog. Omitting it breaks screen reader announcement.",
    },
    {
      rule: "AlertDialogDescription is required",
      detail: "Maps to aria-describedby. Screen readers announce both title and description when the dialog opens.",
    },
    {
      rule: "No click-outside is intentional",
      detail: "Prevents accidental dismissal. Always provide a clearly visible Cancel button as the escape path.",
    },
    {
      rule: "Disable Cancel during loading",
      detail: "Set disabled={isLoading} on AlertDialogCancel whenever Action is loading. Prevents keyboard users from cancelling mid-mutation.",
    },
  ],

  doItems: [
    {
      label: "Name the entity in the title and button",
      description: "Specific titles like \"Delete Ngozi Achebe?\" with matching button labels leave no ambiguity.",
      preview: <DoLabelPreview />,
    },
    {
      label: "Use a media icon to signal the action type",
      description: "A bin icon for delete, a person-off icon for revoke — helps users recognise the action before reading.",
      preview: <DoMediaPreview />,
    },
    {
      label: "Offer exactly two paths: confirm or cancel",
      description: "AlertDialog is a binary decision point. One action, one cancel — nothing else.",
      preview: <DoSingleActionPreview />,
    },
  ],
  dontItems: [
    {
      label: "Don't use vague titles or button labels",
      description: "\"Are you sure?\" with \"Yes\" / \"No\" tells the user nothing about what they are confirming.",
      preview: <DontVagueLabelPreview />,
    },
    {
      label: "Don't put forms inside AlertDialog",
      description: "AlertDialog is a confirmation modal only. For data entry use Dialog or Drawer.",
      preview: <DontFormInDialogPreview />,
    },
    {
      label: "Don't offer more than two actions",
      description: "Multiple action buttons defeat the purpose of a focused confirmation.",
      preview: <DontMultipleActionsPreview />,
    },
  ],

  examplesInContext: [
    {
      title: "Delete from a data table",
      description: "Triggered by a delete icon in a table row. The dialog names the contact so there's no ambiguity about who is being deleted.",
      preview: <DeleteRecordExample />,
    },
    {
      title: "Revoke team member access",
      description: "Triggered from a team management panel. Icon and name make the consequence immediately clear.",
      preview: <RevokeAccessExample />,
    },
    {
      title: "Sign out from a user menu",
      description: "Small size with a symmetric footer. Non-destructive confirm (sign-out is reversible) — default variant on action.",
      preview: <SignOutExample />,
    },
  ],

  relatedComponents: [
    {
      slug: "dialog",
      name: "Dialog",
      description: "A modal for non-destructive interactions — viewing details or confirming settings changes. Allows click-outside to close.",
      when: "The interaction is not destructive, or the user needs to input data before proceeding.",
    },
    {
      slug: "drawer",
      name: "Drawer",
      description: "A side panel for complex flows — multi-step actions, detail views, or forms.",
      when: "The action requires more than a confirmation — use Drawer for edit flows or anything with substantial input.",
    },
    {
      slug: "alert",
      name: "Alert",
      description: "An inline banner for warnings, errors, or informational messages without blocking the UI.",
      when: "The message is informational and does not require an explicit user decision.",
    },
  ],

  designNotes: [
    "The pill border-radius (rounded-4xl) visually distinguishes AlertDialog from cards and panels, reinforcing it as a floating layer.",
    "No-click-outside-to-close is a deliberate design decision. Always pair with a clearly visible Cancel button.",
    "The media circle spans 2 rows beside title + description on desktop with default size — handled automatically by the CSS grid.",
    "size='sm' uses a 2-column grid footer giving Cancel and Action equal visual weight. Reserve for symmetric decisions.",
  ],
}
