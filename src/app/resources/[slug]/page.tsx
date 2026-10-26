import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { RESOURCE_ARTICLES, getResourceBySlug } from "@/lib/siteContent"
import { breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "@/lib/seo"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return RESOURCE_ARTICLES.map((item) => ({ slug: item.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getResourceBySlug(slug)
  if (!article) return {}
  return createPageMetadata({
    title: `${article.title} | Agrocyms`,
    description: article.description,
    path: `/resources/${article.slug}`,
    absoluteTitle: true,
    keywords: article.keywords,
  })
}

export default async function ResourceArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getResourceBySlug(slug)
  if (!article) notFound()

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            name: article.title,
            description: article.description,
            path: `/resources/${article.slug}`,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: article.title, path: `/resources/${article.slug}` },
          ]),
        ]}
      />
      <MarketingPage eyebrow={article.category} title={article.title} lead={article.description}>
        <section className="mx-auto max-w-[760px] px-4 pb-6 sm:px-6">
          <div className="space-y-8">
            {article.sections.map((section) => (
              <article key={section.heading}>
                <h2 className="text-xl font-bold">{section.heading}</h2>
                <p className="mt-2 text-base leading-relaxed text-[#3e4b43]">{section.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-sm">
            <Link href="/resources" className="font-semibold text-[#173528] underline-offset-4 hover:underline">
              All resources
            </Link>
          </p>
        </section>
        <MarketingCta
          title="Put these records in one workspace."
          body="Create an Agrocyms account and keep crop, livestock, and inventory information on the same farm."
        />
      </MarketingPage>
    </>
  )
}
