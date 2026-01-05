"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Sign in action
export async function signIn(data: { email: string; password: string }) {
  const supabase = createServerActionClient({ cookies });
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

// Sign up action
interface SignUpParams {
  fullName: string;
  email: string;
  password: string;
}

export async function signUp({ fullName, email, password }: SignUpParams) {
  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore });

  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
          `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/dashboard`,
        data: {
          full_name: fullName || "",
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    return { success: "Check your email to confirm your account." };
  } catch (err) {
    console.error("Sign up error:", err);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
// Sign out action
export async function signOut() {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  await supabase.auth.signOut()
  redirect("/")
}
