"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  Star,
  Award,
  Calendar,
  MapPin,
  ExternalLink
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  avatar: string;
}

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  // Mock agent data for demonstration
  const agentStats = {
    propertiesListed: 45,
    yearsExperience: 8,
    responseTime: '2 hours',
    rating: 4.8,
    totalReviews: 127,
    specializations: ['Residential', 'Investment', 'Luxury']
  };

  const handleContact = (type: 'whatsapp' | 'call' | 'email') => {
    switch (type) {
      case 'whatsapp':
        window.open(`https://wa.me/${agent.whatsapp}?text=Hi ${agent.name}, I'm interested in a property`, '_blank');
        break;
      case 'call':
        window.open(`tel:${agent.phone}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:${agent.email}?subject=Property Inquiry`, '_blank');
        break;
    }
  };

  const viewAgentProfile = () => {
    // TODO: Navigate to agent profile page
    console.log('View agent profile:', agent.id);
  };

  return (
    <Card>
      <CardContent className="p-6">
        {/* Agent Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-900/30">
            {agent.avatar ? (
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
                {agent.name.charAt(0)}
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {agent.name}
          </h3>
          
          <div className="flex items-center justify-center gap-1 mb-2">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {agentStats.rating}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({agentStats.totalReviews} reviews)
            </span>
          </div>

          <Badge variant="secondary" className="mb-3">
            <Award className="h-3 w-3 mr-1" />
            {agentStats.yearsExperience} Years Experience
          </Badge>
        </div>

        {/* Agent Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {agentStats.propertiesListed}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Properties Listed
            </div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {agentStats.responseTime}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Avg Response
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Specializations
          </h4>
          <div className="flex flex-wrap gap-2">
            {agentStats.specializations.map((specialization, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {specialization}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Contact Buttons */}
        <div className="space-y-3 mb-6">
          <Button 
            className="w-full" 
            onClick={() => handleContact('whatsapp')}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleContact('call')}
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Now
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleContact('email')}
          >
            <Mail className="h-4 w-4 mr-2" />
            Send Email
          </Button>
        </div>

        {/* View Profile */}
        <Button 
          variant="ghost" 
          className="w-full"
          onClick={viewAgentProfile}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View Full Profile
        </Button>

        {/* Agent Info */}
        <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                Agent Location
              </h4>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Kuala Lumpur, Malaysia
              </p>
            </div>
          </div>
        </div>

        {/* Response Time Info */}
        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-green-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
                Response Time
              </h4>
              <p className="text-xs text-green-700 dark:text-green-300">
                Usually responds within {agentStats.responseTime}
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-4 text-center">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Verified Agent</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Licensed</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 