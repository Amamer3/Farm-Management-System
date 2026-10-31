import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { PRODUCTION_SITE_URL } from "@/lib/env"
import { LOCALE_COOKIE } from "@/i18n/config"
import { localeFromCookie, negotiateLocale } from "@/i18n/negotiate"
import { isSearchCrawler } from "@/lib/crawlers"

const canonicalHost = new URL(PRODUCTION_SITE_URL).host 

function withLocaleCookie(request: NextRequest, response: NextResponse) {
  if (isSearchCrawler(request.headers.get("user-agent"))) {
    return response
  }
  if (localeFromCookie(request.cookies.get(LOCALE_COOKIE)?.value)) {
    return response
  }
  const locale = negotiateLocale(request.headers.get("accept-language"))
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })
  return response
}

export function middleware(request: NextRequest) {
  try {
    const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase()
    if (host === "localhost" || host === "127.0.0.1") {
      return withLocaleCookie(request, NextResponse.next())
    }

    const proto = (request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", ""))
      .split(",")[0]
      .trim()
    const isHttp = proto === "http"
    const isWww = host === `www.${canonicalHost}`

    if (!isHttp && !isWww) {
      return withLocaleCookie(request, NextResponse.next())
    }

    const url = request.nextUrl.clone()
    url.protocol = "https:"
    url.port = ""
    if (isWww) {
      url.hostname = canonicalHost
    }

    return withLocaleCookie(request, NextResponse.redirect(url, 301))
  } catch {
    return NextResponse.next()
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt)$).*)"],
}
