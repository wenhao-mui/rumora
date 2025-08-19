"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { 
  Calculator, 
  DollarSign, 
  Percent, 
  Calendar,
  TrendingUp,
  Info,
  RefreshCw
} from "lucide-react";

interface MortgageCalculatorProps {
  propertyPrice: number;
}

interface MortgageResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  downPayment: number;
  loanAmount: number;
  amortizationSchedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    remainingBalance: number;
  }>;
}

export function MortgageCalculator({ propertyPrice }: MortgageCalculatorProps) {
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTenure, setLoanTenure] = useState(30);
  const [isExpanded, setIsExpanded] = useState(false);

  const mortgageResult = useMemo((): MortgageResult => {
    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const loanAmount = propertyPrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayments = loanTenure * 12;

    // Calculate monthly payment using standard loan amortization formula
    const monthlyPayment = loanAmount * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) /
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

    const totalPayment = monthlyPayment * totalPayments;
    const totalInterest = totalPayment - loanAmount;

    // Generate amortization schedule (first 12 months + last 12 months)
    const amortizationSchedule: Array<{
      month: number;
      payment: number;
      principal: number;
      interest: number;
      remainingBalance: number;
    }> = [];

    let remainingBalance = loanAmount;
    
    // First 12 months
    for (let month = 1; month <= Math.min(12, totalPayments); month++) {
      const interest = remainingBalance * monthlyInterestRate;
      const principal = monthlyPayment - interest;
      remainingBalance -= principal;
      
      amortizationSchedule.push({
        month,
        payment: monthlyPayment,
        principal,
        interest,
        remainingBalance: Math.max(0, remainingBalance)
      });
    }

    // Add middle months if loan is longer than 24 months
    if (totalPayments > 24) {
      const middleMonth = Math.floor(totalPayments / 2);
      const middleInterest = remainingBalance * monthlyInterestRate;
      const middlePrincipal = monthlyPayment - middleInterest;
      const middleRemaining = remainingBalance - middlePrincipal;
      
      amortizationSchedule.push({
        month: middleMonth,
        payment: monthlyPayment,
        principal: middlePrincipal,
        interest: middleInterest,
        remainingBalance: Math.max(0, middleRemaining)
      });
    }

    // Last 12 months
    if (totalPayments > 12) {
      remainingBalance = loanAmount;
      for (let month = 1; month <= totalPayments; month++) {
        const interest = remainingBalance * monthlyInterestRate;
        const principal = monthlyPayment - interest;
        remainingBalance -= principal;
        
        if (month > totalPayments - 12) {
          amortizationSchedule.push({
            month,
            payment: monthlyPayment,
            principal,
            interest,
            remainingBalance: Math.max(0, remainingBalance)
          });
        }
      }
    }

    return {
      monthlyPayment,
      totalInterest,
      totalPayment,
      downPayment,
      loanAmount,
      amortizationSchedule: amortizationSchedule.sort((a, b) => a.month - b.month)
    };
  }, [propertyPrice, downPaymentPercent, interestRate, loanTenure]);

  const formatCurrency = (amount: number) => {
    return `RM ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const resetCalculator = () => {
    setDownPaymentPercent(20);
    setInterestRate(4.5);
    setLoanTenure(30);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mortgage Calculator
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="property-price" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Property Price
              </Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="property-price"
                  type="number"
                  value={propertyPrice}
                  disabled
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="down-payment" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Down Payment ({downPaymentPercent}%)
              </Label>
              <div className="mt-1">
                <Input
                  id="down-payment"
                  type="range"
                  min="10"
                  max="90"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10%</span>
                  <span>50%</span>
                  <span>90%</span>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Amount: {formatCurrency(mortgageResult.downPayment)}
              </div>
            </div>

            <div>
              <Label htmlFor="interest-rate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Interest Rate (Annual)
              </Label>
              <div className="relative mt-1">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="interest-rate"
                  type="number"
                  min="1"
                  max="15"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="loan-tenure" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Loan Tenure (Years)
              </Label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="loan-tenure"
                  type="number"
                  min="5"
                  max="35"
                  step="5"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="pl-10"
                />
              </div>
            </div>

            <Button onClick={resetCalculator} variant="outline" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Calculator
            </Button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                Monthly Payment
              </h3>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                {formatCurrency(mortgageResult.monthlyPayment)}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                per month for {loanTenure} years
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Loan Amount
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(mortgageResult.loanAmount)}
                </div>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Total Interest
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(mortgageResult.totalInterest)}
                </div>
              </div>
            </div>

            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-sm text-green-600 dark:text-green-400 mb-1">
                Total Payment
              </div>
              <div className="text-xl font-semibold text-green-900 dark:text-green-100">
                {formatCurrency(mortgageResult.totalPayment)}
              </div>
            </div>

            {/* Key Insights */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Info className="h-4 w-4" />
                <span>Key Insights</span>
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <div>• Down payment: {formatPercent(downPaymentPercent)} of property value</div>
                <div>• Interest rate: {formatPercent(interestRate)} annually</div>
                <div>• Total payments: {loanTenure * 12} monthly installments</div>
                <div>• Interest portion: {formatPercent((mortgageResult.totalInterest / mortgageResult.totalPayment) * 100)} of total payment</div>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Amortization Schedule */}
        <div className="mt-8">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full justify-between"
          >
            <span>View Amortization Schedule</span>
            <TrendingUp className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </Button>

          {isExpanded && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Amortization Schedule
              </h4>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 px-2">Month</th>
                      <th className="text-right py-2 px-2">Payment</th>
                      <th className="text-right py-2 px-2">Principal</th>
                      <th className="text-right py-2 px-2">Interest</th>
                      <th className="text-right py-2 px-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mortgageResult.amortizationSchedule.map((row) => (
                      <tr key={row.month} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-2 px-2 font-medium">{row.month}</td>
                        <td className="py-2 px-2 text-right">{formatCurrency(row.payment)}</td>
                        <td className="py-2 px-2 text-right text-green-600 dark:text-green-400">
                          {formatCurrency(row.principal)}
                        </td>
                        <td className="py-2 px-2 text-right text-red-600 dark:text-red-400">
                          {formatCurrency(row.interest)}
                        </td>
                        <td className="py-2 px-2 text-right">{formatCurrency(row.remainingBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                Showing key months: first 12, middle, and last 12 months of the loan term
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-yellow-600 mt-0.5" />
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              <strong>Disclaimer:</strong> This calculator provides estimates only. Actual mortgage terms, 
              rates, and payments may vary based on lender requirements, credit score, and other factors. 
              Consult with a mortgage professional for accurate calculations.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 