import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeCustomizer } from "@/components/theme-customizer"
import "./globals.css"

export const metadata: Metadata = {
  title: "DevFlow - CI/CD Platform",
  description:
    "Modern CI/CD platform for microservices deployment with automated testing, containerization, and deployment strategies",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={["light", "dark", "system", "blue", "green", "purple"]}
        >
          {children}
          <ThemeCustomizer />
        </ThemeProvider>
      </body>
    </html>
  )
}
