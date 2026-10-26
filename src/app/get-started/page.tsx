import type { Metadata } from "next"
import GetStarted from "@/views/GetStarted"
import { JsonLd } from "@/components/seo/JsonLd"
import { getAppName } from "@/lib/env"
import { breadcrumbJsonLd, createPageMetadata, howToJsonLd, webPageJsonLd } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Create Your Agrocyms Account | Get Started",
  description: `Create your ${getAppName()} account to get started with digital farm management.`,
  path: "/get-started",
  absoluteTitle: true,
  keywords: ["create Agrocyms account", "farm software signup", "get started"],
})

export default function GetStartedPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            name: "Create Your Agrocyms Account",
            description: `Create your ${getAppName()} account to get started with digital farm management.`,
            path: "/get-started",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Get started", path: "/get-started" },
          ]),
          howToJsonLd(),
        ]}
      />
      <GetStarted />
    </>
  )
}
