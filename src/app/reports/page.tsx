import type { Metadata } from "next"
import { ProtectedPage } from "@/components/ProtectedPage";
import Reports from "@/views/Reports";
import { createPrivateMetadata } from "@/lib/seo"

export const metadata: Metadata = createPrivateMetadata("Reports", "/reports")

export default function ReportsPage() {
  return (
    <ProtectedPage requiredPage="/reports">
      <Reports />
    </ProtectedPage>
  );
}
