import type { Metadata } from "next"
import { ProtectedPage } from "@/components/ProtectedPage";
import Medicine from "@/views/Medicine";
import { createPrivateMetadata } from "@/lib/seo"

export const metadata: Metadata = createPrivateMetadata("Medicine", "/medicine")

export default function MedicinePage() {
  return (
    <ProtectedPage requiredPage="/medicine">
      <Medicine />
    </ProtectedPage>
  );
}
