"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, Building } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AgentSignin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement actual agent signin logic with API call
    console.log('Agent signin data:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate successful authentication
      // In real implementation, this would check the API response
      if (formData.email && formData.password) {
        // Store authentication token/user data in localStorage/session
        localStorage.setItem('userType', 'agent');
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('agentId', 'agent123'); // Simulate agent ID
        
        // Redirect to agent profile page
        router.push('/agent/profile');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-gray-900 dark:text-white">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span>Rumora Properties</span>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Agent Portal - Access your dashboard</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <Building className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold">Agent Sign In</CardTitle>
            <CardDescription>
              Access your property listings, client management, and analytics
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="agent@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    disabled={isLoading}
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-600 dark:text-gray-400">
                    Remember me
                  </Label>
                </div>
                <Link 
                  href="/auth/agent-forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-3 text-lg font-medium bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  "Access Agent Dashboard"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Don't have an agent account?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center space-y-3">
              <Link 
                href="/auth/agent-signup" 
                className="text-primary hover:underline font-medium block"
              >
                Apply to become an agent
              </Link>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Are you a property seeker?{" "}
                <Link href="/auth/signin" className="text-primary hover:underline">
                  Sign in here
                </Link>
              </div>
            </div>

            {/* Agent Benefits */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-green-800 dark:text-green-200 text-sm">
                Agent Benefits:
              </h4>
              <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
                <li>• List unlimited properties</li>
                <li>• Access to buyer leads</li>
                <li>• Advanced analytics dashboard</li>
                <li>• Professional marketing tools</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          <p>By signing in, you agree to our agent terms and conditions</p>
        </div>
      </div>
    </div>
  );
} 