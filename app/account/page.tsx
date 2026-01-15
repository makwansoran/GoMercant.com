'use client'

import { useRouter } from 'next/navigation'
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AccountSettings } from "@/components/AccountSettings"

export default function AccountPage() {
  const router = useRouter()

  const handleNavigate = (view: string) => {
    // Navigate to dashboard with the selected view
    router.push(`/dashboard?view=${view}`)
  }

  return (
    <SidebarProvider>
      <AppSidebar activeView="account" onNavigate={handleNavigate} />
      <SidebarInset>
        <AccountSettings />
      </SidebarInset>
    </SidebarProvider>
  )
}
