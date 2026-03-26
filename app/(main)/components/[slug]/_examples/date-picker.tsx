"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"

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

function DatePickerSection() {
  const [single, setSingle]   = React.useState<Date>()
  const [another, setAnother] = React.useState<Date | undefined>(new Date())

  return (
    <Section title="Date Picker" sub="date-picker.tsx">
      <Row label="Empty">
        <DatePicker value={single} onChange={setSingle} placeholder="Pick a date" />
      </Row>
      <Row label="With value">
        <DatePicker value={another} onChange={setAnother} />
      </Row>
      <Row label="Disabled">
        <DatePicker value={single} onChange={setSingle} disabled placeholder="Not available" />
      </Row>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <DatePickerSection />
    </div>
  )
}
