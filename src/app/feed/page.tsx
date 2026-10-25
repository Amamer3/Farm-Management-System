import { ProtectedPage } from "@/components/ProtectedPage";
import FeedInventory from "@/views/FeedInventory";

export default function FeedPage() {
  return (
    <ProtectedPage requiredPage="/feed">
      <FeedInventory />
    </ProtectedPage>
  );
}
