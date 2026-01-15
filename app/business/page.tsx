'use client'

import { useRouter } from 'next/navigation'
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Business } from "@/components/Business"

export default function BusinessPage() {
  const router = useRouter()

  const handleNavigate = (view: string) => {
    // Navigate to dashboard with the selected view
    router.push(`/dashboard?view=${view}`)
  }

  return (
    <SidebarProvider>
      <AppSidebar activeView="business" onNavigate={handleNavigate} />
      <SidebarInset>
        <Business />
      </SidebarInset>
    </SidebarProvider>
  )
}
