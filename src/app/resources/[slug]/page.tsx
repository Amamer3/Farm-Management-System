import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { photoForResourceCategory } from "@/lib/marketingImages"
import {
  RESOURCE_ARTICLES,
  getRelatedResources,
  getResourceBySlug,
  resourceWordCount,
} from "@/lib/siteContent"
import {
  SITE_CONTENT_UPDATED,
  articleJsonLd,
  createPageMetadata,
  headingId,
  pageGraphJsonLd,
  webPageJsonLd,
} from "@/lib/seo"

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
    type: "article",
    section: article.category,
    imageAlt: article.title,
  })
}

export default async function ResourceArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getResourceBySlug(slug)
  if (!article) notFound()

  const photo = photoForResourceCategory(article.category)
  const related = getRelatedResources(article.slug)
  const updated = SITE_CONTENT_UPDATED.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <JsonLd
        data={pageGraphJsonLd([
          webPageJsonLd({
            name: article.title,
            description: article.description,
            path: `/resources/${article.slug}`,
            type: "ItemPage",
            image: photo.src,
          }),
          articleJsonLd({
            title: article.title,
            description: article.description,
            path: `/resources/${article.slug}`,
            keywords: article.keywords,
            section: article.category,
            wordCount: resourceWordCount(article),
            image: photo.src,
          }),
        ])}
      />
      <MarketingPage
        eyebrow={article.category}
        title={article.title}
        lead={article.description}
        image={photo.src}
        imageAlt={photo.alt}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: article.title, path: `/resources/${article.slug}` },
        ]}
      >
        <section className="mx-auto max-w-[760px] px-4 pb-6 sm:px-6">
          <p className="text-sm text-[#66756c]">Updated {updated} · {resourceWordCount(article)} words</p>
          <nav aria-label="On this page" className="mt-6 rounded-[24px] bg-[#F3F4F2] px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3d6b4a]">On this page</p>
            <ol className="mt-3 space-y-2">
              {article.sections.map((section) => (
                <li key={section.heading}>
                  <a
                    href={`#${headingId(section.heading)}`}
                    className="text-sm font-semibold text-[#173528] underline-offset-4 hover:underline"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mt-10 space-y-8">
            {article.sections.map((section) => (
              <article key={section.heading} id={headingId(section.heading)} className="scroll-mt-28">
                <h2 className="text-xl font-bold">{section.heading}</h2>
                <p className="mt-2 text-base leading-relaxed text-[#3e4b43]">{section.body}</p>
              </article>
            ))}
          </div>
          {related.length > 0 && (
            <aside className="mt-12">
              <h2 className="text-xl font-bold">Related farm management guides</h2>
              <ul className="mt-4 space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/resources/${item.slug}`}
                      className="block rounded-[24px] bg-[#F3F4F2] px-5 py-4 transition hover:bg-[#E7F3E4]"
                    >
                      <p className="text-sm font-bold text-[#173528]">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#526057]">{item.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
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
