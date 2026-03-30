"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IconBadge } from "@/components/ui/icon-badge"
import {
  RiAlertLine,
  RiCheckLine,
  RiErrorWarningLine,
  RiFlashlightLine,
  RiInformationLine,
  RiShieldLine,
  RiStarLine,
} from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ────────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    <IconBadge variant="primary" />
    <div className="flex items-start flex-wrap gap-6 text-center justify-center">
      {[
        "① rounded-full container",
        "② semantic background",
        "③ icon (default or custom)",
        "④ size-14 (xl default)",
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

const AllVariantsPreview = () => (
  <div className="flex flex-wrap items-center gap-4 justify-center">
    <IconBadge variant="neutral" />
    <IconBadge variant="primary" />
    <IconBadge variant="success" />
    <IconBadge variant="warning" />
    <IconBadge variant="info" />
    <IconBadge variant="destructive" />
  </div>
)

// ── Size previews ──────────────────────────────────────────────────────────────

const SizePreview = () => (
  <div className="flex flex-wrap items-end gap-4 justify-center">
    <div className="flex flex-col items-center gap-2">
      <IconBadge variant="primary" size="sm" />
      <span className="text-xs text-muted-foreground">sm</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <IconBadge variant="primary" size="default" />
      <span className="text-xs text-muted-foreground">default</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <IconBadge variant="primary" size="lg" />
      <span className="text-xs text-muted-foreground">lg</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <IconBadge variant="primary" size="xl" />
      <span className="text-xs text-muted-foreground">xl</span>
    </div>
  </div>
)

// ── State previews ─────────────────────────────────────────────────────────────

const CustomIconPreview = () => (
  <div className="flex flex-wrap items-center gap-4 justify-center">
    <IconBadge variant="primary"><RiStarLine /></IconBadge>
    <IconBadge variant="success"><RiShieldLine /></IconBadge>
    <IconBadge variant="destructive"><RiErrorWarningLine /></IconBadge>
  </div>
)

const InDialogPreview = () => (
  <div className="flex flex-wrap gap-3 justify-center">
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>Warning dialog</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <IconBadge variant="warning" />
          <DialogTitle>Update your card</DialogTitle>
          <DialogDescription>
            Your new card will replace your current payment method.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" className="flex-1">Cancel</Button>
          <Button className="flex-1">Update card</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" size="sm" />}>Destructive dialog</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <IconBadge variant="destructive" />
          <DialogTitle>Delete project</DialogTitle>
          <DialogDescription>
            This will permanently delete the project and all its data. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" className="flex-1">Cancel</Button>
          <Button variant="destructive" className="flex-1">Delete project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>Success dialog</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <IconBadge variant="success" />
          <DialogTitle>Invite team members</DialogTitle>
          <DialogDescription>
            Send invites to your team. They'll receive an email to join your workspace.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" className="flex-1">Cancel</Button>
          <Button className="flex-1">Send invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
)

// ── Do / Don't previews ────────────────────────────────────────────────────────

const DoInDialogPreview = () => (
  <div className="w-full max-w-sm mx-auto rounded-2xl border bg-background p-6 shadow-sm flex flex-col gap-3">
    <div className="flex flex-col gap-1.5">
      <IconBadge variant="warning" />
      <p className="font-semibold text-sm mt-3">Update your card</p>
      <p className="text-xs text-muted-foreground">Your new card will replace your current payment method.</p>
    </div>
  </div>
)

const DontFloatingPreview = () => (
  <div className="flex items-center gap-3 rounded-xl border p-4">
    <IconBadge variant="success" size="sm" />
    <p className="text-sm text-muted-foreground">Use xs/sm size for inline non-dialog contexts</p>
  </div>
)

// ── Context examples ───────────────────────────────────────────────────────────

const ConfirmationDialogExample = () => (
  <div className="flex flex-wrap gap-3 justify-center">
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Open info dialog</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <IconBadge variant="info" />
          <DialogTitle>New feature available</DialogTitle>
          <DialogDescription>
            We've added multi-workspace support. Switch between workspaces from the sidebar.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="w-full">Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
)

// ── IconBadge design doc ───────────────────────────────────────────────────────

export const iconBadgeDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  overview: {
    what: "A circular icon container in semantic colour variants, designed primarily for Dialog headers to provide visual context about the dialog's intent.",
    why: "Dialog modals benefit from an illustrative icon that signals the action's intent (warning, destructive, success) before the user reads the title. IconBadge standardises this pattern with consistent sizing and semantic colour mapping.",
    problem: "Without a shared icon badge, teams create ad-hoc icon containers with inconsistent sizing, wrong colours, and no semantic meaning. Dialogs in particular suffer from walls of text with no visual cue about urgency or intent.",
    appearsIn: ["Dialog headers", "Confirmation modals", "Empty states", "Onboarding steps", "Feature announcement dialogs"],
  },

  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      { name: "Container (div)", description: "Rounded-full div with size, background, and text color set by variant and size CVA." },
      { name: "Icon", description: "Children passed explicitly, or the default icon for the variant if no children are provided." },
      { name: "data-slot='icon-badge'", description: "Data attribute used by DialogHeader to apply the mb-4 spacing selector automatically." },
    ],
  },

  whenToUse: [
    "Inside DialogHeader to visually communicate intent (warning, destructive, success, info).",
    "At the top of a confirmation or alert dialog above the DialogTitle.",
    "In an empty state header when a semantic icon container is needed.",
    "On informational cards or onboarding steps where an illustrative icon adds context.",
  ],

  whenNotToUse: [
    "For inline status indicators — use Badge or StatusBadge instead.",
    "For icon-only buttons or toolbar actions — use Button with size='icon'.",
    "Inside dense lists or table rows — the xl default size is too large for inline contexts.",
    "As a clickable element — IconBadge is purely decorative and has no interaction.",
  ],

  variants: [
    {
      name: "All variants",
      description: "Six semantic colour variants: neutral, primary, success, warning, info, and destructive. Each has a default icon paired to its intent.",
      when: "Match the variant to the dialog or content intent.",
      preview: <AllVariantsPreview />,
    },
  ],

  states: [
    {
      name: "Sizes",
      description: "Four sizes: sm (size-8), default (size-10), lg (size-12), xl (size-14). The default is xl — intentionally large for Dialog headers.",
      preview: <SizePreview />,
    },
    {
      name: "Custom icon",
      description: "Pass any icon as children to override the default. The container scales the icon automatically via the [&_svg]:size-* selector.",
      preview: <CustomIconPreview />,
    },
    {
      name: "Inside DialogHeader",
      description: "When inside a DialogHeader, [[data-slot=dialog-header]_&]:mb-4 adds automatic bottom margin to space the badge from the title.",
      preview: <InDialogPreview />,
    },
  ],

  properties: [
    {
      name: "variant",
      values: "neutral · primary · success · warning · info · destructive",
      default: "neutral",
      description: "Sets the background and icon colour. Each variant has a default icon if no children are provided.",
    },
    {
      name: "size",
      values: "sm · default · lg · xl",
      default: "xl",
      description: "sm=size-8, default=size-10, lg=size-12, xl=size-14. xl is intentionally large for DialogHeader use.",
    },
    {
      name: "children",
      values: "ReactNode",
      default: "—",
      description: "Pass a Remixicon icon element to override the variant's default icon.",
    },
  ],

  contentGuidance: [
    {
      rule: "Match variant to the dialog's intent",
      detail: "destructive for delete/irreversible, warning for cautionary updates, success for confirmations and invites, info for announcements, primary for feature prompts.",
    },
    {
      rule: "Use the default icon unless there's a specific reason to override",
      detail: "Each variant ships with a contextually appropriate default icon. Override only when the specific action benefits from a more precise icon (e.g. a shield icon for security dialogs).",
    },
    {
      rule: "Keep size xl inside DialogHeader",
      detail: "The xl size (size-14) is the visual anchor for dialog intent. Using sm or default inside a dialog header feels too small and loses the illustrative impact.",
    },
  ],

  behavior: [
    "IconBadge is a presentational div — it has no keyboard interaction or role.",
    "When placed inside an element with data-slot='dialog-header', the [[data-slot=dialog-header]_&]:mb-4 selector adds 16px bottom margin automatically.",
    "If no children are passed, the component renders the defaultIcons map entry for the current variant.",
    "Icon size is controlled via [&_svg:not([class*='size-'])]:size-* — passing an icon with an explicit size class overrides the default scaling.",
  ],

  spacing: [
    { rule: "Container size", detail: "sm=size-8 (32px), default=size-10 (40px), lg=size-12 (48px), xl=size-14 (56px)" },
    { rule: "Icon size", detail: "Scales with container: sm→size-4, default→size-5, lg→size-6, xl→size-7" },
    { rule: "DialogHeader spacing", detail: "mb-4 (16px) applied automatically when inside a DialogHeader via the data-slot selector." },
  ],

  accessibility: [
    {
      rule: "IconBadge is decorative",
      detail: "The icon is purely illustrative. The dialog's accessible name comes from DialogTitle, not IconBadge. No aria-label is needed on the badge.",
    },
    {
      rule: "Don't rely on colour alone to convey meaning",
      detail: "The variant colour reinforces intent but the DialogTitle must communicate the action in words. Colour-blind users must still understand the dialog from the text alone.",
    },
  ],

  doItems: [
    {
      label: "Place IconBadge inside DialogHeader above the title",
      description: "The [[data-slot=dialog-header]_&]:mb-4 selector handles spacing automatically. No manual margin needed.",
      preview: <DoInDialogPreview />,
    },
    {
      label: "Use sm or default sizes for non-dialog inline contexts",
      description: "xl is reserved for dialogs. In inline cards or onboarding steps, size='default' or size='lg' fits better.",
      preview: <AllVariantsPreview />,
    },
  ],

  dontItems: [
    {
      label: "Don't use IconBadge as an inline status indicator",
      description: "Use Badge or StatusBadge for inline status labels. IconBadge is an illustrative element, not a label.",
      preview: <DontFloatingPreview />,
    },
    {
      label: "Don't mix variants arbitrarily",
      description: "The destructive variant must only appear when the action is irreversible. Using it for non-destructive dialogs trains users to ignore the warning signal.",
      preview: (
        <div className="flex items-center gap-3 rounded-xl border p-4 text-sm text-muted-foreground">
          <IconBadge variant="destructive" size="default" />
          <span>Don't use destructive for edits, invites, or reversible actions.</span>
        </div>
      ),
    },
  ],

  examplesInContext: [
    {
      title: "Dialogs with semantic icon badges",
      description: "Three dialogs each using the appropriate variant: warning for updates, destructive for deletes, success for confirmations.",
      preview: <ConfirmationDialogExample />,
      code: `// Warning dialog
<DialogHeader>
  <IconBadge variant="warning" />
  <DialogTitle>Update your card</DialogTitle>
  <DialogDescription>Your new card will replace your current payment method.</DialogDescription>
</DialogHeader>

// Destructive dialog
<DialogHeader>
  <IconBadge variant="destructive" />
  <DialogTitle>Delete project</DialogTitle>
  <DialogDescription>This action cannot be undone.</DialogDescription>
</DialogHeader>

// Success / confirmation dialog
<DialogHeader>
  <IconBadge variant="success" />
  <DialogTitle>Invite team members</DialogTitle>
  <DialogDescription>They'll receive an email to join.</DialogDescription>
</DialogHeader>`,
    },
  ],

  relatedComponents: [
    {
      slug: "dialog",
      name: "Dialog",
      description: "Modal dialog component.",
      when: "IconBadge's primary context — always place inside DialogHeader when the dialog has a semantic intent.",
    },
    {
      slug: "badge",
      name: "Badge",
      description: "Coloured pill for categorical labels.",
      when: "Use Badge for inline status labels inside tables, cards, or lists — not IconBadge.",
    },
    {
      slug: "alert",
      name: "Alert",
      description: "Inline message with icon for feedback.",
      when: "Use Alert for inline page-level messages. Use IconBadge + Dialog for modal confirmations.",
    },
  ],

  designNotes: [
    "The rounded-full shape distinguishes IconBadge from Badge (rounded-full pill) and StatusBadge (rounded-md). Its circle shape signals 'illustrative decoration' rather than 'label'.",
    "The xl default size is intentional — it anchors the Dialog header visually and gives users an immediate colour signal before they read the title.",
    "Default icons were selected for universal recognition: check for success, alert for warning, error-warning for destructive, information for neutral/info, flashlight for primary.",
    "The data-slot='icon-badge' + [[data-slot=dialog-header]_&]:mb-4 pattern keeps the spacing concern inside the component — callers never need to add mt-* or mb-* manually when inside a DialogHeader.",
  ],
}
