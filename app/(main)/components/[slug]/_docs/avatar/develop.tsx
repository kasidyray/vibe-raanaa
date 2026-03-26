"use client"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import type { ComponentDevDocData } from "../../component-doc-types"

// ── Avatar develop doc ────────────────────────────────────────────────────────

export const avatarDevelopDoc: ComponentDevDocData = {
  installation: {
    prerequisites: [
      "npx shadcn add @raana/mtn-tokens",
      "npx shadcn add @raana/utils",
    ],
    command: "npx shadcn add @raana/avatar",
    importPath: `import { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"`,
    notes: [
      "One-time setup: add the registry to your components.json → \"registries\": { \"@raana\": \"https://raw.githubusercontent.com/kasidyray/vibe-raanaa/main/public/r/{name}.json\" }",
      "No extra dependencies — the base-ui peer dep is bundled with the registry package.",
    ],
  },

  basicUsage: `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"

// Single avatar with image + fallback
<Avatar>
  <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Adaeze" alt="Adaeze Okoye" />
  <AvatarFallback>AO</AvatarFallback>
</Avatar>

// Avatar group
<AvatarGroup>
  <Avatar>
    <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Adaeze" alt="Adaeze Okoye" />
    <AvatarFallback>AO</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Emeka" alt="Emeka Nwosu" />
    <AvatarFallback>EN</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>+4</AvatarGroupCount>
</AvatarGroup>`,

  codeExamples: [
    {
      title: "Sizes",
      description: "Three sizes — sm (24px), default (32px), lg (40px). Use sm in dense list rows, default inline, lg in profile headers.",
      preview: (
        <div className="flex items-center gap-4 justify-center">
          <Avatar size="sm">
            <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Ikedi" alt="Ikedi Eze" />
            <AvatarFallback>IE</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Ikedi" alt="Ikedi Eze" />
            <AvatarFallback>IE</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Ikedi" alt="Ikedi Eze" />
            <AvatarFallback>IE</AvatarFallback>
          </Avatar>
        </div>
      ),
      code: `// sm — 24px
<Avatar size="sm">
  <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Ikedi" alt="Ikedi Eze" />
  <AvatarFallback>IE</AvatarFallback>
</Avatar>

// default — 32px
<Avatar size="default">
  <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Ikedi" alt="Ikedi Eze" />
  <AvatarFallback>IE</AvatarFallback>
</Avatar>

// lg — 40px
<Avatar size="lg">
  <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Ikedi" alt="Ikedi Eze" />
  <AvatarFallback>IE</AvatarFallback>
</Avatar>`,
    },
    {
      title: "Fallback initials",
      description: "Shown when the image fails to load. Pass two-letter initials derived from the person's name.",
      preview: (
        <div className="flex items-center gap-3 justify-center">
          <Avatar>
            <AvatarImage src="" alt="Adaeze Okoye" />
            <AvatarFallback>AO</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="" alt="Emeka Nwosu" />
            <AvatarFallback>EN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="" alt="Ngozi Dike" />
            <AvatarFallback>ND</AvatarFallback>
          </Avatar>
        </div>
      ),
      code: `// Broken src forces the fallback to render
<Avatar>
  <AvatarImage src="" alt="Adaeze Okoye" />
  <AvatarFallback>AO</AvatarFallback>
</Avatar>

<Avatar>
  <AvatarImage src="" alt="Emeka Nwosu" />
  <AvatarFallback>EN</AvatarFallback>
</Avatar>

<Avatar>
  <AvatarImage src="" alt="Ngozi Dike" />
  <AvatarFallback>ND</AvatarFallback>
</Avatar>`,
    },
    {
      title: "With badge",
      description: "AvatarBadge renders a status dot in the bottom-right corner. Use semantic bg- tokens — bg-success (online), bg-warning (away), bg-muted (offline).",
      preview: (
        <div className="flex items-center gap-5 justify-center">
          <Avatar aria-label="Adaeze Okoye — online">
            <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Adaeze" alt="Adaeze Okoye" />
            <AvatarFallback>AO</AvatarFallback>
            <AvatarBadge className="bg-success" />
          </Avatar>
          <Avatar size="lg" aria-label="Emeka Nwosu — away">
            <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Emeka" alt="Emeka Nwosu" />
            <AvatarFallback>EN</AvatarFallback>
            <AvatarBadge className="bg-warning" />
          </Avatar>
          <Avatar aria-label="Ngozi Dike — offline">
            <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Ngozi" alt="Ngozi Dike" />
            <AvatarFallback>ND</AvatarFallback>
            <AvatarBadge className="bg-muted" />
          </Avatar>
        </div>
      ),
      code: `// Online
<Avatar aria-label="Adaeze Okoye — online">
  <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Adaeze" alt="Adaeze Okoye" />
  <AvatarFallback>AO</AvatarFallback>
  <AvatarBadge className="bg-success" />
</Avatar>

// Away (lg)
<Avatar size="lg" aria-label="Emeka Nwosu — away">
  <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Emeka" alt="Emeka Nwosu" />
  <AvatarFallback>EN</AvatarFallback>
  <AvatarBadge className="bg-warning" />
</Avatar>

// Offline
<Avatar aria-label="Ngozi Dike — offline">
  <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Ngozi" alt="Ngozi Dike" />
  <AvatarFallback>ND</AvatarFallback>
  <AvatarBadge className="bg-muted" />
</Avatar>`,
    },
    {
      title: "Avatar group",
      description: "AvatarGroup stacks avatars with a -space-x-2 overlap. Add AvatarGroupCount at the end to show overflow.",
      preview: (
        <div className="flex justify-center">
          <AvatarGroup aria-label="Team members: Adaeze, Emeka, Ngozi, Chidi and 3 more">
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Adaeze" alt="Adaeze Okoye" />
              <AvatarFallback>AO</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Emeka" alt="Emeka Nwosu" />
              <AvatarFallback>EN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Ngozi" alt="Ngozi Dike" />
              <AvatarFallback>ND</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Chidi" alt="Chidi Obi" />
              <AvatarFallback>CO</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        </div>
      ),
      code: `<AvatarGroup aria-label="Team members: Adaeze, Emeka, Ngozi, Chidi and 3 more">
  <Avatar>
    <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Adaeze" alt="Adaeze Okoye" />
    <AvatarFallback>AO</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Emeka" alt="Emeka Nwosu" />
    <AvatarFallback>EN</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Ngozi" alt="Ngozi Dike" />
    <AvatarFallback>ND</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Chidi" alt="Chidi Obi" />
    <AvatarFallback>CO</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>+3</AvatarGroupCount>
</AvatarGroup>`,
    },
    {
      title: "In a table row",
      description: "Use size sm with a flex items-center gap-2.5 layout. Stack name and email in a column beside the avatar.",
      preview: (
        <div className="w-full rounded-lg border border-border overflow-hidden">
          {[
            { seed: "Adaeze", name: "Adaeze Okoye", email: "adaeze@company.io" },
            { seed: "Amaka", name: "Amaka Eze", email: "amaka@company.io" },
            { seed: "Chidi", name: "Chidi Obi", email: "chidi@company.io" },
          ].map((user) => (
            <div
              key={user.email}
              className="flex items-center gap-2.5 px-4 py-3 border-b border-border last:border-0"
            >
              <Avatar size="sm">
                <AvatarImage src={`https://api.dicebear.com/9.x/micah/svg?seed=${user.seed}`} alt={user.name} />
                <AvatarFallback>{user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-foreground truncate">{user.name}</span>
                <span className="text-xs text-muted-foreground truncate">{user.email}</span>
              </div>
            </div>
          ))}
        </div>
      ),
      code: `<div className="flex items-center gap-2.5 px-4 py-3">
  <Avatar size="sm">
    <AvatarImage
      src="https://api.dicebear.com/9.x/micah/svg?seed=Adaeze"
      alt="Adaeze Okoye"
    />
    <AvatarFallback>AO</AvatarFallback>
  </Avatar>
  <div className="flex flex-col min-w-0">
    <span className="text-sm font-medium text-foreground truncate">Adaeze Okoye</span>
    <span className="text-xs text-muted-foreground truncate">adaeze@company.io</span>
  </div>
</div>`,
    },
    {
      title: "In a drawer header",
      description: "Use size lg in drawer and sheet headers where the avatar anchors the identity block.",
      preview: (
        <div className="w-full rounded-lg border border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarImage src="https://api.dicebear.com/9.x/micah/svg?seed=Ngozi" alt="Ngozi Dike" />
              <AvatarFallback>ND</AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-base font-semibold text-foreground truncate">Ngozi Dike</span>
              <span className="text-sm text-muted-foreground truncate">ngozi@company.io</span>
            </div>
          </div>
        </div>
      ),
      code: `// Drawer / sheet header identity block
<div className="flex items-center gap-3">
  <Avatar size="lg">
    <AvatarImage
      src="https://api.dicebear.com/9.x/micah/svg?seed=Ngozi"
      alt="Ngozi Dike"
    />
    <AvatarFallback>ND</AvatarFallback>
  </Avatar>
  <div className="flex flex-col min-w-0">
    <span className="text-base font-semibold text-foreground truncate">Ngozi Dike</span>
    <span className="text-sm text-muted-foreground truncate">ngozi@company.io</span>
  </div>
</div>`,
    },
  ],

  apiReference: [
    {
      name: "size",
      values: `"sm" | "default" | "lg"`,
      default: `"default"`,
      description: "Controls the avatar diameter — 24px (sm), 32px (default), 40px (lg). AvatarBadge and border overlay scale automatically.",
    },
    {
      name: "className",
      values: "string",
      default: "—",
      description: "Extra CSS classes on the Avatar root circle. Avoid overriding size or border tokens.",
    },
    {
      name: "AvatarImage · src",
      values: "string",
      default: "—",
      description: "Image URL. Use the dicebear convention: https://api.dicebear.com/9.x/micah/svg?seed={FirstName}. Image lazy-loads and shows fallback on error.",
    },
    {
      name: "AvatarImage · alt",
      values: "string",
      default: "—",
      description: "Descriptive alt text for the image. Use the person's full name — never \"avatar\" or an empty string.",
    },
    {
      name: "AvatarFallback · children",
      values: "ReactNode",
      default: "—",
      description: "Content shown when the image is absent or fails. Render two-letter initials (\"AO\") or a small icon.",
    },
    {
      name: "AvatarBadge · className",
      values: "string",
      default: "—",
      description: "Use semantic background tokens to convey status — bg-success (online), bg-warning (away), bg-muted (offline). The dot is hidden on sm-size avatars.",
    },
    {
      name: "AvatarBadge · children",
      values: "ReactNode (optional)",
      default: "—",
      description: "Optional small icon inside the badge dot. Hidden when the parent Avatar is size sm.",
    },
    {
      name: "AvatarGroup · className",
      values: "string",
      default: "—",
      description: "Extra classes on the flex stacking container. All direct Avatar children automatically receive ring-2 ring-background.",
    },
    {
      name: "AvatarGroupCount · children",
      values: "ReactNode",
      default: "—",
      description: "Overflow indicator placed at the end of AvatarGroup. Typically a \"+N\" string or a small icon.",
    },
  ],

  accessibility: [
    {
      rule: "Descriptive alt on AvatarImage",
      detail: "Always set alt to the person's full name (e.g. \"Adaeze Okoye\"). Never use \"avatar\", \"user\", or an empty string — screen readers announce this text as the identity of the element.",
    },
    {
      rule: "AvatarFallback is aria-hidden when image is present",
      detail: "base-ui handles this automatically. When both AvatarImage and AvatarFallback are present, the fallback is suppressed from the accessibility tree once the image loads.",
    },
    {
      rule: "AvatarBadge requires context on the parent",
      detail: "AvatarBadge is a visual-only dot. Add aria-label to the Avatar (or a wrapping element) to convey the status — e.g. aria-label=\"Emeka Nwosu — away\".",
    },
    {
      rule: "AvatarGroup needs an accessible label",
      detail: "When AvatarGroup represents a team or list, wrap it in a <nav> or add aria-label directly: <AvatarGroup aria-label=\"Assigned to: Adaeze, Emeka, and 3 more\">. This gives screen reader users the full context.",
    },
  ],
}
