import { ProtectedPage } from "@/components/ProtectedPage";
import Reports from "@/views/Reports";

export default function ReportsPage() {
  return (
    <ProtectedPage requiredPage="/reports">
      <Reports />
    </ProtectedPage>
  );
}
