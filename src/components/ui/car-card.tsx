"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Car } from "@/types/car";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, formatMileage, cn } from "@/lib/utils";
import { Fuel, Gauge, Calendar, Settings } from "lucide-react";

interface CarCardProps {
  car: Car;
  className?: string;
}

export function CarCard({ car, className }: CarCardProps) {
  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1",
      className
    )}>
      {/* Car Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={car.mainImage}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
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
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-black text-white text-sm font-bold px-3 py-1">
            {formatPrice(car.price)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        {/* Car Title */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-black mb-1">
            {car.brand} {car.model}
          </h3>
          <p className="text-sm text-gray-600">
            Viti: {car.year}
          </p>
        </div>
        
        {/* Car Specs */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Gauge className="h-4 w-4 mr-2 text-black" />
            {formatMileage(car.mileage)}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Fuel className="h-4 w-4 mr-2 text-black" />
            {car.fuelType}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Settings className="h-4 w-4 mr-2 text-black" />
            {car.transmission}
          </div>
          
          {car.powerHp && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-black" />
              {car.powerHp} HP
            </div>
          )}
        </div>
        
        {/* Fuel Type Badge */}
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="text-xs">
            {car.transmission}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {car.fuelType}
          </Badge>
          {car.color && (
            <Badge variant="outline" className="text-xs">
              {car.color}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full group-hover:bg-black group-hover:text-white transition-colors">
          <Link href={`/cars/${car.slug}`}>
            Shiko Detajet
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
