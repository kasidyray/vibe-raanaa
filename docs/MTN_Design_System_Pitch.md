# MTN Unified Design System
### A Proposal to Eliminate Design-Development Friction Across MTN Products

---

## The Problem

Every time a designer hands off work to a developer at MTN, something is lost.

The designer uses colours, spacing, components, and type styles that only exist in Figma. The developer has to interpret them, approximate them, and then write CSS from scratch. The result? Components that look slightly different across products. Colours that drift from brand guidelines. Spacing that feels inconsistent. And developers spending hours rebuilding the same button, badge, or data table that another team already built last quarter.

This is not a people problem. It is a systems problem — and it has a clear fix.

---

## The Solution: One System, Shared by Both Sides

We have built a unified design system where **the components in Figma and the components in code are the same thing**.

Every visual token — colour, typography, spacing, border radius — is defined once. Designers reference it in Figma. Developers reference it in code. There is no translation layer, no interpretation, no drift.

When a designer places a `Button` in Figma and a developer builds a page with `<Button>`, they are working from the same definition.

---

## How It Works

### Design Tokens — One Source of Truth

Rather than using raw colour values like `#FFCB00`, we define a named token: `primary`. In Figma, this token maps to a style. In code, it maps to a CSS variable. Both resolve to the same thing.

| Token Name | Visual Intent | Example |
|---|---|---|
| `primary` | MTN Yellow — main CTA only | Primary buttons, key highlights |
| `background` | Page canvas | App surface |
| `card` | Panel / elevated surface | Cards, drawers, modals |
| `muted-foreground` | Subdued text | Timestamps, captions, labels |
| `success` / `warning` / `destructive` | Status colours | Alerts, badges, status indicators |

This means a designer can never accidentally use the wrong yellow — and a developer can never hardcode a hex value and have it drift out of brand.

### Component Library — Built Once, Used Everywhere

The system ships with a full set of production-ready components. Each component has:

- A defined API (props, variants, sizes)
- An accessibility baseline built in (ARIA labels, keyboard navigation, focus management)
- Behaviour rules (when to use it, what it replaces, what it cannot be substituted with)

**Core components included:**

| Component | Purpose |
|---|---|
| `Button` | 6 variants, 4 sizes, built-in loading state |
| `Badge` / `StatusBadge` | Categorical labels and live status indicators |
| `DataTable` | Sortable, filterable, paginated table with search, column toggles, and selection bar |
| `Drawer` | Slide-in detail panels (right/bottom) |
| `Dialog` | Confirmation and form modals |
| `PageHeader` | Consistent page titles, descriptions, and action rows |
| `Container` | Responsive width controller with page-enter animation |
| `Empty` | Structured empty states with CTA, used for no-data and no-results scenarios |
| `Tabs` | Pill and underline variants |
| `Skeleton` | Shape-matched loading states — no spinners |

Every page using this system handles five states by default: **loading, empty, no results, error, and success.** Nothing ships without all five.

### Figma-to-Code Parity

The design files in Figma are built on the same token and component definitions as the codebase. This means:

- A designer annotating a component in Figma is describing a component that already exists in code.
- A developer reading a Figma spec does not need to invent anything — they reference the component API and compose the page.
- Redlines and pixel-perfect specs become unnecessary — the system defines the visual output.

---

## The Developer Experience

Any developer who adopts this system can build a fully functional page — with a table, filters, a drawer, empty states, loading skeletons, and toast notifications — in a fraction of the time it would take starting from scratch.

The system includes:

- **A component API reference** — every prop, variant, and usage rule documented in one place
- **Layout archetypes** — pre-defined patterns for list pages, detail drawers, settings pages, and multi-step flows
- **Constraint rules** — explicit "never do" lists to prevent teams from introducing inconsistencies
- **Reference pages** — full working examples of a table with filters, an audit log, and a collaboration flow

A new developer joining any MTN product team can read the documentation in under an hour and begin contributing without needing to ask what the "right way" to build a page is.

---

## Multi-Team, Multi-Project Reuse

This is not a single product's component library. It is designed to be shared.

**How teams adopt it:**

1. A product team installs the component package and the Figma library.
2. Their designers work within the token and component system — no custom overrides.
3. Their developers build pages using the same components — no reinvention.
4. Both sides reference the same single source of truth.

**What stays consistent across all teams using the system:**

- MTN brand colours (yellow, white, dark) — applied correctly, every time
- Typography scale — headings, body, captions, all at the right size and weight
- Spacing rhythm — consistent padding and gaps across all surfaces
- Component behaviour — buttons, forms, tables, modals all behave the same way across products
- Accessibility — keyboard navigation, ARIA labels, and focus management are built in, not bolted on

**What each team keeps ownership of:**

- Their own data models and API integrations
- Their own page structure and feature logic
- Their own product decisions and roadmap

The design system constrains the visual and interaction layer. It never constrains the product.

---

## What This Delivers for MTN

| Without a unified system | With this system |
|---|---|
| Each team rebuilds buttons, tables, and forms | Components built once, used across all products |
| Designers and developers maintain separate "truths" | One token and component definition shared by both |
| Brand inconsistency across MTN products | Brand compliance enforced at the system level |
| Long handoff cycles with redlines and QA rounds | Designers annotate using real component names — developers build directly |
| Accessibility added as an afterthought | Accessibility built into every component by default |
| New developers take weeks to match the visual standard | New developers are productive within hours |

---

## Current State

The system is production-ready. It includes:

- A full component library with documented APIs
- A token system covering colour, typography, spacing, and borders
- Reference pages demonstrating every major interaction pattern
- A constraint set that prevents drift and enforces consistency
- Integration with AI-assisted design-to-code tooling (Figma MCP) — a developer can paste a Figma URL and receive production-ready component code mapped to the system

---

## Recommendation

We recommend MTN formally adopt this design system as the shared foundation for all internal product teams. Specifically:

1. **Standardise the Figma library** — all design work references the shared token and component library
2. **Standardise the component package** — all frontend teams install and use the shared component library
3. **Establish a governance process** — a small working group reviews proposed additions to the system before they are added
4. **Deprecate one-off implementations** — teams with existing products migrate to the system over a defined transition period

The investment is front-loaded. The returns compound: every new product built on this foundation is faster, more consistent, and cheaper to maintain than the last.

---

## Conclusion

The cost of inconsistency is invisible until it accumulates. Duplicated work. Misaligned brands. Slow handoffs. Accessibility gaps discovered in QA. Designers and developers talking past each other.

This system removes all of that — not by adding process overhead, but by creating a shared language that both designers and developers speak natively.

One system. Built once. Used everywhere.

---

*Prepared by the Product Engineering team*
*raana-xi Design System — March 2026*
