"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  Clock,
  User,
  Bookmark,
  Share,
  PrinterIcon as Print,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

interface ManualSectionProps {
  section: string
}

export function ManualSection({ section }: ManualSectionProps) {
  // Mock article content - in real app, this would come from a CMS or API
  const getArticleContent = () => {
    switch (section) {
      case "pipeline-builder":
        return {
          title: "Using the Pipeline Builder",
          description: "Learn how to create and configure CI/CD pipelines using our visual builder",
          readTime: "15 min",
          difficulty: "Intermediate",
          lastUpdated: "January 15, 2024",
          author: "DevFlow Team",
          content: `
            <h2>Introduction to Pipeline Builder</h2>
            <p>The Pipeline Builder is a visual tool that allows you to create complex CI/CD pipelines without writing YAML or configuration files. This guide will walk you through creating your first pipeline.</p>
            
            <h3>Getting Started</h3>
            <p>To access the Pipeline Builder:</p>
            <ol>
              <li>Navigate to the Pipelines section in your dashboard</li>
              <li>Click the "Create Pipeline" button</li>
              <li>Select "Use Pipeline Builder" option</li>
            </ol>
            
            <div class="info-box">
              <strong>💡 Pro Tip:</strong> Start with a simple pipeline and gradually add complexity as you become more familiar with the platform.
            </div>
            
            <h3>Adding Pipeline Steps</h3>
            <p>The Pipeline Builder supports four main types of steps:</p>
            <ul>
              <li><strong>Build Steps:</strong> Compile your code and create artifacts</li>
              <li><strong>Test Steps:</strong> Run automated tests and generate reports</li>
              <li><strong>Security Steps:</strong> Perform security scans and vulnerability checks</li>
              <li><strong>Deploy Steps:</strong> Deploy your application to target environments</li>
            </ul>
            
            <h4>Build Step Configuration</h4>
            <p>When adding a build step, you can configure:</p>
            <ul>
              <li>Build command (e.g., <code>npm run build</code>)</li>
              <li>Dockerfile location</li>
              <li>Build environment variables</li>
              <li>Artifact output paths</li>
            </ul>
            
            <div class="warning-box">
              <strong>⚠️ Important:</strong> Make sure your build commands are compatible with the selected runtime environment.
            </div>
            
            <h3>Step Dependencies and Conditions</h3>
            <p>You can configure when each step should run:</p>
            <ul>
              <li><strong>Always:</strong> Step runs regardless of previous step outcomes</li>
              <li><strong>On Success:</strong> Step runs only if previous steps succeeded</li>
              <li><strong>On Failure:</strong> Step runs only if previous steps failed</li>
              <li><strong>Manual Approval:</strong> Step waits for manual approval before running</li>
            </ul>
            
            <h3>Best Practices</h3>
            <ol>
              <li>Keep your pipelines simple and focused</li>
              <li>Use parallel execution where possible</li>
              <li>Implement proper error handling</li>
              <li>Add meaningful step names and descriptions</li>
              <li>Test your pipelines in staging before production</li>
            </ol>
            
            <div class="success-box">
              <strong>✅ Success:</strong> You now know how to create pipelines using the visual builder. Try creating a simple build-test-deploy pipeline for your next project!
            </div>
          `,
        }
      default:
        return {
          title: "Documentation Article",
          description: "Learn about DevFlow features and best practices",
          readTime: "10 min",
          difficulty: "Beginner",
          lastUpdated: "January 15, 2024",
          author: "DevFlow Team",
          content: "<p>Article content would be loaded here...</p>",
        }
    }
  }

  const article = getArticleContent()

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/manual">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Manual
            </Link>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Bookmark className="mr-2 h-4 w-4" />
            Bookmark
          </Button>
          <Button variant="outline" size="sm">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Print className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Table of Contents */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Table of Contents</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-2 text-sm">
                  <a href="#introduction" className="block text-blue-600 hover:underline">
                    Introduction to Pipeline Builder
                  </a>
                  <a href="#getting-started" className="block text-muted-foreground hover:text-foreground">
                    Getting Started
                  </a>
                  <a href="#adding-steps" className="block text-muted-foreground hover:text-foreground">
                    Adding Pipeline Steps
                  </a>
                  <a href="#build-config" className="block text-muted-foreground hover:text-foreground ml-4">
                    Build Step Configuration
                  </a>
                  <a href="#dependencies" className="block text-muted-foreground hover:text-foreground">
                    Step Dependencies and Conditions
                  </a>
                  <a href="#best-practices" className="block text-muted-foreground hover:text-foreground">
                    Best Practices
                  </a>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="space-y-4">
                <div>
                  <CardTitle className="text-3xl">{article.title}</CardTitle>
                  <CardDescription className="text-lg mt-2">{article.description}</CardDescription>
                </div>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <Badge className={getDifficultyColor(article.difficulty)}>{article.difficulty}</Badge>
                  <span>Updated {article.lastUpdated}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <style jsx>{`
                  .info-box {
                    background: rgb(59 130 246 / 0.1);
                    border: 1px solid rgb(59 130 246 / 0.2);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin: 1.5rem 0;
                  }
                  .warning-box {
                    background: rgb(245 158 11 / 0.1);
                    border: 1px solid rgb(245 158 11 / 0.2);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin: 1.5rem 0;
                  }
                  .success-box {
                    background: rgb(34 197 94 / 0.1);
                    border: 1px solid rgb(34 197 94 / 0.2);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin: 1.5rem 0;
                  }
                  code {
                    background: rgb(0 0 0 / 0.1);
                    padding: 0.2rem 0.4rem;
                    border-radius: 0.25rem;
                    font-size: 0.875em;
                  }
                `}</style>
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>

              {/* Feedback Section */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Was this article helpful?</h3>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Yes, helpful
                  </Button>
                  <Button variant="outline" size="sm">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Needs improvement
                  </Button>
                </div>
              </div>

              {/* Related Articles */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Understanding Pipeline Steps</CardTitle>
                      <CardDescription>Learn about different types of pipeline steps</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          Guide
                        </Badge>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Deployment Strategies</CardTitle>
                      <CardDescription>Choose the right deployment strategy</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          Guide
                        </Badge>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
