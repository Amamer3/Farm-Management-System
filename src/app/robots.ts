import type { MetadataRoute } from "next"
import { absoluteUrl, PRIVATE_PATHS } from "@/lib/seo"

const publicRules = {
  allow: "/",
  disallow: [...PRIVATE_PATHS],
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        ...publicRules,
      },
      {
        userAgent: "GPTBot",
        ...publicRules,
      },
      {
        userAgent: "ChatGPT-User",
        ...publicRules,
      },
      {
        userAgent: "ClaudeBot",
        ...publicRules,
      },
      {
        userAgent: "PerplexityBot",
        ...publicRules,
      },
      {
        userAgent: "Google-Extended",
        ...publicRules,
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  }
}
