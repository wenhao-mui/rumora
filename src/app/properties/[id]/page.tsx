"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Property } from "@/types/property";
import { MediaGallery } from "@/components/property-detail/media-gallery";
import { PropertyFacts } from "@/components/property-detail/property-facts";
import { LocationMap } from "@/components/property-detail/location-map";
import { PricingInsights } from "@/components/property-detail/pricing-insights";
import { MortgageCalculator } from "@/components/property-detail/mortgage-calculator";
import { PropertyFAQs } from "@/components/property-detail/property-faqs";
import { AgentCard } from "@/components/property-detail/agent-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Phone, 
  MessageCircle, 
  Share2, 
  Heart, 
  MapPin, 
  Calendar,
  Home
} from "lucide-react";

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchProperty(params.id as string);
    }
  }, [params.id]);

  const fetchProperty = async (id: string) => {
    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch(`/api/properties/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProperty(data);
      } else {
        console.error('Failed to fetch property');
      }
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = (type: 'whatsapp' | 'call' | 'message') => {
    if (!property) return;
    
    switch (type) {
      case 'whatsapp':
        window.open(`https://wa.me/${property.agent.whatsapp}?text=Hi, I&apos;m interested in ${property.title}`, '_blank');
        break;
      case 'call':
        window.open(`tel:${property.agent.phone}`, '_blank');
        break;
      case 'message':
        window.open(`mailto:${property.agent.email}?subject=Inquiry about ${property.title}`, '_blank');
        break;
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement favorite functionality
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading property...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Property Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            The property you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                <MapPin className="h-4 w-4" />
                <span>{property.location.neighborhood}, {property.location.city}, {property.location.state}</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Listed {new Date(property.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  {property.propertyType}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFavorite}
                className={isFavorite ? "text-red-600 border-red-600" : ""}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Media Gallery */}
            <MediaGallery images={property.images} />

            {/* Property Facts */}
            <PropertyFacts property={property} />

            {/* About This Property */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  About This Property
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {property.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Location & Map */}
            <LocationMap 
              coordinates={property.location.coordinates}
              address={`${property.location.neighborhood}, ${property.location.city}, ${property.location.state}`}
            />

            {/* Pricing Insights */}
            <PricingInsights property={property} />

            {/* Mortgage Calculator */}
            <MortgageCalculator propertyPrice={property.price} />

            {/* FAQs */}
            <PropertyFAQs />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    RM {property.price.toLocaleString()}
                  </div>
                  <Badge variant={property.priceType === 'sale' ? 'default' : 'secondary'}>
                    {property.priceType === 'sale' ? 'For Sale' : 'For Rent'}
                  </Badge>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Price per sqft:</span>
                    <span className="font-medium">
                      RM {(property.price / property.size.sqft).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Built-up area:</span>
                    <span className="font-medium">
                      {property.size.sqft.toLocaleString()} sqft
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={() => handleContact('whatsapp')}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact via WhatsApp
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleContact('call')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Agent
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleContact('message')}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Agent Card */}
            <AgentCard agent={property.agent} />
          </div>
        </div>
      </div>
    </div>
  );
} 