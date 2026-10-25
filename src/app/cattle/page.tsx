import { ProtectedPage } from "@/components/ProtectedPage";
import Livestock from "@/views/Livestock";

export default function CattlePage() {
  return (
    <ProtectedPage requiredPage="/cattle">
      <Livestock
        config={{
          enterprise: "cattle",
          module: "cattle",
          title: "Cattle",
          housingKind: "kraal",
          species: [{ value: "cattle", label: "Cattle" }],
          events: [
            { value: "calving", label: "Calving" },
            { value: "milk", label: "Milk" },
            { value: "weight", label: "Weight" },
            { value: "sale", label: "Sale" },
            { value: "mortality", label: "Mortality" },
          ],
        }}
      />
    </ProtectedPage>
  );
}
