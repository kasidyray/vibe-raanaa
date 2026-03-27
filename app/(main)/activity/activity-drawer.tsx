"use client"

import * as React from "react"
import {
  RiCodeLine,
  RiDownloadLine,
  RiRefreshLine,
} from "@remixicon/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"

import {
  type ActivityEvent,
  categoryConfig,
  statusConfig,
  formatFullTimestamp,
  formatRelativeTime,
} from "./data"

export function ActivityDetailDrawer({
  event,
  open,
  onClose,
}: {
  event:   ActivityEvent | null
  open:    boolean
  onClose: () => void
}) {
  const [showRaw, setShowRaw] = React.useState(false)

  React.useEffect(() => {
    if (!open) setShowRaw(false)
  }, [open])

  return (
    <Drawer direction="right" open={open} onOpenChange={o => !o && onClose()}>
      <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-xl">
        {event && (() => {
          const cat    = categoryConfig[event.category]
          const status = statusConfig[event.status]
          return (
            <div className="flex flex-col h-full overflow-y-auto">

              {/* Header */}
              <DrawerHeader className="items-start">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="shrink-0 flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground [&>svg]:size-4 mt-0.5">
                    {cat.icon}
                  </span>
                  <div className="min-w-0">
                    <DrawerTitle className="text-base font-semibold leading-snug">{event.eventName}</DrawerTitle>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{event.summary}</p>
                  </div>
                </div>
                <DrawerClose className="mt-0.5" />
              </DrawerHeader>

              <div className="flex flex-col divide-y divide-border">

                {/* Status + Category + Timestamp */}
                <div className="px-6 py-4 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Status</span>
                      <StatusBadge variant={status.variant}>{status.label}</StatusBadge>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Category</span>
                      <Badge variant={cat.badgeVariant}>{cat.label}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Timestamp</span>
                    <span className="text-sm">{formatFullTimestamp(event.timestamp)}</span>
                    <span className="text-xs text-muted-foreground">{formatRelativeTime(event.timestamp)}</span>
                  </div>
                </div>

                {/* Actor */}
                <div className="px-6 py-4 flex flex-col gap-2">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Actor</span>
                  <div className="flex items-center gap-3">
                    {event.actor.type !== "user" ? (
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground [&>svg]:size-4">
                        {event.actor.type === "api" ? <RiCodeLine /> : <RiRefreshLine />}
                      </span>
                    ) : (
                      <Avatar className="size-8 rounded-full shrink-0">
                        <AvatarImage src={event.actor.avatar} alt={event.actor.name} />
                        <AvatarFallback className="text-xs">{event.actor.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <p className="text-sm font-medium">{event.actor.name}</p>
                      {event.actor.email && (
                        <p className="text-xs text-muted-foreground">{event.actor.email}</p>
                      )}
                      <span className="text-xs text-muted-foreground capitalize">{event.actor.type}</span>
                    </div>
                  </div>
                </div>

                {/* Resource */}
                <div className="px-6 py-4 flex flex-col gap-2">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Resource</span>
                  <div>
                    <p className="text-sm font-medium">{event.target.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{event.target.type}</span>
                      <span className="text-muted-foreground text-xs">·</span>
                      <span className="text-xs font-mono text-muted-foreground">{event.target.id}</span>
                    </div>
                  </div>
                </div>

                {/* Before / After Changes */}
                {event.changes && event.changes.length > 0 && (
                  <div className="px-6 py-4 flex flex-col gap-3">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Changes</span>
                    <div className="rounded-lg border overflow-hidden">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-muted/50 border-b">
                            <th className="py-2 px-3 text-left font-semibold text-muted-foreground">Field</th>
                            <th className="py-2 px-3 text-left font-semibold text-muted-foreground">Before</th>
                            <th className="py-2 px-3 text-left font-semibold text-muted-foreground">After</th>
                          </tr>
                        </thead>
                        <tbody>
                          {event.changes.map((change, i) => (
                            <tr key={i} className="border-b last:border-0">
                              <td className="py-2 px-3 font-mono font-medium">{change.field}</td>
                              <td className="py-2 px-3 text-muted-foreground">
                                {change.before !== null
                                  ? <span className="line-through opacity-60">{change.before}</span>
                                  : <span className="italic opacity-40">—</span>
                                }
                              </td>
                              <td className="py-2 px-3 font-medium text-success-dark">
                                {change.after !== null ? change.after : <span className="italic opacity-40 text-muted-foreground">—</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Request Info */}
                {(event.ipAddress || event.requestId || event.sessionId || event.userAgent) && (
                  <div className="px-6 py-4 flex flex-col gap-3">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Request</span>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                      {event.requestId && (
                        <>
                          <dt className="text-xs text-muted-foreground whitespace-nowrap">Request ID</dt>
                          <dd className="font-mono text-xs truncate">{event.requestId}</dd>
                        </>
                      )}
                      {event.sessionId && (
                        <>
                          <dt className="text-xs text-muted-foreground whitespace-nowrap">Session</dt>
                          <dd className="font-mono text-xs truncate">{event.sessionId}</dd>
                        </>
                      )}
                      {event.ipAddress && (
                        <>
                          <dt className="text-xs text-muted-foreground whitespace-nowrap">IP Address</dt>
                          <dd className="font-mono text-xs">{event.ipAddress}</dd>
                        </>
                      )}
                      {event.userAgent && (
                        <>
                          <dt className="text-xs text-muted-foreground whitespace-nowrap">User Agent</dt>
                          <dd className="text-xs text-muted-foreground break-all leading-relaxed">{event.userAgent}</dd>
                        </>
                      )}
                    </dl>
                  </div>
                )}

                {/* Metadata */}
                {event.metadata && Object.keys(event.metadata).length > 0 && (
                  <div className="px-6 py-4 flex flex-col gap-3">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Metadata</span>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                      {Object.entries(event.metadata).map(([key, value]) => (
                        <React.Fragment key={key}>
                          <dt className="text-xs text-muted-foreground whitespace-nowrap capitalize">{key.replace(/_/g, " ")}</dt>
                          <dd className="text-xs font-mono truncate" title={value}>{value}</dd>
                        </React.Fragment>
                      ))}
                    </dl>
                  </div>
                )}

                {/* Raw Payload */}
                <div className="px-6 py-4">
                  <button
                    onClick={() => setShowRaw(v => !v)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <RiCodeLine className="size-3.5" />
                    {showRaw ? "Hide" : "Show"} raw payload
                  </button>
                  {showRaw && (
                    <pre className="mt-3 rounded-lg bg-muted p-3 text-xs font-mono overflow-x-auto max-h-64 overflow-y-auto leading-relaxed">
                      {JSON.stringify(event, null, 2)}
                    </pre>
                  )}
                </div>

              </div>

              {/* Footer */}
              <div className="mt-auto border-t p-6 flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RiDownloadLine />
                  Export event
                </Button>
                <Button variant="ghost" size="sm" className="ml-auto" onClick={onClose}>
                  Close
                </Button>
              </div>

            </div>
          )
        })()}
      </DrawerContent>
    </Drawer>
  )
}
