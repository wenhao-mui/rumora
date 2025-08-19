import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold">Rumora Properties</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted partner in finding the perfect property. We connect buyers, sellers, and agents 
              to create successful real estate transactions across Malaysia.
            </p>
            <div className="flex space-x-4">
              <Badge variant="secondary" className="bg-blue-600 hover:bg-blue-700">
                Licensed
              </Badge>
              <Badge variant="secondary" className="bg-green-600 hover:bg-green-700">
                Trusted
              </Badge>
              <Badge variant="secondary" className="bg-purple-600 hover:bg-purple-700">
                Professional
              </Badge>
            </div>
          </div>

          {/* Property Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Property Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties" className="text-gray-300 hover:text-white transition-colors">
                  Property Search
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-gray-300 hover:text-white transition-colors">
                  Find Agents
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="text-gray-300 hover:text-white transition-colors">
                  User Sign In
                </Link>
              </li>
              <li>
                <Link href="/auth/agent-signin" className="text-gray-300 hover:text-white transition-colors">
                  Agent Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-300">
              <p>📍 Kuala Lumpur, Malaysia</p>
              <p>📞 +60 3-1234 5678</p>
              <p>✉️ info@rumora.com</p>
              <p>🕒 Mon-Fri: 9AM-6PM</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2024 Rumora Properties. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 