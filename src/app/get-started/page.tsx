import type { Metadata } from "next"
import { Suspense } from "react"
import GetStarted from "@/views/GetStarted"
import { JsonLd } from "@/components/seo/JsonLd"
import { getAppName } from "@/lib/env"
import { breadcrumbJsonLd, createPageMetadata, howToJsonLd, pageGraphJsonLd, webPageJsonLd } from "@/lib/seo"

const title = "Start a Free Farm Management Software Trial | Agrocyms"
const description = `Create your ${getAppName()} account, name the farm, and start a 90-day trial of crop and livestock records. No card required.`

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/get-started",
  absoluteTitle: true,
  keywords: ["create Agrocyms account", "farm software signup", "farm management software trial", "get started"],
})

export default function GetStartedPage() {
  return (
    <>
      <JsonLd
        data={pageGraphJsonLd([
          webPageJsonLd({
            name: title,
            description,
            path: "/get-started",
            image: "/farm/farmer.jpg",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Get started", path: "/get-started" },
          ]),
          howToJsonLd(),
        ])}
      />
      <Suspense>
        <GetStarted />
      </Suspense>
    </>
  )
}
