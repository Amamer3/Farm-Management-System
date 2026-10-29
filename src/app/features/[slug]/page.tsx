import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { FEATURE_FAQS, FEATURE_PAGES, USE_CASE_PAGES, featureBySlug } from "@/lib/marketing"
import { photoForFeature } from "@/lib/marketingImages"
import { createPageMetadata, faqJsonLd, pageGraphJsonLd, webPageJsonLd } from "@/lib/seo"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return FEATURE_PAGES.map((item) => ({ slug: item.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const feature = featureBySlug(slug)
  if (!feature) return {}

  return createPageMetadata({
    title: feature.title,
    description: feature.description,
    path: `/features/${feature.slug}`,
    keywords: feature.keywords,
  })
}

export default async function FeatureDetailPage({ params }: PageProps) {
  const { slug } = await params
  const feature = featureBySlug(slug)
  if (!feature) notFound()

  const faqs = FEATURE_FAQS[feature.slug] ?? []
  const relatedUseCases = USE_CASE_PAGES.filter((item) => item.relatedFeatures.includes(feature.slug))
  const photo = photoForFeature(feature.slug)

  return (
    <>
      <JsonLd
        data={pageGraphJsonLd([
          webPageJsonLd({
            name: feature.title,
            description: feature.description,
            path: `/features/${feature.slug}`,
            type: "ItemPage",
            image: photo.src,
          }),
          ...(faqs.length ? [faqJsonLd(faqs)] : []),
        ])}
      />
      <MarketingPage
        eyebrow={feature.eyebrow}
        title={feature.headline}
        lead={feature.summary}
        image={photo.src}
        imageAlt={photo.alt}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: feature.eyebrow, path: `/features/${feature.slug}` },
        ]}
      >
        <section className="mx-auto max-w-[1320px] px-4 pb-6 sm:px-6">
          <p className="max-w-3xl text-base leading-relaxed text-[#3e4b43]">{feature.description}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {feature.outcomes.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-[#E4E8E4] bg-white p-6">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#526057]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-4 py-6 sm:px-6">
          <div className="rounded-[32px] bg-[#E7F3E4] px-5 py-8 sm:px-10">
            <h2 className="text-2xl font-extrabold tracking-tight">What you can record</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {feature.records.map((item) => (
                <li key={item} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {faqs.length > 0 && (
          <section className="mx-auto max-w-[860px] px-4 py-6 sm:px-6">
            <h2 className="text-2xl font-extrabold tracking-tight">Questions about {feature.eyebrow.toLowerCase()}</h2>
            <div className="mt-5 space-y-3">
              {faqs.map((item) => (
                <article key={item.question} className="rounded-[28px] border border-[#E4E8E4] bg-white p-6">
                  <h3 className="text-lg font-bold">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#526057]">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {relatedUseCases.length > 0 && (
          <section className="mx-auto max-w-[1320px] px-4 py-6 sm:px-6">
            <h2 className="text-2xl font-extrabold tracking-tight">Related use cases</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {relatedUseCases.map((item) => (
                <Link
                  key={item.slug}
                  href={`/use-cases/${item.slug}`}
                  className="rounded-full bg-[#E7F3E4] px-4 py-2 text-sm font-semibold text-[#173528]"
                >
                  {item.eyebrow}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-[1320px] px-4 py-6 sm:px-6">
          <h2 className="text-2xl font-extrabold tracking-tight">Other enterprises</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {FEATURE_PAGES.filter((item) => item.slug !== feature.slug).map((item) => (
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

        <MarketingCta
          title={`Add ${feature.eyebrow.toLowerCase()} to this farm`}
          body="Signup asks what you raise and grow. The dashboard follows that mix."
        />
      </MarketingPage>
    </>
  )
}
