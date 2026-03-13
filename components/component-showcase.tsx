"use client"

import { useState } from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { RadioGroup } from "@base-ui/react/radio-group"
import { Radio } from "@base-ui/react/radio"
import { Area, AreaChart } from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ChartContainer } from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import {
  RiFileCopyLine,
  RiErrorWarningLine,
  RiDeleteBinLine,
  RiShareLine,
  RiShoppingBagLine,
  RiMoreLine,
  RiLoaderLine,
  RiAddLine,
  RiSubtractLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiSearchLine,
  RiSettingsLine,
} from "@remixicon/react"

const icons = [
  RiFileCopyLine,
  RiErrorWarningLine,
  RiDeleteBinLine,
  RiShareLine,
  RiShoppingBagLine,
  RiMoreLine,
  RiLoaderLine,
  RiAddLine,
  RiSubtractLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiSearchLine,
  RiSettingsLine,
]

const visitorsData = [
  { month: "Jan", desktop: 320 },
  { month: "Feb", desktop: 180 },
  { month: "Mar", desktop: 240 },
  { month: "Apr", desktop: 420 },
  { month: "May", desktop: 290 },
  { month: "Jun", desktop: 360 },
]

const chartConfig = {
  desktop: { color: "var(--chart-1)" },
}

const shortcuts = [
  { label: "Search", keys: ["⌘", "K"] },
  { label: "Quick Actions", keys: ["⌘", "J"] },
  { label: "New File", keys: ["⌘", "N"] },
  { label: "Save", keys: ["⌘", "S"] },
  { label: "Toggle Sidebar", keys: ["⌘", "B"] },
]

export function IconGrid() {
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-8 place-items-center gap-4">
          {icons.map((Icon, i) => (
            <Card
              key={i}
              className="flex size-8 items-center justify-center rounded-md p-0 ring ring-border *:[svg]:size-4"
            >
              <Icon className="size-4" />
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ComponentControls() {
  const [switchOn, setSwitchOn] = useState(true)
  const [sliderValue, setSliderValue] = useState([500])
  const [checkbox1, setCheckbox1] = useState(true)
  const [checkbox2, setCheckbox2] = useState(false)
  const [radio, setRadio] = useState("apple")

  return (
    <Card className="w-full flex flex-col">
      <CardContent className="flex flex-col gap-6">

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Button>Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Delete</Button>
          </div>

          {/* 2FA Item */}
          <div className="flex w-full flex-wrap items-center gap-3 rounded-xl border border-border px-4 py-3">
            <div className="flex flex-1 flex-col">
              <p className="line-clamp-1 text-sm font-medium">Two-factor authentication</p>
              <p className="line-clamp-2 text-sm text-muted-foreground">Verify via email or phone number.</p>
            </div>
            <div className="flex items-center">
              <Button variant="secondary" size="sm">Enable</Button>
            </div>
          </div>
        </div>

        {/* Slider */}
        <SliderPrimitive.Root
          value={sliderValue}
          onValueChange={setSliderValue}
          min={0}
          max={1000}
          step={10}
          aria-label="Slider"
          className="flex w-full flex-1 touch-none select-none items-center"
        >
          <SliderPrimitive.Control className="relative flex w-full items-center">
            <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-muted">
              <SliderPrimitive.Indicator className="absolute h-full bg-primary" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb
              index={0}
              className="block size-4 shrink-0 rounded-full border-2 border-primary bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </SliderPrimitive.Control>
        </SliderPrimitive.Root>

        {/* Input group + Textarea */}
        <FieldGroup>
          <Field>
            <InputGroup>
              <InputGroupInput placeholder="Name" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>
                  <RiSearchLine />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <InputGroup>
              <InputGroupTextarea placeholder="Message" />
            </InputGroup>
          </Field>
        </FieldGroup>

        {/* Badges + Radio + Checkbox */}
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <Badge>Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <RadioGroup
            value={radio}
            onValueChange={setRadio}
            className="ml-auto flex w-fit gap-3"
          >
            <Radio.Root
              value="apple"
              className={cn(
                "relative flex aspect-square size-4 shrink-0 items-center justify-center rounded-full border border-input outline-none",
                "data-checked:border-primary data-checked:bg-primary",
                "after:absolute after:-inset-x-3 after:-inset-y-2"
              )}
            >
              <Radio.Indicator className="flex items-center justify-center">
                <span className="size-2 rounded-full bg-primary-foreground" />
              </Radio.Indicator>
            </Radio.Root>
            <Radio.Root
              value="orange"
              className={cn(
                "relative flex aspect-square size-4 shrink-0 items-center justify-center rounded-full border border-input outline-none",
                "data-checked:border-primary data-checked:bg-primary",
                "after:absolute after:-inset-x-3 after:-inset-y-2"
              )}
            >
              <Radio.Indicator className="flex items-center justify-center">
                <span className="size-2 rounded-full bg-primary-foreground" />
              </Radio.Indicator>
            </Radio.Root>
          </RadioGroup>
          <div className="flex gap-3">
            <Checkbox checked={checkbox1} onCheckedChange={(v) => setCheckbox1(v === true)} />
            <Checkbox checked={checkbox2} onCheckedChange={(v) => setCheckbox2(v === true)} />
          </div>
        </div>

        {/* Alert Dialog + Button Group + Switch */}
        <div className="flex items-center gap-4">
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="outline" />}>
              Alert Dialog
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="flex items-stretch *:focus-visible:relative *:focus-visible:z-10 [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0 [&>[data-slot]:not(:last-child)]:rounded-r-none">
            <Button variant="outline">Button Group</Button>
            <Button variant="outline" size="icon">
              <RiArrowDownSLine />
            </Button>
          </div>

          <SwitchPrimitive.Root
            checked={switchOn}
            onCheckedChange={setSwitchOn}
            className={cn(
              "ml-auto relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors outline-none",
              "bg-muted data-checked:bg-primary",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "after:absolute after:-inset-x-3 after:-inset-y-2"
            )}
          >
            <SwitchPrimitive.Thumb
              className={cn(
                "pointer-events-none block size-4 rounded-full bg-background shadow-sm ring-0 transition-transform",
                "data-checked:translate-x-4 translate-x-0"
              )}
            />
          </SwitchPrimitive.Root>
        </div>
      </CardContent>
    </Card>
  )
}

export function ImageCard() {
  return (
    <Card className="relative w-full overflow-hidden pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-primary opacity-50 mix-blend-color" />
      <img
        src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Photo by mymind on Unsplash"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
      />
      <CardHeader>
        <CardTitle>Observability Plus is replacing Monitoring</CardTitle>
        <CardDescription>
          Switch to the improved way to explore your data, with natural language.
          Monitoring will no longer be available on the Pro plan in November, 2025
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>
          Create Query
          <RiAddLine data-icon="inline-end" />
        </Button>
        <Badge variant="secondary" className="ml-auto">Warning</Badge>
      </CardFooter>
    </Card>
  )
}

export function VisitorsChart() {
  return (
    <Card className="pb-0">
      <CardHeader>
        <CardTitle>Visitors</CardTitle>
        <CardDescription>Last 6 months</CardDescription>
        <CardAction>
          <Badge variant="secondary">+2% vs last month</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <AreaChart data={visitorsData}>
            <defs>
              <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="desktop"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill="url(#colorDesktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function ShortcutsCard() {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">Shortcuts</p>
          <div className="flex flex-col gap-2">
            {shortcuts.map((shortcut, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{shortcut.label}</span>
                  <div className="flex gap-1">
                    {shortcut.keys.map((key) => (
                      <kbd
                        key={key}
                        className="pointer-events-none inline-flex h-6 min-w-6 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-xs text-muted-foreground select-none"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
                {i < shortcuts.length - 1 && <Separator className="mt-2" />}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ComponentShowcase() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <IconGrid />
      <ComponentControls />
      <ImageCard />
      <VisitorsChart />
      <ShortcutsCard />
    </div>
  )
}
