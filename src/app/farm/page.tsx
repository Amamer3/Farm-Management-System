import { ProtectedPage } from "@/components/ProtectedPage";
import FarmSettings from "@/views/FarmSettings";

export default function FarmPage() {
  return (
    <ProtectedPage requiredPage="/farm">
      <FarmSettings />
    </ProtectedPage>
  );
}
