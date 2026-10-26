import { useCaseBySlug } from "@/lib/marketing"
import { getAppName } from "@/lib/env"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Agrocyms farm software use case"
export const size = ogSize
export const contentType = ogContentType

export default async function UseCaseOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const useCase = useCaseBySlug(slug)

  return renderOgImage({
    eyebrow: getAppName(),
    title: useCase?.eyebrow || "Farm records",
    subtitle: useCase?.headline || "A workspace shaped around the farm you run.",
  })
}
