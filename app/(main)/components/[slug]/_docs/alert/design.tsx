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
import {
  RiInformationLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiCloseCircleLine,
} from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ───────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
    <Alert variant="info" level="section" onClose={() => {}}>
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Your subscription renews in 3 days</AlertTitle>
        <AlertDescription>
          Review your billing details before the renewal date to avoid interruption.
        </AlertDescription>
        <AlertActions>
          <a href="#" className="text-sm font-medium underline underline-offset-2">Review billing</a>
          <a href="#" className="text-sm font-medium underline underline-offset-2 opacity-70">Dismiss</a>
        </AlertActions>
      </AlertContent>
      <AlertClose />
    </Alert>
    <div className="grid grid-cols-5 gap-2 text-center text-xs font-medium text-muted-foreground px-1">
      <span>① Container</span>
      <span>② Icon</span>
      <span>③ Content</span>
      <span>④ Title + Desc + Actions</span>
      <span>⑤ Close</span>
    </div>
  </div>
)

// ── Variant previews ──────────────────────────────────────────────────────────

const InfoVariantPreview = () => (
  <Alert variant="info" level="section">
    <AlertIcon />
    <AlertContent>
      <AlertTitle>Scheduled maintenance on Sunday</AlertTitle>
      <AlertDescription>The platform will be unavailable from 2:00 AM to 4:00 AM WAT.</AlertDescription>
    </AlertContent>
  </Alert>
)

const SuccessVariantPreview = () => (
  <Alert variant="success" level="section">
    <AlertIcon />
    <AlertContent>
      <AlertTitle>Payment received successfully</AlertTitle>
      <AlertDescription>₦250,000 has been credited to Okonkwo Enterprises. Reference: TXN-20240892.</AlertDescription>
    </AlertContent>
  </Alert>
)

const WarningVariantPreview = () => (
  <Alert variant="warning" level="section">
    <AlertIcon />
    <AlertContent>
      <AlertTitle>Your free plan usage is at 90%</AlertTitle>
      <AlertDescription>You have used 9 of 10 allowed team seats. Upgrade to add more members.</AlertDescription>
      <AlertActions>
        <a href="#" className="text-sm font-medium underline underline-offset-2">Upgrade plan</a>
      </AlertActions>
    </AlertContent>
  </Alert>
)

const ErrorVariantPreview = () => (
  <Alert variant="error" level="section">
    <AlertIcon />
    <AlertContent>
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        We could not charge the card ending in 4291. Please update your payment method.
      </AlertDescription>
      <AlertActions>
        <a href="#" className="text-sm font-medium underline underline-offset-2">Update card</a>
      </AlertActions>
    </AlertContent>
  </Alert>
)

// ── State previews ────────────────────────────────────────────────────────────

const StateTitleOnlyPreview = () => (
  <Alert variant="info" level="section">
    <AlertIcon />
    <AlertContent>
      <AlertTitle>Two-factor authentication is not enabled</AlertTitle>
    </AlertContent>
  </Alert>
)

const StateWithDescriptionPreview = () => (
  <Alert variant="warning" level="section">
    <AlertIcon />
    <AlertContent>
      <AlertTitle>API key expires in 7 days</AlertTitle>
      <AlertDescription>
        Rotate your key before expiry to avoid service interruption. Keys cannot be recovered once expired.
      </AlertDescription>
    </AlertContent>
  </Alert>
)

const StateWithActionsPreview = () => (
  <Alert variant="info" level="section">
    <AlertIcon />
    <AlertContent>
      <AlertTitle>Adaeze Okoye has requested access to this workspace</AlertTitle>
      <AlertDescription>
        She will only be able to view shared projects until you approve her role.
      </AlertDescription>
      <AlertActions>
        <a href="#" className="text-sm font-medium underline underline-offset-2">Approve access</a>
        <a href="#" className="text-sm font-medium underline underline-offset-2 opacity-70">Decline</a>
      </AlertActions>
    </AlertContent>
  </Alert>
)

const StateWithClosePreview = () => {
  const [open, setOpen] = useState(true)
  return open ? (
    <Alert variant="success" level="section" onClose={() => setOpen(false)}>
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Profile updated</AlertTitle>
        <AlertDescription>Your display name and contact details have been saved.</AlertDescription>
      </AlertContent>
      <AlertClose />
    </Alert>
  ) : (
    <div className="flex items-center justify-center rounded-xl border border-dashed py-6 text-sm text-muted-foreground">
      Alert dismissed — click refresh to reset
    </div>
  )
}

const StateInlinePreview = () => (
  <div className="flex flex-col gap-3 max-w-sm">
    <div>
      <label className="text-sm font-medium mb-1.5 block">Tax Identification Number (TIN)</label>
      <input
        className="w-full rounded-md border px-3 py-2 text-sm outline-none"
        placeholder="e.g. 12345678-0001"
        defaultValue="12345678"
      />
    </div>
    <Alert variant="error" level="inline">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>TIN format is invalid</AlertTitle>
        <AlertDescription>Enter a valid 8-digit TIN followed by a 4-digit branch code.</AlertDescription>
      </AlertContent>
    </Alert>
  </div>
)

const StatePageLevelPreview = () => (
  <div className="rounded-xl overflow-hidden border">
    <Alert variant="warning" level="page">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Your account is under review</AlertTitle>
        <AlertDescription>
          Some features are restricted until our team completes verification. This usually takes 1–2 business days.
        </AlertDescription>
        <AlertActions>
          <a href="#" className="text-sm font-medium underline underline-offset-2">Learn more</a>
        </AlertActions>
      </AlertContent>
    </Alert>
  </div>
)

// ── Do / Don't previews ───────────────────────────────────────────────────────

const DoActionablePreview = () => (
  <Alert variant="warning" level="section">
    <AlertIcon />
    <AlertContent>
      <AlertTitle>Your invoice is 5 days overdue</AlertTitle>
      <AlertDescription>
        Payment for Invoice #INV-0042 from Kelechi Adeyemi was due on 21 March.
      </AlertDescription>
      <AlertActions>
        <a href="#" className="text-sm font-medium underline underline-offset-2">Send reminder</a>
        <a href="#" className="text-sm font-medium underline underline-offset-2 opacity-70">View invoice</a>
      </AlertActions>
    </AlertContent>
  </Alert>
)

const DoSingleAlertPreview = () => (
  <div className="flex flex-col gap-3">
    <Alert variant="error" level="section">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Export failed</AlertTitle>
        <AlertDescription>
          The CSV could not be generated because 3 rows contain invalid date values. Fix the rows and try again.
        </AlertDescription>
        <AlertActions>
          <a href="#" className="text-sm font-medium underline underline-offset-2">Review rows</a>
        </AlertActions>
      </AlertContent>
    </Alert>
  </div>
)

const DoMatchVariantPreview = () => (
  <div className="flex flex-col gap-2.5">
    <Alert variant="success" level="section">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Webhook registered</AlertTitle>
        <AlertDescription>Events will now be sent to https://api.okonkwo.ng/hooks.</AlertDescription>
      </AlertContent>
    </Alert>
  </div>
)

const DontMultipleAlertsPreview = () => (
  <div className="flex flex-col gap-2.5">
    <Alert variant="info" level="section">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>You have unsaved changes</AlertTitle>
      </AlertContent>
    </Alert>
    <Alert variant="warning" level="section">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Your session expires soon</AlertTitle>
      </AlertContent>
    </Alert>
    <Alert variant="error" level="section">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Payment method is invalid</AlertTitle>
      </AlertContent>
    </Alert>
    <p className="text-xs text-muted-foreground text-center mt-1">Too many alerts at once — prioritise one</p>
  </div>
)

const DontVagueTitlePreview = () => (
  <div className="flex flex-col gap-2.5">
    <Alert variant="error" level="section">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>An error occurred. Please try again later.</AlertDescription>
      </AlertContent>
    </Alert>
    <p className="text-xs text-muted-foreground text-center mt-1">Vague — no context, no action</p>
  </div>
)

const DontWrongVariantPreview = () => (
  <div className="flex flex-col gap-2.5">
    <Alert variant="success" level="section">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Verification email sent</AlertTitle>
        <AlertDescription>
          Your payment of ₦85,000 could not be processed. Please check your card details.
        </AlertDescription>
      </AlertContent>
    </Alert>
    <p className="text-xs text-muted-foreground text-center mt-1">
      Success variant used for an error — misleads the user
    </p>
  </div>
)

// ── Examples in context ───────────────────────────────────────────────────────

const FormAlertExample = () => (
  <div className="rounded-xl border overflow-hidden max-w-sm">
    <div className="p-4 border-b">
      <p className="text-sm font-semibold">Invite team member</p>
    </div>
    <div className="p-4 flex flex-col gap-4">
      <Alert variant="error" level="inline">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>This email is already a member</AlertTitle>
          <AlertDescription>
            Emeka Nwachukwu (emeka@mtn.ng) already has access to this workspace.
          </AlertDescription>
        </AlertContent>
      </Alert>
      <div>
        <label className="text-sm font-medium mb-1.5 block">Email address</label>
        <input
          className="w-full rounded-md border px-3 py-2 text-sm outline-none border-destructive bg-destructive/5"
          defaultValue="emeka@mtn.ng"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button className="rounded-md border px-3 py-1.5 text-sm">Cancel</button>
        <button className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-sm">Send invite</button>
      </div>
    </div>
  </div>
)

const SettingsPageAlertExample = () => (
  <div className="rounded-xl border overflow-hidden max-w-lg">
    <div className="p-4 border-b">
      <p className="text-sm font-semibold">Security settings</p>
      <p className="text-xs text-muted-foreground mt-0.5">Manage authentication and access controls</p>
    </div>
    <div className="p-4 flex flex-col gap-4">
      <Alert variant="warning" level="section">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Two-factor authentication is off</AlertTitle>
          <AlertDescription>
            Your account is more vulnerable without 2FA. We recommend enabling it, especially for admin accounts.
          </AlertDescription>
          <AlertActions>
            <a href="#" className="text-sm font-medium underline underline-offset-2">Enable 2FA</a>
            <a href="#" className="text-sm font-medium underline underline-offset-2 opacity-70">Remind me later</a>
          </AlertActions>
        </AlertContent>
      </Alert>
      <div className="flex items-center justify-between py-2 border-b">
        <div>
          <p className="text-sm font-medium">Password</p>
          <p className="text-xs text-muted-foreground">Last changed 6 months ago</p>
        </div>
        <button className="text-sm font-medium text-primary underline underline-offset-2">Change</button>
      </div>
      <div className="flex items-center justify-between py-2">
        <div>
          <p className="text-sm font-medium">Active sessions</p>
          <p className="text-xs text-muted-foreground">3 devices logged in</p>
        </div>
        <button className="text-sm font-medium text-primary underline underline-offset-2">View all</button>
      </div>
    </div>
  </div>
)

const PageBannerExample = () => (
  <div className="rounded-xl overflow-hidden border max-w-2xl">
    <div className="bg-muted/40 border-b px-6 py-3 flex items-center gap-2">
      <div className="size-3 rounded-full bg-muted-foreground/30" />
      <div className="size-3 rounded-full bg-muted-foreground/30" />
      <div className="size-3 rounded-full bg-muted-foreground/30" />
      <span className="text-xs text-muted-foreground ml-2">raana.app/dashboard</span>
    </div>
    <Alert variant="info" level="page">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>New data export format available</AlertTitle>
        <AlertDescription>
          Exports now support XLSX in addition to CSV. This applies to all reports across your workspace.
        </AlertDescription>
        <AlertActions>
          <a href="#" className="text-sm font-medium underline underline-offset-2">Read the changelog</a>
        </AlertActions>
      </AlertContent>
      <AlertClose />
    </Alert>
    <div className="p-6">
      <p className="text-sm text-muted-foreground">Page content would appear here…</p>
    </div>
  </div>
)

// ── Alert design doc ──────────────────────────────────────────────────────────

export const alertDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  // ── Overview ───────────────────────────────────────────────────────────────
  overview: {
    what: "A contextual message strip that communicates status, feedback, or important information to the user — with optional title, description, actions, and a dismiss button.",
    why: "Users need clear, non-blocking signals when something requires their attention, has gone wrong, succeeded, or changed. Alerts deliver this at the right scope — inline inside a form, inside a section card, or stretched across the full page.",
    problem: "Without a structured alert system, teams resort to ad-hoc inline text, coloured divs, or toasts for messages that shouldn't auto-dismiss — leading to inconsistent styling, poor accessibility, and no clear visual hierarchy between urgent and informational messages.",
    appearsIn: [
      "Form validation feedback",
      "Settings and account pages",
      "Page-level banners",
      "Detail drawers",
      "Empty states with guidance",
      "Billing and subscription sections",
    ],
  },

  // ── Anatomy ────────────────────────────────────────────────────────────────
  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Container",
        description:
          "Root wrapper. Carries the variant colour tokens, border, layout direction, and level-specific border-radius and padding. Pass variant and level here.",
      },
      {
        name: "Icon",
        description:
          "Auto-resolves the correct icon for the variant (info, success, warning, error). Accepts children to override with a custom icon. Always aria-hidden.",
      },
      {
        name: "Content",
        description:
          "Flex column wrapper that holds Title, Description, and Actions as a group. Fills remaining horizontal space.",
      },
      {
        name: "Title",
        description:
          "Short semibold summary of the alert message. Required for all alerts — one line where possible.",
      },
      {
        name: "Description",
        description:
          "Supporting body text below the title. Provides additional context, a count, or an explanation. Optional but recommended for warnings and errors.",
        optional: true,
      },
      {
        name: "Actions",
        description:
          "Row of underlined text links below the description. Use for secondary actions like 'Upgrade plan', 'Learn more', or 'View details'. Optional.",
        optional: true,
      },
      {
        name: "Close",
        description:
          "X dismiss button pinned to the top-right. Only renders when onClose is passed to the Alert root. Fires the onClose callback on click.",
        optional: true,
      },
    ],
  },

  // ── Usage ──────────────────────────────────────────────────────────────────
  whenToUse: [
    "Communicating the outcome of an action that the user needs to acknowledge — success, failure, or a warning.",
    "Surfacing persistent conditions the user must act on — expired cards, restricted access, degraded features.",
    "Providing in-form validation feedback that pertains to the whole form, not a single field.",
    "Announcing system-wide notices like scheduled maintenance, new features, or policy changes.",
    "Flagging configuration gaps in settings pages — missing 2FA, incomplete profile, unverified domain.",
  ],
  whenNotToUse: [
    "Transient feedback that should auto-dismiss after a few seconds — use Sonner toast instead.",
    "Confirmation dialogs requiring an explicit user decision — use AlertDialog.",
    "Single field validation errors — attach the message directly below the field.",
    "Marketing or promotional content — alerts carry urgency; don't dilute that with upsells.",
    "More than one alert on the same page at once — prioritise and show the most critical.",
  ],

  // ── Variants ───────────────────────────────────────────────────────────────
  variants: [
    {
      name: "Info",
      description:
        "Blue. Neutral informational tone — no positive or negative weight. For announcements, reminders, and FYI messages.",
      when: "Scheduled maintenance, new feature announcements, neutral system notices, guidance messages.",
      preview: <InfoVariantPreview />,
    },
    {
      name: "Success",
      description:
        "Green. Confirms that an action has completed successfully or a positive state has been reached.",
      when: "Payment received, profile saved, webhook registered, invitation sent, export complete.",
      preview: <SuccessVariantPreview />,
    },
    {
      name: "Warning",
      description:
        "Amber. Signals something that needs attention before it becomes a problem — not yet broken, but at risk.",
      when: "Usage nearing limit, plan expiring, API key about to expire, missing 2FA, overdue invoice.",
      preview: <WarningVariantPreview />,
    },
    {
      name: "Error",
      description:
        "Red. Communicates that something has failed or is in a broken state requiring immediate action.",
      when: "Payment failed, export error, invalid credentials, permission denied, submission rejected.",
      preview: <ErrorVariantPreview />,
    },
  ],

  // ── States ─────────────────────────────────────────────────────────────────
  states: [
    {
      name: "Title only",
      description:
        "The minimal configuration. Use when the title alone is clear enough without further explanation.",
      preview: <StateTitleOnlyPreview />,
    },
    {
      name: "With description",
      description:
        "Title and supporting body copy. Best for warnings and errors where context or consequences matter.",
      preview: <StateWithDescriptionPreview />,
    },
    {
      name: "With actions",
      description:
        "Adds text link calls-to-action below the description. Use when the user needs an obvious next step.",
      preview: <StateWithActionsPreview />,
    },
    {
      name: "With close button",
      description:
        "Adds a dismiss button in the top-right corner. Requires onClose to be passed to the Alert root.",
      preview: <StateWithClosePreview />,
    },
    {
      name: "Inline level",
      description:
        "Smaller padding and rounded-lg radius. For use inside forms or tight content areas where section-level is too large.",
      preview: <StateInlinePreview />,
    },
    {
      name: "Page level",
      description:
        "Full width, no border-radius. Designed to span the top of a page or app shell as a system banner.",
      preview: <StatePageLevelPreview />,
    },
  ],

  // ── Properties ─────────────────────────────────────────────────────────────
  properties: [
    {
      name: "variant",
      values: "info · success · warning · error",
      default: "info",
      description:
        "Semantic tone of the message. Controls all colour tokens — background, text, border, and icon colour. Always choose by meaning, not aesthetics.",
    },
    {
      name: "level",
      values: "page · section · inline",
      default: "section",
      description:
        "Layout context. page = no border-radius, larger horizontal padding for full-width banners. section = rounded-xl for cards and content areas. inline = rounded-lg with tighter padding for inside forms.",
    },
    {
      name: "onClose",
      values: "() => void",
      default: "—",
      description:
        "When provided, enables AlertClose to fire the callback on dismiss. Without this, AlertClose renders but has no effect. Manage visibility in the parent component.",
    },
  ],

  // ── Content guidance ───────────────────────────────────────────────────────
  contentGuidance: [
    {
      rule: "Title is required and must be specific",
      detail:
        "Avoid vague titles like 'Something went wrong'. Say what happened: 'Payment could not be processed' or 'API key expires in 3 days'.",
    },
    {
      rule: "Description explains, doesn't repeat",
      detail:
        "The description adds context the title can't carry — what to do, what is affected, or what will happen next. Don't restate the title in different words.",
    },
    {
      rule: "Actions should be direct",
      detail:
        "Use action verbs: 'Enable 2FA', 'Update card', 'View invoice'. Avoid 'Click here' or 'Learn more' without context.",
    },
    {
      rule: "Sentence case throughout",
      detail:
        "Titles and descriptions use sentence case. No all caps, no title case except for proper nouns and product names.",
    },
    {
      rule: "Tone matches variant",
      detail:
        "Error and warning copy should be calm and instructive, not alarming. Success copy should be brief and confident. Info copy can be neutral or encouraging.",
    },
  ],

  // ── Behavior ───────────────────────────────────────────────────────────────
  behavior: [
    "Alerts are non-blocking — they don't interrupt flow with a modal or overlay.",
    "Alerts do not auto-dismiss. Use Sonner toast for timed feedback.",
    "Dismiss state is managed externally. AlertClose calls onClose; the parent removes the alert from the tree.",
    "AlertIcon auto-selects the icon for the variant. Override by passing a custom icon as children to AlertIcon.",
    "AlertActions renders text links, not buttons. Style them with underline and the alert's inherited text colour.",
    "Multiple alerts on a single page at the same time should be avoided — prioritise the most critical.",
  ],

  // ── Spacing ────────────────────────────────────────────────────────────────
  spacing: [
    {
      rule: "Between alerts",
      detail: "gap-3 or gap-4 when stacking multiple alerts vertically (avoid stacking where possible).",
    },
    {
      rule: "Above page content",
      detail: "Page-level alerts sit between the page header and the main content area — no extra margin needed.",
    },
    {
      rule: "Inside cards or sections",
      detail: "Section-level alerts use the card's own padding. Don't add extra margin inside the card.",
    },
    {
      rule: "In forms",
      detail: "Inline alerts use gap-3 above the affected field group. Don't place inline alerts below the submit button.",
    },
  ],

  // ── Accessibility ──────────────────────────────────────────────────────────
  accessibility: [
    {
      rule: "role='alert' is set by default",
      detail:
        "The Alert root renders role='alert', which causes screen readers to announce the content immediately when it appears in the DOM. Don't suppress this.",
    },
    {
      rule: "Don't rely on colour alone",
      detail:
        "Every alert includes an icon and a text title. Colour reinforces meaning but is never the only indicator.",
    },
    {
      rule: "AlertClose is keyboard-accessible",
      detail:
        "The close button renders as a <button> with aria-label='Dismiss'. It responds to Enter and Space, and is visible in the focus order.",
    },
    {
      rule: "AlertIcon is aria-hidden",
      detail:
        "Icons are decorative — the text label carries the meaning. AlertIcon always renders with aria-hidden='true'.",
    },
    {
      rule: "AlertActions links need meaningful labels",
      detail:
        "Don't use bare 'Click here'. Link text should describe the destination: 'View invoice', 'Enable 2FA', 'Update billing'.",
    },
  ],

  // ── Do & Don't ─────────────────────────────────────────────────────────────
  doItems: [
    {
      label: "Include a clear next step for warnings and errors",
      description:
        "Give users an actionable path forward. An alert without a resolution is frustrating.",
      preview: <DoActionablePreview />,
    },
    {
      label: "Show one alert at a time per context",
      description:
        "When multiple conditions exist, prioritise. Show the most critical alert and suppress the others until it's resolved.",
      preview: <DoSingleAlertPreview />,
    },
    {
      label: "Match the variant to the meaning of the message",
      description:
        "A successful outcome is always success, a breaking failure is always error. Don't pick variants by colour preference.",
      preview: <DoMatchVariantPreview />,
    },
  ],
  dontItems: [
    {
      label: "Don't show multiple alerts simultaneously in the same area",
      description:
        "Stacking alerts overwhelms users. Prioritise and resolve one before surfacing another.",
      preview: <DontMultipleAlertsPreview />,
    },
    {
      label: "Don't use vague titles",
      description:
        "'Something went wrong' gives the user nothing to act on. Be specific about what failed and why.",
      preview: <DontVagueTitlePreview />,
    },
    {
      label: "Don't mismatch variant and message tone",
      description:
        "Using a success variant for an error message confuses users and breaks semantic trust in the colour system.",
      preview: <DontWrongVariantPreview />,
    },
  ],

  // ── Examples in context ────────────────────────────────────────────────────
  examplesInContext: [
    {
      title: "Inline in a form",
      description:
        "An inline-level error alert sits above the affected field after a failed invite attempt — scoped, specific, and out of the way of the rest of the form.",
      preview: <FormAlertExample />,
    },
    {
      title: "In a settings page",
      description:
        "A section-level warning inside a settings card draws attention to a security gap without blocking the user from completing other tasks on the page.",
      preview: <SettingsPageAlertExample />,
    },
    {
      title: "As a page-level banner",
      description:
        "A page-level info alert stretches the full width of the content area, below the app header, to announce a platform-wide change that affects all users.",
      preview: <PageBannerExample />,
    },
  ],

  // ── Related components ─────────────────────────────────────────────────────
  relatedComponents: [
    {
      slug: "alert-dialog",
      name: "Alert Dialog",
      description:
        "Modal dialog that blocks the interface and requires an explicit user decision before proceeding.",
      when: "The action is destructive or irreversible — delete, revoke, disable — and you need explicit confirmation.",
    },
    {
      slug: "sonner",
      name: "Toast (Sonner)",
      description:
        "Auto-dismissing notification that appears in a corner of the screen for transient feedback.",
      when: "The feedback is brief, non-critical, and should disappear after a few seconds without user input.",
    },
    {
      slug: "badge",
      name: "Badge",
      description:
        "Compact pill label for classifying or tagging items with a short word or phrase.",
      when: "You need to label the category, tier, or type of a record rather than communicate a message or state.",
    },
  ],

  // ── Design notes ───────────────────────────────────────────────────────────
  designNotes: [
    "The three levels — page, section, inline — map directly to three spatial contexts in the layout. Use page for app-wide banners, section for cards and sidebars, inline for tight spaces like form field groups.",
    "All variant colours are semantic design tokens (bg-info-lighter, text-error-dark, etc.). Never override them with raw hex or Tailwind colour scale values — the tokens ensure dark mode and theme consistency.",
    "AlertActions is intentionally styled as text links, not buttons. This keeps the visual weight of the alert focused on the message rather than an action hierarchy. If a primary CTA is needed, place a Button below the alert instead.",
    "The close interaction is opt-in. Only add AlertClose when the alert is genuinely dismissible — don't add it to critical errors that the user must resolve to proceed.",
  ],
}
