"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RiSearchLine, RiMailLine, RiEyeLine, RiEyeOffLine } from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ───────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    <div className="w-64">
      <Input placeholder="Enter your email address" />
    </div>
    <div className="flex items-start gap-10 text-center">
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">① Container</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">② Placeholder / Value</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-5 w-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">③ Focus ring</span>
      </div>
    </div>
  </div>
)

// ── Context example: Login form ───────────────────────────────────────────────

const LoginFormExample = () => (
  <div className="rounded-xl border overflow-hidden max-w-sm">
    <div className="px-5 py-4 border-b">
      <p className="text-sm font-semibold">Sign in</p>
      <p className="text-xs text-muted-foreground mt-0.5">Enter your credentials to continue</p>
    </div>
    <div className="p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="login-email">Email</Label>
        <Input id="login-email" type="email" placeholder="adaeze@company.com" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="login-password">Password</Label>
        <Input id="login-password" type="password" placeholder="••••••••" />
      </div>
      <Button size="sm" className="w-full">Sign in</Button>
    </div>
  </div>
)

// ── Context example: Profile settings form ────────────────────────────────────

const ProfileSettingsExample = () => (
  <div className="rounded-xl border overflow-hidden max-w-sm">
    <div className="px-5 py-4 border-b">
      <p className="text-sm font-semibold">Profile</p>
    </div>
    <div className="p-5 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="first-name">First name</Label>
          <Input id="first-name" defaultValue="Adaeze" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="last-name">Last name</Label>
          <Input id="last-name" defaultValue="Okafor" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="profile-email">Email</Label>
        <Input id="profile-email" type="email" defaultValue="adaeze@company.com" readOnly className="opacity-60" />
        <p className="text-xs text-muted-foreground">Contact support to change your email.</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="profile-role">Job title</Label>
        <Input id="profile-role" placeholder="e.g. Product Manager" />
      </div>
    </div>
    <div className="px-5 py-3 border-t flex justify-end gap-2">
      <Button variant="outline" size="sm">Cancel</Button>
      <Button size="sm">Save changes</Button>
    </div>
  </div>
)

// ── Context example: Search with inline button ────────────────────────────────

const SearchWithButtonExample = () => (
  <div className="rounded-xl border overflow-hidden max-w-sm">
    <div className="px-5 py-4 border-b">
      <p className="text-sm font-semibold">Customer lookup</p>
    </div>
    <div className="p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="search-input">Search by name or email</Label>
        <div className="flex gap-2">
          <Input id="search-input" placeholder="Emeka Nwachukwu..." className="flex-1" />
          <Button size="default" variant="outline" aria-label="Search">
            <RiSearchLine />
          </Button>
        </div>
      </div>
    </div>
  </div>
)

// ── Do / Don't previews ───────────────────────────────────────────────────────

const DoPairWithLabelPreview = () => (
  <div className="flex flex-col gap-1.5 w-56">
    <Label htmlFor="do-email">Email address</Label>
    <Input id="do-email" type="email" placeholder="you@example.com" />
  </div>
)

const DoValidationInlinePreview = () => (
  <div className="flex flex-col gap-1.5 w-56">
    <Label htmlFor="do-val">Phone number</Label>
    <Input id="do-val" aria-invalid placeholder="+234 800 000 0000" />
    <p className="text-xs text-destructive">Please enter a valid phone number.</p>
  </div>
)

const DontPlaceholderAsLabelPreview = () => (
  <div className="flex flex-col gap-1.5 w-56">
    <Input placeholder="Email address" />
    <p className="text-xs text-muted-foreground text-center">No Label — hard to scan when filled</p>
  </div>
)

const DontMultilinePreview = () => (
  <div className="flex flex-col gap-1.5 w-56">
    <Label htmlFor="dont-ml">Description</Label>
    <Input id="dont-ml" placeholder="Tell us about yourself and your experience in detail..." />
    <p className="text-xs text-muted-foreground text-center">Use Textarea for multi-line content</p>
  </div>
)

// ── Input design doc ──────────────────────────────────────────────────────────

export const inputDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  // ── Overview ───────────────────────────────────────────────────────────────
  overview: {
    what: "A single-line text field that accepts keyboard input and supports placeholder, error, disabled, and read-only states.",
    why: "Forms are the most common data-entry surface; a standardised input component ensures consistent height, border, focus ring, and error styling across the system.",
    problem: "Without a consistent input component, each form reinvents sizing, focus style, and error indication — leading to visual inconsistency and accessibility gaps.",
    appearsIn: [
      "Login and sign-up forms",
      "Settings pages",
      "Detail drawers",
      "Search bars",
      "Onboarding flows",
      "Inline editing",
    ],
  },

  // ── Anatomy ────────────────────────────────────────────────────────────────
  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Container",
        description: "The outer input box. Provides the border, background, border-radius, and h-10 height.",
      },
      {
        name: "Placeholder / Value",
        description: "Hint text shown when empty; replaced by the user's typed value.",
      },
      {
        name: "Focus ring",
        description: "Ring shown on keyboard or mouse focus. Always visible and never suppressed.",
      },
    ],
  },

  // ── Usage ──────────────────────────────────────────────────────────────────
  whenToUse: [
    "Single-line text entry — names, emails, passwords, search terms, phone numbers.",
    "Inline editing of a single field in a detail drawer or settings card.",
    "Search bars paired with a button or icon trigger.",
    "File upload — the file variant renders a styled file picker.",
  ],
  whenNotToUse: [
    "Multi-line content (bio, notes, descriptions) — use Textarea.",
    "Choosing from a fixed list of options — use Select or Combobox.",
    "Numeric ranges or sliders — use a Slider or number input.",
    "OTP or PIN codes — use Input OTP.",
  ],

  // ── Variants ───────────────────────────────────────────────────────────────
  variants: [
    {
      name: "Default",
      description: "Standard text input. The base configuration used in most forms.",
      when: "Text, email, URL, number fields in all standard form layouts.",
      preview: (
        <div className="w-64">
          <Input placeholder="Enter a value" />
        </div>
      ),
    },
    {
      name: "Disabled",
      description: "Visually dimmed and non-interactive. Communicates that the field cannot be edited.",
      when: "Fields locked by permissions, read-after-submit states, or feature flags.",
      preview: (
        <div className="w-64">
          <Input placeholder="Not editable" disabled />
        </div>
      ),
    },
    {
      name: "Error (aria-invalid)",
      description: "Destructive border and ring. Applied when the field has failed validation.",
      when: "After form submission with an invalid value, or on blur validation.",
      preview: (
        <div className="flex flex-col gap-1.5 w-64">
          <Input aria-invalid placeholder="invalid@" />
          <p className="text-xs text-destructive">Enter a valid email address.</p>
        </div>
      ),
    },
    {
      name: "File input",
      description: "Native file picker rendered with consistent styling. The container handles the appearance.",
      when: "Single file upload fields in forms — avatars, documents, attachments.",
      preview: (
        <div className="w-64">
          <Input type="file" />
        </div>
      ),
    },
  ],

  // ── States ─────────────────────────────────────────────────────────────────
  states: [
    {
      name: "Default",
      description: "Empty, no focus, no value. The resting state.",
      preview: (
        <div className="w-56">
          <Input placeholder="Placeholder text" />
        </div>
      ),
    },
    {
      name: "Focused",
      description: "Focus ring visible. Triggered by click or Tab key navigation.",
      preview: (
        <div className="w-56">
          <Input placeholder="Click to focus" autoFocus className="ring-2 ring-ring ring-offset-0" />
        </div>
      ),
    },
    {
      name: "Filled",
      description: "Has a typed value. Placeholder is hidden.",
      preview: (
        <div className="w-56">
          <Input defaultValue="Adaeze Okafor" />
        </div>
      ),
    },
    {
      name: "Disabled",
      description: "Input is locked. Cursor changes to not-allowed, value is dimmed.",
      preview: (
        <div className="w-56">
          <Input defaultValue="Locked value" disabled />
        </div>
      ),
    },
    {
      name: "Error",
      description: "Destructive ring and border via aria-invalid. Paired with inline error text below.",
      preview: (
        <div className="flex flex-col gap-1.5 w-56">
          <Input aria-invalid defaultValue="bad value" />
          <p className="text-xs text-destructive">This field is required.</p>
        </div>
      ),
    },
    {
      name: "Read-only",
      description: "Displays a value that cannot be edited. No focus ring shown.",
      preview: (
        <div className="w-56">
          <Input readOnly defaultValue="usr_001" className="opacity-60" />
        </div>
      ),
    },
  ],

  // ── Properties ─────────────────────────────────────────────────────────────
  properties: [
    {
      name: "placeholder",
      values: "string",
      default: "—",
      description: "Hint text shown when the field is empty. Use as a hint, not a label replacement.",
    },
    {
      name: "type",
      values: "text · email · password · number · search · url · file · ...",
      default: "text",
      description: "HTML input type. Controls keyboard, validation behaviour, and built-in browser UI.",
    },
    {
      name: "disabled",
      values: "true · false",
      default: "false",
      description: "Makes the field non-interactive and visually dimmed.",
    },
    {
      name: "readOnly",
      values: "true · false",
      default: "false",
      description: "Displays the value without allowing edits. Unlike disabled, it can still receive focus.",
    },
    {
      name: "aria-invalid",
      values: "true · false",
      default: "false",
      description: "Applies destructive ring/border styling. Set on failed validation. Pair with inline error text.",
    },
  ],

  // ── Content guidance ───────────────────────────────────────────────────────
  contentGuidance: [
    {
      rule: "Placeholder as hint, not label",
      detail: "Placeholder disappears when the user types — never use it as the only label for a field.",
    },
    {
      rule: "Short, concrete placeholder text",
      detail: "\"adaeze@company.com\" is more useful than \"Enter your email here\".",
    },
    {
      rule: "Inline error below the field",
      detail: "Error messages go directly below the input in text-xs text-destructive — not in a toast.",
    },
    {
      rule: "Labels above, never inside",
      detail: "Use a Label component with htmlFor/id — floating labels are not supported in this system.",
    },
  ],

  // ── Behavior ───────────────────────────────────────────────────────────────
  behavior: [
    "Height is fixed at h-10 (40px). Cannot be changed via className.",
    "Auto-grows horizontally within its container. Does not scroll vertically.",
    "File input renders the native browser file picker with consistent styling via the file: CSS variant.",
    "aria-invalid triggers destructive border and ring without any JavaScript — set the attribute and pair with error text.",
    "Passes all native HTML input props through — value, onChange, onBlur, autoFocus, autoComplete, etc.",
  ],

  // ── Spacing ────────────────────────────────────────────────────────────────
  spacing: [
    {
      rule: "Label to input gap",
      detail: "gap-1.5 between the Label and the Input in a flex-col wrapper.",
    },
    {
      rule: "Input to error text gap",
      detail: "gap-1 or gap-1.5 below the Input when showing error text.",
    },
    {
      rule: "Between form fields",
      detail: "gap-4 or gap-6 between field groups in a form.",
    },
    {
      rule: "Input width",
      detail: "Let the parent container control width — Input is w-full by default. Use max-w-xs or max-w-sm to constrain.",
    },
  ],

  // ── Accessibility ──────────────────────────────────────────────────────────
  accessibility: [
    {
      rule: "Always pair with Label",
      detail: "Every input must have a visible Label associated via htmlFor/id. Never rely on placeholder alone.",
    },
    {
      rule: "Use aria-invalid for errors",
      detail: "Set aria-invalid=\"true\" on validation failure. Screen readers announce the field as invalid.",
    },
    {
      rule: "Describe errors with aria-describedby",
      detail: "Give the error message element an id and set aria-describedby on the input to connect them for screen readers.",
    },
    {
      rule: "Keyboard navigation",
      detail: "Inputs receive focus via Tab. Ensure logical DOM order so the tab sequence matches the visual layout.",
    },
  ],

  // ── Do & Don't ─────────────────────────────────────────────────────────────
  doItems: [
    {
      label: "Pair every input with a Label",
      description: "A visible label above the field is required for accessibility and scannability.",
      preview: <DoPairWithLabelPreview />,
    },
    {
      label: "Show validation errors inline",
      description: "Place error text directly below the input using text-xs text-destructive.",
      preview: <DoValidationInlinePreview />,
    },
  ],
  dontItems: [
    {
      label: "Don't use placeholder as the only label",
      description: "Placeholder disappears on input — users forget what the field is for mid-form.",
      preview: <DontPlaceholderAsLabelPreview />,
    },
    {
      label: "Don't use Input for multi-line content",
      description: "Input is single-line. For notes, bios, or descriptions, use Textarea.",
      preview: <DontMultilinePreview />,
    },
  ],

  // ── Examples in context ────────────────────────────────────────────────────
  examplesInContext: [
    {
      title: "Login form",
      description: "Email and password fields with labels and a submit button.",
      preview: <LoginFormExample />,
      code: `<div className="flex flex-col gap-4">
  <div className="flex flex-col gap-1.5">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="adaeze@company.com" />
  </div>
  <div className="flex flex-col gap-1.5">
    <Label htmlFor="password">Password</Label>
    <Input id="password" type="password" placeholder="••••••••" />
  </div>
  <Button size="sm" className="w-full">Sign in</Button>
</div>`,
    },
    {
      title: "Profile settings form",
      description: "Editable name fields alongside a read-only email — communicates permissions clearly.",
      preview: <ProfileSettingsExample />,
      code: `<div className="flex flex-col gap-4">
  <div className="grid grid-cols-2 gap-3">
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="first-name">First name</Label>
      <Input id="first-name" defaultValue="Adaeze" />
    </div>
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="last-name">Last name</Label>
      <Input id="last-name" defaultValue="Okafor" />
    </div>
  </div>
  <div className="flex flex-col gap-1.5">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" defaultValue="adaeze@company.com" readOnly className="opacity-60" />
    <p className="text-xs text-muted-foreground">Contact support to change your email.</p>
  </div>
</div>`,
    },
    {
      title: "Search with inline button",
      description: "Input paired with a ghost icon button — a common search-bar pattern.",
      preview: <SearchWithButtonExample />,
      code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="search">Search by name or email</Label>
  <div className="flex gap-2">
    <Input id="search" placeholder="Emeka Nwachukwu..." className="flex-1" />
    <Button variant="outline" aria-label="Search">
      <RiSearchLine />
    </Button>
  </div>
</div>`,
    },
  ],

  // ── Related components ─────────────────────────────────────────────────────
  relatedComponents: [
    {
      slug: "textarea",
      name: "Textarea",
      description: "Multi-line text field that auto-grows with content.",
      when: "The user needs to enter more than a single line — notes, descriptions, messages.",
    },
    {
      slug: "select",
      name: "Select",
      description: "Dropdown list for choosing one option from a predefined set.",
      when: "The value must come from a fixed list of choices.",
    },
    {
      slug: "field",
      name: "Field",
      description: "Form field wrapper with built-in label, hint, and error slots.",
      when: "You want a single component to own the full label + input + error layout.",
    },
    {
      slug: "input-group",
      name: "Input Group",
      description: "Input with leading or trailing addons (icons, text, buttons).",
      when: "The field needs a currency symbol, unit label, or action button attached.",
    },
  ],

  // ── Design notes ───────────────────────────────────────────────────────────
  designNotes: [
    "Height is locked at h-10. Do not attempt to resize via className.",
    "The bg-input/30 token gives the field a slightly tinted background that adapts to light and dark mode.",
    "For error styling, set aria-invalid on the element — no additional class or variant is needed.",
    "File input styling is handled by the file: CSS variant internally. No wrapper is needed.",
  ],
}
