"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useUserRole } from "@/contexts/UserRoleContext"
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getAppName, getAppTagline, getLogoPath } from "@/lib/env"
import { MARKETING_PHOTOS } from "@/lib/marketingImages"

type LoginFormData = {
  email: string
  password: string
}

function LoginForm({ isRedirecting = false }: { isRedirecting?: boolean }) {
  const t = useTranslations("auth")
  const tc = useTranslations("common")
  const { login, isLoading } = useUserRole()
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const isProcessing = isLoading || isRedirecting

  const loginSchema = useMemo(
    () =>
      z.object({
        email: z.string().email(t("invalidEmail")),
        password: z.string().min(6, t("passwordMin")),
      }),
    [t]
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setError(null)
    try {
      await login(data.email, data.password)
    } catch (err: any) {
      setError(err.message || t("loginFailed"))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            disabled={isProcessing}
            {...register("email")}
            className="h-11"
          />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t("password")}</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            disabled={isProcessing}
            {...register("password")}
            className="h-11 pe-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute end-0 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? t("hidePassword") : t("showPassword")}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            )}
          </Button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full h-11 text-base font-medium" disabled={isProcessing}>
        {isProcessing ? (
          <>
            <Loader2 className="me-2 h-5 w-5 animate-spin" />
            {isRedirecting ? tc("redirecting") : t("signingIn")}
          </>
        ) : (
          t("cardTitle")
        )}
      </Button>
    </form>
  )
}

export function AuthPage() {
  const t = useTranslations("auth")
  const { isAuthenticated, isLoading } = useUserRole()
  const router = useRouter()
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason')
  const [isRedirecting, setIsRedirecting] = useState(false)
  const appName = getAppName()

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      setIsRedirecting(true)
      const timer = setTimeout(() => {
        router.replace("/")
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setIsRedirecting(false)
    }
  }, [isAuthenticated, isLoading, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
      <div className="absolute end-4 top-4 z-10 sm:end-6 sm:top-6">
        <LanguageSwitcher variant="plain" />
      </div>
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        <div className="relative hidden min-h-[560px] overflow-hidden rounded-[32px] lg:block">
          <Image
            src={MARKETING_PHOTOS.farmer.src}
            alt={t("heroAlt")}
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173528]/90 via-[#173528]/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 space-y-3 p-8 text-white">
            <h2 className="text-4xl font-bold leading-tight">
              {t("welcomeBack")}
              <br />
              {t("toBrand", { name: appName })}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-white/85">{t("subtitle")}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-6 lg:hidden">
            <figure className="relative h-40 overflow-hidden rounded-[24px] sm:h-48 sm:rounded-[28px]">
              <Image
                src={MARKETING_PHOTOS.farmer.src}
                alt={t("heroAlt")}
                fill
                sizes="(min-width: 1024px) 0px, calc(100vw - 2rem)"
                className="object-cover object-[center_30%]"
                unoptimized
                priority
              />
            </figure>
          </div>
          <Card className="w-full max-w-md shadow-xl border-0 mx-auto lg:max-w-none">
            <CardHeader className="space-y-3 pb-6">
              <Link href="/" className="mx-auto flex items-center gap-3">
                <img
                  src={getLogoPath()}
                  alt={appName}
                  className="h-12 w-12 object-contain bg-transparent sm:h-14 sm:w-14"
                />
                <div className="text-start">
                  <h1 className="text-xl font-bold text-foreground sm:text-2xl">{appName}</h1>
                  <p className="text-xs text-muted-foreground sm:text-sm">{getAppTagline()}</p>
                </div>
              </Link>
              <CardTitle className="text-2xl font-bold text-center">
                {t("cardTitle")}
              </CardTitle>
              <CardDescription className="text-center">
                {t("cardDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reason === 'expired' && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {t("sessionExpired")}
                  </AlertDescription>
                </Alert>
              )}
              <LoginForm isRedirecting={isRedirecting} />
              <p className="mt-6 text-center text-sm text-muted-foreground">
                <Link href="/get-started" className="font-medium text-primary hover:underline">
                  {t("createAccount")}
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
