import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shërbimet - Auto Salloni Adrian',
  description: 'Shitje veturash, import me porosi, ndihmë financimi, regjistrim dhe sigurim. Shërbime profesionale për të gjitha nevojat tuaja automobilistike.',
  keywords: 'shërbime, shitje veturash, import, financim, regjistrim, sigurim, Tiranë',
  openGraph: {
    title: 'Shërbimet - Auto Salloni Adrian',
    description: 'Shitje veturash, import me porosi, ndihmë financimi, regjistrim dhe sigurim.',
    type: 'website',
    locale: 'sq_AL',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

