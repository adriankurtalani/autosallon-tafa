"use client";

import { Car } from '@/types/car';
import { generateCarStructuredData, generateBreadcrumbStructuredData, generateOrganizationStructuredData } from '@/lib/seo';

interface StructuredDataProps {
  car?: Car;
  breadcrumbs?: Array<{ name: string; url: string }>;
  includeOrganization?: boolean;
}

export function StructuredData({ car, breadcrumbs, includeOrganization = false }: StructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autosalloniadrian.al';
  
  return (
    <>
      {car && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateCarStructuredData(car, siteUrl)),
          }}
        />
      )}
      
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbStructuredData(breadcrumbs, siteUrl)),
          }}
        />
      )}
      
      {includeOrganization && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationStructuredData(siteUrl)),
          }}
        />
      )}
    </>
  );
}

