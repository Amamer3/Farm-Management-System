import type { Metadata } from "next"
import { ProtectedPage } from "@/components/ProtectedPage";
import Statistics from "@/views/Statistics";
import { createPrivateMetadata } from "@/lib/seo"

export const metadata: Metadata = createPrivateMetadata("Statistics", "/statistics")

export default function StatisticsPage() {
  return (
    <ProtectedPage requiredPage="/reports">
      <Statistics />
    </ProtectedPage>
  );
}
