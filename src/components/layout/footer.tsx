import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPhoneLink, formatWhatsAppLink } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Company Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                AutoSallon Tafa
              </h3>
              <p className="mt-4 text-gray-300 max-w-md">
                Vetura të zgjedhura me kujdes për klientët tanë. Me vite përvoje në shitjen e 
                veturave të cilësisë së lartë dhe shërbim profesional.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <a 
                  href={formatPhoneLink("+355 69 123 4567")} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +355 69 123 4567
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <a 
                  href="mailto:info@autosallontafa.al" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  info@autosallontafa.al
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-accent" />
                <a 
                  href="https://www.google.com/maps/place/Auto+Tafa/@42.4347833,21.4552112,17z/data=!3m1!4b1!4m6!3m5!1s0x13548d00040ecc2f:0x5a32b4264ab793aa!8m2!3d42.4347833!4d21.4552112!16s%2Fg%2F11ykz5qg1r?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Auto Tafa, Shqipëri
                </a>
              </div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white">Navigimi</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li>
                  <Link href="/" prefetch={true} className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    Ballina
                  </Link>
                </li>
                <li>
                  <Link href="/cars" prefetch={true} className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    Veturat
                  </Link>
                </li>
                <li>
                  <Link href="/about" prefetch={true} className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    Rreth Nesh
                  </Link>
                </li>
                <li>
                  <Link href="/services" prefetch={true} className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    Shërbimet
                  </Link>
                </li>
                <li>
                  <Link href="/contact" prefetch={true} className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                    Kontakti
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white">Shërbimet</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li className="text-sm leading-6 text-gray-300">Shitje Veturash</li>
                <li className="text-sm leading-6 text-gray-300">Import me Porosi</li>
                <li className="text-sm leading-6 text-gray-300">Ndihmë Financimi</li>
                <li className="text-sm leading-6 text-gray-300">Regjistrim & Sigurim</li>
                <li className="text-sm leading-6 text-gray-300">Transport</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Social Media & Actions */}
        <div className="mt-8 sm:mt-12 flex flex-col space-y-4 sm:space-y-6 border-t border-gray-600 pt-6 sm:pt-8 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex flex-wrap gap-3 sm:space-x-4">
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white hover:border-white">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white hover:border-white">
              <Instagram className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              className="bg-white hover:bg-gray-100 text-black"
              asChild
            >
              <a 
                href={formatWhatsAppLink("+355691234567", "Përshëndetje, dëshiroj më shumë informacion për veturat tuaja")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Na shkruani në WhatsApp
              </a>
            </Button>
          </div>
          
          <p className="text-xs leading-5 text-gray-400">
            &copy; 2025 AutoSallon Tafa. Të gjitha të drejtat e rezervuara.
          </p>
        </div>
        
        {/* Working Hours */}
        <div className="mt-8 border-t border-gray-600 pt-6">
          <h4 className="text-sm font-semibold text-white mb-4">Orari i Punës</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
            <div>E Hënë - E Premte: 09:00 - 18:00</div>
            <div>E Shtunë: 09:00 - 14:00</div>
            <div>E Diel: E mbyllur</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
