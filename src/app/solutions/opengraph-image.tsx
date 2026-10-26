import { getAppName } from "@/lib/env"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Agrocyms farm management solutions"
export const size = ogSize
export const contentType = ogContentType

export default function SolutionsOpenGraphImage() {
  return renderOgImage({
    eyebrow: getAppName(),
    title: "Solutions",
    subtitle: "Farm management for crop, livestock, and commercial farms.",
  })
}
