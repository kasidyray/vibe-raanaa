"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import type React from "react";
import { createContext, useContext } from "react";
import { cn } from "@/lib/utils";

export type TabsVariant = "default" | "underline" | "pill";

const TabsVariantContext = createContext<TabsVariant>("default");

export function Tabs({
  className,
  ...props
}: TabsPrimitive.Root.Props): React.ReactElement {
  return (
    <TabsPrimitive.Root
      className={cn(
        "flex flex-col gap-2 data-[orientation=vertical]:flex-row",
        className,
      )}
      data-slot="tabs"
      {...props}
    />
  );
}

export function TabsList({
  variant = "default",
  className,
  children,
  ...props
}: TabsPrimitive.List.Props & {
  variant?: TabsVariant;
}): React.ReactElement {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.List
        className={cn(
          "relative z-0 flex w-fit items-center justify-center text-muted-foreground",
          "data-[orientation=vertical]:flex-col",
          variant === "default" && "gap-x-0.5 rounded-full bg-muted p-0.5 text-muted-foreground/72",
          variant === "underline" && "w-full justify-start gap-x-0 border-b border-border data-[orientation=horizontal]:py-0",
          variant === "pill" && "gap-1.5",
          className,
        )}
        data-slot="tabs-list"
        {...props}
      >
        {children}
        <TabsPrimitive.Indicator
          className={cn(
            "absolute bottom-0 left-0 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-(--active-tab-bottom) transition-[width,translate] duration-200 ease-in-out",
            variant === "underline"
              ? "z-10 bg-primary data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:-translate-x-px data-[orientation=horizontal]:translate-y-px"
              : variant === "pill"
              ? "-z-1 rounded-full bg-foreground"
              : "-z-1 rounded-full bg-background shadow-sm/5 dark:bg-input",
          )}
          data-slot="tab-indicator"
        />
      </TabsPrimitive.List>
    </TabsVariantContext.Provider>
  );
}

export function TabsTab({
  className,
  ...props
}: TabsPrimitive.Tab.Props): React.ReactElement {
  const variant = useContext(TabsVariantContext);
  return (
    <TabsPrimitive.Tab
      className={cn(
        "relative flex h-9 shrink-0 grow cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-[calc(--spacing(2.5)-1px)] font-medium text-base outline-none transition-[color,background-color,box-shadow] hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring data-disabled:pointer-events-none data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start data-active:text-foreground data-active:hover:text-foreground data-disabled:opacity-64 sm:h-8 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0",
        variant === "default" && "rounded-full data-active:bg-background dark:data-active:bg-input",
        variant === "underline" && "grow-0 rounded-none border-0 px-0 pb-3 mr-6 last:mr-0 bg-transparent hover:bg-transparent hover:text-foreground data-active:font-semibold data-[orientation=horizontal]:data-active:border-b-2 data-[orientation=horizontal]:data-active:border-primary",
        variant === "pill" && "rounded-full bg-muted px-4 hover:text-foreground data-active:bg-foreground data-active:text-background data-active:hover:text-background",
        className,
      )}
      data-slot="tabs-tab"
      {...props}
    />
  );
}

export function TabsPanel({
  className,
  ...props
}: TabsPrimitive.Panel.Props): React.ReactElement {
  return (
    <TabsPrimitive.Panel
      className={cn("flex-1 outline-none", className)}
      data-slot="tabs-content"
      {...props}
    />
  );
}

export { TabsPrimitive, TabsTab as TabsTrigger, TabsPanel as TabsContent };
