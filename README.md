# Auto Salloni Adrian - Modern Car Dealership Website

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

- **Framework**: Next.js 14 with React 18 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Authentication**: Supabase Auth
- **Maps**: Google Maps integration

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/autosalloniadrian.git
   cd autosalloniadrian
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Follow the setup guide in `SUPABASE_SETUP.md`
   - Create `.env.local` with your Supabase credentials:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
autosalloniadrian/
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

Cars are managed through the **Admin Panel**:

1. **Set up Supabase** (see `SUPABASE_SETUP.md`)
2. **Log in** at `/login`
3. **Access Admin Panel** at `/admin`
4. **Add cars** with image uploads directly from your computer

The admin panel supports:
- Creating, editing, and deleting cars
- Uploading up to 10 images per car
- Managing featured cars
- Search and filter cars
- Dashboard statistics

## 📈 SEO Features

- **Meta Tags**: Proper SEO meta tags for all pages
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Car listings with structured data
- **Sitemap**: Auto-generated sitemap
- **Performance**: Optimized images and lazy loading

## 🛡️ License

This project is created for Auto Salloni Adrian. All rights reserved.

## 📞 Support

For support or questions about this website:
- **Phone**: +355 69 123 4567
- **Email**: info@autosalloniadrian.al
- **WhatsApp**: [Contact us](https://wa.me/355691234567)

---

**Built with ❤️ for Auto Salloni Adrian**
