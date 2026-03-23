"use client"

import * as React from "react"
import type { StepConfig, StepStatus } from "@/lib/steps"
import { flattenStepIds } from "@/lib/steps"

export type UseSplitFormReturn = {
  /** 0-based index of the current step in the flat sequence */
  index: number
  /** ID of the current navigable step */
  stepId: string
  /** Full flat ordered list of navigable step IDs */
  stepIds: string[]
  isFirst: boolean
  isLast: boolean
  total: number
  /** 0–100 across the entire flat sequence — never resets between groups */
  progress: number
  isSubmitting: boolean
  isDone: boolean
  next: () => void
  back: () => void
  /** Jump to any step by flat index */
  go: (index: number) => void
  /** Jump to any step by ID */
  goToId: (id: string) => void
  /** Status by flat index */
  status: (index: number) => StepStatus
  /** Status by step ID — convenience wrapper for nav components */
  statusById: (id: string) => StepStatus
  markError: (index: number) => void
  clearError: (index: number) => void
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  setDone: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * State machine for split-form flows.
 *
 * Accepts either:
 *   - StepConfig[]  — recommended; sub-steps are flattened automatically
 *   - string[]      — backward-compatible; treated as flat steps
 *
 * Progress is always calculated across the entire flattened sequence,
 * so it never resets when moving between groups.
 *
 * Usage:
 *   const form = useSplitForm(STEPS)
 *   form.next()              // advances + marks current as completed
 *   form.back()              // goes back (does not un-complete)
 *   form.goToId("profile")   // jump by ID
 *   form.statusById("profile") // "current" | "completed" | "upcoming" | "error"
 */
export function useSplitForm(steps: StepConfig[] | string[]): UseSplitFormReturn {
  const stepIds = React.useMemo<string[]>(() => {
    if (steps.length === 0) return []
    return typeof steps[0] === "string"
      ? (steps as string[])
      : flattenStepIds(steps as StepConfig[])
  }, [steps])

  const [index, setIndex]             = React.useState(0)
  const [completed, setCompleted]     = React.useState<Set<number>>(new Set())
  const [errors, setErrors]           = React.useState<Set<number>>(new Set())
  const [isSubmitting, setSubmitting] = React.useState(false)
  const [isDone, setDone]             = React.useState(false)

  const total   = stepIds.length
  const isFirst = index === 0
  const isLast  = index === total - 1
  const progress = Math.round((index / total) * 100)

  function next() {
    if (isLast) return
    setCompleted(prev => new Set([...prev, index]))
    setErrors(prev => { const s = new Set(prev); s.delete(index); return s })
    setIndex(i => i + 1)
  }

  function back() {
    if (isFirst) return
    setIndex(i => i - 1)
  }

  function go(i: number) {
    if (i >= 0 && i < total) setIndex(i)
  }

  function goToId(id: string) {
    go(stepIds.indexOf(id))
  }

  function status(i: number): StepStatus {
    if (errors.has(i))    return "error"
    if (i === index)      return "current"
    if (completed.has(i)) return "completed"
    return "upcoming"
  }

  function statusById(id: string): StepStatus {
    return status(stepIds.indexOf(id))
  }

  function markError(i: number)  { setErrors(prev => new Set([...prev, i])) }
  function clearError(i: number) { setErrors(prev => { const s = new Set(prev); s.delete(i); return s }) }

  return {
    index,
    stepId: stepIds[index] ?? "",
    stepIds,
    isFirst, isLast, total, progress,
    isSubmitting, isDone,
    next, back, go, goToId,
    status, statusById,
    markError, clearError,
    setSubmitting, setDone,
  }
}
