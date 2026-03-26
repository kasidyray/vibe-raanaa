# File Structure

Every page folder must follow this shape. Determine which files are needed before writing any code.

---

## Standard page folder

```
app/(main)/[feature]/
  page.tsx                    ← shell only: layout, SiteHeader, Container, state coordination
  [feature]-table.tsx         ← table + toolbar composite (receives data as props)
  [feature]-columns.tsx       ← TanStack column definitions only — no JSX outside column cells
  add-[feature]-drawer.tsx    ← add/create drawer
  edit-[feature]-drawer.tsx   ← edit/update drawer (if distinct from add)
  [feature]-detail-drawer.tsx ← read-only detail panel (if needed)
  use-[feature].ts            ← data hook: fetch, loading, error, mutation handlers
  types.ts                    ← TypeScript types local to this feature
  constants.ts                ← static arrays, option lists, config values
```

Not every file is needed on every page. Only create what the feature requires.

---

## Responsibility of each file

### `page.tsx`
- Owns layout skeleton: `SiteHeader`, content wrapper, `Container`, `PageHeader`
- Owns container size state (`containerSize`, `setContainerSize`)
- Owns top-level UI state: which drawer is open, which row is selected
- Calls the data hook and passes data down as props
- Does **not** contain column definitions, option arrays, or business logic
- Does **not** make fetch calls directly — delegates to the hook

```tsx
// Good
const { customers, isLoading, addCustomer } = useCustomers()
<CustomersTable customers={customers} isLoading={isLoading} onRowClick={setSelected} />

// Bad — fetch logic directly in page
const [customers, setCustomers] = React.useState([])
React.useEffect(() => { fetch("/api/customers").then(...) }, [])
```

### `[feature]-table.tsx`
- Receives data and callbacks as props
- Owns table instance (`useReactTable`), filter state, sort state, row selection state
- Renders `DataTable` with toolbar and pagination
- Does **not** fetch data or own loading state — receives `isLoading` as a prop and renders skeletons

### `[feature]-columns.tsx`
- Exports a `columns` array (or a `getColumns` factory if columns need callbacks)
- Contains only column definitions — `accessorKey`, `header`, `cell`, `filterFn`
- All cell JSX stays inside the `cell` function — no outside JSX
- Never import page-level state or hooks directly

```tsx
// Good
export function getColumns(onEdit: (row: Customer) => void): ColumnDef<Customer>[] { ... }

// Bad — columns defined inline in page.tsx or table component
```

### `add-[feature]-drawer.tsx` / `edit-[feature]-drawer.tsx`
- Self-contained: owns its own form state
- Receives `open`, `onOpenChange`, and a submit callback as props
- Calls the mutation via the passed callback — does not call the hook directly
- Always shows loading state on the submit button and fires success/error toasts

### `use-[feature].ts`
- Single hook that owns all data for the feature
- Returns: `data`, `isLoading`, `error`, and all mutation functions
- Simulates fetch with `useEffect` + `setTimeout` for mock data (see constraints.md)
- Mutation functions handle optimistic update or refetch internally

```tsx
export function useCustomers() {
  const [customers, setCustomers] = React.useState<Customer[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const t = setTimeout(() => {
      setCustomers(MOCK_CUSTOMERS)
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(t)
  }, [])

  function addCustomer(data: NewCustomer) { ... }
  function deleteCustomer(id: string) { ... }

  return { customers, isLoading, addCustomer, deleteCustomer }
}
```

### `types.ts`
- All TypeScript interfaces and types used across more than one file in the folder
- Exported and imported by other files in the folder
- Never inline types in `page.tsx` when they are shared

### `constants.ts`
- Static arrays: filter options, status lists, role lists, tab configs
- Never define these inline inside JSX or inside a component body

```tsx
// Good — in constants.ts
export const CUSTOMER_STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
]

// Bad — hardcoded inside table component
options={["active", "suspended"]}
```

---

## Sub-pages and nested routes

For entity detail pages (e.g. `/customers/[id]`):

```
app/(main)/customers/
  page.tsx                        ← list page
  [id]/
    page.tsx                      ← detail page shell
    customer-overview.tsx         ← overview tab content
    customer-activity.tsx         ← activity tab content
    use-customer.ts               ← hook for single entity
```

---

## What not to create

- ❌ A new file to solve a one-time layout composition — compose inline from existing components
- ❌ A `utils.ts` for one function used in one file — keep it in that file
- ❌ A `index.ts` barrel export per folder — import directly from the file
- ❌ A shared `types.ts` at the root level for page-local types — types stay in the feature folder
