'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Loader2 } from 'lucide-react';
import { PostComposer } from './PostComposer';

interface Author {
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
  author: Author | null;
  createdAt: string;
  updatedAt: string;
}

interface FeedProps {
  onNavigate?: (view: string) => void;
}

export const Feed: React.FC<FeedProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'for-you' | 'following'>('for-you');

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Failed to fetch posts');
        return;
      }
      
      setPosts(data.posts || []);
    } catch (err) {
      setError('Failed to fetch posts');
      console.error('Fetch posts error:', err);
    } finally {
      setLoading(false);
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

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header with Tabs */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-20">
        <div className="max-w-2xl mx-auto">
          <div className="flex">
            <button
              onClick={() => setActiveTab('for-you')}
              className="flex-1 relative py-4 text-sm font-semibold transition-colors hover:bg-gray-50"
            >
              <span className={activeTab === 'for-you' ? 'text-foreground' : 'text-muted-foreground'}>
                For you
              </span>
              {activeTab === 'for-you' && (
                <motion.div
                  layoutId="feedActiveTab"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-orange-500 rounded-full"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className="flex-1 relative py-4 text-sm font-semibold transition-colors hover:bg-gray-50"
            >
              <span className={activeTab === 'following' ? 'text-foreground' : 'text-muted-foreground'}>
                Following
              </span>
              {activeTab === 'following' && (
                <motion.div
                  layoutId="feedActiveTab"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-orange-500 rounded-full"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Post Composer */}
          <PostComposer onPostCreated={handlePostCreated} />

          {/* Posts List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-orange-500 mb-4" />
              <p className="text-muted-foreground text-sm">Loading posts...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <p className="text-destructive text-sm mb-2">{error}</p>
              <button
                onClick={fetchPosts}
                className="text-orange-500 hover:underline text-sm font-medium"
              >
                Try again
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Welcome to the Feed!</h3>
              <p className="text-muted-foreground max-w-sm">
                This is where you&apos;ll see announcements and opinions. Be the first to share something!
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="px-4 py-3">
                    <div className="flex gap-3">
                      {/* Author Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">
                          {post.author?.name?.charAt(0).toUpperCase() || '?'}
                        </div>
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
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};
