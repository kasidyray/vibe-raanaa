# Layout Map

Every page in this project falls into one of two contexts. Determine context first — it controls the entire structural skeleton.

---

## Context A — Inside the main shell (`app/(main)/`)

The sidebar and top bar are provided by `app/(main)/layout.tsx`. Never recreate them.

**Required skeleton — every page:**
```tsx
export default function FooPage() {
  const [containerSize, setContainerSize] = React.useState<ContainerSize>("xl")

  const content = (
    <>
      <PageHeader title="..." description="..." actions={...} />
      {/* page content */}
    </>
  )

  return (
    <>
      <SiteHeader left={<Breadcrumb>...</Breadcrumb>} />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 md:overflow-y-auto">
        <Container size={containerSize} className="flex flex-1 flex-col gap-6">{content}</Container>
      </div>
    </>
  )
}
```

`Container` is the de-facto width controller for all main pages. It accepts `"sm" | "default" | "lg" | "xl" | "full"` — use `"full"` for unrestricted width. It also provides the page-enter animation automatically.

**PageHeader actions always include the width switcher** — see `component-apis.md` for the full switcher implementation.

**Settings-style pages** (narrow forms, not data tables) use `Container size="sm"` fixed — no size switcher needed.

**Breadcrumb** always goes in `SiteHeader left`. Pattern:
```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Current Page</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

For deep routes (e.g. Settings > Billing), extend the breadcrumb with additional items and separators.

**Never** wrap page content in `<SidebarInset>` — the layout already provides it.
**Never** create a custom `<header>` element — always use `SiteHeader`.

---

## Context B — Outside the main shell (standalone pages)

Auth flows, onboarding wizards, full-screen views, error pages, landing pages.
Route group: `app/login3/`, `app/(auth)/`, or any route outside `(main)/`.

No `SiteHeader`, no `Container`, no width switcher required. Full creative control over layout.

**All design token and component API rules still apply in full.** No raw colours, no inline styles, no custom one-off components.

Typical standalone layout patterns:

**Centred card (auth / simple forms):**
```tsx
<div className="min-h-svh flex items-center justify-center p-4">
  <div className="w-full max-w-sm flex flex-col gap-6">
    {/* logo, form, links */}
  </div>
</div>
```

**Split panel (hero + form):**
```tsx
<div className="grid min-h-svh lg:grid-cols-2">
  <div className="flex flex-col gap-6 p-6 md:p-10">
    {/* form side */}
  </div>
  <div className="bg-muted hidden lg:block">
    {/* visual / hero side */}
  </div>
</div>
```

**Full-screen wizard:**
```tsx
<div className="min-h-svh flex flex-col">
  <header className="border-b px-6 py-4 flex items-center justify-between">
    {/* logo + step indicator + exit */}
  </header>
  <main className="flex flex-1 flex-col items-center justify-center p-6">
    <div className="w-full max-w-lg flex flex-col gap-6">
      {/* step content */}
    </div>
  </main>
</div>
```

---

## Context C — Inside the topbar shell (`app/(topbar)/`)

Use when an application has **fewer than 5 primary navigation links** and a sidebar would be visually excessive. The `AppTopbar` and `NotificationProvider` are provided by `app/(topbar)/layout.tsx` — never recreate them inside a page.

**When to choose topbar vs sidebar:**

| Signal | Choose |
|---|---|
| ≤ 4 primary nav links, flat hierarchy | Topbar (`app/(topbar)/`) |
| 5+ links, nested sections, or collapsible groups | Sidebar (`app/(main)/`) |

**Required page skeleton:**
```tsx
export default function FooPage() {
  const [containerSize, setContainerSize] = React.useState<ContainerSize>("xl")

  const content = (
    <>
      <PageHeader title="..." description="..." actions={...} />
      {/* page content */}
    </>
  )

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 md:overflow-y-auto">
      <Container size={containerSize} className="flex flex-1 flex-col gap-6">{content}</Container>
    </div>
  )
}
```

Pass the same `containerSize` to `AppTopbar` in `layout.tsx` so the topbar content aligns with the page content:
```tsx
<AppTopbar ... containerSize="xl" />
```

**No `SiteHeader`** — `AppTopbar` in `layout.tsx` is the header. Never add a second header inside a page.

**`PageHeader` is allowed** — it has no sidebar dependencies. Use it the same way as in `app/(main)/` pages, including the width switcher on data/list pages.

**No `SidebarInset`** — not applicable in this context.

**Configure `AppTopbar` in `layout.tsx`:**
```tsx
<AppTopbar
  logo={<img src="/logo.svg" alt="Logo" className="h-7 w-auto dark:invert" />}
  navItems={NAV_ITEMS}
  user={DEFAULT_USER}
  // right={<CustomRightControls />}  ← optional full override
/>
```

**`AppTopbar` is fully responsive:**
- **≥ md** — logo + horizontal nav links (with `DropdownMenu` for items that have sub-items) + right controls
- **< md** — logo + mode toggle + notification bell + hamburger → `Sheet` slides in from the left with the full nav

**Nav item shape:**
```ts
type TopbarNavItem = {
  title: string
  url: string
  icon?: React.ReactNode      // shown in mobile menu only
  items?: { title: string; url: string }[]  // renders as DropdownMenu on desktop
}
```

**Demo route:** `/topbar-demo` — see `app/(topbar)/topbar-demo/page.tsx`

---

## Page archetypes and their layout conventions

| Archetype | Context | Container size | Key structural note |
|---|---|---|---|
| Data list / table | A (main) | `xl` default, switchable | DataTable fills available width |
| Settings / forms | A (main) | `sm` fixed | Narrow, sectioned cards, no size switcher |
| Dashboard / overview | A (main) | `xl` or `full` | Stat cards + chart + activity, full-bleed chart option |
| Entity detail | A (main) | `lg` default | Breadcrumb shows parent, tabbed body |
| Placeholder / empty | A (main) | `xl` default | `Empty` component centred in flex-1 |
| Topbar app (≤4 links) | C (topbar) | `xl` default | No sidebar, no `SiteHeader`, no `PageHeader` — `AppTopbar` in layout.tsx |
| Auth / login | B (standalone) | N/A | Centred card or split panel |
| Onboarding wizard | B (standalone) | N/A | Full-screen with step progress |
| Error page (404 etc.) | B (standalone) | N/A | Centred, minimal |

For tabs usage and sidebar navigation, see `component-apis.md`.
