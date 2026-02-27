'use client';

import { ColumnDef } from '@tanstack/react-table';
import { WorkOrder } from '@/lib/types/workOrder';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUser } from '@/hooks/useUser';
import { hasPermission } from '@/lib/auth/roles';
import Link from 'next/link';

// New component to handle the actions dropdown
const WorkOrderActions = ({ workOrder }: { workOrder: WorkOrder }) => {
  const { user } = useUser();
  const canUpdate = user && user.role && hasPermission(user.role, 'work-orders:update');
  const canDelete = user && user.role && hasPermission(user.role, 'work-orders:delete');

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
        <Link href={`/dashboard/work-orders/${workOrder.id}`}>
          <DropdownMenuItem>View</DropdownMenuItem>
        </Link>
        {canUpdate && (
          <Link href={`/dashboard/work-orders/${workOrder.id}/edit`}>
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

export const columns: ColumnDef<WorkOrder>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'vehicle.registration',
    header: 'Vehicle',
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
  },
  {
    id: 'actions',
    cell: ({ row }) => <WorkOrderActions workOrder={row.original} />,
  },
];
