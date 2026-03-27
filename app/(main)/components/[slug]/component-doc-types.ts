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
  /** Optional JSX code string shown when the user clicks "View code" */
  code?: string
}

export interface RelatedComponent {
  slug: string
  name: string
  description: string
  when: string
}

// ── Developer documentation ───────────────────────────────────────────────────

export interface CodeExample {
  title: string
  description?: string
  code: string
  preview?: ReactNode
}

export interface ComponentDevDocData {
  installation: {
    /** npx shadcn add @raana/<name> */
    command: string
    /** import { X } from "@/components/ui/x" */
    importPath: string
    /** prerequisite commands to run first (e.g. tokens, utils) */
    prerequisites?: string[]
    notes?: string[]
  }
  basicUsage: string
  codeExamples: CodeExample[]
  apiReference: PropertyDef[]
  accessibility: GuidanceItem[]
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
  devDoc?: ComponentDevDocData
}
