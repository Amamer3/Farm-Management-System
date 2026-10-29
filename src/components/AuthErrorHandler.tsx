"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { authService } from "@/services/authService";
import { storage } from "@/utils/errorHandler";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AUTH_PAGES = new Set(["/login", "/forgot-password", "/get-started"]);

const AuthErrorHandler = () => {
  const [showError, setShowError] = useState(false);
  const t = useTranslations("common");
  const ta = useTranslations("auth");
  const [errorMessage, setErrorMessage] = useState(ta("sessionExpired"));
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleAuthError = (event: Event) => {
      const detail = (event as CustomEvent<{ message?: string }>).detail;
      setErrorMessage(detail?.message || ta("sessionExpired"));
      setShowError(true);
    };

    const unsubExpired = authService.on("session_expired", () => {
      setErrorMessage(ta("sessionExpired"));
      setShowError(true);
    });

    window.addEventListener("auth-error", handleAuthError as EventListener);

    return () => {
      unsubExpired();
      window.removeEventListener("auth-error", handleAuthError as EventListener);
    };
  }, [ta]);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      storage.removeItem("auth");
    } finally {
      setShowError(false);
      router.replace("/login?reason=expired");
    }
  };

  if (!showError || AUTH_PAGES.has(pathname)) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("sessionExpiredTitle")}</CardTitle>
          <CardDescription>{errorMessage}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end">
          <Button onClick={() => void handleLogout()}>{t("logInAgain")}</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthErrorHandler;
