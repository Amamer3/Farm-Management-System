import type { Metadata } from "next"
import { ProtectedPage } from "@/components/ProtectedPage";
import BirdsManagement from "@/views/BirdsManagement";
import { createPrivateMetadata } from "@/lib/seo"

export const metadata: Metadata = createPrivateMetadata("Birds", "/birds")

export default function BirdsPage() {
  return (
    <ProtectedPage requiredPage="/birds">
      <BirdsManagement />
    </ProtectedPage>
  );
}
