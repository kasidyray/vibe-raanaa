"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"

function Section({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="break-inside-avoid mb-6">
      <div className="mb-3">
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="text-xs text-muted-foreground font-mono">{sub}</p>
      </div>
      <Card>
        <CardContent className="flex flex-col gap-4">{children}</CardContent>
      </Card>
    </div>
  )
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <p className="text-xs text-muted-foreground">{label}</p>}
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}

function StatusBadgeSection() {
  return (
    <Section title="Status Badge" sub="status-badge.tsx">
      <Row label="Tones">
        <StatusBadge variant="info">Info</StatusBadge>
        <StatusBadge variant="success">Success</StatusBadge>
        <StatusBadge variant="warning">Warning</StatusBadge>
        <StatusBadge variant="critical">Critical</StatusBadge>
        <StatusBadge variant="neutral">Neutral</StatusBadge>
        <StatusBadge variant="caution">Caution</StatusBadge>
      </Row>
      <Row label="Sizes">
        <StatusBadge variant="success" size="sm">Small</StatusBadge>
        <StatusBadge variant="success">Default</StatusBadge>
        <StatusBadge variant="success" size="lg">Large</StatusBadge>
      </Row>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <StatusBadgeSection />
    </div>
  )
}
