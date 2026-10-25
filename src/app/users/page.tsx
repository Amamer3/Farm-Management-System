import type { Metadata } from "next"
import { ProtectedPage } from "@/components/ProtectedPage";
import UserManagement from "@/views/UserManagement";
import { createPrivateMetadata } from "@/lib/seo"

export const metadata: Metadata = createPrivateMetadata("Users", "/users")

export default function UsersPage() {
  return (
    <ProtectedPage requiredPage="/users" requiredPermission="manage_users">
      <UserManagement />
    </ProtectedPage>
  );
}
