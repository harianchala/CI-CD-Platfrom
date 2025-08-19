import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ManualSection } from "@/components/manual-section"

interface ManualSectionPageProps {
  params: {
    section: string
  }
}

export default async function ManualSectionPage({ params }: ManualSectionPageProps) {
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
      <ManualSection section={params.section} />
    </DashboardLayout>
  )
}
