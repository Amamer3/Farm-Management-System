import type { Metadata } from "next"
import { ProtectedPage } from "@/components/ProtectedPage";
import FarmSettings from "@/views/FarmSettings";
import { createPrivateMetadata } from "@/lib/seo"

export const metadata: Metadata = createPrivateMetadata("Farm settings", "/farm")

export default function FarmPage() {
  return (
    <ProtectedPage requiredPage="/farm">
      <FarmSettings />
    </ProtectedPage>
  );
}
