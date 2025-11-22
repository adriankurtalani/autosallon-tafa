"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPhoneLink, formatWhatsAppLink } from "@/lib/utils";
import { validateName, validateEmail, validatePhone, validateMessage } from "@/lib/validation";
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
  
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle");
  
  
  const validateField = (name: string, value: string) => {
    let error = "";
    
    switch (name) {
      case "name":
        const nameResult = validateName(value);
        if (!nameResult.isValid) error = nameResult.error || "";
        break;
      case "email":
        const emailResult = validateEmail(value);
        if (!emailResult.isValid) error = emailResult.error || "";
        break;
      case "phone":
        const phoneResult = validatePhone(value);
        if (!phoneResult.isValid) error = phoneResult.error || "";
        break;
      case "message":
        const messageResult = validateMessage(value);
        if (!messageResult.isValid) error = messageResult.error || "";
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === "";
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change if field has been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    // Validate all fields
    const nameResult = validateName(formData.name);
    if (!nameResult.isValid) {
      newErrors.name = nameResult.error || "";
      isValid = false;
    }
    
    const emailResult = validateEmail(formData.email);
    if (!emailResult.isValid) {
      newErrors.email = emailResult.error || "";
      isValid = false;
    }
    
    if (formData.phone) {
      const phoneResult = validatePhone(formData.phone);
      if (!phoneResult.isValid) {
        newErrors.phone = phoneResult.error || "";
        isValid = false;
      }
    }
    
    const messageResult = validateMessage(formData.message);
    if (!messageResult.isValid) {
      newErrors.message = messageResult.error || "";
      isValid = false;
    }
    
    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
    });
    
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      setSubmitStatus("error");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
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
      setErrors({});
      setTouched({});
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const contactMethods = [
    {
      icon: Phone,
      title: "Telefon",
      value: "+355 69 123 4567",
      description: "Na thirrni çdo ditë nga ora 09:00 - 18:00",
      action: () => window.open(formatPhoneLink("+355 69 123 4567"), '_self'),
      color: "bg-gray-50 border-gray-200"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+355 69 123 4567",
      description: "Mesazh i shpejtë 24/7",
      action: () => window.open(formatWhatsAppLink("+355691234567", "Përshëndetje, dëshiroj të kontaktoj AutoSallon Tafa"), '_blank'),
      color: "bg-gray-50 border-gray-200"
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@autosallontafa.al",
      description: "Përgjigjemi brenda 24 orësh",
      action: () => window.open("mailto:info@autosallontafa.al", '_self'),
      color: "bg-gray-50 border-gray-200"
    },
    {
      icon: MapPin,
      title: "Lokacioni",
      value: "Rruga Durrësit, Tiranë",
      description: "Pranë Qendrës Tregtare Tirana East Gate",
      action: () => window.open("https://maps.google.com/?q=Rruga+Durrësit,Tiranë", '_blank'),
      color: "bg-gray-50 border-gray-200"
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
                <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulari i kontaktit">
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
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black focus:outline-none ${
                        touched.name && errors.name
                          ? "border-gray-400 bg-gray-50"
                          : "border-gray-300"
                      }`}
                      placeholder="Shkruani emrin tuaj të plotë"
                      aria-required="true"
                      aria-invalid={touched.name && !!errors.name}
                      aria-describedby={touched.name && errors.name ? "name-error" : "name-description"}
                    />
                    {touched.name && errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-gray-600" role="alert">
                        {errors.name}
                      </p>
                    )}
                    <span id="name-description" className="sr-only">Shkruani emrin tuaj të plotë</span>
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
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black focus:outline-none ${
                        touched.email && errors.email
                          ? "border-gray-400 bg-gray-50"
                          : "border-gray-300"
                      }`}
                      placeholder="emri@email.com"
                      aria-required="true"
                      aria-invalid={touched.email && !!errors.email}
                      aria-describedby={touched.email && errors.email ? "email-error" : "email-description"}
                    />
                    {touched.email && errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-gray-600" role="alert">
                        {errors.email}
                      </p>
                    )}
                    <span id="email-description" className="sr-only">Shkruani adresën tuaj të emailit</span>
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
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black focus:outline-none ${
                        touched.phone && errors.phone
                          ? "border-gray-400 bg-gray-50"
                          : "border-gray-300"
                      }`}
                      placeholder="+355 69 123 456"
                      aria-invalid={touched.phone && !!errors.phone}
                      aria-describedby={touched.phone && errors.phone ? "phone-error" : "phone-description"}
                    />
                    {touched.phone && errors.phone && (
                      <p id="phone-error" className="mt-1 text-sm text-gray-600" role="alert">
                        {errors.phone}
                      </p>
                    )}
                    <span id="phone-description" className="sr-only">Shkruani numrin tuaj të telefonit (opsionale)</span>
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
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black focus:outline-none resize-none ${
                        touched.message && errors.message
                          ? "border-gray-400 bg-gray-50"
                          : "border-gray-300"
                      }`}
                      placeholder="Shkruani mesazhin tuaj këtu..."
                      aria-required="true"
                      aria-invalid={touched.message && !!errors.message}
                      aria-describedby={touched.message && errors.message ? "message-error" : "message-description"}
                    />
                    {touched.message && errors.message && (
                      <p id="message-error" className="mt-1 text-sm text-gray-600" role="alert">
                        {errors.message}
                      </p>
                    )}
                    <span id="message-description" className="sr-only">Shkruani mesazhin tuaj</span>
                  </div>
                  
                  {/* Submit Status */}
                  {submitStatus === "success" && (
                    <div 
                      className="p-4 bg-gray-100 border border-gray-300 rounded-lg"
                      role="alert"
                      aria-live="polite"
                    >
                      <p className="text-black text-sm font-medium">
                        Mesazhi u dërgua me sukses! Do t'ju kontaktojmë së shpejti.
                      </p>
                    </div>
                  )}
                  
                  {submitStatus === "error" && (
                    <div 
                      className="p-4 bg-gray-100 border border-gray-400 rounded-lg"
                      role="alert"
                      aria-live="assertive"
                    >
                      <p className="text-black text-sm font-medium">
                        {Object.keys(errors).length > 0
                          ? "Ju lutemi plotësoni të gjitha fushat në mënyrë korrekte."
                          : "Ndodhi një gabim gjatë dërgimit. Ju lutemi provoni përsëri ose na kontaktoni drejtpërdrejt."}
                      </p>
                    </div>
                  )}
                  
                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    disabled={isSubmitting}
                    aria-label={isSubmitting ? "Duke dërguar mesazhin" : "Dërgo mesazhin"}
                  >
                    {isSubmitting ? (
                      <>
                        <span aria-hidden="true">Duke dërguar...</span>
                        <span className="sr-only">Duke dërguar mesazhin</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" aria-hidden="true" />
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
                    className={`cursor-pointer transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 ${method.color}`}
                    onClick={method.action}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        method.action();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Kontakto me ${method.title}: ${method.value}`}
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
                    <span className="text-gray-500">E mbyllur</span>
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
