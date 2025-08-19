"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  School, 
  Train, 
  ShoppingCart, 
  Heart, 
  Building2,
  Navigation,
  ExternalLink
} from "lucide-react";

interface LocationMapProps {
  coordinates?: { lat: number; lng: number };
  address: string;
}

interface NearbyAmenity {
  id: string;
  name: string;
  type: 'school' | 'transport' | 'shopping' | 'healthcare' | 'all';
  distance: string;
  rating: number;
  category: string;
}

export function LocationMap({ coordinates, address }: LocationMapProps) {
  const [selectedAmenityType, setSelectedAmenityType] = useState<'all' | 'school' | 'transport' | 'shopping' | 'healthcare'>('all');

  // Mock data for nearby amenities
  const nearbyAmenities: NearbyAmenity[] = [
    // Schools
    { id: '1', name: 'SMK Taman Melawati', type: 'school', distance: '0.3 km', rating: 4.2, category: 'Secondary School' },
    { id: '2', name: 'SK Taman Melawati', type: 'school', distance: '0.5 km', rating: 4.5, category: 'Primary School' },
    { id: '3', name: 'International School of Kuala Lumpur', type: 'school', distance: '1.2 km', rating: 4.8, category: 'International School' },
    
    // Transport
    { id: '4', name: 'LRT Wangsa Maju Station', type: 'transport', distance: '0.8 km', rating: 4.0, category: 'LRT Station' },
    { id: '5', name: 'MRT Sri Rampai Station', type: 'transport', distance: '1.5 km', rating: 4.1, category: 'MRT Station' },
    { id: '6', name: 'Bus Stop Taman Melawati', type: 'transport', distance: '0.2 km', rating: 3.8, category: 'Bus Stop' },
    
    // Shopping
    { id: '7', name: 'AEON Mall Wangsa Maju', type: 'shopping', distance: '1.0 km', rating: 4.3, category: 'Shopping Mall' },
    { id: '8', name: 'Giant Hypermarket', type: 'shopping', distance: '0.7 km', rating: 4.0, category: 'Supermarket' },
    { id: '9', name: 'Tesco Extra', type: 'shopping', distance: '1.3 km', rating: 4.1, category: 'Hypermarket' },
    
    // Healthcare
    { id: '10', name: 'Hospital Kuala Lumpur', type: 'healthcare', distance: '2.1 km', rating: 4.6, category: 'General Hospital' },
    { id: '11', name: 'Klinik Kesihatan Taman Melawati', type: 'healthcare', distance: '0.4 km', rating: 4.0, category: 'Health Clinic' },
    { id: '12', name: 'Pharmacy Guardian', type: 'healthcare', distance: '0.6 km', rating: 4.2, category: 'Pharmacy' },
  ];

  const filteredAmenities = selectedAmenityType === 'all' 
    ? nearbyAmenities 
    : nearbyAmenities.filter(amenity => amenity.type === selectedAmenityType);

  const getAmenityIcon = (type: string) => {
    switch (type) {
      case 'school': return <School className="h-4 w-4" />;
      case 'transport': return <Train className="h-4 w-4" />;
      case 'shopping': return <ShoppingCart className="h-4 w-4" />;
      case 'healthcare': return <Heart className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getAmenityColor = (type: string) => {
    switch (type) {
      case 'school': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'transport': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'shopping': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'healthcare': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const openInGoogleMaps = () => {
    if (coordinates) {
      const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
      window.open(url, '_blank');
    } else {
      const url = `https://www.google.com/maps/search/${encodeURIComponent(address)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Location & Map
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Discover the neighborhood and nearby amenities
            </p>
          </div>
          
          <Button variant="outline" onClick={openInGoogleMaps}>
            <Navigation className="h-4 w-4 mr-2" />
            Open in Google Maps
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Map Placeholder */}
        <div className="mb-6">
          <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-2 border-dashed border-blue-300 dark:border-blue-700 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <p className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-1">
                Interactive Map
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {coordinates ? `Lat: ${coordinates.lat}, Lng: ${coordinates.lng}` : 'Location: ' + address}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                Map integration with Google Maps API
              </p>
            </div>
          </div>
        </div>

        {/* Nearby Amenities */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Nearby Amenities
          </h3>
          
          <Tabs value={selectedAmenityType} onValueChange={(value) => setSelectedAmenityType(value as any)}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="school">Education</TabsTrigger>
              <TabsTrigger value="transport">Transport</TabsTrigger>
              <TabsTrigger value="shopping">Shopping</TabsTrigger>
              <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedAmenityType} className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAmenities.map((amenity) => (
                  <div
                    key={amenity.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getAmenityColor(amenity.type)}`}>
                        {getAmenityIcon(amenity.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                          {amenity.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {amenity.category}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {amenity.distance}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-yellow-600">★</span>
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                {amenity.rating}
                              </span>
                            </div>
                          </div>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 px-2 text-xs"
                            onClick={() => {
                              const searchQuery = `${amenity.name} ${address}`;
                              const url = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
                              window.open(url, '_blank');
                            }}
                          >
                            <Navigation className="h-3 w-3 mr-1" />
                            Directions
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Location Details */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                Property Address
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {address}
              </p>
              {coordinates && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Coordinates: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 