import type { Metadata } from "next"
import { ProtectedPage } from "@/components/ProtectedPage";
import Profile from "@/views/Profile";
import { createPrivateMetadata } from "@/lib/seo"

export const metadata: Metadata = createPrivateMetadata("Profile", "/profile")

export default function ProfilePage() {
  return (
    <ProtectedPage requiredPage="/profile">
      <Profile />
    </ProtectedPage>
  );
}
