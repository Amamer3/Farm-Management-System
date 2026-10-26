"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { ArrowRight, Leaf, Sprout } from "lucide-react"
import { MarketingChrome } from "@/components/marketing/MarketingChrome"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  FAQ_ITEM_KEYS,
  HOME_AUDIENCE_KEYS,
  HOME_PLATFORM_CARDS,
  HOME_STEP_KEYS,
  HOME_VALUE_KEYS,
} from "@/i18n/content"

const pins = [
  { top: "22%", left: "28%" },
  { top: "46%", left: "58%" },
  { top: "63%", left: "24%" },
  { top: "34%", left: "74%" },
  { top: "74%", left: "68%" },
]

export default function Landing() {
  const t = useTranslations()

  return (
    <MarketingChrome home>
      <main>
        <section className="mx-auto max-w-[1320px] px-4 pb-6 sm:px-6">
          <div className="grid items-stretch gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
            <div className="flex h-full min-w-0 flex-col items-center justify-center rounded-[28px] bg-[#E7F3E4] px-5 py-10 text-center sm:rounded-[32px] sm:px-8 sm:py-14 md:min-h-[420px] md:px-6 lg:min-h-[440px] lg:px-10 xl:py-16">
              <p className="max-w-full rounded-full bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#3d4a42] sm:px-4 sm:text-[11px] sm:tracking-[0.16em]">
                {t("home.hero.eyebrow")}
              </p>
              <h1 className="mt-6 max-w-xl text-balance text-[2rem] font-extrabold leading-[0.95] tracking-[-0.04em] text-[#121815] min-[400px]:text-4xl sm:mt-8 sm:text-5xl lg:text-6xl">
                {t("home.hero.title")}
              </h1>
              <p className="mt-5 max-w-md text-base font-semibold leading-relaxed text-[#173528] sm:mt-6 sm:text-lg">
                {t("home.hero.kicker")}
              </p>
              <p className="mt-3 max-w-md text-base leading-relaxed text-[#3e4b43] sm:text-lg">{t("home.hero.body")}</p>
              <div className="mt-8 flex w-full max-w-md flex-col items-center gap-3 sm:mt-10">
                <Link
                  href="/get-started"
                  className="inline-flex max-w-full items-center gap-3 rounded-full bg-[#173528] py-2 ps-5 pe-2 text-base font-semibold text-white shadow-[0_10px_24px_rgba(23,53,40,0.18)] sm:ps-6"
                >
                  {t("home.hero.primaryCta")}
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#173528]">
                    <ArrowRight className="h-5 w-5 rtl:rotate-180" />
                  </span>
                </Link>
                <Link href="/features" className="text-sm font-semibold text-[#173528] underline-offset-4 hover:underline">
                  {t("home.hero.secondaryCta")}
                </Link>
                <p className="text-xs leading-relaxed text-[#66756c]">{t("home.hero.support")}</p>
              </div>
            </div>

            <article className="relative order-3 min-h-[300px] overflow-hidden rounded-[28px] sm:min-h-[420px] sm:rounded-[32px] md:order-none md:col-start-2 md:row-start-1 md:h-full md:min-h-full lg:row-span-2">
              <Image
                src="/landing/farmer.png"
                alt={t("home.farmerAlt")}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, (min-width: 768px) 48vw, 100vw"
                className="object-cover object-[center_18%]"
              />
              <div className="absolute bottom-4 start-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#173528] shadow-[0_10px_24px_rgba(16,24,20,0.16)] sm:bottom-6 lg:start-[12%]">
                {t("home.records")}
                <Leaf className="h-4 w-4 shrink-0 text-[#2F7D46]" />
                <Sprout className="h-4 w-4 shrink-0 text-[#2F7D46]" />
              </div>
            </article>

            <div className="order-2 grid min-w-0 grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 md:order-none md:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-2 lg:grid-cols-[1.15fr_0.9fr]">
              <article className="relative min-h-[200px] overflow-hidden rounded-[24px] sm:min-h-[230px] sm:rounded-[28px]">
                <Image
                  src="/landing/field.png"
                  alt={t("home.fieldAlt")}
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 480px) 46vw, 100vw"
                  className="object-cover"
                />
                {pins.map((pin) => (
                  <span key={`${pin.top}-${pin.left}`} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: pin.top, left: pin.left }}>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.28)]">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#248046]" />
                    </span>
                  </span>
                ))}
              </article>

              <article className="relative z-10 min-h-[200px] overflow-hidden rounded-[24px] sm:min-h-[230px] sm:rounded-[28px] lg:-me-6">
                <Image
                  src="/landing/produce.png"
                  alt={t("home.produceAlt")}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 480px) 46vw, 100vw"
                  className="object-cover"
                />
                <p className="absolute bottom-3 start-3 end-3 line-clamp-3 text-sm font-bold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:bottom-4 sm:start-4 sm:end-4 sm:text-base lg:text-lg">
                  {t("home.onePlatform")}
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="product" className="scroll-mt-24 mx-auto max-w-[1320px] px-4 py-10 sm:px-6 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3d6b4a]">{t("home.platform.eyebrow")}</p>
          <h2 className="mt-2 max-w-3xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{t("home.platform.title")}</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#3e4b43]">{t("home.platform.lead")}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {HOME_PLATFORM_CARDS.map((item) => (
              <article key={item.key} className="flex flex-col rounded-[28px] bg-[#F3F4F2] p-6">
                <h3 className="text-xl font-bold">{t(`home.platform.cards.${item.key}.title`)}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#526057]">{t(`home.platform.cards.${item.key}.body`)}</p>
                <Link href={item.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#173528]">
                  {t(`home.platform.cards.${item.key}.cta`)}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="solutions" className="scroll-mt-24 bg-[#E7F3E4]">
          <div className="mx-auto max-w-[1320px] px-4 py-10 sm:px-6 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3d6b4a]">{t("home.audiences.eyebrow")}</p>
            <h2 className="mt-2 max-w-3xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{t("home.audiences.title")}</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#3e4b43]">{t("home.audiences.lead")}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {HOME_AUDIENCE_KEYS.map((key) => (
                <article key={key} className="rounded-[28px] bg-white p-6">
                  <h3 className="text-lg font-bold">{t(`home.audiences.items.${key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#526057]">{t(`home.audiences.items.${key}.body`)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="scroll-mt-24 mx-auto max-w-[1320px] px-4 py-10 sm:px-6 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3d6b4a]">{t("home.value.eyebrow")}</p>
          <h2 className="mt-2 max-w-3xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{t("home.value.title")}</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#3e4b43]">{t("home.value.lead")}</p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {HOME_VALUE_KEYS.map((key) => (
              <li key={key} className="rounded-[24px] border border-[#E4E8E4] bg-white px-5 py-4 text-sm font-medium leading-relaxed text-[#3e4b43]">
                {t(`home.value.points.${key}`)}
              </li>
            ))}
          </ul>
        </section>

        <section id="how" className="scroll-mt-24 mx-auto max-w-[1320px] px-4 py-10 sm:px-6 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3d6b4a]">{t("home.steps.eyebrow")}</p>
          <h2 className="mt-2 max-w-3xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{t("home.steps.title")}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {HOME_STEP_KEYS.map((key) => (
              <article key={key} className="rounded-[28px] bg-[#F3F4F2] p-6">
                <p className="text-sm font-bold text-[#3d6b4a]">{t(`home.steps.items.${key}.step`)}</p>
                <h3 className="mt-2 text-xl font-bold">{t(`home.steps.items.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#526057]">{t(`home.steps.items.${key}.body`)}</p>
              </article>
            ))}
          </div>
          <Link
            href="/get-started"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#173528] py-2 ps-6 pe-2 text-base font-semibold text-white"
          >
            {t("home.steps.cta")}
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#173528]">
              <ArrowRight className="h-5 w-5 rtl:rotate-180" />
            </span>
          </Link>
        </section>

        <section id="faq" className="scroll-mt-24 mx-auto max-w-[1320px] px-4 py-10 sm:px-6 sm:py-16">
          <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3d6b4a]">{t("common.faq")}</p>
              <h2 className="mt-2 max-w-xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t("home.faqTitle")}
              </h2>
            </div>
            <Link href="/faq" className="hidden shrink-0 text-sm font-semibold text-[#173528] underline-offset-4 hover:underline sm:inline">
              {t("home.seeEveryAnswer")}
            </Link>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEM_KEYS.slice(0, 6).map((key) => (
              <AccordionItem
                key={key}
                value={key}
                className="rounded-[24px] border border-[#E4E8E4] bg-white px-4 sm:rounded-[28px] sm:px-6"
              >
                <AccordionTrigger className="gap-3 py-4 text-start text-base font-bold leading-snug hover:no-underline sm:text-lg [&>svg]:mt-0.5 [&>svg]:shrink-0">
                  {t(`faq.items.${key}.question`)}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-[#526057]">{t(`faq.items.${key}.answer`)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Link href="/faq" className="mt-5 inline-block text-sm font-semibold text-[#173528] underline-offset-4 hover:underline sm:hidden">
            {t("home.seeEveryAnswer")}
          </Link>
        </section>

        <section className="mx-auto max-w-[1320px] px-4 py-12 text-center sm:px-6 sm:py-16">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">{t("home.close.title")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-balance text-[#526057]">{t("home.close.body")}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/get-started"
              className="inline-flex w-full max-w-xs items-center justify-center gap-3 rounded-full bg-[#173528] py-2 ps-6 pe-2 text-base font-semibold text-white sm:w-auto"
            >
              {t("home.close.primaryCta")}
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#173528]">
                <ArrowRight className="h-5 w-5 rtl:rotate-180" />
              </span>
            </Link>
            <Link href="/pricing" className="w-full max-w-xs rounded-full bg-[#F3F4F2] px-5 py-3 text-center text-sm font-semibold text-[#173528] sm:w-auto">
              {t("home.close.secondaryCta")}
            </Link>
          </div>
        </section>
      </main>
    </MarketingChrome>
  )
}
