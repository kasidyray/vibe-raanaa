"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { StatusBadge } from "@/components/ui/status-badge"
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs"
import {
  RiCheckLine,
  RiCloseLine,
  RiInformationLine,
  RiArrowRightSLine,
  RiFileCopyLine,
  RiCodeLine,
} from "@remixicon/react"
import type { ComponentMeta, DocStatus } from "@/app/(main)/components/component-list"
import type {
  ComponentDocData,
  ComponentVariant,
  ComponentState,
  PropertyDef,
  GuidanceItem,
  DoDontItem,
  ContextExample,
  RelatedComponent,
  AnatomyPart,
  CodeExample,
} from "./component-doc-types"

// ── Mode ──────────────────────────────────────────────────────────────────────

type DocMode = "design" | "develop"

// ── Nav config ────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: "overview",      label: "Overview" },
  { id: "anatomy",       label: "Anatomy" },
  { id: "examples",      label: "Examples" },
  { id: "variants",      label: "Variants" },
  { id: "states",        label: "States" },
  { id: "usage",         label: "When to use" },
  { id: "properties",    label: "Properties" },
  { id: "do-dont",       label: "Do & Don't" },
  { id: "accessibility", label: "Accessibility" },
  { id: "content",       label: "Content" },
  { id: "behavior",      label: "Behavior" },
  { id: "spacing",       label: "Spacing" },
  { id: "related",       label: "Related" },
  { id: "design-notes",  label: "Design notes" },
]

const DEV_NAV_SECTIONS = [
  { id: "dev-installation", label: "Installation" },
  { id: "dev-usage",        label: "Usage" },
  { id: "dev-examples",     label: "Examples" },
  { id: "dev-api",          label: "API reference" },
  { id: "dev-accessibility",label: "Accessibility" },
]

const STATUS_VARIANT: Record<DocStatus, "success" | "caution" | "critical" | "info"> = {
  "Ready":      "success",
  "In Review":  "caution",
  "Deprecated": "critical",
  "New":        "info",
}

// ── Scroll container helper ───────────────────────────────────────────────────

function findScrollContainer(el: HTMLElement): HTMLElement | null {
  let parent = el.parentElement
  while (parent) {
    const { overflowY } = window.getComputedStyle(parent)
    if (overflowY === "auto" || overflowY === "scroll") return parent
    parent = parent.parentElement
  }
  return null
}

// ── Shared primitives ─────────────────────────────────────────────────────────

function DocSection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-6 flex flex-col gap-5">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  )
}

function PreviewBox({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl bg-muted/30 border px-6 py-8 min-h-24",
        className,
      )}
    >
      {children}
    </div>
  )
}

// ── Code tokenizer ────────────────────────────────────────────────────────────

type TokenType = "keyword" | "string" | "comment" | "literal" | "plain"

interface Token { type: TokenType; value: string }

const KEYWORDS = new Set([
  "import", "export", "from", "as", "default",
  "const", "let", "var", "function", "return", "type",
  "interface", "class", "extends", "implements", "new",
  "if", "else", "for", "while", "switch", "case", "break", "continue",
  "async", "await", "try", "catch", "finally", "throw",
  "typeof", "instanceof", "void", "in", "of",
])

const LITERALS = new Set(["true", "false", "null", "undefined"])

function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let i = 0

  while (i < code.length) {
    // Line comment
    if (code[i] === "/" && code[i + 1] === "/") {
      let j = i
      while (j < code.length && code[j] !== "\n") j++
      tokens.push({ type: "comment", value: code.slice(i, j) })
      i = j
      continue
    }

    // Block comment
    if (code[i] === "/" && code[i + 1] === "*") {
      let j = i + 2
      while (j < code.length - 1 && !(code[j] === "*" && code[j + 1] === "/")) j++
      j += 2
      tokens.push({ type: "comment", value: code.slice(i, j) })
      i = j
      continue
    }

    // Strings: double quote, single quote, backtick
    if (code[i] === '"' || code[i] === "'" || code[i] === "`") {
      const quote = code[i]
      let j = i + 1
      while (j < code.length && code[j] !== quote) {
        if (code[j] === "\\") j++
        j++
      }
      j++
      tokens.push({ type: "string", value: code.slice(i, j) })
      i = j
      continue
    }

    // Identifier, keyword, or literal
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++
      const word = code.slice(i, j)
      tokens.push({
        type: KEYWORDS.has(word) ? "keyword" : LITERALS.has(word) ? "literal" : "plain",
        value: word,
      })
      i = j
      continue
    }

    // Number
    if (/[0-9]/.test(code[i])) {
      let j = i
      while (j < code.length && /[0-9.]/.test(code[j])) j++
      tokens.push({ type: "literal", value: code.slice(i, j) })
      i = j
      continue
    }

    // Everything else
    tokens.push({ type: "plain", value: code[i] })
    i++
  }

  return tokens
}

const TOKEN_CLASS: Record<TokenType, string> = {
  keyword: "text-destructive",
  string:  "text-success",
  comment: "text-muted-foreground italic",
  literal: "text-warning",
  plain:   "text-foreground",
}

// ── Code block ────────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
    >
      {copied ? (
        <RiCheckLine className="size-3.5 text-success" />
      ) : (
        <RiFileCopyLine className="size-3.5" />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function CodeBlock({ code, title }: { code: string; title?: string }) {
  const tokens = React.useMemo(() => tokenize(code), [code])
  return (
    <div className="rounded-xl border bg-muted/20 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/40">
        <p className="text-xs font-medium text-muted-foreground">{title ?? "Code"}</p>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto p-4 text-xs font-mono leading-relaxed">
        <code>
          {tokens.map((token, i) => (
            <span key={i} className={TOKEN_CLASS[token.type]}>{token.value}</span>
          ))}
        </code>
      </pre>
    </div>
  )
}

// ── Design sections ───────────────────────────────────────────────────────────

function OverviewSection({
  data,
  tags,
}: {
  data: ComponentDocData["overview"]
  tags?: string[]
}) {
  return (
    <DocSection id="overview" title="Overview">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{data.what}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map(tag => (
              <Badge key={tag} variant="neutral" size="sm">{tag}</Badge>
            ))}
          </div>
        )}
        {data.appearsIn.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.appearsIn.map(place => (
              <span
                key={place}
                className="rounded-full border px-3 py-1 text-xs text-muted-foreground bg-muted/40"
              >
                {place}
              </span>
            ))}
          </div>
        )}
      </div>
    </DocSection>
  )
}

function AnatomySection({ data }: { data: ComponentDocData["anatomy"] }) {
  return (
    <DocSection id="anatomy" title="Anatomy">
      <PreviewBox className="py-10">
        {data.preview}
      </PreviewBox>
      {data.parts.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-3">
          {data.parts.map((part: AnatomyPart, i: number) => (
            <div key={part.name} className="rounded-xl border bg-card p-4 flex items-start gap-3">
              <span className="shrink-0 tabular-nums text-xs font-mono font-semibold bg-muted rounded-md px-1.5 py-1 text-muted-foreground leading-none mt-0.5">
                {i + 1}
              </span>
              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium">{part.name}</p>
                  {part.optional && (
                    <span className="text-xs text-muted-foreground border rounded px-1.5 py-0.5 leading-none">
                      optional
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{part.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </DocSection>
  )
}

function UsageSection({
  whenToUse,
  whenNotToUse,
}: {
  whenToUse: string[]
  whenNotToUse: string[]
}) {
  return (
    <DocSection id="usage" title="When to use">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-card p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="size-5 rounded-full bg-success/15 flex items-center justify-center shrink-0">
              <RiCheckLine className="size-3 text-success" />
            </div>
            <p className="text-sm font-semibold">Use when</p>
          </div>
          {whenToUse.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {whenToUse.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                  <RiCheckLine className="size-3.5 text-success shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground">No use cases defined yet.</p>
          )}
        </div>

        <div className="rounded-xl border bg-card p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="size-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
              <RiCloseLine className="size-3 text-destructive" />
            </div>
            <p className="text-sm font-semibold">Avoid when</p>
          </div>
          {whenNotToUse.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {whenNotToUse.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                  <RiCloseLine className="size-3.5 text-destructive shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground">No misuse scenarios defined yet.</p>
          )}
        </div>
      </div>
    </DocSection>
  )
}

function VariantsSection({ variants }: { variants: ComponentVariant[] }) {
  if (!variants.length) return null
  return (
    <DocSection id="variants" title="Variants">
      <div className="grid sm:grid-cols-2 gap-8">
        {variants.map((v: ComponentVariant) => (
          <div key={v.name} className={cn("rounded-xl border overflow-hidden flex flex-col", v.fullWidth && "sm:col-span-2")}>
            <div className="flex items-center justify-center px-6 py-8 border-b min-h-24">
              {v.preview}
            </div>
            <div className="p-4 flex flex-col gap-1 bg-muted/50">
              <p className="text-sm font-semibold">{v.name}</p>
              <p className="text-sm text-muted-foreground">{v.description}</p>
            </div>
          </div>
        ))}
      </div>
    </DocSection>
  )
}

function StatesSection({ states }: { states: ComponentState[] }) {
  if (!states.length) return null
  return (
    <DocSection id="states" title="States">
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {states.map((s: ComponentState) => (
          <div key={s.name} className={cn("rounded-xl border overflow-hidden flex flex-col", s.fullWidth && "sm:col-span-2")}>
            <div className="flex items-center justify-center px-6 py-8 border-b min-h-24">
              {s.preview}
            </div>
            <div className="p-4 flex flex-col gap-0.5 bg-muted/50">
              <p className="text-base font-medium">{s.name}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </DocSection>
  )
}

function PropertiesSection({ properties }: { properties: PropertyDef[] }) {
  if (!properties.length) return null
  return (
    <DocSection id="properties" title="Properties">
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="hidden sm:grid grid-cols-[120px_1fr_80px_1fr] gap-4 px-4 py-2.5 bg-muted/50 border-b">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Property</p>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Values</p>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Default</p>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Description</p>
        </div>
        {properties.map((prop: PropertyDef, i: number) => (
          <div
            key={prop.name}
            className={cn(
              "flex flex-col sm:grid sm:grid-cols-[120px_1fr_80px_1fr] gap-2 sm:gap-4 px-4 py-4 sm:items-start",
              i > 0 && "border-t",
            )}
          >
            <div className="flex items-center gap-2">
              <code className="text-xs font-mono font-semibold bg-muted px-1.5 py-0.5 rounded text-foreground">
                {prop.name}
              </code>
            </div>
            <p className="text-xs text-muted-foreground font-mono leading-relaxed sm:pt-0.5">
              {prop.values}
            </p>
            <code className="text-xs font-mono text-muted-foreground sm:pt-0.5">
              {prop.default ?? "—"}
            </code>
            <p className="text-xs text-muted-foreground leading-relaxed sm:pt-0.5">
              {prop.description}
            </p>
          </div>
        ))}
      </div>
    </DocSection>
  )
}

function ContentGuidanceSection({ items }: { items: GuidanceItem[] }) {
  if (!items.length) return null
  return (
    <DocSection id="content" title="Content">
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item: GuidanceItem, i: number) => (
          <div key={i} className="rounded-xl border bg-card p-4 flex flex-col gap-1">
            <p className="text-sm font-medium">{item.rule}</p>
            <p className="text-xs text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </div>
    </DocSection>
  )
}

function BehaviorSection({ items }: { items: string[] }) {
  if (!items.length) return null
  return (
    <DocSection id="behavior" title="Behavior">
      <div className="rounded-xl border bg-card overflow-hidden divide-y">
        {items.map((item: string, i: number) => (
          <p key={i} className="px-4 py-3 text-sm text-muted-foreground">{item}</p>
        ))}
      </div>
    </DocSection>
  )
}

function SpacingSection({ items }: { items: GuidanceItem[] }) {
  if (!items.length) return null
  return (
    <DocSection id="spacing" title="Spacing & layout">
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item: GuidanceItem, i: number) => (
          <div key={i} className="rounded-xl border bg-card p-4 flex flex-col gap-1.5">
            <p className="text-sm font-medium">{item.rule}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>
    </DocSection>
  )
}

function AccessibilitySection({ items }: { items: GuidanceItem[] }) {
  if (!items.length) return null
  return (
    <DocSection id="accessibility" title="Accessibility">
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item: GuidanceItem, i: number) => (
          <div key={i} className="rounded-xl border bg-card p-4 flex flex-col gap-1">
            <p className="text-sm font-medium">{item.rule}</p>
            <p className="text-xs text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </div>
    </DocSection>
  )
}

function DoDontSection({
  doItems,
  dontItems,
}: {
  doItems: DoDontItem[]
  dontItems: DoDontItem[]
}) {
  if (!doItems.length && !dontItems.length) return null
  return (
    <DocSection id="do-dont" title="Do & Don't">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="size-5 rounded-full bg-success/15 flex items-center justify-center shrink-0">
              <RiCheckLine className="size-3 text-success" />
            </div>
            <p className="text-sm font-semibold text-success">Do</p>
          </div>
          {doItems.map((item: DoDontItem, i: number) => (
            <div
              key={i}
              className="rounded-xl border border-success/20 bg-success/[0.03] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-center border-b border-success/15 px-6 py-6 min-h-24 bg-success/[0.04]">
                {item.preview}
              </div>
              <div className="p-4 flex flex-col gap-0.5">
                <p className="text-xs font-semibold">{item.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="size-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
              <RiCloseLine className="size-3 text-destructive" />
            </div>
            <p className="text-sm font-semibold text-destructive">Don&apos;t</p>
          </div>
          {dontItems.map((item: DoDontItem, i: number) => (
            <div
              key={i}
              className="rounded-xl border border-destructive/20 bg-destructive/[0.03] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-center border-b border-destructive/15 px-6 py-6 min-h-24 bg-destructive/[0.04]">
                {item.preview}
              </div>
              <div className="p-4 flex flex-col gap-0.5">
                <p className="text-xs font-semibold">{item.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DocSection>
  )
}

function ExampleInContext({ example }: { example: ContextExample }) {
  const [open, setOpen] = React.useState(false)
  const tokens = React.useMemo(
    () => (example.code ? tokenize(example.code) : []),
    [example.code],
  )

  return (
    <div className="flex flex-col gap-3">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">{example.title}</p>
          {example.description && (
            <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
              {example.description}
            </p>
          )}
        </div>
        {example.code && (
          <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
            <RiCodeLine />
            View code
          </Button>
        )}
      </div>

      {/* Preview */}
      <PreviewBox className="py-10">
        {example.preview}
      </PreviewBox>

      {/* Code drawer */}
      {example.code && (
        <Drawer open={open} onOpenChange={setOpen} direction="right">
          <DrawerContent size="2xl" className="overflow-hidden">
            <DrawerHeader>
              <DrawerTitle>{example.title}</DrawerTitle>
              <div className="flex items-center gap-3">
                <CopyButton text={example.code} />
                <DrawerClose />
              </div>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto overflow-x-auto p-4">
              <pre className="text-xs font-mono leading-relaxed min-w-max">
                <code>
                  {tokens.map((token, i) => (
                    <span key={i} className={TOKEN_CLASS[token.type]}>
                      {token.value}
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  )
}

function ExamplesSection({ examples }: { examples: ContextExample[] }) {
  if (!examples.length) return null
  return (
    <DocSection id="examples" title="Examples in context">
      <div className="flex flex-col gap-8">
        {examples.map((example: ContextExample, i: number) => (
          <ExampleInContext key={i} example={example} />
        ))}
      </div>
    </DocSection>
  )
}

function RelatedSection({ components }: { components: RelatedComponent[] }) {
  if (!components.length) return null
  return (
    <DocSection id="related" title="Related components">
      <div className="grid sm:grid-cols-2 gap-3">
        {components.map((comp: RelatedComponent) => (
          <Link key={comp.slug} href={`/components/${comp.slug}`}>
            <div className="rounded-xl border bg-card p-4 flex flex-col gap-2 hover:bg-accent transition-colors cursor-pointer group">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold group-hover:text-foreground">{comp.name}</p>
                <RiArrowRightSLine className="size-4 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{comp.description}</p>
              <div className="rounded-lg bg-muted/50 px-3 py-2 mt-1">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground">Use instead when: </span>
                  {comp.when}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </DocSection>
  )
}

function DesignNotesSection({ notes }: { notes: string[] }) {
  if (!notes.length) return null
  return (
    <DocSection id="design-notes" title="Design notes">
      <div className="rounded-xl border bg-info/5 p-5 flex items-start gap-3">
        <RiInformationLine className="size-4 text-info shrink-0 mt-0.5" />
        <ul className="flex flex-col gap-2.5">
          {notes.map((note: string, i: number) => (
            <li key={i} className="text-sm text-muted-foreground leading-relaxed">
              {note}
            </li>
          ))}
        </ul>
      </div>
    </DocSection>
  )
}

// ── Developer sections ────────────────────────────────────────────────────────

// ── Package manager tab component ─────────────────────────────────────────────

const PM_OPTIONS = ["npm", "pnpm", "yarn", "bun"] as const
type PM = typeof PM_OPTIONS[number]

function buildPMCommand(baseCommand: string, pm: PM): string {
  const pkg = baseCommand.split(" add ")[1] ?? ""
  switch (pm) {
    case "npm":  return `npx shadcn@latest add ${pkg}`
    case "pnpm": return `pnpm dlx shadcn@latest add ${pkg}`
    case "yarn": return `yarn dlx shadcn@latest add ${pkg}`
    case "bun":  return `bunx --bun shadcn@latest add ${pkg}`
  }
}

function PMCommandBlock({ command }: { command: string }) {
  const [active, setActive] = React.useState<PM>("npm")
  const cmd = buildPMCommand(command, active)

  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/40">
        <div className="flex gap-0.5">
          {PM_OPTIONS.map(pm => (
            <button
              key={pm}
              onClick={() => setActive(pm)}
              className={cn(
                "cursor-pointer px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                active === pm
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {pm}
            </button>
          ))}
        </div>
        <CopyButton text={cmd} />
      </div>
      <pre className="px-4 py-3 text-xs font-mono text-foreground">
        <code>{cmd}</code>
      </pre>
    </div>
  )
}

function InstallationSection({
  data,
}: {
  data: { command: string; importPath: string; prerequisites?: string[]; notes?: string[] }
}) {
  const tokens = React.useMemo(() => tokenize(data.importPath), [data.importPath])

  return (
    <DocSection id="dev-installation" title="Installation">
      <div className="flex flex-col gap-6">

        {/* Prerequisites */}
        {data.prerequisites && data.prerequisites.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-muted-foreground">Prerequisites</p>
            <div className="rounded-xl border overflow-hidden divide-y">
              {data.prerequisites.map((cmd, i) => (
                <div key={i} className="flex items-center justify-between bg-muted/20 px-4 py-3 gap-4">
                  <code className="text-xs font-mono text-foreground">{cmd}</code>
                  <CopyButton text={cmd} />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Run these once per project before installing any component.{" "}
              <a
                href="https://github.com/kasidyray/vibe-raanaa#readme"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                Setup guide →
              </a>
            </p>
          </div>
        )}

        {/* Install */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-muted-foreground">Install</p>
          <PMCommandBlock command={data.command} />
        </div>

        {/* Import */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-muted-foreground">Import</p>
          <div className="rounded-xl border overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/40">
              <p className="text-xs font-medium text-muted-foreground">Usage</p>
              <CopyButton text={data.importPath} />
            </div>
            <pre className="px-4 py-3 text-xs font-mono leading-relaxed">
              <code>
                {tokens.map((token, i) => (
                  <span key={i} className={TOKEN_CLASS[token.type]}>{token.value}</span>
                ))}
              </code>
            </pre>
          </div>
        </div>

        {/* Notes */}
        {data.notes && data.notes.length > 0 && (
          <div className="rounded-xl border bg-muted/10 overflow-hidden divide-y">
            {data.notes.map((note, i) => (
              <p key={i} className="px-4 py-3 text-xs text-muted-foreground">{note}</p>
            ))}
          </div>
        )}
      </div>
    </DocSection>
  )
}

function BasicUsageSection({ code }: { code: string }) {
  return (
    <DocSection id="dev-usage" title="Usage">
      <CodeBlock title="Basic usage" code={code} />
    </DocSection>
  )
}

function ExampleCard({ example }: { example: CodeExample }) {
  const [tab, setTab] = React.useState<"preview" | "code">(
    example.preview ? "preview" : "code",
  )
  const tokens = React.useMemo(() => tokenize(example.code), [example.code])

  return (
    <div className="flex flex-col gap-2">
      {(example.title || example.description) && (
        <div>
          {example.title && <p className="text-sm font-semibold">{example.title}</p>}
          {example.description && (
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              {example.description}
            </p>
          )}
        </div>
      )}
      <div className="rounded-xl border overflow-hidden">
        {/* Tab bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/40">
          <div className="flex gap-0.5">
            {example.preview && (
              <button
                onClick={() => setTab("preview")}
                className={cn(
                  "cursor-pointer px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                  tab === "preview"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Preview
              </button>
            )}
            <button
              onClick={() => setTab("code")}
              className={cn(
                "cursor-pointer px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                tab === "code"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Code
            </button>
          </div>
          {tab === "code" && <CopyButton text={example.code} />}
        </div>

        {/* Preview pane */}
        {tab === "preview" && example.preview && (
          <div className="flex items-center justify-center px-6 py-10 min-h-32 bg-muted/10">
            {example.preview}
          </div>
        )}

        {/* Code pane */}
        {tab === "code" && (
          <pre className="overflow-x-auto px-4 py-4 text-xs font-mono leading-relaxed">
            <code>
              {tokens.map((token, i) => (
                <span key={i} className={TOKEN_CLASS[token.type]}>{token.value}</span>
              ))}
            </code>
          </pre>
        )}
      </div>
    </div>
  )
}

function DevExamplesSection({ examples }: { examples: CodeExample[] }) {
  if (!examples.length) return null
  return (
    <DocSection id="dev-examples" title="Examples">
      <div className="flex flex-col gap-6">
        {examples.map((ex: CodeExample, i: number) => (
          <ExampleCard key={i} example={ex} />
        ))}
      </div>
    </DocSection>
  )
}

function DevApiSection({ properties }: { properties: PropertyDef[] }) {
  if (!properties.length) return null
  return (
    <DocSection id="dev-api" title="API reference">
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="hidden sm:grid grid-cols-[120px_1fr_80px_1fr] gap-4 px-4 py-2.5 bg-muted/50 border-b">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Prop</p>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Type</p>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Default</p>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Description</p>
        </div>
        {properties.map((prop: PropertyDef, i: number) => (
          <div
            key={prop.name}
            className={cn(
              "flex flex-col sm:grid sm:grid-cols-[120px_1fr_80px_1fr] gap-2 sm:gap-4 px-4 py-4 sm:items-start",
              i > 0 && "border-t",
            )}
          >
            <code className="text-xs font-mono font-semibold bg-muted px-1.5 py-0.5 rounded text-foreground self-start">
              {prop.name}
            </code>
            <p className="text-xs text-muted-foreground font-mono leading-relaxed sm:pt-0.5">
              {prop.values}
            </p>
            <code className="text-xs font-mono text-muted-foreground sm:pt-0.5">
              {prop.default ?? "—"}
            </code>
            <p className="text-xs text-muted-foreground leading-relaxed sm:pt-0.5">
              {prop.description}
            </p>
          </div>
        ))}
      </div>
    </DocSection>
  )
}

function DevAccessibilitySection({ items }: { items: GuidanceItem[] }) {
  if (!items.length) return null
  return (
    <DocSection id="dev-accessibility" title="Accessibility">
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item: GuidanceItem, i: number) => (
          <div key={i} className="rounded-xl border bg-card p-4 flex flex-col gap-1">
            <p className="text-sm font-medium">{item.rule}</p>
            <p className="text-xs text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </div>
    </DocSection>
  )
}


// ── Side navigation ───────────────────────────────────────────────────────────

function DocSideNav({
  sections,
  activeSection,
  onSectionClick,
}: {
  sections: { id: string; label: string }[]
  activeSection: string
  onSectionClick: (id: string) => void
}) {
  return (
    <nav className="flex flex-col gap-0.5">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest pb-3">
        On this page
      </p>
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => onSectionClick(section.id)}
          className={cn(
            "cursor-pointer text-left py-1 text-sm transition-colors w-full",
            activeSection === section.id
              ? "text-foreground font-medium"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {section.label}
        </button>
      ))}
    </nav>
  )
}

// ── Mobile section chips ──────────────────────────────────────────────────────

function MobileSectionChips({
  sections,
  activeSection,
  onSectionClick,
}: {
  sections: { id: string; label: string }[]
  activeSection: string
  onSectionClick: (id: string) => void
}) {
  return (
    <div className="lg:hidden overflow-x-auto pb-1 -mx-1 px-1">
      <div className="flex gap-1.5 min-w-max">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            className={cn(
              "cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
              activeSection === section.id
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export function ComponentDocLayout({
  component,
  doc,
}: {
  component: ComponentMeta
  doc: ComponentDocData
}) {
  const [mode, setMode] = React.useState<DocMode>("design")
  const [activeSection, setActiveSection] = React.useState(NAV_SECTIONS[0].id)
  const layoutRef = React.useRef<HTMLDivElement>(null)

  const hasDevDoc = !!doc.devDoc
  const activeSections = mode === "design" ? NAV_SECTIONS : DEV_NAV_SECTIONS

  // ── Scroll-based active section tracking ──────────────────────────────────
  React.useEffect(() => {
    const sections = mode === "design" ? NAV_SECTIONS : DEV_NAV_SECTIONS
    setActiveSection(sections[0].id)

    if (!layoutRef.current) return
    const scrollEl = findScrollContainer(layoutRef.current)
    if (!scrollEl) return

    function update() {
      const { top: containerTop, height } = scrollEl!.getBoundingClientRect()
      const threshold = containerTop + height * 0.25
      let active = sections[0].id
      for (const { id } of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top < threshold) active = id
      }
      setActiveSection(active)
    }

    scrollEl.addEventListener("scroll", update, { passive: true })
    update()
    return () => scrollEl.removeEventListener("scroll", update)
  }, [mode])

  function scrollToSection(id: string) {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  function handleModeChange(m: DocMode) {
    setMode(m)
    // scroll to top of content on mode switch
    if (layoutRef.current) {
      const scrollEl = findScrollContainer(layoutRef.current)
      scrollEl?.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const statusVariant = component.status ? STATUS_VARIANT[component.status] : "neutral"

  return (
    <div ref={layoutRef} className="grid w-full lg:grid-cols-[1fr_220px]">

      {/* ── Left column: header + tabs + content ────────────────────────────── */}
      <div className="flex flex-col gap-6 min-w-0 w-full max-w-3xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-semibold tracking-tight">{component.name}</h1>
            {component.status && (
              <StatusBadge variant={statusVariant}>{component.status}</StatusBadge>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {component.description}
          </p>
          <div className="mt-3">
            {hasDevDoc ? (
              <Tabs
                value={mode}
                onValueChange={(v) => handleModeChange(v as DocMode)}
              >
                <TabsList variant="underline">
                  <TabsTab value="design">Design</TabsTab>
                  <TabsTab value="develop">Develop</TabsTab>
                </TabsList>
              </Tabs>
            ) : (
              <div className="border-b" />
            )}
          </div>
        </div>

        {/* Mobile section chips */}
        <MobileSectionChips
          sections={activeSections}
          activeSection={activeSection}
          onSectionClick={scrollToSection}
        />

        {/* Content */}
        <div key={mode} className="flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-5 duration-100 ease-out">
          {mode === "design" ? (
            <>
              <OverviewSection data={doc.overview} tags={component.tags} />
              <AnatomySection data={doc.anatomy} />
              <ExamplesSection examples={doc.examplesInContext} />
              <VariantsSection variants={doc.variants} />
              <StatesSection states={doc.states} />
              <UsageSection whenToUse={doc.whenToUse} whenNotToUse={doc.whenNotToUse} />
              <PropertiesSection properties={doc.properties} />
              <DoDontSection doItems={doc.doItems} dontItems={doc.dontItems} />
              <AccessibilitySection items={doc.accessibility} />
              <ContentGuidanceSection items={doc.contentGuidance} />
              <BehaviorSection items={doc.behavior} />
              <SpacingSection items={doc.spacing} />
              <RelatedSection components={doc.relatedComponents} />
              <DesignNotesSection notes={doc.designNotes} />
            </>
          ) : doc.devDoc ? (
            <>
              <InstallationSection data={doc.devDoc.installation} />
              <BasicUsageSection code={doc.devDoc.basicUsage} />
              <DevExamplesSection examples={doc.devDoc.codeExamples} />
              <DevApiSection properties={doc.devDoc.apiReference} />
              <DevAccessibilitySection items={doc.devDoc.accessibility} />
            </>
          ) : null}
        </div>
      </div>

      {/* ── Right column: sticky "On this page" nav ─────────────────────────── */}
      <aside className="hidden lg:block">
        <div className="sticky top-4">
          <DocSideNav
            sections={activeSections}
            activeSection={activeSection}
            onSectionClick={scrollToSection}
          />
        </div>
      </aside>
    </div>
  )
}
