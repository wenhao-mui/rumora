"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  TrendingUp, 
  Brain, 
  BarChart3, 
  Calendar,
  Filter,
  X,
  ArrowRight,
  Target,
  MapPin,
  Clock,
  Users,
  Sparkles,
  Lightbulb
} from "lucide-react";
import Link from "next/link";

interface PropsAIReport {
  id: string;
  title: string;
  summary: string;
  category: "market-trends" | "price-forecasts" | "investment-analysis" | "demographics" | "policy-impact" | "technology-trends";
  region: string;
  publishDate: string;
  lastUpdated: string;
  aiModel: string;
  confidence: number;
  keyInsights: string[];
  dataSources: string[];
  methodology: string;
  author: string;
  readTime: string;
  views: number;
  downloads: number;
  isPremium: boolean;
  isFeatured: boolean;
  tags: string[];
  thumbnail: string;
}

const mockReports: PropsAIReport[] = [
  {
    id: "report1",
    title: "Malaysia Property Market Outlook 2024-2025: AI-Powered Price Predictions",
    summary: "Comprehensive analysis of Malaysia's real estate market using advanced machine learning models. This report provides detailed price forecasts, market trend predictions, and investment opportunities across major cities including Kuala Lumpur, Penang, and Johor Bahru.",
    category: "price-forecasts",
    region: "Malaysia",
    publishDate: "2024-01-15",
    lastUpdated: "2024-01-20",
    aiModel: "RumoraGPT-4",
    confidence: 94,
    keyInsights: [
      "Expected 8-12% price appreciation in KLCC and Mont Kiara areas",
      "Penang market shows strong growth potential with 15-20% forecast",
      "Johor Bahru emerging as new investment hotspot",
      "Commercial properties in tech hubs expected to outperform residential"
    ],
    dataSources: [
      "National Property Information Centre (NAPIC)",
      "Bank Negara Malaysia",
      "Real Estate and Housing Developers' Association (REHDA)",
      "PropertyGuru Malaysia",
      "Internal transaction databases"
    ],
    methodology: "Multi-variate regression analysis with LSTM neural networks, incorporating 50+ market indicators including GDP growth, interest rates, population demographics, and infrastructure development.",
    author: "Dr. Sarah Chen, Lead AI Researcher",
    readTime: "15 min read",
    views: 2847,
    downloads: 892,
    isPremium: true,
    isFeatured: true,
    tags: ["price-forecast", "market-analysis", "investment", "KLCC", "Penang"],
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop"
  },
  {
    id: "report2",
    title: "AI Analysis: Impact of MRT3 on Kuala Lumpur Property Values",
    summary: "Deep learning analysis of how the upcoming MRT3 project will affect property values across different neighborhoods in Kuala Lumpur. Includes predictive modeling of price appreciation and investment timing recommendations.",
    category: "market-trends",
    region: "Kuala Lumpur",
    publishDate: "2024-01-10",
    lastUpdated: "2024-01-18",
    aiModel: "RumoraGPT-4",
    confidence: 91,
    keyInsights: [
      "Properties within 500m of MRT3 stations expected to appreciate 20-30%",
      "Wangsa Maju and Setapak areas show highest growth potential",
      "Commercial properties near interchange stations will see 25-35% growth",
      "Optimal investment window: Q2 2024 to Q1 2025"
    ],
    dataSources: [
      "MRT Corporation Malaysia",
      "Kuala Lumpur City Hall (DBKL)",
      "Transportation Ministry data",
      "Historical MRT1 & MRT2 impact analysis",
      "Property transaction records"
    ],
    methodology: "Spatial regression analysis using convolutional neural networks, analyzing historical MRT impact data and current market conditions to predict future price movements.",
    author: "Dr. Ahmad Rahman, Transportation & Property AI Specialist",
    readTime: "12 min read",
    views: 2156,
    downloads: 654,
    isPremium: false,
    isFeatured: true,
    tags: ["MRT3", "infrastructure", "transportation", "price-impact", "investment-timing"],
    thumbnail: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=400&h=250&fit=crop"
  },
  {
    id: "report3",
    title: "Demographic Shifts & Property Demand: AI-Powered Market Segmentation",
    summary: "Advanced clustering analysis of Malaysia's changing demographics and its impact on property demand. Identifies emerging market segments and opportunities for developers and investors.",
    category: "demographics",
    region: "Malaysia",
    publishDate: "2024-01-08",
    lastUpdated: "2024-01-15",
    aiModel: "RumoraGPT-4",
    confidence: 89,
    keyInsights: [
      "Growing demand for co-living spaces among young professionals",
      "Senior housing market expected to grow 40% by 2030",
      "Family-oriented developments in suburban areas show strong demand",
      "Tech workers prefer properties with smart home features"
    ],
    dataSources: [
      "Department of Statistics Malaysia",
      "Population and Family Development Board",
      "Employment statistics",
      "Consumer preference surveys",
      "Property search behavior data"
    ],
    methodology: "K-means clustering with hierarchical analysis, incorporating demographic data, lifestyle preferences, and property search patterns to identify market segments.",
    author: "Dr. Priya Patel, Demographics & AI Researcher",
    readTime: "18 min read",
    views: 1892,
    downloads: 543,
    isPremium: true,
    isFeatured: false,
    tags: ["demographics", "market-segmentation", "co-living", "senior-housing", "smart-homes"],
    thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop"
  },
  {
    id: "report4",
    title: "Interest Rate Impact Analysis: AI Forecasts for 2024 Property Market",
    summary: "Machine learning analysis of how Bank Negara Malaysia's interest rate decisions will affect property prices, mortgage demand, and investment returns throughout 2024.",
    category: "investment-analysis",
    region: "Malaysia",
    publishDate: "2024-01-05",
    lastUpdated: "2024-01-12",
    aiModel: "RumoraGPT-4",
    confidence: 87,
    keyInsights: [
      "Expected 2-3 interest rate cuts in 2024",
      "Mortgage demand to increase 15-20% in Q3-Q4",
      "Property prices to stabilize with slight upward trend",
      "Investment properties to become more attractive"
    ],
    dataSources: [
      "Bank Negara Malaysia",
      "Federal Reserve data",
      "Global economic indicators",
      "Historical interest rate impact analysis",
      "Mortgage application data"
    ],
    methodology: "Time series analysis using recurrent neural networks, incorporating global economic indicators and historical interest rate impact data.",
    author: "Dr. David Wong, Economic AI Specialist",
    readTime: "14 min read",
    views: 1654,
    downloads: 432,
    isPremium: false,
    isFeatured: false,
    tags: ["interest-rates", "mortgage", "investment", "economic-analysis", "2024-forecast"],
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop"
  },
  {
    id: "report5",
    title: "Green Building Trends: AI Analysis of Sustainable Property Market",
    summary: "Comprehensive study of Malaysia's green building market using AI to analyze sustainability trends, certification impact on property values, and future market opportunities.",
    category: "technology-trends",
    region: "Malaysia",
    publishDate: "2024-01-03",
    lastUpdated: "2024-01-10",
    aiModel: "RumoraGPT-4",
    confidence: 92,
    keyInsights: [
      "Green-certified properties command 15-25% premium",
      "Solar panel installations increase property value by 8-12%",
      "Sustainable features becoming standard in new developments",
      "Government incentives driving green building adoption"
    ],
    dataSources: [
      "Green Building Index (GBI)",
      "Sustainable Energy Development Authority",
      "Property developers' sustainability reports",
      "Energy efficiency data",
      "Property valuation records"
    ],
    methodology: "Multi-factor analysis using gradient boosting algorithms, incorporating sustainability metrics, energy efficiency data, and property valuation records.",
    author: "Dr. Lim Mei Ling, Sustainability & AI Researcher",
    readTime: "16 min read",
    views: 1432,
    downloads: 398,
    isPremium: true,
    isFeatured: false,
    tags: ["green-building", "sustainability", "energy-efficiency", "property-values", "market-trends"],
    thumbnail: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=250&fit=crop"
  }
];

export default function PropsAIPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories and regions for filters
  const categories = ["all", ...Array.from(new Set(mockReports.map(report => report.category)))];
  const regions = ["all", ...Array.from(new Set(mockReports.map(report => report.region)))];

  // Filter reports based on search and filters
  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || report.category === selectedCategory;
    const matchesRegion = selectedRegion === "all" || report.region === selectedRegion;

    return matchesSearch && matchesCategory && matchesRegion;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedRegion("all");
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "market-trends": return <TrendingUp className="h-4 w-4" />;
      case "price-forecasts": return <BarChart3 className="h-4 w-4" />;
      case "investment-analysis": return <Target className="h-4 w-4" />;
      case "demographics": return <Users className="h-4 w-4" />;
      case "policy-impact": return <MapPin className="h-4 w-4" />;
      case "technology-trends": return <Sparkles className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "market-trends": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200";
      case "price-forecasts": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200";
      case "investment-analysis": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200";
      case "demographics": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200";
      case "policy-impact": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200";
      case "technology-trends": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200";
    }
  };

  const formatCategory = (category: string) => {
    return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Props AI
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
              AI-powered market research and forecasting for Malaysia&apos;s real estate market
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-4xl mx-auto">
              Powered by Rumora&apos;s advanced machine learning models, Props AI delivers cutting-edge insights, 
              price predictions, and market trend analysis to help you make informed property decisions.
            </p>
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
                placeholder="Search reports, insights, or topics..."
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
                    Category
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : formatCategory(category)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Region
                  </label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region === "all" ? "All Regions" : region}
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

        {/* Featured Reports */}
        {filteredReports.filter(r => r.isFeatured).length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              Featured Reports
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredReports.filter(r => r.isFeatured).map((report) => (
                <Card key={report.id} className="border-2 border-yellow-200 dark:border-yellow-800 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={getCategoryColor(report.category)}>
                        {getCategoryIcon(report.category)}
                        <span className="ml-2">{formatCategory(report.category)}</span>
                      </Badge>
                      {report.isPremium && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl leading-tight">{report.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {report.summary}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(report.publishDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {report.readTime}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {report.confidence}% Confidence
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          AI Model: {report.aiModel}
                        </div>
                      </div>
                    </div>
                    <Link href={`/props-ai/${report.id}`}>
                      <Button className="w-full">
                        Read Full Report
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Reports */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            All Research Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                  <img
                    src={report.thumbnail}
                    alt={report.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={getCategoryColor(report.category)}>
                      {getCategoryIcon(report.category)}
                      <span className="ml-2">{formatCategory(report.category)}</span>
                    </Badge>
                    {report.isPremium && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                        Premium
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight line-clamp-2">{report.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                    {report.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(report.publishDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {report.readTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {report.confidence}% Confidence
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {report.views} views
                      </div>
                    </div>
                    <Link href={`/props-ai/${report.id}`}>
                      <Button variant="outline" size="sm">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No reports found
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