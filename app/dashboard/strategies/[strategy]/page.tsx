import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StrategyDetails } from "@/components/strategy-details"

interface StrategyPageProps {
  params: {
    strategy: string
  }
}

export default async function StrategyPage({ params }: StrategyPageProps) {
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
      <StrategyDetails strategy={params.strategy} />
    </DashboardLayout>
  )
}
