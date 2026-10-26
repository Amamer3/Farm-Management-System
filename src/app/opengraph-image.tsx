import { getAppName } from "@/lib/env"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Agrocyms farm management software"
export const size = ogSize
export const contentType = ogContentType

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: getAppName(),
    title: "Manage Your Farm Smarter",
    subtitle: "One platform. Every farm. Smarter agriculture.",
  })
}
