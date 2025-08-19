"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  MapPin, 
  Users, 
  Star, 
  Award, 
  Filter,
  X
} from "lucide-react";
import Link from "next/link";

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
}

const mockAgents: Agent[] = [
  {
    id: "agent1",
    name: "Sarah Lim",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
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
    bio: "Experienced property agent specializing in residential properties across Kuala Lumpur and Selangor. Committed to finding the perfect home for every client.",
    languages: ["English", "Mandarin", "Malay"],
    certifications: ["Certified Real Estate Agent", "Property Management Specialist"],
    isVerified: true,
    isTopPerformer: true
  },
  {
    id: "agent2",
    name: "Ahmad Rahman",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    company: "XYZ Properties",
    licenseNumber: "REA789012",
    experience: "3-5 years",
    specialization: ["commercial", "office", "retail"],
    areas: [
      {
        state: "Kuala Lumpur",
        cities: ["KLCC", "Bangsar", "Damansara"]
      }
    ],
    stats: {
      totalProperties: 23,
      successRented: 15,
      successSold: 8,
      totalViews: 892,
      responseRate: "95%",
      avgResponseTime: "3.1 hours",
      rating: 4.6,
      totalReviews: 89
    },
    bio: "Commercial property specialist with expertise in office and retail spaces. Helping businesses find their ideal commercial locations.",
    languages: ["English", "Malay", "Arabic"],
    certifications: ["Commercial Property Specialist"],
    isVerified: true,
    isTopPerformer: false
  },
  {
    id: "agent3",
    name: "Priya Patel",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    company: "Premium Realty",
    licenseNumber: "REA345678",
    experience: "10+ years",
    specialization: ["luxury", "bungalow", "landed"],
    areas: [
      {
        state: "Selangor",
        cities: ["Damansara Heights", "Taman Tun Dr Ismail", "Bangsar"]
      },
      {
        state: "Penang",
        cities: ["Batu Ferringhi", "Gurney Drive", "Tanjung Bungah"]
      }
    ],
    stats: {
      totalProperties: 67,
      successRented: 12,
      successSold: 55,
      totalViews: 2156,
      responseRate: "99%",
      avgResponseTime: "1.8 hours",
      rating: 4.9,
      totalReviews: 234
    },
    bio: "Luxury property specialist with over a decade of experience in high-end residential and landed properties. Dedicated to exceptional service.",
    languages: ["English", "Hindi", "Malay"],
    certifications: ["Luxury Property Specialist", "International Property Consultant"],
    isVerified: true,
    isTopPerformer: true
  },
  {
    id: "agent4",
    name: "David Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    company: "Metro Properties",
    licenseNumber: "REA901234",
    experience: "1-3 years",
    specialization: ["residential", "apartment", "studio"],
    areas: [
      {
        state: "Kuala Lumpur",
        cities: ["Cheras", "Setapak", "Wangsa Maju"]
      }
    ],
    stats: {
      totalProperties: 18,
      successRented: 14,
      successSold: 4,
      totalViews: 456,
      responseRate: "92%",
      avgResponseTime: "4.2 hours",
      rating: 4.3,
      totalReviews: 45
    },
    bio: "Young and energetic agent specializing in affordable residential properties. Committed to helping first-time buyers and renters.",
    languages: ["English", "Mandarin", "Cantonese"],
    certifications: ["New Agent Certification"],
    isVerified: true,
    isTopPerformer: false
  }
];

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique states and specializations for filters
  const states = ["all", ...Array.from(new Set(mockAgents.flatMap(agent => agent.areas.map(area => area.state))))];
  const specializations = ["all", ...Array.from(new Set(mockAgents.flatMap(agent => agent.specialization)))];

  // Filter agents based on search and filters
  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.areas.some(area => 
                           area.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           area.cities.some(city => city.toLowerCase().includes(searchTerm.toLowerCase()))
                         );
    
    const matchesState = selectedState === "all" || 
                        agent.areas.some(area => area.state === selectedState);
    
    const matchesSpecialization = selectedSpecialization === "all" || 
                                 agent.specialization.includes(selectedSpecialization);

    return matchesSearch && matchesState && matchesSpecialization;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedState("all");
    setSelectedSpecialization("all");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                          <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Our Property Agents
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
                    Connect with experienced and verified property agents who specialize in your preferred areas and property types
                  </p>
                  
                  {/* Overall Stats */}
                  <div className="flex flex-wrap justify-center gap-8 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {mockAgents.length}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Verified Agents
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {Math.round(mockAgents.reduce((sum, agent) => sum + agent.stats.rating, 0) / mockAgents.length * 10) / 10}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Average Rating
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {mockAgents.reduce((sum, agent) => sum + agent.stats.totalReviews, 0)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Total Reviews
                      </div>
                    </div>
                  </div>
                </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search agents, companies, or areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col lg:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    State
                  </label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state === "all" ? "All States" : state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Specialization
                  </label>
                  <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec === "all" ? "All Specializations" : spec.charAt(0).toUpperCase() + spec.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {agent.isVerified && (
                      <div className="absolute -top-1 -right-1 bg-blue-500 text-white p-1 rounded-full">
                        <Award className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
                        {agent.name}
                      </h3>
                      {agent.isTopPerformer && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                          <Star className="h-3 w-3 mr-1" />
                          Top Performer
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {agent.company}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>{agent.experience} experience</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{agent.stats.rating}</span>
                        <span>({agent.stats.totalReviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Specializations */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Specializations
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {agent.specialization.map((spec) => (
                      <Badge key={spec} variant="outline" className="text-xs">
                        {spec.charAt(0).toUpperCase() + spec.slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Areas */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Areas of Expertise
                  </h4>
                  <div className="space-y-2">
                    {agent.areas.map((area, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <MapPin className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium">{area.state}</span>
                          <span className="text-gray-500">: {area.cities.join(", ")}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {agent.stats.successRented + agent.stats.successSold}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Success Rate
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {agent.stats.responseRate}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Response Rate
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Link href={`/agents/${agent.id}`}>
                  <Button className="w-full">
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No agents found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 