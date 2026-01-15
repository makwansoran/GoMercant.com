'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { CreateMission } from '@/components/CreateMission';
import { ActivityFeed } from '@/components/ActivityFeed';
import { Messaging } from '@/components/Messaging';
import { Companies } from '@/components/Companies';
import { Projects } from '@/components/Projects';
import { Help } from '@/components/Help';
import { AccountSettings } from '@/components/AccountSettings';
import { Business } from '@/components/Business';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialView = searchParams.get('view') || 'network';
  const [activeView, setActiveView] = useState<string>(initialView);

  useEffect(() => {
    const viewParam = searchParams.get('view');
    if (viewParam) {
      setActiveView(viewParam);
    }
  }, [searchParams]);

  const renderContent = () => {
    switch (activeView) {
      case 'create':
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-hidden p-4 md:p-6">
              <CreateMission onNavigate={setActiveView} />
            </div>
          </div>
        );
      case 'activity':
        return (
          <div className="flex flex-col h-full">
            <div className="p-4 md:p-6 pb-0">
              <h1 className="text-2xl font-bold tracking-tight">My Activity</h1>
              <p className="text-muted-foreground">
                Track your submissions and mission progress.
              </p>
            </div>
            <div className="flex-1 overflow-hidden">
              <ActivityFeed />
            </div>
          </div>
        );
      case 'messages':
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-hidden">
              <Messaging />
            </div>
          </div>
        );
      case 'network':
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-hidden">
              <Companies />
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-hidden">
              <Projects onNavigate={setActiveView} />
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-hidden">
              <Help />
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-hidden">
              <AccountSettings />
            </div>
          </div>
        );
      case 'organization':
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-hidden">
              <Business />
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-hidden">
              <Companies />
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" activeView={activeView} onNavigate={setActiveView} />
      <SidebarInset>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </SidebarInset>
    </SidebarProvider>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <span className="loader"></span>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DashboardContent />
    </Suspense>
  );
}
