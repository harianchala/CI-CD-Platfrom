"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthModal } from "@/components/auth-modal"
import {
  Rocket,
  Shield,
  Zap,
  GitBranch,
  Container,
  Activity,
  CheckCircle,
  ArrowRight,
  Play,
  Users,
  Lock,
} from "lucide-react"

export function LandingPage() {
  const [authModal, setAuthModal] = useState<"signin" | "signup" | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DevFlow
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" onClick={() => setAuthModal("signin")}>
              Sign In
            </Button>
            <Button
              onClick={() => setAuthModal("signup")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 animate-pulse">
            <Zap className="w-3 h-3 mr-1" />
            Next-Gen CI/CD Platform
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent animate-fade-in">
            Ship Faster with
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Intelligent CI/CD
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Automate your microservices deployment with advanced strategies like blue-green and canary deployments.
            Built for modern development teams who demand reliability and speed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              onClick={() => setAuthModal("signup")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 h-auto group"
            >
              Start Building
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto group bg-transparent">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">50%</div>
              <div className="text-sm text-muted-foreground">Faster Deployments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">10k+</div>
              <div className="text-sm text-muted-foreground">Deployments Daily</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need for modern deployment</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From automated testing to advanced deployment strategies, we've got your entire CI/CD pipeline covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GitBranch className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Automated Pipelines</CardTitle>
                <CardDescription>
                  Set up complex CI/CD workflows with visual pipeline builder and automatic triggers.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Container className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Smart Containerization</CardTitle>
                <CardDescription>
                  Automatic Docker optimization and multi-architecture builds for efficient deployments.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Advanced Strategies</CardTitle>
                <CardDescription>
                  Blue-green, canary, and rolling deployments with automatic rollback capabilities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Real-time Monitoring</CardTitle>
                <CardDescription>
                  Comprehensive logging, metrics, and alerting for all your deployments.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Lock className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Security First</CardTitle>
                <CardDescription>
                  Built-in security scanning, secrets management, and compliance reporting.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Role-based access, approval workflows, and integrated team communication.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why teams choose DevFlow</h2>
          </div>

          <div className="space-y-8">
            {[
              "Reduce deployment time by 50% with intelligent automation",
              "Zero-downtime deployments with advanced rollback strategies",
              "Comprehensive security scanning and compliance reporting",
              "Real-time collaboration tools for distributed teams",
              "Enterprise-grade monitoring and alerting",
              "Seamless integration with existing development workflows",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-4 group">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your deployment process?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who trust DevFlow for their CI/CD needs.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => setAuthModal("signup")}
            className="text-lg px-8 py-6 h-auto bg-white text-blue-600 hover:bg-gray-100"
          >
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DevFlow
            </span>
          </div>
          <p className="text-muted-foreground">© 2024 DevFlow. Built for modern development teams.</p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal mode={authModal} onClose={() => setAuthModal(null)} />
    </div>
  )
}
