# Component APIs

Full usage reference for every component in this design system.
This is the single source of truth — do not read the component source files.

---

## Icons

Package: `@remixicon/react`. Pattern: `Ri{Name}Line` or `Ri{Name}Fill`.
Never use lucide-react, heroicons, or any other icon library.
Never verify icon existence by reading files — just use the pattern directly.

Common icons used in this project:
`RiUserLine`, `RiSettingsLine`, `RiDatabase2Line`, `RiHistoryLine`, `RiShieldLine`, `RiKeyLine`,
`RiServerLine`, `RiBankCardLine`, `RiCalendarLine`, `RiCheckLine`, `RiCloseLine`, `RiCodeLine`,
`RiDownloadLine`, `RiContractLeftRightLine`, `RiAddLine`, `RiDeleteBinLine`, `RiEditLine`,
`RiMailLine`, `RiMore2Line`, `RiSearchLine`, `RiFilterLine`, `RiArrowDownSLine`, `RiRefreshLine`,
`RiFolderLine`, `RiGroupLine`, `RiTableLine`, `RiPieChartLine`, `RiFlashlightLine`, `RiLayoutGridLine`

---

## Button

```tsx
// variants: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
// sizes: "default"(h-9) | "sm"(h-8) | "lg"(h-10) | "xs"(h-6)
//        "icon"(h-9) | "icon-sm"(h-8) | "icon-lg"(h-10) | "icon-xs"(h-6)
// loading={boolean} — shows spinner, disables the button automatically
<Button variant="outline" size="sm" loading={isPending}>Save</Button>
<Button size="icon-sm" aria-label="Close"><RiCloseLine /></Button>
```

---

## Badge

Coloured pill for categorical labels, roles, types.

```tsx
// variants: "info" | "success" | "warning" | "critical" | "neutral" | "caution"
// sizes: "sm" | "default" | "lg"
<Badge variant="info" size="default">Label</Badge>
<Badge variant="warning" size="sm" icon={<RiSomeIcon />}>With icon</Badge>
```

---

## StatusBadge

Bordered pill with a coloured dot. Use for live/dynamic status only (Active, Pending, Failed, etc.).

```tsx
// variants: "info" | "success" | "warning" | "critical" | "neutral" | "caution"
// sizes: "sm" | "default" | "lg"
<StatusBadge variant="success">Active</StatusBadge>
<StatusBadge variant="caution">Pending</StatusBadge>
<StatusBadge variant="neutral">Suspended</StatusBadge>
```

---

## Container

Width-constrained content wrapper. Never use for full-width — use a plain `div` instead.

```tsx
// sizes: "sm" (max-w-2xl) | "default" (max-w-4xl) | "lg" (max-w-6xl) | "xl" (max-w-7xl)
// Does NOT support "full"
<Container size="xl" className="flex flex-1 flex-col gap-6">...</Container>
```

---

## PageHeader

Page title, description, and actions row. Always the first element inside `content`.

```tsx
<PageHeader
  title="Page title"
  description="Optional subtitle"   // renders as <p className="text-sm text-muted-foreground">
  actions={<div className="flex items-center gap-2">...</div>}
/>
```

---

## Container size switcher

Every `app/(main)/` data/list page includes this in `PageHeader` actions, defaulting to `"xl"`.
Settings-style pages use a fixed `Container size="sm"` and do not need the switcher.

```tsx
type ContainerSize = "sm" | "default" | "lg" | "xl" | "full"

const containerSizes: { value: ContainerSize; label: string }[] = [
  { value: "sm",      label: "Small"   },
  { value: "default", label: "Default" },
  { value: "lg",      label: "Large"   },
  { value: "xl",      label: "X-Large" },
  { value: "full",    label: "Full"    },
]

<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" aria-label="Change width" />}>
    <RiContractLeftRightLine />
    Width
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-36">
    <DropdownMenuGroup>
      <DropdownMenuLabel>Content width</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {containerSizes.map(({ value, label }) => (
        <DropdownMenuCheckboxItem
          key={value}
          checked={containerSize === value}
          onClick={() => setContainerSize(value)}
        >
          {label}
        </DropdownMenuCheckboxItem>
      ))}
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## Empty state

Use for zero-data states. Never build a custom empty state from scratch.

```tsx
<Empty className="border">
  <EmptyHeader>
    <EmptyMedia variant="icon"><RiSearchLine /></EmptyMedia>
    <EmptyTitle>Nothing here</EmptyTitle>
    <EmptyDescription>Descriptive text explaining the empty state.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button variant="outline" size="sm"><RiAddLine />Add item</Button>
  </EmptyContent>
</Empty>
```

`EmptyMedia variant="icon"` for Remix icons, `variant="image"` for illustrations.
For filtered no-results states inside a `DataTable`, use the `emptyMessage` prop — do not build a separate empty component.

---

## Tabs

Use `variant="pill"` on data pages. Never add a `border-b` separator under pill tabs.

```tsx
<Tabs defaultValue="...">
  <div className="pb-4">
    <TabsList variant="pill">
      <TabsTrigger value="all">
        All
        {count > 0 && <span className="ml-1.5 tabular-nums text-muted-foreground">{count}</span>}
      </TabsTrigger>
      <TabsTrigger value="pending">Pending</TabsTrigger>
    </TabsList>
  </div>
  <TabsContent value="all">...</TabsContent>
  <TabsContent value="pending">...</TabsContent>
</Tabs>
```

---

## DataTable

Handles rendering, empty state, and row hover/select styling internally. Always prefer this over a raw `<Table>`.

```tsx
// variant: "plain" | "bordered"
// emptyMessage: shown when no rows match filters
// onRowClick: makes rows clickable, receives the row's original data object
<DataTable
  table={table}
  variant="bordered"
  emptyMessage="No items found."
  onRowClick={setSelected}
/>
```

### TanStack table setup

```tsx
const table = useReactTable({
  data,
  columns,
  state: { sorting, globalFilter, rowSelection, columnVisibility, columnFilters },
  onSortingChange: setSorting,
  onGlobalFilterChange: setGlobalFilter,
  onRowSelectionChange: setRowSelection,
  onColumnVisibilityChange: setColumnVisibility,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getSortedRowModel: getSortedRowModel(),
  // Override to search across multiple/nested fields:
  globalFilterFn: (row, _columnId, filterValue: string) => {
    const q = filterValue.toLowerCase()
    return row.original.name.toLowerCase().includes(q) || row.original.email.toLowerCase().includes(q)
  },
})
```

### Column filterFn for faceted filters

```tsx
{
  accessorKey: "status",
  filterFn: (row, _id, filterValues: string[]) =>
    filterValues.length === 0 || filterValues.includes(row.original.status),
}
```

For `accessorFn` columns (computed values), set `id` explicitly:

```tsx
{
  id: "actorName",
  accessorFn: row => row.actor.name,
  filterFn: (row, _id, filterValues: string[]) =>
    filterValues.length === 0 || filterValues.includes(row.original.actor.name),
}
```

### Table toolbar

All toolbar controls must be `h-8`. Use `size="sm"` on Button and SelectTrigger. All controls use `rounded-md`.

```tsx
<DataTableToolbar>
  <DataTableSearch table={table} placeholder="Search..." />

  <DataTableFacetedFilter
    title="Status"
    options={["active", "inactive"]}               // string[] or { value, label }[]
    selectedValues={statusFilter}
    onSelectionChange={setStatusFilter}
    icon={<RiSomeIcon className="opacity-60" />}   // optional
  />

  {hasActiveFilters && (
    <button
      onClick={resetFilters}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      Reset
    </button>
  )}

  <div className="ml-auto flex items-center gap-2">
    <DataTableSortMenu
      sorting={sorting}
      onSortingChange={setSorting}
      columns={[{ id: "name", label: "Name" }, { id: "createdAt", label: "Date" }]}
    />
    <DataTableColumnToggle table={table} />
  </div>
</DataTableToolbar>
```

Active filter button styling:
```tsx
className={cn("rounded-md", isActive && "border-primary/40 bg-primary/5 text-foreground")}
```

Use `DropdownMenu` (not `Select`) for toolbar dropdowns. Bulk action buttons go on the `ml-auto` right side.

### Pagination

Only render when there are rows to paginate:
```tsx
{table.getFilteredRowModel().rows.length > 0 && (
  <DataTablePagination table={table} style="classic" rowLabel="item" selectedCount={selectedCount} />
)}
```

### Selection bar

Floats above content when rows are selected:
```tsx
<DataTableSelectionBar
  count={selectedCount}
  onClear={() => setRowSelection({})}
  actions={[
    { icon: RiEditLine,     label: "Edit"   },
    "separator",
    { icon: RiDeleteBinLine, label: "Delete", variant: "destructive", onClick: () => {} },
  ]}
/>
```

### Row hover & select — plain / borderless tables

Use `group/row` on `<TableRow>` and move backgrounds to cells:

```tsx
<TableRow
  data-state={row.getIsSelected() ? "selected" : undefined}
  className="group/row border-0 hover:bg-transparent! data-[state=selected]:bg-transparent! hover:ring-1 hover:ring-inset hover:ring-border hover:rounded-md data-[state=selected]:ring-1 data-[state=selected]:ring-inset data-[state=selected]:ring-border data-[state=selected]:rounded-md"
>
  {cells.map((cell, i) => (
    <TableCell
      key={cell.id}
      className={cn(
        "group-hover/row:bg-muted/50 group-data-[state=selected]/row:bg-muted",
        i === 0 && "group-hover/row:rounded-l-md group-data-[state=selected]/row:rounded-l-md",
        i === cells.length - 1 && "group-hover/row:rounded-r-md group-data-[state=selected]/row:rounded-r-md",
      )}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  ))}
</TableRow>
```

### Row hover & select — bordered variant

Same as above, plus add border suppression on adjacent rows:

```tsx
// Extra className on each TableCell:
variant === "bordered" && "border-b border-border group-hover/row:border-b-transparent group-data-[state=selected]/row:border-b-transparent [tr:has(+tr:hover)_&]:border-b-transparent [tr:has(+tr[data-state=selected])_&]:border-b-transparent"
```

### Header row

Always suppress default hover and add top border:
```tsx
<TableRow className="hover:bg-transparent! hover:ring-0 border-t">
```

---

## Sidebar navigation

To add a page to the sidebar, edit `components/app-sidebar.tsx` → `data.navMain`:

```tsx
{ title: "Page Name", url: "/route", icon: <RiSomeIcon /> }
```

Import the icon in the existing `@remixicon/react` import at the top of that file.
