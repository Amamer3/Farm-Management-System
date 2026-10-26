import { getAppName } from "@/lib/env"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Contact Agrocyms"
export const size = ogSize
export const contentType = ogContentType

export default function ContactOpenGraphImage() {
  return renderOgImage({
    eyebrow: getAppName(),
    title: "Contact",
    subtitle: "Questions about farm management software and subscriptions.",
  })
}
