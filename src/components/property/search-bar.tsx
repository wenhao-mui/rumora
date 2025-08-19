"use client";

import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Home, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SearchBarProps {
  onSearch: (filters: any) => void;
  isEmbedded?: boolean;
}

export function SearchBar({ onSearch, isEmbedded = false }: SearchBarProps) {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("any");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [bedrooms, setBedrooms] = useState("any");
  const [bathrooms, setBathrooms] = useState("any");
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const propertyTypes = [
    "Condo", "Terrace", "Land", "Semi-D", "Bungalow", "Townhouse", "Apartment", "Studio"
  ];

  const bedroomOptions = ["any", "1", "2", "3", "4", "5+"];
  const bathroomOptions = ["any", "1", "2", "3", "4", "5+"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationChange = async (value: string) => {
    setLocation(value);
    if (value.length > 2) {
      try {
        const response = await fetch(`/api/locations/suggestions?q=${encodeURIComponent(value)}`);
        const data = await response.json();
        setSuggestions(data.suggestions || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setLocation(suggestion.name);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    const filters = {
      location,
      propertyType: propertyType === "any" ? "" : propertyType,
      priceRange,
      bedrooms: bedrooms === "any" ? "" : bedrooms,
      bathrooms: bathrooms === "any" ? "" : bathrooms,
    };
    onSearch(filters);
  };

  const clearFilters = () => {
    setLocation("");
    setPropertyType("any");
    setPriceRange([0, 5000000]);
    setBedrooms("any");
    setBathrooms("any");
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `RM ${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `RM ${(price / 1000).toFixed(0)}K`;
    }
    return `RM ${price}`;
  };

  if (isEmbedded) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Location Input */}
            <div className="flex-1 relative">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter location..."
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="pl-10"
                />
              </div>
              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {suggestion.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {suggestion.type}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Property Type */}
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Type</SelectItem>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Search Button */}
            <Button onClick={handleSearch} className="w-full sm:w-auto">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Main Search Row */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Location Input */}
            <div className="flex-1 relative">
              <Label htmlFor="location" className="text-sm font-medium mb-2 block">
                Location
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter location, project, or neighborhood..."
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="pl-10"
                />
              </div>
              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {suggestion.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {suggestion.type}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Property Type */}
            <div className="w-full lg:w-48">
              <Label htmlFor="propertyType" className="text-sm font-medium mb-2 block">
                Property Type
              </Label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Type</SelectItem>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button onClick={handleSearch} className="w-full lg:w-auto">
                <Search className="h-4 w-4 mr-2" />
                Search Properties
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-sm"
              >
                <Filter className="h-4 w-4" />
                <span>{showFilters ? 'Hide' : 'Show'} Advanced Filters</span>
              </Button>
              
              {(location || propertyType !== "any" || bedrooms !== "any" || bathrooms !== "any" || priceRange[1] !== 5000000) && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="text-sm"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                {/* Bedrooms */}
                <div>
                  <Label htmlFor="bedrooms" className="text-sm font-medium mb-2 block">
                    Bedrooms
                  </Label>
                  <Select value={bedrooms} onValueChange={setBedrooms}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      {bedroomOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option === "any" ? "Any" : option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Bathrooms */}
                <div>
                  <Label htmlFor="bathrooms" className="text-sm font-medium mb-2 block">
                    Bathrooms
                  </Label>
                  <Select value={bathrooms} onValueChange={setBathrooms}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      {bathroomOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option === "any" ? "Any" : option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Price Range
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="text-sm"
                      />
                      <span className="text-gray-500">to</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000000])}
                        className="text-sm"
                      />
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Active Filters Display */}
          {(location || propertyType !== "any" || bedrooms !== "any" || bathrooms !== "any" || priceRange[1] !== 5000000) && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Filters:</span>
                {location && (
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{location}</span>
                    <button
                      onClick={() => setLocation("")}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {propertyType !== "any" && (
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Home className="h-3 w-3" />
                    <span>{propertyType}</span>
                    <button
                      onClick={() => setPropertyType("any")}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {bedrooms !== "any" && (
                  <Badge variant="secondary">
                    {bedrooms} Bedroom{bedrooms !== "1" ? "s" : ""}
                    <button
                      onClick={() => setBedrooms("any")}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {bathrooms !== "any" && (
                  <Badge variant="secondary">
                    {bathrooms} Bathroom{bathrooms !== "1" ? "s" : ""}
                    <button
                      onClick={() => setBathrooms("any")}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {priceRange[1] !== 5000000 && (
                  <Badge variant="secondary">
                    Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    <button
                      onClick={() => setPriceRange([0, 5000000])}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 