import { getAppName } from "@/lib/env"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Agrocyms livestock management software"
export const size = ogSize
export const contentType = ogContentType

export default function LivestockManagementOpenGraphImage() {
  return renderOgImage({
    eyebrow: getAppName(),
    title: "Livestock management",
    subtitle: "Organize poultry, goats, cattle, and pig records.",
  })
}
