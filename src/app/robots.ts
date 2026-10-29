import type { MetadataRoute } from "next"
import { absoluteUrl, ROBOTS_DISALLOW } from "@/lib/seo"

const publicRules = {
  allow: "/",
  disallow: [...ROBOTS_DISALLOW],
}

export default function robots(): MetadataRoute.Robots {
  try {
  return {
    rules: [
      { userAgent: "Googlebot", ...publicRules },
      { userAgent: "Googlebot-Image", ...publicRules },
      { userAgent: "Bingbot", ...publicRules },
      { userAgent: "DuckDuckBot", ...publicRules },
      { userAgent: "Applebot", ...publicRules },
      { userAgent: "GPTBot", ...publicRules },
      { userAgent: "ChatGPT-User", ...publicRules },
      { userAgent: "ClaudeBot", ...publicRules },
      { userAgent: "PerplexityBot", ...publicRules },
      { userAgent: "Google-Extended", ...publicRules },
      { userAgent: "Amazonbot", ...publicRules },
      { userAgent: "*", ...publicRules },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  }
  } catch {
    return {
      rules: { userAgent: "*", allow: "/", disallow: [...ROBOTS_DISALLOW] },
      sitemap: absoluteUrl("/sitemap.xml"),
    }
  }
}
