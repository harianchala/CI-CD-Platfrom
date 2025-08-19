"use client"
import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Check, Sun, Moon, Monitor } from "lucide-react"

export function ThemeCustomizer() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themeOptions = [
    {
      name: "Light",
      value: "light",
      icon: Sun,
      description: "Clean and bright interface",
      preview: "bg-white border-gray-200",
    },
    {
      name: "Dark",
      value: "dark",
      icon: Moon,
      description: "Easy on the eyes",
      preview: "bg-gray-900 border-gray-700",
    },
    {
      name: "System",
      value: "system",
      icon: Monitor,
      description: "Follows your system preference",
      preview: "bg-gradient-to-r from-white to-gray-900",
    },
  ]

  const colorThemes = [
    {
      name: "Blue",
      value: "blue",
      color: "bg-blue-500",
      description: "Professional and trustworthy",
    },
    {
      name: "Green",
      value: "green",
      color: "bg-green-500",
      description: "Fresh and natural",
    },
    {
      name: "Purple",
      value: "purple",
      color: "bg-purple-500",
      description: "Creative and modern",
    },
  ]

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 shadow-lg"
      >
        <Palette className="h-4 w-4 mr-2" />
        Customize Theme
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 shadow-xl animate-scale-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Theme Customizer</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-6 w-6 p-0">
            ×
          </Button>
        </div>
        <CardDescription>Customize your DevFlow experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-3">Theme Mode</h4>
          <div className="grid grid-cols-1 gap-2">
            {themeOptions.map((themeOption) => {
              const Icon = themeOption.icon
              const isSelected = theme === themeOption.value
              return (
                <Button
                  key={themeOption.value}
                  variant={isSelected ? "default" : "outline"}
                  className="justify-start h-auto p-3"
                  onClick={() => setTheme(themeOption.value)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className={`w-8 h-8 rounded border-2 ${themeOption.preview} flex items-center justify-center`}>
                      <Icon className="h-3 w-3" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{themeOption.name}</div>
                      <div className="text-xs text-muted-foreground">{themeOption.description}</div>
                    </div>
                    {isSelected && <Check className="h-4 w-4" />}
                  </div>
                </Button>
              )
            })}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Color Accent</h4>
          <div className="grid grid-cols-1 gap-2">
            {colorThemes.map((colorTheme) => {
              const isSelected = theme === colorTheme.value
              return (
                <Button
                  key={colorTheme.value}
                  variant={isSelected ? "default" : "outline"}
                  className="justify-start h-auto p-3"
                  onClick={() => setTheme(colorTheme.value)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className={`w-6 h-6 rounded-full ${colorTheme.color}`} />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{colorTheme.name}</div>
                      <div className="text-xs text-muted-foreground">{colorTheme.description}</div>
                    </div>
                    {isSelected && <Check className="h-4 w-4" />}
                  </div>
                </Button>
              )
            })}
          </div>
        </div>

        <div className="pt-2 border-t">
          <Badge variant="secondary" className="text-xs">
            Current: {theme || "system"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
