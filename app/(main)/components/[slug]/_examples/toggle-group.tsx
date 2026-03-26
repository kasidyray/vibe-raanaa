"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  RiBold, RiItalic, RiUnderline, RiAlignLeft, RiAlignCenter, RiAlignRight,
  RiGridLine, RiListCheck,
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

function ToggleGroupSection() {
  const [align, setAlign] = useState("left")
  const [format, setFormat] = useState<string[]>(["bold"])
  const [view, setView] = useState("grid")
  return (
    <Section title="Toggle Group" sub="toggle-group.tsx">
      <Row label="Single (alignment)">
        <ToggleGroup value={[align]} onValueChange={(v) => v.length > 0 && setAlign(v[v.length - 1])} variant="outline">
          <ToggleGroupItem value="left" aria-label="Left"><RiAlignLeft /></ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center"><RiAlignCenter /></ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right"><RiAlignRight /></ToggleGroupItem>
        </ToggleGroup>
      </Row>
      <Row label="Multiple (formatting)">
        <ToggleGroup multiple value={format} onValueChange={(v) => setFormat(v)} variant="outline">
          <ToggleGroupItem value="bold" aria-label="Bold"><RiBold /></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic"><RiItalic /></ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline"><RiUnderline /></ToggleGroupItem>
        </ToggleGroup>
      </Row>
      <Row label="With labels">
        <ToggleGroup value={[view]} onValueChange={(v) => v.length > 0 && setView(v[v.length - 1])} variant="outline">
          <ToggleGroupItem value="grid" aria-label="Grid view"><RiGridLine />Grid</ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view"><RiListCheck />List</ToggleGroupItem>
        </ToggleGroup>
      </Row>
      <Row label="Spaced">
        <ToggleGroup multiple variant="outline" spacing={1} defaultValue={["bold"]}>
          <ToggleGroupItem value="bold" aria-label="Bold"><RiBold /></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic"><RiItalic /></ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline"><RiUnderline /></ToggleGroupItem>
        </ToggleGroup>
      </Row>
      <Row label="Sizes">
        <ToggleGroup variant="outline" size="sm" defaultValue={["left"]}>
          <ToggleGroupItem value="left"><RiAlignLeft /></ToggleGroupItem>
          <ToggleGroupItem value="center"><RiAlignCenter /></ToggleGroupItem>
          <ToggleGroupItem value="right"><RiAlignRight /></ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup variant="outline" size="default" defaultValue={["left"]}>
          <ToggleGroupItem value="left"><RiAlignLeft /></ToggleGroupItem>
          <ToggleGroupItem value="center"><RiAlignCenter /></ToggleGroupItem>
          <ToggleGroupItem value="right"><RiAlignRight /></ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup variant="outline" size="lg" defaultValue={["left"]}>
          <ToggleGroupItem value="left"><RiAlignLeft /></ToggleGroupItem>
          <ToggleGroupItem value="center"><RiAlignCenter /></ToggleGroupItem>
          <ToggleGroupItem value="right"><RiAlignRight /></ToggleGroupItem>
        </ToggleGroup>
      </Row>
      <Row label="Vertical">
        <ToggleGroup multiple variant="outline" orientation="vertical" defaultValue={["bold"]}>
          <ToggleGroupItem value="bold"><RiBold />Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic"><RiItalic />Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline"><RiUnderline />Underline</ToggleGroupItem>
        </ToggleGroup>
      </Row>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <ToggleGroupSection />
    </div>
  )
}
