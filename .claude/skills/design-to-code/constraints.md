# Constraints — Hard Rules

These rules apply to **all work in this project** — not just design-to-code tasks. They cannot be overridden by a design, a user description, or what "looks closer to the design". If a constraint conflicts with replicating the design exactly, the constraint wins.

## Core project rules

- Never modify an existing component in `components/ui/` unless the user explicitly asks.
- Always use `SiteHeader` for page top bars — never create a custom `<header>` element.
- Never wrap page content in `<SidebarInset>` — `app/(main)/layout.tsx` already provides it.
- Always use `PageHeader` for page title, description, and actions inside `app/(main)/`.
- Always use existing components and design tokens. Never introduce raw hex colours or inline styles.

---

---

## Never do — Colours

- ❌ Raw hex values: `#3b82f6`, `#fff`, `#1a1a1a`
- ❌ Raw rgb/oklch/hsl: `rgb(59, 130, 246)`, `oklch(0.55 0.17 250)`
- ❌ Tailwind colour scale directly: `bg-blue-500`, `text-gray-700`, `border-red-300`
- ❌ Inline colour styles: `style={{ color: '#333' }}`, `style={{ backgroundColor: 'blue' }}`

✅ Only use semantic token classes: `bg-primary`, `text-muted-foreground`, `bg-success`, `border-destructive`, etc.

**Exception:** Dynamic values with no token equivalent (e.g. user-supplied brand colours for company avatars in mock data) may use inline style only for that single dynamic value.

---

## Never do — Styles

- ❌ `style={{ padding: '13px' }}`, `style={{ gap: '7px' }}` — use Tailwind spacing scale
- ❌ Arbitrary Tailwind values unless unavoidable: `p-[13px]`, `w-[347px]`
- ❌ `className="..."` with raw CSS properties mixed in
- ❌ Absolute positioning for layout purposes — use flexbox/grid
- ❌ Fixed pixel widths on containers — use `Container` sizes or `max-w-*` tokens

---

## Never do — Components

- ❌ Create a new component file to solve a one-time layout need — compose from existing components
- ❌ Build a raw `<table>` for data that should use `DataTable`
- ❌ Build a custom `<header>` element — always use `SiteHeader`
- ❌ Wrap page content in `<SidebarInset>` — the layout provides it
- ❌ Import icons from lucide-react, heroicons, or any library other than `@remixicon/react`
- ❌ Use `PageHeader` outside `app/(main)/` pages
- ❌ Add a `border-b` under pill tabs

---

## Never do — Structure

- ❌ Skip the `containerSize === "full"` branch — it is always required alongside `Container`
- ❌ Hardcode `Container` without the size switcher on data/list pages
- ❌ Render `DataTablePagination` when `table.getFilteredRowModel().rows.length === 0`
- ❌ Use `Select` for toolbar dropdowns (sort, filter style) — use `DropdownMenu`
- ❌ Build a custom modal/dialog from scratch — use `Dialog`
- ❌ Build a custom slide-in panel — use `Drawer direction="right"`

---

## Always do — States

Every interactive page must handle all five states. Do not ship a page missing any of these:

| State | How to handle |
|---|---|
| **Empty** (no data yet) | `Empty` + `EmptyHeader` + `EmptyMedia` + `EmptyTitle` + `EmptyDescription` + `EmptyContent` with CTA |
| **No results** (filters active) | Handled by `DataTable` `emptyMessage` prop — do not build custom |
| **Loading** | `Skeleton` components matching the **exact shape** of the loaded content — see rules below |
| **Error** | Inline `Alert` with retry action, or `Empty`-style with retry button |
| **Success** | `toast.success()` from `sonner` — always fires after a mutation |

### Loading skeleton rules

These apply to every page and every step that fetches or simulates fetching data:

- **Shape must match** — skeleton layout must mirror the real content: same number of rows, same approximate heights and widths. Never use a generic spinner or a single block.
- **Simulate fetch on every page** — even pages with mock data must use `React.useEffect` + `setTimeout` to simulate a fetch delay, then render skeletons while `isLoading === true`.
- **`app/(main)/` data pages** — skeleton rows should mirror table row height (`h-4` label + `h-9` input or `h-8` row). Match the column count of the real table.
- **`app/(main)/` settings pages** — each `SettingsSection` card gets a skeleton header + N skeleton rows matching the actual rows in that section.
- **`app/(flows)/` multi-step form pages** — the full `MultiStepLayout` shell renders immediately (header, sidebar, footer). Only the **main step content area** shows skeletons while step data loads. Use `StepSkeleton` from `components/multi-step-form/step-skeleton.tsx`.
- **Sidebar in flows** — always render the sidebar immediately (step titles are known upfront). Never skeleton the sidebar.
- **Footer in flows** — always render immediately with the next button disabled while step data is loading.
- ❌ Never render a page's real content while `isLoading === true`
- ❌ Never use `<Spinner />` as a full-page loading state — always use shape-matched skeletons

---

## Always do — Mutations

Every create, update, delete, or status-change action must:
1. Show a loading state on the triggering button (`loading={isPending}`)
2. Fire `toast.success("...")` on success
3. Fire `toast.error("...")` on failure (if failure is a real possibility)

Never silently update state without user feedback.

---

## Always do — Accessibility

- All icon-only buttons must have `aria-label`
- All form inputs must be associated with a `Label` via `htmlFor` / `id`
- Destructive actions in dropdowns use `variant="destructive"` on `DropdownMenuItem`
- Checkboxes that select rows must have `aria-label="Select row"`

---

## Design gaps — how to handle them

When the design contains an element that has no match in the component system:

1. **Check if it's a composition** — can it be built from two or more existing components? If yes, compose it.
2. **Check if it approximates** — is there a close-enough existing component that serves the same purpose? If yes, use it and note the approximation in the audit.
3. **If neither** — do not invent a new pattern. Surface it as ✗ in the audit, flag it to the user, and skip it or stub it with a placeholder. Do not silently deviate from the system.

The design system's job is to constrain — not everything a designer draws can or should exist in code immediately.
