'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Users, 
  Globe, 
  ExternalLink,
  Briefcase,
  Star,
  User,
  Search,
  Rocket,
  Heart,
  Building,
  Store,
  Landmark,
  GraduationCap,
  X,
  Code,
  Palette,
  LineChart,
  Megaphone,
  Wrench,
  Database,
  Shield,
  Cpu,
  PenTool,
  Crown,
  MessageSquare,
  MoreHorizontal,
  Repeat2,
  Share,
  Loader2,
  MessageCircle,
  Plus
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { PostComposer } from './PostComposer';
import { MissionCard } from './MissionCard';
import { MissionDetail } from './MissionDetail';
import { Mission, DeliverableType } from '@/lib/missions';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';

interface Organization {
  id: string;
  name: string;
  slug: string;
  type: 'startup' | 'corporate' | 'smallbusiness' | 'community' | 'nonprofit' | 'agency' | 'government' | 'educational' | 'other';
  logo?: string;
  description?: string;
  industry?: string;
  location?: string;
  size?: string;
  website?: string;
  openMissions: number;
  rating: number;
  tags?: string[];
}

interface Person {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  title?: string;
  role: string;
  location?: string;
  skills: string[];
  rating: number;
  completedMissions: number;
  bio?: string;
}

interface PostAuthor {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

interface Post {
  id: string;
  content: string;
  images: string[];
  likes: number;
  reposts: number;
  views: number;
  authorId: string;
  author: PostAuthor | null;
  createdAt: string;
  updatedAt: string;
}

// Combined feed item type
type FeedItemType = 'post' | 'procurement';
interface FeedItem {
  type: FeedItemType;
  id: string;
  createdAt: string;
  data: Post | Mission;
}

type FilterType = 'feed' | 'browse' | 'people' | 'organizations';
type OrgTypeFilter = 'all' | 'startup' | 'corporate' | 'smallbusiness' | 'community' | 'nonprofit' | 'agency' | 'government' | 'educational';
type PeopleRoleFilter = 'all' | 'executive' | 'engineer' | 'designer' | 'developer' | 'data' | 'product' | 'marketing' | 'operations' | 'security';
type MissionTypeFilter = 'all' | 'Code' | 'CAD' | 'Data' | 'Design' | 'Autonomous Systems';

const filters: { id: FilterType; label: string }[] = [
  { id: 'feed', label: 'Feed' },
  { id: 'browse', label: 'Procurement' },
  { id: 'people', label: 'People' },
  { id: 'organizations', label: 'Organizations' },
];

const missionTypeFilters: { id: MissionTypeFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Code', label: 'Code' },
  { id: 'CAD', label: 'CAD' },
  { id: 'Data', label: 'Data' },
  { id: 'Design', label: 'Design' },
  { id: 'Autonomous Systems', label: 'Autonomous' },
];

const orgTypeFilters: { id: OrgTypeFilter; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'all', label: 'All', icon: Building2, color: 'bg-gray-100 text-gray-600' },
  { id: 'startup', label: 'Startups', icon: Rocket, color: 'bg-purple-100 text-purple-600' },
  { id: 'corporate', label: 'Companies', icon: Building, color: 'bg-blue-100 text-blue-600' },
  { id: 'smallbusiness', label: 'Small Business', icon: Store, color: 'bg-green-100 text-green-600' },
  { id: 'community', label: 'Communities', icon: Users, color: 'bg-orange-100 text-orange-600' },
  { id: 'nonprofit', label: 'Non-Profit', icon: Heart, color: 'bg-pink-100 text-pink-600' },
  { id: 'agency', label: 'Agencies', icon: Briefcase, color: 'bg-indigo-100 text-indigo-600' },
  { id: 'government', label: 'Government', icon: Landmark, color: 'bg-slate-100 text-slate-600' },
  { id: 'educational', label: 'Educational', icon: GraduationCap, color: 'bg-amber-100 text-amber-600' },
];

const peopleRoleFilters: { id: PeopleRoleFilter; label: string; icon: React.ElementType; color: string; keywords: string[] }[] = [
  { id: 'all', label: 'All', icon: Users, color: 'bg-gray-100 text-gray-600', keywords: [] },
  { id: 'executive', label: 'Executives', icon: Crown, color: 'bg-amber-100 text-amber-600', keywords: ['ceo', 'cto', 'cfo', 'coo', 'founder', 'co-founder', 'president', 'director', 'vp', 'chief', 'head of', 'lead'] },
  { id: 'engineer', label: 'Engineers', icon: Wrench, color: 'bg-blue-100 text-blue-600', keywords: ['engineer', 'engineering', 'mechanical', 'electrical', 'hardware', 'robotics', 'embedded'] },
  { id: 'developer', label: 'Developers', icon: Code, color: 'bg-green-100 text-green-600', keywords: ['developer', 'programmer', 'software', 'frontend', 'backend', 'fullstack', 'full-stack', 'web', 'mobile', 'ios', 'android'] },
  { id: 'designer', label: 'Designers', icon: Palette, color: 'bg-pink-100 text-pink-600', keywords: ['designer', 'design', 'ui', 'ux', 'graphic', 'visual', 'creative', 'art director'] },
  { id: 'data', label: 'Data & AI', icon: Database, color: 'bg-purple-100 text-purple-600', keywords: ['data', 'analyst', 'scientist', 'machine learning', 'ml', 'ai', 'artificial intelligence', 'analytics'] },
  { id: 'product', label: 'Product', icon: Cpu, color: 'bg-indigo-100 text-indigo-600', keywords: ['product', 'pm', 'product manager', 'product owner', 'scrum'] },
  { id: 'marketing', label: 'Marketing', icon: Megaphone, color: 'bg-orange-100 text-orange-600', keywords: ['marketing', 'growth', 'brand', 'content', 'seo', 'social media', 'communications'] },
  { id: 'operations', label: 'Operations', icon: LineChart, color: 'bg-teal-100 text-teal-600', keywords: ['operations', 'ops', 'supply chain', 'logistics', 'procurement', 'project manager'] },
  { id: 'security', label: 'Security', icon: Shield, color: 'bg-red-100 text-red-600', keywords: ['security', 'cybersecurity', 'infosec', 'penetration', 'compliance'] },
];

const getOrgTypeInfo = (type: string) => {
  const info = orgTypeFilters.find(f => f.id === type);
  return info || orgTypeFilters[0];
};

const getPeopleRoleInfo = (title: string) => {
  const lowerTitle = title?.toLowerCase() || '';
  for (const role of peopleRoleFilters) {
    if (role.keywords.some(keyword => lowerTitle.includes(keyword))) {
      return role;
    }
  }
  return peopleRoleFilters[0];
};

const matchesRoleFilter = (person: Person, filter: PeopleRoleFilter) => {
  if (filter === 'all') return true;
  const roleInfo = peopleRoleFilters.find(r => r.id === filter);
  if (!roleInfo) return true;
  const lowerTitle = person.title?.toLowerCase() || '';
  const lowerSkills = person.skills.map(s => s.toLowerCase()).join(' ');
  return roleInfo.keywords.some(keyword => 
    lowerTitle.includes(keyword) || lowerSkills.includes(keyword)
  );
};

export const Companies: React.FC = () => {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('feed');
  const [orgTypeFilter, setOrgTypeFilter] = useState<OrgTypeFilter>('all');
  const [peopleRoleFilter, setPeopleRoleFilter] = useState<PeopleRoleFilter>('all');
  const [missionTypeFilter, setMissionTypeFilter] = useState<MissionTypeFilter>('all');
  const [orgSearchQuery, setOrgSearchQuery] = useState('');
  const [peopleSearchQuery, setPeopleSearchQuery] = useState('');
  const [missionSearchQuery, setMissionSearchQuery] = useState('');
  const [loadingOrgs, setLoadingOrgs] = useState(false);
  const [loadingPeople, setLoadingPeople] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingMissions, setLoadingMissions] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [checkingBusiness, setCheckingBusiness] = useState(false);

  const handlePostProcurement = async () => {
    const user = getCurrentUser();
    if (!user) {
      setShowPostModal(true);
      return;
    }

    setCheckingBusiness(true);
    try {
      const response = await fetch(`/api/business/check?userId=${user.id}`);
      const data = await response.json();
      
      if (data.hasBusiness) {
        router.push('/dashboard?view=create');
      } else {
        setShowPostModal(true);
      }
    } catch (err) {
      console.error('Error checking business:', err);
      setShowPostModal(true);
    }
    setCheckingBusiness(false);
  };

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    setLoadingPosts(true);
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      if (response.ok) {
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoadingPosts(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostCreated = () => {
    fetchPosts();
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffSecs < 60) return `${diffSecs}s`;
      if (diffMins < 60) return `${diffMins}m`;
      if (diffHours < 24) return `${diffHours}h`;
      if (diffDays < 7) return `${diffDays}d`;
      
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return 'recently';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // Fetch missions
  const fetchMissions = useCallback(async () => {
    setLoadingMissions(true);
    try {
      const response = await fetch('/api/missions');
      const data = await response.json();
      if (response.ok) {
        setMissions(data.missions || []);
      }
    } catch (error) {
      console.error('Error fetching missions:', error);
    } finally {
      setLoadingMissions(false);
    }
  }, []);

  useEffect(() => {
    fetchMissions();
  }, [fetchMissions]);

  // Filter missions
  const filteredMissions = missions.filter(mission => {
    const matchesType = missionTypeFilter === 'all' || mission.deliverableType === missionTypeFilter;
    const matchesSearch = missionSearchQuery === '' || 
      mission.title.toLowerCase().includes(missionSearchQuery.toLowerCase()) ||
      mission.description?.toLowerCase().includes(missionSearchQuery.toLowerCase()) ||
      mission.posterName?.toLowerCase().includes(missionSearchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Fetch organizations
  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoadingOrgs(true);
      try {
        const response = await fetch('/api/business/public');
        if (response.ok) {
          const data = await response.json();
          setOrganizations(data.businesses || []);
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
      } finally {
        setLoadingOrgs(false);
      }
    };

    fetchOrganizations();
  }, []);

  // Fetch people
  useEffect(() => {
    const fetchPeople = async () => {
      setLoadingPeople(true);
      try {
        const response = await fetch('/api/users/public');
        if (response.ok) {
          const data = await response.json();
          setPeople(data.users || []);
        }
      } catch (error) {
        console.error('Error fetching people:', error);
      } finally {
        setLoadingPeople(false);
      }
    };

    fetchPeople();
  }, []);

  // Filter organizations based on type and search
  const filteredOrganizations = organizations.filter(org => {
    const matchesType = orgTypeFilter === 'all' || org.type === orgTypeFilter;
    const matchesSearch = orgSearchQuery === '' || 
      org.name.toLowerCase().includes(orgSearchQuery.toLowerCase()) ||
      org.description?.toLowerCase().includes(orgSearchQuery.toLowerCase()) ||
      org.industry?.toLowerCase().includes(orgSearchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Filter people based on role and search
  const filteredPeople = people.filter(person => {
    const matchesRole = matchesRoleFilter(person, peopleRoleFilter);
    const matchesSearch = peopleSearchQuery === '' || 
      person.name.toLowerCase().includes(peopleSearchQuery.toLowerCase()) ||
      person.title?.toLowerCase().includes(peopleSearchQuery.toLowerCase()) ||
      person.skills.some(s => s.toLowerCase().includes(peopleSearchQuery.toLowerCase())) ||
      person.bio?.toLowerCase().includes(peopleSearchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const showOrganizations = activeFilter === 'organizations';
  const showPeople = activeFilter === 'people';
  const showFeed = activeFilter === 'feed';
  const showBrowse = activeFilter === 'browse';

  const loading = (activeFilter === 'organizations' && loadingOrgs) || 
                  (activeFilter === 'people' && loadingPeople);

  const hasContent = (showOrganizations && filteredOrganizations.length > 0) || 
                     (showPeople && filteredPeople.length > 0);

  // Combine posts and missions into a single feed, sorted by date
  const combinedFeed: FeedItem[] = React.useMemo(() => {
    const postItems: FeedItem[] = posts.map(post => ({
      type: 'post' as FeedItemType,
      id: `post-${post.id}`,
      createdAt: post.createdAt,
      data: post
    }));

    const missionItems: FeedItem[] = missions.map(mission => ({
      type: 'procurement' as FeedItemType,
      id: `procurement-${mission.id}`,
      createdAt: mission.createdAt,
      data: mission
    }));

    return [...postItems, ...missionItems].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [posts, missions]);

  return (
    <div className="flex flex-col h-full px-4 py-6 pb-24 overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="max-w-4xl mx-auto w-full space-y-6">
          {/* Filter Tabs */}
          <div className="flex gap-6 border-b">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className="relative py-3 text-sm font-medium transition-colors"
              >
                <span className={activeFilter === filter.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}>
                  {filter.label}
                </span>
                {activeFilter === filter.id && (
                  <motion.div
                    layoutId="networkActiveTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* People Tab Content */}
          {activeFilter === 'people' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search people by name, title, or skills..."
                  value={peopleSearchQuery}
                  onChange={(e) => setPeopleSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                />
                {peopleSearchQuery && (
                  <button
                    onClick={() => setPeopleSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>

              {/* People Role Filters */}
              <div className="flex flex-wrap gap-2">
                {peopleRoleFilters.map((role) => {
                  const Icon = role.icon;
                  const isActive = peopleRoleFilter === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setPeopleRoleFilter(role.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        isActive 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {role.label}
                    </button>
                  );
                })}
              </div>

              {/* Results Count */}
              <div className="text-sm text-muted-foreground">
                {loadingPeople ? (
                  <span className="flex items-center gap-2">
                    <span className="loader-sm"></span>
                    Searching...
                  </span>
                ) : (
                  <span>
                    {filteredPeople.length} {filteredPeople.length === 1 ? 'person' : 'people'} found
                    {peopleRoleFilter !== 'all' && ` in ${peopleRoleFilters.find(f => f.id === peopleRoleFilter)?.label}`}
                    {peopleSearchQuery && ` matching "${peopleSearchQuery}"`}
                  </span>
                )}
              </div>
            </motion.div>
          )}

          {/* Browse Tab Content */}
          {activeFilter === 'browse' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Search Bar with Post Button */}
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search procurements by title, description, or poster..."
                    value={missionSearchQuery}
                    onChange={(e) => setMissionSearchQuery(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  {missionSearchQuery && (
                    <button
                      onClick={() => setMissionSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
                <Button 
                  onClick={handlePostProcurement} 
                  disabled={checkingBusiness}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {checkingBusiness ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-1" />
                      Post
                    </>
                  )}
                </Button>
              </div>

              {/* Mission Type Filters */}
              <div className="flex flex-wrap gap-2">
                {missionTypeFilters.map((type) => {
                  const isActive = missionTypeFilter === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setMissionTypeFilter(type.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        isActive 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {type.label}
                    </button>
                  );
                })}
              </div>

              {/* Results Count */}
              <div className="text-sm text-muted-foreground">
                {loadingMissions ? (
                  <span className="flex items-center gap-2">
                    <span className="loader-sm"></span>
                    Searching...
                  </span>
                ) : (
                  <span>
                    {filteredMissions.length} procurement{filteredMissions.length !== 1 ? 's' : ''} found
                    {missionTypeFilter !== 'all' && ` in ${missionTypeFilter}`}
                    {missionSearchQuery && ` matching "${missionSearchQuery}"`}
                  </span>
                )}
              </div>

              {/* Mission Cards Grid */}
              {!loadingMissions && filteredMissions.length > 0 && (
                <div className="grid grid-cols-1 gap-4">
                  {filteredMissions.map((mission) => (
                    <MissionCard
                      key={mission.id}
                      mission={mission}
                      onClick={setSelectedMission}
                    />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loadingMissions && filteredMissions.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">
                      {missionSearchQuery 
                        ? `No procurements found matching "${missionSearchQuery}"` 
                        : 'No procurements found'}
                    </p>
                    {(missionSearchQuery || missionTypeFilter !== 'all') && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setMissionSearchQuery('');
                          setMissionTypeFilter('all');
                        }}
                      >
                        Clear filters
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}

          {/* Organizations Tab Content */}
          {activeFilter === 'organizations' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search organizations by name, industry, or description..."
                  value={orgSearchQuery}
                  onChange={(e) => setOrgSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                />
                {orgSearchQuery && (
                  <button
                    onClick={() => setOrgSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>

              {/* Organization Type Filters */}
              <div className="flex flex-wrap gap-2">
                {orgTypeFilters.map((type) => {
                  const Icon = type.icon;
                  const isActive = orgTypeFilter === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setOrgTypeFilter(type.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        isActive 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {type.label}
                    </button>
                  );
                })}
              </div>

              {/* Results Count */}
              <div className="text-sm text-muted-foreground">
                {loadingOrgs ? (
                  <span className="flex items-center gap-2">
                    <span className="loader-sm"></span>
                    Searching...
                  </span>
                ) : (
                  <span>
                    {filteredOrganizations.length} organization{filteredOrganizations.length !== 1 ? 's' : ''} found
                    {orgTypeFilter !== 'all' && ` in ${orgTypeFilters.find(f => f.id === orgTypeFilter)?.label}`}
                    {orgSearchQuery && ` matching "${orgSearchQuery}"`}
                  </span>
                )}
              </div>
            </motion.div>
          )}

          {/* Feed Content */}
          {showFeed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Post Composer */}
              <Card className="overflow-hidden">
                <PostComposer onPostCreated={handlePostCreated} />
              </Card>

              {/* Combined Feed List */}
              {(loadingPosts || loadingMissions) ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-orange-500 mb-4" />
                  <p className="text-muted-foreground text-sm">Loading feed...</p>
                </div>
              ) : combinedFeed.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-6">
                    <MessageCircle className="h-8 w-8 text-orange-500" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Welcome to the Feed!</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    This is where you'll see announcements and opinions. Be the first to share something!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {combinedFeed.map((item, index) => {
                      // Render Post
                      if (item.type === 'post') {
                        const post = item.data as Post;
                        return (
                          <motion.article
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.03 }}
                          >
                            <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
                              <CardContent className="p-4">
                                <div className="flex gap-3">
                                  {/* Author Avatar */}
                                  <div className="flex-shrink-0">
                                    {post.author?.avatar ? (
                                      <img 
                                        src={post.author.avatar} 
                                        alt={post.author.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">
                                        {post.author?.name?.charAt(0).toUpperCase() || '?'}
                                      </div>
                                    )}
                                  </div>

                                  {/* Post Content */}
                                  <div className="flex-1 min-w-0">
                                    {/* Author Info */}
                                    <div className="flex items-center gap-1 mb-0.5">
                                      <span className="font-bold text-[15px] hover:underline truncate">
                                        {post.author?.name || 'Unknown User'}
                                      </span>
                                      <span className="text-muted-foreground text-[15px]">·</span>
                                      <span className="text-muted-foreground text-[15px]">
                                        {formatTimeAgo(post.createdAt)}
                                      </span>
                                      <div className="ml-auto">
                                        <button className="p-1.5 rounded-full hover:bg-orange-50 text-muted-foreground hover:text-orange-500 transition-colors">
                                          <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Post Text */}
                                    <p className="text-[15px] leading-normal whitespace-pre-wrap break-words">
                                      {post.content}
                                    </p>

                                    {/* Images */}
                                    {post.images && post.images.length > 0 && (
                                      <div className={`mt-3 grid gap-0.5 rounded-2xl overflow-hidden border border-gray-200 ${
                                        post.images.length === 1 ? 'grid-cols-1' : 
                                        post.images.length === 2 ? 'grid-cols-2' : 
                                        post.images.length === 3 ? 'grid-cols-2' : 
                                        'grid-cols-2'
                                      }`}>
                                        {post.images.map((img, imgIndex) => (
                                          <div
                                            key={imgIndex}
                                            className={`relative ${
                                              post.images.length === 3 && imgIndex === 0 ? 'row-span-2' : ''
                                            }`}
                                          >
                                            <img
                                              src={img}
                                              alt={`Post image ${imgIndex + 1}`}
                                              className={`w-full object-cover ${
                                                post.images.length === 1 ? 'max-h-[512px]' : 
                                                post.images.length === 3 && imgIndex === 0 ? 'h-full' :
                                                'h-40'
                                              }`}
                                            />
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-between mt-3 max-w-md">
                                      {/* Reply */}
                                      <button className="group flex items-center gap-2 text-muted-foreground hover:text-orange-500 transition-colors">
                                        <div className="p-2 rounded-full group-hover:bg-orange-50 transition-colors">
                                          <MessageCircle className="w-[18px] h-[18px]" />
                                        </div>
                                        <span className="text-[13px]">0</span>
                                      </button>

                                      {/* Repost */}
                                      <button className="group flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors">
                                        <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
                                          <Repeat2 className="w-[18px] h-[18px]" />
                                        </div>
                                        <span className="text-[13px]">{post.reposts > 0 ? formatNumber(post.reposts) : ''}</span>
                                      </button>

                                      {/* Like */}
                                      <button className="group flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
                                        <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
                                          <Heart className="w-[18px] h-[18px]" />
                                        </div>
                                        <span className="text-[13px]">{post.likes > 0 ? formatNumber(post.likes) : ''}</span>
                                      </button>

                                      {/* Share */}
                                      <button className="group flex items-center gap-2 text-muted-foreground hover:text-orange-500 transition-colors">
                                        <div className="p-2 rounded-full group-hover:bg-orange-50 transition-colors">
                                          <Share className="w-[18px] h-[18px]" />
                                        </div>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.article>
                        );
                      }

                      // Render Procurement
                      if (item.type === 'procurement') {
                        const mission = item.data as Mission;
                        return (
                          <motion.article
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.03 }}
                          >
                            <Card className="hover:bg-gray-50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex gap-3">
                                  {/* Company Logo */}
                                  <div className="flex-shrink-0">
                                    {mission.posterLogo ? (
                                      <img 
                                        src={mission.posterLogo} 
                                        alt={mission.posterName}
                                        className="w-10 h-10 rounded-lg object-cover"
                                      />
                                    ) : (
                                      <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-semibold text-sm">
                                        {mission.posterName?.charAt(0).toUpperCase() || 'O'}
                                      </div>
                                    )}
                                  </div>

                                  {/* Procurement Content */}
                                  <div className="flex-1 min-w-0">
                                    {/* Company Info */}
                                    <div className="flex items-center gap-1 mb-2">
                                      <span className="font-bold text-[15px] hover:underline truncate">
                                        {mission.posterName}
                                      </span>
                                      <span className="text-muted-foreground text-[15px]">·</span>
                                      <span className="text-muted-foreground text-[15px]">
                                        {formatTimeAgo(mission.createdAt)}
                                      </span>
                                      <div className="ml-auto">
                                        <button className="p-1.5 rounded-full hover:bg-orange-50 text-muted-foreground hover:text-orange-500 transition-colors">
                                          <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Announcement Text */}
                                    <p className="text-[15px] text-muted-foreground mb-3">
                                      Just posted a new procurement
                                    </p>

                                    {/* Embedded Mission Card */}
                                    <div onClick={() => setSelectedMission(mission)}>
                                      <MissionCard
                                        mission={mission}
                                        onClick={setSelectedMission}
                                      />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-between mt-3 max-w-md">
                                      {/* Reply */}
                                      <button className="group flex items-center gap-2 text-muted-foreground hover:text-orange-500 transition-colors">
                                        <div className="p-2 rounded-full group-hover:bg-orange-50 transition-colors">
                                          <MessageCircle className="w-[18px] h-[18px]" />
                                        </div>
                                        <span className="text-[13px]">0</span>
                                      </button>

                                      {/* Repost */}
                                      <button className="group flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors">
                                        <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
                                          <Repeat2 className="w-[18px] h-[18px]" />
                                        </div>
                                      </button>

                                      {/* Like */}
                                      <button className="group flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
                                        <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
                                          <Heart className="w-[18px] h-[18px]" />
                                        </div>
                                      </button>

                                      {/* Share */}
                                      <button className="group flex items-center gap-2 text-muted-foreground hover:text-orange-500 transition-colors">
                                        <div className="p-2 rounded-full group-hover:bg-orange-50 transition-colors">
                                          <Share className="w-[18px] h-[18px]" />
                                        </div>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.article>
                        );
                      }

                      return null;
                    })}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}

          {/* People & Organizations Content */}
          {(showPeople || showOrganizations) && (
            <div className="grid gap-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <span className="loader mb-4"></span>
                  <p className="text-muted-foreground text-sm">Loading...</p>
                </div>
              ) : !hasContent ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    {activeFilter === 'people' ? (
                      <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    ) : (
                      <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    )}
                    <p className="text-muted-foreground mb-2">
                      {activeFilter === 'organizations' 
                        ? orgSearchQuery 
                          ? `No organizations found matching "${orgSearchQuery}"` 
                          : 'No organizations found'
                        : peopleSearchQuery
                          ? `No people found matching "${peopleSearchQuery}"`
                          : 'No people found'}
                    </p>
                    {activeFilter === 'organizations' && (orgSearchQuery || orgTypeFilter !== 'all') && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setOrgSearchQuery('');
                          setOrgTypeFilter('all');
                        }}
                      >
                        Clear filters
                      </Button>
                    )}
                    {activeFilter === 'people' && (peopleSearchQuery || peopleRoleFilter !== 'all') && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setPeopleSearchQuery('');
                          setPeopleRoleFilter('all');
                        }}
                      >
                        Clear filters
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
              <AnimatePresence mode="popLayout">
                {/* People */}
                {showPeople && filteredPeople.map((person, index) => {
                  const roleInfo = getPeopleRoleInfo(person.title || '');
                  const RoleIcon = roleInfo.icon;
                  return (
                    <motion.div
                      key={person.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="hover:shadow-md transition-all hover:border-orange-200">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16">
                              {person.avatar && (
                                <AvatarImage src={person.avatar} alt={person.name} />
                              )}
                              <AvatarFallback className={`${roleInfo.color} text-xl font-semibold`}>
                                {person.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-lg">{person.name}</h3>
                                    {person.title && roleInfo.id !== 'all' && (
                                      <Badge variant="secondary" className={`${roleInfo.color} text-xs`}>
                                        <RoleIcon className="h-3 w-3 mr-1" />
                                        {roleInfo.label}
                                      </Badge>
                                    )}
                                  </div>
                                  {person.title && (
                                    <p className="text-sm text-muted-foreground">{person.title}</p>
                                  )}
                                  {person.location && (
                                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                      <MapPin className="h-3 w-3" />
                                      {person.location}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 text-amber-500">
                                  <Star className="h-4 w-4 fill-current" />
                                  <span className="text-sm font-medium">{person.rating?.toFixed(1) || '5.0'}</span>
                                </div>
                              </div>
                              {person.bio && (
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                  {person.bio}
                                </p>
                              )}
                              <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-2">
                                  {person.skills.slice(0, 4).map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                  {person.skills.length > 4 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{person.skills.length - 4} more
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm">
                                    <MessageSquare className="h-4 w-4 mr-1" />
                                    Message
                                  </Button>
                                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                                    View Profile
                                  </Button>
                                </div>
                              </div>
                              {person.completedMissions > 0 && (
                                <div className="mt-3 text-xs text-muted-foreground">
                                  <Briefcase className="h-3 w-3 inline mr-1" />
                                  {person.completedMissions} procurement{person.completedMissions !== 1 ? 's' : ''} completed
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}

                {/* Organizations */}
                {showOrganizations && filteredOrganizations.map((org, index) => {
                  const typeInfo = getOrgTypeInfo(org.type);
                  const TypeIcon = typeInfo.icon;
                  return (
                    <motion.div
                      key={org.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="hover:shadow-md transition-all hover:border-orange-200">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`h-16 w-16 rounded-xl overflow-hidden flex-shrink-0 ${!org.logo ? typeInfo.color : ''}`}>
                              {org.logo ? (
                                <img src={org.logo} alt={org.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xl font-semibold">
                                  {org.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-lg">{org.name}</h3>
                                    <Badge variant="secondary" className={`${typeInfo.color} text-xs`}>
                                      <TypeIcon className="h-3 w-3 mr-1" />
                                      {typeInfo.label}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    {org.industry && (
                                      <Badge variant="outline">{org.industry}</Badge>
                                    )}
                                    {org.location && (
                                      <span className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {org.location}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 text-amber-500">
                                  <Star className="h-4 w-4 fill-current" />
                                  <span className="text-sm font-medium">{org.rating?.toFixed(1) || '5.0'}</span>
                                </div>
                              </div>
                              {org.description && (
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                  {org.description}
                                </p>
                              )}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  {org.size && (
                                    <span className="flex items-center gap-1">
                                      <Users className="h-4 w-4" />
                                      {org.size} employees
                                    </span>
                                  )}
                                  <span className="flex items-center gap-1">
                                    <Briefcase className="h-4 w-4" />
                                    {org.openMissions || 0} open procurements
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {org.website && (
                                    <Button variant="ghost" size="sm" asChild>
                                      <a href={org.website} target="_blank" rel="noopener noreferrer">
                                        <Globe className="h-4 w-4 mr-1" />
                                        Website
                                        <ExternalLink className="h-3 w-3 ml-1" />
                                      </a>
                                    </Button>
                                  )}
                                  <Button 
                                    size="sm" 
                                    className="bg-orange-500 hover:bg-orange-600"
                                    onClick={() => router.push(`/business/${org.id}`)}
                                  >
                                    View
                                  </Button>
                                </div>
                              </div>
                              {org.tags && org.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {org.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              )}
            </div>
          )}
        </div>
      </motion.div>

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
