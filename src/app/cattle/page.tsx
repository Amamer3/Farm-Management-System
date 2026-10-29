import type { Metadata } from "next"
import { ProtectedPage } from "@/components/ProtectedPage";
import Livestock from "@/views/Livestock";
import { createPrivateMetadata } from "@/lib/seo"

export const metadata: Metadata = createPrivateMetadata("Cattle", "/cattle")

export default function CattlePage() {
  return (
    <ProtectedPage requiredPage="/cattle">
      <Livestock
        config={{
          enterprise: "cattle",
          module: "cattle",
          titleKey: "sidebar.cattle",
          species: ["cattle"],
          events: ["calving", "milk", "weight", "sale", "mortality"],
        }}
      />
    </ProtectedPage>
  );
}
