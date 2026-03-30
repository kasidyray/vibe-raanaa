"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { RiAddLine, RiFilterLine, RiSettings3Line } from "@remixicon/react"
import type { ComponentDocData } from "../../component-doc-types"

const AnatomyPreview = () => (
  <div className="flex justify-center">
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="sm" />}>
        Open sheet
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>Sheet description text.</SheetDescription>
        </SheetHeader>
        <div className="px-6 flex-1">
          <p className="text-sm text-muted-foreground">Sheet body content goes here.</p>
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" size="sm" />}>Cancel</SheetClose>
          <Button size="sm">Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
)

const FormSheetPreview = () => (
  <div className="flex justify-center">
    <Sheet>
      <SheetTrigger render={<Button size="sm" />}>
        <RiAddLine />New contact
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New contact</SheetTitle>
          <SheetDescription>Add a new contact to your workspace.</SheetDescription>
        </SheetHeader>
        <div className="px-6 flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="s-name" className="text-xs">Full name</Label>
            <Input id="s-name" placeholder="Jane Smith" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="s-email" className="text-xs">Email</Label>
            <Input id="s-email" placeholder="jane@example.com" type="email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="s-company" className="text-xs">Company</Label>
            <Input id="s-company" placeholder="Acme Inc." />
          </div>
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" size="sm" />}>Cancel</SheetClose>
          <Button size="sm">Add contact</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
)

const FilterSheetPreview = () => (
  <div className="flex justify-center">
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="sm" />}>
        <RiFilterLine />Filters
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter results</SheetTitle>
          <SheetDescription>Narrow down the displayed records.</SheetDescription>
        </SheetHeader>
        <div className="px-6 flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs">Status</Label>
            <div className="flex flex-wrap gap-2">
              {["Active", "Inactive", "Pending"].map(s => (
                <Button key={s} variant="outline" size="sm">{s}</Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs">Date range</Label>
            <Input placeholder="Last 30 days" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" size="sm" />}>Reset</SheetClose>
          <Button size="sm">Apply filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
)

const SettingsSheetPreview = () => (
  <div className="flex justify-center">
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="sm" />}>
        <RiSettings3Line />Settings
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Preferences</SheetTitle>
          <SheetDescription>Manage your account preferences.</SheetDescription>
        </SheetHeader>
        <div className="px-6 flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs">Display name</Label>
            <Input defaultValue="Ikedi Eze" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs">Email notifications</Label>
            <div className="flex flex-col gap-1">
              {["New leads", "Weekly digest", "Team updates"].map(n => (
                <label key={n} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" className="accent-primary" defaultChecked />
                  {n}
                </label>
              ))}
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" size="sm" />}>Cancel</SheetClose>
          <Button size="sm">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
)

const BottomSheetPreview = () => (
  <div className="flex justify-center">
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="sm" />}>
        Open from bottom
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Quick actions</SheetTitle>
          <SheetDescription>Select an action to perform.</SheetDescription>
        </SheetHeader>
        <div className="px-6 pb-6 flex flex-col gap-2">
          <Button variant="outline" className="w-full justify-start">Export as CSV</Button>
          <Button variant="outline" className="w-full justify-start">Duplicate</Button>
          <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">Delete</Button>
        </div>
      </SheetContent>
    </Sheet>
  </div>
)

export const sheetDesignDoc: Omit<ComponentDocData, "devDoc"> = {
  overview: {
    what: "A panel that slides in from an edge of the viewport, overlaying the current page to present supplementary content or actions.",
    why: "Sheets let users act on a task without losing their place in the main content. Unlike a Dialog, the main page stays visible beneath the overlay, reinforcing the context that triggered the action.",
    problem: "Dialogs interrupt the user's flow by taking full focus. Sheets allow supplementary content (filters, detail views, forms) to coexist visually with the main page.",
    appearsIn: ["Record create / edit forms", "Table row detail panels", "Filter and sort sidebars", "Settings panels", "Mobile-style action menus (bottom sheet)"],
  },

  anatomy: {
    preview: <AnatomyPreview />,
    parts: [
      { name: "Sheet", description: "Root component. Manages open/close state." },
      { name: "SheetTrigger", description: "Uses the render prop pattern: render={<Button />}. Children become the button label." },
      { name: "SheetContent", description: "The sliding panel. side prop controls the edge it slides from (default: right). showCloseButton=true renders an absolute close button." },
      { name: "SheetHeader", description: "Flex column with p-6 and gap-2. Contains SheetTitle and SheetDescription." },
      { name: "SheetTitle", description: "text-base font-medium. Sets the accessible name of the dialog." },
      { name: "SheetDescription", description: "text-sm text-muted-foreground. Subtitle beneath the title." },
      { name: "SheetFooter", description: "mt-auto bg-muted border-t p-6. Sticks to the bottom of the panel. Contains action buttons." },
      { name: "SheetClose", description: "Also uses the render prop pattern. Wrap a Button to create a dismiss action." },
    ],
  },

  whenToUse: [
    "For record creation or editing when keeping the main list visible is useful.",
    "For filter and sort controls that update results in real time.",
    "For detail views where the user may want to return quickly to the list.",
    "For settings panels that should feel adjacent to the content they configure.",
    "Bottom sheet (side='bottom') for mobile-style action menus.",
  ],

  whenNotToUse: [
    "For destructive confirmation dialogs — use Dialog with explicit confirm/cancel.",
    "When the content requires the user's full, uninterrupted attention.",
    "For simple tooltips or small popovers — use Popover or Tooltip instead.",
    "When the panel content needs to be deeply nested or have its own routing.",
  ],

  variants: [
    {
      name: "Right (default)",
      description: "Slides in from the right. w-3/4 sm:max-w-sm. The most common sheet direction.",
      when: "Record detail, form, settings",
      preview: <FormSheetPreview />,
    },
    {
      name: "Filter sheet",
      description: "Filter controls with a reset + apply footer. Right-side by default.",
      when: "Table filter sidebar",
      preview: <FilterSheetPreview />,
    },
    {
      name: "Bottom sheet",
      description: "Slides in from the bottom. h-auto — height is determined by content.",
      when: "Mobile action menus, quick actions",
      preview: <BottomSheetPreview />,
    },
  ],

  states: [
    {
      name: "Settings panel",
      description: "A right-side sheet with labelled form fields and a sticky footer for save/cancel.",
      preview: <SettingsSheetPreview />,
    },
  ],

  properties: [
    {
      name: "side (SheetContent)",
      values: "top · right · bottom · left",
      default: "right",
      description: "Controls which edge the sheet slides from. right and left are full-height; top and bottom are full-width.",
    },
    {
      name: "showCloseButton (SheetContent)",
      values: "boolean",
      default: "true",
      description: "When true, renders an absolute close button (icon-sm) at top-right of the panel.",
    },
    {
      name: "render (SheetTrigger / SheetClose)",
      values: "ReactElement",
      default: "—",
      description: "Render prop pattern. Pass a Button element. Children of the primitive become the button's label.",
    },
  ],

  contentGuidance: [
    {
      rule: "Always include SheetHeader with SheetTitle",
      detail: "SheetTitle sets the accessible dialog name. A sheet without a title is not accessible.",
    },
    {
      rule: "Use SheetFooter for primary actions",
      detail: "SheetFooter sticks to the bottom of the panel via mt-auto. Place save/cancel buttons here, not in the scrollable body.",
    },
    {
      rule: "Add px-6 to body content",
      detail: "The scrollable body between header and footer should have px-6 to match the header and footer padding.",
    },
  ],

  behavior: [
    "Sheet uses base-ui Dialog internally — it traps focus and announces via aria-modal.",
    "SheetOverlay renders a backdrop with backdrop-blur on supported browsers.",
    "Sheet animates in with slide-in + fade-in. Closing plays the reverse.",
    "Pressing Escape or clicking the backdrop closes the sheet.",
    "SheetContent side prop controls which data-side attribute is set, driving the CSS direction via data-[side=*] variants.",
  ],

  spacing: [
    { rule: "Header padding", detail: "SheetHeader: p-6, gap-2 between title and description." },
    { rule: "Body padding", detail: "No built-in body wrapper — add px-6 to your content container." },
    { rule: "Footer padding", detail: "SheetFooter: p-6, gap-2 between action buttons." },
    { rule: "Sheet width (right/left)", detail: "w-3/4 sm:max-w-sm — approximately 384px on larger screens." },
  ],

  accessibility: [
    {
      rule: "Focus is trapped inside the open sheet",
      detail: "base-ui Dialog traps focus automatically. The user cannot Tab out of an open sheet.",
    },
    {
      rule: "SheetTitle is required",
      detail: "It sets aria-labelledby on the dialog. Always include SheetTitle inside SheetHeader.",
    },
    {
      rule: "Escape dismisses the sheet",
      detail: "base-ui handles Escape key dismissal automatically.",
    },
  ],

  doItems: [
    {
      label: "Use SheetFooter for actions",
      description: "Sticky footer keeps save/cancel always visible even when the body content scrolls.",
      preview: <FormSheetPreview />,
    },
    {
      label: "Bottom sheet for mobile action menus",
      description: "side='bottom' creates a familiar mobile bottom sheet pattern for quick contextual actions.",
      preview: <BottomSheetPreview />,
    },
  ],

  dontItems: [
    {
      label: "Don't use Sheet for destructive confirmations",
      description: "A destructive action (delete, remove) needs a Dialog that blocks focus and requires explicit confirmation — not a sheet that can be dismissed by clicking outside.",
      preview: (
        <div className="flex items-center gap-2 text-xs text-muted-foreground p-4 rounded-xl border">
          Use Dialog for delete confirmations. Use Sheet for create/edit/filter workflows.
        </div>
      ),
    },
  ],

  examplesInContext: [
    {
      title: "Create record form",
      description: "Form sheet with labelled inputs and a sticky footer for save/cancel actions.",
      preview: <FormSheetPreview />,
      code: `<Sheet>
  <SheetTrigger render={<Button size="sm" />}>
    <RiAddLine />New contact
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>New contact</SheetTitle>
      <SheetDescription>Add a new contact to your workspace.</SheetDescription>
    </SheetHeader>
    <div className="px-6 flex-1 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name" className="text-xs">Full name</Label>
        <Input id="name" placeholder="Jane Smith" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email" className="text-xs">Email</Label>
        <Input id="email" placeholder="jane@example.com" type="email" />
      </div>
    </div>
    <SheetFooter>
      <SheetClose render={<Button variant="outline" size="sm" />}>Cancel</SheetClose>
      <Button size="sm">Add contact</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
    },
    {
      title: "Filter sidebar",
      description: "Filter controls with a reset and apply button in the footer.",
      preview: <FilterSheetPreview />,
      code: `<Sheet>
  <SheetTrigger render={<Button variant="outline" size="sm" />}>
    <RiFilterLine />Filters
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Filter results</SheetTitle>
      <SheetDescription>Narrow down the displayed records.</SheetDescription>
    </SheetHeader>
    <div className="px-6 flex-1 flex flex-col gap-4">
      {/* filter controls */}
    </div>
    <SheetFooter>
      <SheetClose render={<Button variant="outline" size="sm" />}>Reset</SheetClose>
      <Button size="sm">Apply filters</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
    },
  ],

  relatedComponents: [
    {
      slug: "dialog",
      name: "Dialog",
      description: "Modal overlay that blocks all page interaction.",
      when: "Use Dialog for destructive confirmations or actions that require the user's full focus. Use Sheet for supplementary panels.",
    },
    {
      slug: "popover",
      name: "Popover",
      description: "Lightweight floating panel anchored to a trigger.",
      when: "Use Popover for small, inline panels. Use Sheet for larger forms, filters, or detail views.",
    },
  ],

  designNotes: [
    "SheetFooter is mt-auto bg-muted border-t — it always sticks to the bottom regardless of body content height.",
    "SheetTrigger and SheetClose use the render prop pattern: render={<Button />} with children as the label.",
    "The close button (showCloseButton=true) is absolutely positioned at top-right inside the panel.",
    "side='right' and side='left' are full-height, capped at sm:max-w-sm. side='top' and side='bottom' are full-width and auto-height.",
  ],
}
