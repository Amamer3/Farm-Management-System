import { ProtectedPage } from "@/components/ProtectedPage";
import Medicine from "@/views/Medicine";

export default function MedicinePage() {
  return (
    <ProtectedPage requiredPage="/medicine">
      <Medicine />
    </ProtectedPage>
  );
}
