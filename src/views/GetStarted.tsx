"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher"
import { useUserRole } from "@/contexts/UserRoleContext"
import { authService } from "@/services/authService"
import {
  CROP_OPTIONS,
  FARM_ENTERPRISES,
  clearPendingFarm,
  clearSignupDraft,
  readSignupDraft,
  writePendingFarm,
  writeSignupDraft,
} from "@/lib/farmProfile"
import { getAppName, getLogoPath } from "@/lib/env"
import { getUserFriendlyMessage } from "@/utils/errorHandler"
import { photoForEnterprise } from "@/lib/marketingImages"

export default function GetStarted() {
  const t = useTranslations()
  const { register } = useUserRole()
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedPlan = searchParams.get("plan")
  const allSteps = [
    t("getStarted.steps.farm"),
    t("getStarted.steps.crops"),
    t("getStarted.steps.details"),
    t("getStarted.steps.account"),
  ]
  const enterpriseName = (id: string) => t(`enterprises.${id}.label`)
  const cropName = (id: string) => t(`crops.${id}`)
  const [step, setStep] = useState(0)
  const [enterprises, setEnterprises] = useState<string[]>([])
  const [crops, setCrops] = useState<string[]>([])
  const [noCrops, setNoCrops] = useState(false)
  const [farmName, setFarmName] = useState("")
  const [location, setLocation] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [draftReady, setDraftReady] = useState(false)

  const growsCrops = enterprises.includes("crops")
  const cropsLocked = !growsCrops && noCrops
  const steps = growsCrops ? allSteps : [allSteps[0], allSteps[2], allSteps[3]]
  const visibleStep = growsCrops ? step : step === 0 ? 0 : step - 1

  useEffect(() => {
    const draft = readSignupDraft()
    if (draft) {
      setStep(draft.step)
      setEnterprises(draft.enterprises)
      setCrops(draft.crops)
      setNoCrops(draft.noCrops || (draft.enterprises.length > 0 && !draft.enterprises.includes("crops") && draft.crops.length === 0))
      setFarmName(draft.farmName)
      setLocation(draft.location)
      setOwnerName(draft.ownerName)
      setEmail(draft.email)
    }
    setDraftReady(true)
  }, [])

  useEffect(() => {
    if (!draftReady) return
    if (step === 1 && !enterprises.includes("crops")) {
      setNoCrops(true)
      setCrops([])
      setStep(2)
    }
  }, [draftReady, step, enterprises])

  useEffect(() => {
    if (!draftReady) return
    // Persist progress only. Password fields stay in memory and are never written here.
    writeSignupDraft({
      step,
      enterprises,
      crops,
      noCrops,
      farmName,
      location,
      ownerName,
      email,
    })
  }, [draftReady, step, enterprises, crops, noCrops, farmName, location, ownerName, email])

  const toggleEnterprise = (id: string) => {
    setError(null)
    setEnterprises((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
      if (next.includes("crops")) {
        setNoCrops(false)
      } else {
        setNoCrops(true)
        setCrops([])
      }
      return next
    })
  }

  const toggleCrop = (id: string) => {
    setError(null)
    setNoCrops(false)
    setCrops((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  const goNext = () => {
    setError(null)
    if (step === 0 && enterprises.length === 0) {
      setError(t("getStarted.chooseEnterprise"))
      return
    }
    if (step === 0) {
      if (growsCrops) {
        setNoCrops(false)
      } else {
        setNoCrops(true)
        setCrops([])
        setStep(2)
        return
      }
    }
    if (step === 1) {
      if (growsCrops && crops.length === 0) {
        setError(t("getStarted.chooseCrops"))
        return
      }
      if (!growsCrops && !noCrops && crops.length === 0) {
        setError(t("getStarted.chooseCropsOrNone"))
        return
      }
    }
    if (step === 2 && farmName.trim().length < 2) {
      setError(t("getStarted.enterFarmName"))
      return
    }
    setStep((current) => Math.min(current + 1, 3))
  }

  const submit = async () => {
    setError(null)
    if (ownerName.trim().length < 2) {
      setError(t("getStarted.enterName"))
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(t("getStarted.enterValidEmail"))
      return
    }
    if (password.length < 6) {
      setError(t("getStarted.passwordMin"))
      return
    }
    if (password !== confirmPassword) {
      setError(t("getStarted.passwordMismatch"))
      return
    }

    const selectedCrops = noCrops ? [] : crops
    const profile = {
      name: farmName.trim(),
      location: location.trim(),
      enterprises,
      crops: selectedCrops,
    }

    setSubmitting(true)
    try {
      await authService.setupFarm({
        name: ownerName.trim(),
        email: email.trim(),
        password,
        farmName: profile.name,
        location: profile.location,
        enterprises: profile.enterprises,
        crops: profile.crops,
      })
      clearPendingFarm()
      clearSignupDraft()
      router.replace("/dashboard")
    } catch (err: unknown) {
      const status = typeof err === "object" && err && "status" in err ? Number((err as { status?: number }).status) : 0
      if (status === 404) {
        try {
          writePendingFarm(profile)
          await register(ownerName.trim(), email.trim(), password, "Admin")
          clearSignupDraft()
          router.replace("/dashboard")
          return
        } catch (fallbackError: unknown) {
          setError(getUserFriendlyMessage(fallbackError) || t("getStarted.couldNotCreate"))
          setSubmitting(false)
          return
        }
      }
      setError(getUserFriendlyMessage(err) || t("getStarted.couldNotCreate"))
      setSubmitting(false)
    }
  }

  const fieldClass = "h-12 w-full rounded-2xl border border-[#E4E8E4] bg-[#F7F8F7] px-4 text-sm text-[#142018] outline-none transition focus:border-[#173528] focus:bg-white"

  return (
    <div className="min-h-screen bg-white font-manrope text-[#142018]">
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-3 px-4 sm:h-[84px] sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <img src={getLogoPath()} alt={`${getAppName()} logo`} className="h-8 w-8 shrink-0 object-contain sm:h-11 sm:w-11" />
            <span className="truncate text-base font-extrabold tracking-tight text-[#173528] sm:text-[22px]">{getAppName()}</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher variant="plain" />
            <Link href="/login" className="rounded-full bg-[#F3F4F2] px-4 py-2 text-sm font-semibold text-[#1c241f] transition hover:bg-[#E7EAE6]">
              {t("common.signIn")}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3d6b4a]">{t("getStarted.eyebrow")}</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">{t("getStarted.title")}</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#526057] sm:text-base">
          {t("getStarted.lead")}
        </p>

        <ol className={`mt-8 grid gap-2 sm:gap-3 ${growsCrops ? "grid-cols-4" : "grid-cols-3"}`}>
          {steps.map((label, index) => (
            <li key={label} className="min-w-0">
              <div className={`mb-2 h-1.5 rounded-full ${index <= visibleStep ? "bg-[#173528]" : "bg-[#E7EAE6]"}`} />
              <p className={`truncate text-[11px] sm:text-xs ${index === visibleStep ? "font-bold text-[#142018]" : "font-medium text-[#7a877f]"}`}>
                {label}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-[28px] border border-[#E4E8E4] bg-white p-4 sm:mt-8 sm:rounded-[32px] sm:p-8">
          {!draftReady ? (
            <div className="min-h-[280px]" aria-hidden="true" />
          ) : null}
          {draftReady && step === 0 && (
            <div>
              <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">{t("getStarted.step0Title")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#526057]">{t("getStarted.step0Lead")}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {FARM_ENTERPRISES.map((item) => {
                  const selected = enterprises.includes(item.id)
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleEnterprise(item.id)}
                      className={`flex items-start gap-3 rounded-[22px] border p-3 text-left transition ${
                        selected ? "border-[#173528] bg-[#E7F3E4]" : "border-[#E4E8E4] bg-[#F7F8F7] hover:border-[#173528]/30"
                      }`}
                    >
                      <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl sm:h-16 sm:w-24">
                        <Image
                          src={photoForEnterprise(item.id).src}
                          alt={enterpriseName(item.id)}
                          fill
                          sizes="96px"
                          className="object-cover"
                          unoptimized
                        />
                      </span>
                      <span className="flex min-w-0 flex-1 items-start justify-between gap-3">
                        <span>
                          <span className="block font-bold">{enterpriseName(item.id)}</span>
                          <span className="mt-1 block text-sm leading-relaxed text-[#526057]">{t(`enterprises.${item.id}.description`)}</span>
                        </span>
                        <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${selected ? "border-[#173528] bg-[#173528] text-white" : "border-[#D5DBD6] bg-white"}`}>
                          {selected && <Check className="h-3.5 w-3.5" />}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {draftReady && step === 1 && (
            <div>
              <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">{t("getStarted.step1Title")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#526057]">
                {growsCrops ? t("getStarted.step1LeadCrops") : t("getStarted.step1LeadLivestock")}
              </p>
              <p className="mt-3 text-sm">
                <span className="text-[#526057]">{t("getStarted.selectedFarmType")} </span>
                <span className="font-bold">{enterprises.map(enterpriseName).join(", ")}</span>
              </p>
              <div className={`mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 ${cropsLocked ? "opacity-45" : ""}`}>
                {CROP_OPTIONS.map((crop) => {
                  const selected = !cropsLocked && crops.includes(crop.id)
                  return (
                    <button
                      key={crop.id}
                      type="button"
                      disabled={cropsLocked}
                      aria-disabled={cropsLocked}
                      onClick={() => toggleCrop(crop.id)}
                      className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition ${
                        cropsLocked
                          ? "cursor-not-allowed border-[#E8EBE8] bg-[#F3F4F2] text-[#9aa39c]"
                          : selected
                            ? "border-[#173528] bg-[#E7F3E4] text-[#142018]"
                            : "border-[#E4E8E4] bg-[#F7F8F7] text-[#142018] hover:border-[#173528]/30"
                      }`}
                    >
                      {cropName(crop.id)}
                    </button>
                  )
                })}
              </div>
              {!growsCrops && (
                <button
                  type="button"
                  onClick={() => {
                    setError(null)
                    setNoCrops((current) => {
                      const next = !current
                      if (next) setCrops([])
                      return next
                    })
                  }}
                  className={`mt-4 w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold ${
                    noCrops ? "border-[#173528] bg-[#E7F3E4]" : "border-[#E4E8E4] bg-[#F7F8F7] text-[#526057]"
                  }`}
                >
                  {noCrops ? t("getStarted.noCropsSelected") : t("getStarted.noCrops")}
                </button>
              )}
            </div>
          )}

          {draftReady && step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">{t("getStarted.step2Title")}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#526057]">{t("getStarted.step2Lead")}</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="farm-name" className="text-sm font-semibold">{t("getStarted.farmName")}</label>
                <input id="farm-name" value={farmName} onChange={(e) => setFarmName(e.target.value)} placeholder={t("getStarted.farmNamePlaceholder")} className={fieldClass} />
              </div>
              <div className="space-y-2">
                <label htmlFor="farm-location" className="text-sm font-semibold">{t("getStarted.location")}</label>
                <input id="farm-location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder={t("getStarted.locationPlaceholder")} className={fieldClass} />
              </div>
              <div className="rounded-[22px] bg-[#E7F3E4] p-4 text-sm">
                <p className="font-bold">{t("getStarted.dashboardWillCover")}</p>
                <p className="mt-1 text-[#3e4b43]">
                  {enterprises.map(enterpriseName).join(", ")}
                  {crops.length > 0 && !noCrops ? ` · ${crops.map(cropName).join(", ")}` : ""}
                </p>
              </div>
            </div>
          )}

          {draftReady && step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">{t("getStarted.step3Title")}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#526057]">{t("getStarted.step3Lead")}</p>
                {selectedPlan && ["starter", "professional", "enterprise"].includes(selectedPlan) && (
                  <p className="mt-2 text-sm font-semibold text-[#173528]">
                    {t("getStarted.selectedPlan", {
                      plan: t(`getStarted.plan${selectedPlan.charAt(0).toUpperCase()}${selectedPlan.slice(1)}`),
                    })}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="owner-name" className="text-sm font-semibold">{t("getStarted.yourName")}</label>
                <input id="owner-name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="Ama Mensah" className={fieldClass} autoComplete="name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="owner-email" className="text-sm font-semibold">{t("getStarted.email")}</label>
                <input id="owner-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@farm.com" className={fieldClass} autoComplete="email" />
              </div>
              <div className="space-y-2">
                <label htmlFor="owner-password" className="text-sm font-semibold">{t("getStarted.password")}</label>
                <div className="relative">
                  <input
                    id="owner-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("getStarted.passwordPlaceholder")}
                    className={`${fieldClass} pe-12`}
                    autoComplete="new-password"
                  />
                  <button type="button" className="absolute end-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#526057]" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? t("auth.hidePassword") : t("auth.showPassword")}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="owner-confirm" className="text-sm font-semibold">{t("getStarted.confirmPassword")}</label>
                <input id="owner-confirm" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={fieldClass} autoComplete="new-password" />
              </div>
              <p className="text-xs leading-relaxed text-[#66756c]">
                {t("getStarted.agreePrefix")}{" "}
                <Link href="/terms" className="font-semibold text-[#173528] underline-offset-4 hover:underline">
                  {t("common.termsOfService")}
                </Link>{" "}
                {t("getStarted.agreeMiddle")}{" "}
                <Link href="/privacy" className="font-semibold text-[#173528] underline-offset-4 hover:underline">{t("common.privacyPolicy")}</Link>.
              </p>
            </div>
          )}

          {error && (
            <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            {step === 0 ? (
              <Link href="/" className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-[#526057] hover:bg-[#F3F4F2]">
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t("common.back")}
              </Link>
            ) : (
              <button type="button" className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-[#526057] hover:bg-[#F3F4F2] disabled:opacity-50" onClick={() => { setError(null); setStep((current) => (current === 2 && !growsCrops ? 0 : current - 1)) }} disabled={submitting}>
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t("common.back")}
              </button>
            )}
            {step < 3 ? (
              <button type="button" onClick={goNext} className="inline-flex items-center gap-3 rounded-full bg-[#173528] py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white">
                {t("common.continue")}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#173528]">
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </span>
              </button>
            ) : (
              <button type="button" onClick={submit} disabled={submitting} className="inline-flex items-center gap-3 rounded-full bg-[#173528] py-2 pl-5 pr-5 text-sm font-semibold text-white disabled:opacity-60">
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> {t("getStarted.creating")}</> : t("getStarted.createFarmAccount")}
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-[#526057]">
          {t("getStarted.alreadyHaveAccount")}{" "}
          <Link href="/login" className="font-bold text-[#173528]">{t("common.signIn")}</Link>
        </p>
      </main>
    </div>
  )
}
