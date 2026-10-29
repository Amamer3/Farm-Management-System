"use client"

import { useEffect } from "react"
import { ErrorScreen } from "@/components/errors/ErrorScreen"
import { logClientError } from "@/utils/errorHandler"
import "../index.css"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    logClientError("global", error)
  }, [error])

  return (
    <html lang="en">
      <body className="font-inter antialiased">
        <ErrorScreen
          title="Something went wrong"
          description="The page could not be shown. Try again, or go back to the home page."
          details={error.message}
          digest={error.digest}
          stack={error.stack}
          onRetry={reset}
        />
      </body>
    </html>
  )
}
