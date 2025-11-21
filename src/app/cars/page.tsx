"use client";

import * as React from "react";
import { Car } from "@/types/car";
import { CarCard } from "@/components/ui/car-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { carsData, getCarBrands } from "@/lib/data/cars";
import { 
  Search, 
  Filter, 
  SlidersHorizontal,
  X,
  ChevronDown
} from "lucide-react";

type SortOption = "newest" | "oldest" | "price-low" | "price-high" | "mileage-low" | "mileage-high";

export default function CarsPage() {
  const [cars, setCars] = React.useState<Car[]>(carsData);
  const [filteredCars, setFilteredCars] = React.useState<Car[]>(carsData);
  const [showFilters, setShowFilters] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<SortOption>("newest");
  
  // Filter states
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = React.useState<string[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 100000]);
  const [yearRange, setYearRange] = React.useState<[number, number]>([2010, 2025]);
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const brands = getCarBrands();
  const transmissions = ["Automatik", "Manual"];
  const fuelTypes = ["Diesel", "Benzinë", "Hybrid", "Elektrike"];
  
  // Apply filters and sorting
  React.useEffect(() => {
    let result = [...carsData];
    
    // Apply search query
    if (searchQuery) {
      result = result.filter(car => 
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(car => selectedBrands.includes(car.brand));
    }
    
    // Apply transmission filter
    if (selectedTransmissions.length > 0) {
      result = result.filter(car => selectedTransmissions.includes(car.transmission));
    }
    
    // Apply fuel type filter
    if (selectedFuelTypes.length > 0) {
      result = result.filter(car => selectedFuelTypes.includes(car.fuelType));
    }
    
    // Apply price range filter
    result = result.filter(car => car.price >= priceRange[0] && car.price <= priceRange[1]);
    
    // Apply year range filter
    result = result.filter(car => car.year >= yearRange[0] && car.year <= yearRange[1]);
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.year - a.year;
        case "oldest":
          return a.year - b.year;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "mileage-low":
          return a.mileage - b.mileage;
        case "mileage-high":
          return b.mileage - a.mileage;
        default:
          return 0;
      }
    });
    
    setFilteredCars(result);
  }, [searchQuery, selectedBrands, selectedTransmissions, selectedFuelTypes, priceRange, yearRange, sortBy]);
  
  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedTransmissions([]);
    setSelectedFuelTypes([]);
    setPriceRange([0, 100000]);
    setYearRange([2010, 2025]);
    setSearchQuery("");
  };
  
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };
  
  const toggleTransmission = (transmission: string) => {
    setSelectedTransmissions(prev => 
      prev.includes(transmission) 
        ? prev.filter(t => t !== transmission)
        : [...prev, transmission]
    );
  };
  
  const toggleFuelType = (fuelType: string) => {
    setSelectedFuelTypes(prev => 
      prev.includes(fuelType) 
        ? prev.filter(f => f !== fuelType)
        : [...prev, fuelType]
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-black">Inventari i Veturave</h1>
              <p className="mt-2 text-gray-600">
                {filteredCars.length} vetura të disponueshme
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Kërko marka ose model..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtrat
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} w-full lg:w-80`}>
            <Card className="sticky top-24 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center text-black">
                  <Filter className="h-5 w-5 mr-2 text-black" />
                  Filtrat
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Pastro
                </Button>
              </CardHeader>
              
              <CardContent className="space-y-6 overflow-hidden">
                {/* Brands */}
                <div>
                  <h3 className="font-semibold mb-3">Marka</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span className="ml-2 text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3">Çmimi (€)</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-full px-2 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])}
                        className="w-full px-2 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Year Range */}
                <div>
                  <h3 className="font-semibold mb-3">Viti</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <select 
                      value={yearRange[0]}
                      onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
                      className="w-full px-2 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black"
                    >
                      {Array.from({ length: 16 }, (_, i) => 2010 + i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <select 
                      value={yearRange[1]}
                      onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                      className="w-full px-2 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black"
                    >
                      {Array.from({ length: 16 }, (_, i) => 2010 + i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Transmission */}
                <div>
                  <h3 className="font-semibold mb-3">Transmisioni</h3>
                  <div className="space-y-2">
                    {transmissions.map((transmission) => (
                      <label key={transmission} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedTransmissions.includes(transmission)}
                          onChange={() => toggleTransmission(transmission)}
                          className="rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span className="ml-2 text-sm">{transmission}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Fuel Type */}
                <div>
                  <h3 className="font-semibold mb-3">Karburanti</h3>
                  <div className="space-y-2">
                    {fuelTypes.map((fuelType) => (
                      <label key={fuelType} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFuelTypes.includes(fuelType)}
                          onChange={() => toggleFuelType(fuelType)}
                          className="rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span className="ml-2 text-sm">{fuelType}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Cars Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-wrap gap-2">
                {selectedBrands.map((brand) => (
                  <Badge key={brand} variant="secondary" className="flex items-center gap-1">
                    {brand}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleBrand(brand)} />
                  </Badge>
                ))}
                {selectedTransmissions.map((transmission) => (
                  <Badge key={transmission} variant="secondary" className="flex items-center gap-1">
                    {transmission}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleTransmission(transmission)} />
                  </Badge>
                ))}
                {selectedFuelTypes.map((fuelType) => (
                  <Badge key={fuelType} variant="secondary" className="flex items-center gap-1">
                    {fuelType}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFuelType(fuelType)} />
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Rendit sipas:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black"
                >
                  <option value="newest">Më i ri</option>
                  <option value="oldest">Më i vjetër</option>
                  <option value="price-low">Çmimi (i ulët)</option>
                  <option value="price-high">Çmimi (i lartë)</option>
                  <option value="mileage-low">Km (më pak)</option>
                  <option value="mileage-high">Km (më shumë)</option>
                </select>
              </div>
            </div>
            
            {/* Cars Grid */}
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-lg font-semibold">Nuk u gjetën vetura</p>
                  <p className="text-sm">Provoni të ndryshoni kriteret e kërkimit</p>
                </div>
                <Button onClick={clearFilters} variant="outline">
                  Pastro Filtrat
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
