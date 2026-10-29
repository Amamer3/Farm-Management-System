import type { Metadata } from "next"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { MarketingPhotoCard } from "@/components/marketing/MarketingPhoto"
import { JsonLd } from "@/components/seo/JsonLd"
import { MARKETING_PHOTOS, photoForHref } from "@/lib/marketingImages"
import { SOLUTIONS } from "@/lib/siteContent"
import { createPageMetadata, itemListJsonLd, pageGraphJsonLd, webPageJsonLd } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: SOLUTIONS.title,
  description: SOLUTIONS.description,
  path: "/solutions",
  absoluteTitle: true,
  keywords: SOLUTIONS.keywords,
})

export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={pageGraphJsonLd([
          webPageJsonLd({
            name: SOLUTIONS.headline,
            description: SOLUTIONS.description,
            path: "/solutions",
            type: "CollectionPage",
            image: MARKETING_PHOTOS.mixed.src,
          }),
          itemListJsonLd(SOLUTIONS.items.map((item) => ({ name: item.title, path: item.href }))),
        ])}
      />
      <MarketingPage
        eyebrow={SOLUTIONS.eyebrow}
        title={SOLUTIONS.headline}
        lead={SOLUTIONS.lead}
        image={MARKETING_PHOTOS.mixed.src}
        imageAlt={MARKETING_PHOTOS.mixed.alt}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ]}
      >
        <section className="mx-auto max-w-[1320px] px-4 pb-6 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.items.map((item) => {
              const photo = photoForHref(item.href)
              return (
                <MarketingPhotoCard
                  key={item.title}
                  href={item.href}
                  title={item.title}
                  body={item.body}
                  src={photo.src}
                  alt={photo.alt}
                  cta="Learn more"
                />
              )
            })}
          </div>
        </section>
        <MarketingCta title="Find the right approach for your farm." body="Create an account and choose the enterprises this farm runs." />
      </MarketingPage>
    </>
  )
}
