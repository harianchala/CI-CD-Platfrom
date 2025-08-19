import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PipelineDetails } from "@/components/pipeline-details"

interface PipelinePageProps {
  params: {
    id: string
  }
}

export default async function PipelinePage({ params }: PipelinePageProps) {
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
      <PipelineDetails pipelineId={params.id} />
    </DashboardLayout>
  )
}
