"use client"

import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

type InlineErrorProps = {
  title?: string
  message: string
  onRetry?: () => void
  retryLabel?: string
}

export function InlineError({
  title = "Could not load this data",
  message,
  onRetry,
  retryLabel = "Try again",
}: InlineErrorProps) {
  return (
    <div className="mb-6 rounded-lg border border-destructive/20 bg-destructive/10 p-4" role="alert">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
        <div className="min-w-0 flex-1">
          <h3 className="mb-1 font-semibold text-destructive">{title}</h3>
          <p className="text-sm text-muted-foreground">{message}</p>
          {onRetry ? (
            <Button variant="outline" size="sm" className="mt-3" onClick={onRetry}>
              <RefreshCw className="me-2 h-4 w-4" />
              {retryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
