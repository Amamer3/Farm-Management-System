import type { Metadata } from "next"
import Link from "next/link"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { MARKETING_PHOTOS } from "@/lib/marketingImages"
import { CROP_HUB } from "@/lib/siteContent"
import { createPageMetadata, pageGraphJsonLd, webPageJsonLd } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: CROP_HUB.title,
  description: CROP_HUB.description,
  path: "/features/crop-management",
  absoluteTitle: true,
  keywords: CROP_HUB.keywords,
})

export default function CropManagementPage() {
  return (
    <>
      <JsonLd
        data={pageGraphJsonLd([
          webPageJsonLd({
            name: CROP_HUB.headline,
            description: CROP_HUB.description,
            path: "/features/crop-management",
            image: MARKETING_PHOTOS.crops.src,
          }),
        ])}
      />
      <MarketingPage
        eyebrow={CROP_HUB.eyebrow}
        title={CROP_HUB.headline}
        lead={CROP_HUB.lead}
        image={MARKETING_PHOTOS.crops.src}
        imageAlt={MARKETING_PHOTOS.crops.alt}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Crop management", path: "/features/crop-management" },
        ]}
      >
        <section className="mx-auto max-w-[1320px] px-4 pb-6 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2">
            {CROP_HUB.sections.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-[#E4E8E4] bg-white p-6">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#526057]">{item.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#3e4b43]">
            After signup, the workspace crop page holds planting, fertilizer, spray, irrigation, and harvest
            records for the crops named on this farm. See also the{" "}
            <Link href="/features/crops" className="font-semibold text-[#173528] underline-offset-4 hover:underline">
              crop feature overview
            </Link>
            .
          </p>
        </section>
        <MarketingCta
          title="Make your crop operations easier to organize."
          body="Create an Agrocyms account and name the crops this farm grows."
          label="Get Started with Agrocyms"
        />
      </MarketingPage>
    </>
  )
}
