"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Share2, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Bed, 
  Bath, 
  Ruler, 
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    description: string;
    price: number;
    priceType: "sale" | "rent";
    location: {
      neighborhood: string;
      city: string;
      state: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
    propertyType: string;
    size: {
      sqft: number;
      sqm: number;
    };
    bedrooms: number;
    bathrooms: number;
    images: string[];
    features: string[];
    agent: {
      id: string;
      name: string;
      phone: string;
      whatsapp: string;
      email: string;
      avatar: string;
    };
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `RM ${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `RM ${(price / 1000).toFixed(0)}K`;
    }
    return `RM ${price}`;
  };

  const formatSize = (size: { sqft: number; sqm: number }) => {
    return `${size.sqft.toLocaleString()} sqft`;
  };

  const isNewProperty = (id: string) => {
    // Simple logic: properties with ID > 5 are considered "new"
    return parseInt(id) > 5;
  };

  return (
    <Card className="w-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Carousel */}
      <div className="relative group">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
          {property.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentImageIndex 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-2 right-2 flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFavorite(!isFavorite)}
            className="bg-white/80 hover:bg-white text-gray-800 hover:text-red-500"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/80 hover:bg-white text-gray-800"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-2">
          {isNewProperty(property.id) && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white">
              New
            </Badge>
          )}
          {property.features?.slice(0, 2).map((feature, index) => (
            <Badge key={index} variant="secondary" className="bg-blue-500 hover:bg-blue-600 text-white">
              {feature}
            </Badge>
          ))}
        </div>
      </div>

      <CardHeader className="pb-3">
        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-2xl font-bold text-gray-900">
            {formatPrice(property.price)}
            {property.priceType === 'rent' && <span className="text-sm text-gray-500">/month</span>}
          </div>
          <Badge variant="outline" className="text-sm">
            {property.propertyType}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">{property.location.neighborhood}, {property.location.city}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Property Details */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Bed className="h-4 w-4 text-gray-500" />
            <div className="text-sm">
              <div className="font-medium text-gray-900">{property.bedrooms}</div>
              <div className="text-gray-500">Bedrooms</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Bath className="h-4 w-4 text-gray-500" />
            <div className="text-sm">
              <div className="font-medium text-gray-900">{property.bathrooms}</div>
              <div className="text-gray-500">Bathrooms</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Ruler className="h-4 w-4 text-gray-500" />
            <div className="text-sm">
              <div className="font-medium text-gray-900">{formatSize(property.size)}</div>
              <div className="text-gray-500">Size</div>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Agent Contact */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">
                  {property.agent.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-900">{property.agent.name}</div>
                <div className="text-sm text-gray-500">Property Agent</div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">4.8</span>
            </div>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="flex items-center justify-center space-x-2"
            onClick={() => window.open(`tel:${property.agent.phone}`)}
          >
            <Phone className="h-4 w-4" />
            <span>Call</span>
          </Button>
          <Button 
            className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700"
            onClick={() => window.open(`https://wa.me/${property.agent.whatsapp}`)}
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 