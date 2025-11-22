"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CarCard } from "@/components/ui/car-card";
import { getFeaturedCars, getCarBrands } from "@/lib/supabase/cars";
import { formatWhatsAppLink } from "@/lib/utils";
import { fadeInUp, defaultTransition } from "@/lib/motion-config";
import { 
  Search, 
  Shield, 
  Award, 
  Wrench, 
  CreditCard,
  CheckCircle,
  MessageCircle,
  Users,
  Clock,
  Star
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [featuredCars, setFeaturedCars] = React.useState<any[]>([]);
  const [brands, setBrands] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);
  
  // Quick search state
  const [selectedBrand, setSelectedBrand] = React.useState<string>("");
  const [selectedYearRange, setSelectedYearRange] = React.useState<string>("");
  const [selectedTransmission, setSelectedTransmission] = React.useState<string>("");
  
  // Load featured cars and brands
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const [featured, brandsData] = await Promise.all([
          getFeaturedCars(),
          getCarBrands()
        ]);
        setFeaturedCars(featured);
        setBrands(brandsData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  
  const handleQuickSearch = () => {
    const params = new URLSearchParams();
    
    if (selectedBrand && selectedBrand !== "Të gjitha markat") {
      params.append("brand", selectedBrand);
    }
    
    if (selectedYearRange && selectedYearRange !== "Viti") {
      params.append("yearRange", selectedYearRange);
    }
    
    if (selectedTransmission && selectedTransmission !== "Transmisioni") {
      params.append("transmission", selectedTransmission);
    }
    
    // Navigate to cars page with filters
    const queryString = params.toString();
    router.push(`/cars${queryString ? `?${queryString}` : ""}`);
  };
  
  const features = [
    {
      icon: Shield,
      title: "Shërbim i Sigurt",
      description: "Të gjitha veturat kalojnë kontroll teknik të detajuar para shitjes"
    },
    {
      icon: Award,
      title: "Përvoja & Cilësia",
      description: "Më shumë se 10 vjet përvoje në tregun e veturave të përdorura"
    },
    {
      icon: Wrench,
      title: "Garanci & Mbështetje",
      description: "Ofrojmë garanci dhe shërbim pas-shitjes për të gjitha veturat"
    },
    {
      icon: CreditCard,
      title: "Mundësi Financimi",
      description: "Ndihmojmë me opsione kredie dhe financimi të personalizuar"
    }
  ];
  
  const process = [
    {
      step: "1",
      title: "Zgjidh Veturën",
      description: "Shfleto inventarin tonë dhe gjej veturën që të pëlqen më shumë"
    },
    {
      step: "2",
      title: "Na Kontakto",
      description: "Thirr ose dërgo mesazh për të rezervuar një test-drive"
    },
    {
      step: "3",
      title: "Finalizoje Blerjen",
      description: "Plotëso dokumentacionin dhe merr çelësat e veturës tënde"
    }
  ];
  
  const testimonials = [
    {
      name: "Marko Petriti",
      text: "Shërbim fantastik! Gjeta veturën e duhur dhe çmimi ishte shumë i drejtë. Rekomandoj!",
      rating: 5
    },
    {
      name: "Ana Hoxha",
      text: "Shumë profesional dhe të sinqertë. M'u ndihmuan me financimin dhe gjithçka shkoi perfekt.",
      rating: 5
    },
    {
      name: "Genti Rama",
      text: "BMW që bleva ishte në gjendje të përsosur. Faleminderit për transparencën!",
      rating: 5
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Duke ngarkuar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop"
            alt="Auto Sallon Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center lg:px-8">
          <motion.div 
            className="mx-auto max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={defaultTransition}
          >
            <motion.h1 
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ ...defaultTransition, delay: 0.1 }}
            >
              Gjej Veturën 
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"> Tënde Ideale</span>
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg leading-8 text-gray-200 max-w-2xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ ...defaultTransition, delay: 0.2 }}
            >
              AutoSallon Tafa - Vetura të zgjedhura me kujdes për çdo nevojë. 
              Shërbim profesional, çmime të drejta dhe garanci e sigurt.
            </motion.p>
            <motion.div 
              className="mt-10 flex items-center justify-center gap-x-6"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ ...defaultTransition, delay: 0.3 }}
            >
              <Button size="lg" asChild className="bg-white hover:bg-gray-100 text-black font-semibold border border-white">
                <Link href="/cars" prefetch={true}>Shiko Inventarin</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-black"
                asChild
              >
                <Link href="/contact" prefetch={true}>Na Kontakto</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Search Bar */}
      <section className="bg-white shadow-lg -mt-8 relative z-20 mx-auto max-w-6xl rounded-2xl border border-gray-200">
        <motion.div 
          className="p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          transition={defaultTransition}
        >
          <div className="flex items-center justify-center mb-6">
            <Search className="h-6 w-6 text-black mr-2" />
            <h2 className="text-xl font-semibold text-black">Kërkim i Shpejtë</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select 
              className="rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:ring-black focus:ring-2 bg-white"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">Të gjitha markat</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <select 
              className="rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:ring-black focus:ring-2 bg-white"
              value={selectedYearRange}
              onChange={(e) => setSelectedYearRange(e.target.value)}
            >
              <option value="">Viti</option>
              <option value="2020-2025">2020+</option>
              <option value="2015-2019">2015-2019</option>
              <option value="2010-2014">2010-2014</option>
            </select>
            <select 
              className="rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:ring-black focus:ring-2 bg-white"
              value={selectedTransmission}
              onChange={(e) => setSelectedTransmission(e.target.value)}
            >
              <option value="">Transmisioni</option>
              <option value="Automatik">Automatik</option>
              <option value="Manual">Manual</option>
            </select>
            <Button 
              className="bg-black hover:bg-gray-800 text-white font-semibold"
              onClick={handleQuickSearch}
            >
              Kërko
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Featured Cars */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={defaultTransition}
          >
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Veturat e Zgjedhura
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Zbulo veturat më të mira nga inventari ynë i zgjerë
            </p>
          </motion.div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {featuredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ ...defaultTransition, delay: index * 0.05 }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" className="!border-black !text-black hover:!bg-black hover:!text-white" asChild>
              <Link href="/cars" prefetch={true}>Shiko Të Gjitha Veturat</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={defaultTransition}
          >
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Pse të Zgjedhësh AutoSallon Tafa?
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Jemi të angazhuar për të ofruar shërbimin më të mirë dhe veturat më të sigurta
            </p>
          </motion.div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ ...defaultTransition, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                      <feature.icon className="h-8 w-8 text-black" />
                    </div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={defaultTransition}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Si Funksionon Procesi?
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Tre hapa të thjeshtë për të blerë veturën tënde të re
            </p>
          </motion.div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {process.map((step, index) => (
              <motion.div 
                key={step.step} 
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ ...defaultTransition, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-black font-bold text-xl mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-300">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={defaultTransition}
          >
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Çka Thonë Klientët Tanë
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Dëgjoni përvojat e klientëve që kanë zgjedhur AutoSallon Tafa
            </p>
          </motion.div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ ...defaultTransition, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-black fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-gray-600 mb-4">
                      "{testimonial.text}"
                    </blockquote>
                    <cite className="text-black font-semibold">
                      — {testimonial.name}
                    </cite>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-black to-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            Gati për të Gjetur Veturën Tënde?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Na kontakto sot dhe le të të ndihmojmë të gjesh veturën perfekte për nevojat e tua.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-100"
              asChild
            >
              <a 
                href={formatWhatsAppLink("+355691234567", "Përshëndetje, jam i interesuar për veturat tuaja dhe dëshiroj më shumë informacion.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Shkruani në WhatsApp
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-black"
              asChild
            >
              <Link href="/cars" prefetch={true}>Shiko Inventarin</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
