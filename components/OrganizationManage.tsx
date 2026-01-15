'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Settings,
  ArrowLeft,
  Save,
  Trash2,
  UserPlus,
  Mail,
  Globe,
  MapPin,
  X,
  Crown,
  MoreVertical,
  Copy,
  Check,
  Camera,
  Image as ImageIcon,
  Linkedin,
  Twitter,
  Github,
  Calendar,
  Briefcase,
  Link as LinkIcon,
  Eye,
  Pencil,
  Upload,
  ExternalLink,
  Star,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';

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

const companySizeOptions = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
];

interface Organization {
  id: string;
  name: string;
  slug: string;
  type: string;
  description?: string;
  logo?: string;
  banner?: string;
  website?: string;
  location?: string;
  industry?: string;
  size?: string;
  founded?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  discord?: string;
  rating?: number;
  openMissions?: number;
  ownerId: string;
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
  avatar?: string;
  title?: string;
}

interface OrganizationManageProps {
  organizationId: string;
}

export function OrganizationManage({ organizationId }: OrganizationManageProps) {
  const router = useRouter();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [previewMode, setPreviewMode] = useState(false);
  
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Image zoom state (simple zoom only)
  const [bannerZoom, setBannerZoom] = useState(1);
  const [logoZoom, setLogoZoom] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    industry: '',
    size: '',
    founded: '',
    github: '',
    linkedin: '',
    twitter: '',
    discord: '',
    logo: '',
    banner: ''
  });

  // Members state
  const [members, setMembers] = useState<Member[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'member'>('member');
  const [inviteLink, setInviteLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    fetchOrganization();
  }, [organizationId]);

  const fetchOrganization = async () => {
    try {
      const user = getCurrentUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const response = await fetch(`/api/business?userId=${user.id}`);
      const data = await response.json();
      
      const org = data.businesses?.find((b: Organization) => b.id === organizationId);
      
      if (!org) {
        setError('Organization not found');
        setLoading(false);
        return;
      }

      setOrganization(org);
      setFormData({
        name: org.name || '',
        description: org.description || '',
        website: org.website || '',
        location: org.location || '',
        industry: org.industry || '',
        size: org.size || '',
        founded: org.founded || '',
        github: org.github || '',
        linkedin: org.linkedin || '',
        twitter: org.twitter || '',
        discord: org.discord || '',
        logo: org.logo || '',
        banner: org.banner || ''
      });

      // Mock members for now
      setMembers([
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: 'owner',
          joinedAt: new Date().toISOString(),
          title: 'Founder & CEO'
        }
      ]);

      setInviteLink(`${window.location.origin}/invite/${org.slug}`);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching organization:', err);
      setError('Failed to load organization');
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const user = getCurrentUser();
      if (!user) return;

      const response = await fetch('/api/business', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: organizationId,
          userId: user.id,
          ...formData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update');
      }

      const data = await response.json();
      setOrganization(data.business);
      setSuccess('Changes saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this organization? This action cannot be undone.')) {
      return;
    }

    try {
      const user = getCurrentUser();
      if (!user) return;

      const response = await fetch(`/api/business?id=${organizationId}&userId=${user.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      router.push('/business');
    } catch (err) {
      setError('Failed to delete organization');
    }
  };

  const handleImageUpload = (type: 'logo' | 'banner') => {
    if (type === 'logo') {
      logoInputRef.current?.click();
    } else {
      bannerInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    // Convert to base64 and set directly
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setFormData(prev => ({ ...prev, [type]: base64 }));
      setSuccess(`${type === 'logo' ? 'Logo' : 'Banner'} uploaded! Click "Save Changes" to apply.`);
      setTimeout(() => setSuccess(''), 5000);
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleInvite = async () => {
    if (!inviteEmail) return;
    
    const newMember: Member = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      joinedAt: new Date().toISOString()
    };
    
    setMembers([...members, newMember]);
    setInviteEmail('');
    setShowInviteModal(false);
    setSuccess(`Invitation sent to ${inviteEmail}`);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleRemoveMember = (memberId: string) => {
    if (!confirm('Are you sure you want to remove this member?')) return;
    setMembers(members.filter(m => m.id !== memberId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <span className="loader"></span>
          <p className="text-muted-foreground">Loading organization...</p>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="py-16 text-center">
            <Building2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Organization not found</h2>
            <p className="text-muted-foreground mb-6">
              This organization doesn't exist or you don't have access to it.
            </p>
            <Button onClick={() => router.push('/business')} className="bg-orange-500 hover:bg-orange-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Organizations
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Preview Mode - Shows how the organization will appear publicly
  if (previewMode) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Preview Banner */}
        <div className="bg-orange-500 text-white px-4 py-2 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="font-medium">Preview Mode</span>
            <span className="text-orange-200 text-sm">- This is how your organization appears to others</span>
          </div>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => setPreviewMode(false)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Back to Edit
          </Button>
        </div>

        {/* Banner */}
        <div className="relative h-64 md:h-80 bg-gradient-to-br from-gray-800 to-gray-900">
          {formData.banner ? (
            <img 
              src={formData.banner} 
              alt="Banner" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-purple-500/20 to-blue-500/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Profile Section */}
        <div className="max-w-5xl mx-auto px-4 -mt-24 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-white shadow-lg border-4 border-white overflow-hidden -mt-20 md:-mt-24">
                  {formData.logo ? (
                    <img src={formData.logo} alt={formData.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                      <span className="text-4xl md:text-5xl font-bold text-white">
                        {formData.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{formData.name}</h1>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      {formData.industry && (
                        <Badge variant="secondary" className="text-sm">
                          {formData.industry}
                        </Badge>
                      )}
                      {formData.location && (
                        <span className="flex items-center gap-1 text-gray-500 text-sm">
                          <MapPin className="h-4 w-4" />
                          {formData.location}
                        </span>
                      )}
                      {formData.founded && (
                        <span className="flex items-center gap-1 text-gray-500 text-sm">
                          <Calendar className="h-4 w-4" />
                          Founded {formData.founded}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="outline">
                      <Star className="h-4 w-4 mr-2" />
                      Follow
                    </Button>
                  </div>
                </div>

                {formData.description && (
                  <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                    {formData.description}
                  </p>
                )}

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{organization.openMissions || 0}</div>
                    <div className="text-sm text-gray-500">Open Procurements</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{members.length}</div>
                    <div className="text-sm text-gray-500">Team Members</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                      <span className="text-2xl font-bold text-gray-900">{organization.rating?.toFixed(1) || '5.0'}</span>
                    </div>
                    <div className="text-sm text-gray-500">Rating</div>
                  </div>
                  {formData.size && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{formData.size}</div>
                      <div className="text-sm text-gray-500">Employees</div>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex gap-3 mt-6">
                  {formData.website && (
                    <a href={formData.website} target="_blank" rel="noopener noreferrer" 
                       className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                      <Globe className="h-5 w-5 text-gray-600" />
                    </a>
                  )}
                  {formData.linkedin && (
                    <a href={formData.linkedin} target="_blank" rel="noopener noreferrer"
                       className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                      <Linkedin className="h-5 w-5 text-gray-600" />
                    </a>
                  )}
                  {formData.twitter && (
                    <a href={formData.twitter} target="_blank" rel="noopener noreferrer"
                       className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                      <Twitter className="h-5 w-5 text-gray-600" />
                    </a>
                  )}
                  {formData.github && (
                    <a href={formData.github} target="_blank" rel="noopener noreferrer"
                       className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                      <Github className="h-5 w-5 text-gray-600" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {members.map((member) => (
                <div key={member.id} className="text-center p-4 rounded-xl bg-gray-50">
                  <Avatar className="h-16 w-16 mx-auto mb-3">
                    <AvatarFallback className="text-lg bg-orange-100 text-orange-600">
                      {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.title || member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Edit Mode
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.push('/business')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">{organization.name}</h1>
                <p className="text-sm text-muted-foreground">Edit organization profile</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setPreviewMode(true)}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={saving}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      <AnimatePresence>
        {(success || error) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-6xl mx-auto px-4 pt-4"
          >
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <Check className="h-5 w-5" />
                {success}
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Hidden File Inputs */}
        <input
          type="file"
          ref={bannerInputRef}
          onChange={(e) => handleFileChange(e, 'banner')}
          accept="image/*"
          className="hidden"
        />
        <input
          type="file"
          ref={logoInputRef}
          onChange={(e) => handleFileChange(e, 'logo')}
          accept="image/*"
          className="hidden"
        />

        {/* Banner & Logo Section */}
        <Card className="overflow-hidden mb-6">
          <div className="relative">
            {/* Banner */}
            <div className="h-48 md:h-64 bg-gradient-to-br from-gray-800 to-gray-900 relative group overflow-hidden">
              {formData.banner ? (
                <img 
                  src={formData.banner} 
                  alt="Banner" 
                  className="w-full h-full object-cover transition-transform"
                  style={{ transform: `scale(${bannerZoom})` }}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-purple-500/20 to-blue-500/20" />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <button
                  onClick={() => handleImageUpload('banner')}
                  className="opacity-0 group-hover:opacity-100 transition-all bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-lg"
                >
                  <Upload className="h-4 w-4" />
                  {formData.banner ? 'Change Banner' : 'Upload Banner'}
                </button>
              </div>
              {/* Banner Zoom Controls */}
              {formData.banner && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 rounded-lg p-1">
                  <button
                    onClick={() => setBannerZoom(z => Math.max(1, z - 0.1))}
                    className="p-1.5 text-white hover:bg-white/20 rounded"
                    title="Zoom Out"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <span className="text-white text-xs w-10 text-center">{Math.round(bannerZoom * 100)}%</span>
                  <button
                    onClick={() => setBannerZoom(z => Math.min(2, z + 0.1))}
                    className="p-1.5 text-white hover:bg-white/20 rounded"
                    title="Zoom In"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Logo */}
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-2xl bg-white shadow-xl border-4 border-white overflow-hidden group relative">
                {formData.logo ? (
                  <img 
                    src={formData.logo} 
                    alt={formData.name} 
                    className="w-full h-full object-cover transition-transform"
                    style={{ transform: `scale(${logoZoom})` }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {formData.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                  <button
                    onClick={() => handleImageUpload('logo')}
                    className="opacity-0 group-hover:opacity-100 transition-all text-white text-xs font-medium flex items-center gap-1 hover:text-orange-300"
                  >
                    <Upload className="h-3 w-3" />
                    {formData.logo ? 'Change' : 'Upload'}
                  </button>
                </div>
                {/* Logo Zoom Controls */}
                {formData.logo && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-gray-800 rounded p-0.5">
                    <button
                      onClick={() => setLogoZoom(z => Math.max(1, z - 0.1))}
                      className="p-1 text-white hover:bg-white/20 rounded text-xs"
                    >
                      −
                    </button>
                    <span className="text-white text-[10px] w-8 text-center">{Math.round(logoZoom * 100)}%</span>
                    <button
                      onClick={() => setLogoZoom(z => Math.min(2, z + 0.1))}
                      className="p-1 text-white hover:bg-white/20 rounded text-xs"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-20 pb-6 px-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Upload className="h-4 w-4" />
              <span>Click to upload. Use +/− to zoom. Max 5MB.</span>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border shadow-sm w-full justify-start gap-2 p-1 h-auto flex-wrap">
            <TabsTrigger value="profile" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <Building2 className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <Settings className="h-4 w-4 mr-2" />
              Details
            </TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <LinkIcon className="h-4 w-4 mr-2" />
              Social Links
            </TabsTrigger>
            <TabsTrigger value="members" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Team
            </TabsTrigger>
            <TabsTrigger value="danger" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Danger
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  This information will be displayed publicly on your organization profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Organization Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your organization name"
                      className="text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="https://example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Tell the world what your organization does. What problems do you solve? What makes you unique?"
                    className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    A good description helps attract the right talent and partners.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Details</CardTitle>
                <CardDescription>
                  Additional information about your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
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

                  <div className="space-y-2">
                    <Label htmlFor="size">Company Size</Label>
                    <Select
                      value={formData.size}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, size: value }))}
                    >
                      <SelectTrigger id="size">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent position="popper" side="bottom" avoidCollisions={false}>
                        {companySizeOptions.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size} employees
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="founded">Year Founded</Label>
                    <Input
                      id="founded"
                      value={formData.founded}
                      onChange={(e) => setFormData(prev => ({ ...prev, founded: e.target.value }))}
                      placeholder="2020"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Links Tab */}
          <TabsContent value="social" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>
                  Connect your social profiles so people can find you elsewhere
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="linkedin"
                        value={formData.linkedin}
                        onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                        placeholder="https://linkedin.com/company/..."
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter / X</Label>
                    <div className="relative">
                      <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="twitter"
                        value={formData.twitter}
                        onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                        placeholder="https://twitter.com/..."
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="github"
                        value={formData.github}
                        onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                        placeholder="https://github.com/..."
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discord">Discord</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="discord"
                        value={formData.discord}
                        onChange={(e) => setFormData(prev => ({ ...prev, discord: e.target.value }))}
                        placeholder="https://discord.gg/..."
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                      Manage who has access to this organization
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowInviteModal(true)} className="bg-orange-500 hover:bg-orange-600">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Invite Link */}
                <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                  <Label className="text-sm font-medium mb-2 block text-orange-900">Invite Link</Label>
                  <div className="flex gap-2">
                    <Input value={inviteLink} readOnly className="bg-white" />
                    <Button variant="outline" onClick={handleCopyLink} className="shrink-0">
                      {linkCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-orange-700 mt-2">
                    Share this link to invite people to your organization
                  </p>
                </div>

                {/* Members List */}
                <div className="space-y-3">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-orange-100 text-orange-600 font-semibold">
                            {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{member.name}</span>
                            {member.role === 'owner' && (
                              <Crown className="h-4 w-4 text-amber-500" />
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">{member.email}</span>
                          {member.title && (
                            <span className="text-sm text-muted-foreground block">{member.title}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={member.role === 'owner' ? 'default' : 'secondary'}>
                          {member.role}
                        </Badge>
                        {member.role !== 'owner' && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Make Admin</DropdownMenuItem>
                              <DropdownMenuItem>Make Member</DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleRemoveMember(member.id)}
                              >
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Danger Zone Tab */}
          <TabsContent value="danger" className="mt-6">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible and destructive actions. Please be careful.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 border-2 border-red-200 rounded-xl bg-red-50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-red-900 text-lg">Delete Organization</h3>
                      <p className="text-sm text-red-700 mt-1">
                        Once deleted, all data including procurements, team members, and history will be permanently removed. 
                        This action cannot be undone.
                      </p>
                    </div>
                    <Button variant="destructive" onClick={handleDelete} className="shrink-0">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Organization
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowInviteModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
            >
              <button
                onClick={() => setShowInviteModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-orange-100">
                  <UserPlus className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Invite Team Member</h2>
                  <p className="text-sm text-muted-foreground">Add someone to your organization</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="invite-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="invite-email"
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="colleague@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invite-role">Role</Label>
                  <Select value={inviteRole} onValueChange={(v: 'admin' | 'member') => setInviteRole(v)}>
                    <SelectTrigger id="invite-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Member - Can view and contribute</SelectItem>
                      <SelectItem value="admin">Admin - Full management access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowInviteModal(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleInvite} className="flex-1 bg-orange-500 hover:bg-orange-600">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Invite
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
