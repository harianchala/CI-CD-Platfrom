"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/actions";

interface SignInFormProps {
  onSuccess?: () => void; // ← Add this
}

export default function SignInForm({ onSuccess }: SignInFormProps) {
  const router = useRouter();
  const [state, setState] = useState<{ success?: boolean; error?: string }>({});
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    startTransition(async () => {
      const result = await signIn({ email, password });
      setState(result);
      if (result.success) {
        onSuccess?.();
        router.push("/dashboard");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {state.error && (
        <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-md text-sm">
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="you@example.com" required className="h-11" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required className="h-11" />
      </div>

      <Button type="submit" disabled={isPending} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
        {isPending ? <Loader2 className="animate-spin h-4 w-4" /> : "Sign In"}
      </Button>
    </form>
  );
}
