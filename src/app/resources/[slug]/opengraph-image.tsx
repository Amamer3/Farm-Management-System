import { getResourceBySlug } from "@/lib/siteContent"
import { getAppName } from "@/lib/env"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Agrocyms farm management guide"
export const size = ogSize
export const contentType = ogContentType

export default async function ResourceArticleOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getResourceBySlug(slug)

  return renderOgImage({
    eyebrow: article?.category || getAppName(),
    title: article?.title || "Farm management guide",
    subtitle: article?.description || "Practical records for crop and livestock farms.",
  })
}
