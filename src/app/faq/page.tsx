import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { FAQ_ITEM_KEYS } from "@/i18n/content"
import { MARKETING_PHOTOS } from "@/lib/marketingImages"
import { createPageMetadata, faqJsonLd, pageGraphJsonLd, webPageJsonLd } from "@/lib/seo"

const title = "Farm Management Software FAQs | Agrocyms"
const description =
  "Answers about Agrocyms farm management software: registration, crop and livestock records, the 90-day trial, subscriptions, and team access."

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/faq",
  absoluteTitle: true,
  keywords: ["farm management software FAQ", "Agrocyms FAQ", "agriculture software questions", "farm software trial"],
})

export default async function FaqPage() {
  const t = await getTranslations()
  const faqs = FAQ_ITEM_KEYS.map((key) => ({
    question: t(`faq.items.${key}.question`),
    answer: t(`faq.items.${key}.answer`),
  }))

  return (
    <>
      <JsonLd
        data={pageGraphJsonLd([
          webPageJsonLd({
            name: title,
            description,
            path: "/faq",
            image: MARKETING_PHOTOS.mixed.src,
          }),
          faqJsonLd(faqs),
        ])}
      />
      <MarketingPage
        eyebrow={t("common.faq")}
        title={t("faq.pageTitle")}
        lead={t("faq.pageLead")}
        image={MARKETING_PHOTOS.mixed.src}
        imageAlt={MARKETING_PHOTOS.mixed.alt}
        breadcrumbs={[
          { name: t("common.home"), path: "/" },
          { name: t("common.faq"), path: "/faq" },
        ]}
      >
        <section className="mx-auto max-w-[860px] px-4 pb-6 sm:px-6">
          <div className="space-y-3">
            {faqs.map((item, index) => (
              <article
                key={FAQ_ITEM_KEYS[index]}
                id={FAQ_ITEM_KEYS[index]}
                className="scroll-mt-28 rounded-[28px] border border-[#E4E8E4] bg-white p-6"
              >
                <h2 className="text-lg font-bold">{item.question}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#526057]">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
        <MarketingCta
          title={t("home.close.title")}
          body={t("home.close.body")}
          label={t("common.getStarted")}
          secondaryHref="/contact"
          secondaryLabel={t("common.contact")}
        />
      </MarketingPage>
    </>
  )
}
