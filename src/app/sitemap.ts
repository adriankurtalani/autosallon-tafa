import { MetadataRoute } from 'next';
import { getAllCars } from '@/lib/supabase/cars';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://autosallontafa.al';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all cars - handle gracefully if Supabase is not configured
  let cars: any[] = [];
  try {
    // Check if Supabase environment variables are set
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      cars = await getAllCars();
    }
  } catch (error) {
    // If Supabase is not configured or fails, continue with empty cars array
    console.warn('Could not fetch cars for sitemap:', error);
    cars = [];
  }
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/cars`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
  
  // Dynamic car pages
  const carPages: MetadataRoute.Sitemap = cars.map((car) => ({
    url: `${SITE_URL}/cars/${car.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: car.featured ? 0.9 : 0.8,
  }));
  
  return [...staticPages, ...carPages];
}

