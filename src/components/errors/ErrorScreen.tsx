"use client"

import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { isStaleClientError } from "@/utils/errorHandler"

type ErrorScreenProps = {
  title?: string
  description?: string
  details?: string
  digest?: string
  stack?: string
  onRetry?: () => void
  homeHref?: string
  homeLabel?: string
  retryLabel?: string
  reloadLabel?: string
}

export function ErrorScreen({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again, or go back to the home page.",
  details,
  digest,
  stack,
  onRetry,
  homeHref = "/",
  homeLabel = "Go home",
  retryLabel = "Try again",
  reloadLabel = "Reload page",
}: ErrorScreenProps) {
  const isDev = process.env.NODE_ENV === "development"
  const stale = isStaleClientError(details)
  const heading = stale ? "Please reload this page" : title
  const body = stale
    ? "The app was updated. Reload to load the latest version."
    : description

  const retry = () => {
    if (stale) {
      window.location.reload()
      return
    }
    onRetry?.()
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle>{heading}</CardTitle>
          </div>
          <CardDescription>{body}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isDev && details ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error details</AlertTitle>
              <AlertDescription className="mt-2">
                <p className="break-all font-mono text-sm">{details}</p>
                {stack ? (
                  <pre className="mt-2 max-h-48 overflow-auto rounded bg-muted p-2 text-xs">{stack}</pre>
                ) : null}
              </AlertDescription>
            </Alert>
          ) : null}
          {!isDev && digest ? (
            <p className="text-xs text-muted-foreground">Reference: {digest}</p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {onRetry ? (
              <Button onClick={retry} variant="outline">
                <RefreshCw className="me-2 h-4 w-4" />
                {stale ? reloadLabel : retryLabel}
              </Button>
            ) : (
              <Button onClick={() => window.location.reload()} variant="outline">
                <RefreshCw className="me-2 h-4 w-4" />
                {reloadLabel}
              </Button>
            )}
            <Button asChild>
              <a href={homeHref}>
                <Home className="me-2 h-4 w-4" />
                {homeLabel}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
