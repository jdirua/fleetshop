
import { getUserById } from "@/lib/actions/users";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateUserForm } from "@/components/users/UpdateUserForm";

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.photoURL || ""} />
          <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{user.displayName}</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateUserForm user={user} />
        </CardContent>
      </Card>
    </div>
  );
}
