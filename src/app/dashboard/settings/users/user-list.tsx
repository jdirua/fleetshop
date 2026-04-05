'use client';

import { useState } from 'react';
import { User } from '@/lib/types/user';
import { UserRole, ROLES } from '@/lib/auth/roles';
import { updateUserRole } from './actions';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface UserListProps {
  initialUsers: User[];
}

const rolesArray = Object.values(ROLES);

export default function UserList({ initialUsers }: UserListProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});

  const handleRoleChange = async (uid: string, newRole: UserRole) => {
    setIsSubmitting(prev => ({ ...prev, [uid]: true }));

    const result = await updateUserRole(uid, newRole);

    if (result.success) {
      setUsers(prevUsers =>
        prevUsers.map(user => (user.uid === uid ? { ...user, role: newRole } : user))
      );
      toast.success('User role updated successfully.');
    } else {
      toast.error(result.error || 'Failed to update user role.');
    }

    setIsSubmitting(prev => ({ ...prev, [uid]: false }));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.uid}>
            <TableCell>{user.displayName || 'N/A'}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Select
                defaultValue={user.role || ''}
                onValueChange={(value: UserRole) => handleRoleChange(user.uid, value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {rolesArray.map(role => (
                    <SelectItem key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="text-right">
                <Button size="sm" onClick={() => handleRoleChange(user.uid, user.role)} disabled={isSubmitting[user.uid]}>
                    {isSubmitting[user.uid] ? 'Saving...' : 'Save'}
                </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
