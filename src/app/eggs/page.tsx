import { ProtectedPage } from "@/components/ProtectedPage";
import EggCollection from "@/views/EggCollection";

export default function EggsPage() {
  return (
    <ProtectedPage requiredPage="/eggs">
      <EggCollection />
    </ProtectedPage>
  );
}
