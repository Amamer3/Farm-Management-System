import type { Metadata } from "next"
import { HomePage } from "@/views/HomePage"
import { JsonLd } from "@/components/seo/JsonLd"
import { FAQS } from "@/lib/marketing"
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd, webPageJsonLd } from "@/lib/seo"

const homeTitle = "Agrocyms | Farm Management Software for Poultry, Livestock & Crops"
const homeDescription =
  "Agrocyms is farm management software for mixed enterprises. Track poultry and egg collection, goats and sheep, cattle, pigs, feed, medicine, and crops in one farm workspace."

export const metadata: Metadata = createPageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: "/",
  absoluteTitle: true,
  keywords: [
    "farm management software",
    "poultry farm records",
    "egg collection tracking",
    "mixed livestock software",
    "crop and livestock dashboard",
  ],
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: homeTitle, description: homeDescription, path: "/" }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
          faqJsonLd(FAQS),
        ]}
      />
      <HomePage />
    </>
  )
}
