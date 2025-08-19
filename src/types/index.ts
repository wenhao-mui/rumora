export interface MetaData {
  title: string
  description: string
  keywords?: string[]
  openGraph?: {
    title: string
    description: string
    url: string
    siteName: string
    images?: Array<{
      url: string
      width: number
      height: number
      alt: string
    }>
    locale: string
    type: string
  }
  twitter?: {
    card: string
    title: string
    description: string
    images?: string[]
  }
}

export interface NavigationItem {
  title: string
  href: string
  description?: string
  children?: NavigationItem[]
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
} 