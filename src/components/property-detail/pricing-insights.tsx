"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3,
  Info,
  Target,
  AlertTriangle
} from "lucide-react";
import { Property } from "@/types/property";

interface PricingInsightsProps {
  property: Property;
}

interface PriceTrend {
  month: string;
  averagePrice: number;
  highPrice: number;
  lowPrice: number;
}

interface AreaComparison {
  area: string;
  averagePricePerSqft: number;
  propertyCount: number;
  priceRange: {
    min: number;
    max: number;
  };
}

export function PricingInsights({ property }: PricingInsightsProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'6months' | '12months' | '2years'>('12months');

  // Mock data for price trends
  const priceTrends: PriceTrend[] = [
    { month: 'Jan 2024', averagePrice: 850000, highPrice: 950000, lowPrice: 750000 },
    { month: 'Feb 2024', averagePrice: 860000, highPrice: 960000, lowPrice: 760000 },
    { month: 'Mar 2024', averagePrice: 870000, highPrice: 970000, lowPrice: 770000 },
    { month: 'Apr 2024', averagePrice: 880000, highPrice: 980000, lowPrice: 780000 },
    { month: 'May 2024', averagePrice: 890000, highPrice: 990000, lowPrice: 790000 },
    { month: 'Jun 2024', averagePrice: 900000, highPrice: 1000000, lowPrice: 800000 },
    { month: 'Jul 2024', averagePrice: 910000, highPrice: 1010000, lowPrice: 810000 },
    { month: 'Aug 2024', averagePrice: 920000, highPrice: 1020000, lowPrice: 820000 },
    { month: 'Sep 2024', averagePrice: 930000, highPrice: 1030000, lowPrice: 830000 },
    { month: 'Oct 2024', averagePrice: 940000, highPrice: 1040000, lowPrice: 840000 },
    { month: 'Nov 2024', averagePrice: 950000, highPrice: 1050000, lowPrice: 850000 },
    { month: 'Dec 2024', averagePrice: 960000, highPrice: 1060000, lowPrice: 860000 },
  ];

  // Mock data for area comparison
  const areaComparison: AreaComparison[] = [
    {
      area: property.location.neighborhood,
      averagePricePerSqft: 850,
      propertyCount: 45,
      priceRange: { min: 750, max: 950 }
    },
    {
      area: 'Taman Melawati',
      averagePricePerSqft: 820,
      propertyCount: 120,
      priceRange: { min: 700, max: 900 }
    },
    {
      area: 'Wangsa Maju',
      averagePricePerSqft: 780,
      propertyCount: 89,
      priceRange: { min: 650, max: 850 }
    },
    {
      area: 'Setapak',
      averagePricePerSqft: 750,
      propertyCount: 67,
      priceRange: { min: 600, max: 800 }
    }
  ];

  const currentPricePerSqft = property.price / property.size.sqft;
  const areaAverage = areaComparison[0].averagePricePerSqft;
  const priceDifference = currentPricePerSqft - areaAverage;
  const priceDifferencePercent = (priceDifference / areaAverage) * 100;

  const isAboveAverage = priceDifference > 0;
  const isSignificantlyDifferent = Math.abs(priceDifferencePercent) > 10;

  const getPriceInsight = () => {
    if (Math.abs(priceDifferencePercent) < 5) {
      return {
        type: 'neutral',
        message: 'This property is priced in line with the area average',
        icon: <Target className="h-4 w-4" />
      };
    } else if (isAboveAverage) {
      return {
        type: 'above',
        message: `This property is ${priceDifferencePercent.toFixed(1)}% above the area average`,
        icon: <TrendingUp className="h-4 w-4" />
      };
    } else {
      return {
        type: 'below',
        message: `This property is ${Math.abs(priceDifferencePercent).toFixed(1)}% below the area average`,
        icon: <TrendingDown className="h-4 w-4" />
      };
    }
  };

  const priceInsight = getPriceInsight();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Pricing Insights
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Understand the property's value in the current market
            </p>
          </div>
          
          <Badge variant={isSignificantlyDifferent ? 'secondary' : 'outline'}>
            <Info className="h-3 w-3 mr-1" />
            Market Analysis
          </Badge>
        </div>

        {/* Price Comparison Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Current Property */}
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
              This Property
            </div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-1">
              RM {currentPricePerSqft.toFixed(0)}
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300">
              per sqft
            </div>
          </div>

          {/* Area Average */}
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Area Average
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              RM {areaAverage.toFixed(0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              per sqft
            </div>
          </div>

          {/* Price Difference */}
          <div className={`text-center p-4 rounded-lg border ${
            priceInsight.type === 'neutral' 
              ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              : priceInsight.type === 'above'
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
          }`}>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Price Difference
            </div>
            <div className={`text-2xl font-bold mb-1 ${
              priceInsight.type === 'neutral'
                ? 'text-gray-900 dark:text-white'
                : priceInsight.type === 'above'
                ? 'text-green-900 dark:text-green-100'
                : 'text-blue-900 dark:text-blue-100'
            }`}>
              {isAboveAverage ? '+' : ''}RM {priceDifference.toFixed(0)}
            </div>
            <div className={`text-sm ${
              priceInsight.type === 'neutral'
                ? 'text-gray-600 dark:text-gray-400'
                : priceInsight.type === 'above'
                ? 'text-green-700 dark:text-green-300'
                : 'text-blue-700 dark:text-blue-300'
            }`}>
              {isAboveAverage ? '+' : ''}{priceDifferencePercent.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Price Insight Alert */}
        <div className={`mb-6 p-4 rounded-lg border ${
          priceInsight.type === 'neutral'
            ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            : priceInsight.type === 'above'
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
            : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${
              priceInsight.type === 'neutral'
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                : priceInsight.type === 'above'
                ? 'bg-green-200 dark:bg-green-700 text-green-600 dark:text-green-400'
                : 'bg-blue-200 dark:bg-blue-700 text-blue-600 dark:text-blue-400'
            }`}>
              {priceInsight.icon}
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                Market Insight
              </h4>
              <p className={`text-sm ${
                priceInsight.type === 'neutral'
                  ? 'text-gray-600 dark:text-gray-400'
                  : priceInsight.type === 'above'
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-blue-700 dark:text-blue-300'
              }`}>
                {priceInsight.message}
              </p>
            </div>
          </div>
        </div>

        {/* Price Trends and Area Comparison */}
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="trends">Price Trends</TabsTrigger>
            <TabsTrigger value="comparison">Area Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="mt-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Price Trends (Last 12 Months)
                </h3>
                <div className="flex gap-2">
                  {(['6months', '12months', '2years'] as const).map((timeframe) => (
                    <Button
                      key={timeframe}
                      size="sm"
                      variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                      onClick={() => setSelectedTimeframe(timeframe)}
                    >
                      {timeframe === '6months' ? '6M' : timeframe === '12months' ? '12M' : '2Y'}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Price Trends Chart
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Interactive chart showing price trends over time
                  </p>
                  <div className="mt-4 text-xs text-gray-400 dark:text-gray-600">
                    <p>Average: RM {priceTrends[priceTrends.length - 1].averagePrice.toLocaleString()}</p>
                    <p>High: RM {priceTrends[priceTrends.length - 1].highPrice.toLocaleString()}</p>
                    <p>Low: RM {priceTrends[priceTrends.length - 1].lowPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="mt-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Price Comparison by Area
              </h3>
              
              <div className="space-y-4">
                {areaComparison.map((area, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {area.area}
                      </h4>
                      <Badge variant="outline">
                        {area.propertyCount} properties
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Average Price/sqft
                        </div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          RM {area.averagePricePerSqft.toFixed(0)}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Price Range
                        </div>
                        <div className="text-sm text-gray-900 dark:text-white">
                          RM {area.priceRange.min.toLocaleString()} - {area.priceRange.max.toLocaleString()}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          vs This Property
                        </div>
                        <div className={`text-sm font-medium ${
                          currentPricePerSqft > area.averagePricePerSqft
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {currentPricePerSqft > area.averagePricePerSqft ? '+' : ''}
                          {((currentPricePerSqft - area.averagePricePerSqft) / area.averagePricePerSqft * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Disclaimer */}
        <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              <strong>Disclaimer:</strong> Pricing insights are based on market data and comparable properties. 
              Actual market conditions may vary. Consult with a real estate professional for accurate valuations.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 