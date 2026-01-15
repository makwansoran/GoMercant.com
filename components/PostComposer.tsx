'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, Loader2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/auth';

interface PostComposerProps {
  onPostCreated?: () => void;
}

const MAX_CHARS = 500;
const MAX_IMAGES = 4;

export const PostComposer: React.FC<PostComposerProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = getCurrentUser();
  const charsRemaining = MAX_CHARS - content.length;
  const isOverLimit = charsRemaining < 0;
  const canPost = content.trim().length > 0 && !isOverLimit && !isPosting;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setError('');
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 300)}px`;
    }
  };

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = MAX_IMAGES - images.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Images must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImages((prev) => {
          if (prev.length >= MAX_IMAGES) return prev;
          return [...prev, result];
        });
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [images.length]);

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    if (!canPost || !user) return;

    setIsPosting(true);
    setError('');

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: content.trim(),
          images: images.length > 0 ? images : null,
          authorId: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create post');
        return;
      }

      // Clear form
      setContent('');
      setImages([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      setIsFocused(false);
      onPostCreated?.();
    } catch (err) {
      console.error('Post error:', err);
      setError('Failed to create post. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  const getCharCountColor = () => {
    if (charsRemaining < 0) return 'text-red-500';
    if (charsRemaining < 50) return 'text-orange-500';
    return 'text-muted-foreground';
  };

  const getProgressColor = () => {
    const percentage = (content.length / MAX_CHARS) * 100;
    if (percentage >= 100) return 'stroke-red-500';
    if (percentage >= 90) return 'stroke-orange-500';
    return 'stroke-orange-500';
  };

  if (!user) {
    return (
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-center py-6 text-center">
          <div>
            <p className="text-muted-foreground mb-2">Sign in to share your thoughts</p>
            <Button variant="outline" onClick={() => window.location.href = '/login'}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-200">
      <div className="px-4 pt-4 pb-2">
        <div className="flex gap-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">
                {user.name?.charAt(0).toUpperCase() || '?'}
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {/* Audience selector (X-style) */}
            {isFocused && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-2"
              >
                <button className="inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold text-orange-500 border border-orange-200 rounded-full hover:bg-orange-50 transition-colors">
                  <Globe className="w-3.5 h-3.5" />
                  Everyone
                </button>
              </motion.div>
            )}

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleTextChange}
              onFocus={() => setIsFocused(true)}
              placeholder="What's happening?"
              className="w-full resize-none border-0 bg-transparent text-lg placeholder:text-gray-400 focus:outline-none focus:ring-0 min-h-[56px]"
              rows={1}
            />

            {/* Image Preview */}
            <AnimatePresence>
              {images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`mt-3 grid gap-2 ${
                    images.length === 1 ? 'grid-cols-1' : 
                    images.length === 2 ? 'grid-cols-2' : 
                    images.length === 3 ? 'grid-cols-2' : 
                    'grid-cols-2'
                  }`}
                >
                  {images.map((img, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`relative rounded-xl overflow-hidden ${
                        images.length === 3 && index === 0 ? 'row-span-2' : ''
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Upload ${index + 1}`}
                        className={`w-full object-cover ${
                          images.length === 1 ? 'max-h-96' : 
                          images.length === 3 && index === 0 ? 'h-full' :
                          'h-40'
                        }`}
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-red-500"
              >
                {error}
              </motion.p>
            )}

            {/* Actions Bar */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1">
                {/* Image Upload Button */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={images.length >= MAX_IMAGES}
                  className="p-2 rounded-full hover:bg-orange-50 text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Add images"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                {/* Character Counter */}
                {content.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6">
                      <svg className="w-6 h-6 -rotate-90">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          className={getProgressColor()}
                          strokeWidth="2"
                          strokeDasharray={`${Math.min((content.length / MAX_CHARS) * 62.83, 62.83)} 62.83`}
                        />
                      </svg>
                      {charsRemaining <= 20 && (
                        <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-medium ${getCharCountColor()}`}>
                          {charsRemaining}
                        </span>
                      )}
                    </div>
                    {content.length > 0 && (
                      <div className="w-px h-6 bg-gray-200" />
                    )}
                  </div>
                )}

                {/* Post Button */}
                <Button
                  onClick={handlePost}
                  disabled={!canPost}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-5 font-semibold"
                >
                  {isPosting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    'Post'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
