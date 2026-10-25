import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { FEATURE_PAGES } from "@/lib/marketing"
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Farm management features",
  description:
    "Agrocyms covers poultry, goats and sheep, cattle, pigs, and crops. Pick the mix this farm runs and keep production, stock, and health in one workspace.",
  path: "/features",
  keywords: [
    "farm management features",
    "poultry software",
    "livestock records",
    "crop farm software",
  ],
})

export default function FeaturesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
        ])}
      />
      <MarketingPage
        eyebrow="Product"
        title="What the farm can run"
        lead="Each enterprise has its own records. Mixed farms only see the animals and crops they actually keep."
      >
        <section className="mx-auto max-w-[1320px] px-4 pb-6 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_PAGES.map((item) => (
              <article key={item.slug} className="flex flex-col rounded-[28px] bg-[#F3F4F2] p-6">
                <h2 className="text-xl font-bold">{item.eyebrow}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#526057]">{item.summary}</p>
                <Link
                  href={`/features/${item.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#173528]"
                >
                  {item.eyebrow} records
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
            <article className="rounded-[28px] bg-[#173528] p-6 text-white">
              <h2 className="text-xl font-bold">Already on the team?</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                Skip setup and sign in to the farm account you already have.
              </p>
              <Link href="/login" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                Log in
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </div>
        </section>
        <MarketingCta
          title="Start with your mix"
          body="Choose the enterprises during signup. The dashboard opens already pointed at that work."
        />
      </MarketingPage>
    </>
  )
}
