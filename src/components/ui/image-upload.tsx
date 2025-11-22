"use client";

import * as React from "react";
import Image from "next/image";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  images: File[];
  uploadedUrls?: string[];
  maxImages?: number;
  onChange: (files: File[]) => void;
  onRemove?: (index: number) => void;
  className?: string;
}

export function ImageUpload({
  images,
  uploadedUrls = [],
  maxImages = 10,
  onChange,
  onRemove,
  className,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [previews, setPreviews] = React.useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Generate previews for new files
  React.useEffect(() => {
    const newPreviews: string[] = [];
    images.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === images.length) {
          setPreviews(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
    if (images.length === 0) {
      setPreviews([]);
    }
  }, [images]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));
    
    const remainingSlots = maxImages - images.length - uploadedUrls.length;
    const filesToAdd = imageFiles.slice(0, remainingSlots);
    
    if (filesToAdd.length < imageFiles.length) {
      alert(`You can only upload up to ${maxImages} images total. ${filesToAdd.length} images added.`);
    }
    
    onChange([...images, ...filesToAdd]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
    if (onRemove) {
      onRemove(index);
    }
  };

  const totalImages = images.length + uploadedUrls.length;
  const canAddMore = totalImages < maxImages;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      {canAddMore && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
            isDragging
              ? "border-black bg-gray-50"
              : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
          <Upload className="h-10 w-10 mx-auto mb-3 text-gray-400" />
          <p className="text-sm font-medium text-black mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500">
            PNG, JPG, WEBP up to 10MB each ({totalImages}/{maxImages} images)
          </p>
        </div>
      )}

      {/* Image Grid */}
      {(images.length > 0 || uploadedUrls.length > 0) && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Show uploaded URLs first */}
          {uploadedUrls.map((url, index) => (
            <div
              key={`uploaded-${index}`}
              className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
            >
              <Image
                src={url}
                alt={`Uploaded ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {onRemove && (
                <button
                  onClick={() => onRemove(index)}
                  className="absolute top-2 right-2 w-6 h-6 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  Main
                </div>
              )}
            </div>
          ))}

          {/* Show new file previews */}
          {images.map((file, index) => (
            <div
              key={`new-${index}`}
              className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
            >
              {previews[index] ? (
                <Image
                  src={previews[index]}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <button
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 w-6 h-6 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
              {index === 0 && uploadedUrls.length === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  Main
                </div>
              )}
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                {file.name.length > 15 ? `${file.name.substring(0, 15)}...` : file.name}
              </div>
            </div>
          ))}
        </div>
      )}

      {totalImages >= maxImages && (
        <p className="text-xs text-gray-500 text-center">
          Maximum {maxImages} images reached
        </p>
      )}
    </div>
  );
}

