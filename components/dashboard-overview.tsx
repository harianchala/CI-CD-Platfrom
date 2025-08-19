"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Activity, GitBranch, Rocket, CheckCircle, XCircle, Clock, TrendingUp, Users, Server, Plus } from "lucide-react"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your deployments.</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deployments Today</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.3%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">+1</span> new this week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Deployments */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Deployments</CardTitle>
            <CardDescription>Your latest deployment activity across all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  project: "E-commerce API",
                  environment: "Production",
                  status: "success",
                  time: "2 minutes ago",
                  version: "v2.1.4",
                },
                {
                  project: "User Dashboard",
                  environment: "Staging",
                  status: "running",
                  time: "5 minutes ago",
                  version: "v1.8.2",
                },
                {
                  project: "Payment Service",
                  environment: "Production",
                  status: "success",
                  time: "12 minutes ago",
                  version: "v3.0.1",
                },
                {
                  project: "Analytics Engine",
                  environment: "Development",
                  status: "failed",
                  time: "1 hour ago",
                  version: "v1.2.0",
                },
              ].map((deployment, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {deployment.status === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {deployment.status === "running" && <Clock className="h-5 w-5 text-blue-500 animate-pulse" />}
                      {deployment.status === "failed" && <XCircle className="h-5 w-5 text-red-500" />}
                    </div>
                    <div>
                      <p className="font-medium">{deployment.project}</p>
                      <p className="text-sm text-muted-foreground">
                        {deployment.environment} • {deployment.version}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        deployment.status === "success"
                          ? "default"
                          : deployment.status === "running"
                            ? "secondary"
                            : "destructive"
                      }
                      className="mb-1"
                    >
                      {deployment.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{deployment.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Status */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Pipeline Status</CardTitle>
            <CardDescription>Current status of your CI/CD pipelines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Frontend Build", progress: 100, status: "completed" },
                { name: "Backend Tests", progress: 75, status: "running" },
                { name: "Security Scan", progress: 45, status: "running" },
                { name: "Deploy to Staging", progress: 0, status: "pending" },
              ].map((pipeline, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{pipeline.name}</span>
                    <Badge
                      variant={
                        pipeline.status === "completed"
                          ? "default"
                          : pipeline.status === "running"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {pipeline.status}
                    </Badge>
                  </div>
                  <Progress value={pipeline.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to get you started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Plus className="h-6 w-6" />
              <span>Create Project</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <GitBranch className="h-6 w-6" />
              <span>Setup Pipeline</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Rocket className="h-6 w-6" />
              <span>Deploy Now</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Activity className="h-6 w-6" />
              <span>View Logs</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
