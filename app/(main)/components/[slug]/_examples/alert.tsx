"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Alert, AlertIcon, AlertContent, AlertTitle,
  AlertDescription, AlertActions, AlertClose,
} from "@/components/ui/alert"

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

const ALERT_VARIANTS = ["info", "success", "warning", "error"] as const
const ALERT_LABELS: Record<string, { title: string; description: string; action: string }> = {
  info:    { title: "Heads up",             description: "Your account will be reviewed within 2 business days.", action: "Learn more" },
  success: { title: "Changes saved",        description: "Your profile has been updated successfully.",           action: "View profile" },
  warning: { title: "Storage almost full",  description: "You've used 90% of your storage. Consider upgrading.", action: "Upgrade plan" },
  error:   { title: "Something went wrong", description: "We couldn't process your request. Please try again.",  action: "Try again" },
}

function AlertSection() {
  const [dismissed, setDismissed] = React.useState<Record<string, boolean>>({})
  return (
    <Section title="Alert" sub="alert.tsx">
      <Row label="Page">
        <div className="w-full flex flex-col gap-2">
          {ALERT_VARIANTS.map((v) => (
            <Alert key={v} variant={v} level="page">
              <AlertIcon />
              <AlertContent>
                <AlertTitle>{ALERT_LABELS[v].title}</AlertTitle>
                <AlertDescription>{ALERT_LABELS[v].description}</AlertDescription>
                <AlertActions>
                  <a href="#" className="text-xs font-medium underline underline-offset-2 hover:no-underline">{ALERT_LABELS[v].action}</a>
                </AlertActions>
              </AlertContent>
            </Alert>
          ))}
        </div>
      </Row>
      <Row label="Section">
        <div className="w-full flex flex-col gap-3">
          {ALERT_VARIANTS.map((v) => {
            const key = `section-${v}`
            if (dismissed[key]) return null
            return (
              <Alert key={v} variant={v} level="section" onClose={() => setDismissed((d) => ({ ...d, [key]: true }))}>
                <AlertIcon />
                <AlertContent>
                  <AlertTitle>{ALERT_LABELS[v].title}</AlertTitle>
                  <AlertDescription>{ALERT_LABELS[v].description}</AlertDescription>
                  <AlertActions>
                    <a href="#" className="text-xs font-medium underline underline-offset-2 hover:no-underline">{ALERT_LABELS[v].action}</a>
                  </AlertActions>
                </AlertContent>
                <AlertClose />
              </Alert>
            )
          })}
        </div>
      </Row>
      <Row label="Inline">
        <div className="w-full flex flex-col gap-2">
          {ALERT_VARIANTS.map((v) => (
            <Alert key={v} variant={v} level="inline">
              <AlertIcon />
              <AlertContent>
                <AlertTitle>{ALERT_LABELS[v].title}</AlertTitle>
                <AlertDescription>{ALERT_LABELS[v].description}</AlertDescription>
                <AlertActions>
                  <a href="#" className="text-xs font-medium underline underline-offset-2 hover:no-underline">{ALERT_LABELS[v].action}</a>
                </AlertActions>
              </AlertContent>
            </Alert>
          ))}
        </div>
      </Row>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <AlertSection />
    </div>
  )
}
