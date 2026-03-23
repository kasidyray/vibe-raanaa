# Step Forms

Two patterns for multi-step flows. Pick one based on context:

| Pattern | Use when |
|---|---|
| **Split Form** | Standalone wizard outside the main app layout (onboarding, setup flows) |
| **Multi-Step** | Embedded inside the main app layout (create project, settings flows) |

---

## Core concepts

### Step config

All flows start with a `StepConfig[]` array — the single source of truth for your step tree.

```ts
import type { StepConfig } from "@/lib/steps"

const STEPS: StepConfig[] = [
  // Flat step
  { id: "basics", title: "Project basics" },

  // Grouped step — subSteps are the navigable leaves
  {
    id: "setup",
    title: "Setup",
    subSteps: [
      { id: "timeline", title: "Timeline" },
      { id: "permissions", title: "Permissions", optional: true },
    ],
  },

  // Optional flat step
  { id: "team", title: "Team", optional: true },

  { id: "review", title: "Review & create" },
]
```

**Rules:**
- Groups (`subSteps`) are visual only — the navigable steps are the leaves
- Only one level of nesting is supported
- `optional` shows a faint "Optional" label in the sidebar

### Step statuses

```ts
type StepStatus = "current" | "completed" | "upcoming" | "error"
```

Statuses drive both the sidebar indicators and what's clickable.

### Navigation modes

| Mode | Behaviour |
|---|---|
| `"linear"` (default) | Only completed and error steps are clickable for back-navigation |
| `"free"` | Any step is clickable regardless of status |

---

## Split Form

Best for full-page distraction-free wizards (e.g. onboarding).

### Hook

```ts
import { useSplitForm } from "@/components/split-form/use-split-form"

const form = useSplitForm(STEPS)
```

| Field | Type | Description |
|---|---|---|
| `index` | `number` | Current position in flat sequence (0-based) |
| `stepId` | `string` | Current step ID |
| `stepIds` | `string[]` | Full ordered flat ID list |
| `isFirst` | `boolean` | |
| `isLast` | `boolean` | |
| `total` | `number` | Total navigable steps |
| `progress` | `number` | 0–100, never resets between groups |
| `isDone` | `boolean` | Set after `setDone(true)` |
| `isSubmitting` | `boolean` | |
| `next()` | `() => void` | Marks current completed, advances |
| `back()` | `() => void` | Goes back (doesn't un-complete) |
| `go(index)` | `(n: number) => void` | Jump to any flat index |
| `goToId(id)` | `(id: string) => void` | Jump by step ID |
| `status(index)` | `(n: number) => StepStatus` | |
| `statusById(id)` | `(id: string) => StepStatus` | |
| `markError(index)` | `(n: number) => void` | Mark a step as error |
| `clearError(index)` | `(n: number) => void` | Clear the error state |
| `setDone` | `Dispatch` | Call `setDone(true)` to show completion |
| `setSubmitting` | `Dispatch` | |

### Layout

```tsx
import { SplitFormLayout }  from "@/components/split-form/split-form-layout"
import { SplitFormNav }     from "@/components/split-form/split-form-nav"
import { SplitFormStep }    from "@/components/split-form/split-form-step"
import { SplitFormHeader }  from "@/components/split-form/split-form-header"
import { SplitFormSection } from "@/components/split-form/split-form-section"
import { SplitFormFooter }  from "@/components/split-form/split-form-footer"

<SplitFormLayout
  onSaveExit={handleSaveExit}
  sectionLabel="Account setup"        // Label bar above content
  sectionProgress={form.progress}     // Progress line above footer
  sidebar={
    <SplitFormNav
      steps={STEPS}
      currentStepId={form.stepId}
      getStatus={form.statusById}
      onStepClick={id => form.goToId(id)}
      mode="linear"
    />
  }
  footer={
    <SplitFormFooter
      isFirst={form.isFirst}
      isLast={form.isLast}
      onBack={form.back}
      onNext={handleNext}
      isLoading={form.isSubmitting}
    />
  }
>
  <SplitFormStep index={0} currentIndex={form.index}>
    <SplitFormHeader title="Tell us about yourself" description="..." />
    <SplitFormSection title="Personal details">
      {/* fields */}
    </SplitFormSection>
  </SplitFormStep>

  <SplitFormStep index={1} currentIndex={form.index}>
    {/* ... */}
  </SplitFormStep>
</SplitFormLayout>
```

**`SplitFormLayout` props:**

| Prop | Type | Description |
|---|---|---|
| `sidebar` | `ReactNode` | Pass `<SplitFormNav />` — hidden on completion |
| `onSaveExit` | `() => void` | Renders "Save and exit" button in sidebar header |
| `sectionLabel` | `string` | Label bar above the step content |
| `sectionProgress` | `number` | 0–100 progress line above footer buttons |
| `footer` | `ReactNode` | Pass `<SplitFormFooter />` — hidden on completion |
| `children` | `ReactNode` | `<SplitFormStep>` panels |

**`SplitFormFooter` props:**

| Prop | Type | Default |
|---|---|---|
| `isFirst` | `boolean` | |
| `isLast` | `boolean` | |
| `onBack` | `() => void` | |
| `onNext` | `() => void` | |
| `onCancel` | `() => void` | Shown only on first step |
| `nextLabel` | `string` | `"Next"` |
| `submitLabel` | `string` | `"Submit"` — used on last step |
| `backLabel` | `string` | `"Back"` |
| `helperText` | `string` | Centred between the buttons |
| `isLoading` | `boolean` | Disables + spins primary CTA |
| `isNextDisabled` | `boolean` | |

### Validation + errors

```ts
function handleNext() {
  const valid = validate()
  if (!valid) {
    form.markError(form.index)   // turns indicator red
    return
  }
  form.clearError(form.index)
  form.next()
}
```

### Completion screen

Hide the sidebar and footer by not passing them, then render your completion UI as a child:

```tsx
<SplitFormLayout
  // No sidebar, no footer, no sectionLabel
>
  {form.isDone ? (
    <div className="absolute inset-0 flex items-center justify-center p-8">
      <CompletionState
        title="You're all set!"
        description="..."
        primaryAction={{ label: "Go to dashboard", onClick: () => router.push("/") }}
      />
    </div>
  ) : (
    // steps
  )}
</SplitFormLayout>
```

---

## Multi-Step Form (Embedded)

Best for flows inside the main app layout (e.g. "Create project" modal/page).

### Hook

```ts
import { useMultiStepForm } from "@/components/multi-step-form/use-multi-step-form"

const form = useMultiStepForm<FormData>(STEPS, { name: "" })
```

| Field | Type | Description |
|---|---|---|
| `currentStepIndex` | `number` | 0-based flat index |
| `currentStepId` | `string` | |
| `formData` | `Partial<T>` | Accumulated state |
| `isFirstStep` | `boolean` | |
| `isLastStep` | `boolean` | |
| `isSubmitting` | `boolean` | |
| `isComplete` | `boolean` | |
| `totalSteps` | `number` | Flattened count |
| `progress` | `number` | 0–100 |
| `goNext()` | `() => void` | Marks current completed, advances |
| `goBack()` | `() => void` | |
| `goToStep(index)` | `(n: number) => void` | |
| `updateFormData(data)` | `(d: Partial<T>) => void` | Merges into `formData` |
| `getStepStatus(index)` | `(n: number) => StepStatus` | |
| `markStepError(index)` | `(n: number) => void` | |
| `clearStepError(index)` | `(n: number) => void` | |
| `setIsSubmitting` | `Dispatch` | |
| `setIsComplete` | `Dispatch` | |

### Layout

```tsx
import { EmbeddedMultiStepLayout } from "@/components/multi-step-form/embedded-multi-step-layout"
import { StepSidebar }             from "@/components/multi-step-form/step-sidebar"
import { StepTransition }          from "@/components/multi-step-form/step-transition"
import { StepHeader }              from "@/components/multi-step-form/step-header"
import { StepFormSection }         from "@/components/multi-step-form/step-form-section"
import { StepFooter }              from "@/components/multi-step-form/step-footer"

<EmbeddedMultiStepLayout
  showProgressBar
  progress={form.progress}
  sidebar={
    <StepSidebar
      steps={STEPS}
      getStepStatus={form.getStepStatus}
      onStepClick={form.goToStep}
      mode="free"
    />
  }
>
  <StepTransition index={0} currentIndex={form.currentStepIndex}>
    <StepHeader title="Project basics" description="..." />
    <StepFormSection>
      {/* fields */}
    </StepFormSection>
    <div className="border-t pt-6">
      <StepFooter
        isFirstStep={form.isFirstStep}
        isLastStep={form.isLastStep}
        onBack={form.goBack}
        onNext={handleNext}
        isLoading={form.isSubmitting}
      />
    </div>
  </StepTransition>

  <StepTransition index={1} currentIndex={form.currentStepIndex}>
    {/* ... */}
  </StepTransition>
</EmbeddedMultiStepLayout>
```

**Important:** `StepFooter` goes *inside* each `StepTransition` (separated by `border-t`), not outside.

**`EmbeddedMultiStepLayout` props:**

| Prop | Type | Description |
|---|---|---|
| `showProgressBar` | `boolean` | Thin bar spanning full width at top |
| `progress` | `number` | 0–100 |
| `sidebar` | `ReactNode` | Pass `<StepSidebar />` — desktop only |
| `children` | `ReactNode` | `<StepTransition>` panels |

**`StepFooter` props:**

| Prop | Type | Default |
|---|---|---|
| `isFirstStep` | `boolean` | |
| `isLastStep` | `boolean` | |
| `onBack` | `() => void` | |
| `onNext` | `() => void` | |
| `onCancel` | `() => void` | Shown only on first step |
| `nextLabel` | `string` | `"Continue"` |
| `submitLabel` | `string` | `"Submit"` |
| `helperText` | `string` | |
| `isLoading` | `boolean` | |
| `isNextDisabled` | `boolean` | |

### Loading states

When a step fetches data asynchronously, render a skeleton inside `StepTransition` while loading:

```tsx
import { StepSkeleton } from "@/components/multi-step-form/step-skeleton"

<StepTransition index={2} currentIndex={form.currentStepIndex}>
  {isLoading ? (
    <StepSkeleton variant="fields" rows={3} />
  ) : (
    <>
      <StepHeader title="..." />
      <StepFormSection>...</StepFormSection>
    </>
  )}
  <div className="border-t pt-6">
    <StepFooter ... isNextDisabled={isLoading} />
  </div>
</StepTransition>
```

**`StepSkeleton` variants:**

| Variant | Use for |
|---|---|
| `"fields"` | Label + input pairs |
| `"cards"` | Selectable card rows |
| `"toggles"` | Checkbox + label + description rows |
| `"review"` | Key / value pairs |

### Completion state

```tsx
{form.isComplete ? (
  <CompletionState
    title="Project created!"
    description="Your team has been notified."
    primaryAction={{ label: "View project", onClick: () => router.push("/projects/1") }}
    secondaryAction={{ label: "Create another", onClick: () => form.setIsComplete(false) }}
  />
) : (
  // steps
)}
```

---

## Shared components

### StepIndicator

Renders the numbered circle in sidebar items. Used internally by `StepSidebar` and `SplitFormNav` — you don't need to use this directly unless building a custom nav.

```tsx
import { StepIndicator } from "@/components/ui/step-indicator"

<StepIndicator status="current" number={2} />
```

| Status | Appearance |
|---|---|
| `current` | Filled dark circle with number |
| `completed` | Check icon |
| `error` | Alert icon |
| `upcoming` | Muted border circle with number |

---

## Reference implementations

| Flow | File | Pattern |
|---|---|---|
| Onboarding | `app/(flows)/onboarding/page.tsx` | Split Form — grouped steps, linear mode |
| Create project | `app/(main)/projects/page.tsx` | Embedded Multi-Step — mixed flat + grouped, free mode |
