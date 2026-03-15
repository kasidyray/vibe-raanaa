"use client"

import * as React from "react"
import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { Avatar, AvatarFallback, AvatarImage, AvatarGroup, AvatarGroupCount, AvatarBadge } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Alert, AlertIcon, AlertContent, AlertTitle,
  AlertDescription, AlertActions, AlertClose,
} from "@/components/ui/alert"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuSub,
  DropdownMenuSubTrigger, DropdownMenuSubContent,
  DropdownMenuRadioGroup, DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover, PopoverContent, PopoverHeader, PopoverTitle,
  PopoverDescription, PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  Sheet, SheetContent, SheetDescription, SheetFooter,
  SheetHeader, SheetTitle, SheetTrigger, SheetClose,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip"
import { Calendar } from "@/components/ui/calendar"
import {
  Combobox, ComboboxInput, ComboboxContent, ComboboxList,
  ComboboxItem, ComboboxEmpty, ComboboxCollection,
  ComboboxGroup, ComboboxLabel, ComboboxSeparator,
  ComboboxChips, ComboboxChip, ComboboxChipsInput, useComboboxAnchor,
} from "@/components/ui/combobox"
import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader,
  DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose,
} from "@/components/ui/drawer"
import {
  Field, FieldGroup, FieldLabel, FieldDescription, FieldError,
  FieldTitle, FieldContent,
} from "@/components/ui/field"
import {
  InputGroup, InputGroupAddon, InputGroupInput, InputGroupText,
  InputGroupTextarea, InputGroupButton,
} from "@/components/ui/input-group"
import { Toaster } from "@/components/ui/sonner"
import {
  Select, SelectContent, SelectItem, SelectTrigger,
  SelectValue, SelectGroup, SelectLabel, SelectSeparator,
} from "@/components/ui/select"
import { CardAction } from "@/components/ui/card"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
  ChartLegend, ChartLegendContent, type ChartConfig,
} from "@/components/ui/chart"
import {
  Bar, BarChart, CartesianGrid, XAxis,
  Line, LineChart,
  Area, AreaChart,
  Pie, PieChart,
  PolarAngleAxis, PolarGrid, Radar, RadarChart,
  RadialBar, RadialBarChart,
} from "recharts"
import { toast } from "sonner"
import {
  RiBold, RiItalic, RiUnderline, RiAlignLeft, RiAlignCenter, RiAlignRight,
  RiUser2Line, RiSettings3Line, RiLogoutBoxLine, RiAddLine,
  RiBankCardLine, RiCommandLine, RiSearchLine, RiMailLine,
  RiCheckboxCircleLine, RiErrorWarningLine, RiInformationLine,
  RiCloseCircleLine, RiDownloadLine, RiArrowRightLine, RiShareLine,
  RiGridLine, RiListCheck,
} from "@remixicon/react"

// ─── Section wrapper ────────────────────────────────────────────────────────

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

// ─── Sections ───────────────────────────────────────────────────────────────

function ButtonSection() {
  return (
    <Section title="Button" sub="button.tsx">
      <Row label="Variants">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </Row>
      <Row label="Sizes">
        <Button size="xs">XSmall</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </Row>
      <Row label="Icon sizes">
        <Button size="icon-xs"><RiAddLine /></Button>
        <Button size="icon-sm"><RiAddLine /></Button>
        <Button size="icon"><RiAddLine /></Button>
        <Button size="icon-lg"><RiAddLine /></Button>
      </Row>
      <Row label="Icon variants">
        <Button size="icon"><RiSettings3Line /></Button>
        <Button size="icon" variant="secondary"><RiSettings3Line /></Button>
        <Button size="icon" variant="outline"><RiSettings3Line /></Button>
        <Button size="icon" variant="ghost"><RiSettings3Line /></Button>
        <Button size="icon" variant="destructive"><RiSettings3Line /></Button>
      </Row>
      <Row label="Icon leading">
        <Button><RiDownloadLine />Download</Button>
        <Button variant="secondary"><RiAddLine />New item</Button>
        <Button variant="outline"><RiSearchLine />Search</Button>
        <Button variant="ghost"><RiSettings3Line />Settings</Button>
        <Button variant="destructive"><RiCloseCircleLine />Delete</Button>
      </Row>
      <Row label="Icon trailing">
        <Button>Continue<RiArrowRightLine /></Button>
        <Button variant="secondary">Share<RiShareLine /></Button>
        <Button variant="outline">Send<RiMailLine /></Button>
      </Row>
      <Row label="Disabled">
        <Button disabled>Default</Button>
        <Button variant="secondary" disabled>Secondary</Button>
        <Button variant="outline" disabled>Outline</Button>
      </Row>
    </Section>
  )
}

function BadgeSection() {
  return (
    <Section title="Badge" sub="badge.tsx">
      <Row label="Tones">
        <Badge variant="info">Info</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="critical">Critical</Badge>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="caution">Caution</Badge>
      </Row>
      <Row label="With icon">
        <Badge variant="info" icon={<RiInformationLine />}>Info</Badge>
        <Badge variant="success" icon={<RiCheckboxCircleLine />}>Success</Badge>
        <Badge variant="warning" icon={<RiErrorWarningLine />}>Warning</Badge>
        <Badge variant="critical" icon={<RiCloseCircleLine />}>Critical</Badge>
        <Badge variant="neutral" icon={<RiErrorWarningLine />}>Neutral</Badge>
        <Badge variant="caution" icon={<RiErrorWarningLine />}>Caution</Badge>
      </Row>
      <Row label="Sizes">
        <Badge variant="info" size="sm">Small</Badge>
        <Badge variant="info">Default</Badge>
        <Badge variant="info" size="lg">Large</Badge>
      </Row>
      <Row label="Sizes with icon">
        <Badge variant="success" size="sm" icon={<RiCheckboxCircleLine />}>Small</Badge>
        <Badge variant="success" icon={<RiCheckboxCircleLine />}>Default</Badge>
        <Badge variant="success" size="lg" icon={<RiCheckboxCircleLine />}>Large</Badge>
      </Row>
    </Section>
  )
}

function AvatarSection() {
  return (
    <Section title="Avatar" sub="avatar.tsx">
      <Row label="Sizes">
        <Avatar size="sm">
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </Row>
      <Row label="Fallback">
        <Avatar size="sm"><AvatarFallback>AB</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>CD</AvatarFallback></Avatar>
        <Avatar size="lg"><AvatarFallback>EF</AvatarFallback></Avatar>
      </Row>
      <Row label="With badge">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
          <AvatarFallback>SC</AvatarFallback>
          <AvatarBadge />
        </Avatar>
      </Row>
      <Row label="Group">
        <AvatarGroup>
          <Avatar size="sm"><AvatarImage src="https://github.com/shadcn.png" /><AvatarFallback>SC</AvatarFallback></Avatar>
          <Avatar size="sm"><AvatarImage src="https://github.com/maxleiter.png" /><AvatarFallback>ML</AvatarFallback></Avatar>
          <Avatar size="sm"><AvatarImage src="https://github.com/evilrabbit.png" /><AvatarFallback>ER</AvatarFallback></Avatar>
          <AvatarGroupCount>+4</AvatarGroupCount>
        </AvatarGroup>
      </Row>
    </Section>
  )
}

function InputSection() {
  return (
    <Section title="Input" sub="input.tsx">
      <Row label="Default">
        <Input className="max-w-xs" placeholder="Enter text…" />
      </Row>
      <Row label="Disabled">
        <Input className="max-w-xs" placeholder="Disabled" disabled />
      </Row>
      <Row label="Password">
        <Input className="max-w-xs" type="password" placeholder="Password" />
      </Row>
      <Row label="Invalid">
        <Input className="max-w-xs" placeholder="Error state" aria-invalid />
      </Row>
    </Section>
  )
}

function TextareaSection() {
  return (
    <Section title="Textarea" sub="textarea.tsx">
      <Textarea placeholder="Write something…" className="max-w-xs" />
      <Textarea placeholder="Disabled" disabled className="max-w-xs" />
    </Section>
  )
}

function CheckboxSection() {
  const [c1, setC1] = useState(false)
  const [c2, setC2] = useState(true)
  return (
    <Section title="Checkbox" sub="checkbox.tsx">
      <Row label="States">
        <div className="flex items-center gap-2">
          <Checkbox id="cb1" checked={c1} onCheckedChange={(v) => setC1(v === true)} />
          <Label htmlFor="cb1">Unchecked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cb2" checked={c2} onCheckedChange={(v) => setC2(v === true)} />
          <Label htmlFor="cb2">Checked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cb3" disabled />
          <Label htmlFor="cb3" className="opacity-50">Disabled</Label>
        </div>
      </Row>
    </Section>
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
            <TabsList variant="line">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
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

function ToggleSection() {
  return (
    <Section title="Toggle" sub="toggle.tsx">
      <Row label="Default variant">
        <Toggle aria-label="Bold"><RiBold /></Toggle>
        <Toggle aria-label="Italic"><RiItalic /></Toggle>
        <Toggle aria-label="Underline"><RiUnderline /></Toggle>
      </Row>
      <Row label="Outline variant">
        <Toggle variant="outline" aria-label="Bold"><RiBold /></Toggle>
        <Toggle variant="outline" aria-label="Italic"><RiItalic /></Toggle>
        <Toggle variant="outline" aria-label="Underline"><RiUnderline /></Toggle>
      </Row>
      <Row label="Sizes">
        <Toggle size="sm" aria-label="sm"><RiBold /></Toggle>
        <Toggle size="default" aria-label="default"><RiBold /></Toggle>
        <Toggle size="lg" aria-label="lg"><RiBold /></Toggle>
      </Row>
    </Section>
  )
}

function ToggleGroupSection() {
  const [align, setAlign] = useState("left")
  const [format, setFormat] = useState<string[]>(["bold"])
  const [view, setView] = useState("grid")
  return (
    <Section title="Toggle Group" sub="toggle-group.tsx">
      <Row label="Single (alignment)">
        <ToggleGroup type="single" value={align} onValueChange={(v) => v && setAlign(v)} variant="outline">
          <ToggleGroupItem value="left" aria-label="Left"><RiAlignLeft /></ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center"><RiAlignCenter /></ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right"><RiAlignRight /></ToggleGroupItem>
        </ToggleGroup>
      </Row>
      <Row label="Multiple (formatting)">
        <ToggleGroup type="multiple" value={format} onValueChange={setFormat} variant="outline">
          <ToggleGroupItem value="bold" aria-label="Bold"><RiBold /></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic"><RiItalic /></ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline"><RiUnderline /></ToggleGroupItem>
        </ToggleGroup>
      </Row>
      <Row label="With labels">
        <ToggleGroup type="single" value={view} onValueChange={(v) => v && setView(v)} variant="outline">
          <ToggleGroupItem value="grid" aria-label="Grid view"><RiGridLine />Grid</ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view"><RiListCheck />List</ToggleGroupItem>
        </ToggleGroup>
      </Row>
      <Row label="Spaced">
        <ToggleGroup type="multiple" variant="outline" spacing={1} defaultValue={["bold"]}>
          <ToggleGroupItem value="bold" aria-label="Bold"><RiBold /></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic"><RiItalic /></ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline"><RiUnderline /></ToggleGroupItem>
        </ToggleGroup>
      </Row>
      <Row label="Sizes">
        <ToggleGroup type="single" variant="outline" size="sm" defaultValue="left">
          <ToggleGroupItem value="left"><RiAlignLeft /></ToggleGroupItem>
          <ToggleGroupItem value="center"><RiAlignCenter /></ToggleGroupItem>
          <ToggleGroupItem value="right"><RiAlignRight /></ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single" variant="outline" size="default" defaultValue="left">
          <ToggleGroupItem value="left"><RiAlignLeft /></ToggleGroupItem>
          <ToggleGroupItem value="center"><RiAlignCenter /></ToggleGroupItem>
          <ToggleGroupItem value="right"><RiAlignRight /></ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single" variant="outline" size="lg" defaultValue="left">
          <ToggleGroupItem value="left"><RiAlignLeft /></ToggleGroupItem>
          <ToggleGroupItem value="center"><RiAlignCenter /></ToggleGroupItem>
          <ToggleGroupItem value="right"><RiAlignRight /></ToggleGroupItem>
        </ToggleGroup>
      </Row>
      <Row label="Vertical">
        <ToggleGroup type="multiple" variant="outline" orientation="vertical" defaultValue={["bold"]}>
          <ToggleGroupItem value="bold"><RiBold />Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic"><RiItalic />Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline"><RiUnderline />Underline</ToggleGroupItem>
        </ToggleGroup>
      </Row>
    </Section>
  )
}

function TooltipSection() {
  return (
    <Section title="Tooltip" sub="tooltip.tsx">
      <Row label="Positions">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" size="sm" />}>Top</TooltipTrigger>
            <TooltipContent side="top">Tooltip on top</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" size="sm" />}>Right</TooltipTrigger>
            <TooltipContent side="right">Tooltip on right</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" size="sm" />}>Bottom</TooltipTrigger>
            <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" size="sm" />}>Left</TooltipTrigger>
            <TooltipContent side="left">Tooltip on left</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Row>
    </Section>
  )
}

function DropdownSection() {
  const [checked, setChecked] = useState(true)
  const [radio, setRadio] = useState("comfortable")
  return (
    <Section title="Dropdown Menu" sub="dropdown-menu.tsx">
      <Row>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <RiUser2Line />Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RiBankCardLine />Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RiSettings3Line />Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RiCommandLine />Shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
              Show status bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub item 1</DropdownMenuItem>
                <DropdownMenuItem>Sub item 2</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <RiLogoutBoxLine />Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Row>
      <Row label="Item variants">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>All variants</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Default</DropdownMenuLabel>
              <DropdownMenuItem>
                <RiUser2Line />Default item
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RiUser2Line />With shortcut
                <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <RiSettings3Line />Disabled item
              </DropdownMenuItem>
              <DropdownMenuItem inset>Inset item</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Checkbox</DropdownMenuLabel>
              <DropdownMenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
                Checked state
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={false}>
                Unchecked state
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Radio</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={radio} onValueChange={setRadio}>
                <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="spacious">Spacious</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Destructive</DropdownMenuLabel>
              <DropdownMenuItem variant="destructive">
                <RiLogoutBoxLine />Destructive item
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Row>
    </Section>
  )
}

function PopoverSection() {
  return (
    <Section title="Popover" sub="popover.tsx">
      <Row>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>Open Popover</PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Dimensions</PopoverTitle>
              <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
            </PopoverHeader>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Label htmlFor="pop-width" className="w-12 text-right text-xs">Width</Label>
                <Input id="pop-width" defaultValue="100%" className="h-8" />
              </div>
              <div className="flex items-center gap-3">
                <Label htmlFor="pop-height" className="w-12 text-right text-xs">Height</Label>
                <Input id="pop-height" defaultValue="25px" className="h-8" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Row>
    </Section>
  )
}

function BreadcrumbSection() {
  return (
    <Section title="Breadcrumb" sub="breadcrumb.tsx">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Section>
  )
}

function TableSection() {
  const rows = [
    { name: "Alice Johnson", role: "Designer", status: "Active" },
    { name: "Bob Smith", role: "Engineer", status: "Active" },
    { name: "Carol White", role: "PM", status: "Inactive" },
  ]
  return (
    <Section title="Table" sub="table.tsx">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.name}>
              <TableCell className="font-medium">{r.name}</TableCell>
              <TableCell>{r.role}</TableCell>
              <TableCell>
                <Badge variant={r.status === "Active" ? "default" : "secondary"}>{r.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Section>
  )
}

function SeparatorSection() {
  return (
    <Section title="Separator" sub="separator.tsx">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Horizontal</p>
          <div className="flex flex-col gap-2 text-sm">
            <span>Section A</span>
            <Separator />
            <span>Section B</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">Vertical</p>
          <div className="flex items-center gap-3 text-sm h-5">
            <span>One</span>
            <Separator orientation="vertical" />
            <span>Two</span>
            <Separator orientation="vertical" />
            <span>Three</span>
          </div>
        </div>
      </div>
    </Section>
  )
}

function SkeletonSection() {
  return (
    <Section title="Skeleton" sub="skeleton.tsx">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <Skeleton className="h-3 w-3/5" />
      <Skeleton className="h-20 w-full rounded-xl" />
    </Section>
  )
}

function DialogSection() {
  return (
    <Section title="Dialog" sub="dialog.tsx">
      <Row>
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>Make changes to your profile here.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 py-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="dlg-name">Name</Label>
                <Input id="dlg-name" defaultValue="Alice Johnson" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="dlg-username">Username</Label>
                <Input id="dlg-username" defaultValue="@alice" />
              </div>
            </div>
            <DialogFooter>
              <Button>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Row>
    </Section>
  )
}

function AlertDialogSection() {
  return (
    <Section title="Alert Dialog" sub="alert-dialog.tsx">
      <Row>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive" />}>Delete Account</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Row>
    </Section>
  )
}

const ALERT_VARIANTS = ["info", "success", "warning", "error"] as const
const ALERT_LABELS: Record<string, { title: string; description: string; action: string }> = {
  info:    { title: "Heads up",             description: "Your account will be reviewed within 2 business days.", action: "Learn more" },
  success: { title: "Changes saved",        description: "Your profile has been updated successfully.",           action: "View profile" },
  warning: { title: "Storage almost full",  description: "You've used 90% of your storage. Consider upgrading.", action: "Upgrade plan" },
  error:   { title: "Something went wrong", description: "We couldn't process your request. Please try again.",  action: "Try again" },
}

function AlertSection() {
  const [dismissed, setDismissed] = React.useState<Record<string, boolean>>({})
  return (
    <Section title="Alert" sub="alert.tsx">
      <Row label="Page">
        <div className="w-full flex flex-col gap-2">
          {ALERT_VARIANTS.map((v) => (
            <Alert key={v} variant={v} level="page">
              <AlertIcon />
              <AlertContent>
                <AlertTitle>{ALERT_LABELS[v].title}</AlertTitle>
                <AlertDescription>{ALERT_LABELS[v].description}</AlertDescription>
                <AlertActions>
                  <a href="#" className="text-xs font-medium underline underline-offset-2 hover:no-underline">{ALERT_LABELS[v].action}</a>
                </AlertActions>
              </AlertContent>
            </Alert>
          ))}
        </div>
      </Row>
      <Row label="Section">
        <div className="w-full flex flex-col gap-3">
          {ALERT_VARIANTS.map((v) => {
            const key = `section-${v}`
            if (dismissed[key]) return null
            return (
              <Alert key={v} variant={v} level="section" onClose={() => setDismissed((d) => ({ ...d, [key]: true }))}>
                <AlertIcon />
                <AlertContent>
                  <AlertTitle>{ALERT_LABELS[v].title}</AlertTitle>
                  <AlertDescription>{ALERT_LABELS[v].description}</AlertDescription>
                  <AlertActions>
                    <a href="#" className="text-xs font-medium underline underline-offset-2 hover:no-underline">{ALERT_LABELS[v].action}</a>
                  </AlertActions>
                </AlertContent>
                <AlertClose />
              </Alert>
            )
          })}
        </div>
      </Row>
      <Row label="Inline">
        <div className="w-full flex flex-col gap-2">
          {ALERT_VARIANTS.map((v) => (
            <Alert key={v} variant={v} level="inline">
              <AlertIcon />
              <AlertContent>
                <AlertTitle>{ALERT_LABELS[v].title}</AlertTitle>
                <AlertDescription>{ALERT_LABELS[v].description}</AlertDescription>
                <AlertActions>
                  <a href="#" className="text-xs font-medium underline underline-offset-2 hover:no-underline">{ALERT_LABELS[v].action}</a>
                </AlertActions>
              </AlertContent>
            </Alert>
          ))}
        </div>
      </Row>
    </Section>
  )
}

function SheetSection() {
  return (
    <Section title="Sheet" sub="sheet.tsx">
      <Row label="Sides">
        {(["left", "right", "bottom"] as const).map((side) => (
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

function LabelSection() {
  return (
    <Section title="Label" sub="label.tsx">
      <Row>
        <div className="flex flex-col gap-2">
          <Label>Default label</Label>
          <Label className="text-muted-foreground">Muted label</Label>
          <div className="flex items-center gap-2">
            <Checkbox id="label-demo" defaultChecked />
            <Label htmlFor="label-demo">Paired with checkbox</Label>
          </div>
        </div>
      </Row>
    </Section>
  )
}

function SelectSection() {
  return (
    <Section title="Select" sub="select.tsx">
      <Row label="Default">
        <Select>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="mango">Mango</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Vegetables</SelectLabel>
              <SelectItem value="carrot">Carrot</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Row>
      <Row label="Small">
        <Select>
          <SelectTrigger size="sm" className="w-40">
            <SelectValue placeholder="Pick one" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="one">Option one</SelectItem>
            <SelectItem value="two">Option two</SelectItem>
            <SelectItem value="three" disabled>Disabled</SelectItem>
          </SelectContent>
        </Select>
      </Row>
    </Section>
  )
}

function CardSection() {
  return (
    <Section title="Card" sub="card.tsx">
      <Card className="w-full max-w-sm mx-auto my-6">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
    
    <Card className="relative mx-auto w-full max-w-sm pt-0 mb-8">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>Design systems meetup</CardTitle>
        <CardDescription>
          A practical talk on component APIs, accessibility, and shipping
          faster.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter>
    </Card>
    </Section>
  )
}

function InputGroupSection() {
  return (
    <Section title="Input Group" sub="input-group.tsx">
      <Row label="Icon start">
        <InputGroup className="w-full max-w-xs">
          <InputGroupAddon align="inline-start">
            <InputGroupText><RiSearchLine /></InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="Search…" />
        </InputGroup>
      </Row>
      <Row label="Text end">
        <InputGroup className="w-full max-w-xs">
          <InputGroupInput placeholder="Amount" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Row>
      <Row label="Text both sides">
        <InputGroup className="w-full max-w-xs">
          <InputGroupAddon align="inline-start">
            <InputGroupText>$</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="0.00" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup className="w-full max-w-xs">
          <InputGroupAddon align="inline-start">
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="example.com" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>.com</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup className="w-full max-w-xs">
          <InputGroupInput placeholder="Enter your username" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>@company.com</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Row>
      <Row label="Button end">
        <InputGroup className="w-full max-w-xs">
          <InputGroupInput placeholder="Enter email" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="xs">Send</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Row>
      <Row label="Textarea">
        <InputGroup className="w-full max-w-xs">
          <InputGroupAddon align="block-start">
            <InputGroupText><RiMailLine />Message</InputGroupText>
          </InputGroupAddon>
          <InputGroupTextarea placeholder="Type here…" rows={3} />
        </InputGroup>
      </Row>
    </Section>
  )
}

function FieldSection() {
  return (
    <Section title="Field" sub="field.tsx">
      <FieldGroup>
        <Field orientation="vertical">
          <FieldLabel>Full name</FieldLabel>
          <FieldDescription>Your legal first and last name.</FieldDescription>
          <Input placeholder="Alice Johnson" />
        </Field>
        <Field orientation="vertical">
          <FieldLabel>Email</FieldLabel>
          <Input placeholder="alice@example.com" type="email" />
          <FieldError>Please enter a valid email address.</FieldError>
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Notifications</FieldTitle>
            <FieldDescription>Receive product updates.</FieldDescription>
          </FieldContent>
          <Checkbox defaultChecked />
        </Field>
      </FieldGroup>
    </Section>
  )
}

function SonnerSection() {
  return (
    <Section title="Sonner / Toast" sub="sonner.tsx">
      <Toaster />
      <Row label="Types">
        <Button size="sm" variant="outline" onClick={() => toast.success("Event has been created", { position: "bottom-left" })}>
          <RiCheckboxCircleLine className="text-success" />Success
        </Button>
        <Button size="sm" variant="outline" onClick={() => toast.error("Something went wrong.", { position: "bottom-left" })}>
          <RiCloseCircleLine className="text-error" />Error
        </Button>
        <Button size="sm" variant="outline" onClick={() => toast.warning("Low disk space.", { position: "bottom-left" } )}>
          <RiErrorWarningLine className="text-warning" />Warning
        </Button>
        <Button size="sm" variant="outline" onClick={() => toast.info("Update available.", { position: "bottom-left" } )}>
          <RiInformationLine className="text-info" />Info
        </Button>
        <Button size="sm" variant="outline" onClick={() => toast.loading("Processing…", { position: "bottom-left" })}>
          Loading
        </Button>
        <Button size="sm" variant="outline" onClick={() => toast("Default toast message")}>
          Default
        </Button>
      </Row>
    </Section>
  )
}

function DrawerSection() {
  return (
    <Section title="Drawer" sub="drawer.tsx">
      <Row label="Directions">
        {(["bottom", "right", "left"] as const).map((dir) => (
          <Drawer key={dir} direction={dir}>
            <DrawerTrigger render={<Button variant="outline" size="sm" />}>{dir}</DrawerTrigger>
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
                  <p>The materials on our platform are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                  <p>In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our platform, even if we or an authorised representative has been notified orally or in writing of the possibility of such damage.</p>
                  <p>We have not reviewed all of the sites linked to our platform and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us. Use of any such linked website is at the user&apos;s own risk.</p>
                  <p>We may revise these terms of service at any time without notice. By using this platform you are agreeing to be bound by the then current version of these terms of service. These terms and conditions are governed by and construed in accordance with applicable law and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
                  <p>If you have any questions about these Terms, please contact our support team. We are committed to ensuring that our users fully understand the terms under which they access and use our services.</p>
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
    </Section>
  )
}

const comboboxFrameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

const comboboxGroupedItems = [
  { group: "Frontend", items: ["React", "Vue", "Svelte", "Angular"] },
  { group: "Backend", items: ["Node.js", "Django", "Rails", "Laravel"] },
]

function ComboboxSection() {
  const [single, setSingle] = useState("")
  const [multi, setMulti] = useState<string[]>([])
  const [grouped, setGrouped] = useState("")
  const chipsAnchor = useComboboxAnchor()

  return (
    <Section title="Combobox" sub="combobox.tsx">
      <Row label="Single select">
        <Combobox value={single} onValueChange={setSingle} items={comboboxFrameworks}>
          <ComboboxInput placeholder="Select framework…" className="w-52" showTrigger showClear={!!single} />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxCollection>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>{item}</ComboboxItem>
                )}
              </ComboboxCollection>
              <ComboboxEmpty>No results found.</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Row>

      <Row label="Multiple (chips)">
        <Combobox multiple value={multi} onValueChange={setMulti} items={comboboxFrameworks}>
          <ComboboxChips ref={chipsAnchor} className="w-64">
            {multi.map((v) => (
              <ComboboxChip key={v} value={v}>{v}</ComboboxChip>
            ))}
            <ComboboxChipsInput placeholder={multi.length === 0 ? "Select frameworks…" : ""} />
          </ComboboxChips>
          <ComboboxContent anchor={chipsAnchor}>
            <ComboboxList>
              <ComboboxCollection>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>{item}</ComboboxItem>
                )}
              </ComboboxCollection>
              <ComboboxEmpty>No results found.</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Row>

      <Row label="With groups">
        <Combobox value={grouped} onValueChange={setGrouped}>
          <ComboboxInput placeholder="Select technology…" className="w-52" showTrigger showClear={!!grouped} />
          <ComboboxContent>
            <ComboboxList>
              {comboboxGroupedItems.map((g, i) => (
                <ComboboxGroup key={g.group}>
                  <ComboboxLabel>{g.group}</ComboboxLabel>
                  {g.items.map((item) => (
                    <ComboboxItem key={item} value={item}>{item}</ComboboxItem>
                  ))}
                  {i < comboboxGroupedItems.length - 1 && <ComboboxSeparator />}
                </ComboboxGroup>
              ))}
              <ComboboxEmpty>No results found.</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Row>

      <Row label="Disabled">
        <Combobox value="" items={comboboxFrameworks}>
          <ComboboxInput placeholder="Select framework…" className="w-52" showTrigger disabled />
        </Combobox>
      </Row>
    </Section>
  )
}

function CalendarSection() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  return (
    <Section title="Calendar" sub="calendar.tsx">
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-xs text-muted-foreground">Single</p>
          <Calendar mode="range" className="bg-popover rounded-lg border" captionLayout="dropdown" selected={date} onSelect={setDate} />
        </div>
      </div>
    </Section>
  )
}

// ─── Chart data ──────────────────────────────────────────────────────────────

const chartMonthlyData = [
  { month: "Jan", desktop: 186 },
  { month: "Feb", desktop: 305 },
  { month: "Mar", desktop: 237 },
  { month: "Apr", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "Jun", desktop: 214 },
]

const chartMultiData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const chartDesktopConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
} satisfies ChartConfig

const chartMultiConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

const chartPieData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartPieConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig

function ChartBarSection() {
  return (
    <Section title="Bar Chart" sub="chart.tsx">
      <ChartContainer config={chartDesktopConfig} className="h-[200px] w-full">
        <BarChart accessibilityLayer data={chartMonthlyData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
        </BarChart>
      </ChartContainer>
    </Section>
  )
}

function ChartBarMultipleSection() {
  return (
    <Section title="Bar Chart – Multiple" sub="chart.tsx">
      <ChartContainer config={chartMultiConfig} className="h-[200px] w-full">
        <BarChart accessibilityLayer data={chartMultiData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Section>
  )
}

function ChartBarStackedSection() {
  return (
    <Section title="Bar Chart – Stacked" sub="chart.tsx">
      <ChartContainer config={chartMultiConfig} className="h-[200px] w-full">
        <BarChart accessibilityLayer data={chartMultiData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" radius={[0, 0, 4, 4]} />
          <Bar dataKey="mobile" stackId="a" fill="var(--color-mobile)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </Section>
  )
}

function ChartLineSection() {
  return (
    <Section title="Line Chart" sub="chart.tsx">
      <ChartContainer config={chartDesktopConfig} className="h-[200px] w-full">
        <LineChart accessibilityLayer data={chartMonthlyData} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </Section>
  )
}

function ChartAreaSection() {
  return (
    <Section title="Area Chart" sub="chart.tsx">
      <ChartContainer config={chartDesktopConfig} className="h-[200px] w-full">
        <AreaChart accessibilityLayer data={chartMonthlyData} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <Area dataKey="desktop" type="natural" fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)" />
        </AreaChart>
      </ChartContainer>
    </Section>
  )
}

function ChartAreaGradientSection() {
  return (
    <Section title="Area Chart – Gradient" sub="chart.tsx">
      <ChartContainer config={chartMultiConfig} className="h-[200px] w-full">
        <AreaChart accessibilityLayer data={chartMultiData} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area dataKey="mobile" type="natural" fill="url(#fillMobile)" fillOpacity={0.4} stroke="var(--color-mobile)" stackId="a" />
          <Area dataKey="desktop" type="natural" fill="url(#fillDesktop)" fillOpacity={0.4} stroke="var(--color-desktop)" stackId="a" />
        </AreaChart>
      </ChartContainer>
    </Section>
  )
}

function ChartPieSection() {
  return (
    <Section title="Pie Chart" sub="chart.tsx">
      <ChartContainer config={chartPieConfig} className="mx-auto aspect-square max-h-[220px]">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie data={chartPieData} dataKey="visitors" nameKey="browser" />
        </PieChart>
      </ChartContainer>
    </Section>
  )
}

function ChartRadarSection() {
  return (
    <Section title="Radar Chart" sub="chart.tsx">
      <ChartContainer config={chartDesktopConfig} className="mx-auto aspect-square max-h-[220px]">
        <RadarChart data={chartMonthlyData}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarAngleAxis dataKey="month" />
          <PolarGrid />
          <Radar dataKey="desktop" fill="var(--color-desktop)" fillOpacity={0.6} />
        </RadarChart>
      </ChartContainer>
    </Section>
  )
}

function ChartRadialSection() {
  return (
    <Section title="Radial Chart" sub="chart.tsx">
      <ChartContainer config={chartPieConfig} className="mx-auto aspect-square max-h-[220px]">
        <RadialBarChart data={chartPieData} innerRadius={30} outerRadius={110}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="browser" />} />
          <RadialBar dataKey="visitors" background />
        </RadialBarChart>
      </ChartContainer>
    </Section>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ComponentsPage() {
  const [bannerDismissed, setBannerDismissed] = useState(false)
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {!bannerDismissed && (
          <Alert variant="info" level="page" onClose={() => setBannerDismissed(true)}>
            <AlertIcon />
            <AlertContent>
              
              <AlertDescription>Some components may be incomplete or subject to change. Do not use in production.</AlertDescription>
             
            </AlertContent>
            <AlertClose />
          </Alert>
        )}
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          <div>
            <h1 className="text-2xl font-semibold">Components</h1>
            <p className="text-sm text-muted-foreground">
              All UI components available in <code className="font-mono text-xs">components/ui/</code>
            </p>
          </div>

          <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
            <ButtonSection />
            <BadgeSection />
            <TabsSection />
            <AvatarSection />
            <ToggleSection />
            <ToggleGroupSection />
            <InputSection />
            <TextareaSection />
            <CheckboxSection />
            <LabelSection />
            <TooltipSection />
            <SeparatorSection />
            <BreadcrumbSection />
            <SkeletonSection />
            <DropdownSection />
            <PopoverSection />
            <DialogSection />
            <AlertDialogSection />
            <AlertSection />
            <SheetSection />
            <DrawerSection />
            <TableSection />
            <SelectSection />
            <CardSection />
            <InputGroupSection />
            <FieldSection />
            <ComboboxSection />
            <CalendarSection />
            <ChartBarSection />
            <ChartBarMultipleSection />
            <ChartBarStackedSection />
            <ChartLineSection />
            <ChartAreaSection />
            <ChartAreaGradientSection />
            <ChartPieSection />
            <ChartRadarSection />
            <ChartRadialSection />
            <SonnerSection />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
