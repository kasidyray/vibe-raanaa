import type { ReactNode } from "react"

// ── Anatomy ───────────────────────────────────────────────────────────────────

export interface AnatomyPart {
  name: string
  description: string
  optional?: boolean
}

// ── Variants & States ─────────────────────────────────────────────────────────

export interface ComponentVariant {
  name: string
  description: string
  when: string
  preview: ReactNode
}

export interface ComponentState {
  name: string
  description: string
  preview: ReactNode
}

// ── Properties ────────────────────────────────────────────────────────────────

export interface PropertyDef {
  name: string
  values: string
  default?: string
  description: string
}

// ── Guidance ──────────────────────────────────────────────────────────────────

export interface GuidanceItem {
  rule: string
  detail: string
}

export interface DoDontItem {
  label: string
  description: string
  preview: ReactNode
}

// ── Examples & Related ────────────────────────────────────────────────────────

export interface ContextExample {
  title: string
  description: string
  preview: ReactNode
}

export interface RelatedComponent {
  slug: string
  name: string
  description: string
  when: string
}

// ── Full doc data shape ───────────────────────────────────────────────────────

export interface ComponentDocData {
  overview: {
    what: string
    why: string
    problem: string
    appearsIn: string[]
  }
  anatomy: {
    preview: ReactNode
    parts: AnatomyPart[]
  }
  whenToUse: string[]
  whenNotToUse: string[]
  variants: ComponentVariant[]
  states: ComponentState[]
  properties: PropertyDef[]
  contentGuidance: GuidanceItem[]
  behavior: string[]
  spacing: GuidanceItem[]
  accessibility: GuidanceItem[]
  doItems: DoDontItem[]
  dontItems: DoDontItem[]
  examplesInContext: ContextExample[]
  relatedComponents: RelatedComponent[]
  designNotes: string[]
}
