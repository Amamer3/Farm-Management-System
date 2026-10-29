"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserRoleProvider } from "@/contexts/UserRoleContext";
import { FarmProvider } from "@/contexts/FarmContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import AuthErrorHandler from "@/components/AuthErrorHandler";
import ErrorBoundary from "@/components/ErrorBoundary";
import { PwaProvider } from "@/components/pwa/PwaProvider";
import { isAbortError, isStaleClientError, logClientError } from "@/utils/errorHandler";

function ClientErrorListeners() {
  useEffect(() => {
    const onRejection = (event: PromiseRejectionEvent) => {
      if (isAbortError(event.reason)) {
        event.preventDefault();
        return;
      }
      logClientError("unhandledrejection", event.reason);
    };
    const onError = (event: ErrorEvent) => {
      logClientError("window", event.error || event.message);
      if (isStaleClientError(event.error || event.message)) {
        event.preventDefault();
      }
    };
    window.addEventListener("unhandledrejection", onRejection);
    window.addEventListener("error", onError);
    return () => {
      window.removeEventListener("unhandledrejection", onRejection);
      window.removeEventListener("error", onError);
    };
  }, []);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <UserRoleProvider>
            <FarmProvider>
              <TooltipProvider>
                <PwaProvider>
                  <ClientErrorListeners />
                  <AuthErrorHandler />
                  <Toaster />
                  <Sonner />
                  {children}
                </PwaProvider>
              </TooltipProvider>
            </FarmProvider>
          </UserRoleProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
