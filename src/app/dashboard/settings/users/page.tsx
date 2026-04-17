import { PageTitle } from "@/components/page-title";
import { ArrowLeft } from "lucide-react";
import UserList from "./user-list";
import { getAllUsers } from "@/lib/actions/users";
import Link from "next/link";
import { UserPageActions } from "./UserPageActions";

export default async function UserManagementPage() {
  const { users, nextPageToken } = await getAllUsers();

  return (
    <div className="p-2 md:p-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
            <Link href="/dashboard/settings" className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors">
                <ArrowLeft className="h-5 w-5 text-slate-100" />
                <span className="sr-only">Back to Settings</span>
            </Link>
            <PageTitle title="User Management" isHub />
        </div>
        <UserPageActions />
      </div>
      <UserList initialUsers={users} nextPageToken={nextPageToken} />
    </div>
  );
}
