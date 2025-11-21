import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPhoneLink, formatWhatsAppLink } from "@/lib/utils";
import { 
  Car, 
  CreditCard, 
  FileText, 
  Truck, 
  Wrench, 
  Shield, 
  Clock,
  CheckCircle,
  MessageCircle,
  Phone,
  Euro,
  MapPin,
  Users,
  Star
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: Car,
      title: "Shitje Veturash",
      description: "Inventar i gjerë veturash të përdorura dhe të reja nga markat më të mira.",
      features: [
        "Vetura të kontrolluara teknike",
        "Garantoni transparencën e plotë",
        "Test-drive i mundshëm",
        "Konsultim profesional"
      ],
      badge: "Kryesore",
      color: "bg-gray-50 border-gray-200"
    },
    {
      icon: FileText,
      title: "Import me Porosi",
      description: "Importojmë veturën që dëshironi nga Europa me kushtet më të mira.",
      features: [
        "Zgjedhja nga tregje evropiane",
        "Procedura e plotë doganore",
        "Transport i sigurt",
        "Asistencë në çdo hap"
      ],
      badge: "Popullore",
      color: "bg-white border-gray-300"
    },
    {
      icon: CreditCard,
      title: "Ndihmë Financimi",
      description: "Ndihmojmë me kredi dhe plane pagesash të personalizuara.",
      features: [
        "Kredi me kushte të favorshme",
        "Pagesat në këste",
        "Aprovim i shpejtë",
        "Konsultim financiar"
      ],
      badge: "Fleksibile",
      color: "bg-gray-100 border-gray-300"
    },
    {
      icon: FileText,
      title: "Regjistrim & Sigurim",
      description: "Kryejmë të gjithë procedurën e regjistrimit dhe sigurimit.",
      features: [
        "Regjistrim në DPSHTRR",
        "Sigurim i detyrueshëm",
        "Dokumentacion i plotë",
        "Shërbim i shpejtë"
      ],
      badge: "I nevojshëm",
      color: "bg-gray-50 border-gray-200"
    },
    {
      icon: Truck,
      title: "Transport Veturave",
      description: "Transportojmë veturën tuaj në destinacionin e dëshiruar.",
      features: [
        "Transport profesional",
        "Sigurim gjatë transportit",
        "Në të gjithë Shqipërinë",
        "Çmime kompetitive"
      ],
      badge: "Kudo",
      color: "bg-white border-gray-300"
    },
    {
      icon: Wrench,
      title: "Shërbim Teknik",
      description: "Kontrolle teknike dhe mirëmbajtje për veturat që shesim.",
      features: [
        "Kontroll para shitjes",
        "Mirëmbajtje periodike",
        "Riparime të vogla",
        "Këshillim teknik"
      ],
      badge: "Cilësor",
      color: "bg-gray-100 border-gray-300"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Kontakti Fillestar",
      description: "Na kontaktoni për të diskutuar nevojat tuaja dhe preferencat.",
      icon: MessageCircle
    },
    {
      step: "2", 
      title: "Konsultimi",
      description: "Ofrojmë konsultim të detajuar dhe zgjidhje të personalizuara.",
      icon: Users
    },
    {
      step: "3",
      title: "Planifikimi",
      description: "Hartuam planin e veprimit dhe kohën e realizimit.",
      icon: Clock
    },
    {
      step: "4",
      title: "Realizimi",
      description: "Zbatojmë shërbimin me kujdesin dhe cilësinë më të lartë.",
      icon: CheckCircle
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Besueshmëri e Plotë",
      description: "10+ vjet përvoje dhe qindra klientë të kënaqur"
    },
    {
      icon: Star,
      title: "Cilësi Superiore", 
      description: "Përdorim vetëm partnerë dhe furnizues të besueshëm"
    },
    {
      icon: Euro,
      title: "Çmime Transparente",
      description: "Asnjë kosto e fshehur, çdo gjë e qartë dhe në përputhje me premtimet"
    },
    {
      icon: Clock,
      title: "Shpejtësi & Eficiencë",
      description: "Realizojmë shërbimin brenda afateve të premtuara"
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
              Shërbimet Tona
            </h1>
            <p className="text-xl leading-8 text-gray-200">
              Zgjidhje të plota për çdo nevojë që lidhet me blerjen, importimin 
              dhe mirëmbajtjen e veturave tuaja.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">Çka Ofrojmë</h2>
            <p className="text-lg text-gray-600">
              Gama e plotë e shërbimeve për të plotësuar nevojat tuaja të veturave
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className={`relative overflow-hidden ${service.color}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm`}>
                      <service.icon className="h-6 w-6 text-black" />
                    </div>
                    <Badge variant="secondary">{service.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl text-black">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full mt-6" 
                    variant="outline"
                    asChild
                  >
                    <a 
                      href={formatWhatsAppLink("+355691234567", `Përshëndetje, jam i interesuar për shërbimin: ${service.title}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mëso Më Shumë
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">Si Funksionon</h2>
            <p className="text-lg text-gray-600">
              Procesi ynë i thjeshtë dhe transparent për çdo shërbim
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step) => (
              <div key={step.step} className="text-center">
                <div className="relative mb-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-white font-bold text-xl">
                    {step.step}
                  </div>
                  <div className="mt-4 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <step.icon className="h-6 w-6 text-black" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">Pse Na Zgjidhni</h2>
            <p className="text-lg text-gray-600">
              Përfitimet që merrni duke punuar me AutoSallon Tafa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 flex-shrink-0">
                      <benefit.icon className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">Çmimet Tona</h2>
            <p className="text-lg text-gray-600">
              Çmime transparente dhe kompetitive për çdo shërbim
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-black mb-4">
                Çmime të Personalizuara
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Çdo shërbim është i personalizuar sipas nevojave tuaja specifike. 
                Na kontaktoni për një ofertë falas dhe të detajuar.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-sm">
                <div className="bg-white rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold">Konsultim Falas</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold">Ofertë e Detajuar</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold">Asnjë Kosto e Fshehur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-black to-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Gati për të Filluar?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Na kontaktoni sot për të diskutuar se si mund t'ju ndihmojmë me nevojat tuaja.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-100"
              asChild
            >
              <a 
                href={formatWhatsAppLink("+355691234567", "Përshëndetje, dëshiroj informacion rreth shërbimeve tuaja")}
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
              <a href={formatPhoneLink("+355 69 123 4567")}>
                <Phone className="h-5 w-5 mr-2" />
                Thirre Tani
              </a>
            </Button>
          </div>
          
          <div className="mt-8 text-gray-200">
            <p className="text-sm">
              📍 Auto Tafa, Shqipëri • 📞 +355 69 123 4567 • ✉️ info@autosallontafa.al
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
