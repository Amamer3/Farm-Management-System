export const PWA_THEME_COLOR = "#173528"
export const PWA_BACKGROUND_COLOR = "#ffffff"

export const PWA_ICON_96 = "/icons/icon-96.png"
export const PWA_ICON_192 = "/icons/icon-192.png"
export const PWA_ICON_512 = "/icons/icon-512.png"
export const PWA_ICON_192_MASKABLE = "/icons/icon-192-maskable.png"
export const PWA_ICON_512_MASKABLE = "/icons/icon-512-maskable.png"
export const PWA_APPLE_TOUCH_ICON = "/icons/apple-touch-icon.png"
export const PWA_APPLE_TOUCH_ICON_152 = "/icons/apple-touch-icon-152.png"
export const PWA_APPLE_TOUCH_ICON_167 = "/icons/apple-touch-icon-167.png"
export const PWA_SAFARI_PINNED_TAB = "/icons/safari-pinned-tab.svg"

export const PWA_SCREENSHOT_NARROW = "/screenshots/narrow.png"
export const PWA_SCREENSHOT_WIDE = "/screenshots/wide.png"

export const APPLE_SPLASH_SCREENS = [
  { file: "iphone-16-pro-max.png", width: 1320, height: 2868, pixelRatio: 3, deviceWidth: 440, deviceHeight: 956 },
  { file: "iphone-16-pro.png", width: 1206, height: 2622, pixelRatio: 3, deviceWidth: 402, deviceHeight: 874 },
  { file: "iphone-14-pro-max.png", width: 1290, height: 2796, pixelRatio: 3, deviceWidth: 430, deviceHeight: 932 },
  { file: "iphone-14-pro.png", width: 1179, height: 2556, pixelRatio: 3, deviceWidth: 393, deviceHeight: 852 },
  { file: "iphone-14-plus.png", width: 1284, height: 2778, pixelRatio: 3, deviceWidth: 428, deviceHeight: 926 },
  { file: "iphone-14.png", width: 1170, height: 2532, pixelRatio: 3, deviceWidth: 390, deviceHeight: 844 },
  { file: "iphone-11.png", width: 828, height: 1792, pixelRatio: 2, deviceWidth: 414, deviceHeight: 896 },
  { file: "iphone-x.png", width: 1125, height: 2436, pixelRatio: 3, deviceWidth: 375, deviceHeight: 812 },
  { file: "iphone-8.png", width: 750, height: 1334, pixelRatio: 2, deviceWidth: 375, deviceHeight: 667 },
  { file: "ipad-pro-12.9.png", width: 2048, height: 2732, pixelRatio: 2, deviceWidth: 1024, deviceHeight: 1366 },
  { file: "ipad-pro-11.png", width: 1668, height: 2388, pixelRatio: 2, deviceWidth: 834, deviceHeight: 1194 },
  { file: "ipad-10.9.png", width: 1640, height: 2360, pixelRatio: 2, deviceWidth: 820, deviceHeight: 1180 },
  { file: "ipad.png", width: 1536, height: 2048, pixelRatio: 2, deviceWidth: 768, deviceHeight: 1024 },
] as const

export function appleStartupImages() {
  return APPLE_SPLASH_SCREENS.flatMap((screen) => {
    const portrait = `/splash/${screen.file}`
    const landscape = `/splash/landscape-${screen.file}`
    return [
      {
        url: portrait,
        media: `(device-width: ${screen.deviceWidth}px) and (device-height: ${screen.deviceHeight}px) and (-webkit-device-pixel-ratio: ${screen.pixelRatio}) and (orientation: portrait)`,
      },
      {
        url: landscape,
        media: `(device-width: ${screen.deviceWidth}px) and (device-height: ${screen.deviceHeight}px) and (-webkit-device-pixel-ratio: ${screen.pixelRatio}) and (orientation: landscape)`,
      },
    ]
  })
}
