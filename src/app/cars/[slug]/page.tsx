"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarCard } from "@/components/ui/car-card";
import { getCarBySlug, carsData } from "@/lib/data/cars";
import { formatPrice, formatMileage, formatPhoneLink, formatWhatsAppLink } from "@/lib/utils";
import {
  Phone,
  MessageCircle,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Palette,
  Wrench,
  Shield,
  ArrowLeft,
  Check,
  Mail
} from "lucide-react";

export default function CarDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const car = getCarBySlug(slug);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  
  // Get related cars (same brand, different model, or same price range)
  const relatedCars = React.useMemo(() => {
    if (!car) return [];
    
    return carsData
      .filter(c => c.id !== car.id)
      .filter(c => 
        c.brand === car.brand || 
        Math.abs(c.price - car.price) < 10000
      )
      .slice(0, 3);
  }, [car]);
  
  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-primary mb-4">Vetura nuk u gjet</h1>
          <p className="text-gray-600 mb-6">Vetura që kërkoni nuk ekziston ose është larguar nga inventari.</p>
          <Button asChild>
            <Link href="/cars">Kthehu te Lista e Veturave</Link>
          </Button>
        </Card>
      </div>
    );
  }
  
  const whatsappMessage = `Përshëndetje! Jam i interesuar për ${car.brand} ${car.model} ${car.year} (${formatPrice(car.price)}). A mund të më jepni më shumë informacion?`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-black">Ballina</Link>
            <span className="text-gray-300">/</span>
            <Link href="/cars" className="text-gray-500 hover:text-black">Veturat</Link>
            <span className="text-gray-300">/</span>
            <span className="text-black font-medium">{car.brand} {car.model}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/cars">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kthehu te lista
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[4/3] relative overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={car.gallery[selectedImageIndex] || car.mainImage}
                alt={`${car.brand} ${car.model}`}
                fill
                className="object-cover"
                priority
              />
              
              {/* Badges on main image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {car.isNew && (
                  <Badge className="bg-black text-white">
                    E Re
                  </Badge>
                )}
                {car.featured && (
                  <Badge className="bg-white text-black border border-black">
                    E Veçantë
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {car.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square relative overflow-hidden rounded-lg ${
                    selectedImageIndex === index 
                      ? 'ring-2 ring-accent' 
                      : 'hover:opacity-80'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${car.brand} ${car.model} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">
                {car.brand} {car.model}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-gray-600">Viti: {car.year}</span>
                {car.color && (
                  <Badge variant="outline">{car.color}</Badge>
                )}
              </div>
              <div className="text-4xl font-bold text-black mb-6">
                {formatPrice(car.price)}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 rounded-xl">
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-black" />
                <div>
                  <div className="text-sm text-gray-600">Kilometrazha</div>
                  <div className="font-semibold">{formatMileage(car.mileage)}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Fuel className="h-5 w-5 text-black" />
                <div>
                  <div className="text-sm text-gray-600">Karburanti</div>
                  <div className="font-semibold">{car.fuelType}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-black" />
                <div>
                  <div className="text-sm text-gray-600">Transmisioni</div>
                  <div className="font-semibold">{car.transmission}</div>
                </div>
              </div>
              
              {car.powerHp && (
                <div className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-black" />
                  <div>
                    <div className="text-sm text-gray-600">Fuqia</div>
                    <div className="font-semibold">{car.powerHp} HP</div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Buttons */}
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full bg-black hover:bg-gray-800 text-white"
                asChild
              >
                <a 
                  href={formatWhatsAppLink("+355691234567", whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Shkruaj në WhatsApp
                </a>
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg" className="border-black text-black hover:bg-black hover:text-white" asChild>
                  <a href={formatPhoneLink("+355 69 123 4567")}>
                    <Phone className="h-4 w-4 mr-2" />
                    Thirr Tani
                  </a>
                </Button>
                
                <Button variant="outline" size="lg" className="border-black text-black hover:bg-black hover:text-white" asChild>
                  <a href="mailto:info@autosallontafa.al?subject=Interesim për veturën&body=Përshëndetje, jam i interesuar për veturën tuaj.">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </a>
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <Card className="p-4 border-black">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-black">
                  <Check className="h-4 w-4" />
                  <span>Kontroll i detajuar teknik</span>
                </div>
                <div className="flex items-center gap-2 text-black">
                  <Check className="h-4 w-4" />
                  <span>Garanci pas shitjes</span>
                </div>
                <div className="flex items-center gap-2 text-black">
                  <Check className="h-4 w-4" />
                  <span>Test-drive i mundshëm</span>
                </div>
                <div className="flex items-center gap-2 text-black">
                  <Check className="h-4 w-4" />
                  <span>Ndihmë me financim</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Full Specifications */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Specifikat e Plota
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Marka:</span>
                    <span className="font-semibold">{car.brand}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Modeli:</span>
                    <span className="font-semibold">{car.model}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Viti:</span>
                    <span className="font-semibold">{car.year}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kilometrazha:</span>
                    <span className="font-semibold">{formatMileage(car.mileage)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Karburanti:</span>
                    <span className="font-semibold">{car.fuelType}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transmisioni:</span>
                    <span className="font-semibold">{car.transmission}</span>
                  </div>
                  
                  {car.powerHp && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fuqia:</span>
                      <span className="font-semibold">{car.powerHp} HP</span>
                    </div>
                  )}
                  
                  {car.color && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ngjyra:</span>
                      <span className="font-semibold">{car.color}</span>
                    </div>
                  )}
                  
                  {car.bodyType && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lloji:</span>
                      <span className="font-semibold">{car.bodyType}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gjendja:</span>
                    <span className="font-semibold">{car.isNew ? "E Re" : "E Përdorur"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Options & Features */}
          {car.options && car.options.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Opsione & Veçori
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {car.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{option}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Description */}
        {car.description && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Përshkrimi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{car.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Related Cars */}
        {relatedCars.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">Vetura të Ngjashme</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCars.map((relatedCar) => (
                <CarCard key={relatedCar.id} car={relatedCar} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
