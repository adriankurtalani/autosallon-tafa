import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AutoSallon Tafa - Vetura të Zgjedhura me Kujdes',
  description: 'AutoSallon profesionale me inventar të gjerë veturash. Shërbim i sigurt, garanci dhe mundësi financimi. Gjej veturën tënde ideale sot.',
  keywords: 'auto sallon, vetura, makinë, shitje veturash, Tiranë, Shqipëri, BMW, Audi, Mercedes',
  openGraph: {
    title: 'AutoSallon Tafa - Vetura të Zgjedhura me Kujdes',
    description: 'AutoSallon profesionale me inventar të gjerë veturash. Shërbim i sigurt, garanci dhe mundësi financimi.',
    type: 'website',
    locale: 'sq_AL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoSallon Tafa - Vetura të Zgjedhura me Kujdes',
    description: 'AutoSallon profesionale me inventar të gjerë veturash. Shërbim i sigurt, garanci dhe mundësi financimi.',
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
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
