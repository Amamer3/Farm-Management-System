import type { Metadata } from "next"
import { HomePage } from "@/views/HomePage"
import { getAppDescription, getAppTitle } from "@/lib/env"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: getAppTitle(),
  description: getAppDescription(),
  path: "/",
  absoluteTitle: true,
  keywords: [
    "farm management software",
    "poultry farm records",
    "mixed livestock software",
    "crop and livestock dashboard",
  ],
})

export default function Page() {
  return <HomePage />
}
