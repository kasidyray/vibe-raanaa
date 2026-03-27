"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Previews ──────────────────────────────────────────────────────────────────

const BasicPreview = () => (
  <div className="w-64">
    <Textarea placeholder="Enter your message..." />
  </div>
)

const WithLabelPreview = () => (
  <div className="flex flex-col gap-1.5 w-64">
    <Label htmlFor="dev-ta-bio">Bio</Label>
    <Textarea id="dev-ta-bio" placeholder="Tell us about yourself..." />
    <p className="text-xs text-muted-foreground">Shown on your public profile.</p>
  </div>
)

const ErrorStatePreview = () => (
  <div className="flex flex-col gap-1.5 w-64">
    <Label htmlFor="dev-ta-err">Message</Label>
    <Textarea
      id="dev-ta-err"
      aria-invalid
      aria-describedby="ta-err-msg"
      placeholder="Describe your issue..."
    />
    <p id="ta-err-msg" className="text-xs text-destructive">Please describe your issue before submitting.</p>
  </div>
)

const AutoGrowPreview = () => (
  <div className="flex flex-col gap-1.5 w-64">
    <Label htmlFor="dev-ta-grow">Notes</Label>
    <Textarea
      id="dev-ta-grow"
      defaultValue={"This is the first line.\nThis is the second line.\nAnd this is the third — the field has grown to fit."}
    />
  </div>
)

const DisabledPreview = () => (
  <div className="flex flex-col gap-1.5 w-64">
    <Label htmlFor="dev-ta-dis">Submitted feedback</Label>
    <Textarea
      id="dev-ta-dis"
      defaultValue="The onboarding flow was clear and the team was very responsive."
      disabled
    />
  </div>
)

// ── Textarea develop doc ──────────────────────────────────────────────────────

export const textareaDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/textarea",
    importPath: `import { Textarea } from "@/components/ui/textarea"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "For form labels, also install the Label component: npx shadcn add @raana/label",
    ],
  },

  basicUsage: `import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Basic
<Textarea placeholder="Enter your message..." />

// With label (recommended)
<div className="flex flex-col gap-1.5">
  <Label htmlFor="notes">Notes</Label>
  <Textarea id="notes" placeholder="Add a note..." />
</div>

// Error state
<Textarea aria-invalid placeholder="Required" />

// Disabled
<Textarea disabled defaultValue="Locked content" />`,

  codeExamples: [
    {
      title: "Basic textarea",
      description: "The default textarea. Starts at min-h-16 and auto-grows as the user types.",
      preview: <BasicPreview />,
      code: `<Textarea placeholder="Enter your message..." />`,
    },
    {
      title: "With label and hint",
      description: "Always pair Textarea with a Label. Use htmlFor/id to associate them. Hint text goes below.",
      preview: <WithLabelPreview />,
      code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="bio">Bio</Label>
  <Textarea id="bio" placeholder="Tell us about yourself..." />
  <p className="text-xs text-muted-foreground">Shown on your public profile.</p>
</div>`,
    },
    {
      title: "Error state",
      description: "Set aria-invalid to apply destructive styling. Use aria-describedby to link the error message.",
      preview: <ErrorStatePreview />,
      code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="message">Message</Label>
  <Textarea
    id="message"
    aria-invalid
    aria-describedby="message-error"
    placeholder="Describe your issue..."
  />
  <p id="message-error" className="text-xs text-destructive">
    Please describe your issue before submitting.
  </p>
</div>`,
    },
    {
      title: "Auto-grow with content",
      description: "field-sizing-content makes the textarea grow to fit its content automatically.",
      preview: <AutoGrowPreview />,
      code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="notes">Notes</Label>
  <Textarea
    id="notes"
    defaultValue={"Line one\\nLine two\\nLine three"}
  />
</div>`,
    },
    {
      title: "Disabled",
      description: "The textarea shows its value but cannot be edited. cursor-not-allowed is applied.",
      preview: <DisabledPreview />,
      code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="feedback">Submitted feedback</Label>
  <Textarea
    id="feedback"
    defaultValue="The onboarding flow was clear and the team was very responsive."
    disabled
  />
</div>`,
    },
  ],

  apiReference: [
    {
      name: "placeholder",
      values: "string",
      default: "—",
      description: "Hint text shown when empty. Pair with a visible Label — never rely on placeholder alone.",
    },
    {
      name: "disabled",
      values: "boolean",
      default: "false",
      description: "Makes the field non-interactive. Applies cursor-not-allowed and opacity.",
    },
    {
      name: "aria-invalid",
      values: "boolean | \"true\" | \"false\"",
      default: "—",
      description: "Applies destructive border and ring on validation failure. Pair with aria-describedby and error text.",
    },
    {
      name: "rows",
      values: "number",
      default: "—",
      description: "Hint for initial visible rows. field-sizing-content overrides this as the user types.",
    },
    {
      name: "value / defaultValue",
      values: "string",
      default: "—",
      description: "Controlled (value + onChange) or uncontrolled (defaultValue) value binding.",
    },
    {
      name: "onChange",
      values: "React.ChangeEventHandler<HTMLTextAreaElement>",
      default: "—",
      description: "Change handler for controlled usage.",
    },
    {
      name: "className",
      values: "string",
      default: "—",
      description: "Additional CSS classes. Use min-h-* to set a custom starting height. Add resize-none to hide the handle.",
    },
  ],

  accessibility: [
    {
      rule: "Always use Label with htmlFor",
      detail: "Every Textarea must have a visible Label associated via htmlFor/id. Placeholder alone is not sufficient.",
    },
    {
      rule: "aria-invalid for errors",
      detail: "Set aria-invalid=\"true\" when a field fails validation. Screen readers announce the field as invalid.",
    },
    {
      rule: "aria-describedby for error messages",
      detail: "Give the error <p> an id and set aria-describedby on the Textarea so screen readers read the message after the field.",
    },
    {
      rule: "Do not suppress auto-grow without reason",
      detail: "If you constrain height via max-h-*, the content will scroll inside the box — ensure the field is still keyboard-navigable.",
    },
  ],
}
