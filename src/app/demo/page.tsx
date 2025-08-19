"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Home, MapPin, DollarSign } from "lucide-react";
import Link from "next/link";

export default function DemoPage() {
  const demoProperties = [
    {
      id: '1',
      title: 'Luxury Condo with City View',
      location: 'Taman Melawati, Kuala Lumpur',
      price: 'RM 850,000',
      type: 'Condo'
    },
    {
      id: '2',
      title: 'Modern Terrace House',
      location: 'Wangsa Maju, Kuala Lumpur',
      price: 'RM 1,200,000',
      type: 'Terrace House'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Property Detail Page Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Test the comprehensive property detail page with all components
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {demoProperties.map((property) => (
            <Card key={property.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span className="text-sm">{property.price}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Home className="h-4 w-4 mr-2" />
                      <span className="text-sm">{property.type}</span>
                    </div>
                  </div>
                </div>
                
                <Link href={`/properties/${property.id}`}>
                  <Button className="w-full">
                    View Property Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="inline-block">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Navigation Links
              </h3>
              <div className="space-y-3">
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
                <Link href="/properties">
                  <Button variant="outline" className="w-full">
                    <MapPin className="mr-2 h-4 w-4" />
                    Browse All Properties
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>This demo showcases the comprehensive Property Detail Page (LDP) implementation</p>
          <p className="mt-2">Features: Media Gallery, Property Facts, Location Map, Pricing Insights, Mortgage Calculator, FAQs</p>
        </div>
      </div>
    </div>
  );
} 