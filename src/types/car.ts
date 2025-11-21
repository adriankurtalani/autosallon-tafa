export type Car = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: "Diesel" | "Benzinë" | "Hybrid" | "Elektrike";
  transmission: "Automatik" | "Manual";
  powerHp?: number;
  color?: string;
  bodyType?: string;
  isNew?: boolean;
  featured?: boolean;
  mainImage: string;
  gallery: string[];
  options?: string[];
  description?: string;
};

export type CarFilters = {
  brands?: string[];
  models?: string[];
  yearRange?: [number, number];
  priceRange?: [number, number];
  mileageRange?: [number, number];
  transmission?: string[];
  fuelType?: string[];
};

export type SortOption = 
  | "newest" 
  | "oldest" 
  | "price-low" 
  | "price-high" 
  | "mileage-low" 
  | "mileage-high";
