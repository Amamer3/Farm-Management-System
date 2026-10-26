import { getAppName } from "@/lib/env"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Agrocyms pricing"
export const size = ogSize
export const contentType = ogContentType

export default function PricingOpenGraphImage() {
  return renderOgImage({
    eyebrow: getAppName(),
    title: "Pricing",
    subtitle: "Choose a plan for your farming business.",
  })
}
