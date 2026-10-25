import type { Metadata } from "next"
import Link from "next/link"
import { MarketingCta, MarketingPage } from "@/components/marketing/MarketingPage"
import { JsonLd } from "@/components/seo/JsonLd"
import { getAppName } from "@/lib/env"
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Agrocyms is a farm workspace that starts with the farm you have. Choose poultry, livestock, and crops, then keep daily records in one place.",
  path: "/about",
  keywords: ["about Agrocyms", "farm management software", "mixed farm records"],
})

export default function AboutPage() {
  const name = getAppName()

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <MarketingPage
        eyebrow="About us"
        title={`A farm workspace that starts with the farm you have.`}
        lead={`${name} asks what you raise and what you grow, then opens menus and records shaped around that mix. Staff who already have accounts can sign in and pick up the same farm.`}
      >
        <section className="mx-auto max-w-[1320px] px-4 pb-10 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Name the farm", "The workspace belongs to a real place, not a generic livestock template."],
              ["Pick the enterprises", "Poultry, goats and sheep, cattle, pigs, crops, or a mix."],
              ["Add the crops", "Fields sit beside the flock when this farm grows food."],
              ["Open the dashboard", "Daily work starts already pointed at the animals and fields you run."],
            ].map(([title, body]) => (
              <article key={title} className="rounded-[28px] bg-[#F3F4F2] p-6">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#526057]">{body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#3e4b43]">
            {name} is built for mixed farms that are tired of splitting egg books, herd notes, and field lists. See{" "}
            <Link href="/features" className="font-semibold text-[#173528] underline-offset-4 hover:underline">
              what the farm can run
            </Link>{" "}
            or read the{" "}
            <Link href="/faq" className="font-semibold text-[#173528] underline-offset-4 hover:underline">
              FAQ
            </Link>
            .
          </p>
        </section>
        <MarketingCta
          title={`Bring this farm onto ${name}`}
          body="A short signup records the farm, the crops, and your account."
        />
      </MarketingPage>
    </>
  )
}
