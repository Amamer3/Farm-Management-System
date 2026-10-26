import { getAppName } from "@/lib/env"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Agrocyms crop management software"
export const size = ogSize
export const contentType = ogContentType

export default function CropManagementOpenGraphImage() {
  return renderOgImage({
    eyebrow: getAppName(),
    title: "Crop management",
    subtitle: "Organize crop farming activities and production records.",
  })
}
