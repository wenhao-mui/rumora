"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calculator, 
  TrendingUp, 
  Banknote, 
  Home, 
  Percent, 
  Calendar,
  DollarSign,
  CreditCard,
  Building,
  Users,
  Target,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  Download,
  Share2,
  BarChart3,
  PieChart,
  LineChart,
  Brain,
  Sparkles,
  Shield,
  Clock,
  Star,
  TrendingUpIcon,
  TrendingDownIcon,
  Minus,
  Zap,
  UserCheck,
  FileText,
  AlertCircle,
  Lightbulb
} from "lucide-react";

interface LoanComparison {
  bank: string;
  interestRate: number;
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
  processingFee: number;
  earlySettlementFee: number;
  features: string[];
  rating: number;
}

interface BuyerProfile {
  age: number;
  income: number;
  creditScore: number;
  employmentType: "full-time" | "part-time" | "self-employed" | "business-owner";
  employmentDuration: number;
  existingDebts: number;
  downPayment: number;
  propertyType: "residential" | "commercial" | "investment" | "landed";
  preferredLocation: string;
  loanAmount: number;
}

interface PreApprovalResult {
  eligible: boolean;
  confidence: number;
  maxLoanAmount: number;
  recommendedDownPayment: number;
  monthlyPayment: number;
  interestRate: number;
  loanTerm: number;
  riskLevel: "low" | "medium" | "high";
  approvalTime: string;
  requirements: string[];
  recommendations: string[];
  bankSuggestions: {
    bank: string;
    logo: string;
    interestRate: number;
    approvalChance: number;
    specialOffers: string[];
    processingTime: string;
  }[];
}

const mockBanks = [
  {
    name: "Maybank",
    logo: "🏦",
    interestRate: 3.85,
    processingFee: 0.5,
    earlySettlementFee: 3.0,
    features: ["Flexible repayment", "Online banking", "Mobile app", "24/7 support"],
    rating: 4.5
  },
  {
    name: "CIMB Bank",
    logo: "🏛️",
    interestRate: 3.95,
    processingFee: 0.6,
    earlySettlementFee: 2.5,
    features: ["Competitive rates", "Fast approval", "Digital services", "Branch network"],
    rating: 4.3
  },
  {
    name: "Public Bank",
    logo: "🏢",
    interestRate: 3.75,
    processingFee: 0.4,
    earlySettlementFee: 3.5,
    features: ["Low processing fee", "Stable rates", "Customer service", "Flexible terms"],
    rating: 4.4
  },
  {
    name: "Hong Leong Bank",
    logo: "🏦",
    interestRate: 3.90,
    processingFee: 0.55,
    earlySettlementFee: 2.8,
    features: ["Competitive rates", "Online tools", "Mobile banking", "Branch access"],
    rating: 4.2
  },
  {
    name: "RHB Bank",
    logo: "🏛️",
    interestRate: 3.88,
    processingFee: 0.52,
    earlySettlementFee: 3.2,
    features: ["Digital banking", "Competitive rates", "Customer support", "Flexible options"],
    rating: 4.1
  }
];

export default function FinancingPage() {
  const [propertyPrice, setPropertyPrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(3.85);
  const [selectedBank, setSelectedBank] = useState("");

  // AI Pre-Approval State
  const [preApprovalResult, setPreApprovalResult] = useState<PreApprovalResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [buyerProfile, setBuyerProfile] = useState<BuyerProfile>({
    age: 30,
    income: 8000,
    creditScore: 750,
    employmentType: "full-time",
    employmentDuration: 5,
    existingDebts: 2000,
    downPayment: 100000,
    propertyType: "residential",
    preferredLocation: "Kuala Lumpur",
    loanAmount: 400000
  });

  const loanAmount = propertyPrice - downPayment;
  const downPaymentPercentage = (downPayment / propertyPrice) * 100;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;
  
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
  const totalInterest = (monthlyPayment * totalPayments) - loanAmount;
  const totalAmount = monthlyPayment * totalPayments;

  const calculateLoanComparison = (bankRate: number): LoanComparison => {
    const bankMonthlyRate = bankRate / 100 / 12;
    const bankMonthlyPayment = loanAmount * (bankMonthlyRate * Math.pow(1 + bankMonthlyRate, totalPayments)) / (Math.pow(1 + bankMonthlyRate, totalPayments) - 1);
    const bankTotalInterest = (bankMonthlyPayment * totalPayments) - loanAmount;
    const bankTotalAmount = bankMonthlyPayment * totalPayments;
    
    const bank = mockBanks.find(b => b.interestRate === bankRate) || mockBanks[0];
    
    return {
      bank: bank.name,
      interestRate: bankRate,
      monthlyPayment: bankMonthlyPayment,
      totalInterest: bankTotalInterest,
      totalAmount: bankTotalAmount,
      processingFee: bank.processingFee,
      earlySettlementFee: bank.earlySettlementFee,
      features: bank.features,
      rating: bank.rating
    };
  };

  const loanComparisons = mockBanks.map(bank => calculateLoanComparison(bank.interestRate));

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-200";
    if (rating >= 4.0) return "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-200";
    if (rating >= 3.5) return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-200";
    return "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-200";
  };

  // AI Pre-Approval Helper Functions
  const calculateDTI = (income: number, debts: number, loanPayment: number) => {
    return ((debts + loanPayment) / income) * 100;
  };

  const getRiskLevel = (creditScore: number, dti: number, employmentDuration: number) => {
    if (creditScore >= 750 && dti <= 35 && employmentDuration >= 3) return "low";
    if (creditScore >= 650 && dti <= 45 && employmentDuration >= 2) return "medium";
    return "high";
  };

  const getInterestRate = (riskLevel: string, creditScore: number) => {
    const baseRate = 3.85;
    switch (riskLevel) {
      case "low": return baseRate + (750 - creditScore) * 0.01;
      case "medium": return baseRate + (750 - creditScore) * 0.02;
      case "high": return baseRate + (750 - creditScore) * 0.03;
      default: return baseRate;
    }
  };

  const generatePreApproval = async () => {
    setIsProcessing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;
    const monthlyPayment = buyerProfile.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    const dti = calculateDTI(buyerProfile.income, buyerProfile.existingDebts, monthlyPayment);
    const riskLevel = getRiskLevel(buyerProfile.creditScore, dti, buyerProfile.employmentDuration);
    const adjustedInterestRate = getInterestRate(riskLevel, buyerProfile.creditScore);
    
    const result: PreApprovalResult = {
      eligible: dti <= 50 && buyerProfile.creditScore >= 600,
      confidence: Math.min(95, 100 - (dti - 30) * 2 + (buyerProfile.creditScore - 600) * 0.1),
      maxLoanAmount: buyerProfile.income * 4.5,
      recommendedDownPayment: Math.max(buyerProfile.loanAmount * 0.2, 50000),
      monthlyPayment: monthlyPayment,
      interestRate: adjustedInterestRate,
      loanTerm: loanTerm,
      riskLevel: riskLevel,
      approvalTime: riskLevel === "low" ? "24-48 hours" : riskLevel === "medium" ? "3-5 days" : "1-2 weeks",
      requirements: [
        "Valid identification documents",
        "Income verification (3 months payslips)",
        "Bank statements (3 months)",
        "Credit report",
        "Employment verification letter"
      ],
      recommendations: [
        riskLevel === "high" ? "Consider increasing down payment to reduce loan amount" : "Your profile looks good for approval",
        dti > 40 ? "Consider reducing existing debts before applying" : "Your debt-to-income ratio is acceptable",
        buyerProfile.creditScore < 700 ? "Work on improving credit score for better rates" : "Excellent credit score",
        "Ensure all documents are complete and up-to-date"
      ],
      bankSuggestions: mockBanks
        .filter(bank => bank.rating >= 4.0)
        .map(bank => ({
          bank: bank.name,
          logo: bank.logo,
          interestRate: bank.interestRate,
          approvalChance: Math.max(70, 100 - (riskLevel === "low" ? 30 : riskLevel === "medium" ? 15 : 0)),
          specialOffers: [
            "Fast-track approval",
            "Reduced processing fees",
            "Flexible repayment options"
          ],
          processingTime: riskLevel === "low" ? "24-48 hours" : "3-5 days"
        }))
        .slice(0, 3)
    };
    
    setPreApprovalResult(result);
    setIsProcessing(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-200";
      case "medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-200";
      case "high": return "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-200";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Financing Tools
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive financing solutions to help you make informed decisions about your property investment. 
              Calculate mortgages, compare loan options, and explore financing strategies.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="ai-approval" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="ai-approval">AI Pre-Approval 💳</TabsTrigger>
            <TabsTrigger value="calculator">Mortgage Calculator</TabsTrigger>
            <TabsTrigger value="comparison">Loan Comparison</TabsTrigger>
            <TabsTrigger value="strategies">Financing Strategies</TabsTrigger>
            <TabsTrigger value="tools">Additional Tools</TabsTrigger>
          </TabsList>

          {/* Mortgage Calculator Tab */}
          <TabsContent value="calculator" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Inputs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Mortgage Calculator
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Calculate your monthly mortgage payments and total costs
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="propertyPrice">Property Price (RM)</Label>
                      <Input
                        id="propertyPrice"
                        type="number"
                        value={propertyPrice}
                        onChange={(e) => setPropertyPrice(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="downPayment">Down Payment (RM)</Label>
                      <Input
                        id="downPayment"
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {downPaymentPercentage.toFixed(1)}% of property price
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                      <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 years</SelectItem>
                          <SelectItem value="20">20 years</SelectItem>
                          <SelectItem value="25">25 years</SelectItem>
                          <SelectItem value="30">30 years</SelectItem>
                          <SelectItem value="35">35 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="interestRate">Interest Rate (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.01"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Calculator Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Payment Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        RM {monthlyPayment.toFixed(0)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Monthly Payment
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        RM {loanAmount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Loan Amount
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Property Price:</span>
                      <span className="font-medium">RM {propertyPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Down Payment:</span>
                      <span className="font-medium">RM {downPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Loan Amount:</span>
                      <span className="font-medium">RM {loanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Interest Rate:</span>
                      <span className="font-medium">{interestRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Loan Term:</span>
                      <span className="font-medium">{loanTerm} years</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Interest:</span>
                      <span className="text-red-600">RM {totalInterest.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Amount:</span>
                      <span className="text-green-600">RM {totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Loan Comparison Tab */}
          <TabsContent value="comparison" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Bank Loan Comparison
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Compare mortgage offers from different banks to find the best deal
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Bank</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Interest Rate</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Monthly Payment</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Total Interest</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Processing Fee</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Rating</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Features</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loanComparisons.map((loan, index) => (
                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{mockBanks.find(b => b.name === loan.bank)?.logo}</div>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">{loan.bank}</div>
                                <Badge className={getRatingColor(loan.rating)}>
                                  {loan.rating} ★
                                </Badge>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900 dark:text-white">{loan.interestRate}%</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900 dark:text-white">
                              RM {loan.monthlyPayment.toFixed(0)}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900 dark:text-white">
                              RM {loan.totalInterest.toLocaleString()}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-gray-600 dark:text-gray-400">{loan.processingFee}%</div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className={getRatingColor(loan.rating)}>
                              {loan.rating} ★
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              {loan.features.slice(0, 2).map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  {feature}
                                </div>
                              ))}
                              {loan.features.length > 2 && (
                                <div className="text-xs text-blue-600 dark:text-blue-400">
                                  +{loan.features.length - 2} more
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Pre-Approval Tab */}
          <TabsContent value="ai-approval" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Buyer Profile Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Mortgage Pre-Approval 💳
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get instant eligibility check and personalized financing recommendations
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          value={buyerProfile.age}
                          onChange={(e) => setBuyerProfile({...buyerProfile, age: Number(e.target.value)})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="income">Monthly Income (RM)</Label>
                        <Input
                          id="income"
                          type="number"
                          value={buyerProfile.income}
                          onChange={(e) => setBuyerProfile({...buyerProfile, income: Number(e.target.value)})}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="creditScore">Credit Score</Label>
                        <Input
                          id="creditScore"
                          type="number"
                          value={buyerProfile.creditScore}
                          onChange={(e) => setBuyerProfile({...buyerProfile, creditScore: Number(e.target.value)})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="employmentType">Employment Type</Label>
                        <Select value={buyerProfile.employmentType} onValueChange={(value: "full-time" | "part-time" | "self-employed" | "business-owner") => setBuyerProfile({...buyerProfile, employmentType: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="self-employed">Self-employed</SelectItem>
                            <SelectItem value="business-owner">Business Owner</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="employmentDuration">Employment Duration (Years)</Label>
                        <Input
                          id="employmentDuration"
                          type="number"
                          value={buyerProfile.employmentDuration}
                          onChange={(e) => setBuyerProfile({...buyerProfile, employmentDuration: Number(e.target.value)})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="existingDebts">Monthly Debts (RM)</Label>
                        <Input
                          id="existingDebts"
                          type="number"
                          value={buyerProfile.existingDebts}
                          onChange={(e) => setBuyerProfile({...buyerProfile, existingDebts: Number(e.target.value)})}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="downPayment">Down Payment (RM)</Label>
                        <Input
                          id="downPayment"
                          type="number"
                          value={buyerProfile.downPayment}
                          onChange={(e) => setBuyerProfile({...buyerProfile, downPayment: Number(e.target.value)})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="loanAmount">Loan Amount (RM)</Label>
                        <Input
                          id="loanAmount"
                          type="number"
                          value={buyerProfile.loanAmount}
                          onChange={(e) => setBuyerProfile({...buyerProfile, loanAmount: Number(e.target.value)})}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="propertyType">Property Type</Label>
                        <Select value={buyerProfile.propertyType} onValueChange={(value: "residential" | "commercial" | "investment" | "landed") => setBuyerProfile({...buyerProfile, propertyType: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="investment">Investment</SelectItem>
                            <SelectItem value="landed">Landed Property</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="preferredLocation">Preferred Location</Label>
                        <Input
                          id="preferredLocation"
                          value={buyerProfile.preferredLocation}
                          onChange={(e) => setBuyerProfile({...buyerProfile, preferredLocation: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={generatePreApproval} 
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {isProcessing ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          AI Processing...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Get AI Pre-Approval
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Pre-Approval Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    AI Analysis Results
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Instant eligibility check and personalized recommendations
                  </p>
                </CardHeader>
                <CardContent>
                  {!preApprovalResult ? (
                    <div className="text-center py-12">
                      <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">
                        Fill in your profile and click &quot;Get AI Pre-Approval&quot; to see instant results
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Eligibility Status */}
                      <div className={`text-center p-4 rounded-lg ${preApprovalResult.eligible ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          {preApprovalResult.eligible ? (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          ) : (
                            <AlertCircle className="h-6 w-6 text-red-600" />
                          )}
                          <h3 className={`text-lg font-semibold ${preApprovalResult.eligible ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                            {preApprovalResult.eligible ? 'Pre-Approved!' : 'Not Eligible'}
                          </h3>
                        </div>
                        <p className={`text-sm ${preApprovalResult.eligible ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                          AI Confidence: {preApprovalResult.confidence.toFixed(1)}%
                        </p>
                      </div>
                      
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-xl font-bold text-blue-600">
                            RM {preApprovalResult.maxLoanAmount.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Max Loan Amount
                          </div>
                        </div>
                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-xl font-bold text-green-600">
                            {preApprovalResult.interestRate.toFixed(2)}%
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Interest Rate
                          </div>
                        </div>
                      </div>
                      
                      {/* Risk Assessment */}
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Risk Level:</span>
                          <Badge className={getRiskColor(preApprovalResult.riskLevel)}>
                            {preApprovalResult.riskLevel.charAt(0).toUpperCase() + preApprovalResult.riskLevel.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Approval Time:</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{preApprovalResult.approvalTime}</span>
                        </div>
                      </div>
                      
                      {/* Bank Recommendations */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Recommended Banks</h4>
                        <div className="space-y-3">
                          {preApprovalResult.bankSuggestions.map((bank, index) => (
                            <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-xl">{bank.logo}</span>
                                  <span className="font-medium text-gray-900 dark:text-white">{bank.bank}</span>
                                </div>
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                                  {bank.approvalChance}% chance
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-gray-600 dark:text-gray-400">Rate: </span>
                                  <span className="font-medium">{bank.interestRate}%</span>
                                </div>
                                <div>
                                  <span className="text-gray-600 dark:text-gray-400">Processing: </span>
                                  <span className="font-medium">{bank.processingTime}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Requirements and Recommendations */}
            {preApprovalResult && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Required Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {preApprovalResult.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      AI Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {preApprovalResult.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Financing Strategies Tab */}
          <TabsContent value="strategies" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    First-Time Buyers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">MyDeposit Program</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Government initiative to help first-time buyers with down payment
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Lower Interest Rates</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Special rates for first-time property buyers
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Tax Benefits</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Tax relief on mortgage interest payments
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Investment Properties
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Rental Income Coverage</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Use rental income to qualify for larger loans
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Portfolio Loans</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Bundle multiple properties under one loan
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Interest-Only Options</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Lower monthly payments for cash flow management
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Refinancing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Lower Interest Rates</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Reduce monthly payments with better rates
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Cash-Out Options</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Access equity for home improvements or investments
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Shorter Terms</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Pay off mortgage faster with higher payments
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Construction Loans
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Progressive Drawdown</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Funds released as construction progresses
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Interest-Only During Build</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Lower payments during construction phase
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Conversion to Mortgage</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Automatically converts to standard mortgage
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Additional Tools Tab */}
          <TabsContent value="tools" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Percent className="h-5 w-5" />
                    Affordability Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Calculate how much property you can afford based on your income and expenses
                  </p>
                  <Button className="w-full">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Calculate Affordability
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Refinance Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Determine if refinancing makes financial sense for your current mortgage
                  </p>
                  <Button className="w-full">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Calculate Savings
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Amortization Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    View detailed breakdown of principal and interest payments over time
                  </p>
                  <Button className="w-full">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    View Schedule
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Down Payment Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Calculate required down payment and closing costs for your property
                  </p>
                  <Button className="w-full">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Calculate Costs
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Debt-to-Income Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Assess your debt-to-income ratio to determine loan eligibility
                  </p>
                  <Button className="w-full">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Calculate Ratio
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    Investment Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Analyze potential returns on property investment with financing
                  </p>
                  <Button className="w-full">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Analyze Returns
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 