"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Previews ───────────────────────────────────────────────────────────────────

function BasicPreview() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dev-dlg-name">Name</Label>
            <Input id="dev-dlg-name" defaultValue="Ikedi Eze" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dev-dlg-username">Username</Label>
            <Input id="dev-dlg-username" defaultValue="@ikedieze" />
          </div>
        </div>
        <DialogFooter showCloseButton>
          <Button size="sm">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function LoadingPreview() {
  const [loading, setLoading] = useState(false)
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>Invite member</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite team member</DialogTitle>
          <DialogDescription>Enter an email to send an invitation.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-1.5 py-2">
          <Label htmlFor="dev-dlg-email">Email address</Label>
          <Input id="dev-dlg-email" type="email" placeholder="colleague@company.com" />
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" size="sm" />}>Cancel</DialogClose>
          <Button
            size="sm"
            loading={loading}
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 2000)
            }}
          >
            Send invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ControlledPreview() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Open programmatically
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Programmatic dialog</DialogTitle>
            <DialogDescription>Opened without a DialogTrigger using the open prop.</DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton>
            <Button size="sm" onClick={() => setOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function NoCloseButtonPreview() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>View terms</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Terms of service</DialogTitle>
          <DialogDescription>Please read and accept the terms before continuing.</DialogDescription>
        </DialogHeader>
        <div className="py-2 text-sm text-muted-foreground">
          <p>By using this service you agree to our terms of use and privacy policy.</p>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" size="sm" />}>Decline</DialogClose>
          <Button size="sm">Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function WiderDialogPreview() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>Open wider dialog</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Configure integration</DialogTitle>
          <DialogDescription>Set up your webhook endpoint and authentication settings.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dev-dlg-endpoint">Endpoint URL</Label>
            <Input id="dev-dlg-endpoint" placeholder="https://your-app.com/webhooks/events" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dev-dlg-secret">Signing secret</Label>
            <Input id="dev-dlg-secret" placeholder="whsec_..." />
          </div>
        </div>
        <DialogFooter showCloseButton>
          <Button size="sm">Save integration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ── Dialog develop doc ─────────────────────────────────────────────────────────

export const dialogDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/dialog",
    importPath: `import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger, DialogClose,
} from "@/components/ui/dialog"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "Built on base-ui Dialog — focus trap, Escape key, and backdrop click are handled automatically.",
      "For destructive confirmations, use AlertDialog instead — it has the correct aria role=\"alertdialog\".",
      "DialogTrigger and DialogClose use the render prop pattern (base-ui): render={<Button />} with children as the label.",
    ],
  },

  basicUsage: `import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger, DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Basic form dialog
<Dialog>
  <DialogTrigger render={<Button variant="outline" size="sm" />}>Edit profile</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Update your details below.</DialogDescription>
    </DialogHeader>
    <div className="flex flex-col gap-1.5 py-2">
      <Label htmlFor="name">Full name</Label>
      <Input id="name" defaultValue="Ikedi Eze" />
    </div>
    <DialogFooter showCloseButton>
      <Button size="sm">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Controlled (no trigger)
const [open, setOpen] = useState(false)
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>...</DialogContent>
</Dialog>`,

  codeExamples: [
    {
      title: "Form dialog",
      description: "The most common usage. DialogTrigger opens the dialog; DialogFooter showCloseButton adds an inline cancel action.",
      preview: <BasicPreview />,
      code: `<Dialog>
  <DialogTrigger render={<Button variant="outline" size="sm" />}>Edit profile</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Make changes to your profile here.</DialogDescription>
    </DialogHeader>
    <div className="flex flex-col gap-3 py-2">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="Ikedi Eze" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@ikedieze" />
      </div>
    </div>
    <DialogFooter showCloseButton>
      <Button size="sm">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    },
    {
      title: "With loading state",
      description: "Pass loading={isPending} to the primary Button. Use DialogClose render prop for Cancel so focus returns to the trigger on close.",
      preview: <LoadingPreview />,
      code: `const [loading, setLoading] = useState(false)

<Dialog>
  <DialogTrigger render={<Button variant="outline" size="sm" />}>Invite member</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Invite team member</DialogTitle>
      <DialogDescription>Enter an email to send an invitation.</DialogDescription>
    </DialogHeader>
    <div className="flex flex-col gap-1.5 py-2">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="colleague@company.com" />
    </div>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" size="sm" />}>Cancel</DialogClose>
      <Button size="sm" loading={loading} onClick={handleInvite}>
        Send invite
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    },
    {
      title: "Controlled dialog",
      description: "Open programmatically without a DialogTrigger. Drive the open state from your own React state.",
      preview: <ControlledPreview />,
      code: `const [open, setOpen] = useState(false)

<>
  <Button onClick={() => setOpen(true)}>Open programmatically</Button>
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Programmatic dialog</DialogTitle>
        <DialogDescription>Opened without a DialogTrigger using the open prop.</DialogDescription>
      </DialogHeader>
      <DialogFooter showCloseButton>
        <Button size="sm" onClick={() => setOpen(false)}>Done</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</>`,
    },
    {
      title: "Hide built-in close button",
      description: "Pass showCloseButton={false} to DialogContent when you want to force the user to interact with the footer before closing.",
      preview: <NoCloseButtonPreview />,
      code: `<Dialog>
  <DialogTrigger render={<Button variant="outline" size="sm" />}>View terms</DialogTrigger>
  <DialogContent showCloseButton={false}>
    <DialogHeader>
      <DialogTitle>Terms of service</DialogTitle>
      <DialogDescription>Please read and accept before continuing.</DialogDescription>
    </DialogHeader>
    <div className="py-2 text-sm text-muted-foreground">
      <p>By using this service you agree to our terms of use and privacy policy.</p>
    </div>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" size="sm" />}>Decline</DialogClose>
      <Button size="sm">Accept</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    },
    {
      title: "Wider dialog",
      description: "Pass className to DialogContent to override the default sm:max-w-md. Use sm:max-w-lg or sm:max-w-xl for more content-dense dialogs.",
      preview: <WiderDialogPreview />,
      code: `<Dialog>
  <DialogTrigger render={<Button variant="outline" size="sm" />}>Configure integration</DialogTrigger>
  <DialogContent className="sm:max-w-lg">
    <DialogHeader>
      <DialogTitle>Configure integration</DialogTitle>
      <DialogDescription>Set up your webhook endpoint and authentication settings.</DialogDescription>
    </DialogHeader>
    <div className="flex flex-col gap-3 py-2">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="endpoint">Endpoint URL</Label>
        <Input id="endpoint" placeholder="https://your-app.com/webhooks/events" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="secret">Signing secret</Label>
        <Input id="secret" placeholder="whsec_..." />
      </div>
    </div>
    <DialogFooter showCloseButton>
      <Button size="sm">Save integration</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    },
  ],

  apiReference: [
    {
      name: "open (Dialog)",
      values: "boolean",
      default: "—",
      description: "Controlled open state. Pair with onOpenChange to drive the dialog from React state.",
    },
    {
      name: "onOpenChange (Dialog)",
      values: "(open: boolean) => void",
      default: "—",
      description: "Fired when the dialog open state changes (Escape key, backdrop click, close button).",
    },
    {
      name: "showCloseButton (DialogContent)",
      values: "boolean",
      default: "true",
      description: "Shows or hides the built-in × close button at the top-right of the content panel.",
    },
    {
      name: "className (DialogContent)",
      values: "string",
      default: "—",
      description: "Applied to the dialog popup panel. Use to override max-width (e.g. sm:max-w-lg).",
    },
    {
      name: "showCloseButton (DialogFooter)",
      values: "boolean",
      default: "false",
      description: "Adds a standalone Close button inside the footer area. Use instead of a manual DialogClose in the footer.",
    },
    {
      name: "render (DialogTrigger / DialogClose)",
      values: "ReactElement",
      default: "—",
      description: "The element to render as the trigger or close button. Pass a Button component: render={<Button variant=\"outline\" />}. Children become the label.",
    },
  ],

  accessibility: [
    {
      rule: "Focus trap is built-in",
      detail: "Focus is locked inside the dialog while open. Tab cycles through all focusable elements. Do not manually manage focus.",
    },
    {
      rule: "Escape closes the dialog",
      detail: "Pressing Escape dismisses the dialog and returns focus to the element that triggered it. Do not override or suppress this.",
    },
    {
      rule: "Always include DialogTitle",
      detail: "DialogTitle provides the accessible name that screen readers announce when the dialog opens. Omitting it leaves the dialog nameless.",
    },
    {
      rule: "Use DialogClose for cancel buttons",
      detail: "Wrap cancel/close actions with DialogClose render prop. This fires the close event and properly returns focus to the trigger.",
    },
    {
      rule: "Label all form inputs",
      detail: "Every Input inside a Dialog must have an associated Label via htmlFor/id. The modal context does not relax this requirement.",
    },
  ],
}
