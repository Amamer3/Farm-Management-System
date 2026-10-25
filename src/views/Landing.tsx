"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Leaf, Sprout } from "lucide-react"
import { MarketingChrome } from "@/components/marketing/MarketingChrome"
import { FARM_ENTERPRISES } from "@/lib/farmProfile"
import { featureByEnterprise } from "@/lib/marketing"
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
          <div className="grid items-stretch gap-4 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
            <div className="flex min-w-0 flex-col gap-4">
              <div className="flex flex-1 flex-col items-center justify-center rounded-[28px] bg-[#E7F3E4] px-5 py-12 text-center sm:min-h-[460px] sm:rounded-[32px] sm:px-10 sm:py-14">
                <p className="rounded-full bg-white/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#3d4a42]">
                  100% trusted platform
                </p>
                <h1 className="mt-6 max-w-xl text-[2.75rem] font-extrabold leading-[0.95] tracking-[-0.04em] text-[#121815] sm:mt-8 sm:text-7xl">
                  Record.
                  <span className="block">Raise.</span>
                  <span className="block">Grow.</span>
                </h1>
                <Link
                  href="/get-started"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#173528] py-2 pl-5 pr-2 text-base font-semibold text-white shadow-[0_10px_24px_rgba(23,53,40,0.18)] sm:mt-10 sm:pl-6"
                >
                  Set up your farm
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#173528]">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Link>
              </div>

              <div className="grid gap-3 min-[380px]:grid-cols-2 sm:gap-4 sm:grid-cols-[1.15fr_0.9fr]">
                <article className="relative min-h-[210px] overflow-hidden rounded-[24px] sm:min-h-[230px] sm:rounded-[28px]">
                  <Image
                    src="/landing/field.png"
                    alt="Rows of green crops seen from above"
                    fill
                    sizes="(min-width: 640px) 28vw, 100vw"
                    className="object-cover"
                  />
                  {pins.map((pin) => (
                    <span key={`${pin.top}-${pin.left}`} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: pin.top, left: pin.left }}>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.28)]">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#248046]" />
                      </span>
                    </span>
                  ))}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 rounded-xl bg-white px-2 py-2 shadow-[0_12px_30px_rgba(16,24,20,0.16)] sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-[240px] sm:gap-3 sm:rounded-2xl sm:px-3 sm:py-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E7F3E4] text-[#173528] sm:h-10 sm:w-10 sm:rounded-xl">
                      <Sprout className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold leading-tight sm:text-sm">Greenfield Farm</p>
                      <p className="mt-0.5 hidden text-xs text-[#66756c] sm:block">Poultry, goats, and maize</p>
                    </div>
                  </div>
                </article>

                <article className="relative z-10 min-h-[210px] overflow-hidden rounded-[24px] sm:min-h-[230px] sm:rounded-[28px] lg:-mr-6">
                  <Image
                    src="/landing/produce.png"
                    alt="Green pears, grapes, and apples in a crate"
                    fill
                    sizes="(min-width: 640px) 22vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute left-2 top-2 inline-flex max-w-[calc(100%-1rem)] items-center gap-1.5 rounded-full bg-[#173528] py-1 pl-1 pr-2.5 text-[11px] font-semibold text-white shadow-lg sm:left-3 sm:top-3 sm:gap-2 sm:py-1.5 sm:pl-1.5 sm:pr-3.5 sm:text-sm">
                    <span className="flex -space-x-2">
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
                    <span className="whitespace-nowrap">Farm teams</span>
                  </div>
                  <p className="absolute bottom-3 left-3 right-3 text-sm font-bold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:bottom-4 sm:left-4 sm:right-4 sm:text-lg">
                    One place for every enterprise
                  </p>
                </article>
              </div>
            </div>

            <article className="relative min-h-[380px] overflow-hidden rounded-[28px] sm:min-h-[520px] sm:rounded-[32px] md:min-h-full">
              <Image
                src="/landing/farmer.png"
                alt="Farmer standing in a greenhouse with arms crossed"
                fill
                priority
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover object-[center_18%]"
              />
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#173528] shadow-[0_10px_24px_rgba(16,24,20,0.16)] sm:bottom-6 sm:left-[16%]">
                Your records
                <Leaf className="h-4 w-4 text-[#2F7D46]" />
                <Sprout className="h-4 w-4 text-[#2F7D46]" />
              </div>
            </article>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 mx-auto max-w-[1320px] px-4 py-10 sm:px-6 sm:py-16">
          <div className="grid items-center gap-6 rounded-[28px] bg-[#E7F3E4] px-5 py-8 sm:gap-8 sm:rounded-[32px] sm:px-6 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3d6b4a]">About us</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">A farm workspace that starts with the farm you have.</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#3e4b43]">
                {appName} asks what you raise and what you grow, then opens menus and records shaped around that mix. Staff who already have accounts can sign in and pick up the same farm.
              </p>
              <Link href="/about" className="mt-5 inline-block text-sm font-semibold text-[#173528] underline-offset-4 hover:underline">
                More about {appName}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["01", "Name the farm"],
                ["02", "Pick the enterprises"],
                ["03", "Add the crops"],
                ["04", "Open the dashboard"],
              ].map(([step, label]) => (
                <div key={step} className="rounded-2xl bg-white p-4 sm:rounded-3xl sm:p-5">
                  <p className="text-sm font-bold text-[#2F7D46]">{step}</p>
                  <p className="mt-2 font-semibold">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="product" className="scroll-mt-24 mx-auto max-w-[1320px] px-4 py-4 sm:px-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3d6b4a]">Product</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">What the farm can run</h2>
            </div>
            <Link href="/features" className="hidden text-sm font-semibold text-[#173528] underline-offset-4 hover:underline sm:inline">
              See every enterprise
            </Link>
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
          <h2 className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">The dashboard follows the farm, not the other way around.</h2>
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
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">How mixed farms use it</h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {quotes.map((item) => (
                <figure key={item.role} className="rounded-[28px] bg-white p-6">
                  <blockquote className="text-lg font-semibold leading-snug">“{item.quote}”</blockquote>
                  <figcaption className="mt-5 text-sm font-medium text-[#526057]">{item.role}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-4 py-12 text-center sm:px-6 sm:py-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">Bring this farm onto {appName}</h2>
          <p className="mx-auto mt-3 max-w-xl text-[#526057]">
            A short signup records the farm, the crops, and your account. The dashboard opens already pointed at that work.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/get-started"
              className="inline-flex items-center gap-3 rounded-full bg-[#173528] py-2 pl-6 pr-2 text-base font-semibold text-white"
            >
              Set up your farm
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#173528]">
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
            <Link href="/faq" className="rounded-full bg-[#F3F4F2] px-5 py-3 text-sm font-semibold text-[#173528]">
              Read the FAQ
            </Link>
          </div>
        </section>
      </main>
    </MarketingChrome>
  )
}
