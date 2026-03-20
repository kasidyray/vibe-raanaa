// Notification category determines the icon, colour, and context of a notification.
// Extend this union when adding new product areas.
export type NotificationCategory =
  | "mention"   // User was tagged or mentioned by another user
  | "system"    // Platform-level messages: maintenance, deprecations
  | "billing"   // Payments, invoices, subscription events
  | "security"  // Logins, API key changes, permission changes
  | "activity"  // Async job completions: exports, imports, reports
  | "update"    // Feature announcements, product updates

export type NotificationPriority = "high" | "medium" | "low"

export interface AppNotification {
  id: string
  category: NotificationCategory
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority?: NotificationPriority
  // Actor — populated for social/mention notifications
  actorName?: string
  actorAvatar?: string
  // Optional deep-link destination
  href?: string
}

export type NotificationTab = "all" | "unread"
