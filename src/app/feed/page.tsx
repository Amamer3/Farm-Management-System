import type { Metadata } from "next"
import { ProtectedPage } from "@/components/ProtectedPage";
import FeedInventory from "@/views/FeedInventory";
import { createPrivateMetadata } from "@/lib/seo"

export const metadata: Metadata = createPrivateMetadata("Feed inventory", "/feed")

export default function FeedPage() {
  return (
    <ProtectedPage requiredPage="/feed">
      <FeedInventory />
    </ProtectedPage>
  );
}
