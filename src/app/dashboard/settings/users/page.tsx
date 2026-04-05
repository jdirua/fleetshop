import { PageTitle } from "@/components/page-title";
import UserList from "./user-list";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateUserDialog } from "@/components/users/CreateUserDialog";
import { adminAuth } from "@/lib/firebase/admin-sdk";
import { User } from "@/lib/types/user";

async function getUsers(): Promise<User[]> {
  const { users } = await adminAuth.listUsers();
  return users.map((user) => {
    const role = user.customClaims?.role;
    return {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName,
      role: typeof role === 'string' ? role : "readonly",
      disabled: user.disabled,
    };
  });
}

export default async function UserManagementPage() {
  const users = await getUsers();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle title="User Management" description="Create, edit, and manage user roles and permissions." />
        <CreateUserDialog asChild>
          <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New User
          </Button>
        </CreateUserDialog>
      </div>
      <UserList initialUsers={users} />
    </div>
  );
}
