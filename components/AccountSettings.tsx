'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Globe, 
  MapPin, 
  Mail, 
  Camera,
  Plus,
  X,
  Save,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  Link,
  Building,
  Clock,
  DollarSign,
  Award,
  Languages,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCurrentUser, setAuth, User as AuthUser, WorkExperience, Education } from '@/lib/auth';

interface ProfileData {
  name: string;
  email: string;
  avatar: string;
  banner: string;
  bio: string;
  title: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  discord: string;
  company: string;
  skills: string[];
  portfolio: string;
  experience: WorkExperience[];
  education: Education[];
  certifications: string[];
  languages: string[];
  availability: string;
  hourlyRate: string;
}

export const AccountSettings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    email: '',
    avatar: '',
    banner: '',
    bio: '',
    title: '',
    location: '',
    website: '',
    github: '',
    linkedin: '',
    twitter: '',
    discord: '',
    company: '',
    skills: [],
    portfolio: '',
    experience: [],
    education: [],
    certifications: [],
    languages: [],
    availability: 'full-time',
    hourlyRate: '',
  });

  // Input states for adding items
  const [skillInput, setSkillInput] = useState('');
  const [certInput, setCertInput] = useState('');
  const [langInput, setLangInput] = useState('');

  // Experience form state
  const [showExpForm, setShowExpForm] = useState(false);
  const [expForm, setExpForm] = useState<Partial<WorkExperience>>({
    company: '',
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });

  // Education form state
  const [showEduForm, setShowEduForm] = useState(false);
  const [eduForm, setEduForm] = useState<Partial<Education>>({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const user = getCurrentUser();
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/users/profile?userId=${user.id}`);
      const data = await response.json();
      
      if (data.profile) {
        setProfile({
          name: data.profile.name || '',
          email: data.profile.email || '',
          avatar: data.profile.avatar || '',
          banner: data.profile.banner || '',
          bio: data.profile.bio || '',
          title: data.profile.title || '',
          location: data.profile.location || '',
          website: data.profile.website || '',
          github: data.profile.github || '',
          linkedin: data.profile.linkedin || '',
          twitter: data.profile.twitter || '',
          discord: data.profile.discord || '',
          company: data.profile.company || '',
          skills: Array.isArray(data.profile.skills) ? data.profile.skills : [],
          portfolio: data.profile.portfolio || '',
          experience: Array.isArray(data.profile.experience) ? data.profile.experience : [],
          education: Array.isArray(data.profile.education) ? data.profile.education : [],
          certifications: Array.isArray(data.profile.certifications) ? data.profile.certifications : [],
          languages: Array.isArray(data.profile.languages) ? data.profile.languages : [],
          availability: data.profile.availability || 'full-time',
          hourlyRate: data.profile.hourlyRate?.toString() || '',
        });
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    const user = getCurrentUser();
    if (!user) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          ...profile,
          hourlyRate: profile.hourlyRate ? parseFloat(profile.hourlyRate) : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to save profile');
      } else {
        setSuccess('Profile saved successfully!');
        // Update local storage
        const updatedUser: AuthUser = {
          ...user,
          name: profile.name,
          avatar: profile.avatar,
          bio: profile.bio,
          skills: profile.skills,
        };
        setAuth(updatedUser);
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError('Failed to save profile');
    }
    setSaving(false);
  };

  const addSkill = () => {
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      setProfile({ ...profile, skills: [...profile.skills, skillInput.trim()] });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfile({ ...profile, skills: profile.skills.filter(s => s !== skill) });
  };

  const addCertification = () => {
    if (certInput.trim() && !profile.certifications.includes(certInput.trim())) {
      setProfile({ ...profile, certifications: [...profile.certifications, certInput.trim()] });
      setCertInput('');
    }
  };

  const removeCertification = (cert: string) => {
    setProfile({ ...profile, certifications: profile.certifications.filter(c => c !== cert) });
  };

  const addLanguage = () => {
    if (langInput.trim() && !profile.languages.includes(langInput.trim())) {
      setProfile({ ...profile, languages: [...profile.languages, langInput.trim()] });
      setLangInput('');
    }
  };

  const removeLanguage = (lang: string) => {
    setProfile({ ...profile, languages: profile.languages.filter(l => l !== lang) });
  };

  const addExperience = () => {
    if (expForm.company && expForm.title && expForm.startDate) {
      const newExp: WorkExperience = {
        id: Date.now().toString(),
        company: expForm.company,
        title: expForm.title,
        location: expForm.location,
        startDate: expForm.startDate,
        endDate: expForm.endDate,
        current: expForm.current || false,
        description: expForm.description,
      };
      setProfile({ ...profile, experience: [...profile.experience, newExp] });
      setExpForm({ company: '', title: '', location: '', startDate: '', endDate: '', current: false, description: '' });
      setShowExpForm(false);
    }
  };

  const removeExperience = (id: string) => {
    setProfile({ ...profile, experience: profile.experience.filter(e => e.id !== id) });
  };

  const addEducation = () => {
    if (eduForm.school && eduForm.degree && eduForm.startDate) {
      const newEdu: Education = {
        id: Date.now().toString(),
        school: eduForm.school,
        degree: eduForm.degree,
        field: eduForm.field,
        startDate: eduForm.startDate,
        endDate: eduForm.endDate,
        current: eduForm.current || false,
      };
      setProfile({ ...profile, education: [...profile.education, newEdu] });
      setEduForm({ school: '', degree: '', field: '', startDate: '', endDate: '', current: false });
      setShowEduForm(false);
    }
  };

  const removeEducation = (id: string) => {
    setProfile({ ...profile, education: profile.education.filter(e => e.id !== id) });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'social', label: 'Social Links', icon: Globe },
  ];

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
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Account Settings</h1>
              <p className="text-muted-foreground">Manage your profile and preferences</p>
            </div>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <span className="loader-sm mr-2"></span>
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Changes
            </Button>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Banner & Avatar Preview */}
          <Card>
            <CardContent className="p-0">
              <div 
                className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg relative"
                style={profile.banner ? { backgroundImage: `url(${profile.banner})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              >
                <div className="absolute bottom-0 left-6 transform translate-y-1/2">
                  <div className="h-24 w-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-4xl">{profile.name.charAt(0) || '👤'}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="pt-16 pb-6 px-6">
                <h2 className="text-xl font-semibold">{profile.name || 'Your Name'}</h2>
                <p className="text-muted-foreground">{profile.title || 'Your Title'}</p>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <div className="flex gap-2 border-b pb-2 overflow-x-auto">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className="whitespace-nowrap"
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Your public profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        value={profile.title}
                        onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                        placeholder="Senior Software Engineer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={profile.email}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="company"
                          value={profile.company}
                          onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                          placeholder="Your company"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        placeholder="San Francisco, CA"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Images</CardTitle>
                  <CardDescription>Your avatar and banner images</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="avatar">Avatar URL</Label>
                    <div className="relative">
                      <Camera className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="avatar"
                        value={profile.avatar}
                        onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                        placeholder="https://example.com/avatar.jpg"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="banner">Banner URL</Label>
                    <div className="relative">
                      <Camera className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="banner"
                        value={profile.banner}
                        onChange={(e) => setProfile({ ...profile, banner: e.target.value })}
                        placeholder="https://example.com/banner.jpg"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Availability & Rate</CardTitle>
                  <CardDescription>Let clients know your availability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Availability</Label>
                      <Select
                        value={profile.availability}
                        onValueChange={(value) => setProfile({ ...profile, availability: value })}
                      >
                        <SelectTrigger>
                          <Clock className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                          <SelectItem value="not-available">Not Available</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="hourlyRate"
                          type="number"
                          value={profile.hourlyRate}
                          onChange={(e) => setProfile({ ...profile, hourlyRate: e.target.value })}
                          placeholder="100"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Work Experience</span>
                    <Button size="sm" onClick={() => setShowExpForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  </CardTitle>
                  <CardDescription>Your professional work history</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {showExpForm && (
                    <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Company *</Label>
                          <Input
                            value={expForm.company}
                            onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                            placeholder="Company name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Job Title *</Label>
                          <Input
                            value={expForm.title}
                            onChange={(e) => setExpForm({ ...expForm, title: e.target.value })}
                            placeholder="Your role"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input
                          value={expForm.location}
                          onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                          placeholder="City, Country"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date *</Label>
                          <Input
                            type="month"
                            value={expForm.startDate}
                            onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={expForm.endDate}
                            onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })}
                            disabled={expForm.current}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="currentJob"
                          checked={expForm.current}
                          onChange={(e) => setExpForm({ ...expForm, current: e.target.checked, endDate: '' })}
                          className="rounded"
                        />
                        <Label htmlFor="currentJob">I currently work here</Label>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <textarea
                          value={expForm.description}
                          onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                          placeholder="Describe your responsibilities and achievements..."
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={addExperience}>Add</Button>
                        <Button variant="outline" onClick={() => setShowExpForm(false)}>Cancel</Button>
                      </div>
                    </div>
                  )}

                  {profile.experience.length === 0 && !showExpForm ? (
                    <p className="text-muted-foreground text-center py-8">No work experience added yet</p>
                  ) : (
                    <div className="space-y-4">
                      {profile.experience.map((exp) => (
                        <div key={exp.id} className="border rounded-lg p-4 relative group">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeExperience(exp.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                              <Briefcase className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{exp.title}</h4>
                              <p className="text-sm text-muted-foreground">{exp.company}</p>
                              <p className="text-xs text-muted-foreground">
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                {exp.location && ` · ${exp.location}`}
                              </p>
                              {exp.description && (
                                <p className="text-sm mt-2">{exp.description}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Education</span>
                    <Button size="sm" onClick={() => setShowEduForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </CardTitle>
                  <CardDescription>Your educational background</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {showEduForm && (
                    <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>School/University *</Label>
                          <Input
                            value={eduForm.school}
                            onChange={(e) => setEduForm({ ...eduForm, school: e.target.value })}
                            placeholder="University name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Degree *</Label>
                          <Input
                            value={eduForm.degree}
                            onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                            placeholder="Bachelor's, Master's, etc."
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Field of Study</Label>
                        <Input
                          value={eduForm.field}
                          onChange={(e) => setEduForm({ ...eduForm, field: e.target.value })}
                          placeholder="Computer Science, Engineering, etc."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date *</Label>
                          <Input
                            type="month"
                            value={eduForm.startDate}
                            onChange={(e) => setEduForm({ ...eduForm, startDate: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={eduForm.endDate}
                            onChange={(e) => setEduForm({ ...eduForm, endDate: e.target.value })}
                            disabled={eduForm.current}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="currentEdu"
                          checked={eduForm.current}
                          onChange={(e) => setEduForm({ ...eduForm, current: e.target.checked, endDate: '' })}
                          className="rounded"
                        />
                        <Label htmlFor="currentEdu">I&apos;m currently studying here</Label>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={addEducation}>Add</Button>
                        <Button variant="outline" onClick={() => setShowEduForm(false)}>Cancel</Button>
                      </div>
                    </div>
                  )}

                  {profile.education.length === 0 && !showEduForm ? (
                    <p className="text-muted-foreground text-center py-8">No education added yet</p>
                  ) : (
                    <div className="space-y-4">
                      {profile.education.map((edu) => (
                        <div key={edu.id} className="border rounded-lg p-4 relative group">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeEducation(edu.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                              <GraduationCap className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{edu.school}</h4>
                              <p className="text-sm text-muted-foreground">
                                {edu.degree}{edu.field && ` in ${edu.field}`}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                  <CardDescription>Professional certifications and licenses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={certInput}
                      onChange={(e) => setCertInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                      placeholder="e.g., AWS Solutions Architect, PMP"
                    />
                    <Button variant="outline" onClick={addCertification}>Add</Button>
                  </div>
                  {profile.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {profile.certifications.map((cert) => (
                        <Badge key={cert} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                          <Award className="h-3 w-3" />
                          {cert}
                          <X
                            className="h-3 w-3 cursor-pointer hover:text-destructive ml-1"
                            onClick={() => removeCertification(cert)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Skills</CardTitle>
                  <CardDescription>Your expertise and tech stack</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      placeholder="e.g., React, Python, Machine Learning"
                    />
                    <Button variant="outline" onClick={addSkill}>Add</Button>
                  </div>
                  {profile.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                          {skill}
                          <X
                            className="h-3 w-3 cursor-pointer hover:text-destructive ml-1"
                            onClick={() => removeSkill(skill)}
                          />
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No skills added yet</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                  <CardDescription>Languages you speak</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={langInput}
                      onChange={(e) => setLangInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                      placeholder="e.g., English, Spanish, Mandarin"
                    />
                    <Button variant="outline" onClick={addLanguage}>Add</Button>
                  </div>
                  {profile.languages.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="flex items-center gap-1 px-3 py-1">
                          <Languages className="h-3 w-3" />
                          {lang}
                          <X
                            className="h-3 w-3 cursor-pointer hover:text-destructive ml-1"
                            onClick={() => removeLanguage(lang)}
                          />
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No languages added yet</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Portfolio</CardTitle>
                  <CardDescription>Link to your portfolio or work samples</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={profile.portfolio}
                      onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })}
                      placeholder="https://yourportfolio.com"
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Social Links Tab */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                  <CardDescription>Connect your social profiles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={profile.website}
                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                        placeholder="https://yourwebsite.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>GitHub</Label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={profile.github}
                        onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                        placeholder="https://github.com/username"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>LinkedIn</Label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={profile.linkedin}
                        onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/username"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Twitter / X</Label>
                    <div className="relative">
                      <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={profile.twitter}
                        onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                        placeholder="https://twitter.com/username"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Discord</Label>
                    <div className="relative">
                      <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={profile.discord}
                        onChange={(e) => setProfile({ ...profile, discord: e.target.value })}
                        placeholder="username#1234"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
