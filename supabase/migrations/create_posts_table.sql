-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  images TEXT, -- JSON array of image URLs/base64
  likes INTEGER DEFAULT 0,
  reposts INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policy to allow all users to read posts
CREATE POLICY "Anyone can read posts" ON posts
  FOR SELECT USING (true);

-- Policy to allow anyone to create posts (auth handled at API level)
CREATE POLICY "Anyone can create posts" ON posts
  FOR INSERT WITH CHECK (true);

-- Policy to allow anyone to update posts (auth handled at API level)
CREATE POLICY "Anyone can update posts" ON posts
  FOR UPDATE USING (true);

-- Policy to allow anyone to delete posts (auth handled at API level)
CREATE POLICY "Anyone can delete posts" ON posts
  FOR DELETE USING (true);
