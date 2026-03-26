"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectGroup, SelectTrigger,
} from "@/components/ui/select"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup, InputGroupAddon, InputGroupInput, InputGroupText,
} from "@/components/ui/input-group"
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  RiBold, RiItalic, RiUnderline, RiAlignLeft, RiAlignCenter, RiAlignRight,
  RiSearchLine, RiFileCopyLine, RiDeleteBinLine, RiSortDesc, RiArrowDownSLine,
  RiDownloadLine, RiBankCardLine, RiSettings3Line, RiLogoutBoxLine, RiAddLine,
  RiArrowRightLine, RiMicLine, RiVolumeMuteLine, RiCheckLine, RiAlertLine,
  RiUserForbidLine, RiShareLine,
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

const CURRENCIES = [
  { value: "USD", label: "US Dollar" },
  { value: "EUR", label: "Euro" },
  { value: "GBP", label: "British Pound" },
  { value: "JPY", label: "Japanese Yen" },
  { value: "NGN", label: "Nigerian Naira" },
  { value: "CAD", label: "Canadian Dollar" },
]

function CurrencySendExample() {
  const [currency, setCurrency] = useState("USD")
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Select value={currency} onValueChange={(value) => setCurrency(value as string)}>
          <SelectTrigger className="font-mono">{currency}</SelectTrigger>
          <SelectContent alignItemWithTrigger={false} align="start">
            <SelectGroup>
              {CURRENCIES.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.value}{" "}
                  <span className="text-muted-foreground">{item.label}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input placeholder="10.00" pattern="[0-9]*" className="w-28" />
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Send" size="icon" variant="outline">
          <RiArrowRightLine />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}

function ButtonGroupSection() {
  return (
    <Section title="Button Group" sub="button-group.tsx">
      <Row label="Default">
        <ButtonGroup>
          <Button variant="outline">Back</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="outline">Next</Button>
        </ButtonGroup>
      </Row>
      <Row label="Icon toolbar">
        <ButtonGroup>
          <Button variant="outline" size="icon"><RiBold /></Button>
          <Button variant="outline" size="icon"><RiItalic /></Button>
          <Button variant="outline" size="icon"><RiUnderline /></Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="icon"><RiAlignLeft /></Button>
          <Button variant="outline" size="icon"><RiAlignCenter /></Button>
          <Button variant="outline" size="icon"><RiAlignRight /></Button>
        </ButtonGroup>
      </Row>
      <Row label="With input">
        <ButtonGroup>
          <Input placeholder="Search..." />
          <Button variant="outline" aria-label="Search"><RiSearchLine /></Button>
        </ButtonGroup>
      </Row>
      <Row label="With separator">
        <ButtonGroup>
          <Button variant="outline"><RiFileCopyLine />Duplicate</Button>
          <ButtonGroupSeparator />
          <Button variant="outline" className="text-destructive hover:text-destructive"><RiDeleteBinLine />Delete</Button>
        </ButtonGroup>
      </Row>
      <Row label="With label">
        <ButtonGroup>
          <ButtonGroupText>Sort by</ButtonGroupText>
          <Button variant="outline" size="sm">Name</Button>
          <Button variant="outline" size="sm">Date</Button>
          <Button variant="outline" size="sm"><RiSortDesc />Priority</Button>
        </ButtonGroup>
      </Row>
      <Row label="Split button">
        <ButtonGroup>
          <Button><RiDownloadLine />Download</Button>
          <ButtonGroupSeparator />
          <Button size="icon"><RiArrowDownSLine /></Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Publish</Button>
          <ButtonGroupSeparator />
          <Button variant="outline" size="icon"><RiArrowDownSLine /></Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Follow</Button>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" className="pl-2!"><RiArrowDownSLine /></Button>} />
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuItem><RiVolumeMuteLine />Mute</DropdownMenuItem>
                <DropdownMenuItem><RiCheckLine />Mark as Read</DropdownMenuItem>
                <DropdownMenuItem><RiAlertLine />Report</DropdownMenuItem>
                <DropdownMenuItem><RiUserForbidLine />Block User</DropdownMenuItem>
                <DropdownMenuItem><RiShareLine />Share</DropdownMenuItem>
                <DropdownMenuItem><RiFileCopyLine />Copy</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive"><RiDeleteBinLine />Delete</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </Row>
      <Row label="Sizes">
        <ButtonGroup>
          <Button variant="outline" size="sm">Edit</Button>
          <Button variant="outline" size="sm">Share</Button>
          <Button variant="outline" size="sm">Delete</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Edit</Button>
          <Button variant="outline">Share</Button>
          <Button variant="outline">Delete</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="lg">Edit</Button>
          <Button variant="outline" size="lg">Share</Button>
          <Button variant="outline" size="lg">Delete</Button>
        </ButtonGroup>
      </Row>
      <Row label="Vertical">
        <ButtonGroup orientation="vertical">
          <Button variant="outline">Profile</Button>
          <Button variant="outline"><RiBankCardLine />Billing</Button>
          <Button variant="outline"><RiSettings3Line />Settings</Button>
          <Button variant="outline"><RiLogoutBoxLine />Sign out</Button>
        </ButtonGroup>
      </Row>
      <Row label="Currency input">
        <CurrencySendExample />
      </Row>
      <Row label="Chat input">
        <ButtonGroup className="w-full max-w-md">
          <ButtonGroup>
            <Button variant="outline" size="icon"><RiAddLine /></Button>
          </ButtonGroup>
          <ButtonGroup>
            <InputGroup>
              <InputGroupInput placeholder="Send a message..." />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger render={<InputGroupAddon align="inline-end"><RiMicLine /></InputGroupAddon>} />
                  <TooltipContent>Voice Mode</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </InputGroup>
          </ButtonGroup>
        </ButtonGroup>
      </Row>
    </Section>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <ButtonGroupSection />
    </div>
  )
}
