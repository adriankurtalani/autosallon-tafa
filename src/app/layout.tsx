import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Providers } from '@/components/providers/auth-provider'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://autosalloniadrian.al';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Auto Salloni Adrian - Vetura të Zgjedhura me Kujdes',
    template: '%s | Auto Salloni Adrian',
  },
  description: 'AutoSallon profesionale me inventar të gjerë veturash. Shërbim i sigurt, garanci dhe mundësi financimi. Gjej veturën tënde ideale sot.',
  keywords: 'auto sallon, vetura, makinë, shitje veturash, Tiranë, Shqipëri, BMW, Audi, Mercedes',
  authors: [{ name: 'Auto Salloni Adrian' }],
  creator: 'Auto Salloni Adrian',
  publisher: 'Auto Salloni Adrian',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'sq_AL',
    url: SITE_URL,
    siteName: 'Auto Salloni Adrian',
    title: 'Auto Salloni Adrian - Vetura të Zgjedhura me Kujdes',
    description: 'AutoSallon profesionale me inventar të gjerë veturash. Shërbim i sigurt, garanci dhe mundësi financimi.',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Auto Salloni Adrian',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto Salloni Adrian - Vetura të Zgjedhura me Kujdes',
    description: 'AutoSallon profesionale me inventar të gjerë veturash. Shërbim i sigurt, garanci dhe mundësi financimi.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification when available
    // google: 'your-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sq">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-white flex flex-col">
            {/* Skip to content link for accessibility */}
            <a 
              href="#main-content" 
              className="skip-to-content"
              aria-label="Kalo te përmbajtja kryesore"
            >
              Kalo te përmbajtja
            </a>
            <Header />
            <main id="main-content" className="flex-1" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
