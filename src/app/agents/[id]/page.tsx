"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { 
  MapPin, 
  Star, 
  Award, 
  TrendingUp, 
  Phone, 
  MessageCircle, 
  Mail, 
  Calendar,
  Users,
  Building,
  Home,
  Clock,
  Shield,
  CheckCircle,
  ArrowLeft,
  User
} from "lucide-react";
import Link from "next/link";
import { Property } from "@/types/property";
import { AgentReviews } from "@/components/agent-detail/agent-reviews";

interface Agent {
  id: string;
  name: string;
  avatar: string;
  company: string;
  licenseNumber: string;
  experience: string;
  specialization: string[];
  areas: {
    state: string;
    cities: string[];
  }[];
  stats: {
    totalProperties: number;
    successRented: number;
    successSold: number;
    totalViews: number;
    responseRate: string;
    avgResponseTime: string;
    rating: number;
    totalReviews: number;
  };
  bio: string;
  languages: string[];
  certifications: string[];
  isVerified: boolean;
  isTopPerformer: boolean;
  phone: string;
  whatsapp: string;
  email: string;
  joinDate: string;
}

// Mock agent data
const mockAgents: Agent[] = [
  {
    id: "agent1",
    name: "Sarah Lim",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    company: "ABC Real Estate",
    licenseNumber: "REA123456",
    experience: "5-10 years",
    specialization: ["residential", "condo", "terrace"],
    areas: [
      {
        state: "Selangor",
        cities: ["Petaling Jaya", "Subang Jaya", "Shah Alam"]
      },
      {
        state: "Kuala Lumpur",
        cities: ["Mont Kiara", "Bangsar", "Damansara Heights"]
      }
    ],
    stats: {
      totalProperties: 45,
      successRented: 28,
      successSold: 17,
      totalViews: 1247,
      responseRate: "98%",
      avgResponseTime: "2.3 hours",
      rating: 4.8,
      totalReviews: 156
    },
    bio: "Experienced property agent specializing in residential properties across Kuala Lumpur and Selangor. Committed to finding the perfect home for every client. With over 7 years of experience in the real estate industry, Sarah has helped hundreds of families find their dream homes and investors build profitable portfolios. She specializes in residential properties including condominiums, terrace houses, and landed properties. Sarah is known for her attention to detail, market knowledge, and dedication to client satisfaction. She stays updated with the latest market trends and property developments to provide the best advice to her clients.",
    languages: ["English", "Mandarin", "Malay"],
    certifications: ["Certified Real Estate Agent", "Property Management Specialist", "Negotiation Expert"],
    isVerified: true,
    isTopPerformer: true,
    phone: "+60123456789",
    whatsapp: "+60123456789",
    email: "sarah.lim@rumora.com",
    joinDate: "2019-03-15"
  }
];

// Mock properties for the agent
const mockAgentProperties: Property[] = [
  {
    id: "1",
    title: "Luxury Condo with City View in Taman Melawati",
    description: "This stunning 3-bedroom condo offers breathtaking city views and modern luxury living. Located in the prestigious Taman Melawati area, this property features high-quality finishes, spacious rooms, and access to premium amenities including a rooftop garden, fitness center, and swimming pool. Perfect for families or professionals seeking a sophisticated urban lifestyle.",
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
      'https://images.unsplash.com/photo-1560448204-60396e136e51?w=800&h=600&fit=crop'
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
      id: "agent1",
      name: "Sarah Lim",
      phone: "+60123456789",
      whatsapp: "+60123456789",
      email: "sarah.lim@rumora.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    status: 'active',
    createdAt: '2024-01-15T00:00Z',
    updatedAt: '2024-01-15T00:00Z'
  },
  {
    id: "2",
    title: "Modern Terrace House in Wangsa Maju",
    description: "A beautifully designed 4-bedroom terrace house with contemporary architecture and spacious living areas. This property features an open-concept kitchen, private garden, and modern amenities. Located in a family-friendly neighborhood with excellent access to schools, shopping centers, and public transportation.",
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
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
    ],
    features: [
      'newly-renovated',
      'freehold',
      'garden-view',
      'parking',
      'security'
    ],
    agent: {
      id: "agent1",
      name: "Sarah Lim",
      phone: "+60123456789",
      whatsapp: "+60123456789",
      email: "sarah.lim@rumora.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    status: 'active',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  }
];

export default function AgentDetailPage() {
  const params = useParams();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [agentProperties, setAgentProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      // Simulate API call
      setTimeout(() => {
        const foundAgent = mockAgents.find(a => a.id === params.id);
        if (foundAgent) {
          setAgent(foundAgent);
          setAgentProperties(mockAgentProperties);
        }
        setLoading(false);
      }, 500);
    }
  }, [params.id]);

  const handleContact = (type: 'whatsapp' | 'call' | 'message') => {
    if (!agent) return;

    switch (type) {
      case 'whatsapp':
        window.open(`https://wa.me/${agent.whatsapp}?text=Hi ${agent.name}, I&apos;m interested in your property listings`, '_blank');
        break;
      case 'call':
        window.open(`tel:${agent.phone}`, '_blank');
        break;
      case 'message':
        window.open(`mailto:${agent.email}?subject=Inquiry about your property listings`, '_blank');
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading agent profile...</p>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Agent Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            The agent you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/agents">
            <Button className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Agents
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/agents">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Agents
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-start gap-6">
              <div className="relative">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                {agent.isVerified && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-2 rounded-full">
                    <Award className="h-4 w-4" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {agent.name}
                  </h1>
                  {agent.isTopPerformer && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                      <Star className="h-3 w-3 mr-1" />
                      Top Performer
                    </Badge>
                  )}
                </div>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
                  {agent.company}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {new Date(agent.joinDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {agent.experience} experience
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    {agent.stats.rating} ({agent.stats.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                onClick={() => handleContact('whatsapp')}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={() => handleContact('call')}
              >
                <Phone className="h-4 w-4" />
                Call
              </Button>
              <Button
                variant="outline"
                onClick={() => handleContact('message')}
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  About {agent.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {agent.bio}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Specializations */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Specializations
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.specialization.map((spec) => (
                        <Badge key={spec} variant="secondary">
                          {spec.charAt(0).toUpperCase() + spec.slice(1)}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.languages.map((lang) => (
                        <Badge key={lang} variant="outline">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="md:col-span-2">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Certifications & Qualifications
                    </h4>
                    <div className="space-y-2">
                      {agent.certifications.map((cert) => (
                        <div key={cert} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Properties Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Properties by {agent.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {agentProperties.length > 0 ? (
                  <div className="space-y-4">
                    {agentProperties.map((property) => (
                      <div key={property.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                              {property.title}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {property.location.neighborhood}, {property.location.city}
                              </span>
                              <span className="flex items-center gap-1">
                                <Building className="h-4 w-4" />
                                {property.propertyType}
                              </span>
                              <span className="flex items-center gap-1">
                                <Home className="h-4 w-4" />
                                {property.bedrooms} bed, {property.bathrooms} bath
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-lg font-bold text-gray-900 dark:text-white">
                                RM {property.price.toLocaleString()}
                              </div>
                              <Link href={`/properties/${property.id}`}>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No properties listed yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      This agent hasn&apos;t listed any properties yet.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <AgentReviews
              agentId={agent.id}
              agentName={agent.name}
              currentRating={agent.stats.rating}
              totalReviews={agent.stats.totalReviews}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {agent.stats.totalProperties}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">
                      Total Properties
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {agent.stats.successRented + agent.stats.successSold}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">
                      Success Rate
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Successfully Rented:</span>
                    <span className="font-medium">{agent.stats.successRented}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Successfully Sold:</span>
                    <span className="font-medium">{agent.stats.successSold}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Total Views:</span>
                    <span className="font-medium">{agent.stats.totalViews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Response Rate:</span>
                    <span className="font-medium">{agent.stats.responseRate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Avg Response Time:</span>
                    <span className="font-medium">{agent.stats.avgResponseTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Areas of Expertise */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Areas of Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agent.areas.map((area, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {area.state}
                      </h4>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {area.cities.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>License: {agent.licenseNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-blue-500" />
                  <span>{agent.company}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-purple-500" />
                  <span>Joined {new Date(agent.joinDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 