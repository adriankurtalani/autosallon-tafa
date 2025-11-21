"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPhoneLink, formatWhatsAppLink } from "@/lib/utils";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  User,
  MessageSquare,
  Facebook,
  Instagram
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    interestedCar: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create WhatsApp message with form data
      const whatsappMessage = `
Emri: ${formData.name}
Email: ${formData.email}
Telefon: ${formData.phone}
${formData.interestedCar ? `Interesuar për: ${formData.interestedCar}` : ''}
Mesazhi: ${formData.message}
      `.trim();
      
      // Open WhatsApp with pre-filled message
      const whatsappUrl = formatWhatsAppLink("+355691234567", whatsappMessage);
      window.open(whatsappUrl, '_blank');
      
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", interestedCar: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const contactMethods = [
    {
      icon: Phone,
      title: "Telefon",
      value: "+355 69 123 4567",
      description: "Na thirrni çdo ditë nga ora 09:00 - 18:00",
      action: () => window.open(formatPhoneLink("+355 69 123 4567"), '_self'),
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+355 69 123 4567",
      description: "Mesazh i shpejtë 24/7",
      action: () => window.open(formatWhatsAppLink("+355691234567", "Përshëndetje, dëshiroj të kontaktoj AutoSallon Tafa"), '_blank'),
      color: "bg-green-50 border-green-200"
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@autosallontafa.al",
      description: "Përgjigjemi brenda 24 orësh",
      action: () => window.open("mailto:info@autosallontafa.al", '_self'),
      color: "bg-purple-50 border-purple-200"
    },
    {
      icon: MapPin,
      title: "Lokacioni",
      value: "Rruga Durrësit, Tiranë",
      description: "Pranë Qendrës Tregtare Tirana East Gate",
      action: () => window.open("https://maps.google.com/?q=Rruga+Durrësit,Tiranë", '_blank'),
      color: "bg-orange-50 border-orange-200"
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
              Na Kontaktoni
            </h1>
            <p className="text-xl leading-8 text-gray-200">
              Jemi këtu për t'ju ndihmuar. Na kontaktoni për çdo pyetje ose 
              për të rezervuar një takim.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Dërgoni një Mesazh
                </CardTitle>
                <p className="text-gray-600">
                  Plotësoni formularin më poshtë dhe ne do t'ju kontaktojmë së shpejti.
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Emri i Plotë *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                      placeholder="Shkruani emrin tuaj të plotë"
                    />
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                      placeholder="emri@email.com"
                    />
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Numri i Telefonit
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                      placeholder="+355 69 123 456"
                    />
                  </div>
                  
                  {/* Interested Car */}
                  <div>
                    <label htmlFor="interestedCar" className="block text-sm font-medium text-gray-700 mb-2">
                      Interesuar për Veturën (opsionale)
                    </label>
                    <select
                      id="interestedCar"
                      name="interestedCar"
                      value={formData.interestedCar}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    >
                      <option value="">Zgjidhni veturën</option>
                      <option value="BMW X5 2022">BMW X5 2022</option>
                      <option value="Audi A4 2021">Audi A4 2021</option>
                      <option value="Mercedes C-Class 2023">Mercedes C-Class 2023</option>
                      <option value="Tesla Model 3 2022">Tesla Model 3 2022</option>
                      <option value="Volkswagen Golf 2020">Volkswagen Golf 2020</option>
                      <option value="Ford Focus 2021">Ford Focus 2021</option>
                      <option value="Tjetër">Tjetër</option>
                    </select>
                  </div>
                  
                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mesazhi *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                      placeholder="Shkruani mesazhin tuaj këtu..."
                    />
                  </div>
                  
                  {/* Submit Status */}
                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-700 text-sm">
                        Mesazhi u dërgua me sukses! Do t'ju kontaktojmë së shpejti.
                      </p>
                    </div>
                  )}
                  
                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm">
                        Ndodhi një gabim gjatë dërgimit. Ju lutemi provoni përsëri ose na kontaktoni drejtpërdrejt.
                      </p>
                    </div>
                  )}
                  
                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Duke dërguar...</>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Dërgoje Mesazhin
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Methods */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Mënyra të Tjera Kontakti</h2>
              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <Card 
                    key={method.title} 
                    className={`cursor-pointer transition-all hover:shadow-md ${method.color}`}
                    onClick={method.action}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                          <method.icon className="h-6 w-6 text-black" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-black mb-1">
                            {method.title}
                          </h3>
                          <p className="font-medium text-gray-900 mb-1">
                            {method.value}
                          </p>
                          <p className="text-sm text-gray-600">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Orari i Punës
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">E Hënë - E Premte</span>
                    <span className="font-semibold text-black">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">E Shtunë</span>
                    <span className="font-semibold text-black">09:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">E Diel</span>
                    <span className="text-red-600">E mbyllur</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">
                    Për emergjenca ose pyetje urgjente, na shkruani në WhatsApp.
                  </p>
                  <Button 
                    size="sm" 
                    className="w-full bg-black hover:bg-gray-800 text-white"
                    onClick={() => window.open(formatWhatsAppLink("+355691234567", "Përshëndetje, kam një pyetje urgjente"), '_blank')}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp 24/7
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Na Ndiqni</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Ndiqni përditësimet tona për veturat e reja dhe ofertat speciale.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">Lokacioni Ynë</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-black mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-black">Adresa e Plotë</p>
                        <p className="text-gray-600">
                          Auto Tafa<br />
                          Koordinatat: 42.4347833, 21.4552112<br />
                          Shqipëri
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600 mb-4">
                        Jemi të vendosur në një nga rrugët kryesore të Tiranës, 
                        lehtësisht të arritshëm me transport publik ose privat.
                      </p>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.open("https://www.google.com/maps/place/Auto+Tafa/@42.4347833,21.4552112,17z/data=!3m1!4b1!4m6!3m5!1s0x13548d00040ecc2f:0x5a32b4264ab793aa!8m2!3d42.4347833!4d21.4552112!16s%2Fg%2F11ykz5qg1r?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D", '_blank')}
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Hap në Google Maps
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Google Maps Embed */}
            <div className="lg:col-span-2">
              <Card className="h-full overflow-hidden">
                <CardContent className="p-0 h-full">
                  <div className="aspect-[2/1] lg:aspect-auto lg:h-full lg:min-h-[400px]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.8752574356977!2d21.452961876294742!3d42.43478337118748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13548d00040ecc2f%3A0x5a32b4264ab793aa!2sAuto%20Tafa!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: '300px' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Auto Tafa Location"
                      className="rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
