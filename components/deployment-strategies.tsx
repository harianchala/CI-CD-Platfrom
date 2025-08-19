"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, GitBranch, Zap, TrendingUp, Clock, CheckCircle, Settings, Play, Eye } from "lucide-react"

export function DeploymentStrategies() {
  const [activeStrategy, setActiveStrategy] = useState("overview")

  const strategies = [
    {
      id: "blue-green",
      name: "Blue-Green Deployment",
      description: "Zero-downtime deployments with instant rollback capability",
      icon: GitBranch,
      color: "from-blue-500 to-green-500",
      benefits: ["Zero downtime", "Instant rollback", "Full environment testing"],
      complexity: "Medium",
      riskLevel: "Low",
      activeDeployments: 12,
      successRate: 99.8,
    },
    {
      id: "canary",
      name: "Canary Deployment",
      description: "Gradual rollout to a subset of users for risk mitigation",
      icon: TrendingUp,
      color: "from-yellow-500 to-orange-500",
      benefits: ["Risk mitigation", "Real user feedback", "Gradual rollout"],
      complexity: "High",
      riskLevel: "Very Low",
      activeDeployments: 8,
      successRate: 97.5,
    },
    {
      id: "rolling",
      name: "Rolling Deployment",
      description: "Sequential updates across instances with resource efficiency",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      benefits: ["Resource efficient", "Continuous availability", "Simple rollback"],
      complexity: "Low",
      riskLevel: "Medium",
      activeDeployments: 24,
      successRate: 95.2,
    },
  ]

  const recentDeployments = [
    {
      id: 1,
      project: "E-commerce API",
      strategy: "blue-green",
      status: "success",
      environment: "Production",
      startTime: "2 hours ago",
      duration: "4m 32s",
      traffic: 100,
    },
    {
      id: 2,
      project: "User Dashboard",
      strategy: "canary",
      status: "running",
      environment: "Production",
      startTime: "15 minutes ago",
      duration: "12m 18s",
      traffic: 25,
    },
    {
      id: 3,
      project: "Payment Service",
      strategy: "rolling",
      status: "success",
      environment: "Staging",
      startTime: "1 hour ago",
      duration: "6m 45s",
      traffic: 100,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-500"
      case "running":
        return "text-blue-500"
      case "failed":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Low":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "High":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Very Low":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "Low":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "High":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deployment Strategies</h1>
          <p className="text-muted-foreground">
            Choose the right deployment strategy for your applications and environments
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Play className="mr-2 h-4 w-4" />
          New Deployment
        </Button>
      </div>

      <Tabs value={activeStrategy} onValueChange={setActiveStrategy}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="blue-green">Blue-Green</TabsTrigger>
          <TabsTrigger value="canary">Canary</TabsTrigger>
          <TabsTrigger value="rolling">Rolling</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Strategy Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {strategies.map((strategy) => {
              const Icon = strategy.icon
              return (
                <Card
                  key={strategy.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => setActiveStrategy(strategy.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${strategy.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                    </div>
                    <CardTitle className="text-lg">{strategy.name}</CardTitle>
                    <CardDescription>{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Complexity</span>
                        <Badge className={getComplexityColor(strategy.complexity)}>{strategy.complexity}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Risk Level</span>
                        <Badge className={getRiskColor(strategy.riskLevel)}>{strategy.riskLevel}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Active</span>
                        <span className="font-medium">{strategy.activeDeployments}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Success Rate</span>
                        <span className="font-medium text-green-600">{strategy.successRate}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Recent Deployments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Deployments</CardTitle>
              <CardDescription>Latest deployment activities across all strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDeployments.map((deployment) => (
                  <div key={deployment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        {deployment.strategy === "blue-green" && <GitBranch className="w-5 h-5" />}
                        {deployment.strategy === "canary" && <TrendingUp className="w-5 h-5" />}
                        {deployment.strategy === "rolling" && <Zap className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-medium">{deployment.project}</p>
                        <p className="text-sm text-muted-foreground">
                          {deployment.strategy} • {deployment.environment}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className={`text-sm font-medium ${getStatusColor(deployment.status)}`}>
                          {deployment.status === "running" && <Clock className="inline w-3 h-3 mr-1 animate-pulse" />}
                          {deployment.status === "success" && <CheckCircle className="inline w-3 h-3 mr-1" />}
                          {deployment.status}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {deployment.startTime} • {deployment.duration}
                        </div>
                      </div>
                      {deployment.strategy === "canary" && (
                        <div className="text-right">
                          <div className="text-sm font-medium">{deployment.traffic}%</div>
                          <div className="text-xs text-muted-foreground">Traffic</div>
                        </div>
                      )}
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blue-green" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                    <GitBranch className="w-4 h-4 text-white" />
                  </div>
                  <span>Blue-Green Deployment</span>
                </CardTitle>
                <CardDescription>
                  Maintain two identical production environments and switch traffic between them
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">How it works:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Deploy new version to inactive environment (Green)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Test thoroughly in Green environment</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Switch traffic from Blue to Green instantly</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Keep Blue as backup for instant rollback</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4">
                  <Button asChild className="w-full">
                    <Link href="/dashboard/strategies/blue-green">
                      Configure Blue-Green Deployment
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environment Status</CardTitle>
                <CardDescription>Current state of Blue-Green environments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50 dark:bg-blue-950/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Blue Environment</p>
                        <p className="text-sm text-muted-foreground">v2.1.3 • Active</p>
                      </div>
                    </div>
                    <Badge variant="default">Live Traffic</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Green Environment</p>
                        <p className="text-sm text-muted-foreground">v2.1.4 • Standby</p>
                      </div>
                    </div>
                    <Badge variant="outline">Ready</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="canary" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <span>Canary Deployment</span>
                </CardTitle>
                <CardDescription>
                  Gradually roll out changes to a small subset of users before full deployment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Rollout Strategy:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Phase 1: Internal Testing</span>
                      <Badge variant="outline">5%</Badge>
                    </div>
                    <Progress value={100} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Phase 2: Beta Users</span>
                      <Badge variant="secondary">25%</Badge>
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Phase 3: Gradual Rollout</span>
                      <Badge variant="outline">50%</Badge>
                    </div>
                    <Progress value={0} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Phase 4: Full Deployment</span>
                      <Badge variant="outline">100%</Badge>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </div>
                <div className="pt-4">
                  <Button asChild className="w-full">
                    <Link href="/dashboard/strategies/canary">
                      Configure Canary Deployment
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Canary Deployments</CardTitle>
                <CardDescription>Currently running canary releases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">User Dashboard v1.8.2</p>
                      <Badge variant="secondary">Running</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Traffic Split</span>
                        <span>25% Canary</span>
                      </div>
                      <Progress value={25} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Error Rate: 0.1%</span>
                        <span>Response Time: 120ms</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg opacity-60">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Payment Service v3.0.2</p>
                      <Badge variant="outline">Scheduled</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Starts in 2 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rolling" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span>Rolling Deployment</span>
                </CardTitle>
                <CardDescription>Update instances sequentially while maintaining service availability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Update Progress:</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((instance) => (
                      <div
                        key={instance}
                        className={`p-2 rounded text-center text-xs font-medium ${
                          instance <= 3
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : instance === 4
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                        }`}
                      >
                        {instance <= 3 ? "✓" : instance === 4 ? "..." : "○"}
                        <div className="text-xs mt-1">Pod {instance}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress: 3/8 instances updated</span>
                    <span className="text-green-600">37.5%</span>
                  </div>
                  <Progress value={37.5} className="h-2" />
                </div>
                <div className="pt-4">
                  <Button asChild className="w-full">
                    <Link href="/dashboard/strategies/rolling">
                      Configure Rolling Deployment
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deployment Configuration</CardTitle>
                <CardDescription>Current rolling update settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Max Unavailable</span>
                    <Badge variant="outline">25%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Max Surge</span>
                    <Badge variant="outline">25%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Update Strategy</span>
                    <Badge variant="outline">RollingUpdate</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Health Check</span>
                    <Badge variant="default">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Enabled
                    </Badge>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Settings className="mr-2 w-4 h-4" />
                      Modify Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
