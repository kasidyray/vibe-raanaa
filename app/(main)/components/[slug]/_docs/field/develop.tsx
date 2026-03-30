"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Previews ───────────────────────────────────────────────────────────────────

const BasicPreview = () => (
  <div className="w-full max-w-sm">
    <FieldGroup>
      <Field orientation="vertical">
        <FieldLabel>Full name</FieldLabel>
        <FieldDescription>Your legal first and last name.</FieldDescription>
        <Input placeholder="Ikedi Eze" />
      </Field>
      <Field orientation="vertical">
        <FieldLabel>Email address</FieldLabel>
        <Input placeholder="ikedi@example.com" type="email" />
      </Field>
    </FieldGroup>
  </div>
)

const ErrorPreview = () => (
  <div className="w-full max-w-sm">
    <FieldGroup>
      <Field orientation="vertical">
        <FieldLabel>Email address</FieldLabel>
        <Input placeholder="alice@example.com" type="email" aria-invalid />
        <FieldError>Please enter a valid email address.</FieldError>
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
          <FieldDescription>Receive tips and product updates via email.</FieldDescription>
        </FieldContent>
        <Switch defaultChecked />
      </Field>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Security alerts</FieldTitle>
          <FieldDescription>Get notified of suspicious login activity.</FieldDescription>
        </FieldContent>
        <Checkbox defaultChecked />
      </Field>
    </FieldGroup>
  </div>
)

const ErrorsArrayPreview = () => (
  <div className="w-full max-w-sm">
    <FieldGroup>
      <Field orientation="vertical">
        <FieldLabel>Password</FieldLabel>
        <Input type="password" placeholder="••••••••" aria-invalid />
        <FieldError errors={[
          { message: "Must be at least 8 characters." },
          { message: "Must contain at least one number." },
        ]} />
      </Field>
    </FieldGroup>
  </div>
)

// ── Field develop doc ──────────────────────────────────────────────────────────

export const fieldDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
      "npx shadcn add @raana/label",
    ],
    command: "npx shadcn add @raana/field",
    importPath: `import {
  Field, FieldGroup, FieldLabel, FieldTitle, FieldContent,
  FieldDescription, FieldError,
} from "@/components/ui/field"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "Field depends on the Label and Separator components — install them first.",
      "For form validation, pass an errors array from react-hook-form or any validation library to FieldError's errors prop.",
    ],
  },

  basicUsage: `import {
  Field, FieldGroup, FieldLabel, FieldDescription, FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

// Vertical field with description
<Field orientation="vertical">
  <FieldLabel>Email address</FieldLabel>
  <FieldDescription>We'll send account notifications here.</FieldDescription>
  <Input placeholder="ikedi@example.com" type="email" />
</Field>

// With validation error
<Field orientation="vertical">
  <FieldLabel>Email address</FieldLabel>
  <Input placeholder="ikedi@example.com" aria-invalid />
  <FieldError>Please enter a valid email address.</FieldError>
</Field>

// Multiple fields with consistent spacing
<FieldGroup>
  <Field orientation="vertical">
    <FieldLabel>Full name</FieldLabel>
    <Input placeholder="Ikedi Eze" />
  </Field>
  <Field orientation="vertical">
    <FieldLabel>Email</FieldLabel>
    <Input placeholder="ikedi@example.com" type="email" />
  </Field>
</FieldGroup>`,

  codeExamples: [
    {
      title: "Vertical fields with FieldGroup",
      description: "The standard pattern for text input forms. FieldGroup wraps multiple Fields with consistent gap-7 spacing.",
      preview: <BasicPreview />,
      code: `<FieldGroup>
  <Field orientation="vertical">
    <FieldLabel>Full name</FieldLabel>
    <FieldDescription>Your legal first and last name.</FieldDescription>
    <Input placeholder="Ikedi Eze" />
  </Field>
  <Field orientation="vertical">
    <FieldLabel>Email address</FieldLabel>
    <Input placeholder="ikedi@example.com" type="email" />
  </Field>
</FieldGroup>`,
    },
    {
      title: "Field with validation error",
      description: "FieldError renders below the control with destructive styling. The FieldLabel turns red automatically when data-invalid is set.",
      preview: <ErrorPreview />,
      code: `<Field orientation="vertical">
  <FieldLabel>Email address</FieldLabel>
  <Input placeholder="alice@example.com" type="email" aria-invalid />
  <FieldError>Please enter a valid email address.</FieldError>
</Field>`,
    },
    {
      title: "Horizontal orientation (Checkbox / Switch)",
      description: "Use orientation=\"horizontal\" with FieldContent for boolean controls. FieldTitle + FieldDescription sit on the left; the control aligns to the right.",
      preview: <HorizontalPreview />,
      code: `<FieldGroup>
  <Field orientation="horizontal">
    <FieldContent>
      <FieldTitle>Marketing emails</FieldTitle>
      <FieldDescription>Receive tips and product updates via email.</FieldDescription>
    </FieldContent>
    <Switch defaultChecked />
  </Field>
  <Field orientation="horizontal">
    <FieldContent>
      <FieldTitle>Security alerts</FieldTitle>
      <FieldDescription>Get notified of suspicious login activity.</FieldDescription>
    </FieldContent>
    <Checkbox defaultChecked />
  </Field>
</FieldGroup>`,
    },
    {
      title: "Multiple errors via errors prop",
      description: "Pass an errors array from a validation library. FieldError deduplicates and renders a bulleted list when there are multiple distinct messages.",
      preview: <ErrorsArrayPreview />,
      code: `// With react-hook-form:
const { register, formState: { errors } } = useForm()

<Field orientation="vertical">
  <FieldLabel>Password</FieldLabel>
  <Input type="password" {...register("password")} />
  <FieldError errors={[{ message: errors.password?.message }]} />
</Field>

// Inline errors array:
<FieldError errors={[
  { message: "Must be at least 8 characters." },
  { message: "Must contain at least one number." },
]} />`,
    },
  ],

  apiReference: [
    {
      name: "orientation (Field)",
      values: `"vertical" | "horizontal" | "responsive"`,
      default: `"vertical"`,
      description: "vertical: label above control. horizontal: content left, control right. responsive: vertical on mobile, horizontal on md+.",
    },
    {
      name: "children (FieldError)",
      values: "ReactNode",
      default: "—",
      description: "Render a plain error string as children. Preferred for static validation messages.",
    },
    {
      name: "errors (FieldError)",
      values: "Array<{ message?: string } | undefined>",
      default: "—",
      description: "Array from a validation library. FieldError deduplicates messages and renders a bullet list for multiple distinct errors.",
    },
  ],

  accessibility: [
    {
      rule: "FieldLabel provides the accessible name",
      detail: "FieldLabel wraps the Label component. Pair it with the control via htmlFor/id or by nesting the control inside the label.",
    },
    {
      rule: "FieldError uses role=\"alert\"",
      detail: "Validation errors are announced by screen readers immediately when FieldError renders. No extra aria-live region is needed.",
    },
    {
      rule: "Use FieldTitle (not FieldLabel) in horizontal fields",
      detail: "Checkbox and Switch have their own accessible names. FieldTitle is a plain div that won't double-label the control.",
    },
    {
      rule: "Pass aria-invalid to the control when invalid",
      detail: "Field manages visual error state but the control still needs aria-invalid for screen readers to announce the field as invalid.",
    },
  ],
}
