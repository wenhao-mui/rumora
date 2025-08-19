"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User, Facebook, Chrome } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PublicUserSignin() {
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
    
    // TODO: Implement actual signin logic with API call
    console.log('Signin data:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate successful authentication
      // In real implementation, this would check the API response
      if (formData.email && formData.password) {
        // Store authentication token/user data in localStorage/session
        localStorage.setItem('userType', 'public');
        localStorage.setItem('userEmail', formData.email);
        
        // Redirect to user profile page
        router.push('/profile');
      }
    }, 2000);
  };

  const handleSocialLogin = (provider: 'facebook' | 'google') => {
    // TODO: Implement social login
    console.log(`Signing in with ${provider}`);
    
    // Simulate successful social login
    setTimeout(() => {
      localStorage.setItem('userType', 'public');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      
      // Redirect to user profile page
      router.push('/profile');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-gray-900 dark:text-white">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span>Rumora Properties</span>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back! Sign in to your account</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Access your saved properties, preferences, and more
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full py-3 border-2 hover:bg-blue-50 hover:border-blue-300"
                onClick={() => handleSocialLogin('facebook')}
                disabled={isLoading}
              >
                <Facebook className="h-5 w-5 mr-3 text-blue-600" />
                Continue with Facebook
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full py-3 border-2 hover:bg-red-50 hover:border-red-300"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
              >
                <Chrome className="h-5 w-5 mr-3 text-red-600" />
                Continue with Google
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with email</span>
              </div>
            </div>

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
                    placeholder="john@example.com"
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
                  href="/auth/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-3 text-lg font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Don't have an account?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center space-y-3">
              <Link 
                href="/auth/signup" 
                className="text-primary hover:underline font-medium block"
              >
                Create a new account
              </Link>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Are you a property agent?{" "}
                <Link href="/auth/agent-signin" className="text-primary hover:underline">
                  Sign in here
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          <p>By signing in, you agree to our terms and conditions</p>
        </div>
      </div>
    </div>
  );
} 