import type { Metadata } from "next"
import Link from "next/link"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { PRICING } from "@/lib/siteContent"
import { breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: PRICING.title,
  description: PRICING.description,
  path: "/pricing",
  absoluteTitle: true,
  keywords: PRICING.keywords,
})

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            name: PRICING.headline,
            description: PRICING.description,
            path: "/pricing",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
        ]}
      />
      <MarketingPage eyebrow={PRICING.eyebrow} title={PRICING.headline} lead={PRICING.lead}>
        <section className="mx-auto max-w-[1320px] px-4 pb-6 sm:px-6">
          <p className="mb-6 max-w-2xl rounded-[24px] bg-[#E7F3E4] px-5 py-4 text-sm leading-relaxed text-[#3e4b43]">
            {PRICING.note}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {PRICING.plans.map((plan) => (
              <article key={plan.name} className="flex flex-col rounded-[28px] border border-[#E4E8E4] bg-white p-6">
                <h2 className="text-2xl font-extrabold tracking-tight">{plan.name}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#526057]">{plan.body}</p>
                <p className="mt-4 text-sm font-semibold text-[#173528]">Price shown at signup</p>
                <Link
                  href={plan.href}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[#173528] px-5 py-3 text-sm font-semibold text-white"
                >
                  {plan.cta}
                </Link>
              </article>
            ))}
          </div>
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight">Before you subscribe</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {PRICING.checklist.map((item) => (
              <li key={item} className="rounded-[24px] bg-[#F3F4F2] px-5 py-4 text-sm leading-relaxed text-[#3e4b43]">
                {item}
              </li>
            ))}
          </ul>
        </section>
        <MarketingCta
          title="Start Managing Your Farm with Agrocyms"
          body="Choose the subscription that matches your needs when you create your account."
          label="View Plans and Subscribe"
          secondaryHref="/contact"
          secondaryLabel="Contact sales"
        />
      </MarketingPage>
    </>
  )
}
