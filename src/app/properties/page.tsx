"use client";

import { useState, useEffect } from "react";
import { SearchBar } from "@/components/property/search-bar";
import { PropertyCard } from "@/components/property/property-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchFilters, SearchResult, Property } from "@/types/property";
import { Search, Grid, List, ChevronDown, Loader2, Filter, MapPin } from "lucide-react";

export default function PropertiesPage() {
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<SearchFilters>({
    location: "",
    priceRange: { min: 0, max: 10000000 },
    features: []
  });

  // Load initial properties on page load
  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async (filters?: SearchFilters) => {
    setIsLoading(true);
    try {
      const url = filters ? '/api/properties/search' : '/api/properties/search';
      const method = filters ? 'POST' : 'GET';
      const body = filters ? JSON.stringify(filters) : undefined;
      
      const response = await fetch(url, {
        method,
        headers: filters ? { 'Content-Type': 'application/json' } : {},
        body
      });
      
      if (response.ok) {
        const result: SearchResult = await response.json();
        setSearchResults(result);
        setProperties(result.properties);
      } else {
        console.error('Failed to fetch properties');
        setProperties([]);
      }
    } catch (error) {
      console.error('Error loading properties:', error);
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (filters: SearchFilters) => {
    setCurrentFilters(filters);
    await loadProperties(filters);
  };

  const handleContact = (type: 'whatsapp' | 'call' | 'message', property: Property) => {
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
  };

  const clearFilters = () => {
    const defaultFilters: SearchFilters = {
      location: "",
      priceRange: { min: 0, max: 10000000 },
      features: []
    };
    setCurrentFilters(defaultFilters);
    loadProperties();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Find Your Perfect Property
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover amazing properties across Malaysia with our comprehensive search and advanced filtering options
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} initialFilters={currentFilters} />
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {searchResults ? `Found ${searchResults.total} Properties` : 'Browse Properties'}
            </h2>
            {currentFilters.location && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>in {currentFilters.location}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 px-3"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 px-3"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Filters Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="h-8 px-3"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            {/* Clear Filters */}
            {(currentFilters.location || currentFilters.propertyType || currentFilters.bedrooms || currentFilters.bathrooms) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 px-3 text-gray-600 dark:text-gray-400"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">Searching properties...</span>
          </div>
        )}

        {/* Results */}
        {!isLoading && (
          <>
            {properties.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                  />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No properties found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {searchResults ? 
                      "Try adjusting your search criteria or browse all properties." : 
                      "Loading properties..."
                    }
                  </p>
                  {searchResults && (
                    <Button onClick={clearFilters} variant="outline">
                      Browse All Properties
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Load More Button */}
            {searchResults?.hasMore && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Properties
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 