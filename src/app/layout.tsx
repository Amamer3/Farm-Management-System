import type { Metadata, Viewport } from "next"
import { Inter, Manrope } from "next/font/google"
import { Providers } from "./providers"
import { JsonLd } from "@/components/seo/JsonLd"
import { organizationJsonLd, rootMetadata, softwareJsonLd, websiteJsonLd } from "@/lib/seo"
import "../index.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className="font-inter antialiased" suppressHydrationWarning>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(), softwareJsonLd()]} />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
