# AutoSallon Tafa - Modern Car Dealership Website

A professional, modern car dealership website built with Next.js, featuring a sleek black & white design and comprehensive car inventory management.

## 🚗 Features

- **Modern Design**: Clean, professional black & white automotive theme
- **Responsive Layout**: Mobile-first design that works perfectly on all devices
- **Car Inventory**: Advanced filtering and search functionality
- **Individual Car Pages**: Detailed car specifications with image galleries
- **Contact Integration**: WhatsApp, phone, and email contact options
- **Google Maps**: Real location integration with interactive maps
- **European Standards**: Albanian language with European date/currency formatting

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion ready
- **Maps**: Google Maps integration

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/autosallon-tafa.git
   cd autosallon-tafa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
autosallon-tafa/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Homepage
│   │   ├── cars/              # Car inventory pages
│   │   ├── about/             # About page
│   │   ├── services/          # Services page
│   │   └── contact/           # Contact page
│   ├── components/            # Reusable components
│   │   ├── layout/           # Header and footer
│   │   └── ui/               # UI components
│   ├── lib/                  # Utilities and data
│   └── types/                # TypeScript types
├── public/                   # Static assets
└── ...config files
```

## 🎨 Design System

- **Primary Color**: Black (#000000)
- **Accent Color**: White (#FFFFFF)  
- **Background**: White with gray accents
- **Typography**: Inter font family
- **Borders**: Subtle gray borders for definition

## 📱 Pages

1. **Homepage** (`/`) - Hero section, featured cars, company info
2. **Car Inventory** (`/cars`) - Full car listings with filters
3. **Car Details** (`/cars/[slug]`) - Individual car pages
4. **About** (`/about`) - Company information and team
5. **Services** (`/services`) - Available services and pricing
6. **Contact** (`/contact`) - Contact form and location info

## 🌍 Localization

- **Language**: Albanian (sq)
- **Currency**: Euro (€) - amount followed by symbol
- **Date Format**: dd/mm/yyyy (European standard)
- **Phone Format**: Albanian (+355) format

## 📞 Contact Integration

- **WhatsApp**: Pre-filled messages for easy customer contact
- **Phone**: Direct calling links
- **Email**: Contact forms and direct email links
- **Location**: Google Maps integration with real coordinates

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the `out` folder to Netlify
```

### Manual Deployment
```bash
npm run build
npm run export
# Deploy the generated static files
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Cars

Edit `src/lib/data/cars.ts` to add new cars to the inventory:

```typescript
{
  id: "unique-id",
  slug: "car-brand-model-year",
  brand: "Brand Name",
  model: "Model Name", 
  year: 2023,
  price: 50000,
  // ... other properties
}
```

## 📈 SEO Features

- **Meta Tags**: Proper SEO meta tags for all pages
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Car listings with structured data
- **Sitemap**: Auto-generated sitemap
- **Performance**: Optimized images and lazy loading

## 🛡️ License

This project is created for AutoSallon Tafa. All rights reserved.

## 📞 Support

For support or questions about this website:
- **Phone**: +355 69 123 4567
- **Email**: info@autosallontafa.al
- **WhatsApp**: [Contact us](https://wa.me/355691234567)

---

**Built with ❤️ for AutoSallon Tafa**
