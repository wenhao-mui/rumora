"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Facebook, 
  Chrome,
  ArrowLeft,
  CheckCircle
} from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      if (email && password) {
        // Store user data in localStorage (simulating session)
        const userData = {
          id: "user-123",
          email: email,
          name: "John Doe",
          type: "public",
          isLoggedIn: true,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem("user", JSON.stringify(userData));
        
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/profile");
        }, 1500);
      } else {
        setError("Please fill in all fields");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Simulate social login
    console.log(`${provider} login clicked`);
    // In a real app, this would redirect to OAuth provider
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Redirecting to your profile...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Sign in to your account to continue
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="mb-6">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Forgot Password */}
            <div className="text-center mt-4">
              <Link 
                href="/auth/forgot-password" 
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot your password?
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Social Login */}
        <Card>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg">Or continue with</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Facebook Login */}
            <Button 
              variant="outline" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
              onClick={() => handleSocialLogin("Facebook")}
            >
              <Facebook className="h-4 w-4 mr-2" />
              Continue with Facebook
            </Button>

            {/* Google Login */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleSocialLogin("Google")}
            >
              <Chrome className="h-4 w-4 mr-2" />
              Continue with Google
            </Button>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <Link 
              href="/auth/signup" 
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Sign up here
            </Link>
          </p>
        </div>

        {/* Agent Login Link */}
        <div className="text-center mt-4">
          <Separator className="my-4" />
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Are you a property agent?{" "}
            <Link 
              href="/auth/agent-signin" 
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Sign in to agent portal
            </Link>
          </p>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Secure Login</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Quick Access</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-2">
              <CheckCircle className="h-4 w-4 text-purple-600" />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
} 