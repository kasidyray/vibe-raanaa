export type StepStatus = "current" | "completed" | "upcoming" | "error"

export type StepConfig = {
  id: string
  title: string
  description?: string
  optional?: boolean
}
