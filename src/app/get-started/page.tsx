import type { Metadata } from "next"
import GetStarted from "@/views/GetStarted"
import { JsonLd } from "@/components/seo/JsonLd"
import { getAppName } from "@/lib/env"
import { createPageMetadata, howToJsonLd } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Set up your farm",
  description: `Create a ${getAppName()} farm account. Choose poultry, livestock, and crops, then open a dashboard already pointed at that mix.`,
  path: "/get-started",
  keywords: ["farm setup", "create farm account", "Agrocyms signup"],
})

export default function GetStartedPage() {
  return (
    <>
      <JsonLd data={howToJsonLd()} />
      <GetStarted />
    </>
  )
}
