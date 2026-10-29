import type { Metadata } from "next"
import { ProtectedPage } from "@/components/ProtectedPage"
import Crops from "@/views/Crops"
import { createPrivateMetadata } from "@/lib/seo"

export const metadata: Metadata = createPrivateMetadata("Crops", "/crops")

export default function CropsPage() {
  return (
    <ProtectedPage requiredPage="/crops">
      <Crops />
    </ProtectedPage>
  )
}
