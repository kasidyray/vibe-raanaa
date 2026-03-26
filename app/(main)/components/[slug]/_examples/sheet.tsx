"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sheet, SheetContent, SheetDescription, SheetFooter,
  SheetHeader, SheetTitle, SheetTrigger, SheetClose,
} from "@/components/ui/sheet"
import {
  InputGroup, InputGroupAddon, InputGroupInput, InputGroupText,
} from "@/components/ui/input-group"
import { RiArrowRightLine, RiFileTextLine, RiExternalLinkLine, RiEditLine } from "@remixicon/react"

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

function SheetSection() {
  return (
    <Section title="Sheet" sub="sheet.tsx">
      <Row label="Sides">
          {/* Left sheet — activity feed */}
          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="sm" />}>left</SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Add a new user</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col flex-1 overflow-hidden">
                <Tabs defaultValue="activities" className="flex flex-col flex-1 overflow-hidden">
                  <TabsList variant="underline" className="px-6 shrink-0">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="partner">Partner detail</TabsTrigger>
                    <TabsTrigger value="activities">Activities</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="flex-1 px-6 py-4">
                    <p className="text-sm text-muted-foreground">Overview content goes here.</p>
                  </TabsContent>
                  <TabsContent value="partner" className="flex-1 px-6 py-4">
                    <p className="text-sm text-muted-foreground">Partner detail content goes here.</p>
                  </TabsContent>
                  <TabsContent value="activities" className="flex-1 overflow-y-auto px-6 py-4">
                    <div className="flex flex-col gap-6">
                      {/* Activity 1 — Approved */}
                      <div className="flex gap-3">
                        <Avatar className="size-8 shrink-0">
                          <AvatarImage src="https://i.pravatar.cc/32?img=7" />
                          <AvatarFallback>KS</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-0.5">
                          <p className="text-sm">
                            <span className="font-semibold">Kunle Sadare</span>{" "}
                            <span className="text-muted-foreground">updated</span>{" "}
                            <span className="font-semibold">Tax Identification number</span>
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            Pending <RiArrowRightLine className="size-3" />
                            <span className="text-success-dark font-medium">Approved</span>
                            <span className="mx-1">·</span> Feb 6, 2023 at 9:24 AM
                          </p>
                        </div>
                      </div>
                      {/* Activity 2 — Declined with reason */}
                      <div className="flex gap-3">
                        <Avatar className="size-8 shrink-0">
                          <AvatarImage src="https://i.pravatar.cc/32?img=7" />
                          <AvatarFallback>KS</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-0.5">
                            <p className="text-sm">
                              <span className="font-semibold">Kunle Sadare</span>{" "}
                              <span className="text-muted-foreground">updated</span>{" "}
                              <span className="font-semibold">Tax Identification number</span>
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              Pending <RiArrowRightLine className="size-3" />
                              <span className="text-error-dark font-medium">Declined</span>
                              <span className="mx-1">·</span> Feb 6, 2023 at 9:24 AM
                            </p>
                          </div>
                          <div className="rounded-md border border-dashed border-border px-3 py-2 text-xs text-muted-foreground">
                            Reason: We could not verify your Tax Identification number
                          </div>
                        </div>
                      </div>
                      {/* Activity 3 — File attachment (external link) */}
                      <div className="flex gap-3">
                        <Avatar className="size-8 shrink-0">
                          <AvatarImage src="https://i.pravatar.cc/32?img=7" />
                          <AvatarFallback>KS</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-0.5">
                            <p className="text-sm">
                              <span className="font-semibold">Kunle Sadare</span>{" "}
                              <span className="text-muted-foreground">updated</span>{" "}
                              <span className="font-semibold">Tax Identification number</span>
                            </p>
                            <p className="text-xs text-muted-foreground">Feb 6, 2023 at 9:24 AM</p>
                          </div>
                          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-foreground w-fit">
                            <RiFileTextLine className="size-3.5 shrink-0" />
                            <span>GalaxoSmilt...ent.pdf</span>
                            <RiExternalLinkLine className="size-3.5 shrink-0 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                      {/* Activity 4 — File attachment (edit) */}
                      <div className="flex gap-3">
                        <Avatar className="size-8 shrink-0">
                          <AvatarImage src="https://i.pravatar.cc/32?img=7" />
                          <AvatarFallback>KS</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-0.5">
                            <p className="text-sm">
                              <span className="font-semibold">Kunle Sadare</span>{" "}
                              <span className="text-muted-foreground">updated</span>{" "}
                              <span className="font-semibold">Tax Identification number</span>
                            </p>
                            <p className="text-xs text-muted-foreground">Feb 6, 2023 at 9:24 AM</p>
                          </div>
                          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-foreground w-fit">
                            <RiEditLine className="size-3.5 shrink-0" />
                            <span>GalaxoSmilt...ent.pdf</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </SheetContent>
          </Sheet>
          {/* Right + Bottom sheets */}
          {(["right", "bottom"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger render={<Button variant="outline" size="sm" />}>{side}</SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Edit Profile</SheetTitle>
                  <SheetDescription>Update your personal details. Changes are saved immediately.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-5 px-6 py-2 flex-1 overflow-y-auto">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-14">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">Alice Johnson</p>
                      <Button variant="outline" size="sm">Change photo</Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor={`sheet-${side}-name`}>Full name</Label>
                    <Input id={`sheet-${side}-name`} defaultValue="Alice Johnson" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor={`sheet-${side}-email`}>Email</Label>
                    <Input id={`sheet-${side}-email`} type="email" defaultValue="alice@example.com" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor={`sheet-${side}-role`}>Job title</Label>
                    <Input id={`sheet-${side}-role`} defaultValue="Product Designer" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor={`sheet-${side}-bio`}>Bio</Label>
                    <Textarea
                      id={`sheet-${side}-bio`}
                      rows={3}
                      defaultValue="I design thoughtful digital experiences. Based in San Francisco."
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor={`sheet-${side}-url`}>Website</Label>
                    <InputGroup>
                      <InputGroupAddon align="inline-start"><InputGroupText>https://</InputGroupText></InputGroupAddon>
                      <InputGroupInput id={`sheet-${side}-url`} placeholder="yoursite.com" />
                    </InputGroup>
                  </div>
                </div>
                <SheetFooter className="flex-row gap-2">
                  <SheetClose render={<Button variant="outline" className="flex-1" />}>Cancel</SheetClose>
                  <Button className="flex-1">Save changes</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
      </Row>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <SheetSection />
    </div>
  )
}
