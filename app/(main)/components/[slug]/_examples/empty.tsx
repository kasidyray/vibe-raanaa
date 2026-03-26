"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent,
} from "@/components/ui/empty"
import {
  RiSearchLine, RiMailLine, RiFileCopyLine, RiUser2Line, RiListCheck,
  RiErrorWarningLine, RiAddLine, RiDownloadLine,
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

function EmptySection() {
  return (
    <>
      <Section title="Empty – No results" sub="empty.tsx">
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="stacked"><RiSearchLine /></EmptyMedia>
            <EmptyTitle>No results found</EmptyTitle>
            <EmptyDescription>
              Try adjusting your search or filters to find what you're looking for.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" size="sm">Clear filters</Button>
          </EmptyContent>
        </Empty>
      </Section>

      <Section title="Empty – No messages" sub="empty.tsx">
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="stacked"><RiMailLine /></EmptyMedia>
            <EmptyTitle>No messages yet</EmptyTitle>
            <EmptyDescription>
              You're all caught up. New messages from your team will appear here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Section>

      <Section title="Empty – No documents" sub="empty.tsx">
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="stacked"><RiFileCopyLine /></EmptyMedia>
            <EmptyTitle>No documents</EmptyTitle>
            <EmptyDescription>
              Upload or create your first document to get started.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Button size="sm"><RiAddLine />New document</Button>
              <Button variant="outline" size="sm"><RiDownloadLine />Upload</Button>
            </div>
          </EmptyContent>
        </Empty>
      </Section>

      <Section title="Empty – No team members" sub="empty.tsx">
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="stacked"><RiUser2Line /></EmptyMedia>
            <EmptyTitle>Invite your team</EmptyTitle>
            <EmptyDescription>
              Collaborate with others by inviting them to your workspace.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm"><RiAddLine />Invite members</Button>
          </EmptyContent>
        </Empty>
      </Section>

      <Section title="Empty – No tasks" sub="empty.tsx">
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="stacked"><RiListCheck /></EmptyMedia>
            <EmptyTitle>No tasks yet</EmptyTitle>
            <EmptyDescription>
              Create your first task and start tracking your progress.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm"><RiAddLine />New task</Button>
          </EmptyContent>
        </Empty>
      </Section>

      <Section title="Empty – Error state" sub="empty.tsx">
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="stacked"><RiErrorWarningLine /></EmptyMedia>
            <EmptyTitle>Something went wrong</EmptyTitle>
            <EmptyDescription>
              We couldn't load this content. Please check your connection and try again.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" size="sm">Try again</Button>
          </EmptyContent>
        </Empty>
      </Section>

      <Section title="Empty – Stacked icon (no visitors)" sub="empty.tsx">
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="stacked"><RiUser2Line /></EmptyMedia>
            <EmptyTitle>No visitors yet</EmptyTitle>
            <EmptyDescription>
              Visitors to your demo will appear here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Section>

      <Section title="Empty – Stacked icon (no documents)" sub="empty.tsx">
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="stacked"><RiFileCopyLine /></EmptyMedia>
            <EmptyTitle>No documents</EmptyTitle>
            <EmptyDescription>
              Upload or create a document to get started.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm">Upload document</Button>
          </EmptyContent>
        </Empty>
      </Section>
    </>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <EmptySection />
    </div>
  )
}
