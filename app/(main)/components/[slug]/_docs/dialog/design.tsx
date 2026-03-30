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
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview (static mock) ─────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    <div className="w-full max-w-sm relative rounded-2xl border bg-card ring-1 ring-foreground/10 overflow-hidden shadow-lg">
      {/* header */}
      <div className="flex flex-col gap-2 px-6 pt-6 pb-0">
        <p className="text-lg font-medium leading-none">Edit profile</p>
        <p className="text-sm text-muted-foreground">Update your display name and username.</p>
      </div>
      {/* body */}
      <div className="flex flex-col gap-3 px-6 py-4">
        <div className="flex flex-col gap-1.5">
          <div className="h-3 w-12 rounded bg-muted" />
          <div className="h-9 rounded-md bg-muted/50 border" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-3 w-16 rounded bg-muted" />
          <div className="h-9 rounded-md bg-muted/50 border" />
        </div>
      </div>
      {/* footer */}
      <div className="bg-muted/50 border-t px-6 py-4 flex justify-end gap-2">
        <div className="h-9 w-16 rounded-md border bg-background" />
        <div className="h-9 w-28 rounded-md bg-primary" />
      </div>
      {/* close button */}
      <div className="absolute top-2 right-2 h-8 w-8 rounded-md border bg-background flex items-center justify-center text-muted-foreground text-sm">
        ✕
      </div>
    </div>
    <div className="flex items-start flex-wrap gap-6 text-center justify-center">
      {[
        "① Header",
        "② Title",
        "③ Description",
        "④ Body",
        "⑤ Footer",
        "⑥ Close button",
      ].map(label => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="h-5 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

// ── Variant previews ───────────────────────────────────────────────────────────

function FormDialogPreview() {
  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" size="sm" />}>Open form dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Update your display name and username below.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="variant-form-name">Name</Label>
              <Input id="variant-form-name" defaultValue="Ikedi Eze" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="variant-form-username">Username</Label>
              <Input id="variant-form-username" defaultValue="@ikedieze" />
            </div>
          </div>
          <DialogFooter showCloseButton>
            <Button size="sm">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function InfoDialogPreview() {
  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" size="sm" />}>View API key</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your API key</DialogTitle>
            <DialogDescription>Use this key to authenticate requests. Keep it secret.</DialogDescription>
          </DialogHeader>
          <div className="rounded-md bg-muted p-3">
            <p className="font-mono text-xs break-all select-all text-foreground">
              pk_demo_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
          </div>
          <DialogFooter showCloseButton>
            <Button size="sm" variant="outline">Copy key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ── State previews ─────────────────────────────────────────────────────────────

function DefaultStatePreview() {
  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" size="sm" />}>Rename workspace</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename workspace</DialogTitle>
            <DialogDescription>Enter a new name for your workspace.</DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <Input defaultValue="My workspace" />
          </div>
          <DialogFooter showCloseButton>
            <Button size="sm">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function LoadingStatePreview() {
  const [loading, setLoading] = useState(false)
  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" size="sm" />}>Invite member</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite team member</DialogTitle>
            <DialogDescription>Enter an email address to send an invitation.</DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <Input placeholder="colleague@company.com" type="email" />
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
    </div>
  )
}

// ── Do / Don't previews ────────────────────────────────────────────────────────

function DoFooterPreview() {
  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" size="sm" />}>Edit billing info</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Billing info</DialogTitle>
            <DialogDescription>Update your payment details.</DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <Input placeholder="Card number" />
          </div>
          <DialogFooter showCloseButton>
            <Button size="sm">Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const DontInlineButtonsPreview = () => (
  <div className="flex justify-center">
    <div className="rounded-2xl border bg-card p-6 max-w-sm w-full shadow-lg ring-1 ring-foreground/10">
      <p className="text-lg font-medium mb-2">Billing info</p>
      <p className="text-sm text-muted-foreground mb-4">Update your payment details.</p>
      <div className="h-9 rounded-md bg-muted/50 border mb-6" />
      {/* Buttons placed inline without DialogFooter — missing muted bg, border, bleed */}
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button size="sm">Update</Button>
      </div>
    </div>
  </div>
)

// ── Context example previews ───────────────────────────────────────────────────

function EditProfileContextExample() {
  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" size="sm" />}>Edit profile</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your account details.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ctx-name">Full name</Label>
              <Input id="ctx-name" defaultValue="Ikedi Eze" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ctx-email">Email</Label>
              <Input id="ctx-email" type="email" defaultValue="kasidyray@gmail.com" />
            </div>
          </div>
          <DialogFooter showCloseButton>
            <Button size="sm">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function InviteMemberContextExample() {
  const [loading, setLoading] = useState(false)
  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger render={<Button size="sm" />}>Invite member</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite team member</DialogTitle>
            <DialogDescription>They will receive an email invitation to join your workspace.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-1.5 py-2">
            <Label htmlFor="ctx-invite-email">Email address</Label>
            <Input id="ctx-invite-email" type="email" placeholder="colleague@company.com" />
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" size="sm" />}>Cancel</DialogClose>
            <Button
              size="sm"
              loading={loading}
              onClick={() => {
                setLoading(true)
                setTimeout(() => setLoading(false), 1500)
              }}
            >
              Send invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ── Dialog design doc ──────────────────────────────────────────────────────────

export const dialogDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  overview: {
    what: "A centered modal overlay that interrupts the current view to focus the user on a single task or piece of information.",
    why: "Some actions require focused input or explicit acknowledgment before the user can continue. A dialog captures attention, prevents background interaction, and keeps context without navigating away.",
    problem: "Building custom modals from scratch leads to inconsistent focus management, missing ARIA roles, broken keyboard navigation, and styling drift. Dialog provides all of this built-in.",
    appearsIn: ["Edit profile forms", "Invite flows", "Rename prompts", "API key viewers", "Settings confirmations"],
  },

  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Backdrop",
        description: "A dark, blurred overlay covering the entire page. Clicking it closes the dialog.",
      },
      {
        name: "Content panel",
        description: "The card container. Default max-width is sm:max-w-md (~448px), rounded-2xl with p-6 padding.",
      },
      {
        name: "Header",
        description: "Contains the title and optional description. Stacks vertically with gap-2.",
      },
      {
        name: "Title",
        description: "The primary heading of the dialog. Rendered as a semantic heading element, font-medium text-lg.",
      },
      {
        name: "Description",
        description: "Supporting subtitle in muted foreground. Optional — omit if the title is self-explanatory.",
        optional: true,
      },
      {
        name: "Body",
        description: "The main content area between the header and footer. Use for form fields, text, or other components.",
      },
      {
        name: "Footer",
        description: "Action buttons area with muted background, separated by a top border. Uses negative margins to bleed flush to the dialog edges.",
        optional: true,
      },
      {
        name: "Close button",
        description: "Built-in × button at the top-right corner of the content panel. Shown by default via showCloseButton prop.",
        optional: true,
      },
    ],
  },

  whenToUse: [
    "Completing a focused action that requires input before the user can continue (rename, invite, configure).",
    "Editing a single entity or small set of fields without navigating to a new page.",
    "Displaying critical information (API keys, confirmation codes) that must be explicitly acknowledged.",
    "Quick non-destructive confirmations where AlertDialog is not needed.",
  ],

  whenNotToUse: [
    "Destructive confirmations (delete, revoke, disable) — use AlertDialog which has role=\"alertdialog\" and distinct styling.",
    "Complex forms with many fields — use a Drawer or a dedicated page to avoid an overwhelming modal.",
    "Side-by-side or detail panel layouts — use Drawer with direction=\"right\".",
    "Lightweight contextual overlays — use Popover or DropdownMenu instead.",
  ],

  variants: [
    {
      name: "Form dialog",
      description: "Contains form fields with submit and cancel actions in the footer. The most common Dialog usage.",
      when: "Creating or editing an entity",
      preview: <FormDialogPreview />,
      fullWidth: true,
    },
    {
      name: "Info dialog",
      description: "Displays read-only content such as API keys, generated tokens, or instructions with a copy or close action.",
      when: "Showing sensitive or generated content",
      preview: <InfoDialogPreview />,
      fullWidth: true,
    },
  ],

  states: [
    {
      name: "Default",
      description: "Dialog is closed. Only the trigger is visible.",
      preview: <DefaultStatePreview />,
      fullWidth: true,
    },
    {
      name: "Loading / pending action",
      description: "The primary action button shows a loading spinner while the mutation is in-flight. The dialog stays open during this time.",
      preview: <LoadingStatePreview />,
      fullWidth: true,
    },
  ],

  properties: [
    {
      name: "open (Dialog)",
      values: "boolean",
      default: "—",
      description: "Controlled open state. Pair with onOpenChange for programmatic control.",
    },
    {
      name: "onOpenChange (Dialog)",
      values: "(open: boolean) => void",
      default: "—",
      description: "Fired when the dialog open state changes (backdrop click, close button, Escape key).",
    },
    {
      name: "showCloseButton (DialogContent)",
      values: "boolean",
      default: "true",
      description: "Shows or hides the built-in × close button at the top-right of the content panel.",
    },
    {
      name: "showCloseButton (DialogFooter)",
      values: "boolean",
      default: "false",
      description: "Adds a standalone Close button inside the footer. Use when you want a labelled close action alongside the primary button.",
    },
    {
      name: "className (DialogContent)",
      values: "string",
      default: "—",
      description: "Applied to the dialog popup panel. Use to override max-width (e.g. sm:max-w-lg for wider dialogs).",
    },
  ],

  contentGuidance: [
    {
      rule: "Title: 2–5 words, action-oriented",
      detail: "\"Edit profile\" not \"Profile editing form\". The title should state the action or subject, not describe the UI.",
    },
    {
      rule: "Description: optional context only",
      detail: "Only include if the title alone is ambiguous. Omitting it when the title is self-explanatory reduces cognitive load.",
    },
    {
      rule: "Footer: 2 buttons maximum",
      detail: "Cancel (outline) + primary action. More choices means the task is too complex for a dialog — use a drawer or page instead.",
    },
    {
      rule: "Form labels are required",
      detail: "Every input inside a dialog must have an associated Label with htmlFor/id — same rules as any other form in the system.",
    },
  ],

  behavior: [
    "Opens centered with a fade + zoom-in animation (100ms). Closes with fade + zoom-out.",
    "Backdrop is dark and blurred (backdrop-blur-md on supporting browsers). Clicking it closes the dialog.",
    "A built-in × close button is positioned top-right inside the content panel (showCloseButton defaults to true).",
    "Focus is trapped inside the dialog while open. The first focusable element receives focus automatically on open.",
    "Pressing Escape closes the dialog and returns focus to the trigger element.",
    "DialogFooter uses bg-muted/50 with -mx-6 -mb-6 negative margins to bleed flush to the dialog edges.",
  ],

  spacing: [
    {
      rule: "Content padding",
      detail: "p-6 on the DialogContent panel. All internal sections inherit this baseline.",
    },
    {
      rule: "Header gap",
      detail: "gap-2 between DialogTitle and DialogDescription.",
    },
    {
      rule: "Body padding",
      detail: "Add py-2 around form fields to create breathing room between the header and footer.",
    },
    {
      rule: "Footer bleed",
      detail: "-mx-6 -mb-6 p-6 built into DialogFooter. Do not add extra margin outside the footer element.",
    },
    {
      rule: "Footer button gap",
      detail: "gap-2 between footer buttons (flex-row on sm+, flex-col-reverse on mobile).",
    },
  ],

  accessibility: [
    {
      rule: "Focus trap",
      detail: "Focus is locked inside the dialog while open. Tab cycles through all focusable elements. Do not manually manage focus.",
    },
    {
      rule: "Escape closes the dialog",
      detail: "Pressing Escape dismisses the dialog and returns focus to the element that triggered it.",
    },
    {
      rule: "DialogTitle is the accessible name",
      detail: "Always include DialogTitle — it is the semantic heading screen readers use to announce the dialog purpose when it opens.",
    },
    {
      rule: "DialogDescription is linked automatically",
      detail: "DialogDescription is associated with the dialog region via aria-describedby — no manual wiring needed.",
    },
    {
      rule: "Close button has sr-only text",
      detail: "The built-in × button includes <span className=\"sr-only\">Close</span> so screen reader users hear \"Close, button\".",
    },
    {
      rule: "Use DialogClose for cancel buttons",
      detail: "Wrap cancel/close buttons with DialogClose using the render prop so the close event fires and focus properly returns to the trigger.",
    },
  ],

  doItems: [
    {
      label: "Use DialogFooter for action buttons",
      description: "DialogFooter provides the correct muted background, border separator, bleed, and responsive stacking. Don't add buttons outside it or recreate the styling manually.",
      preview: <DoFooterPreview />,
    },
    {
      label: "Show loading state on the submit button",
      description: "Pass loading={isPending} to the primary action Button. The dialog should stay open while the mutation is in-flight.",
      preview: <LoadingStatePreview />,
    },
  ],

  dontItems: [
    {
      label: "Don't skip DialogFooter",
      description: "Placing buttons inline without DialogFooter loses the muted background treatment, border separator, and responsive stacking behavior.",
      preview: <DontInlineButtonsPreview />,
    },
    {
      label: "Don't use Dialog for destructive confirmations",
      description: "Use AlertDialog for delete, revoke, or disable actions. It has role=\"alertdialog\" and distinct visual treatment that signals danger.",
      preview: (
        <div className="flex justify-center">
          <Dialog>
            <DialogTrigger render={<Button variant="destructive" size="sm" />}>Delete account</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete account?</DialogTitle>
                <DialogDescription>This action is permanent. Use AlertDialog for destructive confirmations instead.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" size="sm" />}>Cancel</DialogClose>
                <Button variant="destructive" size="sm">Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ),
    },
  ],

  examplesInContext: [
    {
      title: "Edit profile",
      description: "Form dialog with two fields and a muted footer. The cancel action uses DialogFooter showCloseButton to properly fire the close event.",
      preview: <EditProfileContextExample />,
      code: `<Dialog>
  <DialogTrigger render={<Button variant="outline" size="sm" />}>Edit profile</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Make changes to your account details.</DialogDescription>
    </DialogHeader>
    <div className="flex flex-col gap-3 py-2">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" defaultValue="Ikedi Eze" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" defaultValue="kasidyray@gmail.com" />
      </div>
    </div>
    <DialogFooter showCloseButton>
      <Button size="sm">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    },
    {
      title: "Invite team member",
      description: "Single-field form with a loading state on the submit button. DialogClose wraps Cancel so focus returns to the trigger on close.",
      preview: <InviteMemberContextExample />,
      code: `const [loading, setLoading] = useState(false)

<Dialog>
  <DialogTrigger render={<Button size="sm" />}>Invite member</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Invite team member</DialogTitle>
      <DialogDescription>They will receive an email invitation to join your workspace.</DialogDescription>
    </DialogHeader>
    <div className="flex flex-col gap-1.5 py-2">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="colleague@company.com" />
    </div>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" size="sm" />}>Cancel</DialogClose>
      <Button size="sm" loading={loading} onClick={handleInvite}>
        Send invitation
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    },
  ],

  relatedComponents: [
    {
      slug: "alert-dialog",
      name: "Alert Dialog",
      description: "A destructive confirmation dialog with role=\"alertdialog\".",
      when: "Use AlertDialog instead when the action is irreversible — delete, revoke, disable. It has the correct ARIA role and distinct visual treatment.",
    },
    {
      slug: "drawer",
      name: "Drawer",
      description: "A slide-in side panel for detail views and longer forms.",
      when: "Use Drawer instead for entity detail panels, multi-section forms, or any content that benefits from a persistent side panel layout.",
    },
    {
      slug: "popover",
      name: "Popover",
      description: "A lightweight contextual overlay anchored to a trigger.",
      when: "Use Popover instead for small, non-critical overlays that don't require full modal focus management.",
    },
  ],

  designNotes: [
    "DialogFooter uses -mx-6 -mb-6 p-6 to bleed flush to the dialog edges — this creates a visually distinct action area without additional border-radius overrides.",
    "The backdrop uses supports-backdrop-filter:backdrop-blur-md — it appears blurred on modern browsers and falls back to the dark overlay on older ones.",
    "showCloseButton on DialogContent (top-right ×) and showCloseButton on DialogFooter (inline Close) are independent props. Enable at most one to avoid redundancy.",
    "For wider dialogs, pass className=\"sm:max-w-lg\" (or sm:max-w-xl) to DialogContent. Never hardcode pixel widths.",
  ],
}
