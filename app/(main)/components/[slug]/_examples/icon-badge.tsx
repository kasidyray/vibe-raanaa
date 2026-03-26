"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { IconBadge } from "@/components/ui/icon-badge"

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

const ICON_BADGE_VARIANTS = ["neutral", "primary", "success", "warning", "info", "destructive"] as const
const ICON_BADGE_SIZES = ["sm", "default", "lg", "xl"] as const

function IconBadgeSection() {
  return (
    <Section title="Icon Badge" sub="icon-badge.tsx">
      {/* Variants */}
      <Row>
        <IconBadge variant="neutral" />
        <IconBadge variant="primary" />
        <IconBadge variant="success" />
        <IconBadge variant="warning" />
        <IconBadge variant="info" />
        <IconBadge variant="destructive" />
      </Row>
      {/* Sizes */}
      <Row>
        {ICON_BADGE_SIZES.map((size) => (
          <IconBadge key={size} variant="warning" size={size} />
        ))}
      </Row>
      {/* Dialog usage */}
      <Row>
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>Update card</DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <IconBadge variant="warning" />
              <DialogTitle>Update your card</DialogTitle>
              <DialogDescription>Your new card will replace your current card.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-1">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="card-name">Name on card</Label>
                <Input id="card-name" defaultValue="Ikedi Eze" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="card-number">Card number</Label>
                <Input id="card-number" placeholder="Card number" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="card-expiry">Expiry date</Label>
                  <Input id="card-expiry" placeholder="MM/DD" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="card-cvv">CVV</Label>
                  <Input id="card-cvv" placeholder="CVV" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="card-default" />
                <Label htmlFor="card-default">Set as default payment method</Label>
              </div>
            </div>
            <DialogFooter>
              <Button className="w-full">Update card</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger render={<Button variant="destructive" size="sm" />}>Delete project</DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <IconBadge variant="destructive" />
              <DialogTitle>Delete project</DialogTitle>
              <DialogDescription>This will permanently delete the project and all its data. This action cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" className="flex-1">Cancel</Button>
              <Button variant="destructive" className="flex-1">Delete project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger render={<Button variant="outline" size="sm" />}>Invite team</DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <IconBadge variant="success" />
              <DialogTitle>Invite team members</DialogTitle>
              <DialogDescription>Send invites to your team. They will receive an email to join your workspace.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-1.5 py-1">
              <Label htmlFor="invite-email">Email address</Label>
              <Input id="invite-email" type="email" placeholder="colleague@company.com" />
            </div>
            <DialogFooter>
              <Button variant="outline" className="flex-1">Cancel</Button>
              <Button className="flex-1">Send invite</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Row>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <IconBadgeSection />
    </div>
  )
}
