"use client"

import * as React from "react"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getComponent } from "@/app/(main)/components/component-list"
import { ComponentDocLayout } from "./component-doc-layout"
import { alertDesignDoc } from "./_docs/alert/design"
import { alertDevelopDoc } from "./_docs/alert/develop"
import { alertDialogDesignDoc } from "./_docs/alert-dialog/design"
import { alertDialogDevelopDoc } from "./_docs/alert-dialog/develop"
import { avatarDesignDoc } from "./_docs/avatar/design"
import { avatarDevelopDoc } from "./_docs/avatar/develop"
import { badgeDesignDoc } from "./_docs/badge/design"
import { badgeDevelopDoc } from "./_docs/badge/develop"
import { buttonDesignDoc } from "./_docs/button/design"
import { buttonDevelopDoc } from "./_docs/button/develop"
import { breadcrumbDesignDoc } from "./_docs/breadcrumb/design"
import { breadcrumbDevelopDoc } from "./_docs/breadcrumb/develop"
import { buttonGroupDesignDoc } from "./_docs/button-group/design"
import { buttonGroupDevelopDoc } from "./_docs/button-group/develop"
import { calendarDesignDoc } from "./_docs/calendar/design"
import { calendarDevelopDoc } from "./_docs/calendar/develop"
import { cardDesignDoc } from "./_docs/card/design"
import { cardDevelopDoc } from "./_docs/card/develop"
import { inputDesignDoc } from "./_docs/input/design"
import { inputDevelopDoc } from "./_docs/input/develop"
import { textareaDesignDoc } from "./_docs/textarea/design"
import { textareaDevelopDoc } from "./_docs/textarea/develop"
import { checkboxDesignDoc } from "./_docs/checkbox/design"
import { checkboxDevelopDoc } from "./_docs/checkbox/develop"
import { switchDesignDoc } from "./_docs/switch/design"
import { switchDevelopDoc } from "./_docs/switch/develop"
import { selectDesignDoc } from "./_docs/select/design"
import { selectDevelopDoc } from "./_docs/select/develop"
import { comboboxDesignDoc } from "./_docs/combobox/design"
import { comboboxDevelopDoc } from "./_docs/combobox/develop"
import { dataTableDesignDoc } from "./_docs/data-table/design"
import { dataTableDevelopDoc } from "./_docs/data-table/develop"
import { datePickerDesignDoc } from "./_docs/date-picker/design"
import { datePickerDevelopDoc } from "./_docs/date-picker/develop"
import { dialogDesignDoc } from "./_docs/dialog/design"
import { dialogDevelopDoc } from "./_docs/dialog/develop"
import { dropdownMenuDesignDoc } from "./_docs/dropdown-menu/design"
import { dropdownMenuDevelopDoc } from "./_docs/dropdown-menu/develop"
import { emptyDesignDoc } from "./_docs/empty/design"
import { emptyDevelopDoc } from "./_docs/empty/develop"
import { fieldDesignDoc } from "./_docs/field/design"
import { fieldDevelopDoc } from "./_docs/field/develop"
import { hoverCardDesignDoc } from "./_docs/hover-card/design"
import { hoverCardDevelopDoc } from "./_docs/hover-card/develop"
import { iconBadgeDesignDoc } from "./_docs/icon-badge/design"
import { iconBadgeDevelopDoc } from "./_docs/icon-badge/develop"
import { inputGroupDesignDoc } from "./_docs/input-group/design"
import { inputGroupDevelopDoc } from "./_docs/input-group/develop"
import { popoverDesignDoc } from "./_docs/popover/design"
import { popoverDevelopDoc } from "./_docs/popover/develop"
import { inputOtpDesignDoc } from "./_docs/input-otp/design"
import { inputOtpDevelopDoc } from "./_docs/input-otp/develop"
import { progressDesignDoc } from "./_docs/progress/design"
import { progressDevelopDoc } from "./_docs/progress/develop"
import { separatorDesignDoc } from "./_docs/separator/design"
import { separatorDevelopDoc } from "./_docs/separator/develop"
import { sheetDesignDoc } from "./_docs/sheet/design"
import { sheetDevelopDoc } from "./_docs/sheet/develop"
import { skeletonDesignDoc } from "./_docs/skeleton/design"
import { skeletonDevelopDoc } from "./_docs/skeleton/develop"
import { sidebarDesignDoc } from "./_docs/sidebar/design"
import { sidebarDevelopDoc } from "./_docs/sidebar/develop"
import { tabsDesignDoc } from "./_docs/tabs/design"
import { tabsDevelopDoc } from "./_docs/tabs/develop"
import type { ComponentDocData } from "./component-doc-types"

// Static import map — add new slugs here as example files are created
const exampleMap: Record<string, React.LazyExoticComponent<() => React.ReactElement>> = {
  alert:          React.lazy(() => import("./_examples/alert")),
  "alert-dialog": React.lazy(() => import("./_examples/alert-dialog")),
  avatar:         React.lazy(() => import("./_examples/avatar")),
  badge:          React.lazy(() => import("./_examples/badge")),
  breadcrumb:     React.lazy(() => import("./_examples/breadcrumb")),
  button:         React.lazy(() => import("./_examples/button")),
  "button-group": React.lazy(() => import("./_examples/button-group")),
  calendar:       React.lazy(() => import("./_examples/calendar")),
  card:           React.lazy(() => import("./_examples/card")),
  chart:          React.lazy(() => import("./_examples/chart")),
  checkbox:       React.lazy(() => import("./_examples/checkbox")),
  combobox:       React.lazy(() => import("./_examples/combobox")),
  "date-picker":  React.lazy(() => import("./_examples/date-picker")),
  dialog:         React.lazy(() => import("./_examples/dialog")),
  drawer:         React.lazy(() => import("./_examples/drawer")),
  "dropdown-menu":React.lazy(() => import("./_examples/dropdown-menu")),
  empty:          React.lazy(() => import("./_examples/empty")),
  field:          React.lazy(() => import("./_examples/field")),
  "hover-card":   React.lazy(() => import("./_examples/hover-card")),
  "icon-badge":   React.lazy(() => import("./_examples/icon-badge")),
  input:          React.lazy(() => import("./_examples/input")),
  "input-group":  React.lazy(() => import("./_examples/input-group")),
  "input-otp":    React.lazy(() => import("./_examples/input-otp")),
  label:          React.lazy(() => import("./_examples/label")),
  popover:        React.lazy(() => import("./_examples/popover")),
  progress:       React.lazy(() => import("./_examples/progress")),
  select:         React.lazy(() => import("./_examples/select")),
  separator:      React.lazy(() => import("./_examples/separator")),
  sheet:          React.lazy(() => import("./_examples/sheet")),
  skeleton:       React.lazy(() => import("./_examples/skeleton")),
  sonner:         React.lazy(() => import("./_examples/sonner")),
  "status-badge": React.lazy(() => import("./_examples/status-badge")),
  switch:         React.lazy(() => import("./_examples/switch")),
  table:          React.lazy(() => import("./_examples/table")),
  tabs:           React.lazy(() => import("./_examples/tabs")),
  textarea:       React.lazy(() => import("./_examples/textarea")),
  toggle:         React.lazy(() => import("./_examples/toggle")),
  "toggle-group": React.lazy(() => import("./_examples/toggle-group")),
  tooltip:        React.lazy(() => import("./_examples/tooltip")),
}

// Doc data registry — add entries here as component docs are authored
const docMap: Record<string, ComponentDocData> = {
  alert:          { ...alertDesignDoc, devDoc: alertDevelopDoc },
  "alert-dialog": { ...alertDialogDesignDoc, devDoc: alertDialogDevelopDoc },
  avatar:         { ...avatarDesignDoc, devDoc: avatarDevelopDoc },
  badge:          { ...badgeDesignDoc, devDoc: badgeDevelopDoc },
  breadcrumb:     { ...breadcrumbDesignDoc, devDoc: breadcrumbDevelopDoc },
  button:         { ...buttonDesignDoc, devDoc: buttonDevelopDoc },
  "button-group": { ...buttonGroupDesignDoc, devDoc: buttonGroupDevelopDoc },
  calendar:       { ...calendarDesignDoc, devDoc: calendarDevelopDoc },
  card:           { ...cardDesignDoc, devDoc: cardDevelopDoc },
  textarea:       { ...textareaDesignDoc, devDoc: textareaDevelopDoc },
  checkbox:       { ...checkboxDesignDoc, devDoc: checkboxDevelopDoc },
  switch:         { ...switchDesignDoc, devDoc: switchDevelopDoc },
  select:         { ...selectDesignDoc,     devDoc: selectDevelopDoc },
  combobox:       { ...comboboxDesignDoc,   devDoc: comboboxDevelopDoc },
  "data-table":   { ...dataTableDesignDoc,  devDoc: dataTableDevelopDoc },
  "date-picker":    { ...datePickerDesignDoc,    devDoc: datePickerDevelopDoc },
  dialog:           { ...dialogDesignDoc,        devDoc: dialogDevelopDoc },
  "dropdown-menu":  { ...dropdownMenuDesignDoc,  devDoc: dropdownMenuDevelopDoc },
  empty:            { ...emptyDesignDoc,          devDoc: emptyDevelopDoc },
  field:            { ...fieldDesignDoc,          devDoc: fieldDevelopDoc },
  "hover-card":     { ...hoverCardDesignDoc,      devDoc: hoverCardDevelopDoc },
  "icon-badge":     { ...iconBadgeDesignDoc,      devDoc: iconBadgeDevelopDoc },
  input:            { ...inputDesignDoc,          devDoc: inputDevelopDoc },
  "input-group":    { ...inputGroupDesignDoc,     devDoc: inputGroupDevelopDoc },
  popover:          { ...popoverDesignDoc,        devDoc: popoverDevelopDoc },
  "input-otp":      { ...inputOtpDesignDoc,       devDoc: inputOtpDevelopDoc },
  progress:         { ...progressDesignDoc,       devDoc: progressDevelopDoc },
  separator:        { ...separatorDesignDoc,      devDoc: separatorDevelopDoc },
  sheet:            { ...sheetDesignDoc,          devDoc: sheetDevelopDoc },
  skeleton:         { ...skeletonDesignDoc,       devDoc: skeletonDevelopDoc },
  sidebar:          { ...sidebarDesignDoc,        devDoc: sidebarDevelopDoc },
  tabs:             { ...tabsDesignDoc,           devDoc: tabsDevelopDoc },
}

export default function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = React.use(params)
  const component = getComponent(slug)

  if (!component) {
    notFound()
  }

  const doc = docMap[slug] ?? null
  const ExamplesComponent = exampleMap[slug] ?? null

  const breadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{component!.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )

  // ── Full documentation layout (when doc data exists) ──────────────────────
  if (doc) {
    return (
      <>
        <SiteHeader left={breadcrumb} />
        <div className="flex flex-1 flex-col p-4 md:p-6 md:overflow-y-auto">
          <ComponentDocLayout component={component!} doc={doc} />
        </div>
      </>
    )
  }

  // ── Fallback: simple examples layout (for undocumented components) ─────────
  return (
    <>
      <SiteHeader left={breadcrumb} />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 md:overflow-y-auto">
        <Container size="default" className="flex flex-1 flex-col gap-6">
          <PageHeader
            title={component!.name}
            description={component!.description}
          />
          {ExamplesComponent ? (
            <React.Suspense fallback={null}>
              <ExamplesComponent />
            </React.Suspense>
          ) : (
            <p className="text-sm text-muted-foreground">Examples coming soon.</p>
          )}
        </Container>
      </div>
    </>
  )
}
