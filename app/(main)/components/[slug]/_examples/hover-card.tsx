"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import {
  RiMapPinLine, RiCalendarLine, RiGlobalLine, RiExternalLinkLine,
  RiUserFollowLine, RiLink, RiBarChart2Line,
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

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <p className="text-xs text-muted-foreground">{label}</p>}
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}

function HoverCardSection() {
  return (
    <Section title="Hover Card" sub="hover-card.tsx">
      {/* User mention */}
      <Row label="User profile">
        <p className="text-sm text-muted-foreground">
          Built by{" "}
          <HoverCard>
            <HoverCardTrigger className="font-medium text-foreground underline underline-offset-4 decoration-dotted cursor-pointer">
              @amara_osei
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex gap-3">
                <Avatar className="size-10 shrink-0">
                  <AvatarFallback>AO</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 min-w-0">
                  <div>
                    <p className="font-semibold leading-snug">Amara Osei</p>
                    <p className="text-xs text-muted-foreground">@amara_osei</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Product designer & frontend engineer. Building design systems and open-source tools.
                  </p>
                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><RiMapPinLine className="size-3" />Accra, Ghana</span>
                    <span className="flex items-center gap-1"><RiCalendarLine className="size-3" />Joined Jan 2021</span>
                  </div>
                  <div className="mt-1 flex gap-4 text-xs">
                    <span><strong className="text-foreground">248</strong> following</span>
                    <span><strong className="text-foreground">1.4k</strong> followers</span>
                  </div>
                </div>
              </div>
              <Button size="sm" className="mt-3 w-full" variant="outline">
                <RiUserFollowLine />Follow
              </Button>
            </HoverCardContent>
          </HoverCard>
          {" "}and the team at Raana.
        </p>
      </Row>

      {/* Link preview */}
      <Row label="Link preview">
        <HoverCard>
          <HoverCardTrigger className="inline-flex items-center gap-1 text-sm font-medium text-link underline underline-offset-4 cursor-pointer">
            <RiLink className="size-3.5" />
            shadcn/ui documentation
          </HoverCardTrigger>
          <HoverCardContent side="top">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold leading-snug">shadcn/ui</p>
                  <p className="text-xs text-muted-foreground">ui.shadcn.com</p>
                </div>
                <RiExternalLinkLine className="size-4 shrink-0 text-muted-foreground mt-0.5" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Beautifully designed components built with Radix UI and Tailwind CSS. Open source and free to use in your projects.
              </p>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><RiGlobalLine className="size-3" />Open source</span>
                <span className="flex items-center gap-1"><RiCalendarLine className="size-3" />Updated Mar 2026</span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </Row>

      {/* Metric breakdown */}
      <Row label="Metric">
        <HoverCard>
          <HoverCardTrigger>
            <Badge variant="info" icon={<RiBarChart2Line />} size="lg" className="cursor-default">
              98.4% uptime
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent side="top" align="start">
            <p className="font-semibold mb-2">Uptime breakdown</p>
            <div className="flex flex-col gap-1.5 text-xs">
              {[
                { label: "Last 24 hours", value: "100%", ok: true },
                { label: "Last 7 days",   value: "99.8%", ok: true },
                { label: "Last 30 days",  value: "98.4%", ok: true },
                { label: "Last incident", value: "14 Mar 2026", ok: false },
              ].map(({ label, value, ok }) => (
                <div key={label} className="flex items-center justify-between gap-6">
                  <span className="text-muted-foreground">{label}</span>
                  <span className={ok ? "font-medium" : "text-muted-foreground"}>{value}</span>
                </div>
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>
      </Row>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <HoverCardSection />
    </div>
  )
}
