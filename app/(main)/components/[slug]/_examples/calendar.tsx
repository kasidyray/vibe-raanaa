"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

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

function CalendarSection() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  return (
    <Section title="Calendar" sub="calendar.tsx">
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-xs text-muted-foreground">Single</p>
          <Calendar mode="single" className="bg-popover rounded-lg border" captionLayout="dropdown" selected={date} onSelect={setDate} />
        </div>
      </div>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <CalendarSection />
    </div>
  )
}
