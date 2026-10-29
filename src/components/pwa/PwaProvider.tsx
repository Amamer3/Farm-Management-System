"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import Link from "next/link"
import { Download, Share, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { getAppName, getLogoPath } from "@/lib/env"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const DISMISS_KEY = "agrocyms-pwa-dismissed"
const DISMISS_MS = 21 * 24 * 60 * 60 * 1000
const BANNER_DELAY_MS = 8000

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

type Platform = "chromium" | "ios" | "macos-safari" | "other"

type PwaContextValue = {
  canInstall: boolean
  isInstalled: boolean
  platform: Platform
  promptInstall: () => Promise<void>
}

const PwaContext = createContext<PwaContextValue | null>(null)

export function usePwaInstall() {
  const value = useContext(PwaContext)
  if (!value) {
    return {
      canInstall: false,
      isInstalled: false,
      platform: "other" as Platform,
      promptInstall: async () => {},
    }
  }
  return value
}

function isStandaloneDisplay() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: window-controls-overlay)").matches ||
    window.matchMedia("(display-mode: minimal-ui)").matches ||
    ("standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
  )
}

function detectPlatform(): Platform {
  const ua = navigator.userAgent
  const isIos =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  const isSafari = /Safari/i.test(ua) && !/Chrome|Chromium|CriOS|FxiOS|EdgiOS|Android/i.test(ua)
  const isMac = /Macintosh|Mac OS X/i.test(ua) && navigator.maxTouchPoints <= 1

  if (isIos) return "ios"
  if (isMac && isSafari) return "macos-safari"
  return "other"
}

function wasRecentlyDismissed() {
  try {
    const raw = localStorage.getItem(DISMISS_KEY)
    if (!raw) return false
    const at = Number(raw)
    if (!Number.isFinite(at)) return false
    return Date.now() - at < DISMISS_MS
  } catch {
    return false
  }
}

function rememberDismissed() {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now()))
  } catch {
    /* ignore quota / private mode */
  }
}

export function PwaProvider({ children }: { children: ReactNode }) {
  const t = useTranslations()
  const appName = getAppName()
  const logoPath = getLogoPath()
  const [isInstalled, setIsInstalled] = useState(false)
  const [platform, setPlatform] = useState<Platform>("other")
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [bannerOpen, setBannerOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return
    if (process.env.NODE_ENV !== "production") return
    void navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" })
  }, [])

  useEffect(() => {
    const installed = isStandaloneDisplay()
    const detected = detectPlatform()
    setIsInstalled(installed)
    setPlatform(detected)

    const onBeforeInstall = (event: Event) => {
      event.preventDefault()
      setDeferredPrompt(event as BeforeInstallPromptEvent)
      setPlatform("chromium")
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstall)

    const onInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
      setBannerOpen(false)
      setHelpOpen(false)
    }
    window.addEventListener("appinstalled", onInstalled)

    let timer: number | undefined
    if (!installed && !wasRecentlyDismissed()) {
      timer = window.setTimeout(() => setBannerOpen(true), BANNER_DELAY_MS)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall)
      window.removeEventListener("appinstalled", onInstalled)
      if (timer) window.clearTimeout(timer)
    }
  }, [])

  const promptInstall = useCallback(async () => {
    if (isInstalled) return
    if (deferredPrompt) {
      await deferredPrompt.prompt()
      const choice = await deferredPrompt.userChoice
      setDeferredPrompt(null)
      if (choice.outcome === "accepted") {
        setIsInstalled(true)
        setBannerOpen(false)
        return
      }
    }
    setHelpOpen(true)
  }, [deferredPrompt, isInstalled])

  const dismissBanner = useCallback(() => {
    setBannerOpen(false)
    rememberDismissed()
  }, [])

  const canInstall = !isInstalled
  const value = useMemo(
    () => ({ canInstall, isInstalled, platform, promptInstall }),
    [canInstall, isInstalled, platform, promptInstall]
  )

  const nameVars = { name: appName }
  const helpTitle =
    platform === "ios"
      ? t("pwa.iosTitle")
      : platform === "macos-safari"
        ? t("pwa.macosTitle")
        : t("pwa.desktopTitle", nameVars)
  const helpBody =
    platform === "ios"
      ? t("pwa.iosBody", nameVars)
      : platform === "macos-safari"
        ? t("pwa.macosBody", nameVars)
        : t("pwa.desktopBody", nameVars)

  return (
    <PwaContext.Provider value={value}>
      {children}

      {canInstall && bannerOpen && !helpOpen && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="pointer-events-auto mx-auto flex max-w-lg items-start gap-3 rounded-[24px] border border-black/5 bg-white p-4 shadow-[0_16px_40px_rgba(20,32,24,0.16)]">
            <img src={logoPath} alt="" className="mt-0.5 h-11 w-11 shrink-0 object-contain" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#173528]">{t("pwa.installTitle", { name: appName })}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#526057]">{t("pwa.installBody", { name: appName })}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void promptInstall()}
                  className="inline-flex items-center gap-2 rounded-full bg-[#173528] px-4 py-2 text-sm font-semibold text-white"
                >
                  <Download className="h-4 w-4" />
                  {t("pwa.installAction")}
                </button>
                <button
                  type="button"
                  onClick={dismissBanner}
                  className="rounded-full px-3 py-2 text-sm font-semibold text-[#526057]"
                >
                  {t("pwa.notNow")}
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={dismissBanner}
              className="rounded-full p-1 text-[#66756c] hover:bg-[#F3F4F2]"
              aria-label={t("pwa.close")}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>{helpTitle}</DialogTitle>
            <DialogDescription>{helpBody}</DialogDescription>
          </DialogHeader>
          {platform === "ios" && (
            <ol className="space-y-3 text-sm text-[#3e4b43]">
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E7F3E4] text-[#173528]">
                  <Share className="h-4 w-4" />
                </span>
                {t("pwa.iosShare")}
              </li>
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E7F3E4] font-bold text-[#173528]">
                  +
                </span>
                {t("pwa.iosAdd")}
              </li>
            </ol>
          )}
          {platform === "macos-safari" && (
            <ol className="list-decimal space-y-2 ps-5 text-sm text-[#3e4b43]">
              <li>{t("pwa.macosStepFile")}</li>
              <li>{t("pwa.macosStepDock")}</li>
            </ol>
          )}
          {platform !== "ios" && platform !== "macos-safari" && (
            <p className="text-sm text-[#3e4b43]">{t("pwa.desktopHint")}</p>
          )}
          {platform !== "ios" && (
            <Link
              href="/login"
              onClick={() => setHelpOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-[#173528] px-4 py-2 text-sm font-semibold text-white"
            >
              {t("pwa.desktopOpenLogin")}
            </Link>
          )}
        </DialogContent>
      </Dialog>
    </PwaContext.Provider>
  )
}
