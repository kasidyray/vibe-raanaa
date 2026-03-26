# Raana-xi Component Registry

This project exposes a [shadcn custom registry](https://ui.shadcn.com/docs/registry) so other projects can pull components and the MTN design tokens directly via the shadcn CLI.

## Available components

| Name | Type | Description |
|---|---|---|
| `mtn-tokens` | CSS | MTN design tokens (colours, radius, shadows) — install first |
| `utils` | Lib | `cn()` utility (`clsx` + `tailwind-merge`) |
| `alert` | UI | Alert / callout |
| `alert-dialog` | UI | Modal alert dialog |
| `avatar` | UI | User avatar with fallback |
| `badge` | UI | Status and label badges |
| `breadcrumb` | UI | Breadcrumb navigation |
| `button` | UI | Primary, secondary, outline, ghost, destructive variants |
| `button-group` | UI | Grouped buttons |
| `calendar` | UI | Date calendar picker |
| `card` | UI | Content card |
| `chart` | UI | Chart wrapper (Recharts) |
| `checkbox` | UI | Checkbox input |
| `combobox` | UI | Searchable select / combobox |
| `container` | UI | Page content container |
| `data-table` | UI | Full data table with sort, filter, pagination, selection |
| `date-picker` | UI | Date picker input |
| `dialog` | UI | Modal dialog |
| `drawer` | UI | Slide-in drawer (Vaul) |
| `dropdown-menu` | UI | Dropdown / context menu |
| `empty` | UI | Empty state with illustration and CTA |
| `field` | UI | Form field wrapper with label and error |
| `hover-card` | UI | Hover popover card |
| `icon-badge` | UI | Icon with badge overlay |
| `input` | UI | Text input |
| `input-group` | UI | Input with prefix/suffix addons |
| `input-otp` | UI | OTP code input |
| `label` | UI | Form label |
| `page-header` | UI | Page title, description, and actions bar |
| `pagination` | UI | Pagination controls |
| `password` | UI | Password input with show/hide toggle |
| `popover` | UI | Popover |
| `progress` | UI | Progress bar |
| `select` | UI | Select dropdown |
| `separator` | UI | Horizontal/vertical divider |
| `sheet` | UI | Side sheet / panel |
| `sidebar` | UI | App sidebar with navigation |
| `skeleton` | UI | Loading skeleton |
| `sonner` | UI | Toast notifications (Sonner) |
| `spinner` | UI | Loading spinner |
| `status-badge` | UI | Coloured status indicator badge |
| `step-indicator` | UI | Multi-step progress indicator |
| `switch` | UI | Toggle switch |
| `table` | UI | Base table primitives |
| `tabs` | UI | Tab navigation |
| `textarea` | UI | Textarea input |
| `toggle` | UI | Toggle button |
| `toggle-group` | UI | Group of toggle buttons |
| `tooltip` | UI | Tooltip |

---

## Setup (do this once)

### Prerequisites

Your project must be a Next.js app with **Tailwind CSS v4** and **shadcn v4** already configured.

```bash
# Install shadcn if you haven't already
npx shadcn init
```

### 1. Register the registry

In your project's `components.json`, add a `registries` entry pointing to the deployed app:

```json
{
  "registries": {
    "@raana": "https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json"
  }
}
```

> **If you don't have a deployment yet**, use the raw GitHub URL instead:
> ```json
> "@raana": "https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json"
> ```

### 2. Install the MTN design tokens

This installs `app/mtn-tokens.css` into your project with the full MTN colour palette, radius values, and semantic colours (info, success, warning, error).

```bash
npx shadcn add @raana/mtn-tokens
```

Then import it at the top of your `app/globals.css`:

```css
@import "tailwindcss";
@import "./mtn-tokens.css";
```

### 3. Install the utils helper

Most components depend on `cn()`:

```bash
npx shadcn add @raana/utils
```

---

## Installing components

Add any component (or multiple at once) with the shadcn CLI:

```bash
# Single component
npx shadcn add @raana/button

# Multiple at once
npx shadcn add @raana/button @raana/input @raana/empty @raana/page-header

# Full data table (includes all sub-components)
npx shadcn add @raana/data-table
```

shadcn will automatically install any npm dependencies the component needs.

---

## Getting future updates

Re-run the same `add` command. shadcn overwrites the component file with the latest version from the registry:

```bash
npx shadcn add @raana/button @raana/data-table
```

To update everything at once, you can chain all component names. Or check `registry.json` at the root of this repo for the full list of available items.

---

## For maintainers — updating the registry

Whenever you change a component, regenerate the registry files and commit them:

```bash
npm run build:registry
git add public/r/ registry.json
git commit -m "Update registry"
```

The `build:registry` script reads every file in `components/ui/` and `lib/utils.ts`, embeds the source into `public/r/{name}.json`, and rebuilds `registry.json`.
