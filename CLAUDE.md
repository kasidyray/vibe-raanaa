# Raana-xi

Before writing any code in this project, read these files in order:

1. `.claude/skills/design-to-code/constraints.md` — rules that apply to all work
2. `.claude/skills/design-to-code/maps/component-apis.md` — every component's API and usage
3. `.claude/skills/design-to-code/maps/layout-map.md` — page structure and layout patterns
4. `.claude/skills/design-to-code/maps/token-map.md` — colour, typography, and spacing tokens
5. `.claude/skills/design-to-code/maps/file-structure.md` — folder shape and file responsibilities
6. `.claude/skills/design-to-code/maps/data-conventions.md` — data flow, state placement, mutations
7. `.claude/skills/design-to-code/maps/coding-standards.md` — naming, re-render guards, TypeScript, done checklist

When authoring component documentation pages, also read:

8. `.claude/skills/design-to-code/maps/component-doc-guide.md` — how to write design + develop docs for any component

These are the single source of truth. Do not deviate from them.

---

## Pre-build checklist

Run through this before writing any new page or feature:

1. What is the user trying to do? Define it in one sentence.
2. What states does this feature need? (loading, empty, no-results, error, success)
3. What is the folder structure? Which files are needed? (page / table / columns / drawer / hook / types / constants)
4. Where does data come from? Which hook owns it?
5. What parts could be reused elsewhere? Extract those. Compose the rest inline.
6. What mutations happen? Do all three steps have loading state + toasts?
7. What are the edge cases? (empty list, failed fetch, zero results after filter, long text overflow)
8. Is every interactive element keyboard-accessible and labeled?
9. Does the layout match the correct archetype from `layout-map.md`?
10. Are all tokens semantic — no raw hex, no Tailwind colour scale, no inline styles?

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
