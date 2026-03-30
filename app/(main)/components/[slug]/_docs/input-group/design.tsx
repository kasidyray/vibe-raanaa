"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  RiAtLine,
  RiCopyleftLine,
  RiEyeLine,
  RiEyeOffLine,
  RiGlobalLine,
  RiLockLine,
  RiMailLine,
  RiMapPinLine,
  RiMicLine,
  RiPhoneLine,
  RiSearchLine,
  RiSendPlaneLine,
  RiUserLine,
} from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ────────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2 w-full">
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText><RiSearchLine /></InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="Search anything…" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="xs">Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
    <div className="flex items-start flex-wrap gap-6 text-center justify-center">
      {[
        "① InputGroup (container)",
        "② InputGroupAddon (inline-start)",
        "③ InputGroupInput",
        "④ InputGroupAddon (inline-end)",
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

const IconAddonPreview = () => (
  <div className="flex flex-col gap-3 w-full max-w-sm">
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText><RiSearchLine /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search…" />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText><RiMailLine /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput type="email" placeholder="Email address" />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText><RiUserLine /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Username" />
    </InputGroup>
  </div>
)

const TextAddonPreview = () => (
  <div className="flex flex-col gap-3 w-full max-w-sm">
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText>$</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="0.00" type="number" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>USD</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="yoursite.com" />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText><RiAtLine /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="username" />
    </InputGroup>
  </div>
)

const ButtonAddonPreview = () => (
  <div className="flex flex-col gap-3 w-full max-w-sm">
    <InputGroup>
      <InputGroupInput placeholder="Enter your email to subscribe" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="xs">Subscribe</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText><RiSearchLine /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search customers…" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="xs">Search</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
)

const BlockAddonPreview = () => (
  <div className="flex flex-col gap-3 w-full max-w-sm">
    <InputGroup>
      <InputGroupAddon align="block-start">
        <InputGroupText><RiMailLine />Message</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea placeholder="Write your message here…" rows={3} />
    </InputGroup>
    <InputGroup>
      <InputGroupInput placeholder="Type a command…" />
      <InputGroupAddon align="block-end">
        <InputGroupText className="text-xs text-muted-foreground/60">
          Press ⌘K to open command palette
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  </div>
)

// ── State previews ─────────────────────────────────────────────────────────────

const PasswordTogglePreview = () => {
  const [show, setShow] = useState(false)
  return (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText><RiLockLine /></InputGroupText>
        </InputGroupAddon>
        <InputGroupInput type={show ? "text" : "password"} placeholder="Enter password" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-sm"
            onClick={() => setShow(v => !v)}
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <RiEyeOffLine /> : <RiEyeLine />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

const InvalidPreview = () => (
  <div className="w-full max-w-sm">
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText><RiMailLine /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput type="email" aria-invalid defaultValue="not-an-email" />
    </InputGroup>
  </div>
)

const DisabledPreview = () => (
  <div className="w-full max-w-sm" data-disabled="true">
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText><RiSearchLine /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search disabled" disabled />
    </InputGroup>
  </div>
)

// ── Do / Don't previews ────────────────────────────────────────────────────────

const DoInputGroupPreview = () => (
  <div className="w-full max-w-sm">
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText>$</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="0.00" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>USD</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  </div>
)

const DontRawInputPreview = () => (
  <div className="w-full max-w-sm flex items-center gap-0 rounded-md border border-input overflow-hidden">
    <span className="px-3 text-sm text-muted-foreground border-r bg-muted/20">$</span>
    <input className="flex-1 h-10 px-3 text-sm bg-transparent outline-none" placeholder="0.00" />
    <span className="px-3 text-sm text-muted-foreground border-l bg-muted/20">USD</span>
  </div>
)

// ── Context examples ───────────────────────────────────────────────────────────

const MessageComposerExample = () => (
  <div className="w-full max-w-sm rounded-xl border overflow-hidden">
    <div className="px-4 py-3 border-b bg-muted/30">
      <p className="text-sm font-medium">New message</p>
    </div>
    <div className="p-4 flex flex-col gap-3">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText><RiUserLine /></InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="To: recipient@example.com" type="email" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="block-start">
          <InputGroupText><RiMailLine />Message</InputGroupText>
        </InputGroupAddon>
        <InputGroupTextarea placeholder="Write your message…" rows={4} />
        <InputGroupAddon align="block-end">
          <div className="flex justify-end">
            <InputGroupButton size="xs" variant="default">
              <RiSendPlaneLine />Send
            </InputGroupButton>
          </div>
        </InputGroupAddon>
      </InputGroup>
    </div>
  </div>
)

const PhoneInputExample = () => (
  <div className="w-full max-w-sm">
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium">Phone number</label>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupButton size="xs" variant="ghost">
            🇳🇬 +234
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupInput placeholder="800 000 0000" type="tel" />
      </InputGroup>
    </div>
  </div>
)

// ── InputGroup design doc ──────────────────────────────────────────────────────

export const inputGroupDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  overview: {
    what: "A composite input container that attaches icons, text prefixes/suffixes, and action buttons to a text field in a single unified border.",
    why: "Many form fields need contextual decoration — a currency symbol, URL prefix, search icon, or inline action button. Assembling these from raw HTML creates misaligned borders and inconsistent spacing. InputGroup composes all of these as a single visual unit.",
    problem: "Without InputGroup, teams bolt icons and buttons next to inputs with custom border hacks that misalign on different screen sizes and break the focus ring continuity.",
    appearsIn: ["Search bars", "Currency / price inputs", "URL and domain fields", "Phone number inputs", "Invite / subscribe email fields", "Message composers", "Command palettes"],
  },

  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      { name: "InputGroup", description: "The outer container div. Renders a single border with unified focus ring via input-focus-ring-within. Sets the h-10 height (collapses for block addons)." },
      { name: "InputGroupAddon", description: "Positioned slot for decorations. align prop controls placement: inline-start, inline-end, block-start, block-end." },
      { name: "InputGroupInput", description: "The input control inside the group. Strips its own border and background — the group container provides the border." },
      { name: "InputGroupTextarea", description: "Same as InputGroupInput but multi-line. Makes the group expand vertically.", optional: true },
      { name: "InputGroupText", description: "Renders plain text or an icon inside an addon. cursor-text keeps the click-to-focus behaviour.", optional: true },
      { name: "InputGroupButton", description: "A ghost rounded button inside an addon. size='xs' default fits the h-10 container.", optional: true },
    ],
  },

  whenToUse: [
    "Inputs that need a leading icon (search, lock, mail, phone) to communicate purpose at a glance.",
    "Currency, measurement, or unit fields that need a prefix or suffix ($ prefix, USD suffix, kg, %).",
    "URL and domain fields where the protocol or domain is fixed (https://, @handle).",
    "Inputs paired with an inline submit action (subscribe, search, send).",
    "Password fields that need a visibility toggle button.",
    "Multi-line message composers that need a label above and a send button below.",
  ],

  whenNotToUse: [
    "Plain text fields with just a label — use Input directly.",
    "Inputs that need full dropdown selects (e.g. country + phone) — consider a separate Select + Input layout.",
    "When the icon is just decorative with no semantic meaning — avoid icon pollution.",
  ],

  variants: [
    {
      name: "Icon addons (inline-start)",
      description: "A Remixicon icon at the left communicates the field's type before the user reads the label.",
      when: "Search, email, lock, user, phone fields",
      preview: <IconAddonPreview />,
      fullWidth: true,
    },
    {
      name: "Text addons",
      description: "Short text labels ($, USD, https://, @) fix a context value at the start or end of the input.",
      when: "Currency, URL, handle, unit fields",
      preview: <TextAddonPreview />,
      fullWidth: true,
    },
    {
      name: "Button addons (inline-end)",
      description: "An action button (subscribe, search, send) sits inside the group border as a pill-shaped ghost button.",
      when: "Subscribe, submit, copy, search actions",
      preview: <ButtonAddonPreview />,
      fullWidth: true,
    },
    {
      name: "Block addons",
      description: "block-start places a label above the input area; block-end places a hint or action row below. The group expands to column layout. Works with both InputGroupInput and InputGroupTextarea.",
      when: "Message composer, character count, command hint",
      preview: <BlockAddonPreview />,
      fullWidth: true,
    },
  ],

  states: [
    {
      name: "Password with toggle",
      description: "An eye icon button in inline-end toggles the input between type='password' and type='text'. Use size='icon-sm' for the button.",
      preview: <PasswordTogglePreview />,
    },
    {
      name: "Invalid (error)",
      description: "When InputGroupInput has aria-invalid, the group border turns destructive and shows a red ring. Pair with FieldError below.",
      preview: <InvalidPreview />,
    },
    {
      name: "Disabled",
      description: "Add data-disabled='true' to InputGroup to dim addon text. Still disable the InputGroupInput directly.",
      preview: <DisabledPreview />,
    },
  ],

  properties: [
    {
      name: "align (InputGroupAddon)",
      values: "inline-start · inline-end · block-start · block-end",
      default: "inline-start",
      description: "inline-start/end: left/right of the input in a flex-row. block-start/end: above/below in a flex-col, expanding the group height.",
    },
    {
      name: "size (InputGroupButton)",
      values: "xs · sm · icon-xs · icon-sm",
      default: "xs",
      description: "xs: pill text button (h-6). icon-xs: square 6×6. icon-sm: square 8×8. All are rounded-full.",
    },
    {
      name: "variant (InputGroupButton)",
      values: "ghost · outline · default · …",
      default: "ghost",
      description: "Ghost is the standard for inline buttons. Use default only for strong primary actions (send, subscribe).",
    },
  ],

  contentGuidance: [
    {
      rule: "InputGroupText for non-interactive content; InputGroupButton for interactive content",
      detail: "Text/icons that focus the input on click → InputGroupText. Icons/labels that trigger an action → InputGroupButton.",
    },
    {
      rule: "Keep addon content short",
      detail: "Text addons should be 1–5 characters ($, USD, https://). Longer text breaks the field's visual balance.",
    },
    {
      rule: "One primary action maximum",
      detail: "A group with both an icon start and a submit button end is fine. Two buttons in the same group creates ambiguity.",
    },
  ],

  behavior: [
    "The group container holds the border — InputGroupInput strips its own border, background, and ring.",
    "input-focus-ring-within applies the focus ring to the group border when any internal input is focused.",
    "Clicking InputGroupText (non-button areas) focuses the InputGroupInput via the onClick handler on the addon.",
    "When InputGroupInput has aria-invalid, the group container switches to border-destructive automatically via the has-[] selector.",
    "Block addons (block-start/block-end) switch the group to flex-col layout and expand the height automatically.",
    "data-disabled='true' on InputGroup dims addon labels via the group-data-[disabled=true] selector.",
  ],

  spacing: [
    { rule: "Inline addon padding", detail: "pl-3 (inline-start) or pr-3 (inline-end) on the addon div." },
    { rule: "Button clearance", detail: "-ml-1 / -mr-1 on addons with buttons to bring the pill close to the group edge." },
    { rule: "Block addon padding", detail: "px-3 pt-3 (block-start) or px-3 pb-3 (block-end) on the addon div." },
    { rule: "Group height", detail: "h-10 for inline-only groups (matches Input). Expands automatically with block addons or textarea." },
  ],

  accessibility: [
    {
      rule: "Always include a visible label above InputGroup",
      detail: "InputGroup provides no internal label slot. Use a Label element with htmlFor pointing to the InputGroupInput's id.",
    },
    {
      rule: "InputGroupButton needs aria-label for icon-only buttons",
      detail: "The password toggle, copy button, and send icon are icon-only. Add aria-label='Show password', 'Copy', etc.",
    },
    {
      rule: "aria-invalid goes on InputGroupInput, not InputGroup",
      detail: "Screen readers look for aria-invalid on the actual input element. The group border updates automatically via CSS.",
    },
    {
      rule: "InputGroupText addons are decorative",
      detail: "Text prefix/suffix addons ($ USD https://) carry no semantic role. The label must communicate the field's full purpose.",
    },
  ],

  doItems: [
    {
      label: "Use InputGroup for all decorated inputs",
      description: "InputGroup provides the unified border, focus ring, and click-to-focus behaviour. Never assemble this manually.",
      preview: <DoInputGroupPreview />,
    },
    {
      label: "Use InputGroupButton for interactive addons",
      description: "InputGroupButton is keyboard-accessible and properly sized for the h-10 container. Don't use raw button elements.",
      preview: <ButtonAddonPreview />,
    },
  ],

  dontItems: [
    {
      label: "Don't build addon inputs with raw HTML",
      description: "Manual border hacks misalign, break focus rings, and lose the click-to-focus behaviour on addon text.",
      preview: <DontRawInputPreview />,
    },
    {
      label: "Don't use addon text longer than ~8 characters",
      description: "Long addons break the field's proportion. Use a Select or separate label for lengthy context.",
      preview: (
        <div className="w-full max-w-sm">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>Currency code</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="0.00" />
          </InputGroup>
        </div>
      ),
    },
  ],

  examplesInContext: [
    {
      title: "Message composer",
      description: "A block-start label, textarea, and block-end send button in one unified group.",
      preview: <MessageComposerExample />,
      code: `<InputGroup>
  <InputGroupAddon align="block-start">
    <InputGroupText><RiMailLine />Message</InputGroupText>
  </InputGroupAddon>
  <InputGroupTextarea placeholder="Write your message…" rows={4} />
  <InputGroupAddon align="block-end">
    <div className="flex justify-end">
      <InputGroupButton size="xs" variant="default">
        <RiSendPlaneLine />Send
      </InputGroupButton>
    </div>
  </InputGroupAddon>
</InputGroup>`,
    },
    {
      title: "Phone number with country code",
      description: "A ghost button addon shows the dialling code prefix, which could open a country picker.",
      preview: <PhoneInputExample />,
      code: `<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupButton size="xs" variant="ghost">
      🇳🇬 +234
    </InputGroupButton>
  </InputGroupAddon>
  <InputGroupInput placeholder="800 000 0000" type="tel" />
</InputGroup>`,
    },
  ],

  relatedComponents: [
    {
      slug: "input",
      name: "Input",
      description: "Plain single-line text input.",
      when: "Use Input when no addons are needed — just label + text field + optional error.",
    },
    {
      slug: "field",
      name: "Field",
      description: "Form field wrapper with label, description, error.",
      when: "Wrap InputGroup in a Field when it needs a FieldLabel, FieldDescription, or FieldError.",
    },
    {
      slug: "textarea",
      name: "Textarea",
      description: "Multi-line text entry.",
      when: "Use Textarea directly when no block addons are needed. Use InputGroupTextarea inside InputGroup for labelled/actioned text areas.",
    },
  ],

  designNotes: [
    "The group border replaces the input's own border. InputGroupInput renders borderless and backgroundless inside the group.",
    "input-focus-ring-within targets the group container — the ring always wraps the full group, not just the text field.",
    "has-[[data-slot][aria-invalid=true]] on the container catches aria-invalid on the nested input and applies the destructive ring.",
    "block-start/end addons switch the group to flex-col via has-[>[data-align=block-*]] selectors — no JavaScript needed.",
  ],
}
