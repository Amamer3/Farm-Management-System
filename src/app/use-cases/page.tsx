import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { USE_CASE_PAGES } from "@/lib/marketing"
import { breadcrumbJsonLd, createPageMetadata, itemListJsonLd, webPageJsonLd } from "@/lib/seo"

const title = "Farm software use cases"
const description =
  "How mixed farms, egg collection, and feed inventory use Agrocyms. One workspace for poultry, livestock, and crops."

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/use-cases",
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
        data={[
          webPageJsonLd({ name: title, description, path: "/use-cases" }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Use cases", path: "/use-cases" },
          ]),
          itemListJsonLd(USE_CASE_PAGES.map((item) => ({ name: item.title, path: `/use-cases/${item.slug}` }))),
        ]}
      />
      <MarketingPage
        eyebrow="Use cases"
        title="How farms put the books in one place."
        lead="These pages cover the jobs mixed farms ask about most: one login for several enterprises, daily egg records, and stock that sits beside the animals."
      >
        <section className="mx-auto max-w-[1320px] px-4 pb-6 sm:px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {USE_CASE_PAGES.map((item) => (
              <article key={item.slug} className="flex flex-col rounded-[28px] bg-[#F3F4F2] p-6">
                <h2 className="text-xl font-bold">{item.eyebrow}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#526057]">{item.summary}</p>
                <Link
                  href={`/use-cases/${item.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#173528]"
                >
                  {item.eyebrow}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
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
