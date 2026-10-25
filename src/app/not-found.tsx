import type { Metadata } from "next"
import Link from "next/link"
import { MarketingChrome } from "@/components/marketing/MarketingChrome"

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <MarketingChrome>
      <main className="mx-auto flex min-h-[60vh] max-w-[760px] flex-col items-center justify-center px-4 py-20 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3d6b4a]">404</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">This page is not on the farm.</h1>
        <p className="mt-4 max-w-md text-[#526057]">
          The address does not match a public page or a workspace route. Head home or open the farm setup.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-[#173528] px-5 py-3 text-sm font-semibold text-white">
            Back home
          </Link>
          <Link href="/get-started" className="rounded-full bg-[#F3F4F2] px-5 py-3 text-sm font-semibold">
            Set up your farm
          </Link>
        </div>
      </main>
    </MarketingChrome>
  )
}
