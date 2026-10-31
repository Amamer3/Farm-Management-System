import { FEATURE_PAGES, USE_CASE_PAGES, FAQS } from "@/lib/marketing"
import { getAppDescription, getAppName } from "@/lib/env"
import {
  ABOUT,
  CROP_HUB,
  FEATURE_OVERVIEW,
  LIVESTOCK_HUB,
  PRICING,
  RESOURCE_ARTICLES,
  SOLUTIONS,
} from "@/lib/siteContent"
import { absoluteUrl, LLMS_PATH } from "@/lib/seo"

export const revalidate = 3600

export function GET() {
  try {
  const name = getAppName()
  const articles = RESOURCE_ARTICLES.map((article) => {
    const sections = article.sections.map((section) => `### ${section.heading}\n\n${section.body}`).join("\n\n")
    return `## ${article.title}

- URL: ${absoluteUrl(`/resources/${article.slug}`)}
- Category: ${article.category}

${article.description}

${sections}`
  }).join("\n\n")

  const features = FEATURE_PAGES.map((item) => {
    return `### ${item.title}

- URL: ${absoluteUrl(`/features/${item.slug}`)}
- ${item.description}

Records: ${item.records.join("; ")}.`
  }).join("\n\n")

  const useCases = USE_CASE_PAGES.map((item) => {
    return `### ${item.title}

- URL: ${absoluteUrl(`/use-cases/${item.slug}`)}
- ${item.description}`
  }).join("\n\n")

  const faqs = FAQS.map((item) => `Q: ${item.question}\nA: ${item.answer}`).join("\n\n")

  const body = `# ${name}

> ${getAppDescription()}

Index: ${absoluteUrl(LLMS_PATH)}

${name} is farm management software for crop and livestock businesses. Farms choose poultry, goats and sheep, cattle, pigs, crops, or a mix during setup. The dashboard then shows records for that mix. New farms receive a 90-day trial of the full workspace with no card required.

## Product pages

- Home: ${absoluteUrl("/")}
- Features: ${absoluteUrl("/features")} — ${FEATURE_OVERVIEW.description}
- Crop management: ${absoluteUrl("/features/crop-management")} — ${CROP_HUB.description}
- Livestock management: ${absoluteUrl("/features/livestock-management")} — ${LIVESTOCK_HUB.description}
- Solutions: ${absoluteUrl("/solutions")} — ${SOLUTIONS.description}
- Pricing: ${absoluteUrl("/pricing")} — ${PRICING.description}
- About: ${absoluteUrl("/about")} — ${ABOUT.description}
- FAQ: ${absoluteUrl("/faq")}
- Contact: ${absoluteUrl("/contact")}
- Get started: ${absoluteUrl("/get-started")}

## Enterprise records

${features}

## Use cases

${useCases}

## Guides

${articles}

## FAQ

${faqs}

Authenticated workspace routes are private and should not be treated as public documentation.
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
  } catch {
    return new Response("Unable to generate this file right now.", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
  }
}
