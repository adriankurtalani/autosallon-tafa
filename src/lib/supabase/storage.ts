import { supabase } from './client';

const BUCKET_NAME = 'car-images';

// Verify bucket exists and is accessible
export async function verifyBucket(): Promise<boolean> {
  try {
    const { data, error } = await supabase.storage.from(BUCKET_NAME).list('', {
      limit: 1
    });
    
    if (error) {
      console.error('Bucket verification failed:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error verifying bucket:', error);
    return false;
  }
}

// Upload a single image file
export async function uploadCarImage(file: File, carId: string, index: number): Promise<string | null> {
  try {
    // Check if user is authenticated
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      throw new Error('You must be logged in to upload images');
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `${carId}/${index}-${Date.now()}.${fileExt}`;
    
    console.log('Uploading image:', { 
      fileName, 
      carId, 
      fileSize: file.size, 
      fileType: file.type,
      bucket: BUCKET_NAME,
      userId: session.user.id
    });
    
    // Upload file
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type || 'image/jpeg'
      });

    if (error) {
      console.error('Error uploading image:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      console.error('Error code:', error.statusCode);
      
      // Provide helpful error messages
      if (error.message?.includes('Bucket not found')) {
        throw new Error('Storage bucket "car-images" not found. Please create it in Supabase dashboard.');
      }
      if (error.message?.includes('new row violates row-level security')) {
        throw new Error('Storage policy error. Please check your bucket policies in Supabase.');
      }
      if (error.statusCode === 403) {
        throw new Error('Permission denied. Please check your storage policies allow authenticated users to upload.');
      }
      
      throw new Error(`Upload failed: ${error.message || 'Unknown error'}`);
    }

    if (!data) {
      console.error('Upload succeeded but no data returned');
      return null;
    }

    console.log('Upload successful, data:', data);

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    console.log('Public URL generated:', urlData.publicUrl);
    
    // Verify the URL is accessible
    const testResponse = await fetch(urlData.publicUrl, { method: 'HEAD' });
    if (!testResponse.ok) {
      console.warn('Warning: Generated URL returned', testResponse.status, '- Image may not be accessible');
    }
    
    return urlData.publicUrl;
  } catch (error: any) {
    console.error('Error uploading image:', error);
    console.error('Error stack:', error?.stack);
    throw error; // Re-throw to let caller handle it
  }
}

// Upload multiple images
export async function uploadCarImages(files: File[], carId: string): Promise<string[]> {
  const results: (string | null)[] = [];
  
  // Upload files sequentially to avoid overwhelming the API
  for (let i = 0; i < files.length; i++) {
    try {
      const url = await uploadCarImage(files[i], carId, i);
      results.push(url);
    } catch (error: any) {
      console.error(`Failed to upload image ${i + 1}:`, error);
      results.push(null);
    }
  }
  
  const successfulUploads = results.filter((url): url is string => url !== null);
  console.log(`Successfully uploaded ${successfulUploads.length} out of ${files.length} images`);
  
  return successfulUploads;
}

// Delete an image from storage
export async function deleteCarImage(imagePath: string): Promise<boolean> {
  try {
    // Extract path from full URL
    const path = imagePath.split('/').slice(-2).join('/'); // Get carId/filename
    
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);

    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}

// Delete all images for a car
export async function deleteCarImages(carId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(carId);

    if (error) {
      console.error('Error listing images:', error);
      return false;
    }

    if (data && data.length > 0) {
      const paths = data.map(file => `${carId}/${file.name}`);
      const { error: deleteError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove(paths);

      if (deleteError) {
        console.error('Error deleting images:', deleteError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error deleting car images:', error);
    return false;
  }
}

// Get public URL for an image
export function getImageUrl(path: string): string {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path);
  return data.publicUrl;
}

