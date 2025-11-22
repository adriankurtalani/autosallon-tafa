import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPhoneLink, formatWhatsAppLink } from "@/lib/utils";
import { 
  Award, 
  Users, 
  Shield, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle,
  Star,
  CheckCircle,
  Heart,
  Target
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    {
      icon: Award,
      number: "10+",
      label: "Vite Përvoje"
    },
    {
      icon: Users,
      number: "500+",
      label: "Klientë të Kënaqur"
    },
    {
      icon: Shield,
      number: "100%",
      label: "Garanci Cilësie"
    },
    {
      icon: Star,
      number: "4.9",
      label: "Vlerësim Mesatar"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Transparencë e Plotë",
      description: "Jemi të hapur dhe të sinqertë për gjendjen e çdo veture. Asnjë surprizë e fshehur."
    },
    {
      icon: Heart,
      title: "Kujdesi për Klientin",
      description: "Çdo klient është i rëndësishëm për ne. Ofrojmë shërbim të personalizuar dhe mbështetje të vazhdueshme."
    },
    {
      icon: Award,
      title: "Cilësi e Lartë",
      description: "Zgjedhim vetëm veturat më të mira dhe i kontrollojmë me kujdes para se t'i ofrojmë për shitje."
    },
    {
      icon: Target,
      title: "Qëllimi Ynë",
      description: "Të gjejmë veturën e përsosur për çdo klient dhe të ndërtojmë marrëdhënie afatgjate të bazuara në besim."
    }
  ];

  const team = [
    {
      name: "Adrian Kollari",
      role: "Pronar & Menaxher",
      description: "Më shumë se 15 vjet përvoje në tregun e veturave. Ekspert në vlerësimin dhe zgjedhjen e veturave të cilësisë së lartë.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
    },
    {
      name: "Arben Hoxha",
      role: "Konsulent Shitjesh",
      description: "Specialist në ndihmën e klientëve për të gjetur veturën e duhur. I fokusuar në krijimin e përvojës së kënaqshme të blerjes.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Rreth Auto Salloni Adrian
            </h1>
            <p className="text-xl leading-8 text-gray-200">
              Më shumë se një dekadë përvoje në shitjen e veturave të cilësisë së lartë. 
              Ne jemi partneri juaj i besuar për të gjetur veturën e përsosur.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                  <stat.icon className="h-8 w-8 text-black" />
                </div>
                <div className="text-3xl font-bold text-black mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Historia Jonë</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Auto Salloni Adrian u themelua në vitin 2013 me një mision të thjeshtë: të ofrojmë 
                  veturat më të mira me shërbimin më profesional në Tiranë. Që atëherë, jemi 
                  rritur duke mbajtur gjithmonë cilësinë dhe besimin e klientëve në qendër të 
                  çdo gjëje që bëjmë.
                </p>
                <p>
                  Fillimisht nisëm me një inventar të vogël veturash të zgjedhura me kujdes. 
                  Sot, falë besimit të klientëve tanë, kemi një nga inventarët më të gjerë 
                  të veturave cilësore në kryeqytet.
                </p>
                <p>
                  Çdo veturë që shesim kalon nëpër një proces rigoroz kontrolli dhe përzgjedhjeje. 
                  Ne nuk kompromitojmë kurrë me cilësinë dhe sigurinë e veturave që u ofrojmë 
                  klientëve tanë.
                </p>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <a 
                    href={formatWhatsAppLink("+355691234567", "Përshëndetje, dëshiroj të mësoj më shumë rreth Auto Salloni Adrian")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Na Kontaktoni
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={formatPhoneLink("+355 69 123 4567")}>
                    <Phone className="h-5 w-5 mr-2" />
                    +355 69 123 4567
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="aspect-[4/3] relative overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=600&h=450&fit=crop"
                  alt="Auto Salloni Adrian showroom"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square relative overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=300&h=300&fit=crop"
                    alt="Detaje shërbimi"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-square relative overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=300&fit=crop"
                    alt="Klientë të kënaqur"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">Vlerat Tona</h2>
            <p className="text-lg text-gray-600">
              Parimet që na udhëheqin në çdo aspekt të punës sonë
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 flex-shrink-0">
                      <value.icon className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-600">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">Ekipi Ynë</h2>
            <p className="text-lg text-gray-600">
              Ekspertë të devotshëm për t'ju ndihmuar të gjeni veturën e përsosur
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="p-6">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover rounded-full"
                      sizes="128px"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Na Vizitoni</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-black mt-1" />
                  <div>
                    <h3 className="font-semibold text-black mb-1">Adresa</h3>
                    <p className="text-gray-600">
                      Auto Salloni Adrian<br />
                      Shqipëri<br />
                      <span className="text-sm text-gray-500">Koordinatat: 42.4347833, 21.4552112</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-black mt-1" />
                  <div>
                    <h3 className="font-semibold text-black mb-1">Orari i Punës</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>E Hënë - E Premte: 09:00 - 18:00</p>
                      <p>E Shtunë: 09:00 - 14:00</p>
                      <p>E Diel: E mbyllur</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-black mt-1" />
                  <div>
                    <h3 className="font-semibold text-black mb-1">Kontakti</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Tel: +355 69 123 4567</p>
                      <p>Email: info@autosalloniadrian.al</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button size="lg" asChild>
                  <a 
                    href="https://www.google.com/maps/place/Auto+Tafa/@42.4347833,21.4552112,17z/data=!3m1!4b1!4m6!3m5!1s0x13548d00040ecc2f:0x5a32b4264ab793aa!8m2!3d42.4347833!4d21.4552112!16s%2Fg%2F11ykz5qg1r?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    Shiko në Hartë
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Google Maps Embed */}
            <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.8752574356977!2d21.452961876294742!3d42.43478337118748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13548d00040ecc2f%3A0x5a32b4264ab793aa!2sAuto%20Tafa!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Auto Salloni Adrian Location"
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-black to-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Gati të Filloni Udhëtimin Tuaj?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Na vizitoni sot dhe le të diskutojmë rreth veturës së përshtatshme për ju.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-100"
              asChild
            >
              <a 
                href={formatWhatsAppLink("+355691234567", "Përshëndetje, dëshiroj të vizitoj Auto Salloni Adrian")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Rezervo Vizitën
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-black"
              asChild
            >
              <a href="/cars">Shiko Veturat</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
