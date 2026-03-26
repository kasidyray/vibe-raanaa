"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover, PopoverContent, PopoverHeader, PopoverTitle,
  PopoverDescription, PopoverTrigger,
} from "@/components/ui/popover"

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

function PopoverSection() {
  return (
    <Section title="Popover" sub="popover.tsx">
      <Row>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>Open Popover</PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Dimensions</PopoverTitle>
              <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
            </PopoverHeader>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Label htmlFor="pop-width" className="w-12 text-right text-xs">Width</Label>
                <Input id="pop-width" defaultValue="100%" className="h-8" />
              </div>
              <div className="flex items-center gap-3">
                <Label htmlFor="pop-height" className="w-12 text-right text-xs">Height</Label>
                <Input id="pop-height" defaultValue="25px" className="h-8" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Row>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <PopoverSection />
    </div>
  )
}
