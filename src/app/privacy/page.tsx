import type { Metadata } from "next"
import { MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { getAppName } from "@/lib/env"
import { breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy | Agrocyms",
  description:
    "Read the Agrocyms Privacy Policy to understand how personal information is collected, used, protected, and managed.",
  path: "/privacy",
  absoluteTitle: true,
})

export default function PrivacyPage() {
  const name = getAppName()

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            name: "Privacy policy",
            description:
              "How Agrocyms handles farm and account information: what is collected, why it is kept, and how you can ask about it.",
            path: "/privacy",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Privacy", path: "/privacy" },
          ]),
        ]}
      />
      <MarketingPage
        eyebrow="Privacy"
        title="How farm and account information is handled."
        lead={`${name} stores the records you enter so the team can run the farm. This page explains what that includes.`}
      >
        <section className="mx-auto max-w-[760px] space-y-8 px-4 pb-16 text-[#3e4b43] sm:px-6">
          <article>
            <h2 className="text-xl font-bold text-[#121815]">What we collect</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Account details such as name, email, and password; farm profile details such as name, location, enterprises, and crops; and the operational records you add, including livestock events, egg collections, feed, medicine, and reports.
            </p>
          </article>
          <article>
            <h2 className="text-xl font-bold text-[#121815]">How it is used</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Information is used to sign you in, show the correct farm workspace, keep production and inventory records, and improve reliability of the product. We do not sell farm records.
            </p>
          </article>
          <article>
            <h2 className="text-xl font-bold text-[#121815]">Access and retention</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Farm staff see the records their role allows. Data stays while the account and farm remain active. You can ask to update or remove account information through the product or by contacting the operator of this deployment.
            </p>
          </article>
          <article>
            <h2 className="text-xl font-bold text-[#121815]">Cookies and session</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Sign-in uses cookies so the browser can stay on the same farm. Marketing pages do not require an account cookie.
            </p>
          </article>
        </section>
      </MarketingPage>
    </>
  )
}
