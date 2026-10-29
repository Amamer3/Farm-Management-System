import type { Metadata } from "next"
import { ForgotPassword } from "@/views/ForgotPassword"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Reset password",
  description: "Request a password reset for your Agrocyms farm account.",
  path: "/forgot-password",
  index: false,
  follow: false,
})

export default function ForgotPasswordPage() {
  return <ForgotPassword />
}
