import { getAppName } from "@/lib/env"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Agrocyms farm software use cases"
export const size = ogSize
export const contentType = ogContentType

export default function UseCasesOpenGraphImage() {
  return renderOgImage({
    eyebrow: getAppName(),
    title: "Use cases",
    subtitle: "Mixed farms, egg collection, and inventory in one workspace.",
  })
}
