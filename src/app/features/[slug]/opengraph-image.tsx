import { featureBySlug } from "@/lib/marketing"
import { getAppName } from "@/lib/env"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const size = ogSize
export const contentType = ogContentType

export default async function FeatureOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const feature = featureBySlug(slug)

  return renderOgImage({
    eyebrow: getAppName(),
    title: feature?.eyebrow || "Farm records",
    subtitle: feature?.headline || "A workspace shaped around the farm you run.",
  })
}
