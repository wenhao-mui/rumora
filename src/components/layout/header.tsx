"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, User, Building, ChevronDown } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleAuthDropdown = () => setIsAuthDropdownOpen(!isAuthDropdownOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Rumora Properties</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
          <Link href="/properties" className="text-sm font-medium transition-colors hover:text-primary">
            Properties
          </Link>
          <Link href="/services" className="text-sm font-medium transition-colors hover:text-primary">
            Services
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Auth Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={toggleAuthDropdown}
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>Sign In</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isAuthDropdownOpen ? 'rotate-180' : ''}`} />
            </Button>
            
            {isAuthDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Property Seekers</p>
                </div>
                <Link
                  href="/auth/signin"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setIsAuthDropdownOpen(false)}
                >
                  <User className="h-4 w-4 inline mr-2" />
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setIsAuthDropdownOpen(false)}
                >
                  <User className="h-4 w-4 inline mr-2" />
                  Create Account
                </Link>
                
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 mt-2">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Property Agents</p>
                </div>
                <Link
                  href="/auth/agent-signin"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setIsAuthDropdownOpen(false)}
                >
                  <Building className="h-4 w-4 inline mr-2" />
                  Agent Sign In
                </Link>
                <Link
                  href="/auth/agent-signup"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setIsAuthDropdownOpen(false)}
                >
                  <Building className="h-4 w-4 inline mr-2" />
                  Become an Agent
                </Link>
              </div>
            )}
          </div>
          
          <Button>List Property</Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/properties" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link 
                href="/services" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/contact" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
            
            {/* Mobile Auth Section */}
            <div className="pt-4 border-t space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Property Seekers</p>
                <div className="space-y-2">
                  <Link
                    href="/auth/signin"
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 inline mr-2" />
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 inline mr-2" />
                    Create Account
                  </Link>
                </div>
              </div>
              
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Property Agents</p>
                <div className="space-y-2">
                  <Link
                    href="/auth/agent-signin"
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Building className="h-4 w-4 inline mr-2" />
                    Agent Sign In
                  </Link>
                  <Link
                    href="/auth/agent-signup"
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Building className="h-4 w-4 inline mr-2" />
                    Become an Agent
                  </Link>
                </div>
              </div>
              
              <div className="pt-2">
                <Button className="w-full">List Property</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Click outside to close dropdown */}
      {isAuthDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsAuthDropdownOpen(false)}
        />
      )}
    </header>
  )
} 