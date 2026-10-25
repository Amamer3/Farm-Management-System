import { ProtectedPage } from "@/components/ProtectedPage";
import Profile from "@/views/Profile";

export default function ProfilePage() {
  return (
    <ProtectedPage requiredPage="/profile">
      <Profile />
    </ProtectedPage>
  );
}
