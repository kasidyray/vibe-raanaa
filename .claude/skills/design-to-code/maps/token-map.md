# Token Map

Visual property → Tailwind utility class backed by a CSS design token.
Never use raw hex, rgb(), oklch(), or hardcoded values. Every visual property must resolve to one of these.

---

## Colour — Backgrounds

| Visual intent | Tailwind class | Notes |
|---|---|---|
| Page / canvas background | `bg-background` | Main app surface |
| Card / panel surface | `bg-card` | Slightly elevated above background |
| Popover / dropdown surface | `bg-popover` | — |
| Subtle fill / muted area | `bg-muted` | Table headers, section backgrounds |
| Accent / hover fill | `bg-accent` | Hover states, active nav items |
| Primary brand (MTN Yellow) | `bg-primary` | Use sparingly — main CTA only |
| Destructive fill | `bg-destructive` | — |
| Success fill | `bg-success` | — |
| Success subtle fill | `bg-success-lighter` | — |
| Warning fill | `bg-warning` | — |
| Warning subtle fill | `bg-warning-lighter` | — |
| Info fill | `bg-info` | — |
| Info subtle fill | `bg-info-lighter` | — |
| Error fill | `bg-error` | — |
| Transparent | `bg-transparent` | — |

---

## Colour — Text

| Visual intent | Tailwind class | Notes |
|---|---|---|
| Primary / body text | `text-foreground` | Default — do not set this explicitly unless overriding |
| Secondary / subdued text | `text-muted-foreground` | Timestamps, captions, labels, placeholder text |
| Text on primary (yellow) bg | `text-primary-foreground` | Dark text on yellow buttons |
| Text on card | `text-card-foreground` | — |
| Link / interactive text | `text-primary` or `underline` | — |
| Destructive / error text | `text-destructive` | — |
| Success text | `text-success` | — |
| Warning text | `text-warning` | — |
| Info text | `text-info` | — |
| Disabled text | `opacity-50` on parent | Don't change text colour directly |

---

## Colour — Borders

| Visual intent | Tailwind class | Notes |
|---|---|---|
| Default border | `border-border` or just `border` | — |
| Input border | `border-input` | — |
| Destructive border | `border-destructive` | Form validation errors |
| Primary/focus ring | `ring-ring` | Handled automatically by `input-focus-ring` class |
| Transparent border | `border-transparent` | — |

---

## Typography

| Visual intent | Tailwind class | Notes |
|---|---|---|
| Page title (h1) | `text-2xl font-semibold tracking-tight` | Used in settings-style pages |
| Section heading (h2) | `text-lg font-medium` | — |
| Card / component title | `text-base font-medium` or `text-sm font-medium` | — |
| Body text | `text-sm` | Default for most UI text |
| Small / caption | `text-xs` | — |
| Micro label (ALL CAPS) | `text-xs font-medium text-muted-foreground uppercase tracking-wide` | Section labels in drawers, detail panels |
| Column header in table | All caps, e.g. `"NAME"`, `"STATUS"` | String in column def `header` field |
| Tabular / numeric | `tabular-nums` | Counts, amounts, IDs |
| Truncate overflow | `truncate` | — |
| Monospace | `font-mono text-xs` | Code, IDs, request IDs |

---

## Spacing & Sizing

Use Tailwind's spacing scale. Do not use arbitrary values like `p-[13px]` unless unavoidable.

| Context | Convention |
|---|---|
| Page outer padding | `p-4 md:p-6` |
| Section gap (vertical) | `gap-6` between major sections |
| Card internal padding | `p-5` or `p-6` |
| Form field gap | `gap-1.5` between label and input |
| Form section gap | `gap-4` between fields |
| Inline icon + text gap | `gap-2` or `gap-2.5` |
| Toolbar control height | `h-8` (use `size="sm"` on Button/Select) |
| Table row avatar size | `size-7` or `size-8` |
| Drawer header avatar | `size-10` |

---

## Border Radius

All radius values come from the theme's `--radius` variable (0.75rem base).

| Context | Class |
|---|---|
| Buttons, inputs, badges, chips | `rounded-md` (calc(--radius - 2px)) |
| Cards, panels, modals | `rounded-xl` (calc(--radius + 4px)) |
| Avatars (circular) | `rounded-full` |
| Avatars (square / company logo) | `rounded-sm` |
| Larger containers | `rounded-2xl` |
| Never use | `rounded` (base), arbitrary `rounded-[Xpx]` |

---

## Shadows & Elevation

Do not use arbitrary `shadow-*` values or `drop-shadow`. The design system uses elevation through background colour steps (background → card → popover), not shadows.

| Context | Approach |
|---|---|
| Card elevation | `bg-card` + `border` is sufficient |
| Popover / dropdown | Handled by component internally |
| Raised / floating element | `shadow-md` maximum — prefer border + bg contrast |

---

## Semantic Colour Usage Guide

This is an MTN product. The primary brand colour is **yellow** (`bg-primary` / `text-primary`). Treat it the way you'd treat a brand accent — use it for the single most important CTA on a screen, not for general colouring.

| Semantic | When to use |
|---|---|
| `success` | Positive state: active, paid, approved, online |
| `warning` | Caution: expiring, needs attention, low |
| `info` | Neutral information: in progress, syncing |
| `destructive` / `error` | Failure, deleted, blocked, declined |
| `caution` (Badge only) | Pending, awaiting action — softer than warning |
| `neutral` (Badge/StatusBadge) | Inactive, archived, suspended, unknown |
