'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Rocket, 
  Users, 
  Heart,
  Briefcase,
  Globe,
  Plus,
  X,
  MapPin,
  ExternalLink,
  Star,
  Settings,
  ChevronRight,
  Building,
  Store,
  Landmark,
  GraduationCap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCurrentUser } from '@/lib/auth';

const locationOptions = [
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "France",
  "Netherlands",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Australia",
  "Japan",
  "Singapore",
  "India",
  "Brazil",
  "Remote / Global",
];

const industryOptions = [
  "Technology",
  "Software Development",
  "Artificial Intelligence",
  "Robotics",
  "Aerospace",
  "Automotive",
  "Healthcare",
  "Biotechnology",
  "Finance",
  "E-commerce",
  "Manufacturing",
  "Energy",
  "Education",
  "Media & Entertainment",
  "Telecommunications",
  "Other",
];

interface Business {
  id: string;
  name: string;
  slug: string;
  type: 'startup' | 'corporate' | 'smallbusiness' | 'community' | 'nonprofit' | 'agency' | 'government' | 'educational' | 'other';
  description?: string;
  logo?: string;
  banner?: string;
  website?: string;
  location?: string;
  industry?: string;
  size?: string;
  founded?: string;
  rating: number;
  openMissions: number;
  tags?: string[];
  createdAt: string;
}

type BusinessType = 'startup' | 'corporate' | 'smallbusiness' | 'community' | 'nonprofit' | 'agency' | 'government' | 'educational' | 'other';

interface BusinessTypeOption {
  id: BusinessType;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const businessTypes: BusinessTypeOption[] = [
  {
    id: 'startup',
    label: 'Startup',
    description: 'Early-stage venture building innovative products',
    icon: Rocket,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10 hover:bg-orange-500/20'
  },
  {
    id: 'corporate',
    label: 'Corporate',
    description: 'Large established corporation or enterprise',
    icon: Building,
    color: 'text-blue-600',
    bgColor: 'bg-blue-600/10 hover:bg-blue-600/20'
  },
  {
    id: 'smallbusiness',
    label: 'Small Business',
    description: 'Private small to medium-sized business',
    icon: Store,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10 hover:bg-emerald-500/20'
  },
  {
    id: 'community',
    label: 'Community',
    description: 'Open source project or interest group',
    icon: Users,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10 hover:bg-purple-500/20'
  },
  {
    id: 'nonprofit',
    label: 'Non-Profit',
    description: 'Charity, foundation, or social enterprise',
    icon: Heart,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10 hover:bg-pink-500/20'
  },
  {
    id: 'agency',
    label: 'Agency',
    description: 'Consulting firm or service provider',
    icon: Briefcase,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10 hover:bg-cyan-500/20'
  },
  {
    id: 'government',
    label: 'Government',
    description: 'Public sector or government agency',
    icon: Landmark,
    color: 'text-slate-600',
    bgColor: 'bg-slate-600/10 hover:bg-slate-600/20'
  },
  {
    id: 'educational',
    label: 'Educational',
    description: 'University, school, or research institution',
    icon: GraduationCap,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10 hover:bg-amber-500/20'
  },
  {
    id: 'other',
    label: 'Other',
    description: 'Something else entirely',
    icon: Globe,
    color: 'text-gray-500',
    bgColor: 'bg-gray-500/10 hover:bg-gray-500/20'
  }
];

type OrgTab = 'my-organizations' | 'following';

export const Business: React.FC = () => {
  const router = useRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [followedOrgs, setFollowedOrgs] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<OrgTab>('my-organizations');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createStep, setCreateStep] = useState<'type' | 'details'>('type');
  const [selectedType, setSelectedType] = useState<BusinessType | null>(null);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    industry: ''
  });

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const user = getCurrentUser();
      if (!user) {
        setLoading(false);
        return;
      }
      
      const response = await fetch(`/api/business?userId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setBusinesses(data.businesses || []);
      }
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBusiness = async () => {
    if (!selectedType || !formData.name.trim()) return;
    
    const user = getCurrentUser();
    if (!user) return;
    
    setCreating(true);
    try {
      const response = await fetch('/api/business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedType,
          name: formData.name.trim(),
          description: formData.description.trim() || undefined,
          website: formData.website.trim() || undefined,
          location: formData.location.trim() || undefined,
          industry: formData.industry.trim() || undefined,
          userId: user.id
        })
      });

      if (response.ok) {
        const data = await response.json();
        setBusinesses(prev => [data.business, ...prev]);
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error creating business:', error);
    } finally {
      setCreating(false);
    }
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setCreateStep('type');
    setSelectedType(null);
    setFormData({ name: '', description: '', website: '', location: '', industry: '' });
  };

  const handleSelectType = (type: BusinessType) => {
    setSelectedType(type);
    setCreateStep('details');
  };

  const getTypeIcon = (type: BusinessType) => {
    const typeOption = businessTypes.find(t => t.id === type);
    return typeOption?.icon || Building2;
  };

  const getTypeColor = (type: BusinessType) => {
    const typeOption = businessTypes.find(t => t.id === type);
    return typeOption?.color || 'text-gray-500';
  };

  const getTypeLabel = (type: BusinessType) => {
    const typeOption = businessTypes.find(t => t.id === type);
    return typeOption?.label || type;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full px-4 py-6 pb-24 overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="max-w-4xl mx-auto w-full space-y-6">
          {/* Tabs Navbar */}
          <div className="flex items-center justify-between border-b">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('my-organizations')}
                className="relative py-3 text-sm font-medium transition-colors"
              >
                <span className={activeTab === 'my-organizations' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}>
                  My Organizations
                </span>
                {activeTab === 'my-organizations' && (
                  <motion.div
                    layoutId="orgActiveTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('following')}
                className="relative py-3 text-sm font-medium transition-colors"
              >
                <span className={activeTab === 'following' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}>
                  Following
                </span>
                {activeTab === 'following' && (
                  <motion.div
                    layoutId="orgActiveTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            </div>
            {activeTab === 'my-organizations' && businesses.length > 0 && (
              <Button onClick={() => setShowCreateModal(true)} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New
              </Button>
            )}
          </div>

          {/* My Organizations Tab */}
          {activeTab === 'my-organizations' && (
            <>
              {businesses.length === 0 ? (
            /* Empty State */
            <Card className="border-dashed">
              <CardContent className="py-16 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No organizations yet</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Create your first organization to start posting missions, building your team, and growing your network.
                </p>
                <Button size="lg" onClick={() => setShowCreateModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Organization
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Business List */
            <div className="grid gap-4">
              {businesses.map((business) => {
                const TypeIcon = getTypeIcon(business.type);
                return (
                  <Card key={business.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {business.logo ? (
                          <img 
                            src={business.logo} 
                            alt={business.name}
                            className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className={`h-16 w-16 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(business.type).replace('text-', 'bg-').replace('500', '100')}`}>
                            <TypeIcon className={`h-8 w-8 ${getTypeColor(business.type)}`} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{business.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Badge variant="secondary" className={getTypeColor(business.type)}>
                                  {getTypeLabel(business.type)}
                                </Badge>
                                {business.location && (
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {business.location}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {business.rating > 0 && (
                                <div className="flex items-center gap-1 text-amber-500">
                                  <Star className="h-4 w-4 fill-current" />
                                  <span className="text-sm font-medium">{business.rating.toFixed(1)}</span>
                                </div>
                              )}
                              <Button variant="ghost" size="icon">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {business.description && (
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {business.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              {business.industry && (
                                <Badge variant="outline">{business.industry}</Badge>
                              )}
                              <span className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                {business.openMissions} open missions
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {business.website && (
                                <Button variant="ghost" size="sm" asChild>
                                  <a href={business.website} target="_blank" rel="noopener noreferrer">
                                    <Globe className="h-4 w-4 mr-1" />
                                    Website
                                    <ExternalLink className="h-3 w-3 ml-1" />
                                  </a>
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                className="bg-orange-500 hover:bg-orange-600 text-white"
                                onClick={() => router.push(`/business/${business.id}`)}
                              >
                                Manage
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
            </>
          )}

          {/* Following Tab */}
          {activeTab === 'following' && (
            <div className="py-8">
              {followedOrgs.length === 0 ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-6">
                    <Heart className="h-8 w-8 text-orange-500" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No organizations followed yet</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Follow organizations to stay updated on their procurements and announcements.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {followedOrgs.map((org) => {
                    const TypeIcon = getTypeIcon(org.type);
                    return (
                      <Card key={org.id} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            {org.logo ? (
                              <img 
                                src={org.logo} 
                                alt={org.name}
                                className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className={`h-16 w-16 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(org.type).replace('text-', 'bg-').replace('500', '100')}`}>
                                <TypeIcon className={`h-8 w-8 ${getTypeColor(org.type)}`} />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-lg">{org.name}</h3>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Badge variant="secondary" className={getTypeColor(org.type)}>
                                      {getTypeLabel(org.type)}
                                    </Badge>
                                    {org.location && (
                                      <span className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {org.location}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <Button variant="outline" size="sm">
                                  Following
                                </Button>
                              </div>
                              {org.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {org.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-background rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-lg font-semibold">
                    {createStep === 'type' ? 'Create Organization' : `Create ${getTypeLabel(selectedType!)}`}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {createStep === 'type' 
                      ? 'What type of organization are you creating?' 
                      : 'Tell us about your organization'}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleCloseModal}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                <AnimatePresence mode="wait">
                  {createStep === 'type' ? (
                    <motion.div
                      key="type-select"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="grid grid-cols-2 md:grid-cols-3 gap-3"
                    >
                      {businessTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => handleSelectType(type.id)}
                          className={`p-4 rounded-xl text-left transition-all border-2 border-transparent hover:border-primary/50 ${type.bgColor}`}
                        >
                          <div className={`inline-flex p-2 rounded-lg ${type.bgColor} mb-3`}>
                            <type.icon className={`h-5 w-5 ${type.color}`} />
                          </div>
                          <h3 className="font-medium mb-1">{type.label}</h3>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </button>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="details-form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="name">Organization Name *</Label>
                        <Input
                          id="name"
                          placeholder={`My ${getTypeLabel(selectedType!)}`}
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          placeholder="What does your organization do?"
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Select
                            value={formData.location}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
                          >
                            <SelectTrigger id="location">
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent position="popper" side="bottom" avoidCollisions={false}>
                              {locationOptions.map((location) => (
                                <SelectItem key={location} value={location}>
                                  {location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="industry">Industry</Label>
                          <Select
                            value={formData.industry}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}
                          >
                            <SelectTrigger id="industry">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent position="popper" side="bottom" avoidCollisions={false}>
                              {industryOptions.map((industry) => (
                                <SelectItem key={industry} value={industry}>
                                  {industry}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          placeholder="https://example.com"
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between p-6 border-t bg-muted/50">
                {createStep === 'details' && (
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setCreateStep('type');
                      setSelectedType(null);
                    }}
                  >
                    Back
                  </Button>
                )}
                {createStep === 'type' ? (
                  <div className="ml-auto">
                    <Button variant="ghost" onClick={handleCloseModal}>Cancel</Button>
                  </div>
                ) : (
                  <Button 
                    onClick={handleCreateBusiness}
                    disabled={!formData.name.trim() || creating}
                  >
                    {creating ? (
                      <>
                        <span className="loader-sm mr-2"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Create {getTypeLabel(selectedType!)}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
