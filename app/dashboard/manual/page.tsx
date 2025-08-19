import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { UserManual } from "@/components/user-manual"

export default async function ManualPage() {
  if (!isSupabaseConfigured) {
    redirect("/")
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <DashboardLayout user={user}>
      <UserManual />
    </DashboardLayout>
  )
}
