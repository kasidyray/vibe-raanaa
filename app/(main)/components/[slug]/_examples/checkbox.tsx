"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

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

function CheckboxSection() {
  const [c1, setC1] = useState(false)
  const [c2, setC2] = useState(true)
  return (
    <Section title="Checkbox" sub="checkbox.tsx">
      <Row label="States">
        <div className="flex items-center gap-2">
          <Checkbox id="cb1" checked={c1} onCheckedChange={(v) => setC1(v === true)} />
          <Label htmlFor="cb1">Unchecked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cb2" checked={c2} onCheckedChange={(v) => setC2(v === true)} />
          <Label htmlFor="cb2">Checked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cb3" disabled />
          <Label htmlFor="cb3" className="opacity-50">Disabled</Label>
        </div>
      </Row>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <CheckboxSection />
    </div>
  )
}
