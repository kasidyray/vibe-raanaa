import type * as React from "react"

export type TopbarNavSubItem = {
  title: string
  url: string
}

export type TopbarNavItem = {
  title: string
  url: string
  icon?: React.ReactNode
  /** Force exact URL match for active detection. Use when the URL is a prefix of sibling routes. */
  exact?: boolean
  items?: TopbarNavSubItem[]
}

export type TopbarUser = {
  name: string
  email: string
  avatarUrl?: string
}
