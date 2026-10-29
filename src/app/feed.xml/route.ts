import { getAppDescription, getAppName } from "@/lib/env"
import { RESOURCE_ARTICLES } from "@/lib/siteContent"
import { absoluteUrl, RSS_PATH, SITE_CONTENT_UPDATED, xmlEscape } from "@/lib/seo"

export const revalidate = 3600

export function GET() {
  try {
  const name = getAppName()
  const site = absoluteUrl("/")
  const feedUrl = absoluteUrl(RSS_PATH)
  const items = RESOURCE_ARTICLES.map((article) => {
    const url = absoluteUrl(`/resources/${article.slug}`)
    const pubDate = SITE_CONTENT_UPDATED.toUTCString()
    return `    <item>
      <title>${xmlEscape(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${xmlEscape(article.description)}</description>
      <category>${xmlEscape(article.category)}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`
  }).join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(`${name} farm management guides`)}</title>
    <link>${site}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <description>${xmlEscape(getAppDescription())}</description>
    <language>en</language>
    <lastBuildDate>${SITE_CONTENT_UPDATED.toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
  } catch {
    return new Response("Unable to generate the feed right now.", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
  }
}
