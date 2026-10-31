import type { Metadata } from "next"
import { MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { getAppName } from "@/lib/env"
import { createPageMetadata, pageGraphJsonLd, webPageJsonLd } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service | Agrocyms",
  description:
    "Review the terms governing registration, subscriptions, use of Agrocyms, account responsibilities, and service conditions.",
  path: "/terms",
  absoluteTitle: true,
})

export default function TermsPage() {
  const name = getAppName()

  return (
    <>
      <JsonLd
        data={pageGraphJsonLd([
          webPageJsonLd({
            name: "Terms of use",
            description:
              "Terms for using Agrocyms: farm accounts, team access, acceptable use, and responsibility for the records you enter.",
            path: "/terms",
          }),
        ])}
      />
      <MarketingPage
        eyebrow="Terms"
        title={`Using ${name} for farm records.`}
        lead="These terms apply to farm accounts, team logins, and the records stored in the workspace."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ]}
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
            <h2 className="text-xl font-bold text-[#121815]">Trial and subscriptions</h2>
            <p className="mt-2 text-sm leading-relaxed">
              New farm accounts include 90 days of full access from setup, with no card required. When the trial ends, you can still sign in, view records, and export them. Adding or changing farm records requires an active subscription. Contact {name} to subscribe. You own the data you entered; an unpaid trial does not delete it.
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
