// SEO utilities and metadata generators

import { Metadata } from 'next';
import { Car } from '@/types/car';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://autosalloniadrian.al';
const SITE_NAME = 'Auto Salloni Adrian';

// Generate metadata for car detail page
export function generateCarMetadata(car: Car): Metadata {
  const title = `${car.brand} ${car.model} ${car.year} - ${formatPrice(car.price)} | ${SITE_NAME}`;
  const description = `${car.brand} ${car.model} ${car.year} për ${formatPrice(car.price)}. ${car.mileage.toLocaleString()} km, ${car.transmission}, ${car.fuelType}${car.powerHp ? `, ${car.powerHp} HP` : ''}. ${car.description || 'Veturë e kontrolluar teknikisht me garanci.'}`;
  const image = car.mainImage || `${SITE_URL}/og-image.jpg`;
  const url = `${SITE_URL}/cars/${car.slug}`;

  return {
    title,
    description,
    keywords: `${car.brand}, ${car.model}, ${car.year}, veturë, makinë, ${car.fuelType}, ${car.transmission}, ${car.color || ''}, ${car.bodyType || ''}`,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${car.brand} ${car.model} ${car.year}`,
        },
      ],
      locale: 'sq_AL',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

// Generate structured data (JSON-LD) for car
export function generateCarStructuredData(car: Car, siteUrl: string = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: `${car.brand} ${car.model} ${car.year}`,
    brand: {
      '@type': 'Brand',
      name: car.brand,
    },
    model: car.model,
    productionDate: `${car.year}-01-01`,
    vehicleIdentificationNumber: car.id,
    description: car.description || `${car.brand} ${car.model} ${car.year} - ${car.fuelType}, ${car.transmission}`,
    image: car.gallery && car.gallery.length > 0 
      ? [car.mainImage, ...car.gallery]
      : [car.mainImage],
    offers: {
      '@type': 'Offer',
      price: car.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/cars/${car.slug}`,
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days
    },
    vehicleConfiguration: car.bodyType || undefined,
    fuelType: car.fuelType,
    transmission: car.transmission,
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: car.mileage,
      unitCode: 'KMT',
    },
    color: car.color || undefined,
    numberOfDoors: undefined, // Can be added if available
    vehicleEngine: car.powerHp ? {
      '@type': 'EngineSpecification',
      enginePower: {
        '@type': 'QuantitativeValue',
        value: car.powerHp,
        unitCode: 'HP',
      },
    } : undefined,
  };
}

// Generate structured data for organization
export function generateOrganizationStructuredData(siteUrl: string = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: SITE_NAME,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rruga Durrësit',
      addressLocality: 'Tiranë',
      addressCountry: 'AL',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+355-69-123-4567',
      contactType: 'customer service',
      areaServed: 'AL',
      availableLanguage: ['sq', 'en'],
    },
    sameAs: [
      // Add social media links when available
    ],
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>, siteUrl: string = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}

// Helper function for price formatting
function formatPrice(price: number): string {
  return `€${price.toLocaleString('sq-AL')}`;
}

