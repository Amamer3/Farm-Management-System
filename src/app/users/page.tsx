import { ProtectedPage } from "@/components/ProtectedPage";
import UserManagement from "@/views/UserManagement";

export default function UsersPage() {
  return (
    <ProtectedPage requiredPage="/users" requiredPermission="manage_users">
      <UserManagement />
    </ProtectedPage>
  );
}
