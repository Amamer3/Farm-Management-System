import { getAppName } from "@/lib/env"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Agrocyms farm management FAQ"
export const size = ogSize
export const contentType = ogContentType

export default function FaqOpenGraphImage() {
  return renderOgImage({
    eyebrow: getAppName(),
    title: "FAQ",
    subtitle: "Questions farms ask before they switch the books.",
  })
}
