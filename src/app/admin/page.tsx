"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Car } from "@/types/car";
import { getAllCars, createCar, updateCar, deleteCar } from "@/lib/supabase/cars";
import { uploadCarImages, deleteCarImages, deleteCarImage } from "@/lib/supabase/storage";
import { 
  validateSlug, 
  validateBrand, 
  validateModel, 
  validateYear, 
  validatePrice, 
  validateMileage, 
  validatePowerHp 
} from "@/lib/validation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Image as ImageIcon,
  Loader2,
  LogOut,
  Search,
  TrendingUp,
  Star,
  Car as CarIcon,
  Eye
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/toast";
import Image from "next/image";

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const { addToast } = useToast();
  const [cars, setCars] = React.useState<Car[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [editingCar, setEditingCar] = React.useState<Car | null>(null);
  const [isCreating, setIsCreating] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<string | null>(null);
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);
  const [uploadingImages, setUploadingImages] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = React.useState<Record<string, boolean>>({});

  // Form state
  const [formData, setFormData] = React.useState<Partial<Car>>({
    slug: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    fuelType: "Benzinë",
    transmission: "Automatik",
    powerHp: undefined,
    color: "",
    bodyType: "",
    isNew: false,
    featured: false,
    mainImage: "",
    gallery: [],
    options: [],
    description: "",
  });

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Load cars on mount (only if authenticated)
  React.useEffect(() => {
    if (user) {
      loadCars();
    }
  }, [user]);

  const loadCars = async () => {
    setLoading(true);
    try {
      const data = await getAllCars();
      setCars(data);
    } catch (error) {
      console.error("Error loading cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setFormData({
      slug: car.slug,
      brand: car.brand,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      fuelType: car.fuelType,
      transmission: car.transmission,
      powerHp: car.powerHp,
      color: car.color,
      bodyType: car.bodyType,
      isNew: car.isNew,
      featured: car.featured,
      mainImage: car.mainImage,
      gallery: car.gallery || [],
      options: car.options || [],
      description: car.description,
    });
    setImageFiles([]); // Clear any new files when editing
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingCar(null);
    setIsCreating(true);
    setImageFiles([]);
    setFormErrors({});
    setTouchedFields({});
    setFormData({
      slug: "",
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      fuelType: "Benzinë",
      transmission: "Automatik",
      powerHp: undefined,
      color: "",
      bodyType: "",
      isNew: false,
      featured: false,
      mainImage: "",
      gallery: [],
      options: [],
      description: "",
    });
  };

  const handleCancel = () => {
    setEditingCar(null);
    setIsCreating(false);
    setImageFiles([]);
    setFormErrors({});
    setTouchedFields({});
    setFormData({
      slug: "",
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      fuelType: "Benzinë",
      transmission: "Automatik",
    });
  };

  const validateField = (field: keyof Car, value: any): boolean => {
    let error = "";
    
    switch (field) {
      case "slug":
        const slugResult = validateSlug(value || "");
        if (!slugResult.isValid) error = slugResult.error || "";
        break;
      case "brand":
        const brandResult = validateBrand(value || "");
        if (!brandResult.isValid) error = brandResult.error || "";
        break;
      case "model":
        const modelResult = validateModel(value || "");
        if (!modelResult.isValid) error = modelResult.error || "";
        break;
      case "year":
        const yearResult = validateYear(value);
        if (!yearResult.isValid) error = yearResult.error || "";
        break;
      case "price":
        const priceResult = validatePrice(value);
        if (!priceResult.isValid) error = priceResult.error || "";
        break;
      case "mileage":
        const mileageResult = validateMileage(value);
        if (!mileageResult.isValid) error = mileageResult.error || "";
        break;
      case "powerHp":
        const powerResult = validatePowerHp(value);
        if (!powerResult.isValid) error = powerResult.error || "";
        break;
    }
    
    setFormErrors(prev => ({ ...prev, [field]: error }));
    return error === "";
  };
  
  const handleFieldBlur = (field: keyof Car) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    // Validate all required fields
    const slugResult = validateSlug(formData.slug || "");
    if (!slugResult.isValid) {
      newErrors.slug = slugResult.error || "";
      isValid = false;
    }
    
    const brandResult = validateBrand(formData.brand || "");
    if (!brandResult.isValid) {
      newErrors.brand = brandResult.error || "";
      isValid = false;
    }
    
    const modelResult = validateModel(formData.model || "");
    if (!modelResult.isValid) {
      newErrors.model = modelResult.error || "";
      isValid = false;
    }
    
    const yearResult = validateYear(formData.year);
    if (!yearResult.isValid) {
      newErrors.year = yearResult.error || "";
      isValid = false;
    }
    
    const priceResult = validatePrice(formData.price);
    if (!priceResult.isValid) {
      newErrors.price = priceResult.error || "";
      isValid = false;
    }
    
    const mileageResult = validateMileage(formData.mileage);
    if (!mileageResult.isValid) {
      newErrors.mileage = mileageResult.error || "";
      isValid = false;
    }
    
    if (formData.powerHp !== undefined) {
      const powerResult = validatePowerHp(formData.powerHp);
      if (!powerResult.isValid) {
        newErrors.powerHp = powerResult.error || "";
        isValid = false;
      }
    }
    
    // Check if at least one image is provided
    if (imageFiles.length === 0 && !formData.mainImage && (!editingCar || !editingCar.mainImage)) {
      newErrors.mainImage = "Duhet të ngarkoni të paktën një imazh";
      isValid = false;
    }
    
    setFormErrors(newErrors);
    // Mark all fields as touched
    setTouchedFields({
      slug: true,
      brand: true,
      model: true,
      year: true,
      price: true,
      mileage: true,
      powerHp: true,
      mainImage: true,
    });
    
    return isValid;
  };

  const handleSave = async () => {
    // Validate form before saving
    if (!validateForm()) {
      addToast("Ju lutemi plotësoni të gjitha fushat në mënyrë korrekte", "error");
      return;
    }
    
    setSaving(true);
    
    try {
      let imageUrls: string[] = [];
      
      // Upload images if there are new files
      if (imageFiles.length > 0) {
        setUploadingImages(true);
        addToast("Optimizing images...", "info");
        
        // Optimize images before upload (dynamic import for client-side only)
        let optimizedFiles: File[] = [];
        try {
          const { optimizeImages } = await import("@/lib/image-optimization");
          const optimized = await optimizeImages(imageFiles, false); // Don't generate thumbnails for now
          optimizedFiles = optimized.map(img => img.file);
          
          const totalOriginal = optimized.reduce((sum, img) => sum + img.originalSize, 0);
          const totalOptimized = optimized.reduce((sum, img) => sum + img.optimizedSize, 0);
          const savings = ((totalOriginal - totalOptimized) / totalOriginal) * 100;
          
          if (savings > 0) {
            addToast(`Images optimized: ${savings.toFixed(0)}% size reduction`, "success");
          }
        } catch (error: any) {
          console.error("Image optimization error:", error);
          addToast("Warning: Could not optimize images, using originals", "error");
          optimizedFiles = imageFiles; // Use original files if optimization fails
        }
        
        if (isCreating && editingCar === null) {
          // For new cars, create car first to get ID, then upload images
          const carDataWithoutImages = {
            ...formData,
            mainImage: "", // Temporary empty
            gallery: [],
          };
          
          const newCar = await createCar(carDataWithoutImages as Omit<Car, 'id'>);
          if (!newCar) {
            addToast("Failed to create car", "error");
            setSaving(false);
            setUploadingImages(false);
            return;
          }
          
          // Upload optimized images with the car ID
          try {
            addToast("Uploading optimized images...", "info");
            const uploadedUrls = await uploadCarImages(optimizedFiles, newCar.id);
            if (uploadedUrls.length === 0) {
              addToast("Failed to upload images. Please check browser console for details.", "error");
              setSaving(false);
              setUploadingImages(false);
              return;
            }
            imageUrls = uploadedUrls;
          } catch (error: any) {
            console.error("Image upload error:", error);
            addToast(`Image upload failed: ${error.message || "Unknown error"}`, "error");
            setSaving(false);
            setUploadingImages(false);
            return;
          }
          
          // Update car with image URLs and preserve all form data
          const updatedCar = await updateCar(newCar.id, {
            ...formData,
            mainImage: imageUrls[0] || "",
            gallery: imageUrls.slice(1),
          });
          
          if (updatedCar) {
            await loadCars();
            handleCancel();
            addToast("Car created successfully!", "success");
          } else {
            addToast("Failed to update car with images", "error");
          }
        } else if (editingCar) {
          // For existing cars, upload optimized images with existing car ID
          try {
            addToast("Uploading optimized images...", "info");
            const uploadedUrls = await uploadCarImages(optimizedFiles, editingCar.id);
            imageUrls = uploadedUrls;
          } catch (error: any) {
            console.error("Image upload error:", error);
            addToast(`Image upload failed: ${error.message || "Unknown error"}`, "error");
            setSaving(false);
            setUploadingImages(false);
            return;
          }
          
          // Combine existing images with new uploads
          const existingImages = [editingCar.mainImage, ...(editingCar.gallery || [])].filter(Boolean);
          const allImages = [...existingImages, ...imageUrls];
          
          const updatedCar = await updateCar(editingCar.id, {
            ...formData,
            mainImage: allImages[0] || editingCar.mainImage,
            gallery: allImages.slice(1),
          });
          
          if (updatedCar) {
            await loadCars();
            handleCancel();
            addToast("Car updated successfully!", "success");
          } else {
            addToast("Failed to update car", "error");
          }
        }
      } else {
        // No new images to upload, just save the car data
        if (isCreating && editingCar === null) {
          const newCar = await createCar(formData as Omit<Car, 'id'>);
          if (newCar) {
            await loadCars();
            handleCancel();
            addToast("Car created successfully!", "success");
          } else {
            addToast("Failed to create car", "error");
          }
        } else if (editingCar) {
          const updatedCar = await updateCar(editingCar.id, formData);
          if (updatedCar) {
            await loadCars();
            handleCancel();
            addToast("Car updated successfully!", "success");
          } else {
            addToast("Failed to update car", "error");
          }
        }
      }
    } catch (error: any) {
      console.error("Error saving car:", error);
      addToast(error.message || "Error saving car", "error");
    } finally {
      setSaving(false);
      setUploadingImages(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      // Find the car to get image URLs
      const carToDelete = cars.find(c => c.id === deleteConfirmId);
      
      // Delete car images from storage
      if (carToDelete) {
        await deleteCarImages(deleteConfirmId);
      }
      
      // Delete the car record
      const success = await deleteCar(deleteConfirmId);
      if (success) {
        await loadCars();
        addToast("Car deleted successfully!", "success");
      } else {
        addToast("Failed to delete car", "error");
      }
    } catch (error: any) {
      console.error("Error deleting car:", error);
      addToast(error.message || "Error deleting car", "error");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const handleInputChange = (field: keyof Car, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate slug from brand, model, and year
      if ((field === "brand" || field === "model" || field === "year") && isCreating) {
        const brand = field === "brand" ? value : updated.brand || "";
        const model = field === "model" ? value : updated.model || "";
        const year = field === "year" ? value : updated.year || "";
        
        if (brand && model && year) {
          const slug = `${brand.toLowerCase()}-${model.toLowerCase()}-${year}`.replace(/\s+/g, "-");
          updated.slug = slug;
        }
      }
      
      return updated;
    });
    
    // Validate on change if field has been touched
    if (touchedFields[field]) {
      validateField(field, value);
    }
  };

  const handleArrayChange = (field: 'gallery' | 'options', value: string) => {
    // Split by comma, trim each item, and filter out empty strings
    const arrayValue = value
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);
    
    setFormData(prev => ({
      ...prev,
      [field]: arrayValue
    }));
  };

  // Calculate statistics
  const stats = React.useMemo(() => {
    const totalCars = cars.length;
    const featuredCars = cars.filter(c => c.featured).length;
    const newCars = cars.filter(c => c.isNew).length;
    const totalValue = cars.reduce((sum, car) => sum + car.price, 0);
    
    return { totalCars, featuredCars, newCars, totalValue };
  }, [cars]);

  // Filter cars based on search
  const filteredCars = React.useMemo(() => {
    if (!searchQuery) return cars;
    const query = searchQuery.toLowerCase();
    return cars.filter(car => 
      car.brand.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query) ||
      car.slug.toLowerCase().includes(query)
    );
  }, [cars, searchQuery]);

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-black" />
      </div>
    );
  }

  // Redirect if not authenticated (will be handled by useEffect, but show loading meanwhile)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-black" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-black" />
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-black">Admin Panel</h1>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Manage your car inventory</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
              <Link href="/" target="_blank" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-black text-black hover:bg-black hover:text-white text-sm sm:text-base">
                  <Eye className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">View Website</span>
                  <span className="sm:hidden">View Site</span>
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="w-full sm:w-auto border-black text-black hover:bg-black hover:text-white text-sm sm:text-base"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
              {!isCreating && !editingCar && (
                <Button onClick={handleCreate} className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 text-sm sm:text-base">
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Add New Car</span>
                  <span className="sm:hidden">Add Car</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Cars</p>
                  <p className="text-2xl font-bold text-black">{stats.totalCars}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <CarIcon className="h-6 w-6 text-black" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Featured</p>
                  <p className="text-2xl font-bold text-black">{stats.featuredCars}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-black" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">New Cars</p>
                  <p className="text-2xl font-bold text-black">{stats.newCars}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-black" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Value</p>
                  <p className="text-2xl font-bold text-black">€{(stats.totalValue / 1000).toFixed(0)}k</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-black" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cars List */}
        <div>
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-lg sm:text-xl">Cars ({filteredCars.length})</CardTitle>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search cars..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black focus:outline-none text-sm"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredCars.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">
                      {searchQuery ? "No cars match your search" : "No cars found"}
                    </p>
                    {!searchQuery && (
                      <Button onClick={handleCreate} className="bg-black text-white hover:bg-gray-800">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Car
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCars.map((car) => (
                      <div
                        key={car.id}
                        className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                          <Link href={`/cars/${car.slug}`} target="_blank" className="w-16 h-16 sm:w-20 sm:h-20 relative rounded-lg overflow-hidden bg-gray-100 group flex-shrink-0">
                            {car.mainImage ? (
                              <Image
                                src={car.mainImage}
                                alt={car.brand}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                                sizes="(max-width: 640px) 64px, 80px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                              </div>
                            )}
                          </Link>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="font-semibold text-black text-sm sm:text-base truncate">
                                {car.brand} {car.model} {car.year}
                              </h3>
                              {car.featured && (
                                <Badge variant="secondary" className="bg-black text-white text-xs">
                                  Featured
                                </Badge>
                              )}
                              {car.isNew && (
                                <Badge variant="secondary" className="text-xs">New</Badge>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">
                              €{car.price.toLocaleString()} • {car.mileage.toLocaleString()} km • {car.transmission}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 hidden sm:block truncate">
                              Slug: {car.slug}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 sm:flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(car)}
                            disabled={isCreating || editingCar !== null}
                            className="flex-1 sm:flex-initial"
                            aria-label={`Edit ${car.brand} ${car.model}`}
                          >
                            <Edit className="h-4 w-4 sm:mr-0" />
                            <span className="ml-2 sm:hidden">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(car.id)}
                            disabled={isCreating || editingCar !== null || deleteConfirmId === car.id}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-1 sm:flex-initial"
                            aria-label={`Delete ${car.brand} ${car.model}`}
                          >
                            <Trash2 className="h-4 w-4 sm:mr-0" />
                            <span className="ml-2 sm:hidden">Delete</span>
                          </Button>
                          {deleteConfirmId === car.id && (
                            <div className="absolute left-0 right-0 sm:right-auto sm:left-auto sm:right-0 top-full mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-10 sm:w-auto w-full">
                              <p className="text-sm mb-2">Delete this car?</p>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={confirmDelete}
                                  className="bg-black text-white hover:bg-gray-800 text-xs flex-1 sm:flex-initial"
                                >
                                  Yes, Delete
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="text-xs flex-1 sm:flex-initial"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
        </div>

        {/* Form Modal */}
        <Dialog open={isCreating || editingCar !== null} onOpenChange={(open) => {
          if (!open) {
            handleCancel();
          }
        }}>
            <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col p-0">
              <DialogHeader className="p-4 sm:p-6">
                <DialogTitle className="text-xl sm:text-2xl">
                  {isCreating ? "Create New Car" : "Edit Car"}
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm">
                  {isCreating ? "Fill in the details below to add a new car to your inventory" : "Update the car information below"}
                </DialogDescription>
              </DialogHeader>
              
              <div className="overflow-y-auto flex-1 px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="space-y-6">
                  {/* Basic Information Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <h3 className="font-semibold text-black text-lg">Basic Information</h3>
                    </div>
                    
                    {/* Brand & Model */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-black">
                          Brand *
                        </label>
                        <input
                          type="text"
                          value={formData.brand || ""}
                          onChange={(e) => handleInputChange("brand", e.target.value)}
                          onBlur={() => handleFieldBlur("brand")}
                          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-1 focus:ring-black focus:border-black focus:outline-none transition-all hover:border-gray-400 ${
                            touchedFields.brand && formErrors.brand
                              ? "border-gray-400 bg-gray-50"
                              : "border-gray-300"
                          }`}
                          placeholder="BMW"
                          aria-invalid={touchedFields.brand && !!formErrors.brand}
                          aria-describedby={touchedFields.brand && formErrors.brand ? "brand-error" : undefined}
                        />
                        {touchedFields.brand && formErrors.brand && (
                          <p id="brand-error" className="mt-1 text-xs text-gray-600" role="alert">
                            {formErrors.brand}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-black">
                          Model *
                        </label>
                        <input
                          type="text"
                          value={formData.model || ""}
                          onChange={(e) => handleInputChange("model", e.target.value)}
                          onBlur={() => handleFieldBlur("model")}
                          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-1 focus:ring-black focus:border-black focus:outline-none transition-all hover:border-gray-400 ${
                            touchedFields.model && formErrors.model
                              ? "border-gray-400 bg-gray-50"
                              : "border-gray-300"
                          }`}
                          placeholder="X5"
                          aria-invalid={touchedFields.model && !!formErrors.model}
                          aria-describedby={touchedFields.model && formErrors.model ? "model-error" : undefined}
                        />
                        {touchedFields.model && formErrors.model && (
                          <p id="model-error" className="mt-1 text-xs text-gray-600" role="alert">
                            {formErrors.model}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Slug */}
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-black">
                        Slug *
                        {isCreating && (
                          <span className="text-xs font-normal text-gray-500 ml-2">
                            (auto-generated)
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        value={formData.slug || ""}
                        onChange={(e) => handleInputChange("slug", e.target.value)}
                        onBlur={() => handleFieldBlur("slug")}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-1 focus:ring-black focus:border-black focus:outline-none transition-all bg-gray-50 hover:border-gray-400 ${
                          touchedFields.slug && formErrors.slug
                            ? "border-gray-400 bg-gray-50"
                            : "border-gray-300"
                        }`}
                        placeholder="bmw-x5-2022"
                        disabled={isCreating && !!(formData.brand && formData.model && formData.year)}
                        aria-invalid={touchedFields.slug && !!formErrors.slug}
                        aria-describedby={touchedFields.slug && formErrors.slug ? "slug-error" : "slug-description"}
                      />
                      {touchedFields.slug && formErrors.slug && (
                        <p id="slug-error" className="mt-1 text-xs text-gray-600" role="alert">
                          {formErrors.slug}
                        </p>
                      )}
                      <p id="slug-description" className="text-xs text-gray-500 mt-1">
                        URL-friendly identifier for this car
                      </p>
                    </div>
                  </div>

                  {/* Specifications Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <h3 className="font-semibold text-black text-lg">Specifications</h3>
                    </div>
                    
                    {/* Year, Price, Mileage */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-black">
                          Year *
                        </label>
                        <input
                          type="number"
                          min="2000"
                          max="2030"
                          value={formData.year || ""}
                          onChange={(e) => handleInputChange("year", parseInt(e.target.value))}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black focus:outline-none transition-all hover:border-gray-400"
                          placeholder="2022"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-black">
                          Price (€) *
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.price || ""}
                          onChange={(e) => handleInputChange("price", parseInt(e.target.value))}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black focus:outline-none transition-all hover:border-gray-400"
                          placeholder="50000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-black">
                          Mileage (km) *
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.mileage || ""}
                          onChange={(e) => handleInputChange("mileage", parseInt(e.target.value))}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black focus:outline-none transition-all hover:border-gray-400"
                          placeholder="25000"
                        />
                      </div>
                    </div>

                    {/* Fuel Type & Transmission */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-black">
                          Fuel Type *
                        </label>
                        <select
                          value={formData.fuelType || "Benzinë"}
                          onChange={(e) => handleInputChange("fuelType", e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black focus:outline-none transition-all bg-white hover:border-gray-400"
                        >
                          <option value="Benzinë">Benzinë</option>
                          <option value="Diesel">Diesel</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="Elektrike">Elektrike</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-black">
                          Transmission *
                        </label>
                        <select
                          value={formData.transmission || "Automatik"}
                          onChange={(e) => handleInputChange("transmission", e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black focus:outline-none transition-all bg-white hover:border-gray-400"
                        >
                          <option value="Automatik">Automatik</option>
                          <option value="Manual">Manual</option>
                        </select>
                      </div>
                    </div>

                    {/* Power HP, Color, Body Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-black">
                          Power (HP)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.powerHp || ""}
                          onChange={(e) => handleInputChange("powerHp", e.target.value ? parseInt(e.target.value) : undefined)}
                          onBlur={() => handleFieldBlur("powerHp")}
                          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-1 focus:ring-black focus:border-black focus:outline-none transition-all hover:border-gray-400 ${
                            touchedFields.powerHp && formErrors.powerHp
                              ? "border-gray-400 bg-gray-50"
                              : "border-gray-300"
                          }`}
                          placeholder="265"
                          aria-invalid={touchedFields.powerHp && !!formErrors.powerHp}
                          aria-describedby={touchedFields.powerHp && formErrors.powerHp ? "powerHp-error" : undefined}
                        />
                        {touchedFields.powerHp && formErrors.powerHp && (
                          <p id="powerHp-error" className="mt-1 text-xs text-gray-600" role="alert">
                            {formErrors.powerHp}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-black">
                          Color
                        </label>
                        <input
                          type="text"
                          value={formData.color || ""}
                          onChange={(e) => handleInputChange("color", e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black focus:outline-none transition-all hover:border-gray-400"
                          placeholder="E Zezë"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-black">
                          Body Type
                        </label>
                        <input
                          type="text"
                          value={formData.bodyType || ""}
                          onChange={(e) => handleInputChange("bodyType", e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black focus:outline-none transition-all hover:border-gray-400"
                          placeholder="SUV"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <h3 className="font-semibold text-black text-lg">Status & Visibility</h3>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formData.featured || false}
                          onChange={(e) => handleInputChange("featured", e.target.checked)}
                          className="w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-2 focus:ring-black cursor-pointer flex-shrink-0"
                        />
                        <div>
                          <span className="text-sm font-semibold text-black block">Featured</span>
                          <span className="text-xs text-gray-500">Show on homepage</span>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formData.isNew || false}
                          onChange={(e) => handleInputChange("isNew", e.target.checked)}
                          className="w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-2 focus:ring-black cursor-pointer flex-shrink-0"
                        />
                        <div>
                          <span className="text-sm font-semibold text-black block">New</span>
                          <span className="text-xs text-gray-500">Mark as new</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Images Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <h3 className="font-semibold text-black text-lg">Images</h3>
                    </div>
                    
                    {uploadingImages && (
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <Loader2 className="h-4 w-4 animate-spin text-black" />
                        <span className="text-sm text-gray-600">Uploading images...</span>
                      </div>
                    )}
                    
                    <ImageUpload
                      images={imageFiles}
                      uploadedUrls={editingCar ? [editingCar.mainImage, ...(editingCar.gallery || [])].filter(Boolean) : []}
                      maxImages={10}
                      onChange={setImageFiles}
                      onRemove={async (index) => {
                        // Handle removal of existing images
                        if (editingCar) {
                          const allImages = [editingCar.mainImage, ...(editingCar.gallery || [])];
                          const imageToRemove = allImages[index];
                          
                          // Delete from storage if it's a Supabase storage URL
                          if (imageToRemove && imageToRemove.includes('supabase.co')) {
                            await deleteCarImage(imageToRemove);
                          }
                          
                          const newImages = allImages.filter((_, i) => i !== index);
                          setFormData(prev => ({
                            ...prev,
                            mainImage: newImages[0] || "",
                            gallery: newImages.slice(1),
                          }));
                        }
                      }}
                    />
                    
                    {touchedFields.mainImage && formErrors.mainImage && (
                      <p className="text-xs text-gray-600 mt-1" role="alert">
                        {formErrors.mainImage}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      The first image will be used as the main image. Upload multiple images to create a gallery (up to 10 images).
                    </p>
                  </div>

                  {/* Additional Details Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <h3 className="font-semibold text-black text-lg">Additional Details</h3>
                    </div>
                    
                    {/* Options */}
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-black">
                        Features & Options
                      </label>
                      <textarea
                        value={(formData.options || []).join(", ")}
                        onChange={(e) => handleArrayChange("options", e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black focus:outline-none transition-all resize-none hover:border-gray-400"
                        placeholder="Navigacion, Klimë Automatike, Sensorë Parkimi, Kamera"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        List features separated by commas
                      </p>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-black">
                        Description
                      </label>
                      <textarea
                        value={formData.description || ""}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black focus:outline-none transition-all resize-none hover:border-gray-400"
                        placeholder="Write a detailed description about this car..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Provide detailed information about the car's condition and features
                      </p>
                    </div>
                  </div>

                </div>
              </div>
              
              {/* Footer with Save Button */}
              <div className="border-t border-gray-200 bg-gray-50 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1 order-2 sm:order-1">
                    {(!formData.slug || !formData.brand || !formData.model || (imageFiles.length === 0 && !formData.mainImage && (!editingCar || !editingCar.mainImage))) && (
                      <p className="text-xs text-gray-500">
                        Please fill in all required fields (*) and upload at least one image
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 order-1 sm:order-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      disabled={saving}
                      className="w-full sm:w-auto border-black text-black hover:bg-black hover:text-white"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={saving || uploadingImages || !formData.slug || !formData.brand || !formData.model || (imageFiles.length === 0 && !formData.mainImage && (!editingCar || !editingCar.mainImage))}
                      className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 h-11 px-6 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving || uploadingImages ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          <span className="hidden sm:inline">{uploadingImages ? "Uploading..." : isCreating ? "Creating..." : "Saving..."}</span>
                          <span className="sm:hidden">{uploadingImages ? "Uploading..." : "Saving..."}</span>
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">{isCreating ? "Create Car" : "Save Changes"}</span>
                          <span className="sm:hidden">{isCreating ? "Create" : "Save"}</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

