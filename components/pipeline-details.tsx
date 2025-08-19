"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Pause,
  RotateCcw,
  Settings,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Eye,
  GitCommit,
  Calendar,
  User,
  Timer,
} from "lucide-react"

interface PipelineDetailsProps {
  pipelineId: string
}

export function PipelineDetails({ pipelineId }: PipelineDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data - in real app, this would come from API
  const pipeline = {
    id: pipelineId,
    name: "E-commerce API - Main Pipeline",
    project: "E-commerce API",
    status: "running",
    progress: 65,
    currentStep: "Running Security Scan",
    startedAt: "2024-01-15 14:30:00",
    estimatedDuration: "8m 30s",
    triggeredBy: "john.doe@company.com",
    commit: "a1b2c3d",
    branch: "main",
    steps: [
      {
        id: "1",
        name: "Checkout Code",
        status: "success",
        duration: "12s",
        startedAt: "14:30:00",
        completedAt: "14:30:12",
      },
      {
        id: "2",
        name: "Install Dependencies",
        status: "success",
        duration: "1m 24s",
        startedAt: "14:30:12",
        completedAt: "14:31:36",
      },
      {
        id: "3",
        name: "Run Tests",
        status: "success",
        duration: "2m 18s",
        startedAt: "14:31:36",
        completedAt: "14:33:54",
      },
      {
        id: "4",
        name: "Security Scan",
        status: "running",
        duration: "1m 45s",
        startedAt: "14:33:54",
        completedAt: null,
      },
      {
        id: "5",
        name: "Build Docker Image",
        status: "pending",
        duration: null,
        startedAt: null,
        completedAt: null,
      },
      {
        id: "6",
        name: "Deploy to Staging",
        status: "pending",
        duration: null,
        startedAt: null,
        completedAt: null,
      },
    ],
  }

  const logs = [
    { timestamp: "14:30:00", level: "info", message: "Pipeline started" },
    { timestamp: "14:30:01", level: "info", message: "Checking out code from main branch" },
    { timestamp: "14:30:12", level: "success", message: "Code checkout completed" },
    { timestamp: "14:30:13", level: "info", message: "Installing dependencies..." },
    { timestamp: "14:31:36", level: "success", message: "Dependencies installed successfully" },
    { timestamp: "14:31:37", level: "info", message: "Running test suite..." },
    { timestamp: "14:33:54", level: "success", message: "All tests passed (47/47)" },
    { timestamp: "14:33:55", level: "info", message: "Starting security scan..." },
    { timestamp: "14:34:30", level: "warning", message: "Found 2 medium severity vulnerabilities" },
    { timestamp: "14:35:15", level: "info", message: "Security scan in progress..." },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "running":
        return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "text-red-500"
      case "warning":
        return "text-yellow-500"
      case "success":
        return "text-green-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{pipeline.name}</h1>
          <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <GitCommit className="h-4 w-4" />
              <span>{pipeline.commit}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{pipeline.triggeredBy}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{pipeline.startedAt}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Pause className="mr-2 h-4 w-4" />
            Pause
          </Button>
          <Button variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Restart
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
        </div>
      </div>

      {/* Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <span>Pipeline Status</span>
                <Badge
                  variant={
                    pipeline.status === "success"
                      ? "default"
                      : pipeline.status === "running"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {getStatusIcon(pipeline.status)}
                  <span className="ml-1">{pipeline.status}</span>
                </Badge>
              </CardTitle>
              <CardDescription>{pipeline.currentStep}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{pipeline.progress}%</div>
              <div className="text-sm text-muted-foreground flex items-center">
                <Timer className="h-3 w-3 mr-1" />
                {pipeline.estimatedDuration}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={pipeline.progress} className="h-3" />
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="steps">Steps</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Project</span>
                    <p className="font-medium">{pipeline.project}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Branch</span>
                    <p className="font-medium">{pipeline.branch}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Commit</span>
                    <p className="font-medium font-mono">{pipeline.commit}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Triggered by</span>
                    <p className="font-medium">{pipeline.triggeredBy}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Execution Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Steps</span>
                    <p className="font-medium">{pipeline.steps.length}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Completed</span>
                    <p className="font-medium text-green-600">
                      {pipeline.steps.filter((s) => s.status === "success").length}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Running</span>
                    <p className="font-medium text-blue-600">
                      {pipeline.steps.filter((s) => s.status === "running").length}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Pending</span>
                    <p className="font-medium text-muted-foreground">
                      {pipeline.steps.filter((s) => s.status === "pending").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="steps" className="space-y-4">
          {pipeline.steps.map((step, index) => (
            <Card key={step.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <span>{step.name}</span>
                        {getStatusIcon(step.status)}
                      </CardTitle>
                      <CardDescription>
                        {step.startedAt && `Started at ${step.startedAt}`}
                        {step.duration && ` • Duration: ${step.duration}`}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-1 h-3 w-3" />
                      View Logs
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pipeline Logs</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Logs
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96 w-full rounded-md border p-4 font-mono text-sm">
                {logs.map((log, index) => (
                  <div key={index} className="flex space-x-4 py-1">
                    <span className="text-muted-foreground shrink-0">{log.timestamp}</span>
                    <span className={`shrink-0 uppercase text-xs ${getLogLevelColor(log.level)}`}>[{log.level}]</span>
                    <span>{log.message}</span>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="artifacts">
          <Card>
            <CardHeader>
              <CardTitle>Build Artifacts</CardTitle>
              <CardDescription>Files and reports generated during pipeline execution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "test-results.xml", size: "24 KB", type: "Test Report" },
                  { name: "coverage-report.html", size: "156 KB", type: "Coverage Report" },
                  { name: "security-scan.json", size: "8 KB", type: "Security Report" },
                  { name: "build-logs.txt", size: "45 KB", type: "Build Logs" },
                ].map((artifact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{artifact.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {artifact.type} • {artifact.size}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
