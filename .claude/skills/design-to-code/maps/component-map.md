# Component Map

Visual element → codebase component. Use this as the primary translation dictionary.
All components live in `components/ui/` unless noted.

---

## Actions & Controls

| Visual element | Component | Key props / notes |
|---|---|---|
| Filled/primary button | `Button variant="default"` | `size="default"` (h-9) |
| Outlined/secondary button | `Button variant="outline"` | — |
| Ghost/text button | `Button variant="ghost"` | — |
| Destructive action button | `Button variant="destructive"` | — |
| Link-style button | `Button variant="link"` | — |
| Icon-only button | `Button size="icon"` or `size="icon-sm"` | Always include `aria-label` |
| Button in loading/pending state | `Button loading={true}` | Disables + shows spinner automatically |
| Button group (segmented) | `ButtonGroup` | — |
| Checkbox | `Checkbox` | — |
| Toggle switch | `Switch` | — |
| Text input | `Input` | Full width by default |
| Textarea / multiline input | `Textarea` | — |
| Input with prefix/suffix icon | `InputGroup` | — |
| Dropdown select | `Select` + `SelectTrigger` + `SelectContent` + `SelectItem` | Use `size="sm"` in toolbars |
| Searchable dropdown / combobox | `Combobox` | — |
| Form field label | `Label` | Pair with `htmlFor` |
| OTP / pin input | `InputOtp` | — |

---

## Feedback & Status

| Visual element | Component | Key props / notes |
|---|---|---|
| Coloured pill / tag / label | `Badge` | variants: `info`, `success`, `warning`, `critical`, `neutral`, `caution` |
| Badge with icon | `Badge icon={<RiIcon />}` | — |
| Status indicator with dot | `StatusBadge` | Same variants as Badge. Use for live states: Active, Pending, Failed |
| Toast / snackbar notification | `toast()` from `sonner` | `toast.success()`, `toast.error()`, `toast.message()` |
| Alert banner (inline) | `Alert` + `AlertTitle` + `AlertDescription` | — |
| Loading spinner (standalone) | `Spinner` | — |
| Skeleton / content placeholder | `Skeleton` | Use `rounded-md` to match the shape being replaced |
| Progress bar | `Progress` | — |
| Tooltip on hover | `Tooltip` + `TooltipTrigger` + `TooltipContent` | — |

---

## Overlays & Panels

| Visual element | Component | Key props / notes |
|---|---|---|
| Centred modal / dialog | `Dialog` + `DialogContent` + `DialogHeader` + `DialogTitle` + `DialogFooter` | Default max-width `sm:max-w-md` |
| Right slide-in detail panel | `Drawer direction="right"` | Use `sm:max-w-md` for detail panels |
| Bottom sheet (mobile) | `Drawer` (default direction) | — |
| Dropdown menu from a trigger | `DropdownMenu` + `DropdownMenuTrigger` + `DropdownMenuContent` + `DropdownMenuItem` | Use `variant="destructive"` on destructive items |
| Context / right-click menu | `DropdownMenu` | Same as above |
| Popover / floating panel | `Popover` + `PopoverTrigger` + `PopoverContent` | — |
| Hover card / preview card | `HoverCard` + `HoverCardTrigger` + `HoverCardContent` | — |
| Confirmation / destructive alert | `AlertDialog` | Use for irreversible actions |
| Date picker | `Calendar` inside a `Popover` | — |

---

## Data Display

| Visual element | Component | Key props / notes |
|---|---|---|
| Data table / list with columns | `DataTable` | `variant="bordered"` for most pages, `variant="plain"` for inline/nested |
| Table toolbar (search + filters) | `DataTableToolbar` | Always `h-8` controls inside |
| Search bar in table toolbar | `DataTableSearch` | — |
| Multi-select filter dropdown | `DataTableFacetedFilter` | Pass `options` as `string[]` or `{ value, label }[]` |
| Sort menu | `DataTableSortMenu` | — |
| Column visibility toggle | `DataTableColumnToggle` | — |
| Pagination controls | `DataTablePagination` | Only render when `table.getFilteredRowModel().rows.length > 0` |
| Bulk action bar (floats on select) | `DataTableSelectionBar` | — |
| User avatar / profile picture | `Avatar` + `AvatarImage` + `AvatarFallback` | Use dicebear URL for mocks |
| Avatar with online dot | `Avatar` + absolute `span` with `bg-success` | See team page implementation |
| Horizontal divider | `Separator` | — |
| Vertical divider | `Separator orientation="vertical"` | — |
| Static data card | `rounded-xl border bg-card p-5` | No Card component — use these classes directly |
| Chart | `recharts` via `Chart` / `ChartContainer` | See `components/chart-area-interactive.tsx` for reference |

---

## Navigation & Layout

| Visual element | Component | Key props / notes |
|---|---|---|
| Page title + description + actions | `PageHeader` | `title`, `description`, `actions` props |
| Top navigation bar | `SiteHeader` | `left` and `right` slots |
| Breadcrumb trail | `Breadcrumb` + `BreadcrumbList` + `BreadcrumbItem` + `BreadcrumbLink` + `BreadcrumbPage` + `BreadcrumbSeparator` | Always in `SiteHeader left` slot |
| Tabbed navigation | `Tabs` + `TabsList` + `TabsTrigger` + `TabsContent` | Use `variant="pill"` on `TabsList` for data pages |
| Width-constrained content wrapper | `Container` | sizes: `sm`, `default`, `lg`, `xl`. No "full" — use plain div |
| Sidebar | Provided by `(main)` layout — never recreate | — |

---

## Empty & Zero States

| Visual element | Component | Key props / notes |
|---|---|---|
| Empty state with icon + CTA | `Empty` + `EmptyHeader` + `EmptyMedia` + `EmptyTitle` + `EmptyDescription` + `EmptyContent` | `EmptyMedia variant="icon"` for icon, `variant="image"` for illustration |
| No results from filter | Handled automatically by `DataTable` via `emptyMessage` prop | Do not build custom empty states for filtered tables |

---

## Icons

Package: `@remixicon/react`. Pattern: `Ri{Name}Line` or `Ri{Name}Fill`.
Never use lucide-react, heroicons, or any other icon library.
Never verify icon names by reading files — use the pattern directly.
