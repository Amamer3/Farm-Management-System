"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { useFarm } from "@/contexts/FarmContext"

export function TrialBanner() {
  const t = useTranslations("trial")
  const { farm } = useFarm()
  if (!farm?.id) return null

  if (farm.billingStatus === "expired" || farm.writeAccess === false) {
    return (
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-950 sm:px-6">
        {t("expired")}{" "}
        <Link href="/pricing" className="font-semibold underline underline-offset-2">
          {t("contactToSubscribe")}
        </Link>{" "}
        {t("keepWriting")}
      </div>
    )
  }

  if (farm.billingStatus === "trialing" && typeof farm.trialDaysRemaining === "number") {
    return (
      <div className="border-b border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-950 sm:px-6">
        {t("remaining", { days: farm.trialDaysRemaining })}
      </div>
    )
  }

  return null
}
