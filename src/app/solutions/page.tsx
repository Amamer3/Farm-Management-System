import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { SOLUTIONS } from "@/lib/siteContent"
import { breadcrumbJsonLd, createPageMetadata, itemListJsonLd, webPageJsonLd } from "@/lib/seo"

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
        data={[
          webPageJsonLd({
            name: SOLUTIONS.headline,
            description: SOLUTIONS.description,
            path: "/solutions",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
          ]),
          itemListJsonLd(SOLUTIONS.items.map((item) => ({ name: item.title, path: item.href }))),
        ]}
      />
      <MarketingPage eyebrow={SOLUTIONS.eyebrow} title={SOLUTIONS.headline} lead={SOLUTIONS.lead}>
        <section className="mx-auto max-w-[1320px] px-4 pb-6 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.items.map((item) => (
              <article key={item.title} className="flex flex-col rounded-[28px] bg-[#F3F4F2] p-6">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#526057]">{item.body}</p>
                <Link href={item.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#173528]">
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>
        <MarketingCta title="Find the right approach for your farm." body="Create an account and choose the enterprises this farm runs." />
      </MarketingPage>
    </>
  )
}
