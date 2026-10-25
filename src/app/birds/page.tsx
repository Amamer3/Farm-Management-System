import { ProtectedPage } from "@/components/ProtectedPage";
import BirdsManagement from "@/views/BirdsManagement";

export default function BirdsPage() {
  return (
    <ProtectedPage requiredPage="/birds">
      <BirdsManagement />
    </ProtectedPage>
  );
}
