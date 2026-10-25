import type { Metadata } from "next";
import { Providers } from "./providers";
import { getAppDescription, getAppName, getAppTitle, getLogoPath, getTwitterHandle } from "@/lib/env";
import "../index.css";

const appName = getAppName(); 
const appTitle = getAppTitle();
const appDescription = getAppDescription();
const logoPath = getLogoPath();

export const metadata: Metadata = {
  title: appTitle,
  description: appDescription,
  authors: [{ name: appName }],
  icons: {
    icon: logoPath,
  },
  openGraph: {
    title: appTitle,
    description: appDescription,
    type: "website",
    images: [logoPath],
  },
  twitter: {
    card: "summary_large_image",
    site: getTwitterHandle(),
    images: [logoPath],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
