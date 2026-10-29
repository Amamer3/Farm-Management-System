import type { Metadata } from "next"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { MarketingPhotoCard } from "@/components/marketing/MarketingPhoto"
import { JsonLd } from "@/components/seo/JsonLd"
import { USE_CASE_PAGES } from "@/lib/marketing"
import { MARKETING_PHOTOS, photoForUseCase } from "@/lib/marketingImages"
import { createPageMetadata, itemListJsonLd, pageGraphJsonLd, webPageJsonLd } from "@/lib/seo"

const title = "Farm Software Use Cases | Mixed Farms, Eggs & Inventory"
const description =
  "See how mixed farms, egg collection, and feed inventory use Agrocyms. One workspace for poultry, livestock, and crops."

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/use-cases",
  absoluteTitle: true,
  keywords: [
    "farm software use cases",
    "mixed farm software",
    "egg collection software",
    "farm feed inventory",
  ],
})

export default function UseCasesPage() {
  return (
    <>
      <JsonLd
        data={pageGraphJsonLd([
          webPageJsonLd({
            name: title,
            description,
            path: "/use-cases",
            type: "CollectionPage",
            image: MARKETING_PHOTOS.mixed.src,
          }),
          itemListJsonLd(USE_CASE_PAGES.map((item) => ({ name: item.title, path: `/use-cases/${item.slug}` }))),
        ])}
      />
      <MarketingPage
        eyebrow="Use cases"
        title="How farms put the books in one place."
        lead="These pages cover the jobs mixed farms ask about most: one login for several enterprises, daily egg records, and stock that sits beside the animals."
        image={MARKETING_PHOTOS.mixed.src}
        imageAlt={MARKETING_PHOTOS.mixed.alt}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Use cases", path: "/use-cases" },
        ]}
      >
        <section className="mx-auto max-w-[1320px] px-4 pb-6 sm:px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {USE_CASE_PAGES.map((item) => {
              const photo = photoForUseCase(item.slug)
              return (
                <MarketingPhotoCard
                  key={item.slug}
                  href={`/use-cases/${item.slug}`}
                  title={item.eyebrow}
                  body={item.summary}
                  src={photo.src}
                  alt={photo.alt}
                  cta={item.eyebrow}
                />
              )
            })}
          </div>
        </section>
        <MarketingCta
          title="Start with the mix you have"
          body="Signup asks what you raise and grow. The dashboard follows that work."
        />
      </MarketingPage>
    </>
  )
}
