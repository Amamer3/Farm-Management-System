import type { Metadata } from "next"
import { MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { getAppName } from "@/lib/env"
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Terms of use",
  description:
    "Terms for using Agrocyms: farm accounts, team access, acceptable use, and responsibility for the records you enter.",
  path: "/terms",
})

export default function TermsPage() {
  const name = getAppName()

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ])}
      />
      <MarketingPage
        eyebrow="Terms"
        title={`Using ${name} for farm records.`}
        lead="These terms apply to farm accounts, team logins, and the records stored in the workspace."
      >
        <section className="mx-auto max-w-[760px] space-y-8 px-4 pb-16 text-[#3e4b43] sm:px-6">
          <article>
            <h2 className="text-xl font-bold text-[#121815]">Accounts</h2>
            <p className="mt-2 text-sm leading-relaxed">
              You are responsible for the accuracy of the farm profile and for keeping login details private. Farm owners decide who else may sign in.
            </p>
          </article>
          <article>
            <h2 className="text-xl font-bold text-[#121815]">Your records</h2>
            <p className="mt-2 text-sm leading-relaxed">
              You own the operational data you enter. {name} provides the workspace to store and review it. You are responsible for having the right to store information about the farm, animals, and staff.
            </p>
          </article>
          <article>
            <h2 className="text-xl font-bold text-[#121815]">Acceptable use</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Do not attempt to access another farm, disrupt the service, or use the product for anything other than legitimate farm operations.
            </p>
          </article>
          <article>
            <h2 className="text-xl font-bold text-[#121815]">Availability</h2>
            <p className="mt-2 text-sm leading-relaxed">
              The service is provided as available. Features may change as the product grows. Continue using {name} only if those terms remain acceptable.
            </p>
          </article>
        </section>
      </MarketingPage>
    </>
  )
}
