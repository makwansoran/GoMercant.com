-- Add missing columns to missions table for logo and avatar support

-- Add poster_logo column (stores the organization's logo)
ALTER TABLE missions ADD COLUMN IF NOT EXISTS poster_logo TEXT;

-- Add contact_avatar column (stores the contact person's avatar)
ALTER TABLE missions ADD COLUMN IF NOT EXISTS contact_avatar TEXT;

-- Add business_id column (links to the business/organization)
ALTER TABLE missions ADD COLUMN IF NOT EXISTS business_id UUID REFERENCES businesses(id) ON DELETE SET NULL;

-- Add attachments column (stores uploaded files as JSON)
ALTER TABLE missions ADD COLUMN IF NOT EXISTS attachments TEXT;

-- Create index for business_id
CREATE INDEX IF NOT EXISTS idx_missions_business_id ON missions(business_id);
