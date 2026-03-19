"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  RiAddLine,
  RiBriefcaseLine,
  RiBuilding2Line,
  RiContractLeftRightLine,
  RiDeleteBinLine,
  RiEditLine,
  RiMailLine,
  RiMore2Line,
  RiUserLine,
} from "@remixicon/react"

import { SiteHeader } from "@/components/site-header"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator, BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty"
import {
  DataTable,
  DataTableToolbar,
  DataTableSearch,
  DataTableFacetedFilter,
  DataTableSortMenu,
  DataTableColumnToggle,
  DataTablePagination,
} from "@/components/ui/data-table"

// ─── Types ───────────────────────────────────────────────────────────────────

type Lead = {
  id: string
  name: string
  avatar: string
  company: string
  companyLogo: string
  jobTitle: string
  email: string
}

type ContainerSize = "sm" | "default" | "lg" | "xl" | "full"

// ─── Data ────────────────────────────────────────────────────────────────────

const LEADS: Lead[] = [
  { id: "1",  name: "Robert Johnson",  avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Robert",   company: "Loom",      companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=L&backgroundColor=6366f1",  jobTitle: "Sales Rep",               email: "robertjohnson@loom.com" },
  { id: "2",  name: "James Carter",    avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=James",    company: "Notion",    companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=N&backgroundColor=000000",  jobTitle: "Sales Manager",           email: "james@gmail.com" },
  { id: "3",  name: "Priya Sharma",    avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Priya",    company: "Slack",     companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=S&backgroundColor=4a154b",  jobTitle: "Account Manager",         email: "priya@auroratech.com" },
  { id: "4",  name: "Aarav Menon",     avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Aarav",    company: "Canva",     companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=C&backgroundColor=7c3aed",  jobTitle: "Sales Associate",         email: "aarav.menon@yahoo.com" },
  { id: "5",  name: "Sarah Mitchell",  avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Sarah",    company: "Facebook",  companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=F&backgroundColor=1877f2",  jobTitle: "Customer Success Lead",   email: "sarah@zencloud.io" },
  { id: "6",  name: "Riya Kapoor",     avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Riya",     company: "Twitter",   companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=T&backgroundColor=1da1f2",  jobTitle: "HR Coordinator",          email: "riyakapoor@outlook.com" },
  { id: "7",  name: "Nathan Reyes",    avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Nathan",   company: "Spotify",   companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=Sp&backgroundColor=1db954", jobTitle: "Business Executive",      email: "nathanreyes@dev.co" },
  { id: "8",  name: "Michael Torres",  avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Michael",  company: "Mailchimp", companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=M&backgroundColor=ffe01b",  jobTitle: "Customer Success Lead",   email: "michael@outlook.com" },
  { id: "9",  name: "Olivia Brooks",   avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Olivia",   company: "Netflix",   companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=Ne&backgroundColor=e50914", jobTitle: "Sales Rep",               email: "oliviabrooks@co.com" },
  { id: "10", name: "Ethan Ward",      avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Ethan",    company: "Twitch",    companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=Tw&backgroundColor=9146ff", jobTitle: "Channel Sales Executive", email: "ethanward@gmail.com" },
  { id: "11", name: "Lucas Pereira",   avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Lucas",    company: "Dropbox",   companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=D&backgroundColor=0061ff",  jobTitle: "Growth Manager",          email: "lucas@outlook.com" },
  { id: "12", name: "Daniel Carter",   avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Daniel",   company: "Zapier",    companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=Z&backgroundColor=ff4a00",  jobTitle: "Partnership Manager",     email: "danielcarter@gmail.com" },
  { id: "13", name: "Amara Osei",      avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Amara",    company: "Figma",     companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=Fi&backgroundColor=f24e1e", jobTitle: "Design Lead",             email: "amara@figma.com" },
  { id: "14", name: "Chris Huang",     avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Chris",    company: "Linear",    companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=Li&backgroundColor=5e6ad2",  jobTitle: "Product Manager",         email: "chris@linear.app" },
  { id: "15", name: "Zoe Williams",    avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Zoe",      company: "Vercel",    companyLogo: "https://api.dicebear.com/9.x/initials/svg?seed=V&backgroundColor=000000",  jobTitle: "Engineer",                email: "zoe@vercel.com" },
]

const JOB_TITLES = [...new Set(LEADS.map(l => l.jobTitle))].sort()
const COMPANIES  = [...new Set(LEADS.map(l => l.company))].sort()

const containerSizes: { value: ContainerSize; label: string }[] = [
  { value: "sm",      label: "Small"   },
  { value: "default", label: "Default" },
  { value: "lg",      label: "Large"   },
  { value: "xl",      label: "X-Large" },
  { value: "full",    label: "Full"    },
]

const SORT_COLUMNS = [
  { id: "name",     label: "Name" },
  { id: "company",  label: "Company" },
  { id: "jobTitle", label: "Job Title" },
  { id: "email",    label: "Email" },
]

// ─── Columns ─────────────────────────────────────────────────────────────────

const columns: ColumnDef<Lead>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={v => table.toggleAllPageRowsSelected(v === true)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={v => row.toggleSelected(v === true)}
        aria-label="Select row"
      />
    ),
    size: 40,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        <Avatar className="size-7 rounded-full">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback className="text-xs">{row.original.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <span className="font-medium text-sm">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "company",
    header: "COMPANIES",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="size-5 rounded-sm">
          <AvatarImage src={row.original.companyLogo} alt={row.original.company} />
          <AvatarFallback className="text-[10px] rounded-sm">{row.original.company.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <span className="text-sm">{row.original.company}</span>
      </div>
    ),
    filterFn: (row, _id, filterValues: string[]) =>
      filterValues.length === 0 || filterValues.includes(row.original.company),
  },
  {
    accessorKey: "jobTitle",
    header: "JOB TITLE",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.jobTitle}</span>,
    filterFn: (row, _id, filterValues: string[]) =>
      filterValues.length === 0 || filterValues.includes(row.original.jobTitle),
  },
  {
    accessorKey: "email",
    header: "EMAIL",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.email}</span>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="ml-auto" />}>
          <RiMore2Line />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem><RiUserLine />View lead</DropdownMenuItem>
            <DropdownMenuItem><RiEditLine />Edit</DropdownMenuItem>
            <DropdownMenuItem><RiMailLine />Send email</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive"><RiDeleteBinLine />Delete</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    size: 48,
  },
]

// ─── Leads Table ─────────────────────────────────────────────────────────────

function LeadsTable() {
  const [sorting, setSorting]                   = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter]         = React.useState("")
  const [rowSelection, setRowSelection]         = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [jobTitleFilter, setJobTitleFilter]     = React.useState<string[]>([])
  const [companyFilter, setCompanyFilter]       = React.useState<string[]>([])

  const columnFilters = React.useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = []
    if (jobTitleFilter.length) filters.push({ id: "jobTitle", value: jobTitleFilter })
    if (companyFilter.length)  filters.push({ id: "company",  value: companyFilter  })
    return filters
  }, [jobTitleFilter, companyFilter])

  const hasActiveFilters = jobTitleFilter.length > 0 || companyFilter.length > 0

  const table = useReactTable({
    data: LEADS,
    columns,
    state: { sorting, globalFilter, rowSelection, columnVisibility, columnFilters },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const selectedCount = Object.keys(rowSelection).length

  return (
    <div className="flex flex-col gap-4">
      <DataTableToolbar>
        <DataTableSearch table={table} placeholder="Search by name, company..." />

        <DataTableFacetedFilter
          title="Job Title"
          options={JOB_TITLES}
          selectedValues={jobTitleFilter}
          onSelectionChange={setJobTitleFilter}
          icon={<RiBriefcaseLine className="opacity-60" />}
        />

        <DataTableFacetedFilter
          title="Company"
          options={COMPANIES}
          selectedValues={companyFilter}
          onSelectionChange={setCompanyFilter}
          icon={<RiBuilding2Line className="opacity-60" />}
        />

        {hasActiveFilters && (
          <button
            onClick={() => { setJobTitleFilter([]); setCompanyFilter([]) }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Reset
          </button>
        )}

        <div className="ml-auto flex items-center gap-2">
          {selectedCount > 0 && (
            <Button variant="destructive" size="sm" className="rounded-md" onClick={() => setRowSelection({})}>
              <RiDeleteBinLine />
              Delete {selectedCount}
            </Button>
          )}
          <DataTableSortMenu
            sorting={sorting}
            onSortingChange={setSorting}
            columns={SORT_COLUMNS}
          />
          <DataTableColumnToggle table={table} />
        </div>
      </DataTableToolbar>

      <DataTable table={table} variant="bordered" emptyMessage="No leads found." />

      <DataTablePagination
        table={table}
        style="classic"
        selectedCount={selectedCount}
        rowLabel="lead"
      />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LeadsPage() {
  const [containerSize, setContainerSize] = React.useState<ContainerSize>("xl")

  const content = (
    <>
      <PageHeader
        title="Leads"
        description="Track and manage your sales leads across all pipelines."
        actions={
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" aria-label="Change width" />}>
                <RiContractLeftRightLine />
                Width
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Content width</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {containerSizes.map(({ value, label }) => (
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
            <Button><RiAddLine />New lead</Button>
          </div>
        }
      />
      <Tabs defaultValue="all" className="flex flex-1 flex-col">
        <div className="pb-4">
          <TabsList variant="pill">
            <TabsTrigger value="all">All leads</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all">
          <LeadsTable />
        </TabsContent>
        <TabsContent value="pipeline" className="flex flex-1">
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <RiBuilding2Line />
              </EmptyMedia>
              <EmptyTitle>Pipeline view coming soon</EmptyTitle>
              <EmptyDescription>
                The pipeline view is under construction. Check back later or continue managing leads from the table view.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" size="sm"><RiAddLine />Add lead</Button>
            </EmptyContent>
          </Empty>
        </TabsContent>
      </Tabs>
    </>
  )

  return (
    <>
      <SiteHeader
        left={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Leads</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        {containerSize === "full" ? (
          <div className="flex flex-1 flex-col gap-6">{content}</div>
        ) : (
          <Container size={containerSize} className="flex flex-1 flex-col gap-6">{content}</Container>
        )}
      </div>
    </>
  )
}
