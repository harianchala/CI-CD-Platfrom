"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Search,
  BookOpen,
  Play,
  Rocket,
  GitBranch,
  Shield,
  Users,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Download,
  Video,
  FileText,
  Lightbulb,
  AlertCircle,
} from "lucide-react"

export function UserManual() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState("getting-started")

  const manualSections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Play,
      description: "Learn the basics of DevFlow CI/CD platform",
      articles: [
        {
          id: "quick-start",
          title: "Quick Start Guide",
          description: "Get up and running in 5 minutes",
          type: "guide",
          readTime: "5 min",
          difficulty: "Beginner",
        },
        {
          id: "first-project",
          title: "Creating Your First Project",
          description: "Step-by-step project setup",
          type: "tutorial",
          readTime: "10 min",
          difficulty: "Beginner",
        },
        {
          id: "dashboard-overview",
          title: "Dashboard Overview",
          description: "Understanding the main interface",
          type: "guide",
          readTime: "8 min",
          difficulty: "Beginner",
        },
      ],
    },
    {
      id: "pipelines",
      title: "CI/CD Pipelines",
      icon: GitBranch,
      description: "Master pipeline creation and management",
      articles: [
        {
          id: "pipeline-builder",
          title: "Using the Pipeline Builder",
          description: "Visual pipeline configuration",
          type: "tutorial",
          readTime: "15 min",
          difficulty: "Intermediate",
        },
        {
          id: "pipeline-steps",
          title: "Understanding Pipeline Steps",
          description: "Build, test, security, and deploy steps",
          type: "guide",
          readTime: "12 min",
          difficulty: "Intermediate",
        },
        {
          id: "pipeline-triggers",
          title: "Configuring Pipeline Triggers",
          description: "Automatic and manual triggers",
          type: "guide",
          readTime: "8 min",
          difficulty: "Intermediate",
        },
      ],
    },
    {
      id: "deployments",
      title: "Deployment Strategies",
      icon: Rocket,
      description: "Advanced deployment patterns and best practices",
      articles: [
        {
          id: "blue-green",
          title: "Blue-Green Deployments",
          description: "Zero-downtime deployment strategy",
          type: "guide",
          readTime: "20 min",
          difficulty: "Advanced",
        },
        {
          id: "canary",
          title: "Canary Releases",
          description: "Gradual rollout with risk mitigation",
          type: "guide",
          readTime: "18 min",
          difficulty: "Advanced",
        },
        {
          id: "rolling",
          title: "Rolling Updates",
          description: "Sequential instance updates",
          type: "guide",
          readTime: "15 min",
          difficulty: "Intermediate",
        },
      ],
    },
    {
      id: "security",
      title: "Security & Compliance",
      icon: Shield,
      description: "Security scanning and compliance features",
      articles: [
        {
          id: "security-scanning",
          title: "Security Scanning Setup",
          description: "Automated vulnerability detection",
          type: "guide",
          readTime: "12 min",
          difficulty: "Intermediate",
        },
        {
          id: "secrets-management",
          title: "Secrets Management",
          description: "Secure handling of sensitive data",
          type: "guide",
          readTime: "10 min",
          difficulty: "Intermediate",
        },
        {
          id: "compliance",
          title: "Compliance Reporting",
          description: "Audit trails and compliance features",
          type: "guide",
          readTime: "15 min",
          difficulty: "Advanced",
        },
      ],
    },
    {
      id: "team-management",
      title: "Team Management",
      icon: Users,
      description: "User roles, permissions, and collaboration",
      articles: [
        {
          id: "user-roles",
          title: "User Roles and Permissions",
          description: "Managing team access levels",
          type: "guide",
          readTime: "8 min",
          difficulty: "Beginner",
        },
        {
          id: "collaboration",
          title: "Team Collaboration Features",
          description: "Working together on deployments",
          type: "guide",
          readTime: "10 min",
          difficulty: "Intermediate",
        },
        {
          id: "approval-workflows",
          title: "Approval Workflows",
          description: "Setting up deployment approvals",
          type: "tutorial",
          readTime: "12 min",
          difficulty: "Intermediate",
        },
      ],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: HelpCircle,
      description: "Common issues and solutions",
      articles: [
        {
          id: "common-errors",
          title: "Common Pipeline Errors",
          description: "Debugging failed deployments",
          type: "reference",
          readTime: "5 min",
          difficulty: "Beginner",
        },
        {
          id: "performance",
          title: "Performance Optimization",
          description: "Speeding up your pipelines",
          type: "guide",
          readTime: "15 min",
          difficulty: "Advanced",
        },
        {
          id: "monitoring",
          title: "Monitoring and Alerting",
          description: "Setting up effective monitoring",
          type: "guide",
          readTime: "12 min",
          difficulty: "Intermediate",
        },
      ],
    },
  ]

  const quickActions = [
    {
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      icon: Video,
      action: "Watch Videos",
      color: "bg-red-100 text-red-600 dark:bg-red-900/30",
    },
    {
      title: "API Documentation",
      description: "Complete API reference and examples",
      icon: FileText,
      action: "View API Docs",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
    },
    {
      title: "Best Practices",
      description: "Industry best practices and tips",
      icon: Lightbulb,
      action: "Learn More",
      color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30",
    },
    {
      title: "Support Center",
      description: "Get help from our support team",
      icon: HelpCircle,
      action: "Contact Support",
      color: "bg-green-100 text-green-600 dark:bg-green-900/30",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "Advanced":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "tutorial":
        return Play
      case "guide":
        return BookOpen
      case "reference":
        return FileText
      default:
        return BookOpen
    }
  }

  const filteredSections = manualSections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.articles.some(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Manual</h1>
          <p className="text-muted-foreground">Comprehensive guides and documentation for the DevFlow CI/CD platform</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search documentation..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon
          return (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <CardHeader className="pb-3">
                <div
                  className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  {action.action}
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Browse by category</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96">
                <div className="p-4 space-y-2">
                  {filteredSections.map((section) => {
                    const Icon = section.icon
                    const isActive = activeSection === section.id
                    return (
                      <Collapsible key={section.id} defaultOpen={isActive}>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start p-2 h-auto ${isActive ? "bg-muted" : ""}`}
                            onClick={() => setActiveSection(section.id)}
                          >
                            <Icon className="mr-2 h-4 w-4" />
                            <span className="flex-1 text-left">{section.title}</span>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-1 ml-6 mt-1">
                          {section.articles.map((article) => (
                            <Button
                              key={article.id}
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start text-xs text-muted-foreground hover:text-foreground"
                            >
                              <ChevronRight className="mr-1 h-3 w-3" />
                              {article.title}
                            </Button>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    )
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs value={activeSection} onValueChange={setActiveSection}>
            {filteredSections.map((section) => (
              <TabsContent key={section.id} value={section.id} className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <div className="grid gap-4">
                  {section.articles.map((article) => {
                    const TypeIcon = getTypeIcon(article.type)
                    return (
                      <Card
                        key={article.id}
                        className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center mt-1">
                                <TypeIcon className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                                  {article.title}
                                </CardTitle>
                                <CardDescription className="mt-1">{article.description}</CardDescription>
                                <div className="flex items-center space-x-3 mt-3">
                                  <Badge variant="outline" className="text-xs">
                                    {article.type}
                                  </Badge>
                                  <Badge className={`text-xs ${getDifficultyColor(article.difficulty)}`}>
                                    {article.difficulty}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{article.readTime} read</span>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                      </Card>
                    )
                  })}
                </div>

                {/* Sample Article Content for Getting Started */}
                {section.id === "getting-started" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Start Guide</CardTitle>
                      <CardDescription>Get up and running with DevFlow in 5 minutes</CardDescription>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                      <h3>Welcome to DevFlow!</h3>
                      <p>
                        DevFlow is a modern CI/CD platform designed to streamline your deployment process with advanced
                        strategies like blue-green, canary, and rolling deployments.
                      </p>

                      <h4>Step 1: Create Your First Project</h4>
                      <ol>
                        <li>Navigate to the Projects page from the sidebar</li>
                        <li>Click the "New Project" button</li>
                        <li>Enter your project name and description</li>
                        <li>Connect your Git repository</li>
                      </ol>

                      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start space-x-2">
                          <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-900 dark:text-blue-100">Pro Tip</p>
                            <p className="text-blue-800 dark:text-blue-200 text-sm">
                              Start with a simple project to familiarize yourself with the platform before moving to
                              complex deployments.
                            </p>
                          </div>
                        </div>
                      </div>

                      <h4>Step 2: Build Your First Pipeline</h4>
                      <ol>
                        <li>Go to the Pipelines section</li>
                        <li>Click "Create Pipeline" or use the Pipeline Builder</li>
                        <li>Add build, test, and deploy steps</li>
                        <li>Configure your deployment strategy</li>
                      </ol>

                      <h4>Step 3: Deploy Your Application</h4>
                      <p>
                        Once your pipeline is configured, you can trigger deployments manually or set up automatic
                        triggers based on Git events.
                      </p>

                      <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-yellow-900 dark:text-yellow-100">Important</p>
                            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                              Always test your deployments in a staging environment before deploying to production.
                            </p>
                          </div>
                        </div>
                      </div>

                      <h4>Next Steps</h4>
                      <ul>
                        <li>Explore deployment strategies in the Strategies section</li>
                        <li>Set up monitoring and alerting</li>
                        <li>Invite team members and configure permissions</li>
                        <li>Review security and compliance features</li>
                      </ul>

                      <p>
                        Need help? Check out our video tutorials or contact our support team through the Support Center.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
