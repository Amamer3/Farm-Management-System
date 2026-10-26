import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { MarketingChrome } from "@/components/marketing/MarketingChrome"

export function MarketingPage({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string
  title: string
  lead: string
  children: React.ReactNode
}) {
  return (
    <MarketingChrome>
      <main>
        <section className="mx-auto max-w-[1320px] px-4 pb-6 pt-8 sm:px-6 sm:pt-12">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3d6b4a]">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-[#121815] sm:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3e4b43] sm:text-lg">{lead}</p>
        </section>
        {children}
      </main>
    </MarketingChrome>
  )
}

export function MarketingCta({
  title,
  body,
  href = "/get-started",
  label = "Get Started",
  secondaryHref,
  secondaryLabel,
}: {
  title: string
  body: string
  href?: string
  label?: string
  secondaryHref?: string
  secondaryLabel?: string
}) {
  return (
    <section className="mx-auto max-w-[1320px] px-4 py-12 text-center sm:px-6 sm:py-16">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-[#526057]">{body}</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href={href}
          className="inline-flex items-center gap-3 rounded-full bg-[#173528] py-2 pl-6 pr-2 text-base font-semibold text-white"
        >
          {label}
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#173528]">
            <ArrowRight className="h-5 w-5" />
          </span>
        </Link>
        {secondaryHref && secondaryLabel && (
          <Link href={secondaryHref} className="rounded-full bg-[#F3F4F2] px-5 py-3 text-sm font-semibold text-[#173528]">
            {secondaryLabel}
          </Link>
        )}
      </div>
    </section>
  )
}
