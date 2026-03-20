import { redirect } from "next/navigation"

// /settings → /settings/profile
export default function SettingsPage() {
  redirect("/settings/profile")
}
