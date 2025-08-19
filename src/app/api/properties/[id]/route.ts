import { NextRequest, NextResponse } from 'next/server';
import { Property } from '@/types/property';

// Mock data for demonstration - replace with actual database queries
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Condo with City View in Taman Melawati',
    description: 'This stunning 3-bedroom condo offers breathtaking city views and modern luxury living. Located in the prestigious Taman Melawati area, this property features high-quality finishes, spacious rooms, and access to premium amenities including a rooftop garden, fitness center, and swimming pool. Perfect for families or professionals seeking a sophisticated urban lifestyle.',
    price: 850000,
    priceType: 'sale',
    location: {
      neighborhood: 'Taman Melawati',
      city: 'Kuala Lumpur',
      state: 'Selangor',
      coordinates: {
        lat: 3.1390,
        lng: 101.6869
      }
    },
    propertyType: 'condo',
    size: {
      sqft: 1200,
      sqm: 111.5
    },
    bedrooms: 3,
    bathrooms: 2,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-60396e136e51?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-60396e136e52?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-60396e136e53?w=800&h=600&fit=crop'
    ],
    features: [
      'newly-renovated',
      'freehold',
      'high-floor',
      'city-view',
      'furnished',
      'gym',
      'pool',
      'security',
      'parking'
    ],
    agent: {
      id: 'agent123',
      name: 'Sarah Lim',
      phone: '+60123456789',
      whatsapp: '+60123456789',
      email: 'sarah.lim@rumora.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    status: 'active',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'Modern Terrace House in Wangsa Maju',
    description: 'A beautifully designed 4-bedroom terrace house with contemporary architecture and spacious living areas. This property features an open-concept kitchen, private garden, and modern amenities. Located in a family-friendly neighborhood with excellent access to schools, shopping centers, and public transportation.',
    price: 1200000,
    priceType: 'sale',
    location: {
      neighborhood: 'Wangsa Maju',
      city: 'Kuala Lumpur',
      state: 'Selangor',
      coordinates: {
        lat: 3.1420,
        lng: 101.6880
      }
    },
    propertyType: 'terrace',
    size: {
      sqft: 1800,
      sqm: 167.2
    },
    bedrooms: 4,
    bathrooms: 3,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc8?w=800&h=600&fit=crop'
    ],
    features: [
      'newly-renovated',
      'freehold',
      'garden-view',
      'parking',
      'security'
    ],
    agent: {
      id: 'agent456',
      name: 'Ahmad Rahman',
      phone: '+60123456790',
      whatsapp: '+60123456790',
      email: 'ahmad.rahman@rumora.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    status: 'active',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Find the property by ID
    const property = mockProperties.find(p => p.id === id);

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 