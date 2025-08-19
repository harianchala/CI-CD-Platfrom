"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Save,
  Play,
  GitBranch,
  Code,
  TestTube,
  Shield,
  Rocket,
  Settings,
  Trash2,
  ArrowDown,
  ArrowUp,
} from "lucide-react"

interface PipelineStep {
  id: string
  name: string
  type: "build" | "test" | "security" | "deploy"
  config: Record<string, any>
  enabled: boolean
}

export function PipelineBuilder() {
  const [pipelineName, setPipelineName] = useState("")
  const [pipelineDescription, setPipelineDescription] = useState("")
  const [selectedProject, setSelectedProject] = useState("")
  const [steps, setSteps] = useState<PipelineStep[]>([
    {
      id: "1",
      name: "Build Application",
      type: "build",
      config: { command: "npm run build", dockerfile: "Dockerfile" },
      enabled: true,
    },
    {
      id: "2",
      name: "Run Tests",
      type: "test",
      config: { command: "npm test", coverage: true },
      enabled: true,
    },
    {
      id: "3",
      name: "Security Scan",
      type: "security",
      config: { scanner: "snyk", failOnHigh: true },
      enabled: true,
    },
    {
      id: "4",
      name: "Deploy to Staging",
      type: "deploy",
      config: { environment: "staging", strategy: "rolling" },
      enabled: true,
    },
  ])

  const stepTypes = [
    { value: "build", label: "Build", icon: Code, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
    { value: "test", label: "Test", icon: TestTube, color: "bg-green-100 text-green-600 dark:bg-green-900/30" },
    { value: "security", label: "Security", icon: Shield, color: "bg-red-100 text-red-600 dark:bg-red-900/30" },
    { value: "deploy", label: "Deploy", icon: Rocket, color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30" },
  ]

  const addStep = (type: PipelineStep["type"]) => {
    const newStep: PipelineStep = {
      id: Date.now().toString(),
      name: `New ${type} step`,
      type,
      config: {},
      enabled: true,
    }
    setSteps([...steps, newStep])
  }

  const updateStep = (id: string, updates: Partial<PipelineStep>) => {
    setSteps(steps.map((step) => (step.id === id ? { ...step, ...updates } : step)))
  }

  const removeStep = (id: string) => {
    setSteps(steps.filter((step) => step.id !== id))
  }

  const moveStep = (id: string, direction: "up" | "down") => {
    const index = steps.findIndex((step) => step.id === id)
    if (index === -1) return

    const newSteps = [...steps]
    const targetIndex = direction === "up" ? index - 1 : index + 1

    if (targetIndex >= 0 && targetIndex < steps.length) {
      ;[newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]]
      setSteps(newSteps)
    }
  }

  const getStepIcon = (type: PipelineStep["type"]) => {
    const stepType = stepTypes.find((t) => t.value === type)
    return stepType ? stepType.icon : Code
  }

  const getStepColor = (type: PipelineStep["type"]) => {
    const stepType = stepTypes.find((t) => t.value === type)
    return stepType ? stepType.color : "bg-gray-100 text-gray-600 dark:bg-gray-900/30"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pipeline Builder</h1>
          <p className="text-muted-foreground">Create and configure your CI/CD pipeline</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Play className="mr-2 h-4 w-4" />
            Create Pipeline
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Configuration</CardTitle>
              <CardDescription>Basic settings for your pipeline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Pipeline Name</Label>
                <Input
                  id="name"
                  placeholder="My CI/CD Pipeline"
                  value={pipelineName}
                  onChange={(e) => setPipelineName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this pipeline does..."
                  value={pipelineDescription}
                  onChange={(e) => setPipelineDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecommerce-api">E-commerce API</SelectItem>
                    <SelectItem value="user-dashboard">User Dashboard</SelectItem>
                    <SelectItem value="payment-service">Payment Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add Steps</CardTitle>
              <CardDescription>Drag and drop or click to add pipeline steps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {stepTypes.map((stepType) => {
                  const Icon = stepType.icon
                  return (
                    <Button
                      key={stepType.value}
                      variant="outline"
                      className="h-20 flex-col space-y-2 bg-transparent"
                      onClick={() => addStep(stepType.value as PipelineStep["type"])}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stepType.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs">{stepType.label}</span>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pipeline Steps */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Steps</CardTitle>
              <CardDescription>Configure the steps in your pipeline execution order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const Icon = getStepIcon(step.type)
                  return (
                    <div key={step.id} className="relative">
                      <Card className="border-2 border-dashed border-muted hover:border-primary/50 transition-colors">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStepColor(step.type)}`}
                              >
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <Input
                                  value={step.name}
                                  onChange={(e) => updateStep(step.id, { name: e.target.value })}
                                  className="font-medium border-none p-0 h-auto bg-transparent"
                                />
                                <Badge variant="outline" className="mt-1">
                                  {step.type}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={step.enabled}
                                onCheckedChange={(enabled) => updateStep(step.id, { enabled })}
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveStep(step.id, "up")}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveStep(step.id, "down")}
                                disabled={index === steps.length - 1}
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Settings className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => removeStep(step.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <Tabs defaultValue="config" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="config">Configuration</TabsTrigger>
                              <TabsTrigger value="conditions">Conditions</TabsTrigger>
                            </TabsList>
                            <TabsContent value="config" className="space-y-3 mt-3">
                              {step.type === "build" && (
                                <>
                                  <div className="space-y-2">
                                    <Label>Build Command</Label>
                                    <Input
                                      placeholder="npm run build"
                                      value={step.config.command || ""}
                                      onChange={(e) =>
                                        updateStep(step.id, {
                                          config: { ...step.config, command: e.target.value },
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Dockerfile</Label>
                                    <Input
                                      placeholder="Dockerfile"
                                      value={step.config.dockerfile || ""}
                                      onChange={(e) =>
                                        updateStep(step.id, {
                                          config: { ...step.config, dockerfile: e.target.value },
                                        })
                                      }
                                    />
                                  </div>
                                </>
                              )}
                              {step.type === "test" && (
                                <>
                                  <div className="space-y-2">
                                    <Label>Test Command</Label>
                                    <Input
                                      placeholder="npm test"
                                      value={step.config.command || ""}
                                      onChange={(e) =>
                                        updateStep(step.id, {
                                          config: { ...step.config, command: e.target.value },
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      checked={step.config.coverage || false}
                                      onCheckedChange={(coverage) =>
                                        updateStep(step.id, {
                                          config: { ...step.config, coverage },
                                        })
                                      }
                                    />
                                    <Label>Generate Coverage Report</Label>
                                  </div>
                                </>
                              )}
                              {step.type === "security" && (
                                <>
                                  <div className="space-y-2">
                                    <Label>Security Scanner</Label>
                                    <Select
                                      value={step.config.scanner || ""}
                                      onValueChange={(scanner) =>
                                        updateStep(step.id, {
                                          config: { ...step.config, scanner },
                                        })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select scanner" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="snyk">Snyk</SelectItem>
                                        <SelectItem value="sonarqube">SonarQube</SelectItem>
                                        <SelectItem value="codeql">CodeQL</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      checked={step.config.failOnHigh || false}
                                      onCheckedChange={(failOnHigh) =>
                                        updateStep(step.id, {
                                          config: { ...step.config, failOnHigh },
                                        })
                                      }
                                    />
                                    <Label>Fail on High Severity Issues</Label>
                                  </div>
                                </>
                              )}
                              {step.type === "deploy" && (
                                <>
                                  <div className="space-y-2">
                                    <Label>Environment</Label>
                                    <Select
                                      value={step.config.environment || ""}
                                      onValueChange={(environment) =>
                                        updateStep(step.id, {
                                          config: { ...step.config, environment },
                                        })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select environment" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="development">Development</SelectItem>
                                        <SelectItem value="staging">Staging</SelectItem>
                                        <SelectItem value="production">Production</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Deployment Strategy</Label>
                                    <Select
                                      value={step.config.strategy || ""}
                                      onValueChange={(strategy) =>
                                        updateStep(step.id, {
                                          config: { ...step.config, strategy },
                                        })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select strategy" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="rolling">Rolling Update</SelectItem>
                                        <SelectItem value="blue-green">Blue-Green</SelectItem>
                                        <SelectItem value="canary">Canary</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </>
                              )}
                            </TabsContent>
                            <TabsContent value="conditions" className="space-y-3 mt-3">
                              <div className="space-y-2">
                                <Label>Run Condition</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Always run" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="always">Always run</SelectItem>
                                    <SelectItem value="on-success">Only on success</SelectItem>
                                    <SelectItem value="on-failure">Only on failure</SelectItem>
                                    <SelectItem value="manual">Manual approval</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </CardContent>
                      </Card>

                      {/* Connection Line */}
                      {index < steps.length - 1 && (
                        <div className="flex justify-center py-2">
                          <ArrowDown className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  )
                })}

                {steps.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <GitBranch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No steps added yet. Add steps from the panel on the left.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
