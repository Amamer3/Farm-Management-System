import type { Metadata } from "next"
import Link from "next/link"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { CROP_HUB } from "@/lib/siteContent"
import { breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "@/lib/seo"

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
        data={[
          webPageJsonLd({
            name: CROP_HUB.headline,
            description: CROP_HUB.description,
            path: "/features/crop-management",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Features", path: "/features" },
            { name: "Crop management", path: "/features/crop-management" },
          ]),
        ]}
      />
      <MarketingPage eyebrow={CROP_HUB.eyebrow} title={CROP_HUB.headline} lead={CROP_HUB.lead}>
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
            See the{" "}
            <Link href="/features/crops" className="font-semibold text-[#173528] underline-offset-4 hover:underline">
              crop records
            </Link>{" "}
            currently attached to a farm profile, including the crop list chosen at signup.
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
