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
  RiClipboardLine,
  RiEyeLine,
  RiEyeOffLine,
  RiGlobalLine,
  RiLockLine,
  RiMailLine,
  RiMicLine,
  RiPhoneLine,
  RiSearchLine,
  RiSendPlaneLine,
  RiUserLine,
} from "@remixicon/react"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Previews ───────────────────────────────────────────────────────────────────

const IconStartPreview = () => (
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
        <InputGroupText><RiLockLine /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput type="password" placeholder="Password" />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText><RiPhoneLine /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput type="tel" placeholder="+234 800 000 0000" />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText><RiUserLine /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Username" />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText><RiGlobalLine /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Website" />
    </InputGroup>
  </div>
)

const TextAddonsPreview = () => (
  <div className="flex flex-col gap-3 w-full max-w-sm">
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText>$</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="0.00" type="number" />
    </InputGroup>
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
    <InputGroup>
      <InputGroupInput placeholder="subdomain" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>.raana.io</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupInput placeholder="Amount" type="number" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>kg</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  </div>
)

const ButtonAddonsPreview = () => (
  <div className="flex flex-col gap-3 w-full max-w-sm">
    <InputGroup>
      <InputGroupInput placeholder="Email to subscribe" type="email" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="xs">Subscribe</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText><RiSearchLine /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search anything…" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="xs">Search</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText><RiMailLine /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Invite by email" type="email" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="xs" variant="default">
          <RiSendPlaneLine />Invite
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
)

const IconButtonsPreview = () => (
  <div className="flex flex-col gap-3 w-full max-w-sm">
    <InputGroup>
      <InputGroupInput placeholder="Coupon code" defaultValue="RAANA2026" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-sm" aria-label="Copy code">
          <RiClipboardLine />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupInput placeholder="Dictate message…" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-sm" aria-label="Start voice input">
          <RiMicLine />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
)

const PasswordTogglePreview = () => {
  const [show, setShow] = useState(false)
  return (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText><RiLockLine /></InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          type={show ? "text" : "password"}
          placeholder="Enter password"
        />
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

const PhoneWithCodePreview = () => (
  <div className="w-full max-w-sm">
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupButton size="xs" variant="ghost">
          🇳🇬 +234
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupInput placeholder="800 000 0000" type="tel" />
    </InputGroup>
  </div>
)

const BlockAddonsPreview = () => (
  <div className="flex flex-col gap-3 w-full max-w-sm">
    <InputGroup>
      <InputGroupAddon align="block-start">
        <InputGroupText><RiMailLine />Message</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea placeholder="Write your message…" rows={3} />
    </InputGroup>
    <InputGroup>
      <InputGroupInput placeholder="Type your reply…" />
      <InputGroupAddon align="block-end">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground/60">Press ⌘↵ to submit</span>
          <InputGroupButton size="xs" variant="default">
            <RiSendPlaneLine />Send
          </InputGroupButton>
        </div>
      </InputGroupAddon>
    </InputGroup>
  </div>
)

const InvalidStatePreview = () => (
  <div className="flex flex-col gap-2 w-full max-w-sm">
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText><RiMailLine /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput type="email" aria-invalid defaultValue="not-an-email" />
    </InputGroup>
    <p className="text-xs text-destructive">Please enter a valid email address.</p>
  </div>
)

const DisabledStatePreview = () => (
  <div className="w-full max-w-sm" data-disabled="true">
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText><RiLockLine /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Locked field" disabled />
    </InputGroup>
  </div>
)

// ── InputGroup develop doc ─────────────────────────────────────────────────────

export const inputGroupDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
      "npx shadcn add @raana/input",
    ],
    command: "npx shadcn add @raana/input-group",
    importPath: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "InputGroup depends on Input and Textarea — install those first.",
      "Icons from @remixicon/react — install if not already present.",
    ],
  },

  basicUsage: `import {
  InputGroup, InputGroupAddon, InputGroupText,
  InputGroupInput, InputGroupButton,
} from "@/components/ui/input-group"
import { RiSearchLine } from "@remixicon/react"

// Icon start
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText><RiSearchLine /></InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Search…" />
</InputGroup>

// Text prefix + suffix
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>$</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="0.00" type="number" />
  <InputGroupAddon align="inline-end">
    <InputGroupText>USD</InputGroupText>
  </InputGroupAddon>
</InputGroup>

// Action button end
<InputGroup>
  <InputGroupInput placeholder="Enter email to subscribe" type="email" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="xs">Subscribe</InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,

  codeExamples: [
    {
      title: "Icon addons — leading icons",
      description: "Use InputGroupText with a Remixicon icon in inline-start to communicate field purpose at a glance. Works for search, email, lock, user, phone, and more.",
      preview: <IconStartPreview />,
      code: `// Search
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText><RiSearchLine /></InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Search…" />
</InputGroup>

// Email
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText><RiMailLine /></InputGroupText>
  </InputGroupAddon>
  <InputGroupInput type="email" placeholder="Email address" />
</InputGroup>

// Password
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText><RiLockLine /></InputGroupText>
  </InputGroupAddon>
  <InputGroupInput type="password" placeholder="Password" />
</InputGroup>

// Phone
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText><RiPhoneLine /></InputGroupText>
  </InputGroupAddon>
  <InputGroupInput type="tel" placeholder="+234 800 000 0000" />
</InputGroup>`,
    },
    {
      title: "Text addons — prefixes and suffixes",
      description: "Short text labels fix a unit or context at the start or end. Can be used alone or in combination.",
      preview: <TextAddonsPreview />,
      code: `// Currency prefix
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>$</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="0.00" type="number" />
</InputGroup>

// Both sides — price with currency
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>$</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="0.00" type="number" />
  <InputGroupAddon align="inline-end">
    <InputGroupText>USD</InputGroupText>
  </InputGroupAddon>
</InputGroup>

// URL prefix
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="yoursite.com" />
</InputGroup>

// @ handle
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText><RiAtLine /></InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="username" />
</InputGroup>

// Subdomain suffix
<InputGroup>
  <InputGroupInput placeholder="subdomain" />
  <InputGroupAddon align="inline-end">
    <InputGroupText>.raana.io</InputGroupText>
  </InputGroupAddon>
</InputGroup>

// Unit suffix
<InputGroup>
  <InputGroupInput placeholder="Amount" type="number" />
  <InputGroupAddon align="inline-end">
    <InputGroupText>kg</InputGroupText>
  </InputGroupAddon>
</InputGroup>`,
    },
    {
      title: "Action button addons",
      description: "An InputGroupButton inside inline-end renders as a pill-shaped ghost button. Use size='xs' for text actions, size='icon-sm' for icon-only actions.",
      preview: <ButtonAddonsPreview />,
      code: `// Subscribe
<InputGroup>
  <InputGroupInput placeholder="Email to subscribe" type="email" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="xs">Subscribe</InputGroupButton>
  </InputGroupAddon>
</InputGroup>

// Search with icon start + button end
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText><RiSearchLine /></InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Search anything…" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="xs">Search</InputGroupButton>
  </InputGroupAddon>
</InputGroup>

// Invite — primary variant button
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText><RiMailLine /></InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Invite by email" type="email" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="xs" variant="default">
      <RiSendPlaneLine />Invite
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
    },
    {
      title: "Icon-only buttons",
      description: "Use size='icon-sm' for icon-only action buttons. Always include aria-label for accessibility.",
      preview: <IconButtonsPreview />,
      code: `// Copy to clipboard
<InputGroup>
  <InputGroupInput placeholder="Coupon code" defaultValue="RAANA2026" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-sm" aria-label="Copy code">
      <RiClipboardLine />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>

// Voice input
<InputGroup>
  <InputGroupInput placeholder="Dictate message…" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-sm" aria-label="Start voice input">
      <RiMicLine />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
    },
    {
      title: "Password with visibility toggle",
      description: "An icon-sm button in inline-end toggles between type='password' and type='text'. Requires useState.",
      preview: <PasswordTogglePreview />,
      code: `"use client"
import { useState } from "react"
import { RiEyeLine, RiEyeOffLine, RiLockLine } from "@remixicon/react"

const [show, setShow] = useState(false)

<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText><RiLockLine /></InputGroupText>
  </InputGroupAddon>
  <InputGroupInput
    type={show ? "text" : "password"}
    placeholder="Enter password"
  />
  <InputGroupAddon align="inline-end">
    <InputGroupButton
      size="icon-sm"
      onClick={() => setShow(v => !v)}
      aria-label={show ? "Hide password" : "Show password"}
    >
      {show ? <RiEyeOffLine /> : <RiEyeLine />}
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
    },
    {
      title: "Phone number with country code",
      description: "A ghost InputGroupButton in inline-start shows the dialling code. Clicking it could open a country picker.",
      preview: <PhoneWithCodePreview />,
      code: `<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupButton size="xs" variant="ghost">
      🇳🇬 +234
    </InputGroupButton>
  </InputGroupAddon>
  <InputGroupInput placeholder="800 000 0000" type="tel" />
</InputGroup>`,
    },
    {
      title: "Block addons — label above, action below",
      description: "block-start places content above the input; block-end places content below. The group collapses to flex-col and expands to fit. Essential for message composers.",
      preview: <BlockAddonsPreview />,
      code: `// Textarea with block-start label
<InputGroup>
  <InputGroupAddon align="block-start">
    <InputGroupText><RiMailLine />Message</InputGroupText>
  </InputGroupAddon>
  <InputGroupTextarea placeholder="Write your message…" rows={3} />
</InputGroup>

// Input with block-end hint + send button
<InputGroup>
  <InputGroupInput placeholder="Type your reply…" />
  <InputGroupAddon align="block-end">
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground/60">Press ⌘↵ to submit</span>
      <InputGroupButton size="xs" variant="default">
        <RiSendPlaneLine />Send
      </InputGroupButton>
    </div>
  </InputGroupAddon>
</InputGroup>`,
    },
    {
      title: "Error and disabled states",
      description: "Set aria-invalid on InputGroupInput for the error border. Set data-disabled='true' on InputGroup to dim addons, and disabled on the input.",
      preview: <InvalidStatePreview />,
      code: `// Error state
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText><RiMailLine /></InputGroupText>
  </InputGroupAddon>
  <InputGroupInput type="email" aria-invalid defaultValue="not-an-email" />
</InputGroup>
<p className="text-xs text-destructive mt-1">Please enter a valid email address.</p>

// Disabled state
<InputGroup data-disabled="true">
  <InputGroupAddon align="inline-start">
    <InputGroupText><RiLockLine /></InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Locked field" disabled />
</InputGroup>`,
    },
  ],

  apiReference: [
    {
      name: "align (InputGroupAddon)",
      values: `"inline-start" | "inline-end" | "block-start" | "block-end"`,
      default: `"inline-start"`,
      description: "Controls addon placement. inline-start/end: left/right in flex-row. block-start/end: above/below in flex-col.",
    },
    {
      name: "size (InputGroupButton)",
      values: `"xs" | "sm" | "icon-xs" | "icon-sm"`,
      default: `"xs"`,
      description: "xs: pill text button (h-6). icon-xs: 24×24. icon-sm: 32×32. All are rounded-full.",
    },
    {
      name: "variant (InputGroupButton)",
      values: `"ghost" | "outline" | "default" | "destructive" | …`,
      default: `"ghost"`,
      description: "Ghost is standard for addons. Use default for primary submit actions (Invite, Subscribe, Send).",
    },
    {
      name: "rows (InputGroupTextarea)",
      values: "number",
      default: "—",
      description: "Passes through to the underlying textarea. Controls the initial visible row count.",
    },
    {
      name: "className (InputGroup)",
      values: "string",
      default: "—",
      description: "Applied to the group container. Use w-full max-w-* to constrain width.",
    },
  ],

  accessibility: [
    {
      rule: "Label the InputGroupInput with an associated Label element",
      detail: "InputGroup has no built-in label slot. Add a Label with htmlFor pointing to the InputGroupInput's id above the group.",
    },
    {
      rule: "Icon-only buttons need aria-label",
      detail: "InputGroupButton with only an icon has no text content. Add aria-label='Copy', 'Show password', 'Search', etc.",
    },
    {
      rule: "aria-invalid on InputGroupInput",
      detail: "Place aria-invalid on the input element itself, not the group container. The border updates automatically via CSS.",
    },
    {
      rule: "Decorative addons need no ARIA",
      detail: "InputGroupText with $ or USD is purely visual. Screen readers get context from the Label and the input's value.",
    },
  ],
}
