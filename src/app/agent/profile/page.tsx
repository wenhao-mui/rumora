"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  Edit, 
  Save, 
  X,
  Bell,
  Shield,
  LogOut,
  Plus,
  Eye,
  MessageSquare
} from "lucide-react";
import { Property } from "@/types/property";

export default function AgentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@rumora.com",
    phone: "+60 12-345 6789",
    companyName: "ABC Real Estate",
    licenseNumber: "REA123456",
    experience: "5-10",
    specialization: "residential",
    location: "Kuala Lumpur, Selangor, Petaling Jaya",
    bio: "Experienced property agent specializing in residential properties across Kuala Lumpur and Selangor. Committed to finding the perfect home for every client.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  });

  const [propertyListings] = useState<Property[]>([
    {
      id: "1",
      title: "Luxury Condo for Sale in Mont Kiara",
      description: "Beautiful 3-bedroom condo with city view, modern amenities, and excellent location.",
      price: 2500000,
      priceType: "sale",
      location: {
        neighborhood: "Mont Kiara",
        city: "Kuala Lumpur",
        state: "Selangor",
        coordinates: { lat: 3.1390, lng: 101.6869 }
      },
      propertyType: "condo",
      size: { sqft: 1500, sqm: 139 },
      bedrooms: 3,
      bathrooms: 2,
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
      ],
      features: ["newly-renovated", "freehold", "high-floor", "city-view"],
      agent: {
        id: "agent1",
        name: "Sarah Johnson",
        phone: "+60123456789",
        whatsapp: "+60123456789",
        email: "sarah.johnson@rumora.com",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
      },
      status: "active",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z"
    }
  ]);

  const [stats] = useState({
    totalProperties: 12,
    activeListings: 8,
    totalViews: 1247,
    totalInquiries: 23,
    responseRate: "98%",
    avgResponseTime: "2.3 hours"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Implement save logic
    console.log('Saving agent profile:', profileData);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'listings', label: 'My Listings', icon: Home },
    { id: 'clients', label: 'Client Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Agent Dashboard</h1>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
              <Button variant="outline" onClick={() => console.log('Logout')}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                {/* Profile Summary */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4">
                    <img
                      src={profileData.avatar}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{profileData.companyName}</p>
                  <Badge variant="secondary" className="mt-2">Verified Agent</Badge>
                  <Badge className="mt-1 bg-green-100 text-green-800">Active</Badge>
                </div>

                {/* Quick Stats */}
                <div className="space-y-3 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Properties</span>
                    <span className="font-semibold">{stats.totalProperties}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Active</span>
                    <span className="font-semibold text-green-600">{stats.activeListings}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Response Rate</span>
                    <span className="font-semibold text-blue-600">{stats.responseRate}</span>
                  </div>
                </div>

                {/* Navigation Tabs */}
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Professional Profile</CardTitle>
                    <CardDescription>Manage your agent profile and professional information</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="companyName" className="text-sm font-medium">
                        Company Name
                      </Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={profileData.companyName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="licenseNumber" className="text-sm font-medium">
                        License Number
                      </Label>
                      <Input
                        id="licenseNumber"
                        name="licenseNumber"
                        value={profileData.licenseNumber}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience" className="text-sm font-medium">
                        Years of Experience
                      </Label>
                      <select
                        id="experience"
                        name="experience"
                        value={profileData.experience}
                        onChange={(e) => setProfileData(prev => ({ ...prev, experience: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100"
                      >
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
                        value={profileData.specialization}
                        onChange={(e) => setProfileData(prev => ({ ...prev, specialization: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100"
                      >
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="industrial">Industrial</option>
                        <option value="land">Land</option>
                        <option value="luxury">Luxury</option>
                        <option value="investment">Investment</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="location" className="text-sm font-medium">
                        Service Area
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        value={profileData.location}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="bio" className="text-sm font-medium">
                        Professional Bio
                      </Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={4}
                        className="mt-1 resize-none"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* My Listings Tab */}
            {activeTab === 'listings' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        My Property Listings
                      </CardTitle>
                      <CardDescription>
                        Manage your property listings and track their performance
                      </CardDescription>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Property
                    </Button>
                  </CardHeader>
                </Card>

                {propertyListings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {propertyListings.map((property) => (
                      <Card key={property.id} className="overflow-hidden">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                            {property.title}
                          </h3>
                          <div className="flex items-center justify-between mb-3">
                            <Badge className="bg-primary text-primary-foreground">
                              RM {property.price.toLocaleString()}
                            </Badge>
                            <Badge variant="outline">{property.status}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <span>{property.bedrooms} bed</span>
                            <span>{property.bathrooms} bath</span>
                            <span>{property.size.sqft.toLocaleString()} sqft</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => window.open(`/properties/${property.id}`, '_blank')}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No properties listed yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Start by adding your first property listing
                      </p>
                      <Button>Add Property</Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Client Management Tab */}
            {activeTab === 'clients' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Client Management
                  </CardTitle>
                  <CardDescription>
                    Manage your client relationships and track inquiries
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalInquiries}</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Total Inquiries</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.responseRate}</h4>
                      <p className="text-sm text-green-600 dark:text-green-400">Response Rate</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <h4 className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.avgResponseTime}</h4>
                      <p className="text-sm text-purple-600 dark:text-purple-400">Avg Response Time</p>
                    </div>
                  </div>
                  
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Client management features coming soon
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Track client interactions, manage leads, and build relationships
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Performance Analytics
                  </CardTitle>
                  <CardDescription>
                    Track your performance metrics and property views
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-medium mb-2">Property Views</h4>
                      <p className="text-2xl font-bold text-primary">{stats.totalViews.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total views this month</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-medium mb-2">Active Listings</h4>
                      <p className="text-2xl font-bold text-green-600">{stats.activeListings}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Currently active</p>
                    </div>
                  </div>
                  
                  <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Advanced analytics coming soon
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Detailed performance insights, trends, and optimization recommendations
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notifications
                    </CardTitle>
                    <CardDescription>Manage your notification preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">New Inquiry Notifications</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified of new client inquiries</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Property View Updates</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Track property performance</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Account Security
                    </CardTitle>
                    <CardDescription>Manage your account security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      API Access Keys
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Agent Settings</CardTitle>
                    <CardDescription>Manage your agent-specific settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      Commission Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Service Areas
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Availability Schedule
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 