import type { Metadata } from "next"
import Link from "next/link"
import { MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { RESOURCE_ARTICLES, RESOURCE_CATEGORIES } from "@/lib/siteContent"
import { breadcrumbJsonLd, createPageMetadata, itemListJsonLd, webPageJsonLd } from "@/lib/seo"

const title = "Farm Management Guides and Agricultural Insights | Agrocyms"
const description =
  "Explore practical guides on farm management, crop production, livestock operations, farm records, and agricultural business organization."

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/resources",
  absoluteTitle: true,
  keywords: ["farm management tips", "agriculture guides", "digital agriculture"],
})

export default function ResourcesPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: title, description, path: "/resources" }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
          ]),
          itemListJsonLd(RESOURCE_ARTICLES.map((item) => ({ name: item.title, path: `/resources/${item.slug}` }))),
        ]}
      />
      <MarketingPage
        eyebrow="Resources"
        title="Practical Insights for Better Farm Management"
        lead="Explore educational resources designed to help agricultural businesses organize their operations, understand farm management practices, and make more informed decisions."
      >
        <section className="mx-auto max-w-[1320px] px-4 pb-16 sm:px-6">
          <div className="mb-8 flex flex-wrap gap-2">
            {RESOURCE_CATEGORIES.map((category) => (
              <span key={category} className="rounded-full bg-[#E7F3E4] px-3 py-1.5 text-xs font-semibold text-[#173528]">
                {category}
              </span>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {RESOURCE_ARTICLES.map((item) => (
              <article key={item.slug} className="rounded-[28px] border border-[#E4E8E4] bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#3d6b4a]">{item.category}</p>
                <h2 className="mt-2 text-xl font-bold">
                  <Link href={`/resources/${item.slug}`} className="hover:underline">
                    {item.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#526057]">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </MarketingPage>
    </>
  )
}
