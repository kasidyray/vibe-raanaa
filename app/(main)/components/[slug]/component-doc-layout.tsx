"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import {
  RiCheckLine,
  RiCloseLine,
  RiInformationLine,
  RiArrowRightSLine,
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
} from "./component-doc-types"

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

const STATUS_VARIANT: Record<DocStatus, "success" | "caution" | "critical" | "info"> = {
  "Ready":      "success",
  "In Review":  "caution",
  "Deprecated": "critical",
  "New":        "info",
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
      <div className="flex items-center gap-3">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest shrink-0">
          {title}
        </h2>
      </div>
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

// ── Overview section ──────────────────────────────────────────────────────────

function OverviewSection({ data }: { data: ComponentDocData["overview"] }) {
  return (
    <DocSection id="overview" title="Overview">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{data.what}</p>
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

// ── Anatomy section ───────────────────────────────────────────────────────────

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

// ── Usage section (when to use / not use) ─────────────────────────────────────

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
        {/* Use when */}
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

        {/* Avoid when */}
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

// ── Variants section ──────────────────────────────────────────────────────────

function VariantsSection({ variants }: { variants: ComponentVariant[] }) {
  if (!variants.length) return null
  return (
    <DocSection id="variants" title="Variants">
      <div className="grid sm:grid-cols-2 gap-4">
        {variants.map((v: ComponentVariant) => (
          <div key={v.name} className="rounded-xl border bg-card overflow-hidden flex flex-col">
            <div className="flex items-center justify-center bg-muted/30 px-6 py-8 border-b min-h-24">
              {v.preview}
            </div>
            <div className="p-4 flex flex-col gap-1">
              <p className="text-sm font-semibold">{v.name}</p>
              <p className="text-sm text-muted-foreground">{v.description}</p>
            </div>
          </div>
        ))}
      </div>
    </DocSection>
  )
}

// ── States section ────────────────────────────────────────────────────────────

function StatesSection({ states }: { states: ComponentState[] }) {
  if (!states.length) return null
  return (
    <DocSection id="states" title="States">
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {states.map((s: ComponentState) => (
          <div key={s.name} className="rounded-xl border bg-card overflow-hidden flex flex-col">
            <PreviewBox className="rounded-none border-0 border-b py-6">
              {s.preview}
            </PreviewBox>
            <div className="p-4 flex flex-col gap-0.5">
              <p className="text-sm font-medium">{s.name}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </DocSection>
  )
}

// ── Properties section ────────────────────────────────────────────────────────

function PropertiesSection({ properties }: { properties: PropertyDef[] }) {
  if (!properties.length) return null
  return (
    <DocSection id="properties" title="Properties">
      <div className="rounded-xl border bg-card overflow-hidden">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[120px_1fr_80px_1fr] gap-4 px-4 py-2.5 bg-muted/50 border-b">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Property</p>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Values</p>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Default</p>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Description</p>
        </div>
        {/* Rows */}
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

// ── Content guidance section ──────────────────────────────────────────────────

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

// ── Behavior section ──────────────────────────────────────────────────────────

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

// ── Spacing section ───────────────────────────────────────────────────────────

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

// ── Accessibility section ─────────────────────────────────────────────────────

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

// ── Do & Don't section ────────────────────────────────────────────────────────

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
        {/* Do column */}
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

        {/* Don't column */}
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

// ── Examples in context section ───────────────────────────────────────────────

function ExamplesSection({ examples }: { examples: ContextExample[] }) {
  if (!examples.length) return null
  return (
    <DocSection id="examples" title="Examples in context">
      <div className="flex flex-col gap-6">
        {examples.map((example: ContextExample, i: number) => (
          <div key={i} className="flex flex-col gap-3">
            <div>
              <p className="text-sm font-semibold">{example.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{example.description}</p>
            </div>
            {example.preview}
          </div>
        ))}
      </div>
    </DocSection>
  )
}

// ── Related components section ────────────────────────────────────────────────

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

// ── Design notes section ──────────────────────────────────────────────────────

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

// ── Side navigation ───────────────────────────────────────────────────────────

function DocSideNav({
  activeSection,
  onSectionClick,
}: {
  activeSection: string
  onSectionClick: (id: string) => void
}) {
  return (
    <nav className="flex flex-col gap-0.5">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest px-2 pb-3">
        On this page
      </p>
      {NAV_SECTIONS.map(section => (
        <button
          key={section.id}
          onClick={() => onSectionClick(section.id)}
          className={cn(
            "text-left px-2 py-1.5 rounded-full text-sm transition-colors w-full",
            activeSection === section.id
              ? "bg-accent text-foreground font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
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
  activeSection,
  onSectionClick,
}: {
  activeSection: string
  onSectionClick: (id: string) => void
}) {
  return (
    <div className="lg:hidden overflow-x-auto pb-1 -mx-1 px-1">
      <div className="flex gap-1.5 min-w-max">
        {NAV_SECTIONS.map(section => (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
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
  const [activeSection, setActiveSection] = React.useState(NAV_SECTIONS[0].id)
  const layoutRef = React.useRef<HTMLDivElement>(null)

  // ── Scroll-based active section tracking ──────────────────────────────────
  React.useEffect(() => {
    function findScrollContainer(el: HTMLElement): HTMLElement | null {
      let parent = el.parentElement
      while (parent) {
        const { overflowY } = window.getComputedStyle(parent)
        if (overflowY === "auto" || overflowY === "scroll") return parent
        parent = parent.parentElement
      }
      return null
    }

    if (!layoutRef.current) return
    const scrollEl = findScrollContainer(layoutRef.current)
    if (!scrollEl) return

    function update() {
      const { top: containerTop, height } = scrollEl!.getBoundingClientRect()
      const threshold = containerTop + height * 0.25
      let active = NAV_SECTIONS[0].id
      for (const { id } of NAV_SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top < threshold) active = id
      }
      setActiveSection(active)
    }

    scrollEl.addEventListener("scroll", update, { passive: true })
    update()
    return () => scrollEl.removeEventListener("scroll", update)
  }, [])

  function scrollToSection(id: string) {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const statusVariant = component.status ? STATUS_VARIANT[component.status] : "neutral"

  return (
    <div ref={layoutRef} className="flex flex-col gap-8">

      {/* ── Doc header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 pb-6 border-b">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex flex-col gap-1.5 min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight">{component.name}</h1>
            <p className="text-sm text-muted-foreground">{component.description}</p>
          </div>
          {component.status && (
            <StatusBadge variant={statusVariant}>
              {component.status}
            </StatusBadge>
          )}
        </div>
        {component.tags && component.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {component.tags.map(tag => (
              <Badge key={tag} variant="neutral" size="sm">{tag}</Badge>
            ))}
          </div>
        )}
      </div>

      {/* ── Mobile section chips ────────────────────────────────────────────── */}
      <MobileSectionChips activeSection={activeSection} onSectionClick={scrollToSection} />

      {/* ── Two-column layout ───────────────────────────────────────────────── */}
      <div className="grid gap-10 lg:grid-cols-[200px_1fr]">

        {/* Left sticky nav — desktop only */}
        <aside className="hidden lg:block">
          <div className="sticky top-4">
            <DocSideNav activeSection={activeSection} onSectionClick={scrollToSection} />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-col gap-12 min-w-0">
          <OverviewSection data={doc.overview} />
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
        </div>
      </div>
    </div>
  )
}
