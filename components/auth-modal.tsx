"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignInForm } from "@/components/sign-in-form"
import { SignUpForm } from "@/components/sign-up-form"

interface AuthModalProps {
  mode: "signin" | "signup" | null
  onClose: () => void
}

export function AuthModal({ mode, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(mode || "signin")

  return (
    <Dialog open={!!mode} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Welcome to DevFlow</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="mt-6">
            <SignInForm onSuccess={onClose} />
          </TabsContent>

          <TabsContent value="signup" className="mt-6">
            <SignUpForm onSuccess={onClose} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
