"use client"

import * as React from "react"
import { RiAddLine, RiContractLeftRightLine } from "@remixicon/react"

import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  CUSTOMERS,
  containerSizes,
  type ContainerSize,
  type Customer,
  type CustomerTab,
} from "@/app/(main)/customers/data"
import { CustomersTable, CustomersTableSkeleton } from "@/app/(main)/customers/customers-table"
import { AddCustomerDrawer } from "@/app/(main)/customers/add-customer-drawer"

// ─── Tab config ───────────────────────────────────────────────────────────────

const TAB_ITEMS: { value: CustomerTab; label: string }[] = [
  { value: "all",           label: "All"                  },
  { value: "top",           label: "Top customers"        },
  { value: "first-time",    label: "First-time customers" },
  { value: "repeat",        label: "Repeat customers"     },
  { value: "recent",        label: "Recent customers"     },
  { value: "high-refunds",  label: "High refunds"         },
  { value: "high-disputes", label: "High disputes"        },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TopbarCustomersPage() {
  const [containerSize, setContainerSize] = React.useState<ContainerSize>("xl")
  const [isLoading, setIsLoading]         = React.useState(true)
  const [activeTab, setActiveTab]         = React.useState<CustomerTab>("all")
  const [isAdding, setIsAdding]           = React.useState(false)
  const [customers, setCustomers]         = React.useState<Customer[]>(CUSTOMERS)

  const handleAdd = React.useCallback((customer: Customer) => {
    setCustomers(prev => [customer, ...prev])
  }, [])

  React.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <AddCustomerDrawer
        open={isAdding}
        onClose={() => setIsAdding(false)}
        onAdd={handleAdd}
      />

      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 md:overflow-y-auto">
        <Container size={containerSize} className="flex flex-1 flex-col gap-6">
          <PageHeader
            title="Customers"
            description={`${customers.length} total customers`}
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
                <Button size="sm" onClick={() => setIsAdding(true)}>
                  <RiAddLine />
                  Add customer
                </Button>
              </div>
            }
          />

          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as CustomerTab)}
            className="flex flex-1 flex-col"
          >
            <div className="overflow-x-auto pb-4">
              <TabsList variant="pill" className="w-max">
                {TAB_ITEMS.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {TAB_ITEMS.map((t) => (
              <TabsContent key={t.value} value={t.value} className="flex flex-1 flex-col">
                {isLoading ? (
                  <CustomersTableSkeleton />
                ) : (
                  <CustomersTable tab={t.value} customers={customers} />
                )}
              </TabsContent>
            ))}
          </Tabs>
        </Container>
      </div>
    </>
  )
}
