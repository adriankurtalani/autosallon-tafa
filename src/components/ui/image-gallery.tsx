"use client";

import * as React from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  initialIndex?: number;
}

export function ImageGallery({ images, alt, initialIndex = 0 }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(initialIndex);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  React.useEffect(() => {
    if (!isLightboxOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen, selectedIndex, images.length]);

  return (
    <>
      {/* Main Image Display */}
      <div className="space-y-4">
        <div 
          className="aspect-[4/3] relative overflow-hidden rounded-2xl bg-gray-100 cursor-pointer group"
          onClick={() => setIsLightboxOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsLightboxOpen(true);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Shfaq imazhin e plotë të ${alt}`}
        >
          <Image
            src={images[selectedIndex] || images[0]}
            alt={`${alt} ${selectedIndex + 1}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            quality={90}
          />
          
          {/* Zoom indicator */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium">
              Kliko për zmadhim
            </div>
          </div>
        </div>
        
        {/* Thumbnail Grid */}
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "aspect-square relative overflow-hidden rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
                selectedIndex === index 
                  ? "ring-2 ring-black scale-105" 
                  : "hover:opacity-80 hover:scale-105"
              )}
              aria-label={`Zgjidh imazhin ${index + 1} të ${alt}`}
              aria-pressed={selectedIndex === index}
            >
              <Image
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 25vw"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria e imazheve: ${alt}`}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Mbyll galerinë"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </Button>

          {/* Previous Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Imazhi i mëparshëm"
          >
            <ChevronLeft className="h-8 w-8" aria-hidden="true" />
          </Button>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Imazhi tjetër"
          >
            <ChevronRight className="h-8 w-8" aria-hidden="true" />
          </Button>

          {/* Main Image */}
          <div 
            className="relative max-w-7xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex] || images[0]}
              alt={`${alt} ${selectedIndex + 1}`}
              width={1920}
              height={1080}
              className="object-contain w-full h-full"
              sizes="100vw"
              quality={95}
            />
          </div>

          {/* Image Counter */}
          <div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="sr-only">Imazhi</span> {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}

