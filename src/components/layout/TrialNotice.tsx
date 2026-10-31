"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useFarm } from "@/contexts/FarmContext"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function dismissKey(farmId: string, status: string) {
  return `agrocyms.trial-notice:${farmId}:${status}`
}

function wasDismissed(farmId: string, status: string) {
  try {
    return localStorage.getItem(dismissKey(farmId, status)) === "1"
  } catch {
    return false
  }
}

function rememberDismissed(farmId: string, status: string) {
  try {
    localStorage.setItem(dismissKey(farmId, status), "1")
  } catch {
    /* ignore quota / private mode */
  }
}

export function TrialNotice() {
  const t = useTranslations("trial")
  const { farm } = useFarm()
  const [open, setOpen] = useState(false)

  const expired = farm?.billingStatus === "expired" || farm?.writeAccess === false
  const trialing =
    farm?.billingStatus === "trialing" && typeof farm?.trialDaysRemaining === "number"
  const statusKey = expired ? "expired" : trialing ? "trialing" : null

  useEffect(() => {
    if (!farm?.id || !statusKey) {
      setOpen(false)
      return
    }
    setOpen(!wasDismissed(farm.id, statusKey))
  }, [farm?.id, statusKey])

  if (!farm?.id || !statusKey) return null

  const dismiss = () => {
    rememberDismissed(farm.id, statusKey)
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) dismiss()
        else setOpen(true)
      }}
    >
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>{expired ? t("expiredTitle") : t("noticeTitle")}</DialogTitle>
          <DialogDescription>
            {expired ? (
              <>
                {t("expired")}{" "}
                <Link
                  href="/pricing"
                  className="font-semibold text-foreground underline underline-offset-2"
                  onClick={dismiss}
                >
                  {t("contactToSubscribe")}
                </Link>{" "}
                {t("keepWriting")}
              </>
            ) : (
              t("remaining", { days: farm.trialDaysRemaining })
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" onClick={dismiss}>
            {t("gotIt")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
