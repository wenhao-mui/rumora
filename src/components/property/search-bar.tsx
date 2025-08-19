"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, MapPin, Home, DollarSign, Bed, Bath, X, ChevronDown } from "lucide-react";
import { PropertyType, SearchFilters, LocationSuggestion } from "@/types/property";

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters?: Partial<SearchFilters>;
  isEmbedded?: boolean;
}

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "condo", label: "Condo" },
  { value: "terrace", label: "Terrace" },
  { value: "land", label: "Land" },
  { value: "apartment", label: "Apartment" },
  { value: "bungalow", label: "Bungalow" },
  { value: "townhouse", label: "Townhouse" },
  { value: "penthouse", label: "Penthouse" },
  { value: "studio", label: "Studio" },
];

const BEDROOM_OPTIONS = [1, 2, 3, 4, 5, "5+"];
const BATHROOM_OPTIONS = [1, 2, 3, 4, "4+"];

export function SearchBar({ onSearch, initialFilters, isEmbedded = false }: SearchBarProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    location: initialFilters?.location || "",
    propertyType: initialFilters?.propertyType,
    priceRange: initialFilters?.priceRange || { min: 0, max: 10000000 },
    bedrooms: initialFilters?.bedrooms,
    bathrooms: initialFilters?.bathrooms,
    features: initialFilters?.features || [],
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocationChange = async (value: string) => {
    setFilters(prev => ({ ...prev, location: value }));
    
    if (value.length > 2) {
      try {
        // Fetch location suggestions from API
        const response = await fetch(`/api/locations/suggestions?q=${encodeURIComponent(value)}&limit=10`);
        if (response.ok) {
          const data = await response.json();
          setLocationSuggestions(data.suggestions);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const handleLocationSelect = (suggestion: LocationSuggestion) => {
    setFilters(prev => ({ ...prev, location: suggestion.displayName }));
    setShowSuggestions(false);
  };

  const clearLocation = () => {
    setFilters(prev => ({ ...prev, location: "" }));
    setShowSuggestions(false);
  };

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      await onSearch(filters);
    } finally {
      setIsSearching(false);
    }
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "Any";
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePriceRangeChange = (type: 'min' | 'max', value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: numValue
      }
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (isEmbedded) {
    return (
      <div className="space-y-6">
        {/* Basic Search Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Location */}
          <div className="relative" ref={searchRef}>
            <Label htmlFor="location" className="flex items-center gap-2 mb-2 font-medium text-gray-700">
              <MapPin className="h-4 w-4 text-primary" />
              Location
            </Label>
            <div className="relative">
              <Input
                id="location"
                placeholder="Enter location..."
                value={filters.location}
                onChange={(e) => handleLocationChange(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pr-10 bg-white border-gray-200 focus:border-primary focus:ring-primary"
              />
              {filters.location && (
                <button
                  onClick={clearLocation}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {showSuggestions && locationSuggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                {locationSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                    onClick={() => handleLocationSelect(suggestion)}
                  >
                    <div className="font-medium text-gray-900">{suggestion.name}</div>
                    <div className="text-sm text-gray-500">
                      {suggestion.displayName}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Property Type */}
          <div>
            <Label htmlFor="propertyType" className="flex items-center gap-2 mb-2 font-medium text-gray-700">
              <Home className="h-4 w-4 text-primary" />
              Property Type
            </Label>
            <select
              id="propertyType"
              value={filters.propertyType || ""}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                propertyType: e.target.value as PropertyType || undefined 
              }))}
              className="w-full h-10 px-3 py-2 border border-gray-200 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              <option value="">All Types</option>
              {PROPERTY_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Bedrooms */}
          <div>
            <Label htmlFor="bedrooms" className="flex items-center gap-2 mb-2 font-medium text-gray-700">
              <Bed className="h-4 w-4 text-primary" />
              Bedrooms
            </Label>
            <select
              id="bedrooms"
              value={filters.bedrooms || ""}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                bedrooms: e.target.value ? Number(e.target.value) : undefined 
              }))}
              className="w-full h-10 px-3 py-2 border border-gray-200 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              <option value="">Any</option>
              {BEDROOM_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Bathrooms */}
          <div>
            <Label htmlFor="bathrooms" className="flex items-center gap-2 mb-2 font-medium text-gray-700">
              <Bath className="h-4 w-4 text-primary" />
              Bathrooms
            </Label>
            <select
              id="bathrooms"
              value={filters.bathrooms || ""}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                bathrooms: e.target.value ? Number(e.target.value) : undefined 
              }))}
              className="w-full h-10 px-3 py-2 border border-gray-200 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              <option value="">Any</option>
              {BATHROOM_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced Search Toggle */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm hover:bg-gray-100 text-gray-600"
          >
            {showAdvanced ? "Hide" : "Show"} Advanced Options
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Advanced Search Fields */}
        {showAdvanced && (
          <div className="space-y-6 pt-4 border-t border-gray-200">
            {/* Price Range */}
            <div>
              <Label className="flex items-center gap-2 mb-4 font-medium text-gray-700">
                <DollarSign className="h-4 w-4 text-primary" />
                Price Range (RM)
              </Label>
              
              {/* Price Range Slider */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={filters.priceRange.min}
                    onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={filters.priceRange.max}
                    onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider absolute top-0"
                  />
                </div>
              </div>

              {/* Price Input Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minPrice" className="text-sm text-gray-600 mb-1 block">
                    Min Price
                  </Label>
                  <Input
                    id="minPrice"
                    type="number"
                    placeholder="0"
                    value={filters.priceRange.min || ''}
                    onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                    className="w-full bg-white border-gray-200 focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <Label htmlFor="maxPrice" className="text-sm text-gray-600 mb-1 block">
                    Max Price
                  </Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    placeholder="10,000,000"
                    value={filters.priceRange.max || ''}
                    onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                    className="w-full bg-white border-gray-200 focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
              
              {/* Price Range Display */}
              <div className="text-sm text-gray-600 mt-2 text-center">
                Range: {formatPrice(filters.priceRange.min)} - {formatPrice(filters.priceRange.max)}
              </div>
            </div>
          </div>
        )}

        {/* Search Button */}
        <div className="flex justify-center pt-4">
          <Button 
            onClick={handleSearch} 
            size="lg" 
            className="px-12 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Searching...
              </>
            ) : (
              <>
                <Search className="h-5 w-5 mr-2" />
                Search Properties
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  // Original card-based design for standalone use
  return (
    <div className="w-full shadow-lg bg-white rounded-lg p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Property</h2>
          <p className="text-gray-600">Search with advanced filters and location intelligence</p>
        </div>

        {/* Basic Search Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Location */}
          <div className="relative" ref={searchRef}>
            <Label htmlFor="location" className="flex items-center gap-2 mb-2 font-medium">
              <MapPin className="h-4 w-4 text-primary" />
              Location
            </Label>
            <div className="relative">
              <Input
                id="location"
                placeholder="Enter location..."
                value={filters.location}
                onChange={(e) => handleLocationChange(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pr-10"
              />
              {filters.location && (
                <button
                  onClick={clearLocation}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {showSuggestions && locationSuggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                {locationSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors"
                    onClick={() => handleLocationSelect(suggestion)}
                  >
                    <div className="font-medium text-gray-900 dark:text-white">{suggestion.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {suggestion.displayName}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Property Type */}
          <div>
            <Label htmlFor="propertyType" className="flex items-center gap-2 mb-2 font-medium">
              <Home className="h-4 w-4 text-primary" />
              Property Type
            </Label>
            <select
              id="propertyType"
              value={filters.propertyType || ""}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                propertyType: e.target.value as PropertyType || undefined 
              }))}
              className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
            >
              <option value="">All Types</option>
              {PROPERTY_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Bedrooms */}
          <div>
            <Label htmlFor="bedrooms" className="flex items-center gap-2 mb-2 font-medium">
              <Bed className="h-4 w-4 text-primary" />
              Bedrooms
            </Label>
            <select
              id="bedrooms"
              value={filters.bedrooms || ""}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                bedrooms: e.target.value ? Number(e.target.value) : undefined 
              }))}
              className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
            >
              <option value="">Any</option>
              {BEDROOM_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Bathrooms */}
          <div>
            <Label htmlFor="bathrooms" className="flex items-center gap-2 mb-2 font-medium">
              <Bath className="h-4 w-4 text-primary" />
              Bathrooms
            </Label>
            <select
              id="bathrooms"
              value={filters.bedrooms || ""}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                bathrooms: e.target.value ? Number(e.target.value) : undefined 
              }))}
              className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
            >
              <option value="">Any</option>
              {BATHROOM_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced Search Toggle */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {showAdvanced ? "Hide" : "Show"} Advanced Options
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Advanced Search Fields */}
        {showAdvanced && (
          <div className="space-y-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            {/* Price Range */}
            <div>
              <Label className="flex items-center gap-2 mb-4 font-medium">
                <DollarSign className="h-4 w-4 text-primary" />
                Price Range (RM)
              </Label>
              
              {/* Price Range Slider */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={filters.priceRange.min}
                    onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={filters.priceRange.max}
                    onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider absolute top-0"
                  />
                </div>
              </div>

              {/* Price Input Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minPrice" className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
                    Min Price
                  </Label>
                  <Input
                    id="minPrice"
                    type="number"
                    placeholder="0"
                    value={filters.priceRange.min || ''}
                    onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="maxPrice" className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
                    Max Price
                  </Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    placeholder="10,000,000"
                    value={filters.priceRange.max || ''}
                    onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Price Range Display */}
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                Range: {formatPrice(filters.priceRange.min)} - {formatPrice(filters.priceRange.max)}
              </div>
            </div>
          </div>
        )}

        {/* Search Button */}
        <div className="flex justify-center pt-4">
          <Button 
            onClick={handleSearch} 
            size="lg" 
            className="px-12 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Searching...
              </>
            ) : (
              <>
                <Search className="h-5 w-5 mr-2" />
                Search Properties
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 