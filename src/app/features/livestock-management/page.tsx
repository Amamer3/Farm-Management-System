import type { Metadata } from "next"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { MarketingPhotoCard } from "@/components/marketing/MarketingPhoto"
import { JsonLd } from "@/components/seo/JsonLd"
import { FEATURE_PAGES } from "@/lib/marketing"
import { MARKETING_PHOTOS, photoForFeature } from "@/lib/marketingImages"
import { LIVESTOCK_HUB } from "@/lib/siteContent"
import { createPageMetadata, pageGraphJsonLd, webPageJsonLd } from "@/lib/seo"

const livestock = FEATURE_PAGES.filter((item) => item.slug !== "crops")

export const metadata: Metadata = createPageMetadata({
  title: LIVESTOCK_HUB.title,
  description: LIVESTOCK_HUB.description,
  path: "/features/livestock-management",
  absoluteTitle: true,
  keywords: LIVESTOCK_HUB.keywords,
})

export default function LivestockManagementPage() {
  return (
    <>
      <JsonLd
        data={pageGraphJsonLd([
          webPageJsonLd({
            name: LIVESTOCK_HUB.headline,
            description: LIVESTOCK_HUB.description,
            path: "/features/livestock-management",
            image: MARKETING_PHOTOS.cattle.src,
          }),
        ])}
      />
      <MarketingPage
        eyebrow={LIVESTOCK_HUB.eyebrow}
        title={LIVESTOCK_HUB.headline}
        lead={LIVESTOCK_HUB.lead}
        image={MARKETING_PHOTOS.cattle.src}
        imageAlt={MARKETING_PHOTOS.cattle.alt}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Livestock management", path: "/features/livestock-management" },
        ]}
      >
        <section className="mx-auto max-w-[1320px] px-4 pb-6 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2">
            {LIVESTOCK_HUB.sections.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-[#E4E8E4] bg-white p-6">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#526057]">{item.body}</p>
              </article>
            ))}
          </div>
          <h2 className="mt-10 text-2xl font-extrabold tracking-tight">Livestock modules in Agrocyms</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {livestock.map((item) => {
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
          title="Take a more organized approach to livestock management."
          body="Choose poultry, goats and sheep, cattle, pigs, or a mix when you create the farm."
          label="Create Your Account"
        />
      </MarketingPage>
    </>
  )
}
