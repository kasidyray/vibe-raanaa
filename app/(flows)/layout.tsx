import * as React from "react"

// Minimal wrapper for standalone full-page flows.
// No app sidebar, no SiteHeader, no Container.
// Each flow page owns its own MultiStepLayout shell.
export default function FlowsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
