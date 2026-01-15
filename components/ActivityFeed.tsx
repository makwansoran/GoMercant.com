'use client';

import React from 'react';
import { missions } from '@/lib/missions';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ActivityFeedProps {
  compact?: boolean;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ compact = false }) => {
  // Get missions with activity
  const activeMissions = missions.filter((m) => m.status !== 'Open').slice(0, compact ? 4 : 10);

  if (compact) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest submission updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeMissions.map((mission) => (
              <div
                key={mission.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div>
                    {mission.status === 'Completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-orange-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {mission.title.length > 30 
                        ? mission.title.substring(0, 30) + '...' 
                        : mission.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {mission.posterName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={mission.status === 'Completed' ? 'default' : 'secondary'}>
                    {mission.status === 'Completed' ? 'Earned' : 'Pending'}
                  </Badge>
                  <p className="text-sm font-semibold mt-1">
                    ${mission.bounty.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col h-full px-4 py-6 pb-24 overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="space-y-3">
          {activeMissions.map((mission) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {mission.status === 'Completed' ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <Clock className="h-6 w-6 text-orange-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">
                        {mission.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {mission.status === 'Completed'
                          ? `Completed • ${mission.reviews?.[0]?.rating || 0} ⭐`
                          : `${mission.status} • ${mission.submissions} submissions`}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-blue-500">
                          ${mission.bounty.toLocaleString()}
                        </span>
                        {mission.reviews?.[0]?.rating && (
                          <div className="flex items-center gap-1">
                            {Array.from({ length: mission.reviews[0].rating }).map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 text-yellow-500"
                                  fill="currentColor"
                                />
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
