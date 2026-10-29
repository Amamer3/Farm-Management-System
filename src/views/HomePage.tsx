"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/contexts/UserRoleContext";
import Landing from "@/views/Landing";

export function HomePage() {
  const t = useTranslations("common");
  const router = useRouter();
  const { isAuthenticated, isLoading } = useUserRole();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">{t("redirecting")}</p>
        </div>
      </div>
    );
  }

  return <Landing />;
}
