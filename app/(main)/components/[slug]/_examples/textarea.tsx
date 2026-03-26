"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

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

function TextareaSection() {
  return (
    <Section title="Textarea" sub="textarea.tsx">
      <Textarea placeholder="Write something…" className="max-w-xs" />
      <Textarea placeholder="Disabled" disabled className="max-w-xs" />
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <TextareaSection />
    </div>
  )
}
