"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Brain, 
  TrendingUp, 
  BarChart3, 
  Target, 
  MapPin, 
  Calendar,
  Clock,
  Users,
  Sparkles,
  ArrowLeft,
  Download,
  Share2,
  Eye,
  Star,
  CheckCircle,
  Database,
  Lightbulb,
  TrendingDown,
  AlertTriangle,
  Info,
  Lock,
  DollarSign,
  Building,
  Home,
  TrendingUpIcon,
  TrendingDownIcon,
  Minus
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
  executiveSummary: string;
  detailedAnalysis: string;
  marketImplications: string[];
  riskFactors: string[];
  recommendations: string[];
  technicalDetails: {
    modelArchitecture: string;
    trainingData: string;
    validationMetrics: string;
    limitations: string;
  };
  impactedAreas: {
    area: string;
    city: string;
    state: string;
    impactType: "positive" | "negative" | "neutral";
    priceChange: number;
    confidence: number;
    timeframe: string;
    keyFactors: string[];
    propertyTypes: string[];
    investmentPotential: "high" | "medium" | "low";
  }[];
}

// Mock report data (same as listing page but with additional fields)
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
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    executiveSummary: "Our AI models predict a strong recovery in Malaysia's property market for 2024-2025, with regional variations driven by infrastructure development, economic policies, and demographic shifts. The analysis incorporates over 50 market indicators and historical data spanning 10 years to provide accurate forecasts.",
    detailedAnalysis: "The Malaysian property market is poised for significant growth in 2024-2025, driven by several key factors. Our AI analysis reveals that infrastructure projects, particularly the MRT3 and LRT3 extensions, will have a substantial impact on property values in affected areas. Additionally, the government's focus on digital transformation and smart city initiatives is creating new investment opportunities in technology hubs. The analysis also considers the impact of demographic changes, including the growing number of young professionals and the increasing demand for sustainable living spaces.",
    marketImplications: [
      "Investors should focus on areas with upcoming infrastructure projects",
      "Commercial properties in tech hubs will see higher returns",
      "Sustainable and smart home features will become standard requirements",
      "Regional markets like Penang and Johor Bahru offer diversification opportunities"
    ],
    riskFactors: [
      "Global economic uncertainty could affect foreign investment",
      "Interest rate fluctuations may impact mortgage demand",
      "Policy changes in foreign ownership regulations",
      "Supply chain disruptions affecting construction costs"
    ],
    recommendations: [
      "Diversify portfolio across different property types and regions",
      "Focus on properties with sustainable features and smart technology",
      "Monitor infrastructure development timelines for investment timing",
      "Consider long-term demographic trends in investment decisions"
    ],
    technicalDetails: {
      modelArchitecture: "LSTM (Long Short-Term Memory) neural networks with attention mechanisms, combined with gradient boosting for ensemble learning.",
      trainingData: "10 years of historical property data, economic indicators, demographic statistics, and infrastructure development timelines.",
      validationMetrics: "Cross-validation accuracy: 94%, Mean Absolute Error: 3.2%, R-squared: 0.89",
             limitations: "Model performance may vary during unprecedented market events. Historical data may not fully capture future market dynamics."
     },
     impactedAreas: [
       {
         area: "KLCC",
         city: "Kuala Lumpur",
         state: "Kuala Lumpur",
         impactType: "positive",
         priceChange: 12.5,
         confidence: 94,
         timeframe: "2024-2025",
         keyFactors: ["Infrastructure development", "Foreign investment", "Tech hub expansion"],
         propertyTypes: ["Luxury condos", "Office spaces", "Retail properties"],
         investmentPotential: "high"
       },
       {
         area: "Mont Kiara",
         city: "Kuala Lumpur",
         state: "Kuala Lumpur",
         impactType: "positive",
         priceChange: 10.8,
         confidence: 91,
         timeframe: "2024-2025",
         keyFactors: ["Expatriate demand", "International schools", "Luxury amenities"],
         propertyTypes: ["High-end condos", "Landed properties", "Serviced apartments"],
         investmentPotential: "high"
       },
       {
         area: "Petaling Jaya",
         city: "Petaling Jaya",
         state: "Selangor",
         impactType: "positive",
         priceChange: 8.2,
         confidence: 87,
         timeframe: "2024-2025",
         keyFactors: ["Corporate headquarters", "Transportation hub", "Family-friendly environment"],
         propertyTypes: ["Office buildings", "Residential condos", "Shop houses"],
         investmentPotential: "medium"
       },
       {
         area: "Subang Jaya",
         city: "Subang Jaya",
         state: "Selangor",
         impactType: "positive",
         priceChange: 7.5,
         confidence: 85,
         timeframe: "2024-2025",
         keyFactors: ["University presence", "Shopping districts", "Residential appeal"],
         propertyTypes: ["Student housing", "Residential condos", "Commercial spaces"],
         investmentPotential: "medium"
       },
       {
         area: "Bangsar",
         city: "Kuala Lumpur",
         state: "Kuala Lumpur",
         impactType: "neutral",
         priceChange: 2.1,
         confidence: 78,
         timeframe: "2024-2025",
         keyFactors: ["Established market", "Limited new supply", "High demand"],
         propertyTypes: ["Landed properties", "Boutique condos", "Commercial spaces"],
         investmentPotential: "medium"
       },
       {
         area: "Wangsa Maju",
         city: "Kuala Lumpur",
         state: "Kuala Lumpur",
         impactType: "positive",
         priceChange: 15.3,
         confidence: 89,
         timeframe: "2024-2025",
         keyFactors: ["MRT3 development", "Affordable housing", "Government initiatives"],
         propertyTypes: ["Affordable condos", "Residential units", "Commercial spaces"],
         investmentPotential: "high"
       }
     ]
   }
 ];

export default function PropsAIDetailPage() {
  const params = useParams();
  const [report, setReport] = useState<PropsAIReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (params.id) {
      // Simulate API call
      setTimeout(() => {
        const foundReport = mockReports.find(r => r.id === params.id);
        if (foundReport) {
          setReport(foundReport);
        }
        setLoading(false);
      }, 500);
    }
  }, [params.id]);

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

  const handleDownload = () => {
    // TODO: Implement actual download functionality
    console.log('Downloading report:', report?.id);
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: report?.title,
        text: report?.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  const handlePurchase = () => {
    // TODO: Implement actual payment processing
    console.log('Processing payment for report:', report?.id);
    setShowPaymentModal(false);
    setHasAccess(true);
    // In real implementation, this would integrate with payment gateway
  };

  const getImpactIcon = (impactType: string) => {
    switch (impactType) {
      case "positive": return <TrendingUpIcon className="h-4 w-4 text-green-500" />;
      case "negative": return <TrendingDownIcon className="h-4 w-4 text-red-500" />;
      case "neutral": return <Minus className="h-4 w-4 text-gray-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getInvestmentColor = (potential: string) => {
    switch (potential) {
      case "high": return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-200";
      case "medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-200";
      case "low": return "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-200";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading AI report...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Report Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            The AI research report you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/props-ai">
            <Button className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Props AI
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
            <Link href="/props-ai">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Props AI
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge className={getCategoryColor(report.category)}>
                  {getCategoryIcon(report.category)}
                  <span className="ml-2">{formatCategory(report.category)}</span>
                </Badge>
                {report.isPremium && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                    Premium Report
                  </Badge>
                )}
                {report.isFeatured && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                    Featured
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {report.title}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-4xl">
                {report.summary}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Published {new Date(report.publishDate).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {report.readTime}
                </span>
                <span className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  {report.views.toLocaleString()} views
                </span>
                <span className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  {report.downloads.toLocaleString()} downloads
                </span>
                <span className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  {report.confidence}% AI Confidence
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleDownload} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Report
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Report Image */}
            <Card>
              <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                <img
                  src={report.thumbnail}
                  alt={report.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            {/* Report Content Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Report Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="summary" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="analysis">Analysis</TabsTrigger>
                    <TabsTrigger value="insights">Key Insights</TabsTrigger>
                    <TabsTrigger value="technical">Technical</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="summary" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Executive Summary
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {report.executiveSummary}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Methodology
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {report.methodology}
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="analysis" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Detailed Analysis
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {report.detailedAnalysis}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Market Implications
                      </h3>
                      <ul className="space-y-2">
                        {report.marketImplications.map((implication, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{implication}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="insights" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Key Insights
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {report.keyInsights.map((insight, index) => (
                          <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{insight}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Risk Factors
                      </h3>
                      <ul className="space-y-2">
                        {report.riskFactors.map((risk, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Recommendations
                      </h3>
                      <ul className="space-y-2">
                        {report.recommendations.map((recommendation, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="technical" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        AI Model Architecture
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {report.technicalDetails.modelArchitecture}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Training Data
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {report.technicalDetails.trainingData}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Validation Metrics
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {report.technicalDetails.validationMetrics}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Model Limitations
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {report.technicalDetails.limitations}
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Impacted Property Areas Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Impacted Property Areas
                  </CardTitle>
                  {!hasAccess && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                      <Lock className="h-3 w-3 mr-1" />
                      Premium Access Required
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  AI-powered analysis of property areas affected by market trends and infrastructure developments
                </p>
              </CardHeader>
              <CardContent>
                {!hasAccess ? (
                  <div className="space-y-6">
                    {/* Preview Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {report.impactedAreas.slice(0, 2).map((area, index) => (
                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{area.area}</h4>
                            {getImpactIcon(area.impactType)}
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Location:</span>
                              <span className="font-medium">{area.city}, {area.state}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Price Change:</span>
                              <span className={`font-medium ${area.impactType === 'positive' ? 'text-green-600' : area.impactType === 'negative' ? 'text-red-600' : 'text-gray-600'}`}>
                                {area.impactType === 'positive' ? '+' : ''}{area.priceChange}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Investment:</span>
                              <Badge className={`text-xs ${getInvestmentColor(area.investmentPotential)}`}>
                                {area.investmentPotential.charAt(0).toUpperCase() + area.investmentPotential.slice(1)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Payment Gate */}
                    <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <Lock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Unlock Full Area Analysis
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto">
                        Get complete access to detailed property area analysis, including key factors, 
                        property types, and investment recommendations for all {report.impactedAreas.length} affected areas.
                      </p>
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{report.impactedAreas.length}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Property Areas</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">94%</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">AI Confidence</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">6</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Cities Covered</div>
                        </div>
                      </div>
                      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
                        <DialogTrigger asChild>
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Purchase Full Access - RM 99
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Purchase Full Access</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                What you&apos;ll get:
                              </h4>
                              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                <li>• Complete area-by-area analysis</li>
                                <li>• Key factors affecting each area</li>
                                <li>• Property type recommendations</li>
                                <li>• Investment potential ratings</li>
                                <li>• Timeframe predictions</li>
                                <li>• Downloadable detailed report</li>
                              </ul>
                            </div>
                            <div className="flex gap-3">
                              <Button onClick={handlePurchase} className="flex-1">
                                Confirm Purchase
                              </Button>
                              <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Full Content for Paid Users */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {report.impactedAreas.map((area, index) => (
                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{area.area}</h4>
                            {getImpactIcon(area.impactType)}
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Location:</span>
                              <span className="font-medium">{area.city}, {area.state}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Price Change:</span>
                              <span className={`font-medium ${area.impactType === 'positive' ? 'text-green-600' : area.impactType === 'negative' ? 'text-red-600' : 'text-gray-600'}`}>
                                {area.impactType === 'positive' ? '+' : ''}{area.priceChange}%
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Confidence:</span>
                              <span className="font-medium">{area.confidence}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Timeframe:</span>
                              <span className="font-medium">{area.timeframe}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Investment:</span>
                              <Badge className={`text-xs ${getInvestmentColor(area.investmentPotential)}`}>
                                {area.investmentPotential.charAt(0).toUpperCase() + area.investmentPotential.slice(1)}
                              </Badge>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Key Factors:</h5>
                              <div className="space-y-1">
                                {area.keyFactors.map((factor, factorIndex) => (
                                  <div key={factorIndex} className="flex items-center gap-2 text-xs">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                    <span className="text-gray-600 dark:text-gray-400">{factor}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Property Types:</h5>
                              <div className="flex flex-wrap gap-1">
                                {area.propertyTypes.map((type, typeIndex) => (
                                  <Badge key={typeIndex} variant="outline" className="text-xs">
                                    {type}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-green-700 dark:text-green-300">
                        You have full access to all impacted property area analysis. 
                        Download the complete report for detailed insights.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Report Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Report Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Author:</span>
                  <span className="font-medium">{report.author}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Region:</span>
                  <span className="font-medium">{report.region}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">AI Model:</span>
                  <span className="font-medium">{report.aiModel}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
                  <span className="font-medium">{new Date(report.lastUpdated).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Confidence:</span>
                  <span className="font-medium text-green-600">{report.confidence}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Data Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {report.dataSources.map((source, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">{source}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {report.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Related Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Discover more AI-powered insights in our research library.
                  </p>
                  <Link href="/props-ai">
                    <Button variant="outline" className="w-full">
                      Browse All Reports
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 