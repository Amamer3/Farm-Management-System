import type { Metadata } from "next"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { ABOUT } from "@/lib/siteContent"
import { breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: ABOUT.title,
  description: ABOUT.description,
  path: "/about",
  absoluteTitle: true,
  keywords: ABOUT.keywords,
})

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            name: ABOUT.headline,
            description: ABOUT.description,
            path: "/about",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <MarketingPage eyebrow={ABOUT.eyebrow} title={ABOUT.headline} lead={ABOUT.lead}>
        <section className="mx-auto max-w-[1320px] px-4 pb-10 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-[28px] bg-[#F3F4F2] p-6">
              <h2 className="text-xl font-bold">Our mission</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#526057]">{ABOUT.mission}</p>
            </article>
            <article className="rounded-[28px] bg-[#F3F4F2] p-6">
              <h2 className="text-xl font-bold">Our vision</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#526057]">{ABOUT.vision}</p>
            </article>
          </div>
          <h2 className="mt-10 text-2xl font-extrabold tracking-tight">What we believe</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {ABOUT.beliefs.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-[#E4E8E4] bg-white p-6">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#526057]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
        <MarketingCta
          title="Discover a more organized approach to farm management."
          body="Explore Agrocyms features, solutions, and farm setup."
          label="Explore Agrocyms"
          href="/features"
        />
      </MarketingPage>
    </>
  )
}
