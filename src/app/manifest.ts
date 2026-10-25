import type { MetadataRoute } from "next"
import { getAppDescription, getAppName, getLogoPath } from "@/lib/env"

export default function manifest(): MetadataRoute.Manifest {
  const name = getAppName()
  const logo = getLogoPath()

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
        src: logo,
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  }
}
