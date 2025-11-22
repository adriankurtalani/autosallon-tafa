import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Veturat - Auto Salloni Adrian',
  description: 'Shfleto inventarin tonë të gjerë veturash. Filtro sipas markës, vitit, çmimit dhe karakteristikave të tjera. Gjej veturën tënde ideale.',
  keywords: 'veturat, inventar, BMW, Audi, Mercedes, filtro, kërko',
  openGraph: {
    title: 'Veturat - Auto Salloni Adrian',
    description: 'Shfleto inventarin tonë të gjerë veturash. Filtro sipas markës, vitit, çmimit dhe karakteristikave të tjera.',
    type: 'website',
    locale: 'sq_AL',
  },
};

export default function CarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

