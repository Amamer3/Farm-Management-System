import { getAppName } from "@/lib/env"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Set up an Agrocyms farm account"
export const size = ogSize
export const contentType = ogContentType

export default function GetStartedOpenGraphImage() {
  return renderOgImage({
    eyebrow: getAppName(),
    title: "Set up your farm",
    subtitle: "Name the farm, choose enterprises, and open the dashboard.",
  })
}
