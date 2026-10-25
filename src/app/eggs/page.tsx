import type { Metadata } from "next"
import { ProtectedPage } from "@/components/ProtectedPage";
import EggCollection from "@/views/EggCollection";
import { createPrivateMetadata } from "@/lib/seo"

export const metadata: Metadata = createPrivateMetadata("Egg collection", "/eggs")

export default function EggsPage() {
  return (
    <ProtectedPage requiredPage="/eggs">
      <EggCollection />
    </ProtectedPage>
  );
}
