"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field, FieldGroup, FieldLabel, FieldDescription, FieldError,
  FieldTitle, FieldContent,
} from "@/components/ui/field"

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

function FieldSection() {
  return (
    <Section title="Field" sub="field.tsx">
      <FieldGroup>
        <Field orientation="vertical">
          <FieldLabel>Full name</FieldLabel>
          <FieldDescription>Your legal first and last name.</FieldDescription>
          <Input placeholder="Alice Johnson" />
        </Field>
        <Field orientation="vertical">
          <FieldLabel>Email</FieldLabel>
          <Input placeholder="alice@example.com" type="email" />
          <FieldError>Please enter a valid email address.</FieldError>
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Notifications</FieldTitle>
            <FieldDescription>Receive product updates.</FieldDescription>
          </FieldContent>
          <Checkbox defaultChecked />
        </Field>
      </FieldGroup>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <FieldSection />
    </div>
  )
}
