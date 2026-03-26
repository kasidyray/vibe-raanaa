"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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

function SeparatorSection() {
  return (
    <Section title="Separator" sub="separator.tsx">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Horizontal</p>
          <div className="flex flex-col gap-2 text-sm">
            <span>Section A</span>
            <Separator />
            <span>Section B</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">Vertical</p>
          <div className="flex items-center gap-3 text-sm h-5">
            <span>One</span>
            <Separator orientation="vertical" />
            <span>Two</span>
            <Separator orientation="vertical" />
            <span>Three</span>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <SeparatorSection />
    </div>
  )
}
