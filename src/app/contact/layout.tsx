import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakti - AutoSallon Tafa',
  description: 'Na kontaktoni për çdo pyetje ose për të rezervuar një takim. Telefon: +355 69 123 4567, Email: info@autosallontafa.al',
  keywords: 'kontakt, telefon, email, WhatsApp, lokacion, Tiranë',
  openGraph: {
    title: 'Kontakti - AutoSallon Tafa',
    description: 'Na kontaktoni për çdo pyetje ose për të rezervuar një takim.',
    type: 'website',
    locale: 'sq_AL',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

