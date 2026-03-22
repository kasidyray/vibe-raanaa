"use client"

import * as React from "react"
import type { SplitFormStatus } from "./types"

export type UseSplitFormReturn = {
  /** 0-based index of the current step */
  index: number
  /** ID of the current step */
  stepId: string
  isFirst: boolean
  isLast: boolean
  total: number
  /** 0–100 based on steps advanced past */
  progress: number
  isSubmitting: boolean
  isDone: boolean
  next: () => void
  back: () => void
  /** Jump to any step by index */
  go: (index: number) => void
  /** "current" | "completed" | "upcoming" | "error" */
  status: (index: number) => SplitFormStatus
  markError: (index: number) => void
  clearError: (index: number) => void
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  setDone: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * State machine for split-form flows.
 *
 * Independent of useMultiStepForm — same concepts, fresh API names.
 *
 * Usage:
 *   const form = useSplitForm(STEP_IDS)
 *   form.next()          // advances + marks current as completed
 *   form.back()          // goes back (does not un-complete)
 *   form.go(3)           // jump to index
 *   form.status(i)       // "current" | "completed" | "upcoming" | "error"
 */
export function useSplitForm(stepIds: string[]): UseSplitFormReturn {
  const [index, setIndex]               = React.useState(0)
  const [completed, setCompleted]       = React.useState<Set<number>>(new Set())
  const [errors, setErrors]             = React.useState<Set<number>>(new Set())
  const [isSubmitting, setSubmitting]   = React.useState(false)
  const [isDone, setDone]               = React.useState(false)

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

  function status(i: number): SplitFormStatus {
    if (errors.has(i))    return "error"
    if (i === index)      return "current"
    if (completed.has(i)) return "completed"
    return "upcoming"
  }

  function markError(i: number)  { setErrors(prev => new Set([...prev, i])) }
  function clearError(i: number) { setErrors(prev => { const s = new Set(prev); s.delete(i); return s }) }

  return {
    index, stepId: stepIds[index],
    isFirst, isLast, total, progress,
    isSubmitting, isDone,
    next, back, go, status,
    markError, clearError,
    setSubmitting, setDone,
  }
}
