"use client"

import * as React from "react"
import {
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  RiArrowRightUpLine,
  RiCalendarLine,
  RiContractLeftRightLine,
  RiDownloadLine,
  RiFilterLine,
  RiGroupLine,
  RiRefreshLine,
  RiSearchLine,
  RiServerLine,
} from "@remixicon/react"

import { SiteHeader } from "@/components/site-header"
import { Skeleton }   from "@/components/ui/skeleton"
import { Container }  from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator, BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription,
} from "@/components/ui/empty"
import {
  DataTable, DataTableToolbar, DataTableSearch,
  DataTableFacetedFilter, DataTableDropdownFilter, DataTableColumnToggle, DataTablePagination,
} from "@/components/ui/data-table"

import {
  MOCK_ANSWERS,
  TOPIC_OPTIONS, PLATFORM_OPTIONS, TAG_OPTIONS, PROMPT_OPTIONS,
  DATE_RANGE_OPTIONS, FREQUENCY_OPTIONS,
  type Answer,
} from "./data"
import { buildColumns }  from "./columns"
import { AnswerDrawer }  from "./answer-drawer"

// ─── Constants ────────────────────────────────────────────────────────────────

type ContainerSize = "sm" | "default" | "lg" | "xl" | "full"

const CONTAINER_SIZES: { value: ContainerSize; label: string }[] = [
  { value: "sm",      label: "Small"   },
  { value: "default", label: "Default" },
  { value: "lg",      label: "Large"   },
  { value: "xl",      label: "X-Large" },
  { value: "full",    label: "Full"    },
]

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function AnswersTableSkeleton() {
  const colWidths = ["w-24", "w-32", "w-64", "w-16", "w-12", "w-24", "w-40", "w-20"]
  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="border-b px-4 py-3 flex items-center gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-md" />
        ))}
        <Skeleton className="ml-auto h-8 w-48 rounded-md" />
      </div>
      <div>
        <div className="border-b px-4 py-3 flex items-center gap-4">
          {colWidths.map((w, i) => <Skeleton key={i} className={`h-3 rounded ${w}`} />)}
        </div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border-b last:border-0 px-4 py-3.5 flex items-center gap-4">
            {colWidths.map((w, j) => <Skeleton key={j} className={`h-4 rounded ${w}`} />)}
          </div>
        ))}
      </div>
      <div className="border-t px-4 py-3 flex items-center justify-between">
        <Skeleton className="h-4 w-36 rounded-md" />
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-8 w-8 rounded-md" />)}
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CannedAnswersPage() {
  const [isLoading,      setIsLoading]      = React.useState(true)
  const [containerSize,  setContainerSize]  = React.useState<ContainerSize>("xl")
  const [selectedAnswer, setSelectedAnswer] = React.useState<Answer | null>(null)

  // Toolbar state
  const [dateRange,      setDateRange]      = React.useState(DATE_RANGE_OPTIONS[0].value)
  const [frequency,      setFrequency]      = React.useState(FREQUENCY_OPTIONS[0].value)
  const [topicFilter,    setTopicFilter]    = React.useState<string[]>([])
  const [platformFilter, setPlatformFilter] = React.useState<string[]>([])
  const [tagFilter,      setTagFilter]      = React.useState<string[]>([])
  const [promptFilter,   setPromptFilter]   = React.useState<string[]>([])

  // TanStack state
  const [globalFilter,     setGlobalFilter]     = React.useState("")
  const [sorting,          setSorting]          = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({ platform: false })

  // Simulate fetch
  React.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  // Pre-filter data before passing to TanStack (keeps column defs simple)
  const filteredData = React.useMemo(() => {
    return MOCK_ANSWERS.filter((a) => {
      if (topicFilter.length    && !topicFilter.includes(a.topic))            return false
      if (platformFilter.length && !platformFilter.includes(a.platform))      return false
      if (tagFilter.length      && !a.tags.some((t) => tagFilter.includes(t))) return false
      if (promptFilter.length   && !promptFilter.includes(a.promptName))      return false
      return true
    })
  }, [topicFilter, platformFilter, tagFilter, promptFilter])

  const columns = React.useMemo(() => buildColumns(setSelectedAnswer), [])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter, columnVisibility },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, _id, value: string) => {
      const q = value.toLowerCase()
      return (
        row.original.prompt.toLowerCase().includes(q)   ||
        row.original.response.toLowerCase().includes(q) ||
        row.original.topic.toLowerCase().includes(q)
      )
    },
    initialState: { pagination: { pageSize: 10 } },
  })

  const hasActiveFilters =
    dateRange  !== DATE_RANGE_OPTIONS[0].value  ||
    frequency  !== FREQUENCY_OPTIONS[0].value   ||
    topicFilter.length > 0 || platformFilter.length > 0 ||
    tagFilter.length > 0   || promptFilter.length > 0

  const resetFilters = () => {
    setDateRange(DATE_RANGE_OPTIONS[0].value)
    setFrequency(FREQUENCY_OPTIONS[0].value)
    setTopicFilter([])
    setPlatformFilter([])
    setTagFilter([])
    setPromptFilter([])
  }

  const totalCount     = MOCK_ANSWERS.length
  const mentionedCount = MOCK_ANSWERS.filter((a) => a.mentioned).length

  return (
    <>
      <SiteHeader
        left={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Canned Answers</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />

      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 md:overflow-y-auto">
        <Container size={containerSize} className="flex flex-1 flex-col gap-6">
          <PageHeader
            title={`${totalCount} answers`}
            description={`${mentionedCount} of ${totalCount} prompts mention your brand`}
            actions={
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="outline" size="sm" aria-label="Change width" />}>
                    <RiContractLeftRightLine />
                    Width
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Content width</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {CONTAINER_SIZES.map(({ value, label }) => (
                        <DropdownMenuCheckboxItem
                          key={value}
                          checked={containerSize === value}
                          onClick={() => setContainerSize(value)}
                        >
                          {label}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm">
                  <RiDownloadLine />
                  Export
                </Button>
              </div>
            }
          />

          <Tabs defaultValue="raw" className="flex flex-1 flex-col">
            <div className="pb-4">
              <TabsList variant="pill">
                <TabsTrigger value="raw">
                  Raw
                  <span className="ml-1.5 tabular-nums text-muted-foreground">{totalCount}</span>
                </TabsTrigger>
                <TabsTrigger value="summarized">Summarized</TabsTrigger>
                <TabsTrigger value="citations">Citations</TabsTrigger>
              </TabsList>
            </div>

            {/* ── Raw tab ── */}
            <TabsContent value="raw">
              {isLoading ? (
                <AnswersTableSkeleton />
              ) : (
                <DataTable
                  table={table}
                  variant="contained"
                  emptyMessage="No answers match the current filters."
                  onRowClick={setSelectedAnswer}
                  toolbar={
                    <DataTableToolbar>
                      <DataTableDropdownFilter
                        title="Date range"
                        icon={<RiCalendarLine className="opacity-60" />}
                        options={DATE_RANGE_OPTIONS}
                        value={dateRange}
                        onValueChange={setDateRange}
                      />
                      <DataTableDropdownFilter
                        title="Frequency"
                        icon={<RiRefreshLine className="opacity-60" />}
                        options={FREQUENCY_OPTIONS}
                        value={frequency}
                        onValueChange={setFrequency}
                      />
                      <DataTableFacetedFilter
                        title="Tags"
                        options={TAG_OPTIONS}
                        selectedValues={tagFilter}
                        onSelectionChange={setTagFilter}
                        icon={<RiFilterLine className="opacity-60" />}
                      />
                      <DataTableFacetedFilter
                        title="Prompts"
                        options={PROMPT_OPTIONS}
                        selectedValues={promptFilter}
                        onSelectionChange={setPromptFilter}
                        icon={<RiSearchLine className="opacity-60" />}
                      />
                      <DataTableFacetedFilter
                        title="Topics"
                        options={TOPIC_OPTIONS}
                        selectedValues={topicFilter}
                        onSelectionChange={setTopicFilter}
                        icon={<RiGroupLine className="opacity-60" />}
                      />
                      <DataTableFacetedFilter
                        title="Platforms"
                        options={PLATFORM_OPTIONS}
                        selectedValues={platformFilter}
                        onSelectionChange={setPlatformFilter}
                        icon={<RiServerLine className="opacity-60" />}
                      />
                      {hasActiveFilters && (
                        <Button variant="ghost" size="sm" onClick={resetFilters}>Reset</Button>
                      )}
                      <div className="ml-auto flex items-center gap-2">
                        <DataTableSearch table={table} placeholder="Prompt or response…" />
                        <DataTableColumnToggle table={table} />
                      </div>
                    </DataTableToolbar>
                  }
                  footer={table.getFilteredRowModel().rows.length > 0
                    ? <DataTablePagination table={table} style="classic" rowLabel="answer" />
                    : undefined
                  }
                />
              )}
            </TabsContent>

            {/* ── Summarized tab ── */}
            <TabsContent value="summarized" className="flex flex-1 flex-col">
              <Empty className="flex-1">
                <EmptyHeader>
                  <EmptyMedia variant="stacked"><RiGroupLine /></EmptyMedia>
                  <EmptyTitle>Summarized view</EmptyTitle>
                  <EmptyDescription>
                    Aggregated insights across all prompts and platforms will appear here.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </TabsContent>

            {/* ── Citations tab ── */}
            <TabsContent value="citations" className="flex flex-1 flex-col">
              <Empty className="flex-1">
                <EmptyHeader>
                  <EmptyMedia variant="stacked"><RiSearchLine /></EmptyMedia>
                  <EmptyTitle>Citations</EmptyTitle>
                  <EmptyDescription>
                    Source links and citation context for each AI response will appear here.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </TabsContent>
          </Tabs>
        </Container>
      </div>

      <AnswerDrawer answer={selectedAnswer} onClose={() => setSelectedAnswer(null)} />
    </>
  )
}
