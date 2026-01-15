'use client';

import React from 'react';
import { Mission } from '@/lib/missions';
import { ArrowLeft, Calendar, DollarSign, User, Tag, FileText, Clock, Briefcase, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MissionDetailProps {
  mission: Mission;
  onClose: () => void;
}

export const MissionDetail: React.FC<MissionDetailProps> = ({ mission, onClose }) => {
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const formatBounty = (bounty: number | string) => {
    const num = typeof bounty === 'string' ? parseFloat(bounty) : bounty;
    return num.toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-700';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-700';
      case 'Completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleGetStarted = () => {
    // For now, just show an alert or navigate to submit
    // In production, this could open a submission form or redirect
    alert('Starting procurement! This will be connected to the submission system.');
  };

  return (
    <AnimatePresence>
      {/* Full screen container for centering */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-5 border-b">
          <div className="flex items-center justify-between mb-3">
            <Badge className={`${getStatusColor(mission.status)}`}>
              {mission.status}
            </Badge>
            <Badge variant="outline">{mission.deliverableType}</Badge>
          </div>
          <h2 className="font-bold text-xl">{mission.title}</h2>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Bounty Card */}
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">Bounty</span>
            </div>
            <p className="text-3xl font-bold text-green-600">{formatBounty(mission.bounty)}</p>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">DESCRIPTION</h3>
            <p className="text-sm leading-relaxed">
              {mission.fullDescription || mission.description}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Deadline</p>
                <p className="font-medium text-sm">{formatDate(mission.deadline)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Submissions</p>
                <p className="font-medium text-sm">{mission.submissions || 0}</p>
              </div>
            </div>
          </div>

          {/* Posted By */}
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">POSTED BY</h3>
            <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-4">
              {/* Company/Organization Logo */}
              {mission.posterLogo ? (
                <img 
                  src={mission.posterLogo} 
                  alt={mission.posterName}
                  className="h-12 w-12 rounded-lg object-cover"
                />
              ) : (
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 font-semibold text-lg">
                    {mission.posterName?.charAt(0) || 'O'}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <p className="font-semibold text-sm">{mission.posterName}</p>
                {(mission.contactName || mission.contactEmail) && (
                  <div className="flex items-center gap-2 mt-1">
                    {/* Contact Person Avatar */}
                    {mission.contactAvatar ? (
                      <img 
                        src={mission.contactAvatar} 
                        alt={mission.contactName || 'Contact'}
                        className="h-5 w-5 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 text-xs font-medium">
                          {mission.contactName?.charAt(0) || <User className="h-3 w-3" />}
                        </span>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      {mission.contactName && <span>{mission.contactName}</span>}
                      {mission.contactName && mission.contactEmail && <span> · </span>}
                      {mission.contactEmail && (
                        <span className="flex items-center gap-1 inline-flex">
                          <Mail className="h-3 w-3" />
                          {mission.contactEmail}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          {mission.tags && mission.tags.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                REQUIRED SKILLS
              </h3>
              <div className="flex flex-wrap gap-2">
                {mission.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Required Files */}
          {mission.requiredFiles && mission.requiredFiles.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                DELIVERABLES
              </h3>
              <div className="flex flex-wrap gap-2">
                {mission.requiredFiles.map((file: string) => (
                  <Badge key={file} variant="outline">
                    {file}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Buttons */}
        <div className="px-6 py-4 border-t bg-muted/30 flex gap-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button 
            onClick={handleGetStarted}
            className="flex-1"
            disabled={mission.status !== 'Open'}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Get Started
          </Button>
        </div>
      </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
