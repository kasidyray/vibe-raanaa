import type { AppNotification } from "./types"

// Relative time helpers for stable mock data
const now = new Date()
const m = (minutes: number) => new Date(now.getTime() - minutes * 60_000)
const h = (hours: number) => new Date(now.getTime() - hours * 3_600_000)
const d = (days: number) => new Date(now.getTime() - days * 86_400_000)

// Ten realistic SaaS notifications across all categories.
// Unread: notif_001–004. Read: notif_005–010.
export const mockNotifications: AppNotification[] = [
  // --- UNREAD ---
  {
    id: "notif_001",
    category: "security",
    priority: "high",
    title: "New sign-in from unknown device",
    message:
      "A login was detected from Chrome on macOS in Lagos, Nigeria. If this wasn't you, revoke access immediately from Security settings.",
    timestamp: m(4),
    read: false,
    href: "/settings/security",
  },
  {
    id: "notif_002",
    category: "billing",
    priority: "high",
    title: "Payment failed",
    message:
      "Your monthly subscription payment of ₦49,000 was declined. Please update your payment method to avoid service interruption.",
    timestamp: m(22),
    read: false,
    href: "/settings/billing",
  },
  {
    id: "notif_003",
    category: "mention",
    title: "Adaeze tagged you in a comment",
    message:
      '"@Ikedi can you review the updated proposal before Thursday? Need your sign-off on the budget section."',
    timestamp: h(2),
    read: false,
    actorName: "Adaeze Okafor",
    actorAvatar: "https://api.dicebear.com/9.x/micah/svg?seed=Adaeze",
    href: "/projects",
  },
  {
    id: "notif_004",
    category: "activity",
    title: "Export ready to download",
    message:
      "Your data export (leads-march-2026.csv, 1,243 rows) has finished processing and is ready to download.",
    timestamp: h(5),
    read: false,
    href: "/leads",
  },

  // --- READ ---
  {
    id: "notif_005",
    category: "mention",
    title: "Chukwuemeka invited you to a workspace",
    message:
      'You\'ve been added to "Q2 Campaign Planning" with editor access. You can now view and contribute to all documents.',
    timestamp: h(9),
    read: true,
    actorName: "Chukwuemeka Nwosu",
    actorAvatar: "https://api.dicebear.com/9.x/micah/svg?seed=Chukwuemeka",
    href: "/team",
  },
  {
    id: "notif_006",
    category: "system",
    priority: "medium",
    title: "Scheduled maintenance window",
    message:
      "The platform will be unavailable on Saturday 22 March from 02:00–04:00 WAT for infrastructure upgrades. No action needed.",
    timestamp: h(16),
    read: true,
  },
  {
    id: "notif_007",
    category: "billing",
    title: "Subscription renewed successfully",
    message:
      "Your Pro plan has been renewed. Next billing date: 20 April 2026. View your invoice in billing settings.",
    timestamp: d(2),
    read: true,
    href: "/settings/billing",
  },
  {
    id: "notif_008",
    category: "security",
    title: "Production API key rotated",
    message:
      "Your production API key was rotated automatically. Update any integrations using the old key before it expires in 24 hours.",
    timestamp: d(4),
    read: true,
    href: "/settings/security",
  },
  {
    id: "notif_009",
    category: "update",
    title: "New features in Data Library",
    message:
      "Bulk imports now support up to 50,000 rows. Faceted filters have been redesigned for faster navigation. See what's new →",
    timestamp: d(5),
    read: true,
  },
  {
    id: "notif_010",
    category: "activity",
    title: "Monthly report generated",
    message:
      "Your February 2026 performance report is ready. It includes summary metrics, trend analysis, and a CSV export.",
    timestamp: d(8),
    read: true,
    href: "/reports",
  },
]
