"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <Card className="max-w-2xl w-full text-center">
        <CardContent className="p-12">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-black mb-4">404</h1>
            <h2 className="text-3xl font-bold text-black mb-4">
              Faqja nuk u gjet
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Faqja që po kërkoni nuk ekziston ose është zhvendosur. 
              Le të kthehemi te faqja kryesore.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-black hover:bg-gray-800 text-white">
              <Link href="/">
                <Home className="h-5 w-5 mr-2" />
                Kthehu te Ballina
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild>
              <Link href="/cars">
                <Search className="h-5 w-5 mr-2" />
                Shiko Veturat
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="ghost" 
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Kthehu Mbrapsht
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Nëse mendoni se kjo është një gabim, ju lutemi{" "}
              <Link href="/contact" className="text-black hover:underline font-medium">
                na kontaktoni
              </Link>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

