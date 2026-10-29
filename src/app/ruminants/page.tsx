import type { Metadata } from "next"
import { ProtectedPage } from "@/components/ProtectedPage";
import Livestock from "@/views/Livestock";
import { createPrivateMetadata } from "@/lib/seo"

export const metadata: Metadata = createPrivateMetadata("Small ruminants", "/ruminants")

export default function RuminantsPage() {
  return (
    <ProtectedPage requiredPage="/ruminants">
      <Livestock
        config={{
          enterprise: "small_ruminants",
          module: "ruminants",
          titleKey: "sidebar.ruminants",
          species: ["goat", "sheep"],
          events: ["birth", "weaning", "weight", "sale", "mortality"],
        }}
      />
    </ProtectedPage>
  );
}
