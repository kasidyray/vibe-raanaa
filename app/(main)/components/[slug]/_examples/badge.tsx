"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  RiInformationLine, RiCheckboxCircleLine, RiErrorWarningLine, RiCloseCircleLine,
} from "@remixicon/react"

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

function BadgeSection() {
  return (
    <Section title="Badge" sub="badge.tsx">
      <Row label="Tones">
        <Badge variant="info">Info</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="critical">Critical</Badge>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="caution">Caution</Badge>
      </Row>
      <Row label="With icon">
        <Badge variant="info" icon={<RiInformationLine />}>Info</Badge>
        <Badge variant="success" icon={<RiCheckboxCircleLine />}>Success</Badge>
        <Badge variant="warning" icon={<RiErrorWarningLine />}>Warning</Badge>
        <Badge variant="critical" icon={<RiCloseCircleLine />}>Critical</Badge>
        <Badge variant="neutral" icon={<RiErrorWarningLine />}>Neutral</Badge>
        <Badge variant="caution" icon={<RiErrorWarningLine />}>Caution</Badge>
      </Row>
      <Row label="Sizes">
        <Badge variant="info" size="sm">Small</Badge>
        <Badge variant="info">Default</Badge>
        <Badge variant="info" size="lg">Large</Badge>
      </Row>
      <Row label="Sizes with icon">
        <Badge variant="success" size="sm" icon={<RiCheckboxCircleLine />}>Small</Badge>
        <Badge variant="success" icon={<RiCheckboxCircleLine />}>Default</Badge>
        <Badge variant="success" size="lg" icon={<RiCheckboxCircleLine />}>Large</Badge>
      </Row>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <BadgeSection />
    </div>
  )
}
