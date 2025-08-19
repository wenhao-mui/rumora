import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Award, Globe } from "lucide-react";

export const metadata = {
  title: "About Us",
  description: "Learn about Rumora's mission, values, and the team behind our innovative digital solutions.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Rumora
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We are a team of passionate technologists, designers, and strategists dedicated to transforming businesses through innovative digital solutions.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="h-6 w-6 text-blue-600" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                To empower businesses with cutting-edge digital solutions that drive growth, 
                enhance user experiences, and create lasting competitive advantages in the digital landscape.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-green-600" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                To be the leading digital transformation partner for businesses worldwide, 
                known for innovation, quality, and measurable business impact.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We strive for excellence in everything we do, from code quality to user experience design.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We believe in the power of teamwork and close collaboration with our clients.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We constantly explore new technologies and approaches to solve complex challenges.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
                <CardTitle>John Doe</CardTitle>
                <CardDescription>CEO & Founder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Visionary leader with 15+ years of experience in digital transformation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
                <CardTitle>Jane Smith</CardTitle>
                <CardDescription>CTO</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Technology expert specializing in scalable architecture and emerging technologies.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
                <CardTitle>Mike Johnson</CardTitle>
                <CardDescription>Head of Design</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Creative director focused on user-centered design and brand experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 