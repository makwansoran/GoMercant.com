"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavSecondary({
  items,
  activeView,
  onNavigate,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
  activeView?: string
  onNavigate?: (view: string) => void
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const handleClick = (url: string) => {
    const view = url.replace('#', '').split('?')[0];
    onNavigate?.(view);
  };

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                isActive={activeView === item.url.replace('#', '').split('?')[0]}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.url);
                }}
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
