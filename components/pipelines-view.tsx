"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, RotateCcw, Settings, Clock, CheckCircle, XCircle, Plus, Search, Filter } from "lucide-react"

export function PipelinesView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const pipelines = [
    {
      id: "1",
      name: "E-commerce API - Main",
      project: "E-commerce API",
      status: "running",
      progress: 65,
      currentStep: "Running Tests",
      lastRun: "5 minutes ago",
      duration: "3m 24s",
      branch: "main",
      commit: "a1b2c3d",
    },
    {
      id: "2",
      name: "User Dashboard - Deploy",
      project: "User Dashboard",
      status: "success",
      progress: 100,
      currentStep: "Deployed",
      lastRun: "2 hours ago",
      duration: "4m 12s",
      branch: "main",
      commit: "e4f5g6h",
    },
    {
      id: "3",
      name: "Payment Service - Hotfix",
      project: "Payment Service",
      status: "failed",
      progress: 45,
      currentStep: "Security Scan Failed",
      lastRun: "1 hour ago",
      duration: "2m 18s",
      branch: "hotfix/payment-bug",
      commit: "i7j8k9l",
    },
    {
      id: "4",
      name: "Analytics Engine - Feature",
      project: "Analytics Engine",
      status: "pending",
      progress: 0,
      currentStep: "Waiting for approval",
      lastRun: "Never",
      duration: "-",
      branch: "feature/new-analytics",
      commit: "m0n1o2p",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "running":
        return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const filteredPipelines = pipelines.filter((pipeline) => {
    const matchesSearch =
      pipeline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pipeline.project.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || pipeline.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pipelines</h1>
          <p className="text-muted-foreground">Monitor and manage your CI/CD pipelines</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/pipelines/builder">
              <Plus className="mr-2 h-4 w-4" />
              Create Pipeline
            </Link>
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Play className="mr-2 h-4 w-4" />
            Run Pipeline
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search pipelines..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="running">Running</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Pipelines List */}
      <div className="space-y-4">
        {filteredPipelines.map((pipeline) => (
          <Card key={pipeline.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    <Link href={`/dashboard/pipelines/${pipeline.id}`} className="hover:underline">
                      {pipeline.name}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {pipeline.project} • {pipeline.branch} • {pipeline.commit}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      pipeline.status === "success"
                        ? "default"
                        : pipeline.status === "running"
                          ? "secondary"
                          : pipeline.status === "failed"
                            ? "destructive"
                            : "outline"
                    }
                  >
                    {getStatusIcon(pipeline.status)}
                    <span className="ml-1">{pipeline.status}</span>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress */}
                {pipeline.status === "running" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{pipeline.currentStep}</span>
                      <span className="text-muted-foreground">{pipeline.progress}%</span>
                    </div>
                    <Progress value={pipeline.progress} className="h-2" />
                  </div>
                )}

                {/* Metadata */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Last run: {pipeline.lastRun}</span>
                  <span>Duration: {pipeline.duration}</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/pipelines/${pipeline.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Play className="mr-1 h-3 w-3" />
                    Run
                  </Button>
                  {pipeline.status === "running" && (
                    <Button variant="outline" size="sm">
                      <Pause className="mr-1 h-3 w-3" />
                      Pause
                    </Button>
                  )}
                  {(pipeline.status === "failed" || pipeline.status === "success") && (
                    <Button variant="outline" size="sm">
                      <RotateCcw className="mr-1 h-3 w-3" />
                      Restart
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Settings className="mr-1 h-3 w-3" />
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPipelines.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">No pipelines found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
