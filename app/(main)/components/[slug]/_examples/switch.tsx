"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

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

function SwitchSection() {
  const [notifications, setNotifications] = React.useState(true)
  const [marketing, setMarketing] = React.useState(false)
  const [updates, setUpdates] = React.useState(true)
  const [security, setSecurity] = React.useState(true)
  return (
    <Section title="Switch" sub="switch.tsx">
      <Row label="Default">
        <Switch />
        <Switch defaultChecked />
      </Row>

      <Row label="Sizes">
        <Switch size="sm" />
        <Switch size="sm" defaultChecked />
        <Switch size="default" />
        <Switch size="default" defaultChecked />
      </Row>

      <Row label="Disabled">
        <Switch disabled />
        <Switch disabled defaultChecked />
      </Row>

      <Row label="With label">
        <div className="flex items-center gap-2">
          <Switch id="airplane" />
          <Label htmlFor="airplane">Airplane mode</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="wifi" defaultChecked />
          <Label htmlFor="wifi">Wi-Fi</Label>
        </div>
      </Row>

      <Row label="Controlled (notification settings)">
        <div className="flex w-full flex-col gap-6">
          {[
            { id: "notif",    label: "Push notifications", desc: "Receive alerts for activity",       checked: notifications, onChange: setNotifications },
            { id: "mkt",      label: "Marketing emails",   desc: "Promotions and feature updates",    checked: marketing,     onChange: setMarketing },
            { id: "updates",  label: "Product updates",    desc: "Changelog and release notes",       checked: updates,       onChange: setUpdates },
            { id: "security", label: "Security alerts",    desc: "Login attempts and account changes", checked: security,     onChange: setSecurity },
          ].map(({ id, label, desc, checked, onChange }) => (
            <div key={id} className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium leading-snug">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <Switch
                id={id}
                checked={checked}
                onCheckedChange={onChange}
              />
            </div>
          ))}
        </div>
      </Row>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <SwitchSection />
    </div>
  )
}
