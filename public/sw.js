const CACHE_NAME = "agrocyms-pwa-v1"
const OFFLINE_URL = "/offline.html"
const PRECACHE_URLS = [
  OFFLINE_URL,
  "/manifest.webmanifest",
  "/agrocyms-logo.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-192-maskable.png",
  "/icons/icon-512-maskable.png",
  "/icons/apple-touch-icon.png",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  )
})

function isApiRequest(url) {
  return url.pathname === "/api" || url.pathname.startsWith("/api/")
}

function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/splash/") ||
    url.pathname.startsWith("/screenshots/") ||
    url.pathname.startsWith("/favicon_io/") ||
    /\.(?:png|jpg|jpeg|webp|gif|svg|ico|woff2?|ttf|css|js|map|webmanifest)$/i.test(url.pathname)
  )
}

async function networkFirst(request) {
  try {
    const response = await fetch(request)
    if (response && response.ok && response.type === "basic") {
      const copy = response.clone()
      const cache = await caches.open(CACHE_NAME)
      await cache.put(request, copy)
    }
    return response
  } catch (error) {
    const cached = await caches.match(request)
    if (cached) return cached
    if (request.mode === "navigate") {
      const offline = await caches.match(OFFLINE_URL)
      if (offline) return offline
    }
    throw error
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) return cached
  const response = await fetch(request)
  if (response && response.ok && response.type === "basic") {
    const copy = response.clone()
    const cache = await caches.open(CACHE_NAME)
    await cache.put(request, copy)
  }
  return response
}

self.addEventListener("fetch", (event) => {
  const request = event.request
  if (request.method !== "GET") return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return
  if (isApiRequest(url)) return

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request))
    return
  }

  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request))
  }
})
