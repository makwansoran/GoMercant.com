'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search,
  MessageCircle,
  Calendar,
  Lock,
  Crown
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Community {
  id: string;
  name: string;
  description: string;
  icon?: string;
  memberCount: number;
  postCount: number;
  category: string;
  isPrivate: boolean;
  isJoined: boolean;
  tags: string[];
  recentActivity: string;
}

const placeholderCommunities: Community[] = [];

export const Communities: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [communities, setCommunities] = useState<Community[]>(placeholderCommunities);
  const [filter, setFilter] = useState<'all' | 'joined'>('all');

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (filter === 'joined') {
      return matchesSearch && community.isJoined;
    }
    return matchesSearch;
  });

  const handleJoinToggle = (communityId: string) => {
    setCommunities(prev => prev.map(c => 
      c.id === communityId ? { ...c, isJoined: !c.isJoined } : c
    ));
  };

  const formatMemberCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="flex flex-col h-full px-4 py-6 pb-24 overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="max-w-4xl mx-auto w-full space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold">Communities</h1>
            <p className="text-muted-foreground">Connect with like-minded professionals</p>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search communities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'joined' ? 'default' : 'outline'}
                onClick={() => setFilter('joined')}
              >
                Joined
              </Button>
            </div>
          </div>

          {/* Communities Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {filteredCommunities.length === 0 ? (
              <Card className="md:col-span-2">
                <CardContent className="py-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No communities found</p>
                </CardContent>
              </Card>
            ) : (
              filteredCommunities.map((community) => (
                <Card key={community.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-14 w-14 rounded-xl">
                        <AvatarFallback className="rounded-xl bg-primary/10 text-2xl">
                          {community.icon}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold truncate">{community.name}</h3>
                          {community.isPrivate && (
                            <Lock className="h-3 w-3 text-muted-foreground" />
                          )}
                          {community.isJoined && (
                            <Badge variant="secondary" className="text-xs">
                              <Crown className="h-3 w-3 mr-1" />
                              Joined
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {community.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {formatMemberCount(community.memberCount)} members
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {formatMemberCount(community.postCount)} posts
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {community.recentActivity}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {community.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            size="sm"
                            variant={community.isJoined ? 'outline' : 'default'}
                            onClick={() => handleJoinToggle(community.id)}
                          >
                            {community.isJoined ? 'Leave' : 'Join'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
