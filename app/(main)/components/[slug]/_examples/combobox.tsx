"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  InputGroup, InputGroupAddon, InputGroupInput, InputGroupText,
  InputGroupTextarea, InputGroupButton,
} from "@/components/ui/input-group"
import {
  Select, SelectContent, SelectItem, SelectTrigger,
  SelectValue, SelectGroup, SelectLabel, SelectSeparator,
} from "@/components/ui/select"
import {
  Combobox, ComboboxInput, ComboboxContent, ComboboxList,
  ComboboxItem, ComboboxEmpty, ComboboxCollection,
  ComboboxGroup, ComboboxLabel, ComboboxSeparator,
  ComboboxChips, ComboboxChip, ComboboxChipsInput, useComboboxAnchor,
} from "@/components/ui/combobox"
import {
  RiSearchLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiMailLine,
} from "@remixicon/react"

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <p className="text-xs text-muted-foreground">{label}</p>}
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}

const comboboxFrameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

const comboboxGroupedItems = [
  { group: "Frontend", items: ["React", "Vue", "Svelte", "Angular"] },
  { group: "Backend", items: ["Node.js", "Django", "Rails", "Laravel"] },
]

function FormControlsSection() {
  const [showPw, setShowPw] = useState(false)
  const [single, setSingle] = useState("")
  const [multi, setMulti] = useState<string[]>([])
  const [grouped, setGrouped] = useState("")
  const chipsAnchor = useComboboxAnchor()

  return (
    <div className="break-inside-avoid mb-6 col-span-full">
      <div className="mb-3">
        <h2 className="text-base font-semibold">Inputs, Input Groups &amp; Combobox</h2>
        <p className="text-xs text-muted-foreground font-mono">input.tsx · input-group.tsx · combobox.tsx</p>
      </div>
      <Card>
        <CardContent className="flex flex-col gap-6">

          {/* ── Input ── */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-foreground/60 uppercase tracking-wider">Input</p>
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
          </div>

          <Separator />

          {/* ── Input Group ── */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-foreground/60 uppercase tracking-wider">Input Group</p>
            <Row label="Icon start">
              <InputGroup className="w-full max-w-xs">
                <InputGroupAddon align="inline-start"><InputGroupText><RiSearchLine /></InputGroupText></InputGroupAddon>
                <InputGroupInput placeholder="Search…" />
              </InputGroup>
            </Row>
            <Row label="Text end">
              <InputGroup className="w-full max-w-xs">
                <InputGroupInput placeholder="Amount" />
                <InputGroupAddon align="inline-end"><InputGroupText>USD</InputGroupText></InputGroupAddon>
              </InputGroup>
            </Row>
            <Row label="Text both sides">
              <InputGroup className="w-full max-w-xs">
                <InputGroupAddon align="inline-start"><InputGroupText>$</InputGroupText></InputGroupAddon>
                <InputGroupInput placeholder="0.00" />
                <InputGroupAddon align="inline-end"><InputGroupText>USD</InputGroupText></InputGroupAddon>
              </InputGroup>
              <InputGroup className="w-full max-w-xs">
                <InputGroupAddon align="inline-start"><InputGroupText>https://</InputGroupText></InputGroupAddon>
                <InputGroupInput placeholder="example.com" />
              </InputGroup>
            </Row>
            <Row label="Button end">
              <InputGroup className="w-full max-w-xs">
                <InputGroupInput placeholder="Enter email" />
                <InputGroupAddon align="inline-end"><InputGroupButton size="xs">Send</InputGroupButton></InputGroupAddon>
              </InputGroup>
            </Row>
            <Row label="Password with toggle">
              <InputGroup className="w-full max-w-xs">
                <InputGroupAddon align="inline-start"><InputGroupText><RiLockLine /></InputGroupText></InputGroupAddon>
                <InputGroupInput type={showPw ? "text" : "password"} placeholder="Enter password" />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton onClick={() => setShowPw((v) => !v)} aria-label={showPw ? "Hide" : "Show"}>
                    {showPw ? <RiEyeOffLine /> : <RiEyeLine />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Row>
            <Row label="Textarea">
              <InputGroup className="w-full max-w-xs">
                <InputGroupAddon align="block-start"><InputGroupText><RiMailLine />Message</InputGroupText></InputGroupAddon>
                <InputGroupTextarea placeholder="Type here…" rows={3} />
              </InputGroup>
            </Row>
          </div>

          <Separator />

          {/* ── Select ── */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-foreground/60 uppercase tracking-wider">Select</p>
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
          </div>

          <Separator />

          {/* ── Combobox ── */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-foreground/60 uppercase tracking-wider">Combobox</p>
            <Row label="Single select">
              <Combobox value={single} onValueChange={(v) => setSingle(v ?? "")} items={comboboxFrameworks}>
                <ComboboxInput placeholder="Select framework…" className="w-52" showTrigger showClear={!!single} />
                <ComboboxContent>
                  <ComboboxList>
                    <ComboboxCollection>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxCollection>
                    <ComboboxEmpty>No results found.</ComboboxEmpty>
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Row>
            <Row label="Multiple (chips)">
              <Combobox multiple value={multi} onValueChange={setMulti} items={comboboxFrameworks}>
                <ComboboxChips ref={chipsAnchor} className="w-64">
                  {multi.map((v) => <ComboboxChip key={v}>{v}</ComboboxChip>)}
                  <ComboboxChipsInput placeholder={multi.length === 0 ? "Select frameworks…" : ""} />
                </ComboboxChips>
                <ComboboxContent anchor={chipsAnchor}>
                  <ComboboxList>
                    <ComboboxCollection>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxCollection>
                    <ComboboxEmpty>No results found.</ComboboxEmpty>
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Row>
            <Row label="With groups">
              <Combobox value={grouped} onValueChange={(v) => setGrouped(v ?? "")}>
                <ComboboxInput placeholder="Select technology…" className="w-52" showTrigger showClear={!!grouped} />
                <ComboboxContent>
                  <ComboboxList>
                    {comboboxGroupedItems.map((g, i) => (
                      <ComboboxGroup key={g.group}>
                        <ComboboxLabel>{g.group}</ComboboxLabel>
                        {g.items.map((item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>)}
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
          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default function Examples() {
  return (
    <div className="flex flex-col gap-8">
      <FormControlsSection />
    </div>
  )
}
