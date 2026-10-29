import type { Metadata } from "next"
import Link from "next/link"
import { MarketingPage } from "@/components/marketing/MarketingPage"
import { searchPublicPages } from "@/lib/marketing"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Search",
  description: "Find Agrocyms pages for poultry, livestock, crops, farm setup, and questions.",
  path: "/search",
  index: false,
  follow: true,
})

type PageProps = {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams
  const query = q.trim()
  const results = searchPublicPages(query)

  return (
      <MarketingPage
        eyebrow="Search"
        title={query ? `Results for “${query}”` : "Search public pages"}
        lead="Look up poultry, livestock, crops, setup, and farm questions. Workspace routes stay private."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Search", path: "/search" },
        ]}
      >
      <section className="mx-auto max-w-[760px] px-4 pb-16 sm:px-6">
        <form action="/search" method="get" className="flex gap-2">
          <label htmlFor="site-search" className="sr-only">
            Search Agrocyms
          </label>
          <input
            id="site-search"
            name="q"
            defaultValue={query}
            placeholder="Search pages"
            className="w-full rounded-full bg-[#F3F4F2] px-4 py-3 text-sm outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#173528]"
          />
          <button
            type="submit"
            className="rounded-full bg-[#173528] px-5 py-3 text-sm font-semibold text-white"
          >
            Search
          </button>
        </form>

        <p className="mt-6 text-sm text-[#66756c]">
          {results.length} {results.length === 1 ? "page" : "pages"}
        </p>
        <ul className="mt-3 space-y-3">
          {results.length === 0 && (
            <li className="rounded-[24px] border border-[#E4E8E4] bg-white p-5 text-sm text-[#526057]">
              Nothing matches that. Try poultry, cattle, eggs, or setup.
            </li>
          )}
          {results.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="block rounded-[24px] border border-[#E4E8E4] bg-white p-5 transition hover:border-[#173528]/20"
              >
                <h2 className="text-lg font-bold text-[#121815]">{item.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-[#526057]">{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </MarketingPage>
  )
}
