'use client';

import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/lib/types/user';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUser } from '@/hooks/useUser';
import { hasPermission } from '@/lib/auth/roles';
import Link from 'next/link';

// New component to handle the actions dropdown
const UserActions = ({ user }: { user: User }) => {
  const { user: currentUser } = useUser();
  const canUpdate = currentUser && currentUser.role && hasPermission(currentUser.role, 'users:update');
  const canDelete = currentUser && currentUser.role && hasPermission(currentUser.role, 'users:delete');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <Link href={`/dashboard/users/${user.id}`}>
          <DropdownMenuItem>View</DropdownMenuItem>
        </Link>
        {canUpdate && (
          <Link href={`/dashboard/users/${user.id}/edit`}>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </Link>
        )}
        {canDelete && (
          <DropdownMenuItem>Delete</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <UserActions user={row.original} />,
  },
];
