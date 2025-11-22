export interface OptimizedImage {
  file: File;
  thumbnail?: File;
  originalSize: number;
  optimizedSize: number;
  thumbnailSize?: number;
}

// Configuration for main images (used in car cards and detail pages)
const MAIN_IMAGE_OPTIONS = {
  maxSizeMB: 1, // Maximum file size in MB
  maxWidthOrHeight: 1920, // Maximum width or height
  useWebWorker: true, // Use web worker for better performance
  fileType: 'image/jpeg' as const, // Convert to JPEG for better compression
  initialQuality: 0.85, // Quality (0-1)
};

// Configuration for thumbnails (small preview images)
const THUMBNAIL_OPTIONS = {
  maxSizeMB: 0.2, // Maximum file size in MB (200KB)
  maxWidthOrHeight: 400, // Smaller size for thumbnails
  useWebWorker: true,
  fileType: 'image/jpeg' as const,
  initialQuality: 0.75, // Lower quality for thumbnails
};

/**
 * Compress a single image file
 * @param file - The image file to compress
 * @param options - Compression options
 * @returns Compressed file
 */
export async function compressImage(
  file: File,
  options = MAIN_IMAGE_OPTIONS
): Promise<File> {
  // Ensure we're on client side
  if (typeof window === 'undefined') {
    return file;
  }
  
  // Lazy load the library
  const imageCompression = (await import('browser-image-compression')).default;
  
  try {
    // Check if file is already small enough
    if (file.size <= options.maxSizeMB * 1024 * 1024) {
      // File is already small, but still optimize quality
      const compressed = await imageCompression(file, {
        ...options,
        maxSizeMB: file.size / (1024 * 1024), // Use current size as max
      });
      return compressed;
    }

    const compressed = await imageCompression(file, options);
    
    console.log(`Image compressed: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(compressed.size / 1024 / 1024).toFixed(2)}MB`);
    
    return compressed;
  } catch (error) {
    console.error('Error compressing image:', error);
    // Return original file if compression fails
    return file;
  }
}

/**
 * Generate a thumbnail from an image file
 * @param file - The image file to create thumbnail from
 * @returns Thumbnail file
 */
export async function generateThumbnail(file: File): Promise<File> {
  // Ensure we're on client side
  if (typeof window === 'undefined') {
    throw new Error('Thumbnail generation only works on client side');
  }
  
  // Lazy load the library
  const imageCompression = (await import('browser-image-compression')).default;
  
  try {
    const thumbnail = await imageCompression(file, THUMBNAIL_OPTIONS);
    
    // Rename thumbnail file
    const thumbnailName = file.name.replace(/(\.[\w]+)$/, '-thumb$1');
    const thumbnailFile = new File([thumbnail], thumbnailName, {
      type: thumbnail.type,
      lastModified: file.lastModified,
    });
    
    console.log(`Thumbnail generated: ${(thumbnailFile.size / 1024).toFixed(2)}KB`);
    
    return thumbnailFile;
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    throw error;
  }
}

/**
 * Optimize an image file (compress + generate thumbnail)
 * @param file - The image file to optimize
 * @param generateThumb - Whether to generate a thumbnail (default: true)
 * @returns Optimized image with optional thumbnail
 */
export async function optimizeImage(
  file: File,
  generateThumb = true
): Promise<OptimizedImage> {
  const originalSize = file.size;
  
  // Compress the main image
  const compressedFile = await compressImage(file);
  const optimizedSize = compressedFile.size;
  
  // Generate thumbnail if requested
  let thumbnail: File | undefined;
  let thumbnailSize: number | undefined;
  
  if (generateThumb) {
    try {
      thumbnail = await generateThumbnail(file); // Use original for better thumbnail quality
      thumbnailSize = thumbnail.size;
    } catch (error) {
      console.warn('Failed to generate thumbnail, continuing without it:', error);
    }
  }
  
  return {
    file: compressedFile,
    thumbnail,
    originalSize,
    optimizedSize,
    thumbnailSize,
  };
}

/**
 * Optimize multiple images
 * @param files - Array of image files to optimize
 * @param generateThumbnails - Whether to generate thumbnails (default: true)
 * @returns Array of optimized images
 */
export async function optimizeImages(
  files: File[],
  generateThumbnails = true
): Promise<OptimizedImage[]> {
  const results: OptimizedImage[] = [];
  
  // Process images sequentially to avoid overwhelming the browser
  for (const file of files) {
    try {
      const optimized = await optimizeImage(file, generateThumbnails);
      results.push(optimized);
    } catch (error) {
      console.error(`Failed to optimize image ${file.name}:`, error);
      // Add original file if optimization fails
      results.push({
        file,
        originalSize: file.size,
        optimizedSize: file.size,
      });
    }
  }
  
  // Log summary
  const totalOriginal = results.reduce((sum, img) => sum + img.originalSize, 0);
  const totalOptimized = results.reduce((sum, img) => sum + img.optimizedSize, 0);
  const totalThumbnails = results.reduce((sum, img) => sum + (img.thumbnailSize || 0), 0);
  const savings = ((totalOriginal - totalOptimized) / totalOriginal) * 100;
  
  console.log(`Image optimization summary:
    Original: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB
    Optimized: ${(totalOptimized / 1024 / 1024).toFixed(2)}MB
    Thumbnails: ${(totalThumbnails / 1024 / 1024).toFixed(2)}MB
    Savings: ${savings.toFixed(1)}%`);
  
  return results;
}

/**
 * Get file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

