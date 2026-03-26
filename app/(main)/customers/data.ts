// ─── Types ────────────────────────────────────────────────────────────────────

export type PaymentMethod = "Visa" | "Mastercard" | "Amex" | "Bank transfer" | null

export type CustomerTab =
  | "all"
  | "top"
  | "first-time"
  | "repeat"
  | "recent"
  | "high-refunds"
  | "high-disputes"

export type CustomerType = "individual" | "business"

export type Customer = {
  id: string
  name: string
  email: string
  type: CustomerType
  defaultPaymentMethod: PaymentMethod
  totalSpend: number       // in cents
  payments: number
  refunds: number          // in cents
  disputeLosses: number    // in cents
  lastPayment: string | null  // ISO date string
  createdAt: string           // ISO date string
}

export type ContainerSize = "sm" | "default" | "lg" | "xl" | "full"

// ─── Constants ────────────────────────────────────────────────────────────────

export const PAYMENT_METHOD_OPTIONS: { value: string; label: string }[] = [
  { value: "Visa",          label: "Visa"          },
  { value: "Mastercard",    label: "Mastercard"    },
  { value: "Amex",          label: "Amex"          },
  { value: "Bank transfer", label: "Bank transfer" },
]

export const TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: "individual", label: "Individual" },
  { value: "business",   label: "Business"   },
]

export const DATE_PRESETS: { value: string; label: string }[] = [
  { value: "7d",  label: "Last 7 days"  },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "1y",  label: "Last year"    },
]

export const containerSizes: { value: ContainerSize; label: string }[] = [
  { value: "sm",      label: "Small"   },
  { value: "default", label: "Default" },
  { value: "lg",      label: "Large"   },
  { value: "xl",      label: "X-Large" },
  { value: "full",    label: "Full"    },
]

// ─── Mock data ────────────────────────────────────────────────────────────────

export const CUSTOMERS: Customer[] = [
  { id: "cus_001", name: "Amara Okafor",    email: "amara.okafor@gmail.com",       type: "individual", defaultPaymentMethod: "Visa",          totalSpend: 248500, payments: 14, refunds: 9900,  disputeLosses: 0,     lastPayment: "2026-03-20T10:14:00Z", createdAt: "2026-01-05T09:00:00Z" },
  { id: "cus_002", name: "James Whitfield", email: "jwhitfield@outlook.com",        type: "individual", defaultPaymentMethod: "Mastercard",    totalSpend: 87300,  payments: 5,  refunds: 0,     disputeLosses: 0,     lastPayment: "2026-03-18T14:32:00Z", createdAt: "2026-01-22T11:15:00Z" },
  { id: "cus_003", name: "Sofia Reyes",     email: "sofia.reyes@company.io",        type: "business",   defaultPaymentMethod: "Amex",          totalSpend: 512000, payments: 28, refunds: 24900, disputeLosses: 7500,  lastPayment: "2026-03-22T08:05:00Z", createdAt: "2025-12-15T13:00:00Z" },
  { id: "cus_004", name: "Kwame Asante",    email: "k.asante@protonmail.com",       type: "individual", defaultPaymentMethod: "Bank transfer", totalSpend: 34700,  payments: 3,  refunds: 0,     disputeLosses: 0,     lastPayment: "2026-03-10T16:50:00Z", createdAt: "2026-02-01T10:30:00Z" },
  { id: "cus_005", name: "Priya Nair",      email: "priya.nair@techcorp.com",       type: "business",   defaultPaymentMethod: "Visa",          totalSpend: 673200, payments: 41, refunds: 14800, disputeLosses: 5000,  lastPayment: "2026-03-24T12:00:00Z", createdAt: "2025-11-10T08:00:00Z" },
  { id: "cus_006", name: "Ethan Caldwell",  email: "ethan.caldwell@mail.com",       type: "individual", defaultPaymentMethod: null,            totalSpend: 0,      payments: 0,  refunds: 0,     disputeLosses: 0,     lastPayment: null,                   createdAt: "2026-03-21T15:00:00Z" },
  { id: "cus_007", name: "Lena Fischer",    email: "lena.fischer@web.de",           type: "individual", defaultPaymentMethod: "Mastercard",    totalSpend: 142600, payments: 9,  refunds: 5400,  disputeLosses: 0,     lastPayment: "2026-03-15T09:22:00Z", createdAt: "2026-01-18T07:45:00Z" },
  { id: "cus_008", name: "Marcus Johnson",  email: "mjohnson@enterprise.org",       type: "business",   defaultPaymentMethod: "Amex",          totalSpend: 389000, payments: 22, refunds: 0,     disputeLosses: 12000, lastPayment: "2026-03-19T11:10:00Z", createdAt: "2025-12-28T14:00:00Z" },
  { id: "cus_009", name: "Yuki Tanaka",     email: "yuki.tanaka@studio.jp",         type: "business",   defaultPaymentMethod: "Visa",          totalSpend: 6400,   payments: 1,  refunds: 0,     disputeLosses: 0,     lastPayment: "2026-03-08T10:00:00Z", createdAt: "2026-03-01T12:00:00Z" },
  { id: "cus_010", name: "Chidi Eze",       email: "chidi.eze@domain.ng",           type: "individual", defaultPaymentMethod: "Bank transfer", totalSpend: 215800, payments: 13, refunds: 7200,  disputeLosses: 3600,  lastPayment: "2026-03-17T13:40:00Z", createdAt: "2026-01-30T09:30:00Z" },
  { id: "cus_011", name: "Hannah Moore",    email: "hannah.moore@freelance.co",     type: "individual", defaultPaymentMethod: "Visa",          totalSpend: 29900,  payments: 2,  refunds: 9900,  disputeLosses: 0,     lastPayment: "2026-02-28T17:00:00Z", createdAt: "2026-02-10T10:00:00Z" },
  { id: "cus_012", name: "Rashid Al-Farsi", email: "rashid.alfarsi@holdings.ae",    type: "business",   defaultPaymentMethod: "Amex",          totalSpend: 891500, payments: 53, refunds: 32000, disputeLosses: 8900,  lastPayment: "2026-03-23T08:30:00Z", createdAt: "2025-10-05T06:00:00Z" },
  { id: "cus_013", name: "Brianna Osei",    email: "b.osei@creativeagency.com",     type: "business",   defaultPaymentMethod: "Mastercard",    totalSpend: 54100,  payments: 4,  refunds: 0,     disputeLosses: 0,     lastPayment: "2026-03-12T14:15:00Z", createdAt: "2026-02-14T11:00:00Z" },
  { id: "cus_014", name: "Tom Eriksen",     email: "tom.eriksen@nordic.se",         type: "individual", defaultPaymentMethod: "Visa",          totalSpend: 8800,   payments: 1,  refunds: 0,     disputeLosses: 0,     lastPayment: "2026-03-05T09:00:00Z", createdAt: "2026-03-03T08:00:00Z" },
  { id: "cus_015", name: "Mei Lin",         email: "mei.lin@ventures.hk",           type: "business",   defaultPaymentMethod: "Bank transfer", totalSpend: 317400, payments: 19, refunds: 11000, disputeLosses: 0,     lastPayment: "2026-03-21T10:45:00Z", createdAt: "2025-12-01T14:30:00Z" },
  { id: "cus_016", name: "Darius Webb",     email: "darius.webb@startup.io",        type: "business",   defaultPaymentMethod: null,            totalSpend: 0,      payments: 0,  refunds: 0,     disputeLosses: 0,     lastPayment: null,                   createdAt: "2026-03-19T16:00:00Z" },
  { id: "cus_017", name: "Ingrid Svensson", email: "ingrid.svensson@agency.eu",     type: "business",   defaultPaymentMethod: "Mastercard",    totalSpend: 168900, payments: 11, refunds: 4400,  disputeLosses: 4400,  lastPayment: "2026-03-16T11:30:00Z", createdAt: "2026-01-08T09:00:00Z" },
  { id: "cus_018", name: "Tobias Müller",   email: "tobias.muller@gmbh.de",         type: "business",   defaultPaymentMethod: "Visa",          totalSpend: 431200, payments: 26, refunds: 0,     disputeLosses: 6600,  lastPayment: "2026-03-20T15:00:00Z", createdAt: "2025-11-25T10:00:00Z" },
  { id: "cus_019", name: "Aisha Kamara",    email: "aisha.kamara@ngo.org",          type: "business",   defaultPaymentMethod: "Bank transfer", totalSpend: 12300,  payments: 1,  refunds: 0,     disputeLosses: 0,     lastPayment: "2026-03-14T08:00:00Z", createdAt: "2026-03-10T10:00:00Z" },
  { id: "cus_020", name: "Carlos Mendes",   email: "c.mendes@grupo.br",             type: "business",   defaultPaymentMethod: "Amex",          totalSpend: 59700,  payments: 6,  refunds: 19900, disputeLosses: 0,     lastPayment: "2026-03-11T13:20:00Z", createdAt: "2026-02-05T12:00:00Z" },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Today's date (fixed reference so tab filters behave consistently).
 * In a real app this would be `new Date()`.
 */
const TODAY = new Date("2026-03-25T00:00:00Z")

export function filterCustomersByTab(customers: Customer[], tab: CustomerTab): Customer[] {
  switch (tab) {
    case "all":
      return customers

    case "top":
      return customers.filter((c) => c.totalSpend > 50000)

    case "first-time":
      return customers.filter((c) => c.payments === 1)

    case "repeat":
      return customers.filter((c) => c.payments > 1)

    case "recent": {
      const cutoff = new Date(TODAY)
      cutoff.setDate(cutoff.getDate() - 60)
      return customers.filter((c) => new Date(c.createdAt) >= cutoff)
    }

    case "high-refunds":
      return customers.filter((c) => c.refunds > 0)

    case "high-disputes":
      return customers.filter((c) => c.disputeLosses > 0)

    default:
      return customers
  }
}

export function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  const day = d.getUTCDate()
  const month = d.toLocaleString("en-GB", { month: "short", timeZone: "UTC" })
  const hours   = String(d.getUTCHours()).padStart(2, "0")
  const minutes = String(d.getUTCMinutes()).padStart(2, "0")
  return `${day} ${month}, ${hours}:${minutes}`
}
