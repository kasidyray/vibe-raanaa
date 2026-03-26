"use client"

import * as React from "react"
import { RiMailLine } from "@remixicon/react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

import { type RoleId, ASSIGNABLE_ROLES, ROLE_MAP } from "./data"

// ─── InviteDialog ─────────────────────────────────────────────────────────────

export function InviteDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [emails, setEmails]         = React.useState("")
  const [role, setRole]             = React.useState<RoleId>("editor")
  const [message, setMessage]       = React.useState("")
  const [loading, setLoading]       = React.useState(false)
  const [emailError, setEmailError] = React.useState("")

  const validateEmails = (raw: string): string[] | null => {
    const parts = raw.split(/[,\n]+/).map(e => e.trim()).filter(Boolean)
    if (parts.length === 0) return null
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    for (const e of parts) {
      if (!emailRegex.test(e)) return null
    }
    return parts
  }

  const handleSubmit = async () => {
    const parsed = validateEmails(emails)
    if (!parsed) {
      setEmailError("Enter one or more valid email addresses, separated by commas.")
      return
    }
    setEmailError("")
    setLoading(true)

    // Simulate API call
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    onOpenChange(false)
    setEmails("")
    setMessage("")
    setRole("editor")
    toast.success(
      parsed.length === 1
        ? `Invite sent to ${parsed[0]}`
        : `Invites sent to ${parsed.length} people`
    )
  }

  const handleOpenChange = (v: boolean) => {
    if (!loading) {
      setEmails("")
      setMessage("")
      setRole("editor")
      setEmailError("")
      onOpenChange(v)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Invite team members</DialogTitle>
          <DialogDescription>
            Send an invitation email. Recipients will be asked to create an account or sign in.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="invite-emails">
              Email address <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="invite-emails"
              placeholder="name@example.com, another@example.com"
              value={emails}
              onChange={e => { setEmails(e.target.value); setEmailError("") }}
              rows={2}
              className={cn(emailError && "border-destructive")}
              disabled={loading}
            />
            {emailError ? (
              <p className="text-xs text-destructive">{emailError}</p>
            ) : (
              <p className="text-xs text-muted-foreground">Separate multiple addresses with a comma or newline.</p>
            )}
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="invite-role">Role</Label>
            <Select value={role} onValueChange={v => setRole(v as RoleId)}>
              <SelectTrigger id="invite-role" className="w-full" disabled={loading}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {ASSIGNABLE_ROLES.map(rid => (
                    <SelectItem key={rid} value={rid}>
                      <span className="font-medium">{ROLE_MAP[rid].name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{ROLE_MAP[rid].description.split(".")[0]}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Optional message */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="invite-message">
              Message <span className="text-muted-foreground text-xs font-normal">(optional)</span>
            </Label>
            <Textarea
              id="invite-message"
              placeholder="Add a personal note to the invitation..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={2}
              disabled={loading}
            />
          </div>
        </div>

        <DialogFooter showCloseButton={false}>
          <DialogClose render={<Button variant="outline" disabled={loading}>Cancel</Button>} />
          <Button onClick={handleSubmit} loading={loading}>
            <RiMailLine />
            Send invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
