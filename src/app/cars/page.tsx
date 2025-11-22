"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Car } from "@/types/car";
import { CarCard } from "@/components/ui/car-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllCars, getCarBrands } from "@/lib/supabase/cars";
import { 
  Search, 
  Filter, 
  SlidersHorizontal,
  X,
  ChevronDown
} from "lucide-react";

type SortOption = "newest" | "oldest" | "price-low" | "price-high" | "mileage-low" | "mileage-high";

export default function CarsPage() {
  const searchParams = useSearchParams();
  const [cars, setCars] = React.useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = React.useState<Car[]>([]);
  const [showFilters, setShowFilters] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<SortOption>("newest");
  const [loading, setLoading] = React.useState(true);
  
  // Filter states
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = React.useState<string[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 100000]);
  const [yearRange, setYearRange] = React.useState<[number, number]>([2010, 2025]);
  const [mileageRange, setMileageRange] = React.useState<[number, number]>([0, 100000]);
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const [brands, setBrands] = React.useState<string[]>([]);
  const transmissions = ["Automatik", "Manual"];
  const fuelTypes = ["Diesel", "Benzinë", "Hybrid", "Elektrike"];
  
  // Calculate min/max values from car data
  const priceMin = React.useMemo(() => cars.length > 0 ? Math.min(...cars.map(c => c.price)) : 0, [cars]);
  const priceMax = React.useMemo(() => cars.length > 0 ? Math.max(...cars.map(c => c.price)) : 100000, [cars]);
  const mileageMin = React.useMemo(() => cars.length > 0 ? Math.min(...cars.map(c => c.mileage)) : 0, [cars]);
  const mileageMax = React.useMemo(() => cars.length > 0 ? Math.max(...cars.map(c => c.mileage)) : 100000, [cars]);
  
  // Load cars and brands on mount
  React.useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [carsData, brandsData] = await Promise.all([
          getAllCars(),
          getCarBrands()
        ]);
        setCars(carsData);
        setBrands(brandsData);
      } catch (error) {
        console.error("Error loading cars:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  
  // Initialize ranges with actual data min/max (only once)
  React.useEffect(() => {
    if (cars.length > 0 && priceRange[0] === 0 && priceRange[1] === 100000) {
      setPriceRange([priceMin, priceMax]);
    }
    if (cars.length > 0 && mileageRange[0] === 0 && mileageRange[1] === 100000) {
      setMileageRange([mileageMin, mileageMax]);
    }
  }, [cars.length, priceMin, priceMax, mileageMin, mileageMax]);
  
  // Calculate active filter count
  const activeFilterCount = React.useMemo(() => {
    let count = 0;
    if (selectedBrands.length > 0) count += selectedBrands.length;
    if (selectedTransmissions.length > 0) count += selectedTransmissions.length;
    if (selectedFuelTypes.length > 0) count += selectedFuelTypes.length;
    if (priceRange[0] !== priceMin || priceRange[1] !== priceMax) count += 1;
    if (yearRange[0] !== 2010 || yearRange[1] !== 2025) count += 1;
    if (mileageRange[0] !== mileageMin || mileageRange[1] !== mileageMax) count += 1;
    if (searchQuery) count += 1;
    return count;
  }, [selectedBrands, selectedTransmissions, selectedFuelTypes, priceRange, yearRange, mileageRange, searchQuery, priceMin, priceMax, mileageMin, mileageMax]);
  
  // Initialize filters from URL parameters
  React.useEffect(() => {
    const brand = searchParams.get("brand");
    const transmission = searchParams.get("transmission");
    const yearRangeParam = searchParams.get("yearRange");
    
    if (brand) {
      setSelectedBrands([brand]);
    }
    
    if (transmission) {
      setSelectedTransmissions([transmission]);
    }
    
    if (yearRangeParam) {
      if (yearRangeParam === "2020-2025") {
        setYearRange([2020, 2025]);
      } else if (yearRangeParam === "2015-2019") {
        setYearRange([2015, 2019]);
      } else if (yearRangeParam === "2010-2014") {
        setYearRange([2010, 2014]);
      }
    }
  }, [searchParams]);
  
  // Apply filters and sorting
  React.useEffect(() => {
    if (cars.length === 0) return;
    let result = [...cars];
    
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
    
    // Apply mileage range filter
    result = result.filter(car => car.mileage >= mileageRange[0] && car.mileage <= mileageRange[1]);
    
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
  }, [cars, searchQuery, selectedBrands, selectedTransmissions, selectedFuelTypes, priceRange, yearRange, mileageRange, sortBy]);
  
  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedTransmissions([]);
    setSelectedFuelTypes([]);
    setPriceRange([priceMin, priceMax]);
    setYearRange([2010, 2025]);
    setMileageRange([mileageMin, mileageMax]);
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
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Duke ngarkuar veturat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-black">Inventari i Veturave</h1>
              <div className="mt-2 flex items-center gap-3 flex-wrap">
                <p className="text-gray-600">
                  {filteredCars.length} vetura të disponueshme
                </p>
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="bg-black text-white">
                    {activeFilterCount} {activeFilterCount === 1 ? "filtër aktiv" : "filtra aktivë"}
                  </Badge>
                )}
              </div>
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
            <Card className="lg:sticky lg:top-24 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center text-black">
                  <Filter className="h-5 w-5 mr-2 text-black" />
                  Filtrat
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary" className="ml-2 bg-black text-white">
                      {activeFilterCount}
                    </Badge>
                  )}
                </CardTitle>
                {activeFilterCount > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearFilters}
                    className="border-black text-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    aria-label="Pastro të gjitha filtrat"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Pastro
                  </Button>
                )}
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
                      <div>
                        <label htmlFor="price-min" className="sr-only">Çmimi minimal</label>
                        <input
                          id="price-min"
                          type="number"
                          placeholder="Min"
                          min={priceMin}
                          max={priceMax}
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value) || priceMin, priceRange[1]])}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black focus:outline-none"
                          aria-label="Çmimi minimal"
                        />
                      </div>
                      <div>
                        <label htmlFor="price-max" className="sr-only">Çmimi maksimal</label>
                        <input
                          id="price-max"
                          type="number"
                          placeholder="Max"
                          min={priceMin}
                          max={priceMax}
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || priceMax])}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black focus:outline-none"
                          aria-label="Çmimi maksimal"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Year Range */}
                <div>
                  <h3 className="font-semibold mb-3">Viti</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="year-min" className="sr-only">Viti minimal</label>
                      <select 
                        id="year-min"
                        value={yearRange[0]}
                        onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black focus:outline-none"
                        aria-label="Viti minimal"
                      >
                        {Array.from({ length: 16 }, (_, i) => 2010 + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="year-max" className="sr-only">Viti maksimal</label>
                      <select 
                        id="year-max"
                        value={yearRange[1]}
                        onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black focus:outline-none"
                        aria-label="Viti maksimal"
                      >
                        {Array.from({ length: 16 }, (_, i) => 2010 + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Mileage Range */}
                <div>
                  <h3 className="font-semibold mb-3">Kilometrazha (km)</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="mileage-min" className="sr-only">Kilometrazha minimale</label>
                        <input
                          id="mileage-min"
                          type="number"
                          placeholder="Min"
                          min={mileageMin}
                          max={mileageMax}
                          value={mileageRange[0]}
                          onChange={(e) => setMileageRange([parseInt(e.target.value) || mileageMin, mileageRange[1]])}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black focus:outline-none"
                          aria-label="Kilometrazha minimale"
                        />
                      </div>
                      <div>
                        <label htmlFor="mileage-max" className="sr-only">Kilometrazha maksimale</label>
                        <input
                          id="mileage-max"
                          type="number"
                          placeholder="Max"
                          min={mileageMin}
                          max={mileageMax}
                          value={mileageRange[1]}
                          onChange={(e) => setMileageRange([mileageRange[0], parseInt(e.target.value) || mileageMax])}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black focus:outline-none"
                          aria-label="Kilometrazha maksimale"
                        />
                      </div>
                    </div>
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {selectedBrands.map((brand) => (
                  <Badge key={brand} variant="secondary" className="flex items-center gap-1 text-xs sm:text-sm">
                    {brand}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleBrand(brand)} />
                  </Badge>
                ))}
                {selectedTransmissions.map((transmission) => (
                  <Badge key={transmission} variant="secondary" className="flex items-center gap-1 text-xs sm:text-sm">
                    {transmission}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleTransmission(transmission)} />
                  </Badge>
                ))}
                {selectedFuelTypes.map((fuelType) => (
                  <Badge key={fuelType} variant="secondary" className="flex items-center gap-1 text-xs sm:text-sm">
                    {fuelType}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFuelType(fuelType)} />
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Rendit sipas:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="flex-1 sm:flex-initial px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
