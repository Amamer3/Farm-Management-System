import { mkdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const logoPath = path.join(root, "public", "agrocyms-logo.png")
const iconsDir = path.join(root, "public", "icons")
const splashDir = path.join(root, "public", "splash")
const screenshotsDir = path.join(root, "public", "screenshots")

const BRAND = { r: 23, g: 53, b: 40, alpha: 1 }
const LIGHT = { r: 231, g: 243, b: 228, alpha: 1 }

const SPLASHES = [
  { file: "iphone-16-pro-max.png", width: 1320, height: 2868 },
  { file: "iphone-16-pro.png", width: 1206, height: 2622 },
  { file: "iphone-14-pro-max.png", width: 1290, height: 2796 },
  { file: "iphone-14-pro.png", width: 1179, height: 2556 },
  { file: "iphone-14-plus.png", width: 1284, height: 2778 },
  { file: "iphone-14.png", width: 1170, height: 2532 },
  { file: "iphone-11.png", width: 828, height: 1792 },
  { file: "iphone-x.png", width: 1125, height: 2436 },
  { file: "iphone-8.png", width: 750, height: 1334 },
  { file: "ipad-pro-12.9.png", width: 2048, height: 2732 },
  { file: "ipad-pro-11.png", width: 1668, height: 2388 },
  { file: "ipad-10.9.png", width: 1640, height: 2360 },
  { file: "ipad.png", width: 1536, height: 2048 },
]

async function iconOnBrand(size, padRatio) {
  const inner = Math.max(1, Math.round(size * (1 - padRatio * 2)))
  const logo = await sharp(logoPath)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  return sharp({
    create: { width: size, height: size, channels: 4, background: BRAND },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png({ compressionLevel: 9 })
}

async function writeIcon(file, size, padRatio) {
  const dest = path.join(iconsDir, file)
  await (await iconOnBrand(size, padRatio)).toFile(dest)
  console.log("wrote", path.relative(root, dest))
}

async function writeSplash(file, width, height) {
  const logoSize = Math.round(Math.min(width, height) * 0.28)
  const logo = await sharp(logoPath)
    .resize(logoSize, logoSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  const dest = path.join(splashDir, file)
  await sharp({
    create: { width, height, channels: 4, background: BRAND },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(dest)
  console.log("wrote", path.relative(root, dest))
}

async function writeScreenshot(file, width, height, kicker) {
  const logoSize = Math.round(Math.min(width, height) * 0.22)
  const logo = await sharp(logoPath)
    .resize(logoSize, logoSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  const titleSize = Math.round(width * 0.045)
  const kickerSize = Math.round(width * 0.022)
  const svg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#173528"/>
      <text x="50%" y="${Math.round(height * 0.68)}" text-anchor="middle" fill="#ffffff"
        font-size="${titleSize}" font-family="Arial, Helvetica, sans-serif" font-weight="700">Agrocyms</text>
      <text x="50%" y="${Math.round(height * 0.68) + kickerSize + 28}" text-anchor="middle" fill="#E7F3E4"
        font-size="${kickerSize}" font-family="Arial, Helvetica, sans-serif">${kicker}</text>
    </svg>
  `)

  const dest = path.join(screenshotsDir, file)
  await sharp(svg)
    .composite([{ input: logo, gravity: "center", top: Math.round(height * 0.28 - logoSize / 2), left: Math.round((width - logoSize) / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(dest)
  console.log("wrote", path.relative(root, dest))
}

async function writeWideTile() {
  const width = 310
  const height = 150
  const logoSize = 110
  const logo = await sharp(logoPath)
    .resize(logoSize, logoSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()
  const dest = path.join(iconsDir, "mstile-310x150.png")
  await sharp({
    create: { width, height, channels: 4, background: BRAND },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(dest)
  console.log("wrote", path.relative(root, dest))
}

async function main() {
  await mkdir(iconsDir, { recursive: true })
  await mkdir(splashDir, { recursive: true })
  await mkdir(screenshotsDir, { recursive: true })

  await writeIcon("icon-96.png", 96, 0.1)
  await writeIcon("icon-192.png", 192, 0.1)
  await writeIcon("icon-512.png", 512, 0.1)
  await writeIcon("icon-192-maskable.png", 192, 0.2)
  await writeIcon("icon-512-maskable.png", 512, 0.2)
  await writeIcon("apple-touch-icon.png", 180, 0.1)
  await writeIcon("apple-touch-icon-152.png", 152, 0.1)
  await writeIcon("apple-touch-icon-167.png", 167, 0.1)
  await writeIcon("mstile-150x150.png", 150, 0.12)
  await writeIcon("mstile-310x310.png", 310, 0.12)
  await writeWideTile()

  for (const splash of SPLASHES) {
    await writeSplash(splash.file, splash.width, splash.height)
    await writeSplash(`landscape-${splash.file}`, splash.height, splash.width)
  }

  await writeScreenshot("narrow.png", 1080, 1920, "Farm management on your phone")
  await writeScreenshot("wide.png", 1920, 1080, "Farm management on your computer")
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
