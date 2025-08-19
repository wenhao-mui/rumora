export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  priceType: 'sale' | 'rent';
  location: {
    neighborhood: string;
    city: string;
    state: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  propertyType: PropertyType;
  size: {
    sqft: number;
    sqm: number;
  };
  bedrooms: number;
  bathrooms: number;
  images: string[];
  features: PropertyFeature[];
  agent: {
    id: string;
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    avatar: string;
  };
  status: 'active' | 'sold' | 'rented';
  createdAt: string;
  updatedAt: string;
}

export type PropertyType = 
  | 'condo' 
  | 'terrace' 
  | 'land' 
  | 'apartment' 
  | 'bungalow' 
  | 'townhouse' 
  | 'penthouse' 
  | 'studio';

export type PropertyFeature = 
  | 'newly-renovated' 
  | 'freehold' 
  | 'high-floor' 
  | 'corner-unit' 
  | 'garden-view' 
  | 'city-view' 
  | 'furnished' 
  | 'pet-friendly' 
  | 'gym' 
  | 'pool' 
  | 'security' 
  | 'parking';

export interface SearchFilters {
  location: string;
  propertyType?: PropertyType;
  priceRange: {
    min: number;
    max: number;
  };
  bedrooms?: number;
  bathrooms?: number;
  features?: PropertyFeature[];
}

export interface SearchResult {
  properties: Property[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface LocationSuggestion {
  id: string;
  name: string;
  type: 'project' | 'neighborhood' | 'city';
  displayName: string;
} 