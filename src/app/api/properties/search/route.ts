import { NextRequest, NextResponse } from "next/server";
import { SearchFilters, SearchResult, Property } from "@/types/property";

// Mock database - replace with actual database query
const mockProperties: Property[] = [
  {
    id: "1",
    title: "Luxury Condo for Sale in Mont Kiara",
    description: "Beautiful 3-bedroom condo with city view, modern amenities, and excellent location.",
    price: 2500000,
    priceType: "sale",
    location: {
      neighborhood: "Mont Kiara",
      city: "Kuala Lumpur",
      state: "Selangor",
      coordinates: { lat: 3.1390, lng: 101.6869 }
    },
    propertyType: "condo",
    size: { sqft: 1500, sqm: 139 },
    bedrooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-5c3f3c070953?w=800&h=600&fit=crop"
    ],
    features: ["newly-renovated", "freehold", "high-floor", "city-view", "gym", "pool"],
    agent: {
      id: "agent1",
      name: "Sarah Johnson",
      phone: "+60123456789",
      whatsapp: "+60123456789",
      email: "sarah.johnson@rumora.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "2",
    title: "Modern Terrace House in Bangsar",
    description: "Spacious 4-bedroom terrace house with garden, perfect for families.",
    price: 1800000,
    priceType: "sale",
    location: {
      neighborhood: "Bangsar",
      city: "Kuala Lumpur",
      state: "Selangor",
      coordinates: { lat: 3.1291, lng: 101.6841 }
    },
    propertyType: "terrace",
    size: { sqft: 2200, sqm: 204 },
    bedrooms: 4,
    bathrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
    ],
    features: ["garden-view", "freehold", "furnished", "parking"],
    agent: {
      id: "agent2",
      name: "Michael Chen",
      phone: "+60123456788",
      whatsapp: "+60123456788",
      email: "michael.chen@rumora.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    status: "active",
    createdAt: "2024-01-14T14:30:00Z",
    updatedAt: "2024-01-14T14:30:00Z"
  },
  {
    id: "3",
    title: "Studio Apartment for Rent in KLCC",
    description: "Cozy studio apartment in the heart of KLCC, perfect for professionals.",
    price: 3500,
    priceType: "rent",
    location: {
      neighborhood: "KLCC",
      city: "Kuala Lumpur",
      state: "Selangor",
      coordinates: { lat: 3.1579, lng: 101.7116 }
    },
    propertyType: "studio",
    size: { sqft: 600, sqm: 56 },
    bedrooms: 0,
    bathrooms: 1,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
    ],
    features: ["city-view", "furnished", "gym", "pool", "security"],
    agent: {
      id: "agent3",
      name: "Lisa Wong",
      phone: "+60123456787",
      whatsapp: "+60123456787",
      email: "lisa.wong@rumora.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    status: "active",
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z"
  },
  {
    id: "4",
    title: "Luxury Penthouse in Bukit Bintang",
    description: "Exclusive penthouse with panoramic city views and premium finishes.",
    price: 8500000,
    priceType: "sale",
    location: {
      neighborhood: "Bukit Bintang",
      city: "Kuala Lumpur",
      state: "Selangor",
      coordinates: { lat: 3.1429, lng: 101.7068 }
    },
    propertyType: "penthouse",
    size: { sqft: 3200, sqm: 297 },
    bedrooms: 4,
    bathrooms: 4,
    images: [
      "https://images.unsplash.com/photo-1600596545925-75ec6e5f7b8a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
    ],
    features: ["high-floor", "city-view", "furnished", "gym", "pool", "security", "parking"],
    agent: {
      id: "agent4",
      name: "David Tan",
      phone: "+60123456786",
      whatsapp: "+60123456786",
      email: "david.tan@rumora.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    status: "active",
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z"
  },
  {
    id: "5",
    title: "Family Bungalow in Damansara Heights",
    description: "Spacious 5-bedroom bungalow with garden and pool, perfect for large families.",
    price: 4200000,
    priceType: "sale",
    location: {
      neighborhood: "Damansara Heights",
      city: "Kuala Lumpur",
      state: "Selangor",
      coordinates: { lat: 3.1333, lng: 101.6333 }
    },
    propertyType: "bungalow",
    size: { sqft: 4500, sqm: 418 },
    bedrooms: 5,
    bathrooms: 5,
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
    ],
    features: ["garden-view", "freehold", "pool", "parking", "security"],
    agent: {
      id: "agent5",
      name: "Emma Lim",
      phone: "+60123456785",
      whatsapp: "+60123456785",
      email: "emma.lim@rumora.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    status: "active",
    createdAt: "2024-01-11T11:20:00Z",
    updatedAt: "2024-01-11T11:20:00Z"
  },
  {
    id: "6",
    title: "Modern Apartment for Rent in Mid Valley",
    description: "Contemporary 2-bedroom apartment with modern amenities and convenient location.",
    price: 2800,
    priceType: "rent",
    location: {
      neighborhood: "Mid Valley",
      city: "Kuala Lumpur",
      state: "Selangor",
      coordinates: { lat: 3.1179, lng: 101.6765 }
    },
    propertyType: "apartment",
    size: { sqft: 950, sqm: 88 },
    bedrooms: 2,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
    ],
    features: ["furnished", "gym", "pool", "security", "parking"],
    agent: {
      id: "agent6",
      name: "James Lee",
      phone: "+60123456784",
      whatsapp: "+60123456784",
      email: "james.lee@rumora.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    status: "active",
    createdAt: "2024-01-10T14:10:00Z",
    updatedAt: "2024-01-10T14:10:00Z"
  },
  {
    id: "7",
    title: "Investment Land in Cyberjaya",
    description: "Prime development land with excellent potential for commercial or residential projects.",
    price: 1500000,
    priceType: "sale",
    location: {
      neighborhood: "Cyberjaya",
      city: "Cyberjaya",
      state: "Selangor",
      coordinates: { lat: 2.9300, lng: 101.6800 }
    },
    propertyType: "land",
    size: { sqft: 10000, sqm: 929 },
    bedrooms: 0,
    bathrooms: 0,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"
    ],
    features: ["freehold"],
    agent: {
      id: "agent7",
      name: "Rachel Ng",
      phone: "+60123456783",
      whatsapp: "+60123456783",
      email: "rachel.ng@rumora.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    status: "active",
    createdAt: "2024-01-09T09:30:00Z",
    updatedAt: "2024-01-09T09:30:00Z"
  },
  {
    id: "8",
    title: "Townhouse in Sri Hartamas",
    description: "Beautiful 3-bedroom townhouse with modern design and community amenities.",
    price: 1200000,
    priceType: "sale",
    location: {
      neighborhood: "Sri Hartamas",
      city: "Kuala Lumpur",
      state: "Selangor",
      coordinates: { lat: 3.1500, lng: 101.6500 }
    },
    propertyType: "townhouse",
    size: { sqft: 1800, sqm: 167 },
    bedrooms: 3,
    bathrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
    ],
    features: ["garden-view", "freehold", "parking", "security"],
    agent: {
      id: "agent8",
      name: "Alex Wong",
      phone: "+60123456782",
      whatsapp: "+60123456782",
      email: "alex.wong@rumora.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    status: "active",
    createdAt: "2024-01-08T13:45:00Z",
    updatedAt: "2024-01-08T13:45:00Z"
  }
];

export async function POST(request: NextRequest) {
  try {
    const body: SearchFilters = await request.json();
    
    // Validate required fields
    if (!body.location && !body.propertyType && !body.bedrooms && !body.bathrooms) {
      return NextResponse.json(
        { error: "At least one search criteria is required" },
        { status: 400 }
      );
    }

    // Apply filters
    const filteredProperties = mockProperties.filter(property => {
      // Location filter (fuzzy search)
      if (body.location && !property.location.neighborhood.toLowerCase().includes(body.location.toLowerCase()) &&
          !property.location.city.toLowerCase().includes(body.location.toLowerCase())) {
        return false;
      }

      // Property type filter
      if (body.propertyType && property.propertyType !== body.propertyType) {
        return false;
      }

      // Bedrooms filter
      if (body.bedrooms && property.bedrooms < body.bedrooms) {
        return false;
      }

      // Bathrooms filter
      if (body.bathrooms && property.bathrooms < body.bathrooms) {
        return false;
      }

      // Price range filter
      if (body.priceRange && (property.price < body.priceRange.min || property.price > body.priceRange.max)) {
        return false;
      }

      // Features filter
      if (body.features && body.features.length > 0) {
        const hasAllFeatures = body.features.every(feature => property.features.includes(feature));
        if (!hasAllFeatures) {
          return false;
        }
      }

      return true;
    });

    // Sort by relevance (you can implement more sophisticated ranking here)
    filteredProperties.sort((a, b) => {
      // Prioritize exact location matches
      const aLocationMatch = body.location ? 
        (a.location.neighborhood.toLowerCase().includes(body.location.toLowerCase()) ? 2 : 1) : 0;
      const bLocationMatch = body.location ? 
        (b.location.neighborhood.toLowerCase().includes(body.location.toLowerCase()) ? 2 : 1) : 0;
      
      if (aLocationMatch !== bLocationMatch) {
        return bLocationMatch - aLocationMatch;
      }

      // Then by date (newer first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const result: SearchResult = {
      properties: filteredProperties,
      total: filteredProperties.length,
      page: 1,
      limit: 20,
      hasMore: false
    };

    return NextResponse.json(result);
    
  } catch (error) {
    console.error("Property search error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Return all properties for browsing
    const result: SearchResult = {
      properties: mockProperties,
      total: mockProperties.length,
      page: 1,
      limit: 20,
      hasMore: false
    };

    return NextResponse.json(result);
    
  } catch (error) {
    console.error("Property fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 