"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldTitle,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ────────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2 w-full">
    <div className="w-full max-w-sm">
      <FieldGroup>
        <Field orientation="vertical">
          <FieldLabel>Email address</FieldLabel>
          <FieldDescription>We'll send account notifications here.</FieldDescription>
          <Input placeholder="alice@example.com" type="email" />
          <FieldError>Please enter a valid email address.</FieldError>
        </Field>
      </FieldGroup>
    </div>
    <div className="flex items-start flex-wrap gap-6 text-center justify-center">
      {["① FieldLabel", "② FieldDescription", "③ Input (control)", "④ FieldError"].map(label => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="h-5 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

// ── Orientation variant previews ───────────────────────────────────────────────

const VerticalPreview = () => (
  <div className="w-full max-w-sm">
    <FieldGroup>
      <Field orientation="vertical">
        <FieldLabel>Full name</FieldLabel>
        <FieldDescription>Your legal first and last name.</FieldDescription>
        <Input placeholder="Ikedi Eze" />
      </Field>
      <Field orientation="vertical">
        <FieldLabel>Email</FieldLabel>
        <Input placeholder="ikedi@example.com" type="email" />
      </Field>
    </FieldGroup>
  </div>
)

const HorizontalPreview = () => (
  <div className="w-full max-w-sm">
    <FieldGroup>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Marketing emails</FieldTitle>
          <FieldDescription>Receive tips and product updates.</FieldDescription>
        </FieldContent>
        <Switch defaultChecked />
      </Field>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Security alerts</FieldTitle>
          <FieldDescription>Get notified of suspicious activity.</FieldDescription>
        </FieldContent>
        <Checkbox defaultChecked />
      </Field>
    </FieldGroup>
  </div>
)

// ── State previews ─────────────────────────────────────────────────────────────

const WithErrorPreview = () => (
  <div className="w-full max-w-sm">
    <FieldGroup>
      <Field orientation="vertical">
        <FieldLabel>Email</FieldLabel>
        <Input placeholder="alice@example.com" type="email" aria-invalid />
        <FieldError>Please enter a valid email address.</FieldError>
      </Field>
    </FieldGroup>
  </div>
)

const WithDescriptionPreview = () => (
  <div className="w-full max-w-sm">
    <FieldGroup>
      <Field orientation="vertical">
        <FieldLabel>API key name</FieldLabel>
        <FieldDescription>A memorable label to identify this key. Only you can see this.</FieldDescription>
        <Input placeholder="Production server" />
      </Field>
    </FieldGroup>
  </div>
)

const MultipleFieldsPreview = () => (
  <div className="w-full max-w-sm">
    <FieldGroup>
      <Field orientation="vertical">
        <FieldLabel>Full name</FieldLabel>
        <Input placeholder="Ikedi Eze" />
      </Field>
      <Field orientation="vertical">
        <FieldLabel>Email</FieldLabel>
        <Input placeholder="ikedi@example.com" type="email" />
      </Field>
      <Field orientation="vertical">
        <FieldLabel>Phone number</FieldLabel>
        <Input placeholder="+234 800 000 0000" type="tel" />
      </Field>
    </FieldGroup>
  </div>
)

// ── Do / Don't previews ────────────────────────────────────────────────────────

const DoFieldGroupPreview = () => (
  <div className="w-full max-w-sm">
    <FieldGroup>
      <Field orientation="vertical">
        <FieldLabel>Password</FieldLabel>
        <FieldDescription>Must be at least 8 characters.</FieldDescription>
        <Input type="password" placeholder="••••••••" />
      </Field>
    </FieldGroup>
  </div>
)

const DontManualLabelPreview = () => (
  <div className="w-full max-w-sm flex flex-col gap-1">
    {/* Missing Field wrapper — no orientation, error state, or disabled propagation */}
    <p className="text-sm font-medium">Password</p>
    <p className="text-xs text-muted-foreground">Must be at least 8 characters.</p>
    <Input type="password" placeholder="••••••••" />
  </div>
)

// ── Context example previews ───────────────────────────────────────────────────

const ProfileFormExample = () => (
  <div className="w-full max-w-sm rounded-xl border overflow-hidden">
    <div className="px-4 py-3 border-b bg-muted/30">
      <p className="text-sm font-medium">Profile settings</p>
    </div>
    <div className="p-4">
      <FieldGroup>
        <Field orientation="vertical">
          <FieldLabel>Full name</FieldLabel>
          <Input defaultValue="Ikedi Eze" />
        </Field>
        <Field orientation="vertical">
          <FieldLabel>Email address</FieldLabel>
          <FieldDescription>Used for login and notifications.</FieldDescription>
          <Input defaultValue="kasidyray@gmail.com" type="email" />
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Public profile</FieldTitle>
            <FieldDescription>Allow others to view your profile.</FieldDescription>
          </FieldContent>
          <Switch defaultChecked />
        </Field>
      </FieldGroup>
    </div>
  </div>
)

// ── Field design doc ───────────────────────────────────────────────────────────

export const fieldDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  overview: {
    what: "A layout wrapper that groups a form control with its label, description, and error message, and handles orientation, disabled propagation, and error styling.",
    why: "Raw label + input + error message combinations are assembled differently across pages, creating inconsistent gaps, error states, and accessibility wiring. Field standardises the layout and semantic structure.",
    problem: "Without a shared field wrapper, teams build label-input-error trios manually with inconsistent gaps, missing aria wiring, and no built-in disabled state propagation.",
    appearsIn: ["Settings forms", "Profile editing forms", "Invite flows", "Onboarding steps", "Drawer forms"],
  },

  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      { name: "Field", description: "The outer wrapper div with role=\"group\". Controls orientation (vertical/horizontal) and propagates the data-invalid state to children." },
      { name: "FieldGroup", description: "Groups multiple Field components with consistent vertical gap-7 spacing.", optional: true },
      { name: "FieldLabel", description: "Associates a Label with the form control. Supports nested field selection cards." },
      { name: "FieldTitle", description: "A plain text title used in horizontal fields alongside FieldContent. Not an HTML label element.", optional: true },
      { name: "FieldDescription", description: "Muted helper text below the label or alongside the control in horizontal layouts.", optional: true },
      { name: "Control (Input, Checkbox, Switch…)", description: "The actual form control, placed as a direct child of Field after the label/description." },
      { name: "FieldError", description: "Error message rendered below the control. Can receive an errors array or plain children.", optional: true },
      { name: "FieldContent", description: "Used in horizontal orientation to group FieldTitle + FieldDescription on the left side.", optional: true },
    ],
  },

  whenToUse: [
    "Any form field that pairs a control (Input, Select, Checkbox, Switch) with a label and optional description or error.",
    "Settings pages where fields need consistent vertical or horizontal orientation.",
    "Horizontal layout for Checkbox and Switch fields where the label/description should sit beside the control.",
    "Anywhere FieldError needs to appear below a control with consistent styling.",
  ],

  whenNotToUse: [
    "For standalone labels not associated with a control — use Label directly.",
    "For read-only display values — use a description list or text elements instead.",
    "For toolbar filters or quick-action controls that aren't part of a form.",
  ],

  variants: [
    {
      name: "Vertical (default)",
      description: "Label stacks above the control. Standard for text inputs, selects, and textareas.",
      when: "Text inputs, selects, textareas, date pickers",
      preview: <VerticalPreview />,
      fullWidth: true,
    },
    {
      name: "Horizontal",
      description: "FieldContent (title + description) on the left, boolean control (Checkbox or Switch) on the right.",
      when: "Checkbox and Switch settings fields",
      preview: <HorizontalPreview />,
      fullWidth: true,
    },
  ],

  states: [
    {
      name: "With description",
      description: "FieldDescription provides helper text between the label and the control. Muted, smaller than body text.",
      preview: <WithDescriptionPreview />,
    },
    {
      name: "With error",
      description: "FieldError appears below the control. The field gets data-invalid styling that turns the label red.",
      preview: <WithErrorPreview />,
    },
    {
      name: "Multiple fields in FieldGroup",
      description: "FieldGroup wraps multiple Fields with consistent gap-7 vertical spacing.",
      preview: <MultipleFieldsPreview />,
    },
  ],

  properties: [
    {
      name: "orientation (Field)",
      values: "vertical · horizontal · responsive",
      default: "vertical",
      description: "vertical: label above control. horizontal: label+description left, control right. responsive: vertical on mobile, horizontal on md+.",
    },
    {
      name: "errors (FieldError)",
      values: "Array<{ message?: string } | undefined>",
      default: "—",
      description: "Array of validation errors. FieldError deduplicates and renders a single message or a bulleted list. Alternatively pass plain children.",
    },
    {
      name: "children (FieldError)",
      values: "ReactNode",
      default: "—",
      description: "Render a custom error message as children instead of using the errors prop.",
    },
  ],

  contentGuidance: [
    {
      rule: "FieldLabel for inputs, FieldTitle for horizontal boolean fields",
      detail: "FieldLabel is an HTML label element and creates an accessible association. FieldTitle is a plain div — it doesn't associate with the control and should only be used with FieldContent in horizontal layouts.",
    },
    {
      rule: "FieldDescription: one line of context",
      detail: "Keep descriptions to one sentence. Explain why the field exists or what format to use. Don't repeat what the label already says.",
    },
    {
      rule: "FieldError: plain, specific message",
      detail: "\"Please enter a valid email address\" is better than \"Invalid input\". Always explain what's wrong and how to fix it.",
    },
  ],

  behavior: [
    "Field renders with role=\"group\" — the orientation and disabled state are set via data attributes on the wrapper.",
    "When data-invalid=\"true\" is set on the Field, the label colour shifts to destructive automatically.",
    "FieldError with the errors prop deduplicates identical error messages and renders a bullet list for multiple distinct errors.",
    "In horizontal orientation, the control (Checkbox/Switch) is aligned to the right with items-center on the Field row.",
    "FieldGroup uses gap-7 between fields by default — do not add extra margin between individual Fields.",
  ],

  spacing: [
    { rule: "Field internal gap", detail: "gap-2 between label, description, control, and error (set on Field via flex flex-col gap-2)." },
    { rule: "FieldGroup gap", detail: "gap-7 between Field items within a FieldGroup." },
    { rule: "FieldDescription sizing", detail: "text-sm leading-normal text-muted-foreground. One line of helper text at standard body size." },
    { rule: "FieldError sizing", detail: "text-sm font-normal text-destructive — same size as description, different colour." },
  ],

  accessibility: [
    {
      rule: "FieldLabel creates the accessible association",
      detail: "FieldLabel wraps the Label component. It must be associated with the control via htmlFor/id or by nesting the control inside it.",
    },
    {
      rule: "FieldError uses role=\"alert\"",
      detail: "FieldError renders with role=\"alert\" so validation errors are announced by screen readers when they appear.",
    },
    {
      rule: "Horizontal fields: use FieldTitle not FieldLabel for boolean controls",
      detail: "Checkbox and Switch have their own accessible names. FieldTitle provides visual grouping context without double-labelling the control.",
    },
    {
      rule: "Disabled state propagation",
      detail: "Set data-disabled=\"true\" on Field to propagate the disabled visual style to the label. Still disable the actual control separately.",
    },
  ],

  doItems: [
    {
      label: "Use Field to wrap all form controls",
      description: "Field provides consistent gap, error state, orientation, and label association. Don't assemble label + input + error manually.",
      preview: <DoFieldGroupPreview />,
    },
    {
      label: "Use horizontal orientation for Checkbox and Switch",
      description: "Boolean controls need their title and description beside them, not above. Use orientation=\"horizontal\" with FieldContent.",
      preview: <HorizontalPreview />,
    },
  ],

  dontItems: [
    {
      label: "Don't build label + input + description manually",
      description: "Manual field assembly produces inconsistent gaps, missing error state, and no disabled propagation.",
      preview: <DontManualLabelPreview />,
    },
    {
      label: "Don't use FieldLabel in horizontal fields",
      description: "In horizontal orientation, use FieldTitle inside FieldContent. FieldLabel is an HTML label element and will double-label the Checkbox or Switch.",
      preview: (
        <div className="w-full max-w-sm">
          <FieldGroup>
            {/* Wrong: FieldLabel in a horizontal field with a Switch */}
            <Field orientation="horizontal">
              <FieldLabel>Marketing emails</FieldLabel>
              <Switch />
            </Field>
          </FieldGroup>
        </div>
      ),
    },
  ],

  examplesInContext: [
    {
      title: "Profile settings form",
      description: "Mixed vertical (text inputs) and horizontal (Switch) fields in a card. FieldGroup manages the spacing consistently.",
      preview: <ProfileFormExample />,
      code: `<FieldGroup>
  <Field orientation="vertical">
    <FieldLabel>Full name</FieldLabel>
    <Input defaultValue="Ikedi Eze" />
  </Field>
  <Field orientation="vertical">
    <FieldLabel>Email address</FieldLabel>
    <FieldDescription>Used for login and notifications.</FieldDescription>
    <Input defaultValue="kasidyray@gmail.com" type="email" />
  </Field>
  <Field orientation="horizontal">
    <FieldContent>
      <FieldTitle>Public profile</FieldTitle>
      <FieldDescription>Allow others to view your profile.</FieldDescription>
    </FieldContent>
    <Switch defaultChecked />
  </Field>
</FieldGroup>`,
    },
    {
      title: "Field with validation error",
      description: "FieldError appears below the control when validation fails. The label automatically turns destructive.",
      preview: <WithErrorPreview />,
      code: `<Field orientation="vertical">
  <FieldLabel>Email</FieldLabel>
  <Input placeholder="alice@example.com" type="email" aria-invalid />
  <FieldError>Please enter a valid email address.</FieldError>
</Field>

// Or with an errors array (e.g. from react-hook-form):
<Field orientation="vertical">
  <FieldLabel>Email</FieldLabel>
  <Input {...register("email")} />
  <FieldError errors={[{ message: errors.email?.message }]} />
</Field>`,
    },
  ],

  relatedComponents: [
    {
      slug: "input",
      name: "Input",
      description: "The text input control.",
      when: "Use Input directly when you don't need a label, description, or error — e.g. a standalone search bar.",
    },
    {
      slug: "label",
      name: "Label",
      description: "A standalone HTML label element.",
      when: "Use Label directly for simple one-off label + control pairs that don't need description or error text.",
    },
    {
      slug: "checkbox",
      name: "Checkbox",
      description: "Binary on/off selection control.",
      when: "Use inside a Field with orientation=\"horizontal\" and FieldContent for settings-style checkbox fields.",
    },
  ],

  designNotes: [
    "Field uses gap-2 for its internal flex-col layout. Don't add extra margin between label, description, input, and error — they're already spaced correctly.",
    "FieldGroup gap-7 is intentionally larger than Field's internal gap-2 — it creates clear visual separation between fields without being too open.",
    "In horizontal orientation, the Checkbox or Switch aligns to items-center with a mt-px offset when inside FieldContent to optically align with the title text.",
    "FieldError renders null when there's no content or no matching errors — it's safe to always include in the markup.",
  ],
}
