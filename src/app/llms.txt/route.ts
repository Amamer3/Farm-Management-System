import { getAppDescription, getAppName } from "@/lib/env"
import { absoluteUrl } from "@/lib/seo"

export function GET() {
  const name = getAppName()
  const body = `# ${name}

> ${getAppDescription()}

${name} is farm management software for mixed enterprises. Farms choose poultry, goats and sheep, cattle, pigs, crops, or a mix during setup. The dashboard then shows records for that mix.

## Public pages

- [Home](${absoluteUrl("/")})
- [About](${absoluteUrl("/about")})
- [Features](${absoluteUrl("/features")})
- [Poultry](${absoluteUrl("/features/poultry")})
- [Goats & sheep](${absoluteUrl("/features/goats-sheep")})
- [Cattle](${absoluteUrl("/features/cattle")})
- [Pigs](${absoluteUrl("/features/pigs")})
- [Crops](${absoluteUrl("/features/crops")})
- [FAQ](${absoluteUrl("/faq")})
- [Get started](${absoluteUrl("/get-started")})
- [Log in](${absoluteUrl("/login")})
- [Privacy](${absoluteUrl("/privacy")})
- [Terms](${absoluteUrl("/terms")})

## Product

${name} tracks bird batches, egg collection, feed and medicine stock, livestock events, crop lists, team logins, reports, and statistics. Authenticated workspace routes are private and should not be treated as public documentation.
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
