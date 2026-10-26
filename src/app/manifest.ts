import type { MetadataRoute } from "next"
import { getAppDescription, getAppName } from "@/lib/env"
import { ICON_192_PATH, ICON_512_PATH } from "@/lib/seo"

export default function manifest(): MetadataRoute.Manifest {
  const name = getAppName()

  return {
    name,
    short_name: name,
    description: getAppDescription(),
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#173528",
    lang: "en",
    categories: ["business", "productivity", "utilities"],
    icons: [
      {
        src: ICON_192_PATH,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: ICON_512_PATH,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  }
}
