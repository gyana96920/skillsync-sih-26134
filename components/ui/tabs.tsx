"use client"

import * as React from "react"
import { cn } from "cn"

type TabsContextValue = { value?: string; onValueChange?: (value: string) => void }
const TabsContext = React.createContext<TabsContextValue>({})

function Tabs({ value, defaultValue, onValueChange, className, children, ...props }: React.ComponentProps<"div"> & { value?: string; defaultValue?: string; onValueChange?: (value: string) => void }) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const activeValue = value ?? internalValue
  return <TabsContext.Provider value={{ value: activeValue, onValueChange: (next) => { setInternalValue(next); onValueChange?.(next) } }}><div data-slot="tabs" className={cn("flex flex-col gap-2", className)} {...props}>{children}</div></TabsContext.Provider>
}

function TabsList({ className, ...props }: React.ComponentProps<"div">) { return <div role="tablist" data-slot="tabs-list" className={cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className)} {...props} /> }
function TabsTrigger({ value, className, ...props }: React.ComponentProps<"button"> & { value: string }) { const tabs = React.useContext(TabsContext); const active = tabs.value === value; return <button type="button" role="tab" aria-selected={active} data-state={active ? "active" : "inactive"} data-slot="tabs-trigger" onClick={() => tabs.onValueChange?.(value)} className={cn("inline-flex h-7 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className)} {...props} /> }
function TabsContent({ value, className, ...props }: React.ComponentProps<"div"> & { value: string }) { const tabs = React.useContext(TabsContext); if (tabs.value !== value) return null; return <div role="tabpanel" data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} /> }

export { Tabs, TabsList, TabsTrigger, TabsContent }
