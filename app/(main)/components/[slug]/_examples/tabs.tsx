"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

function TabsSection() {
  return (
    <Section title="Tabs" sub="tabs.tsx">
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-xs text-muted-foreground">Default (pill)</p>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-3 text-sm text-muted-foreground">Overview content</TabsContent>
            <TabsContent value="analytics" className="mt-3 text-sm text-muted-foreground">Analytics content</TabsContent>
            <TabsContent value="reports" className="mt-3 text-sm text-muted-foreground">Reports content</TabsContent>
          </Tabs>
        </div>
        <div>
          <p className="mb-2 text-xs text-muted-foreground">Line variant</p>
          <Tabs defaultValue="overview">
            <TabsList variant="underline">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-3 text-sm text-muted-foreground">Overview content</TabsContent>
            <TabsContent value="analytics" className="mt-3 text-sm text-muted-foreground">Analytics content</TabsContent>
            <TabsContent value="reports" className="mt-3 text-sm text-muted-foreground">Reports content</TabsContent>
          </Tabs>
        </div>
        <div>
          <p className="mb-2 text-xs text-muted-foreground">Pill variant</p>
          <Tabs defaultValue="overview">
            <TabsList variant="pill">
              <TabsTrigger value="overview">All Users</TabsTrigger>
              <TabsTrigger value="analytics">Deactivated Users</TabsTrigger>
              <TabsTrigger value="reports">Recent Activities</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-3 text-sm text-muted-foreground">Overview content</TabsContent>
            <TabsContent value="analytics" className="mt-3 text-sm text-muted-foreground">Analytics content</TabsContent>
            <TabsContent value="reports" className="mt-3 text-sm text-muted-foreground">Reports content</TabsContent>
          </Tabs>
        </div>
      </div>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <TabsSection />
    </div>
  )
}
