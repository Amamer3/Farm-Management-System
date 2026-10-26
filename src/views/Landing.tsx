"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Leaf, Sprout } from "lucide-react"
import { MarketingChrome } from "@/components/marketing/MarketingChrome"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FARM_ENTERPRISES } from "@/lib/farmProfile"
import { FAQS, featureByEnterprise } from "@/lib/marketing"
import { getAppName } from "@/lib/env"

const pins = [
  { top: "22%", left: "28%" },
  { top: "46%", left: "58%" },
  { top: "63%", left: "24%" },
  { top: "34%", left: "74%" },
  { top: "74%", left: "68%" },
]

const reasons = [
  {
    title: "Built around your mix",
    body: "Poultry, goats, cattle, pigs, or crops. The home screen follows what this farm actually runs.",
  },
  {
    title: "Daily work stays together",
    body: "Egg collections, feed, treatments, and herd events live in one place instead of scattered notebooks.",
  },
  {
    title: "A login for the team",
    body: "After setup, staff sign in with their own accounts and see the same farm.",
  },
  {
    title: "Records that travel",
    body: "Production, stock, and health stay attached to the animals and fields they belong to.",
  },
]

const quotes = [
  {
    quote: "Egg collection and feed used to live in two books. Now the morning round is one screen.",
    role: "Layer house",
  },
  {
    quote: "We added goats without cluttering the poultry pages. The menu matches the animals we keep.",
    role: "Mixed livestock farm",
  },
  {
    quote: "Maize fields sit beside the flock records. New staff can see the farm without a long handover.",
    role: "Crop and poultry farm",
  },
]

export default function Landing() {
  const appName = getAppName()

  return (
    <MarketingChrome home>
      <main>
        <section className="mx-auto max-w-[1320px] px-4 pb-6 sm:px-6">
          <div className="grid items-stretch gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
            <div className="flex h-full min-w-0 flex-col items-center justify-center rounded-[28px] bg-[#E7F3E4] px-5 py-10 text-center sm:rounded-[32px] sm:px-8 sm:py-14 md:min-h-[420px] md:px-6 lg:min-h-[440px] lg:px-10 xl:py-16">
              <p className="max-w-full rounded-full bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#3d4a42] sm:px-4 sm:text-[11px] sm:tracking-[0.16em]">
                100% trusted platform
              </p>
              <h1 className="mt-6 max-w-xl text-[2.5rem] font-extrabold leading-[0.95] tracking-[-0.04em] text-[#121815] min-[400px]:text-5xl sm:mt-8 sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl">
                Record.
                <span className="block">Raise.</span>
                <span className="block">Grow.</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[#3e4b43] sm:mt-6 sm:text-lg">
                Farm management software for poultry, livestock, and crops. Daily records stay on the mix this farm actually runs.
              </p>
              <Link
                href="/get-started"
                className="mt-8 inline-flex max-w-full items-center gap-3 rounded-full bg-[#173528] py-2 pl-5 pr-2 text-base font-semibold text-white shadow-[0_10px_24px_rgba(23,53,40,0.18)] sm:mt-10 sm:pl-6"
              >
                Set up your farm
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#173528]">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Link>
            </div>

            <article className="relative order-3 min-h-[300px] overflow-hidden rounded-[28px] sm:min-h-[420px] sm:rounded-[32px] md:order-none md:col-start-2 md:row-start-1 md:h-full md:min-h-full lg:row-span-2">
              <Image
                src="/landing/farmer.png"
                alt="Farmer standing in a greenhouse with arms crossed"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, (min-width: 768px) 48vw, 100vw"
                className="object-cover object-[center_18%]"
              />
              <div className="absolute bottom-4 left-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#173528] shadow-[0_10px_24px_rgba(16,24,20,0.16)] sm:bottom-6 lg:left-[12%]">
                Your records
                <Leaf className="h-4 w-4 shrink-0 text-[#2F7D46]" />
                <Sprout className="h-4 w-4 shrink-0 text-[#2F7D46]" />
              </div>
            </article>

            <div className="order-2 grid min-w-0 grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 md:order-none md:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-2 lg:grid-cols-[1.15fr_0.9fr]">
              <article className="relative min-h-[200px] overflow-hidden rounded-[24px] sm:min-h-[230px] sm:rounded-[28px]">
                <Image
                  src="/landing/field.png"
                  alt="Rows of green crops seen from above"
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
                <div className="absolute bottom-2 left-2 flex max-w-[calc(100%-1rem)] items-center gap-2 rounded-xl bg-white px-2 py-2 shadow-[0_12px_30px_rgba(16,24,20,0.16)] sm:bottom-4 sm:left-4 sm:max-w-[min(240px,calc(100%-2rem))] sm:gap-3 sm:rounded-2xl sm:px-3 sm:py-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E7F3E4] text-[#173528] sm:h-10 sm:w-10 sm:rounded-xl">
                    <Sprout className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold leading-tight sm:text-sm">Greenfield Farm</p>
                    <p className="mt-0.5 hidden truncate text-xs text-[#66756c] sm:block">Poultry, goats, and maize</p>
                  </div>
                </div>
              </article>

              <article className="relative z-10 min-h-[200px] overflow-hidden rounded-[24px] sm:min-h-[230px] sm:rounded-[28px] lg:-mr-6">
                <Image
                  src="/landing/produce.png"
                  alt="Green pears, grapes, and apples in a crate"
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 480px) 46vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute left-2 top-2 flex max-w-[calc(100%-1rem)] items-center gap-1.5 overflow-hidden rounded-full bg-[#173528] py-1 pl-1 pr-2.5 text-[11px] font-semibold text-white shadow-lg sm:left-3 sm:top-3 sm:gap-2 sm:py-1.5 sm:pl-1.5 sm:pr-3.5 sm:text-sm">
                  <span className="flex shrink-0 -space-x-2">
                    {["A", "K", "M"].map((letter, index) => (
                      <span
                        key={letter}
                        className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#173528] text-[10px] font-bold text-white sm:h-7 sm:w-7 sm:text-[11px]"
                        style={{ backgroundColor: ["#6FA37A", "#D9A35C", "#4E7C68"][index] }}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                  <span className="truncate">Farm teams</span>
                </div>
                <p className="absolute bottom-3 left-3 right-3 line-clamp-3 text-sm font-bold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:bottom-4 sm:left-4 sm:right-4 sm:text-base lg:text-lg">
                  One place for every enterprise
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 mx-auto max-w-[1320px] px-4 py-10 sm:px-6 sm:py-16">
          <div className="grid items-center gap-6 rounded-[28px] bg-[#E7F3E4] px-5 py-8 sm:gap-8 sm:rounded-[32px] sm:px-8 sm:py-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-12">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3d6b4a]">About us</p>
              <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">A farm workspace that starts with the farm you have.</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#3e4b43]">
                {appName} asks what you raise and what you grow, then opens menus and records shaped around that mix. Staff who already have accounts can sign in and pick up the same farm.
              </p>
              <Link href="/about" className="mt-5 inline-block text-sm font-semibold text-[#173528] underline-offset-4 hover:underline">
                More about {appName}
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
              {[
                "Name the farm",
                "Pick the enterprises",
                "Add the crops",
                "Open the dashboard",
              ].map((label) => (
                <div key={label} className="rounded-2xl bg-white p-4 sm:rounded-3xl sm:p-5">
                  <p className="text-sm font-semibold sm:text-base">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="product" className="scroll-mt-24 mx-auto max-w-[1320px] px-4 py-4 sm:px-6">
          <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3d6b4a]">Product</p>
              <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">What the farm can run</h2>
            </div>
            <div className="flex shrink-0 flex-wrap gap-4">
              <Link href="/features" className="text-sm font-semibold text-[#173528] underline-offset-4 hover:underline">
                See every enterprise
              </Link>
              <Link href="/use-cases" className="text-sm font-semibold text-[#173528] underline-offset-4 hover:underline">
                Farm use cases
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FARM_ENTERPRISES.map((item) => {
              const feature = featureByEnterprise(item.id)
              return (
                <article key={item.id} className="rounded-[28px] bg-[#F3F4F2] p-6">
                  <h3 className="text-xl font-bold">{item.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#526057]">{item.description}</p>
                  {feature && (
                    <Link href={`/features/${feature.slug}`} className="mt-4 inline-block text-sm font-semibold text-[#173528] underline-offset-4 hover:underline">
                      {item.label} software
                    </Link>
                  )}
                </article>
              )
            })}
            <article className="rounded-[28px] bg-[#173528] p-6 text-white">
              <h3 className="text-xl font-bold">Already on the team?</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">Skip setup and sign in to the farm account you already have.</p>
              <Link href="/login" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                Log in
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </div>
        </section>

        <section id="why" className="scroll-mt-24 mx-auto max-w-[1320px] px-4 py-10 sm:px-6 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3d6b4a]">Why choose us</p>
          <h2 className="mt-2 max-w-xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">The dashboard follows the farm, not the other way around.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {reasons.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-[#E4E8E4] bg-white p-6">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#526057]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="testimonial" className="scroll-mt-24 bg-[#E7F3E4]">
          <div className="mx-auto max-w-[1320px] px-4 py-10 sm:px-6 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3d6b4a]">Testimonial</p>
            <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">How mixed farms use it</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {quotes.map((item) => (
                <figure key={item.role} className="rounded-[28px] bg-white p-5 sm:p-6">
                  <blockquote className="text-balance text-base font-semibold leading-snug sm:text-lg">“{item.quote}”</blockquote>
                  <figcaption className="mt-5 text-sm font-medium text-[#526057]">{item.role}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 mx-auto max-w-[1320px] px-4 py-10 sm:px-6 sm:py-16">
          <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3d6b4a]">FAQ</p>
              <h2 className="mt-2 max-w-xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">Questions farms ask before they switch the books.</h2>
            </div>
            <Link href="/faq" className="hidden shrink-0 text-sm font-semibold text-[#173528] underline-offset-4 hover:underline sm:inline">
              See every answer
            </Link>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((item) => (
              <AccordionItem
                key={item.question}
                value={item.question}
                className="rounded-[24px] border border-[#E4E8E4] bg-white px-4 sm:rounded-[28px] sm:px-6"
              >
                <AccordionTrigger className="gap-3 py-4 text-left text-base font-bold leading-snug hover:no-underline sm:text-lg [&>svg]:mt-0.5 [&>svg]:shrink-0">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-[#526057]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Link href="/faq" className="mt-5 inline-block text-sm font-semibold text-[#173528] underline-offset-4 hover:underline sm:hidden">
            See every answer
          </Link>
        </section>

        <section className="mx-auto max-w-[1320px] px-4 py-12 text-center sm:px-6 sm:py-16">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Bring this farm onto {appName}</h2>
          <p className="mx-auto mt-3 max-w-xl text-balance text-[#526057]">
            A short signup records the farm, the crops, and your account. The dashboard opens already pointed at that work.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/get-started"
              className="inline-flex w-full max-w-xs items-center justify-center gap-3 rounded-full bg-[#173528] py-2 pl-6 pr-2 text-base font-semibold text-white sm:w-auto"
            >
              Set up your farm
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#173528]">
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
            <Link href="/faq" className="w-full max-w-xs rounded-full bg-[#F3F4F2] px-5 py-3 text-center text-sm font-semibold text-[#173528] sm:w-auto">
              Read the FAQ
            </Link>
          </div>
        </section>
      </main>
    </MarketingChrome>
  )
}
