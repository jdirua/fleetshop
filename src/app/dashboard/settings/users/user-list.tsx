'use client';

import { useState, useEffect } from 'react';
import { User } from '@/lib/types/user';
import { updateUserRole } from '@/app/dashboard/settings/users/actions';
import { getAllUsers } from '@/lib/actions/users';
import { getRoles } from '@/lib/actions/roles';
import { UserRole } from '@/lib/auth/roles';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface UserListProps {
  initialUsers: User[];
  nextPageToken?: string;
}

interface Role {
    name: string;
    permissions: Record<string, boolean>;
}

export default function UserList({ initialUsers, nextPageToken }: UserListProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [token, setToken] = useState<string | undefined>(nextPageToken);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    async function fetchRoles() {
        const fetchedRoles = await getRoles();
        setRoles(fetchedRoles as Role[]);
    }
    fetchRoles();
  }, []);

  const handleRoleChange = async (uid: string, newRole: string) => {
    setIsSubmitting(prev => ({ ...prev, [uid]: true }));
    const result = await updateUserRole(uid, newRole as UserRole);
    if (result.success) {
      setUsers(prevUsers =>
        prevUsers.map(user => (user.uid === uid ? { ...user, role: newRole as UserRole } : user))
      );
      toast.success('User role updated successfully!');
    } else {
      toast.error(result.error || 'Failed to update user role.');
    }
    setIsSubmitting(prev => ({ ...prev, [uid]: false }));
  };

  const handleLoadMore = async () => {
    if (!token) return;
    setLoadingMore(true);
    const { users: newUsers, nextPageToken: newToken } = await getAllUsers(token);
    setUsers(prevUsers => [...prevUsers, ...newUsers]);
    setToken(newToken);
    setLoadingMore(false);
  };

  return (
    <Card className="w-full bg-slate-900/50 border border-slate-800 rounded-lg shadow-lg">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-b-slate-800">
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Name</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Email</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Role</TableHead>
              <TableHead className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-800">
            {users.map(user => (
              <TableRow key={user.uid} className="hover:bg-slate-800/40">
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-100">{user.displayName || 'N/A'}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{user.email}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                  <Select
                    value={user.role || ''} // Controlled component
                    onValueChange={(value: string) => handleRoleChange(user.uid, value)}
                    disabled={isSubmitting[user.uid]}
                  >
                    <SelectTrigger className="w-[140px] bg-slate-800 border-slate-700 text-slate-100 text-sm h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                      {roles.map(role => (
                        <SelectItem key={role.name} value={role.name} className="text-sm">{role.name.charAt(0).toUpperCase() + role.name.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {/* The Save button is no longer necessary as role changes are now handled by onValueChange */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {token && (
          <div className="flex justify-center p-4">
            <Button onClick={handleLoadMore} disabled={loadingMore}>
              {loadingMore ? 'Loading...' : 'Load More'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
