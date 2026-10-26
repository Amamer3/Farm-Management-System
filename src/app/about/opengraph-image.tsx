import { getAppName } from "@/lib/env"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "About Agrocyms farm management software"
export const size = ogSize
export const contentType = ogContentType

export default function AboutOpenGraphImage() {
  return renderOgImage({
    eyebrow: getAppName(),
    title: "About Agrocyms",
    subtitle: "Helping agricultural businesses manage smarter.",
  })
}
