"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader,
  DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose,
} from "@/components/ui/drawer"

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

function DrawerSection() {
  const [snap, setSnap] = React.useState<number | string | null>(0.4)

  return (
    <Section title="Drawer" sub="drawer.tsx">
      <Row label="Directions">
        {(["bottom", "top", "right", "left"] as const).map((dir) => (
          <Drawer key={dir} direction={dir}>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm">{dir}</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Terms of Service</DrawerTitle>
                <DrawerDescription>Please read carefully before continuing.</DrawerDescription>
              </DrawerHeader>
              <div className="flex-1 overflow-y-auto px-6">
                <div className="flex flex-col gap-4 text-sm text-foreground">
                  <p>Welcome to our platform. By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
                  <p>The materials contained in this platform are protected by applicable copyright and trademark law. Permission is granted to temporarily download one copy of the materials for personal, non-commercial transitory viewing only.</p>
                  <p>This licence shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time. Upon terminating your viewing of these materials or upon the termination of this licence, you must destroy any downloaded materials in your possession whether in electronic or printed format.</p>
                </div>
              </div>
              <DrawerFooter>
                <Button>Accept</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ))}
      </Row>

      <Row label="With form">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm">Edit profile</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>Update your account details below.</DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col gap-4 px-6 pb-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="drawer-name">Name</Label>
                <Input id="drawer-name" placeholder="Alex Johnson" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="drawer-email">Email</Label>
                <Input id="drawer-email" type="email" placeholder="alex@example.com" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Role</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Marketing emails</p>
                  <p className="text-xs text-muted-foreground">Receive updates and promotions</p>
                </div>
                <Switch />
              </div>
            </div>
            <DrawerFooter>
              <Button>Save changes</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Row>

      <Row label="Snap points">
        <Drawer
          snapPoints={[0.4, 1]}
          activeSnapPoint={snap}
          setActiveSnapPoint={setSnap}
        >
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm">Open with snaps</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Snap points</DrawerTitle>
              <DrawerDescription>Drag the handle up to expand to full height.</DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto px-6 pb-4">
              <div className="flex flex-col gap-3 text-sm text-foreground">
                <p>This drawer snaps to two positions — 40% and full screen. Drag the handle up or down to switch between them.</p>
                <p>Snap points are useful for progressive disclosure, surfacing a summary at the collapsed state and full detail when expanded.</p>
                <p>You can define any number of snap points as fractions (0–1) or pixel strings like <code className="text-xs bg-muted px-1 py-0.5 rounded">320px</code>.</p>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Row>

      <Row label="Non-dismissible">
        <Drawer dismissible={false}>
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm">Non-dismissible</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Confirm action</DrawerTitle>
              <DrawerDescription>This drawer cannot be dismissed by clicking the overlay or pressing Escape. You must use the buttons below.</DrawerDescription>
            </DrawerHeader>
            <div className="px-6 text-sm text-foreground">
              <p>Use <code className="text-xs bg-muted px-1 py-0.5 rounded">dismissible={"{false}"}</code> to force users to make an explicit choice — useful for critical confirmations or required steps.</p>
            </div>
            <DrawerFooter>
              <Button>Confirm</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Row>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <DrawerSection />
    </div>
  )
}
