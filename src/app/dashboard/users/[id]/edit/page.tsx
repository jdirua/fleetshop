import { getUserById } from "@/lib/actions/users";
import { notFound } from "next/navigation";
import EditUserForm from "./EditUserForm";
import { PageHeader, PageHeaderTitle, PageHeaderDescription } from "@/components/page-header";

export default async function EditUserPage({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);

  if (!user) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <PageHeader>
        <PageHeaderTitle>Edit User</PageHeaderTitle>
        <PageHeaderDescription>
          Modify user details and roles.
        </PageHeaderDescription>
      </PageHeader>
      <EditUserForm user={user} />
    </div>
  );
}
