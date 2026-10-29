import type { Metadata } from "next"
import { ProtectedPage } from "@/components/ProtectedPage";
import Livestock from "@/views/Livestock";
import { createPrivateMetadata } from "@/lib/seo"

export const metadata: Metadata = createPrivateMetadata("Pigs", "/pigs")

export default function PigsPage() {
  return (
    <ProtectedPage requiredPage="/pigs">
      <Livestock
        config={{
          enterprise: "pigs",
          module: "pigs",
          titleKey: "sidebar.pigs",
          species: ["pig"],
          events: ["farrowing", "weaning", "weight", "sale", "mortality"],
        }}
      />
    </ProtectedPage>
  );
}
