"use client";

import { useUserRole } from "@/contexts/UserRoleContext";
import { ProtectedPage } from "@/components/ProtectedPage";
import Landing from "@/views/Landing";
import Index from "@/views/Index";

export function HomePage() {
  const { isAuthenticated, isLoading } = useUserRole();

  if (!isAuthenticated) {
    return <Landing />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedPage requiredPage="/">
      <Index />
    </ProtectedPage>
  );
}
