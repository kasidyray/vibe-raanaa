"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  RiAddLine, RiDownloadLine, RiArrowRightLine, RiShareLine,
  RiMailLine, RiSearchLine, RiSettings3Line, RiCloseCircleLine,
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

function ButtonSection() {
  return (
    <Section title="Button" sub="button.tsx">
      <Row label="Variants">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </Row>
      <Row label="Sizes">
        <Button size="xs">XSmall</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </Row>
      <Row label="Icon sizes">
        <Button size="icon-xs"><RiAddLine /></Button>
        <Button size="icon-sm"><RiAddLine /></Button>
        <Button size="icon"><RiAddLine /></Button>
        <Button size="icon-lg"><RiAddLine /></Button>
      </Row>
      <Row label="Icon variants">
        <Button size="icon"><RiSettings3Line /></Button>
        <Button size="icon" variant="secondary"><RiSettings3Line /></Button>
        <Button size="icon" variant="outline"><RiSettings3Line /></Button>
        <Button size="icon" variant="ghost"><RiSettings3Line /></Button>
        <Button size="icon" variant="destructive"><RiSettings3Line /></Button>
      </Row>
      <Row label="Icon leading">
        <Button><RiDownloadLine />Download</Button>
        <Button variant="secondary"><RiAddLine />New item</Button>
        <Button variant="outline"><RiSearchLine />Search</Button>
        <Button variant="ghost"><RiSettings3Line />Settings</Button>
        <Button variant="destructive"><RiCloseCircleLine />Delete</Button>
      </Row>
      <Row label="Icon trailing">
        <Button>Continue<RiArrowRightLine /></Button>
        <Button variant="secondary">Share<RiShareLine /></Button>
        <Button variant="outline">Send<RiMailLine /></Button>
      </Row>
      <Row label="Loading">
        <Button loading>Default</Button>
        <Button variant="secondary" loading>Secondary</Button>
        <Button variant="outline" loading>Outline</Button>
        <Button variant="ghost" loading>Ghost</Button>
        <Button variant="destructive" loading>Destructive</Button>
      </Row>
      <Row label="Disabled">
        <Button disabled>Default</Button>
        <Button variant="secondary" disabled>Secondary</Button>
        <Button variant="outline" disabled>Outline</Button>
      </Row>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <ButtonSection />
    </div>
  )
}
