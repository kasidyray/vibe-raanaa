// Public API for the notifications system.
// Import from here — not from individual files.

export { NotificationBell } from "./notification-panel"
export { NotificationProvider, useNotifications } from "./store"
export type {
  AppNotification,
  NotificationCategory,
  NotificationPriority,
  NotificationTab,
} from "./types"
