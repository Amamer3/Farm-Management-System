import type { Metadata } from "next"
import { ProtectedPage } from "@/components/ProtectedPage"
import Index from "@/views/Index"
import { createPrivateMetadata } from "@/lib/seo"

export const metadata: Metadata = createPrivateMetadata("Dashboard", "/dashboard")

export default function DashboardPage() {
  return (
    <ProtectedPage requiredPage="/dashboard">
      <Index />
    </ProtectedPage>
  )
}
