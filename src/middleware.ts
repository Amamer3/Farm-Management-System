import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { PRODUCTION_SITE_URL } from "@/lib/env"

const canonicalHost = new URL(PRODUCTION_SITE_URL).host

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase()
  if (host === "localhost" || host === "127.0.0.1") {
    return NextResponse.next()
  }

  const proto = (request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", ""))
    .split(",")[0]
    .trim()
  const isHttp = proto === "http"
  const isWww = host === `www.${canonicalHost}`

  if (!isHttp && !isWww) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.protocol = "https:"
  url.port = ""
  if (isWww) {
    url.hostname = canonicalHost
  }

  return NextResponse.redirect(url, 301)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api/).*)"],
}
