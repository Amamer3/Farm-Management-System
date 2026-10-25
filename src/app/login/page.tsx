import type { Metadata } from "next"
import { Suspense } from "react"
import { AuthPage } from "@/components/auth/AuthPage"
import { getAppName } from "@/lib/env"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Log in",
  description: `Sign in to your ${getAppName()} farm workspace to continue production, inventory, and health records.`,
  path: "/login",
  keywords: ["Agrocyms login", "farm software login"],
})

function LoginFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <AuthPage />
    </Suspense>
  )
}
