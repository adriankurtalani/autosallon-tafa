"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CarCard } from "@/components/ui/car-card";
import { getFeaturedCars } from "@/lib/data/cars";
import { formatWhatsAppLink } from "@/lib/utils";
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
  const featuredCars = getFeaturedCars();
  
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
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Gjej Veturën 
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"> Tënde Ideale</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200 max-w-2xl mx-auto">
              AutoSallon Tafa - Vetura të zgjedhura me kujdes për çdo nevojë. 
              Shërbim profesional, çmime të drejta dhe garanci e sigurt.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild className="bg-white hover:bg-gray-100 text-black font-semibold border border-white">
                <Link href="/cars">Shiko Inventarin</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-black"
                asChild
              >
                <Link href="/contact">Na Kontakto</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search Bar */}
      <section className="bg-white shadow-lg -mt-8 relative z-20 mx-auto max-w-6xl rounded-2xl border border-gray-200">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <Search className="h-6 w-6 text-black mr-2" />
            <h2 className="text-xl font-semibold text-black">Kërkim i Shpejtë</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="rounded-lg border border-gray-300 px-4 py-3 focus:border-accent focus:ring-accent">
              <option>Të gjitha markat</option>
              <option>BMW</option>
              <option>Audi</option>
              <option>Mercedes</option>
              <option>Volkswagen</option>
            </select>
            <select className="rounded-lg border border-gray-300 px-4 py-3 focus:border-accent focus:ring-accent">
              <option>Viti</option>
              <option>2020+</option>
              <option>2015-2019</option>
              <option>2010-2014</option>
            </select>
            <select className="rounded-lg border border-gray-300 px-4 py-3 focus:border-accent focus:ring-accent">
              <option>Transmisioni</option>
              <option>Automatik</option>
              <option>Manual</option>
            </select>
            <Button className="bg-black hover:bg-gray-800 text-white font-semibold">
              Kërko
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Veturat e Zgjedhura
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Zbulo veturat më të mira nga inventari ynë i zgjerë
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/cars">Shiko Të Gjitha Veturat</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Pse të Zgjedhësh AutoSallon Tafa?
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Jemi të angazhuar për të ofruar shërbimin më të mirë dhe veturat më të sigurta
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
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
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Si Funksionon Procesi?
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Tre hapa të thjeshtë për të blerë veturën tënde të re
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {process.map((step) => (
              <div key={step.step} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-black font-bold text-xl mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Çka Thonë Klientët Tanë
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Dëgjoni përvojat e klientëve që kanë zgjedhur AutoSallon Tafa
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
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
              <Link href="/cars">Shiko Inventarin</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
