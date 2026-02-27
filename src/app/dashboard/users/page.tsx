'use client';

import { useState, useEffect } from 'react';
import { getUsers } from "@/lib/actions/users";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/DataTable";
import { columns } from "./columns";
import { useUser } from '@/hooks/useUser';
import { hasPermission } from '@/lib/auth/roles';
import { User } from '@/lib/types/user';

export default function UsersPage() {
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
      setLoading(false);
    }
    loadUsers();
  }, []);

  const canCreate = user && user.role && hasPermission(user.role, 'users:create');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Users</CardTitle>
        {canCreate && (
          <Link href="/dashboard/users/new">
            <Button>Add User</Button>
          </Link>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
            <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
        ) : (
            <DataTable columns={columns} data={users} />
        )}
      </CardContent>
    </Card>
  );
}
