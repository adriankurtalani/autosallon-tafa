import { supabase } from './client';
import { Car } from '@/types/car';

// Convert database row to Car type
function dbRowToCar(row: any): Car {
  return {
    id: row.id,
    slug: row.slug,
    brand: row.brand,
    model: row.model,
    year: row.year,
    price: row.price,
    mileage: row.mileage,
    fuelType: row.fuel_type,
    transmission: row.transmission,
    powerHp: row.power_hp,
    color: row.color,
    bodyType: row.body_type,
    isNew: row.is_new ?? false,
    featured: row.featured ?? false,
    mainImage: row.main_image,
    gallery: row.gallery || [],
    options: row.options || [],
    description: row.description,
  };
}

// Convert Car type to database insert format
function carToDbRow(car: Partial<Car>): any {
  return {
    slug: car.slug,
    brand: car.brand,
    model: car.model,
    year: car.year,
    price: car.price,
    mileage: car.mileage,
    fuel_type: car.fuelType,
    transmission: car.transmission,
    power_hp: car.powerHp,
    color: car.color,
    body_type: car.bodyType,
    is_new: car.isNew,
    featured: car.featured,
    main_image: car.mainImage,
    gallery: car.gallery || [],
    options: car.options || [],
    description: car.description,
  };
}

// Fetch all cars
export async function getAllCars(): Promise<Car[]> {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching cars:', error);
    return [];
  }

  return data.map(dbRowToCar);
}

// Fetch featured cars
export async function getFeaturedCars(): Promise<Car[]> {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching featured cars:', error);
    return [];
  }

  return data.map(dbRowToCar);
}

// Fetch car by slug
export async function getCarBySlug(slug: string): Promise<Car | null> {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching car:', error);
    return null;
  }

  return dbRowToCar(data);
}

// Fetch car by ID
export async function getCarById(id: string): Promise<Car | null> {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching car:', error);
    return null;
  }

  return dbRowToCar(data);
}

// Get unique brands
export async function getCarBrands(): Promise<string[]> {
  const { data, error } = await supabase
    .from('cars')
    .select('brand')
    .order('brand', { ascending: true });

  if (error) {
    console.error('Error fetching brands:', error);
    return [];
  }

  return Array.from(new Set(data.map(row => row.brand))).sort();
}

// Create a new car
export async function createCar(car: Omit<Car, 'id'>): Promise<Car | null> {
  const dbRow = carToDbRow(car);
  
  const { data, error } = await supabase
    .from('cars')
    .insert(dbRow)
    .select()
    .single();

  if (error) {
    console.error('Error creating car:', error);
    return null;
  }

  return dbRowToCar(data);
}

// Update a car
export async function updateCar(id: string, car: Partial<Car>): Promise<Car | null> {
  const dbRow = carToDbRow(car);
  dbRow.updated_at = new Date().toISOString();
  
  const { data, error } = await supabase
    .from('cars')
    .update(dbRow)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating car:', error);
    return null;
  }

  return dbRowToCar(data);
}

// Delete a car
export async function deleteCar(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('cars')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting car:', error);
    return false;
  }

  return true;
}

