"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/contexts/UserRoleContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

interface ProtectedPageProps {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredPage?: string;
}

export function ProtectedPage({
  children,
  requiredPermission,
  requiredPage,
}: ProtectedPageProps) {
  const t = useTranslations("common");
  const { isAuthenticated, isLoading } = useUserRole();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (!isAuthenticated) {
    return <LoadingScreen message={isLoading ? t("loading") : t("redirecting")} />;
  }

  return (
    <ProtectedRoute requiredPage={requiredPage} requiredPermission={requiredPermission}>
      {children}
    </ProtectedRoute>
  );
}
