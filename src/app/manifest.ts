import type { MetadataRoute } from "next"
import { getAppDescription, getAppName, getSiteUrl } from "@/lib/env"
import {
  PWA_BACKGROUND_COLOR,
  PWA_ICON_192,
  PWA_ICON_192_MASKABLE,
  PWA_ICON_512,
  PWA_ICON_512_MASKABLE,
  PWA_ICON_96,
  PWA_SCREENSHOT_NARROW,
  PWA_SCREENSHOT_WIDE,
  PWA_THEME_COLOR,
} from "@/lib/pwa"

export default function manifest(): MetadataRoute.Manifest {
  const name = getAppName()

  return {
    id: getSiteUrl(),
    name: `${name} Farm Management`,
    short_name: name,
    description: getAppDescription(),
    start_url: `${getSiteUrl()}/login`,
    scope: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone", "minimal-ui"],
    orientation: "any",
    background_color: PWA_BACKGROUND_COLOR,
    theme_color: PWA_THEME_COLOR,
    lang: "en",
    dir: "ltr",
    prefer_related_applications: false,
    categories: ["business", "productivity", "utilities"],
    launch_handler: {
      client_mode: ["navigate-existing", "auto"],
    },
    icons: [
      {
        src: PWA_ICON_192,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: PWA_ICON_512,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: PWA_ICON_192_MASKABLE,
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: PWA_ICON_512_MASKABLE,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Sign in",
        short_name: "Sign in",
        description: "Open the farm sign-in screen",
        url: "/login",
        icons: [{ src: PWA_ICON_96, sizes: "96x96", type: "image/png" }],
      },
      {
        name: "Farm dashboard",
        short_name: "Dashboard",
        description: "Open the farm workspace dashboard",
        url: "/",
        icons: [{ src: PWA_ICON_96, sizes: "96x96", type: "image/png" }],
      },
      {
        name: "Egg collection",
        short_name: "Eggs",
        description: "Record egg collection",
        url: "/eggs",
        icons: [{ src: PWA_ICON_96, sizes: "96x96", type: "image/png" }],
      },
      {
        name: "Reports",
        short_name: "Reports",
        description: "Open farm reports",
        url: "/reports",
        icons: [{ src: PWA_ICON_96, sizes: "96x96", type: "image/png" }],
      },
    ],
    screenshots: [
      {
        src: PWA_SCREENSHOT_NARROW,
        sizes: "1080x1920",
        type: "image/png",
        form_factor: "narrow",
        label: `${name} on a phone`,
      },
      {
        src: PWA_SCREENSHOT_WIDE,
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide",
        label: `${name} on a computer`,
      },
    ],
  }
}
