"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  HelpCircleIcon,
  Building2Icon,
  MessageSquareIcon,
  FolderIcon,
  BuildingIcon,
} from "lucide-react"
import Image from "next/image"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { getCurrentUser } from "@/lib/auth"

const data = {
  user: {
    name: "Guest",
    email: "guest@example.com",
    avatar: "👤",
  },
  navMain: [
    {
      title: "Network",
      url: "#network",
      icon: Building2Icon,
    },
    {
      title: "Projects",
      url: "#projects",
      icon: FolderIcon,
    },
    {
      title: "Messaging",
      url: "#messages",
      icon: MessageSquareIcon,
    },
    {
      title: "Organization",
      url: "#organization",
      icon: BuildingIcon,
    },
  ],
  navSecondary: [
    {
      title: "Help",
      url: "#help",
      icon: HelpCircleIcon,
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeView?: string;
  onNavigate?: (view: string) => void;
}

export function AppSidebar({ activeView = 'messages', onNavigate, ...props }: AppSidebarProps) {
  const [user, setUser] = useState(data.user);

  useEffect(() => {
    // Get authenticated user if available
    const authUser = getCurrentUser();
    if (authUser) {
      setUser({
        name: authUser.name,
        email: authUser.email,
        avatar: authUser.role === 'admin' ? '👑' : '👤',
      });
    }
  }, []);

  const handleNavClick = (url: string) => {
    const view = url.replace('#', '').split('?')[0];
    onNavigate?.(view);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:!p-1.5"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#missions');
              }}
            >
              <Image
                src="/favicon.png"
                alt="GoMercant Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={activeView === item.url.replace('#', '').split('?')[0]}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.url);
                    }}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <NavSecondary items={data.navSecondary} activeView={activeView} onNavigate={onNavigate} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} onNavigate={onNavigate} />
      </SidebarFooter>
    </Sidebar>
  )
}
