import type { Metadata } from "next"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { FAQS } from "@/lib/marketing"
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd, webPageJsonLd } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Farm management FAQ",
  description:
    "Answers about Agrocyms: which farms it fits, how setup works, poultry and livestock records, crops, and team logins.",
  path: "/faq",
  keywords: ["Agrocyms FAQ", "farm management questions", "poultry software FAQ"],
})

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            name: "Farm management FAQ",
            description:
              "Answers about Agrocyms: which farms it fits, how setup works, poultry and livestock records, crops, and team logins.",
            path: "/faq",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />
      <MarketingPage
        eyebrow="FAQ"
        title="Questions farms ask before they switch the books."
        lead="Short answers about the mix Agrocyms covers, how setup works, and how the team signs in."
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
          title="Ready to record the farm you have?"
          body="Setup is a short signup. Staff who already have accounts can log in instead."
        />
      </MarketingPage>
    </>
  )
}
