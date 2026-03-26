# Component Documentation Guide

How to author a full design + develop documentation page for any component.

---

## Three steps to publish a doc

### 1. Create `_docs/[slug]/design.tsx`

Copy `_docs/_template.tsx` to `_docs/[slug]/design.tsx` and fill in every field.
Export name: `[slug]DesignDoc` typed as `Omit<ComponentDocData, "devDoc">`.

### 2. Create `_docs/[slug]/develop.tsx`

Fill in the `ComponentDevDocData` shape.
Export name: `[slug]DevelopDoc` typed as `ComponentDevDocData`.

### 3. Register in `app/(main)/components/[slug]/page.tsx`

```ts
// Static imports at the top
import { badgeDesignDoc } from "./_docs/badge/design"
import { badgeDevelopDoc } from "./_docs/badge/develop"
import { buttonDesignDoc } from "./_docs/button/design"   // ← add here
import { buttonDevelopDoc } from "./_docs/button/develop" // ← add here

// docMap object
const docMap: Record<string, ComponentDocData> = {
  badge: { ...badgeDesignDoc, devDoc: badgeDevelopDoc },
  button: { ...buttonDesignDoc, devDoc: buttonDevelopDoc },  // ← add here
}
```

That's it. The layout renders automatically.

---

## File structure

```
app/(main)/components/[slug]/
├── _docs/
│   ├── _template.tsx        ← design skeleton to copy
│   ├── badge/
│   │   ├── design.tsx       ← design sections (no devDoc)
│   │   └── develop.tsx      ← ComponentDevDocData only
│   └── button/
│       ├── design.tsx
│       └── develop.tsx
├── _examples/
│   └── badge.tsx            ← live interactive example (separate from doc previews)
├── component-doc-layout.tsx
├── component-doc-types.ts
└── page.tsx
```

---

## ComponentDocData fields

Every field is required unless marked optional.

### `overview`
```ts
overview: {
  what: string       // One sentence. What is it, visually and functionally.
  why: string        // Why does it exist in the system. (not rendered, kept for context)
  problem: string    // What problem it solves. (not rendered, kept for context)
  appearsIn: string[]  // Surface names: "Data tables", "Profile cards", "Detail drawers"
}
```

### `anatomy`
```ts
anatomy: {
  preview: ReactNode   // A JSX component showing the component with numbered callouts
  parts: AnatomyPart[] // Each part: { name, description, optional? }
}
```
Anatomy previews show the component with lines/arrows pointing to numbered labels below.
See `badge.tsx` `AnatomyPreview` for the pattern.

### `whenToUse` / `whenNotToUse`
```ts
whenToUse: string[]      // 3–5 short items. Start with context, not "Use when..."
whenNotToUse: string[]   // 3–5 short items. Often point to the right alternative.
```

### `variants`
```ts
variants: ComponentVariant[]
// Each: { name, description, when, preview: ReactNode }
// description: 1 sentence max. Colour + semantic tone + example use cases.
// when: short phrase for the sidebar label "Use for X"
// preview: show the actual rendered variant(s), centered, no card wrapper needed
```

### `states`
```ts
states: ComponentState[]
// Each: { name, description, preview: ReactNode }
// Default, With icon, Small, Large, Disabled, Loading, Error, etc.
```

### `properties`
```ts
properties: PropertyDef[]
// Each: { name, values, default?, description }
// values: pipe-separated options as a string e.g. "sm · default · lg"
// description: what it controls, not what it is
```

### `contentGuidance`
```ts
contentGuidance: GuidanceItem[]
// Each: { rule, detail }
// Rule: short title (e.g. "1–3 words max")
// Detail: 1-sentence explanation of why
```

### `behavior`
```ts
behavior: string[]
// Plain bullet strings. Each describes one concrete interaction or rendering rule.
// "Display-only. No hover, click, focus, or keyboard events."
```

### `spacing`
```ts
spacing: GuidanceItem[]
// Each: { rule, detail }
// Rule: token or context name. Detail: exact token or guidance.
```

### `accessibility`
```ts
accessibility: GuidanceItem[]
// Each: { rule, detail }
// Cover: keyboard, ARIA, colour contrast, screen reader context
```

### `doItems` / `dontItems`
```ts
doItems: DoDontItem[]    // Each: { label, description, preview: ReactNode }
dontItems: DoDontItem[]  // Each: { label, description, preview: ReactNode }
// 2–3 items each. Previews show the real component (do) vs misuse (don't).
```

### `examplesInContext`
```ts
examplesInContext: ContextExample[]
// Each: { title, description, preview: ReactNode }
// Show the component inside a realistic UI container (table row, card, list item).
// 2–3 examples. Use real data (names, values) not Lorem ipsum.
```

### `relatedComponents`
```ts
relatedComponents: RelatedComponent[]
// Each: { slug, name, description, when }
// when: "Use instead when X" — the specific scenario.
```

### `designNotes`
```ts
designNotes: string[]
// Internal notes for designers: Figma mapping, token names, things that differ
// from typical expectations. 2–4 bullets max.
```

---

## ComponentDevDocData fields

### `installation`
```ts
installation: {
  prerequisites: string[]  // Commands to run once: ["npx shadcn add @raana/mtn-tokens", ...]
  command: string          // "npx shadcn add @raana/[slug]"
  importPath: string       // `import { X } from "@/components/ui/[slug]"`
  notes?: string[]         // Extra caveats e.g. peer dependencies
}
```
The install section auto-generates npm/pnpm/yarn/bun tab variants from `command`.

### `basicUsage`
```ts
basicUsage: string   // Multi-line code string. Import + 2–3 representative usages.
```

### `codeExamples`
```ts
codeExamples: CodeExample[]
// Each: { title, description?, preview?: ReactNode, code: string }
// preview: live rendered output. When provided, shows Preview/Code tabs.
// code: the JSX to reproduce the example. Should be self-contained.
// 3–5 examples. Cover: all variants, with icons/slots, sizes, in-context layout.
```

### `apiReference`
```ts
apiReference: PropertyDef[]
// Same shape as design `properties` but use TypeScript type syntax in `values`.
// e.g. `"info" | "success" | "warning"` instead of "info · success · warning"
```

### `accessibility`
```ts
accessibility: GuidanceItem[]
// Implementation-specific notes: ARIA attributes, keyboard handling, DOM requirements.
// Differs from design accessibility (which is about visual guidance).
```

---

## Writing previews

Preview components are small, self-contained JSX functions defined at the top of the doc file, above the `export const xxxDoc`.

Rules:
- Use `flex flex-wrap gap-2 justify-center` for multi-item previews
- Use real, meaningful labels — not "Label" or "Text"
- For context examples, wrap in a realistic container (`rounded-xl border overflow-hidden`)
- No external state needed — previews are static display

```tsx
// Good anatomy preview pattern
const AnatomyPreview = () => (
  <div className="flex flex-col items-center gap-6 py-2">
    <ComponentWithAllParts />
    <div className="flex items-start gap-10 text-center">
      {["① Part one", "② Part two", "③ Part three"].map(label => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="h-5 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
)
```

---

## Status and tags

Set on the `ComponentMeta` in `component-list.ts`, not in the doc file:

```ts
{ slug: "button", name: "Button", ..., status: "Ready", tags: ["Inputs", "Action"] }
```

`status`: `"Ready" | "In Review" | "Deprecated" | "New"`
`tags`: shown in the Overview section under the description text.

---

## Checklist before committing a doc

- [ ] All required fields populated (no empty arrays unless genuinely none apply)
- [ ] `overview.what` is one sentence, no jargon
- [ ] Previews use real content (not placeholder text)
- [ ] `codeExamples` have `preview` for at least the first 2–3 examples
- [ ] `devDoc.installation.command` matches the slug in `component-list.ts`
- [ ] Entry added to `docMap` in `page.tsx`
- [ ] `status` and `tags` set on the component in `component-list.ts`
