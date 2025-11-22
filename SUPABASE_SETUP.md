# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Note down your project URL and anon key

## 2. Create Storage Bucket

1. Go to **Storage** in your Supabase dashboard
2. Click **"New bucket"**
3. Name it: `car-images`
4. Make it **Public** (so images can be accessed without authentication)
5. Click **"Create bucket"**

## 3. Set Storage Policies

After creating the bucket, go to **Storage** → **Policies** → **car-images** and run this SQL:

```sql
-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'car-images');

-- Allow authenticated users to update images
CREATE POLICY "Allow authenticated users to update images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'car-images');

-- Allow authenticated users to delete images
CREATE POLICY "Allow authenticated users to delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'car-images');

-- Allow public read access to images
CREATE POLICY "Allow public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'car-images');
```

## 4. Create Database Table

Run this SQL in the Supabase SQL Editor:

```sql
-- Create cars table
CREATE TABLE IF NOT EXISTS cars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price INTEGER NOT NULL,
  mileage INTEGER NOT NULL,
  fuel_type TEXT NOT NULL CHECK (fuel_type IN ('Diesel', 'Benzinë', 'Hybrid', 'Elektrike')),
  transmission TEXT NOT NULL CHECK (transmission IN ('Automatik', 'Manual')),
  power_hp INTEGER,
  color TEXT,
  body_type TEXT,
  is_new BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  main_image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  options TEXT[] DEFAULT '{}',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_cars_slug ON cars(slug);
CREATE INDEX IF NOT EXISTS idx_cars_brand ON cars(brand);
CREATE INDEX IF NOT EXISTS idx_cars_featured ON cars(featured);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (anyone can view cars)
CREATE POLICY "Allow public read access" ON cars
    FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert/update/delete
-- Only authenticated users (admin) can modify cars
CREATE POLICY "Allow authenticated users to manage cars" ON cars
    FOR ALL USING (auth.role() = 'authenticated');
```

## 5. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 6. Migrate Existing Data (Optional)

If you want to migrate the existing car data from `src/lib/data/cars.ts` to Supabase, you can use the admin panel or run a migration script.

## 7. Create Admin User

1. Go to **Authentication** → **Users** in your Supabase dashboard
2. Click **"Add user"** → **"Create new user"**
3. Enter your email and password
4. Click **"Create user"**
5. **Important:** Make sure to note down your email and password - you'll need them to log in

## 8. Enable Email Authentication (if needed)

1. Go to **Authentication** → **Providers** in Supabase dashboard
2. Make sure **Email** provider is enabled
3. You can disable email confirmation for easier testing (Settings → Auth → Email Auth → Enable email confirmations: OFF)

## 9. Access Admin Panel

1. Visit `/login` on your website
2. Enter the email and password you created in step 5
3. After successful login, you'll be redirected to `/admin`
4. You can now manage your cars!

## Security Notes

- The admin panel is now protected - only authenticated users can access it
- Public users can still view all cars (read-only)
- Only authenticated admin users can create, update, or delete cars
- Make sure to keep your admin credentials secure

