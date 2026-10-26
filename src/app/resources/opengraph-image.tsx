import { getAppName } from "@/lib/env"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Agrocyms farm management resources"
export const size = ogSize
export const contentType = ogContentType

export default function ResourcesOpenGraphImage() {
  return renderOgImage({
    eyebrow: getAppName(),
    title: "Resources",
    subtitle: "Practical insights for better farm management.",
  })
}
