import { ProtectedPage } from "@/components/ProtectedPage";
import Statistics from "@/views/Statistics";

export default function StatisticsPage() {
  return (
    <ProtectedPage requiredPage="/reports">
      <Statistics />
    </ProtectedPage>
  );
}
