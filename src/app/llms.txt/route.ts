import { getAppDescription, getAppName } from "@/lib/env"
import { absoluteUrl } from "@/lib/seo"

export function GET() {
  const name = getAppName()
  const body = `# ${name}

> ${getAppDescription()}

${name} is farm management software for crop and livestock businesses. Farms choose poultry, goats and sheep, cattle, pigs, crops, or a mix during setup. The dashboard then shows records for that mix.

## Public pages

- [Home](${absoluteUrl("/")})
- [About](${absoluteUrl("/about")})
- [Features](${absoluteUrl("/features")})
- [Crop management](${absoluteUrl("/features/crop-management")})
- [Livestock management](${absoluteUrl("/features/livestock-management")})
- [Poultry](${absoluteUrl("/features/poultry")})
- [Goats & sheep](${absoluteUrl("/features/goats-sheep")})
- [Cattle](${absoluteUrl("/features/cattle")})
- [Pigs](${absoluteUrl("/features/pigs")})
- [Crops](${absoluteUrl("/features/crops")})
- [Solutions](${absoluteUrl("/solutions")})
- [Pricing](${absoluteUrl("/pricing")})
- [Resources](${absoluteUrl("/resources")})
- [FAQ](${absoluteUrl("/faq")})
- [Contact](${absoluteUrl("/contact")})
- [Get started](${absoluteUrl("/get-started")})
- [Privacy](${absoluteUrl("/privacy")})
- [Terms](${absoluteUrl("/terms")})

## Product

${name} tracks bird batches, egg collection, feed and medicine stock, livestock events, crop lists, team logins, reports, and statistics. New farms receive a 30-day trial of the full workspace with no card required. After the trial, records stay readable and exportable until the farm subscribes. Authenticated workspace routes are private and should not be treated as public documentation.
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
