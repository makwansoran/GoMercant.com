'use client'

import { useRouter } from 'next/navigation'
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { OrganizationManage } from "@/components/OrganizationManage"

export default function OrganizationManagePage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const handleNavigate = (view: string) => {
    router.push(`/dashboard?view=${view}`)
  }

  return (
    <SidebarProvider>
      <AppSidebar activeView="business" onNavigate={handleNavigate} />
      <SidebarInset>
        <OrganizationManage organizationId={params.id} />
      </SidebarInset>
    </SidebarProvider>
  )
}
