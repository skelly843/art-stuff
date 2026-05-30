-- SUPABASE SCHEMA SUGGESTIONS

-- 1. Artworks Table
CREATE TABLE artworks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  medium TEXT,
  dimensions TEXT,
  year INTEGER,
  price DECIMAL(12, 2) NOT NULL,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold')),
  category TEXT,
  image_urls TEXT[] DEFAULT '{}', -- Array of image URLs from storage
  is_featured BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false
);

-- 2. Profiles (Admin) Table
-- Linked to Supabase Auth
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'admin'
);

-- 3. Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  artwork_id UUID REFERENCES artworks(id),
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  amount_paid DECIMAL(12, 2) NOT NULL,
  stripe_session_id TEXT,
  status TEXT DEFAULT 'pending' -- pending, completed, cancelled
);

-- 4. Commissions Table (Optional)
CREATE TABLE commissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  details TEXT NOT NULL,
  budget_range TEXT,
  status TEXT DEFAULT 'requested' -- requested, in-progress, completed, declined
);

-- 5. Newsletter Subscriptions
CREATE TABLE newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL
);

-- ROW LEVEL SECURITY (RLS) POLICIES

-- Artworks: Everyone can view, only admin can modify
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view artworks" ON artworks FOR SELECT USING (true);
CREATE POLICY "Admin can do everything with artworks" ON artworks FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role' OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Orders: Only admin can view
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin can view orders" ON orders FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- STORAGE BUCKETS
-- You should create a public bucket named 'artworks' for uploading images.
