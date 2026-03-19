# Raana-xi — Claude Code Guidelines

## General rules
- Never modify an existing component unless the user explicitly asks.
- Always use `SiteHeader` (from `@/components/site-header`) for page headers — never create a custom `<header>` element.
- Never wrap page content in `<SidebarInset>` — the `(main)/layout.tsx` already provides it.
- Use `PageHeader` (from `@/components/ui/page-header`) for page title, description, and actions.
- Always use existing components and design tokens. Do not introduce raw hex colours or inline styles.

---

## Page structure pattern
Every page in `app/(main)/` follows this structure:

```tsx
export default function FooPage() {
  return (
    <>
      <SiteHeader left={<Breadcrumb>...</Breadcrumb>} />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        {/* Container size switcher wraps content */}
        <Container size={containerSize} className="flex flex-col gap-6">
          <PageHeader title="..." description="..." actions={...} />
          {/* page content */}
        </Container>
      </div>
    </>
  )
}
```

---

## Table patterns

### Row hover & select (plain / borderless tables)
Always use `group/row` on `<TableRow>` and move backgrounds to cells. Never rely on the default `hover:bg-accent` from `TableRow` for these variants.

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

### Row hover & select (bordered rows variant)
Same as above, plus hide the adjacent row's bottom border on hover/select:

```tsx
// Extra className on each TableCell:
variant === "bordered" && "border-b border-border group-hover/row:border-b-transparent group-data-[state=selected]/row:border-b-transparent [tr:has(+tr:hover)_&]:border-b-transparent [tr:has(+tr[data-state=selected])_&]:border-b-transparent"
```

### Header row
Always add `border-t` and suppress the default hover on header rows:

```tsx
<TableRow className="hover:bg-transparent! hover:ring-0 border-t">
```

---

## Table toolbar pattern
All toolbar controls must be `h-8` to stay uniform. This is the rule regardless of what goes inside the toolbar — buttons, selects, inputs, custom filters. Use the appropriate `size` prop to hit `h-8`:
- `Button` → `size="sm"` or `size="icon-sm"`
- `SelectTrigger` → `size="sm"`
- Plain `<input>` → explicit `h-8` in className
- `DataTableFacetedFilter` / `DataTableSortMenu` → already `h-8` via `Button size="sm"` internally

All toolbar controls also use `rounded-md`.

```tsx
{/* Search */}
<div className="relative flex-1 min-w-[140px] max-w-xs">
  <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
  <input
    placeholder="Search..."
    className="h-8 w-full rounded-md border border-input bg-transparent pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring"
  />
</div>

{/* Filter / sort buttons — always outline sm rounded-md with a leading icon */}
<Button variant="outline" size="sm" className="rounded-md">
  <RiFilterLine className="opacity-60" />
  Filter
  <RiArrowDownSLine className="opacity-60" />
</Button>
```

- Use `FacetedFilter` (Popover-based multi-select) for column filters — see `app/(main)/leads/page.tsx` for reference implementation.
- Use a `DropdownMenu` (not `Select`) for toolbar dropdowns (pagination style, sort by, etc.).
- Bulk action buttons (e.g. Delete) go on the `ml-auto` right side.

---

## Tabs pattern
- Use `variant="pill"` on `TabsList` for data pages.
- Wrap `TabsList` in `<div className="pb-4">` for spacing below.
- Never add a `border-b` separator under pill tabs.

```tsx
<Tabs defaultValue="...">
  <div className="pb-4">
    <TabsList variant="pill">
      <TabsTrigger value="...">Label</TabsTrigger>
    </TabsList>
  </div>
  <TabsContent value="...">...</TabsContent>
</Tabs>
```

---

## Container size switcher
Every data page should have a container size switcher in `PageHeader` actions, defaulting to `"xl"`.

```tsx
const [containerSize, setContainerSize] = React.useState<ContainerSize>("xl")
// In actions:
<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" size="icon" />}>
    <RiContractLeftRightLine />
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-36">
    <DropdownMenuGroup>
      <DropdownMenuLabel>Content width</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {containerSizes.map(({ value, label }) => (
        <DropdownMenuCheckboxItem key={value} checked={containerSize === value} onClick={() => setContainerSize(value)}>
          {label}
        </DropdownMenuCheckboxItem>
      ))}
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
```
