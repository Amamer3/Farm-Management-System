import { getAppName } from "@/lib/env"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Agrocyms farm management features"
export const size = ogSize
export const contentType = ogContentType

export default function FeaturesOpenGraphImage() {
  return renderOgImage({
    eyebrow: getAppName(),
    title: "Features",
    subtitle: "Poultry, livestock, and crops — only the mix this farm runs.",
  })
}
