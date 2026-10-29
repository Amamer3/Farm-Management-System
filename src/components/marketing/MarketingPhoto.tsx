import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function MarketingPhoto({
  src,
  alt,
  className = "object-cover",
  sizes = "(min-width: 1320px) 1320px, calc(100vw - 2rem)",
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      unoptimized
      priority={priority}
    />
  )
}

export function MarketingHeroPhoto({
  src,
  alt,
  priority = true,
}: {
  src: string
  alt: string
  priority?: boolean
}) {
  return (
    <figure className="relative h-40 overflow-hidden rounded-[24px] sm:h-48 sm:rounded-[28px] lg:h-[260px]">
      <MarketingPhoto
        src={src}
        alt={alt}
        className="object-cover object-[center_30%]"
        sizes="(min-width: 1024px) 40vw, calc(100vw - 2rem)"
        priority={priority}
      />
    </figure>
  )
}

export function MarketingPhotoCard({
  href,
  title,
  body,
  src,
  alt,
  cta,
  heading = "h2",
}: {
  href?: string
  title: string
  body: string
  src: string
  alt: string
  cta?: string
  heading?: "h2" | "h3"
}) {
  const Heading = heading
  const inner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden">
        <MarketingPhoto
          src={src}
          alt={alt}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Heading className="text-xl font-bold">{title}</Heading>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#526057]">{body}</p>
        {cta ? (
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#173528]">
            {cta}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </span>
        ) : null}
      </div>
    </>
  )

  const className =
    "flex h-full flex-col overflow-hidden rounded-[28px] bg-[#F3F4F2] transition hover:bg-[#E7F3E4]"

  if (href) {
    return (
      <article className={className}>
        <Link href={href} className="flex h-full flex-col">
          {inner}
        </Link>
      </article>
    )
  }

  return <article className={className}>{inner}</article>
}
