import type { Metadata } from "next"
import { HomePage } from "@/views/HomePage"
import { JsonLd } from "@/components/seo/JsonLd"
import { FAQS } from "@/lib/marketing"
import { HOME_SEO } from "@/lib/siteContent"
import { createPageMetadata, faqJsonLd, pageGraphJsonLd, webPageJsonLd } from "@/lib/seo"

const homeTitle = HOME_SEO.title
const homeDescription = HOME_SEO.description

export const revalidate = 3600

export const metadata: Metadata = createPageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: "/",
  absoluteTitle: true,
  keywords: HOME_SEO.keywords,
  imageAlt: "Agrocyms farm management software",
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={pageGraphJsonLd([
          webPageJsonLd({
            name: homeTitle,
            description: homeDescription,
            path: "/",
            image: "/landing/farmer.jpg",
          }),
          faqJsonLd(FAQS),
        ])}
      />
      <HomePage />
    </>
  )
}
