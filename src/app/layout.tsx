import type { Metadata, Viewport } from "next"
import { Inter, Manrope, Noto_Sans_Arabic, Noto_Sans_Devanagari, Noto_Sans_SC } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import { Providers } from "./providers"
import { JsonLd } from "@/components/seo/JsonLd"
import { isRtl } from "@/i18n/config"
import { rootMetadata, siteGraphJsonLd } from "@/lib/seo"
import "../index.css"

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
})

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
})

const chinese = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sc",
  display: "swap",
})

const hindi = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
})

export const metadata: Metadata = rootMetadata()

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#173528" },
    { media: "(prefers-color-scheme: dark)", color: "#173528" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      dir={isRtl(locale) ? "rtl" : "ltr"}
      className={`${inter.variable} ${manrope.variable} ${arabic.variable} ${chinese.variable} ${hindi.variable}`}
      suppressHydrationWarning
    >
      <body className="font-inter antialiased" suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <JsonLd data={siteGraphJsonLd()} />
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
