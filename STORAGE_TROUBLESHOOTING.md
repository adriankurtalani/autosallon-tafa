# Supabase Storage Troubleshooting Guide

If you're experiencing issues with image uploads (400 errors, images not displaying), follow these steps:

## 1. Verify Bucket Configuration

1. Go to **Supabase Dashboard** → **Storage**
2. Find the `car-images` bucket
3. Click on it to open settings
4. **IMPORTANT**: Make sure it's set to **Public**
   - If it's private, click the toggle to make it public
   - Public buckets allow images to be accessed without authentication

## 2. Verify Storage Policies

Go to **Storage** → **Policies** → **car-images** and make sure you have these 4 policies:

### Policy 1: Allow authenticated users to upload
- **Name**: "Allow authenticated users to upload images"
- **Operation**: INSERT
- **Target roles**: authenticated
- **Policy definition**: `bucket_id = 'car-images'`

### Policy 2: Allow authenticated users to update
- **Name**: "Allow authenticated users to update images"
- **Operation**: UPDATE
- **Target roles**: authenticated
- **Policy definition**: `bucket_id = 'car-images'`

### Policy 3: Allow authenticated users to delete
- **Name**: "Allow authenticated users to delete images"
- **Operation**: DELETE
- **Target roles**: authenticated
- **Policy definition**: `bucket_id = 'car-images'`

### Policy 4: Allow public read access
- **Name**: "Allow public read access"
- **Operation**: SELECT
- **Target roles**: public
- **Policy definition**: `bucket_id = 'car-images'`

**To fix policies using SQL Editor:**

1. Go to **SQL Editor** in Supabase dashboard
2. Run this SQL:

```sql
-- Drop existing policies if they exist (optional)
DROP POLICY IF EXISTS "Allow authenticated users to upload images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;

-- Create policies
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'car-images');

CREATE POLICY "Allow authenticated users to update images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'car-images');

CREATE POLICY "Allow authenticated users to delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'car-images');

CREATE POLICY "Allow public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'car-images');
```

## 3. Check Browser Console

When uploading images, check the browser console (F12) for:
- Upload progress logs
- Error messages
- The generated image URLs

Common errors:
- **"Bucket not found"** → Create the bucket in Supabase dashboard
- **"new row violates row-level security"** → Policies are incorrect
- **403 Forbidden** → Policies don't allow authenticated uploads
- **400 Bad Request** → File might not exist or bucket isn't public

## 4. Verify Authentication

Make sure you're logged in to the admin panel:
1. Go to `/login`
2. Enter your credentials
3. You should be redirected to `/admin`
4. Try uploading an image again

## 5. Test Image Access

After uploading, check if the image URL works:
1. Copy the image URL from the browser console
2. Paste it in a new browser tab
3. If you see a 400 error, the bucket isn't public or policies are wrong
4. If you see the image, the issue is with Next.js Image component

## 6. Verify Next.js Config

Make sure `next.config.js` includes:

```js
{
  protocol: 'https',
  hostname: '*.supabase.co',
}
```

After making changes, **restart your development server**.

## 7. Common Issues and Solutions

### Issue: 400 error when viewing images
**Solution**: Bucket must be **Public**, not Private

### Issue: Upload fails with "permission denied"
**Solution**: Check that INSERT policy exists for authenticated users

### Issue: Images upload but don't display
**Solution**: 
1. Check bucket is public
2. Verify SELECT policy exists for public role
3. Restart Next.js dev server after config changes

### Issue: "Bucket not found" error
**Solution**: Create the bucket named exactly `car-images` in Supabase Storage

## Still Having Issues?

1. Check Supabase dashboard → Storage → car-images → Files
2. See if your uploaded files appear there
3. If files exist but URLs don't work, bucket isn't public
4. If files don't exist, upload is failing (check policies)

