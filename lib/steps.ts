export type StepStatus = "current" | "completed" | "upcoming" | "error"

export type SubStepConfig = {
  id: string
  title: string
  description?: string
  optional?: boolean
}

export type StepConfig = {
  id: string
  title: string
  description?: string
  optional?: boolean
  /**
   * When present, this step is a parent group and is not navigable itself.
   * Navigation flows through each sub-step in order.
   * One level deep only.
   */
  subSteps?: SubStepConfig[]
}

/**
 * Flatten a StepConfig tree into an ordered list of navigable step IDs.
 *
 * Rules:
 * - A step with no subSteps contributes its own id.
 * - A step WITH subSteps is a parent group — it is skipped and its
 *   subSteps contribute their ids instead. The parent is not navigable.
 */
export function flattenStepIds(steps: StepConfig[]): string[] {
  return steps.flatMap(s =>
    s.subSteps && s.subSteps.length > 0
      ? s.subSteps.map(sub => sub.id)
      : [s.id]
  )
}
