"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ───────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    <div className="w-64">
      <Textarea placeholder="Describe the issue in detail..." />
    </div>
    <div className="flex items-start gap-8 text-center">
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
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">③ Auto-resize</span>
      </div>
    </div>
  </div>
)

// ── Context example: Support ticket ──────────────────────────────────────────

const SupportTicketExample = () => (
  <div className="rounded-xl border overflow-hidden max-w-sm">
    <div className="px-5 py-4 border-b">
      <p className="text-sm font-semibold">Submit a support request</p>
    </div>
    <div className="p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ticket-subject">Subject</Label>
        <Textarea
          id="ticket-subject"
          placeholder="Briefly describe your issue"
          className="min-h-10 resize-none"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ticket-message">Message</Label>
        <Textarea
          id="ticket-message"
          placeholder="Please provide as much detail as possible — steps to reproduce, what you expected, and what actually happened."
        />
      </div>
    </div>
    <div className="px-5 py-3 border-t flex justify-end gap-2">
      <Button variant="outline" size="sm">Cancel</Button>
      <Button size="sm">Submit ticket</Button>
    </div>
  </div>
)

// ── Context example: Bio / description field ──────────────────────────────────

const BioFieldExample = () => (
  <div className="rounded-xl border overflow-hidden max-w-sm">
    <div className="px-5 py-4 border-b">
      <p className="text-sm font-semibold">Profile</p>
    </div>
    <div className="p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Avatar className="size-10 rounded-full shrink-0">
          <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Ngozi" alt="Ngozi Achebe" />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold">Ngozi Achebe</p>
          <p className="text-xs text-muted-foreground">ngozi@company.com</p>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          defaultValue="Product designer focused on enterprise tooling and design systems. Based in Lagos, Nigeria."
        />
        <p className="text-xs text-muted-foreground">Shown on your public profile page.</p>
      </div>
    </div>
    <div className="px-5 py-3 border-t flex justify-end">
      <Button size="sm">Save changes</Button>
    </div>
  </div>
)

// ── Context example: Notes in a detail drawer ────────────────────────────────

const DrawerNotesExample = () => (
  <div className="rounded-xl border overflow-hidden max-w-sm">
    <div className="px-4 py-3 border-b flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="size-8 rounded-full shrink-0">
          <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Emeka" alt="Emeka Nwachukwu" />
          <AvatarFallback>E</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">Emeka Nwachukwu</p>
          <p className="text-xs text-muted-foreground">emeka@startup.io</p>
        </div>
      </div>
    </div>
    <div className="p-4 flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="notes">Internal notes</Label>
        <Textarea
          id="notes"
          placeholder="Add a note visible only to your team..."
          className="min-h-20"
        />
      </div>
      <Button size="sm" variant="outline" className="self-end">Save note</Button>
    </div>
  </div>
)

// ── Do / Don't previews ───────────────────────────────────────────────────────

const DoAutoGrowPreview = () => (
  <div className="flex flex-col gap-1.5 w-56">
    <Label htmlFor="do-grow">Notes</Label>
    <Textarea
      id="do-grow"
      defaultValue={"First line\nSecond line\nThird line"}
    />
    <p className="text-xs text-muted-foreground text-center">Auto-grows to fit content</p>
  </div>
)

const DoLabelPreview = () => (
  <div className="flex flex-col gap-1.5 w-56">
    <Label htmlFor="do-label-ta">Description</Label>
    <Textarea id="do-label-ta" placeholder="Describe your use case..." />
  </div>
)

const DontSingleLinePreview = () => (
  <div className="flex flex-col gap-1.5 w-56">
    <Label htmlFor="dont-sl">Full name</Label>
    <Textarea id="dont-sl" placeholder="Adaeze Okafor" className="min-h-10 resize-none" />
    <p className="text-xs text-muted-foreground text-center">Use Input for single-line fields</p>
  </div>
)

const DontResizePreview = () => (
  <div className="flex flex-col gap-1.5 w-56">
    <Label htmlFor="dont-resize">Message</Label>
    <Textarea id="dont-resize" placeholder="Your message..." style={{ resize: "both" }} />
    <p className="text-xs text-muted-foreground text-center">Resize handle creates layout breakage</p>
  </div>
)

// ── Textarea design doc ───────────────────────────────────────────────────────

export const textareaDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  // ── Overview ───────────────────────────────────────────────────────────────
  overview: {
    what: "A multi-line text field that auto-grows with content and supports placeholder, error, and disabled states.",
    why: "Free-form text entry (messages, notes, descriptions, bios) requires a taller input that expands naturally rather than forcing users to scroll inside a fixed box.",
    problem: "Fixed-height textareas force users to scroll inside a small box or guess how much space they have — auto-resize removes that friction.",
    appearsIn: [
      "Support ticket forms",
      "Profile bio / description fields",
      "Notes in detail drawers",
      "Comment and reply threads",
      "Onboarding questionnaires",
    ],
  },

  // ── Anatomy ────────────────────────────────────────────────────────────────
  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Container",
        description: "The outer box. Provides border, background, border-radius, and minimum height (min-h-16).",
      },
      {
        name: "Placeholder / Value",
        description: "Hint text shown when empty; replaced by multi-line typed content.",
      },
      {
        name: "Auto-resize",
        description: "The field-sizing-content CSS property causes the box to grow vertically as content is typed.",
      },
    ],
  },

  // ── Usage ──────────────────────────────────────────────────────────────────
  whenToUse: [
    "Free-form text that may span multiple lines — notes, descriptions, messages, bios.",
    "Support or feedback forms where response length is unpredictable.",
    "Inline notes in detail drawers and sidepanels.",
    "Onboarding questions that need open-ended written answers.",
  ],
  whenNotToUse: [
    "Single-line values like name, email, or phone — use Input.",
    "Structured data entry with a fixed format — use Input or InputGroup with masks.",
    "Code blocks or syntax-highlighted content — use a code editor.",
  ],

  // ── Variants ───────────────────────────────────────────────────────────────
  variants: [
    {
      name: "Default",
      description: "Standard auto-growing textarea. Starts at min-h-16 and expands as content is added.",
      when: "All standard multi-line text fields in forms.",
      preview: (
        <div className="w-64">
          <Textarea placeholder="Enter your message here..." />
        </div>
      ),
    },
    {
      name: "Disabled",
      description: "Visually dimmed and non-interactive. The value is shown but cannot be changed.",
      when: "Fields locked by permissions, after submission, or by feature flags.",
      preview: (
        <div className="w-64">
          <Textarea defaultValue="This field is read-only" disabled />
        </div>
      ),
    },
    {
      name: "Error (aria-invalid)",
      description: "Destructive border and ring. Applied when the field fails validation.",
      when: "After form submission with missing or invalid content.",
      preview: (
        <div className="flex flex-col gap-1.5 w-64">
          <Textarea aria-invalid placeholder="This field is required" />
          <p className="text-xs text-destructive">Please describe your issue.</p>
        </div>
      ),
    },
    {
      name: "Auto-resize (filled)",
      description: "The box naturally grows taller as the user types — no scrollbar inside the field.",
      when: "Whenever multi-line content is expected. This is the default behaviour.",
      preview: (
        <div className="w-64">
          <Textarea
            defaultValue={"Line one of the message.\nLine two adds more height.\nLine three and the box keeps growing."}
          />
        </div>
      ),
    },
  ],

  // ── States ─────────────────────────────────────────────────────────────────
  states: [
    {
      name: "Default",
      description: "Empty, no focus. Placeholder is visible.",
      preview: (
        <div className="w-56">
          <Textarea placeholder="Add a note..." />
        </div>
      ),
    },
    {
      name: "Focused",
      description: "Focus ring visible. The field is active and ready for input.",
      preview: (
        <div className="w-56">
          <Textarea placeholder="Focused" className="ring-2 ring-ring ring-offset-0" />
        </div>
      ),
    },
    {
      name: "Filled (multi-line)",
      description: "Contains typed content across multiple lines. The box has grown to fit.",
      preview: (
        <div className="w-56">
          <Textarea defaultValue={"Feature request: add export to CSV.\nIt would help our ops team run weekly reports without manual downloads."} />
        </div>
      ),
    },
    {
      name: "Disabled",
      description: "Non-interactive. Cursor changes to not-allowed.",
      preview: (
        <div className="w-56">
          <Textarea defaultValue="Submission locked after approval." disabled />
        </div>
      ),
    },
    {
      name: "Error",
      description: "Destructive ring and border. Paired with inline error text.",
      preview: (
        <div className="flex flex-col gap-1.5 w-56">
          <Textarea aria-invalid placeholder="Required" />
          <p className="text-xs text-destructive">This field is required.</p>
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
      description: "Hint text shown when empty. Always pair with a Label above.",
    },
    {
      name: "disabled",
      values: "true · false",
      default: "false",
      description: "Makes the field non-interactive and visually dimmed.",
    },
    {
      name: "aria-invalid",
      values: "true · false",
      default: "false",
      description: "Applies destructive ring/border styling for validation failures.",
    },
    {
      name: "rows",
      values: "number",
      default: "—",
      description: "Hint for initial visible rows. auto-resize overrides this as the user types.",
    },
  ],

  // ── Content guidance ───────────────────────────────────────────────────────
  contentGuidance: [
    {
      rule: "Placeholder as a hint, not a label",
      detail: "Placeholder disappears when the user types — always pair with a visible Label above.",
    },
    {
      rule: "Character count for bounded fields",
      detail: "If there is a maximum length, show a character counter below the field (e.g. \"120 / 280\").",
    },
    {
      rule: "Descriptive placeholder text",
      detail: "Describe the expected format or content: \"Describe the issue — steps to reproduce, expected vs actual behaviour.\"",
    },
  ],

  // ── Behavior ───────────────────────────────────────────────────────────────
  behavior: [
    "Auto-grows vertically using field-sizing-content. No scrollbar inside the field unless constrained externally.",
    "Minimum height is min-h-16 (64px). The field never collapses below this.",
    "resize: none is the recommended default — manual resize handles conflict with auto-grow.",
    "Passes all native HTML textarea props — value, onChange, onBlur, autoFocus, maxLength, etc.",
    "aria-invalid triggers destructive border and ring without any JavaScript — just set the attribute.",
  ],

  // ── Spacing ────────────────────────────────────────────────────────────────
  spacing: [
    {
      rule: "Label to textarea gap",
      detail: "gap-1.5 between the Label and Textarea in a flex-col wrapper.",
    },
    {
      rule: "Textarea to error/hint text",
      detail: "gap-1 or gap-1.5 below the Textarea when showing hint or error text.",
    },
    {
      rule: "Between form fields",
      detail: "gap-4 or gap-6 between field groups.",
    },
    {
      rule: "Minimum height override",
      detail: "Use className=\"min-h-20\" or similar to set a taller starting height for long-form fields.",
    },
  ],

  // ── Accessibility ──────────────────────────────────────────────────────────
  accessibility: [
    {
      rule: "Always pair with Label",
      detail: "Every Textarea must have a visible Label associated via htmlFor/id.",
    },
    {
      rule: "aria-invalid for errors",
      detail: "Set aria-invalid=\"true\" on validation failure — screen readers announce the field as invalid.",
    },
    {
      rule: "aria-describedby for error messages",
      detail: "Give the error element an id and set aria-describedby on the Textarea to associate them for screen readers.",
    },
    {
      rule: "Do not suppress resize entirely via CSS",
      detail: "Use resize-none only when auto-grow is enabled — never leave users unable to read their own input.",
    },
  ],

  // ── Do & Don't ─────────────────────────────────────────────────────────────
  doItems: [
    {
      label: "Let the field auto-grow with content",
      description: "field-sizing-content means users never fight with a scrollable box.",
      preview: <DoAutoGrowPreview />,
    },
    {
      label: "Always pair with a Label",
      description: "A visible label above the field is required for accessibility and scannability.",
      preview: <DoLabelPreview />,
    },
  ],
  dontItems: [
    {
      label: "Don't use Textarea for single-line values",
      description: "Name, email, and phone are single-line — use Input for those fields.",
      preview: <DontSingleLinePreview />,
    },
    {
      label: "Don't enable the manual resize handle",
      description: "resize: both conflicts with auto-grow and can break the surrounding layout.",
      preview: <DontResizePreview />,
    },
  ],

  // ── Examples in context ────────────────────────────────────────────────────
  examplesInContext: [
    {
      title: "Support ticket form",
      description: "Subject and message fields — message auto-grows as the user types their report.",
      preview: <SupportTicketExample />,
      code: `<div className="flex flex-col gap-4">
  <div className="flex flex-col gap-1.5">
    <Label htmlFor="subject">Subject</Label>
    <Textarea
      id="subject"
      placeholder="Briefly describe your issue"
      className="min-h-10 resize-none"
    />
  </div>
  <div className="flex flex-col gap-1.5">
    <Label htmlFor="message">Message</Label>
    <Textarea
      id="message"
      placeholder="Provide as much detail as possible..."
    />
  </div>
</div>`,
    },
    {
      title: "Profile bio field",
      description: "Open-ended bio in a settings card — grows with the user's text.",
      preview: <BioFieldExample />,
      code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="bio">Bio</Label>
  <Textarea
    id="bio"
    defaultValue="Product designer focused on enterprise tooling and design systems."
  />
  <p className="text-xs text-muted-foreground">Shown on your public profile page.</p>
</div>`,
    },
    {
      title: "Notes in a detail drawer",
      description: "Internal notes field shown in a side drawer — compact starting height, grows on input.",
      preview: <DrawerNotesExample />,
      code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="notes">Internal notes</Label>
  <Textarea
    id="notes"
    placeholder="Add a note visible only to your team..."
    className="min-h-20"
  />
</div>`,
    },
  ],

  // ── Related components ─────────────────────────────────────────────────────
  relatedComponents: [
    {
      slug: "input",
      name: "Input",
      description: "Single-line text field for names, emails, and short values.",
      when: "The value is a single line — use Input instead of Textarea.",
    },
    {
      slug: "field",
      name: "Field",
      description: "Form field wrapper with label, hint, and error slots built in.",
      when: "You want a single component to own the full label + textarea + error layout.",
    },
  ],

  // ── Design notes ───────────────────────────────────────────────────────────
  designNotes: [
    "auto-grow is powered by field-sizing-content — a CSS property. No JavaScript resize logic is needed.",
    "Minimum height is min-h-16 (64px). Override with min-h-20 or similar when a taller initial height is needed.",
    "Error styling is applied by setting aria-invalid on the element — no extra class needed.",
    "Add resize-none to the className when using auto-grow to prevent the manual resize handle from appearing.",
  ],
}
