import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { FEATURE_PAGES, USE_CASE_PAGES, useCaseBySlug } from "@/lib/marketing"
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd, webPageJsonLd } from "@/lib/seo"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return USE_CASE_PAGES.map((item) => ({ slug: item.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const useCase = useCaseBySlug(slug)
  if (!useCase) return {}

  return createPageMetadata({
    title: useCase.title,
    description: useCase.description,
    path: `/use-cases/${useCase.slug}`,
    keywords: useCase.keywords,
  })
}

export default async function UseCaseDetailPage({ params }: PageProps) {
  const { slug } = await params
  const useCase = useCaseBySlug(slug)
  if (!useCase) notFound()

  const related = FEATURE_PAGES.filter((item) => useCase.relatedFeatures.includes(item.slug))

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            name: useCase.title,
            description: useCase.description,
            path: `/use-cases/${useCase.slug}`,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Use cases", path: "/use-cases" },
            { name: useCase.eyebrow, path: `/use-cases/${useCase.slug}` },
          ]),
          faqJsonLd(useCase.faqs),
        ]}
      />
      <MarketingPage eyebrow={useCase.eyebrow} title={useCase.headline} lead={useCase.summary}>
        <section className="mx-auto max-w-[1320px] px-4 pb-6 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-[28px] border border-[#E4E8E4] bg-white p-6">
              <h2 className="text-xl font-bold">The split</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#526057]">{useCase.problem}</p>
            </article>
            <article className="rounded-[28px] bg-[#E7F3E4] p-6">
              <h2 className="text-xl font-bold">How Agrocyms holds it</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#526057]">{useCase.approach}</p>
            </article>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-4 py-6 sm:px-6">
          <h2 className="text-2xl font-extrabold tracking-tight">What changes on the farm</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {useCase.outcomes.map((item) => (
              <article key={item.title} className="rounded-[28px] bg-[#F3F4F2] p-6">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#526057]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mx-auto max-w-[1320px] px-4 py-6 sm:px-6">
            <h2 className="text-2xl font-extrabold tracking-tight">Related records</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/features/${item.slug}`}
                  className="rounded-full bg-[#F3F4F2] px-4 py-2 text-sm font-semibold text-[#173528]"
                >
                  {item.eyebrow}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-[860px] px-4 py-6 sm:px-6">
          <h2 className="text-2xl font-extrabold tracking-tight">Questions</h2>
          <div className="mt-5 space-y-3">
            {useCase.faqs.map((item) => (
              <article key={item.question} className="rounded-[28px] border border-[#E4E8E4] bg-white p-6">
                <h3 className="text-lg font-bold">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#526057]">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <MarketingCta
          title="Record this work on one farm"
          body="A short signup names the farm and the mix. Staff who already have accounts can log in instead."
        />
      </MarketingPage>
    </>
  )
}
