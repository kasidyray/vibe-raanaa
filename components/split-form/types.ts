export type SplitFormStatus = "current" | "completed" | "upcoming" | "error"

export type SplitFormNavItem = {
  id: string
  title: string
  optional?: boolean
}

export type SplitFormNavGroup = {
  id: string
  title: string
  items: SplitFormNavItem[]
  /** Open on first render. The group containing the current step always auto-opens. */
  defaultOpen?: boolean
}
