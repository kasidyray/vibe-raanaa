# Data Conventions

How data is fetched, stored, transformed, and mutated in this project.
These rules apply to all pages in `app/(main)/` and all flows in `app/(flows)/`.

---

## The data hook pattern

Every page that displays data must have a `use-[feature].ts` hook. No exceptions.

The hook is the single place where:
- Data is fetched or simulated
- Loading and error state live
- Mutation functions are defined

The page calls the hook and passes results down as props. Components receive data — they do not fetch it.

```tsx
// page.tsx
const { customers, isLoading, addCustomer, deleteCustomer } = useCustomers()

// customers-table.tsx — receives, never fetches
type Props = {
  customers: Customer[]
  isLoading: boolean
  onRowClick: (customer: Customer) => void
}
```

---

## Simulating fetch (mock data)

All pages must simulate an async fetch, even with static mock data. This ensures:
- Skeleton loading states are always exercised
- The pattern is ready for real API integration with no structural change

```tsx
// use-customers.ts
React.useEffect(() => {
  setIsLoading(true)
  const t = setTimeout(() => {
    setCustomers(MOCK_CUSTOMERS)
    setIsLoading(false)
  }, 800)
  return () => clearTimeout(t)
}, [])
```

Never render real content while `isLoading === true`. Always render shape-matched skeletons instead (see constraints.md).

---

## State placement rules

| State type | Where it lives | Example |
|---|---|---|
| Server / async data | `use-[feature].ts` hook | `customers`, `isLoading` |
| UI-only, one component | Local `useState` in that component | drawer open/closed, tab value |
| Shared between siblings | Lifted to `page.tsx` | selected row passed to drawer |
| Derived from existing data | Computed inline — never stored | filtered count, total amount |
| Filter/sort state | Inside the table component | `columnFilters`, `sorting` |
| Container width | `page.tsx` only | `containerSize` |

**Never store derived state.** If you can compute it from existing state or data, do not create a separate `useState` for it.

```tsx
// Bad — stored derived state
const [activeCount, setActiveCount] = React.useState(0)
React.useEffect(() => {
  setActiveCount(customers.filter(c => c.status === "active").length)
}, [customers])

// Good — computed inline
const activeCount = customers.filter(c => c.status === "active").length
```

---

## Mutations

Every create, update, delete, or status-change must follow this exact pattern:

```tsx
const [isPending, setIsPending] = React.useState(false)

async function handleSubmit(data: NewCustomer) {
  setIsPending(true)
  try {
    await addCustomer(data)           // calls hook mutation
    toast.success("Customer added.")
    onOpenChange(false)               // close drawer on success
  } catch {
    toast.error("Something went wrong. Please try again.")
  } finally {
    setIsPending(false)
  }
}

// In JSX
<Button loading={isPending} onClick={handleSubmit}>Save</Button>
```

Rules:
- The submit button always receives `loading={isPending}`
- `toast.success()` always fires on success
- `toast.error()` always fires on failure
- The drawer or dialog closes **after** success, not before
- Never silently update state without user feedback

---

## Optimistic updates

For mutations where the API is fast and failure is unlikely (reorder, toggle, tag), apply an optimistic update:

```tsx
function toggleCustomerStatus(id: string) {
  // Apply immediately
  setCustomers(prev =>
    prev.map(c => c.id === id ? { ...c, status: c.status === "active" ? "suspended" : "active" } : c)
  )
  // Fire toast
  toast.success("Status updated.")
  // In a real app: call API, revert on failure
}
```

For destructive actions (delete), always require confirmation via a `Dialog` before mutating.

---

## Error states

If a fetch fails, render an inline `Alert` with a retry action, or an `Empty`-style error state with a retry button. Never show a blank page or leave the user with no recovery path.

```tsx
if (error) {
  return (
    <Alert variant="destructive">
      <AlertDescription>
        Failed to load customers.{" "}
        <button className="underline" onClick={retry}>Try again</button>
      </AlertDescription>
    </Alert>
  )
}
```

---

## Data transformation

Never pass raw API response shapes directly to UI components. Transform at the hook boundary.

```tsx
// Bad — UI component receives raw API shape and maps it
<CustomerRow data={apiResponse.data.customers[0]} />

// Good — hook transforms before returning
function useCustomers() {
  ...
  const customers: Customer[] = raw.data.customers.map(toCustomer)
  return { customers }
}
```

This decouples your UI from the API contract. When the API changes, only the hook needs updating.

---

## Data flow diagram

```
Mock data / API
      ↓
use-[feature].ts   ← owns fetch, loading, error, mutations
      ↓
page.tsx           ← owns layout, selected row, drawer open state
      ↓
[feature]-table.tsx  ←  [feature]-drawer.tsx
      ↓
[feature]-columns.tsx
```

Data flows down through props. Events flow up through callbacks. No component reaches across the tree for data.
