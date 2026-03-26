"use client"

/**
 * Component documentation template — DESIGN file.
 *
 * Each component doc is split into two files:
 *   _docs/[slug]/design.tsx   ← this file (design sections, no devDoc)
 *   _docs/[slug]/develop.tsx  ← developer documentation only
 *
 * Steps:
 *   1. Copy this to `_docs/[slug]/design.tsx` and fill in every field.
 *   2. Copy `_template_develop.tsx` to `_docs/[slug]/develop.tsx` and fill in.
 *   3. Register both in `page.tsx`:
 *        import { slugDesignDoc } from "./_docs/slug/design"
 *        import { slugDevelopDoc } from "./_docs/slug/develop"
 *        docMap["slug"] = { ...slugDesignDoc, devDoc: slugDevelopDoc }
 *
 * See `.claude/skills/design-to-code/maps/component-doc-guide.md` for full
 * authoring instructions.
 */

// import { ComponentName } from "@/components/ui/slug"
// import { RiIconLine } from "@remixicon/react"
import type { ComponentDocData } from "../component-doc-types"

// ── Anatomy preview ───────────────────────────────────────────────────────────

const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    {/* Render the component with all visible parts */}
    {/* <ComponentName prop="value">Label</ComponentName> */}
    <div className="flex items-start gap-10 text-center">
      {["① Container", "② Label" /* add more parts */].map(label => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="h-5 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)

// ── Context example previews ──────────────────────────────────────────────────

// const Example1 = () => ( ... )
// const Example2 = () => ( ... )

// ── Do / Don't previews ───────────────────────────────────────────────────────

// const DoPreview1 = () => ( ... )
// const DontPreview1 = () => ( ... )

// ── Full doc data ─────────────────────────────────────────────────────────────

export const /* componentName */DesignDoc: Omit<ComponentDocData, "devDoc"> = {
  // ── Overview ───────────────────────────────────────────────────────────────
  overview: {
    what: "One sentence describing what the component is and does visually.",
    why: "Why this component exists in the design system.",
    problem: "What problem it solves for the user or designer.",
    appearsIn: [
      "Surface 1",
      "Surface 2",
    ],
  },

  // ── Anatomy ────────────────────────────────────────────────────────────────
  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      {
        name: "Container",
        description: "The outer wrapper. Describe what it carries (layout, colour, radius).",
      },
      {
        name: "Label",
        description: "The text content.",
      },
      // Add optional parts with optional: true
    ],
  },

  // ── Usage ──────────────────────────────────────────────────────────────────
  whenToUse: [
    "Context where this is the right choice.",
    "Another context.",
    "Another context.",
  ],
  whenNotToUse: [
    "Situation to avoid — use AlternativeComponent instead.",
    "Another misuse scenario.",
  ],

  // ── Variants ───────────────────────────────────────────────────────────────
  variants: [
    {
      name: "Variant name",
      description: "One sentence. Colour/tone + example use cases.",
      when: "Short phrase: when to pick this.",
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          {/* <ComponentName variant="x">Label</ComponentName> */}
        </div>
      ),
    },
  ],

  // ── States ─────────────────────────────────────────────────────────────────
  states: [
    {
      name: "Default",
      description: "The base configuration.",
      preview: <>{/* <ComponentName>Label</ComponentName> */}</>,
    },
    // Disabled, Loading, Error, etc.
  ],

  // ── Properties ─────────────────────────────────────────────────────────────
  properties: [
    {
      name: "variant",
      values: "option1 · option2 · option3",
      default: "option1",
      description: "What this prop controls.",
    },
    {
      name: "size",
      values: "sm · default · lg",
      default: "default",
      description: "Scale variant.",
    },
  ],

  // ── Content guidance ───────────────────────────────────────────────────────
  contentGuidance: [
    {
      rule: "Rule title",
      detail: "One-sentence explanation of the rule and why it exists.",
    },
  ],

  // ── Behavior ───────────────────────────────────────────────────────────────
  behavior: [
    "One concrete interaction or rendering rule per bullet.",
  ],

  // ── Spacing ────────────────────────────────────────────────────────────────
  spacing: [
    {
      rule: "Context name",
      detail: "Specific token or measurement to use here.",
    },
  ],

  // ── Accessibility ──────────────────────────────────────────────────────────
  accessibility: [
    {
      rule: "Keyboard / ARIA rule",
      detail: "What to implement and why.",
    },
  ],

  // ── Do & Don't ─────────────────────────────────────────────────────────────
  doItems: [
    {
      label: "Do: short positive rule",
      description: "Brief explanation.",
      preview: <>{/* DoPreview1 */}</>,
    },
  ],
  dontItems: [
    {
      label: "Don't: short negative rule",
      description: "Brief explanation. Point to the correct alternative.",
      preview: <>{/* DontPreview1 */}</>,
    },
  ],

  // ── Examples in context ────────────────────────────────────────────────────
  examplesInContext: [
    {
      title: "In a [surface]",
      description: "Short description of what this example shows.",
      preview: <>{/* Example1 */}</>,
    },
  ],

  // ── Related components ─────────────────────────────────────────────────────
  relatedComponents: [
    {
      slug: "related-slug",
      name: "Related Component",
      description: "What it does.",
      when: "The specific scenario where you'd use this instead.",
    },
  ],

  // ── Design notes ───────────────────────────────────────────────────────────
  designNotes: [
    "Figma mapping or token note for designers.",
  ],

}
