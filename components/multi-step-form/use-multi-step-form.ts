"use client"

import * as React from "react"
import type { StepConfig, StepStatus } from "@/lib/steps"
import { flattenStepIds } from "@/lib/steps"

export type UseMultiStepFormReturn<T extends Record<string, unknown>> = {
  currentStepIndex: number
  currentStepId: string
  formData: Partial<T>
  isFirstStep: boolean
  isLastStep: boolean
  isSubmitting: boolean
  isComplete: boolean
  totalSteps: number
  // 0-100 — progress across all navigable steps, for the progress bar
  progress: number
  goNext: () => void
  goBack: () => void
  goToStep: (index: number) => void
  updateFormData: (data: Partial<T>) => void
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>
  getStepStatus: (index: number) => StepStatus
  markStepError: (index: number) => void
  clearStepError: (index: number) => void
}

export { flattenStepIds } from "@/lib/steps"

/**
 * Core state machine for any multi-step form.
 *
 * Accepts either:
 *   - StepConfig[]  — recommended; sub-steps are flattened automatically
 *   - string[]      — backward-compatible; treated as flat steps
 *
 * Usage:
 *   const form = useMultiStepForm(STEPS)
 *   form.currentStepId        // which step/sub-step to render
 *   form.goNext()             // advance + mark current as completed
 *   form.goBack()             // go back (preserves formData)
 *   form.getStepStatus(index) // "current" | "completed" | "upcoming" | "error"
 */
export function useMultiStepForm<T extends Record<string, unknown>>(
  steps: StepConfig[] | string[],
  initialData: Partial<T> = {}
): UseMultiStepFormReturn<T> {
  // Normalise input to a flat ordered ID list
  const stepIds = React.useMemo<string[]>(() => {
    if (steps.length === 0) return []
    return typeof steps[0] === "string"
      ? (steps as string[])
      : flattenStepIds(steps as StepConfig[])
  }, [steps])

  const [currentStepIndex, setCurrentStepIndex] = React.useState(0)
  const [formData, setFormData] = React.useState<Partial<T>>(initialData)
  const [completedSteps, setCompletedSteps] = React.useState<Set<number>>(new Set())
  const [errorSteps, setErrorSteps] = React.useState<Set<number>>(new Set())
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isComplete, setIsComplete] = React.useState(false)

  const totalSteps = stepIds.length
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === totalSteps - 1
  const progress = Math.round((currentStepIndex / totalSteps) * 100)

  function goNext() {
    if (isLastStep) return
    setCompletedSteps(prev => new Set([...prev, currentStepIndex]))
    setErrorSteps(prev => {
      const next = new Set(prev)
      next.delete(currentStepIndex)
      return next
    })
    setCurrentStepIndex(i => i + 1)
  }

  function goBack() {
    if (isFirstStep) return
    setCurrentStepIndex(i => i - 1)
  }

  function goToStep(index: number) {
    if (index >= 0 && index < totalSteps) {
      setCurrentStepIndex(index)
    }
  }

  function updateFormData(data: Partial<T>) {
    setFormData(prev => ({ ...prev, ...data }))
  }

  function getStepStatus(index: number): StepStatus {
    if (errorSteps.has(index)) return "error"
    if (index === currentStepIndex) return "current"
    if (completedSteps.has(index)) return "completed"
    return "upcoming"
  }

  function markStepError(index: number) {
    setErrorSteps(prev => new Set([...prev, index]))
  }

  function clearStepError(index: number) {
    setErrorSteps(prev => {
      const next = new Set(prev)
      next.delete(index)
      return next
    })
  }

  return {
    currentStepIndex,
    currentStepId: stepIds[currentStepIndex] ?? "",
    formData,
    isFirstStep,
    isLastStep,
    isSubmitting,
    isComplete,
    totalSteps,
    progress,
    goNext,
    goBack,
    goToStep,
    updateFormData,
    setIsSubmitting,
    setIsComplete,
    getStepStatus,
    markStepError,
    clearStepError,
  }
}
