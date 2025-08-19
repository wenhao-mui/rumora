# Rumora - Next.js 14 Website

A production-ready Next.js 14 website built with modern web technologies and best practices.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components for consistent UI
- **Responsive Design** for all devices
- **SEO Optimized** with metadata, sitemap, and robots.txt
- **Performance Optimized** with image and font optimization
- **Testing Setup** with Jest and React Testing Library
- **API Routes** for server-side logic
- **Environment Variables** management

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
- **Package Manager**: npm

## 📁 Project Structure

```
rumora/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── about/          # About page
│   │   ├── services/       # Services page
│   │   ├── contact/        # Contact page
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Homepage
│   │   └── sitemap.ts      # Dynamic sitemap
│   ├── components/         # Reusable components
│   │   ├── ui/            # shadcn/ui components
│   │   └── layout/        # Layout components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
├── .env.local            # Environment variables
├── jest.config.js        # Jest configuration
├── jest.setup.js         # Jest setup
└── package.json          # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rumora
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## 🎨 Components

### UI Components (shadcn/ui)
- **Button** - Various button variants and sizes
- **Card** - Content containers with header, content, and footer
- **Input** - Form input fields
- **Textarea** - Multi-line text input
- **Label** - Form labels
- **Separator** - Visual dividers

### Layout Components
- **Header** - Navigation header with mobile menu
- **Footer** - Site footer with links and information
- **MainLayout** - Wrapper for consistent layout

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# App Configuration
NEXT_PUBLIC_APP_NAME=Rumora
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_DESCRIPTION=Building the future with innovative digital solutions

# API Configuration
API_BASE_URL=http://localhost:3000/api

# Contact Form
CONTACT_EMAIL=hello@rumora.com
CONTACT_PHONE=+1 (555) 123-4567
```

### Tailwind CSS

The project uses Tailwind CSS v4 with the new CSS engine. Configuration is handled automatically by Next.js.

## 🧪 Testing

The project includes a comprehensive testing setup:

- **Jest** as the test runner
- **React Testing Library** for component testing
- **jsdom** for DOM simulation
- **Coverage reporting** for test coverage

Run tests:
```bash
npm run test
```

## 📱 Pages

- **Home** (`/`) - Landing page with hero section and services overview
- **About** (`/about`) - Company information, mission, and team
- **Services** (`/services`) - Detailed service offerings and process
- **Contact** (`/contact`) - Contact form and company information

## 🔌 API Routes

- `GET /api/hello` - Sample API endpoint
- `POST /api/contact` - Contact form submission handler

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## 📊 Performance

The project includes several performance optimizations:

- **Image Optimization** with `next/image`
- **Font Optimization** with `next/font`
- **Dynamic Imports** for code splitting
- **SEO Best Practices** for better search engine visibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email hello@rumora.com or create an issue in the repository.

---

Built with ❤️ by the Rumora team
