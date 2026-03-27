# Coding Standards

Conventions that keep the codebase consistent, readable, and easy to change.
These apply to all files across the project.

---

## Naming conventions

| Thing | Convention | Example |
|---|---|---|
| Page files | `kebab-case.tsx` | `page.tsx`, `customers-table.tsx` |
| Component files | `kebab-case.tsx` | `add-customer-drawer.tsx` |
| Hook files | `use-kebab-case.ts` | `use-customers.ts` |
| Type files | `kebab-case.ts` | `types.ts` |
| Constant files | `kebab-case.ts` | `constants.ts` |
| Column files | `kebab-case-columns.tsx` | `customers-columns.tsx` |
| React components | `PascalCase` | `CustomersTable`, `AddCustomerDrawer` |
| TypeScript types/interfaces | `PascalCase` | `Customer`, `NewCustomer` |
| Hooks | `camelCase` with `use` prefix | `useCustomers`, `useLeads` |
| Constant values | `SCREAMING_SNAKE_CASE` | `CUSTOMER_STATUS_OPTIONS` |
| Props types | `Props` (local) or `[Component]Props` (exported) | `type Props = { ... }` |
| Event handlers | `handle[Action]` | `handleSubmit`, `handleDelete` |
| Boolean state | `is` or `has` prefix | `isLoading`, `isOpen`, `hasError` |

---

## Component extraction rules

Extract a component when:
- The same JSX block appears in 2 or more places
- A block exceeds ~60 lines and has a single clear responsibility
- A block manages its own state independently from its parent

Do not extract when:
- It is used once and is a simple layout composition
- Extraction would require passing more than 5 props
- The result would be a component only ever used in one parent

When in doubt, compose inline from existing components. Over-abstraction creates more coupling than it removes.

---

## Re-render guards

These rules prevent unnecessary re-renders without adding complexity:

**Column definitions** — always defined outside the component or memoised if they depend on props:

```tsx
// Good — defined at module level
const columns: ColumnDef<Customer>[] = [ ... ]

// Good — factory called outside render or wrapped in useMemo
const columns = React.useMemo(() => getColumns(onEdit), [onEdit])

// Bad — recreated on every render
function CustomersTable() {
  const columns = [ ... ] // new array every render — breaks TanStack memo
}
```

**Static option arrays** — always in `constants.ts`, never inline in JSX:

```tsx
// Good
import { CUSTOMER_STATUS_OPTIONS } from "./constants"
<DataTableFacetedFilter options={CUSTOMER_STATUS_OPTIONS} ... />

// Bad — new array every render
<DataTableFacetedFilter options={["active", "suspended"]} ... />
```

**Callback props** — wrap in `useCallback` when passing to a memoised child or a table column cell:

```tsx
const handleEdit = React.useCallback((customer: Customer) => {
  setSelected(customer)
  setDrawerOpen(true)
}, [])
```

Only memoize what actually causes a problem. Do not add `useMemo` and `useCallback` everywhere preemptively.

---

## TypeScript rules

- Always type component props explicitly — never use implicit `any`
- Prefer `type` over `interface` for component props
- Prefer `interface` for domain entities that may be extended (e.g. `Customer`, `Lead`)
- Never use `as unknown as T` to force a cast — fix the type instead
- Never suppress TypeScript errors with `// @ts-ignore` — fix the root cause
- Always type the return of data hooks explicitly

```tsx
// Good
function useCustomers(): { customers: Customer[]; isLoading: boolean; addCustomer: (d: NewCustomer) => void } { ... }

// Bad — inferred return with any leaking through
function useCustomers() { ... }
```

---

## Responsive conventions

| Context | Convention |
|---|---|
| Page outer padding | `p-4 md:p-6` — always, never change |
| Content wrapper | `flex flex-1 flex-col gap-6 md:overflow-y-auto` — always |
| Drawer width | `w-full sm:max-w-md` (default) or `sm:max-w-lg` for wide drawers |
| Column visibility | Hide secondary columns on small screens using `DataTableColumnToggle` |
| Text truncation | Use `truncate` on any text that may overflow its container |
| Fixed pixel widths | ❌ Never — use `max-w-*`, `w-full`, or percentage-based widths |

For drawers: always verify the drawer is usable on a 375px viewport. Long labels must truncate. Actions must stack or scroll.

---

## Complexity rules

- No function should exceed 80 lines. If it does, extract a helper or a component.
- No single JSX tree should exceed 100 lines without clear section comments.
- No more than 3 levels of conditional nesting in a single render block. Flatten with early returns.
- No magic numbers — always named constants.

```tsx
// Bad
if (customers.length > 50) { ... }

// Good — in constants.ts
export const MAX_DISPLAY_ROWS = 50
if (customers.length > MAX_DISPLAY_ROWS) { ... }
```

---

## Interactive element cursors

Every clickable element that is not a native `<Button>` component must have `cursor-pointer` explicitly in its className.

Tailwind v4 does not set `cursor: pointer` on `<button>` by default. Native `<Button>` from `@/components/ui/button` already includes it — but raw `<button>`, `<a>`, and custom trigger elements do not.

```tsx
// Good — cursor is explicit
<button className="cursor-pointer flex items-center gap-1.5 ...">View code</button>

// Good — Button component already includes cursor-pointer
<Button variant="ghost" size="sm">Close</Button>

// Bad — looks like text, not interactive
<button className="flex items-center gap-1.5 ...">View code</button>
```

Add `cursor-pointer` to the "done" checklist for every component that introduces a raw `<button>` or interactive `<div>`/`<a>`.

---

## Import order

Group imports in this order, separated by a blank line:

```tsx
// 1. React
import React from "react"

// 2. Third-party libraries
import { useReactTable } from "@tanstack/react-table"
import { toast } from "sonner"

// 3. Internal UI components
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table/data-table"

// 4. Feature-local files
import { getColumns } from "./customers-columns"
import { useCustomers } from "./use-customers"
import type { Customer } from "./types"
```

Never mix groups on the same line or import types with values unless using `import type`.

---

## What "done" means

A page or feature is not done until:

- [ ] All five states render correctly: loading skeleton, empty, no-results, error, success
- [ ] Every mutation has a loading button state and success/error toast
- [ ] All icon-only buttons have `aria-label`
- [ ] Every raw `<button>` (not `<Button>`) has `cursor-pointer` in its className
- [ ] All form inputs are associated with a `Label` via `htmlFor` / `id`
- [ ] No raw hex colours, no Tailwind colour scale, no inline styles
- [ ] No hardcoded option arrays inline in JSX
- [ ] Column definitions are outside the component
- [ ] `md:overflow-y-auto` is on the content wrapper
- [ ] The page is usable at 375px viewport width
- [ ] TypeScript has no errors (`tsc --noEmit` passes)
