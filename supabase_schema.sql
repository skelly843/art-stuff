-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Artworks Table
CREATE TABLE artworks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  medium TEXT,
  dimensions TEXT,
  year_painted INTEGER, -- Renamed from year to match component
  price DECIMAL(12, 2) NOT NULL,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold')),
  category TEXT,
  image_urls TEXT[] DEFAULT '{}', -- Array of image URLs from storage
  is_featured BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false
);

-- 2. Profiles (Admin) Table
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
  status TEXT DEFAULT 'pending'
);

-- 4. Commissions Table
CREATE TABLE commissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  details TEXT NOT NULL,
  budget_range TEXT,
  status TEXT DEFAULT 'requested'
);

-- 5. Newsletter Subscriptions
CREATE TABLE newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL
);

-- RLS
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view artworks" ON artworks FOR SELECT USING (true);

-- Storage (Bucket name should be 'artworks')
