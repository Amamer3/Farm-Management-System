"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { authService } from "@/services/authService"
import { getAppName, getLogoPath, getContactEmail } from "@/lib/env"

export function ForgotPassword() {
  const t = useTranslations("auth")
  const [email, setEmail] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [failed, setFailed] = useState(false)
  const appName = getAppName()

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setFailed(false)
    setSending(true)
    try {
      await authService.requestPasswordReset(email.trim())
      setSent(true)
    } catch {
      setSent(true)
      setFailed(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute end-4 top-4 z-10">
        <LanguageSwitcher variant="plain" />
      </div>
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="space-y-3">
          <Link href="/" className="mx-auto flex items-center gap-3">
            <img src={getLogoPath()} alt={appName} className="h-12 w-12 object-contain" />
            <span className="text-xl font-bold">{appName}</span>
          </Link>
          <CardTitle className="text-center text-2xl">{t("forgotTitle")}</CardTitle>
          <CardDescription className="text-center">{t("forgotLead")}</CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>{failed ? t("forgotFailed") : t("forgotSent")}</p>
              {failed && (
                <a className="font-semibold text-primary" href={`mailto:${getContactEmail()}`}>
                  {getContactEmail()}
                </a>
              )}
              <Link href="/login" className="block font-semibold text-primary">
                {t("forgotBack")}
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">{t("email")}</Label>
                <Input
                  id="reset-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  className="h-11"
                />
              </div>
              <Button type="submit" className="w-full h-11" disabled={sending || email.trim().length < 3}>
                {sending ? t("forgotSending") : t("forgotSubmit")}
              </Button>
              <p className="text-center text-sm">
                <Link href="/login" className="font-medium text-primary hover:underline">
                  {t("forgotBack")}
                </Link>
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
