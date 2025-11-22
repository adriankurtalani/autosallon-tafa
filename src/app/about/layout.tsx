import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rreth Nesh - AutoSallon Tafa',
  description: 'Më shumë se 10 vjet përvojë në tregun e veturave. AutoSallon Tafa ofron vetura të kontrolluara teknike me garanci dhe shërbim profesional.',
  keywords: 'rreth nesh, auto sallon, përvojë, ekip, Tiranë, Shqipëri',
  openGraph: {
    title: 'Rreth Nesh - AutoSallon Tafa',
    description: 'Më shumë se 10 vjet përvojë në tregun e veturave. AutoSallon Tafa ofron vetura të kontrolluara teknike me garanci.',
    type: 'website',
    locale: 'sq_AL',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

