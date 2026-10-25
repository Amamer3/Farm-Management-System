import { ProtectedPage } from "@/components/ProtectedPage";
import Livestock from "@/views/Livestock";

export default function RuminantsPage() {
  return (
    <ProtectedPage requiredPage="/ruminants">
      <Livestock
        config={{
          enterprise: "small_ruminants",
          module: "ruminants",
          title: "Small ruminants",
          housingKind: "paddock",
          species: [
            { value: "goat", label: "Goat" },
            { value: "sheep", label: "Sheep" },
          ],
          events: [
            { value: "birth", label: "Birth" },
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
