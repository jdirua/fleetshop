'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Vehicle } from '@/lib/types/vehicle';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUser } from '@/context/UserContext';
import { hasPermission } from '@/lib/auth/roles';
import Link from 'next/link';

// New component to handle the actions dropdown
const VehicleActions = ({ vehicle }: { vehicle: Vehicle }) => {
  const { user } = useUser();
  const canUpdate = user && user.role && hasPermission(user.role, 'vehicles:update');
  const canDelete = user && user.role && hasPermission(user.role, 'vehicles:delete');

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
        <Link href={`/dashboard/vehicles/${vehicle.id}`}>
          <DropdownMenuItem>View</DropdownMenuItem>
        </Link>
        {canUpdate && (
          <Link href={`/dashboard/vehicles/${vehicle.id}/edit`}>
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

export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: 'registration',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Registration
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'make',
    header: 'Make',
  },
  {
    accessorKey: 'model',
    header: 'Model',
  },
  {
    accessorKey: 'year',
    header: 'Year',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: 'actions',
    cell: ({ row }) => <VehicleActions vehicle={row.original} />,
  },
];
