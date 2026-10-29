import type { Metadata } from "next"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { MarketingPhotoCard } from "@/components/marketing/MarketingPhoto"
import { JsonLd } from "@/components/seo/JsonLd"
import { FEATURE_PAGES } from "@/lib/marketing"
import { MARKETING_PHOTOS, photoForFeature, photoForHref } from "@/lib/marketingImages"
import { FEATURE_OVERVIEW } from "@/lib/siteContent"
import { createPageMetadata, itemListJsonLd, pageGraphJsonLd, webPageJsonLd } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Farm Management Software Features | Agrocyms",
  description: FEATURE_OVERVIEW.description,
  path: "/features",
  absoluteTitle: true,
  keywords: FEATURE_OVERVIEW.keywords,
})

export default function FeaturesPage() {
  return (
    <>
      <JsonLd
        data={pageGraphJsonLd([
          webPageJsonLd({
            name: FEATURE_OVERVIEW.title,
            description: FEATURE_OVERVIEW.description,
            path: "/features",
            type: "CollectionPage",
            image: MARKETING_PHOTOS.farmer.src,
          }),
          itemListJsonLd(FEATURE_OVERVIEW.sections.map((item) => ({ name: item.title, path: item.href }))),
        ])}
      />
      <MarketingPage
        eyebrow={FEATURE_OVERVIEW.eyebrow}
        title={FEATURE_OVERVIEW.headline}
        lead={FEATURE_OVERVIEW.lead}
        image={MARKETING_PHOTOS.farmer.src}
        imageAlt={MARKETING_PHOTOS.farmer.alt}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
        ]}
      >
        <section className="mx-auto max-w-[1320px] px-4 pb-6 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_OVERVIEW.sections.map((item) => {
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
        <section className="mx-auto max-w-[1320px] px-4 pb-6 sm:px-6">
          <h2 className="text-2xl font-extrabold tracking-tight">Enterprise records in the live product</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#526057]">
            These pages describe the poultry, livestock, and crop records you can open after setup.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {FEATURE_PAGES.map((item) => {
              const photo = photoForFeature(item.slug)
              return (
                <MarketingPhotoCard
                  key={item.slug}
                  href={`/features/${item.slug}`}
                  title={item.eyebrow}
                  body={item.headline}
                  src={photo.src}
                  alt={photo.alt}
                  heading="h3"
                />
              )
            })}
          </div>
        </section>
        <MarketingCta
          title="Bring Your Farming Operations Together"
          body="Discover how Agrocyms can support a more organized approach to farm management."
          label="Create Your Account"
        />
      </MarketingPage>
    </>
  )
}
