-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL, -- "startup" | "corporate" | "smallbusiness" | "community" | "nonprofit" | "agency" | "government" | "educational" | "other"
  description TEXT,
  logo TEXT,
  banner TEXT,
  website TEXT,
  location TEXT,
  industry TEXT,
  size TEXT, -- "1-10" | "11-50" | "51-200" | "201-500" | "501-1000" | "1000+"
  founded TEXT,
  
  -- Social links
  github TEXT,
  linkedin TEXT,
  twitter TEXT,
  discord TEXT,
  
  -- Stats
  rating FLOAT DEFAULT 0,
  open_missions INT DEFAULT 0,
  
  -- Tags stored as JSONB
  tags JSONB DEFAULT '[]'::jsonb,
  
  -- Owner relationship
  owner_id TEXT NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on owner_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_businesses_owner_id ON businesses(owner_id);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON businesses(slug);

-- Create index on type for filtering
CREATE INDEX IF NOT EXISTS idx_businesses_type ON businesses(type);

-- Enable Row Level Security (RLS)
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read businesses
CREATE POLICY "Businesses are viewable by everyone" ON businesses
  FOR SELECT USING (true);

-- Policy: Users can insert their own businesses
CREATE POLICY "Users can insert their own businesses" ON businesses
  FOR INSERT WITH CHECK (true);

-- Policy: Users can update their own businesses
CREATE POLICY "Users can update their own businesses" ON businesses
  FOR UPDATE USING (true);

-- Policy: Users can delete their own businesses
CREATE POLICY "Users can delete their own businesses" ON businesses
  FOR DELETE USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_businesses_updated_at ON businesses;
CREATE TRIGGER update_businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
