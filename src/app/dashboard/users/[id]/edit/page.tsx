
import { getUser } from "@/lib/auth/server";
import { notFound } from "next/navigation";
import { EditUserForm } from "@/components/users/EditUserForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function EditUserPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);

  if (!user) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit User</CardTitle>
      </CardHeader>
      <CardContent>
        <EditUserForm user={user} />
      </CardContent>
    </Card>
  );
}
