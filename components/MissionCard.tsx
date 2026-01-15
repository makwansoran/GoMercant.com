'use client';

import React from 'react';
import { Mission } from '@/lib/missions';
import { Database, Cpu, Box, Palette, Zap, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MissionCardProps {
  mission: Mission;
  onClick: (mission: Mission) => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission, onClick }) => {
  const getDeliverableIcon = (type: string) => {
    const iconProps = { className: 'h-3 w-3 text-muted-foreground' };
    switch (type) {
      case 'Data':
        return <Database {...iconProps} />;
      case 'Code':
        return <Cpu {...iconProps} />;
      case 'CAD':
        return <Box {...iconProps} />;
      case 'Design':
        return <Palette {...iconProps} />;
      case 'Autonomous Systems':
        return <Zap {...iconProps} />;
      default:
        return <Box {...iconProps} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'Completed':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const formatBounty = (bounty: number | string) => {
    const num = typeof bounty === 'string' ? parseFloat(bounty) : bounty;
    return num.toLocaleString();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="h-full"
    >
      <Card 
        className="cursor-pointer hover:shadow-md transition-shadow h-full flex flex-col"
        onClick={() => onClick(mission)}
      >
        <CardContent className="p-4 flex flex-col h-full">
          {/* Header with company logo and bounty */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* Company Logo */}
              {mission.posterLogo ? (
                <img 
                  src={mission.posterLogo} 
                  alt={mission.posterName}
                  className="h-10 w-10 rounded-lg object-cover flex-shrink-0"
                />
              ) : (
                <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 font-semibold text-lg">
                    {mission.posterName?.charAt(0) || 'O'}
                  </span>
                </div>
              )}
              <div className="min-w-0">
                <h3 className="font-semibold text-base line-clamp-1">
                  {mission.title}
                </h3>
                <p className="text-xs text-muted-foreground">{mission.posterName}</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-bold text-lg text-green-600">
                {formatBounty(mission.bounty)}
              </div>
              <Badge variant="secondary" className={`text-xs ${getStatusColor(mission.status)}`}>
                {mission.status}
              </Badge>
            </div>
          </div>

          {/* Description - fixed height */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 h-10">
            {mission.description}
          </p>

          {/* Tags - fixed height */}
          <div className="flex flex-wrap gap-1 mb-3 h-6 overflow-hidden">
            {mission.tags && mission.tags.length > 0 ? (
              <>
                {mission.tags.slice(0, 3).map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {mission.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{mission.tags.length - 3}
                  </Badge>
                )}
              </>
            ) : (
              <span className="text-xs text-muted-foreground">No tags</span>
            )}
          </div>

          {/* Footer - pushed to bottom */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t mt-auto">
            <div className="flex items-center gap-1">
              {getDeliverableIcon(mission.deliverableType)}
              <span>{mission.deliverableType}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Due {formatDate(mission.deadline)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
