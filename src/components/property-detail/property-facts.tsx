"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  DollarSign, 
  Ruler, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Home,
  Sparkles
} from "lucide-react";
import { Property } from "@/types/property";

interface PropertyFactsProps {
  property: Property;
}

export function PropertyFacts({ property }: PropertyFactsProps) {
  // Calculate property age
  const completionYear = new Date().getFullYear() - Math.floor(Math.random() * 20) - 2000;
  const propertyAge = new Date().getFullYear() - completionYear;

  // Determine unique features to highlight
  const uniqueFeatures = [];
  if (property.features.includes('newly-renovated')) uniqueFeatures.push('Newly Renovated');
  if (property.features.includes('freehold')) uniqueFeatures.push('Freehold');
  if (property.features.includes('corner-unit')) uniqueFeatures.push('Corner Unit');
  if (property.features.includes('high-floor')) uniqueFeatures.push('High Floor');
  if (property.features.includes('garden-view')) uniqueFeatures.push('Garden View');
  if (property.features.includes('city-view')) uniqueFeatures.push('City View');

  // Mock data for demonstration
  const furnishing = property.features.includes('furnished') ? 'Fully Furnished' : 'Unfurnished';
  const tenure = property.features.includes('freehold') ? 'Freehold' : 'Leasehold';
  const parkingSpaces = Math.floor(Math.random() * 3) + 1;

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Property Facts & Key Details
        </h2>

        {/* Unique Features Highlight */}
        {uniqueFeatures.length > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                Unique Features
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {uniqueFeatures.map((feature, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Main Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Price Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              <DollarSign className="h-4 w-4" />
              Price
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              RM {property.price.toLocaleString()}
            </div>
            <Badge variant={property.priceType === 'sale' ? 'default' : 'secondary'}>
              {property.priceType === 'sale' ? 'For Sale' : 'For Rent'}
            </Badge>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              RM {(property.price / property.size.sqft).toFixed(2)} per sqft
            </div>
          </div>

          {/* Area Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              <Ruler className="h-4 w-4" />
              Built-up Area
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {property.size.sqft.toLocaleString()} sqft
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {property.size.sqm.toLocaleString()} sqm
            </div>
            {property.propertyType === 'land' && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Land area: {(property.size.sqft * 1.5).toLocaleString()} sqft
              </div>
            )}
          </div>

          {/* Location Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4" />
              Location
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {property.location.neighborhood}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {property.location.city}, {property.location.state}
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Detailed Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Bedrooms */}
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex justify-center mb-2">
              <Bed className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {property.bedrooms}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Bedrooms
            </div>
          </div>

          {/* Bathrooms */}
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex justify-center mb-2">
              <Bath className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {property.bathrooms}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Bathrooms
            </div>
          </div>

          {/* Parking */}
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex justify-center mb-2">
              <Car className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {parkingSpaces}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Parking Spaces
            </div>
          </div>

          {/* Property Type */}
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex justify-center mb-2">
              <Home className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
              {property.propertyType}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Property Type
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Furnishing */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Furnishing
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {furnishing}
            </div>
          </div>

          {/* Tenure */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Tenure
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {tenure}
            </div>
          </div>

          {/* Completion Year */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Completion Year
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {completionYear}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {propertyAge} years old
            </div>
          </div>
        </div>

        {/* Property Status */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                property.status === 'active' ? 'bg-green-500' : 
                property.status === 'sold' ? 'bg-red-500' : 'bg-yellow-500'
              }`} />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Status
              </span>
            </div>
            <Badge variant={
              property.status === 'active' ? 'default' : 
              property.status === 'sold' ? 'destructive' : 'secondary'
            }>
              {property.status === 'active' ? 'Available' : 
               property.status === 'sold' ? 'Sold' : 'Rented'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 