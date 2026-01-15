'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, CalendarIcon, Loader2, CheckCircle, Lock, Home, Upload, FileText, Folder, File } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';

interface CreateMissionProps {
  onNavigate?: (view: string) => void;
}

interface Business {
  id: string;
  name: string;
  slug: string;
  type: string;
  description?: string;
  logo?: string;
  website?: string;
  location?: string;
  industry?: string;
}

export const CreateMission: React.FC<CreateMissionProps> = ({ onNavigate }) => {
  const [isGuest, setIsGuest] = useState(true);
  const [hasBusiness, setHasBusiness] = useState(false);
  const [checkingBusiness, setCheckingBusiness] = useState(true);
  const [userBusiness, setUserBusiness] = useState<Business | null>(null);
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; email: string; avatar?: string | null } | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    setIsGuest(!user);
    setCurrentUser(user);
    
    // Check if user has a business and fetch it
    const checkBusiness = async () => {
      if (!user) {
        setCheckingBusiness(false);
        return;
      }
      
      try {
        const response = await fetch(`/api/business?userId=${user.id}`);
        const data = await response.json();
        if (data.businesses && data.businesses.length > 0) {
          setHasBusiness(true);
          setUserBusiness(data.businesses[0]); // Use the first business
        } else {
          setHasBusiness(false);
        }
      } catch (err) {
        console.error('Error checking business:', err);
        setHasBusiness(false);
      }
      setCheckingBusiness(false);
    };
    
    checkBusiness();
  }, []);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    bounty: '',
    deliverableType: 'Code',
    deadline: '',
    tags: [] as string[],
    requiredFiles: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');
  const [fileInput, setFileInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // File upload state
  interface UploadedFile {
    name: string;
    size: number;
    type: string;
    data: string; // base64
  }
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File upload handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const processFiles = useCallback(async (files: FileList | null) => {
    if (!files) return;
    
    const maxFileSize = 10 * 1024 * 1024; // 10MB per file
    const maxFiles = 10;
    
    if (uploadedFiles.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const newFiles: UploadedFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (file.size > maxFileSize) {
        setError(`File "${file.name}" exceeds 10MB limit`);
        continue;
      }

      // Check if file already exists
      if (uploadedFiles.some(f => f.name === file.name)) {
        continue;
      }

      try {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        newFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          data: base64
        });
      } catch (err) {
        console.error('Error reading file:', err);
      }
    }

    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, [uploadedFiles]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [processFiles]);

  const removeUploadedFile = useCallback((fileName: string) => {
    setUploadedFiles(prev => prev.filter(f => f.name !== fileName));
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (type: string) => {
    if (type.includes('folder')) return Folder;
    if (type.includes('pdf') || type.includes('document') || type.includes('text')) return FileText;
    return File;
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const handleAddFile = () => {
    if (fileInput.trim() && !formData.requiredFiles.includes(fileInput.trim())) {
      setFormData({ ...formData, requiredFiles: [...formData.requiredFiles, fileInput.trim()] });
      setFileInput('');
    }
  };

  const handleRemoveFile = (file: string) => {
    setFormData({ ...formData, requiredFiles: formData.requiredFiles.filter((f) => f !== file) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!currentUser) {
      setError('You must be logged in to create a procurement');
      setLoading(false);
      return;
    }

    if (!userBusiness) {
      setError('You must have an organization to create a procurement');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/missions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          posterId: currentUser.id,
          posterName: userBusiness.name, // Use organization name
          posterEmail: currentUser.email,
          posterLogo: userBusiness.logo || null, // Send logo directly
          contactName: currentUser.name, // Owner's name as contact
          contactEmail: currentUser.email, // Owner's email as contact
          contactAvatar: currentUser.avatar || null, // Send avatar directly
          businessId: userBusiness.id, // Link to the business
          attachments: uploadedFiles.length > 0 ? JSON.stringify(uploadedFiles) : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create procurement');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        fullDescription: '',
        bounty: '',
        deliverableType: 'Code',
        deadline: '',
        tags: [],
        requiredFiles: [],
      });
      setUploadedFiles([]);

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to create procurement. Please try again.');
    }

    setLoading(false);
  };

  const showOverlay = isGuest || (!checkingBusiness && !hasBusiness);

  return (
    <div className="flex flex-col h-full px-4 py-6 pb-24 overflow-y-auto relative">
      {/* Guest User Overlay */}
      {isGuest && (
        <div className="absolute inset-0 z-50 flex items-start justify-start bg-white/60 backdrop-blur-sm pt-32" style={{ paddingLeft: '28rem' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center border"
          >
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-neutral-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Create an Account</h2>
            <p className="text-muted-foreground mb-6">
              Sign up to post procurements and connect with talented engineers worldwide.
            </p>
            <div className="space-y-3">
              <Link href="/get-started">
                <Button className="w-full" size="lg">
                  Create Account
                </Button>
              </Link>
              <Link href="/get-started">
                <Button variant="outline" className="w-full" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Already have an account? Click Sign In above.
            </p>
          </motion.div>
        </div>
      )}

      {/* No Business Overlay - Show when logged in but no business */}
      {!isGuest && !checkingBusiness && !hasBusiness && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden relative"
          >
            {/* Close Button */}
            <button
              onClick={() => onNavigate?.('missions')}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            {/* Header */}
            <div className="px-10 pt-10 pb-8 text-center">
              <h2 className="text-3xl font-bold mb-3">You need an organization to post procurements</h2>
              <p className="text-muted-foreground text-lg">
                Do you have a business, community or organization that needs technical people?
              </p>
            </div>

            {/* Options */}
            <div className="px-10 pb-10 space-y-8">
              <Link href="/business?type=startup">
                <button className="w-full p-5 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-colors">
                  <div className="flex items-center justify-center gap-2">
                    <Plus className="h-5 w-5" />
                    <span className="font-semibold text-base">Start organization</span>
                  </div>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={showOverlay ? 'blur-sm pointer-events-none select-none' : ''}>
        <div className="max-w-2xl mx-auto w-full space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post a New Procurement</CardTitle>
                <CardDescription>
                  Create a challenge and get the best work from our community
                </CardDescription>
              </CardHeader>
              <CardContent>
                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    Procurement posted successfully!
                  </div>
                )}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Info Section */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Basic Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="title">Procurement Title *</Label>
                      <Input
                        id="title"
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="e.g., Build a real-time dashboard"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Short Description *</Label>
                      <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        placeholder="Brief summary of what you need (shown in procurement list)"
                        rows={3}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fullDescription">Full Description</Label>
                      <textarea
                        id="fullDescription"
                        value={formData.fullDescription}
                        onChange={(e) =>
                          setFormData({ ...formData, fullDescription: e.target.value })
                        }
                        className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        placeholder="Detailed requirements, specifications, and expectations..."
                        rows={6}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Mission Details Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm font-medium text-muted-foreground">Mission Details</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bounty">Bounty Amount ($) *</Label>
                        <Input
                          id="bounty"
                          type="number"
                          value={formData.bounty}
                          onChange={(e) =>
                            setFormData({ ...formData, bounty: e.target.value })
                          }
                          placeholder="500"
                          required
                          disabled={loading}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Deliverable Type *</Label>
                        <Select
                          value={formData.deliverableType}
                          onValueChange={(value) =>
                            setFormData({ ...formData, deliverableType: value })
                          }
                          disabled={loading}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Code">Code</SelectItem>
                            <SelectItem value="CAD">CAD</SelectItem>
                            <SelectItem value="Data">Data</SelectItem>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="Autonomous Systems">Autonomous Systems</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deadline">Deadline *</Label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="deadline"
                          type="date"
                          value={formData.deadline}
                          onChange={(e) =>
                            setFormData({ ...formData, deadline: e.target.value })
                          }
                          className="pl-10"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tags Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm font-medium text-muted-foreground">Skills & Tags</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tags">Required Skills / Tags</Label>
                      <div className="flex gap-2">
                        <Input
                          id="tags"
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTag();
                            }
                          }}
                          placeholder="e.g., React, Python, Machine Learning"
                          disabled={loading}
                        />
                        <Button type="button" variant="outline" onClick={handleAddTag} disabled={loading}>
                          Add
                        </Button>
                      </div>
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                              {tag}
                              <X
                                className="h-3 w-3 cursor-pointer hover:text-destructive"
                                onClick={() => handleRemoveTag(tag)}
                              />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Required Deliverables Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm font-medium text-muted-foreground">Required Deliverables</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="requiredFiles">What should be submitted?</Label>
                      <div className="flex gap-2">
                        <Input
                          id="requiredFiles"
                          type="text"
                          value={fileInput}
                          onChange={(e) => setFileInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddFile();
                            }
                          }}
                          placeholder="e.g., Source code, Documentation, Test results"
                          disabled={loading}
                        />
                        <Button type="button" variant="outline" onClick={handleAddFile} disabled={loading}>
                          Add
                        </Button>
                      </div>
                      {formData.requiredFiles.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.requiredFiles.map((file) => (
                            <Badge key={file} variant="outline" className="flex items-center gap-1">
                              {file}
                              <X
                                className="h-3 w-3 cursor-pointer hover:text-destructive"
                                onClick={() => handleRemoveFile(file)}
                              />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Attachments Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm font-medium text-muted-foreground">Attachments</h3>
                    
                    <div className="space-y-2">
                      <Label>Upload Files</Label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Add specifications, designs, reference documents, or any important files (max 10 files, 10MB each)
                      </p>
                      
                      {/* Drag and Drop Zone */}
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`
                          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
                          ${isDragging 
                            ? 'border-orange-500 bg-orange-50' 
                            : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'
                          }
                          ${loading ? 'pointer-events-none opacity-50' : ''}
                        `}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          onChange={handleFileSelect}
                          className="hidden"
                          disabled={loading}
                        />
                        <Upload className={`h-10 w-10 mx-auto mb-3 ${isDragging ? 'text-orange-500' : 'text-gray-400'}`} />
                        <p className={`font-medium ${isDragging ? 'text-orange-600' : 'text-gray-700'}`}>
                          {isDragging ? 'Drop files here' : 'Drag and drop files here'}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          or click to browse
                        </p>
                      </div>

                      {/* Uploaded Files List */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <p className="text-sm font-medium text-gray-700">{uploadedFiles.length} file(s) attached</p>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {uploadedFiles.map((file) => {
                              const FileIcon = getFileIcon(file.type);
                              return (
                                <div
                                  key={file.name}
                                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border"
                                >
                                  <FileIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeUploadedFile(file.name);
                                    }}
                                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                                    disabled={loading}
                                  >
                                    <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Posted By Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm font-medium text-muted-foreground">Posted By</h3>
                    
                    {userBusiness && currentUser && (
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <div className="flex items-center gap-4">
                          {/* Organization Logo */}
                          {userBusiness.logo ? (
                            <img 
                              src={userBusiness.logo} 
                              alt={userBusiness.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-semibold text-lg">
                              {userBusiness.name.charAt(0)}
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="font-semibold">{userBusiness.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {/* User Profile Picture */}
                              {currentUser.avatar ? (
                                <img 
                                  src={currentUser.avatar} 
                                  alt={currentUser.name}
                                  className="w-5 h-5 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium">
                                  {currentUser.name.charAt(0)}
                                </div>
                              )}
                              <p className="text-sm text-muted-foreground">
                                {currentUser.name} ({currentUser.email})
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      This procurement will be posted by your organization. Your contact information will be shared with applicants.
                    </p>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="loader-sm mr-2"></span>
                        Posting Procurement...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-5 w-5" />
                        Post Procurement
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
        </div>
      </motion.div>
    </div>
  );
};
