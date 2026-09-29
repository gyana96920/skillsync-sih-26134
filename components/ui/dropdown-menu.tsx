"use client"

import * as React from "react"
import { cn } from "cn"

const DropdownMenuContext = React.createContext<{ open: boolean; setOpen: (open: boolean) => void }>({ open: false, setOpen: () => {} })
function DropdownMenu({ children }: { children: React.ReactNode }) { const [open, setOpen] = React.useState(false); return <DropdownMenuContext.Provider value={{ open, setOpen }}><div data-slot="dropdown-menu" className="relative inline-block">{children}</div></DropdownMenuContext.Provider> }
function DropdownMenuTrigger({ asChild, children, className, ...props }: React.ComponentProps<"button"> & { asChild?: boolean }) { const { open, setOpen } = React.useContext(DropdownMenuContext); if (asChild && React.isValidElement(children)) return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, { onClick: () => setOpen(!open) }); return <button type="button" aria-expanded={open} data-slot="dropdown-menu-trigger" className={className} onClick={() => setOpen(!open)} {...props}>{children}</button> }
function DropdownMenuContent({ className, children, ...props }: React.ComponentProps<"div">) { const { open } = React.useContext(DropdownMenuContext); if (!open) return null; return <div role="menu" data-slot="dropdown-menu-content" className={cn("absolute right-0 z-50 mt-2 min-w-32 rounded-lg border bg-popover p-1 text-popover-foreground shadow-md", className)} {...props}>{children}</div> }
function DropdownMenuItem({ className, onClick, ...props }: React.ComponentProps<"button">) { const { setOpen } = React.useContext(DropdownMenuContext); return <button type="button" role="menuitem" data-slot="dropdown-menu-item" className={cn("flex w-full items-center rounded-md px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground", className)} onClick={(event) => { onClick?.(event); setOpen(false) }} {...props} /> }
function DropdownMenuLabel({ className, ...props }: React.ComponentProps<"div">) { return <div data-slot="dropdown-menu-label" className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} /> }
function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<"div">) { return <div role="separator" data-slot="dropdown-menu-separator" className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} /> }
function DropdownMenuGroup({ className, ...props }: React.ComponentProps<"div">) { return <div role="group" data-slot="dropdown-menu-group" className={cn(className)} {...props} /> }
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup }
