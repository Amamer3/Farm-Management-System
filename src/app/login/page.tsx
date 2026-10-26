import type { Metadata } from "next"
import { Suspense } from "react"
import { AuthPage } from "@/components/auth/AuthPage"
import { getAppName } from "@/lib/env"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Sign In to Agrocyms",
  description: `Sign in to your ${getAppName()} account to access your farm management workspace.`,
  path: "/login",
  index: false,
  follow: true,
  absoluteTitle: true,
  keywords: ["Agrocyms login", "sign in"],
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
