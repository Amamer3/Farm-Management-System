import type { Metadata } from "next"
import { MarketingPage } from "@/components/marketing/MarketingPage"
import { ContactForm } from "@/components/marketing/ContactForm"
import { JsonLd } from "@/components/seo/JsonLd"
import { breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "@/lib/seo"

const title = "Contact Agrocyms | Farm Management Software Support"
const description =
  "Contact Agrocyms with questions about farm management software, subscriptions, onboarding, or the platform's available features."

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/contact",
  absoluteTitle: true,
  keywords: ["Contact Agrocyms", "farm software support", "Agrocyms help"],
})

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: title, description, path: "/contact" }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <MarketingPage
        eyebrow="Contact"
        title="Let's Talk About Your Farming Business"
        lead="Have a question about Agrocyms, your subscription, or getting started? Our team can help you find the right information."
      >
        <section className="mx-auto max-w-[760px] px-4 pb-16 sm:px-6">
          <ContactForm />
        </section>
      </MarketingPage>
    </>
  )
}
