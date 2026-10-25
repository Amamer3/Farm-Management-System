import { Suspense } from "react";
import { AuthPage } from "@/components/auth/AuthPage";

function LoginFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <AuthPage />
    </Suspense>
  );
}
