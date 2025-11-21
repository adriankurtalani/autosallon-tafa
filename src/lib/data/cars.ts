import { Car } from "@/types/car";

export const carsData: Car[] = [
  {
    id: "1",
    slug: "bmw-x5-2022",
    brand: "BMW",
    model: "X5",
    year: 2022,
    price: 75000,
    mileage: 25000,
    fuelType: "Diesel",
    transmission: "Automatik",
    powerHp: 265,
    color: "E Zezë",
    bodyType: "SUV",
    isNew: false,
    featured: true,
    mainImage: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop",
    ],
    options: ["Navigacion", "Klimë Automatike", "Sensorë Parkimi", "Kamera"],
    description: "BMW X5 në gjendje të shkëlqyer, i mirëmbajtur rregullisht. Veturë ideale për familje me hapësirë të bollshme dhe performancë të lartë."
  },
  {
    id: "2",
    slug: "audi-a4-2021",
    brand: "Audi",
    model: "A4",
    year: 2021,
    price: 42000,
    mileage: 35000,
    fuelType: "Benzinë",
    transmission: "Manual",
    powerHp: 190,
    color: "E Bardhë",
    bodyType: "Sedan",
    isNew: false,
    featured: true,
    mainImage: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop",
    ],
    options: ["LED Headlights", "Klimë", "Bluetooth"],
    description: "Audi A4 elegante dhe ekonomike, perfekte për përdorim të përditshëm."
  },
  {
    id: "3",
    slug: "mercedes-c-class-2023",
    brand: "Mercedes",
    model: "C-Class",
    year: 2023,
    price: 58000,
    mileage: 12000,
    fuelType: "Hybrid",
    transmission: "Automatik",
    powerHp: 204,
    color: "Gri",
    bodyType: "Sedan",
    isNew: true,
    featured: true,
    mainImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=800&h=600&fit=crop",
    ],
    options: ["Teknologji Avancuar", "Klimë Multi-Zone", "Sensorë", "Ambient Lighting"],
    description: "Mercedes C-Class hybrid i ri me teknologji të fundit dhe efikasitet të lartë në karburant."
  },
  {
    id: "4",
    slug: "volkswagen-golf-2020",
    brand: "Volkswagen",
    model: "Golf",
    year: 2020,
    price: 28000,
    mileage: 48000,
    fuelType: "Diesel",
    transmission: "Manual",
    powerHp: 150,
    color: "Blu",
    bodyType: "Hatchback",
    isNew: false,
    featured: false,
    mainImage: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&h=600&fit=crop",
    ],
    options: ["Radio", "Klimë"],
    description: "Volkswagen Golf i besueshëm dhe ekonomik, i përshtatshëm për çdo përdorim."
  },
  {
    id: "5",
    slug: "tesla-model-3-2022",
    brand: "Tesla",
    model: "Model 3",
    year: 2022,
    price: 52000,
    mileage: 18000,
    fuelType: "Elektrike",
    transmission: "Automatik",
    powerHp: 283,
    color: "E Kuqe",
    bodyType: "Sedan",
    isNew: false,
    featured: true,
    mainImage: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571995002779-8d3d5d2d4f8c?w=800&h=600&fit=crop",
    ],
    options: ["Autopilot", "Supercharging", "Premium Audio", "Glass Roof"],
    description: "Tesla Model 3 me teknologji elektrike të avancuar dhe performancë të shkëlqyer."
  },
  {
    id: "6",
    slug: "ford-focus-2021",
    brand: "Ford",
    model: "Focus",
    year: 2021,
    price: 22000,
    mileage: 42000,
    fuelType: "Benzinë",
    transmission: "Automatik",
    powerHp: 125,
    color: "E Zezë",
    bodyType: "Hatchback",
    isNew: false,
    featured: false,
    mainImage: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
    ],
    options: ["SYNC3", "Klimë", "Cruise Control"],
    description: "Ford Focus praktik dhe i përballueshëm, zgjidhja ideale për qytet."
  }
];

// Utility functions for filtering and sorting
export const getCarBrands = (): string[] => {
  return Array.from(new Set(carsData.map(car => car.brand))).sort();
};

export const getFeaturedCars = (): Car[] => {
  return carsData.filter(car => car.featured);
};

export const getCarBySlug = (slug: string): Car | undefined => {
  return carsData.find(car => car.slug === slug);
};

export const filterCars = (filters: {
  brands?: string[];
  yearRange?: [number, number];
  priceRange?: [number, number];
  mileageRange?: [number, number];
  transmission?: string[];
  fuelType?: string[];
}): Car[] => {
  return carsData.filter(car => {
    if (filters.brands && filters.brands.length > 0 && !filters.brands.includes(car.brand)) return false;
    if (filters.yearRange && (car.year < filters.yearRange[0] || car.year > filters.yearRange[1])) return false;
    if (filters.priceRange && (car.price < filters.priceRange[0] || car.price > filters.priceRange[1])) return false;
    if (filters.mileageRange && (car.mileage < filters.mileageRange[0] || car.mileage > filters.mileageRange[1])) return false;
    if (filters.transmission && filters.transmission.length > 0 && !filters.transmission.includes(car.transmission)) return false;
    if (filters.fuelType && filters.fuelType.length > 0 && !filters.fuelType.includes(car.fuelType)) return false;
    return true;
  });
};
