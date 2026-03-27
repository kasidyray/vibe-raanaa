export type DocStatus = "Ready" | "In Review" | "Deprecated" | "New"

export type ComponentMeta = {
  slug: string
  name: string
  description: string
  category: ComponentCategory
  status?: DocStatus
  tags?: string[]
}

export type ComponentCategory =
  | "Inputs"
  | "Display"
  | "Overlay"
  | "Navigation"
  | "Feedback"
  | "Data"
  | "Layout"

export const components: ComponentMeta[] = [
  // Inputs
  { slug: "button",       name: "Button",        description: "Trigger actions and navigation.",                   category: "Inputs" },
  { slug: "button-group", name: "Button Group",  description: "Combine related actions in a single row.",          category: "Inputs", status: "Ready", tags: ["Inputs", "Actions", "Toolbar"] },
  { slug: "input",        name: "Input",         description: "Single-line text entry.",                           category: "Inputs", status: "Ready", tags: ["Inputs", "Form", "Text"] },
  { slug: "textarea",     name: "Textarea",      description: "Multi-line text entry.",                            category: "Inputs", status: "Ready", tags: ["Inputs", "Form", "Text"] },
  { slug: "checkbox",     name: "Checkbox",      description: "Binary on/off selection.",                          category: "Inputs", status: "Ready", tags: ["Inputs", "Form", "Selection"] },
  { slug: "switch",       name: "Switch",        description: "Toggle a setting on or off.",                       category: "Inputs", status: "Ready", tags: ["Inputs", "Form", "Toggle"] },
  { slug: "select",       name: "Select",        description: "Choose one item from a dropdown list.",             category: "Inputs", status: "Ready", tags: ["Inputs", "Form", "Dropdown"] },
  { slug: "combobox",     name: "Combobox",      description: "Searchable select with optional multi-select.",     category: "Inputs", status: "Ready", tags: ["Inputs", "Form", "Search", "Multi-select"] },
  { slug: "toggle",       name: "Toggle",        description: "Pressable button that holds an active state.",      category: "Inputs" },
  { slug: "toggle-group", name: "Toggle Group",  description: "A group of toggles where one can be active.",      category: "Inputs" },
  { slug: "date-picker",  name: "Date Picker",   description: "Pick a single date from a calendar popover.",       category: "Inputs" },
  { slug: "calendar",     name: "Calendar",      description: "Standalone month calendar for date selection.",     category: "Inputs", status: "Ready", tags: ["Inputs", "Date", "Picker"] },
  { slug: "input-otp",    name: "Input OTP",     description: "One-time password / PIN code input.",              category: "Inputs" },
  { slug: "field",        name: "Field",         description: "Form field wrapper with label, hint, and error.",  category: "Inputs" },
  { slug: "input-group",  name: "Input Group",   description: "Input with leading/trailing addons.",              category: "Inputs" },

  // Display
  { slug: "avatar",       name: "Avatar",        description: "User or entity image with fallback initials.",      category: "Display", status: "Ready", tags: ["Display", "Identity", "Media"] },
  { slug: "badge",        name: "Badge",         description: "Coloured pill for categorical labels.",             category: "Display", status: "Ready", tags: ["Display", "Label", "Indicator"] },
  { slug: "status-badge", name: "Status Badge",  description: "Bordered pill with a dot for live status.",        category: "Display" },
  { slug: "icon-badge",   name: "Icon Badge",    description: "Square icon container in various semantic colours.", category: "Display" },
  { slug: "card",         name: "Card",          description: "Surface container for grouped content.",            category: "Display", status: "Ready", tags: ["Display", "Surface", "Container"] },
  { slug: "separator",    name: "Separator",     description: "Visual divider between sections.",                  category: "Display" },
  { slug: "skeleton",     name: "Skeleton",      description: "Placeholder shape shown while content loads.",      category: "Display" },

  // Overlay
  { slug: "dialog",        name: "Dialog",        description: "Modal dialog for focused interactions.",           category: "Overlay" },
  { slug: "alert-dialog",  name: "Alert Dialog",  description: "Confirmation dialog for destructive actions.",    category: "Overlay", status: "Ready", tags: ["Overlay", "Confirmation", "Destructive"] },
  { slug: "drawer",        name: "Drawer",        description: "Slide-in panel from any screen edge.",            category: "Overlay" },
  { slug: "sheet",         name: "Sheet",         description: "Bottom or side sheet for supplemental content.",   category: "Overlay" },
  { slug: "popover",       name: "Popover",       description: "Anchored floating panel for rich content.",       category: "Overlay" },
  { slug: "tooltip",       name: "Tooltip",       description: "Short label shown on hover.",                     category: "Overlay" },
  { slug: "hover-card",    name: "Hover Card",    description: "Rich preview card shown on hover.",               category: "Overlay" },
  { slug: "dropdown-menu", name: "Dropdown Menu", description: "Contextual action menu anchored to a trigger.",   category: "Overlay" },

  // Navigation
  { slug: "breadcrumb",   name: "Breadcrumb",    description: "Shows the current page path hierarchy.",           category: "Navigation", status: "Ready", tags: ["Navigation", "Path", "Hierarchy"] },
  { slug: "tabs",         name: "Tabs",          description: "Switch between related content views.",            category: "Navigation" },

  // Feedback
  { slug: "alert",        name: "Alert",         description: "Inline message for info, success, warning, error.", category: "Feedback", status: "Ready", tags: ["Feedback", "Inline", "Message"] },
  { slug: "progress",     name: "Progress",      description: "Shows completion percentage of a task.",           category: "Feedback" },
  { slug: "sonner",       name: "Sonner",        description: "Toast notifications with multiple variants.",      category: "Feedback" },
  { slug: "empty",        name: "Empty State",   description: "Zero-data placeholder with optional CTA.",         category: "Feedback" },

  // Data
  { slug: "table",        name: "Table",         description: "Raw HTML table primitives.",                       category: "Data" },
  { slug: "data-table",   name: "Data Table",    description: "Full-featured sortable, filterable data table.",   category: "Data", status: "Ready", tags: ["Data", "Table", "Filter", "Sort", "Pagination"] },

  // Layout
  { slug: "label",        name: "Label",         description: "Accessible form label associated with an input.",  category: "Layout" },
]

export const componentsByCategory = components.reduce<Record<ComponentCategory, ComponentMeta[]>>(
  (acc, c) => {
    if (!acc[c.category]) acc[c.category] = []
    acc[c.category].push(c)
    return acc
  },
  {} as Record<ComponentCategory, ComponentMeta[]>
)

export function getComponent(slug: string): ComponentMeta | undefined {
  return components.find((c) => c.slug === slug)
}
