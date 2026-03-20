# Raana-xi

Before writing any code in this project, read these files in order:

1. `.claude/skills/design-to-code/constraints.md` — rules that apply to all work
2. `.claude/skills/design-to-code/maps/component-apis.md` — every component's API and usage
3. `.claude/skills/design-to-code/maps/layout-map.md` — page structure and layout patterns
4. `.claude/skills/design-to-code/maps/token-map.md` — colour, typography, and spacing tokens

These are the single source of truth. Do not deviate from them.

---

## Do not read these files — stable and documented in component-apis.md

`components/ui/drawer.tsx`, `components/ui/badge.tsx`, `components/ui/status-badge.tsx`,
`components/ui/table.tsx`, `components/ui/tabs.tsx`, `components/ui/button.tsx`,
`components/ui/page-header.tsx`, `components/ui/container.tsx`, `components/ui/empty.tsx`,
`components/ui/data-table/data-table.tsx`, `components/ui/data-table/data-table-faceted-filter.tsx`,
`components/ui/data-table/data-table-search.tsx`, `components/ui/data-table/data-table-sort-menu.tsx`,
`components/ui/data-table/data-table-pagination.tsx`, `components/ui/data-table/data-table-toolbar.tsx`,
`components/ui/data-table/data-table-selection-bar.tsx`, `components/ui/data-table/data-table-column-toggle.tsx`

---

## Mock data conventions

- Avatars: `https://api.dicebear.com/9.x/micah/svg?seed={FirstName}`
- Company logos: `https://api.dicebear.com/9.x/initials/svg?seed={Letter}&backgroundColor={hex}`
- Logged-in user is always **Ikedi Eze** (`id: "usr_001"`, email: `kasidyray@gmail.com`)
- System actors use `type: "system"`, API actors use `type: "api"` — no avatar needed

---

## Reference pages

- **Full table + filters + drawer**: `app/(main)/leads/page.tsx`
- **Full audit/activity flow**: `app/(main)/activity/page.tsx`
- **Full collaboration flow**: `app/(main)/team/page.tsx`
