"use client"

import * as React from "react"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <Section title="Sonner" sub="sonner.tsx">
        <Row label="Variants">
          <Button variant="outline" onClick={() => toast("This is a default toast.")}>
            Default
          </Button>
          <Button variant="outline" onClick={() => toast.success("Changes saved successfully.")}>
            Success
          </Button>
          <Button variant="outline" onClick={() => toast.info("Your account is under review.")}>
            Info
          </Button>
          <Button variant="outline" onClick={() => toast.warning("Storage is almost full.")}>
            Warning
          </Button>
          <Button variant="outline" onClick={() => toast.error("Something went wrong.")}>
            Error
          </Button>
        </Row>
        <Row label="With description">
          <Button
            variant="outline"
            onClick={() =>
              toast.success("Profile updated", {
                description: "Your changes have been saved and are now live.",
              })
            }
          >
            With description
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.error("Upload failed", {
                description: "The file exceeds the 10 MB size limit.",
              })
            }
          >
            Error with description
          </Button>
        </Row>
        <Row label="With action">
          <Button
            variant="outline"
            onClick={() =>
              toast("Item deleted", {
                action: {
                  label: "Undo",
                  onClick: () => toast.success("Deletion undone."),
                },
              })
            }
          >
            With action
          </Button>
        </Row>
        <Row label="Loading">
          <Button
            variant="outline"
            onClick={() => {
              const id = toast.loading("Saving changes…")
              setTimeout(() => toast.success("Changes saved.", { id }), 2000)
            }}
          >
            Loading → Success
          </Button>
        </Row>
      </Section>
    </div>
  )
}
