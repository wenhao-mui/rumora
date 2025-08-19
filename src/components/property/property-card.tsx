"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Bed, 
  Bath, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Heart,
  Ruler,
  Star
} from "lucide-react";
import { Property, PropertyFeature } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  onContact?: (type: 'whatsapp' | 'call' | 'message') => void;
}

const FEATURE_LABELS: Record<PropertyFeature, string> = {
  'newly-renovated': 'Newly Renovated',
  'freehold': 'Freehold',
  'high-floor': 'High Floor',
  'corner-unit': 'Corner Unit',
  'garden-view': 'Garden View',
  'city-view': 'City View',
  'furnished': 'Furnished',
  'pet-friendly': 'Pet Friendly',
  'gym': 'Gym',
  'pool': 'Pool',
  'security': 'Security',
  'parking': 'Parking'
};

const FEATURE_COLORS: Record<PropertyFeature, string> = {
  'newly-renovated': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'freehold': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'high-floor': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'corner-unit': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'garden-view': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  'city-view': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  'furnished': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  'pet-friendly': 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  'gym': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  'pool': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  'security': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  'parking': 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200'
};

export function PropertyCard({ property, onContact }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleContact = (type: 'whatsapp' | 'call' | 'message') => {
    if (onContact) {
      onContact(type);
    } else {
      // Default contact handling
      switch (type) {
        case 'whatsapp':
          window.open(`https://wa.me/${property.agent.whatsapp}?text=Hi, I'm interested in ${property.title}`, '_blank');
          break;
        case 'call':
          window.open(`tel:${property.agent.phone}`, '_blank');
          break;
        case 'message':
          window.open(`mailto:${property.agent.email}?subject=Inquiry about ${property.title}`, '_blank');
          break;
      }
    }
  };

  const isNewProperty = () => {
    const createdAt = new Date(property.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdAt.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-md">
      {/* Image Carousel */}
      <div className="relative group">
        <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={property.images[currentImageIndex]}
            alt={`${property.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Navigation Arrows - Hidden on mobile, visible on hover */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 md:block hidden"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 md:block hidden"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Mobile Swipe Indicators */}
        {property.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  index === currentImageIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {/* Price Badge */}
          <Badge className="bg-primary text-primary-foreground font-bold text-sm px-3 py-1.5 shadow-lg">
            {property.priceType === 'rent' ? 'RM' : ''}{formatPrice(property.price)}
            {property.priceType === 'rent' && '/month'}
          </Badge>
          
          {/* New Property Badge */}
          {isNewProperty() && (
            <Badge className="bg-green-500 text-white font-medium text-xs px-2 py-1 shadow-lg">
              <Star className="h-3 w-3 mr-1" />
              New
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 bg-white/95 hover:bg-white p-2.5 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          <Heart 
            className={`h-5 w-5 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`} 
          />
        </button>

        {/* Image Counter */}
        {property.images.length > 1 && (
          <div className="absolute top-3 right-16 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            {currentImageIndex + 1}/{property.images.length}
          </div>
        )}
      </div>

      {/* Property Information */}
      <CardHeader className="pb-3 px-4 pt-4">
        <div className="space-y-3">
          <h3 className="font-bold text-lg leading-tight line-clamp-2 hover:text-primary transition-colors cursor-pointer group-hover:text-primary">
            {property.title}
          </h3>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
            <span className="line-clamp-1">{property.location.neighborhood}, {property.location.city}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4 text-primary" />
              <span className="font-medium">{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-primary" />
              <span className="font-medium">{property.bathrooms} bath</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Ruler className="h-4 w-4 text-primary" />
              <span className="font-medium">{property.size.sqft.toLocaleString()} sqft</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-4 pb-4">
        {/* Feature Tags */}
        {property.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {property.features.slice(0, 3).map((feature) => (
              <Badge
                key={feature}
                variant="secondary"
                className={`text-xs font-medium px-2 py-1 ${FEATURE_COLORS[feature]}`}
              >
                {FEATURE_LABELS[feature]}
              </Badge>
            ))}
            {property.features.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{property.features.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Agent Contact Section */}
        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={property.agent.avatar}
              alt={property.agent.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                {property.agent.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Property Agent</div>
            </div>
          </div>

          {/* Contact Buttons - Mobile Optimized */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleContact('whatsapp')}
              className="text-xs h-9 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all duration-200"
            >
              <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
              <span className="hidden sm:inline">WhatsApp</span>
              <span className="sm:hidden">WA</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleContact('call')}
              className="text-xs h-9 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
            >
              <Phone className="h-3.5 w-3.5 mr-1.5" />
              <span className="hidden sm:inline">Call</span>
              <span className="sm:hidden">Call</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleContact('message')}
              className="text-xs h-9 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all duration-200"
            >
              <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
              <span className="hidden sm:inline">Message</span>
              <span className="sm:hidden">Msg</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 