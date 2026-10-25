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
          title: "Pigs",
          housingKind: "sty",
          species: [{ value: "pig", label: "Pig" }],
          events: [
            { value: "farrowing", label: "Farrowing" },
            { value: "weaning", label: "Weaning" },
            { value: "weight", label: "Weight" },
            { value: "sale", label: "Sale" },
            { value: "mortality", label: "Mortality" },
          ],
        }}
      />
    </ProtectedPage>
  );
}
