"use client"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import type { ComponentDocData } from "../../component-doc-types"

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2 w-full">
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
    <div className="flex items-start flex-wrap gap-8 text-center justify-center">
      {["① InputOTP root", "② InputOTPGroup", "③ InputOTPSlot", "④ InputOTPSeparator"].map(label => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="h-5 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

const SixDigitPreview = () => (
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
)

const SeparatorPreview = () => (
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
)

const FourDigitPreview = () => (
  <InputOTP maxLength={4}>
    <InputOTPGroup>
      <InputOTPSlot index={0} />
      <InputOTPSlot index={1} />
      <InputOTPSlot index={2} />
      <InputOTPSlot index={3} />
    </InputOTPGroup>
  </InputOTP>
)

export const inputOtpDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  overview: {
    what: "A segmented one-time-password input that splits a numeric code across individual character slots.",
    why: "OTP codes have a strict format (typically 4–6 digits). Breaking the field into individual slots reduces input error, communicates progress as the user types, and signals that each character has a specific position.",
    problem: "A plain text input gives no feedback on code format or input progress. Segmented slots visually guide the user slot-by-slot and prevent partial code submission.",
    appearsIn: ["Two-factor authentication flows", "Email verification on sign-up", "Phone number confirmation", "Magic link code entry"],
  },

  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      { name: "InputOTP", description: "Root component. Accepts maxLength matching the total number of slots. Manages the hidden input and slot state via OTPInputContext." },
      { name: "InputOTPGroup", description: "Flex container for a set of slots. Use multiple groups with a separator between them for formatted codes (e.g., 3–3 split)." },
      { name: "InputOTPSlot", description: "Individual character slot. Requires an index prop (0-based). Active slot shows an underline caret (border-b-2 border-b-primary)." },
      { name: "InputOTPSeparator", description: "Visual dash rendered between groups. Uses RiSubtractLine internally. role='separator'." },
    ],
  },

  whenToUse: [
    "For numeric verification codes (email OTP, SMS, 2FA authenticator).",
    "When the code has a known, fixed length (4 or 6 digits).",
    "When visual progress through each character matters (e.g., auto-submit on complete).",
  ],

  whenNotToUse: [
    "For variable-length codes or alphanumeric passwords — use a standard Input instead.",
    "For PINs with more than 8 digits — too many slots become unwieldy.",
    "When copy-paste is the primary input method — OTP input supports paste, but if code entry is purely programmatic, use a hidden input.",
  ],

  variants: [
    {
      name: "6-digit (single group)",
      description: "All six slots in one group. Used for email OTP codes and TOTP authenticator codes.",
      when: "Email verification, authenticator app codes",
      preview: <SixDigitPreview />,
    },
    {
      name: "6-digit with separator (3–3)",
      description: "Two groups of three separated by a dash. Common for SMS codes displayed in grouped format.",
      when: "SMS verification codes, invite codes",
      preview: <SeparatorPreview />,
    },
    {
      name: "4-digit PIN",
      description: "Four slots in a single group. Used for short numeric PINs.",
      when: "App PIN, bank-style numeric PIN",
      preview: <FourDigitPreview />,
    },
  ],

  states: [],

  properties: [
    {
      name: "maxLength (InputOTP)",
      values: "number",
      default: "—",
      description: "Total number of characters. Must match the number of InputOTPSlot elements exactly.",
    },
    {
      name: "index (InputOTPSlot)",
      values: "number",
      default: "—",
      description: "Zero-based position of this slot. Required. Slot 0 is the leftmost character.",
    },
    {
      name: "onChange (InputOTP)",
      values: "(value: string) => void",
      default: "—",
      description: "Called on every keystroke with the current value string. Use to trigger auto-submit when value.length === maxLength.",
    },
  ],

  contentGuidance: [
    {
      rule: "maxLength must match slot count",
      detail: "If maxLength={6} and you render only 5 slots, the 6th character is silently discarded. Always count your slots.",
    },
    {
      rule: "Use InputOTPSeparator only between groups",
      detail: "Place the separator between two InputOTPGroup elements. Do not put it inside a group.",
    },
    {
      rule: "Auto-submit on complete",
      detail: "Check value.length === maxLength in onChange and submit the form automatically — users don't expect to press Enter for a 6-digit code.",
    },
  ],

  behavior: [
    "Typing moves focus slot-by-slot automatically — no manual focus management needed.",
    "Backspace moves focus to the previous slot.",
    "Paste fills all slots from the cursor position.",
    "Active slot shows an underline caret (border-b-2 border-b-primary) instead of a bounding box.",
    "Disabled state: the root container gets opacity-50 and cursor-not-allowed.",
    "aria-invalid on the group triggers a destructive ring around the slot group.",
  ],

  spacing: [
    { rule: "Gap between slots", detail: "gap-2 between slots within a group (set on InputOTPGroup)." },
    { rule: "Slot size", detail: "Slots are size-10 (40×40px) by default." },
    { rule: "Separator spacing", detail: "InputOTPSeparator adds no extra margin — the gap between groups is controlled by the flex container." },
  ],

  accessibility: [
    {
      rule: "Hidden native input is accessible",
      detail: "input-otp renders a real hidden input. Screen readers interact with the native input, not the visual slots.",
    },
    {
      rule: "Announce verification context",
      detail: "Wrap InputOTP in a labelled region or add an aria-label so screen readers announce 'Enter verification code' before the field.",
    },
  ],

  doItems: [
    {
      label: "Auto-submit on completion",
      description: "Use onChange to detect when value.length === maxLength and submit automatically — it's the expected UX for OTP fields.",
      preview: <SixDigitPreview />,
    },
    {
      label: "Group digits visually for formatted codes",
      description: "Use two InputOTPGroups with a separator to mirror the grouped format users see in SMS messages (e.g. 123–456).",
      preview: <SeparatorPreview />,
    },
  ],

  dontItems: [
    {
      label: "Don't mismatch maxLength and slot count",
      description: "maxLength={6} with only 5 slots means the last character is invisible. Always count slots carefully.",
      preview: (
        <div className="flex items-center gap-2 text-xs text-muted-foreground p-4 rounded-xl border">
          maxLength must equal the number of InputOTPSlot elements.
        </div>
      ),
    },
  ],

  examplesInContext: [
    {
      title: "Email OTP verification",
      description: "6-digit code entry with auto-submit when all slots are filled.",
      preview: <SixDigitPreview />,
      code: `const [value, setValue] = React.useState("")

function onComplete(val: string) {
  // val is the full 6-char string — submit the form
  verifyCode(val)
}

<InputOTP maxLength={6} value={value} onChange={setValue}>
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
      title: "SMS code (3–3 grouped)",
      description: "Two groups of three with a dash separator — matches the visual format of SMS codes.",
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
  ],

  relatedComponents: [
    {
      slug: "input",
      name: "Input",
      description: "Single-line text field.",
      when: "Use Input for variable-length codes or alphanumeric passwords. Use InputOTP for fixed-length numeric codes.",
    },
  ],

  designNotes: [
    "Active slot shows a bottom-border caret (underline style), not a box ring — this is intentional.",
    "Slots are size-10 — large enough for comfortable touch input on mobile.",
    "InputOTPSeparator renders a dash icon — it is purely decorative and has role='separator'.",
  ],
}
