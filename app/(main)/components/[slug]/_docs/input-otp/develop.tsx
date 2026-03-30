"use client"

import * as React from "react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import type { ComponentDevDocData } from "../../component-doc-types"

const BasicPreview = () => (
  <div className="flex justify-center">
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  </div>
)

const SeparatorPreview = () => (
  <div className="flex justify-center">
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  </div>
)

const ControlledPreview = () => {
  const [value, setValue] = React.useState("")
  return (
    <div className="flex flex-col items-center gap-3">
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-xs text-muted-foreground">
        {value.length === 6 ? "Code complete" : `${value.length}/6 digits entered`}
      </p>
    </div>
  )
}

const FourDigitPreview = () => (
  <div className="flex justify-center">
    <InputOTP maxLength={4}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  </div>
)

const DisabledPreview = () => (
  <div className="flex justify-center">
    <InputOTP maxLength={6} disabled>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  </div>
)

export const inputOtpDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/input-otp",
    importPath: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "Built on the input-otp library. maxLength must exactly match the number of InputOTPSlot elements.",
      "InputOTPSlot requires an index prop (0-based). The first slot is index={0}.",
    ],
  },

  basicUsage: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"

// Basic 6-digit OTP
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>

// With onChange — auto-submit when complete
<InputOTP
  maxLength={6}
  onChange={(value) => {
    if (value.length === 6) handleVerify(value)
  }}
>
  ...
</InputOTP>`,

  codeExamples: [
    {
      title: "Basic 6-digit OTP",
      description: "Six slots in a single group. The most common pattern for email and TOTP verification codes.",
      preview: <BasicPreview />,
      code: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
    },
    {
      title: "6-digit with separator (3–3)",
      description: "Split into two groups of three with a dash. Use when the code is displayed in grouped format in the SMS (e.g. 123–456).",
      preview: <SeparatorPreview />,
      code: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
    },
    {
      title: "Controlled with completion state",
      description: "Use value + onChange to track input. Detect completion at value.length === maxLength to auto-submit.",
      preview: <ControlledPreview />,
      code: `const [value, setValue] = React.useState("")

<InputOTP
  maxLength={6}
  value={value}
  onChange={(val) => {
    setValue(val)
    if (val.length === 6) handleVerify(val)
  }}
>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
    },
    {
      title: "4-digit PIN",
      description: "Four slots for a shorter PIN code. Adjust maxLength and slot count together.",
      preview: <FourDigitPreview />,
      code: `<InputOTP maxLength={4}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`,
    },
    {
      title: "Disabled state",
      description: "Pass disabled to InputOTP to make all slots non-interactive. The container dims to 50% opacity.",
      preview: <DisabledPreview />,
      code: `<InputOTP maxLength={6} disabled>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
    },
  ],

  apiReference: [
    {
      name: "maxLength (InputOTP)",
      values: "number",
      default: "—",
      description: "Total number of input characters. Must match the number of InputOTPSlot elements.",
    },
    {
      name: "value (InputOTP)",
      values: "string",
      default: "—",
      description: "Controlled value. Use with onChange for controlled input.",
    },
    {
      name: "onChange (InputOTP)",
      values: "(value: string) => void",
      default: "—",
      description: "Called on each keystroke with the current string value. Use to detect completion (value.length === maxLength).",
    },
    {
      name: "disabled (InputOTP)",
      values: "boolean",
      default: "false",
      description: "Disables all slots. Container gets opacity-50 and cursor-not-allowed.",
    },
    {
      name: "index (InputOTPSlot)",
      values: "number",
      default: "—",
      description: "Required. Zero-based position of this slot in the sequence.",
    },
  ],

  accessibility: [
    {
      rule: "Hidden native input handles screen readers",
      detail: "input-otp renders a real hidden <input>. Screen readers interact with it directly, not the visual slots.",
    },
    {
      rule: "Label the OTP field",
      detail: "Wrap InputOTP in a labelled form group or add aria-label='Verification code' so screen readers announce the field purpose.",
    },
  ],
}
