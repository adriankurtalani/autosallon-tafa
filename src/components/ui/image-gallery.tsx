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
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  const imageContainerRef = React.useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const goToPrevious = React.useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = React.useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
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
    // Prevent scrolling on mobile
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.width = "unset";
    };
  }, [isLightboxOpen, goToPrevious, goToNext]);

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
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 sm:p-4"
          onClick={(e) => {
            // Only close if clicking the backdrop, not the image or buttons
            if (e.target === e.currentTarget) {
              setIsLightboxOpen(false);
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria e imazheve: ${alt}`}
          style={{ touchAction: 'none' }}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 text-white hover:bg-white/20 active:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black bg-black/50 backdrop-blur-sm rounded-full w-10 h-10 sm:w-12 sm:h-12"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsLightboxOpen(false);
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsLightboxOpen(false);
            }}
            aria-label="Mbyll galerinë"
            type="button"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </Button>

          {/* Previous Button */}
          {images.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 active:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black bg-black/50 backdrop-blur-sm rounded-full w-10 h-10 sm:w-12 sm:h-12"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                goToPrevious();
              }}
              onTouchEnd={(e) => {
                e.stopPropagation();
                e.preventDefault();
                goToPrevious();
              }}
              aria-label="Imazhi i mëparshëm"
              type="button"
            >
              <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true" />
            </Button>
          )}

          {/* Next Button */}
          {images.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 active:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black bg-black/50 backdrop-blur-sm rounded-full w-10 h-10 sm:w-12 sm:h-12"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                goToNext();
              }}
              onTouchEnd={(e) => {
                e.stopPropagation();
                e.preventDefault();
                goToNext();
              }}
              aria-label="Imazhi tjetër"
              type="button"
            >
              <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true" />
            </Button>
          )}

          {/* Main Image with Swipe Support */}
          <div 
            ref={imageContainerRef}
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{ touchAction: 'pan-y pinch-zoom' }}
          >
            <Image
              src={images[selectedIndex] || images[0]}
              alt={`${alt} ${selectedIndex + 1}`}
              width={1920}
              height={1080}
              className="object-contain w-full h-full select-none"
              sizes="100vw"
              quality={95}
              draggable={false}
            />
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div 
              className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm sm:text-base bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full z-10"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="sr-only">Imazhi</span> {selectedIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}

