import type { Metadata } from "next"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { FAQS } from "@/lib/marketing"
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd, webPageJsonLd } from "@/lib/seo"

const title = "Farm Management Software FAQs | Agrocyms"
const description =
  "Find answers about Agrocyms registration, farm management features, subscriptions, account setup, and using the platform."

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/faq",
  absoluteTitle: true,
  keywords: ["farm management software FAQ", "Agrocyms FAQ", "agriculture software questions"],
})

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: title, description, path: "/faq" }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />
      <MarketingPage
        eyebrow="FAQ"
        title="Farm management software FAQs"
        lead="Answers about Agrocyms registration, farm management features, subscriptions, account setup, and using the platform."
      >
        <section className="mx-auto max-w-[860px] px-4 pb-6 sm:px-6">
          <div className="space-y-3">
            {FAQS.map((item) => (
              <article
                key={item.question}
                id={item.question
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "")}
                className="scroll-mt-28 rounded-[28px] border border-[#E4E8E4] bg-white p-6"
              >
                <h2 className="text-lg font-bold">{item.question}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#526057]">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
        <MarketingCta
          title="Ready to organize this farm?"
          body="Create your account, or contact us if you have a question the FAQ does not cover."
          secondaryHref="/contact"
          secondaryLabel="Contact"
        />
      </MarketingPage>
    </>
  )
}
