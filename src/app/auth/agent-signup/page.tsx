"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Building, Award } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AgentSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    licenseNumber: "",
    experience: "",
    specialization: "",
    location: "",
    bio: "",
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement actual agent registration logic with API call
    console.log('Agent registration data:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate successful registration
      // In real implementation, this would check the API response
      if (formData.firstName && formData.lastName && formData.email && formData.password && formData.licenseNumber) {
        // Store authentication token/user data in localStorage/session
        localStorage.setItem('userType', 'agent');
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userName', `${formData.firstName} ${formData.lastName}`);
        localStorage.setItem('agentId', 'agent456'); // Simulate agent ID
        localStorage.setItem('companyName', formData.companyName);
        
        // Redirect to agent profile page
        router.push('/agent/profile');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-gray-900 dark:text-white">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span>Rumora Properties</span>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Join our network of trusted property agents</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">Become a Property Agent</CardTitle>
            <CardDescription>
              Join our platform to list properties, connect with buyers, and grow your business
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+60 12-345 6789"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                  Professional Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName" className="text-sm font-medium">
                      Company Name
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="companyName"
                        name="companyName"
                        type="text"
                        placeholder="ABC Real Estate"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="pl-10"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="licenseNumber" className="text-sm font-medium">
                      License Number
                    </Label>
                    <div className="relative">
                      <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="licenseNumber"
                        name="licenseNumber"
                        type="text"
                        placeholder="REA123456"
                        value={formData.licenseNumber}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experience" className="text-sm font-medium">
                      Years of Experience
                    </Label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                      className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100"
                      required
                      disabled={isLoading}
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="specialization" className="text-sm font-medium">
                      Specialization
                    </Label>
                    <select
                      id="specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                      className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100"
                      disabled={isLoading}
                    >
                      <option value="">Select specialization</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="industrial">Industrial</option>
                      <option value="land">Land</option>
                      <option value="luxury">Luxury</option>
                      <option value="investment">Investment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="text-sm font-medium">
                    Service Area
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="Kuala Lumpur, Selangor, Petaling Jaya"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="text-sm font-medium">
                    Professional Bio
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us about your experience, achievements, and what makes you unique as a property agent..."
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="resize-none"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Account Security Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                  Account Security
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        placeholder="Create a strong password"
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
                  <div>
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10 pr-10"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  required
                  disabled={isLoading}
                />
                <Label htmlFor="agreeToTerms" className="text-sm text-gray-600 dark:text-gray-400">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
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
                    Creating Agent Account...
                  </>
                ) : (
                  "Create Agent Account"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Already have an account?</span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <Link 
                href="/auth/agent-signin" 
                className="text-primary hover:underline font-medium"
              >
                Sign in to your agent account
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          <p>By signing up, you agree to our terms and conditions</p>
        </div>
      </div>
    </div>
  );
} 