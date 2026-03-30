"use client"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  RiAddLine,
  RiErrorWarningLine,
  RiFileCopyLine,
  RiMailLine,
  RiSearchLine,
  RiUser2Line,
} from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

// ── Anatomy preview ────────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2 w-full">
    <div className="w-full max-w-sm">
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="stacked"><RiFileCopyLine /></EmptyMedia>
          <EmptyTitle>No documents</EmptyTitle>
          <EmptyDescription>Upload or create your first document to get started.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm"><RiAddLine />New document</Button>
        </EmptyContent>
      </Empty>
    </div>
    <div className="flex items-start flex-wrap gap-6 text-center justify-center">
      {[
        "① EmptyMedia",
        "② EmptyTitle",
        "③ EmptyDescription",
        "④ EmptyContent (CTA)",
      ].map(label => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="h-5 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

// ── Media variant previews ─────────────────────────────────────────────────────

const StackedMediaPreview = () => (
  <div className="w-full max-w-sm">
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="stacked"><RiSearchLine /></EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>Try adjusting your search or filters.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  </div>
)

const IconMediaPreview = () => (
  <div className="w-full max-w-sm">
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon"><RiMailLine /></EmptyMedia>
        <EmptyTitle>No messages</EmptyTitle>
        <EmptyDescription>You have no messages at this time.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  </div>
)

// ── State previews ─────────────────────────────────────────────────────────────

const WithCtaPreview = () => (
  <div className="w-full max-w-sm">
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="stacked"><RiUser2Line /></EmptyMedia>
        <EmptyTitle>Invite your team</EmptyTitle>
        <EmptyDescription>Collaborate with others by inviting them to your workspace.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm"><RiAddLine />Invite members</Button>
      </EmptyContent>
    </Empty>
  </div>
)

const ErrorStatePreview = () => (
  <div className="w-full max-w-sm">
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="stacked"><RiErrorWarningLine /></EmptyMedia>
        <EmptyTitle>Something went wrong</EmptyTitle>
        <EmptyDescription>We couldn't load this content. Check your connection and try again.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">Try again</Button>
      </EmptyContent>
    </Empty>
  </div>
)

const NoBorderPreview = () => (
  <div className="w-full max-w-sm rounded-xl border overflow-hidden">
    <div className="px-4 py-2 border-b bg-muted/30 text-sm font-medium">Documents</div>
    {/* No className="border" — outer container provides the chrome */}
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="stacked"><RiFileCopyLine /></EmptyMedia>
        <EmptyTitle>No documents yet</EmptyTitle>
        <EmptyDescription>Upload a document to get started.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  </div>
)

// ── Do / Don't previews ────────────────────────────────────────────────────────

const DoStackedPreview = () => (
  <div className="w-full max-w-xs">
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="stacked"><RiSearchLine /></EmptyMedia>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>Try a different search term.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  </div>
)

const DontCustomPreview = () => (
  <div className="w-full max-w-xs border rounded-xl p-8 flex flex-col items-center gap-3 text-center">
    <RiSearchLine className="size-8 text-muted-foreground" />
    <p className="font-medium">No results</p>
    <p className="text-sm text-muted-foreground">Try a different search term.</p>
  </div>
)

// ── Context example previews ───────────────────────────────────────────────────

const TeamPageEmptyExample = () => (
  <div className="w-full rounded-xl border overflow-hidden">
    <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
      <p className="text-sm font-medium">Team members</p>
      <Button size="sm" variant="outline"><RiAddLine />Invite</Button>
    </div>
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="stacked"><RiUser2Line /></EmptyMedia>
        <EmptyTitle>No members yet</EmptyTitle>
        <EmptyDescription>Invite your teammates to collaborate in this workspace.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm"><RiAddLine />Invite members</Button>
      </EmptyContent>
    </Empty>
  </div>
)

// ── Empty design doc ───────────────────────────────────────────────────────────

export const emptyDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  overview: {
    what: "A centred, full-width container displayed when a list, table, or section has no data, no results, or has encountered an error.",
    why: "Every page with a data list needs a consistent zero-state. A bare empty div with improvised copy creates visual inconsistency and misses the opportunity to guide the user toward the next action.",
    problem: "Without a system component, empty states get built ad-hoc: different padding, different icon sizes, different CTA placement. Empty standardises all of this.",
    appearsIn: ["Data tables", "List pages", "Team/members sections", "Activity feeds", "Search result pages"],
  },

  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      { name: "Empty (wrapper)", description: "Full-width container with dashed border, centred layout, and p-12 padding. Accepts className for border override." },
      { name: "EmptyHeader", description: "Contains EmptyMedia, EmptyTitle, and EmptyDescription. Stacks vertically with gap-2 and a max-w-sm constraint." },
      { name: "EmptyMedia", description: "Icon display area. Three variants: stacked (animated floating cards), icon (muted square), default (transparent)." },
      { name: "EmptyTitle", description: "Primary heading. text-lg font-medium. 3–6 words max." },
      { name: "EmptyDescription", description: "Supporting sentence explaining the empty state or guiding next steps." },
      { name: "EmptyContent", description: "Optional CTA area below the header. Use for action buttons.", optional: true },
    ],
  },

  whenToUse: [
    "A data list, table, or feed has no items yet (first-use state).",
    "A search or filter returns zero matches.",
    "A data fetch fails and the page cannot render its content.",
    "A section is intentionally empty (e.g. no notifications, all caught up).",
  ],

  whenNotToUse: [
    "For DataTable no-results states — pass the emptyMessage prop instead; DataTable handles that internally.",
    "For individual form fields with no value — use placeholder text.",
    "Inside a very small container — Empty expects at least ~300px of width for p-12 padding to look correct.",
  ],

  variants: [
    {
      name: "Stacked media (default)",
      description: "Three animated floating cards with the icon in the front card. The default for all list/table empty states.",
      when: "Tables, lists, feeds — any zero-data state",
      preview: <StackedMediaPreview />,
      fullWidth: true,
    },
    {
      name: "Icon media",
      description: "A small muted square containing the icon. Less prominent than stacked — use for secondary or inline sections.",
      when: "Compact sections where the stacked animation feels heavy",
      preview: <IconMediaPreview />,
      fullWidth: true,
    },
  ],

  states: [
    {
      name: "With CTA",
      description: "Includes EmptyContent with a primary action button. Use when the user can directly resolve the empty state.",
      preview: <WithCtaPreview />,
      fullWidth: true,
    },
    {
      name: "Error state",
      description: "Uses RiErrorWarningLine icon and \"Something went wrong\" copy, with a retry button in EmptyContent.",
      preview: <ErrorStatePreview />,
      fullWidth: true,
    },
    {
      name: "No border (inside contained section)",
      description: "When Empty sits inside a card or contained table, omit className=\"border\" — the outer wrapper provides the chrome.",
      preview: <NoBorderPreview />,
      fullWidth: true,
    },
  ],

  properties: [
    {
      name: "className (Empty)",
      values: "string",
      default: "—",
      description: "Pass className=\"border\" for standalone empty states. Omit when inside a card or contained table that already has a border.",
    },
    {
      name: "variant (EmptyMedia)",
      values: "stacked · icon · default",
      default: "stacked",
      description: "Controls the icon display style. Use stacked for all primary empty states. icon for compact/secondary sections.",
    },
  ],

  contentGuidance: [
    {
      rule: "Title: 2–5 words, present tense",
      detail: "\"No documents yet\", \"No results found\", \"Invite your team\". Avoid gerunds like \"Getting started\" — state the fact.",
    },
    {
      rule: "Description: one sentence of context or guidance",
      detail: "Explain what the empty state means and/or what the user can do. Don't repeat the title. Example: \"Upload or create a document to get started.\"",
    },
    {
      rule: "CTA: one primary action maximum",
      detail: "If you need two actions (e.g. \"New document\" + \"Upload\"), place them both inside EmptyContent as a flex row — but prefer one.",
    },
    {
      rule: "Icon: use a contextual icon, not a generic one",
      detail: "RiSearchLine for no-results, RiUser2Line for no-members, RiFileCopyLine for no-documents. The icon reinforces the context.",
    },
  ],

  behavior: [
    "EmptyMedia stacked variant renders three animated cards that gently float with staggered delays.",
    "The dashed border is rendered on Empty itself via border-2 border-dashed. It is suppressed when className doesn't include 'border'.",
    "EmptyContent is optional — omit it for read-only empty states with no available user action.",
    "EmptyDescription supports anchor tags: links are underlined and on hover turn primary.",
  ],

  spacing: [
    { rule: "Outer padding", detail: "p-12 on the Empty wrapper — generous breathing room for the centred content." },
    { rule: "Header gap", detail: "gap-2 between EmptyMedia, EmptyTitle, and EmptyDescription inside EmptyHeader." },
    { rule: "Header max-width", detail: "max-w-sm on EmptyHeader — constrains copy to a readable line length even in wide containers." },
    { rule: "Media bottom margin", detail: "mb-2 on EmptyMedia — a small gap between the icon and the title." },
    { rule: "Content gap", detail: "gap-4 inside EmptyContent — between the header and any CTA buttons." },
  ],

  accessibility: [
    {
      rule: "EmptyTitle is a visible heading",
      detail: "It renders as a div with text-lg font-medium. In screen reader contexts, ensure the surrounding landmark region conveys context (e.g. a section with aria-label).",
    },
    {
      rule: "CTA buttons must be self-describing",
      detail: "\"Invite members\" is better than \"Add\" because screen readers announce the button label in isolation. Always include the object in the label.",
    },
    {
      rule: "Error state should communicate failure",
      detail: "For error empty states, pair with an Alert above the Empty or use role=\"alert\" on a wrapper to ensure the failure is announced to screen readers.",
    },
    {
      rule: "Stacked media is decorative",
      detail: "The animated floating cards are visual decoration. Ensure the EmptyTitle always provides the textual context — never rely on the icon alone.",
    },
  ],

  doItems: [
    {
      label: "Use EmptyMedia stacked for all primary list empty states",
      description: "The stacked variant is the design system standard for zero-data states in tables and lists. Use it consistently.",
      preview: <DoStackedPreview />,
    },
    {
      label: "Include a contextual CTA when the user can act",
      description: "If the user can resolve the empty state (create, invite, upload), add a primary Button in EmptyContent to guide them directly.",
      preview: <WithCtaPreview />,
    },
  ],

  dontItems: [
    {
      label: "Don't build a custom empty state from scratch",
      description: "Ad-hoc empty states have inconsistent padding, icon sizes, and copy placement. Always use the Empty component.",
      preview: <DontCustomPreview />,
    },
    {
      label: "Don't add border inside a contained section",
      description: "When Empty sits inside a card or bordered table, the outer wrapper already provides the chrome. Adding className=\"border\" double-borders the section.",
      preview: (
        <div className="w-full max-w-sm rounded-xl border overflow-hidden">
          <div className="px-4 py-2 border-b bg-muted/30 text-sm font-medium">Documents</div>
          {/* Wrong: border added inside a contained section */}
          <Empty className="border rounded-none">
            <EmptyHeader>
              <EmptyMedia variant="stacked"><RiFileCopyLine /></EmptyMedia>
              <EmptyTitle>No documents</EmptyTitle>
            </EmptyHeader>
          </Empty>
        </div>
      ),
    },
  ],

  examplesInContext: [
    {
      title: "Team page empty state",
      description: "Empty sits inside a card section with its own header bar. No border on Empty since the card provides it.",
      preview: <TeamPageEmptyExample />,
      code: `<div className="rounded-xl border overflow-hidden">
  <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
    <p className="text-sm font-medium">Team members</p>
    <Button size="sm" variant="outline"><RiAddLine />Invite</Button>
  </div>
  {/* No className="border" — outer card provides the chrome */}
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="stacked"><RiUser2Line /></EmptyMedia>
      <EmptyTitle>No members yet</EmptyTitle>
      <EmptyDescription>Invite your teammates to collaborate in this workspace.</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button size="sm"><RiAddLine />Invite members</Button>
    </EmptyContent>
  </Empty>
</div>`,
    },
    {
      title: "Standalone error state",
      description: "Full-page error state with border. RiErrorWarningLine icon, a clear error message, and a retry CTA.",
      preview: <ErrorStatePreview />,
      code: `<Empty className="border">
  <EmptyHeader>
    <EmptyMedia variant="stacked"><RiErrorWarningLine /></EmptyMedia>
    <EmptyTitle>Something went wrong</EmptyTitle>
    <EmptyDescription>We couldn't load this content. Check your connection and try again.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button variant="outline" size="sm">Try again</Button>
  </EmptyContent>
</Empty>`,
    },
  ],

  relatedComponents: [
    {
      slug: "data-table",
      name: "DataTable",
      description: "Data table with built-in filtered empty state.",
      when: "Use DataTable's emptyMessage prop for no-results states inside a table — do not place an Empty component inside a DataTable.",
    },
    {
      slug: "alert",
      name: "Alert",
      description: "Inline alert for errors and warnings.",
      when: "Use Alert instead for non-data-list errors that don't need a full empty state treatment — e.g. a failed action on a page that otherwise has content.",
    },
  ],

  designNotes: [
    "The stacked media animation uses three staggered animateemptyfloat keyframes at 0s, 0.4s, and 0.8s delays. Do not suppress this animation — it signals that content is expected but absent.",
    "Empty uses flex-1 so it naturally fills available height in a flex-col parent. This makes it work seamlessly inside page content areas.",
    "The dashed border (border-2 border-dashed) is a deliberate design signal that this space is meant to be filled. The double-weight dashed border differentiates it from regular card borders.",
    "EmptyContent is max-w-sm and centres its children — place action buttons directly inside it without extra wrappers.",
  ],
}
