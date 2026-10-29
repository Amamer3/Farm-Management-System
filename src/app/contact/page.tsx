import type { Metadata } from "next"
import { MarketingPage } from "@/components/marketing/MarketingPage"
import { ContactForm } from "@/components/marketing/ContactForm"
import { JsonLd } from "@/components/seo/JsonLd"
import { createPageMetadata, pageGraphJsonLd, webPageJsonLd } from "@/lib/seo"

const title = "Contact Agrocyms | Farm Management Software Support"
const description =
  "Contact Agrocyms about farm management software, subscriptions, onboarding, or crop and livestock records. Email the team or send a message from this page."

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/contact",
  absoluteTitle: true,
  keywords: ["Contact Agrocyms", "farm software support", "Agrocyms help", "farm management software contact"],
})

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={pageGraphJsonLd([
          webPageJsonLd({ name: title, description, path: "/contact", type: "ContactPage" }),
        ])}
      />
      <MarketingPage
        eyebrow="Contact"
        title="Contact Agrocyms Farm Management Support"
        lead="Have a question about Agrocyms, your subscription, or getting started? Our team can help you find the right information."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      >
        <section className="mx-auto max-w-[760px] px-4 pb-16 sm:px-6">
          <ContactForm />
        </section>
      </MarketingPage>
    </>
  )
}
