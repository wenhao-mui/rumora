import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Smartphone, Users, Palette, Database, Cloud } from "lucide-react";

export const metadata = {
  title: "Our Services",
  description: "Discover Rumora's comprehensive range of digital services including web development, mobile apps, consulting, and design.",
};

export default function ServicesPage() {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Modern, responsive websites and web applications built with cutting-edge technologies.",
      features: ["React & Next.js", "TypeScript", "Responsive Design", "Performance Optimization"],
      color: "blue"
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android platforms.",
      features: ["React Native", "iOS Development", "Android Development", "App Store Optimization"],
      color: "green"
    },
    {
      icon: Users,
      title: "Technology Consulting",
      description: "Strategic technology consulting to help you make informed decisions.",
      features: ["Architecture Review", "Technology Selection", "Digital Strategy", "Team Augmentation"],
      color: "purple"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive user interfaces and user experience design.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      color: "orange"
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Robust and scalable backend systems and APIs.",
      features: ["Node.js", "Python", "Database Design", "API Development"],
      color: "indigo"
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Cloud infrastructure and deployment solutions for modern applications.",
      features: ["AWS", "Azure", "DevOps", "CI/CD"],
      color: "cyan"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
      green: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
      purple: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
      orange: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400",
      indigo: "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400",
      cyan: "bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400"
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to your business needs. From concept to deployment, 
            we handle every aspect of your digital transformation journey.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`mx-auto w-16 h-16 ${getColorClasses(service.color)} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {service.description}
                  </CardDescription>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Development Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Discovery</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We analyze your requirements and create a detailed project plan.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Design</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We create wireframes and design mockups for your approval.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Development</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our team builds your solution using the latest technologies.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Launch</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We deploy your solution and provide ongoing support.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss your project requirements and how we can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Schedule a Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 