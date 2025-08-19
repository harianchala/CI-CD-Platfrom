"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Clock, RotateCcw, Eye, GitCommit } from "lucide-react"

export function DeploymentsView() {
  const deployments = [
    {
      id: 1,
      project: "E-commerce API",
      version: "v2.1.4",
      environment: "Production",
      strategy: "Blue-Green",
      status: "success",
      deployedAt: "2024-01-15 14:30:00",
      deployedBy: "john.doe@company.com",
      duration: "4m 32s",
    },
    {
      id: 2,
      project: "User Dashboard",
      version: "v1.8.2",
      environment: "Staging",
      strategy: "Rolling",
      status: "running",
      deployedAt: "2024-01-15 14:25:00",
      deployedBy: "jane.smith@company.com",
      duration: "2m 18s",
    },
    {
      id: 3,
      project: "Payment Service",
      version: "v3.0.1",
      environment: "Production",
      strategy: "Canary",
      status: "success",
      deployedAt: "2024-01-15 13:45:00",
      deployedBy: "mike.wilson@company.com",
      duration: "6m 12s",
    },
    {
      id: 4,
      project: "Analytics Engine",
      version: "v1.2.0",
      environment: "Development",
      strategy: "Rolling",
      status: "failed",
      deployedAt: "2024-01-15 12:30:00",
      deployedBy: "sarah.johnson@company.com",
      duration: "1m 45s",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deployments</h1>
          <p className="text-muted-foreground">Track and manage your application deployments</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <GitCommit className="mr-2 h-4 w-4" />
          New Deployment
        </Button>
      </div>

      {/* Deployment Strategies Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Deployments</TabsTrigger>
          <TabsTrigger value="blue-green">Blue-Green</TabsTrigger>
          <TabsTrigger value="canary">Canary</TabsTrigger>
          <TabsTrigger value="rolling">Rolling</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {deployments.map((deployment) => (
            <Card key={deployment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <span>{deployment.project}</span>
                      <Badge variant="outline">{deployment.version}</Badge>
                    </CardTitle>
                    <CardDescription>
                      {deployment.environment} • {deployment.strategy} Deployment
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        deployment.status === "success"
                          ? "default"
                          : deployment.status === "running"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {deployment.status === "running" && <Clock className="mr-1 h-3 w-3 animate-pulse" />}
                      {deployment.status === "success" && <CheckCircle className="mr-1 h-3 w-3" />}
                      {deployment.status === "failed" && <XCircle className="mr-1 h-3 w-3" />}
                      {deployment.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Deployed by</span>
                    <p className="font-medium">{deployment.deployedBy}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Deployed at</span>
                    <p className="font-medium">{deployment.deployedAt}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration</span>
                    <p className="font-medium">{deployment.duration}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Strategy</span>
                    <p className="font-medium">{deployment.strategy}</p>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-1 h-3 w-3" />
                    View Logs
                  </Button>
                  {deployment.status === "failed" && (
                    <Button variant="outline" size="sm">
                      <RotateCcw className="mr-1 h-3 w-3" />
                      Rollback
                    </Button>
                  )}
                  {deployment.status === "success" && deployment.environment === "Production" && (
                    <Button variant="outline" size="sm">
                      <RotateCcw className="mr-1 h-3 w-3" />
                      Rollback
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="blue-green">
          <Card>
            <CardHeader>
              <CardTitle>Blue-Green Deployments</CardTitle>
              <CardDescription>Zero-downtime deployments using blue-green strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Blue-green deployments filtered view will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="canary">
          <Card>
            <CardHeader>
              <CardTitle>Canary Deployments</CardTitle>
              <CardDescription>Gradual rollout deployments using canary strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Canary deployments filtered view will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rolling">
          <Card>
            <CardHeader>
              <CardTitle>Rolling Deployments</CardTitle>
              <CardDescription>Sequential instance updates using rolling strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Rolling deployments filtered view will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
