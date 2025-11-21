import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format price with European formatting (amount followed by €)
export function formatPrice(price: number): string {
  return `${price.toLocaleString('en-US')} €`;
}

// Format mileage with European formatting
export function formatMileage(mileage: number): string {
  return `${mileage.toLocaleString('en-US')} km`;
}

// Format date with European dd/mm/yyyy format
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB'); // Uses dd/mm/yyyy format
}

// Generate phone link
export function formatPhoneLink(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`;
}

// Generate WhatsApp link
export function formatWhatsAppLink(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\s/g, '');
  const encodedMessage = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
}

// Create car slug from brand and model
export function createCarSlug(brand: string, model: string, year: number): string {
  return `${brand.toLowerCase()}-${model.toLowerCase().replace(/\s+/g, '-')}-${year}`;
}
