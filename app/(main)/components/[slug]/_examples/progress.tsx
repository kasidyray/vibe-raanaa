"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"

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

const RESOURCES = [
  { name: "Storage",   value: 78 },
  { name: "Bandwidth", value: 42 },
  { name: "API calls", value: 91 },
]

function ProgressSection() {
  return (
    <Section title="Progress" sub="progress.tsx">
      <Row label="Default">
        <Progress value={60} className="w-full" />
      </Row>

      <Row label="With label and value">
        <Progress value={73} className="w-full">
          <ProgressLabel>Profile completion</ProgressLabel>
          <ProgressValue />
        </Progress>
      </Row>

      <Row label="Resource usage">
        <div className="flex w-full flex-col gap-3">
          {RESOURCES.map(({ name, value }) => (
            <Progress key={name} value={value}>
              <ProgressLabel>{name}</ProgressLabel>
              <ProgressValue />
            </Progress>
          ))}
        </div>
      </Row>

      <Row label="Indeterminate">
        <Progress value={null} className="w-full" />
      </Row>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <ProgressSection />
    </div>
  )
}
