"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Save, Play, AlertTriangle, CheckCircle, Clock, Activity, Users } from "lucide-react"

interface StrategyDetailsProps {
  strategy: string
}

export function StrategyDetails({ strategy }: StrategyDetailsProps) {
  const [trafficSplit, setTrafficSplit] = useState([25])
  const [autoPromote, setAutoPromote] = useState(false)
  const [healthCheckEnabled, setHealthCheckEnabled] = useState(true)

  const getStrategyConfig = () => {
    switch (strategy) {
      case "blue-green":
        return {
          name: "Blue-Green Deployment",
          description: "Zero-downtime deployment with instant rollback",
          color: "from-blue-500 to-green-500",
        }
      case "canary":
        return {
          name: "Canary Deployment",
          description: "Gradual rollout with risk mitigation",
          color: "from-yellow-500 to-orange-500",
        }
      case "rolling":
        return {
          name: "Rolling Deployment",
          description: "Sequential instance updates",
          color: "from-purple-500 to-pink-500",
        }
      default:
        return {
          name: "Deployment Strategy",
          description: "Configure your deployment",
          color: "from-gray-500 to-gray-600",
        }
    }
  }

  const config = getStrategyConfig()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{config.name}</h1>
          <p className="text-muted-foreground">{config.description}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Configuration
          </Button>
          <Button className={`bg-gradient-to-r ${config.color} hover:opacity-90`}>
            <Play className="mr-2 h-4 w-4" />
            Start Deployment
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Configuration</CardTitle>
              <CardDescription>Configure strategy-specific settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project">Target Project</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecommerce-api">E-commerce API</SelectItem>
                    <SelectItem value="user-dashboard">User Dashboard</SelectItem>
                    <SelectItem value="payment-service">Payment Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="environment">Environment</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {strategy === "canary" && (
                <>
                  <div className="space-y-2">
                    <Label>Traffic Split: {trafficSplit[0]}%</Label>
                    <Slider
                      value={trafficSplit}
                      onValueChange={setTrafficSplit}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch checked={autoPromote} onCheckedChange={setAutoPromote} />
                    <Label>Auto-promote on success</Label>
                  </div>
                </>
              )}

              {strategy === "rolling" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="maxUnavailable">Max Unavailable</Label>
                    <Input placeholder="25%" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxSurge">Max Surge</Label>
                    <Input placeholder="25%" />
                  </div>
                </>
              )}

              <div className="flex items-center space-x-2">
                <Switch checked={healthCheckEnabled} onCheckedChange={setHealthCheckEnabled} />
                <Label>Enable health checks</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rollback Settings</CardTitle>
              <CardDescription>Configure automatic rollback conditions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="errorThreshold">Error Rate Threshold</Label>
                <Input placeholder="5%" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responseTime">Response Time Threshold</Label>
                <Input placeholder="500ms" />
              </div>

              <div className="flex items-center space-x-2">
                <Switch />
                <Label>Auto-rollback on failure</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {strategy === "blue-green" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Blue Environment</span>
                      </CardTitle>
                      <CardDescription>Currently active production environment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Version</span>
                          <Badge variant="default">v2.1.3</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Status</span>
                          <Badge variant="default">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Traffic</span>
                          <span className="font-medium">100%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Health</span>
                          <Badge variant="default" className="bg-green-500">
                            Healthy
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Green Environment</span>
                      </CardTitle>
                      <CardDescription>Standby environment for new deployments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Version</span>
                          <Badge variant="outline">v2.1.4</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Status</span>
                          <Badge variant="secondary">
                            <Clock className="w-3 h-3 mr-1" />
                            Standby
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Traffic</span>
                          <span className="font-medium">0%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Health</span>
                          <Badge variant="outline">Ready</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {strategy === "canary" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Canary Release Progress</CardTitle>
                    <CardDescription>Current rollout status and metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Traffic Split</span>
                          <span className="font-medium">{trafficSplit[0]}% Canary</span>
                        </div>
                        <Progress value={trafficSplit[0]} className="h-3" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Stable (v2.1.3)</span>
                          <span>Canary (v2.1.4)</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">0.1%</div>
                          <div className="text-sm text-muted-foreground">Error Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">120ms</div>
                          <div className="text-sm text-muted-foreground">Avg Response</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">1.2k</div>
                          <div className="text-sm text-muted-foreground">Requests/min</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {strategy === "rolling" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Rolling Update Progress</CardTitle>
                    <CardDescription>Instance-by-instance update status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-3">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((instance) => (
                          <Card
                            key={instance}
                            className={`p-3 text-center ${
                              instance <= 3
                                ? "bg-green-50 border-green-200 dark:bg-green-950/30"
                                : instance === 4
                                  ? "bg-blue-50 border-blue-200 dark:bg-blue-950/30"
                                  : "bg-gray-50 border-gray-200 dark:bg-gray-950/30"
                            }`}
                          >
                            <div className="text-lg font-bold">
                              {instance <= 3 ? "✓" : instance === 4 ? "..." : "○"}
                            </div>
                            <div className="text-xs text-muted-foreground">Pod {instance}</div>
                            <div className="text-xs">
                              {instance <= 3 ? "v2.1.4" : instance === 4 ? "Updating" : "v2.1.3"}
                            </div>
                          </Card>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Update Progress</span>
                          <span className="font-medium">3/8 instances</span>
                        </div>
                        <Progress value={37.5} className="h-3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="w-5 h-5" />
                      <span>Performance Metrics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Response Time</span>
                        <span className="font-medium text-green-600">120ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Error Rate</span>
                        <span className="font-medium text-green-600">0.1%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Throughput</span>
                        <span className="font-medium">1.2k req/min</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">CPU Usage</span>
                        <span className="font-medium">45%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>User Impact</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Active Users</span>
                        <span className="font-medium">2.4k</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">User Satisfaction</span>
                        <span className="font-medium text-green-600">98.5%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Bounce Rate</span>
                        <span className="font-medium">2.1%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Conversion Rate</span>
                        <span className="font-medium">4.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Deployment History</CardTitle>
                  <CardDescription>Recent deployments using this strategy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        version: "v2.1.4",
                        status: "success",
                        date: "2024-01-15 14:30",
                        duration: "4m 32s",
                      },
                      {
                        version: "v2.1.3",
                        status: "success",
                        date: "2024-01-14 09:15",
                        duration: "3m 18s",
                      },
                      {
                        version: "v2.1.2",
                        status: "failed",
                        date: "2024-01-13 16:45",
                        duration: "2m 12s",
                      },
                    ].map((deployment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {deployment.status === "success" ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                          )}
                          <div>
                            <p className="font-medium">{deployment.version}</p>
                            <p className="text-sm text-muted-foreground">{deployment.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={deployment.status === "success" ? "default" : "destructive"} className="mb-1">
                            {deployment.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground">{deployment.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
