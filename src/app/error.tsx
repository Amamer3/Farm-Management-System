"use client"

import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { ErrorScreen } from "@/components/errors/ErrorScreen"
import { logClientError } from "@/utils/errorHandler"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations("common")

  useEffect(() => {
    logClientError("route", error)
  }, [error])

  return (
    <main>
      <ErrorScreen
        title={t("somethingWentWrong")}
        description={t("unexpectedError")}
        details={error.message}
        digest={error.digest}
        stack={error.stack}
        onRetry={reset}
        homeLabel={t("goHome")}
        retryLabel={t("tryAgain")}
        reloadLabel={t("reload")}
      />
    </main>
  )
}
