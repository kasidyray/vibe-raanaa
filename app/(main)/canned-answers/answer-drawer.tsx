import * as React from "react"
import { RiCheckLine, RiCloseLine } from "@remixicon/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge }   from "@/components/ui/badge"
import { Button }  from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer"

import { type Answer } from "./data"

type Props = {
  answer:  Answer | null
  onClose: () => void
}

export function AnswerDrawer({ answer, onClose }: Props) {
  return (
    <Drawer open={!!answer} onOpenChange={(open) => !open && onClose()} direction="right">
      <DrawerContent className="flex flex-col gap-0 overflow-y-auto">
        <DrawerHeader className="flex flex-row items-start justify-between gap-4 border-b p-4">
          <DrawerTitle className="text-sm font-medium leading-snug">
            {answer?.prompt}
          </DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Close">
              <RiCloseLine />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        {answer && (
          <div className="flex flex-col gap-6 p-4">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="neutral" size="sm">{answer.platform}</Badge>
              <Badge variant="info"    size="sm">{answer.topic}</Badge>
              {answer.tags.map((tag) => (
                <Badge key={tag} variant="caution" size="sm">{tag}</Badge>
              ))}
              <span className="ml-auto text-xs text-muted-foreground">{answer.date}</span>
            </div>

            {/* Visibility */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Mentioned?</span>
                {answer.mentioned ? (
                  <Badge variant="success"  size="sm" icon={<RiCheckLine />}>Yes</Badge>
                ) : (
                  <Badge variant="critical" size="sm" icon={<RiCloseLine />}>No</Badge>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Position</span>
                <span className="text-sm tabular-nums">{answer.position ?? "—"}</span>
              </div>
            </div>

            {/* All mentions */}
            {answer.competitors.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">All mentions</span>
                <div className="flex flex-wrap gap-2">
                  {answer.competitors.map((comp) => (
                    <div key={comp.name} className="flex items-center gap-1.5">
                      <Avatar className="size-5 rounded-full">
                        <AvatarImage src={comp.logo} alt={comp.name} />
                        <AvatarFallback className="text-[9px]">{comp.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{comp.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full response */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Response</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{answer.response}</p>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  )
}
