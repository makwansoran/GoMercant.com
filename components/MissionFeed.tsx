'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { DeliverableType, Mission } from '@/lib/missions';
import { MissionCard } from './MissionCard';
import { MissionDetail } from './MissionDetail';
import { motion, LayoutGroup } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader2, Filter, Plus, X, Home } from 'lucide-react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';

const DELIVERABLE_TYPES: DeliverableType[] = ['Code', 'CAD', 'Data', 'Design', 'Autonomous Systems'];

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'code', label: 'Code' },
  { id: 'cad', label: 'CAD' },
  { id: 'data', label: 'Data' },
  { id: 'design', label: 'Design' },
  { id: 'autonomous', label: 'Autonomous' },
];

interface MissionFeedProps {
  onNavigate?: (view: string) => void;
}

export const MissionFeed: React.FC<MissionFeedProps> = ({ onNavigate }) => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<DeliverableType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showPostModal, setShowPostModal] = useState(false);
  const [checkingBusiness, setCheckingBusiness] = useState(false);

  const handlePostClick = async () => {
    const user = getCurrentUser();
    if (!user) {
      // Guest user - show modal
      setShowPostModal(true);
      return;
    }

    setCheckingBusiness(true);
    try {
      const response = await fetch(`/api/business/check?userId=${user.id}`);
      const data = await response.json();
      
      if (data.hasBusiness) {
        // User has a business - go directly to create
        onNavigate?.('create');
      } else {
        // User doesn't have a business - show modal
        setShowPostModal(true);
      }
    } catch (err) {
      console.error('Error checking business:', err);
      setShowPostModal(true);
    }
    setCheckingBusiness(false);
  };

  const fetchMissions = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/missions');
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Failed to fetch missions');
        return;
      }
      
      setMissions(data.missions || []);
    } catch (err) {
      setError('Failed to fetch missions');
      console.error('Fetch missions error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  // Filter by tab
  const tabFilteredMissions = useMemo(() => {
    switch (activeTab) {
      case 'code':
        return missions.filter(m => m.deliverableType === 'Code');
      case 'cad':
        return missions.filter(m => m.deliverableType === 'CAD');
      case 'data':
        return missions.filter(m => m.deliverableType === 'Data');
      case 'design':
        return missions.filter(m => m.deliverableType === 'Design');
      case 'autonomous':
        return missions.filter(m => m.deliverableType === 'Autonomous Systems');
      default:
        return missions;
    }
  }, [missions, activeTab]);

  const filteredMissions = useMemo(() => {
    return tabFilteredMissions.filter((mission) => {
      return selectedFilters.length === 0 || selectedFilters.includes(mission.deliverableType as DeliverableType);
    });
  }, [tabFilteredMissions, selectedFilters]);

  const toggleFilter = (type: DeliverableType) => {
    setSelectedFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Navbar with Tabs and Filter */}
      <div className="sticky top-0 bg-white border-b px-4 py-3 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <LayoutGroup>
            <div className="flex items-center gap-6">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative py-2 text-sm font-medium transition-colors"
                >
                  <span className={activeTab === tab.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}>
                    {tab.label}
                  </span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="missionFeedActiveTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </LayoutGroup>
          
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={handlePostClick} disabled={checkingBusiness} className="bg-orange-500 hover:bg-orange-600 text-white">
              {checkingBusiness ? (
                <>
                  Post
                  <span className="loader-sm ml-2"></span>
                </>
              ) : (
                <>
                  Post
                  <Plus className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                  {selectedFilters.length > 0 && (
                    <Badge className="ml-2" variant="secondary">
                      {selectedFilters.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Deliverable Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {DELIVERABLE_TYPES.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={selectedFilters.includes(type)}
                    onCheckedChange={() => toggleFilter(type)}
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={selectedFilters.length === 0}
                  onCheckedChange={clearFilters}
                >
                  Clear filters
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mission List */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <span className="loader mb-4"></span>
              <p className="text-muted-foreground text-sm">Loading procurements...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-destructive text-sm mb-2">{error}</p>
              <Button variant="outline" size="sm" onClick={fetchMissions}>
                Try Again
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* All Missions */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg">All Procurements</h2>
                  <span className="text-sm text-muted-foreground">{filteredMissions.length} procurements</span>
                </div>

                {filteredMissions.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid md:grid-cols-2 gap-4 auto-rows-fr"
                  >
                    {filteredMissions.map((mission) => (
                      <MissionCard
                        key={mission.id}
                        mission={mission}
                        onClick={setSelectedMission}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-muted-foreground text-sm">No procurements found</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {missions.length === 0 
                        ? 'Be the first to post a procurement!' 
                        : 'Try adjusting your filters or search'}
                    </p>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </div>

      {/* Mission Detail Modal */}
      {selectedMission && (
        <MissionDetail
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
        />
      )}

      {/* Post Procurement Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPostModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={() => setShowPostModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            {/* Header */}
            <div className="px-8 pt-8 pb-6 text-center">
              <h2 className="text-2xl font-bold mb-2">You need an organization to post procurements</h2>
              <p className="text-muted-foreground">
                Do you have a business, community or organization that needs technical people?
              </p>
            </div>

            {/* Options */}
            <div className="px-8 pb-8 space-y-6">
              <Link href="/business?type=startup" onClick={() => setShowPostModal(false)}>
                <button className="w-full p-4 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-colors">
                  <div className="flex items-center justify-center gap-2">
                    <Plus className="h-5 w-5" />
                    <span className="font-semibold">Start organization</span>
                  </div>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
