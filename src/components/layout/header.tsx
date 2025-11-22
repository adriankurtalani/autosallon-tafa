"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatPhoneLink, formatWhatsAppLink } from "@/lib/utils";

const navigation = [
  { name: "Ballina", href: "/" },
  { name: "Veturat", href: "/cars" },
  { name: "Rreth Nesh", href: "/about" },
  { name: "Shërbimet", href: "/services" },
  { name: "Kontakti", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);
  const firstLinkRef = React.useRef<HTMLAnchorElement>(null);

  // Handle ESC key to close mobile menu
  React.useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Focus management for mobile menu
  React.useEffect(() => {
    if (mobileMenuOpen && firstLinkRef.current) {
      // Small delay to ensure menu is rendered
      setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 100);
    }
  }, [mobileMenuOpen]);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-gradient">AutoSallon</span>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Hap menunë mobile"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
        
        <nav className="hidden lg:flex lg:gap-x-12" aria-label="Navigimi kryesor">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              prefetch={true}
              className={cn(
                "text-sm font-semibold leading-6 transition-colors hover:text-black",
                pathname === item.href ? "text-black font-bold" : "text-gray-900"
              )}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button variant="outline" size="sm" className="!border-black !text-black !bg-white hover:!bg-black hover:!text-white" asChild>
            <a href={formatPhoneLink("+355 69 123 4567")} aria-label="Thirr +355 69 123 4567">
              <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
              Thirr
            </a>
          </Button>
          <Button size="sm" className="bg-black text-white hover:bg-gray-800" asChild>
            <a 
              href={formatWhatsAppLink("+355691234567", "Përshëndetje, jam i interesuar për veturat tuaja")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Shkruaj në WhatsApp"
            >
              <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
              WhatsApp
            </a>
          </Button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div 
            className="fixed inset-0 z-50 bg-black/20" 
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div 
            id="mobile-menu"
            ref={mobileMenuRef}
            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
            role="dialog"
            aria-modal="true"
            aria-label="Menuja mobile"
          >
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" aria-label="AutoSallon Tafa - Ballina">
                <span className="text-xl font-bold text-gradient">AutoSallon</span>
              </Link>
              <Button
                variant="ghost"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Mbyll menunë"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
            
            <nav className="mt-6 flow-root" aria-label="Navigimi mobile">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6" role="list">
                  {navigation.map((item, index) => (
                    <Link
                      key={item.name}
                      ref={index === 0 ? firstLinkRef : null}
                      href={item.href}
                      className={cn(
                        "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
                        pathname === item.href ? "text-black font-bold" : "text-gray-900"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={pathname === item.href ? "page" : undefined}
                      role="listitem"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                <div className="py-6 space-y-3">
                  <Button variant="outline" className="w-full justify-start border-black text-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2" asChild>
                    <a href={formatPhoneLink("+355 69 123 4567")} aria-label="Thirr +355 69 123 4567">
                      <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                      +355 69 123 4567
                    </a>
                  </Button>
                  <Button className="w-full justify-start bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2" asChild>
                    <a 
                      href={formatWhatsAppLink("+355691234567", "Përshëndetje, jam i interesuar për veturat tuaja")}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Shkruaj në WhatsApp"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
