import type { MetadataRoute } from "next"
import { absoluteUrl, PUBLIC_ROUTES, SITE_CONTENT_UPDATED } from "@/lib/seo"

export const revalidate = 3600

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: SITE_CONTENT_UPDATED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    ...("images" in route && route.images
      ? { images: route.images.map((image) => absoluteUrl(image)) }
      : {}),
  }))
}
