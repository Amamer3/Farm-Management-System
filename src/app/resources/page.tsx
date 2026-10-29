import type { Metadata } from "next"
import { MarketingPage } from "@/components/marketing/MarketingPage"
import { MarketingPhotoCard } from "@/components/marketing/MarketingPhoto"
import { JsonLd } from "@/components/seo/JsonLd"
import { MARKETING_PHOTOS, photoForResourceCategory } from "@/lib/marketingImages"
import { RESOURCE_ARTICLES, RESOURCE_CATEGORIES } from "@/lib/siteContent"
import { createPageMetadata, itemListJsonLd, pageGraphJsonLd, webPageJsonLd } from "@/lib/seo"

const title = "Farm Management Guides and Agricultural Insights | Agrocyms"
const description =
  "Practical farm management guides on crop records, livestock events, inventory, digital agriculture, and running the farm as a business."

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/resources",
  absoluteTitle: true,
  keywords: [
    "farm management tips",
    "agriculture guides",
    "digital agriculture",
    "livestock record keeping",
    "crop production records",
  ],
})

export default function ResourcesPage() {
  return (
    <>
      <JsonLd
        data={pageGraphJsonLd([
          webPageJsonLd({
            name: title,
            description,
            path: "/resources",
            type: "CollectionPage",
            image: MARKETING_PHOTOS.mixed.src,
          }),
          itemListJsonLd(RESOURCE_ARTICLES.map((item) => ({ name: item.title, path: `/resources/${item.slug}` }))),
        ])}
      />
      <MarketingPage
        eyebrow="Resources"
        title="Practical Insights for Better Farm Management"
        lead="Explore educational resources designed to help agricultural businesses organize their operations, understand farm management practices, and make more informed decisions."
        image={MARKETING_PHOTOS.mixed.src}
        imageAlt={MARKETING_PHOTOS.mixed.alt}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ]}
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
            {RESOURCE_ARTICLES.map((item) => {
              const photo = photoForResourceCategory(item.category)
              return (
                <MarketingPhotoCard
                  key={item.slug}
                  href={`/resources/${item.slug}`}
                  title={item.title}
                  body={item.description}
                  src={photo.src}
                  alt={photo.alt}
                  cta="Read guide"
                />
              )
            })}
          </div>
        </section>
      </MarketingPage>
    </>
  )
}
